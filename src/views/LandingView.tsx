import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import type { CategoryMeta, Theme, ViewId } from '../data/theme';
import { useHover } from '../hooks/useHover';
import { PaintCanvas } from '../components/PaintCanvas';

const TRADE_WORDS = [
  { word: 'software', color: '#4da3ff' },
  { word: 'ai', color: '#b16cff' },
  { word: 'consulting', color: '#ffb020' },
  { word: 'strategy', color: '#ff5c7a' },
  { word: 'comedy', color: '#2ec4b6' },
  { word: 'leadership', color: '#6bcb3f' },
  { word: 'operations', color: '#ff8a3d' },
];

function TradesWord() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  // hover region frozen at the moment the cursor first lands on "many
  // trades" — later words (e.g. the much shorter "ai") swapping in changes
  // the span's own size, so hit-testing against its live, ever-changing rect
  // would both enter and exit hover repeatedly as the box resizes under a
  // stationary cursor. Testing raw cursor position against a fixed
  // rectangle sidesteps that entirely.
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const pad = 5;
    function inside(r: DOMRect, x: number, y: number) {
      return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
    }
    function onMove(e: MouseEvent) {
      if (!hoveredRef.current) {
        const el = spanRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (inside(r, e.clientX, e.clientY)) {
          rectRef.current = r;
          hoveredRef.current = true;
          setHovered(true);
        }
      } else if (!rectRef.current || !inside(rectRef.current, e.clientX, e.clientY)) {
        hoveredRef.current = false;
        rectRef.current = null;
        setHovered(false);
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // -1 is the sentinel for "many trades" — keeping it in the same index
  // space as the cycling words means the very first swap gets the identical
  // crossfade treatment as every later one, instead of popping in instantly
  // because the render showing hovered=true beats the effect that kicks off
  // the fade.
  const [idx, setIdx] = useState(-1);
  const [outgoing, setOutgoing] = useState<{ idx: number; token: number } | null>(null);
  const idxRef = useRef(-1);
  const tokenRef = useRef(0);

  function advance(next: number) {
    const prev = idxRef.current;
    idxRef.current = next;
    const token = ++tokenRef.current;
    setOutgoing({ idx: prev, token });
    setIdx(next);
    window.setTimeout(() => {
      setOutgoing((o) => (o && o.token === token ? null : o));
    }, 360);
  }

  useEffect(() => {
    if (!hovered) {
      advance(-1);
      return;
    }
    let next = 0;
    advance(next);
    const id = window.setInterval(() => {
      next = (next + 1) % TRADE_WORDS.length;
      advance(next);
    }, 780);
    return () => window.clearInterval(id);
  }, [hovered]);

  const wordAt = (i: number) => (i >= 0 ? TRADE_WORDS[i] : { word: 'many trades', color: undefined });
  const current = wordAt(idx);
  const leaving = outgoing ? wordAt(outgoing.idx) : null;

  return (
    <span ref={spanRef} style={{ position: 'relative', display: 'inline-block' }}>
      {leaving && (
        <span
          key={outgoing!.token}
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'inline-block',
            color: leaving.color,
            animation: 'wordOut .32s ease forwards',
            pointerEvents: 'none',
          }}
        >
          {leaving.word}
        </span>
      )}
      <span key={idx} style={{ display: 'inline-block', color: current.color, animation: 'wordIn .32s ease' }}>
        {current.word}
      </span>
    </span>
  );
}

// The wordmark cycles through unrelated visual identities on a timer, Google
// Doodle style — each one is a fully different font/color/animation
// treatment rather than a variation on a shared style, so the swap should
// feel like a costume change, not a palette tweak.
export const DOODLE_IDS = ['terminal', 'neon', 'ticker', 'stamp', 'pixel', 'rainbow', 'comic', 'marker'] as const;
export type DoodleId = (typeof DOODLE_IDS)[number];

export function Doodle({ id }: { id: DoodleId }) {
  if (id === 'terminal') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 17,
          fontWeight: 700,
          color: '#39ff14',
          background: '#05080a',
          border: '1px solid #16241f',
          borderRadius: 6,
          padding: '6px 11px',
        }}
      >
        <span style={{ opacity: 0.55 }}>{'>'}</span>
        <span>Aswath Suresh</span>
        <span style={{ display: 'inline-block', width: 8, height: 15, background: '#39ff14', animation: 'blink 1s steps(1) infinite' }} />
      </div>
    );
  }
  if (id === 'neon') {
    return (
      <div
        style={{
          fontFamily: "'Monoton', cursive",
          fontSize: 21,
          letterSpacing: '.02em',
          color: '#fff',
          textShadow: '0 0 4px #fff, 0 0 11px #ff2ec4, 0 0 19px #ff2ec4, 0 0 40px #ff2ec4, 0 0 80px #b026ff',
          animation: 'neonFlicker 2.8s infinite',
        }}
      >
        Aswath Suresh
      </div>
    );
  }
  if (id === 'ticker') {
    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: '#19c37d',
          background: '#07130d',
          border: '1px solid #163b28',
          borderRadius: 5,
          padding: '7px 13px',
        }}
      >
        <span>▲</span>
        <span>Aswath Suresh</span>
        <span
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 40,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)',
            animation: 'tickerSweep 2.2s linear infinite',
          }}
        />
      </div>
    );
  }
  if (id === 'stamp') {
    return (
      <div
        style={{
          display: 'inline-block',
          fontFamily: "'Bungee', sans-serif",
          fontSize: 16,
          color: '#e0473e',
          border: '3px solid #e0473e',
          boxShadow: 'inset 0 0 0 2px #e0473e',
          borderRadius: 4,
          padding: '5px 13px 5px 11px',
          transform: 'rotate(-4deg)',
          letterSpacing: '.03em',
          textTransform: 'uppercase',
          opacity: 0.9,
        }}
      >
        Aswath Suresh
      </div>
    );
  }
  if (id === 'pixel') {
    return (
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 10.5,
          lineHeight: 1.6,
          color: '#ffd966',
          textShadow: '2px 2px 0 #6a3fb5, 4px 4px 0 #2a1a4a',
          letterSpacing: '.02em',
        }}
      >
        ASWATH SURESH
      </div>
    );
  }
  if (id === 'rainbow') {
    return (
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: '-.01em',
          backgroundImage: 'linear-gradient(90deg, #ff5c7a, #ffb020, #6bcb3f, #2ec4b6, #4da3ff, #b16cff, #ff5c7a)',
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'rainbowShift 5s linear infinite',
        }}
      >
        Aswath Suresh
      </div>
    );
  }
  if (id === 'comic') {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            position: 'absolute',
            inset: -7,
            backgroundImage: 'radial-gradient(#ffcf2e 1px, transparent 1.4px)',
            backgroundSize: '5px 5px',
            opacity: 0.55,
            borderRadius: 6,
            zIndex: -1,
          }}
        />
        <span
          style={{
            display: 'inline-block',
            fontFamily: "'Bungee', sans-serif",
            fontSize: 16,
            color: '#fff',
            WebkitTextStroke: '2px #141210',
            transform: 'rotate(-2deg)',
          }}
        >
          Aswath Suresh
        </span>
      </div>
    );
  }
  // marker
  return (
    <div style={{ position: 'relative', display: 'inline-block', fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 29, color: '#f4f2ea', transform: 'rotate(-3deg)' }}>
      Aswath Suresh
      <svg viewBox="0 0 200 10" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: -3, width: '100%', height: 9 }}>
        <path d="M2,6 Q50,0 100,6 T198,5" stroke="#ff5c7a" strokeWidth={3} fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Index + auto-advance timer live in App (see doodleId/onDoodleClick) so the
// exact same doodle can also appear in the full-screen transition splash
// when navigating back home — this component just renders whichever one
// it's told to, plus the pop-in on change and a click-to-remix handler.
function NameDoodle({ id, onClick }: { id: DoodleId; onClick: () => void }) {
  const [hovered, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={onClick}
      title="Click for a different look"
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 40,
        cursor: 'pointer',
        transform: hovered ? 'scale(1.04)' : 'none',
        transition: 'transform .2s ease',
      }}
    >
      <div key={id} style={{ animation: 'doodleIn .5s cubic-bezier(.22,1,.36,1) both' }}>
        <Doodle id={id} />
      </div>
    </div>
  );
}

interface LandingViewProps {
  t: Theme;
  cats: CategoryMeta[];
  onEnter: (id: ViewId) => void;
  onOpenModal: () => void;
  onDownloadResume: () => void;
  onToggleMode: () => void;
  modeIcon: string;
  doodleId: DoodleId;
  onDoodleClick: () => void;
}

// Each panel's heading sits far from its tagline in this tall layout — rather
// than shrinking that gap (which would fight the panel's grow-on-hover
// motion), fill it with a motif that previews the destination page's own
// visual language: scanlines for Tech's terminal, ruled lines for
// Consulting's report, a pull-quote mark for Leadership's magazine, confetti
// for the reading list's collage.
//
// A second layer — one continuous "signal" line — runs through all four
// panels on top of that, changing character per section (digital step-wave,
// ascending chart, smooth curve, jittery scribble) while its start/end
// heights line up across panel boundaries so it still reads as one trace
// even though each segment is really just that panel's own SVG stretched to
// fill its (hover-animated) width.
const LINE_COLORS: Record<Exclude<ViewId, 'landing'>, string> = {
  tech: '#39ff14',
  consulting: '#5b9bdc',
  leadership: '#c0553b',
  reading: '#ff4d79',
};

// Point-sampled (rather than bezier/H-V path strings) so each line can be
// perturbed per-point for the cursor "pluck" interaction below. Duplicate-x
// pairs fake the right-angle jumps for Tech/Consulting's chart look.
const LINE_POINTS: Record<Exclude<ViewId, 'landing'>, [number, number][]> = {
  tech: [
    [0, 20], [14, 20], [14, 8], [28, 8], [28, 20],
    [42, 20], [42, 32], [56, 32], [56, 20], [100, 20],
  ],
  consulting: [
    [0, 20], [12, 20], [12, 17], [26, 17], [26, 14], [40, 14],
    [40, 12], [54, 12], [54, 10], [68, 10], [68, 9], [82, 9], [82, 8], [100, 8],
  ],
  leadership: [
    [0, 8], [10, 9], [20, 17], [30, 25], [35, 26], [45, 25],
    [55, 14], [65, 11], [70, 12], [80, 15], [90, 19], [100, 20],
  ],
  reading: [
    [0, 20], [6, 14], [12, 24], [18, 16], [24, 26], [30, 18], [36, 22], [42, 14], [48, 24],
    [54, 17], [60, 23], [66, 15], [72, 21], [78, 13], [84, 23], [90, 17], [96, 20], [100, 19],
  ],
};

// Where each line starts vertically (0-40 viewBox units) — matches the
// previous panel's end point so the boundary dot sits exactly on the line.
const LINE_START_Y: Record<Exclude<ViewId, 'landing'>, number> = { tech: 20, consulting: 20, leadership: 8, reading: 20 };

const PANEL_TAGS: Record<Exclude<ViewId, 'landing'>, string> = {
  tech: 'PID 4102',
  consulting: 'Q3 FY26',
  leadership: 'VOL. 04',
  reading: 'TRACK 07',
};

function pointsToPath(points: [number, number][], offsets: Float32Array) {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${(y + offsets[i]).toFixed(2)}`).join(' ');
}

function valueAtX(points: [number, number][], x: number) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) {
      if (x1 === x0) return y1;
      return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
    }
  }
  return points[points.length - 1][1];
}

// A damped spring per point: crossing near the stroke kicks nearby points
// with an impulse (sign alternating point-to-point so it reads as a shake,
// not a single shove), then they oscillate back to rest on their own —
// same feel as flicking a taut wire. Runs off refs + direct DOM writes to
// the path's `d` attribute rather than React state, so 60fps doesn't mean
// 60fps of re-renders.
const SPRING_STIFFNESS = 90;
const SPRING_DAMPING = 6;

function ShakyLine({ points, color }: { points: [number, number][]; color: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const offsets = useRef(new Float32Array(points.length));
  const velocities = useRef(new Float32Array(points.length));
  const rafRef = useRef<number | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function tick() {
    const dt = 1 / 60;
    let energy = 0;
    for (let i = 0; i < points.length; i++) {
      const o = offsets.current[i];
      const v = velocities.current[i];
      const nv = v + (-SPRING_STIFFNESS * o - SPRING_DAMPING * v) * dt;
      const no = o + nv * dt;
      velocities.current[i] = nv;
      offsets.current[i] = no;
      energy += Math.abs(no) + Math.abs(nv);
    }
    pathRef.current?.setAttribute('d', pointsToPath(points, offsets.current));
    if (energy > 0.03) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
      offsets.current.fill(0);
      velocities.current.fill(0);
      pathRef.current?.setAttribute('d', pointsToPath(points, offsets.current));
    }
  }

  function handleMove(e: ReactMouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const localX = ((e.clientX - rect.left) / rect.width) * 100;
    const localY = ((e.clientY - rect.top) / rect.height) * 40;
    const last = lastPos.current;
    lastPos.current = { x: localX, y: localY };
    if (localX < 0 || localX > 100) return;
    if (Math.abs(localY - valueAtX(points, localX)) > 7) return; // only react near the actual stroke

    const speed = last ? Math.min(Math.hypot(localX - last.x, localY - last.y) * 8, 50) : 14;
    const impulse = 10 + speed * 0.9;
    const sigma = 12;
    for (let i = 0; i < points.length; i++) {
      const dx = points[i][0] - localX;
      const w = Math.exp(-(dx * dx) / (2 * sigma * sigma));
      velocities.current[i] += w * impulse * (i % 2 === 0 ? 1 : -1);
    }
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  }

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      onMouseMove={handleMove}
      style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
    >
      <path
        ref={pathRef}
        d={pointsToPath(points, offsets.current)}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.62}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function PanelMotif({ id, fg, first }: { id: Exclude<ViewId, 'landing'>; fg: string; first: boolean }) {
  let texture: ReactNode = null;
  if (id === 'tech') {
    texture = (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${fg}14 0px, ${fg}14 1px, transparent 1px, transparent 4px)`,
        }}
      />
    );
  } else if (id === 'consulting') {
    texture = (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(180deg, ${fg}14 0px, ${fg}14 1px, transparent 1px, transparent 38px)`,
        }}
      />
    );
  } else if (id === 'leadership') {
    texture = (
      <div
        style={{
          position: 'absolute',
          right: -18,
          bottom: -110,
          fontFamily: "'Instrument Serif', serif",
          fontSize: 320,
          lineHeight: 1,
          color: fg,
          opacity: 0.08,
        }}
      >
        &rdquo;
      </div>
    );
  } else {
    const marks = [
      { sym: '✳', top: '20%', left: '74%', size: 28, rot: '-10deg', color: '#ff3b6b' },
      { sym: '✦', top: '46%', left: '16%', size: 20, rot: '8deg', color: '#2d5bff' },
      { sym: '●', top: '64%', left: '78%', size: 13, rot: '0deg', color: '#ffcf2e' },
      { sym: '✳', top: '80%', left: '32%', size: 17, rot: '16deg', color: '#19c37d' },
    ];
    texture = (
      <div style={{ position: 'absolute', inset: 0 }}>
        {marks.map((m, i) => (
          <span key={i} style={{ position: 'absolute', top: m.top, left: m.left, fontSize: m.size, color: m.color, opacity: 0.4, transform: `rotate(${m.rot})` }}>
            {m.sym}
          </span>
        ))}
      </div>
    );
  }

  const lineColor = LINE_COLORS[id];
  const startY = LINE_START_Y[id];

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
      {texture}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 72, transform: 'translateY(-50%)' }}>
        <ShakyLine points={LINE_POINTS[id]} color={lineColor} />
        {!first && (
          <span
            style={{
              position: 'absolute',
              left: -3,
              top: `${(startY / 40) * 100}%`,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: lineColor,
              transform: 'translateY(-50%)',
              boxShadow: `0 0 8px ${lineColor}`,
            }}
          />
        )}
      </div>
      <div style={{ position: 'absolute', top: 24, right: 22, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.14em', color: lineColor, opacity: 0.65 }}>
        {PANEL_TAGS[id]}
      </div>
    </div>
  );
}

function LandingPanel({ p, onEnter, first }: { p: CategoryMeta; onEnter: (id: ViewId) => void; first: boolean }) {
  const [hovered, handlers] = useHover();
  return (
    <div
      {...handlers}
      onClick={() => onEnter(p.id)}
      style={{
        position: 'relative',
        flex: hovered ? '2.6 1 0' : '1 1 0',
        minWidth: 0,
        borderRadius: 16,
        background: p.panelBg,
        color: p.panelFg,
        border: `1px solid ${p.panelBorder}`,
        padding: '28px 26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'flex-grow .5s cubic-bezier(.4,0,.1,1), box-shadow .35s',
        fontFamily: `${p.font}, sans-serif`,
        boxShadow: hovered ? '0 26px 70px rgba(0,0,0,.4)' : 'none',
      }}
    >
      <PanelMotif id={p.id as Exclude<ViewId, 'landing'>} fg={p.panelFg} first={first} />
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 13, letterSpacing: '.16em', opacity: 0.65 }}>{p.num}</div>
        <div
          style={{
            // Instrument Serif (Leadership) only ships a single 400 weight —
            // the browser's fake-bold for 700 barely thickens its delicate
            // strokes, so at matching font-size it reads visibly smaller and
            // lighter than the other panels' genuine bold cuts. Compensate
            // with a bit more size and a hairline stroke to restore parity.
            fontSize: p.id === 'leadership' ? 'clamp(30px,3.1vw,48px)' : 'clamp(26px,2.7vw,42px)',
            fontWeight: 700,
            marginTop: 10,
            lineHeight: 1.02,
            letterSpacing: '-.01em',
            WebkitTextStroke: p.id === 'leadership' ? '0.5px currentColor' : undefined,
          }}
        >
          {p.name}
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: p.id === 'leadership' ? 17 : 15, opacity: 0.82, lineHeight: 1.45, marginBottom: 20, maxWidth: '34ch' }}>{p.tagline}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, padding: '9px 16px', border: '1px solid currentColor', borderRadius: 999, opacity: 0.9 }}>
          Enter <span>→</span>
        </div>
      </div>
    </div>
  );
}

export function LandingView({ t, cats, onEnter, onOpenModal, onDownloadResume, onToggleMode, modeIcon, doodleId, onDoodleClick }: LandingViewProps) {
  return (
    <div style={{ minHeight: 'var(--app-vh, 100dvh)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
      <PaintCanvas color={t.accent2} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 34px', position: 'relative', zIndex: 5 }}>
        <NameDoodle id={doodleId} onClick={onDoodleClick} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onOpenModal} style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, padding: '9px 16px', borderRadius: 999, fontSize: 14, cursor: 'pointer' }}>
            About
          </button>
          <button onClick={onDownloadResume} style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, padding: '9px 16px', borderRadius: 999, fontSize: 14, cursor: 'pointer' }}>
            Résumé ↓
          </button>
          <button onClick={onToggleMode} title="Toggle theme" style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, width: 38, height: 38, borderRadius: 999, fontSize: 15, cursor: 'pointer' }}>
            {modeIcon}
          </button>
        </div>
      </div>

      <div style={{ padding: '30px 34px 18px', maxWidth: 1200, position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 14, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2 }}>
          Curious guy trying to have fun.
        </div>
        <h1 style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 800, fontSize: 'clamp(28px,4.2vw,52px)', lineHeight: 1.05, letterSpacing: '-.02em', margin: '14px 0 0' }}>
          Jack of <span style={{ whiteSpace: 'nowrap' }}><TradesWord />,</span> master of one degree.
        </h1>
      </div>

      <div style={{ flex: '1 1 auto', display: 'flex', gap: 14, padding: '18px 20px 26px', position: 'relative', zIndex: 1 }}>
        {cats.map((p, i) => (
          <LandingPanel key={p.id} p={p} onEnter={onEnter} first={i === 0} />
        ))}
      </div>
    </div>
  );
}
