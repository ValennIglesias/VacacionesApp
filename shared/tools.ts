// Cálculos de las calculadoras públicas del sitio (/herramientas, /en/tools). Mismo reparto que la app.
import { minTransfers, type Transfer } from "./settle";

/** Reparte `total` según las partes de cada uno (0 = no participa); los centavos sobrantes van a los primeros que participan. */
export function splitByParts(total: number, parts: number[]): number[] {
  const sum = parts.reduce((a, b) => a + b, 0);
  if (!sum) return splitByParts(total, parts.map(() => 1));
  const shares = parts.map((p) => Math.floor((total * p) / sum));
  let rest = total - shares.reduce((a, b) => a + b, 0);
  for (let i = 0; rest > 0; i = (i + 1) % parts.length) if (parts[i] > 0) shares[i]++, rest--;
  return shares;
}

/** Cada persona puso `paid[i]` (cents); todo se reparte según `parts` (por defecto, partes iguales). */
export function splitPaid(paid: number[], parts = paid.map(() => 1)): { total: number; shares: number[]; transfers: Transfer[] } {
  const ids = paid.map((_, i) => String(i));
  const total = paid.reduce((a, b) => a + b, 0);
  const shares = splitByParts(total, parts);
  const transfers = minTransfers(new Map(ids.map((id, i) => [id, paid[i] - shares[i]])));
  return { total, shares, transfers };
}

export type FuelUnit = "kmpl" | "l100" | "mpg";

/** Combustible (litros, o galones con mpg) y costo total y por persona del trayecto. */
export function fuelCost(o: { distance: number; roundTrip: boolean; consumption: number; unit: FuelUnit; price: number; extras: number; people: number }) {
  const d = o.distance * (o.roundTrip ? 2 : 1);
  const fuel = o.unit === "l100" ? (d * o.consumption) / 100 : d / o.consumption;
  const total = fuel * o.price + o.extras;
  return { fuel, total, perPerson: total / o.people };
}

/** Cotización cruzada desde la tabla base USD (unidades de cada moneda por 1 USD). */
export const crossRate = (rates: Record<string, number> | undefined, from: string, to: string) =>
  from === to ? 1 : rates?.[from] && rates?.[to] ? rates[to] / rates[from] : undefined;

/** Igual que crossRate pero con un dólar argentino puntual (oficial, tarjeta, MEP, blue) en lugar del de mercado. */
export const arsCrossRate = (rates: Record<string, number> | undefined, arsPerUsd: number, from: string, to: string) => {
  if (to === "ARS") return rates?.[from] ? arsPerUsd / rates[from] : undefined;
  if (from === "ARS") return rates?.[to] ? rates[to] / arsPerUsd : undefined;
};
