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
  'active-income-lesson-2': [
    '/comic/income/lesson-2/panel-1.png',
    '/comic/income/lesson-2/panel-2.png',
    '/comic/income/lesson-2/panel-3.png',
    '/comic/income/lesson-2/panel-4.png',
  ],
  'active-income-lesson-3': [
    '/comic/income/lesson-3/panel-1.png',
    '/comic/income/lesson-3/panel-2.png',
    '/comic/income/lesson-3/panel-3.png',
    '/comic/income/lesson-3/panel-4.png',
  ],
  'active-income-lesson-4': [
    '/comic/income/lesson-4/panel-1.png',
    '/comic/income/lesson-4/panel-2.png',
    '/comic/income/lesson-4/panel-3.png',
    '/comic/income/lesson-4/panel-4.png',
  ],
  'active-income-lesson-5': [
    '/comic/income/lesson-5/panel-1.png',
    '/comic/income/lesson-5/panel-2.png',
    '/comic/income/lesson-5/panel-3.png',
    '/comic/income/lesson-5/panel-4.png',
  ],
  'direction-before-speed': [
    '/comic/financial-planning/lesson-1/panel-1.png',
    '/comic/financial-planning/lesson-1/panel-2.png',
    '/comic/financial-planning/lesson-1/panel-3.png',
    '/comic/financial-planning/lesson-1/panel-4.png',
  ],
  'time-horizons-tradeoffs': [
    '/comic/financial-planning/lesson-2/panel-1.png',
    '/comic/financial-planning/lesson-2/panel-2.png',
    '/comic/financial-planning/lesson-2/panel-3.png',
    '/comic/financial-planning/lesson-2/panel-4.png',
  ],
  'wants-needs-targets': [
    '/comic/financial-planning/lesson-3/panel-1.png',
    '/comic/financial-planning/lesson-3/panel-2.png',
    '/comic/financial-planning/lesson-3/panel-3.png',
    '/comic/financial-planning/lesson-3/panel-4.png',
  ],
  'priority-stacking-focus': [
    '/comic/financial-planning/lesson-4/panel-1.png',
    '/comic/financial-planning/lesson-4/panel-2.png',
    '/comic/financial-planning/lesson-4/panel-3.png',
    '/comic/financial-planning/lesson-4/panel-4.png',
  ],
  'measuring-progress': [
    '/comic/financial-planning/lesson-5/panel-1.png',
    '/comic/financial-planning/lesson-5/panel-2.png',
    '/comic/financial-planning/lesson-5/panel-3.png',
    '/comic/financial-planning/lesson-5/panel-4.png',
  ],
  'why-saving-comes-before-spending': [
    '/comic/saving/lesson-1/panel-1.png',
    '/comic/saving/lesson-1/panel-2.png',
    '/comic/saving/lesson-1/panel-3.png',
    '/comic/saving/lesson-1/panel-4.png',
  ],
  'emergency-funds-and-targets': [
    '/comic/saving/lesson-2/panel-1.png',
    '/comic/saving/lesson-2/panel-2.png',
    '/comic/saving/lesson-2/panel-3.png',
    '/comic/saving/lesson-2/panel-4.png',
  ],
  'automating-and-maintaining-savings': [
    '/comic/saving/lesson-3/panel-1.png',
    '/comic/saving/lesson-3/panel-2.png',
    '/comic/saving/lesson-3/panel-3.png',
    '/comic/saving/lesson-3/panel-4.png',
  ],
  'saving-tradeoffs-and-opportunity-cost': [
    '/comic/saving/lesson-4/panel-1.png',
    '/comic/saving/lesson-4/panel-2.png',
    '/comic/saving/lesson-4/panel-3.png',
    '/comic/saving/lesson-4/panel-4.png',
  ],
  'when-to-increase-savings': [
    '/comic/saving/lesson-5/panel-1.png',
    '/comic/saving/lesson-5/panel-2.png',
    '/comic/saving/lesson-5/panel-3.png',
    '/comic/saving/lesson-5/panel-4.png',
  ],
  'ownership-time-consistency': [
    '/comic/investing/lesson-1/panel-1.png',
    '/comic/investing/lesson-1/panel-2.png',
    '/comic/investing/lesson-1/panel-3.png',
    '/comic/investing/lesson-1/panel-4.png',
  ],
  'what-you-buy-when-investing': [
    '/comic/investing/lesson-2/panel-1.png',
    '/comic/investing/lesson-2/panel-2.png',
    '/comic/investing/lesson-2/panel-3.png',
    '/comic/investing/lesson-2/panel-4.png',
  ],
  'risk-volatility-price-movement': [
    '/comic/investing/lesson-3/panel-1.png',
    '/comic/investing/lesson-3/panel-2.png',
    '/comic/investing/lesson-3/panel-3.png',
    '/comic/investing/lesson-3/panel-4.png',
  ],
  'diversification-risk-control': [
    '/comic/investing/lesson-4/panel-1.png',
    '/comic/investing/lesson-4/panel-2.png',
    '/comic/investing/lesson-4/panel-3.png',
    '/comic/investing/lesson-4/panel-4.png',
  ],
  'long-term-strategy': [
    '/comic/investing/lesson-5/panel-1.png',
    '/comic/investing/lesson-5/panel-2.png',
    '/comic/investing/lesson-5/panel-3.png',
    '/comic/investing/lesson-5/panel-4.png',
  ],
  'protecting-your-assets': [
    '/comic/insurance/lesson-1/panel-1.png',
    '/comic/insurance/lesson-1/panel-2.png',
    '/comic/insurance/lesson-1/panel-3.png',
    '/comic/insurance/lesson-1/panel-4.png',
  ],
  'insurance-basics-risk-transfer': [
    '/comic/insurance/lesson-2/panel-1.png',
    '/comic/insurance/lesson-2/panel-2.png',
    '/comic/insurance/lesson-2/panel-3.png',
    '/comic/insurance/lesson-2/panel-4.png',
  ],
  'fraud-scams-identity-protection': [
    '/comic/insurance/lesson-3/panel-1.png',
    '/comic/insurance/lesson-3/panel-2.png',
    '/comic/insurance/lesson-3/panel-3.png',
    '/comic/insurance/lesson-3/panel-4.png',
  ],
  'legal-basics-liability-protection': [
    '/comic/insurance/lesson-4/panel-1.png',
    '/comic/insurance/lesson-4/panel-2.png',
    '/comic/insurance/lesson-4/panel-3.png',
    '/comic/insurance/lesson-4/panel-4.png',
  ],
  'digital-security-protection-habits': [
    '/comic/insurance/lesson-5/panel-1.png',
    '/comic/insurance/lesson-5/panel-2.png',
    '/comic/insurance/lesson-5/panel-3.png',
    '/comic/insurance/lesson-5/panel-4.png',
  ],
  'understanding-taxes': [
    '/comic/taxes/lesson-1/panel-1.png',
    '/comic/taxes/lesson-1/panel-2.png',
    '/comic/taxes/lesson-1/panel-3.png',
    '/comic/taxes/lesson-1/panel-4.png',
  ],
  'income-types-taxation': [
    '/comic/taxes/lesson-2/panel-1.png',
    '/comic/taxes/lesson-2/panel-2.png',
    '/comic/taxes/lesson-2/panel-3.png',
    '/comic/taxes/lesson-2/panel-4.png',
  ],
  'deductions-credits': [
    '/comic/taxes/lesson-3/panel-1.png',
    '/comic/taxes/lesson-3/panel-2.png',
    '/comic/taxes/lesson-3/panel-3.png',
    '/comic/taxes/lesson-3/panel-4.png',
  ],
  'tax-advantaged-accounts': [
    '/comic/taxes/lesson-4/panel-1.png',
    '/comic/taxes/lesson-4/panel-2.png',
    '/comic/taxes/lesson-4/panel-3.png',
    '/comic/taxes/lesson-4/panel-4.png',
  ],
  'tax-planning-mindset': [
    '/comic/taxes/lesson-5/panel-1.png',
    '/comic/taxes/lesson-5/panel-2.png',
    '/comic/taxes/lesson-5/panel-3.png',
    '/comic/taxes/lesson-5/panel-4.png',
  ],
  'credit-debt-1': [
    '/comic/credit-debt/lesson-1/panel-1.png',
    '/comic/credit-debt/lesson-1/panel-2.png',
    '/comic/credit-debt/lesson-1/panel-3.png',
    '/comic/credit-debt/lesson-1/panel-4.png',
  ],
  'credit-debt-2': [
    '/comic/credit-debt/lesson-2/panel-1.png',
    '/comic/credit-debt/lesson-2/panel-2.png',
    '/comic/credit-debt/lesson-2/panel-3.png',
    '/comic/credit-debt/lesson-2/panel-4.png',
  ],
  'credit-debt-3': [
    '/comic/credit-debt/lesson-3/panel-1.png',
    '/comic/credit-debt/lesson-3/panel-2.png',
    '/comic/credit-debt/lesson-3/panel-3.png',
    '/comic/credit-debt/lesson-3/panel-4.png',
  ],
  'credit-debt-4': [
    '/comic/credit-debt/lesson-4/panel-1.png',
    '/comic/credit-debt/lesson-4/panel-2.png',
    '/comic/credit-debt/lesson-4/panel-3.png',
    '/comic/credit-debt/lesson-4/panel-4.png',
  ],
  'credit-debt-5': [
    '/comic/credit-debt/lesson-5/panel-1.png',
    '/comic/credit-debt/lesson-5/panel-2.png',
    '/comic/credit-debt/lesson-5/panel-3.png',
    '/comic/credit-debt/lesson-5/panel-4.png',
  ],
  'wealth-fundamentals-1': [
    '/comic/wealth-fundamentals/lesson-1/panel-1.png',
    '/comic/wealth-fundamentals/lesson-1/panel-2.png',
    '/comic/wealth-fundamentals/lesson-1/panel-3.png',
    '/comic/wealth-fundamentals/lesson-1/panel-4.png',
  ],
  'wealth-fundamentals-2': [
    '/comic/wealth-fundamentals/lesson-2/panel-1.png',
    '/comic/wealth-fundamentals/lesson-2/panel-2.png',
    '/comic/wealth-fundamentals/lesson-2/panel-3.png',
    '/comic/wealth-fundamentals/lesson-2/panel-4.png',
  ],
  'wealth-fundamentals-3': [
    '/comic/wealth-fundamentals/lesson-3/panel-1.png',
    '/comic/wealth-fundamentals/lesson-3/panel-2.png',
    '/comic/wealth-fundamentals/lesson-3/panel-3.png',
    '/comic/wealth-fundamentals/lesson-3/panel-4.png',
  ],
  'career-income-1': [
    '/comic/career-income/lesson-1/panel-1.png',
    '/comic/career-income/lesson-1/panel-2.png',
    '/comic/career-income/lesson-1/panel-3.png',
    '/comic/career-income/lesson-1/panel-4.png',
  ],
  'career-income-2': [
    '/comic/career-income/lesson-2/panel-1.png',
    '/comic/career-income/lesson-2/panel-2.png',
    '/comic/career-income/lesson-2/panel-3.png',
    '/comic/career-income/lesson-2/panel-4.png',
  ],
  'career-income-3': [
    '/comic/career-income/lesson-3/panel-1.png',
    '/comic/career-income/lesson-3/panel-2.png',
    '/comic/career-income/lesson-3/panel-3.png',
    '/comic/career-income/lesson-3/panel-4.png',
  ],
  'career-income-4': [
    '/comic/career-income/lesson-4/panel-1.png',
    '/comic/career-income/lesson-4/panel-2.png',
    '/comic/career-income/lesson-4/panel-3.png',
    '/comic/career-income/lesson-4/panel-4.png',
  ],
  'career-income-5': [
    '/comic/career-income/lesson-5/panel-1.png',
    '/comic/career-income/lesson-5/panel-2.png',
    '/comic/career-income/lesson-5/panel-3.png',
    '/comic/career-income/lesson-5/panel-4.png',
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
