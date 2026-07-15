import { CheckIcon, ShieldIcon } from '@/estrategia-digital/components/icons'
import { Kicker } from '@/estrategia-digital/components/ui/Kicker'
import { Reveal } from '@/estrategia-digital/components/ui/Reveal'
import { formChecklist } from '@/estrategia-digital/data/content'
import styles from '@/estrategia-digital/styles/LeadSection.module.css'
import { LeadForm } from './LeadForm'

/** Sección de conversión: propuesta + formulario de diagnóstico gratuito. */
export function LeadSection() {
  return (
    <section className={styles.section} id="diagnostico">
      <div className="wrap">
        <Reveal className={styles.shell}>
          <div className={styles.left}>
            <Kicker>¡Contáctanos!</Kicker>
            <h2>Descubre el potencial oculto de tu marca con nosotros</h2>
            <p>
              Déjanos tus datos y un estratega del equipo te contactará. Recibirás un diagnóstico con
              oportunidades concretas para convertir tu inversión en clientes.
            </p>
            <ul className={styles.checklist}>
              {formChecklist.map((item) => (
                <li key={item}>
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.reassure}>
              <ShieldIcon />
              Tus datos están protegidos y solo se usan para contactarte respecto a tu interés.
            </div>
            <p className={styles.note}>
              <b>¡Recuerda!</b> Stellaris es un grupo de profesionales que laboramos de manera{' '}
              <b>freelance</b>. Esto te ayudará a conocer nuestro esquema de trabajo.
            </p>
          </div>

          <div>
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
