import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { assetManagementJourneyData } from '@/data/asset-management-journey-data';
import AssetManagementLevelComponent from './AssetManagementLevel';
import AssetManagementMiniGame from './AssetManagementMiniGame';
import AssetManagementJourneyLevelCard from './AssetManagementJourneyLevelCard';
import AssetManagementJourneyHeader from './AssetManagementJourneyHeader';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface AssetManagementJourneyProps {
  onBack: () => void;
}

const AssetManagementJourney: React.FC<AssetManagementJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [journeyCompleted, setJourneyCompleted] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();

  useEffect(() => {
    const saved = localStorage.getItem('assetManagementJourneyProgress');
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
    localStorage.setItem('assetManagementJourneyProgress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = new Set(completedLevels).add(levelId);
    setCompletedLevels(newCompletedLevels);
    
    const allLevelsComplete = newCompletedLevels.size === assetManagementJourneyData.length;
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
    updateQuizScore(`asset-management-quiz-${Date.now()}`, isCorrect);
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
    const level = assetManagementJourneyData.find(l => l.id === selectedLevel);
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
          <AssetManagementLevelComponent
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

  // Show mini-game view
  if (showMiniGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setShowMiniGame(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>
          <h1 className="text-3xl font-bold text-blue-600">Portfolio Master Challenge</h1>
        </div>
        <AssetManagementMiniGame />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Careers in Finance
        </Button>
      </div>

      <AssetManagementJourneyHeader 
        completedLevels={completedLevels.size}
        totalLevels={assetManagementJourneyData.length}
      />

      {journeyCompleted && (
        <Card className="border border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <Trophy className="h-12 w-12 text-blue-500 mx-auto" />
              <h2 className="text-xl font-bold text-blue-600">Journey Complete!</h2>
              <p className="text-muted-foreground">
                🎉 Congratulations! You've mastered asset management and earned the "Portfolio Pro" badge!
              </p>
              <Badge className="bg-blue-500 text-white text-lg py-2 px-4">
                <Trophy className="h-4 w-4 mr-2" />
                Portfolio Pro Achievement Unlocked!
              </Badge>
              <Button 
                onClick={() => setShowMiniGame(true)}
                className="bg-blue-500 hover:bg-blue-600 mt-4"
                size="lg"
              >
                <Star className="h-4 w-4 mr-1" />
                Play Portfolio Master Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {assetManagementJourneyData.map((level) => (
          <AssetManagementJourneyLevelCard
            key={level.id}
            level={level}
            isUnlocked={isLevelUnlocked(level.id)}
            isCompleted={completedLevels.has(level.id)}
            onLevelSelect={handleLevelSelect}
          />
        ))}
      </div>

      {completedLevels.size === assetManagementJourneyData.length && (
        <Card className="border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Final Challenge Unlocked!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You've completed all 4 levels! Now test your skills in the Portfolio Master Challenge.
            </p>
            <Button onClick={() => setShowMiniGame(true)} size="lg" className="w-full">
              Start Portfolio Master Challenge
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssetManagementJourney;