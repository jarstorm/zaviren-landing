# SEO / contenido — roadmap y progreso

Documento vivo. Origen: análisis cruzado de Claude, ChatGPT y Perplexity
sobre zaviren.com (2026-08-10, ver `docs/todo.txt` para el texto completo de
los 3 informes). Cada ítem se marca ✅ al implementarse, con fecha y nota
de qué se hizo — mismo estilo que el catálogo de
`/Users/javi/workspace/rag-offline/docs/operations/11-mejoras-propuestas.md`.

## Estado

| # | Acción | Prioridad | Estado | Nota |
|---|--------|:---:|:---:|------|
| 1 | Verificar indexación real en Search Console | P0 | ✅ | Verificado 2026-08-11 — `https://zaviren.com/` está indexada, con clics registrados |
| 2 | Confirmar/descartar interstitial anti-bot bloqueando Googlebot | P0 | ✅ | Verificado 2026-08-11 — sin bloqueo. Encontrado bug distinto en el proceso: ver nota abajo |
| 3 | Confirmar redirect www→non-www | P0 | ⏳ | SSL propagado 2026-08-11 (SAN ya incluye `www.zaviren.com`, verificado). `www` sirve 200 directo — falta pedir a soporte Hostinger el redirect 301 www→non-www, fuera del repo |
| 4 | Página 404 custom con enlace a home | P0 | ✅ | Implementado 2026-08-11 — `src/pages/404.astro`, bilingüe (ES+EN), enlaces a ambas home |
| 5 | Corregir `name` de campos del formulario EN (nombre→firstname, etc.) | P0 | ✅ | Implementado 2026-08-11 — `id`/`name` de inputs en `en/contact.astro` y `en/guide.astro` pasan a `firstname`/`lastname`/`company`; payload al Worker sigue con claves `nombre`/`apellidos`/`empresa` (esquema fijo, no tocado en `worker/src/index.ts`) |
| 6 | H1/subtítulo home hacia intención comercial ("IA privada para empresas") | P1 | ✅ | Implementado 2026-08-11 — H1 ES: "IA privada para tu empresa" (antes "IA soberana, bajo tu control"); H1 EN: "Private AI for your business" (antes "Sovereign AI, under your control"). Subtítulo sin cambios |
| 7 | `organizationSchema` solo en home (no en todas las páginas) + `SoftwareApplication` schema | P1 | ✅ | Implementado 2026-08-11 — `Layout.astro`: nuevo `isHome` (`pathname === "/" \|\| "/en/"`) gatea el `<script>` de `organizationSchema`, que antes se inyectaba en todas las páginas; añadido `softwareApplicationSchema` (`@type: SoftwareApplication`), también solo en home. Verificado en `dist/`: home tiene Organization+SoftwareApplication+FAQPage, `/contact/` ya no tiene ninguno |
| 8 | Páginas legales (privacidad, aviso legal) | P1 | ⚠️ | Implementado 2026-08-11 con placeholders — ver nota abajo, falta rellenar datos reales |
| 9 | Página ancla `/ia-privada/` | P1 | ✅ | Implementada 2026-08-11 — ver detalle abajo |
| 10 | Página ancla `/rag-empresarial/` o `/rag-on-premise/` | P1 | ❌ | Segunda página comercial ancla |
| 11 | Artículo "¿Puede una empresa usar IA sin enviar datos a la nube?" | P2 | ❌ | Plantilla para el resto de contenido |
| 12 | Comparativa "IA privada vs ChatGPT" | P2 | ❌ | Intención comercial de evaluación |
| 13 | Primer caso de éxito (solo si hay datos reales demostrables) | P2 | ❌ | No inventar cifras |
| 14 | Páginas sectoriales (`/ia-para-despachos/`, etc.) | P3 | ❌ | Solo si hay negocio real en el sector |
| 15 | SEO local España | P3 | ❌ | |
| 16 | YouTube / vídeo | P3 | ❌ | |
| 17 | Link building activo | P3 | ❌ | |
| 18 | Internacionalización más allá de ES/EN | P3 | ❌ | |

## Detalle #9 — Página ancla `/ia-privada/` (2026-08-11)

Páginas nuevas `/ia-privada` (ES) + `/en/private-ai` (EN), `hreflang`
cruzado entre ambas vía `altHref`. Estructura (mismos componentes/clases
CSS que ya usa `index.astro`, sin CSS global nuevo salvo un `.compare-grid`
con scope de página para la tabla comparativa):

1. Qué es la IA privada — definición corta + 3 cards (RAG explicado sin
   jerga).
2. Por qué importa — moat competitivo, privacidad/confidencialidad real,
   coste de no actuar (pedido explícito del usuario, no estaba en el plan
   original del roadmap).
3. Cómo funciona — mismo patrón de 4 pasos que la home.
4. Cómo se implementa — servidor dedicado en las oficinas del cliente:
   dimensionado a medida, sobre el almacenamiento actual (pedido explícito
   del usuario). Card de "mantenimiento remoto por Zaviren" quitada
   2026-08-11 — el usuario indicó que esa afirmación no es del todo
   correcta hoy, no forzar un claim de servicio no confirmado.
5. Ventajas — grid de 8 (control de datos, moat, RGPD, coste predecible,
   funciona sin internet, trazabilidad, escala, sin fuga de IP).
6. Comparativa IA privada vs ChatGPT/Copilot (dónde viven los datos, cita
   de fuente, RGPD, riesgo de alucinación).
7. FAQ (6 preguntas, incluidas dos nuevas sobre dónde vive el servidor y
   qué pasa si cae internet) + schema `FAQPage`.
8. CTA final a `/contact`.

Ajuste post-primera-versión: la sección 1 (Qué es) originalmente eran 2
párrafos largos — el usuario pidió reformatearlo, se partió en frase corta
+ 3 cards cortas, mismo patrón que el resto de la página en vez de bloque
de texto corrido.

Enlazado interno añadido desde la home (`index.astro` + `en/index.astro`,
sección "03 · Cómo lo resolvemos") con un link "Cómo funciona la IA
privada, en detalle →" hacia la página ancla — el roadmap original no lo
pedía explícitamente pero es lo que le da valor SEO a la página ancla
(recibir enlaces internos desde la home).

**Desplegado** a `deploy` 2026-08-11 (`ca7d5b3`).

## Detalle #8 — Páginas legales (2026-08-11)

Sin abogado disponible: se optó por redactar boilerplate estándar
(LSSI-CE/RGPD) en vez de un generador externo (AEPD Facilita RGPD /
Iubenda), para poder mantener los datos de identidad en un único fichero
versionado en vez de en un panel de terceros.

- 6 páginas nuevas: `/aviso-legal` + `/en/legal-notice`, `/privacidad` +
  `/en/privacy`, `/cookies` + `/en/cookies`. Las versiones EN llevan
  nota "traducción informativa, prevalece la versión ES".
- `src/data/legal.ts` — fuente única de datos de identidad
  (`companyName`, `taxId`, `address`, `registryInfo`), importada por las
  6 páginas. **Todos son placeholders `[PENDIENTE: ...]`** — razón
  social, NIF/CIF, domicilio y datos de Registro Mercantil pendientes de
  que el usuario los facilite. Hasta entonces las páginas están
  publicadas pero legalmente incompletas (mejor que 404, pero no vale
  como aviso legal real todavía). **Editar ese fichero y rebuild+deploy
  en cuanto se tengan los datos.**
- Cookie consent banner (`src/components/CookieBanner.astro`), hallazgo
  no pedido originalmente: `Layout.astro` cargaba Google Analytics
  (GA4) sin consentimiento previo, no conforme con RGPD/LSSI. Fix: el
  script de GA ya no se carga en `<head>`; el stub `dataLayer`/`gtag`
  siempre está presente (no fija cookies por sí solo), pero el `<script
  src="gtag/js...">` y el `gtag('config', ...)` solo se inyectan si el
  usuario acepta el banner (persistido en `localStorage`,
  `zaviren_cookie_consent`). Rechazar o no decidir no fija ninguna
  cookie de analítica.
- Enlaces a las 3 páginas añadidos al footer de `Layout.astro`
  (ES/EN-aware).
- Bug encontrado al probar el banner en vivo: `.cookie-banner{display:flex}`
  (regla de autor) pisaba el atributo `hidden` del HTML inicial — ambas son
  reglas de autor con la misma especificidad, y CSS gana por orden de
  cascada, así que el atributo `hidden` nunca tenía efecto real: el banner
  quedaba siempre pintado como `flex` aunque el JS pusiera `hidden=true`
  tras aceptar/rechazar. Fix: `site.css` — regla explícita
  `.cookie-banner[hidden] { display: none; }` antes de la regla base.
  Verificado con `getComputedStyle` antes/después del click (`flex` →
  `none`).
- De paso, componente `src/components/BackLink.astro` — unifica el enlace
  "&larr; Volver a la portada"/"&larr; Back to home" que antes vivía
  duplicado en 10 páginas y con estilo `.cta` (botón grande) en las 4
  páginas de gracias/thanks; ahora las 14 usan el mismo componente y el
  mismo estilo `.back-link` (enlace chico). `404.astro` queda fuera a
  propósito — texto distinto ("Ir al inicio"), lógica bilingüe por JS.

## Extra (encontrado al implementar #4/#5, no estaba en la lista original)

- Bug redirect auto-idioma (origin relativo): `Layout.astro` calculaba el
  destino con `new URL(altHref, Astro.site)` (siempre dominio de
  producción) en vez de relativo al origin actual — en local, el redirect
  de idioma sacaba de `localhost` y llevaba a `zaviren.com`. Corregido
  2026-08-11: el redirect resolvía contra `window.location.origin`; los
  `<link rel="alternate">` (SEO, deben ser absolutos) no se tocaron. Nota:
  este redirect se **eliminó por completo** el mismo día — ver hallazgo
  de verificación P0 abajo.
- Páginas cortas (`.thanks`: 404, gracias, contact/guide thanks) no
  llenaban el alto de la ventana, dejaban hueco vacío antes del footer.
  Corregido 2026-08-11 en `site.css` — `body`/`.wrap`/`main` a flex
  columna con `min-height: 100vh`, `.thanks` centrado verticalmente vía
  `main:has(> section.thanks)`. Afecta a todas las páginas con esa
  sección por igual.

## Hallazgos de la verificación P0 (2026-08-11)

- **Auto-redirect por idioma confundía a Googlebot (bug real, corregido).**
  `Layout.astro` redirigía toda visita a `/` hacia `/en/` (o viceversa) si
  `navigator.language` no coincidía con el idioma de la página
  (`window.location.replace`, ver commit del bug de origin arriba). Al
  probar "Inspección de URLs → Prueba en tiempo real" en Search Console
  para `https://zaviren.com/`, el HTML/captura que devolvió Google era el
  de `/en/` (con `canonical` apuntando a `/en/`) — Googlebot renderiza con
  locale `en-US` por defecto, disparaba el redirect, y veía contenido
  contradictorio con el `canonical`/`hreflang x-default` propios de `/`
  (curl sin JS sí servía ES correcto — el bug era solo con JS). Riesgo:
  Google podía terminar canonicalizando la home en inglés en vez de la
  española (mercado principal). Google desaconseja explícitamente estos
  auto-redirect por idioma detectado. **Fix 2026-08-11**: eliminado el
  script de redirect forzoso en `Layout.astro`; queda solo el enlace
  manual de cambio de idioma en la topbar (`<a class="lang-link">`), que
  ya existía. `404.astro` usa el mismo `localStorage`/`navigator.language`
  solo para elegir el texto visible (no redirige, no afecta indexación) —
  no se tocó.
- **www roto, no solo sin redirect.** DNS de `www.zaviren.com` está bien
  (`CNAME → www.zaviren.com.cdn.hstgr.net`, propagado globalmente —
  verificado con resolver local y 8.8.8.8), pero el certificado SSL de
  Hostinger (Lifetime SSL) solo tenía `zaviren.com` en el SAN — no
  `www.zaviren.com`. Cualquier visita a `https://www.zaviren.com/`
  (navegador o Googlebot) fallaba con error de certificado antes de
  llegar a servir contenido; tampoco había redirect configurado (pestaña
  "Redirecciones" del dominio, vacía).

  Intentar crear `www` como subdominio propio en hPanel (para forzar
  provisión de SSL) falla con "El dominio no apunta a nuestros
  nameservers" — falso positivo: el sitio usa el producto de hosting de
  Hostinger con deploy por Git (rama `deploy`, ver "Deploy" arriba) sobre
  su CDN, no hosting clásico con IP, y ese flujo de "Subdominios" no lo
  reconoce.

  2026-08-11, vía soporte de Hostinger (chat): confirman que reemitieron
  el certificado a las 06:23 UTC incluyendo `www.zaviren.com` en el SAN.
  Verificado desde el repo a las 07:23 UTC — **todavía no propagado**,
  `curl`/`openssl` externos siguen viendo el cert viejo (`CN=zaviren.com`
  sin `www` en SAN). Soporte estima 1-2h de propagación en el borde CDN
  (no es DNS, eso ya está propagado). **Pendiente**: reverificar más
  adelante y, una vez el cert negocie bien para `www`, pedirle a soporte
  que aplique el redirect 301 `www.zaviren.com` → `https://zaviren.com/`
  — nivel Hostinger, fuera del repo.

## Descartado (ya resuelto o no aplica)

- "Avísame cuando esté listo" en /contacto — texto ya no existe, se hizo
  split contact/guide (commit `847f0fc`, 2026-08-07).
- Producto "pre-lanzamiento" — copy ya actualizado.

## Bloqueante actual

P0 #1 y #2 verificados y resueltos 2026-08-11 (indexación real +
bug de auto-redirect corregido). Solo queda #3 (SSL/redirect de `www`),
que requiere acción del usuario en hPanel — no ejecutable desde el
código. Con #1/#2 despejados, P1 (H1 comercial, schema, páginas ancla)
ya tiene sentido empezar a trabajarse en paralelo a que el usuario
resuelva #3.
