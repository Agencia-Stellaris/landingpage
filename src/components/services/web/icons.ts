import {
  LayoutGrid,
  Smartphone,
  Search,
  Mic,
  Gauge,
  Database,
  LayoutTemplate,
  ShoppingBag,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import type { WebIconKey } from "../../../data/services/desarrollo-web";

export const WEB_ICONS: Record<WebIconKey, LucideIcon> = {
  ux: LayoutGrid,
  responsive: Smartphone,
  seo: Search,
  aeo: Mic,
  speed: Gauge,
  crm: Database,
  landing: LayoutTemplate,
  shop: ShoppingBag,
  support: LifeBuoy,
};
