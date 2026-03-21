import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trophy } from 'lucide-react';
import { vcJourneyData } from '@/data/venture-capital-journey-data';
import VCJourneyHeader from './VCJourneyHeader';
import VCJourneyLevelCard from './VCJourneyLevelCard';
import VCLevel from './VCLevel';
import VCMiniGame from './VCMiniGame';

interface VCJourneyProps {
  onBack: () => void;
}

const VCJourney: React.FC<VCJourneyProps> = ({ onBack }) => {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isJourneyComplete, setIsJourneyComplete] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showMiniGame, setShowMiniGame] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('vc-journey-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedLevels(progress.completedLevels || []);
      setIsJourneyComplete(progress.isJourneyComplete || false);
    }
  }, []);

  const saveProgress = () => {
    const progress = {
      completedLevels,
      isJourneyComplete
    };
    localStorage.setItem('vc-journey-progress', JSON.stringify(progress));
  };

  const handleLevelComplete = (levelId: number) => {
    setCompletedLevels(prev => {
      const updated = [...prev, levelId];
      setTimeout(saveProgress, 100);
      return updated;
    });
    setSelectedLevel(null);

    // Check if all levels are completed
    if (completedLevels.length + 1 === vcJourneyData.length) {
      setIsJourneyComplete(true);
    }
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  };

  if (selectedLevel) {
    return (
      <VCLevel
        level={vcJourneyData.find(l => l.id === selectedLevel)!}
        onBack={() => setSelectedLevel(null)}
        onComplete={() => handleLevelComplete(selectedLevel)}
      />
    );
  }

  if (showMiniGame) {
    return (
      <VCMiniGame
        onBack={() => setShowMiniGame(false)}
        onComplete={() => {
          setShowMiniGame(false);
          // Could add additional completion logic here
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <VCJourneyHeader onBack={onBack} />
      
      <div className="grid gap-6">
        {vcJourneyData.map((level) => (
          <VCJourneyLevelCard
            key={level.id}
            level={level}
            isCompleted={completedLevels.includes(level.id)}
            isUnlocked={isLevelUnlocked(level.id)}
            onClick={() => setSelectedLevel(level.id)}
          />
        ))}
        
        {isJourneyComplete && (
          <Card className="border-2 border-golden bg-gradient-to-r from-golden/10 to-golden/5">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Trophy className="h-8 w-8 text-golden" />
                Congratulations!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">
                You've completed all levels of the Venture Capital Journey! 🎉
              </p>
              <p className="text-muted-foreground">
                Take on the final challenge to test everything you've learned.
              </p>
              <Button
                onClick={() => setShowMiniGame(true)}
                className="bg-golden hover:bg-golden/90 text-white"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Final Challenge
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VCJourney;