# AdSense Compliance Audit — TribuSplit

- **Sitio auditado:** https://tribusplit.com (en vivo)
- **Fecha:** 1 de noviembre de 2026
- **Fuentes:**
  - el sitio publicado (HTML, `ads.txt`, `robots.txt`, `sitemap.xml` y cabeceras);
  - el repo local, para las fechas de las guías;
  - RDAP, para la fecha de registro del dominio;
  - los DNS, para el MX.
- **Plan de acción:** [action-plan.md](action-plan.md)

> **Lo que no pude verificar:**
> - El panel de AdSense: si el sitio está agregado, en qué estado está y si el mensaje de consentimiento (CMP) está publicado.
> - El informe "Páginas" de Search Console, que todavía se está procesando.
> - Core Web Vitals: la API de PageSpeed devolvió cuota agotada.
> - El tráfico real.

## Historial de puntajes

| Fecha | Total | Estado |
|---|---|---|
| 24/10 (repo, sin publicar) | 63 → 74 | FAIL: faltaban dominio, ID y CMP |
| 25/10 | 75 | FAIL, por el mismo motivo |
| **01/11 (en vivo)** | **80** | **CONDITIONAL PASS**: listo técnicamente, falta madurez de indexación |

## Executive Summary

**Overall Score:** 80 / 100, "Ready" (en el límite).
**Approval Probability:**
- **Si se pide la revisión hoy:** entre 35 y 50 %. El dominio tiene 3 días (registrado el 29/10/2026) y Google todavía no indexó las páginas.
- **Con la indexación confirmada** (2 a 4 semanas), el CMP publicado y algo de tráfico orgánico: entre 65 y 75 %.

No encontré **ninguna infracción confirmada**. La parte técnica está completa: `ads.txt` válido, meta tag y script de AdSense en el `<head>`, `robots.txt` que deja pasar a Mediapartners-Google, sitemap con 45 URLs, 404 real y HTTPS.

Hay contenido suficiente y de buen tamaño:
- 35 páginas de contenido (guías de 817 a 1.801 palabras y 6 herramientas de 531 a 698);
- autor identificado y contacto con un dominio propio que recibe correo.

El riesgo que queda no es de políticas sino de **madurez**. Un dominio recién nacido, sin páginas indexadas ni tráfico, es el perfil típico de "el sitio no está listo" o de rechazo por contenido de poco valor. El revisor no tiene señales externas que confirmen que el sitio aporta valor.

| Dimensión | Puntaje | Peso |
|---|---|---|
| Content Quality | 80 | 30 % |
| Policy Compliance | 90 | 20 % |
| Trust Signals | 80 | 20 % |
| UX Quality | 85 | 15 % |
| Monetization Readiness | 62 | 15 % |
| **Total ponderado** | **80** | |

**Método:** promedio ponderado. Contenido y confianza pesan más porque son la causa más frecuente de rechazo.

## Critical Issues

Ninguno confirmado.

## High Priority Issues

1. **Dominio de 3 días y sin indexación confirmada** *(riesgo potencial)*.
   - RDAP da como fecha de registro el 29/10/2026.
   - En Search Console, el sitemap muestra 45 URLs descubiertas y el informe "Páginas" sigue procesando.
   - AdSense no exige una antigüedad mínima, pero pide contenido que "atraiga audiencia" y valor suficiente antes de monetizar. Sin páginas en el índice de Google ni visitas, el revisor no tiene esa evidencia.
   - *Política: AdSense eligibility requirements, contenido de calidad que atraiga audiencia; "What to do when your site isn't ready to show ads".*
2. **Mensaje de consentimiento (CMP) sin verificar** *(falta evidencia)*.
   - La política de privacidad dice que se usa la herramienta de consentimiento de Google certificada para el TCF.
   - No pude confirmar que el mensaje esté **creado y publicado** en AdSense → Privacidad y mensajes. Sin él, no se sirven anuncios personalizados en el EEE, el Reino Unido ni Suiza, y la privacidad estaría prometiendo algo que no ocurre.
   - *Política: EU User Consent Policy; Publisher Policies — Misrepresentation.*

## Medium Priority Issues

3. **Contenido publicado en tandas** *(riesgo potencial)*.
   - Las 35 guías aparecieron en 2 semanas, en bloques con la misma fecha: 13 guías en inglés el 18/10, después 5, 5, 2 y 4.
   - No es una infracción, porque el contenido es distinto, largo y tiene capturas propias. Pero un ritmo de publicación en ráfagas es una de las señales que mira la política de abuso de contenido a escala.
   - De ahora en adelante conviene publicar con un ritmo regular.
   - *Política: Spam Policies — Scaled content abuse.*
4. **Fechas de las guías anteriores al dominio** *(confirmado, bajo impacto)*. Varias dicen "Actualizado el 24 de octubre de 2026", y el dominio existe desde el 29/10. Es coherente si el contenido se escribió antes, pero un revisor atento puede notar la inconsistencia. No hace falta cambiarlas, y no conviene inventar fechas. *Política: Search Quality Rater Guidelines — confianza.*
5. **Core Web Vitals sin medir en producción** *(falta evidencia)*. La API de PageSpeed no respondió por cuota. Hay que medir a mano la home, una guía y una herramienta en mobile. *Política: Better Ads / Ad Experience; calidad de la experiencia.*
6. **Herramientas con menos texto que las guías** *(riesgo bajo)*. Tienen entre 531 y 698 palabras. Para una calculadora es razonable, porque la herramienta es el valor. Aun así, no conviene poner más de un bloque de anuncios en esas páginas. *Política: Publisher Policies — Valuable inventory.*

## Low Priority Issues

7. **`X-Frame-Options: DENY` en todo el sitio** *(potencial)*. Los anuncios no se ven afectados, porque son iframes dentro de la página. Pero algunas vistas previas del panel de AdSense, como la de anuncios automáticos, cargan el sitio dentro de un frame y pueden mostrar "rechazó la conexión". Si molesta, se puede relajar solo en las páginas públicas. *Sin política asociada: herramienta del panel.*
8. **Privacidad y términos bilingües en una sola URL** *(confirmado)*. No tienen `hreflang` propio. Es menor, porque las dos versiones están en la misma página. *Política: buenas prácticas de Search.*
9. **Anuncios dentro de la app** *(para después de aprobar)*.
   - Hoy no hay bloques configurados en la app, porque faltan `VITE_ADSENSE_SLOT_*`.
   - Al activarlos:
     - no ponerlos en pantallas sin contenido, como login, unirse o crear viaje;
     - mantenerlos lejos del botón "+".
   - *Política: Ad placement policies — clics accidentales; ads on screens without publisher content.*

## Content Quality Assessment

- **Volumen:** 35 URLs de contenido, 45 en el sitemap:
  - 18 guías en español y 14 en inglés;
  - 6 herramientas;
  - índices, home, nosotros, contacto, privacidad y términos.
- **Profundidad:** las guías tienen entre 817 y 1.801 palabras, con un promedio cercano a 1.050. Incluyen ejemplos con números, preguntas frecuentes, tablas y capturas reales de la app.
- **Originalidad y experiencia:**
  - hay casos propios, como la Costa Atlántica, que cuenta experiencia personal;
  - hay temas locales con valor real, como dólar tarjeta/MEP/blue y Pix en Brasil;
  - las guías en inglés están adaptadas, no solo traducidas.
- **Riesgos:** la cantidad publicada en poco tiempo (punto 3) y que el sitio todavía es un producto con contenido de apoyo. Las guías se sostienen solas, así que no lo veo como un problema.
- **Uso de IA:** sin señales de contenido generado sin revisar. Los textos tienen datos concretos, enlaces internos coherentes y fuentes citadas en las guías con datos.

## Publisher Policy Assessment

No hay contenido sexual, violento, de odio, peligroso, ilegal, de armas, drogas ni apuestas. Tampoco hay infracciones de copyright: las imágenes son capturas propias. El contenido financiero es informativo y fechado, con descargo, sin promesas ni asesoramiento. **Cumple.**

## Publisher Restriction Assessment

No hay alcohol, citas, temas sociales sensibles, salud ni política. Los tipos de dólar en Argentina son información de cambio, no especulación. **Sin restricciones aplicables.**

## Invalid Traffic Assessment

- No hay incentivos para hacer clic, ni intercambio de tráfico, ni pop-ups.
- Los bloques están etiquetados como "Publicidad".
- El anuncio de la app ya está separado del botón flotante.
- Recomendación: no hacer clic en tus propios anuncios ni pedirle a nadie que lo haga, y no comprar tráfico al empezar.

**Riesgo bajo.**

## Spam Policy Assessment

- No hay contenido oculto, cloaking, páginas puerta, dominio expirado ni abuso de reputación de terceros.
- Los pares es/en usan `hreflang` y canonical correctos.
- Solo hay una señal a vigilar: la publicación en tandas (punto 3).

**Cumple, con un riesgo menor.**

## Trust & Transparency Assessment

- **Nosotros:** autor con nombre, ciudad, bio, experiencia y LinkedIn; `Person` en JSON-LD; caja de autor en cada guía.
- **Contacto:** `contacto@tribusplit.com`, con MX activo en Cloudflare Email Routing.
- **Privacidad:** cubre cookies de AdSense, publicidad personalizada, CMP en EEE/UK/Suiza, menores de 13 años y ausencia de analítica.
- **Términos:** completos.
- **Pendiente:** confirmar que el correo de contacto llegue a una casilla que leés, con un mail de prueba.

## User Experience Assessment

- **Navegación:** clara, con header y footer que enlazan guías, herramientas, legales e idioma. El 404 es real.
- **Mobile:** diseño responsive y probado en 320 a 390 px. Las tablas no desbordan.
- **Velocidad:** el HTML responde en 0,08 a 0,3 s desde Cloudflare. Faltan las métricas de Lighthouse y CrUX (punto 5).
- **Interacción:** hay animaciones de hover y foco visible.

## Monetization Assessment

- **Listo:**
  - `ads.txt`: `google.com, pub-2261714480132826, DIRECT, f08c47fec0942fa0`;
  - meta `google-adsense-account`;
  - el script `adsbygoogle` en las páginas públicas, no en la app;
  - `robots.txt` deja a Mediapartners-Google ver `/app/`.
- **Falta:** indexación, tráfico y CMP publicado. Los temas (viajes, seguros, tarjetas, eSIM) tienen buena demanda de anunciantes.

## Revenue Optimization Opportunities

- Guías de mayor valor publicitario en inglés: seguros, tarjetas sin comisión, eSIM, presupuestos por destino.
- Páginas de presupuesto por destino (por ejemplo, Florianópolis, Río o Bariloche en grupo).
- Después de aprobar, links de afiliados (seguro de viaje, eSIM) como complemento.
- Atraer tráfico de países que pagan más (EE. UU., Canadá, Australia, Reino Unido) con guías adaptadas.

## Ad Placement Recommendations

- **Guías:**
  - anuncios automáticos con la densidad baja-media, o un bloque dentro del artículo después del segundo `h2` más uno antes de las preguntas frecuentes;
  - anclado en mobile sí;
  - viñeta (vignette) mejor apagada al principio.
- **Herramientas:** un solo bloque debajo del resultado, nunca entre el input y el botón.
- **App:** solo en Resumen y al final de la lista de gastos, lejos del "+". Nada en login, unirse ni crear viaje.
- **Home:** como mucho un bloque, debajo de los primeros contenidos, no en el hero.

## Approval Readiness Verdict

**CONDITIONAL PASS.**

Ni las políticas ni la parte técnica bloquean nada. La condición es esperar a que Google indexe las páginas y confirmar que el CMP está publicado antes de pedir la revisión.
