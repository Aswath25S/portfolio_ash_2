import { Doodle, type DoodleId } from '../views/LandingView';
import type { Mode } from '../data/theme';
import { useIsMobile } from '../hooks/useMediaQuery';

interface TransitionOverlayProps {
  active: boolean;
  color: string;
  fg: string;
  label: string;
  num: string;
  font: string;
  isHome?: boolean;
  doodleId?: DoodleId;
  mode?: Mode;
}

export function TransitionOverlay({ active, color, fg, label, num, font, isHome, doodleId, mode = 'dark' }: TransitionOverlayProps) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: active ? 'auto' : 'none',
        opacity: active ? 1 : 0,
        background: color,
        color: fg,
        transition: 'opacity .42s ease',
        fontFamily: `${font}, sans-serif`,
      }}
    >
      {isHome && doodleId ? (
        // Heading back to the homepage should already show the name "in
        // costume" rather than a plain wordmark that then gets swapped for
        // the doodle a beat later once LandingView mounts.
        <div style={{ transform: `scale(${isMobile ? 1.7 : 3.2})` }}>
          <Doodle id={doodleId} mode={mode} />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 13, letterSpacing: '.24em', textTransform: 'uppercase', opacity: 0.6 }}>{num}</div>
          <div style={{ fontSize: 'clamp(40px,8vw,110px)', fontWeight: 800, letterSpacing: '-.02em', marginTop: 10 }}>{label}</div>
        </div>
      )}
    </div>
  );
}
