## Deploy

**No hacer `git push` (a `main` ni a `deploy`) salvo que el usuario lo pida
explícitamente en ese momento** — commitear localmente está bien, pushear no.

Antes de cada push, generar `dist/` con `npm run build` y añadirlo al commit.

Hostinger sirve el sitio desde la rama `deploy` (orphan branch, sin
historial común con `main` — contenido de `dist/` aplanado en la raíz del
repo). **Tras cada push a `main` hay que actualizar `deploy` sí o sí**, o
el sitio en producción queda desfasado (ya pasó: PDF en inglés commiteado
en `main` pero nunca copiado a `deploy`, 404 en producción).

Pasos (usar worktree para no tocar el working dir de `main`):

```sh
npm run build   # asegura dist/ al día
git worktree add /tmp/deploy-wt deploy
rsync -a --delete --exclude='.git' dist/ /tmp/deploy-wt/
cd /tmp/deploy-wt && rm -f .DS_Store && git add -A && git commit -m "deploy: <resumen del cambio en main>"
git push origin deploy
cd - && git worktree remove /tmp/deploy-wt --force
```

## Redacción de contenido (que no parezca escrito por IA)

Todo el copy del sitio (páginas, posts, `title`/`description`, excerpts de
`src/data/posts.ts`) debe leerse como escrito por una persona. Reglas
obligatorias al escribir o editar texto visible:

- **Nada de raya (`—`) como conector de frase.** Usar punto, coma, dos
  puntos o paréntesis. En `title`, el separador de marca es `|`, no `—`.
  El sitio está hoy a cero rayas: `grep -rn '—' src/` debe seguir vacío.
- **No abusar de la antítesis "no es X, es Y" / "en vez de" / "no A, sino
  B".** Como mucho una o dos por página; si aparece en párrafos seguidos,
  es la marca más visible de texto generado.
- **Romper el ritmo.** No escribir todas las cards/bullets con frases de
  la misma longitud y la misma estructura. Mezclar frases cortas con
  alguna larga; dejar que unas tengan dos oraciones y otras una.
- **Sin jerga de consultoría ni metáforas de slide deck**: "foso/moat
  competitivo", "el nuevo suelo", "proyecto faraónico", "cero fricción",
  "manos a la obra", "desbloquear valor". Decirlo llano.
- **Nada de pares de adjetivos decorativos** ("rápido y consistente",
  "concreto y medible") si uno solo ya dice lo mismo.
- **No inventar material humano.** No fabricar casos de cliente, cifras,
  fechas, plazos ni testimonios que el usuario no haya dado. Si un texto
  ganaría con un dato real, pedírselo al usuario en vez de rellenarlo.

## SEO

En cualquier cambio (páginas nuevas, renombradas o borradas, copy,
estructura), mantener el SEO cuidado: `robots.txt` sigue permitiendo el
rastreo (hoy `Allow: /` general, no requiere tocarlo por página nueva),
`sitemap-index.xml` es generado por `@astrojs/sitemap` a partir de las
rutas en build — no hace falta mantenerlo a mano, pero si una página se
renombra o borra, confirmar que no quedan enlaces internos rotos a la
URL vieja. Cada página nueva necesita `title`/`description` propios y
no genéricos (props de `Layout.astro`), y `altHref` correcto apuntando a
su contraparte en el otro idioma para el `hreflang`/canonical (ver
`src/layouts/Layout.astro`). Si una URL existente cambia, valorar dejar
un enlace o redirect desde la ruta vieja en vez de un 404 silencioso.

**`public/llms.txt` (mismo mecanismo que `robots.txt` — a mano,
`@astrojs/sitemap` no lo toca) hay que mantenerlo a mano en sync con el
sitio.** Página nueva relevante (no legal/cookies), renombrada o borrada
→ actualizar su entrada (y la de ES/EN) en `llms.txt`. Cambio de fondo en
el modelo comercial (precios, CTAs de contacto/guía) → revisar el párrafo
resumen. Contexto de por qué existe: histórico del ítem #166 en
`/Users/javi/workspace/rag-offline/docs/operations/24-mejoras-historico.md`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Referencias externas

- Documento "11 mejoras propuestas": `/Users/javi/workspace/rag-offline/docs/operations/11-mejoras-propuestas.md` (otro proyecto, rag-offline). **Tras terminar cualquier tarea, revisar si corresponde a un ítem pendiente (❌) de ámbito "Landing" en ese documento y, si es así, actualizarlo ahí mismo**: marcar "Implementado" (✅), mover la fila a la zona de implementados de la tabla resumen y añadir/editar su sección de detalle con qué se hizo — mismo estilo que el resto de entradas ya cerradas del documento.

## Dependencias externas (formulario de contacto)

El sitio es 100% estático (sin adapter SSR) — los formularios de `/contact`,
`/en/contact`, `/guide` y `/en/guide` no pueden llamar directo a Brevo desde
el navegador (la API key no puede vivir en el cliente). Cadena completa:

`form HTML propio → Cloudflare Worker (worker/) → API de contactos de Brevo`

- **Hostinger**: solo sirve los archivos estáticos de `dist/` vía la rama
  `deploy` — ver sección "Deploy" arriba. No interviene en el envío del
  formulario.
- **Brevo**: una única lista de contactos (List ID `2`) recibe altas desde
  ES y EN, desde dos pares de páginas (`/contact`+`/en/contact` y
  `/guide`+`/en/guide` — ver "Split contacto/guía" abajo). El Worker hace
  3 llamadas por envío:
  1. `POST /v3/contacts` — crea/actualiza el contacto con `FIRSTNAME`,
     `LASTNAME` (atributos por defecto de Brevo), `EMAIL_LANGUAGE`
     (`"ES"`/`"EN"`, tomado de la página de origen — custom, ya creado en
     Brevo — sirve para poder segmentar el envío de emails por idioma más
     adelante) y, solo si el envío viene de `/guide`/`/en/guide`,
     `WANTS_GUIDE: true` (custom, **crear a mano en Brevo antes de
     desplegar** — ver aviso de atributos custom abajo). Los envíos desde
     `/contact`/`/en/contact` nunca mandan ese atributo, ni siquiera en
     `false` — así se distingue "no quiere la guía" de "no se le
     preguntó".
  2. Si el contacto ya existía, Brevo responde `204` sin cuerpo (no da el
     `id` numérico) — el Worker hace `GET /v3/contacts/{email}` para
     resolverlo.
  3. `POST /v3/companies` — crea una **Company** de Brevo (objeto CRM
     separado del contacto) con `name` = empresa del formulario y
     `linkedContactsIds: [id]` para enlazarla al contacto. **No dedupea**:
     si la misma empresa manda el formulario varias veces, se crean varias
     Companies con el mismo nombre — asumido, hay que fusionarlas a mano en
     Brevo si molesta.

  Cualquier atributo custom nuevo que se quiera mandar (de contacto o de
  Company) hay que **crearlo antes a mano** en el panel Brevo → Contacts →
  Settings → Contact attributes (o Companies → attributes) — si no existe,
  Brevo lo descarta en silencio, no da error (nos pasó con el primer
  intento, `EMPRESA` como atributo de contacto en vez de Company).

  El `BREVO_LIST_ID` está en `worker/wrangler.toml` (no es secreto). La API
  key de Brevo **no está en el repo** — vive como secret del Worker (ver
  abajo).
- **Cloudflare Worker** (`worker/`, deploy independiente del sitio, no pasa
  por la rama `deploy`):
  - Código: `worker/src/index.ts` — expone `POST /contact`, valida los
    campos server-side, descarta honeypot, llama a
    `POST https://api.brevo.com/v3/contacts`.
  - Desplegar: `cd worker && npx wrangler deploy` (requiere `npx wrangler
    login` una vez, cuenta Cloudflare propia).
  - **Tras cualquier cambio en `worker/` (código, `wrangler.toml`) hay que
    volver a ejecutar `npx wrangler deploy` sí o sí** — a diferencia del
    sitio estático, no hay build/CI que lo haga por ti; si no lo desplegás,
    el formulario en producción sigue llamando a la versión vieja del
    Worker.
  - Secret (API key de Brevo): `cd worker && npx wrangler secret put
    BREVO_API_KEY` — ejecutar en local, nunca pegar la key en el chat ni
    commitearla.
  - URL del Worker: subdominio gratis `*.workers.dev` (sin DNS propio). Esa
    URL está **hardcodeada** como `const WORKER_URL` al principio del
    `<script>` en cuatro sitios — `src/pages/contact.astro`,
    `src/pages/en/contact.astro`, `src/pages/guide.astro` y
    `src/pages/en/guide.astro` — si el Worker se renombra o se recrea, hay
    que actualizarla en los cuatro.

### Split contacto/guía (2026-08-07) y envío del PDF por email

Antes había un único formulario ("avísame cuando esté listo"). Ahora hay
dos pares de páginas con intención distinta:

- `/contact` (ES) / `/en/contact` (EN) — contacto directo, CTA final de
  la home ("Solicita una llamada" / "Book a call").
- `/guide` (ES) / `/en/guide` (EN) — lead magnet de bajo compromiso, CTA
  principal de la home ("Descarga la guía gratuita" / "Download the free
  guide"). Tras enviar, la página de gracias (`/guide/gracias`,
  `/en/guide/thanks`) dice "revisa tu email" — **no hay descarga directa
  en la página**, el PDF llega por email.

`/contacto` y `/contacto/gracias` (URLs viejas, ya en producción) quedan
como *stubs* de redirect (`window.location.replace(...)` + link visible
por si JS falla) hacia `/contact`/`/contact/gracias` — para no perder
tráfico/enlaces ya indexados.

**El envío del email con el link de descarga NO está en este repo.** El
Worker solo pone `WANTS_GUIDE: true` en el contacto de Brevo (ver arriba);
el envío del email en sí es un **Automation Workflow de Brevo**,
configurado a mano en el panel Brevo (Automations → trigger "contact
attribute updated" → `WANTS_GUIDE = true` → email con el link a
`https://zaviren.com/downloads/zaviren.pdf` / `zaviren-en.pdf`, según
`EMAIL_LANGUAGE`). Esto es deliberado (decisión del usuario, 2026-08-07):
reusa el mecanismo de atributos que ya existía en vez de que el Worker
llame a la API transaccional de Brevo. Dos cosas viven fuera del repo, en
el panel Brevo, y no las puede montar un agente con acceso solo al
código:
1. Crear el atributo custom `WANTS_GUIDE` (tipo booleano) en Contacts →
   Settings → Contact attributes — si no existe, Brevo lo descarta en
   silencio (mismo aviso que el resto de atributos custom, ver arriba).
2. Montar el Automation Workflow que reacciona a ese atributo y manda el
   email.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
