# Recursos (unlisted resources library) — design spec

**Date:** 2026-05-13
**Status:** Approved (pending implementation plan)
**Slug:** `/recursos`
**Reference HTML:** `c:\Users\frede\Downloads\recursos-biblioteca.html` (VariationA)

## Goal

Build an **unlisted** resources library page — a campaign landing reachable only via the URL pegada en ads. Funcionalmente igual a las demás páginas del sitio, pero invisible para crawlers y sin links desde el sitio público. Pattern de "VariationA — Biblioteca destacada" del mockup: 1 recurso destacado + 4 secundarios en grid 2×2.

## Privacy strategy (the non-obvious bit)

"Privado para los del link" se logra con **4 capas defensivas combinadas**:

| Capa | Implementación |
|---|---|
| Meta robots `noindex,nofollow` | Via `useDocumentMeta` extendido con campo `robots` opcional |
| Excluida de `sitemap.xml` | `/recursos` NO se agrega a `public/sitemap.xml` |
| Disallow en `robots.txt` | `Disallow: /recursos` agregado a `public/robots.txt` |
| Cero links internos | Sin entrada en Navbar, Footer, ni en `NAV_LINKS` de `data/content.ts` |

**No es access control.** Quien adivine `/recursos` entra; lo único que evita esto es Firebase Auth, fuera de scope para el launch. Esto es "unlisted", no "private".

JSON-LD se omite a propósito para no entregarle señales estructuradas a Google. Solo se exponen meta básicos (title/description/canonical) para que previews de Slack/WhatsApp se vean bien si alguien comparte el link.

## Architecture

### New files

| Path | Role |
|---|---|
| `src/data/recursos.ts` | `Resource` type, `ResourceType` union, `RESOURCES` array, `TYPE_META` map (label + iconKey + iconBg class), `RECURSOS_META` |
| `src/pages/RecursosPage.tsx` | Orchestrator — composes Hero + Biblioteca; calls `useDocumentMeta` con `robots: "noindex, nofollow"` |
| `src/components/recursos/RecursosHero.tsx` | "Volver al inicio" link + label pill + H1 + lead |
| `src/components/recursos/BibliotecaSection.tsx` | Layout VariationA: featured card + 2×2 grid de secundarios; wraps orbs + container |
| `src/components/recursos/FeaturedResourceCard.tsx` | Card grande del recurso `featured: true` |
| `src/components/recursos/ResourceCard.tsx` | Card chico reutilizable (los 4 secundarios) |
| `src/components/recursos/icons.ts` | Map `iconKey → lucide icon component` |

### Modified files

| Path | Change |
|---|---|
| `src/App.tsx` | Register lazy route `/recursos` |
| `src/hooks/useDocumentMeta.ts` | Add optional `robots?: string` field to `DocumentMeta`; emit `<meta name="robots">` if provided |
| `public/robots.txt` | Add `Disallow: /recursos` (preserve existing rules) |
| `src/index.css` | Add `.ios-icon`, `.ios-bg-*`, `.shine-btn`, `.label-pill`, `.hl`/`.hl-bar`/`.hl-text`, `.stl-card`, `.accent-line`, `.stl-num` utilities under `@layer components` |

### NOT touched (critical for privacy)

| Path | Reason |
|---|---|
| `src/components/layout/Navbar.tsx` | No "Recursos" link |
| `src/components/layout/Footer.tsx` | No "Recursos" link |
| `src/data/content.ts` (`NAV_LINKS`) | Sin entrada |
| `public/sitemap.xml` | Sin entrada |

### Reused

- Standard `<Navbar>` and `<Footer>` shells (the page lives inside `<main id="main-content">` like every other route).
- `useDocumentMeta` for meta + (importante) `robots` field.
- `useReveal` / `useScrollReveal` hooks for fade-up animations on cards.
- Existing `gradient-text` / `gradient-bg` utilities from `index.css`.
- `lucide-react` for icons (mapping in §"Icon mapping" below).

## Data model

```ts
// src/data/recursos.ts
export type ResourceType =
  | "guia"
  | "plantilla"
  | "caso"
  | "webinar"
  | "herramienta"
  | "otro";

export interface Resource {
  id: string;                // "r1", "r6"... stable identifier (used for tracking)
  type: ResourceType;
  title: string;
  description: string;
  meta: string;              // "PDF · 22 págs", "Sheets · Editable", "Video · 42 min"
  href: string;              // real download URL (relative path in /public/recursos/, Drive, YouTube, ...)
  featured?: boolean;        // marks the big card (exactly ONE should be true)
  external?: boolean;        // if true: target="_blank" rel="noopener noreferrer"
}
```

### TYPE_META (in `components/recursos/icons.ts`)

| type | label | iconKey | iconBg class | orb gradient |
|---|---|---|---|---|
| `guia` | Guía | `book` (BookOpen) | `ios-bg-pink` | pink→purple |
| `plantilla` | Plantilla | `grid` (LayoutGrid) | `ios-bg-purple` | purple→blue |
| `caso` | Caso de estudio | `trend` (TrendingUp) | `ios-bg-green` | green→blue |
| `webinar` | Webinar | `play` (PlayCircle) | `ios-bg-amber` | amber→pink |
| `herramienta` | Herramienta | `tool` (Wrench) | `ios-bg-blue` | blue→purple |
| `otro` | Recurso | `sparkles` (Sparkles) | `ios-bg-pink` | pink→amber |

### Launch content (5 resources from the mockup; `r5` "Calculadora de ROI" excluded — VariationA muestra 1 featured + 4 secundarios)

| id | featured | type | title | meta | href status |
|---|---|---|---|---|---|
| r6 | ✓ | guia | El playbook de WhatsApp Marketing 2026 | PDF · 36 págs | `"#"` TODO |
| r1 |  | guia | Cómo auditar tus redes sociales en 30 minutos | PDF · 22 págs | `"#"` TODO |
| r2 |  | plantilla | Calendario editorial mensual (Google Sheets) | Sheets · Editable | `"#"` TODO |
| r3 |  | caso | Cómo crecimos +320% en alcance orgánico | Caso · 8 min de lectura | `"#"` TODO |
| r4 |  | webinar | Email Marketing que convierte: del asunto al CTA | Video · 42 min | `"#"` TODO |

El usuario reemplaza los `href: "#"` con URLs reales antes/después de mergear. Cards con `href === "#"` muestran el botón con `aria-disabled="true"` y sin hover effect.

### Meta

```ts
export const RECURSOS_META: DocumentMeta = {
  title: "Recursos | Stellaris",
  description: "Biblioteca de guías, plantillas, casos y herramientas de marketing digital.",
  canonical: "https://www.stellaris.com.co/recursos",
  robots: "noindex, nofollow",
  ogType: "website",
};
```

**No JSON-LD.** Decisión consciente: cualquier structured data es una pista más para crawlers que potencialmente ignoran `noindex`.

## Hero (`RecursosHero.tsx`)

Mirroring del `PageIntro` del mockup:

- "Volver al inicio" link (lucide `ArrowLeft`) → `/` con `HashLink to="/#inicio"`
- Label pill: "Recursos"
- H1: `"Biblioteca abierta de [marketing digital.]"` con `<HighlightText>` en el span
- Lead: "Guías, plantillas, casos, webinars y herramientas que usamos en Stellaris todos los días. Gratis y sin formulario."
- Orbs decorativos (pink + purple, mismo tratamiento que otros Hero)

`<section aria-labelledby="recursos-heading">` y H1 con `id="recursos-heading"`.

## BibliotecaSection (`BibliotecaSection.tsx`)

Layout VariationA del mockup:

```
┌─────────────────────────────────────────┐
│  [Label]                                │
│  H2 split header              lead text │
└─────────────────────────────────────────┘

┌──────────────────────┐  ┌────────┬────────┐
│                      │  │  card  │  card  │
│   FEATURED (big)     │  ├────────┼────────┤
│                      │  │  card  │  card  │
└──────────────────────┘  └────────┴────────┘
```

- Grid: `lg:grid-cols-[1.25fr_1fr]`
- Featured card en columna izquierda (full height del row)
- 4 cards secundarias en grid 2×2 a la derecha
- En mobile: stack vertical, featured arriba, cards después (1 columna)

H2 split header:
- Izquierda: label "Recursos" + h2 `"Aprende, aplica, [crece.]"`
- Derecha: párrafo descriptivo "Una biblioteca abierta..."

**Sin** el "Ver toda la biblioteca" CTA del mockup (sería false promise con 5 recursos en launch).

## Cards

### FeaturedResourceCard

- Padding generoso (`p-9`)
- 2 orbs internos con gradient del `TYPE_META[type].orb`
- iOS-icon 56×56 con gradient del tipo
- "Destacado · No. 06" en font mono (small caps)
- Label pill del tipo
- `accent-line` (gradient bar) divisora
- H3 grande (clamp 1.7rem)
- Description (max-w-lg)
- 2 elementos al pie: CTA "Descargar gratis" (shine-btn con gradient) + meta del recurso con icono `FileText`

### ResourceCard (4 chicos)

- Padding más chico (`p-6`)
- 1 orb interno
- iOS-icon 44×44 (smaller)
- "No. 0X" mono en esquina derecha
- accent-line
- Label del tipo (uppercase tracking-widest)
- H3 chico (0.98rem)
- meta
- CTA "Descargar" con lucide `ArrowRight` que crece en hover

### `href === "#"` (placeholder)

- Botón visible pero `aria-disabled="true"`
- `pointer-events-none` + opacity reducida
- Sin hover transform/shadow
- Tooltip `title="Próximamente"` opcional (decisión menor; default off)

### Analytics tracking

Click en CTA de descarga (`href !== "#"`):
- Si analytics está cargado (cookie consent accepted), emit event:
  ```ts
  logEvent(analytics, "resource_download", { resource_id: id, resource_type: type });
  ```
- Lazy import + null-check (igual patrón que `addContactRequest`)
- Si no hay consent o falla el import: silently no-op. Cero impacto en UX.

Requiere agregar `loadResourceDownloadEvent` helper en `src/lib/firebase.ts`.

## Hosting de archivos descargables

Out of scope: el usuario decide dónde vive cada archivo y pone la URL en `href`. Sugerido:

- **PDFs propios** → `/public/recursos/<nombre>.pdf`, `external: false`, `href: "/recursos/<nombre>.pdf"`. Forzar download con atributo `download` en el `<a>`.
- **Google Sheets/Drive** → `external: true`, URL completa `https://docs.google.com/...`
- **Videos** → YouTube unlisted u otra plataforma, `external: true`

## CSS utilities to add (`src/index.css` under `@layer components`)

```css
@layer components {
  .label-pill { /* small caps + pink leader line */ }
  .hl, .hl-bar, .hl-text { /* animated highlight bar (existing pattern via HighlightText) */ }
  .ios-icon { /* 56x56 rounded square with iOS-style shine + inner border */ }
  .ios-bg-pink   { background: linear-gradient(135deg, #FF4D6D 0%, #C6285A 100%); }
  .ios-bg-purple { background: linear-gradient(135deg, #7C3AED 0%, #4F1FB2 100%); }
  .ios-bg-green  { background: linear-gradient(135deg, #22D39C 0%, #0E8A66 100%); }
  .ios-bg-amber  { background: linear-gradient(135deg, #F59E0B 0%, #B16C00 100%); }
  .ios-bg-blue   { background: linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%); }
  .stl-card { /* border + bg + hover transform */ }
  .accent-line { /* width:2rem → 100% on hover */ }
  .stl-num { /* mono caps tracking */ }
  .shine-btn::after { /* shimmer sweep on hover */ }
  .orb { /* blurred radial gradient — likely already exists */ }
}
```

Revisar si `.orb`, `.gradient-text`, `.gradient-bg`, `.shine-btn`, `.hl*`, `.label-pill` ya existen antes de duplicar. Reusar lo existente.

## SEO / Privacy verification checklist (post-deploy)

- [ ] `view-source:https://www.stellaris.com.co/recursos` muestra `<meta name="robots" content="noindex, nofollow">` después de hydration
- [ ] `https://www.stellaris.com.co/robots.txt` contiene `Disallow: /recursos`
- [ ] `https://www.stellaris.com.co/sitemap.xml` NO contiene `/recursos`
- [ ] Búsqueda en Google `site:stellaris.com.co recursos` debería retornar vacío después de 1-2 semanas
- [ ] Buscar el HTML del sitio para anchor a `/recursos`: `grep -r "/recursos" src/` → 0 matches fuera de `pages/RecursosPage.tsx` y `data/recursos.ts`
- [ ] Lighthouse SEO en `/recursos`: bajo SEO porque tiene `noindex` (eso es correcto, no se rankea pero las prácticas en sí están bien)

## Accessibility

- `<section aria-labelledby="...">` en Hero y BibliotecaSection
- Cada card es `<article>` con `<h3>` y action `<a>` con label descriptivo (texto del CTA propio, no "click aquí")
- Foco visible: heredado del CSS global `focus-visible:` rules
- iOS-icon decorativos con `aria-hidden="true"` (el título del card ya describe el recurso)
- "Volver al inicio" es `<HashLink>` (no botón) — comportamiento de scroll-to-top via Lenis

## Performance

- Page lazy-loaded en `App.tsx` (mismo patrón que el resto)
- Cero imágenes raster — solo gradientes CSS + SVGs lucide
- Cero JS pesado al cargar — los reveals usan el `useReveal` existente que ya cargaba GSAP perezosamente
- Analytics solo se carga si hay cookie consent (ya implementado en `App.tsx`)

## Out of scope (explicit)

- ❌ Filtros por tipo (VariationB del mockup)
- ❌ Búsqueda
- ❌ Paginación / "Ver más" / "Ver toda la biblioteca"
- ❌ Suscripción por email (VariationC)
- ❌ Firebase Auth (ningún access control real)
- ❌ Tracking por usuario / sesión más allá de Analytics agregado
- ❌ CMS / panel admin para editar recursos
- ❌ Internacionalización (es español, igual que el resto del sitio)
- ❌ JSON-LD structured data (decisión deliberada para no dar señales a crawlers)
- ❌ "Volver al inicio" persistente fuera del Hero
