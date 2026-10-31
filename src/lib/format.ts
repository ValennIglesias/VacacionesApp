import { COUNTRY_CURRENCY } from "../../shared/data";

// en español Intl no agrupa los números de 4 cifras (1234): siempre separador de miles, también desde 1.000
export const money = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, useGrouping: "always" }).format(cents / 100);

/** Monto compacto para ejes de gráficos. */
export const moneyShort = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "narrowSymbol", notation: "compact" }).format(cents / 100);

export const countryName = (cc: string, locale: string) => new Intl.DisplayNames([locale], { type: "region" }).of(cc) ?? cc;

// en español Intl las da en minúscula ("peso argentino"): como título de la opción, con mayúscula
export const currencyName = (code: string, locale: string) => {
  const n = new Intl.DisplayNames([locale], { type: "currency" }).of(code) ?? code;
  return n.charAt(0).toLocaleUpperCase(locale) + n.slice(1);
};

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

/**
 * Formatea el monto mientras se tipea, con separador de miles del idioma ("1234,5" → "1.234,5").
 * Un separador recién tipeado con hasta 2 dígitos después es el decimal (en Android el teclado decimal solo trae "."),
 * y con 3 es de miles: así quien tipea "1.000" a mano termina viendo 1.000 y no 1,00.
 */
export function typeAmount(value: string, prev: string, locale: string): string {
  const parts = new Intl.NumberFormat(locale).formatToParts(12345.5);
  const [g, d] = ["group", "decimal"].map((t) => parts.find((p) => p.type === t)!.value);
  const v = value.replace(/[^\d.,]/g, "");
  const count = (s: string, c: string) => s.split(c).length - 1;
  // los separadores de miles los pone esta función: uno de más lo tipeó el usuario
  const at = count(v, g) > count(prev, g) ? Math.max(v.lastIndexOf(g), v.lastIndexOf(d)) : v.lastIndexOf(d);
  const dec = at >= 0 && v.length - at - 1 <= 2 ? v.slice(at + 1).replace(/\D/g, "") : null;
  const int = (dec === null ? v : v.slice(0, at)).replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 12);
  if (!int && dec === null) return "";
  return new Intl.NumberFormat(locale, { useGrouping: "always" }).format(Number(int || 0)) + (dec === null ? "" : d + dec);
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
