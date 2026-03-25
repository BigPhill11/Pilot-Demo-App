/**
 * Static comic panel backgrounds per lesson (files under /public).
 * Add generated images as panel-1.jpg, panel-2.jpg, … matching microLesson paragraph order.
 *
 * Default assets are PNG under public/comic/... Update paths if you replace with .jpg / .webp.
 */
export const COMIC_PANEL_BACKGROUNDS: Partial<Record<string, readonly string[]>> = {
  'active-income-basics': [
    '/comic/income/lesson-1/panel-1.png',
    '/comic/income/lesson-1/panel-2.png',
    '/comic/income/lesson-1/panel-3.png',
    '/comic/income/lesson-1/panel-4.png',
  ],
};

export function getComicPanelPlaceholderUrl(panelNumber: number): string {
  return `https://placehold.co/800x500/16a34a/ffffff?text=Panel+${panelNumber}`;
}

/** Primary image URL for a panel index, or null to use placeholder only. */
export function getComicPanelImageUrl(lessonId: string, panelIndex: number): string | null {
  const list = COMIC_PANEL_BACKGROUNDS[lessonId];
  if (!list || panelIndex < 0 || panelIndex >= list.length) return null;
  return list[panelIndex];
}
