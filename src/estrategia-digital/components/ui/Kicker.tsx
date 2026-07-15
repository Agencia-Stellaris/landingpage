import type { ReactNode } from 'react'
import styles from '@/estrategia-digital/styles/Kicker.module.css'

interface KickerProps {
  children: ReactNode
}

/** Etiqueta superior tipo "eyebrow" con punto luminoso. */
export function Kicker({ children }: KickerProps) {
  return (
    <span className={styles.kicker}>
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  )
}
