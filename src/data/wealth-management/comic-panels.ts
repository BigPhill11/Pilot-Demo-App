/**
 * Wealth Management Comic Panel Data
 * 
 * Content for the comic-based real-life example showing
 * a day in the life of a wealth manager.
 */

import { WMComicPanel } from '@/types/wealth-management-sim';

export const WM_COMIC_PANELS: WMComicPanel[] = [
  {
    id: 'wm-panel-1',
    imageUrl: '/comic/careers/wealth-management/panel-1.png',
    imageFallbackUrl: 'https://placehold.co/600x400/10b981/ffffff?text=Morning+Client+Call',
    caption: 'Part 1 of 6: The Early Morning',
    philDialogue: "It's 7:30 AM and Sarah, a wealth manager at Green Bamboo Advisors, starts her day reviewing overnight market movements. Her first client, Mr. Chen, is calling about his retirement portfolio. Time to put those client relationship skills to work!",
    panelStyle: 'normal',
  },
  {
    id: 'wm-panel-2',
    imageUrl: '/comic/careers/wealth-management/panel-2.png',
    imageFallbackUrl: 'https://placehold.co/600x400/059669/ffffff?text=Portfolio+Review',
    caption: 'Part 2 of 6: Portfolio Analysis',
    philDialogue: "After the call, Sarah dives into portfolio analysis. She notices that Mr. Chen's tech allocation is too high given his age. A good wealth manager doesn't just follow the market - they think about each client's unique situation and goals!",
    panelStyle: 'normal',
  },
  {
    id: 'wm-panel-3',
    imageUrl: '/comic/careers/wealth-management/panel-3.png',
    imageFallbackUrl: 'https://placehold.co/600x400/047857/ffffff?text=Lunch+Meeting',
    caption: 'Part 3 of 6: Building Relationships',
    philDialogue: "Lunch isn't just for eating! Sarah meets a potential new client, Dr. Patel, who's looking for help with her growing medical practice income. Building trust is key - wealth management is as much about relationships as it is about numbers.",
    panelStyle: 'normal',
  },
  {
    id: 'wm-panel-4',
    imageUrl: '/comic/careers/wealth-management/panel-4.png',
    imageFallbackUrl: 'https://placehold.co/600x400/065f46/ffffff?text=Market+Analysis',
    caption: 'Part 4 of 6: Staying Sharp',
    philDialogue: "Back at the office, Sarah attends a team meeting about market trends. The Fed just announced new interest rate guidance. Understanding how macro events affect client portfolios is crucial - continuous learning never stops in this field!",
    panelStyle: 'normal',
  },
  {
    id: 'wm-panel-5',
    imageUrl: '/comic/careers/wealth-management/panel-5.png',
    imageFallbackUrl: 'https://placehold.co/600x400/064e3b/ffffff?text=Client+Presentation',
    caption: 'Part 5 of 6: The Big Presentation',
    philDialogue: "Sarah presents a comprehensive financial plan to the Martinez family. She explains complex concepts in simple terms - estate planning, tax optimization, and college savings. The family leaves feeling confident about their financial future!",
    panelStyle: 'normal',
  },
  {
    id: 'wm-panel-6',
    imageUrl: '/comic/careers/wealth-management/panel-6.png',
    imageFallbackUrl: 'https://placehold.co/600x400/022c22/ffffff?text=End+of+Day',
    caption: 'Part 6 of 6: Reflection',
    philDialogue: "As the day ends, Sarah reviews her accomplishments: one happy client call, a promising new prospect, market insights gained, and a family's financial plan delivered. Wealth management is challenging but rewarding - you're helping people achieve their dreams!",
    panelStyle: 'normal',
  },
];

export function getWMComicPanel(index: number): WMComicPanel | undefined {
  return WM_COMIC_PANELS[index];
}

export function getWMComicPanelCount(): number {
  return WM_COMIC_PANELS.length;
}
