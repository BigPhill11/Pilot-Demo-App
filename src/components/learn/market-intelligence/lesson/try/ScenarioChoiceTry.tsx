import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, CheckCircle2 } from 'lucide-react';
import type { MILessonTryActivity } from '@/types/mi-lesson';

interface ScenarioChoiceTryProps {
  activity: MILessonTryActivity;
  onComplete: () => void;
}

const ScenarioChoiceTry: React.FC<ScenarioChoiceTryProps> = ({ activity, onComplete }) => {
  const rounds = activity.rounds ?? [];
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const round = rounds[roundIndex];
  const isLast = roundIndex >= rounds.length - 1;

  const pick = (optionId: string) => {
    const opt = round.options.find((o) => o.id === optionId);
    if (opt) setFeedback(opt.feedback);
  };

  const next = () => {
    if (isLast) {
      onComplete();
    } else {
      setRoundIndex((i) => i + 1);
      setFeedback(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-800">
        <Gamepad2 className="h-5 w-5" />
        <h3 className="font-bold">{activity.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{activity.description}</p>
      <p className="text-xs text-emerald-700">
        Scenario {roundIndex + 1} of {rounds.length}
      </p>
      <p className="font-medium text-gray-800">{round.prompt}</p>
      <div className="space-y-2">
        {round.options.map((opt) => (
          <Button
            key={opt.id}
            variant="outline"
            className="w-full h-auto py-3 text-left justify-start border-emerald-200"
            onClick={() => pick(opt.id)}
            disabled={!!feedback}
          >
            {opt.label}
          </Button>
        ))}
      </div>
      {feedback && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
          {feedback}
          <Button onClick={next} className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700">
            {isLast ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Continue
              </>
            ) : (
              'Next scenario'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScenarioChoiceTry;
