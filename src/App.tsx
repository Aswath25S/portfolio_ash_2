import { useEffect, useRef, useState } from 'react';
import { CategoryNav } from './components/CategoryNav';
import { TransitionOverlay } from './components/TransitionOverlay';
import { AboutModal } from './components/AboutModal';
import { CategoryFooter } from './components/CategoryFooter';
import { LandingView, DOODLE_IDS } from './views/LandingView';
import { ShapeshifterLanding } from './views/ShapeshifterLanding';
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
  const [landingVariant, setLandingVariant] = useState<'shapeshifter' | 'classic'>('shapeshifter');
  const [modalOpen, setModalOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlay, setOverlay] = useState({ color: '#000', fg: '#fff', label: '', num: '', font: "'Bricolage Grotesque'", isHome: false });
  const timeoutRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lives here (not inside LandingView) so the exact same doodle the header
  // is about to show can also play in the full-screen transition splash
  // while navigating back home — see TransitionOverlay's isHome branch.
  const [doodleIdx, setDoodleIdx] = useState(() => Math.floor(Math.random() * DOODLE_IDS.length));
  const doodleTimerRef = useRef<number | null>(null);

  function restartDoodleTimer() {
    if (doodleTimerRef.current) window.clearInterval(doodleTimerRef.current);
    doodleTimerRef.current = window.setInterval(() => setDoodleIdx((i) => (i + 1) % DOODLE_IDS.length), 4000);
  }

  useEffect(() => {
    restartDoodleTimer();
    return () => {
      if (doodleTimerRef.current) window.clearInterval(doodleTimerRef.current);
    };
  }, []);

  function advanceDoodle() {
    setDoodleIdx((i) => (i + 1) % DOODLE_IDS.length);
    restartDoodleTimer();
  }

  useEffect(() => {
    let m: string | null = null;
    try {
      m = localStorage.getItem('asw_mode');
    } catch {
      /* ignore */
    }
    if (m === 'dark' || m === 'light') setMode(m);
    let lv: string | null = null;
    try {
      lv = localStorage.getItem('asw_landing_variant');
    } catch {
      /* ignore */
    }
    if (lv === 'shapeshifter' || lv === 'classic') setLandingVariant(lv);
  }, []);

  function setLandingVariantPersisted(next: 'shapeshifter' | 'classic') {
    try {
      localStorage.setItem('asw_landing_variant', next);
    } catch {
      /* ignore */
    }
    setLandingVariant(next);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  // Tag the entry the app loaded on as "landing" so that pressing back from
  // a category view (which pushes its own entry below) always lands here
  // instead of exiting the SPA to whatever page opened it.
  useEffect(() => {
    try {
      history.replaceState({ view: 'landing' }, '');
    } catch {
      /* ignore */
    }
  }, []);

  const isLanding = view === 'landing';
  const t = themeFor(isLanding ? 'landing' : view, mode, CONFIG.techAccent);
  // The Shapeshifter landing is a fixed-dark design (not part of the
  // dark/light theme system) — its own background needs to win over
  // whatever `mode` would otherwise resolve to while it's showing.
  const showShapeshifter = isLanding && landingVariant === 'shapeshifter';
  const bg = showShapeshifter ? '#0e0f12' : t.bg;

  // html/body have no background of their own, so if a browser ever shows a
  // sliver beyond the app's own div (toolbar-driven viewport resize,
  // rubber-band scroll, etc.) it reveals the theme color instead of a
  // jarring default gray/white.
  useEffect(() => {
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
  }, [bg]);

  // CSS `dvh` should equal window.innerHeight, but some browsers compute it
  // inconsistently (privacy-hardened Chromium forks in particular perturb
  // viewport-derived metrics for fingerprinting resistance), leaving a gap
  // between the app's height and the real viewport. Measuring innerHeight
  // directly and exposing it as a custom property sidesteps that.
  useEffect(() => {
    function setAppHeight() {
      document.documentElement.style.setProperty('--app-vh', `${window.innerHeight}px`);
    }
    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const activeCats = CONFIG.showReadingList ? ALL_CATS : ALL_CATS.filter((id) => id !== 'reading');
  const cats = activeCats.map((id) => META[id]);

  function transitionTo(next: ViewId, pushHistory = true) {
    if (next === view) return;
    const tt = themeFor(next === 'landing' ? 'landing' : next, mode, CONFIG.techAccent);
    const meta = next === 'landing' ? null : META[next as Exclude<ViewId, 'landing'>];
    setOverlay({
      color: tt.bg,
      fg: tt.accent,
      label: next === 'landing' ? 'Aswath Suresh' : meta!.name,
      num: next === 'landing' ? '' : meta!.num,
      font: tt.head,
      isHome: next === 'landing',
    });
    setOverlayActive(true);
    if (pushHistory) {
      try {
        history.pushState({ view: next }, '');
      } catch {
        /* ignore */
      }
    }
    timeoutRef.current = window.setTimeout(() => {
      setView(next);
      setOverlayActive(false);
      scrollRef.current?.scrollTo(0, 0);
    }, 430);
  }

  // Pressing the browser's back button from a category view should return
  // to the home page within the app, not exit the SPA entirely — so every
  // in-app navigation above gets its own history entry, and here we just
  // sync the view to whatever entry the browser landed on (never pushing a
  // new entry ourselves, since that navigation already happened natively).
  useEffect(() => {
    function onPopState(e: PopStateEvent) {
      const target = (e.state?.view as ViewId | undefined) ?? 'landing';
      transitionTo(target, false);
    }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [view, mode]);

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
    <>
      {/* Fixed, viewport-sized layer for the theme background — kept off the
          scrollable content div below because that div's paintable area is
          much taller than the viewport, and animating background-color on
          such a tall element causes visible tile-rasterization seams during
          the transition. A fixed layer is always exactly one viewport tall,
          so it repaints as a single tile. */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          background: bg,
          transition: 'background .55s ease',
          zIndex: -1,
        }}
      />
      <div
        ref={scrollRef}
        style={{
          height: 'var(--app-vh, 100dvh)',
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehaviorY: 'none',
          color: t.fg,
          fontFamily: `${t.body}, system-ui, sans-serif`,
          transition: 'color .55s ease',
          position: 'relative',
        }}
      >
        {isLanding ? (
          showShapeshifter ? (
            <ShapeshifterLanding
              onEnter={transitionTo}
              onDownloadResume={downloadResume}
              onSwitchToClassic={() => setLandingVariantPersisted('classic')}
            />
          ) : (
            <LandingView
              t={t}
              mode={mode}
              cats={cats}
              onEnter={transitionTo}
              onOpenModal={() => setModalOpen(true)}
              onDownloadResume={downloadResume}
              onToggleMode={toggleMode}
              modeIcon={modeIcon}
              doodleId={DOODLE_IDS[doodleIdx]}
              onDoodleClick={advanceDoodle}
              onSwitchToShapeshifter={() => setLandingVariantPersisted('shapeshifter')}
            />
          )
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

        <TransitionOverlay
          active={overlayActive}
          color={overlay.color}
          fg={overlay.fg}
          label={overlay.label}
          num={overlay.num}
          font={overlay.font}
          isHome={overlay.isHome}
          doodleId={DOODLE_IDS[doodleIdx]}
          mode={mode}
        />
      </div>
    </>
  );
}

export default App;
