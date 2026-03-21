import React, { useState } from 'react';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ManagementConsultingFlashcard from './ManagementConsultingFlashcard';
import ManagementConsultingMiniGame from './ManagementConsultingMiniGame';
import ManagementConsultingQuizWithFeedback from './ManagementConsultingQuizWithFeedback';
import { ManagementConsultingLevel as LevelType } from '@/data/management-consulting-journey-data';

interface ManagementConsultingLevelProps {
  level: LevelType;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
  onBack: () => void;
}

const ManagementConsultingLevel: React.FC<ManagementConsultingLevelProps> = ({
  level,
  isUnlocked,
  isCompleted,
  onComplete,
  onQuizComplete,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [masteredTerms, setMasteredTerms] = useState<string[]>([]);

  if (!isUnlocked) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journey
          </Button>
        </div>
        
        <Card className="text-center p-12 bg-muted/30">
          <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Level Locked</h2>
          <p className="text-muted-foreground">Complete the previous level to unlock this content.</p>
        </Card>
      </div>
    );
  }

  const handleQuizComplete = (isCorrect: boolean) => {
    setQuizCompleted(true);
    onQuizComplete(isCorrect);
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
    setCurrentQuizIndex(0);
  };

  const canComplete = quizCompleted && !isCompleted;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journey
          </Button>
        </div>
        {isCompleted && (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Level {level.id}: {level.title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {level.overview.substring(0, 200)}...
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="phils-analogy">Phil's Analogy</TabsTrigger>
          <TabsTrigger value="flashcards">Learn Terms</TabsTrigger>
          <TabsTrigger value="mini-games">Mini Games</TabsTrigger>
          <TabsTrigger value="examples">Real Example</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Level Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{level.overview}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phils-analogy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎭 {level.philsAnalogy.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{level.philsAnalogy.content}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {level.flashcards.map((flashcard, index) => (
              <ManagementConsultingFlashcard
                key={index}
                term={flashcard.term}
                definition={flashcard.definition}
                onMastered={(term, isMastered) => {
                  if (isMastered && !masteredTerms.includes(term)) {
                    setMasteredTerms([...masteredTerms, term]);
                  } else if (!isMastered && masteredTerms.includes(term)) {
                    setMasteredTerms(masteredTerms.filter(t => t !== term));
                  }
                }}
                isMastered={masteredTerms.includes(flashcard.term)}
              />
            ))}
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Progress: {masteredTerms.length} of {level.flashcards.length} terms mastered
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(masteredTerms.length / level.flashcards.length) * 100}%` }}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mini-games" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {level.miniGames.map((game, index) => (
              <ManagementConsultingMiniGame
                key={index}
                game={game}
                levelId={level.id}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{level.realLifeExample.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{level.realLifeExample.content}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6">
          <ManagementConsultingQuizWithFeedback
            questions={level.quiz}
            onComplete={handleQuizComplete}
            onReset={resetQuiz}
            isCompleted={quizCompleted}
          />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Take-Home Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed mb-4">{level.takeHomeActivity}</p>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Complete this activity to reinforce your learning and apply the concepts in a practical way.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {canComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Ready to Complete Level {level.id}!
            </h3>
            <p className="text-green-700 mb-4">
              You've finished the quiz. Complete this level to unlock the next one.
            </p>
            <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
              Complete Level
            </Button>
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Level Complete! 🎉
            </h3>
            <p className="text-blue-700">
              Great job mastering Level {level.id}. The next level is now unlocked!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManagementConsultingLevel;