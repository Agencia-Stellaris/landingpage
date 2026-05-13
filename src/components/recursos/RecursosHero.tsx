import { ArrowLeft } from "lucide-react";
import { HashLink } from "../routing/HashLink";
import { HighlightText } from "../ui/HighlightText";

export function RecursosHero() {
  return (
    <header className="mx-auto max-w-6xl px-[5%]">
      <nav aria-label="Migas de pan" className="mb-7">
        <ol className="inline-flex items-center gap-2 text-xs font-semibold uppercase leading-none tracking-[2px] text-text-muted">
          <li className="inline-flex items-center">
            <HashLink
              to="/#inicio"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent-pink"
            >
              <ArrowLeft size={12} aria-hidden="true" />
              Inicio
            </HashLink>
          </li>
          <li
            className="inline-flex items-center text-text-muted/40"
            aria-hidden="true"
          >
            /
          </li>
          <li
            className="inline-flex items-center text-accent-pink"
            aria-current="page"
          >
            Recursos
          </li>
        </ol>
      </nav>

      <h1
        id="recursos-heading"
        className="font-heading text-hero font-extrabold tracking-[-1.5px]"
      >
        Biblioteca de <HighlightText>marketing digital.</HighlightText>
      </h1>

      <p className="mt-5 max-w-2xl text-lg text-text-muted">
        Guías, plantillas, casos, webinars y herramientas que usamos en
        Stellaris todos los días. Gratis y sin formulario.
      </p>
    </header>
  );
}
