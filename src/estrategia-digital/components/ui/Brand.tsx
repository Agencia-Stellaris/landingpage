import { siteConfig } from '@/estrategia-digital/config/site'
import styles from '@/estrategia-digital/styles/Brand.module.css'

interface BrandProps {
  /** Tamaño del isologo en px (por defecto 30). */
  iconSize?: number
  className?: string
}

/** Marca Stellaris (isologo + nombre). Enlaza al inicio. */
export function Brand({ iconSize = 30, className }: BrandProps) {
  return (
    <a className={[styles.brand, className].filter(Boolean).join(' ')} href="#top">
      <img src={siteConfig.logo} alt="Stellaris" width={iconSize} height={iconSize} />
      <span>stellaris</span>
    </a>
  )
}
