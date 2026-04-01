import { type FormEvent, useCallback, useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { CONTACT } from "../../data/content";
import { Phone, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useReveal } from "../../hooks/useScrollReveal";

const inputStyles =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-pink/40";

const contentReveal = { y: 50 };

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactCTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useReveal<HTMLDivElement>(contentReveal);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || status === "sending") return;

    setStatus("sending");

    const data = new FormData(form);

    try {
      await addDoc(collection(db, "contactRequests"), {
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }, [status]);

  return (
    <Container
      id="contacto"
      alternate
      className="relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(124,58,237,0.15)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 mx-auto max-w-lg text-center">
        <SectionHeader
          label="Contacto"
          title="&iquest;Listo para crecer juntos?"
          subtitle="&iexcl;D&eacute;janos tus datos! Cu&eacute;ntanos sobre tu negocio y te prepararemos una propuesta personalizada sin compromiso."
          centered
        />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 text-left"
          aria-label="Formulario de contacto"
        >
          {/* Nombre */}
          <div>
            <label htmlFor="cta-name" className="mb-1.5 block text-sm font-medium">
              Nombre
            </label>
            <input
              id="cta-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Tu nombre completo"
              className={inputStyles}
            />
          </div>

          {/* Correo */}
          <div>
            <label htmlFor="cta-email" className="mb-1.5 block text-sm font-medium">
              Correo electr&oacute;nico
            </label>
            <input
              id="cta-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className={inputStyles}
            />
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="cta-message" className="mb-1.5 block text-sm font-medium">
              Mensaje
            </label>
            <textarea
              id="cta-message"
              name="message"
              required
              rows={4}
              placeholder="Cu&eacute;ntanos sobre tu proyecto..."
              className={`${inputStyles} resize-none`}
            />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2.5">
            <input
              id="cta-terms"
              name="terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-border bg-surface checked:border-accent-pink checked:bg-accent-pink"
            />
            <label htmlFor="cta-terms" className="cursor-pointer text-sm text-text-muted">
              Acepto los{" "}
              <a href="#" className="font-medium text-accent-pink underline underline-offset-2 hover:text-text-primary">
                t&eacute;rminos y condiciones
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-bg px-7 py-3.5 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:opacity-90 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Enviar mensaje
              </>
            )}
          </button>

          {/* Status messages */}
          {status === "success" && (
            <p className="flex items-center gap-2 text-sm font-medium text-accent-green">
              <CheckCircle2 size={16} />
              Mensaje enviado. Nos pondremos en contacto pronto.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-accent-pink">
              Hubo un error. Por favor, int&eacute;ntalo de nuevo.
            </p>
          )}
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-2 text-sm text-text-muted">
            <Phone size={16} aria-hidden="true" />
            {CONTACT.phone}
          </span>
          <span className="flex items-center gap-2 text-sm text-text-muted">
            <Mail size={16} aria-hidden="true" />
            {CONTACT.email}
          </span>
        </div>
      </div>
    </Container>
  );
}
