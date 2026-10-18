import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cloudflare(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Vaquita: gastos de viaje compartidos",
        short_name: "Vaquita",
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
        globIgnores: ["**/Phosphor-*"],
      },
    }),
  ],
  // páginas del sitio: solo para el entorno cliente (el worker tiene su propio entry)
  environments: {
    client: {
      build: {
        rollupOptions: {
          input: { landing: "index.html", en: "en/index.html", app: "app/index.html", privacy: "privacy/index.html", terms: "terms/index.html" },
        },
      },
    },
  },
});
