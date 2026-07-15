import type { ElementType, ReactNode } from 'react'
import { useReveal } from '@/estrategia-digital/hooks/useReveal'
import styles from '@/estrategia-digital/styles/Reveal.module.css'

type Delay = 1 | 2 | 3 | 4

interface RevealProps {
  children: ReactNode
  /** Retraso escalonado de la animación (0.08s × delay). */
  delay?: Delay
  /** Elemento a renderizar (por defecto div). */
  as?: ElementType
  className?: string
}

/** Anima la entrada de su contenido cuando aparece en el viewport. */
export function Reveal({ children, delay, as: Tag = 'div', className }: RevealProps) {
  const { ref, isVisible } = useReveal()
  const classes = [
    styles.reveal,
    isVisible ? styles.visible : '',
    delay ? styles[`d${delay}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  )
}
