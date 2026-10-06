import type { VillageModuleId } from '@/types/village-lesson';

const COMIC_BASE = '/comic/market-intelligence';

export function getVillageLessonHeroUrl(moduleId: VillageModuleId | string, lessonId: string): string {
  return `${COMIC_BASE}/${moduleId}/${lessonId}/panel-hero.png`;
}

export function getVillageConceptPanelUrl(
  moduleId: VillageModuleId | string,
  lessonId: string,
  conceptId: string,
): string {
  return `${COMIC_BASE}/${moduleId}/${lessonId}/panel-${conceptId}.png`;
}

export function getVillageComicPlaceholderUrl(label: string): string {
  const text = encodeURIComponent(label.slice(0, 28) || 'Phil');
  return `https://placehold.co/800x450/16a34a/ffffff?text=${text}`;
}
