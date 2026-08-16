/**
 * Curriculum columns for the teacher dashboard's module matrix.
 *
 * Progress rows arrive from the database keyed by (module_id, module_type), but
 * the module names live in the static curriculum data. This assembles the two
 * into the ordered column list each track renders, and keeps the module_type
 * strings in one place so the sync hooks and the dashboard cannot drift apart.
 */

import { PERSONAL_FINANCE_MODULES } from '@/data/personal-finance/modules';
import { VILLAGE_MODULES } from '@/data/village-lessons';
import { CAREER_MODULES } from '@/data/career-readiness/modules';
import { economicsUnits } from '@/data/economics-curriculum';
import { getAllModules } from '@/data/market-intelligence/catalog';

export interface CurriculumColumn {
  moduleId: string;
  label: string;
  /** Short form for the matrix header, which is tight on horizontal space. */
  shortLabel: string;
}

export interface CurriculumTrack {
  moduleType: string;
  label: string;
  columns: CurriculumColumn[];
}

/** First letters of the first two words, e.g. "Personal Brand" -> "PB". */
function initials(label: string): string {
  return label
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function column(moduleId: string, label: string): CurriculumColumn {
  return { moduleId, label, shortLabel: initials(label) };
}

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    moduleType: 'personal-finance',
    label: 'Personal Finance',
    columns: PERSONAL_FINANCE_MODULES.map((m) => column(m.id, m.name)),
  },
  {
    moduleType: 'market-intelligence',
    label: 'Market Intelligence',
    columns: VILLAGE_MODULES.filter((m) => m.lessons.length > 0).map((m) => column(m.id, m.name)),
  },
  {
    moduleType: 'career-readiness',
    label: 'Career Readiness',
    columns: CAREER_MODULES.map((m) => column(m.id, m.title)),
  },
  {
    moduleType: 'economics',
    label: 'Economics Units',
    columns: [...economicsUnits]
      .sort((a, b) => a.order - b.order)
      .map((u) => column(u.id, u.title)),
  },
  {
    moduleType: 'market-intelligence-catalog',
    label: 'MI Catalog',
    columns: getAllModules()
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((m) => column(m.id, m.title)),
  },
];

const LABELS_BY_TYPE = new Map(CURRICULUM_TRACKS.map((t) => [t.moduleType, t]));

export function getTrack(moduleType: string): CurriculumTrack | undefined {
  return LABELS_BY_TYPE.get(moduleType);
}

/** Human label for a module, falling back to the raw id for unknown modules. */
export function moduleLabel(moduleType: string, moduleId: string): string {
  const track = LABELS_BY_TYPE.get(moduleType);
  const found = track?.columns.find((c) => c.moduleId === moduleId);
  if (found) return found.label;
  // Legacy rows use other module_types (soft_skills, consulting, ...).
  return moduleId.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function trackLabel(moduleType: string): string {
  return (
    LABELS_BY_TYPE.get(moduleType)?.label ??
    moduleType.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
