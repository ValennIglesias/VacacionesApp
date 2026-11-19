# Plan de acción AdSense — TribuSplit

- **Sitio:** https://tribusplit.com
- **Fecha:** 16 de noviembre de 2026
- **Detalle de cada punto:** [audit.md](audit.md)

## Immediate Fixes

Antes de pedir la revisión.

- [x] ~~Search Console: confirmar indexación e impresiones.~~ 40 de 45 URLs con impresiones, 5.086 en total.
- [ ] Search Console → **Rendimiento**, el 18 o 19/11: ver si los días 13 a 16/11 siguen en cero. *(issue 1 — AdSense eligibility requirements)*
- [ ] Si siguen en cero: **Inspección de URLs** de `/herramientas/calculadora-dividir-gastos/` (¿"La URL está en Google"?), revisar **Seguridad y acciones manuales**, y en Cloudflare → Security → Events filtrar por Googlebot para descartar bloqueos. *(issue 1)*
- [ ] AdSense → **Privacidad y mensajes** → GDPR: confirmar que el mensaje está creado **y publicado**. *(issue 2 — EU User Consent Policy)*
- [ ] AdSense → **Sitios**: confirmar que `tribusplit.com` está verificado y ver el estado. Completar datos de pago, dirección e identidad si faltan.
- [x] ~~`www` redirige a la raíz con 301.~~ Hecho.
- [x] ~~404 con navegación, `noindex` y sin anuncios.~~ Hecho.

## 30-Day Fixes

- [ ] Publicar la guía de Chile, que ya está escrita. *(issue 4)*
- [ ] Publicar 1 o 2 guías por semana, con ritmo regular. *(issue 3 — Spam Policies: Scaled content abuse)*
- [ ] **Pedir la revisión** cuando las impresiones vuelvan, o cuando la caída tenga explicación y no sea un bloqueo. Si te rechazan, el mail dice el motivo: corregir y volver a pedir. *(issue 1)*
- [ ] Medir PageSpeed en mobile en [pagespeed.web.dev](https://pagespeed.web.dev): home, una guía y una herramienta. Corregir lo que dé menos de 90. *(issue 5)*
- [ ] Conseguir las primeras visitas reales compartiendo guías y herramientas donde tengan sentido, sin incentivos para hacer clic. *(issue 1; Invalid traffic)*

## 90-Day Improvements

- [ ] Ya aprobado: anuncios automáticos en las guías con densidad baja-media, anclado en mobile y viñeta apagada. *(Ad placement)*
- [ ] Ya aprobado: bloques de la app solo en Resumen y al final de la lista de gastos. *(issue 9 — Ad placement policies)*
- [ ] Si la vista previa de anuncios automáticos no carga, relajar `X-Frame-Options` en las páginas públicas. *(issue 7)*
- [ ] Separar privacidad y términos por idioma o agregar `hreflang`. *(issue 8)*
- [ ] Guías por destino y temas de mayor valor publicitario en inglés. *(Revenue Optimization)*
