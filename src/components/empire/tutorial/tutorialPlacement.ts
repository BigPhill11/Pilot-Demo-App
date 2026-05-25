export interface TutorialRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type CardPlacementPreference = 'above' | 'below' | 'auto';

export interface ViewportBounds {
  top: number;
  left: number;
  width: number;
  height: number;
}

const GAP = 12;
const MIN_MARGIN = 12;

export function getVisualViewportBounds(): ViewportBounds {
  if (typeof window === 'undefined') {
    return { top: 0, left: 0, width: 0, height: 0 };
  }

  const vv = window.visualViewport;
  if (vv) {
    return {
      top: vv.offsetTop,
      left: vv.offsetLeft,
      width: vv.width,
      height: vv.height,
    };
  }

  return {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function getTutorialPadding(): number {
  if (typeof window === 'undefined') return 10;
  return window.innerWidth < 640 ? 6 : 10;
}

export function measureTargetRect(
  targetSelector: string,
  padding: number,
): TutorialRect | null {
  const el = document.querySelector<HTMLElement>(`[data-tutorial="${targetSelector}"]`);
  if (!el) return null;

  const bottomAnchored = targetSelector === 'build-button' || targetSelector === 'building-menu';
  if (bottomAnchored) {
    el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  const r = el.getBoundingClientRect();
  return {
    top: r.top - padding,
    left: r.left - padding,
    width: r.width + padding * 2,
    height: r.height + padding * 2,
  };
}

export function computeCardTop(options: {
  targetRect: TutorialRect | null;
  cardHeight: number;
  preference: CardPlacementPreference;
  viewport: ViewportBounds;
}): number | null {
  const { targetRect, cardHeight, preference, viewport } = options;
  const safeTop = viewport.top + MIN_MARGIN;
  const safeBottom = viewport.top + viewport.height - MIN_MARGIN;

  if (!targetRect || cardHeight <= 0) {
    return Math.max(safeTop, (safeTop + safeBottom - cardHeight) / 2);
  }

  const targetCenterY = targetRect.top + targetRect.height / 2;
  const viewportMid = viewport.top + viewport.height * 0.55;

  const spaceBelow = safeBottom - (targetRect.top + targetRect.height + GAP);
  const spaceAbove = targetRect.top - GAP - safeTop;

  let preferAbove: boolean;
  if (preference === 'above') {
    preferAbove = true;
  } else if (preference === 'below') {
    preferAbove = false;
  } else {
    preferAbove =
      targetCenterY > viewportMid || spaceBelow < cardHeight || spaceAbove >= spaceBelow;
  }

  let top = preferAbove
    ? targetRect.top - GAP - cardHeight
    : targetRect.top + targetRect.height + GAP;

  if (top + cardHeight > safeBottom) {
    top = safeBottom - cardHeight;
  }
  if (top < safeTop) {
    top = safeTop;
  }

  if (top + cardHeight > safeBottom && spaceAbove < cardHeight && spaceBelow < cardHeight) {
    top = safeTop;
  }

  return top;
}
