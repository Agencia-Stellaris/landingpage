import type { ReactNode } from 'react'
import styles from '@/estrategia-digital/styles/SectionHead.module.css'
import { Reveal } from './Reveal'
import { Kicker } from './Kicker'

interface SectionHeadProps {
  kicker?: ReactNode
  title: ReactNode
  description?: ReactNode
}

/** Encabezado de sección centrado: kicker opcional + título + descripción. */
export function SectionHead({ kicker, title, description }: SectionHeadProps) {
  return (
    <Reveal className={styles.head}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  )
}
