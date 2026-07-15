import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { ScrollToTop } from "./components/routing/ScrollToTop";
import { CookieBanner } from "./components/layout/CookieBanner";

const HomePage = lazy(() => import("./pages/HomePage"));
const WhatsAppMarketingPage = lazy(() => import("./pages/WhatsAppMarketingPage"));
const RedesSocialesPage = lazy(() => import("./pages/RedesSocialesPage"));
const DesarrolloWebPage = lazy(() => import("./pages/DesarrolloWebPage"));
const EmailMarketingPage = lazy(() => import("./pages/EmailMarketingPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const RecursosPage = lazy(() => import("./pages/RecursosPage"));
const EstrategiaDigitalLanding = lazy(
  () => import("./estrategia-digital/EstrategiaDigitalLanding"),
);

const CONSENT_KEY = "cookieConsent";
// La landing /estrategia-digital escucha este evento para cargar el Meta Pixel
// tras el consentimiento (ver estrategia-digital/hooks/useMetaPixelConsent.ts).
const CONSENT_EVENT = "stellaris:cookieconsent";
type Consent = "accepted" | "rejected";

type WindowWithIdle = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      cb: () => void,
      opts?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (id: number) => void;
  };

function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage unavailable (private mode, full quota) — banner will
    // simply reappear next visit, which is fine.
  }
}

function loadAnalytics() {
  void import("./lib/firebase").then(({ loadAnalytics: fn }) => fn());
}

/**
 * Layout interno: vive dentro de <BrowserRouter> para poder usar useLocation.
 * La ruta /estrategia-digital trae su propia cabecera, así que ocultamos el
 * Navbar global; el Footer global sí se muestra (pie consistente en todo el sitio).
 */
function AppShell() {
  const [showBanner, setShowBanner] = useState(false);
  const { pathname } = useLocation();
  const isBareLanding = pathname === "/estrategia-digital";

  useEffect(() => {
    const consent = readConsent();

    if (consent === null) {
      setShowBanner(true);
      return;
    }
    if (consent === "rejected") {
      // No analytics, no banner.
      return;
    }

    // consent === "accepted": defer Analytics off LCP via requestIdleCallback.
    const w = window as WindowWithIdle;
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(loadAnalytics, { timeout: 4000 })
      : window.setTimeout(loadAnalytics, 2000);

    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  const handleConsent = useCallback((consent: Consent) => {
    writeConsent(consent);
    setShowBanner(false);
    // Notifica a la landing /estrategia-digital para (des)activar el Meta Pixel.
    window.dispatchEvent(new Event(CONSENT_EVENT));
    if (consent === "accepted") {
      // User just clicked — load Analytics now, not on next idle.
      loadAnalytics();
    }
  }, []);

  return (
    <SmoothScroll>
      <ScrollToTop />

      {/* Accessibility: skip to main content */}
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>

      {!isBareLanding && <Navbar />}

      <main id="main-content">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/servicios/whatsapp-marketing"
              element={<WhatsAppMarketingPage />}
            />
            <Route
              path="/servicios/redes-sociales"
              element={<RedesSocialesPage />}
            />
            <Route
              path="/servicios/desarrollo-web"
              element={<DesarrolloWebPage />}
            />
            <Route
              path="/servicios/email-marketing"
              element={<EmailMarketingPage />}
            />
            <Route
              path="/politica-de-privacidad"
              element={<PrivacyPolicyPage />}
            />
            <Route path="/recursos" element={<RecursosPage />} />
            <Route
              path="/estrategia-digital"
              element={<EstrategiaDigitalLanding />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer global del sitio en todas las rutas (incluida /estrategia-digital,
          que usa su propia cabecera pero comparte el pie para verse consistente). */}
      <Footer />

      {showBanner && <CookieBanner onChoice={handleConsent} />}
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
