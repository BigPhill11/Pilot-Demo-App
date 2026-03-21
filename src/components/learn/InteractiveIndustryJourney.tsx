
import React, { useState, useEffect } from 'react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import type { IndustryJourneyData } from '@/data/industry-journeys';
import JourneyOverview from './industry-journey/JourneyOverview';
import LevelContent from './industry-journey/LevelContent';

interface InteractiveIndustryJourneyProps {
  journey: IndustryJourneyData;
  onBack: () => void;
}

interface LessonProgress {
  completedLevels: number[];
  currentLevel: number;
  selectedDifficulty: 'beginner' | 'intermediate' | 'pro';
  totalPointsEarned: number;
}

const InteractiveIndustryJourney: React.FC<InteractiveIndustryJourneyProps> = ({ 
  journey, 
  onBack 
}) => {
  const { updateQuizScore, updateLearningProgress } = useProgressTracking();
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [progress, setProgress] = useState<LessonProgress>({
    completedLevels: [],
    currentLevel: 1,
    selectedDifficulty: 'beginner',
    totalPointsEarned: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem(`industryJourney_${journey.id}_progress`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, [journey.id]);

  const saveProgress = (newProgress: LessonProgress) => {
    setProgress(newProgress);
    localStorage.setItem(`industryJourney_${journey.id}_progress`, JSON.stringify(newProgress));
  };

  const handleLevelComplete = (levelId: number) => {
    const newCompletedLevels = [...progress.completedLevels, levelId];
    const newProgress = {
      ...progress,
      completedLevels: newCompletedLevels,
      currentLevel: Math.min(levelId + 1, journey.levels.length + 1),
      totalPointsEarned: progress.totalPointsEarned + 10
    };
    saveProgress(newProgress);
    updateLearningProgress(15);
  };

  const handleQuizComplete = (topicId: string, isCorrect: boolean) => {
    updateQuizScore(topicId, isCorrect);
  };

  const getDifficultyContent = (level: any, difficulty: string) => {
    const content = level.interactiveContent?.[difficulty];
    if (!content) {
      return {
        explanation: `Learn about ${level.focusArea || level.title} in ${journey.name || journey.title}`,
        realWorldExample: "This is an important concept in the industry.",
        keyTakeaways: ["Understanding this topic is crucial", "Apply this knowledge in practice"]
      };
    }
    return content;
  };

  if (selectedLevelId) {
    const selectedLevel = journey.levels.find(level => (level.level || level.id) === selectedLevelId);
    if (selectedLevel) {
      return (
        <LevelContent
          level={selectedLevel}
          journey={journey}
          progress={progress}
          onBack={() => setSelectedLevelId(null)}
          onProgressChange={saveProgress}
          onLevelComplete={handleLevelComplete}
          onQuizComplete={handleQuizComplete}
          getDifficultyContent={getDifficultyContent}
        />
      );
    }
  }

  return (
    <JourneyOverview
      journey={journey}
      progress={progress}
      onBack={onBack}
      onLevelSelect={setSelectedLevelId}
    />
  );
};

export default InteractiveIndustryJourney;
