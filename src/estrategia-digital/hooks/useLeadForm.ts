import { useCallback, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { countries } from '@/estrategia-digital/data/countries'
import { submitLead } from '@/estrategia-digital/lib/leadService'
import { formatDuration, getDwellSeconds, getMaxScroll, getTrackingBase, markConverted } from '@/estrategia-digital/lib/tracking'
import { isFilled, isValidEmail, isValidPhone } from '@/estrategia-digital/lib/validation'
import type { Country, LeadFormValues, LeadPayload, RequiredTextField } from '@/estrategia-digital/types'

const REQUIRED_FIELDS: RequiredTextField[] = ['nombres', 'apellidos', 'correo', 'telefono', 'cargo', 'empresa']

const INITIAL_VALUES: LeadFormValues = {
  nombres: '',
  apellidos: '',
  correo: '',
  telefono: '',
  cargo: '',
  empresa: '',
  interes: '',
  politica: false,
}

const DEFAULT_COUNTRY: Country = countries[0]!

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function isFieldValid(field: RequiredTextField, values: LeadFormValues): boolean {
  const value = values[field]
  if (field === 'correo') return isValidEmail(value)
  if (field === 'telefono') return isValidPhone(value)
  return isFilled(value)
}

function buildPayload(values: LeadFormValues, country: Country): LeadPayload {
  const dwell = getDwellSeconds()
  const phone = values.telefono.trim()
  return {
    action: 'lead',
    fecha_creacion: new Date().toISOString(),
    fecha_creacion_local: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
    nombres: values.nombres.trim(),
    apellidos: values.apellidos.trim(),
    correo: values.correo.trim(),
    indicativo: country.dialCode,
    pais: country.name,
    telefono: phone,
    telefono_completo: `${country.dialCode} ${phone}`,
    cargo: values.cargo.trim(),
    empresa: values.empresa.trim(),
    interes: values.interes.trim(),
    politica_aceptada: 'Sí',
    tiempo_en_sitio_seg: dwell,
    tiempo_en_sitio_legible: formatDuration(dwell),
    scroll_max_pct: getMaxScroll(),
    ...getTrackingBase(),
  }
}

/** Estado, validación, progreso y envío del formulario de lead. */
export function useLeadForm() {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES)
  const [countryIndex, setCountryIndex] = useState(0)
  const country: Country = countries[countryIndex] ?? DEFAULT_COUNTRY
  const [invalidFields, setInvalidFields] = useState<Set<RequiredTextField>>(new Set())
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [submittedName, setSubmittedName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const progress = useMemo(() => {
    const completed = REQUIRED_FIELDS.filter((field) => isFieldValid(field, values)).length + (values.politica ? 1 : 0)
    const percent = Math.round((completed / (REQUIRED_FIELDS.length + 1)) * 100)
    return Math.max(10, percent)
  }, [values])

  const canSubmit = useMemo(
    () => REQUIRED_FIELDS.every((field) => isFieldValid(field, values)) && values.politica,
    [values],
  )

  const handleFieldChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target
    const isCheckbox = target instanceof HTMLInputElement && target.type === 'checkbox'
    setValues((prev) => ({ ...prev, [target.name]: isCheckbox ? target.checked : target.value }))
  }, [])

  const handleCountryChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setCountryIndex(Number(event.target.value))
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const invalid = new Set(REQUIRED_FIELDS.filter((field) => !isFieldValid(field, values)))
      setInvalidFields(invalid)
      if (invalid.size > 0 || !values.politica) return

      setStatus('submitting')
      setErrorMessage('')
      try {
        await submitLead(buildPayload(values, country))
        setSubmittedName(values.nombres.trim() || 'tu solicitud está en marcha')
        setStatus('success')
        markConverted()
      } catch (error) {
        console.error('Error al enviar el lead:', error)
        setErrorMessage(
          'Hubo un problema al enviar tus datos. Escríbenos a hola@stellaris.com.co o inténtalo de nuevo.',
        )
        setStatus('error')
      }
    },
    [values, country],
  )

  return {
    values,
    country,
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
  }
}
