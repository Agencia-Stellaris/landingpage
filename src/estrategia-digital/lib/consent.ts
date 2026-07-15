export type CookieConsent = 'accepted' | 'rejected'

const CONSENT_KEY = 'cookieConsent'

/** Lee el consentimiento guardado; null si aún no ha decidido. */
export function readConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

/** Persiste la decisión. Si localStorage no está disponible (modo privado),
 *  el banner simplemente reaparecerá en la próxima visita. */
export function writeConsent(value: CookieConsent): void {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* noop */
  }
}
