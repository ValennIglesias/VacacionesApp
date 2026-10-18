import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft, Check, UserPlus } from "@phosphor-icons/react";
import { api, ApiError } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { countryName } from "../lib/format";

import { Avatar, Button, Skeleton, Flag, spring } from "../components/ui";

type JoinPreview = {
  trip: { id: string; name: string; countryCode: string; city: string | null };
  members: { id: string; name: string; color: number; claimed: boolean; image: string | null }[];
  alreadyMember: boolean;
};

export function Join() {
  const t = useT();
  const locale = useLocale();
  const nav = useNavigate();
  const qc = useQueryClient();
  const params = useParams();
  const [input, setInput] = useState(params.code ?? "");
  const code = params.code?.toUpperCase();
  const [pick, setPick] = useState<string | "new" | null>(null);

  const preview = useQuery({ queryKey: ["join", code], queryFn: () => api<JoinPreview>(`/join/${code}`), enabled: !!code, retry: false });
  const join = useMutation({
    mutationFn: () => api<{ id: string }>(`/join/${code}`, { body: pick === "new" ? {} : { memberId: pick } }),
    onSuccess: ({ id }) => {
      qc.invalidateQueries({ queryKey: ["trips"] });
      nav(`/t/${id}`, { replace: true });
    },
    onError: () => preview.refetch(),
  });

  if (preview.data?.alreadyMember) return <Navigate to={`/t/${preview.data.trip.id}`} replace />;

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <Link to="/" className="inline-flex size-11 items-center justify-center rounded-full bg-surface" aria-label={t.back}>
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
      ) : preview.isPending ? (
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
          </div>
          {join.isError && <p className="text-center text-sm text-neg">{t.genericError}</p>}
          <Button className="mt-auto" disabled={!pick} loading={join.isPending} onClick={() => join.mutate()}>
            {t.join}
          </Button>
        </motion.div>
      )}
    </main>
  );
}
