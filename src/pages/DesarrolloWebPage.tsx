import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { WebHero } from "../components/services/web/WebHero";
import { ServiceIntro } from "../components/services/web/ServiceIntro";
import { ServiceIncludes } from "../components/services/web/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  WEB_META,
  WEB_JSONLD,
} from "../data/services/desarrollo-web";

export default function DesarrolloWebPage() {
  useDocumentMeta(WEB_META, WEB_JSONLD);

  return (
    <>
      <WebHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            &iquest;Tu sitio web no est&aacute; generando leads?
            <br />
            <HighlightText>Hablemos</HighlightText>.
          </>
        }
        subtitle="Diseñamos la experiencia digital que tu marca merece y que tus clientes no olvidarán."
        serviceTag="desarrollo-web"
      />
    </>
  );
}
