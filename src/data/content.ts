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
  subtitle: string;
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
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
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
      "WhatsApp tiene m\u00e1s de 2.000 millones de usuarios activos y tasas de apertura que superan el 90%. En Stellaris convertimos ese potencial en conversaciones reales que generan ventas, fidelizan clientes y construyen relaciones duraderas con tu audiencia.",
    href: "/servicios/whatsapp-marketing",
  },
  {
    icon: FaInstagram,
    iconColor: "from-[#f77737] via-[#e1306c] to-[#833ab4]",
    title: "Redes Sociales",
    description:
      "La gesti\u00f3n profesional de redes sociales va mucho m\u00e1s all\u00e1 de publicar contenido. En Stellaris construimos comunidades reales, narrativas de marca que conectan y estrategias de contenido que generan conversaciones, prospectos y ventas.",
    href: "/servicios/redes-sociales",
  },
  {
    icon: Globe,
    iconColor: "from-[#a855f7] to-[#6d28d9]",
    title: "Dise\u00f1o y desarrollo web",
    description:
      "En Stellaris dise\u00f1amos y desarrollamos sitios web que no solo se ven bien, sino que trabajan estrat\u00e9gicamente por tu negocio. Cada elemento visual, cada estructura de navegaci\u00f3n y cada l\u00ednea de c\u00f3digo est\u00e1 pensada para atraer, convencer y convertir.",
    href: "/servicios/desarrollo-web",
  },
  {
    icon: AtSign,
    iconColor: "from-[#06b6d4] to-[#0e7490]",
    title: "Email Marketing",
    description:
      "Con un retorno muy alto, el email marketing sigue siendo uno de los canales m\u00e1s rentables del ecosistema digital. En Stellaris dise\u00f1amos estrategias que nutren leads, reactivan clientes y generan ingresos predecibles para tu organizaci\u00f3n.",
    href: "#",
  },
];

export const WHY_US_ITEMS: WhyUsItem[] = [
  {
    number: "01",
    title: "Diagn\u00f3stico estrat\u00e9gico real",
    subtitle: "No asumimos. Analizamos.",
    description:
      "Antes de cualquier acci\u00f3n, hacemos un diagn\u00f3stico profundo de tu negocio, tu competencia y tu audiencia. Construimos estrategias sobre datos, no suposiciones.",
  },
  {
    number: "02",
    title: "Especialistas de alto nivel",
    subtitle: "Los mejores en cada disciplina.",
    description:
      "Nuestro equipo est\u00e1 compuesto por especialistas con certificaciones de Google, Meta, HubSpot y otras plataformas l\u00edderes. No somos comunes: somos expertos en lo que hacemos.",
  },
  {
    number: "03",
    title: "Resultados medibles",
    subtitle: "Si no se mide, no existe.",
    description:
      "Cada campa\u00f1a, cada pieza de contenido, cada acci\u00f3n que ejecutamos tiene m\u00e9tricas claras. Entregamos reportes transparentes y tomamos decisiones basadas en datos reales.",
  },
  {
    number: "04",
    title: "Estrategias 360\u00b0",
    subtitle: "Todas las piezas conectadas.",
    description:
      "No vendemos servicios independientes. Dise\u00f1amos ecosistemas digitales donde cada canal refuerza al otro: redes sociales, web, email y WhatsApp trabajando como un sistema unificado.",
  },
  {
    number: "05",
    title: "Aliados, no proveedores",
    subtitle: "Tu crecimiento es nuestra prioridad.",
    description:
      "En Stellaris no gestionamos cuentas: construimos relaciones. Entendemos tu modelo de negocio, tus objetivos comerciales y trabajamos como una extensi\u00f3n estrat\u00e9gica de tu equipo.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagn\u00f3stico",
    description:
      "Analizamos tu negocio, tu audiencia, tu competencia y tu presencia digital actual. Sin diagn\u00f3stico real, no hay estrategia real.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Dise\u00f1amos un plan de acci\u00f3n personalizado con objetivos medibles, canales priorizados y KPIs definidos desde el inicio.",
  },
  {
    number: "03",
    title: "Ejecuci\u00f3n",
    description:
      "Activamos las campa\u00f1as y estrategias con supervisi\u00f3n t\u00e9cnica completa para asegurar un arranque sin fricciones.",
  },
  {
    number: "04",
    title: "Optimizaci\u00f3n",
    description:
      "Analizamos los datos en tiempo real, identificamos oportunidades de mejora y optimizamos continuamente para maximizar el ROI.",
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
