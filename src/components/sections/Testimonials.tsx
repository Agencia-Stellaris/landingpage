import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { TESTIMONIALS } from "../../data/content";
import { Star } from "lucide-react";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";

const headerReveal = { y: 40 };
const gridReveal = { y: 50, stagger: 0.15 };

export function Testimonials() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const gridRef = useScrollReveal<HTMLDivElement>(gridReveal);

  return (
    <Container id="testimonios">
      <div ref={headerRef}>
        <SectionHeader
          label="Testimonios"
          title="Lo que dicen<br/>nuestros clientes"
          centered
        />
      </div>
      <div ref={gridRef} className="mt-13 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.name}
            className="rounded-2xl border border-border bg-surface p-7"
          >
            {/* Stars */}
            <div className="mb-3.5 flex gap-0.5" aria-label={`${t.rating} de 5 estrellas`}>
              {Array.from({ length: t.rating }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ))}
            </div>

            <blockquote className="mb-5 text-base italic leading-relaxed text-text-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <footer className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg font-heading text-base font-bold"
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <cite className="not-italic font-semibold text-base">
                  {t.name}
                </cite>
                <p className="text-xs text-text-muted">{t.role}</p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </Container>
  );
}
