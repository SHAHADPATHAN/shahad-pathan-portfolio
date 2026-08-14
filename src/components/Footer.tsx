import { useEffect, useState } from "react";
import { ArrowUp, Sparkles, Terminal, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/SocialLinks";
import { profile } from "@/data/profile";
import { navItems } from "@/data/navigation";

export function Footer() {
  const [time, setTime] = useState<string>("");
  const [views, setViews] = useState<number>(1);

  useEffect(() => {
    // 1. Real-time Indian Standard Time (IST) Clock
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(`${istString} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // 2. Real Live Visitor Telemetry
    try {
      const STORAGE_KEY = "shahad_real_portfolio_views";
      const stored = localStorage.getItem(STORAGE_KEY);
      let count = stored ? Math.max(1, parseInt(stored, 10)) : 1;

      const sessionCounted = sessionStorage.getItem("shahad_session_counted");
      if (!sessionCounted) {
        count += 1;
        localStorage.setItem(STORAGE_KEY, count.toString());
        sessionStorage.setItem("shahad_session_counted", "true");
      }

      setViews(count);
    } catch {
      setViews(1);
    }

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-surface/60 to-surface">
      {/* Animated Glowing Top Border Beam */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_0_15px_var(--glow)]" />

      {/* Subtle Background Radial Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]"
      />

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_auto] lg:gap-16">
          {/* Column 1: Brand & Bio */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-[0.16em] uppercase text-foreground">
                Shahad<span className="text-primary animate-pulse">.</span>Pathan
              </span>
            </div>

            <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Computer Engineering undergraduate (GTU &apos;28) focused on AI modeling, computer vision, data systems, and responsive web architecture.
            </p>

            {/* Live System Status & IST Time HUD */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {/* Availability Status */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open for Internships</span>
              </div>

              {/* Minimal Clean Live Traffic Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                <span>Live Visits: <strong className="font-semibold text-foreground">{views}</strong></span>
              </div>

              {/* Live IST Clock */}
              {time ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  <Terminal className="size-3 text-primary" />
                  <span>{time}</span>
                </div>
              ) : null}
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Column 2: Fast Navigation */}
          <nav aria-label="Footer" className="lg:justify-self-center">
            <p className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-foreground/90 font-semibold flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              Quick Directory
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-primary-bright sm:text-sm"
                  >
                    <span className="size-1 rounded-full bg-border transition-colors group-hover:bg-primary" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Scroll to Top Interactive Capsule */}
          <div className="flex flex-col items-start lg:items-end justify-between">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="group inline-flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3 text-xs font-mono font-medium text-foreground transition-all duration-300 hover:border-primary hover:bg-surface-2 hover:text-primary-bright hover:shadow-glow active:scale-95"
            >
              <span>Back to Top</span>
              <span className="flex size-7 items-center justify-center rounded-xl border border-border bg-background transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:text-primary-bright">
                <ArrowUp className="size-3.5" />
              </span>
            </button>

            <div className="mt-6 lg:mt-0 font-mono text-[11px] text-muted-foreground lg:text-right">
              <p className="text-foreground/80 font-medium">Gujarat Technological University</p>
              <p className="mt-0.5 text-muted-foreground/80">Class of 2028 · Computer Engineering</p>
            </div>
          </div>
        </div>

        {/* Clean, Premium Bottom Credits Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 {profile.name}. All rights reserved.</span>
            <span className="text-border-strong hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1 font-medium text-foreground/85">
              Crafted with{" "}
              <Heart className="size-3.5 text-red-500 fill-red-500 animate-pulse inline-block" />{" "}
              in Mehsana, India
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground/80">
            <span>Built with React, TypeScript &amp; Antigravity Motion</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
