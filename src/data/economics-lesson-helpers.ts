import type { LessonVisual } from '@/types/mi-lesson';

const BASE = '/economics';

/** Static PNG/SVG for micro lesson slots: /economics/micro-{n}/{lessonId}/{name}.png */
export function econImg(
  unitFolder: string,
  lessonId: string,
  name: string,
  alt: string,
  caption?: string,
  ext: 'png' | 'svg' | 'webp' = 'png'
): LessonVisual {
  return {
    src: `${BASE}/${unitFolder}/${lessonId}/${name}.${ext}`,
    alt,
    caption,
  };
}
