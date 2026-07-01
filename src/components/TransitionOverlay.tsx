interface TransitionOverlayProps {
  active: boolean;
  color: string;
  fg: string;
  label: string;
  num: string;
  font: string;
}

export function TransitionOverlay({ active, color, fg, label, num, font }: TransitionOverlayProps) {
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
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Space Grotesk', monospace", fontSize: 13, letterSpacing: '.24em', textTransform: 'uppercase', opacity: 0.6 }}>{num}</div>
        <div style={{ fontSize: 'clamp(40px,8vw,110px)', fontWeight: 800, letterSpacing: '-.02em', marginTop: 10 }}>{label}</div>
      </div>
    </div>
  );
}
