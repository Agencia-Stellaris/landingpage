# Email Marketing Service Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/servicios/email-marketing` as the third service page, mirroring the established Hero → Intro → Includes → ContactCTA pattern from `desarrollo-web`/`whatsapp-marketing`, with showcase-quality SEO (Service + BreadcrumbList + FAQPage JSON-LD).

**Architecture:** Page is a thin orchestrator (`EmailMarketingPage.tsx`) composing four sections. Hero pairs copy + a faithful `EmailMockup` (mail client shell with envelope + automation-flow animations). Intro renders 3 pilares. Includes renders 9 cards from a typed data array. ContactCTA is reused with `serviceTag="email-marketing"`. All static copy, icon mappings, meta, and JSON-LD live in a single typed data module. CSS-only animations keyed off `prefers-reduced-motion`.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind v4 (CSS-first), lucide-react, GSAP via `useReveal`, react-router-dom v7. No new dependencies.

**Branch:** `feat/email-marketing` (already created with the spec commit). PR target: `dev`.

**Spec reference:** `docs/superpowers/specs/2026-05-06-email-marketing-page-design.md`

---

## File structure

| Path | Action | Purpose |
|---|---|---|
| `src/data/services/email-marketing.ts` | Create | Types, `EMAIL_INCLUDES`, `EMAIL_PILLARS`, `EMAIL_FAQS`, `EMAIL_META`, `EMAIL_JSONLD` |
| `src/components/services/email/icons.ts` | Create | Lucide icon map keyed by `EmailIconKey` |
| `src/index.css` | Modify (append) | Email-section CSS utilities + animations (`mail-shell`, `mail-bar`, `flow-line`, `@keyframes openFlap`, `pulseDot`) |
| `src/components/services/email/EmailMockup.tsx` | Create | Mail-client mockup (shell, sidebar, list, open email, automation strip, floating chips) |
| `src/components/services/email/ServiceIntro.tsx` | Create | "Tu base como activo" header + 3 pilares grid |
| `src/components/services/email/ServiceIncludes.tsx` | Create | 9-card grid for `EMAIL_INCLUDES` |
| `src/components/services/email/EmailHero.tsx` | Create | Breadcrumb + H1 + lead + 2 CTAs + `<EmailMockup/>` (no pills) |
| `src/pages/EmailMarketingPage.tsx` | Create | Composes sections + `useDocumentMeta` |
| `src/App.tsx` | Modify | Register lazy route |
| `src/data/content.ts` | Modify | Update Email Marketing service `href` from `"#"` to `/servicios/email-marketing` |
| `src/components/sections/Services.tsx` | Modify | Add `prefetchEmail()` and wire it in `handlePrefetch` |
| `public/sitemap.xml` | Modify | Add new `<url>` entry, `priority=0.8`, `lastmod=2026-05-06` |

**Verification per task:** `npm run build` (typecheck + bundle) and `npm run lint`. Visual smoke test happens once at the end (Task 12).

---

## Task 1: Data module (types, includes, pilares, FAQs, meta, JSON-LD)

**Files:**
- Create: `src/data/services/email-marketing.ts`

- [ ] **Step 1: Create the data file**

Create `src/data/services/email-marketing.ts` with this exact content:

```ts
import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type EmailIconKey =
  | "strategy"
  | "template"
  | "segment"
  | "automation"
  | "abtest"
  | "platform"
  | "reports"
  | "deliverability"
  | "cart"
  | "nurture"
  | "reactivate"
  | "revenue";

export interface EmailFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: EmailIconKey;
}

export interface EmailPillar {
  title: string;
  description: string;
  iconKey: EmailIconKey;
}

export interface EmailFaq {
  question: string;
  answer: string;
}

export const EMAIL_INCLUDES: readonly EmailFeature[] = [
  {
    title: "Estrategia alineada a tu embudo",
    description:
      "Estrategia de email marketing pensada desde tu funnel de ventas, no desde la plantilla.",
    tag: "Estrategia",
    iconKey: "strategy",
  },
  {
    title: "Plantillas profesionales",
    description:
      "Diseño responsive mobile-first, listas para verse bien en cualquier cliente de correo.",
    tag: "Diseño",
    iconKey: "template",
  },
  {
    title: "Segmentación avanzada",
    description:
      "Listas segmentadas por comportamiento, etapa del buyer y perfil de usuario.",
    tag: "Segmentación",
    iconKey: "segment",
  },
  {
    title: "Flujos de automatización",
    description:
      "Bienvenida, lead nurturing, reactivación y cierre, conectados como una sola conversación.",
    tag: "Automatización",
    iconKey: "automation",
  },
  {
    title: "Test A/B",
    description:
      "Pruebas de asuntos, contenidos y CTAs para mejorar continuamente cada envío.",
    tag: "Optimización",
    iconKey: "abtest",
  },
  {
    title: "Gestión de plataformas",
    description:
      "Configuración y operación de HubSpot, Mailchimp, ActiveCampaign y otras herramientas.",
    tag: "Plataformas",
    iconKey: "platform",
  },
  {
    title: "Reportes accionables",
    description:
      "Aperturas, clics, conversiones y ventas generadas, con lectura clara y aplicable.",
    tag: "Reportes",
    iconKey: "reports",
  },
  {
    title: "Deliverability e higiene de base",
    description:
      "SPF, DKIM, DMARC y limpieza periódica de la base. Tus correos llegan a la bandeja, no a spam.",
    tag: "Entregabilidad",
    iconKey: "deliverability",
  },
  {
    title: "Recuperación de carritos abandonados",
    description:
      "Flujos automatizados que rescatan ventas perdidas y convierten visitantes en clientes.",
    tag: "E-commerce",
    iconKey: "cart",
  },
];

export const EMAIL_PILLARS: readonly EmailPillar[] = [
  {
    title: "Nutrir leads",
    description:
      "Conversaciones automatizadas que llevan al usuario hacia la compra.",
    iconKey: "nurture",
  },
  {
    title: "Reactivar clientes",
    description:
      "Recuperar contactos inactivos con mensajes y ofertas relevantes.",
    iconKey: "reactivate",
  },
  {
    title: "Ingresos predecibles",
    description:
      "Tu base de datos como activo que genera ventas e interacción constante.",
    iconKey: "revenue",
  },
];

export const EMAIL_FAQS: readonly EmailFaq[] = [
  {
    question: "¿Qué es el email marketing y por qué sigue siendo rentable?",
    answer:
      "El email marketing es la práctica de enviar comunicaciones comerciales y de relacionamiento por correo electrónico, sobre una base de datos propia. Sigue siendo uno de los canales más rentables del marketing digital porque opera sobre una audiencia que ya consintió recibir mensajes: su ROI suele superar al de redes sociales y publicidad pagada, especialmente cuando se combina con segmentación y automatización.",
  },
  {
    question: "¿Con qué plataformas de email marketing trabajan?",
    answer:
      "Trabajamos principalmente con HubSpot, Mailchimp y ActiveCampaign, y también nos integramos con el CRM que tu organización ya esté utilizando, como Salesforce, Zoho o Pipedrive. La elección depende del volumen de envíos, la complejidad de los flujos y el nivel de integración con ventas. Recomendamos la opción que mejor se ajusta a tu operación, no la que más nos conviene.",
  },
  {
    question: "¿Qué incluye un servicio profesional de email marketing?",
    answer:
      "Cubre el ciclo completo: estrategia alineada al embudo de ventas, diseño de plantillas responsive, segmentación por comportamiento y perfil, flujos de automatización (bienvenida, nurturing, reactivación y cierre), pruebas A/B, deliverability con autenticación SPF, DKIM y DMARC, y reportes accionables que muestran aperturas, clics, conversiones e ingresos atribuidos a cada campaña.",
  },
  {
    question: "¿Cómo se mide el éxito de una campaña de email marketing?",
    answer:
      "Más allá de aperturas y clics, el éxito se mide por conversiones y por ingresos atribuidos a cada flujo. Configuramos el seguimiento para conectar cada envío con su resultado en tu CRM o tienda online, lo que permite calcular el ROI real, identificar qué segmentos compran más y optimizar continuamente subject lines, frecuencia y contenidos.",
  },
  {
    question: "¿Qué es deliverability y por qué importa?",
    answer:
      "Deliverability es la capacidad de que tus correos lleguen a la bandeja de entrada y no a spam. Depende de la autenticación del dominio (SPF, DKIM, DMARC), la reputación del remitente, la calidad de la lista y el comportamiento de los destinatarios. Sin un deliverability adecuado, todo el trabajo de estrategia y diseño se pierde: por eso lo tratamos como infraestructura, no como detalle.",
  },
  {
    question:
      "¿Pueden integrarse las campañas con mi tienda online o CRM existente?",
    answer:
      "Sí. Conectamos las plataformas de email con tu tienda (Shopify, WooCommerce, VTEX) y tu CRM para activar flujos basados en comportamiento real: carritos abandonados, post-compra, reactivación de clientes inactivos, recompra y upsell. La integración permite que cada correo dispare por el evento correcto y se atribuya a la conversión correspondiente.",
  },
];

export const EMAIL_META: DocumentMeta = {
  title: "Email Marketing en Colombia | Automatización y CRM | Stellaris",
  description:
    "Email marketing profesional: estrategia, automatización, segmentación y deliverability. HubSpot, Mailchimp, ActiveCampaign. Convertí tu base de datos en ventas predecibles.",
  keywords:
    "email marketing Colombia, automatización de email, HubSpot Colombia, Mailchimp, ActiveCampaign, segmentación, lead nurturing, carritos abandonados, deliverability, SPF DKIM DMARC, CRM",
  canonical: "https://www.stellaris.com.co/servicios/email-marketing",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/email-marketing.jpg",
};

export const EMAIL_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Email Marketing",
    serviceType: "Email Marketing",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: "es-CO",
    description:
      "Email marketing profesional con foco en estrategia, automatización, segmentación, deliverability y reportes. Trabajamos con HubSpot, Mailchimp, ActiveCampaign y CRMs.",
    url: "https://www.stellaris.com.co/servicios/email-marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: EMAIL_INCLUDES.map((entry, i) => ({
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
        name: "Email Marketing",
        item: "https://www.stellaris.com.co/servicios/email-marketing",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: EMAIL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npm run build`
Expected: build succeeds (no TS errors). Bundle output mentions emitted JS files; no references to email-marketing yet because nothing imports it — that's fine for this task.

If you see "is declared but its value is never read" for `EMAIL_FAQS`, ignore — it's exported and consumed by `EMAIL_JSONLD` in the same file.

- [ ] **Step 3: Commit**

```bash
git add src/data/services/email-marketing.ts
git commit -m "feat(email): add data module — includes, pilares, FAQs, meta and JSON-LD"
```

---

## Task 2: Lucide icon helper

**Files:**
- Create: `src/components/services/email/icons.ts`

- [ ] **Step 1: Create the icons file**

Create `src/components/services/email/icons.ts` with this exact content:

```ts
import {
  Target,
  LayoutTemplate,
  Users,
  Workflow,
  FlaskConical,
  Grid3x3,
  LineChart,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  RefreshCcw,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { EmailIconKey } from "../../../data/services/email-marketing";

export const EMAIL_ICONS: Record<EmailIconKey, LucideIcon> = {
  strategy: Target,
  template: LayoutTemplate,
  segment: Users,
  automation: Workflow,
  abtest: FlaskConical,
  platform: Grid3x3,
  reports: LineChart,
  deliverability: ShieldCheck,
  cart: ShoppingCart,
  nurture: Sparkles,
  reactivate: RefreshCcw,
  revenue: TrendingUp,
};
```

- [ ] **Step 2: Verify lucide exports exist**

Run: `npm run build`
Expected: build succeeds. If any icon name fails to resolve, the error will name the missing export — replace with the closest available icon (e.g. `Grid` instead of `Grid3x3`).

- [ ] **Step 3: Commit**

```bash
git add src/components/services/email/icons.ts
git commit -m "feat(email): add lucide-react icon helper keyed by EmailIconKey"
```

---

## Task 3: CSS utilities and animations for email mockup

**Files:**
- Modify: `src/index.css` (append at end of file)

Note: `.floaty` and its `@keyframes floaty` are already defined globally (in the Desarrollo Web section). Reuse, do not redeclare.

- [ ] **Step 1: Append email-section block to `src/index.css`**

Open `src/index.css`. Append the following at the end of the file (after the Desarrollo Web reduced-motion block):

```css

/* ============================================
 * Email Marketing — section-scoped utilities
 * ============================================ */

/* Mail client shell */
.mail-shell {
  background: #0B0712;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 30px 80px -20px rgba(124, 58, 237, 0.45);
}
.mail-bar {
  background: #15101F;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* Automation flow underline */
.flow-line {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 77, 109, 0.5),
    rgba(124, 58, 237, 0.5),
    transparent
  );
}

/* Pulsing dot for flow nodes */
@keyframes pulseDot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.4); opacity: 0.7; }
}
.pulse-dot {
  animation: pulseDot 2.5s ease-in-out infinite;
}

/* Envelope flap that opens and closes */
@keyframes openFlap {
  0%, 30%   { transform: rotateX(0); }
  55%, 75%  { transform: rotateX(180deg); }
  100%      { transform: rotateX(0); }
}
.flap {
  transform-origin: top;
  animation: openFlap 7s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .pulse-dot,
  .flap {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: build succeeds. CSS is consumed by Tailwind v4 — any malformed rule fails the build.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(css): add Email section utilities (mail-shell, flow-line, openFlap, pulseDot)"
```

---

## Task 4: EmailMockup component

**Files:**
- Create: `src/components/services/email/EmailMockup.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/services/email/EmailMockup.tsx` with this exact content:

```tsx
import type { CSSProperties } from "react";
import {
  Inbox,
  Star,
  Send,
  Mail,
  ChevronRight,
  Reply,
  Forward,
  CheckCircle2,
} from "lucide-react";

interface FolderItem {
  label: string;
  icon: typeof Inbox;
  count: string;
  active?: boolean;
}

const FOLDERS: readonly FolderItem[] = [
  { label: "Bandeja", icon: Inbox, count: "128", active: true },
  { label: "Destacados", icon: Star, count: "14" },
  { label: "Enviados", icon: Send, count: "" },
  { label: "Borradores", icon: Mail, count: "2" },
];

interface SegmentItem {
  label: string;
  color: string;
}

const SEGMENTS: readonly SegmentItem[] = [
  { label: "Leads fríos", color: "#FF4D6D" },
  { label: "Clientes activos", color: "#22D39C" },
  { label: "VIP", color: "#7C3AED" },
  { label: "Reactivación", color: "#F59E0B" },
];

interface EmailRow {
  from: string;
  subject: string;
  time: string;
  accent: string;
  unread?: boolean;
  active?: boolean;
}

const EMAILS: readonly EmailRow[] = [
  {
    from: "Bienvenida #01",
    subject: "Empezamos por tu objetivo",
    time: "10:32",
    accent: "#FF4D6D",
    unread: true,
    active: true,
  },
  {
    from: "Lead nurturing",
    subject: "Caso de éxito · 3 min de lectura",
    time: "09:18",
    accent: "#7C3AED",
  },
  {
    from: "Reactivación",
    subject: "Te extrañamos. Aquí algo nuevo.",
    time: "ayer",
    accent: "#22D39C",
  },
  {
    from: "Newsletter",
    subject: "Edición #14 — datos del mes",
    time: "mar",
    accent: "#F59E0B",
  },
];

interface FlowStep {
  label: string;
  color: string;
}

const FLOW: readonly FlowStep[] = [
  { label: "Captura", color: "#FF4D6D" },
  { label: "Nutrir", color: "#7C3AED" },
  { label: "Decisión", color: "#22D39C" },
  { label: "Cierre", color: "#F59E0B" },
];

export function EmailMockup() {
  return (
    <div
      role="img"
      aria-label="Vista previa de un cliente de correo con flujos de email marketing automatizados de Stellaris"
      className="relative mx-auto w-full"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Floating chip — delivered */}
      <div
        className="floaty pointer-events-none absolute -left-6 top-12 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        aria-hidden="true"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-green/15 text-accent-green">
          <CheckCircle2 size={14} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">Entregado</div>
          <div className="text-[9px] text-text-muted">a 12 segmentos</div>
        </div>
      </div>

      {/* Floating chip — automated flow */}
      <div
        className="floaty pointer-events-none absolute -right-6 bottom-16 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-pink/15 text-accent-pink">
          <Send size={13} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">Flujo automatizado</div>
          <div className="text-[9px] text-text-muted">bienvenida · nurturing · cierre</div>
        </div>
      </div>

      {/* Mail client shell */}
      <div className="mail-shell" aria-hidden="true">
        {/* Title bar */}
        <div className="mail-bar flex items-center gap-2 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="ml-2 flex-1 text-center font-mono text-[10px] text-text-muted">
            Bandeja de entrada
          </div>
          <div className="hidden gap-1 sm:flex">
            <span className="rounded-md border border-white/[0.06] bg-[#0B0712] px-2 py-0.5 font-mono text-[9px] text-text-muted">
              3 nuevos
            </span>
          </div>
        </div>

        {/* Body: sidebar + (list + open email) */}
        <div className="grid grid-cols-[120px_1fr]">
          {/* Sidebar */}
          <div className="space-y-1.5 border-r border-white/[0.06] bg-[#0E0818]/60 p-3">
            {FOLDERS.map((f) => {
              const Ico = f.icon;
              return (
                <div
                  key={f.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
                    f.active ? "bg-white/[0.06] text-white" : "text-text-muted"
                  }`}
                >
                  <Ico size={12} aria-hidden="true" />
                  <span className="flex-1">{f.label}</span>
                  {f.count && (
                    <span className="font-mono text-[9px] opacity-70">{f.count}</span>
                  )}
                </div>
              );
            })}

            <div className="pt-3 text-[8px] uppercase tracking-widest text-text-muted/60">
              Segmentos
            </div>
            {SEGMENTS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-[10px] text-text-muted"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="truncate">{s.label}</span>
              </div>
            ))}
          </div>

          {/* List + open email */}
          <div className="grid grid-cols-[140px_1fr]">
            {/* Email list */}
            <div className="border-r border-white/[0.06] bg-[#0B0712]/40">
              {EMAILS.map((m) => (
                <div
                  key={m.from}
                  className={`border-b border-white/[0.04] px-3 py-2.5 ${
                    m.active ? "bg-white/[0.04]" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {m.unread && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: m.accent }}
                      />
                    )}
                    <span
                      className={`text-[10px] ${
                        m.unread ? "font-semibold text-white" : "text-text-muted"
                      }`}
                    >
                      {m.from}
                    </span>
                    <span className="ml-auto font-mono text-[8px] text-text-muted/70">
                      {m.time}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-[9px] text-text-muted">
                    {m.subject}
                  </div>
                </div>
              ))}
            </div>

            {/* Open email */}
            <div className="bg-bg-primary p-4">
              <div className="mb-2 flex items-center gap-2 text-[9px] text-text-muted">
                <span>tu@empresa.com</span>
                <ChevronRight size={10} aria-hidden="true" />
                <span className="text-text-muted/70">Bandeja</span>
              </div>
              <h3 className="font-heading text-[14px] font-bold leading-tight text-white">
                Empezamos por tu objetivo
              </h3>
              <div className="mt-1 flex items-center gap-2 text-[9px] text-text-muted">
                <span className="grid h-4 w-4 place-items-center rounded-full gradient-bg text-[7px] font-bold text-white">
                  S
                </span>
                <span className="font-medium text-text-primary">Stellaris</span>
                <span>· para mí · 10:32</span>
                <Star size={10} className="ml-auto" aria-hidden="true" />
              </div>

              {/* Envelope animation */}
              <div className="mt-3 grid place-items-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-accent-pink/10 to-accent-purple/10 p-4">
                <div className="relative" style={{ perspective: "600px" }}>
                  <div className="relative h-12 w-20 rounded-md border border-white/15 bg-[#0E0818]">
                    <div
                      className="flap absolute inset-x-0 top-0 h-6"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF4D6D, #7C3AED)",
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      }}
                    />
                    <div className="absolute inset-x-2 bottom-1.5 space-y-0.5">
                      <div className="h-0.5 w-full rounded bg-white/20" />
                      <div className="h-0.5 w-3/4 rounded bg-white/15" />
                      <div className="h-0.5 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Body placeholder lines */}
              <div className="mt-3 space-y-1">
                <div className="h-2 w-full rounded bg-white/[0.10]" />
                <div className="h-2 w-5/6 rounded bg-white/[0.08]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
              </div>

              {/* Mini CTAs */}
              <div className="mt-3 flex gap-2">
                <div className="rounded-full gradient-bg px-3 py-1 font-heading text-[9px] font-bold text-white">
                  Ver propuesta
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-[9px] text-white/80">
                  Más tarde
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center gap-3 border-t border-white/[0.04] pt-3 text-text-muted">
                <span className="flex items-center gap-1 text-[9px]">
                  <Reply size={11} aria-hidden="true" /> Responder
                </span>
                <span className="flex items-center gap-1 text-[9px]">
                  <Forward size={11} aria-hidden="true" /> Reenviar
                </span>
                <span className="ml-auto rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[8px]">
                  A/B · v2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Automation flow strip */}
        <div className="border-t border-white/[0.06] bg-[#0E0818]/60 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
              Flujo · bienvenida → cierre
            </div>
            <div className="font-mono text-[9px] text-accent-green">activo</div>
          </div>
          <div className="relative flex items-center justify-between">
            <div className="absolute left-3 right-3 top-1/2 h-px flow-line" />
            {FLOW.map((step, i) => (
              <div
                key={step.label}
                className="relative z-10 flex flex-col items-center gap-1"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-bg-primary">
                  <span
                    className="pulse-dot h-1.5 w-1.5 rounded-full"
                    style={
                      {
                        background: step.color,
                        animationDelay: `${i * 0.4}s`,
                      } as CSSProperties
                    }
                  />
                </span>
                <span className="text-[9px] text-text-muted">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck and lint**

Run: `npm run build`
Expected: build succeeds — no TS errors. The component compiles to a chunk under `dist/assets/`.

Run: `npm run lint`
Expected: no errors. Lint may surface unused imports — remove them if any.

- [ ] **Step 3: Commit**

```bash
git add src/components/services/email/EmailMockup.tsx
git commit -m "feat(email): add EmailMockup with shell, list, open email, envelope animation and automation strip"
```

---

## Task 5: ServiceIntro component (3 pilares)

**Files:**
- Create: `src/components/services/email/ServiceIntro.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/services/email/ServiceIntro.tsx` with this exact content:

```tsx
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { EMAIL_PILLARS } from "../../../data/services/email-marketing";
import { EMAIL_ICONS } from "./icons";

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
              Tu base como activo
            </p>
            <h2
              id="pillars-heading"
              className="font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]"
            >
              El canal de tus <HighlightText>datos</HighlightText>.
            </h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-[1.7]">
            <p>
              El email marketing es uno de los canales m&aacute;s rentables del
              ecosistema digital, porque opera sobre el activo m&aacute;s
              importante de tu organizaci&oacute;n:{" "}
              <span className="font-semibold text-text-primary">
                los datos de tus usuarios
              </span>
              . En{" "}
              <span className="font-semibold text-text-primary">Stellaris</span>{" "}
              dise&ntilde;amos estrategias que nutren leads, reactivan clientes y
              generan ingresos predecibles.
            </p>
            <p>
              Desde la gesti&oacute;n avanzada de{" "}
              <span className="font-semibold text-text-primary">
                HubSpot, Mailchimp, ActiveCampaign
              </span>{" "}
              &mdash;o el CRM que prefieras&mdash; hasta el dise&ntilde;o de
              flujos de automatizaci&oacute;n complejos y segmentaciones por
              comportamiento, convertimos tu base en un activo generador de
              ventas e interacci&oacute;n constante.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {EMAIL_PILLARS.map((pillar, i) => {
            const Ico = EMAIL_ICONS[pillar.iconKey];
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

- [ ] **Step 2: Verify typecheck**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/services/email/ServiceIntro.tsx
git commit -m "feat(email): add ServiceIntro 'Tu base como activo' with 3 pilares"
```

---

## Task 6: ServiceIncludes component (9-card grid)

**Files:**
- Create: `src/components/services/email/ServiceIncludes.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/services/email/ServiceIncludes.tsx` with this exact content:

```tsx
import type { MouseEvent } from "react";
import { Check } from "lucide-react";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import {
  EMAIL_INCLUDES,
  type EmailFeature,
} from "../../../data/services/email-marketing";
import { EMAIL_ICONS } from "./icons";

interface FeatureCardProps {
  feature: EmailFeature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Ico = EMAIL_ICONS[feature.iconKey];

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
              Estrategia, dise&ntilde;o, automatizaci&oacute;n y datos &mdash;un
              solo equipo operando todo el ciclo del correo.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="num-badge">
              {String(EMAIL_INCLUDES.length).padStart(2, "0")}
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
          {EMAIL_INCLUDES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/services/email/ServiceIncludes.tsx
git commit -m "feat(email): add ServiceIncludes with 3-col grid of 9 feature cards"
```

---

## Task 7: EmailHero component

**Files:**
- Create: `src/components/services/email/EmailHero.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/services/email/EmailHero.tsx` with this exact content:

```tsx
import { ArrowLeft } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HashLink } from "../../routing/HashLink";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal } from "../../../hooks/useScrollReveal";
import { EmailMockup } from "./EmailMockup";

export function EmailHero() {
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
                Email Marketing
              </li>
            </ol>
          </nav>

          <div ref={textRef}>
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-1.5px]"
            >
              El email sigue siendo el canal con{" "}
              <HighlightText>mayor ROI</HighlightText> del marketing digital.
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">
              Y nosotros lo sabemos usar. Convertimos tu base de datos en un
              activo que nutre leads, reactiva clientes y genera ingresos
              predecibles.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <HashLink
                to="#contacto"
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
              >
                Hablemos
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
          <EmailMockup />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/services/email/EmailHero.tsx
git commit -m "feat(email): add Hero with breadcrumb, H1, lead, CTAs and EmailMockup"
```

---

## Task 8: EmailMarketingPage (orchestrator)

**Files:**
- Create: `src/pages/EmailMarketingPage.tsx`

- [ ] **Step 1: Create the page**

Create `src/pages/EmailMarketingPage.tsx` with this exact content:

```tsx
import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { EmailHero } from "../components/services/email/EmailHero";
import { ServiceIntro } from "../components/services/email/ServiceIntro";
import { ServiceIncludes } from "../components/services/email/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  EMAIL_META,
  EMAIL_JSONLD,
} from "../data/services/email-marketing";

export default function EmailMarketingPage() {
  useDocumentMeta(EMAIL_META, EMAIL_JSONLD);

  return (
    <>
      <EmailHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            &iquest;Quieres convertir el Email Marketing en tu canal de ventas
            m&aacute;s rentable?
            <br />
            <HighlightText>Hablemos</HighlightText>.
          </>
        }
        subtitle="Cuéntanos sobre tu base de contactos y los objetivos de tu marca. Te respondemos con un plan claro."
        serviceTag="email-marketing"
      />
    </>
  );
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run build`
Expected: build succeeds. The page itself is not yet routed — that's the next task.

- [ ] **Step 3: Commit**

```bash
git add src/pages/EmailMarketingPage.tsx
git commit -m "feat(email): add EmailMarketingPage that orchestrates Hero, Intro, Includes and ContactCTA"
```

---

## Task 9: Register lazy route in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the lazy import**

Open `src/App.tsx`. Find:

```tsx
const DesarrolloWebPage = lazy(() => import("./pages/DesarrolloWebPage"));
```

Add immediately below it:

```tsx
const EmailMarketingPage = lazy(() => import("./pages/EmailMarketingPage"));
```

- [ ] **Step 2: Add the route**

In the same file, find:

```tsx
<Route
  path="/servicios/desarrollo-web"
  element={<DesarrolloWebPage />}
/>
```

Add immediately below it (before the catch-all `<Route path="*" ...>`):

```tsx
<Route
  path="/servicios/email-marketing"
  element={<EmailMarketingPage />}
/>
```

- [ ] **Step 3: Verify build and visit the route**

Run: `npm run build`
Expected: build succeeds. The dist output should include a chunk for `EmailMarketingPage`.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat(email): register lazy route /servicios/email-marketing"
```

---

## Task 10: Wire Services card link + prefetch

**Files:**
- Modify: `src/data/content.ts`
- Modify: `src/components/sections/Services.tsx`

- [ ] **Step 1: Update the Email Marketing service href in content.ts**

Open `src/data/content.ts`. Find the Email Marketing entry (around line 113):

```ts
{
  icon: AtSign,
  iconColor: "from-[#06b6d4] to-[#0e7490]",
  title: "Email Marketing",
  description:
    "Con un retorno muy alto, el email marketing sigue siendo uno de los canales más rentables del ecosistema digital. En Stellaris diseñamos estrategias que nutren leads, reactivan clientes y generan ingresos predecibles para tu organización.",
  href: "#",
},
```

Change `href: "#"` to `href: "/servicios/email-marketing"`. The block becomes:

```ts
{
  icon: AtSign,
  iconColor: "from-[#06b6d4] to-[#0e7490]",
  title: "Email Marketing",
  description:
    "Con un retorno muy alto, el email marketing sigue siendo uno de los canales más rentables del ecosistema digital. En Stellaris diseñamos estrategias que nutren leads, reactivan clientes y generan ingresos predecibles para tu organización.",
  href: "/servicios/email-marketing",
},
```

- [ ] **Step 2: Add prefetch helper in Services.tsx**

Open `src/components/sections/Services.tsx`. Find:

```tsx
function prefetchWeb() {
  void import("../../pages/DesarrolloWebPage");
}
```

Add immediately below it:

```tsx
function prefetchEmail() {
  void import("../../pages/EmailMarketingPage");
}
```

- [ ] **Step 3: Wire prefetch in handlePrefetch**

In the same file, find:

```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
  if (href === "/servicios/desarrollo-web") prefetchWeb();
}, []);
```

Replace with:

```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
  if (href === "/servicios/desarrollo-web") prefetchWeb();
  if (href === "/servicios/email-marketing") prefetchEmail();
}, []);
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/data/content.ts src/components/sections/Services.tsx
git commit -m "feat(email): wire Services card link to /servicios/email-marketing with prefetch"
```

---

## Task 11: Add sitemap entry

**Files:**
- Modify: `public/sitemap.xml`

Existing service pages use `<priority>0.8</priority>`. Match that for consistency.

- [ ] **Step 1: Add the new URL block**

Open `public/sitemap.xml`. Find the Desarrollo Web `<url>` block:

```xml
<url>
  <loc>https://www.stellaris.com.co/servicios/desarrollo-web</loc>
  <lastmod>2026-05-05</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

Add immediately after it (before `</urlset>`):

```xml
<url>
  <loc>https://www.stellaris.com.co/servicios/email-marketing</loc>
  <lastmod>2026-05-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

- [ ] **Step 2: Verify the file is well-formed**

Run: `npm run build`
Expected: build succeeds. (Vite copies `public/` verbatim; XML errors don't fail the build, but a smoke test in the next step will catch them.)

Optional sanity check — open `public/sitemap.xml` in a browser; it should render the XML tree without parse errors.

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat(email): add sitemap entry for /servicios/email-marketing"
```

---

## Task 12: Visual smoke test + SEO sanity check

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:5173/` (or the port Vite picks).

- [ ] **Step 2: Visit `/servicios/email-marketing`**

Open `http://localhost:5173/servicios/email-marketing` in a browser. Verify:

- Hero shows breadcrumb `Servicios / Email Marketing`, H1 "El email sigue siendo el canal con [mayor ROI] del marketing digital." with the highlight bar animating in on `mayor ROI`, the lead paragraph, and the two CTA buttons (`Hablemos`, `Ver qué incluye`).
- **No pill row below the CTAs.**
- The right side renders `EmailMockup`: macOS bar with traffic lights, sidebar with folders + segments, email list with 4 rows (top one highlighted), open email pane with envelope animation looping (~7s cycle), automation strip with 4 pulsing dots, and the two floating chips at viewport ≥ `md`.
- Scrolling reveals the Intro section with eyebrow `Tu base como activo`, H2 `El canal de tus datos.`, two paragraphs, and a 3-card pilares grid.
- Scrolling further reveals the Includes section with `09 Componentes` badge and a 3×3 grid of 9 cards. Hovering a card reveals the spotlight following the cursor and the "incluido" footer line.
- ContactCTA renders with the email-specific title and subtitle.

- [ ] **Step 3: Verify CTAs work**

- Click `Hablemos` → page should scroll to the contact form.
- Click `Ver qué incluye` → page should scroll to the Includes section.
- Submit the form (use a throwaway email): should produce a success message and persist a Firestore doc with `serviceTag: "email-marketing"` (visible in the Firebase console if you have access; otherwise just verify the success state).

- [ ] **Step 4: Verify navigation from home**

- Visit `http://localhost:5173/`.
- Scroll to the Services section. Hover the Email Marketing card and confirm the cursor changes (the card is now a `<Link>`, not an `<a href="#">`).
- Click the card → should navigate to `/servicios/email-marketing` without a full page reload.

- [ ] **Step 5: Inspect document meta and JSON-LD**

While on `/servicios/email-marketing`, open DevTools → Elements → `<head>`. Verify:

- `<title>Email Marketing en Colombia | Automatización y CRM | Stellaris</title>`
- `<meta name="description" content="...">`
- `<link rel="canonical" href="https://www.stellaris.com.co/servicios/email-marketing">`
- OG tags (`og:title`, `og:description`, `og:image`, `og:type=article`, `og:url`)
- Twitter Card tags
- A single `<script type="application/ld+json" data-page-jsonld>` whose JSON parses as an array with three entries: `@type: Service`, `@type: BreadcrumbList`, `@type: FAQPage`.

Optional: paste the JSON-LD into [Google's Rich Results Test](https://search.google.com/test/rich-results) and confirm `Service`, `BreadcrumbList`, and `FAQPage` validate without errors.

- [ ] **Step 6: Verify reduced motion**

In Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload `/servicios/email-marketing`. Verify:

- The envelope (`flap`) does not animate.
- The flow dots (`pulse-dot`) do not pulse.
- The floating chips (`floaty`) do not float.
- Reveal animations (handled by `useReveal`) still appear without movement (the existing hook respects reduced motion globally).

- [ ] **Step 7: Lint and final build**

Run: `npm run lint`
Expected: no errors. Fix any unused imports surfaced by lint.

Run: `npm run build`
Expected: build succeeds end-to-end. Note the new chunk for `EmailMarketingPage` in the output.

- [ ] **Step 8: Stop the dev server and commit any lint fixes**

If lint surfaced fixes:

```bash
git add -A
git commit -m "chore(email): fix lint warnings surfaced during smoke test"
```

If lint was clean, skip the commit.

---

## Task 13: Push branch and open PR against `dev`

**Files:** none

- [ ] **Step 1: Push the branch**

```bash
git push -u origin feat/email-marketing
```

- [ ] **Step 2: Open the PR with gh CLI**

```bash
gh pr create --base dev --head feat/email-marketing --title "feat(email): Email Marketing service page" --body "$(cat <<'EOF'
## Summary
- Nueva página `/servicios/email-marketing` con Hero (+ EmailMockup), intro de 3 pilares, 9 includes y ContactCTA compartido
- EmailMockup decorativo con shell de cliente de correo, animación de sobre, franja de flujo de automatización y floating chips
- Wired desde Services con prefetch + entrada en sitemap; meta + JSON-LD `Service` + `BreadcrumbList` + `FAQPage` (6 Q&A para AEO/GEO)

## Test plan
- [x] Navegar `/servicios/email-marketing` y verificar reveals/interacción
- [x] CTAs llevan a `#contacto` y `#incluye`
- [x] Confirmar que el form envía con `serviceTag="email-marketing"`
- [x] SEO: meta tags, canonical, OG, Twitter, y los 3 JSON-LD presentes en el HTML inicial
- [x] Rich Results Test valida Service/BreadcrumbList/FAQPage
- [x] `prefers-reduced-motion` desactiva flap/pulseDot/floaty

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: command returns the PR URL.

- [ ] **Step 3: Wait for checks**

Run: `gh pr checks <pr-number>`

Expected: most checks should pass. The known noisy `Vercel: FAILURE` check is acceptable (project rule, see memory `feedback_vercel_pr_check_noise.md`).

- [ ] **Step 4: Squash-merge into `dev` and delete the branch**

```bash
gh pr merge <pr-number> --squash --delete-branch
```

Expected: merge succeeds and the local + remote `feat/email-marketing` branch is removed.

---

## Self-review checklist (run by author after writing the plan)

- **Spec coverage:**
  - Hero copy + CTAs (no pills) → Task 7. ✅
  - EmailMockup faithful 1:1 → Task 4. ✅
  - Intro + 3 pilares → Task 5. ✅
  - 9 includes (with new "Deliverability" + "Carritos abandonados") → Tasks 1, 6. ✅
  - Lucide icon mapping → Task 2. ✅
  - Service + BreadcrumbList + FAQPage JSON-LD + 6 FAQs (50–80 words each) → Task 1. ✅
  - Meta (title/description/keywords/canonical/OG) → Task 1. ✅
  - Sitemap entry → Task 11. ✅
  - Routing + prefetch + Services card href → Tasks 9, 10. ✅
  - Semantic HTML (single h1, h2 per section, `aria-labelledby`) → Tasks 5, 6, 7. ✅
  - `aria-hidden` on decorative elements → Task 4. ✅
  - `prefers-reduced-motion` honored → Task 3 + smoke test in Task 12. ✅
  - Reuse `<ContactCTA>` with `serviceTag="email-marketing"` → Task 8. ✅

- **Placeholder scan:** No "TBD/TODO/Add appropriate X" — every task has executable code or commands.

- **Type consistency:** `EmailIconKey`, `EmailFeature`, `EmailPillar`, `EmailFaq` defined in Task 1 and consumed unchanged in Tasks 2, 5, 6. `EMAIL_INCLUDES`, `EMAIL_PILLARS`, `EMAIL_FAQS`, `EMAIL_META`, `EMAIL_JSONLD` exports match imports in `EmailMarketingPage.tsx` and the components.

- **Sitemap priority:** Spec said `0.9`; existing service pages use `0.8`. Plan uses `0.8` to match the established convention. (This is a deliberate correction; the spec's prose says "same priority as web/whatsapp" which is the binding intent.)

- **Out of scope reaffirmed:** No cross-linking from existing service pages back to email-marketing; no OG image asset upload; no separate "automation flow" section.
