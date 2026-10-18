import { describe, expect, it } from "vitest";
import { computeBalances, convertCents, minTransfers, splitEqual, type ExpenseForBalance } from "./settle";

const exp = (paidBy: string, total: number, ids: string[]): ExpenseForBalance => ({
  paidBy,
  amountTripCents: total,
  shares: [...splitEqual(total, ids)].map(([memberId, shareCents]) => ({ memberId, shareCents })),
});

const sumTo = (t: ReturnType<typeof minTransfers>, id: string) =>
  t.filter((x) => x.to === id).reduce((a, x) => a + x.cents, 0) - t.filter((x) => x.from === id).reduce((a, x) => a + x.cents, 0);

describe("splitEqual", () => {
  it("reparte centavos impares sin perder ninguno", () => {
    const m = splitEqual(1000, ["a", "b", "c"]);
    expect([...m.values()]).toEqual([334, 333, 333]);
  });
});

describe("balances + minTransfers", () => {
  const ids = ["a", "b", "c", "d"];

  it("todos pagan lo mismo: sin transferencias", () => {
    const b = computeBalances(ids, ids.map((id) => exp(id, 2500, ids)));
    expect(minTransfers(b)).toEqual([]);
  });

  it("uno pagó todo: los demás le pagan a él", () => {
    const b = computeBalances(ids, [exp("a", 10000, ids)]);
    const t = minTransfers(b);
    expect(t).toHaveLength(3);
    expect(t.every((x) => x.to === "a" && x.cents === 2500)).toBe(true);
  });

  it("participantes parciales y saldos cuadran a cero", () => {
    const e = [exp("a", 9000, ["a", "b", "c"]), exp("b", 4001, ["b", "d"]), exp("d", 777, ids)];
    const b = computeBalances(ids, e);
    expect([...b.values()].reduce((x, y) => x + y, 0)).toBe(0);
    const t = minTransfers(b);
    expect(t.length).toBeLessThanOrEqual(ids.length - 1);
    for (const id of ids) expect(sumTo(t, id)).toBe(b.get(id));
  });

  it("una parcial excluye sus gastos de la final", () => {
    const first = [exp("a", 6000, ids)];
    const later = [exp("b", 2000, ids)];
    // simulamos: la final solo ve los gastos sin liquidar
    const final = minTransfers(computeBalances(ids, later));
    expect(final.every((x) => x.to === "b")).toBe(true);
    expect(minTransfers(computeBalances(ids, first)).every((x) => x.to === "a")).toBe(true);
  });
});

describe("convertCents", () => {
  it("convierte y redondea a decimales de la moneda destino", () => {
    expect(convertCents(10000, 210.5, "ARS")).toBe(2105000);
    expect(convertCents(12345, 1.1, "USD")).toBe(13580);
    expect(convertCents(1000, 15.55, "JPY")).toBe(15600); // ¥155.5 -> ¥156
  });
});
