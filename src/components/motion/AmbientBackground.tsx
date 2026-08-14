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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = -1000;
    let mouseY = -1000;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Spawn balanced, delicate particles (not crowded, highly aesthetic)
    const count = Math.min(48, Math.floor((width * height) / 32000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 0.8,
        baseAlpha: Math.random() * 0.22 + 0.08,
        alpha: 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = Math.min(32, now - lastTime);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Check current theme for balanced contrast
      const isLight = document.documentElement.classList.contains("light");
      const dotColor = isLight ? "255, 107, 0" : "255, 138, 31";
      const lineColor = isLight ? "200, 100, 20" : "255, 120, 30";

      // Draw faint connective constellation lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx * (delta / 16);
          p.y += p.vy * (delta / 16);

          // Wrap edges smoothly
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Pulsing opacity
          p.pulseVal += p.pulseSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.pulseVal) * 0.08;

          // Subtle cursor interaction
          const cdx = p.x - mouseX;
          const cdy = p.y - mouseY;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 120 && cdist > 0) {
            const force = (1 - cdist / 120) * 1.2;
            p.x += (cdx / cdist) * force;
            p.y += (cdy / cdist) * force;
          }
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
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden select-none"
    >
      {/* 1. Subtle Radial Ambient Lighting Aura Top-Right */}
      <div className="absolute -top-40 -right-40 size-[550px] rounded-full bg-primary/8 blur-[160px] transition-opacity duration-700 dark:bg-primary/10" />

      {/* 2. Soft Ambient Lighting Aura Bottom-Left */}
      <div className="absolute -bottom-40 -left-40 size-[600px] rounded-full bg-primary/6 blur-[180px] transition-opacity duration-700 dark:bg-primary/8" />

      {/* 3. Central Cosmic Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="size-full opacity-70 transition-opacity duration-500"
      />
    </div>
  );
}
