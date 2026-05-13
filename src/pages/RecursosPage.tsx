import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { RECURSOS_META } from "../data/recursos";
import { RecursosHero } from "../components/recursos/RecursosHero";
import { BibliotecaSection } from "../components/recursos/BibliotecaSection";

export default function RecursosPage() {
  useDocumentMeta(RECURSOS_META);

  return (
    <>
      <RecursosHero />
      <BibliotecaSection />
    </>
  );
}
