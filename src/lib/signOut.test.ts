import { describe, expect, it, vi } from 'vitest';
import { signOutAndReturnToWelcome } from '@/lib/signOut';

describe('signOutAndReturnToWelcome', () => {
  it('redirects after a successful local sign-out', async () => {
    const endSession = vi.fn().mockResolvedValue({ error: null });
    const redirect = vi.fn();

    await signOutAndReturnToWelcome(endSession, redirect);

    expect(endSession).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledOnce();
  });

  it('still redirects when session cleanup rejects', async () => {
    const endSession = vi.fn().mockRejectedValue(new Error('network unavailable'));
    const redirect = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await signOutAndReturnToWelcome(endSession, redirect);

    expect(redirect).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });

  it('still redirects when Supabase returns an error result', async () => {
    const endSession = vi.fn().mockResolvedValue({ error: new Error('already signed out') });
    const redirect = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await signOutAndReturnToWelcome(endSession, redirect);

    expect(redirect).toHaveBeenCalledOnce();
    consoleSpy.mockRestore();
  });
});
