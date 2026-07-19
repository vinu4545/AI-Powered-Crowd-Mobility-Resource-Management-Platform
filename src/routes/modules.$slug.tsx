import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HeatmapCanvas } from "@/components/site/HeatmapCanvas";
import { MODULES } from "@/lib/site-data";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar, PolarAngleAxis, PieChart, Pie, Cell,
} from "recharts";
import {
  ArrowRight, Bell, Download, Filter, Search, Camera, Upload, Zap,
  AlertTriangle, CheckCircle2, Users, MapPin, Activity, Radio, ShieldAlert,
  Sparkles, Play, Pause, RefreshCw, Wifi, Cloud,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import crowdImg from "@/assets/crowd-aerial.jpg";
import dashImg from "@/assets/ai-dashboard.jpg";
import cctvImg from "@/assets/cctv-wall.jpg";
import emergencyImg from "@/assets/emergency.jpg";

export const Route = createFileRoute("/modules/$slug")({
  beforeLoad: ({ params }) => {
    if (!MODULES.find((m) => m.slug === params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const m = MODULES.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: `${m?.title ?? "Module"} · Orbit.AI` },
        { name: "description", content: m?.short ?? "" },
      ],
    };
  },
  component: ModulePage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto w-[min(800px,92%)] py-32 text-center">
        <h1 className="text-3xl font-bold">Module not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Go home</Link>
      </div>
    </PageShell>
  ),
});

function ModulePage() {
  const { slug } = Route.useParams();
  const m = MODULES.find((x) => x.slug === slug)!;
  const Icon = m.icon;

  return (
    <PageShell>
      {/* Header */}
      <section className="relative overflow-hidden pt-10 pb-8">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="mx-auto flex w-[min(1300px,94%)] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn("grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg", m.accent)}>
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">Module</div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{m.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{m.short}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-semibold hover:border-primary/40 transition">
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-semibold hover:border-primary/40 transition">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-[min(1300px,94%)] pb-24">
        {slug === "heatmap" && <HeatmapModule />}
        {slug === "prediction" && <PredictionModule />}
        {slug === "risk" && <RiskModule />}
        {slug === "emergency" && <EmergencyModule />}
        {slug === "lost-person" && <LostPersonModule />}
        {slug === "command" && <CommandModule />}
        {slug === "analytics" && <AnalyticsModule />}
      </div>
    </PageShell>
  );
}

/* ---------- Shared bits ---------- */

function KpiCard({ label, value, hint, tone = "blue", suffix, decimals = 0 }: {
  label: string; value: number; hint?: string; tone?: "blue" | "green" | "orange" | "red"; suffix?: string; decimals?: number;
}) {
  const toneMap = {
    blue: "from-blue-500 to-cyan-400",
    green: "from-emerald-500 to-teal-400",
    orange: "from-orange-500 to-amber-400",
    red: "from-rose-500 to-orange-400",
  };
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-5">
      <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r", toneMap[tone])} />
      <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-3xl font-bold tracking-tight text-gradient">
        <CountUp end={value} duration={2} decimals={decimals} separator="," suffix={suffix} />
      </div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass-strong rounded-2xl p-5", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-bold">{title}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ---------- 1. Heatmap ---------- */

function HeatmapModule() {
  const [fullscreen, setFullscreen] = useState(false);
  const zones = [
    { n: "Main Temple", d: 94, c: 18420, s: "critical" },
    { n: "Grand Road", d: 78, c: 12300, s: "high" },
    { n: "Market Area", d: 62, c: 8940, s: "medium" },
    { n: "Parking A", d: 41, c: 3210, s: "low" },
    { n: "East Gate", d: 33, c: 2810, s: "low" },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-4">
          <KpiCard label="Current Crowd" value={48204} tone="blue" hint="Jagannath Puri · all zones" />
          <KpiCard label="Peak Zone Density" value={94} suffix="%" tone="red" hint="Main Temple" />
          <KpiCard label="Live FPS" value={29.8} decimals={1} tone="green" hint="126 cameras online" />
          <KpiCard label="Active Alerts" value={4} tone="orange" hint="2 critical · 2 warning" />
        </div>

        <Panel
          title="Live GIS Heatmap · Jagannath Puri"
          action={
            <div className="flex gap-1.5">
              <button onClick={() => setFullscreen((f) => !f)} className="rounded-lg border border-border px-2.5 py-1 text-xs font-semibold hover:bg-primary/5">
                {fullscreen ? "Exit" : "Fullscreen"}
              </button>
              <button className="rounded-lg border border-border px-2.5 py-1 text-xs font-semibold hover:bg-primary/5"><RefreshCw className="h-3.5 w-3.5" /></button>
            </div>
          }
        >
          <div className={cn("relative overflow-hidden rounded-xl", fullscreen ? "aspect-[16/8]" : "aspect-[16/9]")}>
            <HeatmapCanvas />
            <div className="absolute left-3 bottom-3 glass rounded-xl px-3 py-2 text-white">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Density Legend</div>
              <div className="mt-1 flex items-center gap-2 text-[11px]">
                {[
                  ["Low", "bg-emerald-400"],
                  ["Medium", "bg-yellow-400"],
                  ["High", "bg-orange-400"],
                  ["Critical", "bg-red-500"],
                ].map(([l, c]) => (
                  <div key={l} className="flex items-center gap-1">
                    <span className={cn("h-2 w-2 rounded-full", c)} />
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Zone Density Table">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 text-left">Zone</th><th className="text-left">Density</th><th className="text-left">Count</th><th className="text-left">Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z) => (
                <tr key={z.n} className="border-b border-border/50 hover:bg-primary/5 transition">
                  <td className="py-3 font-semibold">{z.n}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                        <div className={cn("h-full rounded-full",
                          z.d > 85 ? "bg-red-500" : z.d > 65 ? "bg-orange-500" : z.d > 45 ? "bg-yellow-500" : "bg-emerald-500")}
                          style={{ width: `${z.d}%` }} />
                      </div>
                      <span className="text-xs font-mono">{z.d}%</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs">{z.c.toLocaleString()}</td>
                  <td>
                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      z.s === "critical" ? "bg-red-500/15 text-red-600" :
                      z.s === "high" ? "bg-orange-500/15 text-orange-600" :
                      z.s === "medium" ? "bg-yellow-500/15 text-yellow-700" :
                      "bg-emerald-500/15 text-emerald-600")}>{z.s}</span>
                  </td>
                  <td className="text-right"><button className="text-primary text-xs font-semibold hover:underline">View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      <aside className="space-y-4">
        <Panel title="Top Crowded Zones">
          <div className="space-y-3">
            {zones.slice(0, 3).map((z, i) => (
              <div key={z.n} className="flex items-center gap-3">
                <div className="text-2xl font-black text-gradient">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{z.n}</div>
                  <div className="text-xs text-muted-foreground">{z.c.toLocaleString()} people · {z.d}%</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Live Alerts">
          <div className="space-y-2">
            {[
              { t: "Critical density · Main Temple", ts: "just now", tone: "red" },
              { t: "Camera offline · Cam-38", ts: "2m", tone: "orange" },
              { t: "Predicted surge · Grand Road", ts: "5m", tone: "orange" },
            ].map((a) => (
              <div key={a.t} className={cn("rounded-lg border-l-4 bg-muted/40 px-3 py-2",
                a.tone === "red" ? "border-red-500" : "border-orange-500")}>
                <div className="text-xs font-semibold">{a.t}</div>
                <div className="text-[10px] text-muted-foreground">{a.ts} ago</div>
              </div>
            ))}
          </div>
        </Panel>
        <img src={cctvImg} alt="" loading="lazy" className="w-full rounded-2xl object-cover" />
      </aside>
    </div>
  );
}

/* ---------- 2. Prediction ---------- */

const predictionData = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}:00`,
  actual: i < 14 ? 20000 + Math.sin(i / 2) * 8000 + i * 1200 : null,
  predicted: 20000 + Math.sin(i / 2) * 8000 + i * 1200 + (i > 13 ? (i - 14) * 800 : 0),
  confidence: 92 - Math.abs(i - 12) * 0.5,
}));

function PredictionModule() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Current Crowd" value={48204} tone="blue" />
        <KpiCard label="Predicted · 30 min" value={57120} tone="orange" hint="+18.4% surge expected" />
        <KpiCard label="Growth Rate" value={18.4} suffix="%" decimals={1} tone="orange" />
        <KpiCard label="Model Confidence" value={92.6} suffix="%" decimals={1} tone="green" />
      </div>

      <Panel title="24-Hour Forecast">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="a" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="p" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="h" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#a)" strokeWidth={2} name="Actual" />
            <Area type="monotone" dataKey="predicted" stroke="#10b981" fill="url(#p)" strokeWidth={2} strokeDasharray="6 3" name="Predicted" />
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Trend · Next 4 Hours" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={predictionData.slice(12, 20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="h" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="confidence" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Prediction History">
          <div className="space-y-3 text-sm">
            {[
              { t: "12:00", p: "52,400", a: "51,890", err: "0.9%" },
              { t: "11:00", p: "49,300", a: "48,720", err: "1.2%" },
              { t: "10:00", p: "44,200", a: "43,110", err: "2.5%" },
              { t: "09:00", p: "38,700", a: "39,240", err: "1.4%" },
            ].map((r) => (
              <div key={r.t} className="flex items-center justify-between border-b border-border/50 pb-2">
                <div>
                  <div className="font-semibold">{r.t}</div>
                  <div className="text-[11px] text-muted-foreground">Predicted {r.p} → Actual {r.a}</div>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">±{r.err}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ---------- 3. Risk ---------- */

function RiskModule() {
  const riskData = [{ name: "Risk", value: 72, fill: "#f97316" }];
  const distribution = [
    { name: "Low", value: 45, color: "#10b981" },
    { name: "Medium", value: 30, color: "#eab308" },
    { name: "High", value: 18, color: "#f97316" },
    { name: "Critical", value: 7, color: "#ef4444" },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
      <Panel title="Overall Risk Score" className="lg:col-span-1">
        <div className="relative">
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={riskData} startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
            <div className="text-5xl font-black text-gradient"><CountUp end={72} duration={2} /></div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange-500">High Risk</div>
          </div>
        </div>
      </Panel>

      <Panel title="Risk Distribution">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={distribution} innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value">
              {distribution.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          {distribution.map((d) => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              {d.name} · {d.value}%
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Gemini AI Recommendation" className="bg-gradient-to-br from-primary/8 to-accent/8">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-4 w-4" /> Live Suggestion
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed">
          "Density on Main Temple corridor is trending toward critical in ~14 minutes. Recommend opening
          Gate C, redirecting Grand Road inflow via East Bypass, and deploying 12 volunteers to Junction 4."
        </p>
        <div className="mt-4 space-y-2">
          {["Deploy 12 volunteers → Junction 4", "Open Gate C for outflow", "Redirect crowd via East Bypass"].map((a) => (
            <button key={a} className="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-white/70 px-3 py-2 text-left text-xs font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
              {a} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Zone Risk Table" className="lg:col-span-3">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-widest text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-2 text-left">Zone</th><th className="text-left">Risk</th><th className="text-left">Trend</th><th className="text-left">Contributing Factors</th><th></th>
            </tr>
          </thead>
          <tbody>
            {[
              { z: "Main Temple", r: 91, t: "↑", f: "Density, bottleneck, weather" },
              { z: "Grand Road", r: 78, t: "↑", f: "Density, prediction surge" },
              { z: "Market Area", r: 54, t: "→", f: "Volume, single exit" },
              { z: "Parking A", r: 32, t: "↓", f: "Cleared vehicles" },
            ].map((r) => (
              <tr key={r.z} className="border-b border-border/50">
                <td className="py-3 font-semibold">{r.z}</td>
                <td className="font-mono font-bold text-orange-600">{r.r}</td>
                <td className="text-lg">{r.t}</td>
                <td className="text-xs text-muted-foreground">{r.f}</td>
                <td className="text-right"><button className="text-primary text-xs font-semibold hover:underline">Mitigate →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* ---------- 4. Emergency ---------- */

function EmergencyModule() {
  const [ack, setAck] = useState(false);
  return (
    <div className="space-y-5">
      <AnimatePresence>
        {!ack && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="relative overflow-hidden rounded-2xl border-2 border-red-500 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-5"
          >
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-red-500/30 blur-2xl animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-50" />
                <div className="relative grid h-12 w-12 place-items-center rounded-full bg-red-500 text-white">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-red-600">Critical Incident · P0</div>
                <div className="text-lg font-bold">Crowd crush risk detected — Main Temple corridor</div>
                <div className="text-xs text-muted-foreground">Detected 00:42 ago · Confidence 96% · Cam-12, Cam-14</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setAck(true)} className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600 transition">Acknowledge</button>
                <button className="rounded-xl border border-red-500 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-500 hover:text-white transition">Deploy Team</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Active Incidents" value={4} tone="red" />
        <KpiCard label="Teams Deployed" value={7} tone="blue" />
        <KpiCard label="Avg Response Time" value={2.4} suffix="m" decimals={1} tone="green" />
        <KpiCard label="Resolved Today" value={23} tone="green" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <Panel title="Emergency Timeline">
          <ol className="relative space-y-4 pl-6">
            <span className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            {[
              { t: "00:00", e: "Critical density detected · Main Temple", tone: "red" },
              { t: "00:15", e: "Auto-alert sent to command staff · 12 recipients", tone: "orange" },
              { t: "00:32", e: "Gemini AI recommended opening Gate C", tone: "blue" },
              { t: "01:04", e: "Team Alpha deployed · ETA 3 min", tone: "blue" },
              { t: "02:20", e: "Gate C opened · outflow started", tone: "green" },
            ].map((s, i) => (
              <li key={i} className="relative">
                <span className={cn("absolute -left-6 top-1.5 h-3 w-3 rounded-full ring-4 ring-background",
                  s.tone === "red" ? "bg-red-500" : s.tone === "orange" ? "bg-orange-500" :
                  s.tone === "blue" ? "bg-blue-500" : "bg-emerald-500")} />
                <div className="text-[11px] font-mono text-muted-foreground">T+{s.t}</div>
                <div className="text-sm font-semibold">{s.e}</div>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Response Checklist">
          <ul className="space-y-2 text-sm">
            {[
              { l: "Acknowledge alert", done: ack },
              { l: "Notify command staff", done: true },
              { l: "Deploy response team", done: true },
              { l: "Open emergency exit", done: false },
              { l: "Broadcast public message", done: false },
              { l: "Coordinate with police", done: false },
            ].map((c) => (
              <li key={c.l} className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2">
                <CheckCircle2 className={cn("h-4 w-4", c.done ? "text-emerald-500" : "text-muted-foreground/40")} />
                <span className={cn(c.done && "line-through text-muted-foreground")}>{c.l}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Live Notification Feed">
        <div className="grid gap-2 md:grid-cols-2">
          {[
            { i: Radio, t: "Team Alpha checked in at Junction 4", ts: "12s" },
            { i: Bell, t: "Weather alert · rain expected in 18 min", ts: "45s" },
            { i: Users, t: "Volunteer group 3 arrived · Grand Road", ts: "1m" },
            { i: ShieldAlert, t: "Camera 38 offline · investigating", ts: "3m" },
          ].map((n, i) => {
            const Icon = n.i;
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border/60 bg-white p-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
                <div className="flex-1 text-sm">{n.t}</div>
                <span className="text-[10px] text-muted-foreground">{n.ts}</span>
              </div>
            );
          })}
        </div>
      </Panel>

      <img src={emergencyImg} alt="" loading="lazy" className="h-64 w-full rounded-2xl object-cover" />
    </div>
  );
}

/* ---------- 5. Lost Person ---------- */

function LostPersonModule() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(false);

  const runScan = () => {
    setScanning(true); setFound(false); setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setScanning(false); setFound(true); return 100; }
        return p + 5;
      });
    }, 90);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <Panel title="Upload Reference Image">
        <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.03] p-10 text-center hover:border-primary/60 transition">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg">
            <Upload className="h-7 w-7" />
          </div>
          <div className="mt-3 text-base font-bold">Drag & drop photo</div>
          <div className="text-xs text-muted-foreground">or click to browse · JPG, PNG · up to 10MB</div>
          <button onClick={runScan} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:-translate-y-0.5 transition">
            <Search className="h-4 w-4" /> Search across 126 cameras
          </button>
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Detection progress</div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-muted-foreground">{scanning ? `Scanning… ${progress}% · analyzing 126 feeds` : found ? "Match found in 4.2 seconds." : "Idle"}</div>
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel title="Best Match">
          {found ? (
            <div className="flex gap-4">
              <div className="grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                <Camera className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Match · 96.4% similarity</div>
                <div className="mt-1 text-lg font-bold">Camera-14 · Grand Road</div>
                <div className="text-xs text-muted-foreground">Detected 12 sec ago · timestamp 14:32:08</div>
                <div className="mt-3 flex gap-2">
                  <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">Focus Map</button>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold">Notify Team</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">Upload a photo to begin.</div>
          )}
        </Panel>

        <Panel title="Camera Feed Preview">
          <div className="aspect-video overflow-hidden rounded-xl">
            <HeatmapCanvas />
          </div>
        </Panel>

        <Panel title="Detection History">
          <div className="space-y-2 text-sm">
            {[
              { p: "Case #2413 · child, red shirt", loc: "Cam-14 · Grand Road", sim: "96%" },
              { p: "Case #2401 · elderly woman", loc: "Cam-08 · Main Temple", sim: "91%" },
              { p: "Case #2389 · man, backpack", loc: "Cam-22 · Parking A", sim: "88%" },
            ].map((h) => (
              <div key={h.p} className="flex items-center justify-between border-b border-border/50 pb-2">
                <div>
                  <div className="font-semibold">{h.p}</div>
                  <div className="text-xs text-muted-foreground">{h.loc}</div>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600">{h.sim}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ---------- 6. Command Center ---------- */

function CommandModule() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Current Crowd" value={48204} tone="blue" hint="all zones" />
        <KpiCard label="Highest Risk" value={91} tone="red" hint="Main Temple · P0" />
        <KpiCard label="Predicted Peak" value={62800} tone="orange" hint="in 45 min" />
        <KpiCard label="Emergency Alerts" value={4} tone="orange" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Resources Available" value={182} tone="green" hint="volunteers · vehicles · gates" />
        <KpiCard label="Active Cameras" value={126} tone="blue" hint="of 128" />
        <KpiCard label="AI Status" value={99.8} suffix="%" decimals={1} tone="green" hint="all models online" />
        <div className="glass-strong rounded-2xl p-5">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Weather</div>
          <div className="mt-2 flex items-center gap-3">
            <Cloud className="h-8 w-8 text-primary" />
            <div>
              <div className="text-2xl font-bold">28°C</div>
              <div className="text-xs text-muted-foreground">Partly cloudy · rain in 18m</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Unified Command Map" action={
          <div className="flex gap-1.5 text-xs">
            <button className="rounded-lg border border-border px-2.5 py-1 font-semibold hover:bg-primary/5"><Play className="h-3 w-3 inline mr-1" />Live</button>
            <button className="rounded-lg border border-border px-2.5 py-1 font-semibold hover:bg-primary/5">Layers</button>
          </div>
        }>
          <div className="aspect-[16/10] overflow-hidden rounded-xl">
            <HeatmapCanvas />
          </div>
        </Panel>

        <Panel title="Gemini AI Assistant" className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="h-4 w-4" /> Copilot · Natural Language
          </div>
          <div className="mt-3 space-y-3">
            <div className="rounded-2xl bg-white p-3 text-sm shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Insight</div>
              <p className="mt-1">Grand Road pressure has grown 22% in the last 10 min. Current gate configuration will breach safe density in ~14 min.</p>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Recommended actions</div>
            {[
              { i: Users, t: "Deploy 12 volunteers → Junction 4" },
              { i: MapPin, t: "Open Gate C for outflow" },
              { i: Activity, t: "Redirect Grand Road inflow via East Bypass" },
              { i: Bell, t: "Emergency broadcast to Zone 2 speakers" },
            ].map((a) => {
              const Icon = a.i;
              return (
                <button key={a.t} className="group flex w-full items-center gap-3 rounded-xl border border-primary/20 bg-white/70 px-3 py-2.5 text-left text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                  <Icon className="h-4 w-4" /> <span className="flex-1">{a.t}</span> <ArrowRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />
                </button>
              );
            })}
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <input placeholder="Ask Gemini… e.g. 'summarize the last 30 min'" className="w-full bg-transparent text-sm outline-none" />
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="Live Camera Wall">
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-md bg-gradient-to-br from-slate-800 to-slate-900">
                <img src={i % 2 === 0 ? cctvImg : crowdImg} alt="" loading="lazy" className="h-full w-full object-cover opacity-80" />
                <span className="absolute left-1 top-1 rounded bg-red-500 px-1 text-[8px] font-bold text-white">LIVE</span>
                <span className="absolute right-1 bottom-1 text-[8px] font-mono text-white">CAM-{10 + i}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Resources">
          {[
            { l: "Volunteers", v: 82, m: 120, c: "bg-blue-500" },
            { l: "Vehicles", v: 24, m: 30, c: "bg-emerald-500" },
            { l: "Medics", v: 12, m: 18, c: "bg-orange-500" },
            { l: "Gates open", v: 6, m: 9, c: "bg-primary" },
          ].map((r) => (
            <div key={r.l} className="mb-3">
              <div className="flex justify-between text-xs"><span className="font-semibold">{r.l}</span><span className="font-mono">{r.v}/{r.m}</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={cn("h-full rounded-full", r.c)} style={{ width: `${(r.v/r.m)*100}%` }} />
              </div>
            </div>
          ))}
        </Panel>
        <Panel title="System Health">
          {[
            { i: Wifi, l: "Network", v: "Excellent" },
            { i: Camera, l: "Cameras", v: "126 / 128 online" },
            { i: Zap, l: "Inference", v: "29.8 FPS avg" },
            { i: ShieldAlert, l: "Alerts pipeline", v: "Healthy" },
          ].map((s) => {
            const Icon = s.i;
            return (
              <div key={s.l} className="flex items-center justify-between border-b border-border/50 py-2 text-sm">
                <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /> {s.l}</div>
                <span className="text-xs font-semibold text-emerald-600">{s.v}</span>
              </div>
            );
          })}
        </Panel>
      </div>
    </div>
  );
}

/* ---------- 7. Analytics ---------- */

const peakHours = Array.from({ length: 24 }, (_, i) => ({ h: `${i}h`, v: Math.round(2000 + Math.sin((i - 6) / 3) * 4000 + Math.random() * 800) }));
const growth = Array.from({ length: 12 }, (_, i) => ({ m: `M${i + 1}`, v: 40 + i * 4.5 + Math.random() * 8 }));

function AnalyticsModule() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Total Visitors · 30d" value={2840000} tone="blue" />
        <KpiCard label="Avg Daily Risk" value={54} tone="orange" />
        <KpiCard label="Incidents Resolved" value={412} tone="green" />
        <KpiCard label="Prediction Accuracy" value={94.2} suffix="%" decimals={1} tone="green" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {["7d", "30d", "90d", "1y"].map((r, i) => (
            <button key={r} className={cn("rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
              i === 1 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white hover:border-primary/40")}>{r}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-semibold hover:border-primary/40">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow">
            Generate PDF Report
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Peak Hours">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="h" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="v" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Crowd Growth · 12 months">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growth}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="#10b981" fill="url(#g)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Top Dangerous Zones · 30 days">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-muted-foreground">
              <tr className="border-b border-border"><th className="py-2 text-left">Zone</th><th className="text-left">Incidents</th><th className="text-left">Avg Risk</th><th className="text-left">Peak Density</th></tr>
            </thead>
            <tbody>
              {[
                { z: "Main Temple", i: 142, r: 82, d: "96%" },
                { z: "Grand Road", i: 98, r: 71, d: "88%" },
                { z: "Market Area", i: 62, r: 58, d: "74%" },
                { z: "East Gate", i: 40, r: 47, d: "63%" },
                { z: "Parking A", i: 21, r: 32, d: "52%" },
              ].map((r) => (
                <tr key={r.z} className="border-b border-border/50">
                  <td className="py-3 font-semibold">{r.z}</td>
                  <td>{r.i}</td>
                  <td className="font-mono">{r.r}</td>
                  <td>{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel title="Emergency Timeline · 30d">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="m" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="v" stroke="#f97316" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <img src={dashImg} alt="" loading="lazy" className="h-72 w-full rounded-2xl object-cover" />
    </div>
  );
}