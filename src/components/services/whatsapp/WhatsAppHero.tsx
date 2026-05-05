import { ArrowLeft, ArrowRight } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HashLink } from "../../routing/HashLink";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal } from "../../../hooks/useScrollReveal";
import { ChatMockup } from "./ChatMockup";

export function WhatsAppHero() {
  const breadcrumbRef = useReveal<HTMLElement>({ y: 20 });
  const textRef = useReveal<HTMLDivElement>({ y: 40 });
  const phoneRef = useReveal<HTMLDivElement>({ y: 40, delay: 0.15 });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-32 lg:pt-14">
        {/* Text column — left on desktop, top on mobile */}
        <div>
          <nav
            ref={breadcrumbRef}
            aria-label="Migas de pan"
            className="mb-7"
          >
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
                WhatsApp Marketing
              </li>
            </ol>
          </nav>

          <div ref={textRef}>
            <h1
              id="hero-heading"
              className="font-heading text-hero font-extrabold tracking-[-1.5px]"
            >
              El canal m&aacute;s poderoso de{" "}
              <HighlightText>comunicaci&oacute;n directa</HighlightText>, al
              servicio de tu estrategia.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              Convertimos WhatsApp en una m&aacute;quina de conversi&oacute;n:
              estrategia, automatizaci&oacute;n y datos en un solo flujo.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <HashLink
                to="#contacto"
                className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
              >
                Empezar ahora
                <ArrowRight size={16} aria-hidden="true" />
              </HashLink>
              <a
                href="#incluye"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-white/30 hover:bg-white/[0.03]"
              >
                Ver qu&eacute; incluye
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="pill">
                <span className="dot" aria-hidden="true" />
                Meta Business Partner
              </span>
              <span className="pill">API oficial &middot; WhatsApp Business</span>
            </div>
          </div>
        </div>

        {/* Phone column — right on desktop, bottom on mobile */}
        <div ref={phoneRef}>
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
