import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { EmailHero } from "../components/services/email/EmailHero";
import { ServiceIntro } from "../components/services/email/ServiceIntro";
import { ServiceIncludes } from "../components/services/email/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  EMAIL_META,
  EMAIL_JSONLD,
} from "../data/services/email-marketing";

export default function EmailMarketingPage() {
  useDocumentMeta(EMAIL_META, EMAIL_JSONLD);

  return (
    <>
      <EmailHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            &iquest;Quieres convertir el Email Marketing en tu canal de ventas
            m&aacute;s rentable?
            <br />
            <HighlightText>Hablemos</HighlightText>.
          </>
        }
        subtitle="Cuéntanos sobre tu base de contactos y los objetivos de tu marca. Te respondemos con un plan claro."
        serviceTag="email-marketing"
      />
    </>
  );
}
