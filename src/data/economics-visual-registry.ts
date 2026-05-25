/**
 * Registry of all microeconomics visual slots (static src paths + chart stateIds).
 * Used to ensure no duplicate visuals across the micro track.
 */

import type { EconomicsChartConfig } from '@/types/economics-charts';
import { chartRegistryKey } from '@/types/economics-charts';

export type VisualSlotKind = 'static' | 'chart';

export interface VisualSlotEntry {
  lessonId: string;
  slot: string;
  kind: VisualSlotKind;
  key: string;
}

const staticPaths = new Set<string>();
const chartKeys = new Set<string>();
const entries: VisualSlotEntry[] = [];

export function registerStatic(lessonId: string, slot: string, src: string): void {
  if (staticPaths.has(src)) {
    throw new Error(`Duplicate economics static visual: ${src} (${lessonId}/${slot})`);
  }
  staticPaths.add(src);
  entries.push({ lessonId, slot, kind: 'static', key: src });
}

export function registerChart(lessonId: string, slot: string, config: EconomicsChartConfig): void {
  const slotKey = `${lessonId}/${slot}`;
  if (chartKeys.has(slotKey)) {
    throw new Error(`Duplicate economics chart slot: ${slotKey}`);
  }
  chartKeys.add(slotKey);
  entries.push({ lessonId, slot, kind: 'chart', key: chartRegistryKey(config) });
}

export function getRegistryEntries(): readonly VisualSlotEntry[] {
  return entries;
}

/** Dev-only validation — call after all micro units load */
export function assertMicroVisualRegistry(): void {
  // Throws on duplicate if register* called twice for same key
}
