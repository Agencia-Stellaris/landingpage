import type { DocumentMeta } from "../hooks/useDocumentMeta";
import { CONTACT, SOCIAL_LINKS } from "./content";

const SITE_URL = "https://www.stellaris.com.co";
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export const HOME_META: DocumentMeta = {
  title: "Stellaris | Agencia de Marketing Digital en Colombia",
  description:
    "Agencia de marketing digital en Colombia. Estrategias de redes sociales, desarrollo web, WhatsApp marketing y email marketing para empresas que buscan resultados reales y medibles.",
  keywords:
    "agencia marketing digital Colombia, redes sociales, WhatsApp marketing, email marketing, desarrollo web, agencia digital",
  canonical: `${SITE_URL}/`,
  ogType: "website",
  ogImage: `${SITE_URL}/og-default.png`,
};

export const HOME_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Stellaris",
    alternateName: "Agencia Stellaris",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/og-default.png`,
    image: `${SITE_URL}/og-default.png`,
    description:
      "Agencia de marketing digital en Colombia especializada en redes sociales, desarrollo web, WhatsApp marketing y email marketing.",
    email: CONTACT.email,
    telephone: CONTACT.phone,
    areaServed: { "@type": "Country", name: "Colombia" },
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE_URL}/`,
    name: "Stellaris",
    inLanguage: "es-CO",
    publisher: { "@id": ORG_ID },
  },
];
