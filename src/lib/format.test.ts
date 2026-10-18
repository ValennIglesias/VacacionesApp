import { expect, it } from "vitest";
import { parseAmount } from "./format";

it("parseAmount entiende formatos es/en", () => {
  expect(parseAmount("1234")).toBe(123400);
  expect(parseAmount("1.234")).toBe(123400);
  expect(parseAmount("1.234,50")).toBe(123450);
  expect(parseAmount("1,234.5")).toBe(123450);
  expect(parseAmount("12,5")).toBe(1250);
  expect(parseAmount("0")).toBe(null);
  expect(parseAmount("")).toBe(null);
});
