import { ArrowLeft } from "lucide-react";
import { HashLink } from "../routing/HashLink";
import { HighlightText } from "../ui/HighlightText";

export function RecursosHero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-10"
      aria-labelledby="recursos-heading"
    >
      <div
        aria-hidden="true"
        className="orb -left-32 top-20 h-80 w-80 bg-accent-purple/15"
      />
      <div
        aria-hidden="true"
        className="orb -right-32 -top-20 h-72 w-72 bg-accent-pink/15"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-[5%]">
        <HashLink
          to="/#inicio"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-text-muted transition-colors hover:text-accent-pink"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Volver al inicio
        </HashLink>

        <p className="label-pill mb-4">Recursos</p>

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
      </div>
    </section>
  );
}
