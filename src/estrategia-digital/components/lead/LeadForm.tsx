import { Button } from '@/estrategia-digital/components/ui/Button'
import { siteConfig } from '@/estrategia-digital/config/site'
import { useLeadForm } from '@/estrategia-digital/hooks/useLeadForm'
import styles from '@/estrategia-digital/styles/LeadSection.module.css'
import { PhoneField, TextField, TextareaField } from './Fields'
import { SuccessMessage } from './SuccessMessage'

const PRIVACY_URL = siteConfig.privacyUrl

const REQUIRED_ERRORS = {
  nombres: 'Ingresa tus nombres.',
  apellidos: 'Ingresa tus apellidos.',
  correo: 'Ingresa un correo válido.',
  telefono: 'Ingresa un número de teléfono válido.',
  cargo: 'Indícanos tu cargo.',
  empresa: 'Indícanos tu empresa.',
} as const

/** Formulario de captación de leads con validación, progreso y estado de envío. */
export function LeadForm() {
  const {
    values,
    countryIndex,
    countries,
    invalidFields,
    status,
    submittedName,
    errorMessage,
    progress,
    canSubmit,
    handleFieldChange,
    handleCountryChange,
    handleSubmit,
  } = useLeadForm()

  if (status === 'success') {
    return <SuccessMessage name={submittedName} />
  }

  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.progress}>
        <span
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso del formulario"
        />
      </div>

      <div className={styles.row2}>
        <TextField
          name="nombres"
          label="Nombres"
          value={values.nombres}
          onChange={handleFieldChange}
          placeholder="Tu nombre"
          autoComplete="given-name"
          required
          invalid={invalidFields.has('nombres')}
          error={REQUIRED_ERRORS.nombres}
        />
        <TextField
          name="apellidos"
          label="Apellidos"
          value={values.apellidos}
          onChange={handleFieldChange}
          placeholder="Tus apellidos"
          autoComplete="family-name"
          required
          invalid={invalidFields.has('apellidos')}
          error={REQUIRED_ERRORS.apellidos}
        />
      </div>

      <TextField
        name="correo"
        label="Correo corporativo"
        type="email"
        value={values.correo}
        onChange={handleFieldChange}
        placeholder="nombre@empresa.com"
        autoComplete="email"
        inputMode="email"
        required
        invalid={invalidFields.has('correo')}
        error={REQUIRED_ERRORS.correo}
      />

      <PhoneField
        countries={countries}
        selectedIndex={countryIndex}
        onCountryChange={handleCountryChange}
        phone={values.telefono}
        onPhoneChange={handleFieldChange}
        invalid={invalidFields.has('telefono')}
        error={REQUIRED_ERRORS.telefono}
      />

      <div className={styles.row2}>
        <TextField
          name="cargo"
          label="Cargo"
          value={values.cargo}
          onChange={handleFieldChange}
          placeholder="Ej. Gerente de Marketing"
          autoComplete="organization-title"
          required
          invalid={invalidFields.has('cargo')}
          error={REQUIRED_ERRORS.cargo}
        />
        <TextField
          name="empresa"
          label="Empresa"
          value={values.empresa}
          onChange={handleFieldChange}
          placeholder="Nombre de tu empresa"
          autoComplete="organization"
          required
          invalid={invalidFields.has('empresa')}
          error={REQUIRED_ERRORS.empresa}
        />
      </div>

      <TextareaField
        name="interes"
        label="¿Qué te gustaría lograr?"
        value={values.interes}
        onChange={handleFieldChange}
        placeholder="Cuéntanos brevemente tu objetivo: más leads, escalar pauta, conectar tu CRM, lanzar una campaña…"
      />

      <div className={styles.consent}>
        <input
          type="checkbox"
          name="politica"
          id="politica"
          checked={values.politica}
          onChange={handleFieldChange}
        />
        <label htmlFor="politica">
          Acepto la{' '}
          {/* Sitio principal, pestaña nueva: no se pierden los datos ya diligenciados */}
          <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
            política de tratamiento de datos
          </a>{' '}
          y autorizo ser contactado por Stellaris. <span className={styles.required}>*</span>
        </label>
      </div>

      <Button type="submit" variant="primary" block disabled={!canSubmit || isSubmitting}>
        {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
        {isSubmitting ? 'Enviando…' : 'Enviar información →'}
      </Button>

      {status === 'error' && errorMessage && (
        <p className={styles.errorMsg} role="alert" style={{ textAlign: 'center', marginTop: 12 }}>
          {errorMessage}
        </p>
      )}

      <p className={styles.formNote}>Respuesta en menos de 24 horas hábiles.</p>
    </form>
  )
}
