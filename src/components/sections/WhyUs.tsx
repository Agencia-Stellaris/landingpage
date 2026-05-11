import { useRef, useEffect } from "react";
import { Container } from "../ui/Container";
import { HighlightText } from "../ui/HighlightText";
import { WHY_US_ITEMS } from "../../data/content";
import { useReveal } from "../../hooks/useScrollReveal";
import { loadGsap } from "../../lib/gsap";

const headerReveal = { y: 40 };

export function WhyUs() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".whyus-card");
    if (!cards.length) return;
    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    void loadGsap().then(({ gsap }) => {
      if (cancelled || !el.isConnected) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Container id="por-que-elegirnos" alternate>
      {/* Top row: Title left + intro text right */}
      <div ref={headerRef} className="mb-12 grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink">
            &iquest;Por qu&eacute; elegirnos?
          </p>
          <h2 className="font-heading text-section font-extrabold leading-[1.1] tracking-[-1px]">
            No todos los especialistas son iguales. Los nuestros son los <HighlightText>mejores.</HighlightText>
          </h2>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-text-muted">
            El mercado digital est&aacute; lleno de agencias que prometen resultados.{" "}
            <strong className="text-text-primary">Stellaris los demuestra.</strong>{" "}
            Cada estrategia que dise&ntilde;amos est&aacute; respaldada por un equipo de &eacute;lite:
            profesionales certificados, apasionados por la innovaci&oacute;n y
            comprometidos con el crecimiento de tu organizaci&oacute;n.
          </p>
        </div>
      </div>

      {/* Cards grid: 3 top + 2 bottom */}
      <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_US_ITEMS.map((item) => (
          <article
            key={item.number}
            className="whyus-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:border-accent-pink/20 hover:bg-white/[0.04]"
          >
            <div className="mb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-pink/60">
                No. {item.number}
              </span>
            </div>

            <div className="mb-4 h-px w-8 bg-gradient-to-r from-accent-pink to-accent-purple transition-all duration-500 group-hover:w-full" />

            <h3 className="mb-1 font-heading text-lg font-bold tracking-tight">
              {item.title}
            </h3>
            <p className="mb-3 text-sm font-semibold text-text-primary">
              {item.subtitle}
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
