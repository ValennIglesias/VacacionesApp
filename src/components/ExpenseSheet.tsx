import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { Check, Trash } from "@phosphor-icons/react";
import { api, crossRate, useRates, type Expense, type TripData } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";
import { money, parseAmount, today } from "../lib/format";
import { CATEGORIES, type Category } from "../../shared/data";
import { Avatar, Button, CATEGORY_META, Field, focusNoScroll, memberColor, Sheet, spring } from "./ui";
import { CurrencySelect } from "./bits";
import { DateField } from "./DatePicker";

type Props = { data: TripData; open: boolean; expense?: Expense; onClose: () => void };

export function ExpenseSheet({ data, open, expense, onClose }: Props) {
  const t = useT();
  return (
    <Sheet open={open} onClose={onClose} title={expense ? t.editExpense : t.addExpense}>
      {/* key: reinicia el formulario cada vez que se abre */}
      <ExpenseForm key={expense?.id ?? "new"} data={data} expense={expense} onDone={onClose} />
    </Sheet>
  );
}

function ExpenseForm({ data, expense, onDone }: { data: TripData; expense?: Expense; onDone: () => void }) {
  const t = useT();
  const locale = useLocale();
  const qc = useQueryClient();
  const { trip, members, meId } = data;
  const rates = useRates();
  const [amount, setAmount] = useState(expense ? String(expense.amountCents / 100).replace(".", locale.startsWith("es") ? "," : ".") : "");
  const [currency, setCurrency] = useState(expense?.currency ?? trip.currency);
  const [otherCur, setOtherCur] = useState(![trip.currency, trip.settleCurrency].includes(currency));
  const [manualRate, setManualRate] = useState(expense && expense.currency !== trip.currency ? String(expense.rate) : "");
  const [category, setCategory] = useState<Category>(expense?.category ?? "food");
  const [description, setDescription] = useState(expense?.description ?? "");
  const [paidBy, setPaidBy] = useState(expense?.paidBy ?? meId);
  const [participants, setParticipants] = useState<string[]>(expense?.shares.map((s) => s.memberId) ?? members.map((m) => m.id));
  const [date, setDate] = useState(expense?.date ?? today());
  const [confirmDel, setConfirmDel] = useState(false);

  const cents = parseAmount(amount);
  const autoRate = crossRate(rates.data, currency, trip.currency);
  const rate = currency === trip.currency ? 1 : Number(manualRate.replace(",", ".")) || autoRate;
  const valid = cents && rate && description.trim() && participants.length > 0;

  const done = () => {
    qc.invalidateQueries({ queryKey: ["trip", trip.id] });
    navigator.vibrate?.(12);
    onDone();
  };
  const save = useMutation({
    mutationFn: () =>
      api(`/trips/${trip.id}/expenses${expense ? `/${expense.id}` : ""}`, {
        method: expense ? "PUT" : "POST",
        body: { paidBy, description: description.trim(), category, date, amountCents: cents, currency, rate, participants },
      }),
    onSuccess: done,
  });
  const del = useMutation({ mutationFn: () => api(`/trips/${trip.id}/expenses/${expense!.id}`, { method: "DELETE" }), onSuccess: done });

  const curChips = [...new Set([trip.currency, trip.settleCurrency])];
  const allOn = participants.length === members.length;

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) save.mutate();
      }}
    >
      {/* monto */}
      <div className="flex flex-col items-center gap-3 rounded-3xl bg-surface-2 px-4 py-5">
        <label htmlFor="amount" className="sr-only">
          {t.amount}
        </label>
        <div className="flex w-full items-baseline justify-center gap-2">
          <span className="text-xl font-medium text-muted">{currency}</span>
          <input
            id="amount"
            inputMode="decimal"
            ref={expense ? undefined : focusNoScroll}
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="0"
            className={`w-full min-w-0 max-w-64 bg-transparent text-center font-semibold ${amount.length > 7 ? "text-3xl" : "text-5xl"} tracking-tight tabular outline-none placeholder:text-muted/40`}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[...curChips.map((c) => ({ key: c, label: c, on: currency === c && !otherCur })), { key: "other", label: t.otherCurrency, on: otherCur }].map((o) => (
            <motion.button
              key={o.key}
              type="button"
              whileTap={{ scale: 0.92 }}
              aria-pressed={o.on}
              onClick={() => {
                if (o.key === "other") return setOtherCur(true);
                setCurrency(o.key);
                setOtherCur(false);
                setManualRate("");
              }}
              className={`relative h-8 rounded-full bg-surface px-3 text-sm font-medium transition-colors duration-200 ${o.on ? "text-white" : "text-muted"}`}
            >
              {o.on && <motion.span layoutId="cur-pill" className="absolute inset-0 rounded-full bg-accent" transition={spring} />}
              <span className="relative">{o.label}</span>
            </motion.button>
          ))}
        </div>
        {otherCur && (
          <CurrencySelect
            label={t.currency}
            value={currency}
            onChange={(c) => {
              setCurrency(c);
              setManualRate("");
            }}
          />
        )}
        {currency !== trip.currency && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex w-full flex-col gap-1 text-sm">
            <div className="flex items-center justify-center gap-2 text-muted">
              <span>1 {currency} =</span>
              <input
                inputMode="decimal"
                aria-label={t.rate}
                value={manualRate || (autoRate ? autoRate.toPrecision(5) : "")}
                onChange={(e) => setManualRate(e.target.value.replace(/[^\d.,]/g, ""))}
                className="h-8 w-24 rounded-xl border border-line bg-surface text-center tabular text-ink outline-none focus:border-accent"
              />
              <span>{trip.currency}</span>
            </div>
            {cents && rate ? (
              <p className="text-center text-muted">
                {t.equals} <b className="text-ink">{money(Math.round(cents * rate), trip.currency, locale)}</b>
              </p>
            ) : null}
            <p className="text-center text-xs text-muted">{t.rateHelp}</p>
          </motion.div>
        )}
      </div>

      <Field label={t.description} placeholder={t.descriptionPh} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={80} required />

      {/* categoría */}
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-medium text-muted">{t.category}</legend>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((c) => {
            const { icon: I, color, bg } = CATEGORY_META[c];
            const on = category === c;
            return (
              <motion.button
                key={c}
                type="button"
                aria-pressed={on}
                whileTap={{ scale: 0.92 }}
                onClick={() => setCategory(c)}
                className="relative flex flex-col items-center gap-1 rounded-2xl px-1 py-2.5 text-[11px] font-medium"
                style={{ background: bg, color: on ? color : undefined }}
              >
                {on && <motion.span layoutId="cat-ring" className="absolute inset-0 rounded-2xl border-2" style={{ borderColor: color }} transition={spring} />}
                <motion.span
                  animate={on ? { scale: 1.15, rotate: [0, -12, 8, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ scale: { type: "spring", stiffness: 500, damping: 20 }, rotate: { duration: 0.4 } }}
                  style={{ color }}
                >
                  <I size={26} weight={on ? "fill" : "duotone"} />
                </motion.span>
                <span className={on ? "" : "text-ink"}>{t.categories[c]}</span>
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      {/* quién pagó */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-muted">{t.whoPaid}</legend>
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label={t.whoPaid}>
          {members.map((m) => {
            const on = paidBy === m.id;
            const c = memberColor(m.color);
            return (
              <motion.button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={on}
                whileTap={{ scale: 0.92 }}
                onClick={() => setPaidBy(m.id)}
                className="relative flex min-w-0 flex-col items-center gap-1.5 rounded-2xl bg-surface-2 px-1 pb-2 pt-2.5"
              >
                {on && (
                  <motion.span
                    layoutId="payer-ring"
                    className="absolute inset-0 rounded-2xl border-2"
                    style={{ borderColor: c, background: `color-mix(in srgb, ${c} 14%, transparent)` }}
                    transition={spring}
                  />
                )}
                <motion.span className="relative" animate={{ scale: on ? 1.1 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                  <Avatar name={m.name} color={m.color} image={m.image} size={40} />
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 600, damping: 22 }}
                        className="absolute -bottom-0.5 -right-1 inline-flex size-5 items-center justify-center rounded-full text-white ring-2 ring-surface"
                        style={{ background: c }}
                      >
                        <Check size={11} weight="bold" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <span className={`relative w-full truncate text-center text-xs ${on ? "font-semibold" : "text-muted"}`} style={on ? { color: c } : undefined}>
                  {m.id === meId ? t.you : m.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      {/* participantes */}
      <fieldset>
        <div className="mb-2 flex items-center justify-between">
          <legend className="text-sm font-medium text-muted">{t.splitBetween}</legend>
          <button type="button" onClick={() => setParticipants(allOn ? [] : members.map((m) => m.id))} className="text-sm font-medium text-accent-ink">
            {t.all}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {members.map((m) => {
            const on = participants.includes(m.id);
            return (
              <motion.button
                key={m.id}
                type="button"
                layout
                aria-pressed={on}
                whileTap={{ scale: 0.92 }}
                transition={spring}
                onClick={() => setParticipants(on ? participants.filter((p) => p !== m.id) : [...participants, m.id])}
                className={`flex h-10 items-center gap-2 rounded-full pl-1 pr-3 text-sm font-medium transition-colors duration-200 ${on ? "bg-accent-soft text-accent-ink" : "bg-surface-2 text-muted line-through"}`}
              >
                <span className={`transition-[filter,opacity] duration-200 ${on ? "" : "opacity-60 grayscale"}`}>
                  <Avatar name={m.name} color={m.color} image={m.image} size={32} />
                </span>
                {m.id === meId ? t.you : m.name}
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span initial={{ scale: 0, width: 0 }} animate={{ scale: 1, width: 14 }} exit={{ scale: 0, width: 0 }} transition={spring} className="inline-flex">
                      <Check size={14} weight="bold" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
        {cents && rate && participants.length > 0 ? (
          <p className="mt-2 text-xs text-muted">
            {money(Math.round((cents * rate) / participants.length), trip.currency, locale)} {t.each}
          </p>
        ) : null}
      </fieldset>

      <DateField label={t.date} value={date} onChange={setDate} />

      {(save.isError || del.isError) && <p className="text-center text-sm text-neg">{t.genericError}</p>}
      <div className="flex gap-2">
        {expense && (
          <Button
            type="button"
            variant="danger"
            loading={del.isPending}
            onClick={() => (confirmDel ? del.mutate() : setConfirmDel(true))}
            className={confirmDel ? "flex-1" : ""}
            aria-label={t.delete}
          >
            <Trash size={20} /> {confirmDel && t.confirmDelete}
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={!valid} loading={save.isPending}>
          {t.save}
        </Button>
      </div>
    </form>
  );
}
