import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowsClockwise, CaretRight, ClockCountdown, FloppyDisk } from "@phosphor-icons/react";
import { useIsGuest } from "../lib/api";
import { useLocale, useT } from "../lib/i18n";

/** Cierre del viaje: repetirlo con el mismo grupo y, si es invitado, guardar su acceso para no perderlo. */
export function TripEnded({ tripId, deleteAt }: { tripId: string; deleteAt: number | null }) {
  const t = useT();
  const isGuest = useIsGuest();
  const locale = useLocale();
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-2">
      <Link to={`/new?from=${tripId}`} className="flex items-center gap-4 rounded-3xl bg-surface p-4 transition-transform active:scale-[0.98]">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
          <ArrowsClockwise size={26} weight="duotone" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{t.repeatGroupTitle}</span>
          <span className="block text-sm text-muted">{t.repeatGroupBody}</span>
        </span>
        <CaretRight size={18} className="text-muted" />
      </Link>
      {deleteAt && (
        <p className="flex items-center gap-1.5 px-1 text-xs text-muted">
          <ClockCountdown size={14} /> {t.deletesOn.replace("{date}", new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(deleteAt))}
        </p>
      )}
      {isGuest && (
        <Link to="/login?save=1" className="flex items-center gap-4 rounded-3xl bg-accent-soft p-4 text-accent-ink transition-transform active:scale-[0.98]">
          <FloppyDisk size={26} weight="duotone" className="shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">{t.saveTripTitle}</span>
            <span className="block text-sm opacity-80">{t.saveTripBody}</span>
          </span>
          <CaretRight size={18} />
        </Link>
      )}
    </motion.section>
  );
}
