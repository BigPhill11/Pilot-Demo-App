import React from 'react';
import { motion } from 'framer-motion';
import { BuildingType, BUILDING_DEFINITIONS } from './BuildingTypes';
import { empireBuildingImageSrc, getBuildingSpriteLayout } from './empire-building-assets';
import { gridToScreen } from '../lib/grid';

interface GhostPreviewProps {
  type: BuildingType;
  gridX: number;
  gridY: number;
  isValid: boolean;
}

const GhostPreview: React.FC<GhostPreviewProps> = ({
  type,
  gridX,
  gridY,
  isValid,
}) => {
  const def = BUILDING_DEFINITIONS[type];
  const { screenX: finalX, screenY: finalY } = gridToScreen(gridX, gridY);
  
  const color = isValid ? 'rgba(74, 222, 128, 0.6)' : 'rgba(248, 113, 113, 0.6)';
  
  const renderGhostBuilding = () => {
    const { width, height, offsetY } = getBuildingSpriteLayout(type);

    return (
      <g opacity={0.65}>
        <ellipse
          cx={0}
          cy={0}
          rx={def.size.width * 24}
          ry={def.size.height * 10}
          fill={color}
          opacity={0.25}
        />
        <image
          href={empireBuildingImageSrc(type, true)}
          x={-width / 2}
          y={offsetY}
          width={width}
          height={height}
          opacity={isValid ? 0.85 : 0.55}
          preserveAspectRatio="xMidYMax meet"
          style={{ imageRendering: 'auto', filter: isValid ? undefined : 'saturate(0.4)' }}
        />
      </g>
    );
  };
  
  return (
    <motion.g
      transform={`translate(${finalX}, ${finalY})`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {renderGhostBuilding()}
    
      {!isValid && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <circle cx={0} cy={-50} r={15} fill="#ef4444" />
          <text x={0} y={-45} textAnchor="middle" fontSize={20} fontWeight="bold" fill="white">
            ✕
          </text>
        </motion.g>
      )}
      
      {isValid && (
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <circle cx={0} cy={-50} r={15} fill="#22c55e" />
          <text x={0} y={-45} textAnchor="middle" fontSize={16} fontWeight="bold" fill="white">
            ✓
          </text>
        </motion.g>
      )}
    </motion.g>
  );
};

export default GhostPreview;
