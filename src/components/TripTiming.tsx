import { motion } from "motion/react";
import { tripTiming } from "../lib/format";
import { useT, type Dict } from "../lib/i18n";

type Timing = NonNullable<ReturnType<typeof tripTiming>>;

/** "Empieza en 12 días", "Día 3 de 8", "Terminó hace 2 días". */
export function timingLabel(t: Dict, x: Timing) {
  if (x.phase === "upcoming") return x.days === 1 ? t.timingTomorrow : t.timingUpcoming.replace("{n}", String(x.days));
  if (x.phase === "ongoing") return x.total ? t.timingDayOf.replace("{day}", String(x.day)).replace("{total}", String(x.total)) : t.timingDay.replace("{day}", String(x.day));
  return x.days === 0 ? t.timingEndedToday : x.days === 1 ? t.timingEndedYesterday : t.timingPast.replace("{n}", String(x.days));
}

/** Momento del viaje dentro de la tarjeta de total: etiqueta y, en curso, barra de días. */
export function TripTiming({ start, end, extra }: { start: string | null; end: string | null; extra?: string }) {
  const t = useT();
  const x = tripTiming(start, end);
  if (!x) return null;
  const progress = x.phase === "ongoing" && x.total ? Math.min(1, x.day / x.total) : null;
  return (
    <div className="mt-3 flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm text-white/85">
        <span className="font-medium">{timingLabel(t, x)}</span>
        {extra && <span className="tabular text-white/70">{extra}</span>}
      </div>
      {progress !== null && (
        <div className="h-1.5 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-valuemin={0} aria-valuemax={x.total!} aria-valuenow={x.day}>
          <motion.div className="h-full rounded-full bg-white" initial={{ width: 0 }} animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      )}
    </div>
  );
}
