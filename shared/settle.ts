// Montos siempre en enteros x100 ("cents") para evitar errores de coma flotante.

/** Reparte `total` en partes iguales; los centavos sobrantes van a los primeros (determinístico). */
export function splitEqual(total: number, memberIds: string[]): Map<string, number> {
  const n = memberIds.length;
  if (n === 0) throw new Error("splitEqual: sin participantes");
  const base = Math.floor(total / n);
  const rest = total - base * n;
  return new Map(memberIds.map((id, i) => [id, base + (i < rest ? 1 : 0)]));
}

export type ExpenseForBalance = {
  paidBy: string;
  amountTripCents: number;
  shares: { memberId: string; shareCents: number }[];
};

/** Saldo neto por integrante: positivo = le deben, negativo = debe. */
export function computeBalances(memberIds: string[], expenses: ExpenseForBalance[]): Map<string, number> {
  const bal = new Map(memberIds.map((id) => [id, 0]));
  for (const e of expenses) {
    bal.set(e.paidBy, (bal.get(e.paidBy) ?? 0) + e.amountTripCents);
    for (const s of e.shares) bal.set(s.memberId, (bal.get(s.memberId) ?? 0) - s.shareCents);
  }
  return bal;
}

export type Transfer = { from: string; to: string; cents: number };

/** Mínimas transferencias (greedy: mayor deudor paga al mayor acreedor). */
export function minTransfers(balances: Map<string, number>): Transfer[] {
  const debtors = [...balances].filter(([, v]) => v < 0).map(([id, v]) => ({ id, v: -v }));
  const creditors = [...balances].filter(([, v]) => v > 0).map(([id, v]) => ({ id, v }));
  const out: Transfer[] = [];
  const byDesc = (a: { v: number }, b: { v: number }) => b.v - a.v;
  while (debtors.length && creditors.length) {
    debtors.sort(byDesc);
    creditors.sort(byDesc);
    const d = debtors[0];
    const c = creditors[0];
    const cents = Math.min(d.v, c.v);
    out.push({ from: d.id, to: c.id, cents });
    d.v -= cents;
    c.v -= cents;
    if (d.v === 0) debtors.shift();
    if (c.v === 0) creditors.shift();
  }
  return out;
}

/** Convierte cents de una moneda a otra con `rate`, redondeando a los decimales que usa la moneda destino. */
export function convertCents(cents: number, rate: number, targetCurrency: string): number {
  const digits = new Intl.NumberFormat("en", { style: "currency", currency: targetCurrency }).resolvedOptions()
    .maximumFractionDigits ?? 2;
  const step = 10 ** (2 - Math.min(digits, 2)); // JPY (0 dec) -> múltiplos de 100 cents
  return Math.round((cents * rate) / step) * step;
}
