
import React, { useState, useEffect } from 'react';
import { Adventure } from '@/types/adventure';
import { adventures as baseAdventures } from '@/data/adventures';
import AdventureHeader from './adventures/AdventureHeader';
import ProgressOverview from './adventures/ProgressOverview';
import AdventureCard from './adventures/AdventureCard';
import StoryReader from './StoryReader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProgressTracking } from '@/hooks/useProgressTracking';

const PhilAdventures = () => {
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
  const [adventuresState, setAdventuresState] = useState<Adventure[]>(baseAdventures);
  const { progress } = useProgressTracking();
  const isMobile = useIsMobile();

  // Define unlock requirements for each adventure
  const unlockRequirements = {
    'panda-economics': ['bamboo-business', 'forest-sentiment', 'weather-forecasting'],
    'phil-risk-management': ['bamboo-business'],
    'phil-portfolio-building': ['bamboo-business', 'phil-risk-management'],
    'phil-wealth-building': ['bamboo-business', 'forest-sentiment', 'weather-forecasting', 'phil-risk-management', 'phil-portfolio-building']
  };

  useEffect(() => {
    const updatedAdventures = baseAdventures.map(adventure => {
      const completedActivities = progress.completed_activities || [];
      const isCompleted = completedActivities.includes(`adventure-${adventure.id}`);
      
      // Calculate progress based on completed quizzes or completion status
      const totalQuizzes = adventure.chapters;
      const completedQuizzes = Object.keys(progress.quiz_scores || {}).filter(key => 
        key.startsWith(`${adventure.id}-chapter-`) && progress.quiz_scores[key]
      ).length;
      // If adventure is completed, show 100%, otherwise show quiz progress
      const progressPercentage = isCompleted ? 100 : (totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0);

      // Check if adventure should be unlocked
      const requirements = unlockRequirements[adventure.id as keyof typeof unlockRequirements];
      let isUnlocked = adventure.isUnlocked; // Default unlock status
      
      if (requirements) {
        // Check if all required adventures are completed
        isUnlocked = requirements.every(reqId => 
          completedActivities.includes(`adventure-${reqId}`)
        );
      }

      return {
        ...adventure,
        isCompleted,
        isUnlocked,
        progress: progressPercentage
      };
    });

    setAdventuresState(updatedAdventures);
  }, [progress]);

  const handleStartAdventure = (adventure: Adventure) => {
    if (adventure.isUnlocked) {
      setSelectedAdventure(adventure);
    }
  };

  if (selectedAdventure) {
    return (
      <StoryReader 
        adventure={selectedAdventure} 
        onBack={() => setSelectedAdventure(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdventureHeader />
      <ProgressOverview adventures={adventuresState} />
      
      {/* Adventures Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
        {adventuresState.map((adventure) => (
          <AdventureCard
            key={adventure.id}
            adventure={adventure}
            onStartAdventure={handleStartAdventure}
          />
        ))}
      </div>
    </div>
  );
};

export default PhilAdventures;
