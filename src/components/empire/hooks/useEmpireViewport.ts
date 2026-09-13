import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const MIN_ZOOM = 0.72;
export const MAX_ZOOM = 6;
const WHEEL_ZOOM_FACTOR = 0.0012;
const INERTIA_FRICTION = 0.92;
const INERTIA_MIN_SPEED = 0.15;

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

  const clampPan = useCallback((p: { x: number; y: number }, z: number) => {
    const element = transformRef.current;
    const svg = element?.querySelector('svg');
    if (!element || !svg) return p;
    const box = svg.viewBox.baseVal;
    const fittedScale = Math.min(element.clientWidth / box.width, element.clientHeight / box.height);
    const maxX = box.width * fittedScale * z / 2;
    const maxY = box.height * fittedScale * z / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, p.x)),
      y: Math.max(-maxY, Math.min(maxY, p.y)),
    };
  }, []);

  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const velocityRef = useRef({ x: 0, y: 0 });
  const inertiaFrameRef = useRef<number | null>(null);
  const transformFrameRef = useRef<number | null>(null);

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
    if (transformFrameRef.current !== null) return;
    transformFrameRef.current = requestAnimationFrame(() => {
      transformFrameRef.current = null;
      const { x, y } = panRef.current;
      const z = zoomRef.current;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`;
      el.style.transformOrigin = 'center center';
      el.dispatchEvent(new CustomEvent('empire-viewport', {
        detail: { panX: x, panY: y, zoom: z },
      }));
    });
  }, []);

  const applyTransformRef = useRef(applyTransform);
  applyTransformRef.current = applyTransform;

  const startInertia = useCallback(() => {
    const velocity = { ...velocityRef.current };
    stopInertia();
    velocityRef.current = velocity;
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
  }, [stopInertia, clampPan]);

  useLayoutEffect(() => {
    applyTransform();
    const observer = new ResizeObserver(() => {
      panRef.current = clampPan(panRef.current, zoomRef.current);
      applyTransform();
    });
    if (wheelRef.current) observer.observe(wheelRef.current);
    return () => observer.disconnect();
  }, [applyTransform, clampPan]);

  const zoomAtPoint = useCallback((nextZ: number, clientX: number, clientY: number) => {
    const prevZ = zoomRef.current;
    if (nextZ === prevZ) return;
    const inner = transformRef.current;
    if (!inner) return;
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ox = rect.left + rect.width / 2 + panRef.current.x;
    const oy = rect.top + rect.height / 2 + panRef.current.y;
    const dx = clientX - ox;
    const dy = clientY - oy;
    const s = nextZ / prevZ;
    panRef.current = clampPan(
      { x: panRef.current.x + dx - dx * s, y: panRef.current.y + dy - dy * s },
      nextZ,
    );
    zoomRef.current = nextZ;
    applyTransform();
  }, [applyTransform, clampPan]);

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
        panRef.current = clampPan({
          x: panRef.current.x + midX - pinchRef.current.midX,
          y: panRef.current.y + midY - pinchRef.current.midY,
        }, nz);
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
  }, [startInertia, zoomAtPoint, clampPan]);

  useEffect(
    () => () => {
      stopInertia();
      if (transformFrameRef.current !== null) cancelAnimationFrame(transformFrameRef.current);
      transformFrameRef.current = null;
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
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1;
      const delta = Math.max(-80, Math.min(80, e.deltaY * unit));
      const factor = Math.exp(-delta * WHEEL_ZOOM_FACTOR);
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
