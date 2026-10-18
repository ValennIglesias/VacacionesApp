import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Plus, Ticket, SuitcaseRolling, CaretRight, SignOut } from "@phosphor-icons/react";
import { api, auth, type Trip } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { countryName } from "../lib/format";
import { ThemeToggle } from "../components/ThemeToggle";

import { Empty, Skeleton, Flag } from "../components/ui";

export function Home() {
  const t = useT();
  const locale = useLocale();
  const session = auth.useSession();
  const trips = useQuery({ queryKey: ["trips"], queryFn: () => api<Trip[]>("/trips") });

  return (
    <main className="mx-auto min-h-[100dvh] max-w-lg px-5 pb-16 pt-[max(2rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{session.data?.user.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{t.myTrips}</h1>
        </div>
        <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          onClick={() => auth.signOut().then(() => location.assign("/app/login"))}
          className="inline-flex size-11 items-center justify-center rounded-full text-muted active:scale-95"
          aria-label={t.logout}
        >
          <SignOut size={22} />
        </button>
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

      <section className="mt-8 flex flex-col gap-3">
        {trips.isPending && [0, 1].map((i) => <Skeleton key={i} className="h-20" />)}
        {trips.data?.length === 0 && <Empty icon={SuitcaseRolling} title={t.noTripsTitle} body={t.noTripsBody} />}
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
    </main>
  );
}
