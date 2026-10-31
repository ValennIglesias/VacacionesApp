// Calculadoras públicas (/herramientas, /en/tools): todo corre en el navegador, sin cuenta ni servidor.
import { arsCrossRate, crossRate, fuelCost, splitPaid, type FuelUnit } from "../shared/tools";
import { COUNTRY_CURRENCY } from "../shared/data";
import { parseAmount, typeAmount } from "./lib/format";

const es = document.documentElement.lang !== "en";
const t = es
  ? { person: "Persona", name: "Nombre", paid: "Cuánto puso", remove: "Quitar", total: "Total", each: "Cada uno", settled: "Están a mano: nadie le debe a nadie.", pays: "le paga a", copied: "¡Copiado!", title: "Gastos compartidos", fuel: "Combustible", litres: "litros", gallons: "galones", trip: "Costo total", perPerson: "Por persona", by: "Calculado con" }
  : { person: "Person", name: "Name", paid: "Amount paid", remove: "Remove", total: "Total", each: "Each person", settled: "You're even: nobody owes anybody.", pays: "pays", copied: "Copied!", title: "Shared expenses", fuel: "Fuel", litres: "litres", gallons: "gallons", trip: "Total cost", perPerson: "Per person", by: "Worked out with" };
const fmt = new Intl.NumberFormat(es ? "es-AR" : "en-US", { maximumFractionDigits: 2 });
const num = (el: Element | null) => Math.max(0, Number((el as HTMLInputElement | null)?.value) || 0);
const amountOf = (el: Element | null) => (parseAmount((el as HTMLInputElement | null)?.value ?? "") ?? 0) / 100;
const locale = es ? "es-AR" : "en-US";

// montos de plata con separador de miles mientras se tipea; en captura, para formatear antes de que cada calculadora recalcule
document.addEventListener(
  "input",
  (e) => {
    const el = e.target as HTMLInputElement;
    if (!el.matches?.("[data-money]")) return;
    el.value = typeAmount(el.value, el.dataset.prev ?? "", locale);
    el.dataset.prev = el.value;
  },
  true,
);
const ENT: Record<string, string> = { "&": "amp", "<": "lt", ">": "gt", '"': "quot" };
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&${ENT[c]};`);
const link = location.origin + location.pathname;

function copyButton(btn: HTMLButtonElement | null, text: () => string) {
  btn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text());
      const label = btn.textContent;
      btn.textContent = t.copied;
      setTimeout(() => (btn.textContent = label), 1500);
    } catch {}
  });
}

// --- dividir gastos: cada uno anota cuánto puso y se reparte en partes iguales
const split = document.getElementById("split-tool");
if (split) {
  const rows = split.querySelector<HTMLElement>("[data-rows]")!;
  const out = split.querySelector<HTMLElement>("[data-result]")!;
  const field = "h-12 min-w-0 rounded-2xl border border-line bg-bg px-4 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";
  const addRow = () => {
    const n = rows.children.length + 1;
    rows.insertAdjacentHTML(
      "beforeend",
      `<div class="flex items-center gap-2"><input aria-label="${t.name} ${n}" placeholder="${t.person} ${n}" class="${field} flex-1" maxlength="30" /><input aria-label="${t.paid} ${n}" type="text" inputmode="decimal" autocomplete="off" data-money placeholder="0" class="${field} w-32 text-right" /><button type="button" data-remove aria-label="${t.remove}" class="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted hover:text-neg">✕</button></div>`,
    );
  };
  const people = () =>
    [...rows.children].map((r, i) => ({ name: (r.querySelector("input") as HTMLInputElement).value.trim() || `${t.person} ${i + 1}`, cents: Math.round(amountOf(r.querySelector("[data-money]")) * 100) }));
  const calc = () => {
    const p = people();
    const r = splitPaid(p.map((x) => x.cents));
    return { p, r, share: fmt.format(r.total / p.length / 100) };
  };
  const render = () => {
    const { p, r, share } = calc();
    if (!r.total) return void (out.innerHTML = "");
    const list = r.transfers.length
      ? `<ul class="mt-4 flex flex-col gap-2">${r.transfers.map((x) => `<li class="flex items-center justify-between gap-3 rounded-2xl bg-bg px-4 py-3"><span><strong>${esc(p[+x.from].name)}</strong> ${t.pays} <strong>${esc(p[+x.to].name)}</strong></span><span class="font-semibold tabular-nums">${fmt.format(x.cents / 100)}</span></li>`).join("")}</ul>`
      : `<p class="mt-4 rounded-2xl bg-bg px-4 py-3">${t.settled}</p>`;
    out.innerHTML = `<div class="flex flex-wrap gap-x-8 gap-y-1"><p>${t.total}: <strong class="tabular-nums">${fmt.format(r.total / 100)}</strong></p><p>${t.each}: <strong class="tabular-nums">${share}</strong></p></div>${list}`;
  };
  for (let i = 0; i < 3; i++) addRow();
  split.querySelector("[data-add]")?.addEventListener("click", () => {
    addRow();
    (rows.lastElementChild?.querySelector("input") as HTMLInputElement | null)?.focus();
  });
  rows.addEventListener("click", (e) => {
    const btn = (e.target as Element).closest("[data-remove]");
    if (btn && rows.children.length > 2) btn.parentElement!.remove(), render();
  });
  rows.addEventListener("input", render);
  copyButton(split.querySelector("[data-copy]"), () => {
    const { p, r, share } = calc();
    const lines = r.transfers.map((x) => `• ${p[+x.from].name} → ${p[+x.to].name}: ${fmt.format(x.cents / 100)}`);
    return [`${t.title} (${t.total.toLowerCase()} ${fmt.format(r.total / 100)}, ${t.each.toLowerCase()} ${share})`, ...(lines.length ? lines : [t.settled]), "", `${t.by} ${link}`].join("\n");
  });
}

// --- nafta: costo del trayecto y cuánto pone cada uno
const fuel = document.getElementById("fuel-tool") as HTMLFormElement | null;
if (fuel) {
  const out = fuel.querySelector<HTMLElement>("[data-result]")!;
  const $ = (n: string) => fuel.querySelector<HTMLInputElement>(`[name=${n}]`)!;
  const unit = () => $("unit").value as FuelUnit;
  const calc = () => {
    const consumption = num($("consumption"));
    const people = Math.max(1, Math.round(num($("people"))));
    const distance = num($("distance"));
    const price = amountOf($("price"));
    if (!consumption || !distance || !price) return null;
    return { people, ...fuelCost({ distance, roundTrip: $("roundTrip").checked, consumption, unit: unit(), price, extras: amountOf($("extras")), people }) };
  };
  const render = () => {
    const mpg = unit() === "mpg";
    fuel.querySelectorAll<HTMLElement>("[data-km]").forEach((el) => (el.textContent = mpg ? el.dataset.mi! : el.dataset.km!));
    const r = calc();
    out.innerHTML = r
      ? `<div class="grid gap-3 sm:grid-cols-3"><p class="rounded-2xl bg-bg px-4 py-3"><span class="block text-sm text-muted">${t.fuel}</span><strong class="text-xl tabular-nums">${fmt.format(r.fuel)} ${mpg ? t.gallons : t.litres}</strong></p><p class="rounded-2xl bg-bg px-4 py-3"><span class="block text-sm text-muted">${t.trip}</span><strong class="text-xl tabular-nums">${fmt.format(r.total)}</strong></p><p class="rounded-2xl bg-accent px-4 py-3 text-white"><span class="block text-sm text-white/80">${t.perPerson} (${r.people})</span><strong class="text-xl tabular-nums">${fmt.format(r.perPerson)}</strong></p></div>`
      : "";
  };
  fuel.addEventListener("input", render);
  fuel.addEventListener("submit", (e) => e.preventDefault());
  render();
  copyButton(fuel.querySelector("[data-copy]"), () => {
    const r = calc();
    if (!r) return link;
    return [`${t.fuel}: ${fmt.format(r.fuel)} ${unit() === "mpg" ? t.gallons : t.litres}`, `${t.trip}: ${fmt.format(r.total)}`, `${t.perPerson} (${r.people}): ${fmt.format(r.perPerson)}`, "", `${t.by} ${link}`].join("\n");
  });
}

// --- conversor de moneda: cotización de mercado del día y, si hay pesos argentinos, los distintos dólares
const fx = document.getElementById("fx-tool") as HTMLFormElement | null;
if (fx) {
  const L = es
    ? { popular: "Más usadas", all: "Todas", market: "Cotización de mercado", ars: "Con los dólares de Argentina", arsNames: { tarjeta: "Tarjeta", bolsa: "MEP", blue: "Blue", oficial: "Oficial" }, error: "No pudimos traer la cotización. Probá de nuevo en un rato.", updated: "Actualizado" }
    : { popular: "Most used", all: "All", market: "Market rate", ars: "With Argentina's dollar rates", arsNames: { tarjeta: "Card", bolsa: "MEP", blue: "Blue", oficial: "Official" }, error: "We couldn't load the rate. Try again in a bit.", updated: "Updated" };
  const $ = (n: string) => fx.querySelector<HTMLInputElement & HTMLSelectElement>(`[name=${n}]`)!;
  const [out, table, arsOut] = ["result", "table", "ars"].map((k) => fx.querySelector<HTMLElement>(`[data-${k}]`)!);
  const names = new Intl.DisplayNames([locale], { type: "currency" });
  const POPULAR = ["USD", "EUR", "ARS", "BRL", "CLP", "UYU", "MXN", "COP", "PEN", "GBP"];
  const codes = [...new Set(Object.values(COUNTRY_CURRENCY))].sort((a, b) => (names.of(a) ?? a).localeCompare(names.of(b) ?? b, locale));
  const opts = (list: string[]) => list.map((c) => `<option value="${c}">${c} · ${esc(names.of(c) ?? c)}</option>`).join("");
  for (const name of ["from", "to"]) {
    const sel = $(name);
    sel.innerHTML = `<optgroup label="${L.popular}">${opts(POPULAR)}</optgroup><optgroup label="${L.all}">${opts(codes)}</optgroup>`;
    sel.value = sel.dataset.default!;
  }
  const money = (n: number, cur: string) => new Intl.NumberFormat(locale, { style: "currency", currency: cur }).format(n);
  // 1 peso en reales es 0,0035: con 2 decimales daría 0
  const unit = (n: number, cur: string) => (n < 1 ? new Intl.NumberFormat(locale, { style: "currency", currency: cur, maximumSignificantDigits: 3 }).format(n) : money(n, cur));
  let rates: Record<string, number> | undefined;
  let ars: Partial<Record<keyof typeof L.arsNames, { venta: number; updated: string }>> | undefined;
  const render = () => {
    const [from, to] = [$("from").value, $("to").value];
    const amount = amountOf($("amount"));
    const k = crossRate(rates, from, to);
    if (!rates) return;
    if (!k) return void (out.innerHTML = `<p class="text-neg">${L.error}</p>`);
    out.innerHTML = `<p class="text-sm text-white/80">${L.market}</p><p class="text-3xl font-semibold tabular-nums">${money(amount * k, to)}</p><p class="mt-1 text-sm text-white/80 tabular-nums">1 ${from} = ${unit(k, to)} · 1 ${to} = ${unit(1 / k, from)}</p>`;
    // montos redondos según cuánto vale la moneda de origen (1 a 500 reales, 1.000 a 500.000 pesos)
    const step = 10 ** Math.max(0, Math.floor(Math.log10(rates[from] ?? 1)));
    table.innerHTML = [1, 5, 10, 20, 50, 100, 200, 500]
      .map((n) => `<tr class="border-t border-line"><td class="py-2 tabular-nums">${money(n * step, from)}</td><td class="py-2 text-right font-medium tabular-nums">${money(n * step * k, to)}</td></tr>`)
      .join("");
    const withArs = (from === "ARS") !== (to === "ARS");
    arsOut.hidden = !withArs || !ars;
    if (withArs && ars) {
      const cards = (Object.keys(L.arsNames) as (keyof typeof L.arsNames)[])
        .filter((t) => ars![t])
        .map((t) => `<p class="rounded-2xl bg-bg px-4 py-3"><span class="block text-sm text-muted">${L.arsNames[t]}</span><strong class="text-lg tabular-nums">${money(amount * arsCrossRate(rates, ars![t]!.venta, from, to)!, to)}</strong></p>`)
        .join("");
      const when = Object.values(ars)[0]?.updated;
      arsOut.innerHTML = `<h3 class="mb-3 font-semibold">${L.ars}</h3><div class="grid grid-cols-2 gap-3 sm:grid-cols-4">${cards}</div>${when ? `<p class="mt-2 text-xs text-muted">${L.updated}: ${new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(new Date(when))}</p>` : ""}`;
    }
  };
  $("amount").value = $("amount").dataset.prev = typeAmount($("amount").value, "", locale);
  fx.addEventListener("input", render);
  fx.addEventListener("submit", (e) => e.preventDefault());
  fx.querySelector("[data-swap]")?.addEventListener("click", () => {
    [$("from").value, $("to").value] = [$("to").value, $("from").value];
    render();
  });
  fetch("/api/rates")
    .then((r) => (r.ok ? r.json() : Promise.reject()) as Promise<typeof rates>)
    .then((r) => ((rates = r), render()))
    .catch(() => (out.innerHTML = `<p>${L.error}</p>`));
  fetch("/api/rates/ars")
    .then((r) => (r.ok ? r.json() : Promise.reject()) as Promise<typeof ars>)
    .then((r) => ((ars = r), render()))
    .catch(() => {});
}
