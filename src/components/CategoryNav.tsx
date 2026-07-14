import type { CategoryMeta, Theme, ViewId } from '../data/theme';
import { PillButton } from './PillButton';
import { useIsMobile } from '../hooks/useMediaQuery';

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
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 10,
        gap: 16,
        padding: isMobile ? '12px 16px' : '15px 26px',
        background: t.navBg,
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.border}`,
      }}
    >
      <div
        onClick={onGoHome}
        style={{ order: 1, cursor: 'pointer', fontFamily: `${t.head}, sans-serif`, fontWeight: 700, fontSize: isMobile ? 14.5 : 16, whiteSpace: 'nowrap' }}
      >
        ← Aswath Suresh
      </div>
      <div
        style={{
          order: isMobile ? 3 : 2,
          display: 'flex',
          gap: 6,
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          justifyContent: isMobile ? 'flex-start' : 'center',
          flexBasis: isMobile ? '100%' : 'auto',
          overflowX: isMobile ? 'auto' : 'visible',
          WebkitOverflowScrolling: 'touch',
        }}
      >
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
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all .25s',
              }}
            >
              {p.name}
            </button>
          );
        })}
      </div>
      <div style={{ order: isMobile ? 2 : 3, display: 'flex', alignItems: 'center', gap: 8 }}>
        {!isMobile && (
          <PillButton onClick={onDownloadResume} accent={t.accent} border={t.border} fg={t.fg} padding="8px 14px" fontSize={13.5}>
            Résumé ↓
          </PillButton>
        )}
        <PillButton onClick={onOpenModal} accent={t.accent} border={t.border} fg={t.fg} padding="8px 14px" fontSize={13.5}>
          About
        </PillButton>
        <button onClick={onToggleMode} title="Toggle theme" style={{ background: 'none', border: `1px solid ${t.border}`, color: t.fg, width: 36, height: 36, borderRadius: 999, fontSize: 15, cursor: 'pointer', flexShrink: 0 }}>
          {modeIcon}
        </button>
      </div>
    </div>
  );
}
