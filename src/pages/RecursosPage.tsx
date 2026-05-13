import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { RECURSOS_META } from "../data/recursos";
import { RecursosHero } from "../components/recursos/RecursosHero";
import { BibliotecaSection } from "../components/recursos/BibliotecaSection";

export default function RecursosPage() {
  useDocumentMeta(RECURSOS_META);

  return (
    <div className="relative overflow-hidden">
      {/* Page-level ambient lighting. Lives on the wrapper (not inside each
          section) so the glow spans Hero + BibliotecaSection without being
          clipped by either section's overflow-hidden — making the page read
          as one continuous block. */}
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

      <RecursosHero />
      <BibliotecaSection />
    </div>
  );
}
