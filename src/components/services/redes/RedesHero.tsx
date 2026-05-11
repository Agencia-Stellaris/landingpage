import { ArrowLeft } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HashLink } from "../../routing/HashLink";
import { HighlightText } from "../../ui/HighlightText";
import { SocialMockup } from "./SocialMockup";

export function RedesHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-32 lg:pt-14">
        <div>
          <nav aria-label="Migas de pan" className="mb-7">
            <ol className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-text-muted">
              <li>
                <HashLink
                  to="/#servicios"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent-pink"
                >
                  <ArrowLeft size={12} aria-hidden="true" />
                  Servicios
                </HashLink>
              </li>
              <li className="text-text-muted/40" aria-hidden="true">
                /
              </li>
              <li className="text-accent-pink" aria-current="page">
                Gesti&oacute;n de Redes Sociales
              </li>
            </ol>
          </nav>

          <div>
            <h1
              id="hero-heading"
              className="font-heading text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.05] tracking-[-1.5px]"
            >
              Convierte tus redes en tu canal m&aacute;s{" "}
              <HighlightText>poderoso</HighlightText>.
            </h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">
              Construimos comunidades reales, narrativas que conectan y
              estrategias de contenido que generan conversaciones, prospectos y
              ventas.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <HashLink
                to="#contacto"
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
              >
                Diagn&oacute;stico gratuito
              </HashLink>
              <HashLink
                to="#incluye"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-white/30 hover:bg-white/[0.03]"
              >
                Ver qu&eacute; incluye
              </HashLink>
            </div>
          </div>
        </div>

        <div>
          <SocialMockup />
        </div>
      </div>
    </section>
  );
}
