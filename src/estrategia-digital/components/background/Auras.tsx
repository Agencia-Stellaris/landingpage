import styles from '@/estrategia-digital/styles/Background.module.css'

/** Auras difuminadas de color que dan atmósfera al fondo (decorativas). */
export function Auras() {
  return (
    <div aria-hidden="true">
      <div className={`${styles.aura} ${styles.a1}`} />
      <div className={`${styles.aura} ${styles.a2}`} />
      <div className={`${styles.aura} ${styles.a3}`} />
    </div>
  )
}
