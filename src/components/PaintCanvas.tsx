import { useEffect, useRef } from 'react';

interface PaintCanvasProps {
  color: string;
}

type Shape = 'square' | 'circle' | 'star';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  rotSpeed: number;
  shape: Shape;
  born: number;
  life: number;
}

// A cohesive, playful palette shared with the "trades" word cycle on the
// landing page — the current theme accent is mixed in too, via colorRef.
const FUN_COLORS = ['#4da3ff', '#b16cff', '#ffb020', '#ff5c7a', '#2ec4b6', '#6bcb3f', '#ff8a3d'];

const GRAVITY = 320; // px/s²
const DRAG = 1.4; // fraction of velocity shed per second

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape, size: number) {
  if (shape === 'circle') {
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  if (shape === 'star') {
    const s = size;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.28, -s * 0.28);
    ctx.lineTo(s, 0);
    ctx.lineTo(s * 0.28, s * 0.28);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.28, s * 0.28);
    ctx.lineTo(-s, 0);
    ctx.lineTo(-s * 0.28, -s * 0.28);
    ctx.closePath();
    ctx.fill();
    return;
  }
  // confetti-flake rectangle
  ctx.fillRect(-size / 2, -size * 0.3, size, size * 0.6);
}

// Full-viewport canvas that throws a little burst of tumbling, gravity-fed
// confetti behind the cursor as it moves, and clears instantly on click.
export function PaintCanvas({ color }: PaintCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color);
  colorRef.current = color;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let rafId = 0;
    let lastFrame = performance.now();
    let particles: Particle[] = [];
    const MAX_PARTICLES = 400;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnParticle(px: number, py: number, vx: number, vy: number, now: number) {
      const angle = Math.random() * Math.PI * 2;
      const burst = 30 + Math.random() * 70;
      const roll = Math.random();
      const shape: Shape = roll < 0.15 ? 'star' : roll < 0.6 ? 'square' : 'circle';
      const palette = [colorRef.current, ...FUN_COLORS];
      particles.push({
        x: px + (Math.random() - 0.5) * 4,
        y: py + (Math.random() - 0.5) * 4,
        vx: vx * 0.12 + Math.cos(angle) * burst,
        vy: vy * 0.12 + Math.sin(angle) * burst - 50,
        size: 3 + Math.random() * 4.5,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 7,
        shape,
        born: now,
        life: 500 + Math.random() * 420,
      });
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
    }

    let last: { x: number; y: number; t: number } | null = null;

    function onMove(e: PointerEvent) {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      if (!last) {
        last = { x, y, t: now };
        spawnParticle(x, y, 0, 0, now);
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(now - last.t, 1);
      const vx = (dx / dt) * 1000;
      const vy = (dy / dt) * 1000;

      const step = 8;
      const steps = Math.min(24, Math.max(1, Math.floor(dist / step)));
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        if (Math.random() < 0.8) {
          spawnParticle(last.x + dx * t, last.y + dy * t, vx, vy, now);
        }
      }

      last = { x, y, t: now };
    }

    function onLeave() {
      last = null;
    }

    function onReset() {
      particles = [];
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
    }

    function tick(now: number) {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.born;
        if (age >= p.life) {
          particles.splice(i, 1);
          continue;
        }
        const drag = Math.max(0, 1 - DRAG * dt);
        p.vy += GRAVITY * dt;
        p.vx *= drag;
        p.vy *= drag;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.rotSpeed * dt;

        const lifeFrac = age / p.life;
        const alpha = Math.max(0, 1 - lifeFrac * lifeFrac);
        const pop = age < 80 ? age / 80 : 1;

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot);
        ctx!.scale(pop, pop);
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = p.color;
        drawShape(ctx!, p.shape, p.size);
        ctx!.restore();
      }

      rafId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onReset);
    lastFrame = performance.now();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onReset);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
