import type { DocumentMeta } from "../hooks/useDocumentMeta";

export type ResourceType =
  | "guia"
  | "plantilla"
  | "caso"
  | "webinar"
  | "herramienta"
  | "otro";

export type ResourceIconKey =
  | "book"
  | "grid"
  | "trend"
  | "play"
  | "tool"
  | "sparkles";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  meta: string;
  href: string;
  featured?: boolean;
  external?: boolean;
}

// Launch content. Replace `href: "#"` with real URLs as files become available.
// Card with href === "#" renders as aria-disabled (see ResourceCard).
export const RESOURCES: readonly Resource[] = [
  {
    id: "r6",
    featured: true,
    type: "guia",
    title: "El playbook de WhatsApp Marketing 2026",
    description:
      "Estrategia, flujos y plantillas listas para implementar en cuentas reales.",
    meta: "PDF · 36 págs",
    href: "#",
  },
  {
    id: "r1",
    type: "guia",
    title: "Cómo auditar tus redes sociales en 30 minutos",
    description:
      "Un paso a paso accionable para identificar qué funciona, qué no, y qué corregir esta semana.",
    meta: "PDF · 22 págs",
    href: "#",
  },
  {
    id: "r2",
    type: "plantilla",
    title: "Calendario editorial mensual (Google Sheets)",
    description:
      "Plantilla lista para planificar publicaciones, formatos y métricas mes a mes.",
    meta: "Sheets · Editable",
    href: "#",
    external: true,
  },
  {
    id: "r3",
    type: "caso",
    title: "Cómo crecimos +320% en alcance orgánico",
    description:
      "Caso detallado de la estrategia editorial que aplicamos para una marca B2C en Colombia.",
    meta: "Caso · 8 min de lectura",
    href: "#",
  },
  {
    id: "r4",
    type: "webinar",
    title: "Email Marketing que convierte: del asunto al CTA",
    description:
      "Sesión grabada con los errores más comunes y un framework para cada paso del correo.",
    meta: "Video · 42 min",
    href: "#",
    external: true,
  },
];

export const RECURSOS_META: DocumentMeta = {
  title: "Recursos | Stellaris",
  description:
    "Biblioteca de guías, plantillas, casos y herramientas de marketing digital.",
  canonical: "https://www.stellaris.com.co/recursos",
  robots: "noindex, nofollow",
  ogType: "website",
};
