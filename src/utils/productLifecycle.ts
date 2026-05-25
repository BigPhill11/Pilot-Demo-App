export type ProductLifecycleStage = 'Introduction' | 'Growth' | 'Maturity' | 'Decline';

const STAGES: ProductLifecycleStage[] = ['Introduction', 'Growth', 'Maturity', 'Decline'];

/** Stable lifecycle label from company id (for demo / template cards). */
export function inferProductLifecycleStage(companyId: string): ProductLifecycleStage {
  const hash = companyId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return STAGES[hash % STAGES.length];
}

export function lifecycleBadgeClass(stage: ProductLifecycleStage): string {
  switch (stage) {
    case 'Introduction':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Growth':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Maturity':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Decline':
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}
