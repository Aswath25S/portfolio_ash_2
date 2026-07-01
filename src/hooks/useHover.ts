import { useState } from 'react';

export function useHover() {
  const [hovered, setHovered] = useState(false);
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
  return [hovered, handlers] as const;
}
