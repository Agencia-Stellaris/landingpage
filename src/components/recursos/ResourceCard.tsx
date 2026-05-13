import { ArrowRight } from "lucide-react";
import type { Resource } from "../../data/recursos";
import { RESOURCE_ICONS, TYPE_META } from "./icons";
import { logResourceDownload } from "../../lib/firebase";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
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

  return (
    <article className="stl-card group relative overflow-hidden p-6">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`ios-icon ${meta.iconBg}`}
            style={{ width: 44, height: 44, borderRadius: 12 }}
            aria-hidden="true"
          >
            <Icon size={20} strokeWidth={1.8} className="text-white drop-shadow-sm" />
          </div>
          <span className="stl-num">No. {String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="accent-line mb-4" />

        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          {meta.label}
        </div>

        <h3 className="font-heading text-[0.98rem] font-bold leading-snug text-text-primary">
          {resource.title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-text-muted">{resource.meta}</p>

        <a
          href={resource.href}
          onClick={handleClick}
          aria-disabled={disabled || undefined}
          {...linkProps}
          className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-pink transition-all group-hover:gap-2.5 ${
            disabled ? "pointer-events-none opacity-60" : ""
          }`}
        >
          Descargar
          <ArrowRight size={12} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
