import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  KeyRound,
  Plus,
  Loader2,
  RefreshCw,
  Users,
  ChevronDown,
  GraduationCap,
  Clock,
  MoreHorizontal,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

type GrantsRole = 'user' | 'teacher';

interface AccessCodeRow {
  id: string;
  code: string;
  label: string | null;
  is_active: boolean;
  redeemed_count: number;
  created_at: string;
  grants_role: GrantsRole | null;
  expires_at: string | null;
  max_redemptions: number | null;
}

interface CodeUserRow {
  username: string | null;
  email: string | null;
  created_at: string;
}

// access_codes is newer than the generated Supabase types — use a loose client here.
const db = supabase as any;

/** Days a new code stays usable. '0' means it never expires. */
const DURATIONS = [
  { value: '1', label: '24 hours' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
  { value: '180', label: 'One semester (180 days)' },
  { value: '365', label: 'One year' },
  { value: '0', label: 'Never expires' },
];

/** '0' means unlimited. */
const USE_LIMITS = [
  { value: '1', label: '1 sign-up' },
  { value: '5', label: '5 sign-ups' },
  { value: '15', label: '15 sign-ups' },
  { value: '40', label: '40 sign-ups (one class)' },
  { value: '150', label: '150 sign-ups' },
  { value: '0', label: 'Unlimited' },
];

function randomCode(role: GrantsRole): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no easily-confused chars
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${role === 'teacher' ? 'TEACH' : 'PHIL'}-${suffix}`;
}

function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

function isExpired(row: AccessCodeRow): boolean {
  return !!row.expires_at && new Date(row.expires_at).getTime() <= Date.now();
}

function isUsedUp(row: AccessCodeRow): boolean {
  return row.max_redemptions !== null && row.redeemed_count >= row.max_redemptions;
}

/** One line describing the limits, so a glance answers "does this still work?". */
function limitsSummary(row: AccessCodeRow): string {
  const parts: string[] = [];

  if (!row.expires_at) {
    parts.push('never expires');
  } else if (isExpired(row)) {
    parts.push(`expired ${new Date(row.expires_at).toLocaleDateString()}`);
  } else {
    const days = daysUntil(row.expires_at);
    parts.push(days <= 1 ? 'expires today' : `expires in ${days} days`);
  }

  parts.push(
    row.max_redemptions === null
      ? `${row.redeemed_count} sign-up${row.redeemed_count === 1 ? '' : 's'}`
      : `${row.redeemed_count} of ${row.max_redemptions} used`
  );

  return parts.join(' · ');
}

const AccessCodeManager: React.FC = () => {
  const { user } = useAuth();
  const [codes, setCodes] = useState<AccessCodeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newRole, setNewRole] = useState<GrantsRole>('user');
  const [newDuration, setNewDuration] = useState('180');
  const [newMaxUses, setNewMaxUses] = useState('0');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [usersByCode, setUsersByCode] = useState<Record<string, CodeUserRow[]>>({});
  const [loadingUsersId, setLoadingUsersId] = useState<string | null>(null);

  // Teacher codes hand out the ability to see student data, so they default to
  // one use and a short life. Student codes stay open for a class to trickle in.
  const applyRoleDefaults = (role: GrantsRole) => {
    setNewRole(role);
    setNewDuration(role === 'teacher' ? '30' : '180');
    setNewMaxUses(role === 'teacher' ? '1' : '0');
  };

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
    const code = (newCode.trim() || randomCode(newRole)).toUpperCase();
    const days = Number(newDuration);
    const maxUses = Number(newMaxUses);

    setCreating(true);
    const { error } = await db.from('access_codes').insert({
      code,
      label: newLabel.trim() || null,
      grants_role: newRole,
      created_by: user?.id ?? null,
      expires_at: days > 0 ? new Date(Date.now() + days * 86_400_000).toISOString() : null,
      max_redemptions: maxUses > 0 ? maxUses : null,
    });
    setCreating(false);
    if (error) {
      const detail = error.message || error.hint || error.code || 'unknown error';
      toast.error(
        error.code === '23505' ? 'That code already exists' : `Could not create code: ${detail}`
      );
      return;
    }
    toast.success(newRole === 'teacher' ? `Teacher code ${code} created` : `Code ${code} created`);
    setNewCode('');
    setNewLabel('');
    applyRoleDefaults('user');
    loadCodes();
  };

  const patchCode = async (row: AccessCodeRow, changes: Partial<AccessCodeRow>, note: string) => {
    const { error } = await db.from('access_codes').update(changes).eq('id', row.id);
    if (error) {
      toast.error('Could not update code');
      return;
    }
    setCodes((prev) => prev.map((c) => (c.id === row.id ? { ...c, ...changes } : c)));
    toast.success(note);
  };

  const setExpiry = (row: AccessCodeRow, days: number | null) =>
    patchCode(
      row,
      { expires_at: days === null ? null : new Date(Date.now() + days * 86_400_000).toISOString() },
      days === null ? `${row.code} no longer expires` : `${row.code} now expires in ${days} days`
    );

  const toggleActive = (row: AccessCodeRow) =>
    patchCode(
      row,
      { is_active: !row.is_active },
      row.is_active ? `${row.code} turned off` : `${row.code} turned on`
    );

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
          People need an active code to create an account. Set how long a code lasts and how
          many people can use it — both limits are enforced at sign-up, not just here. Turning a
          code off or letting it expire never affects accounts already created with it.
        </p>

        {/* Create */}
        <form onSubmit={handleCreate} className="space-y-3 rounded-xl border bg-muted/20 p-3">
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
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
            <Select value={newRole} onValueChange={(v) => applyRoleDefaults(v as GrantsRole)}>
              <SelectTrigger className="sm:w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Student code</SelectItem>
                <SelectItem value="teacher">Teacher code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Valid for</Label>
              <Select value={newDuration} onValueChange={setNewDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Usable by</Label>
              <Select value={newMaxUses} onValueChange={setNewMaxUses}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {USE_LIMITS.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-900 sm:w-auto"
                disabled={creating}
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {newRole === 'teacher' && (
          <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <p>
              A teacher code grants the teacher role at sign-up and unlocks the classroom
              dashboard. Send it only to instructors — anyone who redeems it can see student
              progress for the classes they create. Defaults to one use so a forwarded code
              cannot mint a second teacher.
            </p>
          </div>
        )}

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
              const expired = isExpired(row);
              const usedUp = isUsedUp(row);
              const usable = row.is_active && !expired && !usedUp;

              return (
                <div key={row.id} className="rounded-xl border">
                  <div className="flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold tracking-wide">{row.code}</span>
                        {row.grants_role === 'teacher' && (
                          <Badge className="bg-amber-100 text-amber-900 border-amber-200">
                            <GraduationCap className="h-3 w-3 mr-1" />
                            Teacher
                          </Badge>
                        )}
                        {usable ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                            Active
                          </Badge>
                        ) : !row.is_active ? (
                          <Badge variant="outline" className="text-muted-foreground">
                            Off
                          </Badge>
                        ) : expired ? (
                          <Badge className="bg-rose-100 text-rose-800 border-rose-200">
                            Expired
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-700 border-slate-200">
                            Used up
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {row.label ? `${row.label} · ` : ''}
                        {limitsSummary(row)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => toggleSignups(row)}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Signups</span>
                        <ChevronDown
                          className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="flex items-center gap-1.5 text-xs">
                            <Clock className="h-3.5 w-3.5" />
                            Change expiry
                          </DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setExpiry(row, 7)}>
                            7 days from now
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setExpiry(row, 30)}>
                            30 days from now
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setExpiry(row, 180)}>
                            180 days from now
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setExpiry(row, null)}>
                            Never expires
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              patchCode(
                                row,
                                { max_redemptions: null },
                                `${row.code} can now be used any number of times`
                              )
                            }
                          >
                            Remove sign-up limit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              patchCode(
                                row,
                                { max_redemptions: row.redeemed_count + 1 },
                                `${row.code} allows one more sign-up`
                              )
                            }
                          >
                            Allow one more sign-up
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

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
