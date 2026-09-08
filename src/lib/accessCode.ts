import { supabase } from '@/integrations/supabase/client';

/**
 * Pre-checks a sign-up access code so the form can give instant feedback before
 * creating an account. This is a READ-ONLY check (`check_access_code`) that does
 * NOT consume the code — the authoritative validation + redemption happens
 * server-side in the `handle_new_user` trigger when the account is actually created
 * (the client also passes the code in signUp metadata). The codes table is never
 * readable by anonymous clients; only these SECURITY DEFINER RPCs are.
 *
 * Returns true only for an active, matching code. Network/RPC errors return false
 * so a failure never silently lets someone through.
 */
export async function validateAccessCode(code: string): Promise<boolean> {
  const trimmed = code.trim();
  if (!trimmed) return false;

  // Cast: access_codes / check_access_code are newer than the generated Supabase types.
  const { data, error } = await (supabase as any).rpc('check_access_code', {
    p_code: trimmed.toUpperCase(),
  });

  if (error) return false;
  return data === true;
}

export interface RoleRedemption {
  granted: boolean;
  role: string;
  already_held: boolean;
}

/**
 * Redeems a privileged code for an account that already exists.
 *
 * Roles are otherwise only ever assigned by the `handle_new_user` trigger at
 * sign-up, which leaves a teacher who signed up with a student code — or before
 * teacher codes existed — with no way to reach the dashboard. Throws with the
 * server's message so the caller can show why a code was refused (wrong kind,
 * expired, already fully used).
 */
export async function redeemRoleCode(code: string): Promise<RoleRedemption> {
  const client = supabase as unknown as {
    rpc: (
      fn: string,
      args: Record<string, unknown>
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
  };
  const { data, error } = await client.rpc('redeem_access_code_for_role', {
    p_code: code.trim().toUpperCase(),
  });
  if (error) throw new Error(error.message || 'Could not redeem that code');
  return data as RoleRedemption;
}
