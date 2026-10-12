import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ getSession: vi.fn(), rpc: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { getSession: mocks.getSession }, rpc: mocks.rpc } }));
import { queueModuleProgressSync } from './progressSync';
import { founderProgressSyncEntries } from './founderJourneyProgress';
import { EMPTY_FOUNDER_PROGRESS } from '@/hooks/useFounderJourneyProgress';

beforeEach(() => {
  vi.useFakeTimers(); localStorage.clear(); vi.clearAllMocks();
  mocks.getSession.mockResolvedValue({ data: { session: { user: { id: 'student-a' } } } });
  mocks.rpc.mockResolvedValue({ error: null });
});
afterEach(async () => { await vi.runAllTimersAsync(); vi.useRealTimers(); });

describe('write-through classroom progress sync', () => {
  it('sends Founder completion through the existing authenticated RPC', async () => {
    const entries = founderProgressSyncEntries({ ...EMPTY_FOUNDER_PROGRESS, completedMissionIds: ['idea-to-mvp'] });
    queueModuleProgressSync(entries, 'student-a');
    await vi.advanceTimersByTimeAsync(1500);
    expect(mocks.rpc).toHaveBeenCalledWith('sync_module_progress', { p_entries: expect.arrayContaining([expect.objectContaining({ module_id: 'idea-and-mvp', module_type: 'founder-journey', progress_percentage: 33 })]) });
  });
  it('does not write a previous account’s queued progress into a new account', async () => {
    queueModuleProgressSync([{ moduleId: 'idea-and-mvp', moduleType: 'founder-journey', progressPercentage: 100 }], 'student-a');
    mocks.getSession.mockResolvedValue({ data: { session: { user: { id: 'student-b' } } } });
    await vi.advanceTimersByTimeAsync(1500);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it('keeps guests local and retries a failed write on the next queued change', async () => {
    mocks.getSession.mockResolvedValueOnce({ data: { session: null } });
    const entry = { moduleId: 'idea-and-mvp', moduleType: 'founder-journey', progressPercentage: 33 };
    queueModuleProgressSync([entry], null);
    await vi.advanceTimersByTimeAsync(1500);
    expect(mocks.rpc).not.toHaveBeenCalled();
    mocks.rpc.mockResolvedValueOnce({ error: { message: 'offline' } });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    queueModuleProgressSync([entry], 'student-a');
    await vi.advanceTimersByTimeAsync(1500);
    queueModuleProgressSync([entry], 'student-a');
    await vi.advanceTimersByTimeAsync(1500);
    expect(mocks.rpc).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });
});
