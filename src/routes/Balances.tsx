import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowRight, CalendarCheck, FlagCheckered, CaretRight, CheckCircle, Warning } from "@phosphor-icons/react";
import { useTripCtx } from "./TripLayout";
import { pendingBalances } from "./Expenses";
import { api, crossRate, useRates, type ArsType } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { money } from "../lib/format";
import { convertCents, minTransfers } from "../../shared/settle";
import { Avatar, Button, Sheet } from "../components/ui";
import { ArsRatePills, CurrencySelect } from "../components/bits";

export function Balances() {
  const t = useT();
  const locale = useLocale();
  const { data } = useTripCtx();
  const { trip, members, meId, settlements, expenses } = data;
  const balances = useMemo(() => pendingBalances(data), [data]);
  const hasPending = expenses.some((e) => !e.settlementId);
  const [kind, setKind] = useState<"partial" | "final" | null>(null);
  const max = Math.max(1, ...[...balances.values()].map(Math.abs));
  const rates = useRates();
  const settleK = crossRate(rates.data, trip.currency, trip.settleCurrency) ?? 1;
  // quién le paga a quién con lo pendiente: lo central, visible sin tener que abrir "Repartir"
  const transfers = useMemo(() => minTransfers(balances), [balances]);
  const who = (id: string) => (id === meId ? t.you : (members.find((m) => m.id === id)?.name ?? "?"));
  if (trip.solo) return <Navigate to={`/t/${trip.id}`} replace />;

  return (
    <div className="flex flex-col gap-6 pt-2">
      <section>
        <h2 className="text-xl font-semibold">{t.pendingBalances}</h2>
        <p className="text-sm text-muted">{t.pendingHelp}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {members.map((m, i) => {
            const v = balances.get(m.id) ?? 0;
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="relative flex items-center gap-3 overflow-hidden rounded-3xl bg-surface p-3"
              >
                {/* barra proporcional al saldo, sin pista de fondo */}
                <motion.span
                  className="absolute inset-y-0 left-0 opacity-[0.08]"
                  style={{ background: v >= 0 ? "var(--pos)" : "var(--neg)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(Math.abs(v) / max) * 100}%` }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.04 }}
                />
                <Avatar name={m.name} color={m.color} image={m.image} />
                <span className="relative flex-1 font-medium">{m.id === meId ? t.you : m.name}</span>
                <span className="relative text-right tabular">
                  <span className={`block font-semibold ${v > 0 ? "text-pos" : v < 0 ? "text-neg" : "text-muted"}`}>
                    {v > 0 ? "+" : v < 0 ? "−" : ""}
                    {money(Math.abs(v), trip.currency, locale)}
                  </span>
                  {settleK !== 1 && v !== 0 && <span className="block text-xs text-muted">≈ {money(Math.round(Math.abs(v) * settleK), trip.settleCurrency, locale)}</span>}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {transfers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">{t.transfersPreview}</h2>
          <ul className="mt-3 flex flex-col divide-y divide-line rounded-3xl bg-surface px-4">
            {transfers.map((x) => (
              <li key={x.from + x.to} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1 truncate">
                  {who(x.from)} → {who(x.to)}
                </span>
                <span className="font-semibold tabular">{money(x.cents, trip.currency, locale)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {trip.status === "active" && (
        <section className="grid grid-cols-2 gap-3">
          <button
            disabled={!hasPending}
            onClick={() => setKind("partial")}
            className="flex flex-col gap-5 rounded-3xl bg-surface p-4 text-left lift disabled:opacity-50"
          >
            <CalendarCheck size={28} weight="duotone" className="text-accent-ink" />
            <span className="font-medium">{t.settlePartial}</span>
          </button>
          {/* mismo peso que "Repartir hasta hoy": cerrar el viaje no tiene que ser lo que más llama la atención */}
          <button onClick={() => setKind("final")} className="flex flex-col gap-5 rounded-3xl bg-surface p-4 text-left lift">
            <FlagCheckered size={28} weight="duotone" className="text-accent-ink" />
            <span className="font-medium">{t.settleFinal}</span>
          </button>
          {!hasPending && <p className="col-span-2 text-center text-sm text-muted">{t.nothingPending}</p>}
        </section>
      )}

      {settlements.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">{t.history}</h2>
          <ul className="flex flex-col gap-2">
            {[...settlements].reverse().map((s) => {
              const done = s.transfers.every((x) => x.status === "confirmed");
              return (
                <li key={s.id}>
                  <Link to={`/t/${trip.id}/s/${s.id}`} className="flex items-center gap-3 rounded-3xl bg-surface p-4 lift">
                    <span className={`inline-flex size-11 items-center justify-center rounded-2xl ${done ? "bg-[rgba(11,138,94,0.12)] text-pos" : "bg-accent-soft text-accent-ink"}`}>
                      {done ? <CheckCircle size={24} weight="duotone" /> : s.kind === "final" ? <FlagCheckered size={24} weight="duotone" /> : <CalendarCheck size={24} weight="duotone" />}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">
                        {s.kind === "final" ? t.final : t.partial} · {new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(s.createdAt)}
                      </p>
                      <p className="text-sm text-muted">
                        {s.transfers.filter((x) => x.status === "confirmed").length}/{s.transfers.length} · {s.currency}
                      </p>
                    </div>
                    <CaretRight size={18} className="text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <SettleSheet kind={kind} onClose={() => setKind(null)} balances={balances} />
    </div>
  );
}

function SettleSheet({ kind, onClose, balances }: { kind: "partial" | "final" | null; onClose: () => void; balances: Map<string, number> }) {
  const t = useT();
  return (
    <Sheet open={!!kind} onClose={onClose} title={kind === "final" ? t.settleFinal : t.settlePartial}>
      {kind && <SettleForm kind={kind} balances={balances} onClose={onClose} />}
    </Sheet>
  );
}

function SettleForm({ kind, balances, onClose }: { kind: "partial" | "final"; balances: Map<string, number>; onClose: () => void }) {
  const t = useT();
  const locale = useLocale();
  const nav = useNavigate();
  const qc = useQueryClient();
  const { data } = useTripCtx();
  const { trip, members } = data;
  const rates = useRates();
  const [currency, setCurrency] = useState(trip.settleCurrency);
  const [manualRate, setManualRate] = useState("");
  const [arsType, setArsType] = useState<ArsType | null>(null);
  const autoRate = crossRate(rates.data, trip.currency, currency);
  const rate = currency === trip.currency ? 1 : Number(manualRate.replace(",", ".")) || autoRate;
  const name = (id: string) => members.find((m) => m.id === id)!;
  const label = (id: string) => (id === data.meId ? t.you : name(id).name);
  // al finalizar: pagos de repartidas anteriores que todavía no se saldaron (no bloquea: se pueden marcar con el viaje cerrado)
  const unsettled = kind === "final" ? data.settlements.flatMap((st) => st.transfers.filter((x) => x.status !== "confirmed").map((x) => ({ ...x, currency: st.currency }))) : [];
  const pendingTotal = data.expenses.filter((e) => !e.settlementId).reduce((a, e) => a + e.amountTripCents, 0);
  const preview = rate ? minTransfers(balances).map((x) => ({ ...x, amount: convertCents(x.cents, rate, currency) })).filter((x) => x.amount > 0) : [];

  const settle = useMutation({
    mutationFn: () => api<{ id: string }>(`/trips/${trip.id}/settle`, { body: { kind, currency, rate } }),
    onSuccess: async ({ id }) => {
      await qc.invalidateQueries({ queryKey: ["trip", trip.id] });
      onClose();
      nav(`/t/${trip.id}/s/${id}`);
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted">{kind === "final" ? t.settleFinalBody : t.settlePartialBody}</p>
      {unsettled.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="alert" className="rounded-2xl border border-[color-mix(in_srgb,var(--neg)_35%,transparent)] bg-[color-mix(in_srgb,var(--neg)_10%,transparent)] p-4">
          <p className="flex items-center gap-2 font-semibold text-neg">
            <Warning size={20} weight="duotone" /> {unsettled.length === 1 ? t.unsettledTitleOne : t.unsettledTitle.replace("{n}", String(unsettled.length))}
          </p>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm">
            {unsettled.map((x) => (
              <li key={x.id} className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate">
                  {label(x.fromMember)} → {label(x.toMember)}
                </span>
                <span className="shrink-0 text-muted">
                  <span className="tabular">{money(x.amountCents, x.currency, locale)}</span> · {x.status === "paid" ? t.unsettledNotConfirmed : t.unsettledNotPaid}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">{t.unsettledHelp}</p>
        </motion.div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="pay-cur" className="text-sm font-medium text-muted">
          {t.payIn}
        </label>
        <CurrencySelect id="pay-cur" value={currency} onChange={(c) => (setCurrency(c), setManualRate(""), setArsType(null))} />
        <ArsRatePills
          from={trip.currency}
          to={currency}
          value={arsType}
          onPick={(k, r) => (setArsType(k), setManualRate(r ? r.toPrecision(5) : ""))}
          className="-mx-5 px-5"
        />
        {currency !== trip.currency && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>1 {trip.currency} =</span>
            <input
              inputMode="decimal"
              aria-label={t.rate}
              value={manualRate || (autoRate ? autoRate.toPrecision(5) : "")}
              onChange={(e) => (setManualRate(e.target.value.replace(/[^\d.,]/g, "")), setArsType(null))}
              className="h-9 w-28 rounded-xl border border-line bg-surface text-center tabular text-ink outline-none focus:border-accent"
            />
            <span>{currency}</span>
          </div>
        )}
        {currency !== trip.currency && <p className="text-xs text-muted">{t.rateHelp}</p>}
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-accent-soft px-4 py-3 text-accent-ink">
        <span className="text-sm font-medium">{t.totalToSplit}</span>
        <span className="text-right tabular">
          <span className="block font-semibold">{money(pendingTotal, trip.currency, locale)}</span>
          {rate && currency !== trip.currency && <span className="block text-xs">{money(convertCents(pendingTotal, rate, currency), currency, locale)}</span>}
        </span>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-muted">{t.transfersPreview}</h3>
        {preview.length === 0 ? (
          <p className="rounded-2xl bg-surface-2 p-4 text-center text-sm">{t.noTransfers}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {preview.map((x, i) => (
              <motion.li key={x.from + x.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2 rounded-2xl bg-surface-2 p-3">
                <Avatar name={name(x.from).name} color={name(x.from).color} image={name(x.from).image} size={32} />
                <ArrowRight size={16} className="text-muted" />
                <Avatar name={name(x.to).name} color={name(x.to).color} image={name(x.to).image} size={32} />
                <span className="flex-1 truncate text-sm">
                  {label(x.from)} → {label(x.to)}
                </span>
                <span className="text-right tabular">
                  <span className="block font-semibold">{money(x.amount, currency, locale)}</span>
                  {currency !== trip.currency && <span className="block text-xs text-muted">{money(x.cents, trip.currency, locale)}</span>}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {settle.isError && <p className="text-center text-sm text-neg">{t.genericError}</p>}
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onClose} className="flex-1">
          {t.cancel}
        </Button>
        <Button className="flex-1" disabled={!rate} loading={settle.isPending} onClick={() => settle.mutate()}>
          {t.confirm}
        </Button>
      </div>
    </div>
  );
}
