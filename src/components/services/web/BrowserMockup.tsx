import { useEffect, useState, type CSSProperties } from "react";
import { Lock, RotateCw, Zap } from "lucide-react";

type TabId = 0 | 1 | 2;

const TAB_LABELS: readonly string[] = ["index.tsx", "Hero.tsx", "styles.css"];

interface PerfMetric {
  label: string;
  value: string;
  width: string;
  color: string;
}

const PERF_METRICS: readonly PerfMetric[] = [
  { label: "LCP", value: "1.1s", width: "88%", color: "#22D39C" },
  { label: "CLS", value: "0.02", width: "94%", color: "#7C3AED" },
  { label: "INP", value: "140ms", width: "82%", color: "#FF4D6D" },
];

function CodeIndex() {
  return (
    <>
      <span className="tk-com">{"// Render seguro y rápido"}</span>
      {"\n"}
      <span className="tk-key">export default function</span>{" "}
      <span className="tk-fn">Page</span>
      {"() {\n"}
      {"  "}
      <span className="tk-key">return</span>
      {" ("}
      <span className="tk-tag">{"<Site/>"}</span>
      {");\n}"}
    </>
  );
}

function CodeHero() {
  return (
    <>
      <span className="tk-tag">{"<section"}</span>{" "}
      <span className="tk-fn">id</span>
      {"="}
      <span className="tk-str">{'"hero"'}</span>
      <span className="tk-tag">{">"}</span>
      {"\n  "}
      <span className="tk-tag">{"<h1>"}</span>
      {"Convierte visitas\n      en clientes."}
      <span className="tk-tag">{"</h1>"}</span>
      {"\n"}
      <span className="tk-tag">{"</section>"}</span>
    </>
  );
}

function CodeStyles() {
  return (
    <>
      <span className="tk-tag">.cta</span>
      {" {\n  "}
      <span className="tk-key">background</span>
      {": "}
      <span className="tk-str">linear-gradient(...)</span>
      {";\n  "}
      <span className="tk-key">transition</span>
      {": "}
      <span className="tk-str">.3s ease</span>
      {";\n}"}
    </>
  );
}

export function BrowserMockup() {
  const [tab, setTab] = useState<TabId>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setTab((t) => ((t + 1) % 3) as TabId),
      3500,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      role="img"
      aria-label="Vista previa de un sitio web desarrollado por Stellaris con métricas Core Web Vitals"
      className="relative mx-auto w-full"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Floating card: Lighthouse 98 */}
      <div
        className="floaty pointer-events-none absolute -left-6 top-12 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        aria-hidden="true"
      >
        <div
          className="lh-ring grid h-8 w-8 place-items-center"
          style={{ "--val": 98 } as CSSProperties}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0B0712] font-heading text-[10px] font-bold text-accent-green">
            98
          </span>
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">Performance</div>
          <div className="text-[9px] text-text-muted">Core Web Vitals</div>
        </div>
      </div>

      {/* Floating card: SEO bolt */}
      <div
        className="floaty pointer-events-none absolute -right-6 bottom-16 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur md:flex"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-pink/15 text-accent-pink">
          <Zap size={14} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">SEO · AEO · GEO</div>
          <div className="text-[9px] text-text-muted">listos desde el día 1</div>
        </div>
      </div>

      {/* Browser shell */}
      <div className="browser-shell" aria-hidden="true">
        {/* Title bar */}
        <div className="browser-bar flex items-center gap-2 px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="ml-2 flex flex-1 items-center gap-2">
            <RotateCw size={13} className="text-text-muted" aria-hidden="true" />
            <div className="flex h-7 flex-1 items-center gap-2 rounded-md border border-white/[0.06] bg-[#0B0712] px-3 text-[11px] text-text-muted">
              <Lock size={11} className="text-accent-green" aria-hidden="true" />
              <span className="text-text-primary">stellaris.com.co</span>
              <span className="text-text-muted/60">/cliente</span>
              <span className="caret" />
            </div>
          </div>
          <div className="hidden gap-1 sm:flex">
            <span className="rounded-md border border-white/[0.06] bg-[#0B0712] px-2 py-0.5 font-mono text-[9px] text-text-muted">
              200 OK
            </span>
          </div>
        </div>

        {/* Canvas */}
        <div className="browser-canvas">
          {/* Fake site nav */}
          <div className="flex items-center justify-between border-b border-white/[0.04] px-7 pt-6 pb-4">
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-sm gradient-bg font-heading text-[8px] font-bold text-white">
                M
              </span>
              <span className="font-heading text-[12px] font-bold tracking-tight text-white">
                tu marca
              </span>
            </div>
            <div className="hidden items-center gap-5 text-[10px] text-text-muted sm:flex">
              <span>Producto</span>
              <span>Casos</span>
              <span>Precios</span>
              <span className="text-white">Contacto</span>
            </div>
            <div className="rounded-full gradient-bg px-3 py-1 font-heading text-[10px] font-bold text-white">
              Empezar →
            </div>
          </div>

          {/* Fake hero block */}
          <div className="fake-hero-grad relative px-7 pt-10 pb-6">
            <div className="grid grid-cols-[1.3fr_minmax(0,1fr)] items-center gap-6">
              <div>
                <div className="mb-2 inline-block rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-accent-pink">
                  Lanzamiento
                </div>
                <div className="font-heading text-[22px] font-extrabold leading-[1.05] tracking-tight text-white">
                  Tu mejor vendedor,
                  <br />
                  siempre disponible.
                </div>
                <div className="mt-2 max-w-[18rem] text-[10px] leading-relaxed text-text-muted">
                  Diseñamos sitios que atraen, convencen y convierten —desde el
                  primer segundo.
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="rounded-full gradient-bg px-3 py-1.5 font-heading text-[10px] font-bold text-white">
                    Ver demo
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-white">
                    Cómo funciona
                  </div>
                </div>
              </div>

              {/* Tabbed code panel */}
              <div className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#0B0712]/80 backdrop-blur">
                <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1.5">
                  {TAB_LABELS.map((label, i) => (
                    <span
                      key={label}
                      className={`rounded-md px-2 py-0.5 font-mono text-[9px] ${
                        tab === i
                          ? "bg-white/[0.06] text-white"
                          : "text-text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <pre className="code-block overflow-hidden p-3 text-text-primary">
                  {tab === 0 && <CodeIndex />}
                  {tab === 1 && <CodeHero />}
                  {tab === 2 && <CodeStyles />}
                </pre>
              </div>
            </div>

            {/* Perf bars */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {PERF_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      {m.label}
                    </span>
                    <span className="font-heading text-[11px] font-bold text-white">
                      {m.value}
                    </span>
                  </div>
                  <div
                    className="perf-bar mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]"
                    style={{ "--w": m.width } as CSSProperties}
                  >
                    <i
                      className="block h-full rounded-full"
                      style={{ background: m.color, width: m.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
