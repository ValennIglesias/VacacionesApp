import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, HourglassMedium, UserPlus, XCircle } from "@phosphor-icons/react";
import { api, ApiError, auth, useIsGuest } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { countryName } from "../lib/format";
import { Avatar, Button, Field, Skeleton, Flag, spring } from "../components/ui";

type JoinPreview = {
  trip: { id: string; name: string; countryCode: string; city: string | null };
  members: { id: string; name: string; color: number; claimed: boolean; image: string | null }[];
  alreadyMember: boolean;
  request: { status: "pending" | "approved" | "rejected"; name: string } | null;
};
type MyRequest = { id: string; status: "pending" | "rejected"; code: string };

/**
 * Unirse con código, con o sin cuenta. Elegir un nombre de la lista lo vincula directo
 * (si no hay sesión se crea un invitado con ese nombre); un nombre nuevo queda pendiente
 * hasta que lo apruebe quien creó el viaje.
 */
export function Join() {
  const t = useT();
  const locale = useLocale();
  const nav = useNavigate();
  const qc = useQueryClient();
  const params = useParams();
  const session = auth.useSession();
  const isGuest = useIsGuest();
  const [input, setInput] = useState(params.code ?? "");
  const code = params.code?.toUpperCase();
  const [pick, setPick] = useState<string | "new" | null>(null);
  const [newName, setNewName] = useState("");
  const [sent, setSent] = useState(false);

  const preview = useQuery({ queryKey: ["join", code], queryFn: () => api<JoinPreview>(`/join/${code}`), enabled: !!code && !session.isPending, retry: false });
  const status = sent ? "pending" : preview.data?.request?.status;
  // esperando aprobación: consulto mis pedidos (no la vista previa, que tiene límite por IP)
  const mine = useQuery({
    queryKey: ["join-requests"],
    queryFn: () => api<MyRequest[]>("/join-requests"),
    enabled: status === "pending",
    refetchInterval: 6000,
  });
  const myRequest = mine.data?.find((r) => r.code === code);
  const rejected = status === "rejected" || myRequest?.status === "rejected";

  const join = useMutation({
    mutationFn: async () => {
      // sin sesión: cuenta invitada; el servidor le pone el nombre elegido
      if (!session.data) {
        const res = await auth.signIn.anonymous();
        if (res.error) throw new ApiError(res.error.status ?? 500, res.error.status === 429 ? "too_many_requests" : "error");
      }
      const name = pick === "new" ? newName.trim() || session.data?.user.name : undefined;
      return api<{ id: string; status: "member" | "pending" }>(`/join/${code}`, { body: pick === "new" ? { name } : { memberId: pick } });
    },
    onSuccess: ({ id, status }) => {
      qc.invalidateQueries({ queryKey: ["trips"] });
      if (status === "member") nav(`/t/${id}`, { replace: true });
      else setSent(true);
    },
    onError: () => preview.refetch(),
  });

  if (preview.data?.alreadyMember) return <Navigate to={`/t/${preview.data.trip.id}`} replace />;
  // aprobado: el pedido ya no figura como pendiente (con datos frescos: la caché de Inicio es de antes de pedir)
  if (status === "pending" && mine.isFetchedAfterMount && !myRequest && preview.data) return <Navigate to={`/t/${preview.data.trip.id}`} replace />;

  const errorCode = (join.error as ApiError | null)?.code;
  const pickedName = pick === "new" ? newName.trim() : preview.data?.members.find((m) => m.id === pick)?.name;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <Link to="/" className="inline-flex size-11 items-center justify-center rounded-full bg-surface tap" aria-label={t.back}>
        <ArrowLeft size={20} />
      </Link>

      {!code || preview.isError ? (
        <form
          className="mt-8 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) nav(`/join/${input.trim().toUpperCase()}`);
          }}
        >
          <h1 className="text-3xl font-semibold tracking-tight">{t.enterCode}</h1>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
            placeholder={t.codePh}
            aria-label={t.enterCode}
            autoFocus
            autoCapitalize="characters"
            className="h-16 rounded-2xl border border-line bg-surface text-center text-3xl font-semibold tracking-[0.3em] outline-none placeholder:text-muted/50 focus:border-accent"
          />
          {preview.isError && (
            <p role="alert" className="text-center text-sm text-neg">
              {(preview.error as ApiError).code === "invalid_code" ? t.invalidCode : (preview.error as ApiError).code === "too_many_requests" ? t.tooManyAttempts : t.genericError}
            </p>
          )}
          <Button type="submit" disabled={input.length < 6}>
            {t.search}
          </Button>
        </form>
      ) : preview.isPending || session.isPending ? (
        <div className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <motion.div className="mt-8 flex flex-1 flex-col gap-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 rounded-3xl bg-surface p-4">
            <Flag cc={preview.data.trip.countryCode} size={56} />
            <div>
              <p className="text-xl font-semibold">{preview.data.trip.name}</p>
              <p className="text-sm text-muted">{[preview.data.trip.city, countryName(preview.data.trip.countryCode, locale)].filter(Boolean).join(", ")}</p>
            </div>
          </div>

          {status === "pending" || rejected ? (
            <RequestState rejected={rejected} name={preview.data.request?.name ?? newName} />
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{t.whoAreYou}</h1>
                <p className="mt-1 text-sm text-muted">{t.whoAreYouBody}</p>
              </div>
              <div className="flex flex-col gap-2" role="radiogroup" aria-label={t.whoAreYou}>
                {preview.data.members.map((m) => (
                  <motion.button
                    key={m.id}
                    role="radio"
                    aria-checked={pick === m.id}
                    disabled={m.claimed}
                    whileTap={m.claimed ? undefined : { scale: 0.97 }}
                    onClick={() => setPick(m.id)}
                    className="relative flex items-center gap-3 rounded-2xl bg-surface p-2 pr-4 text-left disabled:opacity-50"
                  >
                    {pick === m.id && <motion.span layoutId="join-ring" className="absolute inset-0 rounded-2xl border-2 border-accent" transition={spring} />}
                    <Avatar name={m.name} color={m.color} image={m.image} />
                    <span className="relative flex-1 font-medium">{m.name}</span>
                    {m.claimed ? (
                      <span className="text-xs text-muted">{t.taken}</span>
                    ) : (
                      pick === m.id && (
                        <motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 500, damping: 18 }}>
                          <Check size={20} weight="bold" className="text-accent" />
                        </motion.span>
                      )
                    )}
                  </motion.button>
                ))}
                <button
                  role="radio"
                  aria-checked={pick === "new"}
                  onClick={() => setPick("new")}
                  className={`flex items-center gap-3 rounded-2xl border-2 border-dashed p-3 text-left transition-colors ${pick === "new" ? "border-accent bg-accent-soft text-accent-ink" : "border-line text-muted"}`}
                >
                  <UserPlus size={24} weight="duotone" />
                  <span className="font-medium">{t.imNew}</span>
                </button>
                <AnimatePresence initial={false}>
                  {pick === "new" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="flex flex-col gap-2 pt-1">
                        <Field
                          label={t.yourName}
                          value={newName}
                          placeholder={session.data && !isGuest ? session.data.user.name : ""}
                          onChange={(e) => setNewName(e.target.value)}
                          maxLength={30}
                          autoFocus
                        />
                        <p className="text-xs text-muted">{t.requestHelp}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {join.isError && (
                <p role="alert" className="text-center text-sm text-neg">
                  {errorCode === "too_many_requests" ? t.tooManyAttempts : errorCode === "member_taken" ? t.memberTaken : errorCode === "trip_full" ? t.tripFull : t.genericError}
                </p>
              )}
              <div className="mt-auto flex flex-col gap-3">
                <Button
                  disabled={!pick || (pick === "new" && !newName.trim() && !(session.data && !isGuest))}
                  loading={join.isPending}
                  onClick={() => join.mutate()}
                >
                  {pick === "new" ? t.requestJoin : pickedName ? t.joinAs.replace("{name}", pickedName) : t.join}
                </Button>
                {!session.data && (
                  <p className="text-center text-sm text-muted">
                    {t.guestNote}{" "}
                    <Link to={`/login?next=${encodeURIComponent(`/join/${code}`)}`} className="font-medium text-accent-ink">
                      {t.haveAccountSignIn}
                    </Link>
                  </p>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </main>
  );
}

function RequestState({ rejected, name }: { rejected: boolean; name: string }) {
  const t = useT();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={spring} className="flex flex-col items-center gap-3 rounded-3xl bg-surface px-6 py-10 text-center">
      {rejected ? (
        <XCircle size={48} weight="duotone" className="text-neg" />
      ) : (
        <motion.span animate={{ rotate: [0, 180, 180, 360] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="text-accent-ink">
          <HourglassMedium size={48} weight="duotone" />
        </motion.span>
      )}
      <h1 className="text-xl font-semibold">{rejected ? t.requestRejectedTitle : t.requestPendingTitle}</h1>
      <p className="max-w-[34ch] text-sm text-muted">{(rejected ? t.requestRejectedBody : t.requestPendingBody).replace("{name}", name)}</p>
    </motion.div>
  );
}
