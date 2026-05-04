import { useReveal } from "../../../hooks/useScrollReveal";

export function ServiceIntro() {
  const ref = useReveal<HTMLDivElement>({ y: 40 });

  return (
    <section aria-labelledby="intro-heading">
      <div ref={ref} className="mx-auto max-w-3xl px-[5%] py-[90px]">
        <p
          id="intro-heading"
          className="mb-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[2.5px] text-accent-pink before:inline-block before:h-px before:w-5 before:bg-accent-pink"
        >
          Comunicaci&oacute;n &amp; ventas
        </p>

        <div className="space-y-6 text-base leading-relaxed text-text-muted md:text-lg md:leading-[1.7]">
          <p>
            Convertimos el potencial de WhatsApp en{" "}
            <span className="text-text-primary">conversaciones reales</span> que
            generan ventas, fidelizan clientes y construyen relaciones duraderas
            con tu audiencia.
          </p>
          <p>
            Dise&ntilde;amos estrategias de WhatsApp Marketing con{" "}
            <span className="text-text-primary">WhatsApp Business API</span>,
            automatizaciones inteligentes, flujos de conversaci&oacute;n
            personalizados, segmentaci&oacute;n de usuarios y campa&ntilde;as
            de difusi&oacute;n que llevan el mensaje correcto, a la persona
            correcta.
          </p>
        </div>
      </div>
    </section>
  );
}
