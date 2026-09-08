import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Loader2, RefreshCw, UserMinus, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TeacherRow {
  user_id: string;
  email: string | null;
  username: string | null;
  created_at: string | null;
  classroom_count: number;
  student_count: number;
}

// admin_list_teachers / admin_set_teacher_role postdate the generated types.
const db = supabase as unknown as {
  rpc: (
    fn: string,
    args?: Record<string, unknown>
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

function num(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Grant or revoke teacher access for an account that already exists.
 *
 * Issuing a teacher code only helps someone who has not signed up yet. This
 * covers the rest: a teacher who joined with a student code, an account created
 * before teacher codes existed, or an instructor who has left and should no
 * longer see student data.
 */
const TeacherAccessManager: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [granting, setGranting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db.rpc('admin_list_teachers');
    if (error) {
      toast.error('Could not load teachers');
    } else {
      setTeachers(
        ((data ?? []) as TeacherRow[]).map((t) => ({
          ...t,
          classroom_count: num(t.classroom_count),
          student_count: num(t.student_count),
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setRole = async (targetEmail: string, grant: boolean) => {
    const { error } = await db.rpc('admin_set_teacher_role', {
      p_email: targetEmail,
      p_grant: grant,
    });
    if (error) {
      toast.error(error.message || 'Could not update teacher access');
      return false;
    }
    toast.success(
      grant ? `${targetEmail} can now use the teacher dashboard` : `Removed teacher access for ${targetEmail}`
    );
    await load();
    return true;
  };

  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setGranting(true);
    const ok = await setRole(email.trim(), true);
    setGranting(false);
    if (ok) setEmail('');
  };

  return (
    <Card className="border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-amber-900">
          <span className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Teacher Access
          </span>
          <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm text-muted-foreground">
          Teacher codes only work for people who have not signed up yet. Use this to turn an
          existing account into a teacher, or to take access away.
        </p>

        <form onSubmit={handleGrant} className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="teacher@school.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-amber-700 hover:bg-amber-800 sm:w-auto"
            disabled={granting || !email.trim()}
          >
            {granting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="mr-1 h-4 w-4" />
                Make teacher
              </>
            )}
          </Button>
        </form>

        <div className="space-y-2">
          {loading ? (
            <p className="py-4 text-center text-sm text-muted-foreground">Loading…</p>
          ) : teachers.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No teacher accounts yet. Issue a teacher code above, or grant access by email.
            </p>
          ) : (
            teachers.map((teacher) => (
              <div
                key={teacher.user_id}
                className="flex items-center justify-between gap-3 rounded-xl border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {teacher.username || teacher.email || 'Unnamed teacher'}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {teacher.email ?? 'No email'} · {teacher.classroom_count} class
                    {teacher.classroom_count === 1 ? '' : 'es'} · {teacher.student_count} student
                    {teacher.student_count === 1 ? '' : 's'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  disabled={!teacher.email || busyId === teacher.user_id}
                  onClick={async () => {
                    if (!teacher.email) return;
                    setBusyId(teacher.user_id);
                    await setRole(teacher.email, false);
                    setBusyId(null);
                  }}
                >
                  {busyId === teacher.user_id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <UserMinus className="mr-1 h-4 w-4" />
                      Revoke
                    </>
                  )}
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherAccessManager;
