import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./lib/firebase"; // Initialize Firebase + Analytics
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { ScrollToTop } from "./components/routing/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const WhatsAppMarketingPage = lazy(() => import("./pages/WhatsAppMarketingPage"));
const RedesSocialesPage = lazy(() => import("./pages/RedesSocialesPage"));
const DesarrolloWebPage = lazy(() => import("./pages/DesarrolloWebPage"));
const EmailMarketingPage = lazy(() => import("./pages/EmailMarketingPage"));

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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
