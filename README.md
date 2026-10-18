# Vaquita

Web app para anotar y repartir gastos de viaje en grupo. Un solo Worker de Cloudflare sirve la landing estática, la app (React, en `/app`) y la API (`/api`), con base de datos D1.

## Desarrollo local

```bash
npm install
cp .dev.vars.example .dev.vars   # completar BETTER_AUTH_SECRET (y Google si querés)
npm run db:migrate:local
npm run dev                      # http://localhost:5173
npm test
```

## Estructura

- `index.html`, `en/`, `privacy/`, `terms/`: páginas estáticas (SEO / AdSense).
- `app/index.html` + `src/`: la app (React Router con base `/app`).
- `worker/`: API con Hono, auth con better-auth, esquema Drizzle en `worker/db/schema.ts`.
- `shared/`: lógica usada por front y worker (reparto, transferencias mínimas, países/monedas).
- `migrations/`: SQL generado con `npm run db:generate` después de cambiar el esquema.

## Deploy a Cloudflare

1. `npx wrangler login`
2. `npx wrangler d1 create vaquita-db` y pegar el `database_id` en `wrangler.jsonc`.
3. `npm run db:migrate:remote`
4. Secrets: `npx wrangler secret put BETTER_AUTH_SECRET` (string largo random), y opcional `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
5. En `wrangler.jsonc`, cambiar `BETTER_AUTH_URL` a `https://tu-dominio`.
6. `npm run deploy`
7. Dominio: en el dashboard, Workers > vaquita > Settings > Domains & Routes > agregar el dominio comprado en Cloudflare.

### Google login

En Google Cloud Console > APIs & Services > Credentials, crear un OAuth Client (Web) con redirect URIs:
- `https://tu-dominio/api/auth/callback/google`
- `http://localhost:5173/api/auth/callback/google`

### AdSense

1. Con el sitio publicado en el dominio, dar de alta la cuenta en AdSense.
2. Reemplazar `pub-XXXXXXXXXXXXXXXX` en `public/ads.txt`.
3. Crear unidades de anuncio y completar `.env` (ver `.env.example`): `VITE_ADSENSE_CLIENT`, `VITE_ADSENSE_SLOT_LANDING`, `VITE_ADSENSE_SLOT_TRIP`, `VITE_ADSENSE_SLOT_SUMMARY`. Sin estas variables no se muestra ningún anuncio.
4. En AdSense > Privacidad y mensajes, activar el mensaje de consentimiento (EEA/UK).
5. Reemplazar `contacto@example.com` en la landing y los legales por un email real.
