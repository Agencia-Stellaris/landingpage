import { Button } from "../ui/Button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[5%] pb-32 pt-28 text-center"
      aria-labelledby="hero-heading"
    >
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,0.18)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(255,77,109,0.10)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Animated badge */}
        <div className="group relative mb-7 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-accent-pink/20 bg-white/[0.03] px-5 py-2 backdrop-blur-sm">
          {/* Shimmer sweep */}
          <div
            className="pointer-events-none absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent_25%,rgba(255,77,109,0.08)_50%,transparent_75%)]"
            aria-hidden="true"
          />
          <span
            className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent-pink animate-pulse-dot"
            aria-hidden="true"
          />
          <span className="relative text-xs font-medium uppercase tracking-[1.5px] text-accent-pink">
            Agencia de Marketing Digital
          </span>
        </div>

        <h1 id="hero-heading" className="mb-5 font-heading text-hero font-bold leading-[1.08] tracking-[-2px]">
          <span className="block">&iquest;Nuestro objetivo?</span>
          <span className="gradient-text">Hacer crecer tu marca digital</span>
        </h1>

        <p className="mx-auto mb-10 max-w-[550px] text-lg leading-relaxed text-text-muted">
          Estrategias de redes sociales, dise&ntilde;o web, WhatsApp y email
          marketing para empresas que quieren resultados reales y medibles.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button href="#servicios">
            Ver nuestros servicios
          </Button>
          <Button variant="secondary" href="#contacto">
            &iexcl;Cont&aacute;ctanos!
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicios"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-text-muted transition-colors hover:text-text-primary"
        aria-label="Desplazar hacia abajo"
      >
        <span className="text-[0.65rem] uppercase tracking-[2px]">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
