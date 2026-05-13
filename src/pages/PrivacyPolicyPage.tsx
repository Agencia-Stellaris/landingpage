import { ArrowLeft } from "lucide-react";
import { HashLink } from "../components/routing/HashLink";
import { useDocumentMeta, type DocumentMeta } from "../hooks/useDocumentMeta";

const CANONICAL = "https://www.stellaris.com.co/politica-de-privacidad";
const LAST_UPDATED = "2026-05-11";

const META: DocumentMeta = {
  title: "Política de Privacidad | Stellaris",
  description:
    "Política de Tratamiento de Datos Personales y Privacidad de Stellaris. Conoce qué datos recopilamos, para qué los usamos, cómo los protegemos y cuáles son tus derechos según la Ley 1581 de 2012.",
  canonical: CANONICAL,
  ogType: "article",
};

const JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de Tratamiento de Datos Personales y Privacidad",
    description: META.description,
    url: CANONICAL,
    inLanguage: "es-CO",
    dateModified: LAST_UPDATED,
    publisher: {
      "@type": "Organization",
      name: "Stellaris",
      url: "https://www.stellaris.com.co",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://www.stellaris.com.co/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Política de privacidad",
        item: CANONICAL,
      },
    ],
  },
];

const sectionHeading =
  "mt-10 mb-4 font-heading text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl";
const subHeading =
  "mt-6 mb-3 font-heading text-lg font-bold tracking-tight text-text-primary md:text-xl";
const paragraph = "text-[0.975rem] leading-[1.7] text-text-muted";
const list = "mt-3 space-y-2 pl-5 text-[0.975rem] leading-[1.7] text-text-muted";

export default function PrivacyPolicyPage() {
  useDocumentMeta(META, JSONLD);

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden pt-28 pb-10"
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto max-w-3xl px-[5%]">
          <nav aria-label="Migas de pan" className="mb-7">
            <ol className="inline-flex items-center gap-2 text-xs font-semibold uppercase leading-none tracking-[2px] text-text-muted">
              <li className="inline-flex items-center">
                <HashLink
                  to="/#inicio"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent-pink"
                >
                  <ArrowLeft size={12} aria-hidden="true" />
                  Inicio
                </HashLink>
              </li>
              <li
                className="inline-flex items-center text-text-muted/40"
                aria-hidden="true"
              >
                /
              </li>
              <li
                className="inline-flex items-center text-accent-pink"
                aria-current="page"
              >
                Política de privacidad
              </li>
            </ol>
          </nav>

          <h1
            id="privacy-heading"
            className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-1px]"
          >
            Política de Tratamiento de Datos Personales y Privacidad
          </h1>
          <p className="mt-4 text-sm text-text-muted">
            Stellaris — Especialistas en Marketing Digital ·{" "}
            <a
              href="https://stellaris.com.co"
              className="text-text-primary underline underline-offset-2 hover:text-accent-pink"
            >
              stellaris.com.co
            </a>
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Última actualización: <time dateTime={LAST_UPDATED}>11 de mayo de 2026</time>
          </p>
        </div>
      </section>

      {/* Body */}
      <article
        className="mx-auto max-w-3xl px-[5%] pb-28"
        aria-labelledby="privacy-heading"
      >
        <section aria-labelledby="quienes-somos">
          <h2 id="quienes-somos" className={sectionHeading}>
            1. ¿Quiénes somos?
          </h2>
          <p className={paragraph}>
            Stellaris es un colectivo de profesionales independientes (freelancers)
            especializados en servicios de marketing digital, que incluyen: gestión de
            redes sociales, diseño y desarrollo de sitios web, gestión de WhatsApp
            Marketing y email marketing. Operamos bajo la marca «Stellaris» y a través
            del sitio web stellaris.com.co.
          </p>
          <p className={`${paragraph} mt-3`}>
            No somos una sociedad comercial constituida ante Cámara de Comercio en
            Colombia. Somos un grupo de personas naturales que prestan servicios de
            manera independiente y coordinada bajo un propósito común: generar impacto
            digital real para nuestros clientes.
          </p>
        </section>

        <section aria-labelledby="por-que-existe">
          <h2 id="por-que-existe" className={sectionHeading}>
            2. ¿Por qué existe esta política?
          </h2>
          <p className={paragraph}>
            En Stellaris valoramos profundamente la privacidad de las personas que
            interactúan con nosotros a través de nuestro sitio web, redes sociales,
            formularios de contacto o cualquier otro canal de comunicación. Esta
            política tiene como objetivo explicar de manera detallada:
          </p>
          <ul className={`${list} list-disc`}>
            <li>Qué datos personales podemos recopilar.</li>
            <li>Por qué los recopilamos y para qué los usamos.</li>
            <li>Cómo los protegemos.</li>
            <li>Cuáles son tus derechos sobre tu información.</li>
          </ul>
        </section>

        <section aria-labelledby="que-datos">
          <h2 id="que-datos" className={sectionHeading}>
            3. ¿Qué datos recopilamos y cómo lo hacemos?
          </h2>

          <h3 className={subHeading}>3.1 Datos que tú nos proporcionas voluntariamente</h3>
          <p className={paragraph}>
            Stellaris recopila datos personales únicamente cuando tú decides
            compartirlos de manera activa y voluntaria. Esto puede ocurrir cuando:
          </p>
          <ul className={`${list} list-disc`}>
            <li>Diligencias un formulario de contacto en nuestro sitio web.</li>
            <li>Nos escribes directamente por WhatsApp, email u otro canal de comunicación.</li>
            <li>
              Solicitas información sobre nuestros servicios, una cotización o un
              diagnóstico.
            </li>
            <li>
              Te suscribes a cualquier comunicación nuestra (boletín, lista de
              difusión, entre otros).
            </li>
            <li>
              Interactúas con nosotros en redes sociales y nos proporcionas datos de
              contacto.
            </li>
          </ul>
          <p className={`${paragraph} mt-3`}>
            Los datos que típicamente recopilamos son: nombre, dirección de correo
            electrónico, número de teléfono o WhatsApp, nombre de la empresa u
            organización (si aplica), tu cargo y el mensaje o consulta que nos envías.
          </p>

          <h3 className={subHeading}>3.2 Datos de navegación (no personales)</h3>
          <p className={paragraph}>
            Nuestro sitio web puede registrar información técnica y de navegación de
            forma anónima, como el tipo de dispositivo, el navegador utilizado, páginas
            visitadas y tiempo de permanencia, con fines de análisis y mejora del sitio.
            Esta información no permite identificarte personalmente.
          </p>
        </section>

        <section aria-labelledby="para-que">
          <h2 id="para-que" className={sectionHeading}>
            4. ¿Para qué usamos tus datos?
          </h2>
          <p className={paragraph}>
            Los datos que compartes con nosotros se utilizan exclusivamente para:
          </p>
          <ul className={`${list} list-disc`}>
            <li>Responderte y gestionar tu consulta o solicitud de información.</li>
            <li>Enviarte la propuesta, cotización o diagnóstico que hayas solicitado.</li>
            <li>
              Mantenerte informado sobre nuestros servicios, novedades o contenido
              relevante, siempre que hayas dado tu consentimiento para ello.
            </li>
            <li>
              Contactarte a través de los canales que nos has facilitado (email,
              WhatsApp o llamada) para dar seguimiento a tu interés en nuestros
              servicios.
            </li>
            <li>
              Mejorar la calidad de nuestras comunicaciones y servicios basándonos en
              tus comentarios y preferencias.
            </li>
          </ul>
        </section>

        <section aria-labelledby="caracter-voluntario">
          <h2 id="caracter-voluntario" className={sectionHeading}>
            5. Carácter voluntario del suministro de datos
          </h2>
          <p className={paragraph}>
            <strong className="text-text-primary">Importante:</strong> el suministro
            de tus datos personales es completamente voluntario. Nadie está obligado a
            proporcionarnos información personal para navegar en nuestro sitio web.
            Solo te pediremos datos cuando tú decidas contactarnos de forma activa. Al
            completar un formulario o escribirnos directamente, entendemos que nos
            estás otorgando tu consentimiento explícito para contactarte con la
            finalidad que nos indicaste.
          </p>
          <p className={`${paragraph} mt-3`}>
            En cualquier momento puedes retirar tu consentimiento, solicitarnos que
            dejemos de contactarte o que eliminemos tus datos de nuestros registros,
            sin que esto tenga ninguna consecuencia negativa para ti.
          </p>
        </section>

        <section aria-labelledby="compartir-terceros">
          <h2 id="compartir-terceros" className={sectionHeading}>
            6. ¿Compartimos tus datos con terceros?
          </h2>
          <p className={paragraph}>
            <strong className="text-text-primary">No.</strong> Stellaris no vende,
            distribuye, alquila, cede ni comparte tus datos personales con terceros
            ajenos al colectivo. Tus datos permanecen dentro de nuestros canales y
            herramientas internas de trabajo.
          </p>
          <p className={`${paragraph} mt-3`}>
            Los miembros de Stellaris que tienen acceso a la información de contacto
            solo la utilizan en el marco de la prestación de los servicios que nos has
            solicitado o en las comunicaciones que hayas autorizado. No existe ningún
            proceso de transferencia de datos a bases externas, plataformas de
            terceros comerciales o entidades ajenas a nuestra operación.
          </p>
        </section>

        <section aria-labelledby="almacenamiento">
          <h2 id="almacenamiento" className={sectionHeading}>
            7. ¿Cómo almacenamos y protegemos tus datos?
          </h2>
          <p className={paragraph}>
            Los datos de contacto que nos compartes se almacenan en nuestros canales
            internos de comunicación y gestión (herramientas de mensajería, correo
            electrónico, hojas de trabajo internas), los cuales cuentan con medidas
            básicas de seguridad propias de cada plataforma.
          </p>
          <p className={`${paragraph} mt-3`}>
            Aunque somos un grupo independiente y no contamos con una infraestructura
            corporativa formal, adoptamos prácticas de manejo responsable de la
            información, que incluyen:
          </p>
          <ul className={`${list} list-disc`}>
            <li>
              Acceso restringido a los datos, solo por los miembros del equipo que los
              requieren.
            </li>
            <li>
              No almacenamos información sensible (datos bancarios, documentos de
              identidad, contraseñas, entre otros).
            </li>
            <li>
              Usamos plataformas reconocidas con sus propias políticas de seguridad
              para gestionar las comunicaciones (Google Workspace, WhatsApp Business,
              entre otros).
            </li>
          </ul>
        </section>

        <section aria-labelledby="conservacion">
          <h2 id="conservacion" className={sectionHeading}>
            8. ¿Cuánto tiempo conservamos tus datos?
          </h2>
          <p className={paragraph}>
            Conservamos tu información de contacto el tiempo necesario para atender la
            solicitud que nos realizaste y, si es el caso, durante el tiempo de la
            relación comercial activa. Si en algún momento nos indicas que no deseas
            seguir siendo contactado, eliminamos tu información de nuestros registros
            activos en un plazo razonable.
          </p>
        </section>

        <section aria-labelledby="derechos">
          <h2 id="derechos" className={sectionHeading}>
            9. Tus derechos sobre tu información
          </h2>
          <p className={paragraph}>En cualquier momento tienes derecho a:</p>
          <ul className={`${list} list-disc`}>
            <li>Conocer qué datos tuyos tenemos en nuestros registros.</li>
            <li>Solicitar la corrección de datos inexactos o desactualizados.</li>
            <li>Pedir la eliminación de tus datos de nuestras bases de contacto.</li>
            <li>Revocar el consentimiento para recibir comunicaciones nuestras.</li>
            <li>Solicitar que dejemos de contactarte por cualquier canal.</li>
          </ul>
          <p className={`${paragraph} mt-3`}>
            Para ejercer cualquiera de estos derechos, puedes escribirnos directamente
            a través de los canales de contacto disponibles en stellaris.com.co, o
            mediante el correo{" "}
            <a
              href="mailto:hola@stellaris.com.co"
              className="text-accent-pink underline underline-offset-2 hover:text-text-primary"
            >
              hola@stellaris.com.co
            </a>
            . Atenderemos tu solicitud a la mayor brevedad posible.
          </p>
        </section>

        <section aria-labelledby="canales">
          <h2 id="canales" className={sectionHeading}>
            10. Canales de contacto y comunicación
          </h2>
          <p className={paragraph}>
            Cuando nos dejas tus datos, autorizas a Stellaris a contactarte por los
            canales que hayas facilitado, con los siguientes propósitos, según lo que
            tú hayas indicado:
          </p>
          <ul className={`${list} list-disc`}>
            <li>
              Responderte consultas o solicitudes de información sobre nuestros
              servicios.
            </li>
            <li>Enviarte propuestas, diagnósticos o materiales que hayas pedido.</li>
            <li>
              Informarte sobre contenido, ofertas o novedades relevantes de Stellaris,
              si así lo autorizaste.
            </li>
          </ul>
          <p className={`${paragraph} mt-3`}>
            En ningún caso te contactaremos de forma masiva, invasiva o sin que hayas
            iniciado algún tipo de interacción previa con nosotros o sin tu
            consentimiento expreso.
          </p>
        </section>

        <section aria-labelledby="cookies">
          <h2 id="cookies" className={sectionHeading}>
            11. Uso de cookies y herramientas de análisis
          </h2>
          <p className={paragraph}>
            Nuestro sitio web puede utilizar cookies propias o de terceros (como
            Google Analytics) para entender el comportamiento de los visitantes y
            mejorar la experiencia del sitio. Las cookies de análisis no recopilan
            datos personales identificables. Al navegar en nuestro sitio, aceptas el
            uso de estas cookies con fines estadísticos y de mejora. Puedes configurar
            tu navegador para rechazarlas si así lo prefieres.
          </p>
        </section>

        <section aria-labelledby="cambios">
          <h2 id="cambios" className={sectionHeading}>
            12. Cambios en esta política
          </h2>
          <p className={paragraph}>
            Stellaris se reserva el derecho de actualizar esta política cuando sea
            necesario para reflejar cambios en nuestras prácticas o en la normativa
            aplicable. Cualquier cambio relevante será comunicado a través de nuestro
            sitio web. Te recomendamos revisar esta página de manera periódica.
          </p>
        </section>

        <section aria-labelledby="marco-legal">
          <h2 id="marco-legal" className={sectionHeading}>
            13. Marco legal de referencia
          </h2>
          <p className={paragraph}>
            Esta política se enmarca en el espíritu de la{" "}
            <strong className="text-text-primary">
              Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia)
            </strong>{" "}
            y su <strong className="text-text-primary">Decreto Reglamentario 1377 de 2013</strong>,
            así como en las buenas prácticas internacionales de manejo responsable de
            información personal.
          </p>
          <p className={`${paragraph} mt-3`}>
            Dado que Stellaris opera como un grupo de personas naturales independientes
            y no como persona jurídica registrada, esta política refleja nuestro
            compromiso ético con la privacidad de quienes interactúan con nosotros,
            más allá de cualquier obligación formal de registro ante autoridades
            competentes.
          </p>
        </section>

        <section aria-labelledby="contacto">
          <h2 id="contacto" className={sectionHeading}>
            14. Contacto
          </h2>
          <p className={paragraph}>
            Si tienes preguntas sobre esta política o sobre el manejo de tus datos
            personales, puedes contactarnos a través de:
          </p>
          <ul className={`${list} list-disc`}>
            <li>
              Nuestro{" "}
              <HashLink
                to="/#contacto"
                className="text-accent-pink underline underline-offset-2 hover:text-text-primary"
              >
                formulario de contacto
              </HashLink>{" "}
              en stellaris.com.co
            </li>
            <li>Nuestro WhatsApp de atención (disponible en el sitio web)</li>
            <li>
              Nuestro correo electrónico{" "}
              <a
                href="mailto:hola@stellaris.com.co"
                className="text-accent-pink underline underline-offset-2 hover:text-text-primary"
              >
                hola@stellaris.com.co
              </a>
            </li>
            <li>Nuestras redes sociales oficiales</li>
          </ul>
        </section>
      </article>
    </>
  );
}
