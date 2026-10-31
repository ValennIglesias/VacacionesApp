import { expect, it } from "vitest";
import { parseAmount, tripTiming, typeAmount } from "./format";

it("parseAmount entiende formatos es/en", () => {
  expect(parseAmount("1234")).toBe(123400);
  expect(parseAmount("1.234")).toBe(123400);
  expect(parseAmount("1.234,50")).toBe(123450);
  expect(parseAmount("1,234.5")).toBe(123450);
  expect(parseAmount("12,5")).toBe(1250);
  expect(parseAmount("0")).toBe(null);
  expect(parseAmount("")).toBe(null);
});

it("typeAmount agrega miles al tipear y respeta el decimal", () => {
  // simula tecla por tecla: cada valor nuevo es el formateado anterior + la tecla
  const type = (keys: string, locale: string) => [...keys].reduce((prev, k) => typeAmount(prev + k, prev, locale), "");
  expect(type("1234567", "es-AR")).toBe("1.234.567");
  expect(type("1234,5", "es-AR")).toBe("1.234,5");
  expect(type("1234.5", "es-AR")).toBe("1.234,5"); // teclado con solo punto
  expect(type("1.000", "es-AR")).toBe("1.000"); // miles tipeados a mano
  expect(type("1234.56", "en-US")).toBe("1,234.56");
  expect(type("1,000", "en-US")).toBe("1,000");
  expect(type("0012", "es-AR")).toBe("12");
  expect(type("12345,5", "es")).toBe("12.345,5"); // "es" no agrupa 4 dígitos, igual detecta los separadores
  expect(type("1500", "es")).toBe("1.500"); // y igual agrupa desde 1.000
  // borrar un dígito no convierte los miles en decimales
  expect(typeAmount("12.34", "12.345", "es-AR")).toBe("1.234");
  for (const [k, l] of [["1234,5", "es-AR"], ["1234.56", "en-US"], ["1.000", "es-AR"]] as const) expect(parseAmount(type(k, l))).toBe(parseAmount(k));
});

it("tripTiming: falta, en curso y terminado", () => {
  expect(tripTiming(null, null, "2026-10-18")).toBe(null);
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-18")).toEqual({ phase: "upcoming", days: 2, total: 8 });
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-20")).toEqual({ phase: "ongoing", day: 1, total: 8 });
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-27")).toEqual({ phase: "ongoing", day: 8, total: 8 });
  expect(tripTiming("2026-10-20", null, "2026-11-02")).toEqual({ phase: "ongoing", day: 14, total: null });
  expect(tripTiming("2026-10-20", "2026-10-27", "2026-10-30")).toEqual({ phase: "past", days: 3, total: 8 });
});
