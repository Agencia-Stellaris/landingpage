import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { PROCESS_STEPS } from "../../data/content";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";

const headerReveal = { y: 40 };
const stepsReveal = { y: 40, stagger: 0.15 };

export function Process() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const stepsRef = useScrollReveal<HTMLOListElement>(stepsReveal);

  return (
    <Container id="proceso">
      <div ref={headerRef}>
        <SectionHeader
          label="Proceso"
          title="C&oacute;mo trabajamos"
          subtitle="Un proceso claro y estructurado para que siempre sepas en qu&eacute; etapa estamos."
          centered
        />
      </div>
      <div className="relative mt-14">
        {/* Connecting line */}
        <div
          className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-accent-pink to-accent-purple opacity-30 lg:block"
          aria-hidden="true"
        />
        <ol ref={stepsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className="px-4 text-center">
              <div
                className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full gradient-bg font-heading text-lg font-extrabold"
                aria-hidden="true"
              >
                {step.number}
              </div>
              <h3 className="mb-2 font-heading text-md font-bold">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
