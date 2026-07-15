import { Reveal } from '@/estrategia-digital/components/ui/Reveal'
import { SectionHead } from '@/estrategia-digital/components/ui/SectionHead'
import { processSteps } from '@/estrategia-digital/data/content'
import styles from '@/estrategia-digital/styles/Process.module.css'

type RevealDelay = 1 | 2 | 3 | 4

/** Sección de proceso: los 4 pasos de trabajo. */
export function Process() {
  return (
    <section id="proceso">
      <div className="wrap">
        <SectionHead
          kicker="¿Cómo trabajamos?"
          title={
            <>
              Un proceso probado, <span className="grad-text">nunca improvisado</span>
            </>
          }
          description="Del diagnóstico a la ejecución, cada paso tiene un propósito claro para maximizar resultados y minimizar riesgos."
        />
        <ol className={styles.steps}>
          {processSteps.map((step, index) => (
            <Reveal key={step.number} as="li" delay={(index + 1) as RevealDelay} className={styles.step}>
              <div className={styles.number}>{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
