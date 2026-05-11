import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Phone, Send } from "lucide-react";
import isologo from "../../../assets/logo/stellaris_Isologo.png";

const TOTAL_STEPS = 6;
const STEP_DELAYS = [600, 1500, 1100, 1400, 1300, 2200];

export function ChatMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Respect reduced-motion: render the final state and never start the loop.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(TOTAL_STEPS - 1);
      setAnimate(false);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setAnimate(e.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;
    let cancel = false;
    let i = 0;
    const tick = () => {
      if (cancel) return;
      setStep((s) => (s + 1) % TOTAL_STEPS);
      i++;
      const delay = STEP_DELAYS[i % STEP_DELAYS.length];
      window.setTimeout(tick, delay);
    };
    const id = window.setTimeout(tick, 800);
    return () => {
      cancel = true;
      window.clearTimeout(id);
    };
  }, [animate]);

  const show = (n: number) => step >= n;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Vista previa de conversación de WhatsApp con Stellaris"
      className="relative mx-auto w-full max-w-[330px]"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="rounded-[2.4rem] border border-white/[0.08] bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)]">
        <div className="overflow-hidden rounded-[2rem] bg-[#0E1A14]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#1F2C2A] px-4 py-3" aria-hidden="true">
            <ArrowLeft size={16} className="text-white/70" />
            <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full gradient-bg">
              <img
                src={isologo}
                alt=""
                width={24}
                height={24}
                loading="lazy"
                decoding="async"
                className="h-6 w-6"
              />
            </div>
            <div className="flex-1">
              <div className="font-heading text-sm font-semibold text-white">Stellaris</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                en línea
              </div>
            </div>
            <Phone size={16} className="text-white/70" />
          </div>

          {/* Body */}
          <div
            className="chat-shell space-y-2.5 overflow-hidden bg-[#0E1A14] bg-[radial-gradient(circle_at_20%_10%,rgba(37,211,102,0.06),transparent_50%)] px-3 py-4 text-[13px] leading-snug"
            aria-hidden="true"
          >
            <div className="text-center text-[10px] uppercase tracking-wider text-white/30">
              hoy
            </div>

            {show(0) && (
              <div className="flex">
                <div className="bubble-in relative max-w-[78%] rounded-2xl rounded-bl-md bg-[#202C2B] px-3 py-2 text-white/90">
                  Hola 👋 Vi que dejaste tus datos. ¿Te cuento cómo podemos ayudarte?
                  <div className="mt-1 text-right text-[10px] text-white/40">10:24</div>
                </div>
              </div>
            )}

            {show(1) && (
              <div className="flex justify-end">
                <div className="bubble-out relative max-w-[78%] rounded-2xl rounded-br-md bg-[#155E50] px-3 py-2 text-white">
                  Sí, claro. Cuéntame.
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-200/80">
                    10:24 <span>✓✓</span>
                  </div>
                </div>
              </div>
            )}

            {show(2) && step < 4 && (
              <div className="flex">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[#202C2B] px-3 py-2.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            {show(3) && (
              <div className="flex">
                <div className="bubble-in relative max-w-[82%] rounded-2xl rounded-bl-md bg-[#202C2B] px-3 py-2 text-white/90">
                  Diseñamos tu estrategia, configuramos los flujos y automatizamos las respuestas. Tú solo recibes los leads.
                  <div className="mt-1 text-right text-[10px] text-white/40">10:25</div>
                </div>
              </div>
            )}

            {show(4) && (
              <div className="flex justify-end">
                <div className="bubble-out relative max-w-[78%] rounded-2xl rounded-br-md bg-[#155E50] px-3 py-2 text-white">
                  Perfecto, quiero empezar.
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-200/80">
                    10:25 <span>✓✓</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 bg-[#1F2C2A] px-3 py-2.5" aria-hidden="true">
            <div className="flex-1 rounded-full bg-[#2A3937] px-3 py-1.5 text-[12px] text-white/40">
              Escribe un mensaje…
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-wa-green text-white">
              <Send size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
