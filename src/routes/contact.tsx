import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Orbit.AI" },
      { name: "description", content: "Request a demo or talk to our public-safety solutions team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <motion.section
        className="mx-auto grid w-[min(1200px,92%)] gap-10 py-20 lg:grid-cols-[1.1fr_1fr]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Talk to us
          </div>
          <h1 className="mt-5 text-5xl font-bold tracking-tight text-black">
            Book a <span className="text-black">live demo</span> on your venue.
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Send us a note and our public-safety solutions team will respond within one business day
            with a tailored walkthrough on your camera network.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            {[
              { i: Mail, l: "hello@orbit.services" },
              { i: Phone, l: "+91 · 80 · 4718 · 2200" },
              { i: MapPin, l: "Bangalore · Singapore · Dubai" },
            ].map((c) => {
              const Icon = c.i;
              return (
                <div key={c.l} className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{c.l}</span>
                </div>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="glass-strong rounded-3xl p-6 md:p-8"
        >
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent-foreground">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="mt-4 text-xl font-bold">Thanks — we'll be in touch.</div>
              <p className="mt-1 text-sm text-muted-foreground">Our team will reply within one business day.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Field label="Full name" placeholder="Priya Sharma" />
              <Field label="Work email" type="email" placeholder="priya@city.gov" />
              <Field label="Organization" placeholder="Bhubaneswar Smart City" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Use case</label>
                <select className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>Smart City · Public Safety</option>
                  <option>Airport / Transit Hub</option>
                  <option>Stadium / Live Event</option>
                  <option>Religious Gathering</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea rows={4} placeholder="Tell us about your venue, camera count and goals…" className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:-translate-y-0.5 transition">
                Request Demo <Send className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>
      </motion.section>
    </PageShell>
  );
}

function Field({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input {...p} className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
    </div>
  );
}