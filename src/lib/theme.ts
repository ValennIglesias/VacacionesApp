import { useSyncExternalStore } from "react";

export type Theme = "system" | "light" | "dark";

const read = (): Theme => {
  try {
    const t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") return t;
  } catch {}
  return "system";
};

// estado compartido: el botón rápido y el selector de Grupo se mantienen sincronizados
let current: Theme = read();
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => (listeners.add(fn), () => listeners.delete(fn));

function setTheme(t: Theme) {
  current = t;
  if (t === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  try {
    if (t === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", t);
  } catch {}
  listeners.forEach((fn) => fn());
}

/** Tema elegido por el usuario; "system" sigue al sistema operativo. El script inline de cada HTML lo aplica antes de pintar. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current);
  return { theme, setTheme };
}

/** Si en este momento se ve oscuro (por elección o por el sistema). */
export const isDarkNow = () =>
  document.documentElement.dataset.theme === "dark" ||
  (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
