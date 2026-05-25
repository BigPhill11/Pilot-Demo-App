import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronRight } from 'lucide-react';
import type { VillageQuizQuestion } from '@/types/village-lesson';
import { VILLAGE_QUIZ_PASS_THRESHOLD } from '@/types/village-lesson';

interface Props {
  questions: VillageQuizQuestion[];
  onComplete: (passed: boolean, score: number, total: number) => void;
}

type Phase = 'answering' | 'feedback' | 'results';

const VillageQuizStep: React.FC<Props> = ({ questions, onComplete }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('answering');
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<Array<{ questionId: string; correct: boolean }>>([]);

  const current = questions[questionIndex];
  const isLast = questionIndex === questions.length - 1;

  const handleSelect = (optionId: string) => {
    if (phase !== 'answering') return;
    setSelectedId(optionId);
    const correct = optionId === current.correctId;
    if (correct) setCorrectCount(c => c + 1);
    setAnswers(prev => [...prev, { questionId: current.id, correct }]);
    setPhase('feedback');
  };

  const handleNext = () => {
    if (isLast) {
      setPhase('results');
    } else {
      setQuestionIndex(i => i + 1);
      setSelectedId(null);
      setPhase('answering');
    }
  };

  const finalScore = phase === 'results' ? correctCount : correctCount;
  const passed = finalScore / questions.length >= VILLAGE_QUIZ_PASS_THRESHOLD;

  if (phase === 'results') {
    return (
      <div className="space-y-4">
        <div className={`p-5 rounded-2xl text-center ${passed ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
          <div className="text-4xl mb-2">{passed ? '🎉' : '📚'}</div>
          <h3 className={`text-lg font-bold ${passed ? 'text-green-800' : 'text-red-800'}`}>
            {passed ? 'Quiz Passed!' : 'Keep Studying'}
          </h3>
          <p className={`text-sm mt-1 ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {finalScore} / {questions.length} correct ({Math.round((finalScore / questions.length) * 100)}%)
          </p>
          <p className={`text-xs mt-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed
              ? 'You demonstrated solid understanding of this topic.'
              : `You need ${Math.ceil(VILLAGE_QUIZ_PASS_THRESHOLD * 100)}% to pass. Review the lesson and try again.`}
          </p>
        </div>

        {/* Answer review */}
        <div className="space-y-2">
          {questions.map((q, i) => {
            const answer = answers[i];
            return (
              <div
                key={q.id}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                  answer?.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                {answer?.correct
                  ? <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                  : <X className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />}
                <span className={answer?.correct ? 'text-green-800' : 'text-red-800'}>{q.question}</span>
              </div>
            );
          })}
        </div>

        <Button
          onClick={() => onComplete(passed, finalScore, questions.length)}
          className={`w-full ${passed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {passed ? 'Claim Rewards' : 'Back to Lesson'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${((questionIndex) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{questionIndex + 1} / {questions.length}</span>
      </div>

      {/* Question */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 leading-relaxed">{current.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {current.options.map(opt => {
          const isSelected = selectedId === opt.id;
          const isCorrect = opt.id === current.correctId;
          let style = 'border-2 border-gray-200 bg-white text-gray-800 hover:border-blue-400 hover:bg-blue-50';

          if (phase === 'feedback') {
            if (isCorrect) style = 'border-2 border-green-400 bg-green-50 text-green-900';
            else if (isSelected) style = 'border-2 border-red-400 bg-red-50 text-red-900';
            else style = 'border-2 border-gray-200 bg-gray-50 text-gray-500 opacity-60';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={phase === 'feedback'}
              className={`w-full text-left p-3 rounded-xl transition-all text-sm ${style}`}
            >
              <div className="flex items-center justify-between">
                <span>{opt.text}</span>
                {phase === 'feedback' && isCorrect && <Check className="h-4 w-4 text-green-600 flex-shrink-0" />}
                {phase === 'feedback' && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600 flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback explanation */}
      {phase === 'feedback' && (
        <div className="space-y-3">
          <div className={`p-3 rounded-xl border text-sm ${selectedId === current.correctId ? 'bg-green-50 border-green-200 text-green-800' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
            <span className="font-semibold">{selectedId === current.correctId ? '✓ Correct! ' : '✗ Not quite. '}</span>
            {current.explanation}
          </div>
          <Button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isLast ? 'See Results' : 'Next Question'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VillageQuizStep;
