import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { InterviewActivityProps } from './types';

const WhyRoleBuilderActivity: React.FC<InterviewActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
}) => {
  const why = answers.whyRole ?? { company: '', role: '', interest: '', specificReason: '' };

  const update = (field: keyof typeof why, value: string) => {
    onUpdateAnswers({ whyRole: { ...why, [field]: value } });
  };

  const valid =
    why.company.trim().length >= 2 &&
    why.role.trim().length >= 2 &&
    why.interest.trim().length >= 40 &&
    why.specificReason.trim().length >= 40;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Build your &quot;Why this company / Why this role&quot; answer. Be specific—prestige alone
        won&apos;t impress finance interviewers.
      </p>

      <div className="space-y-2">
        <Label htmlFor="company">Company name</Label>
        <Input
          id="company"
          placeholder="e.g. Greenfield Capital Partners"
          value={why.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role you are targeting</Label>
        <Input
          id="role"
          placeholder="e.g. Summer Analyst — Business & Finance"
          value={why.role}
          onChange={(e) => update('role', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interest">Why business or finance? (your story)</Label>
        <Textarea
          id="interest"
          placeholder="Start with a real moment—class project, job, club, family business…"
          value={why.interest}
          onChange={(e) => update('interest', e.target.value)}
          className="min-h-24"
        />
        <p className="text-xs text-muted-foreground">{why.interest.length}/40+ characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specific">One specific reason you want THIS firm</Label>
        <Textarea
          id="specific"
          placeholder="Mention a deal, client type, culture detail, or program you researched…"
          value={why.specificReason}
          onChange={(e) => update('specificReason', e.target.value)}
          className="min-h-24"
        />
        <p className="text-xs text-muted-foreground">{why.specificReason.length}/40+ characters</p>
      </div>

      {valid && (
        <div className="p-3 rounded-lg bg-emerald-50 text-sm text-emerald-800 border border-emerald-100">
          <strong>Preview:</strong> I&apos;m drawn to {why.role} at {why.company} because{' '}
          {why.specificReason.slice(0, 80)}…
        </div>
      )}

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900"
        disabled={!valid}
        onClick={onComplete}
      >
        Save my Why This Role answer
      </Button>
    </div>
  );
};

export default WhyRoleBuilderActivity;
