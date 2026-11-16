"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number; drift: number };
type ShootingStar = { x: number; y: number; vx: number; vy: number; life: number };

const STAR_DENSITY = 3000; // px² of hero per star
const SHOOTING_STARS = 4; // how many shooting stars can be in the sky at once
const SHOOTING_EVERY = [2500, 7000]; // ms before each one reappears, min–max

const STAR_RGB = "233,236,245"; // the dark theme's text colour

// Space backdrop for the homepage hero, in cyan and deep blue: twinkling,
// drifting stars and a few shooting stars crossing at different times. The
// hero is dark in both themes (`theme-dark`), so the sky is always night.
// Animation pauses off-screen and in hidden tabs, and stays still for
// visitors who prefer reduced motion.
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    // One slot per shooting star; staggered so they don't all appear together.
    const now = performance.now();
    const shooting: (ShootingStar | null)[] = Array.from({ length: SHOOTING_STARS }, () => null);
    const nextShooting = shooting.map((_, i) => now + 800 + i * 1500 + Math.random() * 1000);
    let frame = 0;
    let onScreen = true;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((width * height) / STAR_DENSITY) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() < 0.08 ? Math.random() * 0.8 + 1.1 : Math.random() * 0.8 + 0.25,
        alpha: Math.random() * 0.55 + 0.2,
        speed: Math.random() * 0.0015 + 0.0005,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.03 + 0.005,
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(star.phase + time * star.speed);
        ctx.fillStyle = `rgba(${STAR_RGB},${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Each shooting star is a fading trail of dots behind its head.
      for (const s of shooting) {
        if (!s) continue;
        for (let i = 0; i < 24; i++) {
          const fade = (1 - i / 24) * Math.min(1, s.life);
          ctx.fillStyle = `rgba(${STAR_RGB},${0.8 * fade})`;
          ctx.beginPath();
          ctx.arc(s.x - s.vx * i * 0.6, s.y - s.vy * i * 0.6, 1.4 * (1 - i / 30), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (time: number) => {
      for (const star of stars) {
        star.x -= star.drift;
        if (star.x < -2) star.x = width + 2;
      }
      shooting.forEach((s, i) => {
        if (!s) {
          if (time > nextShooting[i]) {
            // Slight variety in speed and angle, all heading down-left.
            const speed = 5 + Math.random() * 3;
            shooting[i] = {
              x: Math.random() * width * 0.8 + width * 0.2,
              y: Math.random() * height * 0.5,
              vx: -speed,
              vy: speed * (0.35 + Math.random() * 0.2),
              life: 1,
            };
          }
          return;
        }
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        if (s.life <= 0 || s.x < -50 || s.y > height + 50) {
          shooting[i] = null;
          nextShooting[i] = time + SHOOTING_EVERY[0] + Math.random() * (SHOOTING_EVERY[1] - SHOOTING_EVERY[0]);
        }
      });
      draw(time);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!reduceMotion && onScreen && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw(0);
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    visibility.observe(canvas);

    const onTabChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onTabChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onTabChange);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Cyan and deep-blue nebula glows, and a faint planet horizon along the bottom. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(55% 55% at 15% 25%, color-mix(in oklab, #2563eb 18%, transparent), transparent 70%)",
            "radial-gradient(40% 45% at 85% 45%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)",
            "radial-gradient(30% 30% at 55% 10%, color-mix(in oklab, #1e3a8a 14%, transparent), transparent 70%)",
            "radial-gradient(120% 55% at 50% 125%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
          ].join(", "),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Fades into the page so the hero has no hard bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
