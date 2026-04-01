import { useState, useCallback } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../data/content";
import isologo from "../../assets/logo/stellaris_Isologo.png";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = useCallback(() => setMobileOpen((prev) => !prev), []);
  const close = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg-primary/85 backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-[5%] py-4"
        aria-label="Navegaci&oacute;n principal"
      >
        {/* Logo: isologo + brand name */}
        <a href="#inicio" className="flex items-center gap-2">
          <img
            src={isologo}
            alt=""
            className="h-7 w-7"
            aria-hidden="true"
          />
          <span className="font-heading text-xl font-bold gradient-text">
            stellaris
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-7 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contacto"
          className="group relative hidden items-center gap-2 overflow-hidden rounded-full gradient-bg px-5 py-2.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(255,77,109,0.3)] md:inline-flex"
        >
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden="true"
          />
          <span className="relative z-10">Solicitar cotizaci&oacute;n</span>
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-text-muted transition-colors hover:text-text-primary md:hidden"
          onClick={toggle}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Cerrar men\u00fa" : "Abrir men\u00fa"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={clsx(
          "overflow-hidden border-t border-border bg-bg-primary/95 backdrop-blur-sm transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-96 py-4" : "max-h-0 py-0",
        )}
        role="region"
        aria-label="Men\u00fa m\u00f3vil"
      >
        <ul className="flex flex-col gap-1 px-[5%]" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-lg px-4 py-3 text-sm text-text-muted transition-colors hover:bg-white/[0.04] hover:text-text-primary"
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contacto"
              className="block rounded-full gradient-bg px-5 py-3 text-center font-heading text-sm font-bold text-white"
              onClick={close}
            >
              Solicitar cotizaci&oacute;n
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
