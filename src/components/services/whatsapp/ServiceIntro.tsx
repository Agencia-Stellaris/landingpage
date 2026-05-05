import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { WHATSAPP_PILLARS } from "../../../data/services/whatsapp-marketing";
import { WHATSAPP_ICONS } from "./icons";

export function ServiceIntro() {
  const headRef = useReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="pillars-heading"
    >
      <div className="aurora-line" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent-purple/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-accent-pink/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-[5%] py-[110px]">
        <div
          ref={headRef}
          className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16"
        >
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink">
              Comunicaci&oacute;n &amp; ventas
            </p>
            <h2
              id="pillars-heading"
              className="font-heading text-section font-extrabold tracking-[-1px]"
            >
              Donde tu cliente <HighlightText>s&iacute; responde.</HighlightText>
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-text-muted md:text-lg md:leading-[1.7]">
            <p>
              Convertimos el potencial de WhatsApp en{" "}
              <span className="font-semibold text-text-primary">
                conversaciones reales
              </span>{" "}
              que generan ventas, fidelizan clientes y construyen relaciones
              duraderas con tu audiencia.
            </p>
            <p>
              Dise&ntilde;amos estrategias con{" "}
              <span className="font-semibold text-text-primary">
                WhatsApp Business API
              </span>
              , automatizaciones inteligentes, flujos personalizados,
              segmentaci&oacute;n y campa&ntilde;as que llevan el mensaje
              correcto, a la persona correcta.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {WHATSAPP_PILLARS.map((pillar, i) => {
            const Ico = WHATSAPP_ICONS[pillar.iconKey];
            return (
              <div
                key={pillar.title}
                className="relative bg-bg-primary/60 p-8 backdrop-blur-sm"
              >
                <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-text-muted/50">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 text-text-primary">
                  <Ico size={20} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <div className="mt-5 font-heading text-lg font-semibold tracking-[-0.3px] text-text-primary">
                  {pillar.title}
                </div>
                <div className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  {pillar.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
