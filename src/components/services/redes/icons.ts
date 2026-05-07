import {
  Target,
  Image,
  Users,
  Megaphone,
  BarChart3,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { RedesIconKey } from "../../../data/services/redes-sociales";

export const REDES_ICONS: Record<RedesIconKey, LucideIcon> = {
  strategy: Target,
  content: Image,
  community: Users,
  ads: Megaphone,
  metrics: BarChart3,
  reputation: Star,
};
