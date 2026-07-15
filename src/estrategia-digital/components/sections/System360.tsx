import { Reveal } from '@/estrategia-digital/components/ui/Reveal'
import { SectionHead } from '@/estrategia-digital/components/ui/SectionHead'
import { pipelineStages } from '@/estrategia-digital/data/content'
import styles from '@/estrategia-digital/styles/System360.module.css'

type RevealDelay = 1 | 2 | 3 | 4

/** Sección "Sistema 360°": las 8 etapas del ecosistema conectado. */
export function System360() {
  return (
    <section id="sistema">
      <div className="wrap">
        <SectionHead
          title={
            <>
              No vendemos servicios sueltos.
              <br />
              <span className="grad-text">Diseñamos un sistema que convierte.</span>
            </>
          }
          description="Cada pieza conectada a la siguiente. Del primer clic al cierre, con todo trabajando como un ecosistema unificado."
        />
        <div className={styles.grid}>
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon
            const delay = ((index % 4) + 1) as RevealDelay
            return (
              <Reveal key={stage.step} delay={delay} className={styles.pipe}>
                <div className={styles.step}>
                  {stage.step} · {stage.category}
                </div>
                <div className={styles.icon}>
                  <Icon />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
