import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { ScrollToTop } from "./components/routing/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const WhatsAppMarketingPage = lazy(() => import("./pages/WhatsAppMarketingPage"));
const RedesSocialesPage = lazy(() => import("./pages/RedesSocialesPage"));
const DesarrolloWebPage = lazy(() => import("./pages/DesarrolloWebPage"));
const EmailMarketingPage = lazy(() => import("./pages/EmailMarketingPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));

export default function App() {
  useEffect(() => {
    // Defer Firebase Analytics until the browser is idle so it never blocks
    // the initial render or LCP. Falls back to setTimeout in browsers without
    // requestIdleCallback (older Safari).
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };

    const load = () => {
      void import("./lib/firebase").then(({ loadAnalytics }) => loadAnalytics());
    };

    const id = w.requestIdleCallback
      ? w.requestIdleCallback(load, { timeout: 4000 })
      : window.setTimeout(load, 2000);

    return () => {
      if (w.cancelIdleCallback) {
        w.cancelIdleCallback(id);
      } else {
        window.clearTimeout(id);
      }
    };
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
