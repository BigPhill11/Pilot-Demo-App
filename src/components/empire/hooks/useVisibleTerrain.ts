import { useEffect, useRef, useState } from 'react';

export interface TerrainBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateVisibleTerrainBounds(viewBox: ViewBox): TerrainBounds | null {
  if (
    viewBox.width <= 0 || viewBox.height <= 0 ||
    ![viewBox.x, viewBox.y, viewBox.width, viewBox.height].every(Number.isFinite)
  ) return null;

  return {
    left: Math.floor(viewBox.x / 64) * 64 - 128,
    right: Math.ceil((viewBox.x + viewBox.width) / 64) * 64 + 128,
    top: Math.floor(viewBox.y / 32) * 32 - 64,
    bottom: Math.ceil((viewBox.y + viewBox.height) / 32) * 32 + 64,
  };
}

/** Updates only the terrain layer when the camera moves. */
export function useVisibleTerrain() {
  const groupRef = useRef<SVGGElement>(null);
  const [bounds, setBounds] = useState<TerrainBounds | null>(null);

  useEffect(() => {
    const svg = groupRef.current?.ownerSVGElement;
    const transform = svg?.parentElement;
    const viewport = transform?.parentElement;
    if (!svg || !transform || !viewport) return;

    const update = () => {
      const box = svg.viewBox.baseVal;
      const next = calculateVisibleTerrainBounds({
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      });

      // Fail open. A bad browser measurement must never hide the whole map.
      if (!next) {
        setBounds(null);
        return;
      }
      setBounds((previous) =>
        previous && Object.keys(next).every(
          (key) => previous[key as keyof TerrainBounds] === next[key as keyof TerrainBounds],
        ) ? previous : next,
      );
    };

    update();
    transform.addEventListener('empire-viewport', update);
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => {
      transform.removeEventListener('empire-viewport', update);
      observer.disconnect();
    };
  }, []);

  return { groupRef, bounds };
}
