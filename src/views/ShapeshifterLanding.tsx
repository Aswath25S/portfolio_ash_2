import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { ViewId } from '../data/theme';
import { useHover } from '../hooks/useHover';
import { useMediaQuery } from '../hooks/useMediaQuery';
import techImg from '../assets/shapeshifter/tech.png';
import leadershipImg from '../assets/shapeshifter/leadership.png';
import consultingImg from '../assets/shapeshifter/consulting.png';
import otherImg from '../assets/shapeshifter/other_stuff.png';

type Active = 'idle' | 'tech' | 'lead' | 'cons' | 'other';
type SliceKey = Exclude<Active, 'idle'>;

const ORDER: SliceKey[] = ['tech', 'lead', 'cons', 'other'];

// Maps this page's own section keys (matching the design reference's
// copy/order — TECH, LEADERSHIP, CONSULTING, OTHER STUFF) onto the app's
// internal view ids, which use different names/order for the same content.
const VIEW_FOR: Record<SliceKey, Exclude<ViewId, 'landing'>> = {
  tech: 'tech',
  lead: 'leadership',
  cons: 'consulting',
  other: 'reading',
};

const IDLE_CLIPS = [
  'polygon(0% 0%, 29.5% 0%, 14.5% 100%, 0% 100%)',
  'polygon(31% 0%, 55% 0%, 40% 100%, 16% 100%)',
  'polygon(56.5% 0%, 80% 0%, 65% 100%, 41.5% 100%)',
  'polygon(81.5% 0%, 100% 0%, 100% 100%, 66.5% 100%)',
];
const FULL = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const LEFT = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const RIGHT = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';

// No per-slice drift/Ken-Burns motion here on purpose: the four portraits
// are precisely scale- and position-matched to each other so the diagonal
// slices read as one photo. Independent movement per slice (even at
// different speeds/directions) would immediately pull them back out of
// alignment.
const SLICES: { key: SliceKey; src: string; alt: string }[] = [
  { key: 'tech', src: techImg, alt: 'Aswath Suresh rendered in pixel-art style' },
  { key: 'lead', src: leadershipImg, alt: 'Aswath Suresh rendered in oil-painting style' },
  { key: 'cons', src: consultingImg, alt: 'Aswath Suresh rendered in impressionist style' },
  { key: 'other', src: otherImg, alt: 'Aswath Suresh rendered in cubist style' },
];

const ACCENTS: Record<SliceKey, string> = {
  tech: '#6ee7d8',
  lead: '#f0b35c',
  cons: '#8fb3c9',
  other: '#e07a5f',
};

const COPY: Record<Active, { q: string; c: string }> = {
  idle: { q: "Four styles, one candidate. Hover a discipline — its slice takes over.", c: '#8a8f98' },
  tech: { q: 'TECH — Fluent in Python, conversational in JavaScript. The glass is cold brew.', c: ACCENTS.tech },
  lead: { q: 'LEADERSHIP — People follow me. Mostly because I know where the snacks are.', c: ACCENTS.lead },
  cons: { q: "CONSULTING — I turn 'it's complicated' into three bullet points.", c: ACCENTS.cons },
  other: { q: "OTHER STUFF — Yes, there's a mic in every portrait. We should talk about that.", c: ACCENTS.other },
};

const NAV_ITEMS: { key: SliceKey; num: string }[] = [
  { key: 'tech', num: '01' },
  { key: 'lead', num: '02' },
  { key: 'cons', num: '03' },
  { key: 'other', num: '04' },
];

function hazeStyle(key: SliceKey): CSSProperties {
  switch (key) {
    case 'tech':
      return {
        inset: '-10%',
        background:
          'repeating-linear-gradient(0deg, rgba(110,231,216,.10) 0px 12px, transparent 12px 24px), repeating-linear-gradient(90deg, rgba(110,231,216,.07) 0px 12px, transparent 12px 24px)',
        animation: 'ssPixelShift 3.5s steps(8) infinite',
      };
    case 'lead':
      return {
        inset: '-10%',
        background:
          'radial-gradient(55% 45% at 68% 28%, rgba(240,179,92,.19), transparent 70%), radial-gradient(45% 40% at 35% 82%, rgba(240,179,92,.12), transparent 70%), radial-gradient(30% 25% at 15% 30%, rgba(240,179,92,.08), transparent 70%)',
        filter: 'blur(6px)',
        animation: 'ssHazeFloat 9s ease-in-out infinite alternate',
      };
    case 'cons':
      return {
        inset: '-25%',
        background:
          'linear-gradient(115deg, transparent 40%, rgba(143,179,201,.13) 40% 55%, transparent 55%), linear-gradient(245deg, transparent 55%, rgba(143,179,201,.10) 55% 70%, transparent 70%), linear-gradient(65deg, transparent 20%, rgba(143,179,201,.08) 20% 32%, transparent 32%)',
        animation: 'ssFacetShift 8s ease-in-out infinite alternate',
      };
    case 'other':
      return {
        inset: '-10%',
        background:
          'radial-gradient(circle at 70% 25%, rgba(224,122,95,.15) 0 18%, transparent 18.5%), radial-gradient(circle at 28% 72%, rgba(224,122,95,.11) 0 24%, transparent 24.5%), radial-gradient(circle at 82% 78%, rgba(224,122,95,.09) 0 12%, transparent 12.5%)',
        animation: 'ssBlobBob 6s ease-in-out infinite alternate',
      };
  }
}

function GhostButton({
  onClick,
  href,
  download,
  compact,
  children,
}: {
  onClick?: () => void;
  href?: string;
  download?: boolean;
  compact?: boolean;
  children: ReactNode;
}) {
  const [hovered, handlers] = useHover();
  const style: CSSProperties = {
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: compact ? 10 : 11,
    letterSpacing: '.12em',
    color: '#e8e6e1',
    textDecoration: 'none',
    padding: compact ? '6px 10px' : '9px 14px',
    border: `1px solid ${hovered ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.25)'}`,
    background: hovered ? 'rgba(255,255,255,.07)' : 'transparent',
    transition: 'border-color .2s, background .2s',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };
  if (href) {
    return (
      <a href={href} download={download} {...handlers} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} {...handlers} style={style}>
      {children}
    </button>
  );
}

function PrimaryButton({ onClick, compact, children }: { onClick: () => void; compact?: boolean; children: ReactNode }) {
  const [hovered, handlers] = useHover();
  return (
    <button
      onClick={onClick}
      {...handlers}
      style={{
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: compact ? 10 : 11,
        letterSpacing: '.12em',
        padding: compact ? '6px 10px' : '9px 14px',
        border: `1px solid ${hovered ? '#fff' : '#e8e6e1'}`,
        background: hovered ? '#fff' : '#e8e6e1',
        color: '#0e0f12',
        transition: 'border-color .2s, background .2s',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

// About/Contact popovers styled to match this page's own design language
// (square corners, thin hairline border, monospace body copy) rather than
// the rounded/theme-based AboutModal the rest of the app uses — that modal
// has no separate "Contact" entry point to split into, so it stays as-is
// for the classic homepage and sub-pages.
function InfoModal({ kind, onClose }: { kind: 'about' | 'contact'; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(0,0,0,.6)',
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#15161a',
          color: '#e8e6e1',
          border: '1px solid rgba(255,255,255,.18)',
          maxWidth: 440,
          width: '100%',
          padding: '36px 32px',
          fontFamily: 'Archivo, system-ui, sans-serif',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: '1px solid rgba(255,255,255,.25)',
            color: '#e8e6e1',
            width: 30,
            height: 30,
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '.2em', paddingRight: 36 }}>{kind === 'about' ? 'ABOUT' : 'CONTACT'}</div>
        {kind === 'about' ? (
          <p style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13.5, lineHeight: 1.7, color: '#8a8f98', margin: '22px 0 0' }}>
            Recent MS Data Science grad from Johns Hopkins with an Aerospace degree from IIT Bombay. I wear multiple hats — shipping AI products as a founding engineer, sizing markets as a strategy consultant, running and expanding organizations, and doing stand-up on the side.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 22 }}>
            <ContactRow href="mailto:aswathsureshjhu@gmail.com">✉ aswathsureshjhu@gmail.com</ContactRow>
            <ContactRow href="https://github.com/Aswath25S" external>
              gh github.com/Aswath25S
            </ContactRow>
            <ContactRow href="https://www.linkedin.com/in/aswathsuresh25" external>
              in linkedin.com/in/aswathsuresh25
            </ContactRow>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactRow({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  const [hovered, handlers] = useHover();
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...handlers}
      style={{
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 13.5,
        color: hovered ? '#fff' : '#e8e6e1',
        textDecoration: 'none',
        border: `1px solid ${hovered ? 'rgba(255,255,255,.7)' : 'rgba(255,255,255,.25)'}`,
        background: hovered ? 'rgba(255,255,255,.07)' : 'transparent',
        padding: '11px 14px',
        transition: 'border-color .2s, background .2s, color .2s',
      }}
    >
      {children}
    </a>
  );
}

interface ShapeshifterLandingProps {
  onEnter: (id: ViewId) => void;
  onDownloadResume: () => void;
}

export function ShapeshifterLanding({ onEnter, onDownloadResume }: ShapeshifterLandingProps) {
  const [active, setActive] = useState<Active>('idle');
  const [info, setInfo] = useState<'about' | 'contact' | null>(null);
  const isNarrow = useMediaQuery('(max-width: 900px)');
  const hi = active === 'idle' ? -1 : ORDER.indexOf(active as SliceKey);
  const copy = COPY[active];

  function clipFor(i: number) {
    if (hi < 0) return IDLE_CLIPS[i];
    if (i === hi) return FULL;
    return i < hi ? LEFT : RIGHT;
  }

  const labelSizes: Record<SliceKey, number> = {
    tech: isNarrow ? 18 : 31,
    lead: isNarrow ? 27 : 58,
    cons: isNarrow ? 25 : 56,
    other: isNarrow ? 20 : 42,
  };

  function renderLabel(key: SliceKey) {
    if (key === 'tech') {
      return <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: labelSizes.tech, lineHeight: 1.2 }}>TECH</span>;
    }
    if (key === 'lead') {
      return (
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: labelSizes.lead, lineHeight: 1, letterSpacing: '.015em' }}>
          Leadership
        </span>
      );
    }
    if (key === 'cons') {
      return <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: labelSizes.cons, lineHeight: 1, letterSpacing: '.09em' }}>CONSULTING</span>;
    }
    return (
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 14, fontFamily: 'Shrikhand, serif', fontSize: labelSizes.other, lineHeight: 1.15 }}>
        <span style={{ display: 'inline-block', transform: 'rotate(-2.5deg)' }}>Other</span>
        <span style={{ display: 'inline-block', transform: 'rotate(2deg) translateY(3px)' }}>Stuff</span>
      </span>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: isNarrow ? 'column' : 'row',
        width: '100%',
        height: 'var(--app-vh, 100dvh)',
        minHeight: 640,
        color: '#e8e6e1',
        overflow: 'hidden',
        background: '#0e0f12',
        fontFamily: "Archivo, system-ui, sans-serif",
      }}
    >
      {/* Left: sliced collage */}
      <div
        style={{
          position: 'relative',
          width: isNarrow ? '100%' : '52%',
          height: isNarrow ? '30vh' : 'auto',
          flex: 'none',
          overflow: 'hidden',
          background: '#0e0f12',
          borderRight: isNarrow ? 'none' : '3px solid #0e0f12',
          borderBottom: isNarrow ? '3px solid #0e0f12' : 'none',
          boxSizing: 'border-box',
        }}
      >
        {SLICES.map((s, i) => (
          <div key={s.key} style={{ position: 'absolute', inset: 0, clipPath: clipFor(i), transition: 'clip-path .6s cubic-bezier(.7,0,.25,1)' }}>
            <img
              src={s.src}
              alt={s.alt}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // Source portraits are 4:5 (1200x1500); the mobile strip is
                // much shorter and wider than that, so a center crop would
                // slice straight through the subject's head. Anchoring to
                // the top keeps the face/hair intact and crops the torso
                // instead.
                objectPosition: isNarrow ? 'center top' : 'center',
              }}
            />
          </div>
        ))}
      </div>

      {/* Right: identity + nav */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: isNarrow ? '18px 20px 14px' : '52px 60px 44px',
          boxSizing: 'border-box',
          overflowX: 'hidden',
          // Sized to fit without scrolling on typical phones, but this is a
          // fallback, not the plan: on short viewports (small phones,
          // landscape, a browser chrome eating extra height) content should
          // still be reachable by scrolling rather than silently clipped.
          overflowY: isNarrow ? 'auto' : 'hidden',
        }}
      >
        {/* hazeStyle() bleeds each layer past the panel edges (negative
            inset) for a soft glow. Clipped in its own layer rather than
            relying on the panel's own overflow: on mobile that panel is
            overflow: auto (see above), and an unclipped bleed would count
            toward its scrollHeight, producing a phantom scrollbar even when
            the real content already fits. */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {(Object.keys(ACCENTS) as SliceKey[]).map((key) => (
            <div key={key} style={{ position: 'absolute', transition: 'opacity .8s', opacity: active === key ? 1 : 0, ...hazeStyle(key) }} />
          ))}
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 900, fontSize: isNarrow ? 17 : 21, letterSpacing: '.2em' }}>ASWATH SURESH</div>
          <div
            style={{
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: isNarrow ? 11 : 12,
              color: '#8a8f98',
              marginTop: isNarrow ? 5 : 8,
              letterSpacing: '.04em',
            }}
          >
            jack of multiple trades, master of one degree
          </div>
          <div style={{ display: 'flex', gap: isNarrow ? 6 : 10, flexWrap: 'wrap', marginTop: isNarrow ? 14 : 18 }}>
            <GhostButton compact={isNarrow} onClick={() => setInfo('about')}>ABOUT</GhostButton>
            <GhostButton compact={isNarrow} onClick={() => setInfo('contact')}>CONTACT</GhostButton>
            <PrimaryButton compact={isNarrow} onClick={onDownloadResume}>RÉSUMÉ ↓</PrimaryButton>
          </div>
        </div>

        <nav
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            // Desktop keeps the fixed-size list bottom-anchored via
            // marginTop: auto — that single block of whitespace above it is
            // the intended editorial look there. On mobile, leftover height
            // varies a lot by device, and dumping it all into one gap above
            // the nav could shove the nav+tagline below the fold entirely
            // (needing a scroll to reach them). Making nav itself flex to
            // fill the remaining column — with each item below also set to
            // flex: 1 — spreads that leftover height *between* the items
            // instead, so the block always ends exactly at the bottom,
            // whatever the viewport height. (Deliberately not using
            // justify-content: space-evenly for this: combined with
            // overflow: auto on the scroll container above, it makes
            // browsers miscompute scrollHeight and show a phantom
            // scrollbar even when everything already fits.)
            marginTop: isNarrow ? 0 : 'auto',
            flex: isNarrow ? 1 : 'none',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.key;
            const accent = ACCENTS[item.key];
            return (
              <a
                key={item.key}
                href={`#${VIEW_FOR[item.key]}`}
                onClick={(e) => {
                  e.preventDefault();
                  onEnter(VIEW_FOR[item.key]);
                }}
                onMouseEnter={() => setActive(item.key)}
                onMouseLeave={() => setActive('idle')}
                onFocus={() => setActive(item.key)}
                onBlur={() => setActive('idle')}
                style={{
                  display: 'flex',
                  alignItems: isNarrow ? 'center' : 'baseline',
                  flex: isNarrow ? 1 : 'none',
                  gap: 20,
                  padding: isNarrow ? '10px 0' : '30px 0',
                  paddingLeft: isActive ? 16 : 0,
                  borderBottom: '1px solid rgba(255,255,255,.12)',
                  textDecoration: 'none',
                  color: isActive ? accent : '#e8e6e1',
                  transition: 'color .2s, padding-left .25s',
                }}
              >
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: accent }}>{item.num}</span>
                {renderLabel(item.key)}
              </a>
            );
          })}
        </nav>

        <div
          style={{
            position: 'relative',
            marginTop: isNarrow ? 14 : 36,
            marginBottom: isNarrow ? 4 : 0,
            minHeight: isNarrow ? 0 : 54,
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: isNarrow ? 12 : 13,
            lineHeight: 1.6,
            color: copy.c,
          }}
        >
          {copy.q}
        </div>
      </div>

      {info && <InfoModal kind={info} onClose={() => setInfo(null)} />}
    </div>
  );
}
