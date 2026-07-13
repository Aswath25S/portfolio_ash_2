import { useEffect, useRef, useState } from 'react';
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

interface LandingViewProps {
  t: Theme;
  cats: CategoryMeta[];
  onEnter: (id: ViewId) => void;
  onOpenModal: () => void;
  onDownloadResume: () => void;
  onToggleMode: () => void;
  modeIcon: string;
}

function LandingPanel({ p, onEnter }: { p: CategoryMeta; onEnter: (id: ViewId) => void }) {
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
      <div>
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
      <div>
        <div style={{ fontSize: p.id === 'leadership' ? 17 : 15, opacity: 0.82, lineHeight: 1.45, marginBottom: 20, maxWidth: '34ch' }}>{p.tagline}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, padding: '9px 16px', border: '1px solid currentColor', borderRadius: 999, opacity: 0.9 }}>
          Enter <span>→</span>
        </div>
      </div>
    </div>
  );
}

export function LandingView({ t, cats, onEnter, onOpenModal, onDownloadResume, onToggleMode, modeIcon }: LandingViewProps) {
  return (
    <div style={{ minHeight: 'var(--app-vh, 100dvh)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
      <PaintCanvas color={t.accent2} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 34px', position: 'relative', zIndex: 5 }}>
        <div style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 800, fontSize: 20, letterSpacing: '-.01em' }}>Aswath Suresh</div>
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
        {cats.map((p) => (
          <LandingPanel key={p.id} p={p} onEnter={onEnter} />
        ))}
      </div>
    </div>
  );
}
