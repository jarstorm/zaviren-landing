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
| 3 | Confirmar redirect www→non-www | P0 | ✅ | Resuelto 2026-08-11 sin depender de soporte Hostinger (su forwarding de hPanel no soporta el alias CDN de `www`) — 301 vía `.htaccess`/mod_rewrite (`public/.htaccess`), ya activo en el hosting por el fix previo de `/contacto`. Verificado en producción: `curl -I https://www.zaviren.com/about` → `301` `location: https://zaviren.com/about` |
| 4 | Página 404 custom con enlace a home | P0 | ✅ | Implementado 2026-08-11 — `src/pages/404.astro`, bilingüe (ES+EN), enlaces a ambas home |
| 5 | Corregir `name` de campos del formulario EN (nombre→firstname, etc.) | P0 | ✅ | Implementado 2026-08-11 — `id`/`name` de inputs en `en/contact.astro` y `en/guide.astro` pasan a `firstname`/`lastname`/`company`; payload al Worker sigue con claves `nombre`/`apellidos`/`empresa` (esquema fijo, no tocado en `worker/src/index.ts`) |
| 6 | H1/subtítulo home hacia intención comercial ("IA privada para empresas") | P1 | ✅ | Implementado 2026-08-11 — H1 ES: "IA privada para tu empresa" (antes "IA soberana, bajo tu control"); H1 EN: "Private AI for your business" (antes "Sovereign AI, under your control"). Subtítulo sin cambios |
| 7 | `organizationSchema` solo en home (no en todas las páginas) + `SoftwareApplication` schema | P1 | ✅ | Implementado 2026-08-11 — `Layout.astro`: nuevo `isHome` (`pathname === "/" \|\| "/en/"`) gatea el `<script>` de `organizationSchema`, que antes se inyectaba en todas las páginas; añadido `softwareApplicationSchema` (`@type: SoftwareApplication`), también solo en home. Verificado en `dist/`: home tiene Organization+SoftwareApplication+FAQPage, `/contact/` ya no tiene ninguno |
| 8 | Páginas legales (privacidad, aviso legal) | P1 | ⚠️ | Implementado 2026-08-11 con placeholders — ver nota abajo, falta rellenar datos reales |
| 9 | Página ancla `/ia-privada/` | P1 | ✅ | Implementada 2026-08-11 — ver detalle abajo |
| 10 | Página ancla `/rag-empresarial/` | P1 | ✅ | Implementada 2026-08-11 — ver detalle abajo |
| 11 | Artículo "¿Puede una empresa usar IA sin enviar datos a la nube?" | P2 | ✅ | Implementado 2026-08-11 — ver detalle abajo |
| 12 | Comparativa "IA privada vs ChatGPT" | P2 | ✅ | Implementado 2026-08-11 — ver detalle abajo. Incluye índice de blog + entrada en el nav |
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
  Verificado desde el repo más tarde el mismo día — SSL ya propagado, SAN
  correcto. Pedido a soporte el redirect 301 a nivel CDN — responden que
  su forwarding de hPanel no puede crear esa regla sobre el alias CDN de
  `www` (mismo falso positivo de nameservers de antes). En vez de esperar
  más vueltas de soporte, resuelto desde el repo: `www` y el dominio
  principal comparten el mismo despliegue (`deploy` branch) y `.htaccess`
  ya se ejecuta ahí (mod_rewrite activo, usado para el 301 de
  `/contacto`) — añadida `RewriteCond %{HTTP_HOST} ^www\.zaviren\.com$`
  al principio de `public/.htaccess` antes de las reglas de path, 301 a
  `https://zaviren.com$1` preservando ruta. Verificado en producción:
  `curl -I https://www.zaviren.com/about` → `301` +
  `location: https://zaviren.com/about`.

## Descartado (ya resuelto o no aplica)

- "Avísame cuando esté listo" en /contacto — texto ya no existe, se hizo
  split contact/guide (commit `847f0fc`, 2026-08-07).
- Producto "pre-lanzamiento" — copy ya actualizado.

## Bloqueante actual

Ninguno. P0 completo (#1-#5). P1 completo salvo #8 (placeholders legales
pendientes de datos reales). P2: #11 y #12 implementados; queda #13 (primer
caso de éxito), **bloqueado por falta de cliente real con datos
demostrables** — no inventar cifras. Siguiente desbloqueable: los P3
(#14-#18).

## Detalle #10 — Página ancla `/rag-empresarial/` (2026-08-11)

Segunda página comercial ancla, mismo molde que #9 (`/ia-privada/`):
páginas `/rag-empresarial` (ES) + `/en/rag-for-business` (EN), `hreflang`
cruzado vía `altHref`, mismos componentes/clases CSS (sin CSS global
nuevo). Ángulo distinto al de #9 — #9 vende "por qué IA privada
(soberanía de datos)", esta vende "por qué RAG (encontrar información
real en tus documentos)", con su propio ángulo de búsqueda:

1. Qué es el RAG empresarial — definición + 3 cards, sustituye al
   buscador interno que no encuentra nada.
2. Por qué importa — coste oculto de no encontrar información (tiempo
   perdido, conocimiento que se va con la gente, decisiones sin toda la
   información).
3. Cómo funciona — 4 pasos (ingesta multi-formato, indexado semántico,
   recuperación híbrida, respuesta citada).
4. Casos de uso — grid de 4 (soporte/IT, legal, RR. HH., operaciones).
5. Comparativa RAG empresarial vs buscador interno clásico.
6. FAQ (5 preguntas, incluida "¿es lo mismo que la IA privada de
   Zaviren?" enlazando a `/ia-privada`) + schema `FAQPage`.
7. CTA final a `/contact`.

**Nav de sitio añadido** (pedido explícito del usuario, no estaba en el
roadmap original): antes `topbar` (`Layout.astro`) solo tenía logo +
switch de idioma, sin forma de navegar entre páginas salvo enlaces sueltos
dentro del copy — con 2 páginas ancla + contacto + guía ya no escalaba.
Añadido `<nav class="site-nav">` entre logo y switch de idioma, links
generados en `Layout.astro` según `lang` (`IA privada` / `RAG empresarial`
/ `Contacto`, y su equivalente EN), con estado `active` por
`Astro.url.pathname`. Sin "Inicio"/"Home" en el nav — pedido explícito del
usuario, el logo ya cubre esa función. Oculto bajo 720px (`site.css`,
mismo breakpoint que el resto del sitio) para no romper el `topbar` en
mobile — no se construyó menú hamburguesa, fuera de alcance de este pick.

Enlazado interno: añadido segundo `.detail-link` en la sección "03 · Cómo
lo resolvemos" de la home (ES+EN), junto al de `/ia-privada` ya existente.

Decisión de URL: `/rag-empresarial` sobre `/rag-on-premise` (opción
original del roadmap) — pick del usuario, mejor intención de búsqueda en
español.

## Detalle #11 — Artículo `/blog/puede-empresa-usar-ia-sin-nube` (2026-08-11)

Primer post del blog (no existía la sección antes de este pick). Decisión
de estructura (confirmada con el usuario): `/blog/slug` en vez de página
ancla suelta — escala mejor para #12/#13 y el resto de contenido P2/P3 —
y sin enlace en el nav de sitio todavía (esperar a 2-3 artículos antes de
añadir "Blog" al `topbar`).

Contenido, en línea con la intención de búsqueda informacional (top of
funnel, no comercial): respuesta directa arriba (bloque `callout` con
borde azul, pensado para featured snippet/AEO), contexto de por qué la
pregunta surge ahora, qué significa arquitectónicamente "sin nube", qué
hace falta para implementarlo (3 piezas), RGPD, FAQ (schema `FAQPage`) +
schema `BlogPosting`. Enlaza a `/ia-privada` y `/rag-empresarial` como
profundización. Páginas: `/blog/puede-empresa-usar-ia-sin-nube` (ES) +
`/en/blog/can-a-company-use-ai-without-sending-data-to-the-cloud` (EN),
`hreflang` cruzado vía `altHref`.

Estilo alineado con #9/#10 (mismas clases CSS globales, sin CSS nuevo
fuera de lo específico del post): eyebrows numerados por sección,
`cap-grid` para los 3 pasos de implementación, `split` + ilustración
reutilizada (`secure-server.svg`, la misma de `/ia-privada`) para la
sección de arquitectura — la primera versión era un muro de texto plano
sin ese tratamiento, corregido a petición del usuario.

Enlazado interno (para que el artículo no quede huérfano de SEO, mismo
motivo por el que existe este ítem): tercer pill (`detail-btn-outline`,
estilo nuevo — outline en vez de sólido, para distinguir contenido
editorial de las páginas de producto) en la sección "03 · Cómo lo
resolvemos" de la home (ES+EN), junto a los de #9/#10; y enlace "Leer
más" desde el pie de `/ia-privada`, `/rag-empresarial` y sus
equivalentes EN, en la misma fila que "Volver a la portada"
(`justify-content: space-between`).

## Detalle #12 — Comparativa `/blog/ia-privada-vs-chatgpt` (2026-08-11)

Segundo post del blog. Páginas `/blog/ia-privada-vs-chatgpt` (ES) +
`/en/blog/private-ai-vs-chatgpt` (EN), `hreflang` cruzado vía `altHref`.

**Decisión de tono (pedido explícito del usuario): comparativa honesta, no
página de venta.** El artículo reconoce abiertamente dónde pierde la IA
privada — de los 8 criterios cara a cara, la nube gana 3 (amplitud de
conocimiento general, velocidad para empezar, mantenimiento cero), la IA
privada gana 4 y uno queda en empate. La sección "según tu caso" llega a
recomendar **empezar por la nube** para equipos pequeños sin datos
sensibles. Motivo: en intención de búsqueda de evaluación comercial, una
comparativa que solo dice que gana el producto propio no convierte y
además se lee como publicidad; la credibilidad es el activo aquí.

**Todos los proveedores cloud tratados como una misma categoría** (también
pedido explícito): ChatGPT, Copilot, Claude y Gemini se analizan juntos
porque lo que cambia el análisis es la arquitectura (dónde vive el modelo,
a dónde viaja el dato), no el proveedor. Hay un `callout` al principio que
lo dice explícitamente, y una FAQ que responde a "¿por qué los tratáis
igual?" — así se evita que el lector lo lea como un descuido.

**Diseño distinto al de #9/#10/#11** (pedido explícito: "mismos estilos
pero que no sea la misma página"). En vez de `risk-grid`/`cap-grid` de
cards uniformes, el patrón visual propio es:

- `tradeoff-card` — una tarjeta ancha por criterio, con título a la
  izquierda y un `chip` de veredicto a la derecha (azul = gana la nube,
  morado = gana la IA privada, gris/outline = empate), y el cuerpo partido
  en dos columnas etiquetadas ("Nube" / "IA privada"). Colapsa a una
  columna bajo 720px.
- `profile-card` — 3 tarjetas de perfil de empresa, cada una con un pill
  de veredicto en degradado.
- `verdict-pill` en el hero ("Spoiler: no hay un ganador único").
- `callout` con borde morado (el de #11 es azul) para distinguirlo.

Todo el CSS nuevo vive con scope de página; no se tocó `site.css` salvo
nada. Los colores salen de las variables existentes (`--blue`,
`--purple`), así que encaja con el resto sin ser la misma plantilla.

Schemas: `BlogPosting` + `FAQPage` (5 preguntas, incluida la de coste, que
se responde de forma honesta — no publicamos cifra genérica porque
dependería del volumen).

### Índice de blog + entrada en el nav (mismo pick)

Con 2 artículos ya tocaba (#11 dejó anotado "esperar a 2-3 artículos"):

- `src/data/posts.ts` — fuente única de la lista de posts (`postsEs` /
  `postsEn`: href, título, extracto, fecha, tiempo de lectura, tag).
  **Al publicar un artículo nuevo hay que añadirlo ahí**, o no aparece en
  el índice.
- `/blog` (ES) + `/en/blog` (EN) — índice con `post-card` (tag, fecha,
  tiempo de lectura, extracto), CTA final y `BackLink`.
- `Layout.astro` — "Blog" añadido a `navLinks` (ahora 4 items). El estado
  `active` del nav pasó de comparación exacta de `pathname` a
  `isActiveNav()`: para el enlace de blog usa `startsWith(blogRoot)`, así
  el nav marca "Blog" también dentro de un artículo. El resto de enlaces
  sigue con igualdad exacta.

Enlazado interno añadido: cuarto pill en "03 · Cómo lo resolvemos" de la
home (ES+EN); enlace "Comparativa completa, con las desventajas incluidas
→" bajo la tabla comparativa de `/ia-privada` y `/en/private-ai`; y enlace
"Leer más" en el pie del post #11 hacia este.

Bug corregido durante la revisión en navegador: en el párrafo de cierre de
la sección 02, los `<a>` en línea propia dentro del JSX perdían el espacio
previo al renderizar ("es laIA privada", "conRAG empresarial") — Astro
colapsa el salto de línea antes de un elemento inline sin dejar espacio.
Fix: el párrafo entero en una sola línea. Aplicado en ES y EN.

Pendiente de verificación: no se pudo forzar el viewport móvil en el
Chrome de pruebas (ventana en fullscreen, `resize_window` sin efecto) —
las reglas responsive siguen el mismo patrón ya usado en el resto del
sitio (grid a `1fr` bajo 720px) pero no se vieron renderizadas.

### Ajustes posteriores del mismo día (2026-08-11)

- **Nota de vigencia en el artículo #12.** Pregunta del usuario sobre si es
  legal nombrar a ChatGPT/Copilot/Claude por su marca. Sí lo es: la
  publicidad comparativa está permitida por el art. 10 de la Ley 3/1991 de
  Competencia Desleal (transposición de la Directiva 2006/114/CE) siempre
  que compare productos con la misma finalidad, sea objetiva sobre
  características verificables, no denigre y no se aproveche de la
  reputación ajena — el artículo cumple las cuatro (de hecho reconoce que
  la nube gana 3 criterios y llega a recomendarla). No se usan logos, solo
  uso referencial del nombre. Decisión del usuario: **mantener los nombres
  en título, URL y cuerpo** — es de donde sale el tráfico de búsqueda, y
  neutralizarlo a "IA en la nube" dejaría el artículo sin intención de
  búsqueda. Se añadió eso sí un `callout-note` al pie del callout inicial:
  "comparación basada en información pública a 11 de agosto de 2026, las
  políticas de los proveedores cambian" — el riesgo real aquí no es legal,
  es que una comparativa sin fecha envejezca mal. Cuidado al editar el
  copy: afirmar cosas tipo "ChatGPT entrena con tus datos" sí sería
  atacable (falso para los planes Enterprise) — el texto actual está
  matizado a propósito ("con planes empresariales hay contratos y
  garantías, pero el dato sale igual de tu perímetro").
- **Fecha del artículo #11 retrasada a 2026-07-15** (pedido del usuario:
  "que sea de hace unos 27 días") — para espaciar el calendario editorial
  en vez de tener los dos posts publicados el mismo día. Tocados
  `publishedDate` y el badge visible en ES y EN, más `src/data/posts.ts`.
  `dateModified` del schema `BlogPosting` queda fijado a `2026-08-11`
  (fecha real de la última edición), así que ya no se deriva de
  `publishedDate` como antes.
