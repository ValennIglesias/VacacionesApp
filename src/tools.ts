// Calculadoras públicas (/herramientas, /en/tools): todo corre en el navegador, sin cuenta ni servidor.
import { arsCrossRate, crossRate, fuelCost, splitPaid, type FuelUnit } from "../shared/tools";
import { COUNTRY_CURRENCY } from "../shared/data";
import { currencyName, parseAmount, typeAmount } from "./lib/format";

const es = document.documentElement.lang !== "en";
const t = es
  ? { person: "Persona", name: "Nombre", paid: "Cuánto pagó", parts: "Partes", perPart: "Por parte", remove: "Quitar", total: "Total", each: "Cada uno", settled: "Están a mano: nadie le debe a nadie.", pays: "le paga a", copied: "¡Copiado!", title: "Gastos compartidos", fuel: "Combustible", litres: "litros", gallons: "galones", trip: "Costo total", perPerson: "Por persona", by: "Calculado con" }
  : { person: "Person", name: "Name", paid: "Amount paid", parts: "Shares", perPart: "Per share", remove: "Remove", total: "Total", each: "Each person", settled: "You're even: nobody owes anybody.", pays: "pays", copied: "Copied!", title: "Shared expenses", fuel: "Fuel", litres: "litres", gallons: "gallons", trip: "Total cost", perPerson: "Per person", by: "Worked out with" };
const fmt = new Intl.NumberFormat(es ? "es-AR" : "en-US", { maximumFractionDigits: 2, useGrouping: "always" });
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

// --- dividir gastos: cada uno anota cuánto puso y se reparte según sus partes (1 = normal, 2 = pareja, 0 = no participa)
const split = document.getElementById("split-tool");
if (split) {
  const rows = split.querySelector<HTMLElement>("[data-rows]")!;
  const out = split.querySelector<HTMLElement>("[data-result]")!;
  const field = "h-12 min-w-0 rounded-2xl border border-line bg-bg px-4 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";
  const addRow = () => {
    const n = rows.children.length + 1;
    // en celular el nombre ocupa su propia línea y abajo van monto, partes y quitar
    rows.insertAdjacentHTML(
      "beforeend",
      `<div class="grid grid-cols-[minmax(0,1fr)_4.5rem_2.5rem] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_8rem_4.5rem_2.5rem]"><input aria-label="${t.name} ${n}" placeholder="${t.person} ${n}" class="${field} col-span-3 sm:col-span-1" maxlength="30" /><input aria-label="${t.paid} ${n}" type="text" inputmode="decimal" autocomplete="off" data-money placeholder="${t.paid}" class="${field} text-right" /><input aria-label="${t.parts} ${n}" type="text" inputmode="decimal" autocomplete="off" data-parts value="1" class="${field} px-2 text-center" /><button type="button" data-remove aria-label="${t.remove}" class="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted hover:text-neg">✕</button></div>`,
    );
  };
  const partsOf = (el: HTMLInputElement) => {
    const v = Number(el.value.replace(",", "."));
    return !el.value.trim() || !Number.isFinite(v) ? 1 : Math.max(0, v);
  };
  const people = () =>
    [...rows.children].map((r, i) => ({
      name: (r.querySelector("input") as HTMLInputElement).value.trim() || `${t.person} ${i + 1}`,
      cents: Math.round(amountOf(r.querySelector("[data-money]")) * 100),
      parts: partsOf(r.querySelector("[data-parts]")!),
    }));
  const calc = () => {
    const p = people();
    const r = splitPaid(
      p.map((x) => x.cents),
      p.map((x) => x.parts),
    );
    // con partes distintas "cada uno" no existe: se muestra cuánto vale una parte
    const sum = p.reduce((a, x) => a + x.parts, 0) || p.length;
    const equal = p.every((x) => x.parts === p[0].parts);
    return { p, r, shareLabel: equal ? t.each : t.perPart, share: fmt.format(r.total / (equal ? p.length : sum) / 100) };
  };
  const render = () => {
    const { p, r, shareLabel, share } = calc();
    if (!r.total) return void (out.innerHTML = "");
    const list = r.transfers.length
      ? `<ul class="mt-4 flex flex-col gap-2">${r.transfers.map((x) => `<li class="flex items-center justify-between gap-3 rounded-2xl bg-bg px-4 py-3"><span><strong>${esc(p[+x.from].name)}</strong> ${t.pays} <strong>${esc(p[+x.to].name)}</strong></span><span class="font-semibold tabular-nums">${fmt.format(x.cents / 100)}</span></li>`).join("")}</ul>`
      : `<p class="mt-4 rounded-2xl bg-bg px-4 py-3">${t.settled}</p>`;
    out.innerHTML = `<div class="flex flex-wrap gap-x-8 gap-y-1"><p>${t.total}: <strong class="tabular-nums">${fmt.format(r.total / 100)}</strong></p><p>${shareLabel}: <strong class="tabular-nums">${share}</strong></p></div>${list}`;
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
    const { p, r, shareLabel, share } = calc();
    const lines = r.transfers.map((x) => `• ${p[+x.from].name} → ${p[+x.to].name}: ${fmt.format(x.cents / 100)}`);
    return [`${t.title} (${t.total.toLowerCase()} ${fmt.format(r.total / 100)}, ${shareLabel.toLowerCase()} ${share})`, ...(lines.length ? lines : [t.settled]), "", `${t.by} ${link}`].join("\n");
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
      ? `<div class="grid gap-3 sm:grid-cols-3"><p class="rounded-2xl bg-bg px-4 py-3"><span class="block text-sm text-muted">${t.fuel}</span><strong class="text-xl tabular-nums">${fmt.format(r.fuel)} ${mpg ? t.gallons : t.litres}</strong></p><p class="rounded-2xl bg-bg px-4 py-3"><span class="block text-sm text-muted">${t.trip}</span><strong class="text-xl tabular-nums">${fmt.format(r.total)}</strong></p><p class="rounded-2xl bg-accent px-4 py-3 text-white"><span class="block text-sm text-white">${t.perPerson} (${r.people})</span><strong class="text-xl tabular-nums">${fmt.format(r.perPerson)}</strong></p></div>`
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
    ? { popular: "Más usadas", all: "Todas", pick: "Elegí la moneda", search: "Buscar moneda (ej.: real o BRL)", none: "No encontramos esa moneda.", close: "Cerrar", market: "Cotización de mercado", ars: "Con los dólares de Argentina", arsNames: { tarjeta: "Tarjeta", bolsa: "MEP", blue: "Blue", oficial: "Oficial" }, error: "No pudimos traer la cotización. Probá de nuevo en un rato.", updated: "Actualizado" }
    : { popular: "Most used", all: "All", pick: "Choose a currency", search: "Search currency (e.g. euro or EUR)", none: "No currency matches that.", close: "Close", market: "Market rate", ars: "With Argentina's dollar rates", arsNames: { tarjeta: "Card", bolsa: "MEP", blue: "Blue", oficial: "Official" }, error: "We couldn't load the rate. Try again in a bit.", updated: "Updated" };
  const $ = (n: string) => fx.querySelector<HTMLInputElement>(`[name=${n}]`)!;
  const [out, table, arsOut] = ["result", "table", "ars"].map((k) => fx.querySelector<HTMLElement>(`[data-${k}]`)!);
  const names = { of: (c: string) => currencyName(c, locale) };
  const POPULAR = ["USD", "EUR", "ARS", "BRL", "CLP", "UYU", "MXN", "COP", "PEN", "GBP"];
  const codes = [...new Set(Object.values(COUNTRY_CURRENCY))].sort((a, b) => names.of(a).localeCompare(names.of(b) ?? b, locale));
  // selector con búsqueda, como el de la app: por sigla, nombre o país, sin acentos
  const norm = (x: string) => x.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  const regions = new Intl.DisplayNames([locale], { type: "region" });
  const hay = new Map(codes.map((c) => [c, norm(`${c} ${names.of(c)} ${Object.keys(COUNTRY_CURRENCY).filter((cc) => COUNTRY_CURRENCY[cc] === c).map((cc) => regions.of(cc)).join(" ")}`)]));
  const show = () =>
    fx.querySelectorAll<HTMLButtonElement>("[data-pick]").forEach((b) => {
      const c = $(b.dataset.pick!).value;
      b.innerHTML = `<span class="font-semibold">${c}</span><span class="min-w-0 flex-1 truncate text-muted">${esc(names.of(c))}</span><span aria-hidden class="text-muted">▾</span>`;
    });
  for (const n of ["from", "to"]) $(n).value = $(n).dataset.default!;
  show();
  const dlg = document.createElement("dialog");
  dlg.className = "fixed inset-x-0 bottom-0 top-auto m-0 flex max-h-[85dvh] w-full max-w-none flex-col rounded-t-[28px] bg-surface p-0 text-ink backdrop:bg-black/40 open:flex sm:inset-0 sm:m-auto sm:max-w-lg sm:rounded-[28px] [&:not([open])]:hidden";
  dlg.innerHTML = `<div class="px-5 pb-3 pt-4"><div class="flex items-center justify-between gap-3"><h2 class="text-xl font-semibold">${L.pick}</h2><button type="button" data-close aria-label="${L.close}" class="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition-colors hover:text-ink">✕</button></div><label class="mt-3 flex h-12 items-center gap-2 rounded-2xl border border-line bg-surface-2 px-4 transition-colors focus-within:border-accent"><svg aria-hidden width="18" height="18" viewBox="0 0 256 256" fill="currentColor" class="shrink-0 text-muted"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg><input type="text" enterkeyhint="search" autocomplete="off" placeholder="${L.search}" aria-label="${L.search}" class="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/70" /></label></div><ul class="min-h-[50dvh] flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]"></ul>`;
  document.body.appendChild(dlg);
  const [q, list] = [dlg.querySelector("input")!, dlg.querySelector("ul")!];
  let target = "from";
  const item = (c: string) => {
    const on = c === $(target).value;
    return `<li><button type="button" data-cur="${c}" aria-pressed="${on}" class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors duration-150 ${on ? "bg-accent-soft text-accent-ink" : "hover:bg-surface-2"}"><span class="w-12 shrink-0 font-semibold">${c}</span><span class="min-w-0 flex-1 truncate">${esc(names.of(c))}</span>${on ? "<span aria-hidden>✓</span>" : ""}</button></li>`;
  };
  const head = (x: string) => `<li class="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">${x}</li>`;
  const fill = () => {
    const words = norm(q.value).split(/\s+/).filter(Boolean);
    const found = codes.filter((c) => words.every((w) => hay.get(c)!.includes(w)));
    list.innerHTML = words.length
      ? found.map(item).join("") || `<li class="px-3 py-6 text-center text-muted">${L.none}</li>`
      : head(L.popular) + POPULAR.map(item).join("") + head(L.all) + codes.map(item).join("");
  };
  const choose = (c: string) => {
    $(target).value = c;
    dlg.close();
    show();
    render();
  };
  fx.addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>("[data-pick]");
    if (!b) return;
    target = b.dataset.pick!;
    q.value = "";
    fill();
    dlg.showModal();
    q.focus();
    list.scrollTop = 0;
  });
  q.addEventListener("input", fill);
  q.addEventListener("keydown", (e) => {
    const first = list.querySelector<HTMLElement>("[data-cur]");
    if (e.key === "Enter" && first) e.preventDefault(), choose(first.dataset.cur!);
  });
  dlg.addEventListener("click", (e) => {
    const el = e.target as Element;
    if (el === dlg || el.closest("[data-close]")) return dlg.close();
    const c = el.closest<HTMLElement>("[data-cur]");
    if (c) choose(c.dataset.cur!);
  });
  const money = (n: number, cur: string) => new Intl.NumberFormat(locale, { style: "currency", currency: cur, useGrouping: "always" }).format(n);
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
    out.innerHTML = `<p class="text-sm text-white">${L.market}</p><p class="text-3xl font-semibold tabular-nums">${money(amount * k, to)}</p><p class="mt-1 text-sm text-white tabular-nums">1 ${from} = ${unit(k, to)} · 1 ${to} = ${unit(1 / k, from)}</p>`;
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
    show();
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
