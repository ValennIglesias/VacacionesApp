import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import confetti from "canvas-confetti";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Clock, Confetti } from "@phosphor-icons/react";
import { useTripCtx } from "./TripLayout";
import { api, type TransferRow } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { money } from "../lib/format";
import { convertCents } from "../../shared/settle";
import { Avatar, Button } from "../components/ui";
import { CopyButton } from "../components/bits";
import { TripEnded } from "../components/TripEnded";

export function SettlementView() {
  const t = useT();
  const locale = useLocale();
  const { settlementId } = useParams();
  const { data } = useTripCtx();
  const { trip, members, meId } = data;
  const s = data.settlements.find((x) => x.id === settlementId);
  const reduce = useReducedMotion();
  const allDone = !!s && s.transfers.length > 0 && s.transfers.every((x) => x.status === "confirmed");
  const wasDone = useRef(allDone);

  // confeti solo cuando pasa a "todo saldado" mientras se mira la pantalla
  useEffect(() => {
    if (allDone && !wasDone.current && !reduce) confetti({ particleCount: 140, spread: 80, origin: { y: 0.7 }, colors: ["#2f5bff", "#e2563d", "#0b8a5e", "#c98a12"] });
    wasDone.current = allDone;
  }, [allDone, reduce]);

  if (!s) return null;
  const member = (id: string) => members.find((m) => m.id === id)!;
  const settledTotal = data.expenses.filter((e) => e.settlementId === s.id).reduce((a, e) => a + e.amountTripCents, 0);
  const mine = s.transfers.filter((x) => x.fromMember === meId || x.toMember === meId);
  const others = s.transfers.filter((x) => !mine.includes(x));

  return (
    <div className="flex flex-col gap-5 pt-2">
      <div className="flex items-center gap-3">
        <Link to={`/t/${trip.id}/balances`} className="inline-flex size-10 items-center justify-center rounded-full bg-surface" aria-label={t.back}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-xl font-semibold">
            {s.kind === "final" ? t.settlementFinal : t.settlementPartial}
          </h2>
          <p className="text-sm text-muted">
            {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(s.createdAt)}
            {s.currency !== trip.currency && ` · 1 ${trip.currency} = ${s.rate.toPrecision(5)} ${s.currency}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-surface p-4">
          <p className="text-xs text-muted">{t.totalSplit} · {trip.currency}</p>
          <p className="mt-1 text-xl font-semibold tabular">{money(settledTotal, trip.currency, locale)}</p>
        </div>
        {s.currency !== trip.currency && (
          <div className="rounded-3xl bg-accent-soft p-4 text-accent-ink">
            <p className="text-xs">{t.totalSplit} · {s.currency}</p>
            <p className="mt-1 text-xl font-semibold tabular">{money(convertCents(settledTotal, s.rate, s.currency), s.currency, locale)}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {(allDone || s.transfers.length === 0) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 rounded-3xl bg-[rgba(11,138,94,0.12)] p-4 text-pos"
          >
            <Confetti size={28} weight="duotone" />
            <span className="font-semibold">{s.transfers.length === 0 ? t.noTransfers : t.allSettled}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="flex flex-col gap-3">
        {[...mine, ...others].map((x, i) => (
          <motion.li key={x.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <TransferCard tr={x} currency={s.currency} from={member(x.fromMember)} to={member(x.toMember)} />
          </motion.li>
        ))}
      </ul>

      {s.kind === "final" && <TripEnded tripId={trip.id} />}
    </div>
  );
}

function TransferCard({ tr, currency, from, to }: { tr: TransferRow; currency: string; from: ReturnType<typeof useTripCtx>["data"]["members"][number]; to: ReturnType<typeof useTripCtx>["data"]["members"][number] }) {
  const t = useT();
  const locale = useLocale();
  const qc = useQueryClient();
  const { data } = useTripCtx();
  const { trip, meId } = data;
  const iOwe = from.id === meId;
  const iReceive = to.id === meId;
  // cada uno actúa solo sobre lo propio: el deudor marca "pagué", el acreedor confirma; el resto solo ve el estado
  const showPay = tr.status === "pending" && iOwe;
  const showConfirm = tr.status !== "confirmed" && iReceive;

  const act = useMutation({
    mutationFn: (action: "paid" | "confirm") => api(`/trips/${trip.id}/transfers/${tr.id}/${action}`, { method: "POST" }),
    onSuccess: () => {
      navigator.vibrate?.(15);
      qc.invalidateQueries({ queryKey: ["trip", trip.id] });
    },
  });

  const status = {
    pending: { icon: Clock, label: t.statusPending, cls: "bg-surface-2 text-muted" },
    paid: { icon: Check, label: t.statusPaid, cls: "bg-accent-soft text-accent-ink" },
    confirmed: { icon: CheckCircle, label: t.statusConfirmed, cls: "bg-[rgba(11,138,94,0.12)] text-pos" },
  }[tr.status];

  return (
    <div className={`flex flex-col gap-4 rounded-3xl bg-surface p-4 ${iOwe && tr.status === "pending" ? "ring-2 ring-accent" : ""}`}>
      {(iOwe || iReceive) && <p className="text-sm font-medium text-muted">{iOwe ? t.toPay : t.toReceive}</p>}
      <div className="flex items-center gap-2">
        <Avatar name={from.name} color={from.color} image={from.image} size={36} />
        <ArrowRight size={16} className="text-muted" />
        <Avatar name={to.name} color={to.color} image={to.image} size={36} />
        <div className="ml-1 min-w-0 flex-1">
          <p className="truncate text-sm">
            <b>{from.id === meId ? t.you : from.name}</b> → <b>{to.id === meId ? t.you : to.name}</b>
          </p>
          {currency !== trip.currency && (
            <p className="text-xs text-muted tabular">
              {t.equivalentLocal} {money(tr.localCents, trip.currency, locale)}
            </p>
          )}
        </div>
        <span className="text-lg font-semibold tabular">{money(tr.amountCents, currency, locale)}</span>
      </div>

      {/* alias solo para quien tiene que pagar (o en nombre de alguien sin cuenta) */}
      {showPay && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-2 p-3">
          <div className="min-w-0">
            <p className="text-xs text-muted">
              {t.aliasOf} {to.name}
            </p>
            <p className="truncate font-medium">{to.alias || <span className="text-muted">{t.noAlias}</span>}</p>
          </div>
          {to.alias && <CopyButton text={to.alias} />}
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex min-w-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.cls}`}>
          <status.icon size={14} weight="bold" /> {status.label}
        </span>
        <AnimatePresence mode="wait">
          {showPay && (
            <motion.div key="pay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Button className="h-10 px-5 text-sm" loading={act.isPending} onClick={() => act.mutate("paid")}>
                {t.iPaid}
              </Button>
            </motion.div>
          )}
          {showConfirm && (
            <motion.div key="confirm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Button variant={tr.status === "paid" ? "primary" : "soft"} className="h-10 px-5 text-sm" loading={act.isPending} onClick={() => act.mutate("confirm")}>
                {t.confirmReceived}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
