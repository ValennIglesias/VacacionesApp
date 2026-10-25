import { globSync } from "node:fs";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import { BRAND, CONTACT } from "./shared/brand.ts";
import { cta, footer, header } from "./site/partials.ts";

// URL pública del sitio para canonical/hreflang/og (absolutas). Se define al compilar: SITE_URL=https://dominio npm run build
const SITE = (process.env.SITE_URL ?? "http://localhost:5173").replace(/\/$/, "");

// ID de AdSense (ca-pub-…) desde .env o variables de build: verificación del sitio (meta tag) y ads.txt
const ADSENSE = loadEnv("production", process.cwd(), "VITE_").VITE_ADSENSE_CLIENT || "";
if (ADSENSE && !/^ca-pub-\d+$/.test(ADSENSE)) throw new Error(`VITE_ADSENSE_CLIENT inválido: ${ADSENSE}`);

// %BRAND% y %SITE% en las páginas estáticas
const brand = (): Plugin => ({
  name: "brand",
  transformIndexHtml: (html) => {
    const lang = html.includes('<html lang="en"') ? "en" : "es";
    return html
      .replace("%GUIDE_HEADER%", header(lang))
      .replace("%GUIDE_CTA%", cta(lang))
      .replace("%GUIDE_FOOTER%", footer(lang))
      .replaceAll("%BRAND%", BRAND)
      .replaceAll("%CONTACT%", CONTACT)
      .replaceAll("%SITE%", SITE)
      .replace("</head>", ADSENSE ? `  <meta name="google-adsense-account" content="${ADSENSE}" />\n  </head>` : "</head>");
  },
  // robots.txt y sitemap.xml con las páginas públicas (la app y los legales no suman para buscadores)
  generateBundle() {
    if (this.environment.name !== "client") return;
    const urls = Object.keys(pages).filter((k) => k !== "app").map((k) => `${SITE}/${k === "landing" ? "" : k + "/"}`);
    this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *
Allow: /
Disallow: /app/
Disallow: /api/

# el crawler de AdSense necesita ver la app para elegir anuncios acordes (no indexa nada)
User-agent: Mediapartners-Google
Allow: /
Disallow: /api/

Sitemap: ${SITE}/sitemap.xml
` });
    if (ADSENSE) this.emitFile({ type: "asset", fileName: "ads.txt", source: `google.com, ${ADSENSE.slice(3)}, DIRECT, f08c47fec0942fa0\n` });
    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`,
    });
  },
});

// todas las páginas del sitio: landing, legales, app y guías (cada carpeta con su index.html)
const pages = Object.fromEntries(
  ["index.html", "app/index.html", ...globSync("{en,privacy,terms,guias,nosotros,contacto}/**/index.html")].map((f) => [
    f.replace(/\\/g, "/").replace(/\/?index\.html$/, "") || "landing",
    f,
  ]),
);

export default defineConfig({
  plugins: [
    brand(),
    react(),
    tailwindcss(),
    cloudflare(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: BRAND,
        short_name: BRAND,
        description: "Anotá y repartí los gastos del viaje con tu grupo.",
        start_url: "/app/",
        scope: "/app/",
        display: "standalone",
        background_color: "#f4f5f7",
        theme_color: "#2f5bff",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        navigateFallback: "/app/index.html",
        navigateFallbackAllowlist: [/^\/app/],
        navigateFallbackDenylist: [/^\/api/],
        globPatterns: ["app/**/*.html", "assets/app-*.{js,css}", "assets/*.woff2", "*.{png,svg}"],
        globIgnores: ["**/Phosphor-*", "og.png"],
      },
    }),
  ],
  // páginas del sitio: solo para el entorno cliente (el worker tiene su propio entry)
  environments: { client: { build: { rollupOptions: { input: pages } } } },
});
