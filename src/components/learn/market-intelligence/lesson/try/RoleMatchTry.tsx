import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, CheckCircle2 } from 'lucide-react';
import type { MILessonTryActivity } from '@/types/mi-lesson';

interface RoleMatchTryProps {
  activity: MILessonTryActivity;
  onComplete: () => void;
}

const RoleMatchTry: React.FC<RoleMatchTryProps> = ({ activity, onComplete }) => {
  const roles = activity.roles ?? [];
  const scenarios = activity.scenarios ?? [];
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const allMatched = scenarios.every((s) => matches[s.id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-800">
        <Gamepad2 className="h-5 w-5" />
        <h3 className="font-bold">{activity.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{activity.description}</p>

      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="p-3 rounded-lg border border-emerald-200 bg-white">
            <p className="text-sm mb-2 text-gray-800">{scenario.description}</p>
            <select
              className="w-full p-2.5 rounded-md border border-emerald-200 text-sm bg-emerald-50/50"
              value={matches[scenario.id] ?? ''}
              onChange={(e) =>
                setMatches((prev) => ({ ...prev, [scenario.id]: e.target.value }))
              }
              disabled={done}
            >
              <option value="">Choose a role…</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {done && (
              <p className="text-xs mt-2 text-emerald-700">
                Typical owner:{' '}
                {roles.find((r) => r.id === scenario.correctRoleId)?.name ?? '—'}
              </p>
            )}
          </div>
        ))}
      </div>

      {!done ? (
        <Button
          onClick={() => setDone(true)}
          disabled={!allMatched}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Finish matching
        </Button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Activity complete</span>
          </div>
          <Button onClick={onComplete} className="w-full bg-emerald-600 hover:bg-emerald-700">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoleMatchTry;
