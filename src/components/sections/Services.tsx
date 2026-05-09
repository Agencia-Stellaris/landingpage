import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { HighlightText } from "../ui/HighlightText";
import { SERVICES } from "../../data/content";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";

const headerReveal = { y: 40 };
const gridReveal = { y: 50, stagger: 0.15 };

function prefetchWhatsApp() {
  void import("../../pages/WhatsAppMarketingPage");
}

function prefetchRedes() {
  void import("../../pages/RedesSocialesPage");
}

function prefetchWeb() {
  void import("../../pages/DesarrolloWebPage");
}

function prefetchEmail() {
  void import("../../pages/EmailMarketingPage");
}

export function Services() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const gridRef = useScrollReveal<HTMLDivElement>(gridReveal);

  const handlePrefetch = useCallback((href: string) => {
    if (href === "/servicios/whatsapp-marketing") prefetchWhatsApp();
    if (href === "/servicios/redes-sociales") prefetchRedes();
    if (href === "/servicios/desarrollo-web") prefetchWeb();
    if (href === "/servicios/email-marketing") prefetchEmail();
  }, []);

  return (
    <Container id="servicios">
      <div ref={headerRef}>
        <SectionHeader
          label="Servicios"
          titleContent={
            <>
              Todo lo que necesita
              <br />
              tu <HighlightText>negocio digital</HighlightText>
            </>
          }
          centered
        />
      </div>
      <div
        ref={gridRef}
        className="mx-auto mt-13 grid max-w-4xl gap-5 sm:grid-cols-2"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const isInternalRoute = service.href.startsWith("/");
          const card = (
            <article className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
              <div className="relative mb-6 h-14 w-14">
                <div
                  className={`absolute inset-1 rounded-[18px] bg-gradient-to-br ${service.iconColor} opacity-40 blur-lg`}
                  aria-hidden="true"
                />
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br ${service.iconColor} shadow-lg`}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[16px] bg-gradient-to-b from-white/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-px rounded-[15px] border border-white/15"
                    aria-hidden="true"
                  />
                  <Icon size={24} className="relative z-10 text-white drop-shadow-sm" />
                </div>
              </div>

              <h3 className="mb-3 font-heading text-lg font-bold tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-pink transition-all group-hover:gap-2.5">
                Conoce m&aacute;s aqu&iacute;
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </article>
          );

          if (isInternalRoute) {
            return (
              <Link
                key={service.title}
                to={service.href}
                onMouseEnter={() => handlePrefetch(service.href)}
                onFocus={() => handlePrefetch(service.href)}
                className="block"
              >
                {card}
              </Link>
            );
          }

          return (
            <a key={service.title} href={service.href} className="block">
              {card}
            </a>
          );
        })}
      </div>
    </Container>
  );
}
