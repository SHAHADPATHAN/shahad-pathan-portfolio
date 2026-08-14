import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  floatOffset: number;
  floatSpeed: number;
}

export function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Detect if dark or light mode
    const isLightMode = () => document.documentElement.classList.contains("light");

    // Mouse interactive coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Handle high DPI and resizing
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Generate antigravity particles
    const particleCount = Math.min(Math.floor((width * height) / 12000), 55);
    const particles: Particle[] = [];

    const colorsDark = [
      "rgba(255, 107, 0, ", // Brand primary orange
      "rgba(255, 138, 31, ", // Bright orange
      "rgba(255, 200, 150, ", // Soft amber
      "rgba(255, 255, 255, ", // Star white
    ];

    const colorsLight = [
      "rgba(255, 107, 0, ",
      "rgba(230, 90, 0, ",
      "rgba(180, 70, 0, ",
      "rgba(80, 80, 90, ",
    ];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.25;
      const colorSet = isLightMode() ? colorsLight : colorsDark;
      const baseColor = colorSet[Math.floor(Math.random() * colorSet.length)];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Antigravity drift: slight upward tendency and floating lateral oscillation
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.4 + 0.15),
        radius: Math.random() * 1.8 + 1.2,
        baseRadius: Math.random() * 1.8 + 1.2,
        alpha: baseAlpha,
        baseAlpha,
        color: baseColor,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let time = 0;

    // Animation render loop
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const light = isLightMode();
      const maxConnectDistance = 115;

      // Draw particle connections (Antigravity force lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * (light ? 0.12 : 0.18);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = light
              ? `rgba(255, 107, 0, ${lineAlpha})`
              : `rgba(255, 107, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReduced) {
          // Antigravity upward floating with subtle sine-wave drift
          p.x += p.vx + Math.sin(time + p.floatOffset) * 0.25;
          p.y += p.vy;

          // Mouse Antigravity Repulsion Field
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);

          if (mdist < mouse.radius && mdist > 0) {
            const force = (mouse.radius - mdist) / mouse.radius;
            const angle = Math.atan2(mdy, mdx);
            p.x += Math.cos(angle) * force * 3.2;
            p.y += Math.sin(angle) * force * 3.2;
          }

          // Wrap edges smoothly
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Render particle with glowing aura
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Subtle glow halo on larger particles
        if (p.radius > 2.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha * 0.18})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full opacity-80 transition-opacity duration-500"
    />
  );
}
