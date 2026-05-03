# WhatsApp Marketing Service Page — Design Spec

**Date:** 2026-05-03
**Author:** Frederick Hoyos (with Claude)
**Status:** Approved for implementation
**Scope:** New detail page at `/servicios/whatsapp-marketing` based on the reference design at `~/Downloads/whatsapp-marketing.html`. Reuses existing project design system. Sets up routing infrastructure that the other three services (Redes Sociales, Web, Email) can later plug into without re-architecting.

---

## 1. Goals

- Ship a high-quality, SEO-optimized landing page for the WhatsApp Marketing service.
- Reuse the existing design system (`Navbar`, `Footer`, `Container`, `SectionHeader`, `HighlightText`, `Starfield`, `ContactCTA`, GSAP reveal hooks) without duplicating its logic.
- Introduce client-side routing so the URL is real, shareable, and indexable.
- Hit AA accessibility, mobile-first responsive behavior, and Core Web Vitals targets.
- Leave a clean structural pattern (`pages/`, `data/services/`, route definitions) so the remaining three service pages are straightforward additions.

## 2. Non-goals

- Implementing pages for Redes Sociales, Web, or Email Marketing (out of scope; structure prepared but no content).
- Building an SSR/SSG layer (the project remains a Vite SPA — sufficient for crawlers that render JS).
- Replacing or upgrading the existing `ContactCTA` Firestore integration (only minor prop additions).
- Producing the OG image asset (will be marked TODO; design team / user provides).
- Pausing the `Starfield` canvas when the tab loses focus (logged as a follow-up; current parity with home is preferred for now).

---

## 3. Architecture

### 3.1 Routing layer

- Add dependency: `react-router-dom@^7`.
- `App.tsx` is restructured so `BrowserRouter`, `SmoothScroll`, `Navbar`, and `Footer` wrap a `<Routes>` block. The persistent layout means navigating between routes does not unmount the chrome.
- Route table:
  - `/` → `<HomePage />` (lazy)
  - `/servicios/whatsapp-marketing` → `<WhatsAppMarketingPage />` (lazy)
  - `*` → `<Navigate to="/" replace />`
- A `<ScrollToTop />` helper sits inside `<BrowserRouter>` and resets scroll on `pathname` change using the existing Lenis instance (`lenis.scrollTo(0, { immediate: true })`). Without this, navigating between routes preserves scroll and feels broken.
- The Lenis instance is exposed via a `LenisContext` from `SmoothScroll` (`createContext<Lenis | null>`). `HashLink`, `ScrollToTop`, and `HomePage` consume it. This is the only architectural change to `SmoothScroll`; its public API stays the same.

### 3.2 Hash navigation from sub-routes

Anchors like `#inicio`, `#servicios`, `#nosotros`, `#contacto` only work on `/`. From a sub-route they go nowhere. Solution:

- New component `HashLink` (`src/components/routing/HashLink.tsx`, ~30 lines):
  - Receives `to` like `/#servicios`.
  - If the current pathname is `/` and the target hash exists on the page, prevent default and `lenis.scrollTo("#x")`.
  - Otherwise just call `navigate("/#x")` — react-router preserves the hash in `useLocation().hash`. `HomePage` runs an effect on mount and on `location.hash` change that reads the hash and scrolls to it via Lenis.
- `Navbar` and `Footer` are migrated to `HashLink` for the four anchor links.
- The "Solicitar cotización" CTA in `Navbar` becomes `#contacto`-aware: on a sub-route it scrolls to that page's `<ContactCTA>` (which uses `id="contacto"`); on `/` it does the same. No special branching required.

### 3.3 Code splitting

- `HomePage` and `WhatsAppMarketingPage` are imported via `React.lazy` at the route level so the home payload doesn't carry the WhatsApp page and vice versa.
- `<Suspense fallback={null}>` wraps `<Routes>`. Empty fallback keeps a clean transition; the chunks are small enough that a spinner would flash.
- Prefetch on intent: in `Services.tsx`, the WhatsApp card calls `import("../../pages/WhatsAppMarketingPage")` on `onMouseEnter` / `onFocus`. Improves perceived TTI on click.

---

## 4. File layout

### 4.1 New files

```
src/
├── pages/
│   ├── HomePage.tsx                        # current App.tsx body, extracted
│   └── WhatsAppMarketingPage.tsx           # orchestrator
├── components/
│   ├── services/
│   │   └── whatsapp/
│   │       ├── WhatsAppHero.tsx            # breadcrumb + h1 + ChatMockup
│   │       ├── ChatMockup.tsx              # animated phone mockup
│   │       ├── ServiceIntro.tsx            # eyebrow + paragraphs
│   │       └── ServiceIncludes.tsx         # 8-item ordered grid
│   └── routing/
│       ├── HashLink.tsx
│       └── ScrollToTop.tsx
├── hooks/
│   └── useDocumentMeta.ts                  # mutates <head> + JSON-LD
└── data/
    └── services/
        └── whatsapp-marketing.ts           # content + meta + JSON-LD
docs/superpowers/specs/2026-05-03-whatsapp-marketing-page-design.md
```

### 4.2 Modified files

| File | Change |
|---|---|
| `src/App.tsx` | Wrap in `BrowserRouter`, add `Routes`, lift Navbar/Footer/SmoothScroll out, lazy import pages, `ScrollToTop` |
| `src/data/content.ts` | `SERVICES[0].href = "/servicios/whatsapp-marketing"` |
| `src/components/sections/ContactCTA.tsx` | Optional props `label`, `title`, `titleContent`, `subtitle`, `serviceTag`; persist `service` field on Firestore docs (default `"home"`) |
| `src/components/sections/Services.tsx` | Use `react-router-dom` `Link` for service cards with non-`#` href; prefetch chunk on hover/focus |
| `src/components/layout/Navbar.tsx` | Anchor `<a>`s become `HashLink` |
| `src/components/layout/Footer.tsx` | Anchors → `HashLink`; `SERVICE_LINKS[2].href = "/servicios/whatsapp-marketing"` (uses `<Link>`) |
| `public/sitemap.xml` | Add new URL entry |
| `package.json` | Add `react-router-dom@^7` |

---

## 5. Page composition

```
<WhatsAppMarketingPage>
  <useDocumentMeta meta={WHATSAPP_PAGE.meta} jsonLd={WHATSAPP_PAGE.jsonLd} />
  <WhatsAppHero />        # Starfield bg + breadcrumb + h1 + ChatMockup
  <ServiceIntro />        # 2 paragraphs, max-w-3xl, py-[90px]
  <ServiceIncludes />     # alternate bg, 8-item grid
  <ContactCTA
    titleContent={…}
    subtitle="…"
    serviceTag="whatsapp-marketing"
  />
</WhatsAppMarketingPage>
```

### 5.1 `WhatsAppHero`

- Layout: `<section id="top" class="relative overflow-hidden pt-28">`
  - `<Starfield />` absolute background.
  - Inner `grid lg:grid-cols-[1.05fr_1fr] gap-14 px-[5%] pb-24 lg:pb-32`.
  - **Mobile order: h1 first, mockup second** so the h1 paints the LCP and the mockup loads visually below.
- Breadcrumb: `<nav aria-label="Migas de pan">` with `<ol>`. Visually: `← Servicios / WhatsApp Marketing`. The "Servicios" item links via `HashLink` to `/#servicios`.
- `<h1 class="font-heading text-hero font-extrabold tracking-[-1.5px]">` in three lines, with `<HighlightText>comunicación directa</HighlightText>` on the second line.
- Reveal: `useReveal({ y: 40 })` on the left column. Right column animates with `delay: 0.15`.

### 5.2 `ChatMockup`

- Outer wrapper: `<div role="img" aria-label="Vista previa de conversación de WhatsApp con Stellaris">`. Children all `aria-hidden`.
- Phone frame: `rounded-[2.4rem] border border-white/[0.08] bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)]`.
- Header bar (style WhatsApp dark green):
  - `<ArrowLeft size={16}>` from `lucide-react`.
  - 36×36 avatar: `gradient-bg` rounded-full with the Stellaris isologo (same image asset as `Navbar`).
  - Name "Stellaris", subline "en línea" with a 6×6 emerald dot.
  - `<Phone size={16}>` (decorative).
- Body: `min-h-[340px]` to prevent CLS as bubbles appear. Background uses an inner radial gradient with `wa-green` at 6% opacity.
- 5-step animation loop:
  1. IN bubble — *"Hola 👋 Vi que dejaste tus datos. ¿Te cuento cómo podemos ayudarte?"*
  2. OUT bubble — *"Sí, claro. Cuéntame."* (✓✓)
  3. Typing dots (3, blinking)
  4. IN bubble — *"Diseñamos tu estrategia, configuramos los flujos y automatizamos las respuestas. Tú solo recibes los leads."*
  5. OUT bubble — *"Perfecto, quiero empezar."* (✓✓)
- Bubble tails via `clip-path` (matches reference).
- Animation chaining: `setTimeout` chain inside a `useEffect` that:
  1. Bails out if `IntersectionObserver` says the mockup is offscreen (don't burn cycles when not visible).
  2. Bails out and renders all five messages statically when `prefers-reduced-motion: reduce`.
- Glow behind the phone: `radial-gradient` violet, `blur-2xl`, `pointer-events-none`, `-z-10`.

### 5.3 `ServiceIntro`

```
<section>
  <Container className="mx-auto max-w-3xl">
    <p class="eyebrow">Comunicación &amp; ventas</p>
    <p>Convertimos el potencial de WhatsApp en <em>conversaciones reales</em>…</p>
    <p>Diseñamos estrategias de WhatsApp Marketing con <em>WhatsApp Business API</em>…</p>
  </Container>
</section>
```

`<em>` rendered as `text-text-primary` (no italics) per the reference. Reveal on the container.

### 5.4 `ServiceIncludes`

- `<Container alternate id="incluye">`. Section header reuses `<SectionHeader label="El servicio" titleContent={<>¿Qué incluye <HighlightText>este servicio?</HighlightText></>} />`.
- Grid: `<ol class="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2">` — `gap-px` over a translucent white background creates 1px dividers.
- Each `<li>`: `bg-bg-secondary p-7 hover:bg-white/[0.02]`, with `font-mono text-xs text-accent-pink/60` "No. 0X" label and the description in `text-text-muted`.
- Reveal: `useScrollReveal({ y: 30, stagger: 0.08 })`.

### 5.5 `ContactCTA` (refactor)

```ts
interface ContactCTAProps {
  label?: string;             // default "Contacto"
  title?: string;             // default "¿Listo para crecer juntos?"
  titleContent?: ReactNode;   // overrides title (richer JSX)
  subtitle?: string;          // default current copy
  serviceTag?: string;        // default "home"; saved on Firestore
}
```

- The `service` field is added to the Firestore doc unconditionally so existing leads from the home page are properly tagged as `"home"`.
- All existing usages on the home page work unchanged (props default).
- The WhatsApp page passes:
  - `titleContent={<>Tu cliente ya está en WhatsApp.<br /><HighlightText>¿Estás tú ahí, estratégicamente?</HighlightText></>}`
  - `subtitle="Descubre cómo convertimos conversaciones en clientes. Déjanos tus datos y te preparamos una propuesta personalizada, sin compromiso."`
  - `serviceTag="whatsapp-marketing"`

---

## 6. SEO

### 6.1 Head management

- `useDocumentMeta(meta, jsonLd?)` (`src/hooks/useDocumentMeta.ts`) mutates `<head>` on mount and restores prior values on unmount:
  - `document.title`
  - `meta[name="description"]`, `meta[name="keywords"]`
  - `link[rel="canonical"]`
  - All `og:*` and `twitter:*` tags
  - Optional `<script type="application/ld+json">` injected into `<head>` and removed on unmount
- ~50 LOC, zero deps. SPAs with a small route table do not need `react-helmet-async` and Googlebot/Bingbot render JS.

### 6.2 Page meta

```
title:        "WhatsApp Marketing en Colombia | Stellaris"     (49 chars)
description:  "Estrategia de WhatsApp Marketing con Business API, automatizaciones, segmentación, campañas de difusión y chatbots. Convertimos conversaciones en ventas."  (157 chars)
keywords:     WhatsApp Marketing, WhatsApp Business API, automatización WhatsApp, marketing conversacional, agencia WhatsApp Colombia
canonical:    https://www.stellaris.com.co/servicios/whatsapp-marketing
og:type:      article
og:image:     https://www.stellaris.com.co/og/whatsapp-marketing.jpg  (1200×630, TODO)
og:locale:    es_CO
twitter:card: summary_large_image
```

### 6.3 Structured data

Two JSON-LD blocks, injected together:

- `Service` with `provider`, `areaServed: "Colombia"`, `hasOfferCatalog` listing the 8 includes as `Offer.itemOffered.Service`.
- `BreadcrumbList`: Inicio (`/`) → Servicios (`/#servicios`) → WhatsApp Marketing.

### 6.4 Sitemap and crawling

- `public/sitemap.xml` gains a second `<url>` entry for `/servicios/whatsapp-marketing`, `priority 0.8`, `changefreq monthly`, `lastmod` set at edit time.
- `robots.txt` already allows everything; no change.

### 6.5 Semantic HTML and internal links

- Single `<h1>` in the Hero (id `hero-heading`); each subsequent section uses `<h2>`.
- `<main>` already wraps the page content via root layout.
- Each section uses `<section aria-labelledby="…">`.
- Breadcrumb links to `/#servicios`. Footer's WhatsApp service link points to the new URL. The `Services.tsx` card on the home page also points there.

---

## 7. Performance

| Concern | Approach |
|---|---|
| LCP | h1 is the LCP element; mobile order puts h1 first, no images in hero |
| CLS | `min-h-[340px]` on chat body; explicit width/height on avatar/iconography |
| TBT/INP | Lazy chunks + prefetch on hover; chat animation gated by `IntersectionObserver` |
| Fonts | Already self-hosted via `@fontsource` packages — no external blocking |
| Animation | Starfield uses RAF + `prefers-reduced-motion`; chat respects same; HighlightText (GSAP) skips to end frame on reduced motion |
| Route transition | `ScrollToTop` resets scroll on pathname change |

## 8. Accessibility (WCAG AA)

- All interactive elements receive `focus-visible:outline-2 focus-visible:outline-accent-pink focus-visible:outline-offset-2` (added globally if not present).
- Skip link preserved at the layout root.
- Chat mockup is `role="img"` with a single `aria-label`; internal nodes are `aria-hidden`.
- Iconography decorative-only is `aria-hidden="true"`.
- Breadcrumb uses `<nav aria-label="Migas de pan">` and `aria-current="page"` on the last item.
- Heading hierarchy verified: one h1, h2 per section, no skipped levels.
- Contrast: `#9C92AE` on `#0A0612` ≈ 7:1; `#FF4D6D` on `#0A0612` ≈ 5.2:1; both AA.
- Forms (existing `ContactCTA`) already have label/input pairings; checkbox checked state visually clearer with the refactor.

## 9. Responsive

| Breakpoint | Hero | Includes | Contact |
|---|---|---|---|
| `<640px` | Stacked: h1 → mockup. h1 ~`2.2rem`. Mockup `max-w-[300px]` centered. | 1 column, full-width tiles | Stack, button full width |
| `640–1024px` | Same stacking, h1 ~`3rem` | 2 columns | Centered, button auto |
| `≥1024px` | Grid `1.05fr_1fr`, mockup right; h1 to `4rem` | 2 columns | Centered, `max-w-lg` |

- Container padding `px-[5%]` matches the rest of the site.
- All touch targets ≥ 44×44 px.
- Tested viewport down to 360 px: no horizontal overflow.

---

## 10. Content (final, in Spanish)

### 10.1 Breadcrumb
- `← Servicios / WhatsApp Marketing`

### 10.2 H1
- "El canal más poderoso de"
- "<HighlightText>comunicación directa</HighlightText>,"
- "al servicio de tu estrategia."

### 10.3 Intro (`Comunicación & ventas`)
- Convertimos el potencial de WhatsApp en *conversaciones reales* que generan ventas, fidelizan clientes y construyen relaciones duraderas con tu audiencia.
- Diseñamos estrategias de WhatsApp Marketing con *WhatsApp Business API*, automatizaciones inteligentes, flujos de conversación personalizados, segmentación de usuarios y campañas de difusión que llevan el mensaje correcto, a la persona correcta.

### 10.4 Includes (`El servicio` — `¿Qué incluye este servicio?`)

01. Configuración y optimización de WhatsApp Business API.
02. Estrategia de comunicación y flujos de conversación personalizados.
03. Segmentación de la base de contactos según intereses, interacción y otros factores.
04. Automatización de respuestas y secuencias de seguimiento.
05. Campañas de difusión segmentadas por perfil de cliente.
06. Integración con CRM para gestión de leads y seguimiento comercial.
07. Chatbots inteligentes para atención 24/7.
08. Métricas de entrega, apertura y conversión.

### 10.5 CTA
- H2 line 1: "Tu cliente ya está en WhatsApp."
- H2 line 2: "<HighlightText>¿Estás tú ahí, estratégicamente?</HighlightText>"
- Subtitle: "Descubre cómo convertimos conversaciones en clientes. Déjanos tus datos y te preparamos una propuesta personalizada, sin compromiso."

---

## 11. Open items (non-blocking)

| Item | Default in this spec | User to confirm |
|---|---|---|
| `og/whatsapp-marketing.jpg` 1200×630 | Marked TODO; no placeholder shipped | User generates and drops in `public/og/` |
| Hosting SPA fallback config | Not added; project currently has no `vercel.json` / `_redirects` | User confirms hosting target so the right config file is added |
| Pause Starfield when tab not visible | Not addressed (parity with home) | Logged as future enhancement |
| Pages for Redes / Web / Email Marketing | Out of scope | Structure ready; future work |

## 12. Acceptance criteria

- Navigating to `/servicios/whatsapp-marketing` from the WhatsApp service card or directly via URL renders the page.
- Refreshing the page does not 404 (assuming SPA fallback is configured on hosting).
- `<h1>` count on the page equals 1; `document.title` matches the spec.
- JSON-LD blocks for `Service` and `BreadcrumbList` validate on Google's Rich Results Test.
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO = 100.
- Submitting the form on the WhatsApp page writes to Firestore with `service: "whatsapp-marketing"`.
- Browser back from the WhatsApp page returns to `/` with prior scroll restored where reasonable; back from `/#servicios` set by the breadcrumb works.
- `prefers-reduced-motion` disables the chat loop, the Starfield motion, and the HighlightText fill animation.

## 13. Out of scope / explicit non-changes

- No changes to Tailwind tokens unless missing (`text-hero`, `text-section` will be checked first; only added if absent).
- No new GSAP plugins.
- No analytics events beyond what already exists.
- No copy changes on the home page.
- No CMS or content-editing UI; content lives in `data/services/whatsapp-marketing.ts`.
