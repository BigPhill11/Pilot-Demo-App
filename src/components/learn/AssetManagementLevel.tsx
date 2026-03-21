import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, BookOpen, Brain, Gamepad2 } from 'lucide-react';
import { AssetManagementLevel } from '@/data/asset-management-journey-data';
import AssetManagementFlashcard from './AssetManagementFlashcard';
import AssetManagementDragDrop from './AssetManagementDragDrop';
import AssetManagementLevelMiniGames from './AssetManagementLevelMiniGames';

interface AssetManagementLevelProps {
  level: AssetManagementLevel;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
}

const AssetManagementLevelComponent: React.FC<AssetManagementLevelProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete
}) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [masteredFlashcards, setMasteredFlashcards] = useState<Set<number>>(new Set());

  if (!isUnlocked) {
    return (
      <Card className="border-gray-200">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Complete the previous level to unlock this content.</p>
        </CardContent>
      </Card>
    );
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    if (questionIndex === level.quiz.length - 1) {
      setShowQuizResults(true);
      const correctAnswers = level.quiz.filter((q, idx) => newAnswers[idx] === q.correctAnswer).length;
      const isCorrect = correctAnswers >= Math.ceil(level.quiz.length * 0.7); // 70% to pass
      onQuizComplete(isCorrect);
    } else {
      setCurrentQuiz(questionIndex + 1);
    }
  };

  const handleFlashcardMastered = (index: number) => {
    setMasteredFlashcards(prev => new Set(prev).add(index));
  };

  const canComplete = masteredFlashcards.size >= Math.ceil(level.flashcards.length * 0.8) && showQuizResults;

  return (
    <div className="space-y-6">
      {/* Level Overview */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <BookOpen className="h-5 w-5" />
            Level Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">What You'll Learn:</h3>
            <p className="text-muted-foreground leading-relaxed">{level.overview}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">Real-World Example:</h3>
            <p className="text-muted-foreground leading-relaxed italic">{level.realLifeExample}</p>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Content Tabs */}
      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Quiz
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Mini Games
          </TabsTrigger>
        </TabsList>

        {/* Flashcards Tab */}
        <TabsContent value="flashcards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Key Terms & Definitions
                <Badge variant="outline">
                  {currentFlashcard + 1} of {level.flashcards.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AssetManagementFlashcard
                term={level.flashcards[currentFlashcard].term}
                definition={level.flashcards[currentFlashcard].definition}
                onMastered={() => handleFlashcardMastered(currentFlashcard)}
                isMastered={masteredFlashcards.has(currentFlashcard)}
              />
              
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentFlashcard(Math.max(0, currentFlashcard - 1))}
                  disabled={currentFlashcard === 0}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentFlashcard(Math.min(level.flashcards.length - 1, currentFlashcard + 1))}
                  disabled={currentFlashcard === level.flashcards.length - 1}
                >
                  Next
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Mastered: {masteredFlashcards.size} / {level.flashcards.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Knowledge Check
                <Badge variant="outline">
                  Question {currentQuiz + 1} of {level.quiz.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showQuizResults ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{level.quiz[currentQuiz].question}</h3>
                  <div className="space-y-2">
                    {level.quiz[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => handleQuizAnswer(currentQuiz, index)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-green-600 mb-2">Quiz Complete!</h3>
                    <p className="text-muted-foreground">
                      You scored {level.quiz.filter((q, idx) => quizAnswers[idx] === q.correctAnswer).length} out of {level.quiz.length}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {level.quiz.map((question, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium mb-2">{question.question}</p>
                        <p className={`text-sm ${quizAnswers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                          Your answer: {question.options[quizAnswers[index]]}
                        </p>
                        {quizAnswers[index] !== question.correctAnswer && (
                          <p className="text-sm text-green-600">
                            Correct: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{question.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          {level.activity ? (
            <AssetManagementDragDrop
              activity={level.activity}
              onComplete={(isCorrect) => console.log('Activity completed:', isCorrect)}
            />
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No special activity for this level.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Mini Games Tab */}
        <TabsContent value="games" className="space-y-4">
          <AssetManagementLevelMiniGames miniGames={level.miniGames} />
        </TabsContent>
      </Tabs>

      {/* Completion Button */}
      {canComplete && !isCompleted && (
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-bold text-green-700 mb-2">Level Complete!</h3>
            <p className="text-muted-foreground mb-4">
              You've mastered the flashcards and passed the quiz. Ready to move on?
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-500 hover:bg-green-600"
              size="lg"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Level {level.id}
            </Button>
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-green-700">Level Completed!</h3>
            <p className="text-muted-foreground">Great job! You can review this content anytime.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssetManagementLevelComponent;