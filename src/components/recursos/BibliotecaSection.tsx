import { RESOURCES } from "../../data/recursos";
import { HighlightText } from "../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../hooks/useScrollReveal";
import { FeaturedResourceCard } from "./FeaturedResourceCard";
import { ResourceCard } from "./ResourceCard";

export function BibliotecaSection() {
  const headerRef = useReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.08 });

  const featured = RESOURCES.find((r) => r.featured);
  const rest = RESOURCES.filter((r) => !r.featured).slice(0, 4);

  if (!featured) return null;

  return (
    <div className="mx-auto mt-16 max-w-6xl px-[5%]">
      <div
        ref={headerRef}
        className="mb-12 grid items-end gap-8 lg:grid-cols-2"
      >
        <h2
          id="biblioteca-heading"
          className="font-heading text-section font-extrabold tracking-[-1px]"
        >
          Aprende, aplica, <HighlightText>crece.</HighlightText>
        </h2>
        <p className="text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
          Una biblioteca de guías, plantillas, casos y herramientas que el
          equipo de Stellaris usa todos los días. Gratis y sin formulario.
        </p>
      </div>

      <div ref={gridRef} className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <FeaturedResourceCard resource={featured} />
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
