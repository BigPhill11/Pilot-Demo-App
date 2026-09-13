import { useEffect, useRef, useState } from 'react';

export interface TerrainBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
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
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const inverse = matrix.inverse();
      const rect = viewport.getBoundingClientRect();
      const start = new DOMPoint(rect.left, rect.top).matrixTransform(inverse);
      const end = new DOMPoint(rect.right, rect.bottom).matrixTransform(inverse);
      const next = {
        left: Math.floor(start.x / 64) * 64 - 128,
        right: Math.ceil(end.x / 64) * 64 + 128,
        top: Math.floor(start.y / 32) * 32 - 64,
        bottom: Math.ceil(end.y / 32) * 32 + 64,
      };
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
