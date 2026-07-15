import { useEffect, useState } from 'react'
import { updateMaxScroll } from '@/estrategia-digital/lib/tracking'

interface ScrollProgress {
  /** Porcentaje de scroll de la página (0-100). */
  progress: number
  /** true cuando la página se ha desplazado más allá del umbral (para la nav). */
  isScrolled: boolean
}

const SCROLLED_THRESHOLD = 30

/** Progreso de scroll de la página; alimenta la barra superior y el tracking. */
export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({ progress: 0, isScrolled: false })

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? Math.min(100, Math.round((scrollTop / scrollableHeight) * 100)) : 0
      updateMaxScroll(progress)
      setState({ progress, isScrolled: scrollTop > SCROLLED_THRESHOLD })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
