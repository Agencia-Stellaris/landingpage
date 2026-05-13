import { Download, FileText } from "lucide-react";
import type { Resource } from "../../data/recursos";
import { RESOURCE_ICONS, TYPE_META } from "./icons";
import { logResourceDownload } from "../../lib/firebase";

interface FeaturedResourceCardProps {
  resource: Resource;
}

export function FeaturedResourceCard({ resource }: FeaturedResourceCardProps) {
  const meta = TYPE_META[resource.type];
  const Icon = RESOURCE_ICONS[meta.iconKey];
  const disabled = resource.href === "#";

  const handleClick = () => {
    if (disabled) return;
    void logResourceDownload(resource.id, resource.type);
  };

  const linkProps = resource.external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  // The numeric label "No. 06" matches the id suffix (r6). The mockup hardcodes
  // this; we mirror it. If you rename ids, update this too.
  const idNumber = resource.id.replace(/^r/, "").padStart(2, "0");

  return (
    <article className="stl-card group relative overflow-hidden p-9">
      <div
        aria-hidden="true"
        className={`orb -left-12 -top-12 h-48 w-48 opacity-70 bg-gradient-to-br from-accent-pink to-accent-purple`}
      />
      <div
        aria-hidden="true"
        className={`orb -bottom-10 -right-10 h-40 w-40 opacity-40 bg-gradient-to-tl from-accent-pink to-accent-purple`}
      />

      <div className="relative z-10">
        <div className="mb-7 flex items-center gap-4">
          <div className={`ios-icon ${meta.iconBg}`} aria-hidden="true">
            <Icon size={26} strokeWidth={1.8} className="text-white drop-shadow-sm" />
          </div>
          <div>
            <div className="stl-num">Destacado · No. {idNumber}</div>
            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-pink">
              {meta.label}
            </div>
          </div>
        </div>

        <div className="accent-line mb-5" />

        <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-[1.7rem]">
          {resource.title}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted md:text-[0.95rem]">
          {resource.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <a
            href={resource.href}
            onClick={handleClick}
            aria-disabled={disabled || undefined}
            {...linkProps}
            className={`shine-btn inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 font-heading text-sm font-bold text-white shadow-[0_8px_30px_rgba(255,77,109,0.25)] transition-shadow hover:shadow-[0_10px_36px_rgba(255,77,109,0.4)] ${
              disabled ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Download size={16} aria-hidden="true" />
            Descargar gratis
          </a>
          <span className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <FileText size={14} aria-hidden="true" />
            {resource.meta}
          </span>
        </div>
      </div>
    </article>
  );
}
