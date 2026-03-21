import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Gamepad2, HelpCircle, CheckCircle2, ClipboardList } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WealthLevel } from '@/data/wealth-management-journey-data';
import WealthManagementFlashcard from './WealthManagementFlashcard';
import WealthManagementDragDrop from './WealthManagementDragDrop';
import InteractiveQuiz from '@/components/InteractiveQuiz';

interface WealthManagementLevelProps {
  level: WealthLevel;
  onComplete: () => void;
  onBack: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
  isCompleted: boolean;
}

const WealthManagementLevel: React.FC<WealthManagementLevelProps> = ({
  level,
  onComplete,
  onBack,
  onQuizComplete,
  isCompleted
}) => {
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const handleActivityComplete = (activityId: string) => {
    const newCompleted = new Set(completedActivities);
    newCompleted.add(activityId);
    setCompletedActivities(newCompleted);
  };

  const allActivitiesCompleted = () => {
    const totalActivities = level.flashcards.length + level.miniGames.length + level.quiz.questions.length + level.activities.length;
    return completedActivities.size >= totalActivities;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Badge className="bg-emerald-500">Level {level.id}</Badge>
              {isCompleted && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
            </div>
            <div className="text-sm text-muted-foreground">
              Progress: {completedActivities.size} / {level.flashcards.length + level.miniGames.length + level.quiz.questions.length + level.activities.length} activities
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-emerald-800 mb-4">{level.title}</h1>
          
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-800">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-emerald-700 leading-relaxed">{level.overview}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="flashcards" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="flashcards" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="example" className="flex items-center space-x-2">
              <span>💡</span>
              <span>Example</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center space-x-2">
              <Gamepad2 className="h-4 w-4" />
              <span>Mini Games</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4" />
              <span>Activities</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Quiz</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flashcards" className="space-y-6">
            <WealthManagementFlashcard
              flashcards={level.flashcards}
              currentIndex={currentFlashcardIndex}
              onIndexChange={setCurrentFlashcardIndex}
              onComplete={() => handleActivityComplete(`flashcards-${level.id}`)}
              levelId={level.id}
            />
          </TabsContent>

          <TabsContent value="example" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">Real-Life Example</CardTitle>
                <CardDescription>See how these concepts apply in practice</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{level.realLifeExample}</p>
                <Button 
                  onClick={() => handleActivityComplete(`example-${level.id}`)}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                  disabled={completedActivities.has(`example-${level.id}`)}
                >
                  {completedActivities.has(`example-${level.id}`) ? 'Example Reviewed' : 'Mark as Reviewed'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="space-y-6">
              {level.activities.map((activity, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-emerald-800">{activity.title}</CardTitle>
                    <CardDescription>Take-home practice activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3 text-emerald-700">Instructions:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {activity.instructions.map((instruction, instructionIndex) => (
                          <li key={instructionIndex}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {activity.reflection && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-emerald-800">Reflection:</h4>
                        <p className="text-emerald-700">{activity.reflection}</p>
                      </div>
                    )}
                    
                    {activity.bonus && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-yellow-800">Bonus Challenge:</h4>
                        <p className="text-yellow-700">{activity.bonus}</p>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => handleActivityComplete(`activity-${level.id}-${index}`)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={completedActivities.has(`activity-${level.id}-${index}`)}
                    >
                      {completedActivities.has(`activity-${level.id}-${index}`) ? 'Activity Completed' : 'Mark as Completed'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <div className="grid gap-6">
              {level.miniGames.map((game, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-emerald-800">{game.name}</CardTitle>
                    <CardDescription>{game.learningGoal}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How it Works:</h4>
                      <p className="text-muted-foreground">{game.howItWorks}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Completion System:</h4>
                      <p className="text-muted-foreground">{game.completionSystem}</p>
                    </div>
                    
                    <div>
                      <Badge variant="outline" className="text-xs">
                        Key Terms: {game.keyTerms}
                      </Badge>
                    </div>
                    
                    <WealthManagementDragDrop
                      gameData={game}
                      onComplete={() => handleActivityComplete(`game-${level.id}-${index}`)}
                      isCompleted={completedActivities.has(`game-${level.id}-${index}`)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <div className="space-y-6">
              {level.quiz.questions.map((quizItem, index) => (
                <InteractiveQuiz
                  key={index}
                  topicId={`wealth-level-${level.id}-quiz-${index}`}
                  question={quizItem.question}
                  options={quizItem.options}
                  correctAnswerIndex={quizItem.correctAnswerIndex}
                  feedbackForIncorrect={quizItem.explanation}
                  onQuizComplete={(topicId, isCorrect) => {
                    onQuizComplete(isCorrect);
                    handleActivityComplete(`quiz-${level.id}-${index}`);
                  }}
                  isCompleted={completedActivities.has(`quiz-${level.id}-${index}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {allActivitiesCompleted() && !isCompleted && (
          <div className="mt-8 text-center">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Level Complete!</h3>
                <p className="text-emerald-700 mb-4">You've mastered all activities in this level.</p>
                <Button 
                  onClick={onComplete}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Complete Level
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WealthManagementLevel;