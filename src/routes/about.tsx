import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { motion } from "framer-motion";
import { Building2, Rocket, Users, Shield, Target, Award } from "lucide-react";
import heroImg from "@/assets/hero-command.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Orbit.AI Command Platform" },
      { name: "description", content: "About Orbit Services — the team building the AI command platform for crowd, mobility & resource intelligence." },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    { icon: Shield, t: "Safety First", d: "Every model, dashboard and workflow is designed with public-safety veterans." },
    { icon: Target, t: "Operator Obsessed", d: "Built for real control-room shift patterns, not marketing screenshots." },
    { icon: Rocket, t: "Deploy in Weeks", d: "Rapid pilots on existing camera and network infrastructure." },
    { icon: Users, t: "Human-in-the-Loop", d: "AI recommends; trained operators decide. Always." },
    { icon: Building2, t: "Sovereignty", d: "Data stays where it must — on-prem, VPC or hybrid." },
    { icon: Award, t: "Compliance Ready", d: "Aligned with ISO 27001, SOC2 and public-safety standards." },
  ];
  return (
    <PageShell>
      <motion.section
        className="relative overflow-hidden py-24"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="mx-auto w-[min(1000px,92%)] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
            About Orbit Services
          </div>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-black">
            We build software for <span className="text-black">the world's command rooms.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Orbit.AI unifies live monitoring, prediction, risk and emergency response into a single
            operating system for cities, transit and large events. Trusted by public safety, transit
            operators and religious authorities managing millions of people.
          </p>
        </div>

        <div className="mx-auto mt-14 w-[min(1200px,92%)]">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            src={heroImg}
            alt="Command center"
            loading="lazy"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </motion.section>

      <section className="mx-auto w-[min(1200px,92%)] py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.t} className="glass-strong rounded-2xl p-6 hover:-translate-y-1 transition">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-lg font-bold">{v.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{v.d}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92%)] py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { k: "12M+", l: "People monitored" },
            { k: "40+", l: "Live deployments" },
            { k: "99.98%", l: "Uptime SLA" },
            { k: "24 / 7", l: "Global support" },
          ].map((s) => (
            <div key={s.l} className="glass-strong rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}