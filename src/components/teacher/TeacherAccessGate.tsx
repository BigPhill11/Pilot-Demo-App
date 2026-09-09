import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { redeemRoleCode } from '@/lib/accessCode';
import { useAuth } from '@/hooks/useAuth';

/**
 * What a signed-in student sees at /teach.
 *
 * Bouncing them silently to the home page was the old behaviour, and it made
 * the one case that actually matters — a teacher who signed up with a student
 * code, or before teacher codes existed — indistinguishable from a wrong turn.
 * Offering the upgrade here is also the only self-serve route into the
 * dashboard for an account that already exists.
 */
const TeacherAccessGate: React.FC = () => {
  const navigate = useNavigate();
  const { refreshRoles } = useAuth();
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setSubmitting(true);
    try {
      const result = await redeemRoleCode(code);
      await refreshRoles();
      toast.success(
        result.already_held
          ? 'You already have teacher access.'
          : 'Teacher access unlocked. Welcome in.'
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not redeem that code');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
          <GraduationCap className="h-6 w-6 text-emerald-700" />
        </div>
        <h1 className="text-center text-xl font-semibold">Teacher access</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          The classroom dashboard is for instructors. If you were given a teacher code, enter
          it here to unlock it on this account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <Input
            placeholder="TEACH-XXXX"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-center font-mono uppercase tracking-widest"
            autoCapitalize="characters"
            autoComplete="off"
          />
          <Button type="submit" className="w-full" disabled={submitting || !code.trim()}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Unlock teacher dashboard
          </Button>
        </form>

        <Button variant="ghost" className="mt-3 w-full" onClick={() => navigate('/')}>
          Back to the app
        </Button>
      </div>
    </div>
  );
};

export default TeacherAccessGate;
