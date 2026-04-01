import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { PORTFOLIO_PROJECTS } from "../../data/content";
import { TrendingUp } from "lucide-react";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";

const headerReveal = { y: 40 };
const gridReveal = { y: 50, stagger: 0.15 };

export function Portfolio() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const gridRef = useScrollReveal<HTMLDivElement>(gridReveal);

  return (
    <Container id="portafolio" alternate>
      <div ref={headerRef}>
        <SectionHeader
          label="Portafolio"
          title="Proyectos que hablan<br/>por s&iacute; solos"
          subtitle="Resultados reales de marcas reales que decidieron crecer con nosotros."
          centered
        />
      </div>
      <div ref={gridRef} className="mt-13 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_PROJECTS.map((project) => {
          const Icon = project.icon;
          return (
            <Card key={project.title} className="overflow-hidden">
              {/* Blurred gradient background */}
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-bg-primary">
                {/* Gradient orbs */}
                <div
                  className={`absolute -left-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-60 blur-2xl`}
                  aria-hidden="true"
                />
                <div
                  className={`absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-gradient-to-tl ${project.gradient} opacity-40 blur-2xl`}
                  aria-hidden="true"
                />
                <span className="relative z-10 text-white/50" aria-hidden="true">
                  <Icon size={36} className="text-white/50" />
                </span>
                <span className="absolute left-3 top-3 z-10 rounded-full border border-accent-pink/20 bg-black/50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-pink backdrop-blur-md">
                  {project.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-1.5 font-heading font-bold">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted">{project.description}</p>
                <p className="mt-2.5 flex items-center gap-1.5 text-sm font-semibold text-accent-pink">
                  <TrendingUp size={14} aria-hidden="true" />
                  {project.metric}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="mt-9 text-center">
        <Button variant="secondary" href="#">
          Ver todos los proyectos &rarr;
        </Button>
      </div>
    </Container>
  );
}
