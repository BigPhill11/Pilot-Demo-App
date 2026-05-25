import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const MIN_ZOOM = 0.72;
const MAX_ZOOM = 2.35;
const WHEEL_ZOOM_FACTOR = 0.0012;
const PAN_RANGE = 320;
const INERTIA_FRICTION = 0.92;
const INERTIA_MIN_SPEED = 0.15;

function clampPan(p: { x: number; y: number }, z: number) {
  const m = PAN_RANGE * z;
  return {
    x: Math.max(-m, Math.min(m, p.x)),
    y: Math.max(-m, Math.min(m, p.y)),
  };
}

function isEmpireBuildingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('[data-empire-building]'));
}

/**
 * Pan/zoom for the empire SVG via wrapper transform. Inertial pan, pinch-at-centroid,
 * exponential wheel zoom. Skips pan when pointer starts on a building.
 */
export function useEmpireViewport() {
  const transformRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const velocityRef = useRef({ x: 0, y: 0 });
  const inertiaFrameRef = useRef<number | null>(null);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{
    dist: number;
    zoom: number;
    midX: number;
    midY: number;
    panX: number;
    panY: number;
  } | null>(null);
  const dragRef = useRef<{
    id: number;
    origin: { x: number; y: number };
    pan: { x: number; y: number };
    lastMove: { x: number; y: number; t: number };
  } | null>(null);

  const windowActiveRef = useRef(false);
  const removeWindowListenersRef = useRef<(() => void) | null>(null);

  const stopInertia = useCallback(() => {
    if (inertiaFrameRef.current !== null) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
    velocityRef.current = { x: 0, y: 0 };
  }, []);

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

  const startInertia = useCallback(() => {
    stopInertia();
    const tick = () => {
      const v = velocityRef.current;
      if (Math.abs(v.x) < INERTIA_MIN_SPEED && Math.abs(v.y) < INERTIA_MIN_SPEED) {
        stopInertia();
        return;
      }
      panRef.current = clampPan(
        { x: panRef.current.x + v.x, y: panRef.current.y + v.y },
        zoomRef.current,
      );
      velocityRef.current = { x: v.x * INERTIA_FRICTION, y: v.y * INERTIA_FRICTION };
      applyTransformRef.current();
      inertiaFrameRef.current = requestAnimationFrame(tick);
    };
    inertiaFrameRef.current = requestAnimationFrame(tick);
  }, [stopInertia]);

  useLayoutEffect(() => {
    applyTransform();
  }, [applyTransform]);

  const zoomAtPoint = useCallback((nextZ: number, clientX: number, clientY: number) => {
    const prevZ = zoomRef.current;
    if (nextZ === prevZ) return;
    const inner = transformRef.current;
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 2;
    const dx = clientX - ox;
    const dy = clientY - oy;
    const s = nextZ / prevZ;
    panRef.current = clampPan(
      { x: panRef.current.x + dx - dx * s, y: panRef.current.y + dy - dy * s },
      nextZ,
    );
    zoomRef.current = nextZ;
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
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        const ratio = dist / pinchRef.current.dist;
        const nz = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchRef.current.zoom * ratio));
        zoomAtPoint(nz, midX, midY);
        pinchRef.current = {
          dist,
          zoom: nz,
          midX,
          midY,
          panX: panRef.current.x,
          panY: panRef.current.y,
        };
        return;
      }

      const drag = dragRef.current;
      if (drag && ev.pointerId === drag.id && pointers.current.size === 1) {
        const dx = ev.clientX - drag.origin.x;
        const dy = ev.clientY - drag.origin.y;
        const now = performance.now();
        const dt = Math.max(1, now - drag.lastMove.t);
        velocityRef.current = {
          x: ((ev.clientX - drag.lastMove.x) / dt) * 16,
          y: ((ev.clientY - drag.lastMove.y) / dt) * 16,
        };
        drag.lastMove = { x: ev.clientX, y: ev.clientY, t: now };
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
        const drag = dragRef.current;
        if (drag && ev.pointerId === drag.id) {
          const speed = Math.hypot(velocityRef.current.x, velocityRef.current.y);
          if (speed > INERTIA_MIN_SPEED) startInertia();
        }
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
          lastMove: { x: pt.x, y: pt.y, t: performance.now() },
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
  }, [startInertia, zoomAtPoint]);

  useEffect(
    () => () => {
      stopInertia();
      removeWindowListenersRef.current?.();
      pointers.current.clear();
      pinchRef.current = null;
      dragRef.current = null;
    },
    [stopInertia],
  );

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopInertia();
      const prevZ = zoomRef.current;
      const factor = Math.exp(-e.deltaY * WHEEL_ZOOM_FACTOR);
      const nextZ = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZ * factor));
      zoomAtPoint(nextZ, e.clientX, e.clientY);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [stopInertia, zoomAtPoint]);

  const onPointerDownCapture = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (isEmpireBuildingTarget(e.target)) return;

      stopInertia();
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2) {
        const pts = [...pointers.current.values()];
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        pinchRef.current = { dist, zoom: zoomRef.current, midX, midY, panX: panRef.current.x, panY: panRef.current.y };
        dragRef.current = null;
      } else if (pointers.current.size === 1) {
        dragRef.current = {
          id: e.pointerId,
          origin: { x: e.clientX, y: e.clientY },
          pan: { ...panRef.current },
          lastMove: { x: e.clientX, y: e.clientY, t: performance.now() },
        };
      }

      ensureWindowListeners();
    },
    [ensureWindowListeners, stopInertia],
  );

  const zoomBy = useCallback(
    (delta: number) => {
      const prevZ = zoomRef.current;
      const nextZ = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prevZ + delta));
      const inner = transformRef.current;
      if (!inner) return;
      const rect = inner.getBoundingClientRect();
      zoomAtPoint(nextZ, rect.left + rect.width / 2, rect.top + rect.height / 2);
    },
    [zoomAtPoint],
  );

  const zoomIn = useCallback(() => zoomBy(0.15), [zoomBy]);
  const zoomOut = useCallback(() => zoomBy(-0.15), [zoomBy]);

  return {
    transformRef,
    wheelRef,
    onPointerDownCapture,
    zoomIn,
    zoomOut,
  };
}
