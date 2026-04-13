/**
 * LessonCompleteStep
 * 
 * Celebration screen shown when a lesson is completed.
 * Displays rewards earned and options to continue or review.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  RotateCcw,
  Trophy,
  Sparkles,
  Star,
  Zap
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

interface LessonCompleteStepProps {
  lessonTitle: string;
  quizScore: number;
  quizTotal: number;
  xpEarned: number;
  bambooEarned: number;
  onContinue: () => void;
  onReplay: () => void;
}

const LessonCompleteStep: React.FC<LessonCompleteStepProps> = ({
  lessonTitle,
  quizScore,
  quizTotal,
  xpEarned,
  bambooEarned,
  onContinue,
  onReplay,
}) => {
  const percentage = Math.round((quizScore / quizTotal) * 100);
  const isPerfect = quizScore === quizTotal;
  const passed = percentage >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
              isPerfect 
                ? 'bg-gradient-to-br from-yellow-400 to-amber-500' 
                : passed
                ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
                : 'bg-gradient-to-br from-amber-400 to-orange-500'
            }`}>
              <Trophy className="h-12 w-12 text-white" />
            </div>
            {isPerfect && (
              <div className="absolute -top-2 -right-2">
                <Star className="h-8 w-8 text-yellow-500 fill-current animate-pulse" />
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            {isPerfect ? 'Perfect Score!' : passed ? 'Lesson Complete!' : 'Keep Learning!'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            {lessonTitle}
          </p>
          
          <p className="text-emerald-600">
            Quiz Score: <span className="font-bold">{quizScore}/{quizTotal}</span> ({percentage}%)
          </p>
        </div>

        <Card className="border-emerald-200 bg-white mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-emerald-800 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Rewards Earned
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 text-center border border-purple-100">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span className="text-2xl font-bold text-purple-700">+{xpEarned}</span>
                </div>
                <span className="text-sm text-purple-600">XP Earned</span>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 text-center border border-emerald-100">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xl">🎋</span>
                  <span className="text-2xl font-bold text-emerald-700">+{bambooEarned}</span>
                </div>
                <span className="text-sm text-emerald-600">Bamboo Earned</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 mb-8">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200">
                  <PandaLogo className="w-10 h-10" />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100 relative">
                  <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
                  <p className="text-gray-700 leading-relaxed">
                    {isPerfect 
                      ? "Wow, a perfect score! You're becoming an economics expert! Keep up the amazing work!" 
                      : passed
                      ? "Great job completing this lesson! You're building a solid foundation in economics. Ready for the next challenge?"
                      : "Good effort! Economics can be tricky, but practice makes perfect. Try reviewing the flashcards and taking the quiz again!"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onReplay}
            className="border-emerald-300 text-emerald-700"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Review Lesson
          </Button>
          
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
          >
            {passed ? 'Continue Learning' : 'Try Again'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonCompleteStep;
