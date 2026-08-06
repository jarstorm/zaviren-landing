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

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
