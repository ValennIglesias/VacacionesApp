import { useMemo, useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartPieSlice } from "@phosphor-icons/react";
import { useTripCtx } from "./TripLayout";
import { dayNumber } from "./Expenses";
import { crossRate, useRates } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { money, moneyShort } from "../lib/format";
import { CATEGORIES } from "../../shared/data";
import { Avatar, CATEGORY_META, Empty, Segmented } from "../components/ui";
import { AdSlot } from "../components/AdSlot";

export function Summary() {
  const t = useT();
  const locale = useLocale();
  const { data } = useTripCtx();
  const { trip, expenses, members, meId } = data;
  const rates = useRates();
  const [cur, setCur] = useState(trip.currency);
  // el resumen en otra moneda es aproximado: usa la cotización de hoy
  const k = crossRate(rates.data, trip.currency, cur) ?? 1;
  const cv = (cents: number) => Math.round(cents * k);
  const fmt = (cents: number) => money(cv(cents), cur, locale);

  const stats = useMemo(() => {
    const total = expenses.reduce((a, e) => a + e.amountTripCents, 0);
    const byCat = CATEGORIES.map((c) => ({ c, v: expenses.filter((e) => e.category === c).reduce((a, e) => a + e.amountTripCents, 0) })).filter((x) => x.v > 0);
    const days = new Map<string, number>();
    // "0000" ordena los gastos previos primero
    for (const e of expenses) {
      const key = dayNumber(data, e.date) === null ? "0000" : e.date;
      days.set(key, (days.get(key) ?? 0) + e.amountTripCents);
    }
    const byDay = [...days].sort(([a], [b]) => a.localeCompare(b)).map(([date, v]) => ({ label: date === "0000" ? t.beforeTripShort : `${t.day} ${dayNumber(data, date)}`, v }));
    const byPerson = members.map((m) => ({
      m,
      paid: expenses.filter((e) => e.paidBy === m.id).reduce((a, e) => a + e.amountTripCents, 0),
      consumed: expenses.flatMap((e) => e.shares).filter((s) => s.memberId === m.id).reduce((a, s) => a + s.shareCents, 0),
    }));
    return { total, byCat, byDay, byPerson };
  }, [expenses, members, data, t.day]);

  if (!expenses.length) return <Empty icon={ChartPieSlice} title={t.noExpensesTitle} body={t.noExpensesBody} />;

  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted">{t.tripTotal}</p>
          <p className="break-words text-3xl font-semibold tracking-tight tabular">{fmt(stats.total)}</p>
        </div>
        {trip.settleCurrency !== trip.currency && (
          <Segmented
            value={cur}
            onChange={setCur}
            options={[
              { value: trip.currency, label: trip.currency },
              { value: trip.settleCurrency, label: trip.settleCurrency },
            ]}
          />
        )}
      </div>
      {cur !== trip.currency && <p className="-mt-3 text-xs text-muted">{t.approx}</p>}

      <section className="rounded-3xl bg-surface p-4">
        <h2 className="font-semibold">{t.byCategory}</h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-48 w-48 shrink-0">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={stats.byCat} dataKey="v" nameKey="c" innerRadius="62%" outerRadius="100%" paddingAngle={2} stroke="var(--surface)" strokeWidth={2} cornerRadius={4}>
                  {stats.byCat.map((x) => (
                    <Cell key={x.c} fill={CATEGORY_META[x.c].color} />
                  ))}
                </Pie>
                <Tooltip content={<Tip render={(p) => `${t.categories[p.c as keyof typeof t.categories]}: ${fmt(p.v)}`} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* leyenda + tabla: la identidad nunca queda solo en el color */}
          <ul className="flex w-full flex-col gap-2">
            {[...stats.byCat].sort((a, b) => b.v - a.v).map((x) => {
              const { icon: I, color } = CATEGORY_META[x.c];
              return (
                <li key={x.c} className="flex items-center gap-2 text-sm">
                  <I size={18} weight="fill" className="shrink-0" style={{ color }} />
                  <span className="min-w-0 flex-1 truncate">{t.categories[x.c]}</span>
                  <span className="shrink-0 text-muted tabular">{Math.round((x.v / stats.total) * 100)}%</span>
                  <span className="shrink-0 whitespace-nowrap text-right font-medium tabular">{fmt(x.v)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {stats.byDay.length > 1 && (
        <section className="rounded-3xl bg-surface p-4">
          <h2 className="mb-3 font-semibold">{t.byDay}</h2>
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={stats.byDay.map((d) => ({ ...d, v: cv(d.v) }))} margin={{ left: -8, right: 4, top: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--line)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} width={56} tick={{ fill: "var(--muted)", fontSize: 11 }} tickFormatter={(v: number) => moneyShort(v, cur, locale)} />
                <Tooltip cursor={{ fill: "var(--surface-2)" }} content={<Tip render={(p) => `${p.label}: ${money(p.v, cur, locale)}`} />} />
                <Bar dataKey="v" fill="var(--color-accent)" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {!trip.solo && (
      <section className="rounded-3xl bg-surface p-4">
        {/* lista y no tabla: con montos largos, pagado y consumido van uno sobre otro y el nombre se recorta */}
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-semibold">{t.byPerson}</h2>
          <p className="text-right text-xs leading-tight text-muted">
            <span className="font-medium text-ink">{t.paid}</span>
            <br />
            {t.consumed}
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-sm">
          {stats.byPerson.map(({ m, paid, consumed }) => (
            <li key={m.id} className="flex items-center gap-2">
              <Avatar name={m.name} color={m.color} image={m.image} size={28} />
              <span className="min-w-0 flex-1 truncate">{m.id === meId ? t.you : m.name}</span>
              <span className="shrink-0 text-right leading-tight tabular">
                <span className="block font-medium">{fmt(paid)}</span>
                <span className="block text-xs text-muted">{fmt(consumed)}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      )}

      <AdSlot slot="summary" />
    </div>
  );
}

function Tip({ active, payload, render }: { active?: boolean; payload?: { payload: Record<string, never> }[]; render: (p: Record<string, never>) => string }) {
  if (!active || !payload?.length) return null;
  return <div className="rounded-xl border border-line bg-surface px-3 py-2 text-xs font-medium text-ink shadow-lg">{render(payload[0].payload)}</div>;
}
