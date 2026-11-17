import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Receipt, LockSimple, ArrowRight, HandCoins, ClockCountdown } from "@phosphor-icons/react";
import { useTripCtx } from "./TripLayout";
import { useLocale, useT } from "../lib/i18n";
import { formatDay, money, tripTiming } from "../lib/format";
import { CATEGORIES, type Category } from "../../shared/data";
import { computeBalances } from "../../shared/settle";
import { CategoryIcon, CATEGORY_META, Empty } from "../components/ui";
import { crossRate, useRates, type TripData } from "../lib/api";
import { AdSlot } from "../components/AdSlot";
import { TripEnded } from "../components/TripEnded";
import { TripTiming } from "../components/TripTiming";

export const pendingBalances = (data: TripData) =>
  computeBalances(
    data.members.map((m) => m.id),
    data.expenses.filter((e) => !e.settlementId),
  );

/** Día del viaje (1 = inicio); null = antes del viaje (pasajes, reservas). Sin fecha de inicio cuenta desde el primer gasto. */
export const dayNumber = (data: TripData, date: string) => {
  const start = data.trip.startDate ?? data.expenses[0]?.date ?? date;
  const n = Math.round((Date.parse(date) - Date.parse(start)) / 86_400_000) + 1;
  return n >= 1 ? n : null;
};
const PRE = "pre";

export function Expenses() {
  const t = useT();
  const locale = useLocale();
  const { data, openExpense } = useTripCtx();
  const { trip, members, expenses, meId, settlements } = data;
  const [filter, setFilter] = useState<Category | null>(null);
  const memberName = (id: string) => (id === meId ? t.you : (members.find((m) => m.id === id)?.name ?? "?"));

  const total = expenses.reduce((a, e) => a + e.amountTripCents, 0);
  const totalText = money(total, trip.currency, locale);
  const rates = useRates();
  const settleK = crossRate(rates.data, trip.currency, trip.settleCurrency) ?? 1;
  // promedio por día: días transcurridos del viaje (en curso) o el total (terminado)
  const timing = tripTiming(trip.startDate, trip.endDate);
  const daysSoFar = timing?.phase === "ongoing" ? timing.day : timing?.phase === "past" ? timing.total : null;
  // sin los gastos previos (pasajes, reservas): inflarían el promedio de los primeros días
  const duringTrip = expenses.filter((e) => dayNumber(data, e.date) !== null).reduce((a, e) => a + e.amountTripCents, 0);
  const perDay = daysSoFar && duringTrip > 0 ? t.perDay.replace("{amount}", money(Math.round(duringTrip / daysSoFar), trip.currency, locale)) : undefined;
  const myBalance = useMemo(() => pendingBalances(data).get(meId) ?? 0, [data, meId]);
  const myDebt = settlements.flatMap((s) => s.transfers.map((tr) => ({ ...tr, s }))).find((tr) => tr.fromMember === meId && tr.status === "pending");

  const usedCats = CATEGORIES.filter((c) => expenses.some((e) => e.category === c));
  const shown = expenses.filter((e) => !filter || e.category === filter);
  const byDay = useMemo(() => {
    const map = new Map<string, typeof shown>();
    // los gastos previos al inicio van todos juntos en "Antes del viaje"
    for (const e of [...shown].reverse()) {
      const key = dayNumber(data, e.date) === null ? PRE : e.date;
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return [...map];
  }, [shown]);

  return (
    <div className="flex flex-col gap-5 pt-2">
      {trip.status === "closed" && <TripEnded tripId={trip.id} deleteAt={data.deleteAt} solo={trip.solo} />}
      {trip.status === "active" && data.deleteAt && (
        <div role="status" className="flex items-start gap-3 rounded-3xl bg-[color-mix(in_srgb,var(--neg)_10%,transparent)] p-4">
          <ClockCountdown size={24} weight="duotone" className="shrink-0 text-neg" />
          <p className="text-sm">
            <span className="block font-semibold text-neg">{t.inactiveTitle.replace("{date}", formatDay(new Date(data.deleteAt).toISOString().slice(0, 10), locale))}</span>
            <span className="text-muted">{t.inactiveBody}</span>
          </p>
        </div>
      )}
      {/* resumen */}
      <section className="relative overflow-hidden rounded-3xl bg-accent p-5 text-white">
        <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-white/[0.06]" />
        <div className="pointer-events-none absolute -bottom-20 right-16 size-40 rounded-full bg-white/5" />
        <p className="text-sm text-white">{t.tripTotal}</p>
        {/* montos largos (millones de pesos) achican la letra para no salirse de la tarjeta */}
        <motion.p
          key={total}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-1 break-words font-semibold tracking-tight tabular ${totalText.length > 18 ? "text-2xl" : totalText.length > 14 ? "text-3xl" : "text-4xl"}`}
        >
          {totalText}
        </motion.p>
        {settleK !== 1 && total > 0 && (
          <p className="mt-0.5 text-sm text-white tabular">
            ≈ {money(Math.round(total * settleK), trip.settleCurrency, locale)}
          </p>
        )}
        <TripTiming start={trip.startDate} end={trip.endDate} extra={perDay} />
        {!trip.solo && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-black/15 px-4 py-3">
          <span className="text-sm text-white">{myBalance === 0 ? t.settledUp : myBalance > 0 ? t.theyOweYou : t.youOwe}</span>
          {myBalance !== 0 && (
            <span className="text-right tabular">
              <span className="block font-semibold">{money(Math.abs(myBalance), trip.currency, locale)}</span>
              {settleK !== 1 && <span className="block text-xs text-white">≈ {money(Math.round(Math.abs(myBalance) * settleK), trip.settleCurrency, locale)}</span>}
            </span>
          )}
        </div>
        )}
      </section>

      {myDebt && (
        <Link to={`/t/${trip.id}/s/${myDebt.s.id}`} className="flex items-center gap-3 rounded-3xl bg-surface p-4 lift">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[rgba(214,52,58,0.12)] text-neg">
            <HandCoins size={24} weight="duotone" />
          </span>
          <div className="flex-1">
            <p className="text-sm text-muted">{t.toPay}</p>
            <p className="font-semibold tabular">
              {money(myDebt.amountCents, myDebt.s.currency, locale)} · {memberName(myDebt.toMember)}
            </p>
          </div>
          <ArrowRight size={20} className="text-muted" />
        </Link>
      )}

      {/* con mouse no hay gesto para desplazar en horizontal: los chips bajan de línea en vez de quedar cortados */}
      {usedCats.length > 1 && (
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1 pointer-fine:flex-wrap">
          <FilterChip on={!filter} onClick={() => setFilter(null)} label={t.all} />
          {usedCats.map((c) => (
            <FilterChip key={c} on={filter === c} onClick={() => setFilter(filter === c ? null : c)} label={t.categories[c]} color={CATEGORY_META[c].color} />
          ))}
        </div>
      )}

      {expenses.length === 0 ? (
        <Empty icon={Receipt} title={t.noExpensesTitle} body={trip.solo ? t.noExpensesBodySolo : t.noExpensesBody} />
      ) : (
        <div className="flex flex-col gap-6">
          {byDay.map(([date, list]) => (
            <section key={date}>
              <h2 className="mb-2 flex items-baseline justify-between px-1">
                <span className="font-semibold">
                  {date === PRE ? (
                    t.beforeTrip
                  ) : (
                    <>
                      {t.day} {dayNumber(data, date)} <span className="font-normal capitalize text-muted">· {formatDay(date, locale)}</span>
                    </>
                  )}
                </span>
                <span className="text-sm text-muted tabular">{money(list.reduce((a, e) => a + e.amountTripCents, 0), trip.currency, locale)}</span>
              </h2>
              <ul className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                  {list.map((e) => (
                    <motion.li key={e.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                      <button
                        onClick={() => openExpense(e)}
                        className="flex w-full items-center gap-3 rounded-3xl bg-surface p-3 text-left lift"
                      >
                        <CategoryIcon category={e.category} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{e.description}</p>
                          <p className="truncate text-xs text-muted">
                            {trip.solo
                              ? t.categories[e.category]
                              : `${e.paidBy === meId ? t.youPaid : `${t.paidBy} ${memberName(e.paidBy)}`} · ${e.shares.length === members.length ? t.all.toLowerCase() : `${e.shares.length} ${t.people}`}`}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="whitespace-nowrap font-semibold tabular">{money(e.amountTripCents, trip.currency, locale)}</p>
                          {e.currency !== trip.currency ? (
                            <p className="text-xs text-muted tabular">{money(e.amountCents, e.currency, locale)}</p>
                          ) : e.settlementId ? (
                            <p className="inline-flex items-center gap-1 text-xs text-muted">
                              <LockSimple size={12} /> {t.settled}
                            </p>
                          ) : null}
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          ))}
        </div>
      )}
      {expenses.length > 0 && <AdSlot slot="trip" />}
    </div>
  );
}

function FilterChip({ on, onClick, label, color }: { on: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`lift relative h-9 shrink-0 rounded-full px-4 text-sm font-medium before:absolute before:inset-x-0 before:-inset-y-1 before:content-[""] ${on ? "bg-ink text-bg" : "bg-surface text-muted hover:text-ink"}`}
    >
      {color && <span className="mr-1.5 inline-block size-2 rounded-full align-middle" style={{ background: color }} />}
      {label}
    </button>
  );
}
