import type { SVGProps } from 'react'

/**
 * Iconos SVG de la marca, tipados y reutilizables.
 * `aria-hidden` por defecto: son decorativos salvo que se indique lo contrario.
 */
type IconProps = SVGProps<SVGSVGElement>

const baseProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const

/* ---------- Iconos del sistema 360 (pipeline) ---------- */

export function StrategyIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8l2 2M6 18l2-2m8-8l2-2" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  )
}

export function ChannelsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 20V10m6 10V4m6 16v-7m6 7V8" strokeLinecap="round" />
    </svg>
  )
}

export function CrmIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M3 9h18M8 21h8" strokeLinecap="round" />
    </svg>
  )
}

export function CreativeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 19l7-7-4-4-7 7-3 3 3 1z" strokeLinejoin="round" />
      <path d="M14 6l4 4" />
    </svg>
  )
}

export function LaunchIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M13 2L4 14h6l-1 8 9-12h-6z" strokeLinejoin="round" />
    </svg>
  )
}

export function TrackingIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  )
}

export function ReportIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 16v-4m4 4V8m4 8v-6" strokeLinecap="round" />
    </svg>
  )
}

export function GrowthIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 3h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------- Iconos de UI ---------- */

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...baseProps} fill="none" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------- Iconos sociales (footer) ---------- */

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseProps} fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseProps} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...baseProps} fill="currentColor" {...props}>
      <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3C16.6 2.2 15.6 2 14.5 2 12 2 10.3 3.5 10.3 6.4v2.1H8v3h2.3V21H14v-9.5h2.5l.4-3z" />
    </svg>
  )
}
