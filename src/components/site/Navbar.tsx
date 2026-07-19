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
      <div className="glass-strong mx-auto mt-3 flex w-[min(1200px,95%)] items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_10px_40px_-20px_oklch(0.55_0.19_255_/_0.25)]">
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
          >
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-foreground/80 hover:text-foreground hover:bg-primary/5 transition">
              Modules <ChevronDown className={cn("h-3.5 w-3.5 transition", openModules && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openModules && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                >
                  <div className="glass-strong w-[640px] rounded-2xl p-3 shadow-[0_30px_80px_-30px_oklch(0.4_0.15_255_/_0.4)]">
                    <div className="grid grid-cols-2 gap-1.5">
                      {MODULES.map((m) => {
                        const Icon = m.icon;
                        return (
                          <Link
                            key={m.slug}
                            to={"/modules/$slug" as any}
                            params={{ slug: m.slug } as any}
                            className="group flex gap-3 rounded-xl p-3 hover:bg-primary/5 transition"
                          >
                            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md", m.accent)}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1 text-[13px] font-semibold">
                                {m.title}
                                <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition" />
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-2">{m.short}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-2 text-[11px]">
                      <span className="text-muted-foreground">7 modules · unified in one control center</span>
                      <Link to={"/modules/$slug" as any} params={{ slug: "command" } as any} className="font-semibold text-primary hover:underline">Open Command Center →</Link>
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