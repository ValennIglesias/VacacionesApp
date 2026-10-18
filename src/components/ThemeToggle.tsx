import { motion } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react";
import { isDarkNow, useTheme } from "../lib/theme";
import { useT } from "../lib/i18n";

/** Botón rápido claro/oscuro (el selector completo con "Sistema" está en Grupo > Apariencia). */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useT();
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark" || (theme === "system" && isDarkNow());
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-muted active:scale-90 ${className}`}
      aria-label={dark ? t.themes.light : t.themes.dark}
    >
      <motion.span key={String(dark)} initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} className="inline-flex">
        {dark ? <Sun size={20} weight="duotone" /> : <Moon size={20} weight="duotone" />}
      </motion.span>
    </button>
  );
}
