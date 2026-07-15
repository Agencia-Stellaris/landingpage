import { useDocumentMeta, type DocumentMeta } from "@/hooks/useDocumentMeta";
import { Auras } from "@/estrategia-digital/components/background/Auras";
import { Starfield } from "@/estrategia-digital/components/background/Starfield";
import { Hero } from "@/estrategia-digital/components/hero/Hero";
import { Header } from "@/estrategia-digital/components/layout/Header";
import { LeadSection } from "@/estrategia-digital/components/lead/LeadSection";
import { ScrollProgress } from "@/estrategia-digital/components/ScrollProgress";
import { Process } from "@/estrategia-digital/components/sections/Process";
import { System360 } from "@/estrategia-digital/components/sections/System360";
import { WhyUs } from "@/estrategia-digital/components/sections/WhyUs";
import { siteConfig } from "@/estrategia-digital/config/site";
import { useMetaPixelConsent } from "@/estrategia-digital/hooks/useMetaPixelConsent";
import { useScrollProgress } from "@/estrategia-digital/hooks/useScrollProgress";
import { useVisitorTracking } from "@/estrategia-digital/hooks/useVisitorTracking";

/* Estilos + fuentes de la landing (las fuentes se importan dentro de landing.css) */
import "@/estrategia-digital/styles/landing.css";

const META: DocumentMeta = {
  title: "Stellaris — Estrategia digital 360° que convierte | Diagnóstico gratuito",
  description:
    "Diseño, pauta, landing conectada a tu CRM, piezas, publicación, seguimiento y reportes. Una estrategia digital 360° que convierte tu inversión en clientes. Solicita tu diagnóstico gratuito.",
  keywords:
    "estrategia digital 360, agencia de marketing digital, generación de leads, landing conectada a CRM, pauta publicitaria, Meta Ads, marketing de resultados, Stellaris",
  canonical: siteConfig.canonicalUrl,
  ogType: "website",
  ogTitle: "Stellaris — Estrategia digital 360° que convierte",
  ogDescription:
    "Deja de pautar a ciegas. Una estrategia digital completa que convierte tu inversión en clientes reales.",
  ogImage: siteConfig.ogImage,
};

const JSONLD = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.mainSite}/#organization`,
        name: "Stellaris",
        url: siteConfig.mainSite,
        logo: siteConfig.ogImage,
        email: siteConfig.email,
        description:
          "Deja de pautar a ciegas. Una estrategia digital completa que convierte tu inversión en clientes reales.",
        sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram, siteConfig.social.facebook],
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.email,
          contactType: "sales",
          areaServed: "CO",
          availableLanguage: ["es"],
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.canonicalUrl}#webpage`,
        url: siteConfig.canonicalUrl,
        name: "Estrategia digital 360° que convierte",
        inLanguage: "es",
        isPartOf: { "@id": `${siteConfig.mainSite}/#organization` },
        primaryImageOfPage: siteConfig.ogImage,
      },
      {
        "@type": "ProfessionalService",
        name: "Stellaris — Estrategia digital 360°",
        url: siteConfig.canonicalUrl,
        image: siteConfig.ogImage,
        description:
          "Diseño, pauta, landing conectada a tu CRM, piezas, publicación, seguimiento y reportes. Una estrategia digital 360° que convierte tu inversión en clientes.",
        provider: { "@id": `${siteConfig.mainSite}/#organization` },
        areaServed: "CO",
        serviceType: "Marketing digital de resultados",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de estrategia digital 360°",
          itemListElement: [
            "Diseño de campaña y estrategia",
            "Análisis y gestión de canales",
            "Landing conectada a CRM",
            "Diseño de piezas creativas",
            "Publicación y pauta",
            "Seguimiento y reportes",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Qué incluye el diagnóstico gratuito de Stellaris?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Un análisis de tu situación digital sin costo, oportunidades priorizadas por impacto y una propuesta de estrategia a tu medida, sin compromisos.",
            },
          },
          {
            "@type": "Question",
            name: "¿Qué es una estrategia digital 360°?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Un sistema conectado de extremo a extremo: estrategia, canales, landing conectada a CRM, piezas creativas, pauta, seguimiento en tiempo real y reportes, trabajando como un ecosistema unificado.",
            },
          },
          {
            "@type": "Question",
            name: "¿En cuánto tiempo responden?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Un estratega de Stellaris te contacta en menos de 24 horas hábiles tras recibir tu solicitud.",
            },
          },
        ],
      },
    ],
  },
];

/** Landing de campaña 360°, integrada como ruta del sitio principal. */
export default function EstrategiaDigitalLanding() {
  useDocumentMeta(META, JSONLD);
  const { progress, isScrolled } = useScrollProgress();
  useVisitorTracking();
  useMetaPixelConsent();

  return (
    <div className="edland-root">
      <Starfield />
      <Auras />
      <ScrollProgress progress={progress} />
      <Header isScrolled={isScrolled} />

      <main id="top">
        <Hero />
        <System360 />
        <WhyUs />
        <Process />
        <LeadSection />
      </main>
    </div>
  );
}
