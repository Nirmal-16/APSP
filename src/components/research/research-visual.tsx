"use client";

import { useEffect, useRef } from "react";
import type { ResearchVisualKey } from "@/data/research-areas";

type Colors = { primary: string; accent: string; muted: string; flame: string; ember: string };

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  kind: number;
}

interface Scene {
  particles: Particle[];
  t: number;
  arc: [number, number][];
  arcTimer: number;
}

const MAX_PARTICLES = 260;
const LABEL_FONT = "11px ui-monospace, SFMono-Regular, Menlo, monospace";

function readColors(el: HTMLElement): Colors {
  const s = getComputedStyle(el);
  const v = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    primary: v("--primary", "#7c3aed"),
    accent: v("--accent", "#22d3ee"),
    muted: v("--muted", "#94a1c2"),
    flame: "#f59e0b",
    ember: "#f97316",
  };
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function spawn(scene: Scene, p: Particle) {
  if (scene.particles.length < MAX_PARTICLES) scene.particles.push(p);
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, c: Colors, align: CanvasTextAlign = "left") {
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = c.muted;
  ctx.font = LABEL_FONT;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;
}

// Fuel spray from an injector breaking up into a rising flame.
function combustion(ctx: CanvasRenderingContext2D, s: Scene, w: number, h: number, dt: number, c: Colors) {
  const nx = w * 0.5;
  const ny = h * 0.86;
  const scale = h / 300;

  for (let i = 0; i < 4; i++) {
    const a = -Math.PI / 2 + rand(-0.32, 0.32);
    const sp = rand(70, 120) * scale;
    spawn(s, { x: nx, y: ny, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, age: 0, life: rand(1.6, 2.4), size: 1.4, kind: 0 });
  }

  ctx.globalCompositeOperation = "lighter";
  for (const p of s.particles) {
    const k = p.age / p.life;
    if (k > 0.32) {
      p.vy -= 26 * scale * dt;
      p.vx *= 0.985;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (k <= 0.32) {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = c.accent;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const f = (k - 0.32) / 0.68;
      ctx.globalAlpha = Math.max(0, 0.55 * (1 - f));
      ctx.fillStyle = f < 0.45 ? c.flame : c.ember;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2 + f * 7 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  ctx.fillStyle = c.muted;
  ctx.beginPath();
  ctx.moveTo(nx - 14, h);
  ctx.lineTo(nx + 14, h);
  ctx.lineTo(nx + 5, ny);
  ctx.lineTo(nx - 5, ny);
  ctx.closePath();
  ctx.fill();

  label(ctx, "injector", nx + 20, h - 10, c);
  label(ctx, "fuel spray", nx + w * 0.12, h * 0.68, c);
  label(ctx, "flame zone", nx + w * 0.16, h * 0.22, c);
}

// Branching discharge between two electrodes, shedding reactive species.
function plasma(ctx: CanvasRenderingContext2D, s: Scene, w: number, h: number, dt: number, c: Colors) {
  const x1 = w * 0.18;
  const x2 = w * 0.82;
  const cy = h * 0.5;

  s.arcTimer -= dt;
  if (s.arcTimer <= 0 || s.arc.length === 0) {
    s.arcTimer = 0.09;
    const segs = 22;
    const pts: [number, number][] = [];
    let y = cy;
    for (let i = 0; i <= segs; i++) {
      const x = x1 + ((x2 - x1) * i) / segs;
      y += rand(-1, 1) * h * 0.05;
      const pull = i === 0 || i === segs ? 1 : 0.18;
      y += (cy - y) * pull;
      pts.push([x, y]);
    }
    s.arc = pts;
    for (let i = 0; i < 5; i++) {
      const [px, py] = pts[Math.floor(rand(1, pts.length - 1))];
      spawn(s, { x: px, y: py, vx: rand(-30, 30), vy: rand(-40, 40), age: 0, life: rand(1, 2), size: rand(1.2, 2.4), kind: i % 2 });
    }
  }

  ctx.globalCompositeOperation = "lighter";
  for (const p of s.particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.99;
    p.vy *= 0.99;
    ctx.globalAlpha = Math.max(0, 0.8 * (1 - p.age / p.life));
    ctx.fillStyle = p.kind ? c.primary : c.accent;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  const drawArc = (color: string, width: number, blur: number, jitter: number) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.beginPath();
    s.arc.forEach(([x, y], i) => {
      const yy = y + (i > 0 && i < s.arc.length - 1 ? rand(-jitter, jitter) : 0);
      if (i === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    });
    ctx.stroke();
  };
  ctx.globalAlpha = 0.5;
  drawArc(c.primary, 4, 18, 3);
  ctx.globalAlpha = 1;
  drawArc(c.accent, 1.8, 10, 0);
  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";

  ctx.fillStyle = c.muted;
  ctx.fillRect(x1 - 10, cy - h * 0.24, 8, h * 0.48);
  ctx.fillRect(x2 + 2, cy - h * 0.24, 8, h * 0.48);

  label(ctx, "electrode", x1 - 6, cy + h * 0.24 + 18, c, "center");
  label(ctx, "electrode", x2 + 6, cy + h * 0.24 + 18, c, "center");
  label(ctx, "discharge", w * 0.5, cy - h * 0.2, c, "center");
  label(ctx, "reactive species", w * 0.5, cy + h * 0.3, c, "center");
}

// Electrospray / FEEP: ions pulled from an emitter tip through an extractor.
function propulsion(ctx: CanvasRenderingContext2D, s: Scene, w: number, h: number, dt: number, c: Colors) {
  const cy = h * 0.5;
  const tipX = w * 0.26;
  const extX = w * 0.38;
  const gap = Math.max(12, h * 0.05);

  for (let i = 0; i < 2; i++) {
    const heavy = Math.random() < 0.2;
    spawn(s, { x: tipX, y: cy + rand(-1, 1), vx: rand(20, 40), vy: rand(-6, 6), age: 0, life: 6, size: heavy ? 2.4 : 1.4, kind: heavy ? 1 : 0 });
  }

  ctx.globalCompositeOperation = "lighter";
  for (const p of s.particles) {
    if (p.x < extX) {
      p.vx += (p.kind ? 260 : 520) * dt;
    } else {
      p.vy += rand(-30, 30) * dt;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.x > w + 10) p.age = p.life;
    const fade = p.x > w * 0.75 ? 1 - (p.x - w * 0.75) / (w * 0.25) : 1;
    ctx.globalAlpha = Math.max(0, 0.9 * fade);
    ctx.fillStyle = p.kind ? c.primary : c.accent;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  ctx.fillStyle = c.muted;
  ctx.beginPath();
  ctx.moveTo(w * 0.06, cy - h * 0.12);
  ctx.lineTo(w * 0.06, cy + h * 0.12);
  ctx.lineTo(tipX, cy);
  ctx.closePath();
  ctx.fill();

  ctx.fillRect(extX, cy - h * 0.36, 6, h * 0.36 - gap);
  ctx.fillRect(extX, cy + gap, 6, h * 0.36 - gap);

  label(ctx, "emitter (Taylor cone)", w * 0.06, cy + h * 0.12 + 18, c);
  label(ctx, "extractor", extX + 3, cy - h * 0.36 - 8, c, "center");
  label(ctx, "ion beam →", w * 0.72, cy - h * 0.18, c, "center");
}

// Meso-scale combustor: premixed flow through a narrow channel and flame front.
function microscale(ctx: CanvasRenderingContext2D, s: Scene, w: number, h: number, dt: number, c: Colors) {
  const cy = h * 0.5;
  const half = h * 0.16;
  const x0 = w * 0.08;
  const x1 = w * 0.92;
  const front = w * 0.52 + Math.sin(s.t * 1.6) * w * 0.02;

  // Low emission rate so particles reach the flame front before the cap.
  if (Math.random() < 0.8) {
    spawn(s, { x: x0, y: cy + rand(-half + 4, half - 4), vx: rand(80, 120), vy: 0, age: 0, life: 8, size: rand(1.2, 1.8), kind: 0 });
  }

  ctx.globalCompositeOperation = "lighter";
  for (const p of s.particles) {
    const burnt = p.x > front;
    if (burnt) {
      p.vx += 60 * dt;
      p.vy += rand(-40, 40) * dt;
      p.y = Math.min(cy + half - 3, Math.max(cy - half + 3, p.y));
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.x > x1) p.age = p.life;
    ctx.globalAlpha = burnt ? 0.7 : 0.85;
    ctx.fillStyle = burnt ? (p.x - front < w * 0.08 ? c.flame : c.ember) : c.accent;
    ctx.beginPath();
    ctx.arc(p.x, p.y, burnt ? p.size + 1 : p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = c.flame;
  ctx.lineWidth = 3;
  ctx.shadowColor = c.flame;
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.moveTo(front + 10, cy - half + 2);
  ctx.quadraticCurveTo(front - 14, cy, front + 10, cy + half - 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  ctx.strokeStyle = c.muted;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x0, cy - half);
  ctx.lineTo(x1, cy - half);
  ctx.moveTo(x0, cy + half);
  ctx.lineTo(x1, cy + half);
  ctx.stroke();

  label(ctx, "fuel + air", x0, cy - half - 12, c);
  label(ctx, "flame front", front, cy + half + 20, c, "center");
  label(ctx, "hot products", x1, cy - half - 12, c, "right");
}

const scenes = { combustion, plasma, propulsion, microscale };

export function ResearchVisual({ variant, className }: { variant: ResearchVisualKey; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = scenes[variant];
    const scene: Scene = { particles: [], t: 0, arc: [], arcTimer: 0 };
    let colors = readColors(canvas);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const step = (dt: number) => {
      scene.t += dt;
      ctx.clearRect(0, 0, w, h);
      draw(ctx, scene, w, h, dt, colors);
      for (const p of scene.particles) p.age += dt;
      scene.particles = scene.particles.filter((p) => p.age < p.life);
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      if (visible) step(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduceMotion) {
      // Settle the simulation into a representative still frame.
      for (let i = 0; i < 150; i++) step(1 / 60);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) for (let i = 0; i < 150; i++) step(1 / 60);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    io.observe(canvas);

    // Re-read theme colors when the light/dark toggle flips data-theme.
    const mo = new MutationObserver(() => {
      colors = readColors(canvas);
      if (reduceMotion) for (let i = 0; i < 150; i++) step(1 / 60);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, [variant]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className ?? ""}`} />;
}
