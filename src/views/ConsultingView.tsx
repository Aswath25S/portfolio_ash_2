import { content } from '../data/content';
import type { Theme } from '../data/theme';

interface ConsultingViewProps {
  t: Theme;
}

export function ConsultingView({ t }: ConsultingViewProps) {
  const cur = content.consulting;
  const roles = cur.roles.map((r, i) => ({ ...r, no: String(i + 1).padStart(2, '0') }));

  return (
    <div style={{ animation: 'riseIn .5s ease both' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '58px 28px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${t.accent}`, paddingBottom: 14 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: t.accent }}>Executive Summary</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: t.muted }}>Prepared by A. Suresh</div>
        </div>
        <h1 style={{ fontFamily: "'Spectral', serif", fontWeight: 600, fontSize: 'clamp(34px,5.2vw,66px)', lineHeight: 1.05, color: t.fg, margin: '28px 0 0', maxWidth: '18ch', letterSpacing: '-.01em' }}>
          {cur.title}
        </h1>
        <p style={{ maxWidth: '62ch', fontSize: 17.5, lineHeight: 1.6, color: t.muted, marginTop: 20 }}>{cur.intro}</p>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '34px 28px 8px' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2, marginBottom: 16 }}>
          Exhibit A — Impact at a glance
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', borderTop: `1px solid ${t.border}`, borderLeft: `1px solid ${t.border}` }}>
          {cur.metrics.map((m, i) => (
            <div key={i} style={{ padding: '26px 24px', borderRight: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
              <div style={{ fontFamily: "'Spectral', serif", fontSize: 'clamp(30px,3.6vw,48px)', fontWeight: 600, color: t.accent, lineHeight: 1 }}>{m.value}</div>
              <div style={{ width: 36, height: 3, background: t.accent2, margin: '14px 0' }} />
              <div style={{ fontSize: 13, color: t.muted, lineHeight: 1.45 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '44px 28px 10px' }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2 }}>Selected Engagements</div>
        <div style={{ marginTop: 8 }}>
          {roles.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 26, borderTop: `1px solid ${t.border}`, padding: '32px 0' }}>
              <div style={{ fontFamily: "'Spectral', serif", fontSize: 42, fontWeight: 600, color: t.accent, lineHeight: 0.9 }}>{r.no}</div>
              <div>
                <div style={{ fontFamily: "'Spectral', serif", fontSize: 24, fontWeight: 600, color: t.fg, lineHeight: 1.15 }}>{r.org}</div>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontFamily: "'Space Mono', monospace", fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '.08em', color: t.muted, marginTop: 8 }}>
                  <span style={{ color: t.accent }}>{r.role}</span>
                  <span>{r.dates}</span>
                  <span>{r.place}</span>
                </div>
                <div style={{ fontSize: 14, color: t.muted, marginTop: 6, fontStyle: 'italic' }}>{r.orgDesc}</div>
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {r.points.map((pt, j) => (
                    <div key={j} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 10, fontSize: 15, lineHeight: 1.55, color: t.fg }}>
                      <span style={{ color: t.accent2, fontWeight: 700 }}>▸</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
