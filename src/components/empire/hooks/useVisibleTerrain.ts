import { useEffect, useRef, useState } from 'react';

export interface TerrainBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface CameraState {
  panX: number;
  panY: number;
  zoom: number;
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateVisibleTerrainBounds({
  viewBox,
  viewportWidth,
  viewportHeight,
  camera,
}: {
  viewBox: ViewBox;
  viewportWidth: number;
  viewportHeight: number;
  camera: CameraState;
}): TerrainBounds | null {
  if (
    viewportWidth <= 0 || viewportHeight <= 0 ||
    viewBox.width <= 0 || viewBox.height <= 0 ||
    !Number.isFinite(camera.panX) || !Number.isFinite(camera.panY) ||
    !Number.isFinite(camera.zoom) || camera.zoom <= 0
  ) return null;

  const fittedScale = Math.min(viewportWidth / viewBox.width, viewportHeight / viewBox.height);
  if (!Number.isFinite(fittedScale) || fittedScale <= 0) return null;

  const fittedWidth = viewBox.width * fittedScale;
  const fittedHeight = viewBox.height * fittedScale;
  const letterboxX = (viewportWidth - fittedWidth) / 2;
  const letterboxY = (viewportHeight - fittedHeight) / 2;
  const centerX = viewportWidth / 2;
  const centerY = viewportHeight / 2;

  // Invert the outer CSS transform: translate(pan) scale(zoom), centered.
  const unzoomedLeft = centerX + (0 - centerX - camera.panX) / camera.zoom;
  const unzoomedRight = centerX + (viewportWidth - centerX - camera.panX) / camera.zoom;
  const unzoomedTop = centerY + (0 - centerY - camera.panY) / camera.zoom;
  const unzoomedBottom = centerY + (viewportHeight - centerY - camera.panY) / camera.zoom;

  const userLeft = viewBox.x + (unzoomedLeft - letterboxX) / fittedScale;
  const userRight = viewBox.x + (unzoomedRight - letterboxX) / fittedScale;
  const userTop = viewBox.y + (unzoomedTop - letterboxY) / fittedScale;
  const userBottom = viewBox.y + (unzoomedBottom - letterboxY) / fittedScale;

  const values = [userLeft, userRight, userTop, userBottom];
  if (!values.every(Number.isFinite)) return null;

  return {
    left: Math.floor(Math.min(userLeft, userRight) / 64) * 64 - 128,
    right: Math.ceil(Math.max(userLeft, userRight) / 64) * 64 + 128,
    top: Math.floor(Math.min(userTop, userBottom) / 32) * 32 - 64,
    bottom: Math.ceil(Math.max(userTop, userBottom) / 32) * 32 + 64,
  };
}

/** Updates only the terrain layer when the camera moves. */
export function useVisibleTerrain() {
  const groupRef = useRef<SVGGElement>(null);
  const cameraRef = useRef<CameraState>({ panX: 0, panY: 0, zoom: 1 });
  const [bounds, setBounds] = useState<TerrainBounds | null>(null);

  useEffect(() => {
    const svg = groupRef.current?.ownerSVGElement;
    const transform = svg?.parentElement;
    const viewport = transform?.parentElement;
    if (!svg || !transform || !viewport) return;

    const update = (event?: Event) => {
      if (event instanceof CustomEvent) {
        const detail = event.detail as Partial<CameraState> | undefined;
        if (
          detail && Number.isFinite(detail.panX) && Number.isFinite(detail.panY) &&
          Number.isFinite(detail.zoom) && Number(detail.zoom) > 0
        ) {
          cameraRef.current = {
            panX: Number(detail.panX),
            panY: Number(detail.panY),
            zoom: Number(detail.zoom),
          };
        }
      }

      const box = svg.viewBox.baseVal;
      const rect = viewport.getBoundingClientRect();
      const next = calculateVisibleTerrainBounds({
        viewBox: { x: box.x, y: box.y, width: box.width, height: box.height },
        viewportWidth: viewport.clientWidth || rect.width,
        viewportHeight: viewport.clientHeight || rect.height,
        camera: cameraRef.current,
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
