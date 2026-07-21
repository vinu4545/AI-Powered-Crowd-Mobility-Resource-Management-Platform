import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { MODULES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [openModules, setOpenModules] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong mx-auto mt-3 flex w-[min(1200px,95%)] items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.25)] backdrop-blur-lg">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition" />
            <img src={logo.url} alt="Orbit Services" className="relative h-9 w-9 rounded-lg object-cover" />
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-tight">Orbit<span className="text-primary">.AI</span></div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">Command Platform</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <div
            className="relative"
            onMouseEnter={() => setOpenModules(true)}
            onMouseLeave={() => setOpenModules(false)}
            onFocus={() => setOpenModules(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setOpenModules(false);
              }
            }}
          >
            <button
              className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-foreground/80 hover:text-foreground hover:bg-primary/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-expanded={openModules}
              aria-controls="modules-menu"
            >
              Modules <ChevronDown className={cn("h-3.5 w-3.5 transition", openModules && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openModules && (
                <motion.div
                  id="modules-menu"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22 }}
                  className="absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3"
                >
                  <div className="w-[min(780px,92vw)] rounded-[28px] border border-slate-200/70 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)]">
                    <div className="grid gap-3 px-4 py-4 sm:grid-cols-2 sm:px-5 sm:py-5">
                      {MODULES.map((m) => (
                        <Link
                          key={m.slug}
                          to={"/modules/$slug" as any}
                          params={{ slug: m.slug } as any}
                          className="group flex gap-3 rounded-3xl border border-transparent bg-white px-4 py-4 transition hover:border-slate-200/80 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                        >
                          <ModuleIcon accent={m.accent} icon={m.icon} />
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-slate-950 leading-6">{m.title}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-500 truncate">{m.short}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-200/70 bg-slate-50 px-5 py-4 sm:px-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-semibold text-slate-700">Explore all AI-powered operational modules</p>
                        <Link
                          to={"/modules/$slug" as any}
                          params={{ slug: "command" } as any}
                          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                        >
                          Open Command Center →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavItem to="/contact">Contact</NavItem>
        </nav>

        <Link
          to={"/modules/$slug" as any}
          params={{ slug: "command" } as any}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
        >
          Launch Console <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

function ModuleIcon({ icon: Icon, accent }: { icon: React.ComponentType<{ className?: string }> ; accent: string }) {
  return (
    <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/50 bg-gradient-to-br p-0 text-white shadow-[0_10px_24px_-14px_rgba(15,23,42,0.35)] transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.04] group-hover:shadow-[0_14px_30px_-14px_rgba(15,23,42,0.35)]", accent)}>
      <Icon className="h-5.5 w-5.5 stroke-[1.8]" aria-hidden="true" />
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to as any}
      className="rounded-lg px-3 py-2 font-medium text-foreground/80 hover:text-foreground hover:bg-primary/5 transition"
      activeProps={{ className: "text-primary bg-primary/5" }}
    >
      {children}
    </Link>
  );
}