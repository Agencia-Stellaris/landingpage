import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/estrategia-digital/components/icons'
import { Brand } from '@/estrategia-digital/components/ui/Brand'
import { siteConfig } from '@/estrategia-digital/config/site'
import { footerColumns } from '@/estrategia-digital/data/content'
import styles from '@/estrategia-digital/styles/Footer.module.css'

const socialLinks = [
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: 'Instagram', href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: siteConfig.social.facebook, Icon: FacebookIcon },
]

/** Pie de página: marca, redes, enlaces y aviso legal. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Brand iconSize={26} />
            <p>
              Somos un equipo freelance de perfiles seniors, especializados en hacer crecer marcas en el entorno
              digital con estrategia, creatividad y resultados medibles.
            </p>
            <div className={styles.social}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} className={styles.col} aria-label={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className={styles.legal}>
          <span>© 2026 Todos los derechos reservados</span>
          <span>Hecho con ♥ en Colombia</span>
        </div>
      </div>
    </footer>
  )
}
