import type { MouseEvent } from "react";
import { Check } from "lucide-react";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import {
  WHATSAPP_INCLUDES,
  type WhatsAppFeature,
} from "../../../data/services/whatsapp-marketing";
import { WHATSAPP_ICONS } from "./icons";

interface FeatureCardProps {
  feature: WhatsAppFeature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Ico = WHATSAPP_ICONS[feature.iconKey];

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={onMouseMove}
      className="feature-card group relative rounded-2xl p-7"
    >
      <div className="relative z-10 flex items-start justify-between">
        <div className="ico-wrap relative grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 text-text-primary">
          <Ico size={22} strokeWidth={1.6} aria-hidden="true" />
          <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full gradient-bg font-mono text-[8px] font-bold leading-none text-white shadow">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {feature.tag}
        </span>
      </div>

      <h3 className="relative z-10 mt-5 font-heading text-[1.05rem] font-bold leading-snug text-text-primary">
        {feature.title}
      </h3>
      <p className="relative z-10 mt-2 text-sm leading-relaxed text-text-muted">
        {feature.description}
      </p>

      <div className="relative z-10 mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-accent-pink/0 transition-colors group-hover:text-accent-pink">
        <span>incluido</span>
        <span className="h-px flex-1 bg-current opacity-40" />
        <Check size={12} aria-hidden="true" />
      </div>
    </article>
  );
}

export function ServiceIncludes() {
  const headRef = useReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.06 });

  return (
    <section
      id="incluye"
      className="relative bg-bg-secondary px-[5%] py-[110px]"
      aria-labelledby="includes-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/30 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <div
          ref={headRef}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink">
              El servicio
            </p>
            <h2
              id="includes-heading"
              className="font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]"
            >
              &iquest;Qu&eacute; incluye{" "}
              <HighlightText>este servicio?</HighlightText>
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-relaxed">
              Un sistema completo &mdash;no piezas sueltas&mdash; para que
              WhatsApp trabaje por ti las 24 horas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="num-badge">
              {String(WHATSAPP_INCLUDES.length).padStart(2, "0")}
            </span>
            <div>
              <div className="font-heading text-sm font-semibold text-text-primary">
                Componentes
              </div>
              <div className="text-xs text-text-muted">
                en cada implementaci&oacute;n
              </div>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHATSAPP_INCLUDES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
