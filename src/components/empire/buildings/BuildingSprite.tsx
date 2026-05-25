import React, { useRef } from 'react';

const TAP_MOVE_THRESHOLD_PX = 14;
import { BuildingType, BuildingStatus, BUILDING_DEFINITIONS } from './BuildingTypes';
import {
  empireBuildingImageSrc,
  getBuildingSpriteLayout,
} from './empire-building-assets';
import { BuildingShadow } from './sprites/spriteShared';
import { gridToScreen } from '../lib/grid';
import { isBuildingCollectionReady } from '../systems/economy';

interface BuildingSpriteProps {
  type: BuildingType;
  level: number;
  status: BuildingStatus;
  gridX: number;
  gridY: number;
  constructionProgress?: number;
  pendingCollection?: number;
  isSelected?: boolean;
  hiRes?: boolean;
  onClick?: () => void;
}

const IsometricBuildingImage: React.FC<{
  type: BuildingType;
  opacity?: number;
  hiRes?: boolean;
}> = ({ type, opacity = 1, hiRes = false }) => {
  const { width, height, offsetY } = getBuildingSpriteLayout(type);

  return (
    <image
      href={empireBuildingImageSrc(type, hiRes)}
      x={-width / 2}
      y={offsetY}
      width={width}
      height={height}
      opacity={opacity}
      preserveAspectRatio="xMidYMax meet"
      style={{ imageRendering: 'auto' }}
    />
  );
};

const PandaWorker: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx={0} cy={-8} r={6} fill="#4ade80" />
    <circle cx={-2} cy={-9} r={1.5} fill="#166534" />
    <circle cx={2} cy={-9} r={1.5} fill="#166534" />
    <rect x={-4} y={-2} width={8} height={6} fill="#22c55e" rx={2} />
  </g>
);

const BuildingSprite: React.FC<BuildingSpriteProps> = ({
  type,
  level,
  status,
  gridX,
  gridY,
  constructionProgress = 100,
  pendingCollection = 0,
  isSelected = false,
  hiRes = false,
  onClick,
}) => {
  const def = BUILDING_DEFINITIONS[type];
  if (!def) return null;
  const { screenX: finalX, screenY: finalY } = gridToScreen(gridX, gridY);

  const pointerDown = useRef<{ x: number; y: number } | null>(null);

  const tryTap = (clientX: number, clientY: number) => {
    const start = pointerDown.current;
    pointerDown.current = null;
    if (!start || !onClick) return;
    if (Math.hypot(clientX - start.x, clientY - start.y) < TAP_MOVE_THRESHOLD_PX) {
      onClick();
    }
  };

  return (
    <g
      data-empire-building
      transform={`translate(${finalX}, ${finalY})`}
      onPointerDown={(e) => {
        e.stopPropagation();
        pointerDown.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        tryTap(e.clientX, e.clientY);
      }}
      onPointerCancel={() => {
        pointerDown.current = null;
      }}
      style={{ cursor: 'pointer', touchAction: 'none' }}
    >
      <BuildingShadow rx={def.size.width * 20} ry={def.size.height * 8} />

      {status === 'constructing' && (
        <g>
          <IsometricBuildingImage type={type} opacity={0.45} hiRes={hiRes} />
          <rect
            x={-30}
            y={-60}
            width={60}
            height={80}
            fill="rgba(139, 92, 46, 0.3)"
            stroke="#8B5C2E"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
          <rect x={-25} y={-70} width={50} height={8} fill="#374151" rx={4} />
          <rect
            x={-25}
            y={-70}
            width={50 * (constructionProgress / 100)}
            height={8}
            fill="#22c55e"
            rx={4}
          />
          <PandaWorker x={25} y={0} />
        </g>
      )}

      {status === 'upgrading' && (
        <g>
          <IsometricBuildingImage type={type} opacity={0.75} hiRes={hiRes} />
          <rect x={-25} y={-70} width={50} height={8} fill="#374151" rx={4} />
          <rect
            x={-25}
            y={-70}
            width={50 * (constructionProgress / 100)}
            height={8}
            fill="#8b5cf6"
            rx={4}
          />
          <PandaWorker x={25} y={0} />
        </g>
      )}

      {status === 'active' && (
        <g>
          <IsometricBuildingImage type={type} hiRes={hiRes} />

          {isBuildingCollectionReady(type, pendingCollection) && (
            <g>
              <circle cx={20} cy={-50} r={15} fill="#fbbf24" />
              <text x={20} y={-46} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#78350f">
                {Math.round(pendingCollection) > 99 ? '99+' : Math.round(pendingCollection)}
              </text>
            </g>
          )}

          <g transform="translate(-25, -55)">
            <circle r={10} fill="#6366f1" />
            <text textAnchor="middle" dy={4} fontSize={10} fontWeight="bold" fill="white">
              {level}
            </text>
          </g>
        </g>
      )}

      {isSelected && (
        <ellipse
          cx={0}
          cy={0}
          rx={def.size.width * 25}
          ry={def.size.height * 12}
          fill="none"
          stroke="#fbbf24"
          strokeWidth={3}
          opacity={0.8}
        />
      )}
    </g>
  );
};

export default BuildingSprite;
