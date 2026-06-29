import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { KeyRound, Plus, Loader2, RefreshCw, Users, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AccessCodeRow {
  id: string;
  code: string;
  label: string | null;
  is_active: boolean;
  redeemed_count: number;
  created_at: string;
}

interface CodeUserRow {
  username: string | null;
  email: string | null;
  created_at: string;
}

// access_codes is newer than the generated Supabase types — use a loose client here.
const db = supabase as any;

function randomCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no easily-confused chars
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `PHIL-${suffix}`;
}

const AccessCodeManager: React.FC = () => {
  const { user } = useAuth();
  const [codes, setCodes] = useState<AccessCodeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [usersByCode, setUsersByCode] = useState<Record<string, CodeUserRow[]>>({});
  const [loadingUsersId, setLoadingUsersId] = useState<string | null>(null);

  const toggleSignups = useCallback(
    async (row: AccessCodeRow) => {
      if (expandedId === row.id) {
        setExpandedId(null);
        return;
      }
      setExpandedId(row.id);
      if (usersByCode[row.id]) return; // already loaded
      setLoadingUsersId(row.id);
      const { data, error } = await db.rpc('admin_list_code_users', { p_code: row.code });
      setLoadingUsersId(null);
      if (error) {
        toast.error('Could not load sign-ups');
        return;
      }
      setUsersByCode((prev) => ({ ...prev, [row.id]: (data ?? []) as CodeUserRow[] }));
    },
    [expandedId, usersByCode]
  );

  const loadCodes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db
      .from('access_codes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Could not load access codes');
    } else {
      setCodes((data ?? []) as AccessCodeRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCodes();
  }, [loadCodes]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = (newCode.trim() || randomCode()).toUpperCase();
    setCreating(true);
    const { error } = await db.from('access_codes').insert({
      code,
      label: newLabel.trim() || null,
      created_by: user?.id ?? null,
    });
    setCreating(false);
    if (error) {
      const detail = error.message || error.hint || error.code || 'unknown error';
      toast.error(
        error.code === '23505' ? 'That code already exists' : `Could not create code: ${detail}`
      );
      return;
    }
    toast.success(`Code ${code} created`);
    setNewCode('');
    setNewLabel('');
    loadCodes();
  };

  const toggleActive = async (row: AccessCodeRow) => {
    const { error } = await db
      .from('access_codes')
      .update({ is_active: !row.is_active })
      .eq('id', row.id);
    if (error) {
      toast.error('Could not update code');
      return;
    }
    setCodes((prev) =>
      prev.map((c) => (c.id === row.id ? { ...c, is_active: !c.is_active } : c))
    );
  };

  return (
    <Card className="border-emerald-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-emerald-900">
          <span className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Access Codes
          </span>
          <Button variant="ghost" size="sm" onClick={loadCodes} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm text-muted-foreground">
          People need an active code to create an account. Hand out a code, and turn it off
          here anytime to stop new sign-ups with it. Existing accounts are not affected.
        </p>

        {/* Create */}
        <form onSubmit={handleCreate} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
          <Input
            placeholder="Code (blank = auto)"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="uppercase"
            autoCapitalize="characters"
          />
          <Input
            placeholder="Label (e.g. Period 3)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-emerald-800 hover:bg-emerald-900"
            disabled={creating}
          >
            {creating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </form>

        {/* List */}
        <div className="space-y-2">
          {loading ? (
            <p className="text-sm text-muted-foreground text-center py-4">Loading…</p>
          ) : codes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No codes yet. Create one above.
            </p>
          ) : (
            codes.map((row) => {
              const expanded = expandedId === row.id;
              const signups = usersByCode[row.id];
              return (
                <div key={row.id} className="rounded-xl border">
                  <div className="flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold tracking-wide">{row.code}</span>
                        {row.is_active ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Off
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {row.label ? `${row.label} · ` : ''}
                        {row.redeemed_count} sign-up{row.redeemed_count === 1 ? '' : 's'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => toggleSignups(row)}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Signups
                        <ChevronDown
                          className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                      </Button>
                      <Button
                        variant={row.is_active ? 'outline' : 'default'}
                        size="sm"
                        className={row.is_active ? '' : 'bg-emerald-800 hover:bg-emerald-900'}
                        onClick={() => toggleActive(row)}
                      >
                        {row.is_active ? 'Turn off' : 'Turn on'}
                      </Button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="border-t bg-muted/30 px-3 py-2">
                      {loadingUsersId === row.id ? (
                        <p className="text-xs text-muted-foreground py-2 flex items-center gap-2">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Loading sign-ups…
                        </p>
                      ) : !signups || signups.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-2">
                          No one has signed up with this code yet.
                        </p>
                      ) : (
                        <ul className="divide-y">
                          {signups.map((u, i) => (
                            <li key={i} className="py-2 flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {u.username || 'No name'}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {u.email || 'No email'}
                                </p>
                              </div>
                              <span className="text-[11px] text-muted-foreground shrink-0">
                                {new Date(u.created_at).toLocaleDateString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessCodeManager;
