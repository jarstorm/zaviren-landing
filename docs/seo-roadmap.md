# SEO / contenido — roadmap y progreso

Documento vivo. Origen: análisis cruzado de Claude, ChatGPT y Perplexity
sobre zaviren.com (2026-08-10, ver `todo.txt` para el texto completo de
los 3 informes). Cada ítem se marca ✅ al implementarse, con fecha y nota
de qué se hizo — mismo estilo que el catálogo de
`/Users/javi/workspace/rag-offline/docs/operations/11-mejoras-propuestas.md`.

## Estado

| # | Acción | Prioridad | Estado | Nota |
|---|--------|:---:|:---:|------|
| 1 | Verificar indexación real en Search Console | P0 | ❌ | Requiere acceso del usuario — no verificable desde código |
| 2 | Confirmar/descartar interstitial anti-bot bloqueando Googlebot | P0 | ❌ | Requiere Search Console → Inspección de URL en vivo |
| 3 | Confirmar redirect www→non-www | P0 | ❌ | Nivel DNS/Hostinger, fuera del repo |
| 4 | Página 404 custom con enlace a home | P0 | ❌ | `src/pages/404.astro` no existe |
| 5 | Corregir `name` de campos del formulario EN (nombre→firstname, etc.) | P0 | ❌ | Cuidado: alinear con `worker/src/index.ts` antes de tocar |
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

## Descartado (ya resuelto o no aplica)

- "Avísame cuando esté listo" en /contacto — texto ya no existe, se hizo
  split contact/guide (commit `847f0fc`, 2026-08-07).
- Producto "pre-lanzamiento" — copy ya actualizado.

## Bloqueante actual

P1/P2 no tienen sentido invertir esfuerzo hasta resolver P0 (si Google no
rastrea el sitio, contenido nuevo no sirve). P0 #1-3 requieren acceso o
confirmación del usuario, no son ejecutables solo con el código.
