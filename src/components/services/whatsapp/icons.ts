import {
  Layers3,
  Target,
  Users,
  Workflow,
  Megaphone,
  Database,
  Bot,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import type { WhatsAppIconKey } from "../../../data/services/whatsapp-marketing";

export const WHATSAPP_ICONS: Record<WhatsAppIconKey, LucideIcon> = {
  api: Layers3,
  strategy: Target,
  segment: Users,
  automate: Workflow,
  broadcast: Megaphone,
  crm: Database,
  bot: Bot,
  metrics: BarChart3,
};
