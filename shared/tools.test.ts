import { describe, expect, it } from "vitest";
import { fuelCost, splitPaid } from "./tools";

describe("splitPaid", () => {
  it("uno puso todo: los demás le pagan su parte", () => {
    const r = splitPaid([30000, 0, 0]);
    expect(r.shares).toEqual([10000, 10000, 10000]);
    expect(r.transfers).toEqual([
      { from: "1", to: "0", cents: 10000 },
      { from: "2", to: "0", cents: 10000 },
    ]);
  });

  it("centavos impares: nadie pierde un centavo y los saldos cierran", () => {
    const paid = [1000, 0, 1];
    const r = splitPaid(paid);
    expect(r.shares.reduce((a, b) => a + b, 0)).toBe(r.total);
    const net = paid.map((p, i) => p - r.shares[i]);
    for (const t of r.transfers) {
      net[+t.from] += t.cents;
      net[+t.to] -= t.cents;
    }
    expect(net).toEqual([0, 0, 0]);
  });

  it("todos pusieron lo mismo: sin transferencias", () => {
    expect(splitPaid([500, 500]).transfers).toEqual([]);
  });
});

describe("fuelCost", () => {
  it("km por litro, ida y vuelta, con peajes", () => {
    const r = fuelCost({ distance: 360, roundTrip: true, consumption: 12, unit: "kmpl", price: 1500, extras: 12000, people: 4 });
    expect(r.fuel).toBe(60);
    expect(r.total).toBe(102000);
    expect(r.perPerson).toBe(25500);
  });

  it("litros cada 100 km y mpg", () => {
    expect(fuelCost({ distance: 200, roundTrip: false, consumption: 7, unit: "l100", price: 2, extras: 0, people: 2 }).fuel).toBe(14);
    expect(fuelCost({ distance: 300, roundTrip: false, consumption: 30, unit: "mpg", price: 3.5, extras: 0, people: 3 }).total).toBe(35);
  });
});
