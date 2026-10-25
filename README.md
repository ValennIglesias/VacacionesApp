# TribuSplit

Web app para anotar y repartir gastos de viaje en grupo. Un solo Worker de Cloudflare sirve la landing y las guías estáticas, la app (React, en `/app`) y la API (`/api`), con base de datos D1.

## Desarrollo local

```bash
npm install
cp .dev.vars.example .dev.vars   # completar BETTER_AUTH_SECRET (Google y Resend son opcionales)
npm run db:migrate:local
npm run dev                      # http://localhost:5173
npm test
```

Sin `RESEND_API_KEY`, los emails (recuperar contraseña) se imprimen en la consola del server con el link.

## Estructura

- `index.html`, `en/`, `privacy/`, `terms/`, `guias/`, `en/guides/`, `nosotros/`, `contacto/` (y `en/about/`, `en/contact/`): páginas estáticas (SEO / AdSense). Cualquier carpeta nueva con `index.html` dentro de esas rutas entra sola al build y al `sitemap.xml`.
- `site/partials.ts`: encabezado, pie y llamado a la acción compartidos de las guías (`%GUIDE_HEADER%`, `%GUIDE_CTA%`, `%GUIDE_FOOTER%`).
- `shared/brand.ts`: nombre de la marca y email de contacto. Se usan en la app, los emails y las páginas (`%BRAND%`, `%CONTACT%`).
- `app/index.html` + `src/`: la app (React Router con base `/app`).
- `worker/`: API con Hono, auth con better-auth, emails en `worker/email.ts`, esquema Drizzle en `worker/db/schema.ts`.
- `shared/`: lógica usada por front y worker (reparto, transferencias mínimas, países/monedas, avatares).
- `migrations/`: SQL generado con `npm run db:generate` después de cambiar el esquema.
- `scripts/og-image.ps1`: regenera `public/og.png` (vista previa al compartir) con el nombre de la marca.

## Cambiar el nombre de la marca

1. Editar `shared/brand.ts` (nombre y email de contacto).
2. Regenerar la imagen para compartir: `powershell -ExecutionPolicy Bypass -File scripts/og-image.ps1 -Brand "Nuevo nombre"`.
3. Opcional: renombrar el Worker y la base en `wrangler.jsonc` y `package.json`.

## Deploy a producción

Orden recomendado. Los pasos marcados con (vos) necesitan tu cuenta o tus datos.

### 1. Antes de comprar el dominio

1. (vos) Buscar la marca "TribuSplit" en INPI Argentina, INPI Brasil, EUIPO y USPTO.
2. (vos) Reservar las redes (@tribusplit) aunque no se usen todavía.

### 2. Dominio y email

1. (vos) Comprar `tribusplit.com` y `tribusplit.app` en Cloudflare Registrar (y `tribesplit.com` para redirigir).
2. (vos) Cloudflare > Email > Email Routing: crear `hola@tribusplit.com` que reenvíe a tu casilla.
3. Cambiar `CONTACT` en `shared/brand.ts` por ese email.
4. (vos) Crear cuenta en [Resend](https://resend.com), agregar el dominio y copiar en Cloudflare DNS los registros que indica (SPF/DKIM). Generar una API key.

### 3. Base de datos y Worker

```bash
npx wrangler login
npx wrangler d1 create tribusplit-db      # pegar el database_id en wrangler.jsonc
npm run db:migrate:remote
npx wrangler secret put BETTER_AUTH_SECRET   # string largo random (ej. openssl rand -hex 32)
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put EMAIL_FROM           # ej. TribuSplit <hola@tribusplit.com>
```

En `wrangler.jsonc`, cambiar `BETTER_AUTH_URL` a `https://tribusplit.com`.

### 4. Publicar

La URL pública se pasa al compilar (canonical, sitemap, links de idioma y vista previa al compartir):

```bash
SITE_URL=https://tribusplit.com npm run deploy
```

En PowerShell: `$env:SITE_URL="https://tribusplit.com"; npm run deploy`.

Después, en el dashboard: Workers > tribusplit > Settings > Domains & Routes > agregar `tribusplit.com` (y `www`). Para `tribusplit.app` y `tribesplit.com`, una regla de redirección (Rules > Redirect Rules) hacia `https://tribusplit.com`.

### 5. Deploy automático desde GitHub (opcional, recomendado)

Workers > tribusplit > Settings > Builds > conectar el repo:
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Variables de build: `SITE_URL=https://tribusplit.com` (y las `VITE_ADSENSE_*` cuando existan)

### 6. Probar en producción

- Registro, login y recuperar contraseña (llega el email).
- Crear un viaje, unirse con el código desde otra cuenta, cargar gastos, repartir, pagar y confirmar.
- Compartir un link de invitación por WhatsApp y ver la vista previa.
- Si el login falla con "exceeded CPU" (límite de 10 ms del plan free), pasar a Workers Paid (US$5/mes).

### 7. Medición e indexación

1. (vos) Cloudflare > Web Analytics: activarlo para el dominio (gratis, sin cookies).
2. (vos) [Google Search Console](https://search.google.com/search-console): agregar el dominio (verificación por DNS en Cloudflare) y enviar `https://tribusplit.com/sitemap.xml`.
3. Esperar a que Google indexe la landing y las guías antes de aplicar en AdSense.

### Google login (opcional)

En Google Cloud Console > APIs & Services > Credentials, crear un OAuth Client (Web) con redirect URIs:
- `https://tribusplit.com/api/auth/callback/google`
- `http://localhost:5173/api/auth/callback/google`

Completar la pantalla de consentimiento (nombre, logo, link a `/privacy/`) y publicarla "En producción". Cargar `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` con `npx wrangler secret put`.

### AdSense

1. (vos) Con el sitio indexado, crear la cuenta en AdSense (mayor de 18, datos fiscales y de pago) y agregar el sitio.
2. Con el `ca-pub-…`: cargarlo como variable de build `VITE_ADSENSE_CLIENT` y volver a publicar. El build agrega el meta tag de verificación (`google-adsense-account`) en todas las páginas y genera `ads.txt`. Confirmar en AdSense que el meta tag coincide con el que muestra la opción "Meta tag" del sitio.
3. (vos) AdSense > Privacidad y mensajes: activar el mensaje de consentimiento (EEA/UK).
4. Tras la aprobación, crear unidades de anuncio y cargar como variables de build: `VITE_ADSENSE_SLOT_LANDING` (landing y guías), `VITE_ADSENSE_SLOT_TRIP`, `VITE_ADSENSE_SLOT_SUMMARY`. Sin estas variables no se muestra ningún anuncio.
5. No hacer clic en los propios anuncios: es motivo de baja de la cuenta.

### Legal

- Consultar si corresponde registrar la base de datos ante la AAIP (Ley 25.326).

## Seguridad

- Login, registro y recuperar contraseña tienen límite de intentos por IP (better-auth, guardado en D1).
- Unirse con código (vista previa y pedido) tiene límite por IP, y cualquier escritura de la API límite por usuario (Workers Rate Limiting). Crear cuentas invitadas también tiene límite por IP.
- Invitados: con el código se puede entrar sin registrarse eligiendo un nombre de la lista (cuenta invitada, plugin `anonymous` de better-auth). Un nombre nuevo queda como pedido hasta que lo apruebe quien creó el viaje. Si el invitado después crea su cuenta, todo lo suyo pasa a ella.
- Quien creó el viaje puede generar un código nuevo (el anterior deja de funcionar) y desvincular integrantes que perdieron el acceso.
- Un cron diario (`triggers.crons` en `wrangler.jsonc`) aplica el vencimiento de viajes (`shared/retention.ts`, con tests) y después borra invitados de más de 30 días sin viajes, pedidos pendientes ni gastos.

## Vencimiento de viajes

Plazos en `shared/retention.ts` (`RETENTION`):

| Viaje | Solo invitados | Con alguien registrado |
|---|---|---|
| Finalizado | se borra a los 30 días | se borra a los 12 meses, con email de aviso 7 días antes |
| Sin finalizar, sin actividad | se borra a los 60 días | recordatorio a los 60 días, aviso a los 83, borrado a los 90 |

Nunca se borra un viaje con registrados sin un aviso enviado al menos 7 días antes. Cualquier actividad (gasto, repartida, pago, integrante nuevo) reinicia los plazos. Los emails requieren `RESEND_API_KEY`; sin ella se imprimen en la consola.

Para probar la tarea diaria en local: `curl "http://localhost:5173/cdn-cgi/handler/scheduled?cron=0+4+*+*+*"`.
- Headers de seguridad en `public/_headers` (páginas) y `hono/secure-headers` (API).
