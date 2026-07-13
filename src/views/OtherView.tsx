import { content, READING_PALETTE, READING_ROTS } from '../data/content';
import type { Theme } from '../data/theme';
import { useHover } from '../hooks/useHover';

interface OtherViewProps {
  t: Theme;
}

function CollageCard({ it }: { it: { title: string; by: string; note: string; color: string; rot: string } }) {
  const [hovered, handlers] = useHover();
  return (
    <div
      {...handlers}
      style={{
        background: it.color,
        color: '#0e0d12',
        padding: '22px 20px',
        borderRadius: 5,
        transform: hovered ? 'rotate(0deg) translateY(-6px) scale(1.03)' : `rotate(${it.rot})`,
        boxShadow: '7px 9px 0 rgba(0,0,0,.28)',
        transition: 'transform .22s ease',
      }}
    >
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.72 }}>{it.by}</div>
      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 23, lineHeight: 1.04, marginTop: 9 }}>{it.title}</div>
      <div style={{ fontFamily: "'Spectral', serif", fontStyle: 'italic', fontSize: 14.5, marginTop: 14, lineHeight: 1.4 }}>{it.note}</div>
    </div>
  );
}

export function OtherView({ t }: OtherViewProps) {
  const cur = content.reading;
  let k = 0;
  const sections = cur.readingSections.map((rs) => ({
    ...rs,
    items: rs.items.map((it) => {
      const o = { ...it, color: READING_PALETTE[k % READING_PALETTE.length], rot: READING_ROTS[k % READING_ROTS.length] };
      k++;
      return o;
    }),
  }));
  const sectionColors = ['#ff3b6b', '#2d5bff', '#19c37d'];

  return (
    <div style={{ animation: 'riseIn .5s ease both', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '52px 26px 12px' }}>
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
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(46px,9.5vw,124px)', lineHeight: 0.88, color: t.fg, margin: '20px 0 0', letterSpacing: '-.03em' }}>
          Other <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontStyle: 'italic', color: t.accent }}>stuff</span> I love.
        </h1>
        <div
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
            margin: '16px 0 14px',
          }}
        >
          <span>✳</span> the gist
        </div>
        <p style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(17px,2vw,22px)', lineHeight: 1.5, color: t.muted, maxWidth: '52ch' }}>{cur.intro}</p>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12.5, color: t.muted, border: `1px dashed ${t.border}`, padding: '11px 15px', borderRadius: 10, marginTop: 26, transform: 'rotate(.4deg)', display: 'inline-block' }}>
          // sample list — swap these for your own picks anytime
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '24px 26px 30px' }}>
        {sections.map((rs, si) => (
          <div key={si} style={{ marginBottom: 52 }}>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(32px,5.5vw,64px)',
                color: sectionColors[si % sectionColors.length],
                transform: 'rotate(-1deg)',
                margin: '0 0 26px',
                letterSpacing: '-.02em',
                display: 'inline-block',
              }}
            >
              {rs.name}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(232px,1fr))', gap: 26 }}>
              {rs.items.map((it, i) => (
                <CollageCard key={i} it={it} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
