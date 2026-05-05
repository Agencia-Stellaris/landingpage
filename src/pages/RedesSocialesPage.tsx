import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { RedesHero } from "../components/services/redes/RedesHero";
import { ServiceIntro } from "../components/services/redes/ServiceIntro";
import { ServiceIncludes } from "../components/services/redes/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  REDES_META,
  REDES_JSONLD,
} from "../data/services/redes-sociales";

export default function RedesSocialesPage() {
  useDocumentMeta(REDES_META, REDES_JSONLD);

  return (
    <>
      <RedesHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            &iquest;Tus redes no est&aacute;n generando resultados?
            <br />
            <HighlightText>
              Solicita un diagn&oacute;stico gratuito
            </HighlightText>
          </>
        }
        subtitle="Descubre el potencial oculto que tiene tu marca. Déjanos tus datos y preparamos un análisis sin compromiso."
        serviceTag="redes-sociales"
      />
    </>
  );
}
