import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { RECURSOS_META } from "../data/recursos";
import { RecursosHero } from "../components/recursos/RecursosHero";
import { BibliotecaSection } from "../components/recursos/BibliotecaSection";

export default function RecursosPage() {
  useDocumentMeta(RECURSOS_META);

  return (
    <section
      id="recursos"
      className="relative overflow-hidden pt-32 pb-[110px]"
      aria-labelledby="recursos-heading"
    >
      {/* Single ambient lighting layer for the whole section — purple wash
          on the left, two pink accents on the right. Lives at section level
          so no internal block can clip it. */}
      <div
        aria-hidden="true"
        className="orb -left-40 top-24 h-[760px] w-[760px] bg-accent-purple/15"
      />
      <div
        aria-hidden="true"
        className="orb -right-32 -top-20 h-72 w-72 bg-accent-pink/15"
      />
      <div
        aria-hidden="true"
        className="orb -right-32 bottom-32 h-80 w-80 bg-accent-pink/10"
      />

      <div className="relative z-10">
        <RecursosHero />
        <BibliotecaSection />
      </div>
    </section>
  );
}
