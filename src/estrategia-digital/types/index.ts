import type { ComponentType, SVGProps } from 'react'

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

export interface Country {
  name: string
  dialCode: string
  flag: string
}

export interface PipelineStage {
  step: string
  category: string
  title: string
  description: string
  icon: IconComponent
}

export interface WhyCard {
  badge: string
  title: string
  description: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

/* ---------- Páginas de servicio ---------- */

export type ServiceIconKey =
  | 'strategy'
  | 'content'
  | 'community'
  | 'ads'
  | 'metrics'
  | 'reputation'
  | 'ux'
  | 'responsive'
  | 'seo'
  | 'aeo'
  | 'speed'
  | 'crm'
  | 'landing'
  | 'shop'
  | 'support'
  | 'api'
  | 'segment'
  | 'automate'
  | 'broadcast'
  | 'bot'
  | 'template'
  | 'automation'
  | 'abtest'
  | 'platform'
  | 'reports'
  | 'deliverability'
  | 'cart'
  | 'nurture'
  | 'reactivate'
  | 'revenue'

/** Fragmento de título: texto plano o resaltado con degradado. */
export interface TitlePart {
  text: string
  highlight?: boolean
}

export interface ServicePillar {
  title: string
  description: string
  icon: ServiceIconKey
}

export interface ServiceFeature {
  tag: string
  title: string
  description: string
  icon: ServiceIconKey
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface Service {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  schemaName: string
  schemaType: string
  schemaDescription: string
  heroTitle: TitlePart[]
  heroLead: string
  ctaLabel: string
  introKicker: string
  introHeading: TitlePart[]
  introParagraphs: string[]
  pillars: ServicePillar[]
  includes: ServiceFeature[]
  faqs?: ServiceFaq[]
}

export interface LeadFormValues {
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  cargo: string
  empresa: string
  interes: string
  politica: boolean
}

export type LeadFieldName = keyof LeadFormValues

/** Campos de texto obligatorios (excluye consentimiento). */
export type RequiredTextField = 'nombres' | 'apellidos' | 'correo' | 'telefono' | 'cargo' | 'empresa'

/** Payload que se envía al endpoint (Google Apps Script) al convertir un lead. */
export interface LeadPayload {
  action: 'lead'
  fecha_creacion: string
  fecha_creacion_local: string
  nombres: string
  apellidos: string
  correo: string
  indicativo: string
  pais: string
  telefono: string
  telefono_completo: string
  cargo: string
  empresa: string
  interes: string
  politica_aceptada: string
  tiempo_en_sitio_seg: number
  tiempo_en_sitio_legible: string
  scroll_max_pct: number
  [key: string]: string | number
}

export interface TrackingBase {
  session_id: string
  referrer: string
  landing_url: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  dispositivo: string
  navegador: string
  idioma: string
  resolucion: string
}
