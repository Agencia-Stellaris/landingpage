# Desarrollo Web Service Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar la nueva página `/servicios/desarrollo-web` siguiendo el spec en `docs/superpowers/specs/2026-05-05-desarrollo-web-page-design.md`. Tercera service page bajo el patrón establecido (WhatsApp + Redes): Hero + ServiceIntro con pillars + ServiceIncludes con feature cards + ContactCTA reusado, con un nuevo `BrowserMockup` (browser shell + tabbed code panel + perf bars + floating Lighthouse/SEO badges) en lugar del `ChatMockup`/`SocialMockup`.

**Architecture:** Misma arquitectura que las páginas de WhatsApp y Redes. Nueva carpeta `src/components/services/web/` con 4 componentes; data centralizada en `src/data/services/desarrollo-web.ts`; helper de iconos local; page lazy-loaded. Se reutilizan `useReveal`, `HighlightText`, `Starfield`, `HashLink`, `ContactCTA` (compartido). Nuevas utilidades CSS scoped en `src/index.css` para el browser mockup, syntax tokens, perf bars, lh-ring, caret y floaty.

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
Expected: branch `feat/desarrollo-web`. `git status -s` muestra solo el plan untracked (que se agrega más adelante) o limpio.

- [ ] **Step 2: Confirmar baseline build verde**

Run desde `C:/Users/frede/Documents/Stellaris/LandingPage`:
```
npm run lint
npx tsc --noEmit
```
Expected: 0 errores en ambos.

(Sin commit — esta es solo verificación.)

---

## Task 1: Tipos y constantes del data file `desarrollo-web.ts`

**Files:**
- Create: `src/data/services/desarrollo-web.ts`

- [ ] **Step 1: Crear el archivo con tipos, INCLUDES, PILLARS, META y JSON-LD**

Contenido completo del archivo:

```ts
import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type WebIconKey =
  | "ux"
  | "responsive"
  | "seo"
  | "aeo"
  | "speed"
  | "crm"
  | "landing"
  | "shop"
  | "support";

export interface WebFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: WebIconKey;
}

export interface WebPillar {
  title: string;
  description: string;
  iconKey: WebIconKey;
}

export const WEB_INCLUDES: readonly WebFeature[] = [
  {
    title: "Diseño UX/UI personalizado",
    description:
      "Adaptado a la identidad y objetivos de tu marca, con foco en experiencia y conversión.",
    tag: "UX/UI",
    iconKey: "ux",
  },
  {
    title: "Desarrollo responsivo",
    description:
      "Optimizado para móviles, tabletas y escritorio. Funciona donde tu cliente esté.",
    tag: "Responsive",
    iconKey: "responsive",
  },
  {
    title: "Optimización SEO técnica",
    description:
      "SEO desde la construcción del sitio: estructura, semántica y rendimiento.",
    tag: "SEO",
    iconKey: "seo",
  },
  {
    title: "Optimización AEO y GEO",
    description:
      "Visibilidad en respuestas de IA y en búsquedas generativas, no solo en Google clásico.",
    tag: "AEO · GEO",
    iconKey: "aeo",
  },
  {
    title: "Velocidad de carga",
    description:
      "Core Web Vitals optimizados: páginas que cargan rápido y generan confianza.",
    tag: "Performance",
    iconKey: "speed",
  },
  {
    title: "Integración con tu stack",
    description:
      "CRM, herramientas de automatización y analítica web conectadas desde el lanzamiento.",
    tag: "Integración",
    iconKey: "crm",
  },
  {
    title: "Landing pages de conversión",
    description:
      "Landings de alta conversión diseñadas para campañas específicas.",
    tag: "Landings",
    iconKey: "landing",
  },
  {
    title: "Tiendas online",
    description:
      "E-commerce funcionales y optimizadas para vender, no solo para mostrar.",
    tag: "E-commerce",
    iconKey: "shop",
  },
  {
    title: "Mantenimiento y soporte",
    description:
      "Soporte y actualizaciones continuas para que tu sitio nunca se quede atrás.",
    tag: "Soporte",
    iconKey: "support",
  },
];

export const WEB_PILLARS: readonly WebPillar[] = [
  {
    title: "Atraer, convencer, convertir",
    description:
      "Cada elemento visual y cada línea de código está pensada para ese objetivo.",
    iconKey: "ux",
  },
  {
    title: "Neuromarketing + UX/UI",
    description:
      "Combinamos principios de neuromarketing y UX/UI de vanguardia.",
    iconKey: "landing",
  },
  {
    title: "SEO, AEO y GEO",
    description:
      "Posicionamiento sólido en Google y en las búsquedas creadas por modelos de IA.",
    iconKey: "seo",
  },
];

export const WEB_META: DocumentMeta = {
  title: "Diseño y Desarrollo Web en Colombia | Stellaris",
  description:
    "Diseño y desarrollo web profesional: UX/UI estratégica, SEO/AEO/GEO, performance, landings y e-commerce. Sitios que atraen, convencen y convierten.",
  keywords:
    "diseño web Colombia, desarrollo web, UX/UI, SEO técnico, AEO, GEO, landing pages, e-commerce, performance web",
  canonical: "https://www.stellaris.com.co/servicios/desarrollo-web",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/desarrollo-web.jpg",
};

export const WEB_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diseño y Desarrollo Web",
    serviceType: "Web Design and Development",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: "es-CO",
    description:
      "Diseño y desarrollo web profesional con foco en UX/UI estratégica, SEO/AEO/GEO, performance, landing pages y e-commerce.",
    url: "https://www.stellaris.com.co/servicios/desarrollo-web",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: WEB_INCLUDES.map((entry, i) => ({
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
        name: "Diseño y Desarrollo Web",
        item: "https://www.stellaris.com.co/servicios/desarrollo-web",
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
git add src/data/services/desarrollo-web.ts
git commit -m "feat(web): add data file with includes, pillars, meta and JSON-LD"
```

---

## Task 2: Helper `icons.ts` (mapeo `iconKey` → componente Lucide)

**Files:**
- Create: `src/components/services/web/icons.ts`

- [ ] **Step 1: Crear el archivo con el mapeo**

```ts
import {
  LayoutGrid,
  Smartphone,
  Search,
  Mic,
  Gauge,
  Database,
  LayoutTemplate,
  ShoppingBag,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import type { WebIconKey } from "../../../data/services/desarrollo-web";

export const WEB_ICONS: Record<WebIconKey, LucideIcon> = {
  ux: LayoutGrid,
  responsive: Smartphone,
  seo: Search,
  aeo: Mic,
  speed: Gauge,
  crm: Database,
  landing: LayoutTemplate,
  shop: ShoppingBag,
  support: LifeBuoy,
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
git add src/components/services/web/icons.ts
git commit -m "feat(web): add iconKey to lucide-react icon helper"
```

---

## Task 3: Reglas CSS nuevas en `index.css`

**Files:**
- Modify: `src/index.css` (apéndice al final del archivo)

- [ ] **Step 1: Append al final de `src/index.css`**

Agregar al final del archivo (después del bloque "Redes Sociales — section-scoped utilities"):

```css

/* ============================================
 * Desarrollo Web — section-scoped utilities
 * ============================================ */

/* Browser shell */
.browser-shell {
  background: #0B0712;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 30px 80px -20px rgba(124, 58, 237, 0.45);
}
.browser-bar {
  background: #15101F;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.browser-canvas {
  height: 480px;
  overflow: hidden;
  position: relative;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 58, 237, 0.18), transparent 60%),
    linear-gradient(180deg, #0E0818 0%, #0A0612 100%);
}
.fake-hero-grad {
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 77, 109, 0.25), transparent 50%),
    radial-gradient(circle at 80% 30%, rgba(124, 58, 237, 0.30), transparent 55%);
}

/* Code panel */
.code-block {
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  font-size: 11px;
  line-height: 1.55;
}
.tk-key { color: #ff4d6d; }
.tk-tag { color: #7c3aed; }
.tk-str { color: #22d39c; }
.tk-com { color: #5b5274; font-style: italic; }
.tk-fn  { color: #f59e0b; }

/* Caret blink */
@keyframes caret {
  50% { opacity: 0; }
}
.caret {
  display: inline-block;
  width: 1px;
  height: 0.95em;
  background: var(--color-text-primary);
  margin-left: 1px;
  vertical-align: -2px;
  animation: caret 1s steps(2) infinite;
}

/* Perf bar fill */
@keyframes fillBar {
  from { width: 0%; }
  to   { width: var(--w, 90%); }
}
.perf-bar > i {
  animation: fillBar 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: 0.4s;
}

/* Lighthouse ring (conic gradient) */
.lh-ring {
  --val: 98;
  --lh-color: #22d39c;
  background: conic-gradient(var(--lh-color) calc(var(--val) * 1%), rgba(255, 255, 255, 0.08) 0);
  border-radius: 9999px;
}

/* Floating cards */
@keyframes floaty {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
.floaty {
  animation: floaty 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .caret,
  .floaty,
  .perf-bar > i {
    animation: none;
  }
  .perf-bar > i {
    width: var(--w, 90%);
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
git commit -m "feat(css): add Web section utilities (browser-shell, code-block + tokens, caret, perf-bar, lh-ring, floaty)"
```

---

## Task 4: `BrowserMockup.tsx` — navegador con tabs, perf bars y floating cards

**Files:**
- Create: `src/components/services/web/BrowserMockup.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { useEffect, useState, type CSSProperties } from "react";
import { Lock, RotateCw, Zap } from "lucide-react";

type TabId = 0 | 1 | 2;

const TAB_LABELS: readonly string[] = ["index.tsx", "Hero.tsx", "styles.css"];

interface PerfMetric {
  label: string;
  value: string;
  width: string;
  color: string;
}

const PERF_METRICS: readonly PerfMetric[] = [
  { label: "LCP", value: "1.1s", width: "88%", color: "#22D39C" },
  { label: "CLS", value: "0.02", width: "94%", color: "#7C3AED" },
  { label: "INP", value: "140ms", width: "82%", color: "#FF4D6D" },
];

function CodeIndex() {
  return (
    <>
      <span className="tk-com">{"// Render seguro y rápido"}</span>
      {"\n"}
      <span className="tk-key">export default function</span>{" "}
      <span className="tk-fn">Page</span>
      {"() {\n"}
      {"  "}
      <span className="tk-key">return</span>
      {" ("}
      <span className="tk-tag">{"<Site/>"}</span>
      {");\n}"}
    </>
  );
}

function CodeHero() {
  return (
    <>
      <span className="tk-tag">{"<section"}</span>{" "}
      <span className="tk-fn">id</span>
      {"="}
      <span className="tk-str">{'"hero"'}</span>
      <span className="tk-tag">{">"}</span>
      {"\n  "}
      <span className="tk-tag">{"<h1>"}</span>
      {"Convierte visitas\n      en clientes."}
      <span className="tk-tag">{"</h1>"}</span>
      {"\n"}
      <span className="tk-tag">{"</section>"}</span>
    </>
  );
}

function CodeStyles() {
  return (
    <>
      <span className="tk-tag">.cta</span>
      {" {\n  "}
      <span className="tk-key">background</span>
      {": "}
      <span className="tk-str">linear-gradient(...)</span>
      {";\n  "}
      <span className="tk-key">transition</span>
      {": "}
      <span className="tk-str">.3s ease</span>
      {";\n}"}
    </>
  );
}

export function BrowserMockup() {
  const [tab, setTab] = useState<TabId>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setTab((t) => ((t + 1) % 3) as TabId),
      3500,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      role="img"
      aria-label="Vista previa de un sitio web desarrollado por Stellaris con métricas Core Web Vitals"
      className="relative mx-auto w-full"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Floating card: Lighthouse 98 */}
      <div
        className="floaty pointer-events-none absolute -left-6 top-12 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        aria-hidden="true"
      >
        <div
          className="lh-ring grid h-8 w-8 place-items-center"
          style={{ "--val": 98 } as CSSProperties}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0B0712] font-heading text-[10px] font-bold text-accent-green">
            98
          </span>
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">Performance</div>
          <div className="text-[9px] text-text-muted">Core Web Vitals</div>
        </div>
      </div>

      {/* Floating card: SEO bolt */}
      <div
        className="floaty pointer-events-none absolute -right-6 bottom-16 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-pink/15 text-accent-pink">
          <Zap size={14} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">SEO · AEO · GEO</div>
          <div className="text-[9px] text-text-muted">listos desde el día 1</div>
        </div>
      </div>

      {/* Browser shell */}
      <div className="browser-shell" aria-hidden="true">
        {/* Title bar */}
        <div className="browser-bar flex items-center gap-2 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="ml-2 flex flex-1 items-center gap-2">
            <RotateCw size={13} className="text-text-muted" aria-hidden="true" />
            <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-white/[0.06] bg-[#0B0712] px-3 text-[11px] text-text-muted">
              <Lock size={11} className="text-accent-green" aria-hidden="true" />
              <span className="text-text-primary">stellaris.com.co</span>
              <span className="text-text-muted/60">/cliente</span>
              <span className="caret" />
            </div>
          </div>
          <div className="hidden gap-1 sm:flex">
            <span className="rounded-md border border-white/[0.06] bg-[#0B0712] px-2 py-0.5 font-mono text-[9px] text-text-muted">
              200 OK
            </span>
          </div>
        </div>

        {/* Canvas */}
        <div className="browser-canvas">
          {/* Fake site nav */}
          <div className="flex items-center justify-between border-b border-white/[0.04] px-7 pt-6 pb-4">
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-sm gradient-bg font-heading text-[8px] font-bold text-white">
                M
              </span>
              <span className="font-heading text-[12px] font-bold tracking-tight text-white">
                tu marca
              </span>
            </div>
            <div className="hidden items-center gap-5 text-[10px] text-text-muted sm:flex">
              <span>Producto</span>
              <span>Casos</span>
              <span>Precios</span>
              <span className="text-white">Contacto</span>
            </div>
            <div className="rounded-full gradient-bg px-3 py-1 font-heading text-[10px] font-bold text-white">
              Empezar →
            </div>
          </div>

          {/* Fake hero block */}
          <div className="fake-hero-grad relative px-7 pt-10 pb-6">
            <div className="grid grid-cols-[1.3fr_minmax(0,1fr)] items-center gap-6">
              <div>
                <div className="mb-2 inline-block rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent-pink">
                  Lanzamiento
                </div>
                <div className="font-heading text-[22px] font-extrabold leading-[1.05] tracking-tight text-white">
                  Tu mejor vendedor,
                  <br />
                  siempre disponible.
                </div>
                <div className="mt-2 max-w-[18rem] text-[10px] leading-relaxed text-text-muted">
                  Diseñamos sitios que atraen, convencen y convierten —desde el
                  primer segundo.
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="rounded-full gradient-bg px-3 py-1.5 font-heading text-[10px] font-bold text-white">
                    Ver demo
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
                    Cómo funciona
                  </div>
                </div>
              </div>

              {/* Tabbed code panel */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B0712]/80 backdrop-blur">
                <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1.5">
                  {TAB_LABELS.map((label, i) => (
                    <span
                      key={label}
                      className={`rounded-md px-2 py-0.5 font-mono text-[9px] ${
                        tab === i
                          ? "bg-white/[0.06] text-white"
                          : "text-text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <pre className="code-block overflow-hidden p-3 text-text-primary">
                  {tab === 0 && <CodeIndex />}
                  {tab === 1 && <CodeHero />}
                  {tab === 2 && <CodeStyles />}
                </pre>
              </div>
            </div>

            {/* Perf bars */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {PERF_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      {m.label}
                    </span>
                    <span className="font-heading text-[11px] font-bold text-white">
                      {m.value}
                    </span>
                  </div>
                  <div
                    className="perf-bar mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]"
                    style={{ "--w": m.width } as CSSProperties}
                  >
                    <i
                      className="block h-full rounded-full"
                      style={{ background: m.color, width: m.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
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

(Si ESLint advierte sobre exports no usados en este punto, ignorar — `WebHero` lo consumirá en la próxima tarea.)

- [ ] **Step 3: Commit**

```
git add src/components/services/web/BrowserMockup.tsx
git commit -m "feat(web): add BrowserMockup with tabbed code panel, perf bars and floating Lighthouse/SEO cards"
```

---

## Task 5: `WebHero.tsx` — hero con breadcrumb, CTAs, pills y BrowserMockup

**Files:**
- Create: `src/components/services/web/WebHero.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { ArrowLeft } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HashLink } from "../../routing/HashLink";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal } from "../../../hooks/useScrollReveal";
import { BrowserMockup } from "./BrowserMockup";

export function WebHero() {
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

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1fr_1.05fr] lg:pb-32 lg:pt-14">
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
                Dise&ntilde;o y Desarrollo Web
              </li>
            </ol>
          </nav>

          <div ref={textRef}>
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-1.5px]"
            >
              Tu sitio web no es un gasto. Es tu{" "}
              <HighlightText>mejor vendedor</HighlightText>, siempre disponible.
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">
              Dise&ntilde;amos y desarrollamos sitios que no solo se ven bien:
              trabajan estrat&eacute;gicamente para tu negocio. Cada elemento,
              pensado para atraer, convencer y convertir.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <HashLink
                to="#contacto"
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
              >
                Diagn&oacute;stico gratuito
              </HashLink>
              <HashLink
                to="#incluye"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-white/30 hover:bg-white/[0.03]"
              >
                Ver qu&eacute; incluye
              </HashLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="pill">
                <span className="dot" /> SEO &middot; AEO &middot; GEO
              </span>
              <span className="pill">UX/UI &middot; Neuromarketing</span>
            </div>
          </div>
        </div>

        <div ref={mockupRef}>
          <BrowserMockup />
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
git add src/components/services/web/WebHero.tsx
git commit -m "feat(web): add hero with breadcrumb, CTAs, pills and BrowserMockup"
```

---

## Task 6: `ServiceIntro.tsx` — sección "Estrategia & conversión"

**Files:**
- Create: `src/components/services/web/ServiceIntro.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { WEB_PILLARS } from "../../../data/services/desarrollo-web";
import { WEB_ICONS } from "./icons";

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
              Estrategia &amp; conversi&oacute;n
            </p>
            <h2
              id="pillars-heading"
              className="font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]"
            >
              Sitios que <HighlightText>trabajan</HighlightText> por tu negocio.
            </h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-[1.7]">
            <p>
              En{" "}
              <span className="font-semibold text-text-primary">Stellaris</span>{" "}
              dise&ntilde;amos y desarrollamos sitios web que no solo se ven
              bien, sino que trabajan estrat&eacute;gicamente para tu negocio.
              Cada elemento visual, cada estructura de navegaci&oacute;n y cada
              l&iacute;nea de c&oacute;digo est&aacute; pensada para{" "}
              <span className="font-semibold text-text-primary">
                atraer, convencer y convertir
              </span>
              .
            </p>
            <p>
              Combinamos{" "}
              <span className="font-semibold text-text-primary">
                neuromarketing, UX/UI de vanguardia y optimizaci&oacute;n
                t&eacute;cnica SEO, AEO y GEO
              </span>{" "}
              para entregar sitios que se posicionan en Google y en las
              b&uacute;squedas creadas por modelos de IA: p&aacute;ginas que
              cargan r&aacute;pido y generan confianza desde el primer segundo.
              Porque la primera impresi&oacute;n digital define si el usuario se
              queda o se va con la competencia.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {WEB_PILLARS.map((pillar, i) => {
            const Ico = WEB_ICONS[pillar.iconKey];
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
git add src/components/services/web/ServiceIntro.tsx
git commit -m "feat(web): add ServiceIntro (Estrategia & conversión) with 3-pillar grid"
```

---

## Task 7: `ServiceIncludes.tsx` — grid 3-col de 9 feature cards

**Files:**
- Create: `src/components/services/web/ServiceIncludes.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import type { MouseEvent } from "react";
import { Check } from "lucide-react";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import {
  WEB_INCLUDES,
  type WebFeature,
} from "../../../data/services/desarrollo-web";
import { WEB_ICONS } from "./icons";

interface FeatureCardProps {
  feature: WebFeature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Ico = WEB_ICONS[feature.iconKey];

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
              Un sistema completo &mdash;del dise&ntilde;o al deploy&mdash; para
              que tu sitio no solo exista: convierta.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="num-badge">
              {String(WEB_INCLUDES.length).padStart(2, "0")}
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
          {WEB_INCLUDES.map((feature, i) => (
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
git add src/components/services/web/ServiceIncludes.tsx
git commit -m "feat(web): add ServiceIncludes with 3-col grid of 9 feature cards"
```

---

## Task 8: Page wrapper `DesarrolloWebPage.tsx`

**Files:**
- Create: `src/pages/DesarrolloWebPage.tsx`

- [ ] **Step 1: Crear el archivo**

Contenido completo:

```tsx
import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { WebHero } from "../components/services/web/WebHero";
import { ServiceIntro } from "../components/services/web/ServiceIntro";
import { ServiceIncludes } from "../components/services/web/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  WEB_META,
  WEB_JSONLD,
} from "../data/services/desarrollo-web";

export default function DesarrolloWebPage() {
  useDocumentMeta(WEB_META, WEB_JSONLD);

  return (
    <>
      <WebHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            &iquest;Tu sitio web no est&aacute; generando leads?
            <br />
            <HighlightText>Hablemos</HighlightText>.
          </>
        }
        subtitle="Diseñamos la experiencia digital que tu marca merece y que tus clientes no olvidarán."
        serviceTag="desarrollo-web"
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
git add src/pages/DesarrolloWebPage.tsx
git commit -m "feat(web): add DesarrolloWebPage that orchestrates hero, intro, includes and shared ContactCTA"
```

---

## Task 9: Wire del routing — `App.tsx`, `Services.tsx`, `content.ts`, `sitemap.xml`

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/sections/Services.tsx`
- Modify: `src/data/content.ts`
- Modify: `public/sitemap.xml`

Esta tarea conecta todo lo anterior con el resto del sitio en un commit atómico para que el deploy quede consistente.

- [ ] **Step 1: Agregar la ruta en `src/App.tsx`**

Encontrar la línea:
```tsx
const RedesSocialesPage = lazy(() => import("./pages/RedesSocialesPage"));
```

Y agregar inmediatamente después:
```tsx
const DesarrolloWebPage = lazy(() => import("./pages/DesarrolloWebPage"));
```

Encontrar el bloque:
```tsx
<Route
  path="/servicios/redes-sociales"
  element={<RedesSocialesPage />}
/>
```

Y agregar inmediatamente después (antes del wildcard `<Route path="*" ...>`):
```tsx
<Route
  path="/servicios/desarrollo-web"
  element={<DesarrolloWebPage />}
/>
```

- [ ] **Step 2: Agregar prefetch en `src/components/sections/Services.tsx`**

Encontrar:
```tsx
function prefetchRedes() {
  void import("../../pages/RedesSocialesPage");
}
```

Y agregar inmediatamente después:
```tsx
function prefetchWeb() {
  void import("../../pages/DesarrolloWebPage");
}
```

Encontrar:
```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
}, []);
```

Reemplazar con:
```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
  if (href === "/servicios/desarrollo-web") prefetchWeb();
}, []);
```

- [ ] **Step 3: Cambiar el `href` del card de Diseño Web en `src/data/content.ts`**

Localizar el item del array `SERVICES` con `title: "Diseño Web"` o `title: "Diseño y Desarrollo Web"` (el nombre exacto puede variar — verificar leyendo el archivo). El item tendrá `href: "#"`. Cambiar **solo** el `href` a `"/servicios/desarrollo-web"`. El resto del item (icon, iconColor, description, title) sin tocar.

Ejemplo, antes:
```ts
{
  icon: Globe,
  iconColor: "from-...",
  title: "Diseño Web",
  description: "...",
  href: "#",
},
```

Después:
```ts
{
  icon: Globe,
  iconColor: "from-...",
  title: "Diseño Web",
  description: "...",
  href: "/servicios/desarrollo-web",
},
```

(Si hay duda sobre cuál de los items con `href: "#"` corresponde a Desarrollo Web, verificar por title o por icon — el de Diseño/Desarrollo Web tiene `Globe` u otro icono representativo de web. Los items de Email u otros se quedan con `href: "#"`.)

- [ ] **Step 4: Agregar la entrada en `public/sitemap.xml`**

Justo antes del cierre `</urlset>`, agregar:

```xml
  <url>
    <loc>https://www.stellaris.com.co/servicios/desarrollo-web</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

El archivo final debe quedar con cuatro `<url>` (home, whatsapp-marketing, redes-sociales, desarrollo-web).

- [ ] **Step 5: Verificar tsc, lint y build**

Run:
```
npx tsc --noEmit
npm run lint
npm run build
```
Expected: 0 errores en los tres. El build debe imprimir un chunk nuevo `dist/assets/DesarrolloWebPage-*.js` (esperado ~22-28 KB, mayor que Redes 20.64 KB por la complejidad del BrowserMockup).

- [ ] **Step 6: Commit atómico**

```
git add src/App.tsx src/components/sections/Services.tsx src/data/content.ts public/sitemap.xml
git commit -m "feat(web): wire route, link from Services with prefetch, sitemap entry"
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
- 0 errores en la consola del navegador al cargar `http://localhost:5173/servicios/desarrollo-web`.

- [ ] **Step 2: Smoke test visual**

En el navegador, sobre `http://localhost:5173/servicios/desarrollo-web`, verificar:
- [ ] Hero: layout texto-izq / browser-mockup-der en desktop (≥1024px), stackeado en mobile (375px). Breadcrumb "‹ Servicios / Diseño y Desarrollo Web".
- [ ] H1 con HighlightText animando solo sobre *"mejor vendedor"* (la coma queda fuera del bar).
- [ ] CTA "Diagnóstico gratuito" → scrollea a `#contacto` (form).
- [ ] CTA "Ver qué incluye" → scrollea a `#incluye` (grid de 9 cards).
- [ ] Pills debajo de los CTAs: "SEO · AEO · GEO" con dot verde, "UX/UI · Neuromarketing" sin dot.
- [ ] BrowserMockup:
  - [ ] Tabs cyclan cada 3.5s entre `index.tsx`, `Hero.tsx`, `styles.css` (la tab activa lleva fondo blanco translúcido).
  - [ ] **Crítico (test del fix de inner grid)**: cuando el tab cambia, los botones "Ver demo" y "Cómo funciona" del lado izq mantienen su tamaño exacto, no se reducen.
  - [ ] Caret pulsa en la URL bar (junto a "stellaris.com.co/cliente").
  - [ ] Perf bars (LCP 1.1s, CLS 0.02, INP 140ms) animan al fill correspondiente al cargar la sección.
  - [ ] Floating cards: Lighthouse 98 ring (top-left, fuera del browser shell) y SEO bolt (bottom-right) flotando con desfase. Hidden en mobile (<768px).
- [ ] ServiceIntro: header 2-col en desktop, grid de 3 pillars (Atraer convencer convertir / Neuromarketing+UX/UI / SEO·AEO·GEO), iconos Lucide (LayoutGrid, LayoutTemplate, Search), números 01/02/03.
- [ ] ServiceIncludes: grid 3-col en lg (3 filas × 3 cols = 9 cards), 2-col en sm, 1-col en mobile. Hover gradient siguiendo cursor + footer "incluido" en pink.
- [ ] ContactCTA: form con título "¿Tu sitio web no está generando leads?" + HighlightText sobre "Hablemos" (con punto fuera del bar).
- [ ] Activar `prefers-reduced-motion: reduce` en el OS y recargar: caret, floaty, perf-bar fill, tab cycling y reveals quedan estáticos; el contenido sigue visible.

- [ ] **Step 3: Smoke test del home → desarrollo-web**

En `http://localhost:5173/`, scroll a "Servicios". El card "Diseño Web" (o "Diseño y Desarrollo Web") debe:
- [ ] Llevar a `/servicios/desarrollo-web` al click.
- [ ] Prefetchear el chunk al hover/focus (DevTools → Network → ver request de `DesarrolloWebPage-*.js`).

- [ ] **Step 4: SEO básico**

DevTools → Elements → expandir `<head>`. Verificar:
- [ ] `<title>` = "Diseño y Desarrollo Web en Colombia | Stellaris".
- [ ] `<meta name="description">` con texto coherente.
- [ ] `<link rel="canonical" href="https://www.stellaris.com.co/servicios/desarrollo-web">`.
- [ ] Dos `<script type="application/ld+json">`: uno con `"@type":"Service"` listando los 9 títulos en `OfferCatalog`, otro con `"@type":"BreadcrumbList"` con 3 items.

DevTools → Console:
```js
document.querySelectorAll('h1').length  // 1
[...document.querySelectorAll('section[aria-labelledby]')].map(s => s.getAttribute('aria-labelledby'))
// debe incluir "hero-heading", "pillars-heading", "includes-heading"
```

- [ ] **Step 5: Verificar sitemap**

Run desde el dev server (o `cat public/sitemap.xml` si preferís el archivo plano):
```
curl -s http://localhost:5173/sitemap.xml | grep desarrollo-web
```
Expected: una línea con `<loc>https://www.stellaris.com.co/servicios/desarrollo-web</loc>`.

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

En Chrome incógnito, abrir `http://localhost:4173/servicios/desarrollo-web`. DevTools → Lighthouse → todas las categorías → "Mobile" → "Analyze page load".

Targets:
- [ ] Performance ≥ 90.
- [ ] Accessibility ≥ 95.
- [ ] Best Practices ≥ 95.
- [ ] SEO ≥ 95.

Si Performance falla, atender:
- LCP debe ser el H1 (no el browser canvas / caret / Starfield).
- CLS < 0.1: confirmar que perf-bar y floaty animan solo `transform`/`width`.

Repetir Lighthouse en perfil "Desktop" y guardar resultado.

- [ ] **Step 3: axe DevTools**

Extensión axe en Chrome → scan completo de `http://localhost:4173/servicios/desarrollo-web`. Expected: 0 violations críticas/serias.

- [ ] **Step 4: Schema.org Validator**

Copiar el HTML renderizado (DevTools → "Copy outerHTML" del `<html>`). Pegar en https://validator.schema.org/. Expected:
- [ ] `Service` válido con `OfferCatalog` listando los 9 títulos legibles.
- [ ] `BreadcrumbList` válido con 3 items.
- [ ] 0 errors. Warnings de campos opcionales (image, etc.) son aceptables.

- [ ] **Step 5: Google Rich Results Test**

Pegar el HTML en https://search.google.com/test/rich-results (modo "Code"). Expected:
- [ ] `Service` detectado y elegible.
- [ ] `BreadcrumbList` detectado y elegible.

- [ ] **Step 6: Cross-browser smoke**

Abrir `http://localhost:4173/servicios/desarrollo-web` en:
- [ ] Chrome desktop — feature-card mouse-tracking funciona; tabs cyclan limpio; floating cards flotan con desfase.
- [ ] Firefox desktop — mismo behavior; conic-gradient del lh-ring se renderiza correctamente.
- [ ] Safari (mac/iOS si está disponible) — confirmar que `backdrop-blur` y `conic-gradient` funcionan.
- [ ] Chrome DevTools → device toolbar → iPhone 14 — sin overflow horizontal, BrowserMockup escala bien, floating cards ocultas, perf bars siguen visibles.

- [ ] **Step 7: Bundle delta**

Confirmar el chunk lazy de la página en el output de `npm run build`. Esperado: `DesarrolloWebPage-*.js` ~22–28 KB. Si subió notablemente sobre 30 KB, revisar imports duplicados de lucide-react o si el `BrowserMockup` está importando algo pesado innecesario.

- [ ] **Step 8: Form de contacto**

En la página, scrollear al formulario. Enviar lead de prueba:
- Nombre: "Test Web"
- Email: "test@example.com"
- Mensaje: "Test from Desarrollo Web page"
- Aceptar términos.

Expected:
- [ ] Botón "Enviando..." con spinner.
- [ ] Mensaje verde de éxito.
- [ ] En Firebase Console → Firestore → `contactRequests` → documento con `service: "desarrollo-web"`.

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
git log --oneline main..HEAD
```
Expected: working tree limpio. El log debe mostrar (ordenado más reciente primero):

1. `feat(web): wire route, link from Services with prefetch, sitemap entry`
2. `feat(web): add DesarrolloWebPage that orchestrates hero, intro, includes and shared ContactCTA`
3. `feat(web): add ServiceIncludes with 3-col grid of 9 feature cards`
4. `feat(web): add ServiceIntro (Estrategia & conversión) with 3-pillar grid`
5. `feat(web): add hero with breadcrumb, CTAs, pills and BrowserMockup`
6. `feat(web): add BrowserMockup with tabbed code panel, perf bars and floating Lighthouse/SEO cards`
7. `feat(css): add Web section utilities (browser-shell, code-block + tokens, caret, perf-bar, lh-ring, floaty)`
8. `feat(web): add iconKey to lucide-react icon helper`
9. `feat(web): add data file with includes, pillars, meta and JSON-LD`
10. `docs(spec): add Desarrollo Web service page design spec`

(Más posiblemente el plan agregado al inicio si se decide commitearlo; opcional.)

- [ ] **Step 2: Pedir autorización al usuario antes de pushear**

**STOP.** Confirmar con el usuario que está OK con el push y la apertura del PR antes de ejecutar los pasos 3 y 4.

- [ ] **Step 3: Push**

```
git push -u origin feat/desarrollo-web
```

- [ ] **Step 4: Abrir PR contra `dev`**

```
gh pr create --base dev --head feat/desarrollo-web --title "feat(web): add Desarrollo Web service page" --body "$(cat <<'EOF'
## Summary

Nueva página `/servicios/desarrollo-web` siguiendo el patrón establecido por las páginas de WhatsApp y Redes Sociales.

- **Hero**: layout texto-izq / browser-der, breadcrumb full-width, H1 con HighlightText sobre *"mejor vendedor"* (coma fuera), dos CTAs (`HashLink` a `#contacto` y `#incluye`), dos pills (SEO·AEO·GEO con dot verde / UX/UI·Neuromarketing).
- **BrowserMockup**: navegador completo con title bar (traffic lights + URL bar con caret + 200 OK), canvas con fake site nav + fake hero + tabbed code panel cycling 3.5s entre `index.tsx`/`Hero.tsx`/`styles.css` + perf bars LCP·CLS·INP. Dos floating cards (Lighthouse 98 ring + SEO bolt) con `floaty` animation desfasada. Layout fix `grid-cols-[1.3fr_minmax(0,1fr)]` evita que el `<pre>` empuje los botones del lado izq.
- **Estrategia & conversión** (`ServiceIntro`): header 2-col + grid de 3 pillars con iconos Lucide.
- **¿Qué incluye?** (`ServiceIncludes`): grid 3-col de 9 feature cards con mouse-tracking radial gradient en hover.
- **Datos**: `WEB_INCLUDES` (9), `WEB_PILLARS` (3), `WEB_META`, `WEB_JSONLD` (Service + BreadcrumbList) en `src/data/services/desarrollo-web.ts`. Helper `icons.ts` mapea `iconKey` → componente Lucide.
- **Routing**: `<Route path="/servicios/desarrollo-web">` lazy en `App.tsx`. Card del home ahora linkea a la nueva ruta + prefetch en hover/focus. Entrada agregada en `public/sitemap.xml`.
- **Reuso**: `ContactCTA` compartido con `serviceTag="desarrollo-web"` (sin duplicar formulario). `useReveal`, `HighlightText`, `Starfield`, `HashLink` reusados.
- **CSS**: nuevas utilidades scoped (`.browser-shell`, `.browser-bar`, `.browser-canvas`, `.fake-hero-grad`, `.code-block` + syntax tokens, `.caret`, `.perf-bar`, `.lh-ring`, `.floaty`) — todas respetan `prefers-reduced-motion`.
- **Docs**: spec en `docs/superpowers/specs/2026-05-05-desarrollo-web-page-design.md` y plan en `docs/superpowers/plans/2026-05-05-desarrollo-web-page.md`.

## Test plan

- [ ] CTAs scrollean correctamente a `#contacto` y `#incluye`.
- [ ] HighlightText anima sobre *"mejor vendedor"*, *"trabajan"*, *"este servicio?"* y *"Hablemos"*.
- [ ] BrowserMockup: tabs cyclan limpio sin shrink de los botones laterales.
- [ ] Card del home linkea a `/servicios/desarrollo-web` y prefetchea el chunk.
- [ ] `<head>`: title, description, canonical, OG, JSON-LD Service + BreadcrumbList.
- [ ] Schema.org Validator: `Service` (9 ítems) + `BreadcrumbList` sin errores.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- [ ] axe DevTools: 0 violations críticas/serias.
- [ ] Form: lead de prueba aterriza en Firestore con \`service: "desarrollo-web"\`.
- [ ] \`prefers-reduced-motion: reduce\` desactiva caret, floaty, perf-bar fill, tab cycling, reveals.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 5: (Opcional) Marcar el spec como Implemented**

Si el usuario quiere trazabilidad, editar el header de `docs/superpowers/specs/2026-05-05-desarrollo-web-page-design.md` y cambiar `Status: Approved for implementation` por `Status: Implemented`. Commit + push.

(El merge del PR queda en manos del usuario.)

---

## Self-review (interno, ya aplicado)

**Spec coverage:**
- §3.1 (composición) → Tasks 4–8 (componentes + page).
- §3.2 (reuso de primitivos) → confirmado en imports de cada componente.
- §3.3 (routing y home) → Task 9.
- §4.1 (data file) → Task 1.
- §4.2 (icons.ts) → Task 2.
- §4.3 (WebHero) → Task 5.
- §4.4 (BrowserMockup) → Task 4.
- §4.5 (ServiceIntro) → Task 6.
- §4.6 (ServiceIncludes) → Task 7.
- §4.7 (DesarrolloWebPage) → Task 8.
- §4.8 (App.tsx route) → Task 9 step 1.
- §4.9 (content.ts href) → Task 9 step 3.
- §4.10 (Services.tsx prefetch) → Task 9 step 2.
- §4.11 (sitemap.xml) → Task 9 step 4.
- §4.12 (CSS) → Task 3.
- §5 (SEO checklist) → Task 10.
- §6 (test plan manual) → Tasks 10 + 11.
- §7 (rollout) → Task 12.

**Placeholder scan:** 0. Todas las descripciones están escritas, código completo, comandos ejecutables.

**Type consistency:** `WebIconKey`, `WebFeature`, `WebPillar` definidos en Task 1, consumidos sin cambios en Tasks 2 (icons.ts), 6 (ServiceIntro), 7 (ServiceIncludes). `WEB_META`, `WEB_JSONLD` definidos en Task 1, consumidos en Task 8 (page). `WEB_PILLARS`, `WEB_INCLUDES` consumidos por sus respectivas secciones. `WebHero`, `ServiceIntro`, `ServiceIncludes`, `BrowserMockup` exports consumidos correctamente.
