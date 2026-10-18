// Piezas compartidas de las páginas estáticas (guías). El plugin de vite.config las inserta en %GUIDE_HEADER%, %GUIDE_CTA% y %GUIDE_FOOTER%.
type Lang = "es" | "en";

const t = {
  es: { home: "/", guides: "/guias/", guidesLabel: "Guías", other: "/en/guides/", otherLabel: "English", open: "Abrir app", privacy: "Privacidad", terms: "Términos", contact: "Contacto", about: "Sobre nosotros", aboutUrl: "/nosotros/", contactUrl: "/contacto/", theme: "Cambiar tema",
    ctaTitle: "Repartan los gastos sin hacer cuentas", ctaBody: "Anoten cada gasto en la moneda del destino y la app calcula quién le paga a quién, con la menor cantidad de transferencias.", ctaBtn: "Crear viaje gratis" },
  en: { home: "/en/", guides: "/en/guides/", guidesLabel: "Guides", other: "/guias/", otherLabel: "Español", open: "Open app", privacy: "Privacy", terms: "Terms", contact: "Contact", about: "About", aboutUrl: "/en/about/", contactUrl: "/en/contact/", theme: "Toggle theme",
    ctaTitle: "Split expenses without doing the math", ctaBody: "Log every expense in the local currency and the app works out who pays whom, with as few transfers as possible.", ctaBtn: "Create a free trip" },
};

export const header = (lang: Lang) => `<header class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
      <a href="${t[lang].home}" class="flex items-center gap-2 text-lg font-semibold">
        <img src="/favicon.svg" alt="" width="36" height="36" class="size-9 rounded-xl" />
        %BRAND%
      </a>
      <nav class="flex items-center gap-1 text-sm font-medium">
        <button id="theme-toggle" type="button" class="inline-flex size-9 items-center justify-center rounded-full text-muted hover:text-ink" aria-label="${t[lang].theme}"><i class="ph-duotone ph-circle-half text-xl"></i></button>
        <a href="${t[lang].guides}" class="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:inline">${t[lang].guidesLabel}</a>
        <a href="/app/" class="rounded-full border border-line bg-surface px-4 py-2">${t[lang].open}</a>
      </nav>
    </header>`;

export const cta = (lang: Lang) => `<aside class="mx-auto mt-14 max-w-3xl rounded-3xl bg-accent p-7 text-white">
      <p class="text-2xl font-semibold tracking-tight">${t[lang].ctaTitle}</p>
      <p class="mt-2 max-w-[52ch] text-white/80">${t[lang].ctaBody}</p>
      <a href="/app/new" class="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-[#2449d8]">${t[lang].ctaBtn} <i class="ph-duotone ph-arrow-right"></i></a>
    </aside>`;

export const footer = (lang: Lang) => `<footer class="mt-20 border-t border-line">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted">
        <p>%BRAND%</p>
        <nav class="flex flex-wrap gap-5"><a href="${t[lang].guides}">${t[lang].guidesLabel}</a><a href="/privacy/${lang === "en" ? "#en" : ""}">${t[lang].privacy}</a><a href="/terms/${lang === "en" ? "#en" : ""}">${t[lang].terms}</a><a href="${t[lang].aboutUrl}">${t[lang].about}</a><a href="${t[lang].contactUrl}">${t[lang].contact}</a><a href="${t[lang].other}" hreflang="${lang === "es" ? "en" : "es"}">${t[lang].otherLabel}</a></nav>
      </div>
    </footer>`;
