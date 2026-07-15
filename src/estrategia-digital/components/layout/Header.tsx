import { Brand } from '@/estrategia-digital/components/ui/Brand'
import styles from '@/estrategia-digital/styles/Header.module.css'

interface HeaderProps {
  isScrolled: boolean
}

/** Barra de navegación fija con CTA principal. */
export function Header({ isScrolled }: HeaderProps) {
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`wrap ${styles.nav}`}>
        <Brand />
        <a className={styles.cta} href="#diagnostico">
          Quiero más información
        </a>
      </div>
    </header>
  )
}
