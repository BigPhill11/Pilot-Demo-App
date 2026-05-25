import React from 'react';

/** Soft ground shadow under isometric buildings */
export const BuildingShadow: React.FC<{ rx?: number; ry?: number }> = ({
  rx = 40,
  ry = 18,
}) => (
  <ellipse cx={0} cy={4} rx={rx} ry={ry} fill="rgba(0,0,0,0.22)" />
);

/** Small glowing window */
export const WindowGlow: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({
  x,
  y,
  w = 6,
  h = 5,
}) => (
  <>
    <rect x={x} y={y} width={w} height={h} fill="#fef9c3" stroke="#a16207" strokeWidth={0.5} />
    <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} fill="#fde68a" opacity={0.85} />
  </>
);
