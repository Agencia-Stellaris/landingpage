import type { DocumentMeta } from "../../hooks/useDocumentMeta";

export type EmailIconKey =
  | "strategy"
  | "template"
  | "segment"
  | "automation"
  | "abtest"
  | "platform"
  | "reports"
  | "deliverability"
  | "cart"
  | "nurture"
  | "reactivate"
  | "revenue";

export interface EmailFeature {
  title: string;
  description: string;
  tag: string;
  iconKey: EmailIconKey;
}

export interface EmailPillar {
  title: string;
  description: string;
  iconKey: EmailIconKey;
}

export interface EmailFaq {
  question: string;
  answer: string;
}

export const EMAIL_INCLUDES: readonly EmailFeature[] = [
  {
    title: "Estrategia alineada a tu embudo",
    description:
      "Estrategia de email marketing pensada desde tu funnel de ventas, no desde la plantilla.",
    tag: "Estrategia",
    iconKey: "strategy",
  },
  {
    title: "Plantillas profesionales",
    description:
      "Diseño responsive mobile-first, listas para verse bien en cualquier cliente de correo.",
    tag: "Diseño",
    iconKey: "template",
  },
  {
    title: "Segmentación avanzada",
    description:
      "Listas segmentadas por comportamiento, etapa del buyer y perfil de usuario.",
    tag: "Segmentación",
    iconKey: "segment",
  },
  {
    title: "Flujos de automatización",
    description:
      "Bienvenida, lead nurturing, reactivación y cierre, conectados como una sola conversación.",
    tag: "Automatización",
    iconKey: "automation",
  },
  {
    title: "Test A/B",
    description:
      "Pruebas de asuntos, contenidos y CTAs para mejorar continuamente cada envío.",
    tag: "Optimización",
    iconKey: "abtest",
  },
  {
    title: "Gestión de plataformas",
    description:
      "Configuración y operación de HubSpot, Mailchimp, ActiveCampaign y otras herramientas.",
    tag: "Plataformas",
    iconKey: "platform",
  },
  {
    title: "Reportes accionables",
    description:
      "Aperturas, clics, conversiones y ventas generadas, con lectura clara y aplicable.",
    tag: "Reportes",
    iconKey: "reports",
  },
  {
    title: "Deliverability e higiene de base",
    description:
      "SPF, DKIM, DMARC y limpieza periódica de la base. Tus correos llegan a la bandeja, no a spam.",
    tag: "Entregabilidad",
    iconKey: "deliverability",
  },
  {
    title: "Recuperación de carritos abandonados",
    description:
      "Flujos automatizados que rescatan ventas perdidas y convierten visitantes en clientes.",
    tag: "E-commerce",
    iconKey: "cart",
  },
];

export const EMAIL_PILLARS: readonly EmailPillar[] = [
  {
    title: "Nutrir leads",
    description:
      "Conversaciones automatizadas que llevan al usuario hacia la compra.",
    iconKey: "nurture",
  },
  {
    title: "Reactivar clientes",
    description:
      "Recuperar contactos inactivos con mensajes y ofertas relevantes.",
    iconKey: "reactivate",
  },
  {
    title: "Ingresos predecibles",
    description:
      "Tu base de datos como activo que genera ventas e interacción constante.",
    iconKey: "revenue",
  },
];

export const EMAIL_FAQS: readonly EmailFaq[] = [
  {
    question: "¿Qué es el email marketing y por qué sigue siendo rentable?",
    answer:
      "El email marketing es la práctica de enviar comunicaciones comerciales y de relacionamiento por correo electrónico, sobre una base de datos propia. Sigue siendo uno de los canales más rentables del marketing digital porque opera sobre una audiencia que ya consintió recibir mensajes: su ROI suele superar al de redes sociales y publicidad pagada, especialmente cuando se combina con segmentación y automatización.",
  },
  {
    question: "¿Con qué plataformas de email marketing trabajan?",
    answer:
      "Trabajamos principalmente con HubSpot, Mailchimp y ActiveCampaign, y también nos integramos con el CRM que tu organización ya esté utilizando, como Salesforce, Zoho o Pipedrive. La elección depende del volumen de envíos, la complejidad de los flujos y el nivel de integración con ventas. Recomendamos la opción que mejor se ajusta a tu operación, no la que más nos conviene.",
  },
  {
    question: "¿Qué incluye un servicio profesional de email marketing?",
    answer:
      "Cubre el ciclo completo: estrategia alineada al embudo de ventas, diseño de plantillas responsive, segmentación por comportamiento y perfil, flujos de automatización (bienvenida, nurturing, reactivación y cierre), pruebas A/B, deliverability con autenticación SPF, DKIM y DMARC, y reportes accionables que muestran aperturas, clics, conversiones e ingresos atribuidos a cada campaña.",
  },
  {
    question: "¿Cómo se mide el éxito de una campaña de email marketing?",
    answer:
      "Más allá de aperturas y clics, el éxito se mide por conversiones y por ingresos atribuidos a cada flujo. Configuramos el seguimiento para conectar cada envío con su resultado en tu CRM o tienda online, lo que permite calcular el ROI real, identificar qué segmentos compran más y optimizar continuamente subject lines, frecuencia y contenidos.",
  },
  {
    question: "¿Qué es deliverability y por qué importa?",
    answer:
      "Deliverability es la capacidad de que tus correos lleguen a la bandeja de entrada y no a spam. Depende de la autenticación del dominio (SPF, DKIM, DMARC), la reputación del remitente, la calidad de la lista y el comportamiento de los destinatarios. Sin un deliverability adecuado, todo el trabajo de estrategia y diseño se pierde: por eso lo tratamos como infraestructura, no como detalle.",
  },
  {
    question:
      "¿Pueden integrarse las campañas con mi tienda online o CRM existente?",
    answer:
      "Sí. Conectamos las plataformas de email con tu tienda (Shopify, WooCommerce, VTEX) y tu CRM para activar flujos basados en comportamiento real: carritos abandonados, post-compra, reactivación de clientes inactivos, recompra y upsell. La integración permite que cada correo dispare por el evento correcto y se atribuya a la conversión correspondiente.",
  },
];

export const EMAIL_META: DocumentMeta = {
  title: "Email Marketing en Colombia | Automatización y CRM | Stellaris",
  description:
    "Email marketing profesional: estrategia, automatización, segmentación y deliverability. HubSpot, Mailchimp, ActiveCampaign. Convertí tu base de datos en ventas predecibles.",
  keywords:
    "email marketing Colombia, automatización de email, HubSpot Colombia, Mailchimp, ActiveCampaign, segmentación, lead nurturing, carritos abandonados, deliverability, SPF DKIM DMARC, CRM",
  canonical: "https://www.stellaris.com.co/servicios/email-marketing",
  ogType: "article",
  ogImage: "https://www.stellaris.com.co/og/email-marketing.jpg",
};

export const EMAIL_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Email Marketing",
    serviceType: "Email Marketing",
    provider: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
      logo: "https://www.stellaris.com.co/favicon.png",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    inLanguage: "es-CO",
    description:
      "Email marketing profesional con foco en estrategia, automatización, segmentación, deliverability y reportes. Trabajamos con HubSpot, Mailchimp, ActiveCampaign y CRMs.",
    url: "https://www.stellaris.com.co/servicios/email-marketing",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Qué incluye",
      itemListElement: EMAIL_INCLUDES.map((entry, i) => ({
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
        name: "Email Marketing",
        item: "https://www.stellaris.com.co/servicios/email-marketing",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: EMAIL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];
