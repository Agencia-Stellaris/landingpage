import type { ComponentType } from "react";
import { Globe, AtSign, Sparkles, Landmark, Flame, ChartPie, Layers, Webhook } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa6";

// ─── Types ───────────────────────────────────────────────────────────

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  icon: IconComponent;
  iconColor: string;
  title: string;
  description: string;
  href: string;
}

export interface WhyUsItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioProject {
  icon: IconComponent;
  gradient: string;
  tag: string;
  title: string;
  description: string;
  metric: string;
}

export interface Testimonial {
  initials: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  icon: IconComponent;
  gradient: string;
  tag: string;
  title: string;
  meta: string;
}

export interface SocialLink {
  label: string;
  icon: IconComponent;
  href: string;
}

// ─── Data ────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export const STATS: Stat[] = [
  { value: "+80", label: "Clientes activos" },
  { value: "+250", label: "Proyectos entregados" },
  { value: "98%", label: "Satisfacci\u00f3n" },
  { value: "4 a\u00f1os", label: "De experiencia" },
];

export const SERVICES: Service[] = [
  {
    icon: FaWhatsapp,
    iconColor: "from-[#25d366] to-[#128c3e]",
    title: "WhatsApp Marketing",
    description:
      "Estrategia y automatizaci\u00f3n de WhatsApp Business. Flujos de atenci\u00f3n, campa\u00f1as de mensajer\u00eda masiva y chatbots inteligentes.",
    href: "#",
  },
  {
    icon: FaInstagram,
    iconColor: "from-[#f77737] via-[#e1306c] to-[#833ab4]",
    title: "Redes Sociales",
    description:
      "Gesti\u00f3n estrat\u00e9gica de Instagram, Facebook, LinkedIn y TikTok. Contenido de alto impacto, comunidad activa y crecimiento org\u00e1nico medible.",
    href: "#",
  },
  {
    icon: Globe,
    iconColor: "from-[#a855f7] to-[#6d28d9]",
    title: "Dise\u00f1o & Desarrollo Web",
    description:
      "Sitios web r\u00e1pidos, modernos y optimizados para SEO. Desde landing pages hasta plataformas completas con enfoque en conversi\u00f3n.",
    href: "#",
  },
  {
    icon: AtSign,
    iconColor: "from-[#06b6d4] to-[#0e7490]",
    title: "Email Marketing",
    description:
      "Secuencias de email que convierten. Dise\u00f1o de newsletters, automatizaciones, segmentaci\u00f3n avanzada y an\u00e1lisis de campa\u00f1as.",
    href: "#",
  },
];

export const WHY_US_ITEMS: WhyUsItem[] = [
  {
    number: "01",
    title: "Estrategia personalizada",
    description:
      "Nada es gen\u00e9rico. Cada cliente recibe un plan dise\u00f1ado desde cero para su industria, audiencia y objetivos.",
  },
  {
    number: "02",
    title: "Equipo especializado",
    description:
      "Cada servicio tiene un experto detr\u00e1s. No somos generalistas: tenemos especialistas por cada \u00e1rea digital.",
  },
  {
    number: "03",
    title: "Reportes transparentes",
    description:
      "Reportes quincenales con m\u00e9tricas reales. Sabes exactamente qu\u00e9 se hace, qu\u00e9 funciona y hacia d\u00f3nde vamos.",
  },
  {
    number: "04",
    title: "Comunicaci\u00f3n directa",
    description:
      "Sin intermediarios. Tienes acceso directo a tu equipo v\u00eda WhatsApp, con respuesta en menos de 2 horas h\u00e1biles.",
  },
  {
    number: "05",
    title: "Enfoque en ROI",
    description:
      "Todo lo que hacemos apunta a un objetivo: que tu inversi\u00f3n en marketing se traduzca en ventas reales.",
  },
  {
    number: "06",
    title: "Adaptaci\u00f3n constante",
    description:
      "El digital cambia cada semana. Actualizamos las estrategias continuamente para aprovechar cada nueva oportunidad.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagn\u00f3stico",
    description:
      "Analizamos tu negocio, tu competencia y tu audiencia para entender d\u00f3nde est\u00e1s y d\u00f3nde quieres llegar.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Dise\u00f1amos un plan digital personalizado con metas claras, canales seleccionados y un calendario de acci\u00f3n.",
  },
  {
    number: "03",
    title: "Ejecuci\u00f3n",
    description:
      "Implementamos, creamos y gestionamos con precisi\u00f3n. T\u00fa enf\u00f3cate en tu negocio; nosotros en tu presencia digital.",
  },
  {
    number: "04",
    title: "Optimizaci\u00f3n",
    description:
      "Medimos, analizamos y mejoramos continuamente. Cada dato nos dice c\u00f3mo hacer el siguiente mes mejor que el anterior.",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    icon: Sparkles,
    gradient: "from-[#1a0533] to-[#3d0d6e]",
    tag: "Redes Sociales",
    title: "Boutique Modo \u2014 Moda femenina",
    description:
      "Estrategia de contenido en Instagram y TikTok con foco en storytelling de producto.",
    metric: "+180% de engagement en 90 d\u00edas",
  },
  {
    icon: Landmark,
    gradient: "from-[#001a33] to-[#003d6e]",
    tag: "Web + SEO",
    title: "Constructora Arcos \u2014 B2B",
    description:
      "Dise\u00f1o y desarrollo web con estrategia SEO local para captaci\u00f3n de clientes corporativos.",
    metric: "+320% de tr\u00e1fico org\u00e1nico en 6 meses",
  },
  {
    icon: Flame,
    gradient: "from-[#1a0010] to-[#6e0033]",
    tag: "WhatsApp + Email",
    title: "Don Fuego \u2014 Restaurante",
    description:
      "Automatizaci\u00f3n de pedidos por WhatsApp y campa\u00f1a de email para fidelizaci\u00f3n de clientes.",
    metric: "+45% de pedidos recurrentes",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "AM",
    name: "Andrea Morales",
    role: "CEO \u00b7 Boutique Modo",
    quote:
      "En tres meses transformaron nuestra presencia en Instagram. Pasamos de publicar sin ning\u00fan criterio a tener una comunidad real que compra.",
    rating: 5,
  },
  {
    initials: "CR",
    name: "Carlos Rinc\u00f3n",
    role: "Director \u00b7 Constructora Arcos",
    quote:
      "El sitio web que dise\u00f1aron posicion\u00f3 en Google desde el primer mes. Ahora nos llegan clientes que antes ni sab\u00edan que exist\u00edamos.",
    rating: 5,
  },
  {
    initials: "JP",
    name: "Juliana Parra",
    role: "Propietaria \u00b7 Don Fuego",
    quote:
      "La automatizaci\u00f3n de WhatsApp fue un cambio total. Ya no perdemos pedidos y los clientes reciben atenci\u00f3n inmediata a cualquier hora.",
    rating: 5,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    icon: ChartPie,
    gradient: "from-[#0d1a2e] to-[#0d3366]",
    tag: "Email Marketing",
    title: "5 automatizaciones de email que duplican tus ventas",
    meta: "15 Mar 2025 \u00b7 6 min de lectura",
  },
  {
    icon: Layers,
    gradient: "from-[#1a0d2e] to-[#3d1a66]",
    tag: "Redes Sociales",
    title: "C\u00f3mo crear un calendario de contenido que funciona",
    meta: "8 Mar 2025 \u00b7 8 min de lectura",
  },
  {
    icon: Webhook,
    gradient: "from-[#0d2e1a] to-[#1a6630]",
    tag: "WhatsApp",
    title: "WhatsApp Business API: qu\u00e9 es y por qu\u00e9 necesitas usarlo ya",
    meta: "1 Mar 2025 \u00b7 5 min de lectura",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "TikTok", icon: FaTiktok, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
];

export const CONTACT = {
  phone: "+57 304 658 1143",
  email: "hola@stellaris.com.co",
} as const;
