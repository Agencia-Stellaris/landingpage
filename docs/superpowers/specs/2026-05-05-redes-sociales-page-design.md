# Redes Sociales Service Page — Design Spec

**Date:** 2026-05-05
**Author:** Frederick Hoyos (with Claude)
**Status:** Approved for implementation
**Scope:** New detail page at `/servicios/redes-sociales` based on the reference design at `~/Downloads/redes-sociales.html`. Replicates the architectural pattern established by the WhatsApp Marketing redesign (`docs/superpowers/specs/2026-05-05-whatsapp-marketing-redesign-design.md`). Adds a new animated `SocialMockup` (Instagram-style feed) as the visual hero piece.

---

## 1. Goals

- Ship a high-quality, SEO-optimized detail page for the Redes Sociales service.
- Reuse the project's existing design system (Space Grotesk + DM Sans + paleta actual). Adapt the mock to existing tokens, do NOT adopt Sora/Inter/JetBrains Mono globally.
- Reuse all transversal primitives: `useReveal`, `useScrollReveal`, `HighlightText`, `Starfield`, `HashLink`, `Container`, `lucide-react` icons.
- Reuse the shared `ContactCTA` (sections/) with `serviceTag="redes-sociales"`. No duplicate form.
- Mirror the file layout, naming, data-file shape, and SEO posture of the WhatsApp page so future services (Web, Email) can be added with the same recipe.
- Update the home `Services` grid to link the Redes card to the new route + prefetch on intent.
- Add a sitemap entry.

## 2. Non-goals

- Tocar la página de WhatsApp, el Home u otras páginas.
- Adoptar las fuentes/tokens distintos del mock (Sora, Inter, JetBrains Mono, paleta `#0A0612`/`#0F0819`/`#140A22`).
- Implementar Diseño Web ni Email Marketing en este alcance.
- Generalizar tipos `WhatsAppFeature`/`WhatsAppPillar` a `ServiceFeature`/`ServicePillar` compartidos. YAGNI: solo dos servicios; refactor al tercero o cuarto si vale la pena.
- Producir el OG image asset (queda como TODO; lo provee diseño).

---

## 3. Architecture

### 3.1 Composición de la página

`src/pages/RedesSocialesPage.tsx` orquesta cuatro secciones:

```
RedesHero            → presenta el servicio + CTAs + SocialMockup
ServiceIntro         → "Comunidad & contenido" + 3 pillars
ServiceIncludes      → grid 3-col de 6 feature cards
ContactCTA           → componente compartido con serviceTag="redes-sociales"
```

`useDocumentMeta(REDES_META, REDES_JSONLD)` se invoca en el page para inyectar `<head>` y JSON-LD por ruta.

### 3.2 Reuso de primitivos

- **Animaciones**: `useReveal`/`useScrollReveal` de `src/hooks/useScrollReveal.ts` (GSAP).
- **HighlightText**, **Starfield**, **HashLink**, **Container** existentes.
- **Iconos**: `lucide-react` ya en deps.
- **Form**: `src/components/sections/ContactCTA.tsx` (acepta `titleContent`, `subtitle`, `serviceTag`; persiste en Firestore con el `service` tag).

### 3.3 Routing y home

- Agregar `<Route path="/servicios/redes-sociales">` en `src/App.tsx` con import lazy.
- Actualizar el item "Redes Sociales" de `SERVICES` en `src/data/content.ts`: cambiar `href: "#"` por `href: "/servicios/redes-sociales"`.
- Extender `prefetchWhatsApp` en `src/components/sections/Services.tsx` con un `prefetchRedes` que importe la nueva page; `handlePrefetch` mapea ambos slugs.

---

## 4. File changes

### 4.1 Nuevo: `src/data/services/redes-sociales.ts`

Misma forma que `whatsapp-marketing.ts`, con:

```ts
export type RedesIconKey =
  | "strategy" | "content" | "community"
  | "ads" | "metrics" | "reputation";

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
  { title: "Estrategia de contenido", description: <copy del mock>, tag: "Estrategia",  iconKey: "strategy" },
  { title: "Producción visual y copy", description: <copy del mock>, tag: "Creativo",    iconKey: "content" },
  { title: "Community management",     description: <copy del mock>, tag: "Comunidad",   iconKey: "community" },
  { title: "Pauta paga",               description: <copy del mock>, tag: "Ads",          iconKey: "ads" },
  { title: "Métricas y reportes",      description: <copy del mock>, tag: "Datos",        iconKey: "metrics" },
  { title: "Reputación de marca",      description: <copy del mock>, tag: "Reputación",  iconKey: "reputation" },
];

export const REDES_PILLARS: readonly RedesPillar[] = [
  { title: "Comunidades reales",                          description: "Más allá de publicar contenido: relaciones que se sostienen.", iconKey: "community" },
  { title: "Narrativas que conectan",                     description: "Estrategias de contenido alineadas a tu marca y a tus objetivos.", iconKey: "strategy" },
  { title: "Conversaciones, prospectos y ventas",         description: "Cada publicación con intención: hacer crecer tu marca.", iconKey: "metrics" },
];
```

> Las cadenas `description` se transcriben textualmente desde el array `INCLUDES` del mock durante la implementación. No son placeholders sin resolver — son copy ya aprobada en el mock.

`REDES_META`:
- title: `"Gestión de Redes Sociales en Colombia | Stellaris"`
- description: estrategia + producción + community + pauta + métricas + reputación
- canonical: `https://www.stellaris.com.co/servicios/redes-sociales`
- keywords: `"gestión redes sociales, community management, social media, agencia redes sociales Colombia, content marketing, pauta digital"`
- ogType: `"article"`
- ogImage: `"https://www.stellaris.com.co/og/redes-sociales.jpg"` (asset pendiente)

`REDES_JSONLD`: array con dos objetos:
- `Service` (`name: "Gestión de Redes Sociales"`, `serviceType`, `provider`, `areaServed`, `inLanguage: "es-CO"`, `description`, `url`, `hasOfferCatalog.itemListElement: REDES_INCLUDES.map((entry, i) => ({ position: i+1, item: { "@type": "Offer", itemOffered: { "@type": "Service", name: entry.title } } }))`).
- `BreadcrumbList` con 3 items (Inicio → Servicios → Redes Sociales).

### 4.2 Nuevo: `src/components/services/redes/icons.ts`

```ts
import { Target, Image, Users, Megaphone, BarChart3, Star, type LucideIcon } from "lucide-react";
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

### 4.3 Nuevo: `src/components/services/redes/RedesHero.tsx`

Layout y comportamiento idénticos al `WhatsAppHero` final (post-iteración) — sin trust pills.

**Imports**: `ArrowLeft, ArrowRight` lucide; `Starfield`, `HashLink`, `HighlightText`; `useReveal`; `SocialMockup` local.

**Refs**: `breadcrumbRef = useReveal({ y: 20 })`; `textRef = useReveal({ y: 40 })`; `mockupRef = useReveal({ y: 40, delay: 0.15 })`.

**Estructura**:
- `<section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pt-28">` con `<Starfield />` de fondo.
- Container grid `lg:grid-cols-[1.05fr_1fr] gap-14 items-center`.
- Columna izquierda:
  1. `<nav ref={breadcrumbRef} aria-label="Migas de pan">` con `<HashLink to="/#servicios">‹ Servicios</HashLink>` / separador / `<span aria-current="page">Gestión de Redes Sociales</span>`.
  2. `<div ref={textRef}>` con:
     - `<h1 id="hero-heading" className="font-heading text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-1.5px]">`: *"Convierte tus redes en tu [HighlightText]canal más poderoso.[/HighlightText]"*.
     - `<p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">`: *"Construimos comunidades reales, narrativas que conectan y estrategias de contenido que generan conversaciones, prospectos y ventas."*.
     - CTA group `mt-9 flex flex-wrap gap-3`:
       - Primario `<HashLink to="#contacto">` con `gradient-bg rounded-full px-6 py-3 font-heading text-sm font-bold text-white ...` + texto *"Diagnóstico gratuito"* + `<ArrowRight size={16} aria-hidden />`.
       - Secundario `<HashLink to="#incluye">` con border/outline + texto *"Ver qué incluye"*.
- Columna derecha: `<div ref={mockupRef}><SocialMockup /></div>`.

**Sin trust pills** (decisión del usuario).

### 4.4 Nuevo: `src/components/services/redes/SocialMockup.tsx`

Phone mockup con feed de Instagram animado. Subcomponente local `FeedPost` (no archivo separado).

**Estructura**:
- Wrapper `<div className="relative mx-auto w-full max-w-[330px]" role="img" aria-label="Vista previa de feed de redes sociales de Stellaris">`.
- Decorative blur detrás: `<div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl" />`.
- Phone frame: `rounded-[2.4rem] border border-white/[0.08] bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)]`.
- Inner phone screen: `overflow-hidden rounded-[2rem] bg-[#0B0712]`.
  - **App header**: `flex items-center justify-between border-b border-white/[0.06] bg-[#0B0712] px-4 py-3`. Brand "stellaris." + iconos `Heart` y `Send` (ambos `aria-hidden`).
  - **Stories strip**: 5 elementos en `flex gap-3 overflow-hidden border-b border-white/[0.06] px-3 py-3`. Cada uno: `<div class="story-ring">` envolviendo un círculo `h-11 w-11 rounded-full bg-[#0B0712]` con la inicial de la etiqueta. Etiquetas: *Tienda*, *Lanzam.*, *Reel #2*, *Detrás*, *Tips*.
  - **Feed shell**: `<div className="phone-shell relative overflow-hidden">` con `<div className="feed-track">` (animación CSS) que contiene **4 `<FeedPost>`**. Plus dos máscaras gradient top/bottom (`absolute inset-x-0 h-8 from-[#0B0712]`) para fade in/out de los posts en los bordes del shell.
  - **Bottom tab bar**: `flex items-center justify-around border-t border-white/[0.06] bg-[#0B0712] px-3 py-2.5 text-white/70` con iconos `Home`, `Search`, `PlusSquare`, `Film` (Reel), `User` — todos `aria-hidden`.

**`FeedPost` props**: `{ author, handle, time, cover, caption: { title, body }, likes, comments, accent }`.

**Renderizado de un `FeedPost`** (pegado en `border-b border-white/[0.06] pb-3`):
- Header: `flex items-center gap-2.5 px-3 pt-3` con avatar (`story-ring` envolviendo círculo `h-8 w-8` + inicial), info (`<div class="text-[12px] font-semibold text-white">{author}</div>` + `<div class="text-[10px] text-white/40">{handle} · {time}</div>`), `MoreHorizontal` icono.
- Cover: `mx-3 mt-2 h-44 overflow-hidden rounded-xl ${cover} relative` (la clase `cover` es una de `grad-cover-1`, `grad-cover-2`, `grad-cover-3`, `grad-cover-4`). Con highlight superpuesto `absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]`. En la esquina inferior: `<div class="font-heading text-[15px] font-bold ...">{caption.title}</div>` + `<span class="metric-chip">` con dot blanco + `accent`.
- Actions: `mt-2 flex items-center gap-4 px-3 text-white/70`. Heart con clase `like-pulse` y color pink + count, Comment + count, Share, spacer, Bookmark.
- Caption: `mt-1.5 px-3 text-[11.5px] leading-snug text-white/70` con `<span class="font-semibold text-white">{author}</span> {caption.body}`.

**Datos de los 4 posts**: definir como `const POSTS = [...]` inline en `SocialMockup.tsx` (no en el data file central — es contenido puramente visual del mockup, no expuesto a SEO ni reusable). Transcribir literal del array de `<FeedPost>` del mock — author, handle, time, cover (`grad-cover-1` … `grad-cover-4`), captions {title, body}, likes, comments, accent.

**Iconos lucide usados en `SocialMockup`**: `Heart`, `Send`, `MoreHorizontal`, `Home`, `Search`, `PlusSquare`, `Film`, `User`, `Bookmark`, `MessageCircle` (comentario), `Share2`. Todos `aria-hidden="true"` por ser decorativos del mockup.

**Animation behavior**:
- `.feed-track` corre `feedScroll 18s ease-in-out infinite` que hace `translateY(0 → -280px → -560px → -840px → 0)` cycling cada post al top del shell.
- `Heart` icon en cada post tiene `like-pulse 4s ease-in-out infinite`.
- Ambas animaciones se desactivan bajo `prefers-reduced-motion: reduce`.

### 4.5 Nuevo: `src/components/services/redes/ServiceIntro.tsx`

Mismo layout que `whatsapp/ServiceIntro.tsx`: aurora-line top, dot-grid bg, blurs decorativos, header 2-col + grid 3-pillar.

- Eyebrow: *"Comunidad & contenido"*.
- H2 `id="pillars-heading"` (con `aria-labelledby` apuntando desde `<section>`): *"Más que [HighlightText]publicar.[/HighlightText]"* — usando overrides scoped `text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]`.
- Paragraphs derecha (con highlights inline `font-semibold text-text-primary` sobre *"comunidades reales"* en el primer p y *"contenidos estratégicos y visuales de alto impacto"* en el segundo p) — copy textual del mock.
- Grid 3-pillar (`mt-16 grid sm:grid-cols-3 gap-px ... bg-white/[0.04] rounded-2xl border ...`) mapeando `REDES_PILLARS` con icono + número `0X` + título + descripción. `useScrollReveal({ y: 30, stagger: 0.1 })`.

### 4.6 Nuevo: `src/components/services/redes/ServiceIncludes.tsx`

Mismo layout que `whatsapp/ServiceIncludes.tsx`. Diferencias:
- 6 cards (no 8), grid `sm:grid-cols-2 lg:grid-cols-3` (no `lg:grid-cols-4`).
- `id="incluye"`, `aria-labelledby="includes-heading"`.
- Eyebrow *"El servicio"* + H2 *"¿Qué incluye [HighlightText]este servicio?[/]"* + párrafo *"Un sistema editorial completo para que cada publicación trabaje a favor de tu marca."*.
- Badge derecho `<span class="num-badge">{String(REDES_INCLUDES.length).padStart(2, "0")}</span>` (renderiza "06") + label *"Componentes / en cada implementación"*.
- `FeatureCard` local, idéntico al de WhatsApp pero consumiendo `RedesFeature` y `REDES_ICONS`.

### 4.7 Nuevo: `src/pages/RedesSocialesPage.tsx`

```tsx
import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { RedesHero } from "../components/services/redes/RedesHero";
import { ServiceIntro } from "../components/services/redes/ServiceIntro";
import { ServiceIncludes } from "../components/services/redes/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { REDES_META, REDES_JSONLD } from "../data/services/redes-sociales";

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
            <HighlightText>Solicita un diagn&oacute;stico gratuito</HighlightText>
          </>
        }
        subtitle="Descubre el potencial oculto que tiene tu marca. Déjanos tus datos y preparamos un análisis sin compromiso."
        serviceTag="redes-sociales"
      />
    </>
  );
}
```

### 4.8 Modificación: `src/App.tsx`

- Agregar import lazy: `const RedesSocialesPage = lazy(() => import("./pages/RedesSocialesPage"));`.
- Agregar `<Route path="/servicios/redes-sociales" element={<RedesSocialesPage />} />` antes del wildcard.

### 4.9 Modificación: `src/data/content.ts`

Cambiar el item `Redes Sociales` de `SERVICES`: `href: "#"` → `href: "/servicios/redes-sociales"`. Sin cambios al resto del array.

### 4.10 Modificación: `src/components/sections/Services.tsx`

Agregar `prefetchRedes` análogo a `prefetchWhatsApp`, y extender `handlePrefetch` para mapear ambos slugs:

```ts
function prefetchRedes() {
  void import("../../pages/RedesSocialesPage");
}

const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
}, []);
```

### 4.11 Modificación: `public/sitemap.xml`

Agregar `<url>` con `<loc>https://www.stellaris.com.co/servicios/redes-sociales</loc>`, `<lastmod>2026-05-05</lastmod>`, `<changefreq>monthly</changefreq>`, `<priority>0.8</priority>`.

### 4.12 Modificación: `src/index.css`

Apéndice al final, scoped a clases dedicadas:

- **`.phone-shell`**: alias semántico, `height: 560px`. (`.chat-shell` actual queda intacto.)
- **`.story-ring`**: `padding: 2px; border-radius: 9999px; background: conic-gradient(from 220deg, #FF4D6D, #7C3AED, #F59E0B, #FF4D6D);`.
- **`.metric-chip`**: `display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.25rem 0.55rem; border-radius: 9999px; background: rgba(255,255,255,0.06); font-family: ui-monospace, ...; font-size: 0.68rem; color: var(--color-text-primary);`.
- **`.grad-cover-1`**: `background: linear-gradient(135deg, #FF4D6D 0%, #7C3AED 100%);`.
- **`.grad-cover-2`**: `background: linear-gradient(135deg, #22D39C 0%, #0EA5E9 100%);`.
- **`.grad-cover-3`**: `background: linear-gradient(135deg, #F59E0B 0%, #FF4D6D 100%);`.
- **`.grad-cover-4`**: `background: linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%);`.
- **`@keyframes feedScroll`**: 0%, 12% → translateY(0); 24%, 38% → translateY(-280px); 50%, 64% → translateY(-560px); 76%, 90% → translateY(-840px); 100% → translateY(0). `.feed-track { animation: feedScroll 18s ease-in-out infinite; }`.
- **`@keyframes likePulse`**: 0%, 70%, 100% → scale(1); 78% → scale(1.35); 86% → scale(0.95). `.like-pulse { animation: likePulse 4s ease-in-out infinite; transform-origin: center; }`.
- **Reduced-motion override**: `@media (prefers-reduced-motion: reduce) { .feed-track, .like-pulse { animation: none; } }`. Cuando la animación está desactivada, `.feed-track` queda en `translateY(0)` (estado inicial), mostrando solo el primer post; el resto del shell queda visible pero sin scroll automático.

---

## 5. SEO checklist

- [ ] `useDocumentMeta(REDES_META, REDES_JSONLD)` en `RedesSocialesPage`.
- [ ] JSON-LD `OfferCatalog.itemListElement` produce `entry.title`s legibles; validar en https://validator.schema.org/ sin warnings.
- [ ] Único `<h1>` por página (Hero, `id="hero-heading"`); h2s en pillars (`id="pillars-heading"`), includes (`id="includes-heading"`) y ContactCTA.
- [ ] Cada `<section>` con `aria-labelledby` apuntando al id real del h2.
- [ ] Breadcrumb visible en el Hero + `BreadcrumbList` JSON-LD.
- [ ] Iconos decorativos con `aria-hidden="true"`.
- [ ] Anclas `#incluye` y `#contacto` resuelven correctamente desde los CTAs (gracias al fix de `HashLink` que trata hash-only como same-page).
- [ ] Sitemap actualizado.

## 6. Auditoría completa

A correr antes de mergear:
- **Lighthouse mobile** sobre `npm run build && npm run preview`: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1, INP < 200ms. Vigilar que `feed-track`/`like-pulse` no introduzcan CLS (animan `transform`, no layout).
- **axe DevTools**: 0 violations críticas/serias.
- **Schema.org Validator**: `Service` + `BreadcrumbList` válidos.
- **Google Rich Results Test**: snippet de `Service` se previsualiza correctamente.
- **Consola**: 0 errores y 0 warnings.
- **Bundle**: `npm run build` — el chunk de `RedesSocialesPage` debe quedar en rango similar al de WhatsApp (~21KB).
- **Cross-browser**: Chrome, Firefox, Safari (mac/iOS si está disponible). El feed-track debe loop limpio; el `feature-card` mouse-tracking debe degradar bien en touch.

## 7. Test plan (manual)

- **Visual**: comparar el mock contra `npm run dev` en breakpoints 375 / 768 / 1024 / 1280 / 1536 px.
- **Animaciones**: scroll lento; reveals en orden, sin saltos. Activar `prefers-reduced-motion: reduce` y confirmar que feed-track + like-pulse + reveals + HighlightText quedan estáticos.
- **Teclado**: Tab desde el top; orden lógico, focus ring visible.
- **CTA "Diagnóstico gratuito"**: scrollea suave a `#contacto` (form en la misma página).
- **CTA "Ver qué incluye"**: scrollea suave a `#incluye`.
- **Breadcrumb "Servicios"**: navega a `/#servicios` (home → sección de servicios).
- **Servicios card del home**: linkea a `/servicios/redes-sociales`; al hover/focus el chunk se prefetchea.
- **Form**: submit de prueba aterriza en Firestore `contactRequests` con `service: "redes-sociales"`.
- **Lint/Type**: `npm run lint` y `npx tsc --noEmit` sin errores.

## 8. Rollout

- Branch dedicada: `feat/redes-sociales`.
- PR a `dev` con screenshots antes/después del slot del home (donde el card cambia de href) + capturas de cada sección + checklist de auditoría.
- Sin migraciones de datos, sin feature flags. Activación inmediata al merge.

---

## 9. Open questions

Ninguna pendiente al momento de aprobación. El usuario aprobó:
- Aproximación A: replicar el patrón WhatsApp.
- Sin trust pills en el Hero.
- Slug `/servicios/redes-sociales`.
- Reuso del `ContactCTA` compartido con `serviceTag="redes-sociales"`.
- Tokens locales scoped (no adoptar Sora/Inter/JetBrains Mono).
