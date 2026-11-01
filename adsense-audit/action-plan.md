# Plan de acción AdSense — TribuSplit

- **Sitio:** https://tribusplit.com
- **Fecha:** 1 de noviembre de 2026
- **Detalle de cada punto:** [audit.md](audit.md)

## Immediate Fixes

Antes de pedir la revisión.

- [ ] En AdSense → **Sitios**: confirmar que `tribusplit.com` está agregado y verificado con el meta tag, que ya está en el `<head>`. El `ads.txt` ya está publicado. *(Monetization — Connect your site to AdSense)*
- [ ] En AdSense → **Privacidad y mensajes** → GDPR: crear y **publicar** el mensaje de consentimiento para el EEE, el Reino Unido y Suiza. *(issue 2 — EU User Consent Policy)*
- [ ] Completar todas las tareas de la cuenta en AdSense: datos de pago, dirección y verificación de identidad si la pide. Si falta alguna, la revisión no arranca y el sitio queda en "Preparándose". *(issue 1 — Check the status of your AdSense sites)*
- [ ] En Search Console → **Inspección de URLs**: pedir la indexación de unas 10 URLs clave. *(issue 1 — contenido que atraiga audiencia)*
  - `/`, `/guias/`, `/en/`, `/en/guides/`;
  - las 3 herramientas en español;
  - las 3 guías más largas.
  - Hay un límite diario, así que al día siguiente seguir con otras.
- [ ] Mandar un mail de prueba a `contacto@tribusplit.com` y confirmar que llega. *(Trust — transparencia)*

## 30-Day Fixes

- [ ] **Esperar para pedir la revisión** hasta que se cumplan las tres condiciones (estimado: mediados o fines de noviembre de 2026). *(issue 1)*
  - "Páginas" en Search Console muestra la mayoría de las guías **indexadas**;
  - "Rendimiento" registra impresiones;
  - `site:tribusplit.com` devuelve resultados.
- [ ] Pedir la revisión en AdSense → Sitios → "Solicitar revisión". Tarda unos días y a veces de 2 a 4 semanas. Si te rechazan, el mail dice el motivo: corregir y volver a pedir. *(issue 1)*
- [ ] Medir PageSpeed en mobile en [pagespeed.web.dev](https://pagespeed.web.dev) para la home, `/guias/como-dividir-gastos-de-un-viaje/` y `/herramientas/calculadora-de-nafta/`. Corregir lo que dé menos de 90. *(issue 5 — experiencia)*
- [ ] Publicar 1 o 2 guías por semana con ritmo regular, no en tandas. *(issue 3 — Spam Policies: Scaled content abuse)*
- [ ] Conseguir las primeras visitas reales: compartir las herramientas y guías donde tengan sentido (grupos de viaje, Reddit, foros), sin incentivos para hacer clic en anuncios. *(issue 1; Invalid traffic)*
- [ ] No hacer clic en tus propios anuncios ni recargar páginas con anuncios para probar. Para probar, usar la vista previa de AdSense. *(Invalid traffic)*

## 90-Day Improvements

- [ ] Ya aprobado: activar anuncios automáticos en las guías con densidad baja-media, anclado en mobile y viñeta apagada. *(Ad placement)*
- [ ] Ya aprobado: crear los bloques de la app (`VITE_ADSENSE_SLOT_SUMMARY` / `_TRIP`) solo en Resumen y al final de la lista de gastos. *(issue 9 — Ad placement policies)*
- [ ] Si la vista previa de anuncios automáticos no carga, relajar `X-Frame-Options` en las páginas públicas. *(issue 7)*
- [ ] Agregar `hreflang` o separar privacidad y términos por idioma. *(issue 8)*
- [ ] Páginas de presupuesto por destino y guías de mayor valor publicitario en inglés. *(Revenue Optimization)*
- [ ] Evaluar links de afiliados (seguro de viaje, eSIM). *(Revenue Optimization)*
- [ ] Repasar el plan para países que pagan más (Canadá, Australia, Reino Unido, EE. UU.) que quedó acordado el 25/10. *(Revenue Optimization)*
