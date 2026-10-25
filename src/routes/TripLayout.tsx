import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useOutletContext, useParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Receipt, Scales, ChartPieSlice, UsersThree, Plus, WifiSlash } from "@phosphor-icons/react";
import { useTrip, type Expense, type TripData } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { countryName } from "../lib/format";

import { Empty, Skeleton, spring, Flag } from "../components/ui";
import { ExpenseSheet } from "../components/ExpenseSheet";
import { ThemeToggle } from "../components/ThemeToggle";

type Ctx = { data: TripData; openExpense: (e?: Expense) => void };
export const useTripCtx = () => useOutletContext<Ctx>();

export function TripLayout() {
  const t = useT();
  const locale = useLocale();
  const { tripId } = useParams();
  const loc = useLocation();
  const q = useTrip(tripId!);
  const [sheet, setSheet] = useState<{ open: boolean; expense?: Expense }>({ open: false });

  if (q.isPending)
    return (
      <div className="mx-auto max-w-lg px-5 pt-8">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-6 h-36" />
        <Skeleton className="mt-4 h-16" />
        <Skeleton className="mt-3 h-16" />
      </div>
    );
  if (q.isError || !q.data) return <Empty icon={WifiSlash} title={t.genericError} body="" />;

  const { trip } = q.data;
  const base = `/t/${trip.id}`;
  const tabs = [
    { to: base, label: t.tabExpenses, icon: Receipt, end: true },
    { to: `${base}/balances`, label: t.tabBalances, icon: Scales },
    { to: `${base}/summary`, label: t.tabSummary, icon: ChartPieSlice },
    { to: `${base}/group`, label: t.tabGroup, icon: UsersThree, badge: q.data.requests.length },
  ];
  const showFab = trip.status === "active" && (loc.pathname.endsWith(trip.id) || loc.pathname.endsWith("/balances"));

  return (
    <div className="mx-auto min-h-[100dvh] max-w-lg pb-44">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-bg/85 px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-md">
        <Link to="/" className="inline-flex size-10 items-center justify-center rounded-full bg-surface" aria-label={t.back}>
          <ArrowLeft size={20} />
        </Link>
<Flag cc={trip.countryCode} size={36} />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold leading-tight">{trip.name}</h1>
          <p className="truncate text-xs text-muted">{[trip.city, countryName(trip.countryCode, locale)].filter(Boolean).join(", ")}</p>
        </div>
        <ThemeToggle />
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={loc.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-5"
        >
          <Outlet context={{ data: q.data, openExpense: (expense?: Expense) => setSheet({ open: true, expense }) } satisfies Ctx} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={spring}
            whileTap={{ scale: 0.92 }}
            onClick={() => setSheet({ open: true })}
            className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-[max(1.25rem,calc(50vw-14rem))] z-30 inline-flex size-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_14px_32px_-10px_rgba(47,91,255,0.85)]"
            aria-label={t.addExpense}
          >
            <Plus size={30} weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="mx-auto grid max-w-lg grid-cols-4">
          {tabs.map(({ to, label, icon: I, end, badge }) => (
            <NavLink key={to} to={to} end={end} className="relative flex flex-col items-center gap-1 py-2.5 text-xs font-medium">
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="tab-pill" className="absolute top-1.5 h-8 w-14 rounded-full bg-accent-soft" transition={spring} />}
                  <I size={24} weight={isActive ? "fill" : "regular"} className={`relative ${isActive ? "text-accent-ink" : "text-muted"}`} />
                  {!!badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={spring}
                      className="absolute right-[calc(50%-22px)] top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-neg px-1 text-[11px] font-semibold text-white"
                      aria-label={`${badge} ${t.joinRequests}`}
                    >
                      {badge}
                    </motion.span>
                  )}
                  <span className={isActive ? "text-ink" : "text-muted"}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <ExpenseSheet data={q.data} open={sheet.open} expense={sheet.expense} onClose={() => setSheet({ open: false })} />
    </div>
  );
}
