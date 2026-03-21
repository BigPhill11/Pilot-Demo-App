import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CareerStory, StoryProgress, StoryMetrics, DecisionHistory } from '@/types/career-story';
import DecisionCard from './DecisionCard';
import MetricsDisplay from './MetricsDisplay';
import ConsequenceFeedback from './ConsequenceFeedback';
import StoryCompletionCard from './StoryCompletionCard';
import { ArrowLeft } from 'lucide-react';

interface CareerStoryReaderProps {
  story: CareerStory;
  onBack: () => void;
}

const CareerStoryReader: React.FC<CareerStoryReaderProps> = ({ story, onBack }) => {
  const [progress, setProgress] = useState<StoryProgress>(() => {
    const saved = localStorage.getItem(`story-progress-${story.id}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      storyId: story.id,
      currentChapterIndex: 0,
      decisionsHistory: [],
      currentMetrics: story.initialMetrics,
      completed: false,
      badgesEarned: [],
      timeSpentMinutes: 0
    };
  });

  const [showConsequence, setShowConsequence] = useState(false);
  const [lastConsequence, setLastConsequence] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem(`story-progress-${story.id}`, JSON.stringify(progress));
  }, [progress, story.id]);

  const currentChapter = story.chapters[progress.currentChapterIndex];
  const currentDecision = currentChapter?.decisionId 
    ? story.decisions.find(d => d.id === currentChapter.decisionId)
    : null;

  const handleDecision = (optionId: string) => {
    if (!currentDecision) return;

    const option = currentDecision.options.find(o => o.id === optionId);
    if (!option) return;

    // Update metrics
    const newMetrics: StoryMetrics = { ...progress.currentMetrics };
    
    if (option.consequence.scoreImpact.technicalSkill) {
      newMetrics.technicalSkill += option.consequence.scoreImpact.technicalSkill;
    }
    if (option.consequence.scoreImpact.timeManagement) {
      newMetrics.timeManagement += option.consequence.scoreImpact.timeManagement;
    }
    if (option.consequence.scoreImpact.stressLevel) {
      newMetrics.stressLevel += option.consequence.scoreImpact.stressLevel;
    }
    if (option.consequence.scoreImpact.relationships) {
      Object.entries(option.consequence.scoreImpact.relationships).forEach(([char, impact]) => {
        newMetrics.relationships[char] = (newMetrics.relationships[char] || 50) + impact;
      });
    }

    // Clamp metrics
    newMetrics.technicalSkill = Math.max(0, Math.min(100, newMetrics.technicalSkill));
    newMetrics.timeManagement = Math.max(0, Math.min(100, newMetrics.timeManagement));
    newMetrics.stressLevel = Math.max(0, Math.min(100, newMetrics.stressLevel));
    Object.keys(newMetrics.relationships).forEach(char => {
      newMetrics.relationships[char] = Math.max(0, Math.min(100, newMetrics.relationships[char]));
    });

    const decisionHistory: DecisionHistory = {
      decisionId: currentDecision.id,
      optionId,
      timestamp: new Date().toISOString(),
      metricsAtTime: newMetrics
    };

    setLastConsequence(option.consequence);
    setShowConsequence(true);

    setProgress(prev => ({
      ...prev,
      decisionsHistory: [...prev.decisionsHistory, decisionHistory],
      currentMetrics: newMetrics,
      currentChapterIndex: option.nextChapterIndex
    }));
  };

  const handleContinue = () => {
    setShowConsequence(false);
    
    // Check if story is complete
    if (progress.currentChapterIndex >= story.chapters.length - 1) {
      const finalScore = calculateFinalScore(progress.currentMetrics);
      const ending = story.endings.sort((a, b) => b.requiredScore - a.requiredScore)
        .find(e => finalScore >= e.requiredScore) || story.endings[story.endings.length - 1];
      
      const stars = Math.ceil(finalScore / 20);
      
      setProgress(prev => ({
        ...prev,
        completed: true,
        starsEarned: stars,
        completedAt: new Date().toISOString()
      }));
    }
  };

  const calculateFinalScore = (metrics: StoryMetrics): number => {
    const avgRelationships = Object.values(metrics.relationships).reduce((a, b) => a + b, 0) / 
      Object.values(metrics.relationships).length;
    
    return (
      metrics.technicalSkill * 0.35 +
      metrics.timeManagement * 0.25 +
      avgRelationships * 0.25 +
      (100 - metrics.stressLevel) * 0.15
    );
  };

  const progressPercent = ((progress.currentChapterIndex + 1) / story.chapters.length) * 100;

  if (progress.completed) {
    return (
      <StoryCompletionCard
        story={story}
        progress={progress}
        onRestart={() => {
          localStorage.removeItem(`story-progress-${story.id}`);
          window.location.reload();
        }}
        onBack={onBack}
      />
    );
  }

  if (showConsequence && lastConsequence) {
    return (
      <ConsequenceFeedback
        consequence={lastConsequence}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{story.title}</h2>
          <Progress value={progressPercent} className="mt-2" />
        </div>
      </div>

      <MetricsDisplay metrics={progress.currentMetrics} />

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{currentChapter.title}</h3>
        <div className="prose prose-sm max-w-none mb-6 whitespace-pre-line">
          {currentChapter.content}
        </div>

        {currentDecision && (
          <DecisionCard
            decision={currentDecision}
            onSelectOption={handleDecision}
          />
        )}

        {!currentDecision && progress.currentChapterIndex < story.chapters.length - 1 && (
          <Button onClick={() => setProgress(prev => ({ ...prev, currentChapterIndex: prev.currentChapterIndex + 1 }))}>
            Continue
          </Button>
        )}
      </Card>
    </div>
  );
};

export default CareerStoryReader;
