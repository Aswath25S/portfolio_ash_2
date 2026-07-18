import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import type { CategoryMeta, Mode, Theme, ViewId } from '../data/theme';
import { useHover } from '../hooks/useHover';
import { useIsMobile } from '../hooks/useMediaQuery';
import { PaintCanvas } from '../components/PaintCanvas';
import { PillButton } from '../components/PillButton';

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

export function Doodle({ id, mode }: { id: DoodleId; mode: Mode }) {
  const dark = mode !== 'light';
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
    // The classic look is a white-hot tube core haloed in color — reads
    // great on a dark wall, but a white core (and a white glow layer) both
    // wash out to nothing against a light page, so light mode drops the
    // white entirely and lets the tube itself be the saturated color.
    return (
      <div
        style={{
          fontFamily: "'Monoton', cursive",
          fontSize: 21,
          letterSpacing: '.02em',
          color: dark ? '#fff' : '#a3116e',
          textShadow: dark
            ? '0 0 4px #fff, 0 0 11px #ff2ec4, 0 0 19px #ff2ec4, 0 0 40px #ff2ec4, 0 0 80px #b026ff'
            : '0 0 5px #ff2ec4, 0 0 12px #ff2ec4, 0 0 24px #b026ff',
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
    // Pale gold reads fine against a near-black panel but nearly disappears
    // against the cream light-mode background — the dark drop-shadow
    // blocks still give it a 3D edge either way, so only the fill needs to
    // swap to something with actual contrast on light.
    return (
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 10.5,
          lineHeight: 1.6,
          color: dark ? '#ffd966' : '#8a5a00',
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
  // marker — the cream ink is legible on the dark page's near-black
  // background, but it's the exact same cream as the light page's own
  // background, so it renders literally invisible there without this swap.
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: "'Caveat', cursive",
        fontWeight: 700,
        fontSize: 29,
        color: dark ? '#f4f2ea' : '#2a2620',
        transform: 'rotate(-3deg)',
      }}
    >
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
function NameDoodle({ id, mode, onClick }: { id: DoodleId; mode: Mode; onClick: () => void }) {
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
        <Doodle id={id} mode={mode} />
      </div>
    </div>
  );
}

interface LandingViewProps {
  t: Theme;
  mode: Mode;
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

// Width of the left-edge gutter the signal line runs through on stacked
// mobile panels — LandingPanel pads its content past this so text never
// sits on top of the line.
const LINE_GUTTER = 26;

// Cubic-bezier point evaluator for one Catmull-Rom segment (p1 -> p2, with
// neighbors p0/p3 shaping the tangents) — used by resampleSmooth below to
// turn a few sparse anchors into a dense point set lying on the curve.
function catmullRomPoint(p0: [number, number], p1: [number, number], p2: [number, number], p3: [number, number], t: number): [number, number] {
  const c1x = p1[0] + (p2[0] - p0[0]) / 6;
  const c1y = p1[1] + (p2[1] - p0[1]) / 6;
  const c2x = p2[0] - (p3[0] - p1[0]) / 6;
  const c2y = p2[1] - (p3[1] - p1[1]) / 6;
  const mt = 1 - t;
  const x = mt * mt * mt * p1[0] + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * p2[0];
  const y = mt * mt * mt * p1[1] + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * p2[1];
  return [x, y];
}

// Turns a handful of hand-placed anchor points into a dense point set lying
// exactly on the smooth curve through them. Leadership's line needs this:
// with only ~12 sparse anchors, the cursor hit-test and spring physics
// below (which reason in straight lines between points) disagreed
// noticeably with the actual rendered bezier curve between them, so
// hovering the line felt like it was reacting to the wrong spot. Densifying
// first means "straight line between points" and "the curve" are close
// enough to be the same thing, so hit-testing and physics line up with
// what's on screen.
function resampleSmooth(anchors: [number, number][], perSegment: number): [number, number][] {
  const out: [number, number][] = [anchors[0]];
  for (let i = 0; i < anchors.length - 1; i++) {
    const p0 = anchors[i === 0 ? 0 : i - 1];
    const p1 = anchors[i];
    const p2 = anchors[i + 1];
    const p3 = anchors[i + 2 < anchors.length ? i + 2 : i + 1];
    for (let s = 1; s <= perSegment; s++) {
      out.push(catmullRomPoint(p0, p1, p2, p3, s / perSegment));
    }
  }
  return out;
}

// A genuine sine wave — 2 full cycles, rising from the Consulting handoff
// height (8) to the Reading handoff height (20) — rather than the single
// asymmetric dip this used to be. Anchors are evenly spaced on purpose:
// Catmull-Rom's tangent at a point is shaped by how far its neighbors sit,
// so uneven spacing landing right on a peak/trough (as the old hand-placed
// x-positions did once the shape changed to a wave) produces a lopsided,
// visibly kinked tangent right at the peak instead of a rounded one.
const LEADERSHIP_ANCHOR_X = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const LEADERSHIP_ANCHORS: [number, number][] = LEADERSHIP_ANCHOR_X.map((x) => {
  const midline = 8 + (20 - 8) * (x / 100);
  const wave = 7 * Math.sin((2 * Math.PI * x) / 50); // period 50 -> 0 at x=0, 50, 100
  return [x, midline + wave] as [number, number];
});

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
  leadership: resampleSmooth(LEADERSHIP_ANCHORS, 8),
  reading: [
    [0, 20], [6, 14], [12, 24], [18, 16], [24, 26], [30, 18], [36, 22], [42, 14], [48, 24],
    [54, 17], [60, 23], [66, 15], [72, 21], [78, 13], [84, 23], [90, 17], [96, 20], [100, 19],
  ],
};

// Groups consecutive same-Y points into one rigid unit — Tech/Consulting's
// horizontal runs are exactly 2 points (the two ends of that flat stretch)
// with a different X each. A per-point Gaussian pluck weight naturally
// differs between two points at different X, so the two ends of one
// "horizontal" segment could get different offsets and it'd render tilted
// instead of flat. Points in the same group later get forced to share one
// weight (see handleMove) so they move by the same amount and the segment
// stays perfectly horizontal while shifting up/down. Vertical jumps don't
// need this: same-X pairs stay vertical no matter how their two Y offsets
// differ, so they're free to move independently.
function computeGroupIds(points: [number, number][]): number[] {
  const ids: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    ids.push(points[i][1] === points[i - 1][1] ? ids[i - 1] : ids[i - 1] + 1);
  }
  return ids;
}

const LINE_GROUPS: Partial<Record<Exclude<ViewId, 'landing'>, number[]>> = {
  tech: computeGroupIds(LINE_POINTS.tech),
  consulting: computeGroupIds(LINE_POINTS.consulting),
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

// `vertical` swaps which axis is which in the emitted path: normally the
// along-length coordinate (x, 0-100) maps to the SVG's x and the thickness
// coordinate (y, 0-40) to its y. Stacked mobile panels run the line down
// the left edge instead of through the middle, so there the along-length
// coordinate has to drive the SVG's y (height) and thickness drives x
// (width) — same points, same physics, just read out swapped.
//
// Deliberately plain `L` segments, even for Leadership's curvy line — its
// points are pre-densified by resampleSmooth so consecutive points are only
// ~1-2 units apart, which already reads as a smooth curve. That also keeps
// this function's straight-line interpretation of the points identical to
// valueAtX's below, so the cursor hit-test and the physics react to exactly
// where the line is actually drawn instead of a smoothed approximation of it.
function pointsToPath(points: [number, number][], offsets: Float32Array, vertical: boolean) {
  return points
    .map(([x, y], i) => {
      const thickness = (y + offsets[i]).toFixed(2);
      return vertical ? `${i === 0 ? 'M' : 'L'}${thickness},${x}` : `${i === 0 ? 'M' : 'L'}${x},${thickness}`;
    })
    .join(' ');
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

// Tech/Consulting move as rigid grouped blocks (see groupIds/coherentPull)
// rather than an independent wobble per point, so they don't need the taut,
// snap-back-instantly spring above to avoid looking chaotic — that made
// their travel feel clipped/restrictive. Softer stiffness and lighter
// damping than the default spring gives more give and a slower, looser
// settle, while staying uncoupled (no neighbor tension) so segments still
// move as flat rigid blocks, not a wobbling thread like Leadership.
const COHERENT_STIFFNESS = 42;
const COHERENT_DAMPING = 4.2;

// Leadership's "loose thread" physics: each point is also pulled toward its
// neighbors' offsets (not just back toward its own rest position), so a
// disturbance propagates down the line instead of every point oscillating
// in place, independently, at the same frequency. Softer self-restoring
// force + lighter damping than the spring above means it takes longer, and
// wobbles more, to settle — slack instead of taut.
const THREAD_STIFFNESS = 34;
const THREAD_DAMPING = 3.2;
const THREAD_COUPLING = 55;

// Periodic traveling pulse — a sharp upward spike with a smaller rebound
// dip right behind it, like an EKG blip — sweeps left-to-right across each
// panel's line on a timer, independent of the spring above. Two of these
// fired close together per beat is the "lub-dub". Panels stagger their
// start via pulseDelay so it reads as one wave propagating rightward
// through all four lines rather than four lines blinking in sync.
const PULSE_SWEEP_MS = 650;
const PULSE_AMP = 8;
const PULSE_SIGMA1 = 3;
const PULSE_REBOUND_AMP = 3.5;
const PULSE_REBOUND_OFFSET = 5;
const PULSE_SIGMA2 = 3.5;
const LUB_DUB_GAP_MS = 260;

function pulseShapeOffset(dx: number) {
  const spike = PULSE_AMP * Math.exp(-(dx * dx) / (2 * PULSE_SIGMA1 * PULSE_SIGMA1));
  const rebound = PULSE_REBOUND_AMP * Math.exp(-((dx - PULSE_REBOUND_OFFSET) ** 2) / (2 * PULSE_SIGMA2 * PULSE_SIGMA2));
  return -spike + rebound; // negative = visually up (SVG y grows down), positive = the dip right after
}

// Tech/Consulting's grouped lines get this instead: an odd (antisymmetric)
// bump — as the wave passes a fixed point it swings one way, crosses zero
// exactly under the wave center, then swings the *other* way by the same
// amount, before settling. Peaks at dx = ±SYM_PULSE_SIGMA. The EKG shape
// above peaks around -6.7 (up) but only +1.5 (down) — fine for
// Leadership's organic heartbeat, but it meant Tech/Consulting's automatic
// pulse (which fires on a timer regardless of any interaction) was
// visibly, systematically biased upward rather than moving up and down by
// equal amounts.
const SYM_PULSE_AMP = 13;
const SYM_PULSE_SIGMA = 4;

function symmetricPulseOffset(dx: number) {
  return SYM_PULSE_AMP * (dx / SYM_PULSE_SIGMA) * Math.exp(-(dx * dx) / (2 * SYM_PULSE_SIGMA * SYM_PULSE_SIGMA));
}

function ShakyLine({
  points,
  color,
  pulseTrigger,
  pulseDelay,
  vertical = false,
  coherentPull = false,
  groupIds,
  threadPhysics = false,
}: {
  points: [number, number][];
  color: string;
  pulseTrigger: number;
  pulseDelay: number;
  vertical?: boolean;
  // Reading's pluck alternates sign point-to-point, which reads as a
  // buzz/shake — fitting for its jittery scribble identity, but on Tech's
  // step-wave and Consulting's staircase (both built from duplicate-x point
  // pairs faking right-angle jumps) that same alternation can push the two
  // ends of one vertical segment in opposite directions at once — the
  // segment visibly shears/twists instead of the shape just shifting up or
  // down. coherentPull pushes every affected point the same way instead —
  // toward whichever side of the line the cursor is on — so the perturbed
  // region moves as one consistent block along a single axis, no shear.
  coherentPull?: boolean;
  // Forces every point in the same group (see computeGroupIds) to receive
  // the exact same impulse weight, not just the same sign — otherwise two
  // points at different X within one "horizontal" segment still get
  // different Gaussian falloff weights and the segment tilts instead of
  // staying flat while it moves. Points that start equal and always
  // receive equal impulses stay equal forever under independent-but-
  // identical spring dynamics, no coupling required.
  groupIds?: number[];
  // Leadership additionally gets points elastically coupled to their
  // neighbors (see THREAD_* below) instead of springing back independently,
  // so a pluck ripples down the curve and settles unevenly like a loose
  // thread rather than the whole bump bouncing back in lockstep. Implies
  // coherentPull's same-direction push regardless of that prop's value.
  threadPhysics?: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const offsets = useRef(new Float32Array(points.length));
  const velocities = useRef(new Float32Array(points.length));
  const rafRef = useRef<number | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const pulses = useRef<{ start: number; amp: number }[]>([]);
  const prevTrigger = useRef(pulseTrigger);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function ensureLoop() {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  }

  function tick() {
    const dt = 1 / 60;
    let energy = 0;
    // Neighbor coupling reads last frame's offsets (a full snapshot) rather
    // than the array being mutated in this same pass — otherwise point i's
    // update would see point i-1's brand-new value but point i+1's stale
    // one, biasing the ripple to always drift one direction.
    const prevOffsets = threadPhysics ? offsets.current.slice() : null;
    for (let i = 0; i < points.length; i++) {
      const o = offsets.current[i];
      const v = velocities.current[i];
      let accel: number;
      if (prevOffsets) {
        const left = i > 0 ? prevOffsets[i - 1] : o;
        const right = i < points.length - 1 ? prevOffsets[i + 1] : o;
        const tension = (left + right - 2 * o) * THREAD_COUPLING;
        accel = -THREAD_STIFFNESS * o - THREAD_DAMPING * v + tension;
      } else if (coherentPull) {
        accel = -COHERENT_STIFFNESS * o - COHERENT_DAMPING * v;
      } else {
        accel = -SPRING_STIFFNESS * o - SPRING_DAMPING * v;
      }
      const nv = v + accel * dt;
      // Hard safety net: a fast flurry of pointer events can add impulses
      // faster than a single frame's damping removes them (more so with
      // thread mode's lighter damping), so clamp rather than let a burst of
      // input ever fling the curve past the visible band.
      const no = Math.max(-25, Math.min(25, o + nv * dt));
      velocities.current[i] = nv;
      offsets.current[i] = no;
      energy += Math.abs(no) + Math.abs(nv);
    }

    const now = performance.now();
    pulses.current = pulses.current.filter((p) => now - p.start <= PULSE_SWEEP_MS);
    const combined = new Float32Array(points.length);
    for (const p of pulses.current) {
      const waveX = -15 + 130 * ((now - p.start) / PULSE_SWEEP_MS);
      if (groupIds) {
        // Same reasoning as the pluck impulse above: the automatic sweep
        // computes its offset from distance-to-waveX per point, so without
        // this a horizontal segment's two ends would take different
        // offsets as the pulse passes and briefly tilt mid-sweep. Use
        // whichever member of the group is nearest the wave for the whole
        // group's offset.
        const numGroups = groupIds[groupIds.length - 1] + 1;
        const groupDx = new Float32Array(numGroups).fill(Infinity);
        for (let i = 0; i < points.length; i++) {
          const dx = points[i][0] - waveX;
          const g = groupIds[i];
          if (Math.abs(dx) < Math.abs(groupDx[g])) groupDx[g] = dx;
        }
        for (let i = 0; i < points.length; i++) {
          combined[i] += p.amp * symmetricPulseOffset(groupDx[groupIds[i]]);
        }
      } else {
        for (let i = 0; i < points.length; i++) {
          combined[i] += p.amp * pulseShapeOffset(points[i][0] - waveX);
        }
      }
    }
    for (let i = 0; i < points.length; i++) combined[i] += offsets.current[i];

    pathRef.current?.setAttribute('d', pointsToPath(points, combined, vertical));
    // Averaged rather than summed so lines with more points (Leadership's
    // densified curve has ~4x Tech's) don't take proportionally longer to
    // be judged "settled" for the exact same per-point wobble.
    if (energy / points.length > 0.03 || pulses.current.length > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
      offsets.current.fill(0);
      velocities.current.fill(0);
      pathRef.current?.setAttribute('d', pointsToPath(points, offsets.current, vertical));
    }
  }

  useEffect(() => {
    if (pulseTrigger === prevTrigger.current) return;
    prevTrigger.current = pulseTrigger;
    const lub = window.setTimeout(() => {
      pulses.current.push({ start: performance.now(), amp: 1 });
      ensureLoop();
    }, pulseDelay);
    const dub = window.setTimeout(() => {
      pulses.current.push({ start: performance.now(), amp: 0.6 });
      ensureLoop();
    }, pulseDelay + LUB_DUB_GAP_MS);
    return () => {
      window.clearTimeout(lub);
      window.clearTimeout(dub);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulseTrigger]);

  function handleMove(e: ReactMouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const localX = vertical ? ((e.clientY - rect.top) / rect.height) * 100 : ((e.clientX - rect.left) / rect.width) * 100;
    const localY = vertical ? ((e.clientX - rect.left) / rect.width) * 40 : ((e.clientY - rect.top) / rect.height) * 40;
    const last = lastPos.current;
    lastPos.current = { x: localX, y: localY };
    if (localX < 0 || localX > 100) return;
    const dyFromLine = localY - valueAtX(points, localX);
    // Grouped lines (Tech/Consulting) span a wide Y range across their
    // different segments (Tech runs from y=8 to y=32) — gating on distance
    // to *this specific x's* stroke height meant sweeping the cursor in an
    // ordinary straight line only ever came within range of whichever
    // segment happened to sit near that height, leaving the others
    // unresponsive no matter how much you waved at them. Grouped lines
    // react anywhere in the band instead; direction still comes from which
    // side of the (still-computed) line height the cursor is on.
    if (!groupIds && Math.abs(dyFromLine) > 7) return; // only react near the actual stroke

    const speed = last ? Math.min(Math.hypot(localX - last.x, localY - last.y) * 8, 50) : 14;
    const impulse = 10 + speed * 0.9;
    // Thread mode keeps the kick tight around the cursor and lets neighbor
    // coupling carry it outward over subsequent frames — a wide sigma here
    // would shove a big swath of the (now densely-sampled) curve the same
    // direction in one shot, and with the softer damping "loose" wants,
    // that much simultaneous energy can fling the line well past the
    // visible band before it has time to dissipate.
    const sigma = threadPhysics ? 5 : 12;
    const coherentSign = Math.sign(dyFromLine) || 1;
    const VELOCITY_CAP = 60;
    if (groupIds) {
      // One shared weight per group — whichever point in the group sits
      // closest to the cursor wins — so both ends of a horizontal segment
      // receive an identical impulse and stay level as they move.
      const numGroups = groupIds[groupIds.length - 1] + 1;
      const groupWeight = new Float32Array(numGroups);
      for (let i = 0; i < points.length; i++) {
        const dx = points[i][0] - localX;
        const w = Math.exp(-(dx * dx) / (2 * sigma * sigma));
        const g = groupIds[i];
        if (w > groupWeight[g]) groupWeight[g] = w;
      }
      for (let i = 0; i < points.length; i++) {
        const w = groupWeight[groupIds[i]];
        const nextV = velocities.current[i] + w * impulse * coherentSign;
        velocities.current[i] = Math.max(-VELOCITY_CAP, Math.min(VELOCITY_CAP, nextV));
      }
    } else {
      for (let i = 0; i < points.length; i++) {
        const dx = points[i][0] - localX;
        const w = Math.exp(-(dx * dx) / (2 * sigma * sigma));
        const sign = threadPhysics || coherentPull ? coherentSign : i % 2 === 0 ? 1 : -1;
        const nextV = velocities.current[i] + w * impulse * sign;
        velocities.current[i] = Math.max(-VELOCITY_CAP, Math.min(VELOCITY_CAP, nextV));
      }
    }
    ensureLoop();
  }

  return (
    <svg
      viewBox={vertical ? '0 0 40 100' : '0 0 100 40'}
      preserveAspectRatio="none"
      onMouseMove={handleMove}
      style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}
    >
      <path
        ref={pathRef}
        d={pointsToPath(points, offsets.current, vertical)}
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

// Consulting gets an actual waterfall/bridge chart — the single most
// recognizable "consulting deck" visual — instead of a line, reusing the
// same y-levels the old ascending-staircase line traced so it still reads
// as the same growth trend, just rendered as bars. Bars grow in once on
// mount, then react to the shared heartbeat (pulseTrigger) the way the
// other three panels' lines do — a wave sweeps left-to-right and each bar
// rises then settles back as the wave passes over it, rather than a fixed
// per-bar animation replaying on every beat. Hovering a bar highlights it
// like a real chart tooltip.
// A real up-and-down bridge/waterfall pattern (gain, dip, gain, dip, ...)
// rather than a monotonic staircase — a strictly-ascending sequence reads
// as flat/boring at a glance even with varying step sizes, since the eye
// only registers the overall slope. Bars stay compressed toward the bottom
// of the 0-40 band so even the shortest one has real presence.
const WATERFALL_LEVELS = [22, 10, 17, 7, 14, 5, 9];
const WATERFALL_X_CENTERS = [6, 19, 33, 47, 61, 75, 91];
// Close to the very edge of the 0-40 viewBox on purpose — taller bars, more
// of the band actually used — rather than moving the levels themselves.
const WATERFALL_BASELINE = 39;
const WATERFALL_BAR_WIDTH = 9;
// Bumped up from 5 — the ask was for hover to read as more responsive, not
// just a color change with a token height twitch.
const HOVER_BOOST = 8;

// Same traveling-wave timing as ShakyLine's pulse (PULSE_SWEEP_MS, waveX
// sweeping -15 -> 115, LUB_DUB_GAP_MS for the second weaker beat), but the
// shape is a plain positive bump — a bar's height only ever goes up as the
// wave arrives and back down as it leaves, never below its resting height,
// matching "increase and decrease" rather than the signed up/down wobble
// the line version uses.
// Widened and roughly doubled in amplitude from the original tuning — at
// sigma=9/amp=7 the reaction was subtle enough to almost miss; this makes
// each bar's rise-and-fall an obvious, springy pop as the wave arrives, and
// wide enough that 2-3 neighboring bars are visibly moving at once, which
// is what actually reads as a "wave" sweeping across the chart.
const WATERFALL_BUMP_SIGMA = 13;
const WATERFALL_BUMP_AMP = 14;

function waterfallBump(dx: number) {
  return WATERFALL_BUMP_AMP * Math.exp(-(dx * dx) / (2 * WATERFALL_BUMP_SIGMA * WATERFALL_BUMP_SIGMA));
}

// Single source of truth for a bar's geometry, shared by the imperative
// per-frame pulse animation and the plain React render — they used to
// disagree (JSX pinned the bar's *value* end and let it grow past the
// baseline; the imperative code pinned the baseline and grew the value end
// outward), which was harmless at rest (both agree when bump=0) but would
// have snapped a bar to the wrong shape if a React re-render ever landed
// mid-pulse — exactly what hovering a bar during an active pulse now does.
// Every bar always grows away from the fixed baseline, in both directions.
function barRect(i: number, extra: number, vertical: boolean) {
  const length = WATERFALL_BASELINE - WATERFALL_LEVELS[i] + extra;
  const across = WATERFALL_X_CENTERS[i] - WATERFALL_BAR_WIDTH / 2;
  return vertical
    ? { x: WATERFALL_BASELINE - length, y: across, width: length, height: WATERFALL_BAR_WIDTH }
    : { x: across, y: WATERFALL_BASELINE - length, width: WATERFALL_BAR_WIDTH, height: length };
}

function WaterfallChart({ color, pulseTrigger, pulseDelay, vertical }: { color: string; pulseTrigger: number; pulseDelay: number; vertical: boolean }) {
  const [hoverIdx, setHoverIdxState] = useState<number | null>(null);
  // Imperative reads (inside tick, running outside React's render cycle)
  // need the *current* hover target, not whatever it was when that
  // particular tick() closure happened to be created — a ref side-channel
  // avoids that staleness.
  const hoverIdxRef = useRef<number | null>(null);
  const rectRefs = useRef<(SVGRectElement | null)[]>([]);
  const bumps = useRef(new Float32Array(WATERFALL_LEVELS.length));
  const pulses = useRef<{ start: number; amp: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const prevTrigger = useRef(pulseTrigger);

  function setHover(i: number | null) {
    hoverIdxRef.current = i;
    setHoverIdxState(i);
    ensureLoop(); // apply the hover boost immediately even if no pulse is running
  }

  function ensureLoop() {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  }

  function applyBar(i: number) {
    const el = rectRefs.current[i];
    if (!el) return;
    const extra = bumps.current[i] + (hoverIdxRef.current === i ? HOVER_BOOST : 0);
    const r = barRect(i, extra, vertical);
    el.setAttribute('x', String(r.x));
    el.setAttribute('y', String(r.y));
    el.setAttribute('width', String(r.width));
    el.setAttribute('height', String(r.height));
  }

  function tick() {
    const now = performance.now();
    pulses.current = pulses.current.filter((p) => now - p.start <= PULSE_SWEEP_MS);
    let stillMoving = false;
    for (let i = 0; i < WATERFALL_LEVELS.length; i++) {
      let bump = 0;
      for (const p of pulses.current) {
        const waveX = -15 + 130 * ((now - p.start) / PULSE_SWEEP_MS);
        bump += p.amp * waterfallBump(WATERFALL_X_CENTERS[i] - waveX);
      }
      bumps.current[i] = bump;
      if (bump > 0.05) stillMoving = true;
      applyBar(i);
    }
    rafRef.current = stillMoving || pulses.current.length > 0 ? requestAnimationFrame(tick) : null;
  }

  useEffect(() => {
    if (pulseTrigger === prevTrigger.current) return;
    prevTrigger.current = pulseTrigger;
    const lub = window.setTimeout(() => {
      pulses.current.push({ start: performance.now(), amp: 1 });
      ensureLoop();
    }, pulseDelay);
    const dub = window.setTimeout(() => {
      pulses.current.push({ start: performance.now(), amp: 0.6 });
      ensureLoop();
    }, pulseDelay + LUB_DUB_GAP_MS);
    return () => {
      window.clearTimeout(lub);
      window.clearTimeout(dub);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulseTrigger]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg viewBox={vertical ? '0 0 40 100' : '0 0 100 40'} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible', display: 'block' }}>
      <line
        x1={vertical ? WATERFALL_BASELINE : 0}
        y1={vertical ? 0 : WATERFALL_BASELINE}
        x2={vertical ? WATERFALL_BASELINE : 100}
        y2={vertical ? 100 : WATERFALL_BASELINE}
        stroke={color}
        strokeOpacity={0.25}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      {WATERFALL_LEVELS.map((_, i) => {
        const hovered = hoverIdx === i;
        const rectProps = barRect(i, bumps.current[i] + (hovered ? HOVER_BOOST : 0), vertical);
        return (
          <rect
            ref={(el) => {
              rectRefs.current[i] = el;
            }}
            key={i}
            {...rectProps}
            fill={color}
            opacity={hovered ? 0.85 : 0.4}
            rx={1}
            style={{
              transformBox: 'fill-box',
              transformOrigin: vertical ? 'left' : 'bottom',
              animation: `${vertical ? 'waterfallGrowX' : 'waterfallGrowY'} .5s cubic-bezier(.2,.8,.3,1.1) both`,
              animationDelay: `${i * 70}ms`,
              transition:
                'opacity .12s ease, x .14s cubic-bezier(.34,1.56,.64,1), y .14s cubic-bezier(.34,1.56,.64,1), width .14s cubic-bezier(.34,1.56,.64,1), height .14s cubic-bezier(.34,1.56,.64,1)',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => {
              // Guards against a stale clear: if the pointer already moved
              // on to a different bar by the time this fires, don't wipe
              // out that bar's hover state.
              if (hoverIdxRef.current === i) setHover(null);
            }}
          />
        );
      })}
    </svg>
  );
}

function PanelMotif({
  id,
  fg,
  first,
  pulseTrigger,
  pulseDelay,
  vertical = false,
}: {
  id: Exclude<ViewId, 'landing'>;
  fg: string;
  first: boolean;
  pulseTrigger: number;
  pulseDelay: number;
  vertical?: boolean;
}) {
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
  // Tech's step-wave and Consulting's staircase are built from duplicate-x
  // point pairs faking right-angle jumps — the default alternating-sign
  // pluck can push one such pair's two points apart instead of together,
  // shearing the vertical segment. Keep them moving as one block.
  const coherentPull = id === 'tech' || id === 'consulting';
  // The handoff dot marks where the previous panel's *line* would hand off
  // to this one — Consulting doesn't have a line to hand off anymore, so
  // the dot has nothing to sit on and just floats oddly over the bars.
  const showDot = !first && id !== 'consulting';

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
      {texture}
      {vertical ? (
        // Stacked mobile panels run the signal line down a narrow gutter
        // hugging the left edge instead of through the vertical center —
        // the panels' own left padding is widened (see LINE_GUTTER) to
        // keep this clear of the title/tagline text above it.
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: LINE_GUTTER }}>
          {id === 'consulting' ? (
            <WaterfallChart color={lineColor} pulseTrigger={pulseTrigger} pulseDelay={pulseDelay} vertical />
          ) : (
            <ShakyLine points={LINE_POINTS[id]} color={lineColor} pulseTrigger={pulseTrigger} pulseDelay={pulseDelay} vertical coherentPull={coherentPull} groupIds={LINE_GROUPS[id]} threadPhysics={id === 'leadership'} />
          )}
          {showDot && (
            <span
              style={{
                position: 'absolute',
                top: -3,
                left: `${(startY / 40) * 100}%`,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: lineColor,
                transform: 'translateX(-50%)',
                boxShadow: `0 0 8px ${lineColor}`,
              }}
            />
          )}
        </div>
      ) : (
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 72, transform: 'translateY(-50%)' }}>
          {id === 'consulting' ? (
            <WaterfallChart color={lineColor} pulseTrigger={pulseTrigger} pulseDelay={pulseDelay} vertical={false} />
          ) : (
            <ShakyLine points={LINE_POINTS[id]} color={lineColor} pulseTrigger={pulseTrigger} pulseDelay={pulseDelay} coherentPull={coherentPull} groupIds={LINE_GROUPS[id]} threadPhysics={id === 'leadership'} />
          )}
          {showDot && (
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
      )}
      <div style={{ position: 'absolute', top: 24, right: 22, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.14em', color: lineColor, opacity: 0.65 }}>
        {PANEL_TAGS[id]}
      </div>
    </div>
  );
}

const INTER_PANEL_DELAY_MS = 480;

function LandingPanel({
  p,
  onEnter,
  first,
  index,
  pulseTrigger,
}: {
  p: CategoryMeta;
  onEnter: (id: ViewId) => void;
  first: boolean;
  index: number;
  pulseTrigger: number;
}) {
  const [hovered, handlers] = useHover();
  const isMobile = useIsMobile();
  return (
    <div
      {...handlers}
      onClick={() => onEnter(p.id)}
      style={{
        position: 'relative',
        flex: isMobile ? '0 0 auto' : hovered ? '2.6 1 0' : '1 1 0',
        minHeight: isMobile ? 190 : undefined,
        minWidth: 0,
        borderRadius: 16,
        background: p.panelBg,
        color: p.panelFg,
        border: `1px solid ${p.panelBorder}`,
        padding: isMobile ? `22px 20px 22px ${LINE_GUTTER + 10}px` : '28px 26px',
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
      <PanelMotif
        id={p.id as Exclude<ViewId, 'landing'>}
        fg={p.panelFg}
        first={first}
        pulseTrigger={pulseTrigger}
        pulseDelay={index * INTER_PANEL_DELAY_MS}
        vertical={isMobile}
      />
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
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            fontSize: 14,
            fontWeight: 600,
            padding: '9px 16px',
            borderRadius: 999,
            border: `1px solid ${hovered ? 'transparent' : 'currentColor'}`,
            background: hovered ? p.panelFg : 'transparent',
            color: hovered ? p.panelBg : 'currentColor',
            opacity: hovered ? 1 : 0.9,
            transition: 'background .2s ease, color .2s ease, border-color .2s ease',
          }}
        >
          Enter <span>→</span>
        </div>
      </div>
    </div>
  );
}

const HEARTBEAT_INTERVAL_MS = 5200;

export function LandingView({ t, mode, cats, onEnter, onOpenModal, onDownloadResume, onToggleMode, modeIcon, doodleId, onDoodleClick }: LandingViewProps) {
  // One shared counter drives every panel's line — each panel just delays
  // its own reaction by index * INTER_PANEL_DELAY_MS, so a single tick here
  // reads as one pulse travelling left-to-right through all four lines.
  const [pulseTrigger, setPulseTrigger] = useState(0);
  const isMobile = useIsMobile();
  useEffect(() => {
    const kick = window.setTimeout(() => setPulseTrigger((n) => n + 1), 1200);
    const id = window.setInterval(() => setPulseTrigger((n) => n + 1), HEARTBEAT_INTERVAL_MS);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div style={{ minHeight: 'var(--app-vh, 100dvh)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
      <PaintCanvas color={t.accent2} />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          rowGap: 12,
          padding: isMobile ? '18px 20px' : '26px 34px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <NameDoodle id={doodleId} mode={mode} onClick={onDoodleClick} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexBasis: isMobile ? '100%' : 'auto' }}>
          <PillButton onClick={onOpenModal} accent={t.accent} border={t.border} fg={t.fg} padding={isMobile ? '8px 14px' : undefined} fontSize={isMobile ? 13.5 : undefined}>
            About
          </PillButton>
          <PillButton onClick={onDownloadResume} accent={t.accent} border={t.border} fg={t.fg} padding={isMobile ? '8px 14px' : undefined} fontSize={isMobile ? 13.5 : undefined}>
            Résumé ↓
          </PillButton>
          <button onClick={onToggleMode} title="Toggle theme" style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, width: isMobile ? 36 : 38, height: isMobile ? 36 : 38, borderRadius: 999, fontSize: 15, cursor: 'pointer', flexShrink: 0 }}>
            {modeIcon}
          </button>
        </div>
      </div>

      <div style={{ padding: isMobile ? '20px 20px 14px' : '30px 34px 18px', maxWidth: 1200, position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: isMobile ? 12 : 14, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2 }}>
          Curious guy trying to have fun.
        </div>
        <h1 style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 800, fontSize: 'clamp(28px,4.2vw,52px)', lineHeight: 1.05, letterSpacing: '-.02em', margin: '14px 0 0' }}>
          Jack of <span style={{ whiteSpace: 'nowrap' }}><TradesWord />,</span> master of one degree.
        </h1>
      </div>

      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 12 : 14,
          padding: isMobile ? '14px 16px 26px' : '18px 20px 26px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {cats.map((p, i) => (
          <LandingPanel key={p.id} p={p} onEnter={onEnter} first={i === 0} index={i} pulseTrigger={pulseTrigger} />
        ))}
      </div>
    </div>
  );
}
