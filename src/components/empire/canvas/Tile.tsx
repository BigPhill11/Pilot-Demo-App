import React, { useMemo, useRef } from 'react';
import { empireTerrainImageSrc } from '../lib/empire-terrain-assets';
import { TILE_HEIGHT, TILE_WIDTH, type TerrainType } from '../lib/grid';

interface TileProps {
  hiRes?: boolean;
  x: number;
  y: number;
  screenX: number;
  screenY: number;
  terrain: TerrainType;
  isSelected: boolean;
  isOccupied: boolean;
  isBuildable: boolean;
  isGhostValid?: boolean;
  isGhostInvalid?: boolean;
  onClick: () => void;
  onHover: () => void;
}

const TAP_MOVE_THRESHOLD_PX = 14;

const Tile: React.FC<TileProps> = ({
  hiRes = false, x, y, screenX, screenY, terrain, isSelected, isBuildable,
  isGhostValid, isGhostInvalid, onClick, onHover,
}) => {
  const pointerDown = useRef<{ x: number; y: number } | null>(null);
  const points = useMemo(() => {
    const halfWidth = TILE_WIDTH / 2;
    const halfHeight = TILE_HEIGHT / 2;
    return `${screenX},${screenY - halfHeight} ${screenX + halfWidth},${screenY} ${screenX},${screenY + halfHeight} ${screenX - halfWidth},${screenY}`;
  }, [screenX, screenY]);
  const fill = isGhostValid ? 'rgba(74, 222, 128, 0.5)' :
    isGhostInvalid ? 'rgba(248, 113, 113, 0.5)' :
      isSelected ? 'rgba(251, 191, 36, 0.18)' : 'transparent';
  const stroke = isGhostValid ? '#22c55e' : isGhostInvalid ? '#ef4444' :
    isSelected ? '#fbbf24' : 'transparent';

  const tryTap = (clientX: number, clientY: number) => {
    const start = pointerDown.current;
    pointerDown.current = null;
    if (start && Math.hypot(clientX - start.x, clientY - start.y) < TAP_MOVE_THRESHOLD_PX) onClick();
  };

  return (
    <g
      onPointerDown={(event) => {
        event.stopPropagation();
        pointerDown.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        tryTap(event.clientX, event.clientY);
      }}
      onPointerCancel={() => { pointerDown.current = null; }}
      onMouseEnter={onHover}
      style={{ cursor: isBuildable ? 'pointer' : 'default', pointerEvents: 'all', touchAction: 'none' }}
    >
      <image
        href={empireTerrainImageSrc(terrain, x, y, hiRes)}
        x={screenX - TILE_WIDTH / 2 - 0.15}
        y={screenY - TILE_HEIGHT / 2 - 0.075}
        width={TILE_WIDTH + 0.3}
        height={TILE_HEIGHT + 0.15}
        preserveAspectRatio="none"
        pointerEvents="none"
      />
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={isSelected || isGhostValid || isGhostInvalid ? 2 : 0}
      />
      {isSelected && (
        <polygon points={points} fill="none" stroke="#fbbf24" strokeWidth={3} opacity={0.8}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
        </polygon>
      )}
    </g>
  );
};

export default React.memo(Tile);
