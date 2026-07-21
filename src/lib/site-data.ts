import {
  Activity,
  BarChart3,
  Boxes,
  BrainCircuit,
  ChartColumn,
  LayoutDashboard,
  MapPinned,
  ShieldAlert,
  TrendingUp,
  Search,
} from "lucide-react";

export const MODULES = [
  {
    slug: "heatmap",
    title: "Live Crowd Heatmap",
    short: "Real-time GIS visualization →",
    icon: MapPinned,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    slug: "prediction",
    title: "Crowd Density Prediction",
    short: "Forecast future crowd →",
    icon: TrendingUp,
    accent: "from-sky-500 to-emerald-400",
  },
  {
    slug: "risk",
    title: "AI Risk Engine",
    short: "Continuous risk scoring →",
    icon: BrainCircuit,
    accent: "from-indigo-500 to-blue-400",
  },
  {
    slug: "emergency",
    title: "Emergency Response",
    short: "Incident command →",
    icon: ShieldAlert,
    accent: "from-rose-500 to-orange-400",
  },
  {
    slug: "lost-person",
    title: "Lost Person Detection",
    short: "Missing-person search →",
    icon: Search,
    accent: "from-blue-500 to-emerald-400",
  },
  {
    slug: "command",
    title: "AI Command Center",
    short: "Unified operations dashboard →",
    icon: LayoutDashboard,
    accent: "from-blue-600 to-teal-400",
  },
  {
    slug: "analytics",
    title: "Analytics Dashboard",
    short: "Performance reporting →",
    icon: ChartColumn,
    accent: "from-emerald-500 to-blue-400",
  },
  {
    slug: "resource-management",
    title: "Resource Management",
    short: "Optimize teams & assets →",
    icon: Boxes,
    accent: "from-violet-500 to-fuchsia-400",
  },
] as const;

export type ModuleDef = (typeof MODULES)[number];