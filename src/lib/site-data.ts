import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  Flame,
  MapPin,
  UserSearch,
} from "lucide-react";

export const MODULES = [
  {
    slug: "heatmap",
    title: "Live Crowd Heatmap",
    short: "Real-time GIS heatmap of every zone, camera & density hotspot.",
    icon: Flame,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    slug: "prediction",
    title: "Crowd Density Prediction",
    short: "Forecast crowd surges 15–120 minutes ahead with AI models.",
    icon: Activity,
    accent: "from-sky-500 to-emerald-400",
  },
  {
    slug: "risk",
    title: "AI Risk Engine",
    short: "Continuous risk scoring with Gemini-powered recommendations.",
    icon: Brain,
    accent: "from-indigo-500 to-blue-400",
  },
  {
    slug: "emergency",
    title: "Emergency Response",
    short: "Incident command with live alerts, checklists & team deployment.",
    icon: AlertTriangle,
    accent: "from-rose-500 to-orange-400",
  },
  {
    slug: "lost-person",
    title: "Lost Person Detection",
    short: "Facial-similarity search across every camera feed in seconds.",
    icon: UserSearch,
    accent: "from-blue-500 to-emerald-400",
  },
  {
    slug: "command",
    title: "AI Command Center",
    short: "Unified operations dashboard with Gemini AI copilot.",
    icon: MapPin,
    accent: "from-blue-600 to-teal-400",
  },
  {
    slug: "analytics",
    title: "Analytics Dashboard",
    short: "Historical performance, KPIs and exportable board-ready reports.",
    icon: BarChart3,
    accent: "from-emerald-500 to-blue-400",
  },
] as const;

export type ModuleDef = (typeof MODULES)[number];