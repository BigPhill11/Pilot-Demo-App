import React, { useState, useEffect } from 'react';
import { privateEquityJourneyData } from '@/data/private-equity-journey-data';
import PrivateEquityJourneyHeader from './PrivateEquityJourneyHeader';
import PrivateEquityJourneyLevelCard from './PrivateEquityJourneyLevelCard';
import PrivateEquityLevel from './PrivateEquityLevel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import CareerStoriesHub from './career-stories/CareerStoriesHub';
import { careerStories } from '@/data/career-stories';

interface PrivateEquityProgress {
  currentLevel: number;
  completedLevels: number[];
  selectedDifficulty: 'beginner' | 'intermediate' | 'pro';
  totalPointsEarned: number;
}

interface PrivateEquityJourneyProps {
  onBack: () => void;
}

const PrivateEquityJourney: React.FC<PrivateEquityJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(false);
  const { updateQuizScore } = useProgressTracking();

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('privateEquity-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(new Set(progress.completedLevels || []));
      setIsJourneyCompleted(progress.isCompleted || false);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newCompletedLevels: Set<number>, completed: boolean) => {
    const progress = {
      completedLevels: Array.from(newCompletedLevels),
      isCompleted: completed
    };
    localStorage.setItem('privateEquity-progress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    
    const allCompleted = newCompletedLevels.size === privateEquityJourneyData.levels.length;
    
    setCompletedLevels(newCompletedLevels);
    setIsJourneyCompleted(allCompleted);
    saveProgress(newCompletedLevels, allCompleted);
    setSelectedLevel(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('private-equity', isCorrect);
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.has(levelId - 1);
  };

  const handleBackToJourney = () => {
    setSelectedLevel(null);
  };

  // If a specific level is selected, show that level
  if (selectedLevel) {
    const level = privateEquityJourneyData.levels.find(l => l.id === selectedLevel);
    if (level) {
      return (
        <PrivateEquityLevel
          level={level}
          onComplete={() => handleLevelComplete(selectedLevel)}
          onBack={handleBackToJourney}
          onQuizComplete={handleQuizComplete}
        />
      );
    }
  }

  const peStories = careerStories.filter(story => story.careerType === 'private-equity');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 dark:from-purple-950/20 dark:via-violet-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Finance Careers
          </Button>
        </div>

        <PrivateEquityJourneyHeader
          completedLevels={completedLevels.size}
          totalLevels={privateEquityJourneyData.levels.length}
        />

        <Tabs defaultValue="lessons" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="lessons">
              <BookOpen className="h-4 w-4 mr-2" />
              Learning Journey
            </TabsTrigger>
            <TabsTrigger value="stories">
              📖 Interactive Stories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6 mt-6">
            <div className="grid gap-6">
          {privateEquityJourneyData.levels.map((level) => (
            <PrivateEquityJourneyLevelCard
              key={level.id}
              level={level}
              isCompleted={completedLevels.has(level.id)}
              isUnlocked={isLevelUnlocked(level.id)}
              onLevelSelect={handleLevelSelect}
            />
          ))}

          {isJourneyCompleted && (
            <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 shadow-lg">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Trophy className="h-16 w-16 text-purple-500" />
                    <Sparkles className="h-6 w-6 text-violet-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-purple-700 dark:text-purple-300">
                  🎉 Private Equity Journey Complete! 🎉
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-purple-600 dark:text-purple-400 mb-6">
                  Congratulations! You've mastered the fundamentals of private equity. 
                  You now understand how PE firms create value and generate exceptional returns.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      ✅ PE Fundamentals
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      ✅ Deal Types & Valuation
                    </span>
                  </div>
                  <div className="bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      ✅ Value Creation & Exits
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="mt-6">
            <CareerStoriesHub stories={peStories} careerName="Private Equity" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PrivateEquityJourney;