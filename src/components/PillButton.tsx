import type { ReactNode } from 'react';
import { useHover } from '../hooks/useHover';

interface PillButtonProps {
  onClick: () => void;
  accent: string;
  border: string;
  fg: string;
  padding?: string;
  fontSize?: number;
  title?: string;
  children: ReactNode;
}

export function PillButton({ onClick, accent, border, fg, padding = '9px 16px', fontSize = 14, title, children }: PillButtonProps) {
  const [hovered, handlers] = useHover();
  return (
    <button
      {...handlers}
      onClick={onClick}
      title={title}
      style={{
        background: 'none',
        border: `1px solid ${hovered ? accent : border}`,
        color: hovered ? accent : fg,
        padding,
        borderRadius: 999,
        fontSize,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'border-color .2s ease, color .2s ease',
      }}
    >
      {children}
    </button>
  );
}
