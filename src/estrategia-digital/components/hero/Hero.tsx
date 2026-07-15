import { Button } from '@/estrategia-digital/components/ui/Button'
import { Reveal } from '@/estrategia-digital/components/ui/Reveal'
import styles from '@/estrategia-digital/styles/Hero.module.css'
import { Radar } from './Radar'

/** Sección principal: propuesta de valor + radar 360°. */
export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Reveal as="h1" delay={1}>
            Deja de conseguir clientes a ciegas.
            <br />
            <span className="grad-text">Empieza a obtener leads con estrategia.</span>
          </Reveal>
          <Reveal as="p" delay={2} className={styles.lead}>
            Mientras tu competencia le habla a tus clientes, tú deberías tener un sistema automatizado y completo
            para que lleguen a ti. En Stellaris diseñamos, conectamos y medimos toda tu estrategia digital —de la
            pauta al cierre— para convertir tu presupuesto en clientes reales.
          </Reveal>
          <Reveal delay={3} className={styles.actions}>
            <Button href="#diagnostico" variant="primary">
              Contacta a un experto →
            </Button>
            <Button href="#sistema" variant="ghost">
              Ver cómo funciona
            </Button>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <Radar />
        </Reveal>
      </div>
    </section>
  )
}
