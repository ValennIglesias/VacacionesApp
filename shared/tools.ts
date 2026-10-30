// Cálculos de las calculadoras públicas del sitio (/herramientas, /en/tools). Mismo reparto que la app.
import { minTransfers, splitEqual, type Transfer } from "./settle";

/** Cada persona puso `paid[i]` (cents); todo se reparte en partes iguales entre todos. */
export function splitPaid(paid: number[]): { total: number; shares: number[]; transfers: Transfer[] } {
  const ids = paid.map((_, i) => String(i));
  const total = paid.reduce((a, b) => a + b, 0);
  const shares = [...splitEqual(total, ids).values()];
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
