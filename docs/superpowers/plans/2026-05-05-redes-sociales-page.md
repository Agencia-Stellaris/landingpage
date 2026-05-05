# Redes Sociales Service Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar la nueva página `/servicios/redes-sociales` siguiendo el spec en `docs/superpowers/specs/2026-05-05-redes-sociales-page-design.md`. Replicar el patrón establecido por la página de WhatsApp (Hero + ServiceIntro con pillars + ServiceIncludes con feature cards + ContactCTA reusado), con un nuevo `SocialMockup` (feed Instagram-like animado) en lugar del `ChatMockup`.

**Architecture:** Misma arquitectura que la página de WhatsApp. Nueva carpeta `src/components/services/redes/` con 4 componentes; data centralizada en `src/data/services/redes-sociales.ts`; helper de iconos local; page lazy-loaded. Se reutilizan `useReveal`, `HighlightText`, `Starfield`, `HashLink`, `ContactCTA` (compartido). Nuevas utilidades CSS scoped en `src/index.css` para el feed animado y los gradient covers.

**Tech Stack:** React 19 + TypeScript strict + Tailwind CSS v4 (CSS-first via `@theme`) + GSAP/Lenis + lucide-react + Firebase (ya wired en `ContactCTA`).

**Verification model (no hay test runner):** Cada tarea verifica con `npx tsc --noEmit`, `npm run lint`, dev server / build, y para SEO/audit con validador de schema y Lighthouse al final.

---

## Task 0: Confirmar branch y baseline limpio

**Files:** ninguno modificado.

- [ ] **Step 1: Verificar branch y árbol limpio**

Run:
```
git branch --show-current
git status -s
```
Expected: branch `feat/redes-sociales`. `git status -s` muestra solo el spec ya commiteado (working tree limpio fuera de archivos no rastreados que no nos conciernen).

- [ ] **Step 2: Confirmar baseline build verde**

Run desde `C:/Users/frede/Documents/Stellaris/LandingPage`:
```
npm run lint
npx tsc --noEmit
```
Expected: 0 errores en ambos.

(Sin commit — esta es solo verificación.)

---

## Task 1: Tipos y constantes del data file `redes-sociales.ts`

**Files:**
- Create: `src/data/services/redes-sociales.ts`

- [ ] **Step 1: Crear el archivo con tipos, INCLUDES, PILLARS, META y JSON-LD**

Contenido completo del archivo:

```ts
import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type RedesIconKey =
  | "strategy"
  | "content"
  | "community"
  | "ads"
  | "metrics"
  | "reputation";

export interface RedesFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: RedesIconKey;
}

export interface RedesPillar {
  title: string;
  description: string;
  iconKey: RedesIconKey;
}

export const REDES_INCLUDES: readonly RedesFeature[] = [
  {
    title: "Estrategia de contenido",
    description:
      "Estrategia personalizada y alineada a tus objetivos de negocio, con enfoque en conversión.",
    tag: "Estrategia",
    iconKey: "strategy",
  },
  {
    title: "Producción visual y copy",
    description:
      "Producción de contenido visual de alto impacto y redacción de textos persuasivos.",
    tag: "Creativo",
    iconKey: "content",
  },
  {
    title: "Community management",
    description:
      "Gestión activa de tu comunidad: respondemos, dinamizamos y construimos relación.",
    tag: "Comunidad",
    iconKey: "community",
  },
  {
    title: "Pauta paga",
    description:
      "Campañas en Meta Ads, TikTok Ads y LinkedIn Ads gestionadas y optimizadas por nuestro equipo.",
    tag: "Ads",
    iconKey: "ads",
  },
  {
    title: "Métricas y reportes",
    description:
      "Análisis de métricas y reportes de rendimiento mensuales con lectura accionable.",
    tag: "Datos",
    iconKey: "metrics",
  },
  {
    title: "Reputación de marca",
    description:
      "Monitoreo de reputación y respuesta a comentarios para cuidar la conversación pública.",
    tag: "Reputación",
    iconKey: "reputation",
  },
];

export const REDES_PILLARS: readonly RedesPillar[] = [
  {
    title: "Comunidades reales",
    description: "Más allá de publicar contenido: relaciones que se sostienen.",
    iconKey: "community",
  },
  {
    title: "Narrativas que conectan",
    description:
      "Estrategias de contenido alineadas a tu marca y a tus objetivos.",
    iconKey: "strategy",
  },
  {
    title: "Conversaciones, prospectos y ventas",
    description: "Cada publicación con intención: hacer crecer tu marca.",
    iconKey: "metrics",
  },
];

export const REDES_META: DocumentMeta = {
  title: "Gestión de Redes Sociales en Colombia | Stellaris",
  description:
    "Gestión profesional de redes sociales: estrategia de contenido, producción visual, community management, pauta paga, métricas y reputación. Construimos comunidades que generan resultados.",
  keywords:
    "gestión redes sociales, community management, social media, agencia redes sociales Colombia, content marketing, pauta digital",
  canonical: "https://www.stellaris.com.co/servicios/redes-sociales",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/redes-sociales.jpg",
};

export const REDES_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gestión de Redes Sociales",
    serviceType: "Social Media Management",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: "es-CO",
    description:
      "Gestión profesional de redes sociales en Instagram, Facebook, LinkedIn, TikTok y más, con estrategia, producción de contenido, community management, pauta paga y métricas.",
    url: "https://www.stellaris.com.co/servicios/redes-sociales",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: REDES_INCLUDES.map((entry, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: entry.title },
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.stellaris.com.co/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://www.stellaris.com.co/#servicios",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gestión de Redes Sociales",
        item: "https://www.stellaris.com.co/servicios/redes-sociales",
      },
    ],
  },
];
```

- [ ] **Step 2: Verificar tsc y lint**

Run desde `C:/Users/frede/Documents/Stellaris/LandingPage`:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores en ambos.

(Si ESLint reporta "no-unused-vars" sobre exports, ignorar — los consumirán las tareas siguientes. Si ESLint flaggea errores reales, parar y reportar.)

- [ ] **Step 3: Commit**

```
git add src/data/services/redes-sociales.ts
git commit -m "feat(redes): add data file with includes, pillars, meta and JSON-LD"
```

---

## Task 2: Helper `icons.ts` (mapeo `iconKey` → componente Lucide)

**Files:**
- Create: `src/components/services/redes/icons.ts`

- [ ] **Step 1: Crear el archivo con el mapeo**

```ts
import {
  Target,
  Image,
  Users,
  Megaphone,
  BarChart3,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { RedesIconKey } from "../../../data/services/redes-sociales";

export const REDES_ICONS: Record<RedesIconKey, LucideIcon> = {
  strategy: Target,
  content: Image,
  community: Users,
  ads: Megaphone,
  metrics: BarChart3,
  reputation: Star,
};
```

- [ ] **Step 2: Verificar tsc y lint**

Run desde `C:/Users/frede/Documents/Stellaris/LandingPage`:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

- [ ] **Step 3: Commit**

```
git add src/components/services/redes/icons.ts
git commit -m "feat(redes): add iconKey to lucide-react icon helper"
```

---

## Task 3: Reglas CSS nuevas en `index.css`

**Files:**
- Modify: `src/index.css` (apéndice al final del archivo)

- [ ] **Step 1: Append al final de `src/index.css`**

Agregar al final del archivo (después del bloque "WhatsApp Marketing — section-scoped utilities" + `.chat-shell`):

```css

/* ============================================
 * Redes Sociales — section-scoped utilities
 * ============================================ */

/* Phone shell — alias semántico de chat-shell para el SocialMockup. */
.phone-shell {
  height: 560px;
}

/* Story ring — conic gradient pad usado en el feed mockup. */
.story-ring {
  padding: 2px;
  border-radius: 9999px;
  background: conic-gradient(
    from 220deg,
    #ff4d6d,
    #7c3aed,
    #f59e0b,
    #ff4d6d
  );
}

/* Metric chip — chip pequeño en covers del feed. */
.metric-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.55rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", monospace;
  font-size: 0.68rem;
  color: var(--color-text-primary);
}

/* Gradient covers — fondo decorativo de cada FeedPost. */
.grad-cover-1 {
  background: linear-gradient(135deg, #ff4d6d 0%, #7c3aed 100%);
}
.grad-cover-2 {
  background: linear-gradient(135deg, #22d39c 0%, #0ea5e9 100%);
}
.grad-cover-3 {
  background: linear-gradient(135deg, #f59e0b 0%, #ff4d6d 100%);
}
.grad-cover-4 {
  background: linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%);
}

/* Feed scroll — track vertical de los 4 posts dentro del phone shell. */
@keyframes feed-scroll {
  0%,
  12% {
    transform: translateY(0);
  }
  24%,
  38% {
    transform: translateY(-280px);
  }
  50%,
  64% {
    transform: translateY(-560px);
  }
  76%,
  90% {
    transform: translateY(-840px);
  }
  100% {
    transform: translateY(0);
  }
}
.feed-track {
  animation: feed-scroll 18s ease-in-out infinite;
}

/* Like pulse — heart de cada FeedPost. */
@keyframes like-pulse {
  0%,
  70%,
  100% {
    transform: scale(1);
  }
  78% {
    transform: scale(1.35);
  }
  86% {
    transform: scale(0.95);
  }
}
.like-pulse {
  animation: like-pulse 4s ease-in-out infinite;
  transform-origin: center;
}

@media (prefers-reduced-motion: reduce) {
  .feed-track,
  .like-pulse {
    animation: none;
  }
}
```

- [ ] **Step 2: Verificar build y lint**

Run desde `C:/Users/frede/Documents/Stellaris/LandingPage`:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

- [ ] **Step 3: Commit**

```
git add src/index.css
git commit -m "feat(css): add Redes section utilities (phone-shell, story-ring, metric-chip, grad-cover-*, feed/like animations)"
```

---

## Task 4: `SocialMockup.tsx` — phone con feed Instagram-like animado

**Files:**
- Create: `src/components/services/redes/SocialMockup.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import {
  Heart,
  Send,
  MoreHorizontal,
  Home,
  Search,
  PlusSquare,
  Film,
  User,
  Bookmark,
  MessageCircle,
  Share2,
} from "lucide-react";

interface FeedPostData {
  author: string;
  handle: string;
  time: string;
  cover: "grad-cover-1" | "grad-cover-2" | "grad-cover-3" | "grad-cover-4";
  caption: { title: string; body: string };
  likes: string;
  comments: string;
  accent: string;
}

const POSTS: readonly FeedPostData[] = [
  {
    author: "@tu_marca",
    handle: "Patrocinado",
    time: "hace 2h",
    cover: "grad-cover-1",
    caption: {
      title: "Lanzamiento de temporada",
      body: "Nueva colección. La estrategia detrás del feed que más convierte.",
    },
    likes: "2 348",
    comments: "184",
    accent: "REEL · 24s",
  },
  {
    author: "@tu_marca",
    handle: "Publicación",
    time: "ayer",
    cover: "grad-cover-2",
    caption: {
      title: "Carrusel · 5 datos",
      body: "5 cosas que aprendimos esta semana del comportamiento de tu audiencia.",
    },
    likes: "1 102",
    comments: "92",
    accent: "CARRUSEL",
  },
  {
    author: "@tu_marca",
    handle: "Reel",
    time: "lun",
    cover: "grad-cover-3",
    caption: {
      title: "Detrás de cámaras",
      body: "Así producimos el contenido visual que mueve la conversación.",
    },
    likes: "3 765",
    comments: "241",
    accent: "REEL · 18s",
  },
  {
    author: "@tu_marca",
    handle: "Publicación",
    time: "vie",
    cover: "grad-cover-4",
    caption: {
      title: "Caso de éxito",
      body: "Cómo crecimos +320% en alcance con una estrategia editorial clara.",
    },
    likes: "1 894",
    comments: "156",
    accent: "POST",
  },
];

const STORIES: readonly string[] = [
  "Tienda",
  "Lanzam.",
  "Reel #2",
  "Detrás",
  "Tips",
];

function FeedPost({ post }: { post: FeedPostData }) {
  return (
    <div className="border-b border-white/[0.06] pb-3">
      {/* post header */}
      <div className="flex items-center gap-2.5 px-3 pt-3">
        <div className="story-ring">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0E0818] text-[10px] font-bold text-white">
            {post.author.charAt(1).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 leading-tight">
          <div className="text-[12px] font-semibold text-white">
            {post.author}
          </div>
          <div className="text-[10px] text-white/40">
            {post.handle} · {post.time}
          </div>
        </div>
        <MoreHorizontal size={14} className="text-white/40" aria-hidden="true" />
      </div>
      {/* cover */}
      <div
        className={`mx-3 mt-2 h-44 overflow-hidden rounded-xl ${post.cover} relative`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <div className="font-heading text-[15px] font-bold leading-tight text-white drop-shadow">
            {post.caption.title}
          </div>
          <div className="metric-chip">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {post.accent}
          </div>
        </div>
      </div>
      {/* actions */}
      <div className="mt-2 flex items-center gap-4 px-3 text-white/70">
        <div className="flex items-center gap-1">
          <Heart
            size={18}
            strokeWidth={2}
            className="like-pulse text-accent-pink"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] text-white/80">
            {post.likes}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={17} aria-hidden="true" />
          <span className="font-mono text-[11px] text-white/80">
            {post.comments}
          </span>
        </div>
        <Share2 size={17} aria-hidden="true" />
        <div className="flex-1" />
        <Bookmark size={17} aria-hidden="true" />
      </div>
      {/* caption */}
      <p className="mt-1.5 px-3 text-[11.5px] leading-snug text-white/70">
        <span className="font-semibold text-white">{post.author}</span>{" "}
        {post.caption.body}
      </p>
    </div>
  );
}

export function SocialMockup() {
  return (
    <div
      role="img"
      aria-label="Vista previa de feed de redes sociales gestionado por Stellaris"
      className="relative mx-auto w-full max-w-[330px]"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Phone */}
      <div className="rounded-[2.4rem] border border-white/[0.08] bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)]">
        <div className="overflow-hidden rounded-[2rem] bg-[#0B0712]">
          {/* App header */}
          <div
            className="flex items-center justify-between border-b border-white/[0.06] bg-[#0B0712] px-4 py-3"
            aria-hidden="true"
          >
            <div className="font-heading text-[15px] font-bold tracking-tight text-white">
              stellaris<span className="text-accent-pink">.</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Heart size={16} />
              <Send size={16} />
            </div>
          </div>

          {/* Stories strip */}
          <div
            className="flex gap-3 overflow-hidden border-b border-white/[0.06] px-3 py-3"
            aria-hidden="true"
          >
            {STORIES.map((label) => (
              <div
                key={label}
                className="flex w-12 shrink-0 flex-col items-center gap-1"
              >
                <div className="story-ring">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0B0712] text-[9px] font-bold text-white">
                    {label.charAt(0)}
                  </div>
                </div>
                <div className="truncate text-[9px] text-white/50">{label}</div>
              </div>
            ))}
          </div>

          {/* Feed (fixed shell + animated track) */}
          <div
            className="phone-shell relative overflow-hidden"
            aria-hidden="true"
          >
            <div className="feed-track">
              {POSTS.map((post) => (
                <FeedPost key={post.caption.title} post={post} />
              ))}
            </div>
            {/* gradient masks top/bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0B0712] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0B0712] to-transparent" />
          </div>

          {/* Bottom tab bar */}
          <div
            className="flex items-center justify-around border-t border-white/[0.06] bg-[#0B0712] px-3 py-2.5 text-white/70"
            aria-hidden="true"
          >
            <Home size={18} />
            <Search size={18} />
            <PlusSquare size={20} />
            <Film size={18} />
            <User size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verificar tsc y lint**

Run:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

(Si ESLint advierte sobre exports no usados en este punto, ignorar — `RedesHero` lo consumirá en la próxima tarea.)

- [ ] **Step 3: Commit**

```
git add src/components/services/redes/SocialMockup.tsx
git commit -m "feat(redes): add SocialMockup with animated feed and Instagram-like UI"
```

---

## Task 5: `RedesHero.tsx` — hero con breadcrumb, CTAs y SocialMockup

**Files:**
- Create: `src/components/services/redes/RedesHero.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HashLink } from "../../routing/HashLink";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal } from "../../../hooks/useScrollReveal";
import { SocialMockup } from "./SocialMockup";

export function RedesHero() {
  const breadcrumbRef = useReveal<HTMLElement>({ y: 20 });
  const textRef = useReveal<HTMLDivElement>({ y: 40 });
  const mockupRef = useReveal<HTMLDivElement>({ y: 40, delay: 0.15 });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-32 lg:pt-14">
        <div>
          <nav ref={breadcrumbRef} aria-label="Migas de pan" className="mb-7">
            <ol className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-text-muted">
              <li>
                <HashLink
                  to="/#servicios"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent-pink"
                >
                  <ArrowLeft size={12} aria-hidden="true" />
                  Servicios
                </HashLink>
              </li>
              <li className="text-text-muted/40" aria-hidden="true">
                /
              </li>
              <li className="text-accent-pink" aria-current="page">
                Gesti&oacute;n de Redes Sociales
              </li>
            </ol>
          </nav>

          <div ref={textRef}>
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-1.5px]"
            >
              Convierte tus redes en tu{" "}
              <HighlightText>canal m&aacute;s poderoso.</HighlightText>
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">
              Construimos comunidades reales, narrativas que conectan y
              estrategias de contenido que generan conversaciones, prospectos y
              ventas.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <HashLink
                to="#contacto"
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
              >
                Diagn&oacute;stico gratuito
                <ArrowRight size={16} aria-hidden="true" />
              </HashLink>
              <HashLink
                to="#incluye"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-white/30 hover:bg-white/[0.03]"
              >
                Ver qu&eacute; incluye
              </HashLink>
            </div>
          </div>
        </div>

        <div ref={mockupRef}>
          <SocialMockup />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tsc y lint**

Run:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

- [ ] **Step 3: Commit**

```
git add src/components/services/redes/RedesHero.tsx
git commit -m "feat(redes): add hero with breadcrumb, CTAs and SocialMockup"
```

---

## Task 6: `ServiceIntro.tsx` — sección "Comunidad & contenido"

**Files:**
- Create: `src/components/services/redes/ServiceIntro.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { REDES_PILLARS } from "../../../data/services/redes-sociales";
import { REDES_ICONS } from "./icons";

export function ServiceIntro() {
  const headRef = useReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="pillars-heading"
    >
      <div className="aurora-line" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent-purple/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-accent-pink/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-[5%] py-[110px]">
        <div
          ref={headRef}
          className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16"
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink">
              Comunidad &amp; contenido
            </p>
            <h2
              id="pillars-heading"
              className="font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]"
            >
              M&aacute;s que <HighlightText>publicar.</HighlightText>
            </h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-[1.7]">
            <p>
              La gesti&oacute;n profesional de redes sociales va mucho m&aacute;s
              all&aacute; de publicar contenido. Con un objetivo estrat&eacute;gico
              para tu marca construimos{" "}
              <span className="font-semibold text-text-primary">
                comunidades reales
              </span>
              , narrativas que conectan y estrategias de contenido que generan
              conversaciones, prospectos y ventas.
            </p>
            <p>
              Nuestro equipo dise&ntilde;a{" "}
              <span className="font-semibold text-text-primary">
                contenidos estrat&eacute;gicos y visuales de alto impacto
              </span>
              , gestionando tu presencia en Instagram, Facebook, LinkedIn,
              TikTok y m&aacute;s plataformas, con un &uacute;nico objetivo:
              hacer crecer tu marca.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {REDES_PILLARS.map((pillar, i) => {
            const Ico = REDES_ICONS[pillar.iconKey];
            return (
              <div
                key={pillar.title}
                className="relative bg-bg-primary/60 p-8 backdrop-blur-sm"
              >
                <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-text-muted/50">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 text-text-primary">
                  <Ico size={20} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <div className="mt-5 font-heading text-lg font-semibold tracking-[-0.3px] text-text-primary">
                  {pillar.title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {pillar.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tsc y lint**

Run:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

- [ ] **Step 3: Commit**

```
git add src/components/services/redes/ServiceIntro.tsx
git commit -m "feat(redes): add ServiceIntro (Comunidad & contenido) with 3-pillar grid"
```

---

## Task 7: `ServiceIncludes.tsx` — grid 3-col de 6 feature cards

**Files:**
- Create: `src/components/services/redes/ServiceIncludes.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import type { MouseEvent } from "react";
import { Check } from "lucide-react";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import {
  REDES_INCLUDES,
  type RedesFeature,
} from "../../../data/services/redes-sociales";
import { REDES_ICONS } from "./icons";

interface FeatureCardProps {
  feature: RedesFeature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Ico = REDES_ICONS[feature.iconKey];

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={onMouseMove}
      className="feature-card group relative rounded-2xl p-7"
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="ico-wrap relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 text-text-primary">
          <Ico size={22} strokeWidth={1.6} aria-hidden="true" />
          <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full gradient-bg font-mono text-[8px] font-bold leading-none text-white shadow">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {feature.tag}
        </span>
      </div>

      <h3 className="relative z-10 mt-5 font-heading text-[1.05rem] font-bold leading-snug text-text-primary">
        {feature.title}
      </h3>
      <p className="relative z-10 mt-2 text-sm leading-relaxed text-text-muted">
        {feature.description}
      </p>

      <div className="relative z-10 mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-accent-pink/0 transition-colors group-hover:text-accent-pink">
        <span>incluido</span>
        <span className="h-px flex-1 bg-current opacity-40" />
        <Check size={12} aria-hidden="true" />
      </div>
    </article>
  );
}

export function ServiceIncludes() {
  const headRef = useReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.06 });

  return (
    <section
      id="incluye"
      className="relative bg-bg-secondary px-[5%] py-[110px]"
      aria-labelledby="includes-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div
          ref={headRef}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink">
              El servicio
            </p>
            <h2
              id="includes-heading"
              className="font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]"
            >
              &iquest;Qu&eacute; incluye{" "}
              <HighlightText>este servicio?</HighlightText>
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">
              Un sistema editorial completo para que cada publicaci&oacute;n
              trabaje a favor de tu marca.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="num-badge">
              {String(REDES_INCLUDES.length).padStart(2, "0")}
            </span>
            <div>
              <div className="font-heading text-sm font-semibold text-text-primary">
                Componentes
              </div>
              <div className="text-xs text-text-muted">
                en cada implementaci&oacute;n
              </div>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {REDES_INCLUDES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tsc y lint**

Run:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

- [ ] **Step 3: Commit**

```
git add src/components/services/redes/ServiceIncludes.tsx
git commit -m "feat(redes): add ServiceIncludes with 3-col grid of 6 feature cards"
```

---

## Task 8: Page wrapper `RedesSocialesPage.tsx`

**Files:**
- Create: `src/pages/RedesSocialesPage.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { RedesHero } from "../components/services/redes/RedesHero";
import { ServiceIntro } from "../components/services/redes/ServiceIntro";
import { ServiceIncludes } from "../components/services/redes/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  REDES_META,
  REDES_JSONLD,
} from "../data/services/redes-sociales";

export default function RedesSocialesPage() {
  useDocumentMeta(REDES_META, REDES_JSONLD);

  return (
    <>
      <RedesHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            &iquest;Tus redes no est&aacute;n generando resultados?
            <br />
            <HighlightText>
              Solicita un diagn&oacute;stico gratuito
            </HighlightText>
          </>
        }
        subtitle="Descubre el potencial oculto que tiene tu marca. Déjanos tus datos y preparamos un análisis sin compromiso."
        serviceTag="redes-sociales"
      />
    </>
  );
}
```

- [ ] **Step 2: Verificar tsc y lint**

Run:
```
npx tsc --noEmit
npm run lint
```
Expected: 0 errores.

(En este punto la página existe pero todavía no está en el router — eso es Task 9.)

- [ ] **Step 3: Commit**

```
git add src/pages/RedesSocialesPage.tsx
git commit -m "feat(redes): add RedesSocialesPage that orchestrates hero, intro, includes and shared ContactCTA"
```

---

## Task 9: Wire del routing — `App.tsx`, `Services.tsx`, `content.ts`, `sitemap.xml`

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/sections/Services.tsx`
- Modify: `src/data/content.ts`
- Modify: `public/sitemap.xml`

Esta tarea conecta todo lo anterior con el resto del sitio en un commit atómico para que el deploy quede consistente (no hay momento intermedio en que el card de Redes apunte a `/servicios/redes-sociales` sin que esa ruta exista, ni viceversa).

- [ ] **Step 1: Agregar la ruta en `src/App.tsx`**

Encontrar la línea:
```tsx
const WhatsAppMarketingPage = lazy(() => import("./pages/WhatsAppMarketingPage"));
```

Y agregar inmediatamente después:
```tsx
const RedesSocialesPage = lazy(() => import("./pages/RedesSocialesPage"));
```

Encontrar el bloque:
```tsx
<Route
  path="/servicios/whatsapp-marketing"
  element={<WhatsAppMarketingPage />}
/>
```

Y agregar inmediatamente después (antes del wildcard `<Route path="*" ...>`):
```tsx
<Route
  path="/servicios/redes-sociales"
  element={<RedesSocialesPage />}
/>
```

- [ ] **Step 2: Agregar prefetch en `src/components/sections/Services.tsx`**

Encontrar:
```tsx
function prefetchWhatsApp() {
  void import("../../pages/WhatsAppMarketingPage");
}
```

Y agregar inmediatamente después:
```tsx
function prefetchRedes() {
  void import("../../pages/RedesSocialesPage");
}
```

Encontrar:
```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
}, []);
```

Reemplazar con:
```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
}, []);
```

- [ ] **Step 3: Cambiar el `href` del card de Redes en `src/data/content.ts`**

Encontrar el item de "Redes Sociales" en el array `SERVICES`:
```ts
{
  icon: FaInstagram,
  iconColor: "from-[#f77737] via-[#e1306c] to-[#833ab4]",
  title: "Redes Sociales",
  description:
    "La gestión profesional de redes sociales va mucho más allá de publicar contenido. En Stellaris construimos comunidades reales, narrativas de marca que conectan y estrategias de contenido que generan conversaciones, prospectos y ventas.",
  href: "#",
},
```

Cambiar **solo** el `href`:
```ts
{
  icon: FaInstagram,
  iconColor: "from-[#f77737] via-[#e1306c] to-[#833ab4]",
  title: "Redes Sociales",
  description:
    "La gestión profesional de redes sociales va mucho más allá de publicar contenido. En Stellaris construimos comunidades reales, narrativas de marca que conectan y estrategias de contenido que generan conversaciones, prospectos y ventas.",
  href: "/servicios/redes-sociales",
},
```

(Los otros items —Web, Email— se quedan con `href: "#"` por ahora; eso es fuera de alcance de este plan.)

- [ ] **Step 4: Agregar la entrada en `public/sitemap.xml`**

Justo antes del cierre `</urlset>`, agregar:

```xml
  <url>
    <loc>https://www.stellaris.com.co/servicios/redes-sociales</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

El archivo final debe quedar con tres `<url>` (home, whatsapp-marketing, redes-sociales).

- [ ] **Step 5: Verificar tsc, lint y build**

Run:
```
npx tsc --noEmit
npm run lint
npm run build
```
Expected: 0 errores en los tres. El build debe imprimir un chunk nuevo `dist/assets/RedesSocialesPage-*.js` (similar en tamaño al de WhatsApp, ~20-25 KB).

- [ ] **Step 6: Commit atómico**

```
git add src/App.tsx src/components/sections/Services.tsx src/data/content.ts public/sitemap.xml
git commit -m "feat(redes): wire route, link from Services and Footer with prefetch, sitemap entry"
```

---

## Task 10: Smoke test visual + SEO local

**Files:** ninguno modificado. Solo verificación.

- [ ] **Step 1: Levantar dev server**

Run:
```
npm run dev
```
Esperar la URL (típicamente `http://localhost:5173/`). Confirmar:
- Vite arranca sin errores ni warnings.
- 0 errores en la consola del navegador al cargar `http://localhost:5173/servicios/redes-sociales`.

- [ ] **Step 2: Smoke test visual**

En el navegador, sobre `http://localhost:5173/servicios/redes-sociales`, verificar:
- [ ] Hero: texto izq / phone der en desktop (≥1024px), stackeado en mobile (375px). Breadcrumb "‹ Servicios / Gestión de Redes Sociales".
- [ ] H1 con HighlightText animando sobre *"canal más poderoso."* al entrar al viewport.
- [ ] CTA "Diagnóstico gratuito" → scrollea a `#contacto` (form).
- [ ] CTA "Ver qué incluye" → scrollea a `#incluye` (grid de 6 cards).
- [ ] SocialMockup: feed scroll cycling cada ~18s, like-pulse en heart, stories strip con story-ring conic gradient. Ningún elemento se desborda del phone shell.
- [ ] ServiceIntro: header 2-col en desktop, grid de 3 pillars (Comunidades reales / Narrativas / Conversaciones), iconos Lucide (Users, Target, BarChart3), números 01/02/03.
- [ ] ServiceIncludes: grid 3-col en lg, 2-col en sm, 1-col en mobile. 6 cards con hover gradient siguiendo cursor + footer "incluido" en pink.
- [ ] ContactCTA: form con título "¿Tus redes no están generando resultados?" + HighlightText sobre "Solicita un diagnóstico gratuito".
- [ ] Activar `prefers-reduced-motion: reduce` en el OS y recargar: feed-track, like-pulse, reveals y HighlightText quedan estáticos; el contenido sigue visible.

- [ ] **Step 3: Smoke test del home → redes**

En `http://localhost:5173/`, scroll a "Servicios". El card "Redes Sociales" debe:
- [ ] Llevar a `/servicios/redes-sociales` al click.
- [ ] Prefetchear el chunk al hover/focus (DevTools → Network → ver request de `RedesSocialesPage-*.js`).

- [ ] **Step 4: SEO básico**

DevTools → Elements → expandir `<head>`. Verificar:
- [ ] `<title>` = "Gestión de Redes Sociales en Colombia | Stellaris".
- [ ] `<meta name="description">` con texto coherente.
- [ ] `<link rel="canonical" href="https://www.stellaris.com.co/servicios/redes-sociales">`.
- [ ] Dos `<script type="application/ld+json">`: uno con `"@type":"Service"` listando los 6 títulos en `OfferCatalog`, otro con `"@type":"BreadcrumbList"` con 3 items.

DevTools → Console:
```js
document.querySelectorAll('h1').length  // 1
[...document.querySelectorAll('section[aria-labelledby]')].map(s => s.getAttribute('aria-labelledby'))
// debe incluir "hero-heading", "pillars-heading", "includes-heading"
```

- [ ] **Step 5: Verificar sitemap**

Run desde el dev server (o `cat public/sitemap.xml` si preferís el archivo plano):
```
curl -s http://localhost:5173/sitemap.xml | grep redes-sociales
```
Expected: una línea con `<loc>https://www.stellaris.com.co/servicios/redes-sociales</loc>`.

- [ ] **Step 6: Detener dev server**

Ctrl+C.

(Sin commit — esta es solo verificación local.)

---

## Task 11: Auditoría completa

**Files:** ninguno modificado. Solo verificación, produce evidencia para el PR.

- [ ] **Step 1: Build de producción + preview**

Run:
```
npm run build
npm run preview
```
Esperar la URL (típicamente `http://localhost:4173/`).

- [ ] **Step 2: Lighthouse mobile**

En Chrome incógnito, abrir `http://localhost:4173/servicios/redes-sociales`. DevTools → Lighthouse → todas las categorías → "Mobile" → "Analyze page load".

Targets:
- [ ] Performance ≥ 90.
- [ ] Accessibility ≥ 95.
- [ ] Best Practices ≥ 95.
- [ ] SEO ≥ 95.

Si Performance falla, atender:
- LCP debe ser el H1 (no el SocialMockup canvas/blur ni el Starfield).
- CLS < 0.1: confirmar que feed-track y like-pulse animan solo `transform`.

Repetir Lighthouse en perfil "Desktop" y guardar resultado.

- [ ] **Step 3: axe DevTools**

Extensión axe en Chrome → scan completo de `http://localhost:4173/servicios/redes-sociales`. Expected: 0 violations críticas/serias.

- [ ] **Step 4: Schema.org Validator**

Copiar el HTML renderizado (DevTools → "Copy outerHTML" del `<html>`). Pegar en https://validator.schema.org/. Expected:
- [ ] `Service` válido con `OfferCatalog` listando los 6 títulos legibles.
- [ ] `BreadcrumbList` válido con 3 items.
- [ ] 0 errors. Warnings de campos opcionales (image, etc.) son aceptables.

- [ ] **Step 5: Google Rich Results Test**

Pegar el HTML en https://search.google.com/test/rich-results (modo "Code"). Expected:
- [ ] `Service` detectado y elegible.
- [ ] `BreadcrumbList` detectado y elegible.

- [ ] **Step 6: Cross-browser smoke**

Abrir `http://localhost:4173/servicios/redes-sociales` en:
- [ ] Chrome desktop — feature-card mouse-tracking funciona; feed-track loop limpio.
- [ ] Firefox desktop — mismo behavior; story-ring conic gradient se renderiza correctamente.
- [ ] Safari (mac/iOS si está disponible) — confirmar que `backdrop-blur` y `conic-gradient` funcionan.
- [ ] Chrome DevTools → device toolbar → iPhone 14 — feed-track scroll en mobile, sin overflow horizontal, ChatMockup teléfono visible arriba del texto.

- [ ] **Step 7: Bundle delta**

Comparar `npm run build` antes/después en una rama nueva (mental). El chunk nuevo debe ser similar al de WhatsApp (~20–25 KB). Si subió notablemente, revisar imports duplicados de lucide-react.

- [ ] **Step 8: Form de contacto**

En la página, scrollear al formulario. Enviar lead de prueba:
- Nombre: "Test Redes"
- Email: "test@example.com"
- Mensaje: "Test from redesigned Redes Sociales page"
- Aceptar términos.

Expected:
- [ ] Botón "Enviando..." con spinner.
- [ ] Mensaje verde de éxito.
- [ ] En Firebase Console → Firestore → `contactRequests` → documento con `service: "redes-sociales"`.

- [ ] **Step 9: Detener preview**

Ctrl+C.

(Sin commit — esta es la auditoría final.)

---

## Task 12: Cleanup, push y PR

**Files:** ninguno por cambiar. Solo git workflow.

- [ ] **Step 1: Verificar working tree limpio**

Run:
```
git status -s
git log --oneline dev..HEAD
```
Expected: working tree limpio. El log debe mostrar (ordenado más reciente primero):
1. `feat(redes): wire route, link from Services and Footer with prefetch, sitemap entry`
2. `feat(redes): add RedesSocialesPage that orchestrates hero, intro, includes and shared ContactCTA`
3. `feat(redes): add ServiceIncludes with 3-col grid of 6 feature cards`
4. `feat(redes): add ServiceIntro (Comunidad & contenido) with 3-pillar grid`
5. `feat(redes): add hero with breadcrumb, CTAs and SocialMockup`
6. `feat(redes): add SocialMockup with animated feed and Instagram-like UI`
7. `feat(css): add Redes section utilities ...`
8. `feat(redes): add iconKey to lucide-react icon helper`
9. `feat(redes): add data file with includes, pillars, meta and JSON-LD`
10. `docs(spec): add Redes Sociales service page design spec`

(Más posiblemente este plan en untracked.)

- [ ] **Step 2: Pedir autorización al usuario antes de pushear**

**STOP.** Confirmar con el usuario que está OK con el push y la apertura del PR antes de ejecutar los pasos 3 y 4.

- [ ] **Step 3: Push**

```
git push -u origin feat/redes-sociales
```

- [ ] **Step 4: Abrir PR contra `dev`**

```
gh pr create --base dev --head feat/redes-sociales --title "feat(redes): add Redes Sociales service page" --body "$(cat <<'EOF'
## Summary

Nueva página `/servicios/redes-sociales` siguiendo el patrón establecido por la página de WhatsApp.

- **Hero**: layout texto-izq / phone-der, breadcrumb full-width, H1 con HighlightText sobre *"canal más poderoso."*, dos CTAs (`HashLink` a `#contacto` y `#incluye`).
- **SocialMockup**: phone con feed Instagram-like, 4 FeedPosts con scroll animado en loop de 18s, stories strip con story-ring conic gradient, like-pulse en hearts, gradient masks top/bottom, bottom tab bar.
- **Comunidad & contenido** (`ServiceIntro`): header 2-col + grid de 3 pillars con iconos Lucide.
- **¿Qué incluye?** (`ServiceIncludes`): grid 3-col de 6 feature cards con mouse-tracking radial gradient en hover.
- **Datos**: `REDES_INCLUDES` (6), `REDES_PILLARS` (3), `REDES_META`, `REDES_JSONLD` (Service + BreadcrumbList) en `src/data/services/redes-sociales.ts`. Helper `icons.ts` mapea `iconKey` → componente Lucide.
- **Routing**: `<Route path="/servicios/redes-sociales">` lazy en `App.tsx`. Card del home ahora linkea a la nueva ruta + prefetch en hover/focus. Entrada agregada en `public/sitemap.xml`.
- **Reuso**: `ContactCTA` compartido con `serviceTag="redes-sociales"` (sin duplicar formulario). `useReveal`, `HighlightText`, `Starfield`, `HashLink` reusados.
- **CSS**: nuevas utilidades scoped (`.phone-shell`, `.story-ring`, `.metric-chip`, `.grad-cover-1..4`, `feed-scroll`, `like-pulse`) — todas respetan `prefers-reduced-motion`.
- **Docs**: spec en `docs/superpowers/specs/2026-05-05-redes-sociales-page-design.md` y plan en `docs/superpowers/plans/2026-05-05-redes-sociales-page.md`.

## Test plan

- [ ] CTAs scrollean correctamente a `#contacto` y `#incluye`.
- [ ] HighlightText anima sobre *"canal más poderoso."*, *"publicar."*, *"este servicio?"* y *"Solicita un diagnóstico gratuito"*.
- [ ] Feed mockup loop limpio sin layout shift.
- [ ] Card del home linkea a `/servicios/redes-sociales` y prefetchea el chunk.
- [ ] `<head>`: title, description, canonical, OG, JSON-LD Service + BreadcrumbList.
- [ ] Schema.org Validator: `Service` + `BreadcrumbList` sin errores.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] axe DevTools: 0 violations críticas/serias.
- [ ] Form: lead de prueba aterriza en Firestore con `service: "redes-sociales"`.
- [ ] `prefers-reduced-motion: reduce` desactiva feed-scroll, like-pulse, reveals.
EOF
)"
```

- [ ] **Step 5: (Opcional) Marcar el spec como Implemented**

Si el usuario quiere trazabilidad, editar el header de `docs/superpowers/specs/2026-05-05-redes-sociales-page-design.md` y cambiar `Status: Approved for implementation` por `Status: Implemented`. Commit + push.

(El merge del PR queda en manos del usuario.)

---

## Self-review (interno, ya aplicado)

**Spec coverage:**
- §3.1 (composición) → Tasks 4–8 (componentes + page).
- §3.2 (reuso de primitivos) → confirmado en imports de cada componente.
- §3.3 (routing y home) → Task 9.
- §4.1 (data file) → Task 1.
- §4.2 (icons.ts) → Task 2.
- §4.3 (RedesHero) → Task 5.
- §4.4 (SocialMockup) → Task 4.
- §4.5 (ServiceIntro) → Task 6.
- §4.6 (ServiceIncludes) → Task 7.
- §4.7 (RedesSocialesPage) → Task 8.
- §4.8 (App.tsx route) → Task 9 step 1.
- §4.9 (content.ts href) → Task 9 step 3.
- §4.10 (Services.tsx prefetch) → Task 9 step 2.
- §4.11 (sitemap.xml) → Task 9 step 4.
- §4.12 (CSS) → Task 3.
- §5 (SEO checklist) → Task 10.
- §6 (auditoría completa) → Task 11.
- §7 (test plan manual) → Tasks 10 + 11.
- §8 (rollout) → Task 12.

**Placeholder scan:** 0. Todas las descripciones están escritas, código completo, comandos ejecutables.

**Type consistency:** `RedesIconKey`, `RedesFeature`, `RedesPillar` definidos en Task 1, consumidos sin cambios en Tasks 2 (icons.ts), 6 (ServiceIntro), 7 (ServiceIncludes). `REDES_META`, `REDES_JSONLD` definidos en Task 1, consumidos en Task 8 (page). `REDES_PILLARS`, `REDES_INCLUDES` consumidos por sus respectivas secciones. `RedesHero`, `ServiceIntro`, `ServiceIncludes` exports consumidos por Task 8.
