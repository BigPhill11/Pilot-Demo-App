/**
 * Write-through sync from the localStorage-only progress hooks into
 * public.module_progress.
 *
 * Several curriculum areas — Market Intelligence village lessons, the MI module
 * catalog, the economics units, and career readiness — only ever persisted to
 * localStorage. That makes them invisible to anything server-side, including
 * the teacher dashboard. Each of those hooks now hands its derived per-module
 * percentages to `queueModuleProgressSync` on every save.
 *
 * Deliberately decoupled from React: this reads the session straight off the
 * Supabase client, so a hook can call it from inside its existing save effect
 * without needing auth context.
 *
 * Safety: the server RPC never lowers a stored percentage, so a signed-in
 * student opening the app on a fresh device (empty localStorage) cannot erase
 * progress recorded elsewhere.
 */

import { supabase } from '@/integrations/supabase/client';
import { scopedStorageKey } from '@/lib/userScopedStorage';

export interface ProgressSyncEntry {
  moduleId: string;
  moduleType: string;
  /** 0-100. Values <= 0 are ignored server-side unless a row already exists. */
  progressPercentage: number;
  detailedProgress?: Record<string, unknown>;
}

const DEBOUNCE_MS = 1500;
const SYNCED_KEY = 'module_progress_synced_v1';

const pending = new Map<string, ProgressSyncEntry>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const entryKey = (e: ProgressSyncEntry) => `${e.moduleType}::${e.moduleId}`;

function readSyncedMap(userId: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(scopedStorageKey(SYNCED_KEY, userId));
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function writeSyncedMap(userId: string, map: Record<string, number>): void {
  try {
    localStorage.setItem(scopedStorageKey(SYNCED_KEY, userId), JSON.stringify(map));
  } catch {
    /* ignore quota errors — a lost cache only costs a redundant write */
  }
}

async function flush(): Promise<void> {
  flushTimer = null;
  const batch = Array.from(pending.values());
  pending.clear();
  if (batch.length === 0) return;

  try {
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    // Guests keep localStorage as their only store.
    if (!userId) return;

    // Skip anything already known to be at this percentage on the server. This
    // is what keeps the first render after sign-in from re-posting the whole
    // curriculum on every app open.
    const synced = readSyncedMap(userId);
    const changed = batch.filter((e) => synced[entryKey(e)] !== e.progressPercentage);
    if (changed.length === 0) return;

    const rpc = supabase as unknown as {
      rpc: (fn: string, args: Record<string, unknown>) => Promise<{ error: { message: string } | null }>;
    };

    const { error } = await rpc.rpc('sync_module_progress', {
      p_entries: changed.map((e) => ({
        module_id: e.moduleId,
        module_type: e.moduleType,
        progress_percentage: Math.round(e.progressPercentage),
        detailed_progress: e.detailedProgress ?? {},
      })),
    });

    if (error) {
      // Leave the cache untouched so the next change retries this batch.
      console.warn('Module progress sync failed:', error.message);
      return;
    }

    for (const e of changed) synced[entryKey(e)] = e.progressPercentage;
    writeSyncedMap(userId, synced);
  } catch (err) {
    console.warn('Module progress sync failed:', err);
  }
}

/**
 * Queue per-module percentages for the signed-in user. Safe to call on every
 * state change: calls coalesce, and unchanged modules never hit the network.
 */
export function queueModuleProgressSync(entries: ProgressSyncEntry[]): void {
  if (typeof window === 'undefined' || entries.length === 0) return;

  for (const entry of entries) {
    if (!entry.moduleId || !entry.moduleType) continue;
    pending.set(entryKey(entry), entry);
  }

  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => void flush(), DEBOUNCE_MS);
}

/** Clears the "already synced" cache so the next save re-posts everything. */
export function resetProgressSyncCache(userId: string | null | undefined): void {
  if (!userId) return;
  try {
    localStorage.removeItem(scopedStorageKey(SYNCED_KEY, userId));
  } catch {
    /* ignore */
  }
}
