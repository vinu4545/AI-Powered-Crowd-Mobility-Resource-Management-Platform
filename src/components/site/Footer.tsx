import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { MODULES } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-b from-transparent to-primary/[0.03]">
      <div className="mx-auto grid w-[min(1200px,92%)] gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={logo.url} alt="" className="h-9 w-9 rounded-lg" />
            <div className="leading-tight">
              <div className="text-sm font-bold">Orbit<span className="text-primary">.AI</span></div>
              <div className="text-[11px] text-muted-foreground">by Orbit Services</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI-powered crowd, mobility & resource management platform for smart cities,
            transportation hubs, stadiums and public safety command centers.
          </p>
          <div className="mt-4 flex gap-2">
            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Modules</div>
          <ul className="mt-3 space-y-2 text-sm">
            {MODULES.slice(0, 5).map((m) => (
              <li key={m.slug}>
                <Link to={"/modules/$slug" as any} params={{ slug: m.slug } as any} className="text-muted-foreground hover:text-primary transition">
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li>Documentation</li>
            <li>Security</li>
            <li>Status</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex w-[min(1200px,92%)] flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Orbit Services · All rights reserved.</div>
          <div>Built for Smart Cities, Transit, Stadiums & Public Safety.</div>
        </div>
      </div>
    </footer>
  );
}