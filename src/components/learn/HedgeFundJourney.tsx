import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { hedgeFundJourneyData } from '@/data/hedge-fund-journey-data';
import HedgeFundLevel from './HedgeFundLevel';
import HedgeFundJourneyLevelCard from './HedgeFundJourneyLevelCard';
import HedgeFundJourneyHeader from './HedgeFundJourneyHeader';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface HedgeFundJourneyProps {
  onBack: () => void;
}

const HedgeFundJourney: React.FC<HedgeFundJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();

  useEffect(() => {
    const saved = localStorage.getItem('hedgeFundJourneyProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setCompletedLevels(new Set(progress.completedLevels || []));
      setJourneyCompleted(progress.journeyCompleted || false);
    }
  }, []);

  const saveProgress = (newCompletedLevels: Set<number>, completed: boolean) => {
    const progress = {
      completedLevels: Array.from(newCompletedLevels),
      journeyCompleted: completed
    };
    localStorage.setItem('hedgeFundJourneyProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = new Set(completedLevels).add(levelId);
    setCompletedLevels(newCompletedLevels);
    
    const allLevelsComplete = newCompletedLevels.size === hedgeFundJourneyData.length;
    if (allLevelsComplete && !journeyCompleted) {
      setJourneyCompleted(true);
      updateLearningProgress(15, 40);
      saveProgress(newCompletedLevels, true);
    } else {
      saveProgress(newCompletedLevels, journeyCompleted);
    }
    
    // Return to main view after completing level
    setSelectedLevel(null);
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    updateQuizScore(`hedge-fund-quiz-${Date.now()}`, isCorrect);
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId === 1 || completedLevels.has(levelId - 1);
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevel(levelId);
  };

  const handleBackToJourney = () => {
    setSelectedLevel(null);
  };

  // Show individual level view
  if (selectedLevel !== null) {
    const level = hedgeFundJourneyData.find(l => l.id === selectedLevel);
    if (level) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToJourney}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Journey
            </Button>
            <h1 className="text-3xl font-bold text-blue-600">Level {level.id}: {level.title}</h1>
          </div>
          <HedgeFundLevel
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.has(level.id)}
            onComplete={() => handleLevelComplete(level.id)}
            onQuizComplete={handleQuizComplete}
          />
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Careers in Finance
        </Button>
      </div>

      <HedgeFundJourneyHeader 
        completedLevels={completedLevels.size}
        totalLevels={hedgeFundJourneyData.length}
      />

      {journeyCompleted && (
        <Card className="border border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Trophy className="h-12 w-12 text-blue-500 mx-auto" />
              <h2 className="text-xl font-bold text-blue-600">Journey Complete!</h2>
              <p className="text-muted-foreground">
                🎉 Congratulations! You've mastered hedge funds and earned the "Hedge Fund Expert" badge!
              </p>
              <Badge className="bg-blue-500 text-white text-lg py-2 px-4">
                <Trophy className="h-4 w-4 mr-2" />
                Hedge Fund Expert Achievement Unlocked!
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {hedgeFundJourneyData.map((level) => (
          <HedgeFundJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.has(level.id)}
            onLevelSelect={handleLevelSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default HedgeFundJourney;