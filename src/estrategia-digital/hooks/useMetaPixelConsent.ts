import { useEffect } from 'react'
import { readConsent } from '@/estrategia-digital/lib/consent'
import { loadMetaPixel } from '@/estrategia-digital/lib/metaPixel'

/** Evento que dispara el banner de cookies del sitio principal al elegir. */
export const CONSENT_EVENT = 'stellaris:cookieconsent'

/**
 * Carga el Meta Pixel SOLO tras el consentimiento gestionado por el sitio
 * principal (misma clave localStorage 'cookieConsent'). No renderiza banner
 * propio: reutiliza el del sitio para no duplicar el consentimiento.
 */
export function useMetaPixelConsent(): void {
  useEffect(() => {
    if (readConsent() === 'accepted') {
      loadMetaPixel()
      return
    }
    const onChange = () => {
      if (readConsent() === 'accepted') loadMetaPixel()
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    window.addEventListener('storage', onChange) // aceptación en otra pestaña
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])
}
