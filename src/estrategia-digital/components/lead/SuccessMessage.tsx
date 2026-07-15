import { CheckIcon } from '@/estrategia-digital/components/icons'
import styles from '@/estrategia-digital/styles/LeadSection.module.css'

interface SuccessMessageProps {
  name: string
}

/** Estado de conversión tras enviar el formulario. */
export function SuccessMessage({ name }: SuccessMessageProps) {
  return (
    <div className={styles.success} role="status" aria-live="polite">
      <div className={styles.check}>
        <CheckIcon />
      </div>
      <h3 className="grad-text">¡Muchas gracias por dejarnos tus datos! 🚀</h3>
      <p>
        ¿Sabes?, <b>{name}</b>. Un estratega de Stellaris revisará tu caso y te contactará muy pronto para que
        conversemos juntos sobre tus proyectos y metas.
      </p>
    </div>
  )
}
