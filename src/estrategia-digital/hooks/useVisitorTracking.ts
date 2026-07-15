import { useEffect } from 'react'
import { registerExit, registerVisit } from '@/estrategia-digital/lib/tracking'

/** Registra la visita al entrar y la salida al ocultar/cerrar la pestaña. */
export function useVisitorTracking(): void {
  useEffect(() => {
    registerVisit()

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') registerExit()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', registerExit)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', registerExit)
    }
  }, [])
}
