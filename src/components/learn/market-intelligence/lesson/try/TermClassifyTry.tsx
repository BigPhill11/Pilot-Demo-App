import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, CheckCircle2 } from 'lucide-react';
import type { MILessonTryActivity } from '@/types/mi-lesson';
import { cn } from '@/lib/utils';

interface TermClassifyTryProps {
  activity: MILessonTryActivity;
  onComplete: () => void;
}

const TermClassifyTry: React.FC<TermClassifyTryProps> = ({ activity, onComplete }) => {
  const categories = activity.categories ?? [];
  const terms = activity.terms ?? [];
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);

  const remaining = terms.filter((t) => !assignments[t.id]);
  const allDone = remaining.length === 0;

  const pickCategory = (catId: string) => {
    if (!selectedTerm) return;
    setAssignments((prev) => ({ ...prev, [selectedTerm]: catId }));
    setSelectedTerm(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-800">
        <Gamepad2 className="h-5 w-5" />
        <h3 className="font-bold">{activity.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{activity.description}</p>

      {remaining.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {remaining.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTerm(t.id)}
              className={cn(
                'px-3 py-2 rounded-lg text-sm border',
                selectedTerm === t.id
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white border-emerald-200'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => pickCategory(cat.id)}
            disabled={!selectedTerm || finished}
            className="p-4 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 text-sm font-medium text-emerald-900 min-h-[4rem]"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {!finished && allDone && (
        <Button onClick={() => setFinished(true)} className="w-full bg-emerald-600 hover:bg-emerald-700">
          Done sorting
        </Button>
      )}
      {finished && (
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

export default TermClassifyTry;
