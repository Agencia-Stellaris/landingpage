import { Container } from "../../ui/Container";
import { SectionHeader } from "../../ui/SectionHeader";
import { HighlightText } from "../../ui/HighlightText";
import { useReveal, useScrollReveal } from "../../../hooks/useScrollReveal";
import { WHATSAPP_INCLUDES } from "../../../data/services/whatsapp-marketing";

export function ServiceIncludes() {
  const headRef = useReveal<HTMLDivElement>({ y: 40 });
  const listRef = useScrollReveal<HTMLOListElement>({ y: 30, stagger: 0.08 });

  return (
    <Container alternate id="incluye" aria-labelledby="includes-heading">
      <div className="mx-auto max-w-5xl">
        <div ref={headRef} className="mb-12 max-w-2xl">
          <SectionHeader
            label="El servicio"
            titleContent={
              <>
                <span id="includes-heading">
                  &iquest;Qu&eacute; incluye <HighlightText>este servicio?</HighlightText>
                </span>
              </>
            }
          />
        </div>

        <ol
          ref={listRef}
          className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2"
        >
          {WHATSAPP_INCLUDES.map((text, i) => (
            <li
              key={i}
              className="group flex gap-5 bg-bg-secondary p-7 transition-colors hover:bg-white/[0.02]"
            >
              <span className="pt-[2px] font-mono text-xs uppercase tracking-widest text-accent-pink/60">
                No. {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
