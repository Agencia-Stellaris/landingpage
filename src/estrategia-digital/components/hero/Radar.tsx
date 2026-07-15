import { radarNodes } from '@/estrategia-digital/data/content'
import styles from '@/estrategia-digital/styles/Radar.module.css'

const RADIUS_PERCENT = 42

/** Radar 360° con nodos posicionados en círculo (firma visual del hero). */
export function Radar() {
  return (
    <div className={styles.radar} aria-hidden="true">
      <div className={styles.ring} />
      <div className={`${styles.ring} ${styles.r2}`} />
      <div className={`${styles.ring} ${styles.r3}`} />
      <div className={`${styles.ring} ${styles.r4}`} />
      <div className={styles.sweep} />
      <div className={styles.core}>
        ESTRATEGIA
        <br />
        OMNICANAL
      </div>

      {radarNodes.map((label, index) => {
        const angle = (index / radarNodes.length) * Math.PI * 2 - Math.PI / 2
        const left = 50 + Math.cos(angle) * RADIUS_PERCENT
        const top = 50 + Math.sin(angle) * RADIUS_PERCENT
        return (
          <div
            key={label}
            className={styles.chip}
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * 0.4}s` }}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}
