import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showIcon?: boolean;
  showStatus?: boolean;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({
  className,
  showIcon = false,
  showStatus = true,
  showSubtitle = false,
  size = "md",
}: BrandLogoProps) {
  const iconSizes = {
    sm: "size-7 text-xs",
    md: "size-9 text-sm",
    lg: "size-11 text-base",
  };

  return (
    <div className={cn("group flex items-center gap-2.5 select-none", className)}>
      {/* Optional Monogram Emblem */}
      {showIcon && (
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-gradient-to-br from-primary/20 via-background to-surface-2 shadow-[0_0_15px_var(--glow)] transition-all duration-300 group-hover:scale-105 group-hover:border-primary",
            iconSizes[size],
          )}
        >
          <span className="font-display font-bold tracking-tight text-primary-bright drop-shadow-sm">
            SP
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full border border-border bg-background text-[8px] text-amber-400">
            ⚡
          </span>
        </div>
      )}

      {/* Name and Optional Role */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-display text-base font-bold tracking-[0.18em] uppercase text-foreground transition-colors group-hover:text-primary-bright sm:text-lg">
            Shahad<span className="text-primary animate-pulse">.</span>Pathan
          </span>

          {/* Live Status Radar Beacon */}
          {showStatus && (
            <span
              title="Status: Available for Internships & Projects"
              className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 sm:inline-flex"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              <span>Available</span>
            </span>
          )}
        </div>

        {showSubtitle && (
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground transition-colors group-hover:text-muted-foreground/90">
            Computer Engineer • AI &amp; Software
          </span>
        )}
      </div>
    </div>
  );
}
