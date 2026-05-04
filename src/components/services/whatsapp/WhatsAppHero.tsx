import { ArrowLeft } from "lucide-react";
import { Starfield } from "../../ui/Starfield";
import { HighlightText } from "../../ui/HighlightText";
import { HashLink } from "../../routing/HashLink";
import { useReveal } from "../../../hooks/useScrollReveal";
import { ChatMockup } from "./ChatMockup";

export function WhatsAppHero() {
  const leftRef = useReveal<HTMLDivElement>({ y: 40 });
  const rightRef = useReveal<HTMLDivElement>({ y: 40, delay: 0.15 });

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-[5%] pb-24 pt-8 lg:grid-cols-[1.05fr_1fr] lg:pb-32 lg:pt-14">
        {/* Left column */}
        <div ref={leftRef} className="order-1">
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
              <li className="text-text-muted/40" aria-hidden="true">/</li>
              <li className="text-accent-pink" aria-current="page">
                WhatsApp Marketing
              </li>
            </ol>
          </nav>

          <h1
            id="hero-heading"
            className="font-heading text-hero font-extrabold tracking-[-1.5px]"
          >
            <span className="block">El canal m&aacute;s poderoso de</span>
            <span className="block">
              <HighlightText>comunicaci&oacute;n directa</HighlightText>,
            </span>
            <span className="block">al servicio de tu estrategia.</span>
          </h1>
        </div>

        {/* Right column — phone */}
        <div ref={rightRef} className="order-2">
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
