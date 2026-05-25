/**
 * Learning Dashboard — bamboo forest theme aligned with Personal Finance.
 */

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardProgress } from '@/hooks/useDashboardProgress';
import { useDailyGoals } from '@/hooks/useDailyGoals';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { useGameStore } from '@/store/useGameStore';
import TermOfTheDay from '@/components/learn/TermOfTheDay';
import JungleBackdrop from '@/components/learning/dashboard/JungleBackdrop';
import JungleHeroHeader from '@/components/learning/dashboard/JungleHeroHeader';
import DashboardStatGrid from '@/components/learning/dashboard/DashboardStatGrid';
import LearningPathCards from '@/components/learning/dashboard/LearningPathCards';
import DailyGoalsSection from '@/components/learning/dashboard/DailyGoalsSection';
import QuickActionsRow from '@/components/learning/dashboard/QuickActionsRow';

interface LearningDashboardProps {
  onNavigateToTab?: (tabValue: string) => void;
}

const LearningDashboard: React.FC<LearningDashboardProps> = ({ onNavigateToTab }) => {
  const { profile } = useAuth();
  const { paths, overallProgress, totalLessonsCompleted, loading: progressLoading } =
    useDashboardProgress();
  const { goals, completedCount, loading: goalsLoading } = useDailyGoals();
  const { currentStreak, streakLevel, streakMultiplier, nextMilestone } = useUnifiedStreak();
  const xp = useGameStore((state) => state.xp);

  const loading = progressLoading || goalsLoading;

  return (
    <div className="relative max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <JungleBackdrop />

      <JungleHeroHeader
        displayName={profile?.display_name}
        appVersion={profile?.app_version}
        streakMultiplier={streakMultiplier}
      />

      <TermOfTheDay />

      <DashboardStatGrid
        lessonsCompleted={totalLessonsCompleted}
        overallProgress={overallProgress}
        currentStreak={currentStreak}
        nextMilestone={nextMilestone}
        streakLevel={streakLevel}
        xp={xp}
      />

      <LearningPathCards
        paths={paths}
        loading={loading}
        onPathClick={(tab) => onNavigateToTab?.(tab)}
      />

      <DailyGoalsSection
        goals={goals}
        completedCount={completedCount}
        loading={loading}
        currentStreak={currentStreak}
        streakMultiplier={streakMultiplier}
        nextMilestone={nextMilestone}
        onNavigate={onNavigateToTab}
      />

      <QuickActionsRow onNavigate={onNavigateToTab} />
    </div>
  );
};

export default LearningDashboard;
