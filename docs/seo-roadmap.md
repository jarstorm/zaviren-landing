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
| 3 | Confirmar redirect www→non-www | P0 | ⏳ | SSL de `www` reemitido por soporte Hostinger 2026-08-11, propagando (1-2h). Redirect 301 pendiente hasta confirmar propagación — ver nota abajo |
| 4 | Página 404 custom con enlace a home | P0 | ✅ | Implementado 2026-08-11 — `src/pages/404.astro`, bilingüe (ES+EN), enlaces a ambas home |
| 5 | Corregir `name` de campos del formulario EN (nombre→firstname, etc.) | P0 | ✅ | Implementado 2026-08-11 — `id`/`name` de inputs en `en/contact.astro` y `en/guide.astro` pasan a `firstname`/`lastname`/`company`; payload al Worker sigue con claves `nombre`/`apellidos`/`empresa` (esquema fijo, no tocado en `worker/src/index.ts`) |
| 6 | H1/subtítulo home hacia intención comercial ("IA privada para empresas") | P1 | ❌ | Actual: "IA soberana, bajo tu control" |
| 7 | `organizationSchema` solo en home (no en todas las páginas) + `SoftwareApplication` schema | P1 | ❌ | Hoy se inyecta en cada página vía `Layout.astro` |
| 8 | Páginas legales (privacidad, aviso legal) | P1 | ❌ | Obligatorio con formularios que recogen datos (RGPD) |
| 9 | Página ancla `/ia-privada/` | P1 | ❌ | Qué es / cómo funciona / vs ChatGPT / FAQ / CTA |
| 10 | Página ancla `/rag-empresarial/` o `/rag-on-premise/` | P1 | ❌ | Segunda página comercial ancla |
| 11 | Artículo "¿Puede una empresa usar IA sin enviar datos a la nube?" | P2 | ❌ | Plantilla para el resto de contenido |
| 12 | Comparativa "IA privada vs ChatGPT" | P2 | ❌ | Intención comercial de evaluación |
| 13 | Primer caso de éxito (solo si hay datos reales demostrables) | P2 | ❌ | No inventar cifras |
| 14 | Páginas sectoriales (`/ia-para-despachos/`, etc.) | P3 | ❌ | Solo si hay negocio real en el sector |
| 15 | SEO local España | P3 | ❌ | |
| 16 | YouTube / vídeo | P3 | ❌ | |
| 17 | Link building activo | P3 | ❌ | |
| 18 | Internacionalización más allá de ES/EN | P3 | ❌ | |

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
