import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type RedesIconKey =
  | "strategy"
  | "content"
  | "community"
  | "ads"
  | "metrics"
  | "reputation";

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
  {
    title: "Estrategia de contenido",
    description:
      "Estrategia personalizada y alineada a tus objetivos de negocio, con enfoque en conversión.",
    tag: "Estrategia",
    iconKey: "strategy",
  },
  {
    title: "Producción visual y copy",
    description:
      "Producción de contenido visual de alto impacto y redacción de textos persuasivos.",
    tag: "Creativo",
    iconKey: "content",
  },
  {
    title: "Community management",
    description:
      "Gestión activa de tu comunidad: respondemos, dinamizamos y construimos relación.",
    tag: "Comunidad",
    iconKey: "community",
  },
  {
    title: "Pauta paga",
    description:
      "Campañas en Meta Ads, TikTok Ads y LinkedIn Ads gestionadas y optimizadas por nuestro equipo.",
    tag: "Ads",
    iconKey: "ads",
  },
  {
    title: "Métricas y reportes",
    description:
      "Análisis de métricas y reportes de rendimiento mensuales con lectura accionable.",
    tag: "Datos",
    iconKey: "metrics",
  },
  {
    title: "Reputación de marca",
    description:
      "Monitoreo de reputación y respuesta a comentarios para cuidar la conversación pública.",
    tag: "Reputación",
    iconKey: "reputation",
  },
];

export const REDES_PILLARS: readonly RedesPillar[] = [
  {
    title: "Comunidades reales",
    description: "Más allá de publicar contenido: relaciones que se sostienen.",
    iconKey: "community",
  },
  {
    title: "Narrativas que conectan",
    description:
      "Estrategias de contenido alineadas a tu marca y a tus objetivos.",
    iconKey: "strategy",
  },
  {
    title: "Conversaciones, prospectos y ventas",
    description: "Cada publicación con intención: hacer crecer tu marca.",
    iconKey: "metrics",
  },
];

export const REDES_META: DocumentMeta = {
  title: "Gestión de Redes Sociales en Colombia | Stellaris",
  description:
    "Gestión profesional de redes sociales: estrategia de contenido, producción visual, community management, pauta paga, métricas y reputación. Construimos comunidades que generan resultados.",
  keywords:
    "gestión redes sociales, community management, social media, agencia redes sociales Colombia, content marketing, pauta digital",
  canonical: "https://www.stellaris.com.co/servicios/redes-sociales",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/redes-sociales.jpg",
};

export const REDES_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gestión de Redes Sociales",
    serviceType: "Social Media Management",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: "es-CO",
    description:
      "Gestión profesional de redes sociales en Instagram, Facebook, LinkedIn, TikTok y más, con estrategia, producción de contenido, community management, pauta paga y métricas.",
    url: "https://www.stellaris.com.co/servicios/redes-sociales",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: REDES_INCLUDES.map((entry, i) => ({
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.stellaris.com.co/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: "https://www.stellaris.com.co/#servicios",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gestión de Redes Sociales",
        item: "https://www.stellaris.com.co/servicios/redes-sociales",
      },
    ],
  },
];
