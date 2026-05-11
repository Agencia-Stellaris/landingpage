import { Link } from "react-router-dom";

interface CookieBannerProps {
  onChoice: (consent: "accepted" | "rejected") => void;
}

export function CookieBanner({ onChoice }: CookieBannerProps) {
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-white/[0.08] bg-bg-secondary/95 p-5 shadow-2xl backdrop-blur md:bottom-6 md:left-6 md:right-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-text-muted md:flex-1">
          Usamos cookies de análisis para entender cómo navegás el sitio y mejorarlo.
          No recopilamos datos personales identificables.{" "}
          <Link
            to="/politica-de-privacidad#cookies"
            className="font-medium text-accent-pink underline underline-offset-2 hover:text-text-primary"
          >
            Más información
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onChoice("rejected")}
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:border-white/30 hover:bg-white/[0.03]"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => onChoice("accepted")}
            className="rounded-full gradient-bg px-4 py-2 font-heading text-sm font-bold text-white transition-all hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(255,77,109,0.35)]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
