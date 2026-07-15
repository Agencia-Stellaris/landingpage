import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from '@/estrategia-digital/styles/Button.module.css'

type Variant = 'primary' | 'ghost'

interface CommonProps {
  variant?: Variant
  block?: boolean
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonAsLink = CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonProps = ButtonAsButton | ButtonAsLink

/** Botón/enlace de la marca. Renderiza <a> si recibe `href`, si no, <button>. */
export function Button({ variant = 'primary', block, children, className, ...rest }: ButtonProps) {
  const classes = [styles.btn, styles[variant], block ? styles.block : '', className].filter(Boolean).join(' ')

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
