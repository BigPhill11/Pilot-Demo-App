import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  Gamepad2, 
  HelpCircle, 
  CheckCircle2, 
  Trophy,
  FileText,
  Target
} from 'lucide-react';
import { VCLevel as VCLevelType } from '@/data/venture-capital-journey-data';
import VCFlashcard from './VCFlashcard';
import VCDragDrop from './VCDragDrop';

interface VCLevelProps {
  level: VCLevelType;
  onBack: () => void;
  onComplete: () => void;
}

const VCLevel: React.FC<VCLevelProps> = ({ level, onBack, onComplete }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [selectedMiniGame, setSelectedMiniGame] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  // Load progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(`vc-level-${level.id}-progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedSections(new Set(progress.completedSections || []));
      setCompletedActivities(new Set(progress.completedActivities || []));
    }
  }, [level.id]);

  const saveProgress = () => {
    const progress = {
      completedSections: Array.from(completedSections),
      completedActivities: Array.from(completedActivities)
    };
    localStorage.setItem(`vc-level-${level.id}-progress`, JSON.stringify(progress));
  };

  const markSectionComplete = (section: string) => {
    setCompletedSections(prev => {
      const updated = new Set(prev);
      updated.add(section);
      setTimeout(saveProgress, 100);
      return updated;
    });
  };

  const markActivityComplete = (activityId: string) => {
    setCompletedActivities(prev => {
      const updated = new Set(prev);
      updated.add(activityId);
      setTimeout(saveProgress, 100);
      return updated;
    });
  };

  const handleFlashcardComplete = () => {
    markSectionComplete('flashcards');
  };

  const handleMiniGameComplete = (gameId: string) => {
    markSectionComplete('mini-games');
    setSelectedMiniGame(null);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    setShowQuizResults(true);
    markSectionComplete('quiz');
  };

  const calculateProgress = () => {
    const totalSections = 4; // overview, flashcards, mini-games, quiz
    return (completedSections.size / totalSections) * 100;
  };

  const isLevelComplete = () => {
    return completedSections.size >= 4;
  };

  const getQuizScore = () => {
    const correctAnswers = level.quiz.filter((q, index) => 
      quizAnswers[q.id] === q.correctAnswer
    ).length;
    return Math.round((correctAnswers / level.quiz.length) * 100);
  };

  if (selectedMiniGame) {
    const gameData = level.miniGames.find(g => g.id === selectedMiniGame);
    if (gameData) {
      return (
        <VCDragDrop
          gameData={gameData}
          onComplete={() => handleMiniGameComplete(selectedMiniGame)}
          isCompleted={completedSections.has('mini-games')}
        />
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Level {level.id}
        </Badge>
      </div>

      {/* Level Title and Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Target className="h-8 w-8 text-primary" />
            {level.title}
          </CardTitle>
          <div className="space-y-2">
            <Progress value={calculateProgress()} className="h-3" />
            <p className="text-sm text-muted-foreground">
              Progress: {Math.round(calculateProgress())}% complete
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Overview
            {completedSections.has('overview') && <CheckCircle2 className="h-3 w-3 text-green-600" />}
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Terms
            {completedSections.has('flashcards') && <CheckCircle2 className="h-3 w-3 text-green-600" />}
          </TabsTrigger>
          <TabsTrigger value="mini-games" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Games
            {completedSections.has('mini-games') && <CheckCircle2 className="h-3 w-3 text-green-600" />}
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Quiz
            {completedSections.has('quiz') && <CheckCircle2 className="h-3 w-3 text-green-600" />}
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Level Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {level.overview}
              </p>
              
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-3">Real-Life Example</h3>
                <h4 className="font-medium text-primary mb-2">{level.realLifeExample.title}</h4>
                <p className="text-muted-foreground">{level.realLifeExample.description}</p>
              </div>

              <div className="text-center">
                <Button onClick={() => markSectionComplete('overview')} disabled={completedSections.has('overview')}>
                  {completedSections.has('overview') ? 'Overview Complete!' : 'Mark Overview as Complete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <VCFlashcard
            flashcards={level.flashcards}
            currentIndex={flashcardIndex}
            onIndexChange={setFlashcardIndex}
            onComplete={handleFlashcardComplete}
            levelId={level.id}
          />
        </TabsContent>

        <TabsContent value="mini-games">
          <Card>
            <CardHeader>
              <CardTitle>Mini Games</CardTitle>
              <p className="text-muted-foreground">Practice your knowledge with interactive games</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {level.miniGames.map((game) => (
                  <Card key={game.id} className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{game.name}</h3>
                          <p className="text-muted-foreground">{game.howItWorks}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p><strong>Learning Goal:</strong> {game.learningGoal}</p>
                        <p><strong>How to Win:</strong> {game.completionSystem}</p>
                      </div>
                      <Button onClick={() => setSelectedMiniGame(game.id)}>
                        Start Game
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Check</CardTitle>
              <p className="text-muted-foreground">Test your understanding of this level's concepts</p>
            </CardHeader>
            <CardContent>
              {!quizSubmitted ? (
                <div className="space-y-6">
                  {level.quiz.map((question) => (
                    <div key={question.id} className="space-y-3">
                      <h3 className="font-medium">{question.question}</h3>
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <label key={index} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value={index}
                              onChange={() => setQuizAnswers(prev => ({ ...prev, [question.id]: index }))}
                              className="text-primary"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button 
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== level.quiz.length}
                    className="w-full"
                  >
                    Submit Quiz
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎉</div>
                  <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                  <p className="text-xl">Your Score: {getQuizScore()}%</p>
                  {showQuizResults && (
                    <div className="space-y-4 text-left">
                      {level.quiz.map((question) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <p className="font-medium mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground">{question.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Take-Home Activities</CardTitle>
              <p className="text-muted-foreground">Practice these concepts outside the platform</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {level.activities.map((activity, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3">{activity.title}</h3>
                    <p className="text-muted-foreground mb-4">{activity.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => markActivityComplete(`activity-${index}`)}
                      disabled={completedActivities.has(`activity-${index}`)}
                    >
                      {completedActivities.has(`activity-${index}`) ? 'Completed!' : 'Mark as Complete'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Completion Button */}
      {isLevelComplete() && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="text-center py-6">
            <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Level Complete!</h3>
            <p className="text-green-600 mb-4">You've mastered all the concepts in this level.</p>
            <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
              Continue to Next Level
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VCLevel;