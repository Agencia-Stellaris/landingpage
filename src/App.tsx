import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const CONSENT_KEY = "cookieConsent";
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

export default function App() {
  const [showBanner, setShowBanner] = useState(false);

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
    if (consent === "accepted") {
      // User just clicked — load Analytics now, not on next idle.
      loadAnalytics();
    }
  }, []);

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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        {showBanner && <CookieBanner onChoice={handleConsent} />}
      </SmoothScroll>
    </BrowserRouter>
  );
}
