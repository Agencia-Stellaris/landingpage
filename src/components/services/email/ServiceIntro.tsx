import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { EMAIL_PILLARS } from "../../../data/services/email-marketing";
import { EMAIL_ICONS } from "./icons";

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
              Tu base como activo
            </p>
            <h2
              id="pillars-heading"
              className="font-heading text-[clamp(1.9rem,3.8vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-1px]"
            >
              El canal de tus <HighlightText>datos</HighlightText>.
            </h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-[1.6] text-text-muted md:text-lg md:leading-[1.7]">
            <p>
              El email marketing es uno de los canales m&aacute;s rentables del
              ecosistema digital, porque opera sobre el activo m&aacute;s
              importante de tu organizaci&oacute;n:{" "}
              <span className="font-semibold text-text-primary">
                los datos de tus usuarios
              </span>
              . En{" "}
              <span className="font-semibold text-text-primary">Stellaris</span>{" "}
              dise&ntilde;amos estrategias que nutren leads, reactivan clientes y
              generan ingresos predecibles.
            </p>
            <p>
              Desde la gesti&oacute;n avanzada de{" "}
              <span className="font-semibold text-text-primary">
                HubSpot, Mailchimp, ActiveCampaign
              </span>{" "}
              &mdash;o el CRM que prefieras&mdash; hasta el dise&ntilde;o de
              flujos de automatizaci&oacute;n complejos y segmentaciones por
              comportamiento, convertimos tu base en un activo generador de
              ventas e interacci&oacute;n constante.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] sm:grid-cols-3"
        >
          {EMAIL_PILLARS.map((pillar, i) => {
            const Ico = EMAIL_ICONS[pillar.iconKey];
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
