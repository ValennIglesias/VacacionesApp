import { defineConfig } from "vitest/config";

// config aparte: los tests de lógica no necesitan los plugins de Cloudflare/PWA
export default defineConfig({ test: { include: ["shared/**/*.test.ts", "src/**/*.test.ts", "worker/**/*.test.ts"] } });
