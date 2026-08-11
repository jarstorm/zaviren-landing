# Link building — tracking (#17 seo-roadmap)

Proceso lento (días/semanas), ítem P3 de `docs/seo-roadmap.md`. Este
fichero es el estado vivo: qué se ha enviado, qué falta, y el copy listo
para pegar en formularios de submission.

## Assets (2026-08-11 — listos)

En `docs/assets/link-building/` (no en `public/`: son para formularios de
terceros, no se sirven en el sitio):

| Fichero | Uso |
|---|---|
| `zaviren-logo-512.png` / `-1024.png` | Logo cuadrado, fondo **transparente** — el que piden casi todos los directorios |
| `zaviren-logo-512-dark.png` / `-1024-dark.png` | Mismo logo sobre `#0a0b0f` — para formularios que no aceptan alpha o que renderizan sobre fondo blanco y romperían el contraste |
| `zaviren-screenshot-es.png` / `-en.png` | 1280x800, demo de respuesta con fuente citada, marca arriba |

Los dos HTML fuente (`logo-square.html`, `shot-demo.html`) quedan al lado
para regenerar los PNG si cambia la marca o el copy del demo:

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd docs/assets/link-building
"$CHROME" --headless --disable-gpu --hide-scrollbars --default-background-color=00000000 \
  --window-size=512,512 --screenshot=zaviren-logo-512.png "file://$PWD/logo-square.html"
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --window-size=1280,800 --screenshot=zaviren-screenshot-es.png "file://$PWD/shot-demo.html?lang=es"
```

**Aviso honesto sobre el screenshot**: es el `.chat-demo` de la home
(pregunta + respuesta + chip de fuente), no una captura de la app real
corriendo. Es una maqueta de marketing, no una mentira sobre features
—muestra exactamente lo que el producto hace—, pero si un directorio pide
explícitamente "screenshot of the actual product", conviene sustituirlo
por una captura real cuando la haya.

## Copy reutilizable

**Nombre:** Zaviren

**Elevator pitch corto (ES, ~150 car):**
> Zaviren conecta una IA a los documentos de tu empresa para que
> cualquiera encuentre la respuesta al momento, sin que tus datos salgan
> de tu control.

**Elevator pitch corto (EN, ~150 char):**
> Zaviren connects AI to your company's documents so anyone can get an
> instant answer, without your data ever leaving your control.

**Descripción larga (ES, ~400 car, para directorios que piden más detalle):**
> Zaviren es una IA privada para pymes: se despliega dentro del
> perímetro del cliente y responde preguntas sobre sus propios
> documentos (PDFs, contratos, manuales, políticas internas), citando
> siempre la fuente exacta. Sin enviar datos a la nube de terceros,
> cumple RGPD por diseño y funciona incluso sin conexión a internet.
> Pensado para empresas donde el conocimiento vive disperso en
> documentos o en la cabeza de dos o tres personas.

**Descripción larga (EN):**
> Zaviren is private AI for SMEs: deployed inside the customer's own
> perimeter, it answers questions over their own documents (PDFs,
> contracts, manuals, internal policies), always citing the exact
> source. No data ever leaves to a third-party cloud, GDPR-compliant by
> design, and works even offline. Built for companies where knowledge
> is scattered across documents or stuck in two or three people's heads.

**Categoría / tags:** AI, Enterprise Search, Knowledge Management, RAG,
Private AI, GDPR, On-premise AI, Document Q&A

**URL principal:** https://zaviren.com
**Logo / screenshot:** ver sección "Assets" arriba.

### Límites de claim (no pasarse al rellenar formularios)

El copy de arriba está alineado con lo que el producto hace hoy. **No
añadir** en ningún formulario, aunque el campo invite a ello:

- permisos/compartimentación por usuario o por rol (hoy no hay)
- integración con ERP, software de gestión, CRM o similares
- generación de borradores de documentos
- cifras de clientes, ahorro o precisión (no hay caso real medido — ver
  #13 del roadmap)

## Copy por sitio (listo para pegar)

Longitudes verificadas contra el límite de cada formulario.

### Product Hunt

- **Name:** Zaviren
- **Tagline** (60 max, 47): `Private AI that answers from your own documents`
- **Description** (260 max, 249):
  > Zaviren runs private AI inside your company's own perimeter and
  > answers questions over your own documents — contracts, manuals,
  > internal policies — always citing the exact source. No data leaves
  > to a third-party cloud. GDPR by design. Works offline.
- **Topics:** Artificial Intelligence, SaaS, Productivity, Privacy
- **Links:** website `https://zaviren.com`, guía `https://zaviren.com/en/guide`
- **First comment (maker):**
  > Hi PH 👋 I built Zaviren after watching small companies lose hours a
  > week re-answering questions whose answer already lived in a PDF
  > someone wrote two years ago.
  >
  > The usual fix is a cloud AI assistant — which for a law firm, a
  > clinic or an engineering shop means uploading contracts and client
  > records to somebody else's servers. That is a non-starter, so they
  > keep doing it by hand.
  >
  > Zaviren runs inside their own perimeter instead. You point it at
  > your documents, people ask questions in plain language, and every
  > answer comes back with the exact source (file + page) so it can be
  > checked. No data leaves the building, and it keeps working when the
  > internet doesn't.
  >
  > Happy to answer anything about the on-prem setup, the citation
  > mechanics, or where it does *not* work well yet.

### AlternativeTo

- **Alternative to:** ChatGPT Enterprise, Microsoft 365 Copilot, Glean
- **Platforms:** Self-Hosted, Web
- **License:** Commercial
- **Short description:** elevator pitch EN de arriba.
- **Tags:** ai, rag, enterprise-search, knowledge-management, self-hosted,
  privacy, gdpr, document-search
- Submission form: `https://alternativeto.net/manage/new/` (requiere cuenta).

### SaaSHub

- **Tagline** (~60): `Private AI over your company's own documents`
- **Description:** descripción larga EN.
- **Categories:** Enterprise Search, Knowledge Management, AI Tools

### G2 / Capterra (mismo alta desde ene-2026, ver nota en la tabla)

- **Categories:** AI Knowledge Management, Enterprise Search, Intelligent
  Document Processing
- **Product description:** descripción larga EN + el bloque de "cómo
  funciona" de `/en/private-ai`.
- **Pricing:** "Contact us" (no hay pricing público hoy).

### Crunchbase

- **Short description** (~200 char, 171):
  > Zaviren is private AI for SMEs: it answers questions over a company's
  > own documents, cites the exact source, and runs inside the customer's
  > perimeter instead of the cloud.
- **Full description:** descripción larga EN.
- **Industries:** Artificial Intelligence, Enterprise Software, Information
  Technology, Privacy
- **HQ:** España (confirmar ciudad/forma jurídica antes de enviar).

### LinkedIn Company Page

- **Tagline** (120 max, 92): `IA privada para empresas: respuestas sobre tus propios documentos, citando siempre la fuente`
- **About (ES):** descripción larga ES + un párrafo de "para quién es"
  (despachos, clínicas, gestorías, fincas, inmobiliarias — los 5 sectores
  que ya tienen post en el blog).
- **Primer post:** enlazar `/ia-privada` o el comparativo
  `/blog/ia-privada-vs-chatgpt`, no la home — el post ancla convierte
  mejor y ya está escrito.

### X / Twitter

- **Bio** (160 max, 128):
  > IA privada para empresas. Respuestas sobre tus propios documentos,
  > citando la fuente. Sin subir nada a la nube. RGPD por diseño.

### Indie Hackers

Post tipo "cómo construí esto". Ángulo que no es autopromo pura: *por qué
un RAG on-prem para pymes es un problema de producto distinto al de un
chatbot cloud* — coste del hardware, dimensionado sobre el almacenamiento
que ya tienen, citar la fuente como requisito de confianza y no como
feature. Enlace a la guía (`/guide`), no a la home.

### Reddit (r/LocalLLaMA, r/artificial, r/es)

No postear lanzamiento. Responder a hilos existentes donde el link aporte
de verdad; r/LocalLLaMA es la audiencia más afín (self-hosted, sin nube)
y la más alérgica al marketing: hablar de la implementación real
(hardware, modelos, latencia) o no hablar.

## Orden de trabajo y estado

### Tier 1 — lanzamiento evento único

| Sitio | Coste | Estado | Fecha | Nota |
|---|:---:|:---:|---|---|
| Product Hunt | gratis | ❌ | | Assets y copy listos (arriba). Requiere cuenta con algo de historial; lanzar martes-jueves, 00:01 PT |

### Tier 2 — directorios AI/SaaS

| Sitio | Coste | Estado | Fecha | Nota |
|---|:---:|:---:|---|---|
| SaaSHub | gratis | ❌ | | DR alto, alta gratis. Fuentes 2026 discrepan sobre si el enlace del plan gratis sigue siendo dofollow — enviar igual, el tráfico cualificado vale por sí solo |
| AlternativeTo | gratis | ❌ | | Alta en `/manage/new/`. Listar como alternativa a ChatGPT Enterprise / Copilot / Glean |
| G2 | gratis | ❌ | | Perfil de vendor gratis; solo se paga PPC/leads. Se necesitan ~10 reviews para entrar en el Grid — el perfil se puede crear ya |
| Capterra | gratis | ❌ | | **G2 compró Capterra + GetApp + Software Advice (ene-2026)**: un alta cubre las tres. Hacerlo después del perfil de G2 para no duplicar datos |
| There's An AI For That | **$347** | 🚫 | | Descartado: submission de pago (verificado 2026-08-11). Reconsiderar solo con presupuesto de marketing |
| Futurepedia | **$197-497** | 🚫 | | Descartado: sin vía gratuita (verificado 2026-08-11) |
| AI Tools Directory | ? | ❌ | | Sin verificar; el nicho está lleno de directorios de pago o sin tráfico real. Verificar coste y DR antes de invertir tiempo |

### Tier 3 — directorios españoles/negocio local

| Sitio | Coste | Estado | Fecha | Nota |
|---|:---:|:---:|---|---|
| Google Business Profile | gratis | ❌ | | **Máxima prioridad de este tier** y solapa con #15 (SEO local). Requiere dirección o zona de servicio |
| StartupXplore | gratis | ❌ | | |
| Cámara de Comercio / ICEX | — | ❌ | | **Bloqueado por dato del usuario**: confirmar si Zaviren está constituida como empresa y con qué CIF |
| Novobrief | gratis | ❌ | | Solo si hay noticia real (lanzamiento, ronda, cliente). Sin noticia no hay pitch |

### Tier 4 — perfiles con link

| Sitio | Coste | Estado | Fecha | Nota |
|---|:---:|:---:|---|---|
| LinkedIn Company Page | gratis | ❌ | | Copy listo arriba. Es también el sitio donde vive la audiencia B2B objetivo |
| Crunchbase | gratis | ❌ | | Copy listo arriba |
| GitHub org profile | gratis | ❌ | | Solo si hay repos públicos relacionados |
| X / Twitter bio | gratis | ❌ | | Copy listo arriba |

### Tier 5 — comunidades (tráfico + autoridad indirecta, no backlink directo)

| Sitio | Estado | Fecha | Nota |
|---|:---:|---|---|
| r/LocalLLaMA | ❌ | | La más afín. Solo aporte técnico real |
| r/artificial | ❌ | | Idem |
| r/es | ❌ | | Idem |
| Indie Hackers | ❌ | | Ángulo definido arriba |

## Realidad de esto (para no sobreinvertir)

Los directorios AI genéricos dan poco: muchos son granjas de enlaces sin
tráfico, y los que tienen autoridad cobran. El valor real de esta lista
está concentrado en cinco: **G2/Capterra** (compradores B2B buscando
activamente), **Product Hunt** (pico de tráfico de un día + backlink
permanente), **LinkedIn** (audiencia objetivo), **Crunchbase** y **Google
Business Profile**. El resto es relleno de baja prioridad.

Lo que mueve la aguja por encima de todo esto sigue siendo contenido que
alguien quiera enlazar — la línea de trabajo de #11-#14 del roadmap, ya en
marcha.

## Qué no puede hacer un agente aquí

Crear cuentas, verificar email/dominio, pagar submissions y postear como
persona en Reddit/LinkedIn/PH requieren identidad del usuario — hacerlo
suplantándole sería, además de mala práctica, motivo de baneo en varias de
estas plataformas. Con el MCP de Chrome sí se pueden **rellenar** los
formularios en una sesión ya logueada del usuario, dejándole a él el botón
de enviar.

## Log

- 2026-08-11: fichero creado, copy redactado, roadmap de tiers definido.
  Nada enviado todavía.
- 2026-08-11 (2ª pasada): TODOs de assets cerrados — logo cuadrado
  512/1024 (transparente + fondo oscuro) y screenshot 1280x800 ES/EN
  generados en `docs/assets/link-building/`, con los HTML fuente para
  regenerarlos. Añadido copy por sitio con longitudes verificadas
  (Product Hunt, AlternativeTo, SaaSHub, G2/Capterra, Crunchbase,
  LinkedIn, X, Indie Hackers, Reddit) y bloque de límites de claim.
  Verificados costes: There's An AI For That ($347) y Futurepedia
  ($197-497) descartados por ser de pago; G2 absorbió Capterra/GetApp/
  Software Advice en ene-2026 (un alta cubre tres). Añadido Google
  Business Profile al Tier 3. Sigue sin enviarse nada.
