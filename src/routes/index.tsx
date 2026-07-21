import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  Radar,
  ShieldAlert,
  Cpu,
  Layers,
  MapPin,
  Cctv,
  Zap,
  Building2,
  TrainFront,
  Plane,
  Trophy,
  Church,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import { CountUp } from "@/lib/countup";
import { PageShell } from "@/components/site/PageShell";
import { HeatmapCanvas } from "@/components/site/HeatmapCanvas";
import { MODULES } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-command.jpg";
import crowdImg from "@/assets/crowd-aerial.jpg";
import dashImg from "@/assets/ai-dashboard.jpg";
import cctvImg from "@/assets/cctv-wall.jpg";
import emergencyImg from "@/assets/emergency.jpg";
import droneImg from "@/assets/drone.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />
      <LogoStrip />
      <Overview />
      <ModulesGrid />
      <LiveMapPreview />
      <Workflow />
      <Industries />
      <Benefits />
      <CTASection />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -top-40 -right-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-40 -left-32 h-[400px] w-[400px] rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="mx-auto grid w-[min(1200px,92%)] items-center gap-10 pt-14 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Real-Time · Predictive · Gemini-Powered
          </div>
          <h1 className="mt-5 text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            AI-Powered <span className="text-gradient">Crowd, Mobility &amp;</span> Resource Management Platform
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Real-time AI platform for crowd monitoring, prediction, emergency response and smart
            resource allocation — trusted by Smart Cities, Airports, Metros, Stadiums and Public
            Safety command centers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={"/modules/$slug" as any}
              params={{ slug: "command" } as any}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-[0_20px_60px_-15px_oklch(0.55_0.19_255_/_0.5)] hover:-translate-y-0.5 transition"
            >
              Explore Dashboard <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 transition">
              <PlayCircle className="h-4 w-4 text-primary" /> Watch Demo
            </button>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent-soft/40 px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft/60 transition">
              Request Demo
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { v: 12.4, s: "M+", l: "People Monitored" },
              { v: 320, s: "+", l: "Zones Live" },
              { v: 99.2, s: "%", l: "Detection Accuracy", d: 1 },
            ].map((k) => (
              <div key={k.l}>
                <div className="text-2xl font-bold text-gradient">
                  <CountUp end={k.v} decimals={k.d ?? 0} duration={2.4} />{k.s}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Live dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="glass-strong rounded-3xl p-3 shadow-[0_40px_80px_-30px_oklch(0.45_0.15_255_/_0.35)]">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="ml-2 text-[11px] font-medium text-muted-foreground">orbit.ai / command-center · Jagannath Puri</div>
              <div className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <HeatmapCanvas />
              <div className="absolute left-3 top-3 space-y-2">
                <MiniPill label="Current Crowd" value="48,204" tone="blue" />
                <MiniPill label="Risk Score" value="72 / High" tone="orange" />
              </div>
              <div className="absolute right-3 top-3 space-y-2">
                <MiniPill label="Cameras" value="126 online" tone="green" />
                <MiniPill label="FPS" value="29.8" tone="blue" />
              </div>
              <div className="absolute inset-x-3 bottom-3 flex gap-2">
                <div className="glass rounded-xl px-3 py-2 text-white">
                  <div className="text-[10px] uppercase tracking-wider opacity-80">Prediction · 30 min</div>
                  <div className="text-sm font-bold">+18.4% crowd surge → Grand Road</div>
                </div>
              </div>
            </div>
          </div>
          <motion.img
            src={cctvImg}
            alt=""
            className="absolute -bottom-8 -left-10 hidden md:block h-40 w-56 rounded-2xl object-cover shadow-2xl ring-4 ring-white"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.img
            src={droneImg}
            alt=""
            className="absolute -top-8 -right-6 hidden md:block h-36 w-52 rounded-2xl object-cover shadow-2xl ring-4 ring-white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function MiniPill({ label, value, tone }: { label: string; value: string; tone: "blue" | "green" | "orange" }) {
  const toneMap = {
    blue: "bg-blue-500/20 text-blue-100 border-blue-300/30",
    green: "bg-emerald-500/20 text-emerald-50 border-emerald-300/30",
    orange: "bg-orange-500/25 text-orange-50 border-orange-300/40",
  };
  return (
    <div className={cn("rounded-lg border px-2.5 py-1.5 text-white backdrop-blur-sm", toneMap[tone])}>
      <div className="text-[9px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="text-[12px] font-bold">{value}</div>
    </div>
  );
}

function LogoStrip() {
  const items = ["Smart Cities", "Metro Rail", "Airports", "Stadiums", "Religious Events", "Police HQ", "Military Ops"];
  return (
    <section className="border-y border-border/60 bg-gradient-to-r from-primary/[0.03] via-transparent to-accent/[0.03]">
      <div className="mx-auto flex w-[min(1200px,92%)] flex-wrap items-center justify-between gap-x-8 gap-y-3 py-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">Deployed by</span>
        {items.map((i) => <span key={i} className="hover:text-foreground transition">{i}</span>)}
      </div>
    </section>
  );
}

function Overview() {
  const cards = [
    { icon: Radar, title: "AI Vision", desc: "Multi-camera computer vision detecting density, flow and anomalies in real-time." },
    { icon: Cpu, title: "Predictive Engine", desc: "Time-series and transformer models forecast surges 15–120 minutes ahead." },
    { icon: ShieldAlert, title: "Risk & Response", desc: "Continuous scoring, incident timelines and one-tap team deployment." },
    { icon: Layers, title: "Resource Optimization", desc: "Reallocate volunteers, gates and vehicles based on live density signals." },
    { icon: MapPin, title: "Unified GIS", desc: "Every camera, zone and route on one live geospatial canvas." },
    { icon: Sparkles, title: "Gemini AI Copilot", desc: "Natural-language insights and recommended actions for operators." },
  ];
  return (
    <section className="mx-auto w-[min(1200px,92%)] py-24">
      <SectionHeader
        eyebrow="Platform Overview"
        title="One control center for every crowd event."
        subtitle="From live monitoring to prediction, risk, emergency response and post-event analytics — Orbit.AI unifies the entire operations stack in a single pane of glass."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass-strong relative overflow-hidden rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_oklch(0.5_0.15_255_/_0.35)] transition"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ModulesGrid() {
  return (
    <section className="relative py-24">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeader
          eyebrow="7 Integrated Modules"
          title="Every capability you need — pre-integrated."
          subtitle="Deploy one module or run the entire suite. Everything shares the same event bus, GIS layer and Gemini AI recommendation engine."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to={"/modules/$slug" as any}
                  params={{ slug: m.slug } as any}
                  className="group block glass-strong relative overflow-hidden rounded-2xl p-6 hover:-translate-y-1 transition"
                >
                  <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", m.accent)} />
                  <div className="flex items-start justify-between">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", m.accent)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Module 0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{m.short}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Open Module <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LiveMapPreview() {
  return (
    <section className="mx-auto w-[min(1200px,92%)] py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Feature Showcase"
            title="A GIS heatmap built for control rooms."
            subtitle="Every zone, every camera, every crowd flow — animated, color-coded and always live. Zoom into Jagannath Puri and watch density shift in real-time."
          />
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Animated density layers with green / yellow / orange / red risk bands",
              "Live moving markers for volunteers, vehicles and drones",
              "Zone boundaries with dynamic risk scores",
              "Auto-focus on emergencies with map flash animations",
            ].map((f) => (
              <li key={f} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
              </li>
            ))}
          </ul>
          <Link
            to={"/modules/$slug" as any}
            params={{ slug: "heatmap" } as any}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Open Live Heatmap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="glass-strong rounded-3xl p-3">
          <div className="aspect-[16/11] overflow-hidden rounded-2xl">
            <HeatmapCanvas />
          </div>
        </div>
      </div>

      {/* Feature imagery strip */}
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          { img: dashImg, title: "Analytics Wall", desc: "Board-ready KPIs, always live." },
          { img: emergencyImg, title: "Emergency Ops", desc: "Deploy teams in one tap." },
          { img: crowdImg, title: "Crowd Intelligence", desc: "Dense-crowd computer vision." },
        ].map((c) => (
          <div key={c.title} className="group relative overflow-hidden rounded-2xl">
            <img src={c.img} alt={c.title} loading="lazy" className="h-64 w-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="text-lg font-bold">{c.title}</div>
              <div className="text-xs opacity-80">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  const steps = [
    { n: "01", t: "Ingest", d: "CCTV, drones, IoT sensors, ticket gates and mobile signals stream into Orbit.AI." },
    { n: "02", t: "Understand", d: "Computer vision + transformers extract density, flow and anomalies per zone." },
    { n: "03", t: "Predict", d: "Forecast crowd, risk and resource demand 15–120 minutes ahead." },
    { n: "04", t: "Recommend", d: "Gemini AI proposes actions — open gates, redirect flow, deploy teams." },
    { n: "05", t: "Act", d: "Operators execute in one tap; every decision is logged for audit and learning." },
  ];
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeader
          eyebrow="System Workflow"
          title="From raw pixels to recommended actions."
          subtitle="A closed-loop AI operations pipeline designed with public-safety veterans and smart-city architects."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong relative rounded-2xl p-5"
            >
              <div className="text-3xl font-black text-gradient">{s.n}</div>
              <div className="mt-2 text-base font-bold">{s.t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const items = [
    { icon: Building2, t: "Smart Cities" },
    { icon: TrainFront, t: "Metro & Rail" },
    { icon: Plane, t: "Airports" },
    { icon: Trophy, t: "Stadiums" },
    { icon: Church, t: "Religious Events" },
    { icon: Landmark, t: "Public Safety" },
    { icon: Cctv, t: "Transit Hubs" },
    { icon: Zap, t: "Emergency Ops" },
  ];
  return (
    <section className="mx-auto w-[min(1200px,92%)] py-24">
      <SectionHeader
        eyebrow="Industries Served"
        title="Built for the world's most demanding operations."
        subtitle="Every deployment is tuned for the specific geometry, culture and safety protocol of the venue."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((i) => {
          const Icon = i.icon;
          return (
            <div key={i.t} className="group glass-strong flex items-center gap-3 rounded-xl p-4 hover:bg-primary/5 transition">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 text-primary group-hover:from-primary group-hover:to-primary-glow group-hover:text-white transition">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold">{i.t}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="mx-auto w-[min(1200px,92%)] py-24">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <div className="relative">
          <img src={heroImg} alt="Command center" loading="lazy" className="rounded-3xl shadow-2xl" />
          <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-4 max-w-[220px]">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Response Time</div>
            <div className="mt-1 text-3xl font-bold text-gradient"><CountUp end={68} duration={2} />%</div>
            <div className="text-xs text-muted-foreground">faster incident resolution</div>
          </div>
        </div>
        <div>
          <SectionHeader
            align="left"
            eyebrow="Measurable Impact"
            title="Reduce risk. Accelerate response. Scale operations."
          />
          <div className="mt-6 space-y-4">
            {[
              { k: "Detection Latency", v: "< 1.2s", d: "From event to alert, end-to-end." },
              { k: "Prediction Horizon", v: "120 min", d: "Rolling forecast of crowd & risk." },
              { k: "Uptime SLA", v: "99.98%", d: "Multi-region, HA architecture." },
              { k: "Data Sovereignty", v: "On-prem / VPC", d: "Deploy in your data center or ours." },
            ].map((b) => (
              <div key={b.k} className="glass-strong flex items-center justify-between rounded-xl p-4">
                <div>
                  <div className="text-sm font-semibold">{b.k}</div>
                  <div className="text-xs text-muted-foreground">{b.d}</div>
                </div>
                <div className="text-xl font-bold text-gradient">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto w-[min(1200px,92%)] pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-glow to-accent p-10 md:p-14 text-primary-foreground shadow-[0_40px_100px_-30px_oklch(0.5_0.19_255_/_0.6)]">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest opacity-80">Ready when you are</div>
            <h2 className="mt-2 max-w-2xl text-3xl md:text-4xl font-bold leading-tight">
              See Orbit.AI running on your city, event or transit hub.
            </h2>
            <p className="mt-3 max-w-xl opacity-85">
              Live pilots typically deploy in under 3 weeks with your existing cameras and network.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg hover:-translate-y-0.5 transition">
              Request Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={"/modules/$slug" as any} params={{ slug: "command" } as any} className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white/20 transition">
              Open Live Console
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
