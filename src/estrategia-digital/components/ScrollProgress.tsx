import styles from '@/estrategia-digital/styles/ScrollProgress.module.css'

interface ScrollProgressProps {
  progress: number
}

/** Barra superior que refleja el progreso de scroll de la página. */
export function ScrollProgress({ progress }: ScrollProgressProps) {
  return <div className={styles.bar} style={{ width: `${progress}%` }} aria-hidden="true" />
}
