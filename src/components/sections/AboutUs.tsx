import { useRef, useEffect } from "react";
import { Container } from "../ui/Container";
import { HighlightText } from "../ui/HighlightText";
import { useReveal } from "../../hooks/useScrollReveal";
import { loadGsap } from "../../lib/gsap";

const CARDS = [
  {
    number: "01",
    title: "Nuestra identidad",
    description:
      "Stellaris cuenta con una misi\u00f3n clara: ser el aliado estrat\u00e9gico que transforma organizaciones a trav\u00e9s del poder del marketing digital. Somos un equipo de especialistas de alto nivel, apasionados por los datos, la creatividad y los resultados que importan de verdad.",
  },
  {
    number: "02",
    title: "Propuesta de valor",
    description:
      "Cada cliente que llega a Stellaris recibe lo que pocas agencias pueden ofrecer: un diagn\u00f3stico real de su situaci\u00f3n digital, una estrategia construida a su medida y la ejecuci\u00f3n de expertos que conocen cada herramienta, plataforma y tendencia del mercado actual.",
  },
  {
    number: "03",
    title: "Nuestro diferenciador",
    description:
      "Creemos que una empresa que invierte en marketing digital no est\u00e1 comprando servicios; est\u00e1 invirtiendo en su mejor versi\u00f3n. Y eso requiere m\u00e1s que ejecuci\u00f3n: requiere visi\u00f3n, estrategia y los mejores profesionales del mercado trabajando por un mismo objetivo: el tuyo.",
  },
];

const headerReveal = { y: 40 };

export function AboutUs() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".about-card");
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
            stagger: 0.15,
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
    <Container id="nosotros" alternate>
      {/* Top row: Title left + Nuestra identidad card right */}
      <div ref={headerRef} className="mb-8 grid items-center gap-8 lg:grid-cols-2">
        {/* Left: label + title */}
        <div>
          <p className="mb-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink">
            &iquest;Qui&eacute;nes somos?
          </p>
          <h2 className="font-heading text-section font-extrabold leading-[1.1] tracking-[-1px]">
            La &eacute;lite del <HighlightText>marketing digital</HighlightText>, a tu servicio
          </h2>
        </div>

        {/* Right: Nuestra identidad — same card style */}
        <article className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:border-accent-pink/20 hover:bg-white/[0.04]">
          <div className="mb-5">
            <span className="font-mono text-xs uppercase tracking-widest text-accent-pink/60">
              No. 01
            </span>
          </div>
          <div className="mb-4 h-px w-8 bg-gradient-to-r from-accent-pink to-accent-purple transition-all duration-500 group-hover:w-full" />
          <h3 className="mb-4 font-heading text-xl font-bold tracking-tight">
            Nuestra identidad
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">
            Stellaris cuenta con una misi&oacute;n clara: ser el aliado estrat&eacute;gico
            que transforma organizaciones a trav&eacute;s del poder del marketing digital.
            Somos un equipo de especialistas de alto nivel, apasionados por los datos,
            la creatividad y los resultados que importan de verdad.
          </p>
        </article>
      </div>

      {/* Bottom row: 2 cards */}
      <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2">
        {CARDS.slice(1).map((card) => (
          <article
            key={card.number}
            className="about-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:border-accent-pink/20 hover:bg-white/[0.04]"
          >
            <div className="mb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-pink/60">
                No. {card.number}
              </span>
            </div>
            <div className="mb-4 h-px w-8 bg-gradient-to-r from-accent-pink to-accent-purple transition-all duration-500 group-hover:w-full" />
            <h3 className="mb-4 font-heading text-xl font-bold tracking-tight">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
