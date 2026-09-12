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
  const reduced = useReducedMotion();
  const hasFinishedRef = useRef(false);

  const statusMessages = [
    "INITIALIZING NEURAL KERNEL & CORE AST...",
    "CALIBRATING AI MODELS & AGENT PIPELINES...",
    "SYNCHRONIZING GTU '28 PORTFOLIO REPOSITORY...",
    "OPTIMIZING HARDWARE-ACCELERATED 3D ENGINE...",
    "SYSTEM TELEMETRY VERIFIED • ACCESS GRANTED",
  ];

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setProgress(100);
    setStatusIndex(statusMessages.length - 1);
    setIsExiting(true);

    // Allow cinematic shutters to slide open before unmounting
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
      document.body.style.removeProperty("overflow");
    }, 750);
  }, [onComplete, statusMessages.length]);

  useEffect(() => {
    // Lock body scroll during boot sequence
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    if (reduced) {
      handleFinish();
      return;
    }

    // Keyboard listener for instant skip (Escape or Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // High-precision smooth non-linear boot counter
    const startTime = performance.now();
    const duration = 1850; // Snappy yet deeply cinematic 1.85s boot sequence

    let animFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);

      // Nonlinear cubic-out easing with realistic micro-pauses
      let easedProgress: number;
      if (rawRatio < 0.4) {
        // Fast burst
        easedProgress = (rawRatio / 0.4) * 45;
      } else if (rawRatio < 0.75) {
        // Steady compilation
        easedProgress = 45 + ((rawRatio - 0.4) / 0.35) * 40;
      } else {
        // Final acceleration to 100
        easedProgress = 85 + ((rawRatio - 0.75) / 0.25) * 15;
      }

      const currentInt = Math.min(Math.round(easedProgress), 100);
      setProgress(currentInt);

      // Map progress to status phases
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
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden select-none"
      >
        {/* ========================================================================= */}
        {/* CINEMATIC SHUTTER 1: Top Half Curtain                                     */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: isExiting ? "-100%" : "0%" }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1], // Luxurious cubic bezier wipe
          }}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#060608] z-20 border-b border-primary/40 shadow-[0_10px_40px_rgba(255,107,0,0.25)] flex flex-col justify-end"
        >
          {/* Glowing bottom laser seam */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#ff6b00]" />
        </motion.div>

        {/* ========================================================================= */}
        {/* CINEMATIC SHUTTER 2: Bottom Half Curtain                                  */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: isExiting ? "100%" : "0%" }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060608] z-20 border-t border-primary/40 shadow-[0_-10px_40px_rgba(255,107,0,0.25)] flex flex-col justify-start"
        >
          {/* Glowing top laser seam */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#ff6b00]" />
        </motion.div>

        {/* ========================================================================= */}
        {/* MAIN FOREGROUND ANIMATED CONTENT STAGE                                    */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 1.08 : 1,
            filter: isExiting ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-30 flex size-full flex-col items-center justify-between p-6 sm:p-10 pointer-events-auto"
        >
          {/* Subtle Ambient Background Lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            {/* Pulsing Orange Core */}
            <div className="size-[420px] sm:size-[560px] rounded-full bg-primary/18 blur-[120px] animate-pulse" />
            {/* Secondary Cyber Cyan Halo */}
            <div className="absolute size-[300px] sm:size-[400px] rounded-full bg-cyan-500/12 blur-[100px]" />

            {/* High-Tech Isometric Dot Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ff6b00 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* ======================================================================= */}
          {/* TOP TELEMETRY BAR: System Diagnostics & Skip Button                     */}
          {/* ======================================================================= */}
          <header className="relative z-10 flex w-full max-w-5xl items-center justify-between">
            {/* System Node Identity */}
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="font-mono text-[11px] sm:text-xs tracking-wider text-muted-foreground">
                <span className="text-foreground font-semibold">SHAHAD.OS</span>
                <span className="hidden sm:inline"> // KERNEL v2.8.4</span>
              </div>
            </div>

            {/* Middle Status (Desktop) */}
            <div className="hidden md:flex items-center gap-4 font-mono text-[11px] text-muted-foreground/80">
              <span>LATENCY: 14ms</span>
              <span>•</span>
              <span>NODE: GTU_GSET</span>
              <span>•</span>
              <span className="text-primary-bright">AI_CORE: ONLINE</span>
            </div>

            {/* Interactive Skip Button */}
            <button
              type="button"
              onClick={handleFinish}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur-md transition-all hover:border-primary/50 hover:bg-white/10 hover:text-foreground active:scale-95"
            >
              <span>SKIP INTRO</span>
              <span className="rounded bg-white/10 px-1 py-0.2 text-[9px] font-semibold text-muted-foreground group-hover:text-primary-bright">
                ESC
              </span>
            </button>
          </header>

          {/* ======================================================================= */}
          {/* CENTER QUANTUM APERTURE & STYLIZED "SP" MONOGRAM                        */}
          {/* ======================================================================= */}
          <main className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
            {/* The Holographic Rotating Rings Container */}
            <div className="relative flex size-44 sm:size-52 items-center justify-center">
              {/* Outer Clockwise Rotating Telemetry Ring */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 size-full"
                viewBox="0 0 200 200"
              >
                {/* Thin HUD track */}
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white/10"
                />
                {/* Glowing dash arcs */}
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="url(#orangeCyanGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="40 18 8 18 90 25"
                  strokeLinecap="round"
                />
                {/* Compass coordinate tick marks */}
                <line x1="100" y1="2" x2="100" y2="10" stroke="#ff6b00" strokeWidth="2" />
                <line x1="198" y1="100" x2="190" y2="100" stroke="#ff6b00" strokeWidth="2" />
                <line x1="100" y1="198" x2="100" y2="190" stroke="#ff6b00" strokeWidth="2" />
                <line x1="2" y1="100" x2="10" y2="100" stroke="#ff6b00" strokeWidth="2" />

                <defs>
                  <linearGradient id="orangeCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b00" />
                    <stop offset="60%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Inner Counter-Clockwise Neon Ring */}
              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute size-32 sm:size-36"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="12 12"
                  className="text-primary/30"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="#ff6b00"
                  strokeWidth="2"
                  strokeDasharray="30 140"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Center Cyber Diamond Badge */}
              <div className="relative flex size-20 sm:size-24 items-center justify-center rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/25 via-[#0b0b0f]/90 to-surface shadow-[0_0_35px_rgba(255,107,0,0.35)] backdrop-blur-xl">
                {/* Futuristic "SP" Monogram SVG */}
                <svg
                  className="size-11 sm:size-13 text-primary-bright"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Glowing letter S */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    d="M 46 28 L 26 28 C 21 28 18 32 18 38 L 18 42 C 18 48 22 52 28 52 L 36 52 C 42 52 46 56 46 62 L 46 66 C 46 72 43 76 38 76 L 16 76"
                    stroke="url(#spGradient)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Glowing letter P */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
                    d="M 58 76 L 58 28 L 74 28 C 82 28 86 33 86 42 C 86 51 82 56 74 56 L 58 56"
                    stroke="url(#spGradient)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="spGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#ff6b00" />
                      <stop offset="100%" stopColor="#ff9e3b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Pulsing micro corner indicators */}
                <span className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2 border-primary" />
                <span className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2 border-primary" />
                <span className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2 border-primary" />
                <span className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2 border-primary" />
              </div>
            </div>

            {/* Kinetic Typography: Name and Role */}
            <div className="mt-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-primary-bright uppercase tracking-[0.25em]">
                <span>PORTFOLIO SYSTEM</span>
                <span className="size-1 rounded-full bg-primary" />
                <span>GTU &apos;28</span>
              </div>

              <h1 className="mt-3.5 font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
                Shahad{" "}
                <span className="bg-gradient-to-r from-primary via-amber-300 to-primary-bright bg-clip-text text-transparent">
                  Pathan
                </span>
                <span className="text-primary">.</span>
              </h1>

              <p className="mt-2 font-mono text-xs sm:text-sm text-muted-foreground tracking-wide">
                Computer Engineer • AI &amp; Data Science • Full-Stack Systems
              </p>
            </div>
          </main>

          {/* ======================================================================= */}
          {/* BOTTOM TELEMETRY DOCK: Progress Bar, Percentage & Phase Description     */}
          {/* ======================================================================= */}
          <footer className="relative z-10 flex w-full max-w-md flex-col items-center gap-3">
            {/* Live Changing Phase Label */}
            <div className="flex w-full items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-muted-foreground truncate mr-2">
                <span className="size-1.5 rounded-full bg-primary animate-ping" />
                <span className="text-[11px] tracking-wider uppercase truncate">
                  {statusMessages[statusIndex]}
                </span>
              </div>
              <span className="font-bold text-primary-bright font-mono tabular-nums text-sm">
                {progress.toString().padStart(2, "0")}%
              </span>
            </div>

            {/* Neon Glowing Progress Track */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 p-0.5 backdrop-blur-md">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-amber-400 to-cyan-400 transition-all duration-100 ease-out shadow-[0_0_16px_rgba(255,107,0,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Micro Coordinates Footer */}
            <div className="flex w-full items-center justify-between font-mono text-[10px] text-muted-foreground/60">
              <span>SEC_HASH: 0x99130</span>
              <span>AHMEDABAD / MAHESANA, IN</span>
              <span>STATUS: BOOTING</span>
            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
