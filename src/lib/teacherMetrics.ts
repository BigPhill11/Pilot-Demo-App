/**
 * Derived metrics for the teacher dashboard: how a student is doing at a
 * glance, and the class-level rollups that sit above the roster.
 */

import type { RosterEntry } from '@/integrations/supabase/teacherTypes';

export type StudentStatus = 'thriving' | 'steady' | 'nudge' | 'inactive';

export interface StatusMeta {
  label: string;
  /** Tailwind classes for the roster badge. */
  className: string;
  description: string;
}

export const STATUS_META: Record<StudentStatus, StatusMeta> = {
  thriving: {
    label: 'Thriving',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Active this week and making steady progress',
  },
  steady: {
    label: 'Steady',
    className: 'bg-sky-100 text-sky-800 border-sky-200',
    description: 'Showing up and moving through the material',
  },
  nudge: {
    label: 'Needs a nudge',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
    description: 'Signed in recently but progress has stalled',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'No sign-in in the last two weeks',
  },
};

export function daysSince(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  const then = new Date(dateString);
  if (Number.isNaN(then.getTime())) return null;
  const ms = Date.now() - then.getTime();
  return Math.floor(ms / 86_400_000);
}

/**
 * Status combines recency with progress, because either signal alone misleads:
 * a student who logs in daily but finishes nothing still needs attention, and
 * one who finished six modules last month is not "thriving" today.
 */
export function studentStatus(entry: RosterEntry): StudentStatus {
  const idle = daysSince(entry.last_login_date);
  if (idle === null || idle > 14) return 'inactive';

  const activeRecently = idle <= 7;
  const movingForward = entry.modules_completed > 0 || entry.modules_in_progress > 0;

  if (activeRecently && entry.modules_completed >= 2 && entry.days_active_30 >= 8) {
    return 'thriving';
  }
  if (activeRecently && movingForward) return 'steady';
  if (!movingForward || !activeRecently) return 'nudge';
  return 'steady';
}

export interface ClassSummary {
  studentCount: number;
  activeLast7: number;
  avgModulesCompleted: number;
  avgStreak: number;
  needsAttention: number;
  totalXp: number;
}

export function summarizeClass(roster: RosterEntry[]): ClassSummary {
  if (roster.length === 0) {
    return {
      studentCount: 0,
      activeLast7: 0,
      avgModulesCompleted: 0,
      avgStreak: 0,
      needsAttention: 0,
      totalXp: 0,
    };
  }

  let activeLast7 = 0;
  let modulesSum = 0;
  let streakSum = 0;
  let needsAttention = 0;
  let totalXp = 0;

  for (const entry of roster) {
    const idle = daysSince(entry.last_login_date);
    if (idle !== null && idle <= 7) activeLast7 += 1;
    modulesSum += entry.modules_completed;
    streakSum += entry.current_streak;
    totalXp += entry.total_points;
    const status = studentStatus(entry);
    if (status === 'nudge' || status === 'inactive') needsAttention += 1;
  }

  return {
    studentCount: roster.length,
    activeLast7,
    avgModulesCompleted: Math.round((modulesSum / roster.length) * 10) / 10,
    avgStreak: Math.round((streakSum / roster.length) * 10) / 10,
    needsAttention,
    totalXp,
  };
}

export function formatLastActive(dateString: string | null | undefined): string {
  const days = daysSince(dateString);
  if (days === null) return 'Never';
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return 'Last week';
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

function csvCell(value: string | number | null | undefined): string {
  const text = value === null || value === undefined ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function rosterToCsv(roster: RosterEntry[]): string {
  const headers = [
    'Student',
    'Status',
    'Last active',
    'Current streak',
    'Longest streak',
    'Days active (30d)',
    'Modules completed',
    'Modules in progress',
    'Average progress %',
    'Career levels completed',
    'Teach-backs passed',
    'Total XP',
  ];

  const rows = roster.map((entry) =>
    [
      entry.username ?? 'Unnamed',
      STATUS_META[studentStatus(entry)].label,
      entry.last_login_date ?? '',
      entry.current_streak,
      entry.longest_streak,
      entry.days_active_30,
      entry.modules_completed,
      entry.modules_in_progress,
      entry.avg_progress,
      entry.career_levels_completed,
      entry.teach_backs_completed,
      entry.total_points,
    ].map(csvCell).join(',')
  );

  return [headers.map(csvCell).join(','), ...rows].join('\n');
}

export function downloadCsv(filename: string, contents: string): void {
  const blob = new Blob([contents], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
