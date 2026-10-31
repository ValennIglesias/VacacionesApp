import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useI18n, useLocale, useT } from "../lib/i18n";
import { today } from "../lib/format";
import { spring } from "./ui";

// Fechas como "YYYY-MM-DD" (sin zona horaria), igual que en la API.
const iso = (y: number, m: number, d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const parse = (s: string) => s.split("-").map(Number) as [number, number, number];
const addDays = (s: string, n: number) => {
  const [y, m, d] = parse(s);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
};

type CalendarProps = { start?: string; end?: string; min?: string; onPick: (date: string) => void };

/** Grilla mensual. Con `end` marca el rango start..end. */
export function Calendar({ start, end, min, onPick }: CalendarProps) {
  const locale = useLocale();
  const { lang } = useI18n();
  const t = useT();
  const [view, setView] = useState(() => {
    const [y, m] = parse(start ?? today());
    return { y, m: m - 1 };
  });
  const [dir, setDir] = useState(1);
  const mondayFirst = lang === "es";
  const firstDow = new Date(view.y, view.m, 1).getDay();
  const offset = mondayFirst ? (firstDow + 6) % 7 : firstDow;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => iso(view.y, view.m, i + 1))];
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2024, 0, (mondayFirst ? 1 : 7) + i)),
  );
  const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(view.y, view.m, 1));
  const move = (n: number) => {
    setDir(n);
    setView(({ y, m }) => ({ y: m + n < 0 ? y - 1 : m + n > 11 ? y + 1 : y, m: (m + n + 12) % 12 }));
  };
  const t0 = today();

  return (
    <div className="select-none rounded-3xl bg-surface-2 p-3">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => move(-1)} className="inline-flex size-9 items-center justify-center rounded-full tap" aria-label={t.back}>
          <CaretLeft size={18} weight="bold" />
        </button>
        <span className="inline-block font-semibold first-letter:uppercase">{title}</span>
        <button type="button" onClick={() => move(1)} className="inline-flex size-9 items-center justify-center rounded-full tap" aria-label={t.next}>
          <CaretRight size={18} weight="bold" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted">
        {weekdays.map((w, i) => (
          <span key={i} className="py-1 capitalize">
            {w}
          </span>
        ))}
      </div>
      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={`${view.y}-${view.m}`}
            custom={dir}
            initial={{ x: dir * 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -40, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-7 gap-y-1"
          >
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const disabled = !!min && d < min;
              const isEdge = d === start || d === end;
              const ranged = !!start && !!end && end > start;
              const inRange = ranged && d > start! && d < end!;
              return (
                <div key={d} className={`flex justify-center ${inRange ? "bg-accent-soft" : ""} ${ranged && d === start ? "rounded-l-full bg-accent-soft" : ""} ${ranged && d === end ? "rounded-r-full bg-accent-soft" : ""}`}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onPick(d)}
                    aria-pressed={isEdge}
                    aria-label={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(new Date(d + "T12:00:00"))}
                    className={`relative inline-flex size-10 items-center justify-center rounded-full text-sm tabular transition-colors disabled:opacity-30 ${
                      isEdge ? "bg-accent font-semibold text-white" : inRange ? "text-accent-ink" : "active:bg-surface"
                    } ${d === t0 && !isEdge ? "font-semibold text-accent-ink ring-1 ring-accent/50" : ""}`}
                  >
                    {Number(d.slice(8))}
                  </button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const fmt = (d: string, locale: string) => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(new Date(d + "T12:00:00"));

/** Campo de fecha única con atajos Hoy / Ayer y calendario desplegable. */
export function DateField({ label, value, onChange }: { label: string; value: string; onChange: (d: string) => void }) {
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const t0 = today();
  const quick = [
    { d: t0, label: t.today },
    { d: addDays(t0, -1), label: t.yesterday },
  ];
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <div className="flex gap-2">
        {quick.map((q) => (
          <motion.button
            key={q.d}
            type="button"
            whileTap={{ scale: 0.92 }}
            aria-pressed={value === q.d}
            onClick={() => (onChange(q.d), setOpen(false))}
            className={`relative h-12 rounded-2xl bg-surface-2 px-4 text-sm font-medium transition-colors duration-200 ${value === q.d ? "text-white" : "text-ink"}`}
          >
            {value === q.d && <motion.span layoutId="date-quick" className="absolute inset-0 rounded-2xl bg-accent" transition={spring} />}
            <span className="relative">{q.label}</span>
          </motion.button>
        ))}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className={`flex h-12 flex-1 items-center gap-2 rounded-2xl border px-4 text-sm font-medium transition-colors ${
            quick.some((q) => q.d === value) ? "border-line text-muted" : "border-accent text-ink"
          }`}
        >
          <CalendarBlank size={18} weight="duotone" className="text-accent-ink" />
          {quick.some((q) => q.d === value) ? t.otherDate : fmt(value, locale)}
        </button>
      </div>
      <Collapse open={open}>
        <Calendar start={value} onPick={(d) => (onChange(d), setOpen(false))} />
      </Collapse>
    </div>
  );
}

/** Rango de fechas del viaje: el primer toque marca el inicio, el segundo el fin. */
export function DateRangeField({ start, end, onChange }: { start: string; end: string; onChange: (start: string, end: string) => void }) {
  const t = useT();
  const locale = useLocale();
  const pick = (d: string) => {
    if (!start || end || d < start) onChange(d, "");
    else onChange(start, d);
  };
  const box = (label: string, v: string, active: boolean) => (
    <div className={`flex flex-col rounded-2xl border px-4 py-2.5 transition-colors ${active ? "border-accent" : "border-line"} bg-surface`}>
      <span className="text-xs font-medium text-muted">{label}</span>
      <span className={`inline-block font-medium first-letter:uppercase ${v ? "" : "text-muted/70"}`}>{v ? fmt(v, locale) : t.pickDate}</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {box(t.startDate, start, !start || !!end)}
        {box(t.endDate, end, !!start && !end)}
      </div>
      <Calendar start={start || undefined} end={end || undefined} onPick={pick} />
    </div>
  );
}

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
