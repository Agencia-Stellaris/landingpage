/**
 * Meta Pixel cargado bajo demanda, SOLO tras el consentimiento de cookies.
 * Sustituye al snippet incondicional del <head>: así el tracking de terceros
 * respeta la política de tratamiento de datos.
 */

const PIXEL_ID = '1792530602187625'
const PIXEL_SRC = 'https://connect.facebook.net/en_US/fbevents.js'

interface FbqFunction {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: FbqFunction
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

let loaded = false

/** Inyecta el script del pixel e inicializa el PageView. Idempotente. */
export function loadMetaPixel(): void {
  if (loaded || window.fbq) return
  loaded = true

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue.push(args)
    }
  } as FbqFunction
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []

  window.fbq = fbq
  if (!window._fbq) window._fbq = fbq

  const script = document.createElement('script')
  script.async = true
  script.src = PIXEL_SRC
  document.head.appendChild(script)

  fbq('init', PIXEL_ID)
  fbq('track', 'PageView')
}
