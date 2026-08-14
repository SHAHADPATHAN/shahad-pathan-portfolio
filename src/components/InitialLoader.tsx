import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function InitialLoader({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem("portfolio_loaded");
      if (alreadyLoaded || reduced) {
        setVisible(false);
        onComplete?.();
        return;
      }
      setVisible(true);
    }

    const start = performance.now();
    const duration = 1100; // Fast and snappy 1.1s boot

    const frame = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        sessionStorage.setItem("portfolio_loaded", "true");
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 250);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [reduced, onComplete]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: "easeOut" },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707] text-white select-none"
        >
          {/* Subtle GPU-accelerated glow */}
          <div
            aria-hidden="true"
            className="absolute size-72 rounded-full bg-primary/15 blur-3xl transform-gpu pointer-events-none"
          />

          {/* Center Brand Block */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary-bright" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-orange-400 uppercase">
                {progress < 40
                  ? "INITIALIZING SYSTEM..."
                  : progress < 85
                    ? "LOADING AI & DATA MODULES..."
                    : "PORTFOLIO READY"}
              </span>
            </div>

            {/* Name Reveal */}
            <h1 className="mt-5 font-display text-4xl font-black tracking-tight sm:text-6xl">
              Shahad <span className="text-gradient-warm">Pathan</span>
              <span className="text-primary">.</span>
            </h1>

            {/* Role / Tagline */}
            <p className="mt-2 font-mono text-xs text-muted-foreground sm:text-sm">
              Computer Engineer • AI &amp; Data Science • GTU &apos;28
            </p>

            {/* Fast Glowing Progress Bar */}
            <div className="mt-7 w-60 max-w-xs sm:w-72">
              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span className="tracking-widest uppercase">BOOT SEQUENCE</span>
                <span className="font-semibold text-primary-bright">{progress}%</span>
              </div>
              <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary-bright to-amber-400 transition-[width] duration-75 ease-out shadow-[0_0_12px_var(--glow)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
