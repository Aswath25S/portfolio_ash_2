import type { CategoryMeta, Theme, ViewId } from '../data/theme';
import { useHover } from '../hooks/useHover';

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
        <div style={{ fontSize: 'clamp(26px,2.7vw,42px)', fontWeight: 700, marginTop: 10, lineHeight: 1.02, letterSpacing: '-.01em' }}>{p.name}</div>
      </div>
      <div>
        <div style={{ fontSize: 15, opacity: 0.82, lineHeight: 1.45, marginBottom: 20, maxWidth: '34ch' }}>{p.tagline}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 600, padding: '9px 16px', border: '1px solid currentColor', borderRadius: 999, opacity: 0.9 }}>
          Enter <span>→</span>
        </div>
      </div>
    </div>
  );
}

export function LandingView({ t, cats, onEnter, onOpenModal, onDownloadResume, onToggleMode, modeIcon }: LandingViewProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '26px 34px', zIndex: 5 }}>
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

      <div style={{ padding: '46px 34px 26px', maxWidth: 1200 }}>
        <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 14, letterSpacing: '.18em', textTransform: 'uppercase', color: t.accent2 }}>
          Recent MS Data Science grad · Johns Hopkins
        </div>
        <h1 style={{ fontFamily: `${t.head}, sans-serif`, fontWeight: 800, fontSize: 'clamp(38px,6.4vw,92px)', lineHeight: 0.98, letterSpacing: '-.02em', margin: '20px 0 0', maxWidth: '15ch' }}>
          Jack of many trades, master of one degree.
        </h1>
        <p style={{ fontSize: 'clamp(16px,1.7vw,20px)', color: t.muted, maxWidth: '60ch', margin: '22px 0 0', lineHeight: 1.5 }}>
          Pick a world. The whole site becomes it.{' '}
          <span style={{ opacity: 0.7 }}>Tech, consulting, leadership, and the other stuff I love — each with its own look, layout, and story.</span>
        </p>
      </div>

      <div style={{ flex: '1 1 auto', display: 'flex', gap: 14, padding: '22px 20px 26px', minHeight: '60vh' }}>
        {cats.map((p) => (
          <LandingPanel key={p.id} p={p} onEnter={onEnter} />
        ))}
      </div>
    </div>
  );
}
