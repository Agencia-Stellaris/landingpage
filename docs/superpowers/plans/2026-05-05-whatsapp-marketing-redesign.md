# WhatsApp Marketing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la página `/servicios/whatsapp-marketing` con el nuevo diseño aprobado en `docs/superpowers/specs/2026-05-05-whatsapp-marketing-redesign-design.md`: Hero con CTAs y trust pills, sección "Comunicación & ventas" con 3 pillars, grid de 8 feature cards interactivas y formulario reusado.

**Architecture:** Rediseño in-place de los componentes en `src/components/services/whatsapp/`. Reusa primitivos del proyecto (`useReveal`, `HighlightText`, `Starfield`, `HashLink`, `lucide-react`, `gradient-bg`/`gradient-text`). Datos extendidos en `src/data/services/whatsapp-marketing.ts`. Sin renames, sin cambios al routing, sin cambios al `ContactCTA` compartido.

**Tech Stack:** React 19 + TypeScript strict + Tailwind CSS v4 (CSS-first via `@theme`) + GSAP/Lenis + lucide-react + Firebase (ya wired).

**Verification model (no hay test runner):** Cada tarea verifica con `npx tsc --noEmit`, `npm run lint`, dev server (`npm run dev`) y, en la última fase, auditoría completa (Lighthouse, schema.org validator, axe DevTools).

---

## Task 0: Working tree limpio antes de empezar

**Files:**
- Discard: `src/components/services/whatsapp/WhatsAppHero.tsx` (cambios sin commit)

- [ ] **Step 1: Verificar el estado actual de git**

Run: `git status -s`
Expected output (puede tener orden distinto):
```
 M src/components/services/whatsapp/WhatsAppHero.tsx
```

Si aparecen otros archivos modificados que no esperabas, **PARÁ** y consultá al usuario antes de continuar.

- [ ] **Step 2: Descartar el WIP de `WhatsAppHero.tsx`**

El spec aclara que el WIP queda obsoleto porque el rediseño tiene un layout diferente (texto-izquierda/teléfono-derecha, con párrafo + CTAs + trust pills). No vale la pena preservarlo.

Run: `git restore src/components/services/whatsapp/WhatsAppHero.tsx`

Verificar que quedó limpio:
Run: `git status -s`
Expected output: vacío (sin archivos modificados).

- [ ] **Step 3: Crear branch para el rediseño**

Run: `git checkout -b feat/whatsapp-redesign`
Expected: `Switched to a new branch 'feat/whatsapp-redesign'`

- [ ] **Step 4: Confirmar build verde antes de empezar**

Run: `npm run lint`
Expected: 0 errores.

Run: `npx tsc --noEmit`
Expected: 0 errores.

(No se hace commit en esta tarea — no hubo cambios.)

---

## Task 1: Tipos nuevos y `WHATSAPP_PILLARS` (cambios additivos al data)

**Files:**
- Modify: `src/data/services/whatsapp-marketing.ts`

Esta tarea es additiva — no toca el shape de `WHATSAPP_INCLUDES` ni el JSON-LD existente. La conversión de `WHATSAPP_INCLUDES` a su nueva forma se hace junto con la reescritura de `ServiceIncludes` en una tarea posterior (atómica, evita romper el build entre commits).

- [ ] **Step 1: Agregar los tipos `WhatsAppIconKey`, `WhatsAppFeature`, `WhatsAppPillar`**

Insertar **al inicio del archivo**, justo después del `import type { DocumentMeta }`:

```ts
export type WhatsAppIconKey =
  | "api"
  | "strategy"
  | "segment"
  | "automate"
  | "broadcast"
  | "crm"
  | "bot"
  | "metrics";

export interface WhatsAppFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: WhatsAppIconKey;
}

export interface WhatsAppPillar {
  title: string;
  description: string;
  iconKey: WhatsAppIconKey;
}
```

- [ ] **Step 2: Agregar `WHATSAPP_PILLARS` justo antes de `WHATSAPP_META`**

```ts
export const WHATSAPP_PILLARS: readonly WhatsAppPillar[] = [
  {
    title: "Conversaciones reales",
    description: "Que generan ventas y fidelizan",
    iconKey: "strategy",
  },
  {
    title: "Mensaje correcto",
    description: "A la persona correcta, en el momento correcto",
    iconKey: "segment",
  },
  {
    title: "WhatsApp Business API",
    description: "Automatizaciones inteligentes y flujos personalizados",
    iconKey: "api",
  },
];
```

- [ ] **Step 3: Verificar que tsc y lint pasan**

Run: `npx tsc --noEmit`
Expected: 0 errores.

Run: `npm run lint`
Expected: 0 errores.

- [ ] **Step 4: Commit**

```bash
git add src/data/services/whatsapp-marketing.ts
git commit -m "feat(whatsapp): add WhatsAppFeature/Pillar types and WHATSAPP_PILLARS data"
```

---

## Task 2: Helper `icons.ts` (mapeo `iconKey` → componente Lucide)

**Files:**
- Create: `src/components/services/whatsapp/icons.ts`

- [ ] **Step 1: Crear el archivo con el mapeo**

```ts
import {
  Layers3,
  Target,
  Users,
  Workflow,
  Megaphone,
  Database,
  Bot,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import type { WhatsAppIconKey } from "../../../data/services/whatsapp-marketing";

export const WHATSAPP_ICONS: Record<WhatsAppIconKey, LucideIcon> = {
  api: Layers3,
  strategy: Target,
  segment: Users,
  automate: Workflow,
  broadcast: Megaphone,
  crm: Database,
  bot: Bot,
  metrics: BarChart3,
};
```

- [ ] **Step 2: Verificar que tsc y lint pasan**

Run: `npx tsc --noEmit`
Expected: 0 errores.

Run: `npm run lint`
Expected: 0 errores.

(Si lint reporta "imported but unused", está bien — el helper aún no se consume en este commit; lo consumirán las tareas siguientes. Si tu config es estricta y rompe, dejá el archivo y avanzá igual; las próximas tareas lo importan.)

- [ ] **Step 3: Commit**

```bash
git add src/components/services/whatsapp/icons.ts
git commit -m "feat(whatsapp): add iconKey to lucide-react icon helper"
```

---

## Task 3: Reglas CSS nuevas en `index.css`

**Files:**
- Modify: `src/index.css` (apéndice al final del archivo)

Las reglas son scoped a clases dedicadas — no impactan otras páginas. Respetan `prefers-reduced-motion` siguiendo el patrón ya existente de `.typing-dot`.

- [ ] **Step 1: Agregar las nuevas reglas al final de `src/index.css`**

Append (sin tocar lo existente arriba):

```css
/* ============================================
 * WhatsApp Marketing — section-scoped utilities
 * ============================================ */

/* Aurora line — gradient horizontal usado como separador top */
.aurora-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 77, 109, 0.45),
    rgba(124, 58, 237, 0.45),
    transparent
  );
}

/* Dot grid — fondo decorativo de puntos cada 22px */
.dot-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 22px 22px;
}

/* Pill — chip pequeño usado en trust strip del Hero */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}
.pill .dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #22d39c;
  box-shadow: 0 0 0 3px rgba(34, 211, 156, 0.18);
  animation: pill-dot-pulse 1.8s infinite;
}
@keyframes pill-dot-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(34, 211, 156, 0.55);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(34, 211, 156, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .pill .dot {
    animation: none;
  }
}

/* Numeric badge — usado en header de "¿Qué incluye?" */
.num-badge {
  display: inline-grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.65rem;
  background: rgba(255, 77, 109, 0.1);
  border: 1px solid rgba(255, 77, 109, 0.25);
  color: var(--color-accent-pink);
  font-family: ui-monospace, SFMono-Regular, "JetBrains Mono", monospace;
  font-size: 0.78rem;
  font-weight: 600;
}

/* Feature card — hover gradient con mouse tracking via CSS vars --mx/--my */
.feature-card {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.025) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition:
    transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1),
    border-color 0.35s ease,
    background 0.35s ease;
  overflow: hidden;
}
.feature-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    rgba(255, 77, 109, 0.1),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.feature-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 77, 109, 0.22);
  background: linear-gradient(
    180deg,
    rgba(255, 77, 109, 0.04) 0%,
    rgba(124, 58, 237, 0.04) 100%
  );
}
.feature-card:hover::before {
  opacity: 1;
}
.feature-card .ico-wrap {
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.feature-card:hover .ico-wrap {
  transform: scale(1.06) rotate(-3deg);
}
@media (prefers-reduced-motion: reduce) {
  .feature-card,
  .feature-card .ico-wrap {
    transition: none;
  }
  .feature-card:hover {
    transform: none;
  }
  .feature-card:hover .ico-wrap {
    transform: none;
  }
}
```

- [ ] **Step 2: Verificar que el dev server arranca sin errores de CSS**

Run: `npm run dev` (en background) — abrir `http://localhost:5173/` en navegador. Confirmar que la página de home carga sin errores de consola.

Stop el dev server (Ctrl+C) — lo vamos a reusar más tarde.

- [ ] **Step 3: Verificar lint y tsc**

Run: `npm run lint`
Expected: 0 errores.

Run: `npx tsc --noEmit`
Expected: 0 errores.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat(css): add WhatsApp section utilities (feature-card, pill, num-badge, aurora-line, dot-grid)"
```

---

## Task 4: Reescribir `WhatsAppHero.tsx`

**Files:**
- Modify: `src/components/services/whatsapp/WhatsAppHero.tsx` (reescritura completa)

- [ ] **Step 1: Reescribir el componente con el nuevo diseño**

Reemplazar **todo el contenido** del archivo:

```tsx
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HashLink } from "../../routing/HashLink";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal } from "../../../hooks/useScrollReveal";
import { ChatMockup } from "./ChatMockup";

export function WhatsAppHero() {
  const breadcrumbRef = useReveal<HTMLElement>({ y: 20 });
  const textRef = useReveal<HTMLDivElement>({ y: 40 });
  const phoneRef = useReveal<HTMLDivElement>({ y: 40, delay: 0.15 });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-32 lg:pt-14">
        {/* Text column — left on desktop, top on mobile */}
        <div>
          <nav
            ref={breadcrumbRef}
            aria-label="Migas de pan"
            className="mb-7"
          >
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
                WhatsApp Marketing
              </li>
            </ol>
          </nav>

          <div ref={textRef}>
            <h1
              id="hero-heading"
              className="font-heading text-hero font-extrabold tracking-[-1.5px]"
            >
              El canal m&aacute;s poderoso de{" "}
              <HighlightText>comunicaci&oacute;n directa</HighlightText>, al
              servicio de tu estrategia.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Convertimos WhatsApp en una m&aacute;quina de conversi&oacute;n:
              estrategia, automatizaci&oacute;n y datos en un solo flujo.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <HashLink
                to="#contacto"
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
              >
                Empezar ahora
                <ArrowRight size={16} aria-hidden="true" />
              </HashLink>
              <a
                href="#incluye"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-white/30 hover:bg-white/[0.03]"
              >
                Ver qu&eacute; incluye
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="pill">
                <span className="dot" aria-hidden="true" />
                Meta Business Partner
              </span>
              <span className="pill">API oficial &middot; WhatsApp Business</span>
            </div>
          </div>
        </div>

        {/* Phone column — right on desktop, bottom on mobile */}
        <div ref={phoneRef}>
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Levantar dev server y verificar visualmente**

Run: `npm run dev` (en background)

En el navegador abrir `http://localhost:5173/servicios/whatsapp-marketing` y verificar:
- [ ] Texto a la izquierda, teléfono a la derecha en desktop (≥1024px).
- [ ] En mobile (375px) el teléfono queda abajo, el texto arriba.
- [ ] Breadcrumb visible con HashLink funcional al pasar mouse (color cambia a pink).
- [ ] H1 con la palabra "comunicación directa" se anima con HighlightText al hacer scroll.
- [ ] Dos botones: "Empezar ahora" (con gradient pink→purple) y "Ver qué incluye" (outline).
- [ ] Dos pills al final: "Meta Business Partner" con dot verde animado, y "API oficial · WhatsApp Business" sin dot.
- [ ] Click en "Empezar ahora" desplaza a `#contacto` (al final de la página actual o al placeholder donde estará).
- [ ] Click en "Ver qué incluye" desplaza a `#incluye` (sección actual de includes, todavía con su diseño viejo en este punto).
- [ ] Consola del navegador: 0 errores y 0 warnings de React/GSAP.

Stop el dev server.

- [ ] **Step 3: Verificar tsc y lint**

Run: `npx tsc --noEmit`
Expected: 0 errores.

Run: `npm run lint`
Expected: 0 errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/services/whatsapp/WhatsAppHero.tsx
git commit -m "feat(whatsapp): redesign hero with CTAs, trust pills and inverted layout"
```

---

## Task 5: Reescribir `ServiceIntro.tsx` (sección "Comunicación & ventas")

**Files:**
- Modify: `src/components/services/whatsapp/ServiceIntro.tsx` (reescritura completa)

- [ ] **Step 1: Reescribir el componente con el layout de 2 columnas + grid de pillars**

Reemplazar **todo el contenido** del archivo:

```tsx
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { WHATSAPP_PILLARS } from "../../../data/services/whatsapp-marketing";
import { WHATSAPP_ICONS } from "./icons";

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
              Comunicaci&oacute;n &amp; ventas
            </p>
            <h2
              id="pillars-heading"
              className="font-heading text-section font-extrabold tracking-[-1px]"
            >
              Donde tu cliente <HighlightText>s&iacute; responde.</HighlightText>
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-text-muted md:text-lg md:leading-[1.7]">
            <p>
              Convertimos el potencial de WhatsApp en{" "}
              <span className="font-semibold text-text-primary">
                conversaciones reales
              </span>{" "}
              que generan ventas, fidelizan clientes y construyen relaciones
              duraderas con tu audiencia.
            </p>
            <p>
              Dise&ntilde;amos estrategias con{" "}
              <span className="font-semibold text-text-primary">
                WhatsApp Business API
              </span>
              , automatizaciones inteligentes, flujos personalizados,
              segmentaci&oacute;n y campa&ntilde;as que llevan el mensaje
              correcto, a la persona correcta.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {WHATSAPP_PILLARS.map((pillar, i) => {
            const Ico = WHATSAPP_ICONS[pillar.iconKey];
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

- [ ] **Step 2: Verificar visualmente en dev server**

Run: `npm run dev` (en background)

Abrir `http://localhost:5173/servicios/whatsapp-marketing` y verificar:
- [ ] Sección "Comunicación & ventas" muestra header de 2 columnas en desktop (eyebrow + título a la izquierda; 2 paragraphs a la derecha).
- [ ] HighlightText anima sobre "sí responde." al entrar al viewport.
- [ ] Grid de 3 pillars con iconos Lucide (Target, Users, Layers3) — números `01/02/03` en la esquina superior derecha de cada card.
- [ ] Líneas decorativas: aurora-line al inicio, dot-grid de fondo sutil, dos blurs radiales (purple arriba-izq, pink abajo-der).
- [ ] En mobile (375px) el header se apila vertical y el grid pasa a 1 columna.
- [ ] Reveal animation: las cards entran con stagger de 0.1s al hacer scroll.
- [ ] Consola: 0 errores.

Stop el dev server.

- [ ] **Step 3: Verificar tsc y lint**

Run: `npx tsc --noEmit`
Expected: 0 errores.

Run: `npm run lint`
Expected: 0 errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/services/whatsapp/ServiceIntro.tsx
git commit -m "feat(whatsapp): redesign ServiceIntro as Comunicacion & ventas with 3-pillar grid"
```

---

## Task 6: Reestructurar `WHATSAPP_INCLUDES` + actualizar JSON-LD + reescribir `ServiceIncludes.tsx` (atómico)

**Files:**
- Modify: `src/data/services/whatsapp-marketing.ts` (cambia shape de `WHATSAPP_INCLUDES` y JSON-LD)
- Modify: `src/components/services/whatsapp/ServiceIncludes.tsx` (reescritura completa)

Esta tarea cambia el shape del data **y** su único consumer en el mismo commit. Sin commits intermedios para que el build no quede roto.

- [ ] **Step 1: Cambiar el shape de `WHATSAPP_INCLUDES` en el data file**

Reemplazar el bloque actual de `WHATSAPP_INCLUDES` (las 8 entradas como strings) por este array de objetos:

```ts
export const WHATSAPP_INCLUDES: readonly WhatsAppFeature[] = [
  {
    title: "WhatsApp Business API",
    description:
      "Configuración, verificación y optimización de la API oficial de Meta para escalar sin restricciones.",
    tag: "API",
    iconKey: "api",
  },
  {
    title: "Estrategia de comunicación",
    description:
      "Definimos tono, flujos de conversación y journey por etapa del embudo, alineado a tu marca.",
    tag: "Estrategia",
    iconKey: "strategy",
  },
  {
    title: "Segmentación inteligente",
    description:
      "Organizamos tu base por intereses, etapa, comportamiento y datos demográficos para impactar mejor.",
    tag: "CRM",
    iconKey: "segment",
  },
  {
    title: "Automatizaciones y flujos",
    description:
      "Respuestas automáticas, secuencias de seguimiento y disparadores en tiempo real, sin que muevas un dedo.",
    tag: "Auto",
    iconKey: "automate",
  },
  {
    title: "Campañas de difusión",
    description:
      "Envíos masivos segmentados por perfil de cliente, con plantillas aprobadas y métricas en vivo.",
    tag: "Broadcast",
    iconKey: "broadcast",
  },
  {
    title: "Integración con CRM",
    description:
      "Conectamos WhatsApp con tu CRM para gestionar leads, pipeline y atención comercial en un solo lugar.",
    tag: "Integración",
    iconKey: "crm",
  },
  {
    title: "Chatbots inteligentes",
    description:
      "Atención 24/7 con NLP que clasifica, responde y escala a un humano cuando hace falta.",
    tag: "IA",
    iconKey: "bot",
  },
  {
    title: "Métricas y analytics",
    description:
      "Dashboards de entrega, apertura, respuesta y conversión. Decisiones con datos, no con intuición.",
    tag: "Datos",
    iconKey: "metrics",
  },
];
```

- [ ] **Step 2: Actualizar el `OfferCatalog` del JSON-LD para usar `entry.title`**

En el mismo archivo, dentro del primer objeto de `WHATSAPP_JSONLD` (el `Service`), reemplazar:

```ts
itemListElement: WHATSAPP_INCLUDES.map((name, i) => ({
  "@type": "ListItem",
  position: i + 1,
  item: { "@type": "Offer", itemOffered: { "@type": "Service", name } },
})),
```

Por:

```ts
itemListElement: WHATSAPP_INCLUDES.map((entry, i) => ({
  "@type": "ListItem",
  position: i + 1,
  item: {
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: entry.title },
  },
})),
```

- [ ] **Step 3: Reescribir `ServiceIncludes.tsx` con feature cards**

Reemplazar **todo el contenido** de `src/components/services/whatsapp/ServiceIncludes.tsx`:

```tsx
import type { MouseEvent } from "react";
import { Check } from "lucide-react";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import {
  WHATSAPP_INCLUDES,
  type WhatsAppFeature,
} from "../../../data/services/whatsapp-marketing";
import { WHATSAPP_ICONS } from "./icons";

interface FeatureCardProps {
  feature: WhatsAppFeature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Ico = WHATSAPP_ICONS[feature.iconKey];

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
              className="font-heading text-section font-extrabold tracking-[-1px]"
            >
              &iquest;Qu&eacute; incluye{" "}
              <HighlightText>este servicio?</HighlightText>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Un sistema completo &mdash;no piezas sueltas&mdash; para que
              WhatsApp trabaje por ti las 24 horas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="num-badge">
              {String(WHATSAPP_INCLUDES.length).padStart(2, "0")}
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
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHATSAPP_INCLUDES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar visualmente en dev server**

Run: `npm run dev` (en background)

Abrir `http://localhost:5173/servicios/whatsapp-marketing` y verificar:
- [ ] Sección "¿Qué incluye este servicio?" muestra:
  - Header: eyebrow "El servicio", título con HighlightText, párrafo, badge "08" + "Componentes / en cada implementación" a la derecha.
  - Grid de 4 columnas en desktop (≥1024px), 2 columnas en tablet (sm), 1 columna en mobile.
  - 8 cards con icono + numbered badge superpuesto + tag pill (API, Estrategia, CRM, Auto, Broadcast, Integración, IA, Datos).
- [ ] Hover sobre una card:
  - Se eleva (translateY -3px), borde cambia a pink/22%.
  - El radial gradient sigue al cursor dentro de la card (efecto mouse-tracking).
  - El icono rota -3° y escala a 1.06.
  - El footer "incluido / línea / check" aparece en pink.
- [ ] Reveal animation: las cards entran con stagger de 0.06s al hacer scroll.
- [ ] Click en "Ver qué incluye" del Hero scrollea correctamente a esta sección.
- [ ] Consola: 0 errores.

- [ ] **Step 5: Verificar tsc y lint**

Run: `npx tsc --noEmit`
Expected: 0 errores.

Run: `npm run lint`
Expected: 0 errores.

- [ ] **Step 6: Build de producción para confirmar que todo compila**

Run: `npm run build`
Expected: build exitoso, 0 errores TypeScript, sin warnings críticos de Vite.

- [ ] **Step 7: Commit**

```bash
git add src/data/services/whatsapp-marketing.ts src/components/services/whatsapp/ServiceIncludes.tsx
git commit -m "feat(whatsapp): redesign ServiceIncludes as 4-col feature card grid; restructure WHATSAPP_INCLUDES"
```

---

## Task 7: Verificación SEO + accesibilidad

**Files:**
- Read-only check: rendered HTML in browser, `public/sitemap.xml`

- [ ] **Step 1: Levantar preview del build de producción**

Run: `npm run build && npm run preview`
Esperar a que aparezca la URL local (típicamente `http://localhost:4173/`).

- [ ] **Step 2: Verificar `<head>` de la página**

Abrir `http://localhost:4173/servicios/whatsapp-marketing` en el navegador. DevTools → Elements → expandir `<head>`. Verificar:
- [ ] `<title>` = "WhatsApp Marketing en Colombia | Stellaris"
- [ ] `<meta name="description">` con texto coherente.
- [ ] `<link rel="canonical" href="https://www.stellaris.com.co/servicios/whatsapp-marketing">`
- [ ] OG tags presentes (`og:title`, `og:description`, `og:type=article`, `og:image`).
- [ ] Dos `<script type="application/ld+json">`: uno con `@type: "Service"` y `OfferCatalog` listando los 8 títulos; otro con `@type: "BreadcrumbList"`.

- [ ] **Step 3: Validar JSON-LD con Schema.org Validator**

Copiar el HTML completo de la página (DevTools → `Ctrl+A` en Elements panel, o `view-source:`). Pegar en https://validator.schema.org/. Verificar:
- [ ] `Service` válido con `OfferCatalog` listando los 8 nombres legibles (no objetos `[object Object]`, no strings vacíos).
- [ ] `BreadcrumbList` válido con 3 items (Inicio, Servicios, WhatsApp Marketing).
- [ ] 0 errors, 0 warnings (o warnings explicables — ej. `image` opcional).

- [ ] **Step 4: Verificar semántica del documento**

DevTools → Console → ejecutar:
```js
document.querySelectorAll('h1').length
```
Expected: `1` (solo el del Hero, `id="hero-heading"`).

```js
[...document.querySelectorAll('h2')].map(h => ({ id: h.id, text: h.textContent.trim() }))
```
Expected: array de 4 entradas (`pillars-heading`, `includes-heading`, y los dos h2 del `ContactCTA` si los tiene — el componente real puede emitir 1 solo h2).

```js
[...document.querySelectorAll('section[aria-labelledby]')].map(s => s.getAttribute('aria-labelledby'))
```
Expected: incluye `"hero-heading"`, `"pillars-heading"`, `"includes-heading"`.

- [ ] **Step 5: Verificar breadcrumb visible y navegación con teclado**

- [ ] El `<nav aria-label="Migas de pan">` del Hero aparece visible (no oculto).
- [ ] `Tab` desde el inicio: el primer enlace alcanzable dentro del main es "Servicios" del breadcrumb.
- [ ] `Tab` continuo: pasa por los 2 CTAs del Hero, luego por las 8 feature cards (si tienen elementos focusables — en este caso no, son `<article>` sin links), luego al formulario.
- [ ] Focus ring visible en cada elemento interactivo (gracias al `:focus-visible` global).

- [ ] **Step 6: Verificar sitemap**

Run: `cat public/sitemap.xml | grep whatsapp-marketing`
Expected: una línea con `<loc>https://www.stellaris.com.co/servicios/whatsapp-marketing</loc>` (ya existe del trabajo anterior; no debe agregarse de nuevo).

- [ ] **Step 7: Verificar enlaces internos del Hero**

En la página de WhatsApp:
- [ ] Click en "Empezar ahora" — scrollea suave (vía Lenis) hasta el formulario `#contacto`.
- [ ] Click en "Ver qué incluye" — scrollea suave hasta la sección `#incluye`.
- [ ] Click en "Servicios" del breadcrumb — navega a `/#servicios` (vuelve al home, scrollea a la sección de servicios).

Si algún scroll no es suave o no aterriza en el target, revisar que Lenis está activo (`SmoothScroll` en el árbol de componentes) y que `HashLink` está bien configurado.

- [ ] **Step 8: Stop preview**

Ctrl+C en la terminal del preview.

(No hay commit en esta tarea — es solo verificación.)

---

## Task 8: Auditoría completa (Lighthouse + axe + Rich Results)

**Files:**
- Read-only check: produces evidence (capturas / output) para el PR.

- [ ] **Step 1: Lighthouse (build de producción)**

Run: `npm run build && npm run preview`

En Chrome incógnito (Lighthouse mide más limpio sin extensiones), abrir `http://localhost:4173/servicios/whatsapp-marketing`.

DevTools → Lighthouse → seleccionar todas las categorías → "Mobile" → "Analyze page load".

Verificar y guardar capturas:
- [ ] Performance ≥ 90.
- [ ] Accessibility ≥ 95.
- [ ] Best Practices ≥ 95.
- [ ] SEO ≥ 95.

Si alguna métrica falla:
- LCP alto: revisar que el H1 sea el LCP (no el Starfield canvas ni el ChatMockup). Considerar `loading="lazy"` en imágenes opcionales.
- CLS > 0.1: confirmar que los reveals animan `transform`/`opacity`, no `top`/`height` (deberían — `useReveal` ya lo hace).
- A11y warning: revisar contrast ratios sobre los textos `text-text-muted` (#8888aa sobre #060612) — deberían cumplir AA.

Repetir Lighthouse en perfil "Desktop" y guardar resultados.

- [ ] **Step 2: axe DevTools**

Instalar/abrir extensión axe DevTools en Chrome. En la página `http://localhost:4173/servicios/whatsapp-marketing` correr el scan completo.

Expected: 0 violations críticas o serias. Warnings menores aceptables (color contrast warnings borderline pueden quedar para revisión de copy).

- [ ] **Step 3: Google Rich Results Test**

Si el preview no es público: usar la opción "Code" del Rich Results Test (https://search.google.com/test/rich-results) y pegar el HTML renderizado de la página.

Expected:
- [ ] `Service` detectado y elegible.
- [ ] `BreadcrumbList` detectado y elegible.
- [ ] 0 errores; warnings de campos opcionales son aceptables.

- [ ] **Step 4: Smoke test cross-browser**

Abrir `http://localhost:4173/servicios/whatsapp-marketing` en:
- [ ] Chrome desktop — verificar feature-card mouse tracking.
- [ ] Firefox desktop — verificar mismo behavior; el radial gradient debe pintarse correctamente.
- [ ] Safari (mac) si está disponible — confirmar que `clip-path` de bubble tails y backdrop-blur funcionan.
- [ ] Chrome DevTools → device toolbar → iPhone 14 — verificar mobile layout, ChatMockup arriba, texto abajo, sin overflow horizontal.

- [ ] **Step 5: Verificar bundle delta**

Comparar tamaño del chunk de `WhatsAppMarketingPage` antes y después:

Run: `npm run build` y revisar la salida de Vite — debería listar el chunk `dist/assets/WhatsAppMarketingPage-*.js` con un tamaño razonable (esperar < 30KB gzip).

Si subió notablemente vs. la versión anterior, revisar que no haya imports duplicados de `lucide-react` o componentes innecesarios.

- [ ] **Step 6: Test de submission del formulario**

En la página, scrollear al formulario y enviar un lead de prueba:
- Nombre: "Test Lead"
- Email: "test@example.com"
- Mensaje: "Test from redesigned WhatsApp page"
- Aceptar términos.

Expected:
- [ ] Botón cambia a "Enviando..." con spinner.
- [ ] Tras unos segundos aparece el mensaje verde de éxito.
- [ ] En Firebase Console → Firestore → colección `contactRequests` → aparece un documento con `service: "whatsapp-marketing"`, los datos del form, y `createdAt` con timestamp.

(No hay commit en esta tarea — es la auditoría final. Si algo falla, abrir tarea de corrección.)

---

## Task 9: Cleanup, documentación y PR

**Files:**
- Optional: `docs/superpowers/specs/2026-05-05-whatsapp-marketing-redesign-design.md` (marca como "Implemented")

- [ ] **Step 1: Verificar working tree limpio**

Run: `git status -s`
Expected: vacío (sin archivos modificados sin commitear).

Run: `git log --oneline feat/whatsapp-redesign ^main`
Expected: lista de 6 commits aproximadamente, uno por tarea principal:
1. add WhatsAppFeature/Pillar types and WHATSAPP_PILLARS data
2. add iconKey to lucide-react icon helper
3. add WhatsApp section utilities CSS
4. redesign hero with CTAs, trust pills and inverted layout
5. redesign ServiceIntro as Comunicacion & ventas with 3-pillar grid
6. redesign ServiceIncludes as 4-col feature card grid; restructure WHATSAPP_INCLUDES

- [ ] **Step 2: Marcar el spec como implementado (opcional)**

En el header de `docs/superpowers/specs/2026-05-05-whatsapp-marketing-redesign-design.md`, cambiar:

```
**Status:** Approved for implementation
```

Por:

```
**Status:** Implemented
```

Si querés mantener la trazabilidad, agregar una línea con el SHA del commit final o el número de PR.

- [ ] **Step 3: Push y abrir PR**

Confirmar con el usuario antes de pushear.

```bash
git push -u origin feat/whatsapp-redesign
```

Abrir PR a `main` con:
- Título: `feat(whatsapp): redesign service page with hero CTAs, pillars and feature cards`
- Body: link al spec, screenshots de cada sección antes/después, checklist de auditoría completado del Task 8 con sus capturas.

(El commit/push final y el PR requieren autorización explícita del usuario antes de ejecutarse.)

---

## Self-review (interno, ya aplicado)

**Spec coverage**: Cada sección del spec está cubierta:
- §3.1 (composición) → Tasks 4, 5, 6 reescriben los 3 componentes; el page no cambia.
- §3.2 (reuso de primitivos) → confirmado en imports de cada componente (HighlightText, useReveal, Starfield, HashLink).
- §3.3 (descartar WIP) → Task 0.
- §4.1 (data) → Tasks 1, 6 (split: aditivo + atómico).
- §4.2 (Hero) → Task 4.
- §4.3 (ServiceIntro) → Task 5.
- §4.4 (ServiceIncludes) → Task 6.
- §4.5 (icons helper) → Task 2.
- §4.6 (CSS) → Task 3.
- §5 (SEO checklist) → Task 7.
- §6 (auditoría) → Task 8.
- §7 (test plan manual) → Task 8.
- §8 (rollout) → Task 9.

**Placeholder scan**: 0 placeholders. Todas las descripciones están escritas, todo el código aparece in-line, todos los comandos son ejecutables.

**Type consistency**: `WhatsAppIconKey` (Task 1) es consumido por `WhatsAppFeature` y `WhatsAppPillar` (Task 1) y por `WHATSAPP_ICONS` (Task 2). `WhatsAppFeature` se exporta y se importa en `ServiceIncludes` (Task 6). Nombres consistentes a través de las tareas.
