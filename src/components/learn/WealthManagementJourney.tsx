import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Star, Lock } from 'lucide-react';
import { wealthManagementJourneyData, getWealthManagementProgress } from '@/data/wealth-management-journey-data';
import WealthManagementJourneyHeader from './WealthManagementJourneyHeader';
import WealthManagementJourneyLevelCard from './WealthManagementJourneyLevelCard';
import WealthManagementLevel from './WealthManagementLevel';
import WealthManagementMiniGame from './WealthManagementMiniGame';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { PandaCelebration } from '@/components/ui/panda-celebration';

interface WealthManagementJourneyProps {
  onBack: () => void;
}

const WealthManagementJourney: React.FC<WealthManagementJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const { updateLearningProgress, updateQuizScore } = useProgressTracking();

  useEffect(() => {
    const progress = getWealthManagementProgress();
    const completed = new Set<number>();
    
    for (let i = 1; i <= progress.levelsCompleted; i++) {
      completed.add(i);
    }
    
    setCompletedLevels(completed);
    setIsJourneyCompleted(progress.completed);
  }, []);

  const saveProgress = (newCompletedLevels: Set<number>, completed: boolean) => {
    const progress = {
      completed,
      levelsCompleted: newCompletedLevels.size,
      totalLevels: wealthManagementJourneyData.length
    };
    localStorage.setItem('wealthManagementProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = new Set(completedLevels);
    newCompletedLevels.add(levelId);
    
    const allLevelsCompleted = newCompletedLevels.size === wealthManagementJourneyData.length;
    
    setCompletedLevels(newCompletedLevels);
    setIsJourneyCompleted(allLevelsCompleted);
    setSelectedLevel(null);
    
    updateLearningProgress(10, 40);
    saveProgress(newCompletedLevels, allLevelsCompleted);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore('wealth-management', isCorrect);
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.has(levelId - 1);
  };

  const progressPercentage = (completedLevels.size / wealthManagementJourneyData.length) * 100;

  if (selectedLevel) {
    const levelData = wealthManagementJourneyData.find(level => level.id === selectedLevel);
    if (levelData) {
      return (
        <WealthManagementLevel
          level={levelData}
          onComplete={() => handleLevelComplete(selectedLevel)}
          onBack={() => setSelectedLevel(null)}
          onQuizComplete={handleQuizComplete}
          isCompleted={completedLevels.has(selectedLevel)}
        />
      );
    }
  }

  if (showMiniGame) {
    return (
      <WealthManagementMiniGame 
        onBack={() => setShowMiniGame(false)}
        onComplete={() => {
          setShowMiniGame(false);
          // Additional completion logic if needed
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Careers
        </Button>

        <WealthManagementJourneyHeader 
          completedLevels={completedLevels.size}
          totalLevels={wealthManagementJourneyData.length}
          isCompleted={isJourneyCompleted}
        />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Learning Path</h2>
            <div className="flex items-center space-x-2">
              <Progress value={progressPercentage} className="w-32" />
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>

          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>📚 Learning Path:</strong> Complete levels in order to unlock the next level. 
              Master all flashcard terms in each level for full comprehension.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wealthManagementJourneyData.map((level) => (
              <WealthManagementJourneyLevelCard
                key={level.id}
                level={level}
                isCompleted={completedLevels.has(level.id)}
                isUnlocked={isLevelUnlocked(level.id)}
                onClick={() => setSelectedLevel(level.id)}
              />
            ))}
          </div>

          {isJourneyCompleted && (
            <div className="mt-8">
              <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">🎉 Congratulations!</h3>
                <p className="text-emerald-700">You've mastered Wealth Management! All levels completed.</p>
              </div>
              
              <Card className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-yellow-800">Final Challenge Unlocked!</CardTitle>
                  <CardDescription className="text-yellow-700">
                    Test your wealth management expertise in the Portfolio Master Challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => setShowMiniGame(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Start Final Challenge
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WealthManagementJourney;