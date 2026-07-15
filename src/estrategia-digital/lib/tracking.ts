import { leadConfig } from '@/estrategia-digital/config/site'
import type { TrackingBase } from '@/estrategia-digital/types'

/**
 * Métricas y beacons de sesión (visita, salida, dwell y scroll máximo).
 * Estado a nivel de módulo: una sola sesión por carga de página.
 */

const SESSION_KEY = 'st_sid'
const startTime = Date.now()
let maxScroll = 0
let exitSent = false

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `st_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

function getUtmParams() {
  const params = new URLSearchParams(location.search)
  const read = (key: string) => params.get(key) ?? ''
  return {
    utm_source: read('utm_source'),
    utm_medium: read('utm_medium'),
    utm_campaign: read('utm_campaign'),
    utm_content: read('utm_content'),
    utm_term: read('utm_term'),
  }
}

function getDeviceInfo() {
  const ua = navigator.userAgent
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua)
  const browser = /Edg/i.test(ua)
    ? 'Edge'
    : /Chrome/i.test(ua)
      ? 'Chrome'
      : /Firefox/i.test(ua)
        ? 'Firefox'
        : /Safari/i.test(ua)
          ? 'Safari'
          : 'Otro'

  return {
    dispositivo: isMobile ? 'Móvil' : 'Escritorio',
    navegador: browser,
    idioma: navigator.language || '',
    resolucion: `${window.screen.width}x${window.screen.height}`,
  }
}

export function getTrackingBase(): TrackingBase {
  return {
    session_id: getSessionId(),
    referrer: document.referrer || 'directo',
    landing_url: location.href,
    ...getUtmParams(),
    ...getDeviceInfo(),
  }
}

export function getDwellSeconds(): number {
  return Math.round((Date.now() - startTime) / 1000)
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function updateMaxScroll(percent: number): void {
  if (percent > maxScroll) maxScroll = percent
}

export function getMaxScroll(): number {
  return maxScroll
}

/** No dispares más beacons de salida (p. ej. tras convertir). */
export function markConverted(): void {
  exitSent = true
}

/** Envía un beacon sin bloquear la navegación. En modo demo solo registra en consola. */
function sendBeacon(payload: Record<string, unknown>): void {
  try {
    if (leadConfig.demoMode || !leadConfig.endpoint) {
      console.log('[Stellaris tracking · DEMO]', payload)
      return
    }
    const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=utf-8' })
    navigator.sendBeacon(leadConfig.endpoint, blob)
  } catch (error) {
    console.warn('beacon error', error)
  }
}

export function registerVisit(): void {
  sendBeacon({ action: 'visit', entrada_iso: new Date().toISOString(), ...getTrackingBase() })
}

export function registerExit(): void {
  if (exitSent) return
  exitSent = true
  sendBeacon({
    action: 'exit',
    salida_iso: new Date().toISOString(),
    tiempo_en_sitio_seg: getDwellSeconds(),
    scroll_max_pct: maxScroll,
    ...getTrackingBase(),
  })
}
