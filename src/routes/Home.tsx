import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Plus, Ticket, SuitcaseRolling, CaretRight, SignOut, FloppyDisk, Sparkle } from "@phosphor-icons/react";
import { api, auth, useIsGuest, type Trip } from "../lib/api";
import { useI18n, useLocale, useT } from "../lib/i18n";
import { countryName, today, tripTiming } from "../lib/format";
import { timingLabel } from "../components/TripTiming";
import { ThemeToggle } from "../components/ThemeToggle";
import { ConfirmSheet } from "../components/bits";

import { Button, Empty, Skeleton, Flag } from "../components/ui";

export function Home() {
  const t = useT();
  const locale = useLocale();
  const session = auth.useSession();
  const trips = useQuery({ queryKey: ["trips"], queryFn: () => api<Trip[]>("/trips") });
  const isGuest = useIsGuest();
  const timingOf = (trip: Trip) => {
    const x = tripTiming(trip.startDate, trip.endDate);
    return x && timingLabel(t, x);
  };
  const requests = useQuery({
    queryKey: ["join-requests"],
    queryFn: () => api<{ id: string; status: "pending" | "rejected"; tripName: string; countryCode: string; code: string }[]>("/join-requests"),
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const nav = useNavigate();
  const { lang } = useI18n();
  const demo = useMutation({
    mutationFn: () => api<{ id: string }>("/demo", { body: { lang, today: today() } }),
    onSuccess: ({ id }) => nav(`/t/${id}`),
  });
  const deleteAccount = useMutation({
    mutationFn: () => api("/account", { method: "DELETE" }),
    onSuccess: () => location.assign("/"),
  });

  return (
    <main className="mx-auto min-h-[100dvh] max-w-lg px-5 pb-16 pt-[max(2rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{session.data?.user.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{t.myTrips}</h1>
        </div>
        <div className="flex items-center gap-1">
        <ThemeToggle />
        {/* un invitado que cierra sesión pierde el acceso: para él está "Guardar mi acceso" */}
        {!isGuest && <button
          onClick={() => auth.signOut().then(() => location.assign("/app/login"))}
          className="inline-flex size-11 items-center justify-center rounded-full text-muted active:scale-95"
          aria-label={t.logout}
        >
          <SignOut size={22} />
        </button>}
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link to="/new" className="flex flex-col gap-6 rounded-3xl bg-accent p-4 text-white transition-transform active:scale-[0.98]">
          <Plus size={28} weight="bold" />
          <span className="font-medium">{t.newTrip}</span>
        </Link>
        <Link to="/join" className="flex flex-col gap-6 rounded-3xl bg-surface p-4 transition-transform active:scale-[0.98]">
          <Ticket size={28} weight="duotone" className="text-accent-ink" />
          <span className="font-medium">{t.joinTrip}</span>
        </Link>
      </div>
      {!!trips.data?.length && (
        <button type="button" onClick={() => demo.mutate()} disabled={demo.isPending} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink disabled:opacity-50">
          <Sparkle size={16} weight="duotone" /> {t.tryDemo}
        </button>
      )}

      {isGuest && (
        <Link to="/login?save=1" className="mt-6 flex items-center gap-3 rounded-3xl bg-accent-soft p-4 text-accent-ink transition-transform active:scale-[0.98]">
          <FloppyDisk size={28} weight="duotone" className="shrink-0" />
          <span className="flex-1">
            <span className="block font-semibold">{t.guestBannerTitle}</span>
            <span className="block text-sm opacity-80">{t.guestBannerBody}</span>
          </span>
          <CaretRight size={18} />
        </Link>
      )}

      {!!requests.data?.length && (
        <section className="mt-8 flex flex-col gap-2">
          <h2 className="px-1 text-sm font-medium text-muted">{t.myRequests}</h2>
          {requests.data.map((r) => (
            <Link key={r.id} to={`/join/${r.code}`} className="flex items-center gap-4 rounded-3xl bg-surface p-4">
              <Flag cc={r.countryCode} size={36} />
              <span className="min-w-0 flex-1 truncate font-medium">{r.tripName}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${r.status === "pending" ? "bg-accent-soft text-accent-ink" : "bg-surface-2 text-neg"}`}>
                {r.status === "pending" ? t.requestPendingShort : t.requestRejectedShort}
              </span>
            </Link>
          ))}
        </section>
      )}

      <section className="mt-8 flex flex-col gap-3">
        {trips.isPending && [0, 1].map((i) => <Skeleton key={i} className="h-20" />)}
        {trips.data?.length === 0 && (
          <Empty icon={SuitcaseRolling} title={t.noTripsTitle} body={t.noTripsBody}>
            <Button variant="soft" loading={demo.isPending} onClick={() => demo.mutate()}>
              <Sparkle size={20} weight="duotone" /> {t.tryDemo}
            </Button>
          </Empty>
        )}
        {trips.data?.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={`/t/${trip.id}`} className="flex items-center gap-4 rounded-3xl bg-surface p-4 transition-transform active:scale-[0.98]">
<Flag cc={trip.countryCode} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{trip.name}</p>
                <p className="truncate text-sm text-muted">
                  {[trip.city, countryName(trip.countryCode, locale)].filter(Boolean).join(", ")}
                </p>
                {trip.status === "active" && timingOf(trip) && <p className="truncate text-xs font-medium text-accent-ink">{timingOf(trip)}</p>}
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${trip.status === "active" ? "bg-accent-soft text-accent-ink" : "bg-surface-2 text-muted"}`}
              >
                {trip.status === "active" ? t.active : t.closed}
              </span>
              <CaretRight size={18} className="text-muted" />
            </Link>
          </motion.div>
        ))}
      </section>
      <button type="button" onClick={() => (deleteAccount.reset(), setConfirmDelete(true))} className="mx-auto mt-16 block text-sm text-muted underline-offset-4 hover:underline">
        {t.deleteAccount}
      </button>
      <ConfirmSheet
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title={t.deleteAccount}
        body={t.deleteAccountBody}
        confirmLabel={t.deleteAccountConfirm}
        loading={deleteAccount.isPending}
        error={deleteAccount.isError ? t.genericError : undefined}
        onConfirm={() => deleteAccount.mutate()}
      />
    </main>
  );
}
