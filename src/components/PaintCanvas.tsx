import { useEffect, useRef } from 'react';

interface PaintCanvasProps {
  color: string;
}

// Full-viewport canvas that trails paint behind the cursor, fading it out
// like a comet tail, and clears instantly on click.
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
    let lastDrawTime = -Infinity;
    let settled = true;

    // frame-rate-independent exponential fade: erase a fraction of the
    // existing alpha each frame based on elapsed time, not frame count.
    // Canvas alpha is 8-bit, so once a pixel's alpha gets low enough that a
    // frame's proportional erase amount rounds to zero, the multiplicative
    // fade mathematically stalls forever at that faint, non-zero value —
    // a hard clear once the cursor's been idle a beat sweeps up that residue.
    function fadeTick(now: number) {
      const dt = now - lastFrame;
      lastFrame = now;
      if (!settled) {
        if (now - lastDrawTime > 500) {
          ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
          settled = true;
        } else {
          const decay = 1 - Math.exp(-dt / 130);
          ctx!.save();
          ctx!.globalCompositeOperation = 'destination-out';
          ctx!.fillStyle = `rgba(0,0,0,${decay})`;
          ctx!.fillRect(0, 0, window.innerWidth, window.innerHeight);
          ctx!.restore();
        }
      }
      rafId = requestAnimationFrame(fadeTick);
    }

    let raw: { x: number; y: number; t: number } | null = null;
    let smooth: { x: number; y: number } | null = null;
    let smoothWidth = 6;
    // last two smoothed points, used to draw a quadratic curve through their
    // midpoints so the ink never breaks into separately-capped segments
    let pts: { x: number; y: number }[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      raw = null;
      smooth = null;
      pts = [];
      settled = true;
    }

    function onMove(e: PointerEvent) {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();
      lastDrawTime = now;
      settled = false;

      if (!raw || !smooth) {
        smooth = { x, y };
        raw = { x, y, t: now };
        pts = [{ x, y }];
        return;
      }

      const dx = x - raw.x;
      const dy = y - raw.y;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(now - raw.t, 1);
      const speed = dist / dt;
      const targetWidth = Math.max(2.5, Math.min(9, 9 - speed * 5));
      // low-pass filter so the nib width eases instead of jumping
      smoothWidth += (targetWidth - smoothWidth) * 0.12;

      // trail the raw cursor position for a smoothed, less jittery stroke
      smooth = {
        x: smooth.x + (x - smooth.x) * 0.3,
        y: smooth.y + (y - smooth.y) * 0.3,
      };

      pts.push(smooth);
      if (pts.length > 3) pts.shift();

      if (pts.length === 3) {
        const [p0, p1, p2] = pts;
        const midA = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        const midB = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

        ctx!.strokeStyle = colorRef.current;
        ctx!.globalAlpha = 1;
        ctx!.lineWidth = smoothWidth;
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';
        ctx!.beginPath();
        ctx!.moveTo(midA.x, midA.y);
        ctx!.quadraticCurveTo(p1.x, p1.y, midB.x, midB.y);
        ctx!.stroke();
      }

      raw = { x, y, t: now };
    }

    function onLeave() {
      raw = null;
      smooth = null;
      pts = [];
    }

    function onReset() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      raw = null;
      smooth = null;
      pts = [];
      settled = true;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onReset);
    lastFrame = performance.now();
    rafId = requestAnimationFrame(fadeTick);

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
