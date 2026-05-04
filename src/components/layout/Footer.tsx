import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../../data/content";
import isologo from "../../assets/logo/stellaris_Isologo.png";
import { HashLink } from "../routing/HashLink";

const SERVICE_LINKS = [
  { label: "Redes Sociales", href: "/#servicios" },
  { label: "Desarrollo Web", href: "/#servicios" },
  { label: "WhatsApp Marketing", href: "/servicios/whatsapp-marketing" },
  { label: "Email Marketing", href: "/#servicios" },
];

const COMPANY_LINKS = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

const LEGAL_LINKS = [
  { label: "Pol\u00edtica de privacidad", href: "#" },
  { label: "T\u00e9rminos de servicio", href: "#" },
  { label: "Cookies", href: "#" },
];

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold tracking-wide">{title}</h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => {
          const cls = "text-sm text-text-muted transition-colors hover:text-text-primary";
          const isHashLink = link.href.includes("#") && link.href !== "#";
          const isInternalRoute = link.href.startsWith("/") && !isHashLink;
          return (
            <li key={link.label}>
              {isHashLink ? (
                <HashLink to={link.href} className={cls}>
                  {link.label}
                </HashLink>
              ) : isInternalRoute ? (
                <Link to={link.href} className={cls}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className={cls}>
                  {link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-bg-primary px-[5%] pb-8 pt-14"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top grid */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <HashLink to="/#inicio" className="mb-4 flex items-center gap-2">
              <img src={isologo} alt="" className="h-7 w-7" aria-hidden="true" />
              <span className="font-heading text-xl font-bold gradient-text">
                stellaris
              </span>
            </HashLink>
            <p className="max-w-[240px] text-sm leading-relaxed text-text-muted">
              Agencia de marketing digital especializada en hacer crecer marcas
              en el entorno digital con estrategia, creatividad y resultados
              medibles.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition-all hover:border-accent-pink/30 hover:bg-accent-pink/[0.08] hover:text-text-primary"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Servicios" links={SERVICE_LINKS} />
          <FooterColumn title="Empresa" links={COMPANY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-text-muted sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Todos los derechos reservados</span>
          <span>Hecho con &hearts; en Colombia</span>
        </div>
      </div>
    </footer>
  );
}
