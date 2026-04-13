import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const MIN_ZOOM = 0.72;
const MAX_ZOOM = 2.35;
const WHEEL_ZOOM_STEP = 0.085;
/** Max pan magnitude scales with zoom so you can inspect tiles when zoomed in. */
const PAN_RANGE = 240;

function clampPan(p: { x: number; y: number }, z: number) {
  const m = PAN_RANGE * z;
  return {
    x: Math.max(-m, Math.min(m, p.x)),
    y: Math.max(-m, Math.min(m, p.y)),
  };
}

/**
 * Pan/zoom for the empire SVG via a wrapper div transform (no React state during drag =
 * no full grid re-renders). Pointer routing uses window listeners so move/up are not lost
 * when the pointer leaves the SVG, without setPointerCapture (which would break tile/building taps).
 *
 * pointerup/pointercancel use window **capture** so they still run when tiles/buildings call
 * stopPropagation() on those events (otherwise release never clears drag state).
 */
export function useEmpireViewport() {
  const transformRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null);
  const dragRef = useRef<{
    id: number;
    origin: { x: number; y: number };
    pan: { x: number; y: number };
  } | null>(null);

  const windowActiveRef = useRef(false);
  const removeWindowListenersRef = useRef<(() => void) | null>(null);

  const applyTransform = useCallback(() => {
    const el = transformRef.current;
    if (!el) return;
    const { x, y } = panRef.current;
    const z = zoomRef.current;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`;
    el.style.transformOrigin = 'center center';
  }, []);

  const applyTransformRef = useRef(applyTransform);
  applyTransformRef.current = applyTransform;

  useLayoutEffect(() => {
    applyTransform();
  }, [applyTransform]);

  const ensureWindowListeners = useCallback(() => {
    if (windowActiveRef.current) return;
    windowActiveRef.current = true;

    const onMove = (ev: PointerEvent) => {
      if (!pointers.current.has(ev.pointerId)) return;
      pointers.current.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

      if (pointers.current.size >= 2 && pinchRef.current) {
        const pts = [...pointers.current.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (dist < 8) return;
        const ratio = dist / pinchRef.current.dist;
        const nz = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchRef.current.zoom * ratio));
        pinchRef.current = { dist, zoom: nz };
        zoomRef.current = nz;
        panRef.current = clampPan(panRef.current, nz);
        applyTransformRef.current();
        return;
      }

      const drag = dragRef.current;
      if (drag && ev.pointerId === drag.id && pointers.current.size === 1) {
        const dx = ev.clientX - drag.origin.x;
        const dy = ev.clientY - drag.origin.y;
        panRef.current = clampPan(
          { x: drag.pan.x + dx, y: drag.pan.y + dy },
          zoomRef.current,
        );
        applyTransformRef.current();
      }
    };

    const onUpOrCancel = (ev: PointerEvent) => {
      if (!pointers.current.has(ev.pointerId)) return;
      pointers.current.delete(ev.pointerId);

      if (pointers.current.size === 0) {
        pinchRef.current = null;
        dragRef.current = null;
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUpOrCancel, true);
        window.removeEventListener('pointercancel', onUpOrCancel, true);
        windowActiveRef.current = false;
        removeWindowListenersRef.current = null;
        return;
      }

      if (pointers.current.size < 2) pinchRef.current = null;

      if (pointers.current.size === 1) {
        const remainingId = pointers.current.keys().next().value as number;
        const pt = pointers.current.get(remainingId)!;
        dragRef.current = {
          id: remainingId,
          origin: { x: pt.x, y: pt.y },
          pan: { ...panRef.current },
        };
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUpOrCancel, true);
    window.addEventListener('pointercancel', onUpOrCancel, true);

    removeWindowListenersRef.current = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUpOrCancel, true);
      window.removeEventListener('pointercancel', onUpOrCancel, true);
      windowActiveRef.current = false;
      removeWindowListenersRef.current = null;
    };
  }, []);

  useEffect(
    () => () => {
      removeWindowListenersRef.current?.();
      pointers.current.clear();
      pinchRef.current = null;
      dragRef.current = null;
    },
    [],
  );

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -WHEEL_ZOOM_STEP : WHEEL_ZOOM_STEP;
      const prevZ = zoomRef.current;
      const nextZ = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZ + delta));
      if (nextZ === prevZ) return;

      const inner = transformRef.current;
      if (!inner) return;
      const rect = inner.getBoundingClientRect();
      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;
      const dx = e.clientX - ox;
      const dy = e.clientY - oy;
      const s = nextZ / prevZ;

      panRef.current = clampPan(
        {
          x: panRef.current.x + dx - dx * s,
          y: panRef.current.y + dy - dy * s,
        },
        nextZ,
      );
      zoomRef.current = nextZ;
      applyTransformRef.current();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDownCapture = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2) {
        const pts = [...pointers.current.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchRef.current = { dist, zoom: zoomRef.current };
        dragRef.current = null;
      } else if (pointers.current.size === 1) {
        dragRef.current = {
          id: e.pointerId,
          origin: { x: e.clientX, y: e.clientY },
          pan: { ...panRef.current },
        };
      }

      ensureWindowListeners();
    },
    [ensureWindowListeners],
  );

  const zoomBy = useCallback(
    (delta: number) => {
      const prevZ = zoomRef.current;
      const nextZ = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZ + delta));
      if (nextZ === prevZ) return;
      zoomRef.current = nextZ;
      panRef.current = clampPan(panRef.current, nextZ);
      applyTransform();
    },
    [applyTransform],
  );

  const zoomIn = useCallback(() => zoomBy(0.12), [zoomBy]);
  const zoomOut = useCallback(() => zoomBy(-0.12), [zoomBy]);

  return {
    transformRef,
    wheelRef,
    onPointerDownCapture,
    zoomIn,
    zoomOut,
  };
}
