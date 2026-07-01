import { useEffect, useRef, useState } from 'react';
import { CategoryNav } from './components/CategoryNav';
import { TransitionOverlay } from './components/TransitionOverlay';
import { AboutModal } from './components/AboutModal';
import { CategoryFooter } from './components/CategoryFooter';
import { LandingView } from './views/LandingView';
import { TechView } from './views/TechView';
import { ConsultingView } from './views/ConsultingView';
import { LeadershipView } from './views/LeadershipView';
import { OtherView } from './views/OtherView';
import { META, themeFor, type Mode, type ViewId } from './data/theme';
import { downloadResume } from './utils/resume';

// Top-level configuration (mirrors the design's exposed props).
const CONFIG = {
  defaultMode: 'dark' as Mode,
  showReadingList: true,
  techAccent: '#39ff14',
};

const ALL_CATS: Exclude<ViewId, 'landing'>[] = ['tech', 'consulting', 'leadership', 'reading'];

function App() {
  const [view, setView] = useState<ViewId>('landing');
  const [mode, setMode] = useState<Mode>(CONFIG.defaultMode);
  const [modalOpen, setModalOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlay, setOverlay] = useState({ color: '#000', fg: '#fff', label: '', num: '', font: "'Bricolage Grotesque'" });
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let m: string | null = null;
    try {
      m = localStorage.getItem('asw_mode');
    } catch {
      /* ignore */
    }
    if (m === 'dark' || m === 'light') setMode(m);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const isLanding = view === 'landing';
  const t = themeFor(isLanding ? 'landing' : view, mode, CONFIG.techAccent);

  const activeCats = CONFIG.showReadingList ? ALL_CATS : ALL_CATS.filter((id) => id !== 'reading');
  const cats = activeCats.map((id) => META[id]);

  function transitionTo(next: ViewId) {
    if (next === view) return;
    const tt = themeFor(next === 'landing' ? 'landing' : next, mode, CONFIG.techAccent);
    const meta = next === 'landing' ? null : META[next as Exclude<ViewId, 'landing'>];
    setOverlay({
      color: tt.bg,
      fg: tt.accent,
      label: next === 'landing' ? 'Aswath Suresh' : meta!.name,
      num: next === 'landing' ? '' : meta!.num,
      font: tt.head,
    });
    setOverlayActive(true);
    timeoutRef.current = window.setTimeout(() => {
      setView(next);
      setOverlayActive(false);
      try {
        window.scrollTo(0, 0);
      } catch {
        /* ignore */
      }
    }, 430);
  }

  function toggleMode() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('asw_mode', next);
    } catch {
      /* ignore */
    }
    setMode(next);
  }

  const modeIcon = mode === 'dark' ? '☀' : '☾';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: t.bg,
        color: t.fg,
        fontFamily: `${t.body}, system-ui, sans-serif`,
        transition: 'background .55s ease, color .55s ease',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {isLanding ? (
        <LandingView
          t={t}
          cats={cats}
          onEnter={transitionTo}
          onOpenModal={() => setModalOpen(true)}
          onDownloadResume={downloadResume}
          onToggleMode={toggleMode}
          modeIcon={modeIcon}
        />
      ) : (
        <>
          <CategoryNav
            t={t}
            cats={cats}
            activeView={view}
            onGoHome={() => transitionTo('landing')}
            onEnter={transitionTo}
            onOpenModal={() => setModalOpen(true)}
            onDownloadResume={downloadResume}
            onToggleMode={toggleMode}
            modeIcon={modeIcon}
          />
          {view === 'tech' && <TechView t={t} />}
          {view === 'consulting' && <ConsultingView t={t} />}
          {view === 'leadership' && <LeadershipView t={t} />}
          {view === 'reading' && <OtherView t={t} />}
          <CategoryFooter t={t} />
        </>
      )}

      {modalOpen && <AboutModal t={t} onClose={() => setModalOpen(false)} onDownloadResume={downloadResume} />}

      <TransitionOverlay active={overlayActive} color={overlay.color} fg={overlay.fg} label={overlay.label} num={overlay.num} font={overlay.font} />
    </div>
  );
}

export default App;
