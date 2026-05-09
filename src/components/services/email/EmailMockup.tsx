import type { CSSProperties } from "react";
import {
  Inbox,
  Star,
  Send,
  Mail,
  ChevronRight,
  Reply,
  Forward,
  CheckCircle2,
} from "lucide-react";

interface FolderItem {
  label: string;
  icon: typeof Inbox;
  count: string;
  active?: boolean;
}

const FOLDERS: readonly FolderItem[] = [
  { label: "Bandeja", icon: Inbox, count: "128", active: true },
  { label: "Destacados", icon: Star, count: "14" },
  { label: "Enviados", icon: Send, count: "" },
  { label: "Borradores", icon: Mail, count: "2" },
];

interface SegmentItem {
  label: string;
  color: string;
}

const SEGMENTS: readonly SegmentItem[] = [
  { label: "Leads fríos", color: "#FF4D6D" },
  { label: "Clientes activos", color: "#22D39C" },
  { label: "VIP", color: "#7C3AED" },
  { label: "Reactivación", color: "#F59E0B" },
];

interface EmailRow {
  from: string;
  subject: string;
  time: string;
  accent: string;
  unread?: boolean;
  active?: boolean;
}

const EMAILS: readonly EmailRow[] = [
  {
    from: "Bienvenida #01",
    subject: "Empezamos por tu objetivo",
    time: "10:32",
    accent: "#FF4D6D",
    unread: true,
    active: true,
  },
  {
    from: "Lead nurturing",
    subject: "Caso de éxito · 3 min de lectura",
    time: "09:18",
    accent: "#7C3AED",
  },
  {
    from: "Reactivación",
    subject: "Te extrañamos. Aquí algo nuevo.",
    time: "ayer",
    accent: "#22D39C",
  },
  {
    from: "Newsletter",
    subject: "Edición #14 — datos del mes",
    time: "mar",
    accent: "#F59E0B",
  },
];

interface FlowStep {
  label: string;
  color: string;
}

const FLOW: readonly FlowStep[] = [
  { label: "Captura", color: "#FF4D6D" },
  { label: "Nutrir", color: "#7C3AED" },
  { label: "Decisión", color: "#22D39C" },
  { label: "Cierre", color: "#F59E0B" },
];

export function EmailMockup() {
  return (
    <div
      role="img"
      aria-label="Vista previa de un cliente de correo con flujos de email marketing automatizados de Stellaris"
      className="relative mx-auto w-full"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Floating chip — delivered */}
      <div
        className="floaty pointer-events-none absolute -left-6 top-12 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        aria-hidden="true"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-green/15 text-accent-green">
          <CheckCircle2 size={14} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">Entregado</div>
          <div className="text-[9px] text-text-muted">a 12 segmentos</div>
        </div>
      </div>

      {/* Floating chip — automated flow */}
      <div
        className="floaty pointer-events-none absolute -right-6 bottom-16 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-pink/15 text-accent-pink">
          <Send size={13} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">Flujo automatizado</div>
          <div className="text-[9px] text-text-muted">bienvenida · nurturing · cierre</div>
        </div>
      </div>

      {/* Mail client shell */}
      <div className="mail-shell" aria-hidden="true">
        {/* Title bar */}
        <div className="mail-bar flex items-center gap-2 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="ml-2 flex-1 text-center font-mono text-[10px] text-text-muted">
            Bandeja de entrada
          </div>
          <div className="hidden gap-1 sm:flex">
            <span className="rounded-md border border-white/[0.06] bg-[#0B0712] px-2 py-0.5 font-mono text-[9px] text-text-muted">
              3 nuevos
            </span>
          </div>
        </div>

        {/* Body: sidebar + (list + open email) */}
        <div className="grid grid-cols-[120px_1fr]">
          {/* Sidebar */}
          <div className="space-y-1.5 border-r border-white/[0.06] bg-[#0E0818]/60 p-3">
            {FOLDERS.map((f) => {
              const Ico = f.icon;
              return (
                <div
                  key={f.label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[10px] ${
                    f.active ? "bg-white/[0.06] text-white" : "text-text-muted"
                  }`}
                >
                  <Ico size={12} aria-hidden="true" />
                  <span className="flex-1">{f.label}</span>
                  {f.count && (
                    <span className="font-mono text-[9px] opacity-70">{f.count}</span>
                  )}
                </div>
              );
            })}

            <div className="pt-3 text-[8px] uppercase tracking-widest text-text-muted/60">
              Segmentos
            </div>
            {SEGMENTS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-[10px] text-text-muted"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: s.color }}
                />
                <span className="truncate">{s.label}</span>
              </div>
            ))}
          </div>

          {/* List + open email */}
          <div className="grid grid-cols-[140px_1fr]">
            {/* Email list */}
            <div className="border-r border-white/[0.06] bg-[#0B0712]/40">
              {EMAILS.map((m) => (
                <div
                  key={m.from}
                  className={`border-b border-white/[0.04] px-3 py-2.5 ${
                    m.active ? "bg-white/[0.04]" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {m.unread && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: m.accent }}
                      />
                    )}
                    <span
                      className={`text-[10px] ${
                        m.unread ? "font-semibold text-white" : "text-text-muted"
                      }`}
                    >
                      {m.from}
                    </span>
                    <span className="ml-auto font-mono text-[8px] text-text-muted/70">
                      {m.time}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-[9px] text-text-muted">
                    {m.subject}
                  </div>
                </div>
              ))}
            </div>

            {/* Open email */}
            <div className="bg-bg-primary p-4">
              <div className="mb-2 flex items-center gap-2 text-[9px] text-text-muted">
                <span>tu@empresa.com</span>
                <ChevronRight size={10} aria-hidden="true" />
                <span className="text-text-muted/70">Bandeja</span>
              </div>
              <h3 className="font-heading text-[14px] font-bold leading-tight text-white">
                Empezamos por tu objetivo
              </h3>
              <div className="mt-1 flex items-center gap-2 text-[9px] text-text-muted">
                <span className="grid h-4 w-4 place-items-center rounded-full gradient-bg text-[7px] font-bold text-white">
                  S
                </span>
                <span className="font-medium text-text-primary">Stellaris</span>
                <span>· para mí · 10:32</span>
                <Star size={10} className="ml-auto" aria-hidden="true" />
              </div>

              {/* Envelope animation */}
              <div className="mt-3 grid place-items-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-accent-pink/10 to-accent-purple/10 p-4">
                <div className="relative" style={{ perspective: "600px" }}>
                  <div className="relative h-12 w-20 rounded-md border border-white/15 bg-[#0E0818]">
                    <div
                      className="flap absolute inset-x-0 top-0 h-6"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF4D6D, #7C3AED)",
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      }}
                    />
                    <div className="absolute inset-x-2 bottom-1.5 space-y-0.5">
                      <div className="h-0.5 w-full rounded bg-white/20" />
                      <div className="h-0.5 w-3/4 rounded bg-white/15" />
                      <div className="h-0.5 w-2/3 rounded bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Body placeholder lines */}
              <div className="mt-3 space-y-1">
                <div className="h-2 w-full rounded bg-white/[0.10]" />
                <div className="h-2 w-5/6 rounded bg-white/[0.08]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
              </div>

              {/* Mini CTAs */}
              <div className="mt-3 flex gap-2">
                <div className="rounded-full gradient-bg px-3 py-1 font-heading text-[9px] font-bold text-white">
                  Ver propuesta
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-[9px] text-white/80">
                  Más tarde
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center gap-3 border-t border-white/[0.04] pt-3 text-text-muted">
                <span className="flex items-center gap-1 text-[9px]">
                  <Reply size={11} aria-hidden="true" /> Responder
                </span>
                <span className="flex items-center gap-1 text-[9px]">
                  <Forward size={11} aria-hidden="true" /> Reenviar
                </span>
                <span className="ml-auto rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[8px]">
                  A/B · v2
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Automation flow strip */}
        <div className="border-t border-white/[0.06] bg-[#0E0818]/60 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
              Flujo · bienvenida → cierre
            </div>
            <div className="font-mono text-[9px] text-accent-green">activo</div>
          </div>
          <div className="relative flex items-center justify-between">
            <div className="absolute left-3 right-3 top-1/2 h-px flow-line" />
            {FLOW.map((step, i) => (
              <div
                key={step.label}
                className="relative z-10 flex flex-col items-center gap-1"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-bg-primary">
                  <span
                    className="pulse-dot h-1.5 w-1.5 rounded-full"
                    style={
                      {
                        background: step.color,
                        animationDelay: `${i * 0.4}s`,
                      } as CSSProperties
                    }
                  />
                </span>
                <span className="text-[9px] text-text-muted">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
