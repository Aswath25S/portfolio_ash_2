import { useEffect, useMemo, useRef, useState } from 'react';
import { content, READING_ROTS } from '../data/content';
import type { Theme } from '../data/theme';
import { useHover } from '../hooks/useHover';
import { useIsMobile } from '../hooks/useMediaQuery';
import { burstConfetti } from '../utils/confetti';

interface OtherViewProps {
  t: Theme;
}

// Each section gets its own typographic voice + accent hues, instead of one
// font/palette repeated for the whole page — a comedy flyer, a literary
// journal, a neon cinema marquee, and handwritten book-club marginalia.
const SECTION_STYLES = [
  {
    headerFont: "'Bungee', sans-serif",
    headerItalic: false,
    headerWeight: 400,
    headerColor: '#ff2d78',
    headerSize: 'clamp(26px,4.6vw,50px)',
    headerTracking: '0',
    headerGlow: false,
    titleFont: "'Bungee', sans-serif",
    titleItalic: false,
    titleWeight: 400,
    titleSize: 16,
    titleTracking: '.01em',
    accents: ['#ff2d78', '#ff7a00', '#ffd400', '#ff4d4d'],
  },
  {
    headerFont: "'Instrument Serif', serif",
    headerItalic: true,
    headerWeight: 400,
    headerColor: '#5b7bff',
    headerSize: 'clamp(34px,6vw,72px)',
    headerTracking: '-.02em',
    headerGlow: false,
    titleFont: "'Instrument Serif', serif",
    titleItalic: true,
    titleWeight: 400,
    titleSize: 27,
    titleTracking: 'normal',
    accents: ['#3d5aa8', '#b23a5e', '#3f8f5f', '#c98a2e', '#7c5cbf'],
  },
  {
    headerFont: "'Monoton', cursive",
    headerItalic: false,
    headerWeight: 400,
    headerColor: '#f2c14e',
    headerSize: 'clamp(20px,3.6vw,38px)',
    headerTracking: '.04em',
    headerGlow: true,
    titleFont: "'Bricolage Grotesque', sans-serif",
    titleItalic: false,
    titleWeight: 800,
    titleSize: 21,
    titleTracking: 'normal',
    accents: ['#8b5cf6', '#f2c14e', '#2bb3a3', '#e0446f'],
  },
  {
    headerFont: "'Caveat', cursive",
    headerItalic: false,
    headerWeight: 700,
    headerColor: '#d9a441',
    headerSize: 'clamp(40px,7.2vw,84px)',
    headerTracking: 'normal',
    headerGlow: false,
    titleFont: "'Caveat', cursive",
    titleItalic: false,
    titleWeight: 700,
    titleSize: 32,
    titleTracking: 'normal',
    accents: ['#d9a441', '#c1502e', '#7c9a3f', '#c96b8a'],
  },
];

type CardData = {
  title: string;
  by: string;
  note: string;
  color: string;
  rot: string;
  img?: string;
  titleFont?: string;
  titleItalic?: boolean;
  titleWeight?: number;
  titleSize?: number;
  titleTracking?: string;
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function CollageCard({ it }: { it: CardData }) {
  const [hovered, handlers] = useHover();
  const [imgOk, setImgOk] = useState(true);
  const hasImage = !!it.img && imgOk;
  const ink = hasImage ? '#fff' : '#0e0d12';
  const { r, g, b } = hexToRgb(it.color);
  const shade = (mix: number, alpha: number) => `rgba(${Math.round(r * mix)},${Math.round(g * mix)},${Math.round(b * mix)},${alpha})`;

  return (
    <div
      {...handlers}
      style={{
        position: 'relative',
        aspectRatio: '3 / 4',
        borderRadius: 5,
        overflow: 'hidden',
        background: it.color,
        transform: hovered ? 'rotate(0deg) translateY(-6px) scale(1.03)' : `rotate(${it.rot})`,
        boxShadow: `7px 9px 0 rgba(${r},${g},${b},.88)`,
        transition: 'transform .22s ease, box-shadow .25s ease',
      }}
    >
      {hasImage && (
        <img
          src={it.img}
          alt={it.title}
          onError={() => setImgOk(false)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform .45s ease',
          }}
        />
      )}
      {hasImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: shade(0.28, 0.55),
            opacity: hovered ? 1 : 0,
            transition: 'opacity .25s ease',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '16px 18px',
          background: hasImage
            ? `linear-gradient(to top, ${shade(0.22, hovered ? 0.94 : 0.86)} 0%, ${shade(0.4, hovered ? 0.72 : 0.36)} 48%, ${shade(0.55, hovered ? 0.32 : 0)} 78%)`
            : 'transparent',
          transition: 'background .25s ease',
        }}
      >
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: ink, opacity: 0.78 }}>{it.by}</div>
        <div
          style={{
            fontFamily: it.titleFont ?? "'Bricolage Grotesque', sans-serif",
            fontWeight: it.titleWeight ?? 800,
            fontStyle: it.titleItalic ? 'italic' : 'normal',
            fontSize: it.titleSize ?? 23,
            letterSpacing: it.titleTracking ?? 'normal',
            lineHeight: 1.08,
            marginTop: 8,
            color: ink,
          }}
        >
          {it.title}
        </div>
        <div
          style={{
            maxHeight: hovered ? 90 : 0,
            opacity: hovered ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height .28s ease, opacity .22s ease .04s',
          }}
        >
          <div style={{ fontFamily: "'Spectral', serif", fontStyle: 'italic', fontSize: 14.5, marginTop: 10, lineHeight: 1.4, color: hasImage ? 'rgba(255,255,255,.92)' : 'rgba(14,13,18,.82)' }}>
            {it.note}
          </div>
        </div>
      </div>
    </div>
  );
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function OtherView({ t }: OtherViewProps) {
  const cur = content.reading;
  const isMobile = useIsMobile();

  const [styleSeed, setStyleSeed] = useState(0);
  const [shuffleSpin, setShuffleSpin] = useState(false);
  const [titleBump, setTitleBump] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [gistClicks, setGistClicks] = useState(0);
  const [bonusRevealed, setBonusRevealed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const bumpTimer = useRef<number | undefined>(undefined);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  };

  // devtools nod — harmless, once per mount
  useEffect(() => {
    console.log('%cpsst. nice job opening devtools 👀', 'font-size:14px;font-weight:bold;color:#ff3b6b;');
    console.log('%cyou\'re the kind of person who reads the fine print. respect.', 'color:#888;');
  }, []);

  // konami code: ↑ ↑ ↓ ↓ ← → ← → b a
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          pos = 0;
          burstConfetti(150);
          showToast('🎉 konami code activated — party mode');
        }
      } else {
        pos = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // per-item accent + jitter, drawn from that item's own section palette
  // rather than one palette shared across the whole page
  const assignments = useMemo(() => {
    const out: { color: string; rot: string }[] = [];
    let flat = 0;
    cur.readingSections.forEach((rs, si) => {
      const style = SECTION_STYLES[si % SECTION_STYLES.length];
      rs.items.forEach((_, j) => {
        const color = styleSeed === 0 ? style.accents[j % style.accents.length] : style.accents[Math.floor(Math.random() * style.accents.length)];
        const rot = styleSeed === 0 ? READING_ROTS[flat % READING_ROTS.length] : READING_ROTS[Math.floor(Math.random() * READING_ROTS.length)];
        out.push({ color, rot });
        flat++;
      });
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleSeed, cur]);

  let k = 0;
  const sections = cur.readingSections.map((rs, si) => {
    const style = SECTION_STYLES[si % SECTION_STYLES.length];
    return {
      ...rs,
      style,
      items: rs.items.map((it) => {
        const a = assignments[k];
        k++;
        return {
          ...it,
          color: a.color,
          rot: a.rot,
          titleFont: style.titleFont,
          titleItalic: style.titleItalic,
          titleWeight: style.titleWeight,
          titleSize: style.titleSize,
          titleTracking: style.titleTracking,
        };
      }),
    };
  });

  const handleShuffle = () => {
    setStyleSeed((s) => s + 1);
    setShuffleSpin(true);
    window.setTimeout(() => setShuffleSpin(false), 500);
  };

  const handleTitleClick = () => {
    const next = titleClicks + 1;
    setTitleClicks(next);
    setTitleBump(true);
    if (bumpTimer.current) window.clearTimeout(bumpTimer.current);
    bumpTimer.current = window.setTimeout(() => setTitleBump(false), 260);
    if (next === 7) {
      burstConfetti();
      showToast('okay, you really love clicking that 👀');
    }
  };

  const handleGistClick = () => {
    if (bonusRevealed) return;
    const next = gistClicks + 1;
    setGistClicks(next);
    if (next >= 5) {
      setBonusRevealed(true);
      burstConfetti(60);
      showToast('🥚 you found the easter egg');
    }
  };

  return (
    <div style={{ animation: 'riseIn .5s ease both', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: isMobile ? '32px 18px 10px' : '52px 26px 12px' }}>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: t.accent,
            transform: 'rotate(-2deg)',
            display: 'inline-block',
            border: `2px solid ${t.accent}`,
            padding: '5px 12px',
          }}
        >
          off the clock …
        </div>
        <h1
          onClick={handleTitleClick}
          title="click me"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(46px,9.5vw,124px)',
            lineHeight: 0.88,
            color: t.fg,
            margin: '20px 0 0',
            letterSpacing: '-.03em',
            cursor: 'pointer',
            userSelect: 'none',
            width: 'fit-content',
            transform: titleBump ? 'scale(1.035) rotate(-1deg)' : 'none',
            transition: 'transform .22s cubic-bezier(.34,1.56,.64,1)',
          }}
        >
          Other <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontStyle: 'italic', color: t.accent }}>stuff</span> I love.
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', margin: '16px 0 14px' }}>
          <div
            onClick={handleGistClick}
            title="???"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: t.accent2,
              background: t.surface,
              border: `1px dashed ${t.accent2}`,
              transform: 'rotate(-1.5deg)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 11px',
              borderRadius: 4,
              cursor: bonusRevealed ? 'default' : 'pointer',
              userSelect: 'none',
            }}
          >
            <span style={{ display: 'inline-block', animation: 'wobble 2.4s ease-in-out infinite' }}>✳</span> the gist
          </div>
          <button
            onClick={handleShuffle}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 9,
              color: t.accent,
              background: t.surface,
              border: `1px dashed ${t.accent}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '7px 11px',
              borderRadius: 4,
              cursor: 'pointer',
              transform: shuffleSpin ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: 'transform .5s cubic-bezier(.34,1.56,.64,1)',
            }}
          >
            🎲 shuffle
          </button>
        </div>
        <p style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(17px,2vw,22px)', lineHeight: 1.5, color: t.muted, maxWidth: '52ch' }}>{cur.intro}</p>
      </div>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: isMobile ? '18px 18px 24px' : '24px 26px 30px' }}>
        {sections.map((rs, si) => (
          <div key={si} style={{ marginBottom: 52 }}>
            <h2
              style={{
                fontFamily: rs.style.headerFont,
                fontWeight: rs.style.headerWeight,
                fontStyle: rs.style.headerItalic ? 'italic' : 'normal',
                fontSize: rs.style.headerSize,
                letterSpacing: rs.style.headerTracking,
                color: rs.style.headerColor,
                textShadow: rs.style.headerGlow ? `0 0 12px ${rs.style.headerColor}, 0 0 28px ${rs.style.headerColor}88` : 'none',
                transform: 'rotate(-1deg)',
                margin: '0 0 26px',
                display: 'inline-block',
              }}
            >
              {rs.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(140px,1fr))' : 'repeat(auto-fill,minmax(232px,1fr))', gap: isMobile ? 14 : 26 }}>
              {rs.items.map((it, i) => (
                <CollageCard key={i} it={it} />
              ))}
            </div>
          </div>
        ))}

        {bonusRevealed && (
          <div style={{ marginBottom: 52, animation: 'riseIn .5s ease both' }}>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(32px,5.5vw,64px)',
                color: '#ff8fb0',
                transform: 'rotate(-1deg)',
                margin: '0 0 26px',
                letterSpacing: '-.02em',
                display: 'inline-block',
              }}
            >
              You weren't supposed to find this
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(auto-fill,minmax(140px,1fr))' : 'repeat(auto-fill,minmax(232px,1fr))', gap: isMobile ? 14 : 26 }}>
              <CollageCard
                it={{ title: 'Congrats, detective.', by: 'Easter egg', note: "That's all there is. Go pet a dog or something.", color: '#a855f7', rot: '-2deg' }}
              />
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 22,
            right: 22,
            zIndex: 200,
            background: '#0e0d12',
            color: '#fff',
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,.15)',
            boxShadow: '0 10px 30px rgba(0,0,0,.35)',
            animation: 'riseIn .3s ease both',
            maxWidth: 280,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
