import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type WebIconKey =
  | "ux"
  | "responsive"
  | "seo"
  | "aeo"
  | "speed"
  | "crm"
  | "landing"
  | "shop"
  | "support";

export interface WebFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: WebIconKey;
}

export interface WebPillar {
  title: string;
  description: string;
  iconKey: WebIconKey;
}

export const WEB_INCLUDES: readonly WebFeature[] = [
  {
    title: "Diseño UX/UI personalizado",
    description:
      "Adaptado a la identidad y objetivos de tu marca, con foco en experiencia y conversión.",
    tag: "UX/UI",
    iconKey: "ux",
  },
  {
    title: "Desarrollo responsivo",
    description:
      "Optimizado para móviles, tabletas y escritorio. Funciona donde tu cliente esté.",
    tag: "Responsive",
    iconKey: "responsive",
  },
  {
    title: "Optimización SEO técnica",
    description:
      "SEO desde la construcción del sitio: estructura, semántica y rendimiento.",
    tag: "SEO",
    iconKey: "seo",
  },
  {
    title: "Optimización AEO y GEO",
    description:
      "Visibilidad en respuestas de IA y en búsquedas generativas, no solo en Google clásico.",
    tag: "AEO · GEO",
    iconKey: "aeo",
  },
  {
    title: "Velocidad de carga",
    description:
      "Core Web Vitals optimizados: páginas que cargan rápido y generan confianza.",
    tag: "Performance",
    iconKey: "speed",
  },
  {
    title: "Integración con tu stack",
    description:
      "CRM, herramientas de automatización y analítica web conectadas desde el lanzamiento.",
    tag: "Integración",
    iconKey: "crm",
  },
  {
    title: "Landing pages de conversión",
    description:
      "Landings de alta conversión diseñadas para campañas específicas.",
    tag: "Landings",
    iconKey: "landing",
  },
  {
    title: "Tiendas online",
    description:
      "E-commerce funcionales y optimizadas para vender, no solo para mostrar.",
    tag: "E-commerce",
    iconKey: "shop",
  },
  {
    title: "Mantenimiento y soporte",
    description:
      "Soporte y actualizaciones continuas para que tu sitio nunca se quede atrás.",
    tag: "Soporte",
    iconKey: "support",
  },
];

export const WEB_PILLARS: readonly WebPillar[] = [
  {
    title: "Atraer, convencer, convertir",
    description:
      "Cada elemento visual y cada línea de código está pensada para ese objetivo.",
    iconKey: "ux",
  },
  {
    title: "Neuromarketing + UX/UI",
    description:
      "Combinamos principios de neuromarketing y UX/UI de vanguardia.",
    iconKey: "landing",
  },
  {
    title: "SEO, AEO y GEO",
    description:
      "Posicionamiento sólido en Google y en las búsquedas creadas por modelos de IA.",
    iconKey: "seo",
  },
];

export const WEB_META: DocumentMeta = {
  title: "Diseño y Desarrollo Web en Colombia | Stellaris",
  description:
    "Diseño y desarrollo web profesional: UX/UI estratégica, SEO/AEO/GEO, performance, landings y e-commerce. Sitios que atraen, convencen y convierten.",
  keywords:
    "diseño web Colombia, desarrollo web, UX/UI, SEO técnico, AEO, GEO, landing pages, e-commerce, performance web",
  canonical: "https://www.stellaris.com.co/servicios/desarrollo-web",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/desarrollo-web.jpg",
};

export const WEB_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Diseño y Desarrollo Web",
    serviceType: "Web Design and Development",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: "es-CO",
    description:
      "Diseño y desarrollo web profesional con foco en UX/UI estratégica, SEO/AEO/GEO, performance, landing pages y e-commerce.",
    url: "https://www.stellaris.com.co/servicios/desarrollo-web",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: WEB_INCLUDES.map((entry, i) => ({
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
        name: "Diseño y Desarrollo Web",
        item: "https://www.stellaris.com.co/servicios/desarrollo-web",
      },
    ],
  },
];
