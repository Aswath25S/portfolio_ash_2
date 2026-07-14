const COLORS = ['#ff3b6b', '#2d5bff', '#ffcf2e', '#19c37d', '#a855f7'];

export function burstConfetti(count = 90) {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);

  const fallDistance = window.innerHeight + 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = 6 + Math.random() * 7;
    const left = Math.random() * 100;
    piece.style.cssText = `position:absolute; top:-24px; left:${left}%; width:${size}px; height:${size * 0.42}px; background:${color}; border-radius:2px;`;
    container.appendChild(piece);

    const duration = 1700 + Math.random() * 1500;
    const drift = (Math.random() - 0.5) * 260;
    const rotate = (360 + Math.random() * 720) * (Math.random() < 0.5 ? -1 : 1);

    piece.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${drift}px, ${fallDistance}px) rotate(${rotate}deg)`, opacity: 1, offset: 0.85 },
        { transform: `translate(${drift}px, ${fallDistance}px) rotate(${rotate}deg)`, opacity: 0 },
      ],
      { duration, easing: 'cubic-bezier(.25,.46,.45,.94)', fill: 'forwards' },
    );
  }

  setTimeout(() => container.remove(), 3400);
}
