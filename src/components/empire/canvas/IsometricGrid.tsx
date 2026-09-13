import React, { useMemo, useCallback } from 'react';
import Tile from './Tile';
import { empireGroveImageSrc } from '../lib/empire-terrain-assets';
import { useVisibleTerrain } from '../hooks/useVisibleTerrain';
import { useBaseLayoutStore } from '@/store/useBaseLayoutStore';
import {
  GRID_SIZE,
  createTerrainMap,
  getOccupiedTileSet,
  getRenderOrder,
  getTerrainType,
  gridToScreen,
  isTileWithinFootprint,
  isPlacementWithinBounds,
  type TerrainType,
} from '../lib/grid';

export {
  GRID_SIZE,
  TILE_WIDTH,
  TILE_HEIGHT,
  getRenderOrder,
  gridToScreen,
  screenToGrid,
} from '../lib/grid';

interface IsometricGridProps {
  hiRes?: boolean;
  selectedTile: { x: number; y: number } | null;
  onTileClick: (x: number, y: number, terrain: TerrainType) => void;
  onTileHover: (x: number, y: number) => void;
  tutorialHighlightTile?: { x: number; y: number } | null;
  highlightBuildableTiles?: boolean;
  ghostBuilding?: {
    type: string;
    size: { width: number; height: number };
    position: { x: number; y: number };
    isValid: boolean;
  } | null;
}

const IsometricGrid: React.FC<IsometricGridProps> = ({
  hiRes = false,
  selectedTile,
  onTileClick,
  onTileHover,
  tutorialHighlightTile = null,
  highlightBuildableTiles = false,
  ghostBuilding,
}) => {
  const { groupRef, bounds } = useVisibleTerrain();
  const buildings = useBaseLayoutStore((state) => state.buildings);
  
  // Generate terrain map once
  const terrainMap = useMemo(() => createTerrainMap(), []);
  
  // Create a set of occupied tiles for quick lookup
  const occupiedTiles = useMemo(() => getOccupiedTileSet(buildings), [buildings]);
  
  // Check if a tile is buildable
  const isTileBuildable = useCallback((x: number, y: number): boolean => {
    return isPlacementWithinBounds({ x, y }, { width: 1, height: 1 }) &&
      getTerrainType(x, y) === 'grass' && !occupiedTiles.has(`${x},${y}`);
  }, [occupiedTiles]);
  
  // Check if tile is part of ghost building placement
  const isGhostTile = useCallback((x: number, y: number): boolean => {
    if (!ghostBuilding) return false;
    return isTileWithinFootprint(x, y, ghostBuilding.position, ghostBuilding.size);
  }, [ghostBuilding]);
  
  // Generate tiles sorted by render order
  const sortedTiles = useMemo(() => {
    const tiles: Array<{
      x: number;
      y: number;
      terrain: TerrainType;
      renderOrder: number;
      isOccupied: boolean;
      isBuildable: boolean;
    }> = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const { screenX, screenY } = gridToScreen(x, y);
        if (bounds && (screenX + 32 < bounds.left || screenX - 32 > bounds.right ||
          screenY + 16 < bounds.top || screenY - 104 > bounds.bottom)) continue;
        tiles.push({
          x,
          y,
          terrain: terrainMap[y][x],
          renderOrder: getRenderOrder(x, y),
          isOccupied: occupiedTiles.has(`${x},${y}`),
          isBuildable: isTileBuildable(x, y),
        });
      }
    }

    // Mobile browsers occasionally report transient viewport measurements while
    // pinch-zooming. Never let a culling calculation remove the entire ground.
    if (bounds && tiles.length === 0) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          tiles.push({
            x,
            y,
            terrain: terrainMap[y][x],
            renderOrder: getRenderOrder(x, y),
            isOccupied: occupiedTiles.has(`${x},${y}`),
            isBuildable: isTileBuildable(x, y),
          });
        }
      }
    }
    
    // Sort by render order for proper depth
    return tiles.sort((a, b) => a.renderOrder - b.renderOrder);
  }, [terrainMap, occupiedTiles, isTileBuildable, bounds]);
  return (
    <g ref={groupRef} data-terrain-layer>
      {/* Render tiles */}
      {sortedTiles.map(({ x, y, terrain, isOccupied, isBuildable }) => {
        const { screenX, screenY } = gridToScreen(x, y);
        const isSelected = selectedTile?.x === x && selectedTile?.y === y;
        const isGhost = isGhostTile(x, y);
        const isTutorialHighlight =
          (tutorialHighlightTile?.x === x && tutorialHighlightTile?.y === y) ||
          (highlightBuildableTiles && isBuildable);

        return (
          <Tile
            key={`${x}-${y}`}
            hiRes={hiRes}
            x={x}
            y={y}
            screenX={screenX}
            screenY={screenY}
            terrain={terrain}
            isSelected={isSelected || isTutorialHighlight}
            isOccupied={isOccupied}
            isBuildable={isBuildable}
            isGhostValid={isGhost && ghostBuilding?.isValid}
            isGhostInvalid={isGhost && !ghostBuilding?.isValid}
            onClick={() => onTileClick(x, y, terrain)}
            onHover={() => onTileHover(x, y)}
          />
        );
      })}
      <g pointerEvents="none">
        {sortedTiles.filter((tile) =>
          tile.terrain === 'bamboo_forest' &&
          ((Math.imul(tile.x + 5, 73) ^ Math.imul(tile.y + 9, 151)) >>> 0) % 5 < 3,
        ).map(({ x, y }) => {
          const { screenX, screenY } = gridToScreen(x, y);
          const seed = (Math.imul(x + 3, 97) ^ Math.imul(y + 7, 193)) >>> 0;
          const width = 55 + seed % 16;
          const height = width * 1.625;
          return <image key={`grove-${x}-${y}`} href={empireGroveImageSrc(x, y, hiRes)}
            x={screenX - width / 2 + (seed % 9) - 4} y={screenY - height + 8}
            width={width} height={height} />;
        })}
      </g>
    </g>
  );
};

export default IsometricGrid;
