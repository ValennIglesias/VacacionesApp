import { expect, it } from "vitest";
import { parseAmount, tripTiming } from "./format";

it("parseAmount entiende formatos es/en", () => {
  expect(parseAmount("1234")).toBe(123400);
  expect(parseAmount("1.234")).toBe(123400);
  expect(parseAmount("1.234,50")).toBe(123450);
  expect(parseAmount("1,234.5")).toBe(123450);
  expect(parseAmount("12,5")).toBe(1250);
  expect(parseAmount("0")).toBe(null);
  expect(parseAmount("")).toBe(null);
});

it("tripTiming: falta, en curso y terminado", () => {
  expect(tripTiming(null, null, "2026-10-18")).toBe(null);
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-18")).toEqual({ phase: "upcoming", days: 2, total: 8 });
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-20")).toEqual({ phase: "ongoing", day: 1, total: 8 });
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-27")).toEqual({ phase: "ongoing", day: 8, total: 8 });
  expect(tripTiming("2026-10-20", null, "2026-11-02")).toEqual({ phase: "ongoing", day: 14, total: null });
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-30")).toEqual({ phase: "past", days: 3, total: 8 });
});
