import type { CategoryMeta, Theme, ViewId } from '../data/theme';

interface CategoryNavProps {
  t: Theme;
  cats: CategoryMeta[];
  activeView: ViewId;
  onGoHome: () => void;
  onEnter: (id: ViewId) => void;
  onOpenModal: () => void;
  onDownloadResume: () => void;
  onToggleMode: () => void;
  modeIcon: string;
}

export function CategoryNav({ t, cats, activeView, onGoHome, onEnter, onOpenModal, onDownloadResume, onToggleMode, modeIcon }: CategoryNavProps) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        padding: '15px 26px',
        background: t.navBg,
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div onClick={onGoHome} style={{ cursor: 'pointer', fontFamily: `${t.head}, sans-serif`, fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap' }}>
        ← Aswath Suresh
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {cats.map((p) => {
          const active = p.id === activeView;
          return (
            <button
              key={p.id}
              onClick={() => onEnter(p.id)}
              style={{
                background: active ? t.accent : 'transparent',
                color: active ? t.accentText : t.fg,
                border: `1px solid ${active ? t.accent : t.border}`,
                padding: '8px 15px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .25s',
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onDownloadResume} style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, padding: '8px 14px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Résumé ↓
        </button>
        <button onClick={onOpenModal} style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, padding: '8px 14px', borderRadius: 999, fontSize: 13.5, cursor: 'pointer' }}>
          About
        </button>
        <button onClick={onToggleMode} title="Toggle theme" style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, width: 36, height: 36, borderRadius: 999, fontSize: 15, cursor: 'pointer' }}>
          {modeIcon}
        </button>
      </div>
    </div>
  );
}
