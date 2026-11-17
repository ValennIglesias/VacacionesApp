import { type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "motion/react";
import {
  Bed,
  ForkKnife,
  ShoppingCart,
  Bus,
  Ticket,
  Martini,
  ShoppingBag,
  DotsThreeCircle,
  X,
  type Icon,
} from "@phosphor-icons/react";
import type { Category } from "../../shared/data";
import { isGalleryAvatar, isSafeAvatar } from "../../shared/avatars";
import { useT } from "../lib/i18n";

/** Enfoca sin hacer scroll: con autoFocus, el navegador scrollea la hoja mientras todavía entra animada desde abajo. */
export const focusNoScroll = (el: HTMLElement | null) => el?.focus({ preventScroll: true });

export const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "soft" | "danger"; loading?: boolean };
export function Button({ variant = "primary", loading, className = "", children, disabled, ...rest }: BtnProps) {
  const styles = {
    primary: "bg-accent text-white shadow-[0_8px_24px_-10px_rgba(47,91,255,0.7)] enabled:hover:brightness-110 enabled:hover:shadow-[0_12px_28px_-10px_rgba(47,91,255,0.85)]",
    soft: "bg-accent-soft text-accent-ink enabled:hover:shadow-[0_10px_24px_-14px_rgba(47,91,255,0.6)]",
    ghost: "bg-transparent text-ink border border-line enabled:hover:bg-surface-2",
    danger: "bg-transparent text-neg border border-line enabled:hover:border-neg/50 enabled:hover:bg-neg/5",
  }[variant];
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-medium transition-[translate,scale,opacity,filter,box-shadow,background-color,border-color] duration-200 ease-out enabled:hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100 ${styles} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : children}
    </button>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; help?: string; error?: string };
export function Field({ label, help, error, className = "", ...rest }: FieldProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      <input
        id={id}
        className="h-12 rounded-2xl border border-line bg-surface px-4 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-accent"
        aria-invalid={!!error}
        {...rest}
      />
      {help && !error && <p className="text-xs text-muted">{help}</p>}
      {error && <p className="text-xs text-neg">{error}</p>}
    </div>
  );
}

/** Bottom sheet con backdrop; se cierra con Escape, tocando afuera o arrastrando hacia abajo. */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const t = useT();
  const reduce = useReducedMotion();
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    // con hojas apiladas, Escape cierra solo la de arriba
    const onKey = (e: KeyboardEvent) => {
      const el = ref.current;
      if (!el || [...document.querySelectorAll("[aria-modal=true]")].at(-1) !== el) return;
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      // Tab no sale de la hoja: del último vuelve al primero y viceversa
      const f = [...el.querySelectorAll<HTMLElement>("button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex='-1'])")];
      const [first, last] = [f[0], f.at(-1)];
      if (!first || !last) return e.preventDefault();
      if (e.shiftKey && (document.activeElement === first || document.activeElement === el)) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
    };
    window.addEventListener("keydown", onKey);
    // restaurar el valor previo: con una hoja abierta encima de otra, cerrar la de arriba no libera el scroll de fondo
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  // foco: entra a la hoja al abrir (si un campo no lo tomó ya) y vuelve a quien la abrió al cerrar.
  // efecto aparte: onClose cambia en cada render y no tiene que re-disparar esto
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    if (!ref.current?.contains(opener)) ref.current?.focus({ preventScroll: true });
    return () => opener?.focus({ preventScroll: true });
  }, [open]);
  // portal: una hoja abierta desde otra hoja quedaría atrapada en el transform de la primera
  return createPortal(
    <AnimatePresence>
      {open && (
        <div ref={ref} tabIndex={-1} className="fixed inset-0 z-40 flex items-end justify-center outline-none" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-surface px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={spring}
            drag={reduce ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            dragListener={false}
            dragControls={controls}
            onDragEnd={(_, i) => (i.offset.y > 120 || i.velocity.y > 600) && onClose()}
          >
            {/* cabecera fija: se arrastra para cerrar (no el contenido, para no pelear con su scroll) */}
            <div className="sticky top-0 z-10 -mx-5 mb-4 cursor-grab touch-none bg-surface px-5 pt-3" onPointerDown={(e) => controls.start(e)}>
              <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-line" />
              <div className="flex items-center justify-between gap-3 pb-1">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button type="button" onClick={onClose} aria-label={t.close} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted tap">
                  <X size={20} weight="bold" />
                </button>
              </div>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

const MEMBER_PALETTE = ["#2f5bff", "#e2563d", "#0b8a5e", "#b4447f", "#c98a12", "#6a4fd8", "#0e8aa8", "#7a8291"];
export const memberColor = (i: number) => MEMBER_PALETTE[i % MEMBER_PALETTE.length];

export function Avatar({ name, color, size = 40, ring, image }: { name: string; color: number; size?: number; ring?: boolean; image?: string | null }) {
  if (isSafeAvatar(image) && isGalleryAvatar(image))
    // animal sobre un círculo suave con el color del integrante
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full ${ring ? "ring-2 ring-surface" : ""}`}
        style={{ width: size, height: size, background: `color-mix(in srgb, ${memberColor(color)} 22%, var(--surface))` }}
        aria-hidden
      >
        <img src={image} alt="" draggable={false} style={{ width: size * 0.74, height: size * 0.74 }} />
      </span>
    );
  if (isSafeAvatar(image))
    return (
      <img
        src={image}
        alt=""
        aria-hidden
        referrerPolicy="no-referrer"
        className={`inline-block shrink-0 rounded-full bg-surface-2 object-cover ${ring ? "ring-2 ring-surface" : ""}`}
        style={{ width: size, height: size }}
      />
    );
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white ${ring ? "ring-2 ring-surface" : ""}`}
      style={{ width: size, height: size, background: memberColor(color), fontSize: size * 0.38 }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

// Colores de la paleta categórica validada (orden fijo = orden de CATEGORIES); valores en styles.css (light/dark).
const cat = (c: Category, icon: Icon) => ({ icon, color: `var(--cat-${c})`, bg: `color-mix(in srgb, var(--cat-${c}) 15%, transparent)` });
export const CATEGORY_META: Record<Category, { icon: Icon; color: string; bg: string }> = {
  lodging: cat("lodging", Bed),
  food: cat("food", ForkKnife),
  groceries: cat("groceries", ShoppingCart),
  shopping: cat("shopping", ShoppingBag),
  activities: cat("activities", Ticket),
  transport: cat("transport", Bus),
  nightlife: cat("nightlife", Martini),
  other: cat("other", DotsThreeCircle),
};

export function CategoryIcon({ category, size = 44 }: { category: Category; size?: number }) {
  const { icon: I, color, bg } = CATEGORY_META[category];
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-2xl" style={{ width: size, height: size, background: bg, color }}>
      <I size={size * 0.55} weight="duotone" />
    </span>
  );
}

export function Empty({ icon: I, title, body, children }: { icon: Icon; title: string; body: string; children?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center px-6 py-14 text-center"
    >
      <span className="mb-4 inline-flex size-20 items-center justify-center rounded-[28px] bg-accent-soft text-accent-ink">
        <I size={40} weight="duotone" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-[32ch] text-sm text-muted">{body}</p>
      {children && <div className="mt-6 flex flex-col gap-3">{children}</div>}
    </motion.div>
  );
}

/** Pantalla completa mientras se resuelve la sesión: aparece tras 300 ms, así una carga rápida no parpadea. */
export function PageLoader() {
  const t = useT();
  return (
    <div className="flex min-h-[100dvh] items-center justify-center text-muted" role="status" aria-label={t.loading}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="size-8 animate-spin rounded-full border-[3px] border-current border-t-transparent" />
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-3xl bg-surface-2 ${className}`} />;
}

export function Segmented<T extends string>({ value, onChange, options, full }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[]; full?: boolean }) {
  return (
    <div className={`rounded-full bg-surface-2 p-1 ${full ? "grid w-full auto-cols-fr grid-flow-col" : "inline-flex"}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`relative h-9 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${full ? "px-2" : "px-4"} ${value === o.value ? "text-ink" : "text-muted hover:text-ink"}`}
        >
          {value === o.value && <motion.span layoutId={`seg-${options.map((x) => x.value).join()}`} className="absolute inset-0 rounded-full bg-surface shadow-sm" transition={spring} />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

// Banderas de flag-icons (MIT), servidas desde nuestro dominio; dibujadas para 4:3, así no se recortan.
const FLAG_URLS = import.meta.glob("/node_modules/flag-icons/flags/4x3/*.svg", { query: "?url&no-inline", import: "default", eager: true }) as Record<string, string>;

/** Bandera como imagen: los emojis de bandera no se ven en Windows. */
export function Flag({ cc, size = 28 }: { cc: string; size?: number }) {
  return (
    <img
      src={FLAG_URLS[`/node_modules/flag-icons/flags/4x3/${cc.toLowerCase()}.svg`]}
      alt=""
      width={size}
      height={Math.round(size * 0.75)}
      className="shrink-0 rounded-[4px] shadow-[0_0_0_1px_var(--line)]"
      style={{ width: size, height: Math.round(size * 0.75) }}
    />
  );
}
