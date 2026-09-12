import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulseVal: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if running on low-power or mobile device
    const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // On mobile devices, disable canvas animation entirely to ensure 60+ FPS buttery smooth scrolling
    // The CSS radial gradients provide a gorgeous, zero-cost ambient aesthetic!
    if (isMobile || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = -1000;
    let mouseY = -1000;
    let isPageVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    // Spawn modest, lightweight particle count
    const count = Math.min(28, Math.floor((width * height) / 45000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.8,
        baseAlpha: Math.random() * 0.18 + 0.08,
        alpha: 0.12,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();
    const maxDistanceSq = 100 * 100; // Squared distance: avoids expensive Math.sqrt() in loop

    const render = (now: number) => {
      if (!isPageVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min(32, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains("light");
      const dotColor = isLight ? "255, 107, 0" : "255, 138, 31";
      const lineColor = isLight ? "200, 100, 20" : "255, 120, 30";

      // Lightweight connection lines
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        if (!pi) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          if (!pj) continue;

          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const lineAlpha = (1 - distSq / maxDistanceSq) * 0.05;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        p.x += p.vx * (delta / 16);
        p.y += p.vy * (delta / 16);

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Pulsing opacity
        p.pulseVal += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.06;

        // Subtle cursor interaction
        const cdx = p.x - mouseX;
        const cdy = p.y - mouseY;
        const cdistSq = cdx * cdx + cdy * cdy;
        if (cdistSq < 10000 && cdistSq > 0) {
          const cdist = Math.sqrt(cdistSq);
          const force = (1 - cdist / 100) * 0.8;
          p.x += (cdx / cdist) * force;
          p.y += (cdy / cdist) * force;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${Math.max(0.04, p.alpha)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden select-none"
    >
      {/* 1. Subtle Radial Ambient Lighting Aura Top-Right (No expensive CSS blur filters) */}
      <div
        className="absolute -top-40 -right-40 size-[480px] rounded-full opacity-60 dark:opacity-80"
        style={{
          background: "radial-gradient(circle, oklch(0.672 0.221 42.5 / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* 2. Soft Ambient Lighting Aura Bottom-Left */}
      <div
        className="absolute -bottom-40 -left-40 size-[520px] rounded-full opacity-50 dark:opacity-70"
        style={{
          background: "radial-gradient(circle, oklch(0.672 0.221 42.5 / 0.09) 0%, transparent 70%)",
        }}
      />

      {/* 3. Central Canvas: Rendered strictly on desktop; cost-free on mobile */}
      <canvas
        ref={canvasRef}
        className="hidden md:block size-full opacity-70 transition-opacity duration-500 will-change-transform"
      />
    </div>
  );
}
