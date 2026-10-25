// Genera las guías estáticas (guias/** y en/guides/**) a partir de scripts/guides/{es,en}.mjs.
// Uso: node scripts/guides/build.mjs. Las páginas generadas se commitean; vite las toma como cualquier otro HTML.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDES as ES } from "./es.mjs";
import { GUIDES as EN } from "./en.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const MODIFIED = "2026-10-24";
const AUTHOR = "Valentin";

const L = {
  es: {
    base: "/guias/", home: "/", homeLabel: "Inicio", guides: "Guías", related: "Seguí leyendo", read: "min de lectura",
    updated: "Actualizado el 24 de octubre de 2026", by: "Por", role: "creador de %BRAND%", about: "/nosotros/#autor", aboutTitle: "Sobre el autor",
    bio: "Valentin creó %BRAND% para que los viajes en grupo no terminen con las cuentas en una servilleta. Escribe estas guías a partir de cómo funciona la app y de los problemas que más se repiten al repartir gastos entre amigos, parejas y familias.",
    indexTitle: "Guías para viajar en grupo y compartir gastos",
    indexDesc: "Consejos prácticos para dividir gastos de viajes, convivencia y salidas: presupuestos, monedas, deudas y cómo hablar de plata con amigos.",
    indexLead: "Todo lo que conviene saber para que la plata no sea un tema en el viaje, en la casa o con amigos.",
    locale: "es_AR", readMore: "Leer guía",
  },
  en: {
    base: "/en/guides/", home: "/en/", homeLabel: "Home", guides: "Guides", related: "Keep reading", read: "min read",
    updated: "Updated October 24, 2026", by: "By", role: "creator of %BRAND%", about: "/en/about/#author", aboutTitle: "About the author",
    bio: "Valentin built %BRAND% so group trips don't end with the math scribbled on a napkin. He writes these guides based on how the app works and the problems that come up most often when friends, couples and families split costs.",
    indexTitle: "Guides to group travel and shared expenses",
    indexDesc: "Practical tips to split travel, household and night-out costs: budgets, currencies, debts and talking about money with friends.",
    indexLead: "What's worth knowing so money never becomes the topic of the trip.",
    locale: "en_US", readMore: "Read guide",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const THEME = `<script>try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}</script>`;

// [[fig nombre | pie]] → captura real de la app (public/img/guides/{lang}-{nombre}.jpg, 390x844 a 2x)
const figs = (lang, body) =>
  body.replace(/\[\[fig (\S+) \|([^\]]+)\]\]/g, (_, name, cap) => {
    const c = esc(cap.trim());
    return `<figure><img src="/img/guides/${lang}-${name}.jpg" width="390" height="844" alt="${c}" loading="lazy" decoding="async" /><figcaption>${c}</figcaption></figure>`;
  });

function head(lang, title, desc, path, altPath, ld, titleSep = "|") {
  const other = lang === "es" ? "en" : "es";
  const alt = altPath ? `\n    <link rel="alternate" hreflang="${lang}" href="%SITE%${path}" />\n    <link rel="alternate" hreflang="${other}" href="%SITE%${altPath}" />` : "";
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    ${THEME}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)} ${titleSep} %BRAND%</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="%SITE%${path}" />${alt}
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="%BRAND%" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="%SITE%${path}" />
    <meta property="og:locale" content="${L[lang].locale}" />
    <meta property="og:image" content="%SITE%/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/src/site.css" />
    <script type="module" src="/src/landing.ts"></script>
    <script type="application/ld+json">${JSON.stringify(ld)}</script>
  </head>`;
}

const crumbs = (items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: `%SITE%${p}` })) });
const write = (rel, content) => {
  const f = join(ROOT, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, content);
};

function build(lang, guides, otherGuides) {
  const t = L[lang];
  const otherBase = lang === "es" ? "/en/guides/" : "/guias/";
  const titles = Object.fromEntries(guides.map((g) => [g.slug, g.title]));
  const known = new Set(otherGuides.map((g) => g.slug));
  for (const g of guides) {
    if (g.pair && !known.has(g.pair)) throw new Error(`${g.slug}: pair inexistente ${g.pair}`);
    for (const r of g.related) if (!titles[r]) throw new Error(`${g.slug}: related inexistente ${r}`);
    const path = `${t.base}${g.slug}/`;
    const body = figs(lang, g.body);
    const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(2, Math.round(words / 220));
    const ld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article", headline: g.title, description: g.desc, inLanguage: lang, datePublished: g.published, dateModified: MODIFIED,
          image: "%SITE%/og.png", mainEntityOfPage: `%SITE%${path}`, wordCount: words,
          author: { "@type": "Person", name: AUTHOR, jobTitle: t.role, url: `%SITE%${t.about}` },
          publisher: { "@type": "Organization", name: "%BRAND%", logo: { "@type": "ImageObject", url: "%SITE%/icon-512.png" } },
        },
        crumbs([[t.homeLabel, t.home], [t.guides, t.base], [g.title, path]]),
      ],
    };
    const related = g.related.map((r) => `<li><a href="${t.base}${r}/">${esc(titles[r])}</a></li>`).join("");
    write(`${t.base.slice(1)}${g.slug}/index.html`, `${head(lang, g.title, g.desc, path, g.pair && `${otherBase}${g.pair}/`, ld)}
  <body>
    %GUIDE_HEADER%
    <main>
      <article class="prose">
        <nav class="crumbs" aria-label="breadcrumb"><a href="${t.home}">${t.homeLabel}</a> / <a href="${t.base}">${t.guides}</a></nav>
        <h1>${esc(g.title)}</h1>
        <p class="lead">${esc(g.lead)}</p>
        <p class="meta byline">${t.by} <a href="${t.about}">${AUTHOR}</a>, ${t.role} · ${t.updated} · ${minutes} ${t.read}</p>
${body.trim()}
        <aside class="author"><span class="avatar" aria-hidden="true">V</span><div><strong>${t.aboutTitle}</strong><p>${t.bio}</p></div></aside>
        <div id="ad-landing" class="mt-10" hidden></div>
        <section class="related"><h2 class="!mt-0 text-lg">${t.related}</h2><ul>${related}</ul></section>
      </article>
      %GUIDE_CTA%
    </main>
    %GUIDE_FOOTER%
  </body>
</html>
`);
    console.log(`${lang} ${g.slug}: ${words} palabras`);
  }

  // índice
  const path = t.base;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: t.indexTitle, description: t.indexDesc, inLanguage: lang, url: `%SITE%${path}` },
      crumbs([[t.homeLabel, t.home], [t.guides, path]]),
    ],
  };
  const cards = guides
    .map(
      (g) => `
          <a href="${path}${g.slug}/" class="flex flex-col gap-3 rounded-3xl bg-surface p-6 transition-transform active:scale-[0.99]">
            <h2 class="text-lg font-semibold leading-snug">${esc(g.title)}</h2>
            <p class="text-sm text-muted">${esc(g.desc)}</p>
            <span class="mt-auto text-sm font-medium text-accent-ink">${t.readMore} →</span>
          </a>`,
    )
    .join("");
  write(`${path.slice(1)}index.html`, `${head(lang, t.indexTitle, t.indexDesc, path, otherBase, ld)}
  <body>
    %GUIDE_HEADER%
    <main class="mx-auto max-w-6xl px-5">
      <h1 class="mt-10 max-w-[22ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">${esc(t.indexTitle)}</h1>
      <p class="mt-4 max-w-[60ch] text-lg text-muted">${esc(t.indexLead)}</p>
      <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${cards}
      </div>
      %GUIDE_CTA%
    </main>
    %GUIDE_FOOTER%
  </body>
</html>
`);
}

build("es", ES, EN);
build("en", EN, ES);
