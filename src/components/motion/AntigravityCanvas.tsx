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
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    let isVisible = true;

    // Detect if dark or light mode
    const isLightMode = () => document.documentElement.classList.contains("light");

    // Mouse interactive coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: isMobile ? 80 : 130,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
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
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 to avoid GPU memory explosion
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // IntersectionObserver: PAUSE canvas render loop when Hero is scrolled out of view!
    // This saves massive CPU/GPU resources on lower-end devices while browsing other sections.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    // Generate balanced antigravity particles (fewer on mobile for speed)
    const particleCount = isMobile ? 16 : Math.min(Math.floor((width * height) / 18000), 38);
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
      const baseAlpha = Math.random() * 0.35 + 0.2;
      const colorSet = isLightMode() ? colorsLight : colorsDark;
      const baseColor = colorSet[Math.floor(Math.random() * colorSet.length)] || "rgba(255, 107, 0, ";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.3 + 0.12),
        radius: Math.random() * 1.5 + 1,
        baseRadius: Math.random() * 1.5 + 1,
        alpha: baseAlpha,
        baseAlpha,
        color: baseColor,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.015 + 0.008,
      });
    }

    let time = 0;
    const maxConnectDistSq = 110 * 110;

    // Animation render loop
    const render = () => {
      if (!isVisible) {
        // Paused when scrolled down
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      const light = isLightMode();

      // Only draw particle connection lines on desktop (skip on mobile to save GPU)
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          if (!pi) continue;

          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            if (!pj) continue;

            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxConnectDistSq) {
              const lineAlpha = (1 - distSq / maxConnectDistSq) * (light ? 0.1 : 0.14);
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = `rgba(255, 107, 0, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        if (!isReduced) {
          p.x += p.vx + Math.sin(time + p.floatOffset) * 0.2;
          p.y += p.vy;

          if (!isMobile) {
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mdistSq = mdx * mdx + mdy * mdy;

            if (mdistSq < mouse.radius * mouse.radius && mdistSq > 0) {
              const mdist = Math.sqrt(mdistSq);
              const force = (mouse.radius - mdist) / mouse.radius;
              const angle = Math.atan2(mdy, mdx);
              p.x += Math.cos(angle) * force * 2.8;
              p.y += Math.sin(angle) * force * 2.8;
            }
          }

          // Wrap edges smoothly
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Render particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full opacity-75 transition-opacity duration-500 will-change-transform"
    />
  );
}
