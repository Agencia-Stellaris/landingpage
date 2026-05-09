# Email Marketing service page — design spec

**Date:** 2026-05-06
**Status:** Approved (pending implementation plan)
**Slug:** `/servicios/email-marketing`
**Reference HTML:** `c:\Users\frede\Downloads\email-marketing.html`

## Goal

Build the third service page after `whatsapp-marketing` and `desarrollo-web`, mirroring the established Hero → Intro → Includes → ContactCTA pattern. Use the new page as a showcase of SEO discipline (Service + BreadcrumbList + FAQPage schemas) — the agency cannot credibly sell SEO without practicing it on its own pages.

## Architecture

### New files

| Path | Role |
|---|---|
| `src/data/services/email-marketing.ts` | `EMAIL_INCLUDES` (9), `EMAIL_PILLARS` (3), `EMAIL_FAQS` (6), `EMAIL_META`, `EMAIL_JSONLD` |
| `src/pages/EmailMarketingPage.tsx` | Orchestrator — composes Hero + Intro + Includes + shared `ContactCTA`; calls `useDocumentMeta` |
| `src/components/services/email/EmailHero.tsx` | Breadcrumb + H1 + lead + 2 CTAs + `<EmailMockup/>`; **no pills under CTAs** |
| `src/components/services/email/EmailMockup.tsx` | Faithful 1:1 port of the reference HTML mockup |
| `src/components/services/email/ServiceIntro.tsx` | "Tu base como activo" header + 3 pillars band |
| `src/components/services/email/ServiceIncludes.tsx` | 3×3 grid of 9 feature cards |
| `src/components/services/email/icons.ts` | Lucide icon helper keyed by `iconKey` |

### Modified files

| Path | Change |
|---|---|
| `src/App.tsx` | Register lazy route `/servicios/email-marketing` with prefetch helper |
| `src/components/sections/Services.tsx` | Wire the "Email Marketing" card link to the new route |
| `public/sitemap.xml` | Add `<url>` entry, `priority=0.9`, `lastmod=2026-05-06` |
| `src/index.css` | Add CSS-only animations specific to `EmailMockup` (`@keyframes openFlap`, `pulseDot`, `floaty`) under a section comment, scoped via dedicated class names (`.flap`, `.pulse-dot`, `.floaty`, `.flow-line`, `.mail-shell`, `.mail-bar`) |

### Reused

- `<ContactCTA>` with `serviceTag="email-marketing"` — never duplicate the form (project rule).
- `<HighlightText>` for animated bar-highlight on key spans.
- `useReveal` hook for IntersectionObserver-driven fade-up animations.
- `<Starfield>` background in Hero.

## Hero

**Breadcrumb:** `Servicios / Email Marketing`

**H1** (`<HighlightText>` wraps the bracketed span):
> "El email sigue siendo el canal con [mayor ROI] del marketing digital."

**Lead:**
> "Y nosotros lo sabemos usar. Convertimos tu base de datos en un activo que nutre leads, reactiva clientes y genera ingresos predecibles."

**CTAs:**
- Primary: `Hablemos` → `#contacto`, gradient pill, hover lift + shadow
- Secondary: `Ver qué incluye` → `#incluye`, outline pill

**Pills below CTAs:** OMITTED. Project rule (`feedback_omit_hero_pills.md`).

### EmailMockup (faithful 1:1 port)

- macOS-style traffic-light bar + center title "Bandeja de entrada" + chip "3 nuevos"
- Sidebar (`120px`): 4 folders (Bandeja [active], Destacados, Enviados, Borradores) with item counts; "Segmentos" subhead with 4 colored dots (Leads fríos `#FF4D6D`, Clientes activos `#22D39C`, VIP `#7C3AED`, Reactivación `#F59E0B`)
- Email list (`140px`): 4 rows — "Bienvenida #01" (active), "Lead nurturing", "Reactivación", "Newsletter" — each with from / subject / time / unread dot
- Open email pane: `tu@empresa.com` breadcrumb, H3 "Empezamos por tu objetivo", from-line with Stelaris gradient avatar; **envelope animation** (`@keyframes openFlap` 7s loop, `transform-origin: top`, `rotateX(180deg)` mid-cycle); 3 placeholder text bars; mini CTAs ("Ver propuesta" gradient + "Más tarde" outline); footer with Reply/Forward + mono chip "A/B · v2"
- Bottom strip — automation flow: gradient `flow-line` + 4 pulsing nodes (`Captura → Nutrir → Decisión → Cierre`) with staggered `animation-delay` (`0s, 0.4s, 0.8s, 1.2s`); status mono "activo" right-aligned in green
- Two floating chips visible only `md:` (`floaty` keyframes, 4s loop):
  - Left top (`-left-6 top-12`): green checkmark + "Entregado · a 12 segmentos"
  - Right bottom (`-right-6 bottom-16`, `delay 1.2s`): pink send icon + "Flujo automatizado · bienvenida · nurturing · cierre"
- Radial purple glow behind shell (`-z-10`, blurred)
- Container marked `aria-hidden="true"` — decorative
- All animations honor `prefers-reduced-motion: reduce` (no animation when reduced)

## Intro — "Tu base como activo"

**Eyebrow:** `Tu base como activo` (uppercase, tracking-wide, accent-pink)
**H2:** `El canal de tus <highlight>datos</highlight>.`

**Body (2 paragraphs, right column of 2-col header):**

> "El email marketing es uno de los canales más rentables del ecosistema digital, porque opera sobre el activo más importante de tu organización: **los datos de tus usuarios**. En **Stellaris** diseñamos estrategias que nutren leads, reactivan clientes y generan ingresos predecibles."

> "Desde la gestión avanzada de **HubSpot, Mailchimp, ActiveCampaign** —o el CRM que prefieras— hasta el diseño de flujos de automatización complejos y segmentaciones por comportamiento, convertimos tu base en un activo generador de ventas e interacción constante."

The platform names (HubSpot/Mailchimp/ActiveCampaign) live in the body copy, not in pills — better for SEO and matches the project rule.

### Pillars (3, single row)

| # | Title | Description | iconKey |
|---|---|---|---|
| 01 | Nutrir leads | Conversaciones automatizadas que llevan al usuario hacia la compra. | `nurture` |
| 02 | Reactivar clientes | Recuperar contactos inactivos con mensajes y ofertas relevantes. | `reactivate` |
| 03 | Ingresos predecibles | Tu base de datos como activo que genera ventas e interacción constante. | `revenue` |

Visual: same banded grid as `ServiceIntro` of `desarrollo-web` — unified border ring, `bg-bg-primary/60` cells, mono `0X` index top-right, gradient pink→purple icon square.

## Includes — 9 cards (3×3 grid)

**Eyebrow:** `El servicio` · **H2:** `¿Qué incluye <highlight>este servicio?</highlight>` · **Subhead:** "Estrategia, diseño, automatización y datos —un solo equipo operando todo el ciclo del correo." · **num-badge:** `09 Componentes`.

| # | Title | Tag | Description | iconKey |
|---|---|---|---|---|
| 01 | Estrategia alineada a tu embudo | Estrategia | Estrategia de email marketing pensada desde tu funnel de ventas, no desde la plantilla. | `strategy` |
| 02 | Plantillas profesionales | Diseño | Diseño responsive mobile-first, listas para verse bien en cualquier cliente de correo. | `template` |
| 03 | Segmentación avanzada | Segmentación | Listas segmentadas por comportamiento, etapa del buyer y perfil de usuario. | `segment` |
| 04 | Flujos de automatización | Automatización | Bienvenida, lead nurturing, reactivación y cierre, conectados como una sola conversación. | `automation` |
| 05 | Test A/B | Optimización | Pruebas de asuntos, contenidos y CTAs para mejorar continuamente cada envío. | `abtest` |
| 06 | Gestión de plataformas | Plataformas | Configuración y operación de HubSpot, Mailchimp, ActiveCampaign y otras herramientas. | `platform` |
| 07 | Reportes accionables | Reportes | Aperturas, clics, conversiones y ventas generadas, con lectura clara y aplicable. | `reports` |
| 08 | Deliverability e higiene de base | Entregabilidad | SPF, DKIM, DMARC y limpieza periódica de la base. Tus correos llegan a la bandeja, no a spam. | `deliverability` |
| 09 | Recuperación de carritos abandonados | E-commerce | Flujos automatizados que rescatan ventas perdidas y convierten visitantes en clientes. | `cart` |

### Lucide icon mapping (`icons.ts`)

| `iconKey` | Lucide component |
|---|---|
| `strategy` | `Target` |
| `template` | `LayoutTemplate` |
| `segment` | `Users` |
| `automation` | `Workflow` |
| `abtest` | `FlaskConical` |
| `platform` | `Grid3x3` |
| `reports` | `LineChart` |
| `deliverability` | `ShieldCheck` |
| `cart` | `ShoppingCart` |
| `nurture` | `Sparkles` |
| `reactivate` | `RefreshCcw` |
| `revenue` | `TrendingUp` |

Visual: identical to `ServiceIncludes` of `desarrollo-web` — `feature-card` with hover lift and cursor-tracked spotlight (`--mx`/`--my` CSS vars set on `mousemove`), 12×12 gradient icon square with mono `0X` badge superposed bottom-right, mono uppercase tag top-right, footer "incluido" line with check that fades in on hover.

## ContactCTA

Reuse the shared component:

```tsx
<ContactCTA
  titleContent={
    <>
      &iquest;Quieres convertir el Email Marketing en tu canal de ventas m&aacute;s rentable?
      <br/>
      <HighlightText>Hablemos</HighlightText>.
    </>
  }
  subtitle="Cuéntanos sobre tu base de contactos y los objetivos de tu marca. Te respondemos con un plan claro."
  serviceTag="email-marketing"
/>
```

## SEO plan (showcase quality)

### `EMAIL_META`

```ts
title: "Email Marketing en Colombia | Automatización y CRM | Stellaris"
description: "Email marketing profesional: estrategia, automatización, segmentación y deliverability. HubSpot, Mailchimp, ActiveCampaign. Convertí tu base de datos en ventas predecibles."
keywords: "email marketing Colombia, automatización de email, HubSpot Colombia, Mailchimp, ActiveCampaign, segmentación, lead nurturing, carritos abandonados, deliverability, SPF DKIM DMARC, CRM"
canonical: "https://www.stellaris.com.co/servicios/email-marketing"
ogType: "article"
ogImage: "https://www.stellaris.com.co/og/email-marketing.jpg"
```

`useDocumentMeta` already emits Twitter Card, `lang="es"`, hreflang `es-CO`.

### JSON-LD (`EMAIL_JSONLD`)

Three documents, output as a single `<script type="application/ld+json">` array.

1. **`Service`**
   - `name: "Email Marketing"`
   - `serviceType: "Email Marketing"`
   - `provider`: Organization Stellaris (same boilerplate as web)
   - `areaServed: { "@type": "Country", "name": "Colombia" }`
   - `inLanguage: "es-CO"`
   - `description`: same copy as the meta description, lightly extended
   - `url: "https://www.stellaris.com.co/servicios/email-marketing"`
   - `hasOfferCatalog`: `OfferCatalog` mapping the 9 includes to `Offer → itemOffered.Service.name`

2. **`BreadcrumbList`**
   - Inicio → Servicios → Email Marketing (same shape as web)

3. **`FAQPage`** ⭐ AEO/GEO lever — 6 Q&A:

   | Q | Anchored terms |
   |---|---|
   | ¿Qué es el email marketing y por qué sigue siendo rentable? | ROI, base de datos, canal directo |
   | ¿Con qué plataformas de email marketing trabajan? | HubSpot, Mailchimp, ActiveCampaign, CRM |
   | ¿Qué incluye un servicio profesional de email marketing? | estrategia, segmentación, automatización, plantillas, reportes |
   | ¿Cómo se mide el éxito de una campaña de email marketing? | aperturas, clics, conversiones, ROI, ingresos atribuidos |
   | ¿Qué es deliverability y por qué importa? | SPF, DKIM, DMARC, reputación de remitente, bandeja de entrada vs spam |
   | ¿Pueden integrarse las campañas con mi tienda online o CRM existente? | Shopify, WooCommerce, HubSpot, carritos abandonados |

   Each answer: 50–80 words, natural conversational tone (preferred by generative search engines), no keyword stuffing.

### `public/sitemap.xml`

```xml
<url>
  <loc>https://www.stellaris.com.co/servicios/email-marketing</loc>
  <lastmod>2026-05-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

Same `priority` as `desarrollo-web` and `whatsapp-marketing`.

### Semantic HTML / a11y

- Single `<h1>` (Hero). `<h2>` for Intro and Includes. `<h3>` inside cards.
- `<section aria-labelledby="...">` per major block.
- `<nav aria-label="Migas de pan">` on breadcrumb.
- `<ol>` for breadcrumb list.
- `EmailMockup` container marked `aria-hidden="true"` (decorative — info is mirrored in copy).
- Floating chips: `aria-hidden="true"`.
- Buttons that act as anchors use `<a>` (HashLink) — not `<button>` styled as link.
- All animations honor `prefers-reduced-motion: reduce`.
- Form (in `ContactCTA`): already accessible via shared component.

### Internal linking

- `Services.tsx` card → `/servicios/email-marketing` with prefetch helper on hover/focus (same pattern as web).
- Footer is unchanged.
- **Out of scope:** cross-linking from Desarrollo Web to Email Marketing (would touch a recently-merged page; tracked as follow-up).

## Performance

- `EmailMarketingPage` is `React.lazy` + `Suspense` — code-split per existing convention.
- `EmailMockup` uses zero images: SVG and CSS only. No LCP impact from media.
- All animations are CSS-only (no GSAP); the only GSAP use is the existing `useReveal` reveal-on-scroll on the mockup container, identical to `BrowserMockup`.
- The mockup chunk lives with the page route — no impact on the main bundle.

## Out of scope

- Cross-linking from existing service pages back to email-marketing (follow-up).
- A standalone "automation flow" section between Intro and Includes (rejected during brainstorm — would break the symmetry of the 4 service pages).
- Lead scoring / predictive segmentation as a separate include (covered implicitly under "Segmentación avanzada" + "Flujos de automatización").
- An OG image asset (`/og/email-marketing.jpg`) — referenced in meta but its design/upload is a separate task.

## Acceptance criteria

- Navigating `/servicios/email-marketing` renders Hero, Intro, Includes, ContactCTA, in that order.
- Hero contains exactly two CTA buttons; no decorative pill row beneath them.
- `EmailMockup` renders with envelope animation, automation-flow strip, and both floating chips on `md:` and up.
- Includes grid shows exactly 9 cards, closing a perfect 3×3 on `lg:`.
- View source on the rendered HTML shows: `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags, Twitter tags, three JSON-LD blocks (Service, BreadcrumbList, FAQPage).
- Google Rich Results Test (or equivalent) validates Service, BreadcrumbList, and FAQPage without errors or warnings.
- `public/sitemap.xml` includes the new URL.
- `Services.tsx` card for "Email Marketing" links to `/servicios/email-marketing` with prefetch.
- ContactCTA submission persists with `serviceTag: "email-marketing"`.
- `prefers-reduced-motion: reduce` disables `openFlap`, `pulseDot`, `floaty`, and `useReveal` animations.
- Lighthouse mobile: SEO ≥ 100, Accessibility ≥ 95, Performance ≥ 85 (parity with `desarrollo-web`).
