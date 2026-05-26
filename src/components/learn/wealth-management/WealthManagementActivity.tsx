import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { WealthManagementActivity as WealthManagementActivityData } from '@/data/wealth-management/wealthManagementCurriculum';

interface WealthManagementActivityProps {
  activity: WealthManagementActivityData;
  isCompleted: boolean;
  onComplete: () => void;
}

const WealthManagementActivity: React.FC<WealthManagementActivityProps> = ({
  activity,
  isCompleted,
  onComplete,
}) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [hasClaimedCompletion, setHasClaimedCompletion] = useState(isCompleted);

  const currentPrompt = activity.prompts[currentPromptIndex];
  const selectedChoiceId = selectedAnswers[currentPrompt.id];
  const selectedChoice = currentPrompt.choices.find((choice) => choice.id === selectedChoiceId);

  const score = useMemo(() => {
    return activity.prompts.reduce((total, prompt) => {
      const answerId = selectedAnswers[prompt.id];
      const answer = prompt.choices.find((choice) => choice.id === answerId);
      return total + (answer?.isBest ? 1 : 0);
    }, 0);
  }, [activity.prompts, selectedAnswers]);

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === activity.prompts.length;

  const handleSelect = (choiceId: string) => {
    setSelectedAnswers((current) => ({
      ...current,
      [currentPrompt.id]: choiceId,
    }));
  };

  const handleNext = () => {
    if (currentPromptIndex < activity.prompts.length - 1) {
      setCurrentPromptIndex((current) => current + 1);
      return;
    }

    if (!hasClaimedCompletion) {
      setHasClaimedCompletion(true);
      onComplete();
    }
  };

  const handleReset = () => {
    setCurrentPromptIndex(0);
    setSelectedAnswers({});
    setHasClaimedCompletion(false);
  };

  return (
    <Card className="overflow-hidden border-emerald-200 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="border-b border-emerald-100 bg-emerald-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge className="mb-2 bg-emerald-600 text-white hover:bg-emerald-600">
                Interactive
              </Badge>
              <h3 className="text-lg font-bold text-green-950">{activity.title}</h3>
              <p className="mt-1 text-sm text-green-700/80">{activity.description}</p>
            </div>
            <div className="rounded-2xl bg-white px-3 py-2 text-center shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wide text-green-600">Score</p>
              <p className="text-lg font-black text-green-950">
                {score}/{activity.prompts.length}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline" className="border-emerald-200 text-emerald-700">
              Prompt {currentPromptIndex + 1} of {activity.prompts.length}
            </Badge>
            {hasClaimedCompletion && (
              <Badge className="bg-green-600 text-white hover:bg-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Complete
              </Badge>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {currentPrompt.context && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Case context
              </p>
            )}
            {currentPrompt.context && (
              <p className="mb-3 text-sm text-slate-700">{currentPrompt.context}</p>
            )}
            <p className="text-base font-bold text-slate-900">{currentPrompt.prompt}</p>
          </div>

          <div className="grid gap-2">
            {currentPrompt.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              const isAnswered = Boolean(selectedChoiceId);
              const showBest = isAnswered && choice.isBest;

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelect(choice.id)}
                  disabled={isAnswered}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    isSelected && choice.isBest
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                      : isSelected
                        ? 'border-amber-300 bg-amber-50 text-amber-900'
                        : showBest
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50'
                  } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{choice.label}</span>
                    {isSelected && choice.isBest && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                    {isSelected && !choice.isBest && <XCircle className="h-5 w-5 text-amber-600" />}
                    {!isSelected && showBest && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedChoice && (
            <div className={`rounded-2xl border p-4 ${
              selectedChoice.isBest
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-amber-200 bg-amber-50 text-amber-900'
            }`}>
              <p className="text-sm font-medium">{selectedChoice.feedback}</p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" onClick={handleReset} className="border-slate-200">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedChoiceId}
              className="bg-green-700 text-white hover:bg-green-800"
            >
              {currentPromptIndex < activity.prompts.length - 1
                ? 'Next Scenario'
                : allAnswered
                  ? 'Finish Activity'
                  : 'Answer All Scenarios'}
            </Button>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all"
              style={{ width: `${(answeredCount / activity.prompts.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WealthManagementActivity;
