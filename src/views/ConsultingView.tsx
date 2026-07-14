import { content } from '../data/content';
import type { Theme } from '../data/theme';
import { useIsMobile } from '../hooks/useMediaQuery';

interface ConsultingViewProps {
  t: Theme;
}

export function ConsultingView({ t }: ConsultingViewProps) {
  const cur = content.consulting;
  const roles = cur.roles.map((r, i) => ({ ...r, no: String(i + 1).padStart(2, '0') }));
  const isMobile = useIsMobile();

  return (
    <div style={{ animation: 'riseIn .5s ease both' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: isMobile ? '36px 20px 10px' : '58px 28px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, borderBottom: `2px solid ${t.accent}`, paddingBottom: 14 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: t.accent }}>Executive Summary</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: t.muted }}>Prepared by A. Suresh</div>
        </div>
        <h1 style={{ fontFamily: "'Spectral', serif", fontWeight: 600, fontSize: 'clamp(34px,5.2vw,66px)', lineHeight: 1.05, color: t.fg, margin: '28px 0 0', maxWidth: '18ch', letterSpacing: '-.01em' }}>
          {cur.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '22px 0 16px' }}>
          <span style={{ width: 34, height: 2, background: t.accent2 }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2 }}>In Brief</span>
        </div>
        <p style={{ maxWidth: '62ch', fontSize: 17.5, lineHeight: 1.6, color: t.muted }}>{cur.intro}</p>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: isMobile ? '30px 20px 10px' : '44px 28px 10px' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2 }}>Selected Engagements</div>
        <div style={{ marginTop: 8 }}>
          {roles.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '72px 1fr',
                gap: isMobile ? 10 : 26,
                borderTop: `1px solid ${t.border}`,
                padding: isMobile ? '22px 0' : '32px 0',
              }}
            >
              <div style={{ fontFamily: "'Spectral', serif", fontSize: isMobile ? 28 : 42, fontWeight: 600, color: t.accent, lineHeight: 0.9 }}>{r.no}</div>
              <div>
                <div style={{ fontFamily: "'Spectral', serif", fontSize: 24, fontWeight: 600, color: t.fg, lineHeight: 1.15 }}>{r.org}</div>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: "'Space Mono', monospace", fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '.08em', color: t.muted, marginTop: 8 }}>
                  <span style={{ color: t.accent }}>{r.role}</span>
                  <span>{r.dates}</span>
                  <span>{r.place}</span>
                </div>
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '16px 1fr', gap: 10, fontSize: 15, lineHeight: 1.55, color: t.fg }}>
                  <span style={{ color: t.accent2, fontWeight: 700 }}>▸</span>
                  <span>{r.summary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
