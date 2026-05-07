# WhatsApp Marketing Page — Redesign Spec

**Date:** 2026-05-05
**Author:** Frederick Hoyos (with Claude)
**Status:** Approved for implementation
**Scope:** Rediseño visual y de contenido de la página `/servicios/whatsapp-marketing`. Reemplaza el diseño actual (publicado el 2026-05-03) con una versión más rica: Hero con CTAs y trust pills, sección de pillars "Comunicación & ventas", grid de 8 feature cards con interacción, y formulario de contacto reusado de la home. Basado en el mock HTML en `~/Downloads/whatsapp-marketing (1).html`.

---

## 1. Goals

- Reemplazar la página actual por una versión visualmente más completa que matche el mock aprobado.
- Mantener el sistema de diseño existente (Space Grotesk + DM Sans + paleta actual con purple ya disponible). Adaptar el mock al sistema, no al revés.
- Reusar el componente `ContactCTA` ya conectado a Firestore en lugar de duplicar el formulario.
- Reusar primitivos del proyecto: `useReveal` (GSAP), `HighlightText`, `Starfield`, `Container`, `HashLink`, iconos de `lucide-react`.
- Preservar SEO y accesibilidad (meta, JSON-LD, breadcrumb, semántica).
- Diff focalizado: rediseño in-place de los archivos existentes; sin renames ni reorganización.

## 2. Non-goals

- Cambios al `Navbar`, `Footer`, home u otras páginas.
- Adoptar las fuentes del mock (Sora / Inter / JetBrains Mono). Decisión: mantener la tipografía actual del sitio.
- Tocar el `ChatMockup` actual — se reusa tal cual.
- Modificar la lógica de envío del formulario (`ContactCTA` ya está bien wired a Firestore con `serviceTag`).
- Agregar nuevos schemas (FAQ, HowTo). El `Service` + `BreadcrumbList` actuales son suficientes.
- Implementar las páginas restantes de servicios (Redes Sociales, Web, Email).

---

## 3. Architecture

### 3.1 Composición de la página

`src/pages/WhatsAppMarketingPage.tsx` queda igual estructuralmente. Orquesta cuatro secciones:

```
WhatsAppHero            → presenta el servicio con CTAs + ChatMockup
ServiceIntro            → "Comunicación & ventas" + 3 pillars (rediseñada)
ServiceIncludes         → grid 4-col de 8 feature cards (rediseñada)
ContactCTA              → componente compartido importado de sections/, sin cambios
```

La llamada a `<ContactCTA>` ya pasa `titleContent`, `subtitle` y `serviceTag="whatsapp-marketing"`. No requiere cambios.

### 3.2 Reuso de primitivos

- **Animaciones**: `useReveal({ y, delay })` y `useScrollReveal({ y, stagger })` desde `src/hooks/useScrollReveal.ts`. No se introducen los `IntersectionObserver` del mock.
- **HighlightText**: `src/components/ui/HighlightText.tsx` (GSAP-based, ya alineado con la animación del mock).
- **Starfield**: `src/components/ui/Starfield.tsx` (fondo del Hero).
- **HashLink**: `src/components/routing/HashLink.tsx` para los CTA del Hero (`#contacto`, `#incluye`).
- **Iconos**: `lucide-react` para todos los iconos del mock (los SVG inline se descartan).

### 3.3 Decisión sobre WIP no commiteado

Las modificaciones sin commit en `src/components/services/whatsapp/WhatsAppHero.tsx` (que invierten texto/teléfono y extraen el breadcrumb) **se descartan** antes de comenzar. El nuevo Hero se reescribe desde cero según el mock: texto a la izquierda, teléfono a la derecha, con párrafo + CTAs + trust pills que el WIP no contemplaba.

---

## 4. File changes

### 4.1 `src/data/services/whatsapp-marketing.ts`

**Cambio de shape de `WHATSAPP_INCLUDES`** — de `readonly string[]` a:

```ts
export type WhatsAppIconKey =
  | "api" | "strategy" | "segment" | "automate"
  | "broadcast" | "crm" | "bot" | "metrics";

export interface WhatsAppFeature {
  title: string;
  description: string;
  tag: string;          // pill corto, mayúsculas
  iconKey: WhatsAppIconKey;
}

export const WHATSAPP_INCLUDES: readonly WhatsAppFeature[] = [
  { title: "WhatsApp Business API",     description: <copy del mock>, tag: "API",         iconKey: "api" },
  { title: "Estrategia de comunicación", description: <copy del mock>, tag: "Estrategia",  iconKey: "strategy" },
  { title: "Segmentación inteligente",   description: <copy del mock>, tag: "CRM",         iconKey: "segment" },
  { title: "Automatizaciones y flujos",  description: <copy del mock>, tag: "Auto",        iconKey: "automate" },
  { title: "Campañas de difusión",       description: <copy del mock>, tag: "Broadcast",   iconKey: "broadcast" },
  { title: "Integración con CRM",        description: <copy del mock>, tag: "Integración", iconKey: "crm" },
  { title: "Chatbots inteligentes",      description: <copy del mock>, tag: "IA",          iconKey: "bot" },
  { title: "Métricas y analytics",       description: <copy del mock>, tag: "Datos",       iconKey: "metrics" },
];
```

> Las cadenas `description` se transcriben textualmente desde el array `INCLUDES` del mock (`~/Downloads/whatsapp-marketing (1).html`) durante la implementación. No son placeholders sin resolver — son copy ya aprobada en el mock.

```ts
```

**Nuevo `WHATSAPP_PILLARS`** (3 elementos para el grid de "Comunicación & ventas"):

```ts
export interface WhatsAppPillar {
  title: string;
  description: string;
  iconKey: WhatsAppIconKey;
}

export const WHATSAPP_PILLARS: readonly WhatsAppPillar[] = [
  { title: "Conversaciones reales", description: "Que generan ventas y fidelizan",                          iconKey: "strategy" },
  { title: "Mensaje correcto",      description: "A la persona correcta, en el momento correcto",          iconKey: "segment" },
  { title: "WhatsApp Business API", description: "Automatizaciones inteligentes y flujos personalizados",  iconKey: "api" },
];
```

**Actualización de `WHATSAPP_JSONLD`** — el `OfferCatalog` ahora consume `entry.title`:

```ts
itemListElement: WHATSAPP_INCLUDES.map((entry, i) => ({
  "@type": "ListItem",
  position: i + 1,
  item: { "@type": "Offer", itemOffered: { "@type": "Service", name: entry.title } },
})),
```

`WHATSAPP_META` y el `BreadcrumbList` se mantienen sin cambios.

### 4.2 `src/components/services/whatsapp/WhatsAppHero.tsx`

Reescritura completa.

**Layout**: `<section>` con `<Starfield />` de fondo. Container `max-w-7xl px-[5%]`, grid `lg:grid-cols-[1.05fr_1fr] gap-14 items-center`. Mobile: stack vertical.

**Columna izquierda** (`order-1`) — dos bloques con reveal independiente:

Bloque A: **Breadcrumb** envuelto en su propio `<nav aria-label="Migas de pan">` con `useReveal({ y: 20 })` — `<HashLink to="/#servicios">‹ Servicios</HashLink>` + separador + `<span aria-current="page">WhatsApp Marketing</span>`.

Bloque B (envuelto en un `<div ref={textRef}>` con `useReveal({ y: 40 })`):
1. **H1** `id="hero-heading"`, clases `font-heading text-hero font-extrabold tracking-[-1.5px]`. Copy: *"El canal más poderoso de [HighlightText]comunicación directa[/HighlightText], al servicio de tu estrategia."*
2. **Párrafo** `text-md text-text-muted max-w-xl mt-7`. Copy: *"Convertimos WhatsApp en una máquina de conversión: estrategia, automatización y datos en un solo flujo."*
3. **CTA group** `mt-9 flex flex-wrap gap-3`:
   - Primario: `<HashLink to="#contacto">` → `gradient-bg rounded-full px-6 py-3 font-heading font-bold text-sm`, icono `ArrowRight` (lucide). Hover: `-translate-y-px shadow-[0_8px_30px_rgba(255,77,109,0.35)]`.
   - Secundario: `<a href="#incluye">` → `border border-white/10 rounded-full px-6 py-3 text-sm font-semibold`. Hover: `border-white/30 bg-white/[0.03]`.
4. **Trust pills** `mt-10 flex flex-wrap gap-4` — dos `<span class="pill">`:
   - "Meta Business Partner" con `<span class="dot" />` (verde animado).
   - "API oficial · WhatsApp Business" (sin dot).

**Columna derecha** (`order-2`): `<ChatMockup />` envuelto en `useReveal({ y: 40, delay: 0.15 })`.

### 4.3 `src/components/services/whatsapp/ServiceIntro.tsx`

Reemplazo del contenido por la sección "Comunicación & ventas" del mock.

**Wrapper**: `<section className="relative overflow-hidden">` con overlays decorativos:
- `<div className="aurora-line" />` arriba.
- `<div aria-hidden className="absolute inset-0 dot-grid opacity-40" />`.
- Dos blurs radiales: `bg-accent-purple/10` arriba-izq, `bg-accent-pink/10` abajo-der (ambos `pointer-events-none blur-3xl`).

**Header** (grid `md:grid-cols-[1fr_1.4fr] gap-16`):
- Izquierda: eyebrow *"Comunicación & ventas"* (`text-xs uppercase tracking-[2.5px] text-accent-pink` con pseudo-line) + H2 `id="pillars-heading"` *"Donde tu cliente [HighlightText]sí responde.[/HighlightText]"*.
- Derecha: dos paragraphs (las actuales, casi textuales) con `text-md md:text-lg leading-relaxed text-text-muted` y `<span class="text-text-primary">` para "conversaciones reales" y "WhatsApp Business API".

La `<section>` envolvente lleva `aria-labelledby="pillars-heading"`.

`useReveal({ y: 40 })` para todo el header.

**Pillars grid** (`mt-16 grid sm:grid-cols-3 gap-px rounded-2xl border border-white/[0.07] bg-white/[0.04] overflow-hidden`):
- Cada pillar: `<div className="relative bg-bg-primary/60 p-8 backdrop-blur-sm">`.
- Esquina superior derecha: número `0X` en `font-mono text-[10px] uppercase tracking-widest text-text-muted/50`.
- Icono Lucide en `h-11 w-11 rounded-xl border border-white/10 bg-gradient-to-br from-accent-pink/20 to-accent-purple/20`.
- Título `mt-5 font-heading text-lg font-semibold tracking-[-0.3px]`.
- Descripción `mt-1.5 text-sm leading-relaxed text-text-muted`.
- Datos: `WHATSAPP_PILLARS`.

`useScrollReveal({ y: 30, stagger: 0.1 })` aplicado al wrapper del grid.

### 4.4 `src/components/services/whatsapp/ServiceIncludes.tsx`

Rediseño del grid manteniendo `id="incluye"` (los CTAs apuntan ahí).

**Header** (`flex flex-wrap items-end justify-between gap-6 mb-14`):
- Izquierda (max-w-2xl): eyebrow *"El servicio"* + H2 `id="includes-heading"` *"¿Qué incluye [HighlightText]este servicio?[/HighlightText]"* + párrafo *"Un sistema completo —no piezas sueltas— para que WhatsApp trabaje por ti las 24 horas."*
- Derecha: `<span class="num-badge">08</span>` + texto *"Componentes / en cada implementación"*.

`useReveal({ y: 40 })` para el header.

**Grid** (`grid gap-5 sm:grid-cols-2 lg:grid-cols-4`) con `useScrollReveal({ y: 30, stagger: 0.06 })`. Cada `<article>` es una `FeatureCard` (subcomponente local en el mismo archivo, no archivo separado).

**`FeatureCard`** props: `{ feature: WhatsAppFeature, index: number }`.
- Wrapper: `<article onMouseMove={...} className="feature-card group rounded-2xl p-7 relative">`.
- `onMouseMove` setea CSS vars `--mx`, `--my` en pixeles relativos al card; el `::before` (definido en CSS global) pinta un radial gradient en esa posición. En touch no hay `mousemove` y el gradient no aparece — degradación correcta.
- Top row (`relative z-10 flex items-start justify-between`):
  - Izquierda: `<div className="ico-wrap relative grid h-12 w-12 ...">` con icono Lucide (`size={22} strokeWidth={1.6}`) + numbered badge superpuesto (`-bottom-1 -right-1 grid h-4 w-4 rounded-full gradient-bg`, contenido `font-mono text-[8px] font-bold` — número con `padStart(2, '0')`).
  - Derecha: `<span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">{feature.tag}</span>`.
- Título: `<h3 className="relative z-10 mt-5 font-heading text-[1.05rem] font-bold leading-snug">{feature.title}</h3>`.
- Descripción: `<p className="relative z-10 mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>`.
- Hairline footer (`mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-accent-pink/0 transition-colors group-hover:text-accent-pink`):
  - Texto *"incluido"* + `<span className="h-px flex-1 bg-current opacity-40" />` + icono `Check` de lucide.

### 4.5 Mapeo de `iconKey` → componente Lucide

Helper en `src/components/services/whatsapp/icons.ts` (nuevo archivo, ~15 líneas):

```ts
import { Layers3, Target, Users, Workflow, Megaphone, Database, Bot, BarChart3 } from "lucide-react";
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

Consumido por `ServiceIntro` y `ServiceIncludes` para renderizar el icono correcto a partir del `iconKey` del data.

### 4.6 `src/index.css`

Reglas nuevas (todas scoped a clases dedicadas — no afectan otras páginas):

- **`.feature-card`** + `::before` (radial gradient mouse-tracking) + `:hover` (translateY, border-color, gradient pink→purple sutil) + `.ico-wrap` rotation/scale on hover.
- **`.pill`** + `.pill .dot` (dot verde con pulse-glow reusando `@keyframes pulse-dot` existente).
- **`.num-badge`** (cuadrado redondeado con border pink, contenido mono).
- **`.aurora-line`** (1px gradient horizontal `transparent → pink → purple → transparent`).
- **`.dot-grid`** (`background-image` radial-gradient de puntos cada 22px).

Todas las reglas con `transition` respetan `@media (prefers-reduced-motion: reduce)` — siguiendo el patrón ya presente para `.typing-dot`.

---

## 5. SEO checklist

A validar antes de cerrar la implementación:

- [ ] `useDocumentMeta(WHATSAPP_META, WHATSAPP_JSONLD)` sigue invocándose en el page.
- [ ] JSON-LD: `OfferCatalog.itemListElement` produce nombres legibles (los `entry.title`); validar el HTML renderizado en https://validator.schema.org/ sin warnings.
- [ ] Un único `<h1>` en la página (Hero, `id="hero-heading"`); el resto son `<h2>` (`includes-heading` y un id para el de pillars).
- [ ] Cada `<section>` con `aria-labelledby` apuntando al id real del h2.
- [ ] Breadcrumb visible en el Hero (`<nav aria-label="Migas de pan">`) además del JSON-LD `BreadcrumbList`.
- [ ] Iconos decorativos con `aria-hidden="true"`.
- [ ] Anclas `#incluye` y `#contacto` resuelven correctamente desde los CTAs del Hero.
- [ ] Sitemap: la entrada `whatsapp-marketing` ya existe; sin cambios.

## 6. Auditoría completa

A correr cuando la implementación esté lista, antes de mergear:

- **Lighthouse** en build de producción (`npm run build && npm run preview`):
  - Performance ≥ 90 (atención al LCP — el H1 debe ser el LCP, no el `ChatMockup`).
  - Accessibility ≥ 95.
  - Best Practices ≥ 95.
  - SEO ≥ 95.
- **Core Web Vitals** (DevTools → Performance):
  - LCP < 2.5s, CLS < 0.1, INP < 200ms.
  - Verificar que las animaciones de `useReveal`/`HighlightText` no introducen CLS (animan `transform`/`opacity`, no `top`/`height`).
- **A11y automatizada**: pasada con axe DevTools — 0 violations críticas/serias.
- **Schema.org Validator**: `Service` + `BreadcrumbList` válidos sin warnings.
- **Google Rich Results Test** sobre la URL en preview — el snippet de `Service` se previsualiza correctamente.
- **Consola del navegador**: 0 errores y 0 warnings de React/GSAP en navegación normal.
- **Bundle delta**: `npm run build` antes/después; el delta debe ser despreciable (mismas dependencias, solo nuevos componentes).
- **Cross-browser smoke test**: Chrome, Firefox, Safari (iOS si está disponible) — el efecto `feature-card::before` mouse-tracking debe degradar limpiamente en touch (no hay `mousemove`, no se pinta el radial — comportamiento correcto).

## 7. Test plan (manual)

- **Visual**: comparar lado a lado el mock HTML contra `npm run dev` en breakpoints 375 / 768 / 1024 / 1280 / 1536 px.
- **Animaciones**: scroll lento top→bottom; verificar reveals en orden, sin saltos. Activar `prefers-reduced-motion: reduce` en el OS y confirmar que las animaciones se desactivan.
- **Teclado**: Tab desde el top — orden lógico, focus ring visible (gracias al `:focus-visible` global), CTAs alcanzables.
- **Hover de `.feature-card`**: el radial gradient debe seguir el cursor en desktop; en mobile no debe haber rastro de la interacción.
- **Formulario**: enviar un lead de prueba → confirmar documento en Firestore `contactRequests` con `service: "whatsapp-marketing"`.
- **Lint/Type**: `npm run lint` y `tsc --noEmit` (o el script equivalente del proyecto) sin errores.

## 8. Rollout

- Branch dedicada (probable nombre: `feat/whatsapp-redesign`).
- PR a `main` con screenshots antes/después de cada sección y checklist de SEO + auditoría completados como evidencia.
- Sin migraciones de datos, sin feature flags. Es un swap visual de una página ya en producción.

---

## 9. Open questions

Ninguna pendiente al momento de aprobación. El usuario aprobó:
- (C) Adaptar el mock al sistema de diseño actual (no adoptar Sora/Inter/JetBrains Mono ni tokens nuevos).
- Reusar `ContactCTA` compartido en lugar de duplicar el formulario.
- Aproximación A: rediseño in-place sin renames.
- Auditoría completa antes de mergear.
