/**
 * Session-scoped deep-link intent from dashboard goals / welcome modal.
 */

export interface DashboardDeepLink {
  targetTab: string;
  sectionId?: string;
  moduleId?: string;
  unitId?: string;
  lessonIndex?: number;
}

const DEEP_LINK_KEY = 'dashboard_deep_link_intent';

export function setDashboardDeepLink(intent: DashboardDeepLink): void {
  try {
    sessionStorage.setItem(DEEP_LINK_KEY, JSON.stringify(intent));
  } catch {
    // sessionStorage unavailable
  }
}

export function consumeDashboardDeepLink(): DashboardDeepLink | null {
  try {
    const raw = sessionStorage.getItem(DEEP_LINK_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(DEEP_LINK_KEY);
    return JSON.parse(raw) as DashboardDeepLink;
  } catch {
    return null;
  }
}

export function navigateToGoal(
  targetTab: string,
  deepLink?: Pick<DashboardDeepLink, 'sectionId' | 'moduleId' | 'unitId' | 'lessonIndex'>,
  onNavigate?: (tab: string) => void
): void {
  if (
    deepLink &&
    (deepLink.sectionId || deepLink.moduleId || deepLink.unitId || deepLink.lessonIndex !== undefined)
  ) {
    setDashboardDeepLink({ targetTab, ...deepLink });
  }
  onNavigate?.(targetTab);
}
