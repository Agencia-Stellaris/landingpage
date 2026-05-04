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
    inLanguage: "es-CO",
    description:
      "Estrategias de WhatsApp Marketing con WhatsApp Business API, automatizaciones, segmentación y campañas de difusión para empresas en Colombia.",
    url: "https://www.stellaris.com.co/servicios/whatsapp-marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: WHATSAPP_INCLUDES.map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Offer", itemOffered: { "@type": "Service", name } },
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
