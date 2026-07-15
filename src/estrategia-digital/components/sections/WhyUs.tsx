import { Button } from '@/estrategia-digital/components/ui/Button'
import { Reveal } from '@/estrategia-digital/components/ui/Reveal'
import { SectionHead } from '@/estrategia-digital/components/ui/SectionHead'
import { whyCards } from '@/estrategia-digital/data/content'
import styles from '@/estrategia-digital/styles/WhyUs.module.css'

type RevealDelay = 1 | 2 | 3

/** Sección de autoridad: por qué elegir a Stellaris. */
export function WhyUs() {
  return (
    <section className={styles.section} id="nosotros">
      <div className="wrap">
        <SectionHead
          kicker="¿Por qué Stellaris?"
          title={
            <>
              El mercado está lleno de agencias que prometen.
              <br />
              <span className="grad-text">Nosotros lo demostramos.</span>
            </>
          }
          description="No todos los especialistas son iguales. Los nuestros están entre los mejores de cada disciplina."
        />
        <div className={styles.grid}>
          {whyCards.map((card, index) => (
            <Reveal key={card.badge} delay={(index + 1) as RevealDelay} className={styles.card}>
              <span className={styles.badge}>{card.badge}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.cta}>
          <Button href="#diagnostico" variant="primary">
            Contacta a un experto →
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
