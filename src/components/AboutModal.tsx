import type { Theme } from '../data/theme';

interface AboutModalProps {
  t: Theme;
  onClose: () => void;
  onDownloadResume: () => void;
}

export function AboutModal({ t, onClose, onDownloadResume }: AboutModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(0,0,0,.55)',
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surface,
          color: t.fg,
          border: `1px solid ${t.border}`,
          borderRadius: 20,
          maxWidth: 560,
          width: '100%',
          padding: 38,
          position: 'relative',
          maxHeight: '88vh',
          overflow: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: `1px solid ${t.border}`, color: t.fg, width: 34, height: 34, borderRadius: 999, cursor: 'pointer', fontSize: 16 }}
        >
          ✕
        </button>
        <div style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 800, fontSize: 30, letterSpacing: '-.01em' }}>Aswath Suresh</div>
        <div style={{ color: t.accent, fontSize: 15, marginTop: 4, fontWeight: 600 }}>Jack of many trades, master of one degree.</div>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: t.fg, margin: '20px 0 0' }}>
          Recent MS Data Science grad from Johns Hopkins (B.Tech Aerospace, IIT Bombay). I ship AI products as a founding engineer, size markets as a strategy consultant, lead some of Hopkins' largest student orgs — and do stand-up on the side.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 24 }}>
          <a href="mailto:aswathsureshjhu@gmail.com" style={{ color: t.fg, textDecoration: 'none', border: `1px solid ${t.border}`, padding: '12px 16px', borderRadius: 12, fontSize: 15 }}>
            ✉ aswathsureshjhu@gmail.com
          </a>
          <a href="tel:+14104937355" style={{ color: t.fg, textDecoration: 'none', border: `1px solid ${t.border}`, padding: '12px 16px', borderRadius: 12, fontSize: 15 }}>
            ☎ +1 (410) 493-7355
          </a>
          <a
            href="https://www.linkedin.com/in/aswathsuresh25"
            target="_blank"
            rel="noreferrer"
            style={{ color: t.fg, textDecoration: 'none', border: `1px solid ${t.border}`, padding: '12px 16px', borderRadius: 12, fontSize: 15 }}
          >
            in linkedin.com/in/aswathsuresh25
          </a>
        </div>
        <button
          onClick={onDownloadResume}
          style={{ marginTop: 16, width: '100%', background: t.accent, color: t.accentText, border: 'none', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
        >
          Download Résumé ↓
        </button>
      </div>
    </div>
  );
}
