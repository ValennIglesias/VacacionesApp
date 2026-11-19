# AdSense Compliance Audit — TribuSplit

- **Sitio auditado:** https://tribusplit.com (en vivo)
- **Fecha:** 16 de noviembre de 2026
- **Fuentes:**
  - el sitio publicado: las 46 URLs del sitemap (todas responden 200), `ads.txt`, `robots.txt`, la 404 y las cabeceras;
  - el repo local, para las fechas de publicación de las guías;
  - un buscador web (no es Google), para ver presencia externa;
  - el export de **Rendimiento** de Search Console (últimos 3 meses, bajado el 16/11).
- **Plan de acción:** [action-plan.md](action-plan.md)

> **Lo que no pude verificar:**
> - El informe "Páginas" (indexación) de Search Console: el export es de Rendimiento, así que la indexación la deduzco de las páginas con impresiones.
> - El panel de AdSense: estado del sitio, si ya pediste la revisión y si el mensaje de consentimiento (CMP) está publicado.
> - Core Web Vitals: la API de PageSpeed no respondió en la auditoría anterior y no volví a medir.
> - El tráfico real.

## Historial de puntajes

| Fecha | Total | Estado |
|---|---|---|
| 24/10 (repo, sin publicar) | 63 → 74 | FAIL: faltaban dominio, ID y CMP |
| 25/10 | 75 | FAIL, por el mismo motivo |
| 01/11 (en vivo) | 80 | CONDITIONAL PASS: listo técnicamente, falta madurez de indexación |
| 16/11 (en vivo) | 81 | CONDITIONAL PASS: el sitio mejoró poco; la condición sigue siendo la misma |
| **16/11 (con Search Console)** | **82** | **CONDITIONAL PASS**: indexación confirmada; las impresiones cayeron a cero desde el 12/11 |

## Executive Summary

**Overall Score:** 82 / 100, "Ready".
**Approval Probability:**
- **Si se pide la revisión hoy:** entre 50 y 60 %. Google ya indexó casi todo, pero la caída de impresiones desde el 12/11 no tiene explicación todavía.
- **Si las impresiones vuelven (o se explica la caída) y el CMP está publicado:** entre 65 y 75 %.

**Search Console (28/10 al 14/11):** 5.086 impresiones y 4 clics. 40 de las 45 URLs del sitemap tuvieron impresiones, así que Google las indexó. La calculadora para dividir gastos concentra el 69 % (3.503 impresiones, posición media 7,5, sin clics), con público de toda Latinoamérica. Pero las impresiones diarias pasaron de 300–600 a 44 el 12/11 y a 0–1 desde el 13/11.

Desde el 1/11 se resolvieron dos puntos técnicos: `www.tribusplit.com` ahora redirige con 301 a `tribusplit.com`, y la 404 tiene navegación y enlaces a guías, con `noindex` y sin anuncios. Las 46 URLs del sitemap responden 200. Se publicó una guía nueva (tarjeta de crédito o débito en el exterior) y hay otra lista sin publicar (pagar en Chile).

**Lo honesto:** el sitio ya estaba listo hace dos semanas y casi no cambió. La indexación, que era la gran duda, está bien. El tráfico real es casi nulo (4 clics), y la caída de impresiones es lo que hay que entender antes de pedir la revisión. En producción no encontré nada que bloquee a Google: las páginas responden 200, sin `noindex` ni `X-Robots-Tag`, con canonical correcto. Las causas más probables son que terminó el empuje inicial que Google les da a las páginas nuevas, o que los últimos días del export todavía no están completos.

No encontré **ninguna infracción confirmada**.

| Dimensión | Puntaje | Peso | Cambio |
|---|---|---|---|
| Content Quality | 80 | 30 % | = (una guía más, ritmo lento) |
| Policy Compliance | 90 | 20 % | = |
| Trust Signals | 80 | 20 % | = |
| UX Quality | 87 | 15 % | +2 (www y 404) |
| Monetization Readiness | 70 | 15 % | +8 (indexación confirmada; tráfico casi nulo y en caída) |
| **Total ponderado** | **82** | | +2 |

**Método:** promedio ponderado. Contenido y confianza pesan más porque son la causa más frecuente de rechazo.

## Critical Issues

Ninguno confirmado.

## High Priority Issues

1. **Impresiones en cero desde el 12/11 y tráfico casi nulo** *(confirmado en Search Console; causa sin determinar)*.
   - Del 31/10 al 11/11: entre 290 y 600 impresiones por día. El 12/11: 44. Del 13/11 al 14/11: 0 y 1.
   - En total, 4 clics en 18 días. La calculadora tiene 3.503 impresiones en posición 7,5 y ningún clic, algo raro para esa posición.
   - En producción no hay bloqueos: 200, sin `noindex`, canonical correcto. Los cambios del 10/11 y 13/11 tocaron la app y la privacidad, no las páginas con impresiones.
   - Causas probables: fin del empuje inicial a páginas nuevas, o datos incompletos de los últimos días. Hay que mirarlo de nuevo en 2 o 3 días.
   - AdSense pide contenido que "atraiga audiencia". La indexación ya está; una caída a cero justo antes de la revisión no ayuda.
   - *Política: AdSense eligibility requirements; "What to do when your site isn't ready to show ads".*
2. **Mensaje de consentimiento (CMP) sin verificar** *(falta evidencia, sigue igual que el 1/11)*.
   - La política de privacidad dice que se usa la herramienta de consentimiento de Google certificada para el TCF.
   - Si el mensaje no está creado y publicado en AdSense → Privacidad y mensajes, la privacidad promete algo que no ocurre y no se sirven anuncios personalizados en el EEE, el Reino Unido y Suiza.
   - *Política: EU User Consent Policy; Publisher Policies — Misrepresentation.*

## Medium Priority Issues

3. **Ritmo de publicación: tandas al principio, casi nada después** *(riesgo potencial)*.
   - Del 18/10 al 30/10 se publicaron unas 30 guías en tandas. Del 1/11 al 16/11, una sola.
   - Primero ráfagas y después silencio es el patrón que más se parece a "sitio armado para monetizar". Lo que ayuda es un ritmo regular: 1 o 2 guías por semana.
   - *Política: Spam Policies — Scaled content abuse.*
4. **Guía de Chile lista pero sin publicar** *(confirmado)*. Está en el repo sin commitear y en producción da 404. Publicarla suma al ritmo regular. *Sin política asociada.*
5. **Core Web Vitals sin medir en producción** *(falta evidencia)*. Medir a mano en mobile la home, una guía y una herramienta. *Política: Ad Experience; calidad de la experiencia.*
6. **Herramientas con menos texto que las guías** *(riesgo bajo, sin cambios)*. Para una calculadora es razonable. No poner más de un bloque de anuncios ahí. *Política: Publisher Policies — Valuable inventory.*

## Low Priority Issues

7. **`X-Frame-Options: DENY` en todo el sitio** *(potencial, sin cambios)*. No afecta a los anuncios, pero algunas vistas previas del panel de AdSense pueden no cargar el sitio. *Sin política asociada.*
8. **Privacidad y términos bilingües en una sola URL** *(confirmado, sin cambios)*. Menor. *Política: buenas prácticas de Search.*
9. **Anuncios dentro de la app** *(para después de aprobar)*. Nada en login, unirse, crear viaje ni confirmar email; lejos del botón "+". *Política: Ad placement policies; ads on screens without publisher content.*

## Content Quality Assessment

- **Volumen:** 46 URLs en el sitemap: 31 guías (17 en español y 14 en inglés), 6 herramientas, índices, home, nosotros, contacto, privacidad y términos.
- **Profundidad y originalidad:** sin cambios respecto del 1/11. Guías largas, con ejemplos numéricos, capturas propias y temas locales con valor real (dólar tarjeta/MEP/blue, Pix, tarjetas en el exterior).
- **Riesgo:** el ritmo de publicación (punto 3).

## Publisher Policy Assessment

Sin contenido sexual, violento, de odio, peligroso, ilegal, de armas, drogas ni apuestas. Imágenes propias. Contenido financiero informativo, sin promesas ni asesoramiento. **Cumple.**

## Publisher Restriction Assessment

Sin alcohol, citas, temas sociales sensibles, salud ni política. **Sin restricciones aplicables.**

## Invalid Traffic Assessment

Sin incentivos para hacer clic, intercambio de tráfico ni pop-ups. **Riesgo bajo.** Al empezar: no comprar tráfico ni hacer clic en tus propios anuncios.

## Spam Policy Assessment

Sin contenido oculto propio, cloaking, páginas puerta, dominio expirado ni abuso de reputación. Hay un link oculto con `nofollow` que inyecta Cloudflare (protección contra bots); Google suele quedar excluido como bot verificado, pero si AdSense marca "sitio inaccesible", es lo primero que hay que revisar. **Cumple, con el riesgo del punto 3.**

## Trust & Transparency Assessment

Nosotros con autor identificado y LinkedIn, contacto con dominio propio, privacidad completa (cookies de AdSense, CMP, menores), términos. Ahora también hay login con Google y confirmación de email en la app, que no afectan la revisión. **Sin cambios: bien.**

## User Experience Assessment

- **Mejoras desde el 1/11:** `www` redirige con 301; la 404 tiene header, footer y enlaces a guías, en español e inglés.
- Navegación clara, diseño responsive, HTML rápido desde Cloudflare. Faltan métricas de Lighthouse.

## Monetization Assessment

- **Listo:** `ads.txt` válido, meta `google-adsense-account`, script de AdSense en las páginas públicas (no en la 404 ni en la app), `robots.txt` que deja pasar a Mediapartners-Google.
- **Indexación:** confirmada por Search Console (40 de 45 URLs con impresiones).
- **Falta (todo fuera del código):** entender la caída de impresiones, algo de tráfico real y el CMP publicado.
- **Audiencia:** mayormente Latinoamérica (México, Argentina, Perú, Colombia). Estados Unidos aparece con 386 impresiones en posición 33. Las guías en inglés de seguros y eSIM reciben búsquedas, pero en posiciones de 50 a 70.

## Revenue Optimization Opportunities

- Guías de mayor valor publicitario en inglés: seguros, tarjetas sin comisión, eSIM, presupuestos por destino.
- Páginas por destino (Chile, Brasil, Uruguay en grupo), que además dan ritmo de publicación.
- Después de aprobar: afiliados de seguro de viaje y eSIM.

## Ad Placement Recommendations

- **Guías:** anuncios automáticos con densidad baja-media, anclado en mobile, viñeta apagada al principio.
- **Herramientas:** un solo bloque debajo del resultado.
- **App:** solo en Resumen y al final de la lista de gastos.
- **Home:** como mucho un bloque, fuera del hero.

## Approval Readiness Verdict

**CONDITIONAL PASS.**

El sitio no tiene nada técnico ni de políticas que bloquee la aprobación, y la indexación ya está confirmada. Antes de pedir la revisión: ver si las impresiones vuelven en los próximos días y confirmar que el CMP está publicado.
