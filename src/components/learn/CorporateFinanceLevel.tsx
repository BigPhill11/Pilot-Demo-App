import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Gamepad2, HelpCircle, Home, CheckCircle } from 'lucide-react';
import type { CorporateFinanceLevel } from '@/data/corporate-finance-journey-data';
import CorporateFinanceFlashcard from './CorporateFinanceFlashcard';
import CorporateFinanceMiniGame from './CorporateFinanceMiniGame';

interface CorporateFinanceLevelProps {
  level: CorporateFinanceLevel;
  onComplete: () => void;
  onBack: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
}

const CorporateFinanceLevel: React.FC<CorporateFinanceLevelProps> = ({
  level,
  onComplete,
  onBack,
  onQuizComplete
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizSubmit = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);

    if (currentQuizIndex < level.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setShowQuizResults(true);
      setQuizCompleted(true);
      
      // Calculate score for progress tracking
      const correctAnswers = newAnswers.filter((answer, index) => 
        answer.toLowerCase().includes(level.quiz[index].answer.toLowerCase().split(' ')[0])
      ).length;
      const isPassingGrade = correctAnswers >= Math.ceil(level.quiz.length * 0.6);
      onQuizComplete(isPassingGrade);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setQuizAnswers([]);
    setShowQuizResults(false);
    setQuizCompleted(false);
  };

  const getLevelIcon = (levelId: number) => {
    const icons = ['🏢', '📊', '⏰'];
    return icons[levelId - 1] || '📚';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-orange-950/20 dark:via-yellow-950/20 dark:to-amber-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="text-4xl">{getLevelIcon(level.id)}</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Level {level.id}: {level.title}
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {level.description}
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white/60 dark:bg-gray-800/60">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="games" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Mini Games
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Take-Home
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {level.overview}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">Real-Life Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {level.realLifeExample}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flashcards">
              <CorporateFinanceFlashcard flashcards={level.flashcards} />
            </TabsContent>

            <TabsContent value="games">
              <CorporateFinanceMiniGame miniGames={level.miniGames} levelId={level.id} />
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6">
              {!showQuizResults ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 dark:text-orange-300">
                      Quiz - Question {currentQuizIndex + 1} of {level.quiz.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {level.quiz[currentQuizIndex].question}
                    </p>
                    <div className="space-y-2">
                      <textarea
                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                        rows={3}
                        placeholder="Type your answer here..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            const answer = e.currentTarget.value.trim();
                            if (answer) {
                              handleQuizSubmit(answer);
                              e.currentTarget.value = '';
                            }
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const textarea = e.currentTarget.parentElement?.querySelector('textarea');
                          const answer = textarea?.value.trim();
                          if (answer) {
                            handleQuizSubmit(answer);
                            textarea.value = '';
                          }
                        }}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-700 dark:text-orange-300">Quiz Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {level.quiz.map((q, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                          <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                            Q{index + 1}: {q.question}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Your answer: {quizAnswers[index]}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Sample answer: {q.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={resetQuiz} variant="outline">
                        Retake Quiz
                      </Button>
                      {quizCompleted && (
                        <Button 
                          onClick={onComplete}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Level
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-700 dark:text-orange-300">Take-Home Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {level.takeHomeActivity}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CorporateFinanceLevel;