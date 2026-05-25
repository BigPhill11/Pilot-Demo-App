import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { InterviewLessonConfig } from '@/data/career-readiness/interviewing';

interface LessonTestCheckpointProps {
  lesson: InterviewLessonConfig;
  results: Record<string, string>;
  onResult: (itemId: string, optionId: string) => void;
  onReset: () => void;
  onPass: () => void;
}

const LessonTestCheckpoint: React.FC<LessonTestCheckpointProps> = ({
  lesson,
  results,
  onResult,
  onReset,
  onPass,
}) => {
  const { test } = lesson;
  const [itemIndex, setItemIndex] = useState(0);
  const item = test.items[itemIndex];
  const chosen = item ? results[item.id] : undefined;

  const correctCount = test.items.filter((t) => {
    const pick = results[t.id];
    const opt = t.options.find((o) => o.id === pick);
    return opt?.isCorrect;
  }).length;

  const allAnswered = test.items.every((t) => results[t.id]);
  const passed = correctCount >= test.minCorrect;

  const selectedOption = item?.options.find((o) => o.id === chosen);

  const handleNext = () => {
    if (itemIndex < test.items.length - 1) {
      setItemIndex((i) => i + 1);
    }
  };

  const handleFinish = () => {
    if (passed) onPass();
  };

  return (
    <div className="space-y-4">
      <Card className="border-emerald-100 bg-emerald-50/40">
        <CardContent className="p-4 flex gap-3">
          <ClipboardCheck className="h-6 w-6 text-emerald-700 shrink-0" />
          <div>
            <h3 className="font-semibold text-emerald-900">{test.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
            <p className="text-xs text-emerald-700 mt-2">
              Need {test.minCorrect} of {test.items.length} correct to finish this lesson
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-1">
        {test.items.map((t, i) => (
          <div
            key={t.id}
            className={`h-1.5 flex-1 rounded-full ${
              i < itemIndex
                ? 'bg-emerald-600'
                : i === itemIndex
                  ? 'bg-emerald-400'
                  : 'bg-emerald-100'
            }`}
          />
        ))}
      </div>

      {item && (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-medium mb-3">{item.prompt}</p>
          <div className="space-y-2">
            {item.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onResult(item.id, opt.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  chosen === opt.id
                    ? opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                      : 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                    : 'border-border hover:border-emerald-200 hover:bg-muted/30'
                }`}
              >
                <span className="text-sm">{opt.label}</span>
              </button>
            ))}
          </div>

          {chosen && selectedOption && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-3 p-3 rounded-lg text-sm ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-amber-50 text-amber-900'
              }`}
            >
              {selectedOption.feedback}
            </motion.div>
          )}
        </motion.div>
      )}

      {chosen && itemIndex < test.items.length - 1 && (
        <Button className="w-full" variant="outline" onClick={handleNext}>
          Next question
        </Button>
      )}

      {allAnswered && (
        <div className="space-y-3">
          <div
            className={`p-4 rounded-xl flex items-start gap-2 ${
              passed ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'
            }`}
          >
            {passed && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}
            <p className="text-sm">
              {passed
                ? `You scored ${correctCount}/${test.items.length}. Lesson complete!`
                : `You got ${correctCount}/${test.items.length}. Review feedback and try again.`}
            </p>
          </div>
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-900"
            disabled={!passed}
            onClick={passed ? handleFinish : () => {
              setItemIndex(0);
              onReset();
            }}
          >
            {passed ? 'Complete lesson' : 'Retry checkpoint'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonTestCheckpoint;
