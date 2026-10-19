import { COUNTRY_CURRENCY } from "../../shared/data";

export const money = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100);

/** Monto compacto para ejes de gráficos. */
export const moneyShort = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol", notation: "compact" }).format(cents / 100);

export const countryName = (cc: string, locale: string) => new Intl.DisplayNames([locale], { type: "region" }).of(cc) ?? cc;

export const currencyName = (code: string, locale: string) => new Intl.DisplayNames([locale], { type: "currency" }).of(code) ?? code;

/** Parse de lo que tipea el usuario ("1.234,50" o "1234.5") a cents. */
export function parseAmount(input: string): number | null {
  let s = input.replace(/[^\d.,]/g, "");
  if (!s) return null;
  const lastSep = Math.max(s.lastIndexOf(","), s.lastIndexOf("."));
  // separador decimal = último separador con 1-2 dígitos después
  if (lastSep >= 0 && s.length - lastSep - 1 <= 2) s = s.slice(0, lastSep).replace(/[.,]/g, "") + "." + s.slice(lastSep + 1);
  else s = s.replace(/[.,]/g, "");
  const n = Math.round(parseFloat(s) * 100);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const formatDay = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }).format(new Date(iso + "T12:00:00"));

/** Moneda sugerida para el usuario: país detectado por Cloudflare, si no la región explícita del navegador (es-AR), si no USD. */
export const guessHomeCurrency = (country?: string | null) => {
  const region = country || navigator.languages.map((l) => new Intl.Locale(l).region).find(Boolean);
  return (region && COUNTRY_CURRENCY[region]) || "USD";
};

const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

/** Momento del viaje según sus fechas (YYYY-MM-DD): falta, en curso (día N de total) o terminado. */
export function tripTiming(start: string | null, end: string | null, now = today()) {
  if (!start) return null;
  const total = end ? daysBetween(start, end) + 1 : null;
  if (now < start) return { phase: "upcoming", days: daysBetween(now, start), total } as const;
  if (!end || now <= end) return { phase: "ongoing", day: daysBetween(start, now) + 1, total } as const;
  return { phase: "past", days: daysBetween(end, now), total } as const;
}
