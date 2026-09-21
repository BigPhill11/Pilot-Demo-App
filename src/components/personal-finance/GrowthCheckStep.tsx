import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizOption from '@/components/quiz/QuizOption';
import ConfidenceSlider from './ConfidenceSlider';
import { ThemedEmoji } from '@/components/ui/themed-icons';
import type {
  DecisionScenario,
  GrowthCheckAnswer,
  GrowthCheckPayload,
  AnchorQuestion,
} from '@/types/personal-finance';

interface GrowthCheckStepProps {
  title: string;
  intro: string;
  anchorQuestions: AnchorQuestion[];
  decisionScenario: DecisionScenario;
  onComplete: (payload: GrowthCheckPayload) => void;
}

type StageKind = { kind: 'question'; index: number } | { kind: 'decision' };

/**
 * Shared engine behind the module warm-up and wrap-up screens: walks through
 * a few anchor questions (with a confidence rating after each) and one
 * decision scenario, then hands back a single payload. No correctness is
 * shown to the student at either phase — this stays a quiet check, not a
 * graded quiz.
 */
const GrowthCheckStep: React.FC<GrowthCheckStepProps> = ({
  title,
  intro,
  anchorQuestions,
  decisionScenario,
  onComplete,
}) => {
  const [stage, setStage] = useState<StageKind>({ kind: 'question', index: 0 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<GrowthCheckAnswer[]>([]);

  const currentQuestion =
    stage.kind === 'question' ? anchorQuestions[stage.index] : null;

  const handlePickOption = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
  };

  const handlePickChoice = (choiceId: string) => {
    if (selectedChoiceId !== null) return;
    setSelectedChoiceId(choiceId);
  };

  const handleContinue = () => {
    if (stage.kind === 'question' && currentQuestion) {
      if (selectedIndex === null) return;
      const nextAnswers = [
        ...answers,
        {
          anchor_id: currentQuestion.id,
          selected_index: selectedIndex,
          correct: selectedIndex === currentQuestion.correctIndex,
          confidence,
        },
      ];
      setAnswers(nextAnswers);
      setSelectedIndex(null);
      setConfidence(50);

      const nextIndex = stage.index + 1;
      if (nextIndex < anchorQuestions.length) {
        setStage({ kind: 'question', index: nextIndex });
      } else {
        setStage({ kind: 'decision' });
      }
      return;
    }

    if (stage.kind === 'decision') {
      if (!selectedChoiceId) return;
      const choice = decisionScenario.choices.find((c) => c.id === selectedChoiceId);
      onComplete({
        captured_at: new Date().toISOString(),
        answers,
        decision: {
          scenario_id: decisionScenario.id,
          choice_id: selectedChoiceId,
          optimality: choice?.optimality ?? 0,
        },
      });
    }
  };

  const canContinue =
    stage.kind === 'question' ? selectedIndex !== null : selectedChoiceId !== null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="w-5 h-5" />
        <h2 className="font-semibold">{title}</h2>
      </div>

      <p className="text-sm text-muted-foreground">{intro}</p>

      {stage.kind === 'question' && currentQuestion && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="font-medium leading-relaxed">{currentQuestion.question}</p>
          </div>

          <div>
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={option}
                option={option}
                index={index}
                isSelected={selectedIndex === index}
                // Deliberately keyed off selection, not correctIndex: this is a
                // quiet check, not a graded quiz, so we never reveal the right
                // answer here — the picked option just highlights as "chosen."
                isCorrect={selectedIndex === index}
                hasAttempted={false}
                isCompleted={selectedIndex !== null}
                onClick={() => handlePickOption(index)}
              />
            ))}
          </div>

          {selectedIndex !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 pt-2">
              <p className="text-center text-sm text-muted-foreground">How sure were you?</p>
              <ConfidenceSlider value={confidence} onChange={setConfidence} />
            </motion.div>
          )}
        </div>
      )}

      {stage.kind === 'decision' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="font-medium leading-relaxed">{decisionScenario.prompt}</p>
          </div>

          <div>
            {decisionScenario.choices.map((choice, index) => (
              <QuizOption
                key={choice.id}
                option={choice.label}
                index={index}
                isSelected={selectedChoiceId === choice.id}
                isCorrect={selectedChoiceId === choice.id}
                hasAttempted={false}
                isCompleted={selectedChoiceId !== null}
                onClick={() => handlePickChoice(choice.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 bg-muted/30 rounded-lg p-4">
        <span className="text-2xl">
          <ThemedEmoji emoji="🐼" className="h-[1em] w-[1em]" />
        </span>
        <p className="text-sm text-muted-foreground italic">
          "There's no wrong answer here — this just helps Phil see where you're at."
        </p>
      </div>

      <Button onClick={handleContinue} disabled={!canContinue} className="w-full">
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

export default GrowthCheckStep;
