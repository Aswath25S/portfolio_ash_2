import type { Theme } from '../data/theme';

interface CategoryFooterProps {
  t: Theme;
}

export function CategoryFooter({ t }: CategoryFooterProps) {
  return (
    <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 40, padding: '52px 28px 72px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 34 }}>
        <div>
          <div style={{ fontFamily: `${t.mono}, monospace`, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '.16em', color: t.muted, marginBottom: 14 }}>Education</div>
          <div style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 600, fontSize: 16 }}>Johns Hopkins University</div>
          <div style={{ fontSize: 14, color: t.muted, marginTop: 3 }}>MS, Data Science · GPA 3.96 · 2026</div>
          <div style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 600, fontSize: 16, marginTop: 14 }}>IIT Bombay</div>
          <div style={{ fontSize: 14, color: t.muted, marginTop: 3 }}>B.Tech, Aerospace Engineering · 2022</div>
        </div>
        <div>
          <div style={{ fontFamily: `${t.mono}, monospace`, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '.16em', color: t.muted, marginBottom: 14 }}>Get in touch</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 15 }}>
            <a href="mailto:aswathsureshjhu@gmail.com" style={{ color: t.accent, textDecoration: 'none' }}>aswathsureshjhu@gmail.com</a>
            <a href="tel:+14104937355" style={{ color: t.fg, textDecoration: 'none' }}>+1 (410) 493-7355</a>
            <a href="https://www.linkedin.com/in/aswathsuresh25" target="_blank" rel="noreferrer" style={{ color: t.fg, textDecoration: 'none' }}>
              linkedin.com/in/aswathsuresh25
            </a>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: `${t.mono}, monospace`, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '.16em', color: t.muted, marginBottom: 14 }}>Also</div>
          <div style={{ fontSize: 14.5, color: t.fg, lineHeight: 1.5 }}>
            Semi-finalist, AstraZeneca National Healthcare Case Competition. Occasional stand-up comedian.
          </div>
        </div>
      </div>
    </div>
  );
}
