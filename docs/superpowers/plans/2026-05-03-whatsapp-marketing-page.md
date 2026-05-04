# WhatsApp Marketing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a new SPA route at `/servicios/whatsapp-marketing` that mirrors the reference design (`~/Downloads/whatsapp-marketing.html`) using the existing project design system, with full SEO, accessibility, and responsive coverage.

**Architecture:** Add `react-router-dom@7` with a layout-route that keeps `Navbar`, `Footer`, and `SmoothScroll` persistent. Extract the current home content into `HomePage`, add `WhatsAppMarketingPage` as a lazy route. Reuse `Container`, `SectionHeader`, `HighlightText`, `Starfield`, `useReveal`, and a refactored `ContactCTA` (now accepting optional copy props + `serviceTag`). Manage `<head>` per page with a tiny custom hook (`useDocumentMeta`) — no extra deps. Inject JSON-LD `Service` + `BreadcrumbList`. Build the chat mockup as a self-contained component that respects `prefers-reduced-motion` and only animates while in the viewport.

**Tech Stack:** React 19, TypeScript 5.9, Vite 8, Tailwind 4 (CSS-first config in `src/index.css`), GSAP + Lenis (already installed), `react-router-dom@^7` (new), Firebase Firestore (already wired in `ContactCTA`).

**Note on testing:** This project has no test framework (no vitest/jest in `package.json`) and the changes are 100% UI/integration. Per YAGNI we do **not** introduce a test harness for this feature. Each task uses a "Verify" step combining type checking (`npm run build` invokes `tsc -b`), linting (`npm run lint`), and explicit manual browser steps (`npm run dev`). Lighthouse and rich results validation are listed in the final task.

**Note on package manager:** The project has both `package-lock.json` and `pnpm-lock.yaml`. Plan uses `npm` commands; `pnpm` equivalents (`pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm build`) work identically.

---

## File map (locked in before tasks)

### New files

| Path | Responsibility |
|---|---|
| `src/components/routing/HashLink.tsx` | Anchor-aware link that works from any route |
| `src/components/routing/ScrollToTop.tsx` | Resets scroll on `pathname` change |
| `src/contexts/LenisContext.tsx` | Exposes the Lenis instance to descendants |
| `src/hooks/useDocumentMeta.ts` | Mutates `<head>` + JSON-LD on mount, restores on unmount |
| `src/pages/HomePage.tsx` | Extracted home content; consumes `location.hash` |
| `src/pages/WhatsAppMarketingPage.tsx` | WhatsApp page orchestrator |
| `src/components/services/whatsapp/ChatMockup.tsx` | Animated WhatsApp chat preview |
| `src/components/services/whatsapp/WhatsAppHero.tsx` | Hero with breadcrumb + h1 + ChatMockup |
| `src/components/services/whatsapp/ServiceIntro.tsx` | Eyebrow + 2 narrative paragraphs |
| `src/components/services/whatsapp/ServiceIncludes.tsx` | 8-item ordered grid |
| `src/data/services/whatsapp-marketing.ts` | Page content + meta + JSON-LD |

### Modified files

| Path | Change summary |
|---|---|
| `package.json` | + `react-router-dom@^7` |
| `src/index.css` | + `--color-wa-green` token |
| `src/App.tsx` | Wrap in `BrowserRouter` + `Routes`; lift Navbar/Footer/SmoothScroll above; lazy-load pages |
| `src/components/layout/SmoothScroll.tsx` | Provide Lenis via `LenisContext` |
| `src/components/sections/ContactCTA.tsx` | Optional props (`label`, `title`, `titleContent`, `subtitle`, `serviceTag`); save `service` field on Firestore docs |
| `src/components/sections/Services.tsx` | Use `Link` for non-`#` hrefs; prefetch chunk on hover/focus |
| `src/components/layout/Navbar.tsx` | Anchor `<a>`s migrated to `HashLink` |
| `src/components/layout/Footer.tsx` | Anchors → `HashLink`; WhatsApp service link → `Link` to new route |
| `src/data/content.ts` | `SERVICES[0].href = "/servicios/whatsapp-marketing"` |
| `public/sitemap.xml` | Append new URL entry |

---

## Task 1 — Install react-router-dom and add the wa-green color token

**Files:**
- Modify: `package.json`
- Modify: `src/index.css:11-36` (`@theme` block)

- [ ] **Step 1: Install dependency**

```bash
npm install react-router-dom@^7
```

Expected: `react-router-dom` and `@types/react-router-dom` (transitive) added; lockfile updated; no peer-dep warnings.

- [ ] **Step 2: Verify install succeeded**

```bash
npm ls react-router-dom
```

Expected output contains `react-router-dom@7.x.x`.

- [ ] **Step 3: Add `--color-wa-green` token to the Tailwind theme**

Edit `src/index.css`. Inside the `@theme { … }` block, after `--color-accent-green: #22c55e;`, add the line:

```css
  --color-wa-green: #25d366;
```

Final fragment of the colors block should look like:

```css
  --color-accent-green: #22c55e;
  --color-wa-green: #25d366;
  --color-text-primary: #f0f0f8;
```

- [ ] **Step 4: Verify the token compiles**

```bash
npm run build
```

Expected: build succeeds. Exit code 0. (We do not need the dev server running yet; this only checks the CSS+TS toolchain.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json pnpm-lock.yaml src/index.css
git commit -m "chore: add react-router-dom and wa-green color token"
```

---

## Task 2 — Provide Lenis via React Context (refactor SmoothScroll)

**Goal:** Allow `HashLink` and `ScrollToTop` to access the Lenis instance without breaking the SmoothScroll public API.

**Files:**
- Create: `src/contexts/LenisContext.tsx`
- Modify: `src/components/layout/SmoothScroll.tsx`

- [ ] **Step 1: Create the context module**

Create `src/contexts/LenisContext.tsx` with this exact content:

```tsx
import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
```

- [ ] **Step 2: Wire SmoothScroll to provide the instance**

Replace the entire body of `src/components/layout/SmoothScroll.tsx` with:

```tsx
import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "../../contexts/LenisContext";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
```

- [ ] **Step 3: Verify type check + build still passes**

```bash
npm run build
```

Expected: build succeeds, no TS errors.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

Open `http://localhost:5173/`, scroll the page with mouse wheel and trackpad. Smooth scroll should still feel identical to before. Stop the dev server (`Ctrl+C`).

- [ ] **Step 5: Commit**

```bash
git add src/contexts/LenisContext.tsx src/components/layout/SmoothScroll.tsx
git commit -m "refactor(SmoothScroll): expose Lenis instance via context"
```

---

## Task 3 — Create ScrollToTop and HashLink primitives

**Files:**
- Create: `src/components/routing/ScrollToTop.tsx`
- Create: `src/components/routing/HashLink.tsx`

- [ ] **Step 1: Create ScrollToTop**

Create `src/components/routing/ScrollToTop.tsx`:

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../contexts/LenisContext";

/**
 * Resets scroll to top whenever the route pathname changes.
 * If a hash is present, leaves it for HomePage's hash-scroll effect to handle.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  return null;
}
```

- [ ] **Step 2: Create HashLink**

Create `src/components/routing/HashLink.tsx`:

```tsx
import { useCallback, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "../../contexts/LenisContext";

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Target like "/#servicios" or "/#contacto". */
  to: string;
}

/**
 * Anchor that works from any route. If the user is already on `/`, it scrolls
 * to the hash via Lenis. Otherwise it navigates to `/#hash` and HomePage's
 * hash-scroll effect handles the scroll on mount.
 */
export function HashLink({ to, onClick, children, ...rest }: HashLinkProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      const hashIndex = to.indexOf("#");
      if (hashIndex === -1) return;
      const hash = to.slice(hashIndex);
      const targetPath = to.slice(0, hashIndex) || "/";

      if (pathname === targetPath) {
        const el = document.querySelector(hash);
        if (el && lenis) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: 0 });
          onClick?.(e);
          return;
        }
      }

      e.preventDefault();
      navigate(to);
      onClick?.(e);
    },
    [to, pathname, navigate, lenis, onClick],
  );

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
```

- [ ] **Step 3: Verify type check**

```bash
npm run build
```

Expected: success. Note: these components are not yet rendered anywhere; this only validates types compile.

- [ ] **Step 4: Commit**

```bash
git add src/components/routing/ScrollToTop.tsx src/components/routing/HashLink.tsx
git commit -m "feat(routing): add ScrollToTop and HashLink primitives"
```

---

## Task 4 — Extract HomePage from App.tsx and set up the router

**Goal:** Make the home keep working exactly as today, but inside a `BrowserRouter` + `Routes` shell. No WhatsApp page yet (that comes in Task 11).

**Files:**
- Create: `src/pages/HomePage.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create HomePage from the current App body**

Create `src/pages/HomePage.tsx`:

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/sections/Hero";
import { Stats } from "../components/sections/Stats";
import { AboutUs } from "../components/sections/AboutUs";
import { Services } from "../components/sections/Services";
import { WhyUs } from "../components/sections/WhyUs";
import { Process } from "../components/sections/Process";
import { ContactCTA } from "../components/sections/ContactCTA";
import { useLenis } from "../contexts/LenisContext";

export default function HomePage() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    // Wait one frame so layout is settled (chunks lazily mounted, etc).
    const id = requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
      else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [hash, lenis]);

  return (
    <>
      <Hero />
      <Stats />
      <AboutUs />
      <Services />
      <WhyUs />
      <Process />
      <ContactCTA />
    </>
  );
}
```

- [ ] **Step 2: Replace App.tsx**

Replace the entire `src/App.tsx` with:

```tsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./lib/firebase"; // Initialize Firebase + Analytics
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { ScrollToTop } from "./components/routing/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />

        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-link">
          Ir al contenido principal
        </a>

        <Navbar />

        <main id="main-content">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
```

- [ ] **Step 3: Type check + build**

```bash
npm run build
```

Expected: success. The build creates a separate chunk for `HomePage` (code splitting working).

- [ ] **Step 4: Manual smoke test of the home page**

```bash
npm run dev
```

In a browser at `http://localhost:5173/`:
1. Verify the home renders identically to before (Hero, Stats, About, Services, WhyUs, Process, ContactCTA).
2. Click the navbar links (`Inicio`, `Servicios`, `Nosotros`, `Contacto`) — they still scroll because they are plain `#anchor` `<a>` tags (HashLink migration is Task 12).
3. Type `http://localhost:5173/anything-bogus` in the address bar — verify it redirects to `/`.
4. Open devtools → Network → reload. Confirm `HomePage-*.js` is its own chunk.

Stop the dev server (`Ctrl+C`).

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.tsx src/App.tsx
git commit -m "feat(routing): introduce BrowserRouter and extract HomePage"
```

---

## Task 5 — Refactor ContactCTA with optional props and Firestore service tag

**Files:**
- Modify: `src/components/sections/ContactCTA.tsx`

- [ ] **Step 1: Replace the component with the prop-driven version**

Replace the entire `src/components/sections/ContactCTA.tsx` with:

```tsx
import { type FormEvent, type ReactNode, useCallback, useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { CONTACT } from "../../data/content";
import { Phone, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useReveal } from "../../hooks/useScrollReveal";

const inputStyles =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-pink/40";

const contentReveal = { y: 50 };

type FormStatus = "idle" | "sending" | "success" | "error";

interface ContactCTAProps {
  label?: string;
  title?: string;
  titleContent?: ReactNode;
  subtitle?: string;
  serviceTag?: string;
}

export function ContactCTA({
  label = "Contacto",
  title = "¿Listo para crecer juntos?",
  titleContent,
  subtitle = "¡Déjanos tus datos! Cuéntanos sobre tu negocio y te prepararemos una propuesta personalizada sin compromiso.",
  serviceTag = "home",
}: ContactCTAProps = {}) {
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useReveal<HTMLDivElement>(contentReveal);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form || status === "sending") return;

      setStatus("sending");
      const data = new FormData(form);

      try {
        await addDoc(collection(db, "contactRequests"), {
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          service: serviceTag,
          createdAt: serverTimestamp(),
        });
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    },
    [status, serviceTag],
  );

  return (
    <Container id="contacto" alternate className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(124,58,237,0.15)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-lg text-center">
        <SectionHeader
          label={label}
          title={titleContent ? undefined : title}
          titleContent={titleContent}
          subtitle={subtitle}
          centered
        />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 text-left"
          aria-label="Formulario de contacto"
        >
          <div>
            <label htmlFor="cta-name" className="mb-1.5 block text-sm font-medium">
              Nombre
            </label>
            <input
              id="cta-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Tu nombre completo"
              className={inputStyles}
            />
          </div>

          <div>
            <label htmlFor="cta-email" className="mb-1.5 block text-sm font-medium">
              Correo electr&oacute;nico
            </label>
            <input
              id="cta-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className={inputStyles}
            />
          </div>

          <div>
            <label htmlFor="cta-message" className="mb-1.5 block text-sm font-medium">
              Mensaje
            </label>
            <textarea
              id="cta-message"
              name="message"
              required
              rows={4}
              placeholder="Cu&eacute;ntanos sobre tu proyecto..."
              className={`${inputStyles} resize-none`}
            />
          </div>

          <div className="flex items-start gap-2.5">
            <input
              id="cta-terms"
              name="terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-border bg-surface checked:border-accent-pink checked:bg-accent-pink"
            />
            <label htmlFor="cta-terms" className="cursor-pointer text-sm text-text-muted">
              Acepto los{" "}
              <a
                href="#"
                className="font-medium text-accent-pink underline underline-offset-2 hover:text-text-primary"
              >
                t&eacute;rminos y condiciones
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-bg px-7 py-3.5 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:opacity-90 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Enviar mensaje
              </>
            )}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm font-medium text-accent-green">
              <CheckCircle2 size={16} />
              Mensaje enviado. Nos pondremos en contacto pronto.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-accent-pink">
              Hubo un error. Por favor, int&eacute;ntalo de nuevo.
            </p>
          )}
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <a
            href={`https://wa.me/${CONTACT.phone.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-pink"
          >
            <Phone size={16} aria-hidden="true" />
            {CONTACT.phone}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-pink"
          >
            <Mail size={16} aria-hidden="true" />
            {CONTACT.email}
          </a>
        </div>
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Type check + build**

```bash
npm run build
```

Expected: success.

- [ ] **Step 3: Manual smoke test on the home**

```bash
npm run dev
```

At `http://localhost:5173/`:
1. Scroll to the contact section — verify title, subtitle, fields look identical to before.
2. (Optional, skip if you don't want a real Firestore write) Submit a test message; in Firestore console verify the doc has `service: "home"`.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ContactCTA.tsx
git commit -m "refactor(ContactCTA): accept optional copy props and persist serviceTag"
```

---

## Task 6 — Create the useDocumentMeta hook

**Files:**
- Create: `src/hooks/useDocumentMeta.ts`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useDocumentMeta.ts` with this exact content:

```ts
import { useEffect } from "react";

export interface DocumentMeta {
  title: string;
  description: string;
  keywords?: string;
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

type JsonLd = Record<string, unknown>;

const JSON_LD_ATTR = "data-page-jsonld";

function ensureMeta(selector: string, create: () => HTMLMetaElement | HTMLLinkElement): {
  el: HTMLMetaElement | HTMLLinkElement;
  prev: string | null;
  created: boolean;
} {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  let created = false;
  if (!el) {
    el = create();
    document.head.appendChild(el);
    created = true;
  }
  const attr = el.tagName === "LINK" ? "href" : "content";
  return { el, prev: el.getAttribute(attr), created };
}

function setAttr(el: Element, attr: string, value: string) {
  el.setAttribute(attr, value);
}

/**
 * Mutates document head tags (title, description, canonical, OG, Twitter) and
 * optionally injects JSON-LD. Restores previous values on unmount so navigation
 * back to the home page keeps the original tags intact.
 */
export function useDocumentMeta(meta: DocumentMeta, jsonLd?: JsonLd[] | JsonLd) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = meta.title;

    const restorers: Array<() => void> = [() => (document.title = prevTitle)];

    const apply = (
      selector: string,
      create: () => HTMLMetaElement | HTMLLinkElement,
      attr: "content" | "href",
      value: string | undefined,
    ) => {
      if (value === undefined) return;
      const { el, prev, created } = ensureMeta(selector, create);
      setAttr(el, attr, value);
      restorers.push(() => {
        if (created) {
          el.remove();
        } else if (prev !== null) {
          setAttr(el, attr, prev);
        }
      });
    };

    apply(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      "content",
      meta.description,
    );

    if (meta.keywords !== undefined) {
      apply(
        'meta[name="keywords"]',
        () => Object.assign(document.createElement("meta"), { name: "keywords" }),
        "content",
        meta.keywords,
      );
    }

    apply(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      meta.canonical,
    );

    const og = (prop: string, value: string | undefined) =>
      apply(
        `meta[property="${prop}"]`,
        () => {
          const el = document.createElement("meta");
          el.setAttribute("property", prop);
          return el;
        },
        "content",
        value,
      );

    og("og:title", meta.ogTitle ?? meta.title);
    og("og:description", meta.ogDescription ?? meta.description);
    og("og:url", meta.ogUrl ?? meta.canonical);
    og("og:type", meta.ogType ?? "article");
    og("og:image", meta.ogImage);

    const tw = (name: string, value: string | undefined) =>
      apply(
        `meta[name="${name}"]`,
        () => Object.assign(document.createElement("meta"), { name }),
        "content",
        value,
      );

    tw("twitter:title", meta.twitterTitle ?? meta.title);
    tw("twitter:description", meta.twitterDescription ?? meta.description);
    tw("twitter:image", meta.twitterImage ?? meta.ogImage);

    // JSON-LD
    const jsonLdNodes: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const node = document.createElement("script");
        node.type = "application/ld+json";
        node.setAttribute(JSON_LD_ATTR, "true");
        node.textContent = JSON.stringify(item);
        document.head.appendChild(node);
        jsonLdNodes.push(node);
      }
      restorers.push(() => jsonLdNodes.forEach((n) => n.remove()));
    }

    return () => {
      // Run restorers in reverse so adds undo before sets.
      for (let i = restorers.length - 1; i >= 0; i--) restorers[i]();
    };
  }, [meta, jsonLd]);
}
```

- [ ] **Step 2: Type check**

```bash
npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useDocumentMeta.ts
git commit -m "feat: add useDocumentMeta hook for per-page SEO head management"
```

---

## Task 7 — Create the WhatsApp page content data module

**Files:**
- Create: `src/data/services/whatsapp-marketing.ts`

- [ ] **Step 1: Create the data module**

Create `src/data/services/whatsapp-marketing.ts`:

```ts
import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export const WHATSAPP_INCLUDES: readonly string[] = [
  "Configuración y optimización de WhatsApp Business API.",
  "Estrategia de comunicación y flujos de conversación personalizados.",
  "Segmentación de la base de contactos según intereses, interacción y otros factores.",
  "Automatización de respuestas y secuencias de seguimiento.",
  "Campañas de difusión segmentadas por perfil de cliente.",
  "Integración con CRM para gestión de leads y seguimiento comercial.",
  "Chatbots inteligentes para atención 24/7.",
  "Métricas de entrega, apertura y conversión.",
];

export const WHATSAPP_META: DocumentMeta = {
  title: "WhatsApp Marketing en Colombia | Stellaris",
  description:
    "Estrategia de WhatsApp Marketing con Business API, automatizaciones, segmentación, campañas de difusión y chatbots. Convertimos conversaciones en ventas.",
  keywords:
    "WhatsApp Marketing, WhatsApp Business API, automatización WhatsApp, marketing conversacional, agencia WhatsApp Colombia",
  canonical: "https://www.stellaris.com.co/servicios/whatsapp-marketing",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/whatsapp-marketing.jpg",
};

export const WHATSAPP_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WhatsApp Marketing",
    serviceType: "WhatsApp Marketing",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    description:
      "Estrategias de WhatsApp Marketing con WhatsApp Business API, automatizaciones, segmentación y campañas de difusión para empresas en Colombia.",
    url: "https://www.stellaris.com.co/servicios/whatsapp-marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: WHATSAPP_INCLUDES.map((name, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.stellaris.com.co/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://www.stellaris.com.co/#servicios",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "WhatsApp Marketing",
        item: "https://www.stellaris.com.co/servicios/whatsapp-marketing",
      },
    ],
  },
];
```

- [ ] **Step 2: Type check**

```bash
npm run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/data/services/whatsapp-marketing.ts
git commit -m "feat(content): add whatsapp-marketing page data, meta, and JSON-LD"
```

---

## Task 8 — Build the ChatMockup component

**Files:**
- Create: `src/components/services/whatsapp/ChatMockup.tsx`

- [ ] **Step 1: Create the ChatMockup component**

Create `src/components/services/whatsapp/ChatMockup.tsx`:

```tsx
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Phone, Send } from "lucide-react";
import isologo from "../../../assets/logo/stellaris_Isologo.png";

const TOTAL_STEPS = 6;
const STEP_DELAYS = [600, 1500, 1100, 1400, 1300, 2200];

export function ChatMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Respect reduced-motion: render the final state and never start the loop.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(TOTAL_STEPS - 1);
      setAnimate(false);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setAnimate(e.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;
    let cancel = false;
    let i = 0;
    const tick = () => {
      if (cancel) return;
      setStep((s) => (s + 1) % TOTAL_STEPS);
      i++;
      const delay = STEP_DELAYS[i % STEP_DELAYS.length];
      window.setTimeout(tick, delay);
    };
    const id = window.setTimeout(tick, 800);
    return () => {
      cancel = true;
      window.clearTimeout(id);
    };
  }, [animate]);

  const show = (n: number) => step >= n;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Vista previa de conversación de WhatsApp con Stellaris"
      className="relative mx-auto w-full max-w-[320px]"
    >
      <div
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.32),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="rounded-[2.4rem] border border-white/[0.08] bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)]">
        <div className="overflow-hidden rounded-[2rem] bg-[#0E1A14]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#1F2C2A] px-4 py-3" aria-hidden="true">
            <ArrowLeft size={16} className="text-white/70" />
            <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full gradient-bg">
              <img src={isologo} alt="" className="h-6 w-6" width={24} height={24} />
            </div>
            <div className="flex-1">
              <div className="font-heading text-sm font-semibold text-white">Stellaris</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                en línea
              </div>
            </div>
            <Phone size={16} className="text-white/70" />
          </div>

          {/* Body */}
          <div
            className="min-h-[340px] space-y-2.5 bg-[#0E1A14] bg-[radial-gradient(circle_at_20%_10%,rgba(37,211,102,0.06),transparent_50%)] px-3 py-4 text-[13px] leading-snug"
            aria-hidden="true"
          >
            <div className="text-center text-[10px] uppercase tracking-wider text-white/30">
              hoy
            </div>

            {show(0) && (
              <div className="flex">
                <div className="bubble-in relative max-w-[78%] rounded-2xl rounded-bl-md bg-[#202C2B] px-3 py-2 text-white/90">
                  Hola 👋 Vi que dejaste tus datos. ¿Te cuento cómo podemos ayudarte?
                  <div className="mt-1 text-right text-[10px] text-white/40">10:24</div>
                </div>
              </div>
            )}

            {show(1) && (
              <div className="flex justify-end">
                <div className="bubble-out relative max-w-[78%] rounded-2xl rounded-br-md bg-[#155E50] px-3 py-2 text-white">
                  Sí, claro. Cuéntame.
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-200/80">
                    10:24 <span>✓✓</span>
                  </div>
                </div>
              </div>
            )}

            {show(2) && step < 4 && (
              <div className="flex">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[#202C2B] px-3 py-2.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            {show(3) && (
              <div className="flex">
                <div className="bubble-in relative max-w-[82%] rounded-2xl rounded-bl-md bg-[#202C2B] px-3 py-2 text-white/90">
                  Diseñamos tu estrategia, configuramos los flujos y automatizamos las respuestas. Tú solo recibes los leads.
                  <div className="mt-1 text-right text-[10px] text-white/40">10:25</div>
                </div>
              </div>
            )}

            {show(4) && (
              <div className="flex justify-end">
                <div className="bubble-out relative max-w-[78%] rounded-2xl rounded-br-md bg-[#155E50] px-3 py-2 text-white">
                  Perfecto, quiero empezar.
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-200/80">
                    10:25 <span>✓✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 bg-[#1F2C2A] px-3 py-2.5" aria-hidden="true">
            <div className="flex-1 rounded-full bg-[#2A3937] px-3 py-1.5 text-[12px] text-white/40">
              Escribe un mensaje…
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-wa-green text-white">
              <Send size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add bubble tail and typing-dot styles to global CSS**

Append the following to the end of `src/index.css`:

```css
/* WhatsApp chat mockup — bubble tails + typing dots */
.bubble-in::after {
  content: "";
  position: absolute;
  left: -6px;
  bottom: 6px;
  width: 12px;
  height: 12px;
  background: inherit;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}
.bubble-out::after {
  content: "";
  position: absolute;
  right: -6px;
  bottom: 6px;
  width: 12px;
  height: 12px;
  background: inherit;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  display: inline-block;
  animation: typing-blink 1.2s infinite ease-in-out both;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes typing-blink {
  0%, 80%, 100% { opacity: 0.2; }
  40% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .typing-dot { animation: none; opacity: 0.55; }
}
```

- [ ] **Step 3: Type check**

```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/services/whatsapp/ChatMockup.tsx src/index.css
git commit -m "feat(whatsapp): add animated chat mockup component"
```

---

## Task 9 — Build ServiceIntro and ServiceIncludes

**Files:**
- Create: `src/components/services/whatsapp/ServiceIntro.tsx`
- Create: `src/components/services/whatsapp/ServiceIncludes.tsx`

- [ ] **Step 1: Create ServiceIntro**

Create `src/components/services/whatsapp/ServiceIntro.tsx`:

```tsx
import { useReveal } from "../../../hooks/useScrollReveal";

export function ServiceIntro() {
  const ref = useReveal<HTMLDivElement>({ y: 40 });

  return (
    <section aria-labelledby="intro-heading">
      <div ref={ref} className="mx-auto max-w-3xl px-[5%] py-[90px]">
        <p
          id="intro-heading"
          className="mb-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink"
        >
          Comunicaci&oacute;n &amp; ventas
        </p>

        <div className="space-y-6 text-base leading-relaxed text-text-muted md:text-lg md:leading-[1.7]">
          <p>
            Convertimos el potencial de WhatsApp en{" "}
            <span className="text-text-primary">conversaciones reales</span> que
            generan ventas, fidelizan clientes y construyen relaciones duraderas
            con tu audiencia.
          </p>
          <p>
            Dise&ntilde;amos estrategias de WhatsApp Marketing con{" "}
            <span className="text-text-primary">WhatsApp Business API</span>,
            automatizaciones inteligentes, flujos de conversaci&oacute;n
            personalizados, segmentaci&oacute;n de usuarios y campa&ntilde;as
            de difusi&oacute;n que llevan el mensaje correcto, a la persona
            correcta.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ServiceIncludes**

Create `src/components/services/whatsapp/ServiceIncludes.tsx`:

```tsx
import { Container } from "../../ui/Container";
import { SectionHeader } from "../../ui/SectionHeader";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { WHATSAPP_INCLUDES } from "../../../data/services/whatsapp-marketing";

export function ServiceIncludes() {
  const headRef = useReveal<HTMLDivElement>({ y: 40 });
  const listRef = useScrollReveal<HTMLOListElement>({ y: 30, stagger: 0.08 });

  return (
    <Container alternate id="incluye" aria-labelledby="includes-heading">
      <div className="mx-auto max-w-5xl">
        <div ref={headRef} className="mb-12 max-w-2xl">
          <SectionHeader
            label="El servicio"
            titleContent={
              <>
                <span id="includes-heading">
                  &iquest;Qu&eacute; incluye <HighlightText>este servicio?</HighlightText>
                </span>
              </>
            }
          />
        </div>

        <ol
          ref={listRef}
          className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2"
        >
          {WHATSAPP_INCLUDES.map((text, i) => (
            <li
              key={i}
              className="group flex gap-5 bg-bg-secondary p-7 transition-colors hover:bg-white/[0.02]"
            >
              <span className="pt-[2px] font-mono text-xs uppercase tracking-widest text-accent-pink/60">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Type check**

```bash
npm run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/services/whatsapp/ServiceIntro.tsx src/components/services/whatsapp/ServiceIncludes.tsx
git commit -m "feat(whatsapp): add intro and includes sections"
```

---

## Task 10 — Build WhatsAppHero and the page orchestrator

**Files:**
- Create: `src/components/services/whatsapp/WhatsAppHero.tsx`
- Create: `src/pages/WhatsAppMarketingPage.tsx`

- [ ] **Step 1: Create WhatsAppHero**

Create `src/components/services/whatsapp/WhatsAppHero.tsx`:

```tsx
import { ArrowLeft } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HighlightText } from "../../ui/HighlightText";
import { HashLink } from "../../routing/HashLink";
import { useReveal } from "../../../hooks/useScrollReveal";
import { ChatMockup } from "./ChatMockup";

export function WhatsAppHero() {
  const leftRef = useReveal<HTMLDivElement>({ y: 40 });
  const rightRef = useReveal<HTMLDivElement>({ y: 40, delay: 0.15 });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-32 lg:pt-14">
        {/* Left column */}
        <div ref={leftRef} className="order-1">
          <nav aria-label="Migas de pan" className="mb-7">
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
              <li className="text-text-muted/40" aria-hidden="true">/</li>
              <li className="text-accent-pink" aria-current="page">
                WhatsApp Marketing
              </li>
            </ol>
          </nav>

          <h1
            id="hero-heading"
            className="font-heading text-hero font-extrabold tracking-[-1.5px]"
          >
            <span className="block">El canal m&aacute;s poderoso de</span>
            <span className="block">
              <HighlightText>comunicaci&oacute;n directa</HighlightText>,
            </span>
            <span className="block">al servicio de tu estrategia.</span>
          </h1>
        </div>

        {/* Right column — phone */}
        <div ref={rightRef} className="order-2">
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the page orchestrator**

Create `src/pages/WhatsAppMarketingPage.tsx`:

```tsx
import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { WhatsAppHero } from "../components/services/whatsapp/WhatsAppHero";
import { ServiceIntro } from "../components/services/whatsapp/ServiceIntro";
import { ServiceIncludes } from "../components/services/whatsapp/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  WHATSAPP_META,
  WHATSAPP_JSONLD,
} from "../data/services/whatsapp-marketing";

export default function WhatsAppMarketingPage() {
  useDocumentMeta(WHATSAPP_META, WHATSAPP_JSONLD);

  return (
    <>
      <WhatsAppHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            Tu cliente ya est&aacute; en WhatsApp.
            <br />
            <HighlightText>
              &iquest;Est&aacute;s t&uacute; ah&iacute;, estrat&eacute;gicamente?
            </HighlightText>
          </>
        }
        subtitle="Descubre cómo convertimos conversaciones en clientes. Déjanos tus datos y te preparamos una propuesta personalizada, sin compromiso."
        serviceTag="whatsapp-marketing"
      />
    </>
  );
}
```

- [ ] **Step 3: Type check + build**

```bash
npm run build
```

Expected: success. The build now produces a separate chunk for `WhatsAppMarketingPage`. (Note: the page is created but not yet routed — added in Task 11.)

- [ ] **Step 4: Commit**

```bash
git add src/components/services/whatsapp/WhatsAppHero.tsx src/pages/WhatsAppMarketingPage.tsx
git commit -m "feat(whatsapp): add hero with breadcrumb and page orchestrator"
```

---

## Task 11 — Wire the route, the Services link, and Footer link

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/data/content.ts`
- Modify: `src/components/sections/Services.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add the WhatsApp route in App.tsx**

In `src/App.tsx`, add the lazy import and the route. Replace the `import HomePage` line and the `<Routes>` block.

Add this lazy import after the existing `HomePage` lazy import:

```tsx
const WhatsAppMarketingPage = lazy(() => import("./pages/WhatsAppMarketingPage"));
```

Then update the `<Routes>` block to:

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route
    path="/servicios/whatsapp-marketing"
    element={<WhatsAppMarketingPage />}
  />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

- [ ] **Step 2: Update SERVICES href in content.ts**

In `src/data/content.ts`, change the `WhatsApp Marketing` entry's `href` from `"#"` to `"/servicios/whatsapp-marketing"`. The block becomes:

```ts
  {
    icon: FaWhatsapp,
    iconColor: "from-[#25d366] to-[#128c3e]",
    title: "WhatsApp Marketing",
    description:
      "WhatsApp tiene más de 2.000 millones de usuarios activos y tasas de apertura que superan el 90%. En Stellaris convertimos ese potencial en conversaciones reales que generan ventas, fidelizan clientes y construyen relaciones duraderas con tu audiencia.",
    href: "/servicios/whatsapp-marketing",
  },
```

- [ ] **Step 3: Update Services.tsx to use react-router Link with prefetch**

Replace the entire `src/components/sections/Services.tsx` with:

```tsx
import { useCallback, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { HighlightText } from "../ui/HighlightText";
import { SERVICES } from "../../data/content";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";

const headerReveal = { y: 40 };
const gridReveal = { y: 50, stagger: 0.15 };

function prefetchWhatsApp() {
  void import("../../pages/WhatsAppMarketingPage");
}

export function Services() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const gridRef = useScrollReveal<HTMLDivElement>(gridReveal);

  const handlePrefetch = useCallback((href: string) => {
    if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
  }, []);

  return (
    <Container id="servicios">
      <div ref={headerRef}>
        <SectionHeader
          label="Servicios"
          titleContent={
            <>
              Todo lo que necesita
              <br />
              tu <HighlightText>negocio digital</HighlightText>
            </>
          }
          centered
        />
      </div>
      <div
        ref={gridRef}
        className="mx-auto mt-13 grid max-w-4xl gap-5 sm:grid-cols-2"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const isInternalRoute = service.href.startsWith("/");
          const card = (
            <article
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="relative mb-6 h-14 w-14">
                <div
                  className={`absolute inset-1 rounded-[18px] bg-gradient-to-br ${service.iconColor} opacity-40 blur-lg`}
                  aria-hidden="true"
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br ${service.iconColor} shadow-lg`}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[16px] bg-gradient-to-b from-white/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-px rounded-[15px] border border-white/15"
                    aria-hidden="true"
                  />
                  <Icon size={24} className="relative z-10 text-white drop-shadow-sm" />
                </div>
              </div>

              <h3 className="mb-3 font-heading text-lg font-bold tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>

              <span
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-pink transition-all group-hover:gap-2.5"
              >
                Conoce m&aacute;s aqu&iacute;
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </article>
          );

          if (isInternalRoute) {
            return (
              <Link
                key={service.title}
                to={service.href}
                onMouseEnter={() => handlePrefetch(service.href)}
                onFocus={() => handlePrefetch(service.href)}
                className="block"
              >
                {card}
              </Link>
            );
          }

          return (
            <a key={service.title} href={service.href} className="block">
              {card}
            </a>
          );
        })}
      </div>
    </Container>
  );
}
```

> Note: the previous version rendered `<a>` *inside* the article. We now wrap the whole card in a `<Link>` (or `<a>` for placeholder `#`). The "Conoce más aquí" line stays as visual affordance using `<span>` to avoid nested-anchor invalid HTML.

- [ ] **Step 4: Update Footer to link the WhatsApp service**

In `src/components/layout/Footer.tsx`, replace the `SERVICE_LINKS` constant. Change:

```ts
const SERVICE_LINKS = [
  { label: "Redes Sociales", href: "#servicios" },
  { label: "Desarrollo Web", href: "#servicios" },
  { label: "WhatsApp Marketing", href: "#servicios" },
  { label: "Email Marketing", href: "#servicios" },
];
```

to:

```ts
const SERVICE_LINKS: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "Redes Sociales", href: "#servicios" },
  { label: "Desarrollo Web", href: "#servicios" },
  { label: "WhatsApp Marketing", href: "/servicios/whatsapp-marketing", isRoute: true },
  { label: "Email Marketing", href: "#servicios" },
];
```

Then replace the `FooterColumn` component with:

```tsx
import { Link } from "react-router-dom";

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string; isRoute?: boolean }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold tracking-wide">{title}</h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link.label}>
            {link.isRoute ? (
              <Link
                to={link.href}
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Move the `import { Link } from "react-router-dom";` to the top of the file with the other imports.

- [ ] **Step 5: Type check + build**

```bash
npm run build
```

Expected: success.

- [ ] **Step 6: Manual smoke test of the new route**

```bash
npm run dev
```

In a browser at `http://localhost:5173/`:
1. Click the WhatsApp service card under "Servicios" — it should navigate to `/servicios/whatsapp-marketing`.
2. Verify the page renders: Hero (with breadcrumb, h1 in 3 lines, `comunicación directa` highlight, chat mockup on the right), Intro (Comunicación & ventas), Includes (8-item grid), Contact form (with the WhatsApp-specific copy).
3. Click the breadcrumb's "Servicios" — should navigate to `/#servicios` and scroll there.
4. Use browser back — returns to `/`.
5. Reload directly at `http://localhost:5173/servicios/whatsapp-marketing` — page renders. (If hosting later returns 404 on direct URL, that's the SPA fallback config issue noted in spec §11.)
6. Open devtools → Network → reload. Confirm the WhatsApp page loads its own JS chunk.
7. Hover the WhatsApp service card on the home page — confirm in Network tab the `WhatsAppMarketingPage-*.js` chunk gets prefetched.

Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/data/content.ts src/components/sections/Services.tsx src/components/layout/Footer.tsx
git commit -m "feat(whatsapp): wire route, link from Services and Footer with prefetch"
```

---

## Task 12 — Migrate Navbar and Footer anchors to HashLink

**Goal:** Make `Inicio`, `Servicios`, `Nosotros`, `Contacto`, and the "Solicitar cotización" CTA work correctly from sub-routes.

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/data/content.ts`

- [ ] **Step 1: Update NAV_LINKS hrefs to absolute hash form**

In `src/data/content.ts`, change the `NAV_LINKS` entries:

```ts
export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];
```

- [ ] **Step 2: Migrate Navbar to use HashLink**

In `src/components/layout/Navbar.tsx`:

1. Add the import at the top:

```tsx
import { HashLink } from "../routing/HashLink";
```

2. Replace the logo `<a href="#inicio">` with:

```tsx
<HashLink to="/#inicio" className="flex items-center gap-2">
  <img src={isologo} alt="" className="h-7 w-7" aria-hidden="true" />
  <span className="font-heading text-xl font-bold gradient-text">stellaris</span>
</HashLink>
```

3. Replace the desktop `{NAV_LINKS.map(...)}` block (the `<a>` inside the desktop `<ul>`) with:

```tsx
{NAV_LINKS.map((link) => (
  <li key={link.href}>
    <HashLink
      to={link.href}
      className="text-sm text-text-muted transition-colors hover:text-text-primary"
    >
      {link.label}
    </HashLink>
  </li>
))}
```

4. Replace the desktop "Solicitar cotización" `<a href="#contacto">` with:

```tsx
<HashLink
  to="/#contacto"
  className="group relative hidden items-center gap-2 overflow-hidden rounded-full gradient-bg px-5 py-2.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,77,109,0.3)] md:inline-flex"
>
  <span
    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    aria-hidden="true"
  />
  <span className="relative z-10">Solicitar cotizaci&oacute;n</span>
</HashLink>
```

5. Replace the mobile menu's `{NAV_LINKS.map(...)}` `<a>` block with:

```tsx
{NAV_LINKS.map((link) => (
  <li key={link.href}>
    <HashLink
      to={link.href}
      className="block rounded-lg px-4 py-3 text-sm text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text-primary"
      onClick={close}
    >
      {link.label}
    </HashLink>
  </li>
))}
```

6. Replace the mobile menu's "Solicitar cotización" `<a href="#contacto">` with:

```tsx
<HashLink
  to="/#contacto"
  className="block rounded-full gradient-bg px-5 py-3 text-center font-heading text-sm font-bold text-white"
  onClick={close}
>
  Solicitar cotizaci&oacute;n
</HashLink>
```

- [ ] **Step 3: Migrate Footer brand link and column hash links**

In `src/components/layout/Footer.tsx`:

1. Add the import:

```tsx
import { HashLink } from "../routing/HashLink";
```

2. Update the `COMPANY_LINKS` to use absolute hash form:

```ts
const COMPANY_LINKS = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];
```

3. Update the `SERVICE_LINKS` for the three placeholders to use the absolute hash form:

```ts
const SERVICE_LINKS: { label: string; href: string; isRoute?: boolean }[] = [
  { label: "Redes Sociales", href: "/#servicios" },
  { label: "Desarrollo Web", href: "/#servicios" },
  { label: "WhatsApp Marketing", href: "/servicios/whatsapp-marketing", isRoute: true },
  { label: "Email Marketing", href: "/#servicios" },
];
```

4. Update `FooterColumn` to render `HashLink` for hash hrefs:

```tsx
function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold tracking-wide">{title}</h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => {
          const cls =
            "text-sm text-text-muted transition-colors hover:text-text-primary";
          if (link.isRoute) {
            return (
              <li key={link.label}>
                <Link to={link.href} className={cls}>
                  {link.label}
                </Link>
              </li>
            );
          }
          if (link.href.includes("#")) {
            return (
              <li key={link.label}>
                <HashLink to={link.href} className={cls}>
                  {link.label}
                </HashLink>
              </li>
            );
          }
          return (
            <li key={link.label}>
              <a href={link.href} className={cls}>
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

5. Replace the brand `<a href="#inicio">` with:

```tsx
<HashLink to="/#inicio" className="mb-4 flex items-center gap-2">
  <img src={isologo} alt="" className="h-7 w-7" aria-hidden="true" />
  <span className="font-heading text-xl font-bold gradient-text">stellaris</span>
</HashLink>
```

- [ ] **Step 4: Type check + build**

```bash
npm run build
```

Expected: success.

- [ ] **Step 5: Manual smoke test of cross-route navigation**

```bash
npm run dev
```

In a browser:
1. From `/` click each navbar link — they should scroll smoothly to the matching section.
2. Click the WhatsApp service card → land on `/servicios/whatsapp-marketing` → click `Inicio` in the navbar → returns to `/` and scrolls to top (or `#inicio`).
3. From the WhatsApp page click `Servicios` in the navbar → returns to `/` and scrolls to `#servicios`.
4. From the WhatsApp page click `Contacto` in the navbar → returns to `/` and scrolls to `#contacto` (the home's contact CTA).
5. From the WhatsApp page click "Solicitar cotización" in the navbar — should also navigate to `/#contacto`.
6. From the WhatsApp page click the breadcrumb "Servicios" — returns to `/#servicios`.
7. Footer: from `/`, click the WhatsApp Marketing service link → navigates to `/servicios/whatsapp-marketing`.
8. Footer: from the WhatsApp page, click `Nosotros` → returns to `/` and scrolls to `#nosotros`.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/data/content.ts src/components/layout/Navbar.tsx src/components/layout/Footer.tsx
git commit -m "feat(routing): migrate Navbar and Footer anchors to HashLink"
```

---

## Task 13 — Update sitemap.xml

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 1: Append the WhatsApp page URL**

Replace the entire `public/sitemap.xml` with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.stellaris.com.co/</loc>
    <lastmod>2026-05-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.stellaris.com.co/servicios/whatsapp-marketing</loc>
    <lastmod>2026-05-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Verify the file is valid XML**

```bash
npm run build
```

(Vite copies `public/` as-is, so success here just confirms no other regression.)

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "chore(seo): add whatsapp-marketing entry to sitemap"
```

---

## Task 14 — Final verification

**Goal:** Catch any regression introduced by the multi-task series and produce a quality artifact.

- [ ] **Step 1: Lint everything**

```bash
npm run lint
```

Expected: no errors (warnings about pre-existing files OK if they were there before; do not fix unrelated warnings).

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: success. Inspect the printed `dist/assets/` chunk list — there should be a separate JS chunk for `HomePage-*.js` and one for `WhatsAppMarketingPage-*.js`.

- [ ] **Step 3: Preview the production build**

```bash
npm run preview
```

The preview server starts on a port (usually `4173`).

- [ ] **Step 4: Browser checks against the preview**

Open the preview URL (`http://localhost:4173`) and verify in this order:

**Home (`/`):**
1. Page renders identically to pre-change.
2. Navbar links scroll smoothly to sections.
3. ContactCTA submits successfully (Firestore doc has `service: "home"`).
4. Browser tab title: `Stellaris | Agencia de Marketing Digital en Colombia`.

**WhatsApp page (`/servicios/whatsapp-marketing`):**

5. Browser tab title: `WhatsApp Marketing en Colombia | Stellaris`.
6. View page source (or DevTools → Elements → `<head>`): confirm `<meta name="description">`, `<link rel="canonical">`, `og:*`, `twitter:*` reflect the spec values, and TWO `<script type="application/ld+json">` are present (one `Service`, one `BreadcrumbList`).
7. h1 reads three lines, `comunicación directa` highlights with the pink→purple bar on scroll into view.
8. Chat mockup runs the loop. Stop and start by toggling the OS "Reduce motion" preference: with reduced motion, the loop is paused and all 5 messages are visible.
9. Includes grid renders 8 items, 2 columns on `≥sm`, 1 column under `640px`. Hover changes background subtly.
10. ContactCTA shows the WhatsApp-specific h2 and subtitle. Submit form (test data) → Firestore doc has `service: "whatsapp-marketing"`.
11. Resize the viewport to 360px wide — no horizontal scroll, h1 doesn't overflow, mockup stacks below the h1.

**Routing:**

12. Direct-load `http://localhost:4173/servicios/whatsapp-marketing` → renders without 404. (If 404, the preview server has SPA fallback — fine; production hosting may need configuration per spec §11.)
13. Browser back/forward between routes works; scroll resets to top on route change.
14. `http://localhost:4173/random-bogus` → redirects to `/`.

**Lighthouse mobile audit:**

15. Open DevTools → Lighthouse → Mode: Navigation, Device: Mobile, Categories: all. Run on `/servicios/whatsapp-marketing`.
16. Acceptance: Performance ≥ 90, Accessibility ≥ 95, SEO = 100. Record numbers.

**Rich Results validation:**

17. Copy each `<script type="application/ld+json">` JSON content into <https://search.google.com/test/rich-results> as Code snippet. Both should validate without errors.

Stop the preview server.

- [ ] **Step 5: Final commit (if anything changed during verification)**

If you found and fixed any regression during verification, commit it as `fix(...)`. Otherwise skip this step.

- [ ] **Step 6: Summary**

Print a short summary of:
- All tasks completed
- Lighthouse scores from Step 4.16
- Any remaining open items per spec §11 (OG image, hosting SPA fallback)

---

## Self-review notes

This plan covers each spec section:

- §3 Routing → Tasks 1, 2, 3, 4, 12
- §4 File layout → Tasks 6, 7, 8, 9, 10
- §5 Page composition → Tasks 8, 9, 10
- §5.5 ContactCTA refactor → Task 5
- §6 SEO → Tasks 6, 7, 13; verified in Task 14 Steps 6, 16, 17
- §7 Performance → Tasks 4 (lazy), 11 (prefetch), 8 (gated animation); verified in Task 14 Steps 2, 16
- §8 Accessibility → Tasks 8, 9, 10 inline; verified in Task 14 Step 16 (Lighthouse a11y)
- §9 Responsive → built into components; verified in Task 14 Step 11
- §10 Content → Tasks 7, 8, 9, 10
- §11 Open items → noted; OG image and hosting fallback intentionally not in this plan
- §12 Acceptance criteria → covered in Task 14 Steps 4–17
