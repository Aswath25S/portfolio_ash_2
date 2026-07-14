import { content, LEADERSHIP_ROMAN } from '../data/content';
import type { Theme } from '../data/theme';

interface LeadershipViewProps {
  t: Theme;
}

export function LeadershipView({ t }: LeadershipViewProps) {
  const cur = content.leadership;
  const roles = cur.roles.map((r, i) => ({ ...r, no: LEADERSHIP_ROMAN[i % LEADERSHIP_ROMAN.length] }));

  return (
    <div style={{ animation: 'riseIn .5s ease both' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 30px 8px' }}>
        <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 12, letterSpacing: '.26em', textTransform: 'uppercase', color: t.accent, display: 'flex', gap: 14, alignItems: 'center' }}>
          <span>The Leadership Issue</span>
          <span style={{ flex: 1, height: 1, background: t.border }} />
          <span style={{ color: t.muted }}>Vol. 04 · 2026</span>
        </div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(32px,6vw,76px)', lineHeight: 0.98, color: t.fg, margin: '22px 0 0', letterSpacing: '-.01em', maxWidth: '18ch' }}>
          {cur.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 18px' }}>
          <span style={{ width: 40, height: 1, background: t.accent }} />
          <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: t.accent }}>The Brief</span>
          <span style={{ flex: 1, maxWidth: 40, height: 1, background: t.border }} />
        </div>
        <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,25px)', lineHeight: 1.5, color: t.muted, maxWidth: '58ch' }}>
          {cur.intro}
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 30px 10px' }}>
        {roles.map((r, i) => (
          <div key={i} style={{ borderTop: `1px solid ${t.border}`, padding: '36px 0', display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 38 }}>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 56, color: t.accent, lineHeight: 0.85 }}>{r.no}</div>
              <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: t.muted, marginTop: 14 }}>{r.dates}</div>
              <div style={{ fontFamily: "'Work Sans', sans-serif", fontSize: 12, color: t.muted, marginTop: 4 }}>{r.place}</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px,3.4vw,40px)', color: t.fg, lineHeight: 1.08 }}>{r.role}</div>
              <div style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: 17, color: t.accent, marginTop: 6 }}>{r.org}</div>
              <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 14, color: t.muted, marginTop: 3 }}>{r.orgDesc}</div>
              <div style={{ fontFamily: "'Newsreader', serif", marginTop: 18, fontSize: 16, lineHeight: 1.62, color: t.fg }}>
                <p style={{ margin: 0 }}>{r.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
