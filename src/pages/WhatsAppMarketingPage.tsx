import { ContactCTA } from "../components/sections/ContactCTA";
import { HighlightText } from "../components/ui/HighlightText";
import { WhatsAppHero } from "../components/services/whatsapp/WhatsAppHero";
import { ServiceIntro } from "../components/services/whatsapp/ServiceIntro";
import { ServiceIncludes } from "../components/services/whatsapp/ServiceIncludes";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  WHATSAPP_META,
  WHATSAPP_JSONLD,
} from "../data/services/whatsapp-marketing";

export default function WhatsAppMarketingPage() {
  useDocumentMeta(WHATSAPP_META, WHATSAPP_JSONLD);

  return (
    <>
      <WhatsAppHero />
      <ServiceIntro />
      <ServiceIncludes />
      <ContactCTA
        titleContent={
          <>
            Tu cliente ya est&aacute; en WhatsApp.
            <br />
            <HighlightText>
              &iquest;Est&aacute;s t&uacute; ah&iacute;, estrat&eacute;gicamente?
            </HighlightText>
          </>
        }
        subtitle="Descubre cómo convertimos conversaciones en clientes. Déjanos tus datos y te preparamos una propuesta personalizada, sin compromiso."
        serviceTag="whatsapp-marketing"
      />
    </>
  );
}
