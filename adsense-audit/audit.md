# AdSense Compliance Audit — TribuSplit

- **Sitio:** TribuSplit (dominio previsto `tribusplit.com`, **todavía no publicado**)
- **Fuente:** código fuente del repo local `V:\Repos\Vacaciones` (build de producción revisado en `dist/`), no un sitio en vivo
- **Fecha:** 24 de octubre de 2026

> Limitación: como el sitio no está online, no se pudo evaluar lo que AdSense mira en vivo: velocidad real, indexación en Google, tráfico, antigüedad del dominio ni el aviso de consentimiento (CMP). Hay que repetir esos puntos una vez publicado.

## Actualización — 24 de octubre de 2026 (después de los arreglos)

| Dimensión | Inicial | Ahora | Qué cambió |
|---|---|---|---|
| Content Quality | 62 | 74 | Guías reescritas (630 a 1.245 palabras de cuerpo), 20 capturas reales de la app, ejemplos con números verificados, preguntas frecuentes, estructuras distintas, guías en inglés adaptadas y no solo traducidas |
| Policy Compliance | 85 | 88 | Privacidad con menores, CMP y preferencias locales |
| Trust Signals | 50 | 76 | `contacto@tribusplit.com`; autor firmado (Valentin, líder de proyectos UX, Buenos Aires) con bio, experiencia de viajes y LinkedIn; `Person` en JSON-LD; términos completos |
| UX Quality | 80 | 85 | Anuncio separado del botón flotante, Guías en el header mobile |
| Monetization Readiness | 35 | 40 | `ads.txt` y meta tag automáticos; faltan dominio, ID y CMP |
| **Total** | **63** | **74** | |

**Veredicto:** sigue en **FAIL** hasta publicar con dominio, ID de AdSense y el mensaje de consentimiento. Con eso hecho, Monetization pasa a unos 80 y el total a unos **80** (CONDITIONAL PASS / Ready). Para subir más: 2 a 4 guías nuevas y alargar las guías cortas.

Lo que sigue abajo es la auditoría inicial, sin cambios.

## Executive Summary

**Overall Score:** 63 / 100. Necesita mejoras importantes.
**Approval Probability:** hoy **0 %**, porque no se puede ni pedir la revisión: falta el dominio, el `ads.txt` es un placeholder y no está el código de verificación. Con los arreglos inmediatos hechos: **moderada, entre 40 y 60 %**, frenada sobre todo por guías cortas y señales de confianza flojas.

El contenido no tiene ningún tema prohibido ni restringido. Los riesgos son de **preparación** (dominio, `ads.txt`, verificación, CMP), de **confianza** (email de contacto falso, nadie identificado detrás del sitio) y de **valor del contenido**: 18 guías de 2 a 4 minutos, con la misma plantilla y la misma fecha. AdSense rechaza más que nada por "contenido de poco valor", así que ahí va el esfuerzo.

| Dimensión | Puntaje | Peso |
|---|---|---|
| Content Quality | 62 | 30 % |
| Policy Compliance | 85 | 20 % |
| Trust Signals | 50 | 20 % |
| UX Quality | 80 | 15 % |
| Monetization Readiness | 35 | 15 % |
| **Total ponderado** | **63** | |

Método: promedio ponderado; contenido y confianza pesan más porque son la causa más común de rechazo.

## Critical Issues

1. **Sin dominio propio publicado** *(confirmado)*. AdSense solo revisa un dominio raíz al que tengas acceso y que esté online; un subdominio `*.workers.dev` no sirve. — *AdSense Program Policies: ser dueño del sitio; requisitos de elegibilidad*
2. **`ads.txt` con placeholder** *(confirmado)*. `public/ads.txt` tiene `pub-XXXXXXXXXXXXXXXX`. Con un ID inválido, los compradores autorizados no coinciden y se pierde demanda. — *AdSense: Authorized Digital Sellers (ads.txt)*
3. **Falta el código de verificación del sitio** *(confirmado)*. El script de AdSense se inyecta solo si está configurado un bloque de anuncio (`src/landing.ts`), y no hay meta tag de verificación en `<head>`. AdSense necesita el snippet o el meta tag en la home para verificar el sitio. — *AdSense: Connect your site to AdSense*
4. **Email de contacto falso** *(confirmado)*. `shared/brand.ts` define `CONTACT = "contacto@example.com"`, que se publica en Contacto, Privacidad, Términos y en los emails. Un revisor que encuentra un contacto que no funciona lo lee como un sitio no confiable. — *Google Publisher Policies — Misrepresentation / transparencia del sitio; Search Quality Rater Guidelines — confianza*

## High Priority Issues

5. **Guías cortas y con la misma forma** *(riesgo potencial)*. Son 9 por idioma, de solo 330 a 680 palabras de texto, la mayoría con "2 min de lectura". Todas tienen la misma plantilla, la misma fecha (18 y 20 de octubre), autor "Organization", sin imágenes ni ejemplos propios de la app. Las 9 en inglés son traducciones o adaptaciones de las españolas. Es el patrón típico de "Low value content". — *AdSense Program Policies — contenido de poco valor; Spam Policies — Scaled content abuse (riesgo bajo por el volumen, pero la uniformidad suma)*
6. **Aviso de consentimiento (CMP) no configurado** *(confirmado para el código; falta configurarlo en AdSense)*. La política de privacidad promete pedir consentimiento en el EEE y el Reino Unido, pero no hay CMP. Desde enero de 2024 hace falta un CMP certificado con TCF para mostrar anuncios personalizados en el EEE y el Reino Unido, y desde julio de 2024 en Suiza. Sin CMP, la política promete algo que no pasa y esas visitas quedan con anuncios limitados. — *EU User Consent Policy; Google consent management requirements (EEA, UK, CH)*
7. **El anuncio dentro de la app queda debajo del botón flotante "+"** *(riesgo potencial)*. `<AdSlot slot="trip">` va al final de la lista de gastos. El contenedor tiene `pb-32` (128 px) y el botón flotante ocupa entre 88 y 152 px desde abajo, así que al llegar al final del scroll el botón tapa unos 24 px del borde derecho del anuncio. Se presta a clics accidentales. — *Ad placement policies — fomentar clics accidentales; Better Ads / Ad Experience Standards*
8. **No hay ninguna persona identificada detrás del sitio** *(confirmado)*. "Sobre nosotros" dice "proyecto independiente desarrollado en Argentina", sin nombre de responsable, ciudad ni razón social, y las guías no tienen autor. Para temas de dinero (YMYL), Google pondera la experiencia y la confianza (E-E-A-T). — *Search Quality Rater Guidelines — E-E-A-T, YMYL; Publisher Policies — Misrepresentation*

## Medium Priority Issues

9. **Contenido financiero (YMYL) con datos que envejecen** *(riesgo potencial)*. "Pagar en el exterior" da un rango de comisiones ("1 a 3 %") y la guía del dólar describe el blue y el tarjeta. Las dos tienen descargo o aclaran que es orientativo. Conviene revisar las fechas y que nadie lo lea como asesoramiento. — *Search Quality Rater Guidelines — YMYL; Publisher Restrictions (no aplica directo)*
10. **Mención del dólar blue (mercado informal)** *(riesgo bajo)*. Se lo describe de forma neutral, sin explicar cómo conseguirlo. No viola ninguna política, pero un revisor puede marcar contenido que "facilita" actividades informales. Mantenerlo descriptivo, como está. — *Google Publisher Policies — Illegal content (no se viola)*
11. **Términos de uso muy breves** *(confirmado)*. Tienen 238 palabras y no incluyen ley aplicable, edad mínima ni contenido de usuarios. La versión en inglés omite la cláusula sobre datos de terceros. — *Transparencia y confianza del sitio*
12. **La privacidad no menciona menores de edad** *(confirmado)*. No dice que el servicio no está dirigido a menores de 13 años, o la edad que corresponda por país. AdSense pide no dirigir anuncios personalizados a menores. — *Google Publisher Policies — Child-directed content / COPPA*
13. **El link a Guías no se ve en el header en celulares** *(confirmado)*. En `site/partials.ts` y en la landing, el link tiene `hidden … sm:inline`: en mobile las guías solo se encuentran en el footer y en la sección de la home. — *Navegación clara (criterio de revisión del sitio)*
14. **Anuncios en pantallas detrás de login** *(riesgo potencial)*. El crawler de AdSense no puede loguearse, y el sitio no tiene que pedir login para que Google lo revise. Las páginas públicas sí son visibles, así que la revisión no se bloquea. Los anuncios de la app van a ser poco relevantes o se pueden limitar hasta configurar el acceso del crawler. — *Display ads on login-protected pages; Fix AdSense crawler issues*

## Low Priority Issues

15. Las guías no tienen imágenes propias (capturas de la app, gráficos de ejemplo). Sumarían valor y diferenciación. — *Calidad de contenido*
16. Los títulos no usan el separador de forma consistente: `|` en las guías, `·` en los índices. Es cosmético. — *SEO*
17. La política de privacidad tiene ES y EN en la misma URL. Funciona, pero no hay `hreflang` por idioma. — *SEO / UX*
18. Los anuncios no tienen etiqueta ("Publicidad"). No es obligatoria, pero ayuda a que no se confundan con contenido. — *Ad placement policies — anuncios que parecen contenido*

## Content Quality Assessment

- **Originalidad:** media-alta. Los textos son propios, con ejemplos numéricos y tablas, y no parecen copiados de otros sitios. El tema del dólar argentino, el blue y el MEP es un diferencial real.
- **Profundidad:** baja-media. Las guías explican el "qué" pero rara vez el "cómo, paso a paso, con un caso real". Ninguna llega a 1.000 palabras.
- **Señales de contenido generado en masa:** misma estructura, mismo largo, mismo cierre con `.tip`, publicadas todas el mismo día. Aisladas no son una violación; juntas hacen que el sitio parezca hecho en serie.
- **Duplicado:** EN y ES son equivalentes y están bien declarados con `hreflang`, así que no es contenido duplicado penalizable.
- **Volumen:** 18 guías más landing, about, contact y legales, unas 30 URLs. Alcanza en cantidad; falta calidad por página.

## Publisher Policy Assessment

No se encontró contenido sexual, violento, de odio, peligroso, de armas, drogas, apuestas ni malware. El servicio no mueve dinero y lo aclara en la landing, los términos y "Sobre nosotros". **Sin violaciones confirmadas.**

## Publisher Restriction Assessment

No hay alcohol, citas, política ni temas de salud. Las salidas y bebidas aparecen solo como categoría de gasto, sin promover alcohol. **Sin restricciones aplicables.**

## Invalid Traffic Assessment

- No hay incentivos para hacer clic ni textos tipo "apoyanos haciendo clic".
- Los anuncios no están junto a botones de pago ni a formularios; la regla figura en el comentario de `AdSlot`.
- **Riesgo:** el solapamiento con el botón flotante (issue 7).
- **Recomendación:** no hacer clic en los propios anuncios y no comprar tráfico barato al principio.

## Spam Policy Assessment

- No hay cloaking, texto oculto, páginas puerta ni dominios expirados.
- `robots.txt` bloquea `/app/` para los buscadores y lo permite para `Mediapartners-Google`. Eso es correcto: no es cloaking, porque el crawler de anuncios no indexa.
- **Riesgo leve:** que las guías se perciban como hechas en serie (issue 5).

## Trust & Transparency Assessment

| Elemento | Estado |
|---|---|
| Sobre nosotros | ✔ existe (ES y EN), pero anónimo |
| Contacto | ✖ el email es un placeholder |
| Privacidad | ✔ completa: datos, terceros (Cloudflare, Resend), cookies de Google, opt-out, retención y derechos. Faltan menores y el CMP real |
| Términos | ⚠ breves |
| Autoría | ✖ las guías no tienen autor |
| Datos del responsable | ✖ ninguno |

## User Experience Assessment

- **Fortalezas:**
  - mobile-first, con modo oscuro;
  - páginas estáticas livianas;
  - navegación con breadcrumbs, guías relacionadas y footer completo;
  - `404.html` propio;
  - headers de seguridad.
- **Debilidades:**
  - el link a Guías no aparece en el header en mobile;
  - el anuncio de la app queda bajo el botón flotante;
  - no se midieron las Core Web Vitals reales (falta el sitio online).

## Monetization Assessment

- **Ubicaciones actuales:**
  - landing, entre las guías y las preguntas frecuentes;
  - cada guía, al final del artículo y antes de "Seguí leyendo";
  - app, al final de la lista de gastos y en el resumen.
- **Público:** mayormente de Argentina y Latinoamérica, donde el pago por visita es bajo. Las guías en inglés y los temas de pagos y tarjetas apuntan a valores más altos.
- Faltan el dominio, el `ads.txt` real, la verificación y el CMP.

## Revenue Optimization Opportunities

1. Más guías en inglés de temas donde los anunciantes pagan más: seguros de viaje, tarjetas sin comisión, eSIM, presupuesto por destino (por ejemplo, "cuánto cuesta 1 semana en Florianópolis en grupo").
2. Páginas por destino con presupuesto de ejemplo y moneda local. Atraen búsquedas concretas.
3. Contenido en español pensado también para España (euros, Bizum, viajes por Europa).
4. Más adelante, links de afiliados (seguro de viaje, eSIM, cuentas multimoneda) como complemento, porque pagan igual sin importar el país.

## Ad Placement Recommendations

- **Para la revisión:** dejar el script o meta tag en la home, y los bloques manuales en landing y guías. No usar Auto ads en `/app/`; si se activan, que sea solo para landing y guías.
- **App:** separar el anuncio del final de la lista del botón flotante (más padding inferior o margen), y no ponerlo nunca en pantallas de carga, pago, unión ni formularios.
- **Guías largas:** más adelante, un segundo bloque a mitad del artículo cuando superen las 1.200 palabras.
- **Etiqueta:** opcional, "Publicidad" o "Anuncio".

## Approval Readiness Verdict

**FAIL** (hoy): no se puede presentar sin dominio, `ads.txt` real, verificación ni un contacto que funcione.

Después de los arreglos inmediatos y de alargar las guías: **CONDITIONAL PASS** esperable.

Información adicional necesaria para completar la auditoría:

- el dominio publicado;
- Search Console con el sitemap indexado;
- PageSpeed en producción;
- el mensaje de consentimiento configurado en AdSense.

---

Fuentes consultadas:

- [Google consent management requirements (EEA, UK, CH)](https://support.google.com/adsense/answer/13554116?hl=en)
- [Comply with the EU user consent policy](https://support.google.com/adsense/answer/7670013?hl=en)
- [New consent requirements for traffic in Switzerland](https://support.google.com/adsense/answer/14893312?hl=en)
- [Display ads on login-protected pages](https://support.google.com/adsense/answer/161351?hl=en-GB)
- [Ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en)
- [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en)
- [Connect your site to AdSense](https://support.google.com/adsense/answer/7584263?hl=en)
