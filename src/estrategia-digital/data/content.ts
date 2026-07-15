import {
  ChannelsIcon,
  CreativeIcon,
  CrmIcon,
  GrowthIcon,
  LaunchIcon,
  ReportIcon,
  StrategyIcon,
  TrackingIcon,
} from '@/estrategia-digital/components/icons'
import { siteConfig } from '@/estrategia-digital/config/site'
import type { FooterColumn, PipelineStage, ProcessStep, WhyCard } from '@/estrategia-digital/types'

/** Etapas del sistema 360° (sección "Sistema"). */
export const pipelineStages: PipelineStage[] = [
  {
    step: '01',
    category: 'Estrategia',
    title: 'Diseño de la campaña',
    description: 'Definimos objetivos, mensaje y audiencia. Sin un diagnóstico real, no hay estrategia.',
    icon: StrategyIcon,
  },
  {
    step: '02',
    category: 'Canales',
    title: 'Análisis de canales',
    description:
      'Priorizamos dónde está tu cliente: Meta, TikTok, LinkedIn, WhatsApp o email. Nada al azar.',
    icon: ChannelsIcon,
  },
  {
    step: '03',
    category: 'Web + CRM',
    title: 'Landing conectada a tu CRM',
    description:
      'Una landing de alta conversión que captura y envía cada dato directo a tu CRM u hoja de datos.',
    icon: CrmIcon,
  },
  {
    step: '04',
    category: 'Creatividad',
    title: 'Diseño de piezas',
    description:
      'Creativos y textos persuasivos, con principios de neuromarketing y la identidad de tu marca.',
    icon: CreativeIcon,
  },
  {
    step: '05',
    category: 'Activación',
    title: 'Publicación y pauta',
    description:
      'Lanzamos con supervisión técnica completa para un arranque sin fricciones ni presupuesto desperdiciado.',
    icon: LaunchIcon,
  },
  {
    step: '06',
    category: 'Datos',
    title: 'Seguimiento en vivo',
    description:
      'Monitoreamos rendimiento en tiempo real y optimizamos continuamente para maximizar el ROI.',
    icon: TrackingIcon,
  },
  {
    step: '07',
    category: 'Claridad',
    title: 'Reportes que conectan historias',
    description:
      'Métricas claras y transparentes. Si no se mide, no existe. Tú decides con datos, no con suposiciones.',
    icon: ReportIcon,
  },
  {
    step: '08',
    category: 'Crecimiento',
    title: 'Escalamos lo que funciona',
    description:
      'Doblamos la inversión donde hay retorno y cortamos lo que no vende. Crecimiento sostenible.',
    icon: GrowthIcon,
  },
]

/** Etiquetas de los nodos del radar del hero. */
export const radarNodes = [
  'Estrategia',
  'Canales',
  'Web + CRM',
  'Diseño',
  'Pauta',
  'Seguimiento',
  'Reportes',
  'Escala',
] as const

/** Tarjetas de la sección "Por qué elegirnos". */
export const whyCards: WhyCard[] = [
  {
    badge: '01 · Diagnóstico real',
    title: 'No asumimos. Analizamos.',
    description:
      'Antes de cualquier acción hacemos un diagnóstico profundo de tu negocio, tu competencia y tu audiencia. Construimos sobre datos, no sobre suposiciones.',
  },
  {
    badge: '02 · Especialistas de élite',
    title: 'Los mejores en cada disciplina.',
    description:
      'Equipo con certificaciones de Google, Meta y HubSpot. No somos comunes: somos expertos enfocados en un solo objetivo, el tuyo.',
  },
  {
    badge: '03 · Aliados, no proveedores',
    title: 'Tu crecimiento es la prioridad.',
    description:
      'No gestionamos cuentas: construimos relaciones. Trabajamos como una extensión estratégica de tu equipo, alineados a tus objetivos comerciales.',
  },
]

/** Pasos del proceso de trabajo. */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu negocio, audiencia, competencia y presencia digital actual.',
  },
  {
    number: '02',
    title: 'Estrategia',
    description: 'Plan personalizado con objetivos medibles, canales priorizados y KPIs definidos.',
  },
  {
    number: '03',
    title: 'Ejecución',
    description: 'Activamos campañas y landing con supervisión técnica completa, sin fricciones.',
  },
  {
    number: '04',
    title: 'Optimización',
    description: 'Datos en tiempo real, mejora continua y maximización del ROI.',
  },
]

/** Beneficios listados junto al formulario. */
export const formChecklist = [
  'Diagnóstico de tu situación digital, sin costo.',
  'Oportunidades priorizadas por impacto.',
  'Propuesta de estrategia a tu medida.',
  'Sin compromisos ni letras pequeñas.',
] as const

/** Columnas de enlaces del footer. */
export const footerColumns: FooterColumn[] = [
  {
    title: 'Servicios',
    links: [
      { label: 'Redes Sociales', href: siteConfig.services.redes, external: true },
      { label: 'Desarrollo Web', href: siteConfig.services.web, external: true },
      { label: 'WhatsApp Marketing', href: siteConfig.services.whatsapp, external: true },
      { label: 'Email Marketing', href: siteConfig.services.email, external: true },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Inicio', href: '#top' },
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Contacto', href: '#diagnostico' },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Política de privacidad', href: siteConfig.privacyUrl, external: true }],
  },
]
