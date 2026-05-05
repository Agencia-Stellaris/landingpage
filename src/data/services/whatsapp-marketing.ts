import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type WhatsAppIconKey =
  | "api"
  | "strategy"
  | "segment"
  | "automate"
  | "broadcast"
  | "crm"
  | "bot"
  | "metrics";

export interface WhatsAppFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: WhatsAppIconKey;
}

export interface WhatsAppPillar {
  title: string;
  description: string;
  iconKey: WhatsAppIconKey;
}

export const WHATSAPP_INCLUDES: readonly WhatsAppFeature[] = [
  {
    title: "WhatsApp Business API",
    description:
      "Configuración, verificación y optimización de la API oficial de Meta para escalar sin restricciones.",
    tag: "API",
    iconKey: "api",
  },
  {
    title: "Estrategia de comunicación",
    description:
      "Definimos tono, flujos de conversación y journey por etapa del embudo, alineado a tu marca.",
    tag: "Estrategia",
    iconKey: "strategy",
  },
  {
    title: "Segmentación inteligente",
    description:
      "Organizamos tu base por intereses, etapa, comportamiento y datos demográficos para impactar mejor.",
    tag: "CRM",
    iconKey: "segment",
  },
  {
    title: "Automatizaciones y flujos",
    description:
      "Respuestas automáticas, secuencias de seguimiento y disparadores en tiempo real, sin que muevas un dedo.",
    tag: "Auto",
    iconKey: "automate",
  },
  {
    title: "Campañas de difusión",
    description:
      "Envíos masivos segmentados por perfil de cliente, con plantillas aprobadas y métricas en vivo.",
    tag: "Broadcast",
    iconKey: "broadcast",
  },
  {
    title: "Integración con CRM",
    description:
      "Conectamos WhatsApp con tu CRM para gestionar leads, pipeline y atención comercial en un solo lugar.",
    tag: "Integración",
    iconKey: "crm",
  },
  {
    title: "Chatbots inteligentes",
    description:
      "Atención 24/7 con NLP que clasifica, responde y escala a un humano cuando hace falta.",
    tag: "IA",
    iconKey: "bot",
  },
  {
    title: "Métricas y analytics",
    description:
      "Dashboards de entrega, apertura, respuesta y conversión. Decisiones con datos, no con intuición.",
    tag: "Datos",
    iconKey: "metrics",
  },
];

export const WHATSAPP_PILLARS: readonly WhatsAppPillar[] = [
  {
    title: "Conversaciones reales",
    description: "Que generan ventas y fidelizan",
    iconKey: "strategy",
  },
  {
    title: "Mensaje correcto",
    description: "A la persona correcta, en el momento correcto",
    iconKey: "segment",
  },
  {
    title: "WhatsApp Business API",
    description: "Automatizaciones inteligentes y flujos personalizados",
    iconKey: "api",
  },
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
      itemListElement: WHATSAPP_INCLUDES.map((entry, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: entry.title },
        },
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
