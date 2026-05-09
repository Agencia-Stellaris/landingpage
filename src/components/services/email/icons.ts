import {
  Target,
  LayoutTemplate,
  Users,
  Workflow,
  FlaskConical,
  Grid3x3,
  LineChart,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  RefreshCcw,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { EmailIconKey } from "../../../data/services/email-marketing";

export const EMAIL_ICONS: Record<EmailIconKey, LucideIcon> = {
  strategy: Target,
  template: LayoutTemplate,
  segment: Users,
  automation: Workflow,
  abtest: FlaskConical,
  platform: Grid3x3,
  reports: LineChart,
  deliverability: ShieldCheck,
  cart: ShoppingCart,
  nurture: Sparkles,
  reactivate: RefreshCcw,
  revenue: TrendingUp,
};
