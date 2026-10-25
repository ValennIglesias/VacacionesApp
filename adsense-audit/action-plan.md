# Plan de acción AdSense — TribuSplit

- **Sitio:** TribuSplit (`tribusplit.com`, todavía no publicado; auditado desde el repo local)
- **Fecha:** 24 de octubre de 2026
- **Detalle de cada punto:** [audit.md](audit.md)

## Immediate Fixes

Bloquean la aprobación.

- [ ] Comprar el dominio, asociarlo al Worker y publicar con `SITE_URL=https://tribusplit.com`. *(issue 1 — Program Policies: ser dueño del sitio)*
- [ ] Crear el buzón `contacto@tribusplit.com` (Cloudflare Email Routing) cuando esté el dominio. Ya está cargado en `shared/brand.ts`. *(issue 4 — Publisher Policies: Misrepresentation / transparencia)*
- [ ] Dar de alta la cuenta de AdSense, agregar el sitio y pegar el meta tag o el snippet de verificación en el `<head>` de la home (ES y EN). *(issue 3 — Connect your site to AdSense)*
- [ ] Cargar el ID real como `VITE_ADSENSE_CLIENT` en las variables de build: `ads.txt` y el meta tag de verificación se generan solos. *(issue 2 — ads.txt)*
- [ ] En AdSense → Privacy & messaging: crear el mensaje de consentimiento para EEE, Reino Unido y Suiza. *(issue 6 — EU User Consent Policy)*
- [x] Separar el anuncio del final de la lista de gastos del botón flotante "+", con más padding inferior. *(issue 7 — Ad placement policies: clics accidentales)*
- [ ] Alta en Google Search Console y envío de `sitemap.xml`. Esperar a que se indexen las guías antes de pedir la revisión. *(criterio de revisión del sitio)*

## 30-Day Fixes

Prioridad alta.

- [x] Reescribir las guías con casos paso a paso, capturas de la app y ejemplos con números (hoy de 630 a 1.245 palabras de cuerpo). *(issue 5 — Low value content)*
- [ ] Llevar las guías de menos de 800 palabras a 1.000 o más, con más casos y preguntas frecuentes. *(issue 5)*
- [x] Variar la estructura entre guías (no todas con `.tip` al final) y escalonar fechas de publicación y actualización reales. *(issue 5 — Spam Policies: Scaled content abuse)*
- [x] Sumar autoría: nombre, foto y breve bio en "Sobre nosotros" y como autor en las guías, también en el JSON-LD (`author: Person`). *(issue 8 — E-E-A-T / YMYL)*
- [ ] Completar la bio de Valentin (experiencia viajando en grupo, ciudad, foto opcional) en "Sobre nosotros" y en la caja de autor. *(issue 8 — E-E-A-T)*
- [x] Mostrar en el header en mobile el link a Guías. *(issue 13 — navegación)*
- [x] Ampliar los términos: edad mínima, ley aplicable, contenido cargado por usuarios, limitación de responsabilidad y la versión en inglés completa. *(issue 11 — transparencia)*
- [x] Agregar a la política de privacidad la sección de menores ("no dirigido a menores de 13 años") y el detalle del CMP real. *(issue 12 — Child-directed content)*
- [x] Revisar y fechar los datos financieros (comisiones, tipos de dólar) y mantener el descargo. *(issue 9 — YMYL)*

## 90-Day Improvements

Optimización.

- [ ] Publicar 1 o 2 guías por semana con temas de mayor valor publicitario, en inglés y en español para España: seguros de viaje, tarjetas sin comisión, eSIM, presupuestos por destino. *(Revenue Optimization)*
- [ ] Páginas de presupuesto por destino (por ejemplo, "Florianópolis en grupo: cuánto cuesta una semana"). *(Revenue Optimization)*
- [ ] Configurar el acceso del crawler de AdSense a la app (cuenta de prueba) una vez aprobada la cuenta. *(issue 14 — Display ads on login-protected pages)*
- [ ] Imágenes propias en las guías (capturas, gráficos simples). *(issue 15)*
- [ ] Etiquetar los bloques de anuncios ("Publicidad") y evaluar un segundo bloque en guías largas. *(issue 18 — Ad placement)*
- [ ] Unificar el separador de los títulos y agregar `hreflang` en privacidad y términos. *(issues 16 y 17)*
- [ ] Medir Core Web Vitals en producción con PageSpeed y corregir lo que aparezca. *(UX)*
- [ ] Evaluar links de afiliados (seguro de viaje, eSIM) como complemento de AdSense. *(Revenue Optimization)*
