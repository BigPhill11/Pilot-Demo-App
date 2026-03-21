import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PrivateEquityFlashcard from './PrivateEquityFlashcard';
import PrivateEquityMiniGame from './PrivateEquityMiniGame';
import PrivateEquityQuizWithFeedback from './PrivateEquityQuizWithFeedback';

interface PrivateEquityLevelProps {
  level: any;
  onBack: () => void;
  onComplete: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
}

const PrivateEquityLevel: React.FC<PrivateEquityLevelProps> = ({
  level,
  onBack,
  onComplete,
  onQuizComplete
}) => {
  const isMobile = useIsMobile();
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleSectionComplete = (section: string, points: number) => {
    if (!completedSections.includes(section)) {
      setCompletedSections(prev => [...prev, section]);
      setTotalPoints(prev => prev + points);
    }
  };

  const handleQuizComplete = (score: number, total: number) => {
    const points = Math.round((score / total) * 50);
    handleSectionComplete('quiz', points);
    onQuizComplete(score === total);
    
    // Check if level is complete
    const requiredSections = ['overview', 'flashcards', 'mini-games', 'quiz'];
    const allCompleted = requiredSections.every(section => 
      completedSections.includes(section) || section === 'quiz'
    );
    
    if (allCompleted) {
      onComplete();
    }
  };

  const getSectionStatus = (section: string) => {
    return completedSections.includes(section) ? 'completed' : 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>
              Level {level.id}: {level.title}
            </h1>
            <Badge variant="outline">{level.focus}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {level.description}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{totalPoints} points</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Level Progress</h2>
            <div className="flex gap-2">
              {['overview', 'flashcards', 'mini-games', 'real-life', 'quiz', 'activity'].map((section) => (
                <div
                  key={section}
                  className={`w-3 h-3 rounded-full ${
                    getSectionStatus(section) === 'completed'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="phils-analogy">Phil's Analogy</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="mini-games">Mini Games</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Learning Objectives</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {level.content.overview}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {level.topics.map((topic: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Real-Life Example</h3>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">
                        {level.content.realLifeExample}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={() => handleSectionComplete('overview', 10)}
                  disabled={getSectionStatus('overview') === 'completed'}
                  className="w-full"
                >
                  {getSectionStatus('overview') === 'completed' ? (
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      Section Completed
                    </>
                  ) : (
                    'Mark Overview as Complete'
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="phils-analogy" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Phil's Analogy</h3>
                  <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed text-purple-900">
                        {level.content.philsAnalogy}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={() => handleSectionComplete('phils-analogy', 5)}
                  disabled={getSectionStatus('phils-analogy') === 'completed'}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                >
                  {getSectionStatus('phils-analogy') === 'completed' ? (
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      Section Completed
                    </>
                  ) : (
                    'Mark Phil\'s Analogy as Complete'
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="flashcards" className="p-6">
              <PrivateEquityFlashcard
                flashcards={level.content.flashcards}
                onComplete={(points) => handleSectionComplete('flashcards', points)}
                isCompleted={getSectionStatus('flashcards') === 'completed'}
              />
            </TabsContent>

            <TabsContent value="mini-games" className="p-6">
              <PrivateEquityMiniGame
                games={level.content.miniGames}
                levelId={level.id}
                onComplete={(points) => handleSectionComplete('mini-games', points)}
                isCompleted={getSectionStatus('mini-games') === 'completed'}
              />
            </TabsContent>

            <TabsContent value="quiz" className="p-6">
              <PrivateEquityQuizWithFeedback
                questions={level.content.quiz}
                onComplete={handleQuizComplete}
                isCompleted={getSectionStatus('quiz') === 'completed'}
              />
            </TabsContent>

            <TabsContent value="activity" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Take-Home Activity</h3>
                  <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed text-purple-900">
                        {level.content.takeHomeActivity}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  onClick={() => handleSectionComplete('activity', 15)}
                  disabled={getSectionStatus('activity') === 'completed'}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                >
                  {getSectionStatus('activity') === 'completed' ? (
                    <>
                      <Trophy className="h-4 w-4 mr-2" />
                      Activity Completed
                    </>
                  ) : (
                    'Mark Activity as Complete'
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivateEquityLevel;