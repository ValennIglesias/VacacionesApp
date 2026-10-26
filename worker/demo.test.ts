import { expect, it } from "vitest";
import { COUNTRY_CURRENCY } from "../shared/data";
import { DEMOS } from "./demo";

it("las plantillas del viaje de ejemplo son coherentes", () => {
  for (const d of DEMOS) {
    expect(COUNTRY_CURRENCY[d.countryCode]).toBe(d.currency);
    for (const [, , , day, cents, payer, who] of d.expenses) {
      expect(Number.isInteger(cents) && cents > 0).toBe(true);
      expect(day).toBeLessThanOrEqual(0); // nada después de hoy
      expect([payer, ...who].every((i) => i >= 0 && i <= d.friends.length)).toBe(true);
      expect(who.length).toBeGreaterThan(0);
    }
  }
});
