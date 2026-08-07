## Deploy

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

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Referencias externas

- Documento "11 mejoras propuestas": `/Users/javi/workspace/rag-offline/docs/operations/11-mejoras-propuestas.md` (otro proyecto, rag-offline).

## Dependencias externas (formulario de contacto)

El sitio es 100% estático (sin adapter SSR) — el formulario de `/contacto` y
`/en/contact` no puede llamar directo a Brevo desde el navegador (la API key
no puede vivir en el cliente). Cadena completa:

`form HTML propio → Cloudflare Worker (worker/) → API de contactos de Brevo`

- **Hostinger**: solo sirve los archivos estáticos de `dist/` vía la rama
  `deploy` — ver sección "Deploy" arriba. No interviene en el envío del
  formulario.
- **Brevo**: una única lista de contactos (List ID `2`) recibe altas desde
  ES y EN. El Worker hace 3 llamadas por envío:
  1. `POST /v3/contacts` — crea/actualiza el contacto con `FIRSTNAME`,
     `LASTNAME` (atributos por defecto de Brevo) y `EMAIL_LANGUAGE`
     (`"ES"`/`"EN"`, tomado de la página de origen — custom, ya creado en
     Brevo — sirve para poder segmentar el envío de emails por idioma más
     adelante).
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
    `<script>` en `src/pages/contacto.astro` y
    `src/pages/en/contact.astro` — si el Worker se renombra o se
    recrea, hay que actualizarla en esos dos sitios.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
