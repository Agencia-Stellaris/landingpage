# /recursos (unlisted resources library) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an unlisted `/recursos` page reachable only via the URL pegada en ads, with 4-layer privacy (noindex meta, robots Disallow, sitemap exclusion, no internal links).

**Architecture:** SPA route lazy-loaded like the existing service pages. Data centralized in `src/data/recursos.ts`. UI split into `RecursosHero` + `BibliotecaSection` (featured card + 2×2 grid of secondary cards). Privacy enforced via extended `useDocumentMeta` (new optional `robots` field), modified `robots.txt`, and zero internal links.

**Tech Stack:** React 19 + Vite + TypeScript strict + Tailwind v4 (CSS-first @theme) + lucide-react + GSAP/Lenis (via existing `useReveal`/`useScrollReveal` hooks) + Firebase Analytics (lazy, consent-gated).

**Reference materials:**
- Spec: `docs/superpowers/specs/2026-05-13-recursos-page-design.md`
- Visual reference HTML: `c:\Users\frede\Downloads\recursos-biblioteca.html` (use `VariationA`)

**Project verification commands** (project has no test runner — use these instead of `pnpm test`):
- `pnpm lint` — must not introduce NEW errors. Two pre-existing errors in `App.tsx:57` and `ChatMockup.tsx:17` are out-of-scope.
- `pnpm build` — must succeed (`tsc -b && vite build`).
- `pnpm dev` — manual visual check at `http://localhost:5173/recursos`.

---

## Task 1: Extend `useDocumentMeta` to support `robots` field

**Files:**
- Modify: `src/hooks/useDocumentMeta.ts`

**Why:** The hook is currently the only mechanism for per-page `<head>` mutation, but it doesn't emit `<meta name="robots">`. This task adds an optional `robots?: string` field that is conditionally rendered. Foundation for the noindex-on-recursos requirement.

- [ ] **Step 1: Add `robots` field to `DocumentMeta` interface**

In `src/hooks/useDocumentMeta.ts`, locate the `DocumentMeta` interface (currently lines 3-16). Add `robots?: string;` after `keywords?: string;`:

```ts
export interface DocumentMeta {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}
```

- [ ] **Step 2: Emit the `<meta name="robots">` tag inside the effect**

Inside `useDocumentMeta`'s `useEffect`, after the existing `keywords` block (around line 92), add:

```ts
if (meta.robots !== undefined) {
  apply(
    'meta[name="robots"]',
    () => Object.assign(document.createElement("meta"), { name: "robots" }),
    "content",
    meta.robots,
  );
}
```

The existing `apply()` helper handles ensure-or-create + restore-on-unmount, so the cleanup is automatic.

- [ ] **Step 3: Verify TS compiles**

Run: `pnpm build`
Expected: ✓ built — no TS errors.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useDocumentMeta.ts
git commit -m "feat(meta): support optional robots field in useDocumentMeta"
```

---

## Task 2: Add Recursos CSS utilities to `index.css`

**Files:**
- Modify: `src/index.css` (append at end, after the Email Marketing block)

**Why:** The mockup uses several bespoke utilities (`ios-icon`, `stl-card`, `shine-btn`, `label-pill`, `orb`, `accent-line`, `stl-num`) that don't exist in the project. Following the established pattern of section-scoped utilities added at the bottom of `index.css` with a comment header.

- [ ] **Step 1: Append the new block to `src/index.css`**

Append (after the last line of the Email Marketing block):

```css

/* ============================================
 * Recursos — section-scoped utilities
 * ============================================ */

/* Decorative blurred orb (use with absolute positioning + Tailwind bg color) */
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(40px);
}

/* Section label — pink uppercase with leading horizontal bar */
.label-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent-pink);
}
.label-pill::before {
  content: "";
  display: inline-block;
  height: 1px;
  width: 1.25rem;
  background: var(--color-accent-pink);
}

/* iOS-style icon tile — rounded square with inner border + top shine */
.ios-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.4);
}
.ios-icon::before {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.ios-icon::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50%;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25), transparent);
}
.ios-icon > svg {
  position: relative;
  z-index: 1;
}

/* iOS-icon background gradients per resource type */
.ios-bg-pink   { background: linear-gradient(135deg, #ff4d6d 0%, #c6285a 100%); }
.ios-bg-purple { background: linear-gradient(135deg, #7c3aed 0%, #4f1fb2 100%); }
.ios-bg-green  { background: linear-gradient(135deg, #22d39c 0%, #0e8a66 100%); }
.ios-bg-amber  { background: linear-gradient(135deg, #f59e0b 0%, #b16c00 100%); }
.ios-bg-blue   { background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); }

/* Resource card shell — border + soft bg + hover lift */
.stl-card {
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(2px);
  transition: all 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.stl-card:hover {
  border-color: rgba(255, 77, 109, 0.22);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-3px);
}
.stl-card .accent-line {
  height: 1px;
  width: 2rem;
  background: linear-gradient(90deg, var(--color-accent-pink), var(--color-accent-purple));
  transition: width 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.stl-card:hover .accent-line {
  width: 100%;
}

/* Mono small caps for "No. 0X" labels */
.stl-num {
  font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 77, 109, 0.65);
}

/* Shine sweep effect on primary CTA hover */
.shine-btn {
  position: relative;
  overflow: hidden;
}
.shine-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%) skewX(-20deg);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transition: transform 0.8s ease-out;
  pointer-events: none;
}
.shine-btn:hover::after {
  transform: translateX(100%) skewX(-20deg);
}

@media (prefers-reduced-motion: reduce) {
  .stl-card,
  .stl-card .accent-line,
  .shine-btn::after {
    transition: none;
  }
  .stl-card:hover {
    transform: none;
  }
}
```

- [ ] **Step 2: Verify the build still passes**

Run: `pnpm build`
Expected: ✓ built. CSS file should grow by ~2-3 kB.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(css): add Recursos section-scoped utilities"
```

---

## Task 3: Update `robots.txt` to disallow `/recursos`

**Files:**
- Modify: `public/robots.txt`

**Why:** Layer 3 of the 4-layer privacy strategy. Public file served at `/robots.txt` — gives crawlers an explicit "do not crawl this path" instruction.

- [ ] **Step 1: Replace `public/robots.txt` with**

```
User-agent: *
Allow: /
Disallow: /recursos

Sitemap: https://www.stellaris.com.co/sitemap.xml
```

- [ ] **Step 2: Verify by opening the file**

Read: `public/robots.txt`
Expected content: matches the block above exactly.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "seo(robots): disallow /recursos for all crawlers"
```

---

## Task 4: Create the data layer `src/data/recursos.ts`

**Files:**
- Create: `src/data/recursos.ts`

**Why:** Centralizes types, the launch resource list, and meta. Mirrors the pattern of `src/data/services/*.ts`. The data file is the single source of truth for content; the user edits `href` values here when files are ready.

- [ ] **Step 1: Create `src/data/recursos.ts` with this exact content**

```ts
import type { DocumentMeta } from "../hooks/useDocumentMeta";

export type ResourceType =
  | "guia"
  | "plantilla"
  | "caso"
  | "webinar"
  | "herramienta"
  | "otro";

export type ResourceIconKey =
  | "book"
  | "grid"
  | "trend"
  | "play"
  | "tool"
  | "sparkles";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  meta: string;
  href: string;
  featured?: boolean;
  external?: boolean;
}

// Launch content. Replace `href: "#"` with real URLs as files become available.
// Card with href === "#" renders as aria-disabled (see ResourceCard).
export const RESOURCES: readonly Resource[] = [
  {
    id: "r6",
    featured: true,
    type: "guia",
    title: "El playbook de WhatsApp Marketing 2026",
    description:
      "Estrategia, flujos y plantillas listas para implementar en cuentas reales.",
    meta: "PDF · 36 págs",
    href: "#",
  },
  {
    id: "r1",
    type: "guia",
    title: "Cómo auditar tus redes sociales en 30 minutos",
    description:
      "Un paso a paso accionable para identificar qué funciona, qué no, y qué corregir esta semana.",
    meta: "PDF · 22 págs",
    href: "#",
  },
  {
    id: "r2",
    type: "plantilla",
    title: "Calendario editorial mensual (Google Sheets)",
    description:
      "Plantilla lista para planificar publicaciones, formatos y métricas mes a mes.",
    meta: "Sheets · Editable",
    href: "#",
    external: true,
  },
  {
    id: "r3",
    type: "caso",
    title: "Cómo crecimos +320% en alcance orgánico",
    description:
      "Caso detallado de la estrategia editorial que aplicamos para una marca B2C en Colombia.",
    meta: "Caso · 8 min de lectura",
    href: "#",
  },
  {
    id: "r4",
    type: "webinar",
    title: "Email Marketing que convierte: del asunto al CTA",
    description:
      "Sesión grabada con los errores más comunes y un framework para cada paso del correo.",
    meta: "Video · 42 min",
    href: "#",
    external: true,
  },
];

export const RECURSOS_META: DocumentMeta = {
  title: "Recursos | Stellaris",
  description:
    "Biblioteca de guías, plantillas, casos y herramientas de marketing digital.",
  canonical: "https://www.stellaris.com.co/recursos",
  robots: "noindex, nofollow",
  ogType: "website",
};
```

- [ ] **Step 2: Verify TS compiles**

Run: `pnpm build`
Expected: ✓ built.

- [ ] **Step 3: Commit**

```bash
git add src/data/recursos.ts
git commit -m "feat(recursos): add data layer with types, launch content, meta"
```

---

## Task 5: Create the icons map `src/components/recursos/icons.ts`

**Files:**
- Create: `src/components/recursos/icons.ts`

**Why:** Same pattern as `src/components/services/whatsapp/icons.ts` — keep icon imports + type-to-style mapping out of the data file so the data is JSON-clean. Also centralizes the iOS background class and label per type for both cards to consume.

- [ ] **Step 1: Create `src/components/recursos/icons.ts`**

```ts
import {
  BookOpen,
  LayoutGrid,
  TrendingUp,
  PlayCircle,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ResourceIconKey, ResourceType } from "../../data/recursos";

export const RESOURCE_ICONS: Record<ResourceIconKey, LucideIcon> = {
  book: BookOpen,
  grid: LayoutGrid,
  trend: TrendingUp,
  play: PlayCircle,
  tool: Wrench,
  sparkles: Sparkles,
};

export interface ResourceTypeMeta {
  label: string;
  iconKey: ResourceIconKey;
  iconBg: string; // CSS class from index.css (e.g. "ios-bg-pink")
}

export const TYPE_META: Record<ResourceType, ResourceTypeMeta> = {
  guia:        { label: "Guía",            iconKey: "book",     iconBg: "ios-bg-pink"   },
  plantilla:   { label: "Plantilla",       iconKey: "grid",     iconBg: "ios-bg-purple" },
  caso:        { label: "Caso de estudio", iconKey: "trend",    iconBg: "ios-bg-green"  },
  webinar:     { label: "Webinar",         iconKey: "play",     iconBg: "ios-bg-amber"  },
  herramienta: { label: "Herramienta",     iconKey: "tool",     iconBg: "ios-bg-blue"   },
  otro:        { label: "Recurso",         iconKey: "sparkles", iconBg: "ios-bg-pink"   },
};
```

- [ ] **Step 2: Verify TS compiles**

Run: `pnpm build`
Expected: ✓ built.

- [ ] **Step 3: Commit**

```bash
git add src/components/recursos/icons.ts
git commit -m "feat(recursos): add icon map and per-type visual metadata"
```

---

## Task 6: Add Firebase analytics helper for resource downloads

**Files:**
- Modify: `src/lib/firebase.ts`

**Why:** Spec calls for an optional `resource_download` event when a user clicks a download CTA — but only if cookie consent was accepted. Centralizes the consent check so component code is a simple `void logResourceDownload(id, type)` call.

- [ ] **Step 1: Append to `src/lib/firebase.ts`**

Add after the existing `addContactRequest` function (after line 65):

```ts
const CONSENT_KEY = "cookieConsent";

function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

/**
 * Fire-and-forget custom analytics event for a resource download click.
 * Silent no-op if cookie consent was not granted, if Analytics fails to
 * initialize, or if running in an environment where Analytics is unsupported.
 */
export async function logResourceDownload(
  resourceId: string,
  resourceType: string,
): Promise<void> {
  if (!hasAnalyticsConsent()) return;
  try {
    const analytics = await loadAnalytics();
    if (!analytics) return;
    const { logEvent } = await import("firebase/analytics");
    logEvent(analytics, "resource_download", {
      resource_id: resourceId,
      resource_type: resourceType,
    });
  } catch {
    // Best-effort tracking — never bubble up errors that would block the
    // download navigation.
  }
}
```

- [ ] **Step 2: Verify TS compiles**

Run: `pnpm build`
Expected: ✓ built. Firebase chunks should still be lazy.

- [ ] **Step 3: Commit**

```bash
git add src/lib/firebase.ts
git commit -m "feat(firebase): logResourceDownload helper (consent-gated)"
```

---

## Task 7: Create `ResourceCard` component (small card for the 2×2 grid)

**Files:**
- Create: `src/components/recursos/ResourceCard.tsx`

**Why:** Atom used 4 times in the BibliotecaSection right column. Renders a single non-featured resource with iOS-icon, accent-line, type label, title, meta, and Download CTA. Handles `href === "#"` placeholder state and the analytics tracking on click.

- [ ] **Step 1: Create `src/components/recursos/ResourceCard.tsx`**

```tsx
import { ArrowRight } from "lucide-react";
import type { Resource } from "../../data/recursos";
import { RESOURCE_ICONS, TYPE_META } from "./icons";
import { logResourceDownload } from "../../lib/firebase";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
  const meta = TYPE_META[resource.type];
  const Icon = RESOURCE_ICONS[meta.iconKey];
  const disabled = resource.href === "#";

  const handleClick = () => {
    if (disabled) return;
    void logResourceDownload(resource.id, resource.type);
  };

  const linkProps = resource.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <article className="stl-card group relative overflow-hidden p-6">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`ios-icon ${meta.iconBg}`}
            style={{ width: 44, height: 44, borderRadius: 12 }}
            aria-hidden="true"
          >
            <Icon size={20} strokeWidth={1.8} className="text-white drop-shadow-sm" />
          </div>
          <span className="stl-num">No. {String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="accent-line mb-4" />

        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          {meta.label}
        </div>

        <h3 className="font-heading text-[0.98rem] font-bold leading-snug text-text-primary">
          {resource.title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-text-muted">{resource.meta}</p>

        <a
          href={resource.href}
          onClick={handleClick}
          aria-disabled={disabled || undefined}
          {...linkProps}
          className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-pink transition-all group-hover:gap-2.5 ${
            disabled ? "pointer-events-none opacity-60" : ""
          }`}
        >
          Descargar
          <ArrowRight size={12} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TS compiles + lint clean**

Run: `pnpm build && pnpm lint`
Expected: ✓ built; lint reports only the 2 pre-existing errors in `App.tsx` and `ChatMockup.tsx`. No new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/recursos/ResourceCard.tsx
git commit -m "feat(recursos): ResourceCard atom (small card for 2x2 grid)"
```

---

## Task 8: Create `FeaturedResourceCard` component

**Files:**
- Create: `src/components/recursos/FeaturedResourceCard.tsx`

**Why:** Bigger card for the resource with `featured: true`. Same data shape but larger padding, bigger icon, primary CTA (`shine-btn` with gradient), and two decorative orbs.

- [ ] **Step 1: Create `src/components/recursos/FeaturedResourceCard.tsx`**

```tsx
import { Download, FileText } from "lucide-react";
import type { Resource } from "../../data/recursos";
import { RESOURCE_ICONS, TYPE_META } from "./icons";
import { logResourceDownload } from "../../lib/firebase";

interface FeaturedResourceCardProps {
  resource: Resource;
}

export function FeaturedResourceCard({ resource }: FeaturedResourceCardProps) {
  const meta = TYPE_META[resource.type];
  const Icon = RESOURCE_ICONS[meta.iconKey];
  const disabled = resource.href === "#";

  const handleClick = () => {
    if (disabled) return;
    void logResourceDownload(resource.id, resource.type);
  };

  const linkProps = resource.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  // The numeric label "No. 06" matches the id suffix (r6). The mockup hardcodes
  // this; we mirror it. If you rename ids, update this too.
  const idNumber = resource.id.replace(/^r/, "").padStart(2, "0");

  return (
    <article className="stl-card group relative overflow-hidden p-9">
      <div
        aria-hidden="true"
        className={`orb -left-12 -top-12 h-48 w-48 opacity-70 bg-gradient-to-br from-accent-pink to-accent-purple`}
      />
      <div
        aria-hidden="true"
        className={`orb -bottom-10 -right-10 h-40 w-40 opacity-40 bg-gradient-to-tl from-accent-pink to-accent-purple`}
      />

      <div className="relative z-10">
        <div className="mb-7 flex items-center gap-4">
          <div className={`ios-icon ${meta.iconBg}`} aria-hidden="true">
            <Icon size={26} strokeWidth={1.8} className="text-white drop-shadow-sm" />
          </div>
          <div>
            <div className="stl-num">Destacado · No. {idNumber}</div>
            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-pink">
              {meta.label}
            </div>
          </div>
        </div>

        <div className="accent-line mb-5" />

        <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-[1.7rem]">
          {resource.title}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
          {resource.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <a
            href={resource.href}
            onClick={handleClick}
            aria-disabled={disabled || undefined}
            {...linkProps}
            className={`shine-btn inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white shadow-[0_8px_30px_rgba(255,77,109,0.25)] transition-shadow hover:shadow-[0_10px_36px_rgba(255,77,109,0.4)] ${
              disabled ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Download size={16} aria-hidden="true" />
            Descargar gratis
          </a>
          <span className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <FileText size={14} aria-hidden="true" />
            {resource.meta}
          </span>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TS compiles + lint clean**

Run: `pnpm build && pnpm lint`
Expected: ✓ built; no new lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/recursos/FeaturedResourceCard.tsx
git commit -m "feat(recursos): FeaturedResourceCard atom for the destacado slot"
```

---

## Task 9: Create `BibliotecaSection` composer

**Files:**
- Create: `src/components/recursos/BibliotecaSection.tsx`

**Why:** Composes the `VariationA` layout: split header (label + h2 left, lead paragraph right) over a 2-column grid (featured big card left, 2×2 secondary cards right). On mobile everything stacks. Uses existing `useReveal` and `useScrollReveal` for fade-up animations. The "Ver toda la biblioteca" CTA from the mockup is intentionally omitted.

- [ ] **Step 1: Create `src/components/recursos/BibliotecaSection.tsx`**

```tsx
import { RESOURCES } from "../../data/recursos";
import { HighlightText } from "../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../hooks/useScrollReveal";
import { FeaturedResourceCard } from "./FeaturedResourceCard";
import { ResourceCard } from "./ResourceCard";

export function BibliotecaSection() {
  const headerRef = useReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.08 });

  const featured = RESOURCES.find((r) => r.featured);
  const rest = RESOURCES.filter((r) => !r.featured).slice(0, 4);

  if (!featured) return null;

  return (
    <section
      id="biblioteca"
      className="relative overflow-hidden px-[5%] py-[110px]"
      aria-labelledby="biblioteca-heading"
    >
      <div
        aria-hidden="true"
        className="orb -left-32 top-20 h-72 w-72 bg-accent-purple/10"
      />
      <div
        aria-hidden="true"
        className="orb -right-32 bottom-10 h-72 w-72 bg-accent-pink/10"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className="mb-12 grid items-end gap-8 lg:grid-cols-2"
        >
          <div>
            <p className="label-pill mb-3.5">Recursos</p>
            <h2
              id="biblioteca-heading"
              className="font-heading text-section font-extrabold tracking-[-1px]"
            >
              Aprende, aplica, <HighlightText>crece.</HighlightText>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
            Una biblioteca abierta de guías, plantillas, casos y herramientas
            que el equipo de Stellaris usa todos los días. Gratis y sin
            formulario.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <FeaturedResourceCard resource={featured} />
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((resource, i) => (
              <ResourceCard key={resource.id} resource={resource} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TS compiles + lint clean**

Run: `pnpm build && pnpm lint`
Expected: ✓ built; no new lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/recursos/BibliotecaSection.tsx
git commit -m "feat(recursos): BibliotecaSection composing featured + 2x2 grid"
```

---

## Task 10: Create `RecursosHero` component

**Files:**
- Create: `src/components/recursos/RecursosHero.tsx`

**Why:** Page intro (mirrors the mockup's `PageIntro`). Has "Volver al inicio" link (uses existing `HashLink`), label pill, H1 with `HighlightText`, and lead paragraph. Two decorative orbs match the page-level visual language.

- [ ] **Step 1: Create `src/components/recursos/RecursosHero.tsx`**

```tsx
import { ArrowLeft } from "lucide-react";
import { HashLink } from "../routing/HashLink";
import { HighlightText } from "../ui/HighlightText";

export function RecursosHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-10"
      aria-labelledby="recursos-heading"
    >
      <div
        aria-hidden="true"
        className="orb -left-32 top-20 h-80 w-80 bg-accent-purple/15"
      />
      <div
        aria-hidden="true"
        className="orb -right-32 -top-20 h-72 w-72 bg-accent-pink/15"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-[5%]">
        <HashLink
          to="/#inicio"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-text-muted transition-colors hover:text-accent-pink"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Volver al inicio
        </HashLink>

        <p className="label-pill mb-4">Recursos</p>

        <h1
          id="recursos-heading"
          className="font-heading text-hero font-extrabold tracking-[-1.5px]"
        >
          Biblioteca de <HighlightText>marketing digital.</HighlightText>
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-text-muted">
          Guías, plantillas, casos, webinars y herramientas que usamos en
          Stellaris todos los días. Gratis y sin formulario.
        </p>
      </div>
    </section>
  );
}
```

Note: H1 says "Biblioteca de marketing digital" (not "Biblioteca abierta de marketing digital" from the mockup) — the word "abierta" was flagged in the spec review as inconsistent with an unlisted page.

- [ ] **Step 2: Verify TS compiles + lint clean**

Run: `pnpm build && pnpm lint`
Expected: ✓ built; no new lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/recursos/RecursosHero.tsx
git commit -m "feat(recursos): RecursosHero with breadcrumb-style back link"
```

---

## Task 11: Create `RecursosPage` and register lazy route

**Files:**
- Create: `src/pages/RecursosPage.tsx`
- Modify: `src/App.tsx`

**Why:** Page orchestrator and route registration. Mirrors the lazy-import pattern of every other page. `useDocumentMeta(RECURSOS_META)` activates the `noindex, nofollow` meta tag.

- [ ] **Step 1: Create `src/pages/RecursosPage.tsx`**

```tsx
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { RECURSOS_META } from "../data/recursos";
import { RecursosHero } from "../components/recursos/RecursosHero";
import { BibliotecaSection } from "../components/recursos/BibliotecaSection";

export default function RecursosPage() {
  useDocumentMeta(RECURSOS_META);

  return (
    <>
      <RecursosHero />
      <BibliotecaSection />
    </>
  );
}
```

- [ ] **Step 2: Register the lazy route in `src/App.tsx`**

In `src/App.tsx`, add a lazy import alongside the existing lazy imports (around line 14, after `PrivacyPolicyPage`):

```ts
const RecursosPage = lazy(() => import("./pages/RecursosPage"));
```

Then add the route inside `<Routes>` (place it right before the `<Route path="*" ...>` catch-all):

```tsx
<Route path="/recursos" element={<RecursosPage />} />
```

- [ ] **Step 3: Verify TS compiles + lint clean**

Run: `pnpm build && pnpm lint`
Expected: ✓ built — new chunk `RecursosPage-*.js` appears in the build output. No new lint errors.

- [ ] **Step 4: Manual smoke test in dev server**

Run: `pnpm dev`

Navigate to `http://localhost:5173/recursos` and verify:

- Page renders with hero + biblioteca section
- "Volver al inicio" link → goes back to `/`
- Featured card shows the WhatsApp playbook with shine-button "Descargar gratis"
- 2×2 grid shows 4 secondary cards
- All download buttons render but with disabled state (faded, no pointer cursor) since hrefs are `"#"`
- Open DevTools → Elements → `<head>` should contain `<meta name="robots" content="noindex, nofollow">`
- Open DevTools → Network → reload — `RecursosPage-*.js` should be in its own lazy chunk
- Navigate to `/` and confirm Navbar/Footer have NO "Recursos" link

If anything is off visually, compare against `c:\Users\frede\Downloads\recursos-biblioteca.html` (VariationA).

- [ ] **Step 5: Commit**

```bash
git add src/pages/RecursosPage.tsx src/App.tsx
git commit -m "feat(recursos): RecursosPage and lazy /recursos route"
```

---

## Task 12: Final verification + checklist

**Files:** (read-only verifications)

**Why:** Combined privacy + build + a11y verification before opening the PR. Each box must be checked or explicitly noted as "covered earlier".

- [ ] **Step 1: Full build + lint**

```bash
pnpm build && pnpm lint
```

Expected: build green, only the 2 pre-existing lint errors (not in any file touched by this plan).

- [ ] **Step 2: Verify NO public links to /recursos anywhere in src/**

Run: `pnpm exec grep -r "/recursos" src/ --include="*.tsx" --include="*.ts"`

Expected lines (only these are allowed):
- `src/data/recursos.ts` — canonical URL `https://www.stellaris.com.co/recursos`
- `src/pages/RecursosPage.tsx` — (no literal `/recursos` here; the route uses `RECURSOS_META.canonical`)
- `src/App.tsx` — `<Route path="/recursos" ...>` registration

There must be ZERO matches in `Navbar.tsx`, `Footer.tsx`, `data/content.ts`, or any service page.

- [ ] **Step 3: Verify /recursos is NOT in sitemap.xml**

Read: `public/sitemap.xml`
Expected: no `<loc>` line contains `/recursos`.

- [ ] **Step 4: Verify robots.txt blocks /recursos**

Read: `public/robots.txt`
Expected: contains line `Disallow: /recursos`.

- [ ] **Step 5: Manual privacy verification in browser (dev server)**

Run: `pnpm dev`

In DevTools:
1. Navigate to `/recursos`, open Elements → `<head>` → confirm `<meta name="robots" content="noindex, nofollow">` is present.
2. Navigate to `/` (home), open Elements → `<head>` → confirm there is NO `<meta name="robots">` (or it's set to something other than noindex). This proves the cleanup restorer in `useDocumentMeta` works.
3. Open Network tab, hard-reload `/recursos`. Confirm `RecursosPage-*.js` chunk loads on demand (not part of initial bundle).

- [ ] **Step 6: Push branch and open PR against `dev`**

```bash
git push -u origin <current-branch-name>
gh pr create --base dev --title "feat(recursos): unlisted /recursos library page" --body "$(cat <<'EOF'
## Summary

Adds an unlisted `/recursos` resources library page reachable only via URLs pegadas en ads de redes. Privacy via 4 defensive layers:

- `<meta name="robots" content="noindex, nofollow">` via extended `useDocumentMeta`
- `Disallow: /recursos` in `public/robots.txt`
- Not added to `public/sitemap.xml`
- Zero internal links from Navbar / Footer / sitemap

Layout: `VariationA` from the mockup — featured card + 2×2 grid of secondary cards. Optional consent-gated analytics event `resource_download` fires on click. Resource href values are placeholder (`"#"`) — replace with real URLs before campaign launch.

## Test plan

- [x] \`pnpm build\` passes
- [x] \`pnpm lint\` only reports pre-existing errors
- [ ] On Vercel preview: confirm DevTools \`<head>\` contains noindex meta on /recursos and NOT on /
- [ ] On Vercel preview: confirm Navbar/Footer have no Recursos link
- [ ] After deploy to prod: \`site:stellaris.com.co recursos\` in Google should remain empty after 1-2 weeks
EOF
)"
```

---

## Self-review notes

**Spec coverage:**
- Privacy strategy (4 layers): Task 1 (robots meta), Task 3 (robots.txt), Task 12 step 3 (sitemap absence verification), Task 12 step 2 (no internal links verification). ✓
- Architecture (new files + modified files): Tasks 4, 5, 7, 8, 9, 10, 11 cover all new files. Tasks 1, 3, 6, 11 cover all modifications. ✓
- Data model: Task 4 (full schema + launch content). ✓
- Hero: Task 10. ✓
- BibliotecaSection layout: Task 9. ✓
- FeaturedResourceCard / ResourceCard: Tasks 8 / 7. ✓
- `href === "#"` disabled handling: Tasks 7 and 8 (`pointer-events-none`, `aria-disabled`). ✓
- Analytics tracking: Tasks 6 (helper) and 7 / 8 (consumers). ✓
- CSS utilities: Task 2. ✓
- No JSON-LD: Task 4 (`RECURSOS_META` does not include a JSON-LD argument; Task 11's `useDocumentMeta(RECURSOS_META)` is called without the optional second arg). ✓
- Accessibility (`aria-labelledby`, descriptive CTA text, no decorative SVG missing aria-hidden): Tasks 7, 8, 9, 10 all use `aria-hidden="true"` on icons and `aria-labelledby` on sections. ✓
- Out-of-scope items: not implemented anywhere. ✓

**Placeholder scan:** none. All code blocks are runnable as written.

**Type consistency:** `Resource`, `ResourceType`, `ResourceIconKey`, `TYPE_META`, `RESOURCE_ICONS` are defined once each and consumed with matching shapes downstream.
