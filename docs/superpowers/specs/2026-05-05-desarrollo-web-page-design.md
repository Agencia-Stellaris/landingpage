# Desarrollo Web Service Page — Design Spec

**Date:** 2026-05-05
**Author:** Frederick Hoyos (with Claude)
**Status:** Approved for implementation
**Scope:** New detail page at `/servicios/desarrollo-web` based on the reference design at `~/Downloads/desarrollo-web.html`. Third service page following the pattern established by WhatsApp Marketing (`2026-05-05-whatsapp-marketing-redesign-design.md`) and Redes Sociales (`2026-05-05-redes-sociales-page-design.md`). Adds a new animated `BrowserMockup` (browser shell + tabbed code panel + Core Web Vitals bars + floating Lighthouse / SEO badges) as the visual hero piece.

---

## 1. Goals

- Ship a high-quality, SEO-optimized detail page for the Desarrollo Web service.
- Reuse the project's existing design system (Space Grotesk + DM Sans + actual palette). Adapt the reference to existing tokens; do NOT adopt Sora/Inter/JetBrains Mono globally.
- Reuse all transversal primitives: `useReveal`, `useScrollReveal`, `HighlightText`, `Starfield`, `HashLink`, `lucide-react` icons.
- Reuse the shared `ContactCTA` (`src/components/sections/`) with `serviceTag="desarrollo-web"`. No duplicate form.
- Mirror the file layout, naming, data-file shape, and SEO posture of WhatsApp and Redes so future services (Email Marketing) can be added with the same recipe.
- Update the home `Services` grid: card "Diseño y Desarrollo Web" linkea a la nueva ruta + prefetch on hover/focus.
- Add a sitemap entry.

## 2. Non-goals

- Tocar las páginas de WhatsApp, Redes Sociales, Home u otras páginas.
- Adoptar las fuentes/tokens distintos del mock (Sora, Inter, JetBrains Mono, paleta `#0A0612`/`#0F0819`/`#140A22`). El proyecto usa Space Grotesk + DM Sans + tokens existentes.
- Implementar Email Marketing en este alcance.
- Generalizar `WhatsAppFeature` / `RedesFeature` / `WebFeature` a un tipo `ServiceFeature` compartido. YAGNI hasta el cuarto servicio.
- Producir el OG image asset `/og/desarrollo-web.jpg` (queda como TODO; lo provee diseño).
- Importar la fuente "JetBrains Mono" desde Google Fonts. Usamos el fallback de sistema (`ui-monospace, SFMono-Regular`) para evitar agregar dependencia de fuente solo para 11px de mockup.

---

## 3. Architecture

### 3.1 Composición de la página

`src/pages/DesarrolloWebPage.tsx` orquesta cuatro secciones:

```
WebHero              → presenta el servicio + CTAs + 2 pills + BrowserMockup
ServiceIntro         → "Estrategia & conversión" + 3 pillars
ServiceIncludes      → grid 3-col de 9 feature cards
ContactCTA           → componente compartido con serviceTag="desarrollo-web"
```

`useDocumentMeta(WEB_META, WEB_JSONLD)` se invoca en el page para inyectar `<head>` y JSON-LD por ruta.

### 3.2 Reuso de primitivos

- **Animaciones**: `useReveal` / `useScrollReveal` de `src/hooks/useScrollReveal.ts` (GSAP).
- **HighlightText**, **Starfield**, **HashLink** existentes.
- **Iconos**: `lucide-react` ya en deps.
- **Form**: `src/components/sections/ContactCTA.tsx` (acepta `titleContent`, `subtitle`, `serviceTag`; persiste en Firestore con `service: "desarrollo-web"`).
- **CSS utilities ya en `src/index.css`**: `.aurora-line`, `.dot-grid`, `.feature-card` (+ `.ico-wrap` interno), `.num-badge`, `.pill`, `.gradient-bg` (utility), reveals globales.

### 3.3 Routing y home

- Lazy route `<Route path="/servicios/desarrollo-web" element={<DesarrolloWebPage />} />` en `src/App.tsx` (después del de Redes, antes del wildcard).
- En `src/data/content.ts`, item "Diseño y Desarrollo Web" del array `SERVICES`: cambiar `href: "#"` → `/servicios/desarrollo-web`. Los items "Email Marketing" o equivalentes que queden con `href: "#"` siguen tal cual (fuera de alcance).
- En `src/components/sections/Services.tsx`, agregar `prefetchWeb()` y extender `handlePrefetch` con la ruta de Desarrollo Web. Sin tocar el resto.
- Sitemap: nueva `<url>` para la nueva ruta.

---

## 4. File-by-file plan

### 4.1 `src/data/services/desarrollo-web.ts` (new)

Siguiendo la forma exacta de `redes-sociales.ts`. Define:

- `type WebIconKey = "ux" | "responsive" | "seo" | "aeo" | "speed" | "crm" | "landing" | "shop" | "support"`.
- `interface WebFeature { title; description; tag; iconKey: WebIconKey }`.
- `interface WebPillar  { title; description; iconKey: WebIconKey }`.

**`WEB_INCLUDES` (9 items, copy 1:1 del reference):**

| # | Title | Description | Tag | iconKey |
|---|-------|-------------|-----|---------|
| 1 | Diseño UX/UI personalizado | Adaptado a la identidad y objetivos de tu marca, con foco en experiencia y conversión. | UX/UI | ux |
| 2 | Desarrollo responsivo | Optimizado para móviles, tabletas y escritorio. Funciona donde tu cliente esté. | Responsive | responsive |
| 3 | Optimización SEO técnica | SEO desde la construcción del sitio: estructura, semántica y rendimiento. | SEO | seo |
| 4 | Optimización AEO y GEO | Visibilidad en respuestas de IA y en búsquedas generativas, no solo en Google clásico. | AEO · GEO | aeo |
| 5 | Velocidad de carga | Core Web Vitals optimizados: páginas que cargan rápido y generan confianza. | Performance | speed |
| 6 | Integración con tu stack | CRM, herramientas de automatización y analítica web conectadas desde el lanzamiento. | Integración | crm |
| 7 | Landing pages de conversión | Landings de alta conversión diseñadas para campañas específicas. | Landings | landing |
| 8 | Tiendas online | E-commerce funcionales y optimizadas para vender, no solo para mostrar. | E-commerce | shop |
| 9 | Mantenimiento y soporte | Soporte y actualizaciones continuas para que tu sitio nunca se quede atrás. | Soporte | support |

**`WEB_PILLARS` (3 items, del reference):**

| # | Title | Description | iconKey |
|---|-------|-------------|---------|
| 1 | Atraer, convencer, convertir | Cada elemento visual y cada línea de código está pensada para ese objetivo. | ux |
| 2 | Neuromarketing + UX/UI | Combinamos principios de neuromarketing y UX/UI de vanguardia. | landing |
| 3 | SEO, AEO y GEO | Posicionamiento sólido en Google y en las búsquedas creadas por modelos de IA. | seo |

**`WEB_META: DocumentMeta`:**

```ts
{
  title: "Diseño y Desarrollo Web en Colombia | Stellaris",
  description:
    "Diseño y desarrollo web profesional: UX/UI estratégica, SEO/AEO/GEO, performance, landings y e-commerce. Sitios que atraen, convencen y convierten.",
  keywords:
    "diseño web Colombia, desarrollo web, UX/UI, SEO técnico, AEO, GEO, landing pages, e-commerce, performance web",
  canonical: "https://www.stellaris.com.co/servicios/desarrollo-web",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/desarrollo-web.jpg",
}
```

**`WEB_JSONLD`** — array con dos schemas:

1. `Service` con:
   - `serviceType: "Web Design and Development"`
   - `provider: { Organization, name: "Stellaris", url, logo }`
   - `areaServed: { Country, name: "Colombia" }`
   - `inLanguage: "es-CO"`
   - `url`, `description`
   - `hasOfferCatalog` con los 9 includes mapeados a `OfferCatalog → ListItem → Offer.itemOffered.Service.name`.
2. `BreadcrumbList`: Inicio → Servicios (`/#servicios`) → Diseño y Desarrollo Web.

### 4.2 `src/components/services/web/icons.ts` (new)

Mapeo `Record<WebIconKey, LucideIcon>`:

| iconKey | Lucide |
|---------|--------|
| ux | `LayoutGrid` |
| responsive | `Smartphone` |
| seo | `Search` |
| aeo | `Mic` |
| speed | `Gauge` |
| crm | `Database` |
| landing | `LayoutTemplate` |
| shop | `ShoppingBag` |
| support | `LifeBuoy` |

### 4.3 `src/components/services/web/WebHero.tsx` (new)

`<section id="top" className="relative overflow-hidden pt-28" aria-labelledby="hero-heading">`. Estructura idéntica al `RedesHero`:

- `<Starfield />`.
- Container `relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1fr_1.05fr] lg:pb-32 lg:pt-14`. Nota: el reference usa `[1fr_1.05fr]` (texto 1fr / mockup ligeramente más ancho), distinto a Redes que era `[1.05fr_1fr]`. Mantener el reference.
- **Columna izq**:
  - `<nav aria-label="Migas de pan">` con breadcrumb `Servicios / Diseño y Desarrollo Web` (HashLink a `/#servicios`).
  - `<h1 id="hero-heading">` con texto "Tu sitio web no es un gasto. Es tu <HighlightText>mejor vendedor</HighlightText>, siempre disponible." (la coma queda **fuera** del HighlightText, siguiendo el patrón Redes).
  - Subcopy del reference (1:1).
  - Dos CTAs HashLink, **sin** `btn-primary` shine, **sin** icon en el primario:
    - Primario → `#contacto`, label "Diagnóstico gratuito", `gradient-bg`.
    - Secundario → `#incluye`, label "Ver qué incluye", border outline.
  - **Pills** debajo de los CTAs (clase `.pill`):
    - `<span className="pill"><span className="dot" /> SEO · AEO · GEO</span>` (con dot verde, ya estilado en `.pill .dot`).
    - `<span className="pill">UX/UI · Neuromarketing</span>` (sin dot).
- **Columna der**: `<div ref={mockupRef}><BrowserMockup /></div>` con `useReveal` + delay 0.15.
- Reveals: `breadcrumbRef` (y:20), `textRef` (y:40), `mockupRef` (y:40, delay:0.15).

### 4.4 `src/components/services/web/BrowserMockup.tsx` (new)

Componente con `role="img" aria-label="Vista previa de un sitio web desarrollado por Stellaris con métricas Core Web Vitals"`. Todo el contenido interno con `aria-hidden="true"`.

**Estructura externa** (`<div className="relative mx-auto w-full">`):

- Glow radial (`pointer-events-none absolute -inset-10 -z-10 ...`).
- **Floating cards** (decorativas, `aria-hidden`, hidden md:flex):
  - **Lighthouse 98 ring** — `top-12 -left-6`, clase `.floaty`, contenido: `.lh-ring` con `style={{ "--val": 98 }}`, número "98" en verde dentro, label "Performance / Core Web Vitals".
  - **SEO bolt** — `bottom-16 -right-6`, clase `.floaty` con `style={{ animationDelay: "1.5s" }}`, icon Lucide `Zap` en chip rosa, label "SEO · AEO · GEO / listos desde el día 1".

**Browser shell** (clase `.browser-shell`):

- **Title bar** (`.browser-bar`): traffic lights (3 dots `#FF5F57`, `#FEBC2E`, `#28C840`), icon refresh (Lucide `RotateCw`), URL bar con icon lock (Lucide `Lock`) + "stellaris.com.co" + "/cliente" + caret blink (`.caret`), badge "200 OK" mono.
- **Canvas** (`.browser-canvas`):
  - **Fake site nav** (border-b): logo "M" cuadrado `gradient-bg` + "tu marca", links "Producto / Casos / Precios / Contacto" (ocultos sm:hidden), botón pill "Empezar →".
  - **Fake hero** (`.fake-hero-grad`):
    - Inner grid: `<div className="grid grid-cols-[1.3fr_minmax(0,1fr)] items-center gap-6">`. **Crítico**: `minmax(0,1fr)` evita que el `<pre>` empuje la columna derecha y comprima los botones izq.
    - **Izq**: badge "Lanzamiento" (mono uppercase), H4-equivalente "Tu mejor vendedor, siempre disponible." (pero usar `<div>` no `<h>`, para no romper la jerarquía de la página real), subcopy mini, dos botones decorativos "Ver demo" (gradient) y "Cómo funciona" (outline).
    - **Der**: panel con `min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B0712]/80 backdrop-blur`.
      - Tab bar con 3 labels `index.tsx | Hero.tsx | styles.css`. El activo (`tab === i`) lleva `bg-white/[0.06] text-white`, el resto `text-text-muted`.
      - `<pre className="code-block ...">` con switch JSX por `tab` mostrando uno de los tres snippets (idénticos al reference, con clases `.tk-key`, `.tk-tag`, `.tk-str`, `.tk-com`, `.tk-fn`).
  - **Perf bars** — grid 3-col de cards para LCP / CLS / INP:
    - LCP `1.1s`, w `88%`, color `#22D39C` (green).
    - CLS `0.02`, w `94%`, color `#7C3AED` (purple).
    - INP `140ms`, w `82%`, color `#FF4D6D` (pink).
    - Cada card: label mono uppercase + valor heading + barra `.perf-bar` con inline `style={{ "--w": w }}`.

**State + cycling**:

```tsx
const [tab, setTab] = useState<0 | 1 | 2>(0);

useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  const id = window.setInterval(
    () => setTab((t) => ((t + 1) % 3) as 0 | 1 | 2),
    3500,
  );
  return () => window.clearInterval(id);
}, []);
```

Mejora sobre el reference: respeta `prefers-reduced-motion` (no cycla, queda fijo en `index.tsx`).

### 4.5 `src/components/services/web/ServiceIntro.tsx` (new)

Idéntico estructuralmente al `ServiceIntro` de Redes:

- `<section className="relative overflow-hidden" aria-labelledby="pillars-heading">`.
- `.aurora-line`, `.dot-grid`, dos blobs blur (`-left-32 top-20` purple/10, `-right-32 bottom-10` pink/10).
- Container `relative mx-auto max-w-6xl px-[5%] py-[110px]`.
- **Header 2-col** (`grid-cols-[1fr_1.4fr]`):
  - Izq: kicker "Estrategia & conversión" (uppercase pink con dash), `<h2 id="pillars-heading">` "Sitios que <HighlightText>trabajan</HighlightText> por tu negocio."
  - Der: dos párrafos del reference (1:1) con `font-semibold text-text-primary` en las palabras clave: "atraer, convencer y convertir" en el primero, "neuromarketing, UX/UI de vanguardia y optimización técnica SEO, AEO y GEO" en el segundo.
- **Pillars grid** (3 cols, `mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3`): cada pillar con número 01/02/03, icono `WEB_ICONS[pillar.iconKey]` en un cuadrado con border + gradient bg, title heading lg, description.

Reveals: `headRef` con `useReveal({ y: 40 })`, `gridRef` con `useScrollReveal({ y: 30, stagger: 0.1 })`.

### 4.6 `src/components/services/web/ServiceIncludes.tsx` (new)

Idéntico estructuralmente al de Redes:

- `<section id="incluye" className="relative bg-bg-secondary px-[5%] py-[110px]" aria-labelledby="includes-heading">`.
- Top divider `bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent`.
- Container `mx-auto max-w-6xl`.
- **Header**: kicker "El servicio", H2 "¿Qué incluye <HighlightText>este servicio?</HighlightText>", subcopy "Un sistema completo —del diseño al deploy— para que tu sitio no solo exista: convierta.", counter `09` con `.num-badge`.
- **Grid de cards**: `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` (igual que Redes). 9 cards en 3 filas de 3 en lg.
- **`FeatureCard`**: `feature-card group relative rounded-2xl p-7` con mouse-tracking radial gradient (handler `onMouseMove` setea `--mx` y `--my` como custom props), icono Lucide en cuadrado con badge numerado, tag uppercase mono, h3 heading, description, footer "incluido — ✓" en pink/0 que aparece en hover.

Reveals: `headRef` con `useReveal({ y: 40 })`, `gridRef` con `useScrollReveal({ y: 30, stagger: 0.06 })`.

### 4.7 `src/pages/DesarrolloWebPage.tsx` (new)

```tsx
import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { WebHero } from "../components/services/web/WebHero";
import { ServiceIntro } from "../components/services/web/ServiceIntro";
import { ServiceIncludes } from "../components/services/web/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { WEB_META, WEB_JSONLD } from "../data/services/desarrollo-web";

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
            ¿Tu sitio web no está generando leads?
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

### 4.8 `src/App.tsx` (modify)

- Añadir `const DesarrolloWebPage = lazy(() => import("./pages/DesarrolloWebPage"));` después del de Redes.
- Añadir `<Route path="/servicios/desarrollo-web" element={<DesarrolloWebPage />} />` después del de Redes, antes del wildcard.

### 4.9 `src/data/content.ts` (modify)

Localizar el item del array `SERVICES` con `title: "Diseño y Desarrollo Web"` (o "Desarrollo Web", según esté escrito) y cambiar **solo** el `href` de `"#"` → `"/servicios/desarrollo-web"`. El resto del item (icon, iconColor, description) sin tocar.

### 4.10 `src/components/sections/Services.tsx` (modify)

- Agregar `function prefetchWeb() { void import("../../pages/DesarrolloWebPage"); }` después de `prefetchRedes`.
- Extender `handlePrefetch`:

```tsx
const handlePrefetch = useCallback((href: string) => {
  if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  if (href === "/servicios/redes-sociales") prefetchRedes();
  if (href === "/servicios/desarrollo-web") prefetchWeb();
}, []);
```

### 4.11 `public/sitemap.xml` (modify)

Agregar antes del cierre `</urlset>`:

```xml
  <url>
    <loc>https://www.stellaris.com.co/servicios/desarrollo-web</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
```

### 4.12 `src/index.css` (modify)

Apéndice al final del archivo después del bloque "Redes Sociales — section-scoped utilities":

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

---

## 5. SEO checklist

- **`<head>` per-page** vía `useDocumentMeta(WEB_META, WEB_JSONLD)`:
  - `<title>` = "Diseño y Desarrollo Web en Colombia | Stellaris" (~52 chars).
  - `<meta name="description">` ~155 chars con keywords primarias y secundarias.
  - `<meta name="keywords">` con términos de búsqueda relevantes.
  - `<link rel="canonical">` apuntando a `https://www.stellaris.com.co/servicios/desarrollo-web`.
  - OG type `article`, OG image `/og/desarrollo-web.jpg` (asset TODO).
- **JSON-LD** (dos bloques inyectados por `useDocumentMeta`):
  - `Service` con `provider`, `areaServed: Colombia`, `inLanguage: es-CO`, `hasOfferCatalog` listando los 9 includes.
  - `BreadcrumbList`: Inicio → Servicios → Diseño y Desarrollo Web.
- **HTML semántico**:
  - Un único `<h1>` (en el hero), `id="hero-heading"`.
  - Cada `<section>` con `aria-labelledby` apuntando al id de su `<h2>` (`pillars-heading`, `includes-heading`).
  - `<nav aria-label="Migas de pan">` en breadcrumb.
  - `<h3>` en cada feature card.
  - `BrowserMockup` con `role="img"` + `aria-label` descriptivo; todo contenido interno `aria-hidden="true"`.
  - Iconos decorativos con `aria-hidden="true"`.
- **Sitemap**: `<url>` para `/servicios/desarrollo-web` con `lastmod=2026-05-05`, `changefreq=monthly`, `priority=0.8`.
- **Heading hierarchy**: H1 → H2 (intro) → H2 (includes) → H2 (contacto, en `ContactCTA`) → H3 (cada feature card). Sin saltos.
- **Performance / CWV**:
  - Página lazy-loaded (vía `App.tsx` `lazy()`).
  - Animaciones del mockup respetan `prefers-reduced-motion`: caret, floaty, perf-bar y tab cycling se desactivan.
  - Sin imágenes pesadas; el mockup es enteramente CSS + SVG inline (Lucide).

---

## 6. Test plan (manual, post-implementation)

### 6.1 Smoke visual (`npm run dev`)

- Hero: layout texto-izq / browser-mockup-der en desktop (≥1024px), stackeado en mobile (375px). Breadcrumb "‹ Servicios / Diseño y Desarrollo Web".
- H1 con HighlightText animando solo sobre "mejor vendedor" (la coma queda fuera del bar).
- CTAs: "Diagnóstico gratuito" → scroll a `#contacto`. "Ver qué incluye" → scroll a `#incluye`.
- Pills "SEO · AEO · GEO" (con dot verde) y "UX/UI · Neuromarketing" (sin dot).
- BrowserMockup:
  - Tabs cyclan cada 3.5s entre `index.tsx`, `Hero.tsx`, `styles.css`.
  - **Crítico**: cuando el tab cambia, los botones "Ver demo" y "Cómo funciona" del lado izq **no se reducen** (test del fix de inner grid).
  - Caret pulsa en la URL bar. Perf bars (LCP, CLS, INP) animan al fill correspondiente.
  - Floating cards Lighthouse 98 + SEO bolt flotando con desfase de 1.5s. Hidden en mobile.
- ServiceIntro: header 2-col en desktop, grid de 3 pillars (Atraer convencer / Neuromarketing / SEO·AEO·GEO).
- ServiceIncludes: grid 3-col en lg, 2-col en sm, 1-col en mobile. 9 cards (3 filas × 3 cols), hover gradient siguiendo cursor + footer "incluido" en pink.
- ContactCTA: form con título "¿Tu sitio web no está generando leads?" + HighlightText sobre "Hablemos" (con punto fuera).
- `prefers-reduced-motion: reduce` desactiva: caret, floaty, perf-bar fill, tab cycling, reveals.

### 6.2 Smoke del home → desarrollo-web

- Card "Diseño y Desarrollo Web" linkea a `/servicios/desarrollo-web` al click.
- Prefetch del chunk al hover/focus (DevTools → Network → request de `DesarrolloWebPage-*.js`).

### 6.3 SEO

- DevTools → `<head>`: title, description, canonical, OG, dos JSON-LD scripts (Service + BreadcrumbList).
- Schema.org Validator: `Service` (con OfferCatalog de 9 items) + `BreadcrumbList` (3 items) sin errores.
- Google Rich Results Test: `Service` y `BreadcrumbList` detectados y elegibles.

### 6.4 Auditoría

- Lighthouse mobile (Chrome incógnito en `npm run preview` `http://localhost:4173/servicios/desarrollo-web`):
  - Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
  - LCP debe ser el H1 (no el browser canvas / caret).
  - CLS < 0.1: confirmar que perf-bar y floaty animan solo `transform`/`width`.
- axe DevTools: 0 violations críticas/serias.
- Cross-browser smoke (Chrome, Firefox, Safari si está disponible, mobile DevTools iPhone 14): conic-gradient del lh-ring, backdrop-blur del code panel, animaciones limpias.
- Bundle: chunk lazy `DesarrolloWebPage-*.js` esperado ~22–28 KB (más grande que Redes 20.64 KB porque tiene más estado / más perf bars / más floating cards / más markup en la mockup).

### 6.5 Form de contacto

- Lead de prueba en el form al final → Firestore `contactRequests` con `service: "desarrollo-web"`.

---

## 7. Rollout

- Branch: `feat/desarrollo-web`.
- Commits chunked por tarea (siguiendo el patrón Redes/WhatsApp): data file, icons helper, css, BrowserMockup, WebHero, ServiceIntro, ServiceIncludes, page wrapper, wire atómico (App + Services + content + sitemap).
- PR contra `dev` (no `main`, según convención del repo).
- Merge tras aprobación del usuario, mismo flow que PR #2.

---

## 8. Open questions / TODOs (out of scope here)

- OG image asset `/og/desarrollo-web.jpg`: lo provee diseño después del merge (si falta, OG fallback al default del sitio).
- Eventual cuarto servicio (Email Marketing): después de este, evaluar si vale la pena extraer `services/_shared/` con tipos `ServiceFeature` / `ServicePillar` genéricos. YAGNI hasta entonces.
- Investigar el deploy preview de Vercel que sigue marcando FAILURE en todos los PRs (ruido conocido del setup, no bloqueante para merges).
