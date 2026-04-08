import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { HighlightText } from "../ui/HighlightText";
import { WHY_US_ITEMS } from "../../data/content";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";

const headerReveal = { y: 40 };
const gridReveal = { y: 50, stagger: 0.1 };

export function WhyUs() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const gridRef = useScrollReveal<HTMLDivElement>(gridReveal);

  return (
    <Container id="por-que-elegirnos" alternate>
      <div ref={headerRef}>
        <SectionHeader
          label="&iquest;Por qu&eacute; elegirnos?"
          titleContent={<><HighlightText>Resultados</HighlightText>, no solo<br/>promesas</>}
          subtitle="Lo que nos diferencia no es lo que decimos, sino lo que demostramos con cada proyecto."
        />
      </div>
      <div ref={gridRef} className="mt-13 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_US_ITEMS.map((item) => (
          <article
            key={item.number}
            className="rounded-2xl border border-border bg-surface p-7"
          >
            <span
              className="block font-heading text-[2.8rem] font-extrabold leading-none opacity-[0.08]"
              aria-hidden="true"
            >
              {item.number}
            </span>
            <h3 className="mb-2 mt-3 font-heading text-md font-bold">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
