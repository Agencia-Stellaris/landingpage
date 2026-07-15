import type { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import type { Country } from '@/estrategia-digital/types'
import styles from '@/estrategia-digital/styles/LeadSection.module.css'

interface FieldShellProps {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  invalid?: boolean
  error?: string
  children: React.ReactNode
}

/** Contenedor de campo: label, control y mensaje de error accesible. */
function FieldShell({ id, label, required, optional, invalid, error, children }: FieldShellProps) {
  return (
    <div className={`${styles.field} ${invalid ? styles.invalid : ''}`}>
      <label htmlFor={id}>
        {label} {required && <span className={styles.required}>*</span>}
        {optional && <span className={styles.optional}>(opcional)</span>}
      </label>
      {children}
      {invalid && error && (
        <div className={styles.errorMsg} id={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  )
}

interface TextFieldProps {
  name: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute
  autoComplete?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  required?: boolean
  invalid?: boolean
  error?: string
}

export function TextField({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  inputMode,
  required,
  invalid,
  error,
}: TextFieldProps) {
  return (
    <FieldShell id={name} label={label} required={required} invalid={invalid} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid && error ? `${name}-error` : undefined}
      />
    </FieldShell>
  )
}

interface TextareaFieldProps {
  name: string
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

export function TextareaField({ name, label, value, onChange, placeholder }: TextareaFieldProps) {
  return (
    <FieldShell id={name} label={label} optional>
      <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </FieldShell>
  )
}

interface PhoneFieldProps {
  countries: Country[]
  selectedIndex: number
  onCountryChange: (event: ChangeEvent<HTMLSelectElement>) => void
  phone: string
  onPhoneChange: (event: ChangeEvent<HTMLInputElement>) => void
  invalid?: boolean
  error?: string
}

/** Campo de teléfono con selector de indicativo de país. */
export function PhoneField({
  countries,
  selectedIndex,
  onCountryChange,
  phone,
  onPhoneChange,
  invalid,
  error,
}: PhoneFieldProps) {
  return (
    <FieldShell id="telefono" label="Teléfono / WhatsApp" required invalid={invalid} error={error}>
      <div className={styles.phoneRow}>
        <select value={selectedIndex} onChange={onCountryChange} aria-label="Indicativo de país">
          {countries.map((country, index) => (
            <option key={`${country.name}-${country.dialCode}`} value={index}>
              {country.flag} {country.dialCode}
            </option>
          ))}
        </select>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={phone}
          onChange={onPhoneChange}
          autoComplete="tel"
          inputMode="numeric"
          placeholder="300 000 0000"
          aria-invalid={invalid || undefined}
          aria-describedby={invalid && error ? 'telefono-error' : undefined}
        />
      </div>
    </FieldShell>
  )
}
