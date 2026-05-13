import {
  BookOpen,
  LayoutGrid,
  TrendingUp,
  PlayCircle,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ResourceIconKey, ResourceType } from "../../data/recursos";

export const RESOURCE_ICONS: Record<ResourceIconKey, LucideIcon> = {
  book: BookOpen,
  grid: LayoutGrid,
  trend: TrendingUp,
  play: PlayCircle,
  tool: Wrench,
  sparkles: Sparkles,
};

export interface ResourceTypeMeta {
  label: string;
  iconKey: ResourceIconKey;
  iconBg: string; // CSS class from index.css (e.g. "ios-bg-pink")
}

export const TYPE_META: Record<ResourceType, ResourceTypeMeta> = {
  guia:        { label: "Guía",            iconKey: "book",     iconBg: "ios-bg-pink"   },
  plantilla:   { label: "Plantilla",       iconKey: "grid",     iconBg: "ios-bg-purple" },
  caso:        { label: "Caso de estudio", iconKey: "trend",    iconBg: "ios-bg-green"  },
  webinar:     { label: "Webinar",         iconKey: "play",     iconBg: "ios-bg-amber"  },
  herramienta: { label: "Herramienta",     iconKey: "tool",     iconBg: "ios-bg-blue"   },
  otro:        { label: "Recurso",         iconKey: "sparkles", iconBg: "ios-bg-pink"   },
};
