import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface InitialLoaderProps {
  onComplete?: () => void;
}

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reduced = useReducedMotion();
  const hasFinishedRef = useRef(false);

  const statusMessages = [
    "INITIALIZING SYSTEM KERNEL...",
    "CALIBRATING AI MODELS & AGENTS...",
    "SYNCHRONIZING GTU '28 PORTFOLIO...",
    "OPTIMIZING HARDWARE ACCELERATION...",
    "SYSTEM VERIFIED • ACCESS GRANTED",
  ];

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setProgress(100);
    setStatusIndex(statusMessages.length - 1);
    setIsExiting(true);

    // Allow hardware-accelerated shutters to slide open smoothly
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
      if (typeof document !== "undefined") {
        document.body.style.removeProperty("overflow");
      }
    }, 650);
  }, [onComplete, statusMessages.length]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
      document.body.style.overflow = "hidden";
    }

    if (reduced) {
      handleFinish();
      return;
    }

    // Keyboard listener for instant skip (Escape, Space, or Enter)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // High-performance timer based on performance.now()
    const startTime = performance.now();
    // Shorter, snappier duration on mobile (1.45s) vs desktop (1.75s) to guarantee zero perception of lag
    const duration = window.innerWidth < 768 ? 1450 : 1750;

    let animFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);

      // Nonlinear cubic-out easing with realistic cadence
      let easedProgress: number;
      if (rawRatio < 0.4) {
        easedProgress = (rawRatio / 0.4) * 48;
      } else if (rawRatio < 0.75) {
        easedProgress = 48 + ((rawRatio - 0.4) / 0.35) * 38;
      } else {
        easedProgress = 86 + ((rawRatio - 0.75) / 0.25) * 14;
      }

      const currentInt = Math.min(Math.round(easedProgress), 100);
      setProgress(currentInt);

      // Map progress to phase descriptions
      if (currentInt < 25) setStatusIndex(0);
      else if (currentInt < 55) setStatusIndex(1);
      else if (currentInt < 80) setStatusIndex(2);
      else if (currentInt < 98) setStatusIndex(3);
      else setStatusIndex(4);

      if (rawRatio < 1 && !hasFinishedRef.current) {
        animFrameId = requestAnimationFrame(tick);
      } else if (!hasFinishedRef.current) {
        handleFinish();
      }
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      if (typeof document !== "undefined") {
        document.body.style.removeProperty("overflow");
      }
    };
  }, [reduced, handleFinish]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-label="System Initializing"
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden select-none bg-[#050507]"
        style={{
          touchAction: "none",
        }}
      >
        {/* ========================================================================= */}
        {/* CINEMATIC SHUTTER 1: Top Half Curtain                                     */}
        {/* Uses pure transform3d for hardware compositor acceleration on all phones   */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: isExiting ? "-100%" : "0%" }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#060608] z-20 border-b border-primary/40 flex flex-col justify-end will-change-transform transform-gpu"
        >
          {/* Glowing bottom laser seam */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* ========================================================================= */}
        {/* CINEMATIC SHUTTER 2: Bottom Half Curtain                                  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: isExiting ? "100%" : "0%" }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060608] z-20 border-t border-primary/40 flex flex-col justify-start will-change-transform transform-gpu"
        >
          {/* Glowing top laser seam */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN FOREGROUND ANIMATED CONTENT STAGE                                    */}
        {/* No heavy CSS blur filters to ensure 60+ FPS on budget devices              */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 1.05 : 1,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative z-30 flex size-full flex-col items-center justify-between p-4 sm:p-8 md:p-10 pointer-events-auto will-change-transform transform-gpu"
        >
          {/* Lightweight Radial Ambient Background Lighting (Zero CSS Blur Filter) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            {/* Primary Orange Gradient Core */}
            <div
              className="size-[280px] sm:size-[460px] rounded-full opacity-80"
              style={{
                background: "radial-gradient(circle, rgba(255, 107, 0, 0.16) 0%, transparent 70%)",
              }}
            />
            {/* Secondary Cyan Glow */}
            <div
              className="absolute size-[220px] sm:size-[360px] rounded-full opacity-70"
              style={{
                background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
              }}
            />

            {/* High-Tech Isometric Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ff6b00 1px, transparent 0)`,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* ======================================================================= */}
          {/* TOP TELEMETRY BAR: Responsive Header & Skip Button                      */}
          {/* ======================================================================= */}
          <header className="relative z-10 flex w-full max-w-4xl items-center justify-between pt-1">
            {/* System Node Identity */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="relative flex size-2 sm:size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 sm:size-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="font-mono text-[10px] sm:text-xs tracking-wider text-muted-foreground">
                <span className="text-foreground font-bold">SHAHAD.OS</span>
                <span className="hidden xs:inline text-muted-foreground/70"> // KERNEL v2.8</span>
              </div>
            </div>

            {/* Middle Status (Hidden on small mobile for clean responsiveness) */}
            <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-muted-foreground/80">
              <span>NODE: GTU_GSET</span>
              <span>•</span>
              <span className="text-primary-bright">AI_CORE: ONLINE</span>
            </div>

            {/* Interactive Skip Button */}
            <button
              type="button"
              onClick={handleFinish}
              className="group flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground backdrop-blur-md transition-all hover:border-primary/50 hover:bg-white/10 hover:text-foreground active:scale-95"
            >
              <span>SKIP</span>
              <span className="rounded bg-white/10 px-1 py-0.2 text-[8px] sm:text-[9px] font-semibold text-muted-foreground group-hover:text-primary-bright">
                ESC
              </span>
            </button>
          </header>

          {/* ======================================================================= */}
          {/* CENTER QUANTUM APERTURE & RESPONSIVE "SP" MONOGRAM                      */}
          {/* Scaled for both ultra-compact phones and desktop monitors               */}
          {/* ======================================================================= */}
          <main className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-2">
            {/* Holographic Rotating Rings Container */}
            <div className="relative flex size-32 xs:size-40 sm:size-48 md:size-52 items-center justify-center">
              {/* Outer Clockwise HUD Ring (Optimized transform-gpu) */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: isMobile ? 22 : 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 size-full will-change-transform transform-gpu"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white/10"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="url(#orangeCyanGradMobile)"
                  strokeWidth="2.5"
                  strokeDasharray="40 18 8 18 90 25"
                  strokeLinecap="round"
                />
                {/* Coordinates tick marks */}
                <line x1="100" y1="2" x2="100" y2="10" stroke="#ff6b00" strokeWidth="2" />
                <line x1="198" y1="100" x2="190" y2="100" stroke="#ff6b00" strokeWidth="2" />
                <line x1="100" y1="198" x2="100" y2="190" stroke="#ff6b00" strokeWidth="2" />
                <line x1="2" y1="100" x2="10" y2="100" stroke="#ff6b00" strokeWidth="2" />

                <defs>
                  <linearGradient id="orangeCyanGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b00" />
                    <stop offset="60%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Inner Counter-Clockwise Ring */}
              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ duration: isMobile ? 16 : 12, repeat: Infinity, ease: "linear" }}
                className="absolute size-24 xs:size-30 sm:size-36 will-change-transform transform-gpu"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="10 10"
                  className="text-primary/30"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="#ff6b00"
                  strokeWidth="1.8"
                  strokeDasharray="28 130"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Center Cyber Shield Badge */}
              <div className="relative flex size-16 xs:size-18 sm:size-22 items-center justify-center rounded-2xl border border-primary/50 bg-[#0c0c10]/95 shadow-[0_0_25px_rgba(255,107,0,0.3)]">
                {/* Responsive "SP" Monogram SVG */}
                <svg
                  className="size-8 xs:size-10 sm:size-12 text-primary-bright"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Letter S */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    d="M 46 28 L 26 28 C 21 28 18 32 18 38 L 18 42 C 18 48 22 52 28 52 L 36 52 C 42 52 46 56 46 62 L 46 66 C 46 72 43 76 38 76 L 16 76"
                    stroke="url(#spGradMobile)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Letter P */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 0.15, ease: "easeInOut" }}
                    d="M 58 76 L 58 28 L 74 28 C 82 28 86 33 86 42 C 86 51 82 56 74 56 L 58 56"
                    stroke="url(#spGradMobile)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="spGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#ff6b00" />
                      <stop offset="100%" stopColor="#ff9e3b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Corner Accents */}
                <span className="absolute -top-1 -left-1 size-1.5 border-t-2 border-l-2 border-primary" />
                <span className="absolute -top-1 -right-1 size-1.5 border-t-2 border-r-2 border-primary" />
                <span className="absolute -bottom-1 -left-1 size-1.5 border-b-2 border-l-2 border-primary" />
                <span className="absolute -bottom-1 -right-1 size-1.5 border-b-2 border-r-2 border-primary" />
              </div>
            </div>

            {/* Kinetic Typography: Sized dynamically for mobile screens */}
            <div className="mt-5 sm:mt-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold text-primary-bright uppercase tracking-[0.2em]">
                <span>PORTFOLIO SYSTEM</span>
                <span className="size-1 rounded-full bg-primary" />
                <span>GTU &apos;28</span>
              </div>

              <h1 className="mt-2.5 sm:mt-3 font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                Shahad{" "}
                <span className="bg-gradient-to-r from-primary via-amber-300 to-primary-bright bg-clip-text text-transparent">
                  Pathan
                </span>
                <span className="text-primary">.</span>
              </h1>

              <p className="mt-1.5 font-mono text-[11px] sm:text-xs md:text-sm text-muted-foreground tracking-normal sm:tracking-wide max-w-sm sm:max-w-none">
                Computer Engineer • AI &amp; Data Science • Full-Stack Systems
              </p>
            </div>
          </main>

          {/* ======================================================================= */}
          {/* BOTTOM TELEMETRY DOCK: Progress Bar & Phase Description                 */}
          {/* ======================================================================= */}
          <footer className="relative z-10 flex w-full max-w-sm sm:max-w-md flex-col items-center gap-2 sm:gap-2.5 pb-1">
            {/* Live Changing Phase Label */}
            <div className="flex w-full items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground truncate mr-2 min-w-0">
                <span className="size-1.5 shrink-0 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] sm:text-[11px] tracking-wider uppercase truncate">
                  {statusMessages[statusIndex]}
                </span>
              </div>
              <span className="font-bold text-primary-bright font-mono tabular-nums text-xs sm:text-sm shrink-0">
                {progress.toString().padStart(2, "0")}%
              </span>
            </div>

            {/* Neon Glowing Progress Track */}
            <div className="relative h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-amber-400 to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,107,0,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Micro Coordinates Footer */}
            <div className="flex w-full items-center justify-between font-mono text-[9px] sm:text-[10px] text-muted-foreground/60 pt-0.5">
              <span>SEC_HASH: 0x99130</span>
              <span className="hidden xs:inline">AHMEDABAD, IN</span>
              <span>STATUS: BOOTING</span>
            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
