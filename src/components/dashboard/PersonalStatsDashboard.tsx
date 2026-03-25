/**
 * Personal Stats Dashboard
 * 
 * A bamboo jungle themed slide-out panel displaying user progress metrics:
 * - Total bamboo collected
 * - XP earned
 * - Time spent learning
 * - Streak information
 * - Learning path progress
 * - Personalized study suggestions
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  Clock, 
  Zap, 
  Target,
  ChevronRight,
  Trophy,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { usePersonalStats, Suggestion } from '@/hooks/usePersonalStats';
import { usePersonalDashboard } from '@/contexts/PersonalDashboardContext';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';

interface PersonalStatsDashboardProps {
  onNavigate?: (tab: string) => void;
}

const PersonalStatsDashboard: React.FC<PersonalStatsDashboardProps> = ({ onNavigate }) => {
  const stats = usePersonalStats();
  const { closeDashboard } = usePersonalDashboard();
  const { profile } = useAuth();
  const isMobile = useIsMobile();

  const handleSuggestionClick = (suggestion: Suggestion) => {
    closeDashboard();
    onNavigate?.(suggestion.targetTab);
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-y-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30 -z-10" />
      
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-5">
        <div className="absolute top-0 left-2 w-1.5 h-40 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-10 left-5 w-1 h-32 bg-gradient-to-b from-green-200/15 to-green-400/10 rounded-full" />
        <div className="absolute top-0 right-2 w-1.5 h-36 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-16 right-6 w-1 h-28 bg-gradient-to-b from-green-200/15 to-green-400/10 rounded-full" />
        {/* Panda footprints along edge */}
        <div className="absolute bottom-20 left-4 text-green-200/30 text-lg">🐾</div>
        <div className="absolute bottom-40 right-4 text-green-200/30 text-lg transform rotate-45">🐾</div>
      </div>

      <div className="relative z-10 p-4 space-y-5">
        {/* Header with Phil */}
        <div className="flex items-center gap-3 pb-2">
          <PandaLogo className="h-10 w-10" />
          <div>
            <h2 className="text-lg font-bold text-green-800">
              {profile?.display_name ? `${profile.display_name}'s Progress` : 'Your Progress'}
            </h2>
            <p className="text-xs text-green-600/80">
              Keep growing in Phil's jungle!
            </p>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Bamboo Collected */}
          <StatCard
            icon="🎋"
            label="Bamboo"
            value={stats.totalBamboo.toLocaleString()}
            subValue={`${stats.totalBambooEarned.toLocaleString()} earned`}
            gradient="from-green-100 to-emerald-50"
            borderColor="border-green-200"
          />
          
          {/* XP Earned */}
          <StatCard
            icon={<Zap className="h-5 w-5 text-yellow-500" />}
            label="Total XP"
            value={stats.totalXp.toLocaleString()}
            subValue={`${stats.totalXpEarned.toLocaleString()} earned`}
            gradient="from-yellow-50 to-amber-50"
            borderColor="border-yellow-200"
          />
          
          {/* Time Spent */}
          <StatCard
            icon={<Clock className="h-5 w-5 text-teal-500" />}
            label="Time Learning"
            value={formatTime(stats.timeSpentMinutes)}
            subValue={`${stats.lessonsCompleted} lessons`}
            gradient="from-teal-50 to-cyan-50"
            borderColor="border-teal-200"
          />
          
          {/* Streak */}
          <StatCard
            icon={<Flame className="h-5 w-5 text-orange-500" />}
            label="Streak"
            value={`${stats.currentStreak} days`}
            subValue={stats.streakMultiplier > 1 ? `${stats.streakMultiplier.toFixed(1)}x bonus` : `Best: ${stats.longestStreak}`}
            gradient="from-orange-50 to-red-50"
            borderColor="border-orange-200"
          />
        </div>

        {/* Overall Progress */}
        <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Overall Progress</span>
              </div>
              <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                {stats.overallProgress}%
              </Badge>
            </div>
            <Progress 
              value={stats.overallProgress} 
              className="h-3 bg-green-100"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-green-600">
              <span>{stats.lessonsCompleted} lessons completed</span>
              <span>Daily goals: {stats.dailyGoalsCompleted}/{stats.dailyGoalsTotal}</span>
            </div>
          </CardContent>
        </Card>

        {/* Learning Paths Mini Cards */}
        <div>
          <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Learning Paths
          </h3>
          <div className="space-y-2">
            {stats.paths.map((path) => (
              <div 
                key={path.id}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-white/70 border border-green-100 hover:border-green-300 transition-colors cursor-pointer"
                onClick={() => {
                  closeDashboard();
                  onNavigate?.(path.targetTab);
                }}
              >
                <span className="text-xl">{path.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-800 truncate">{path.title}</span>
                    <span className="text-xs text-green-600">{path.progressPct}%</span>
                  </div>
                  <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${path.progressPct}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-green-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Study Suggestions */}
        {stats.suggestions.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Your Next Trail
            </h3>
            <div className="space-y-2">
              {stats.suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all
                    ${suggestion.priority === 'high' 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 hover:border-green-400' 
                      : 'bg-white/70 border border-green-100 hover:border-green-300'}
                  `}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="text-xl">{suggestion.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">{suggestion.title}</p>
                    <p className="text-xs text-green-600/80 truncate">{suggestion.description}</p>
                  </div>
                  {suggestion.priority === 'high' && (
                    <Badge className="bg-green-600 text-white text-xs">Go</Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-green-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phil's Encouragement */}
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-100/80 to-emerald-100/80 border border-green-200">
          <div className="flex items-start gap-2">
            <span className="text-lg">🐼</span>
            <div>
              <p className="text-xs font-medium text-green-800">Phil says:</p>
              <p className="text-xs text-green-600/90 italic">
                {getPhilMessage(stats)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  gradient: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, subValue, gradient, borderColor }) => {
  return (
    <Card className={`${borderColor} bg-gradient-to-br ${gradient} overflow-hidden`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {typeof icon === 'string' ? <span className="text-xl">{icon}</span> : icon}
          <span className="text-xs text-green-700/70">{label}</span>
        </div>
        <p className="text-lg font-bold text-green-800">{value}</p>
        {subValue && (
          <p className="text-xs text-green-600/70">{subValue}</p>
        )}
      </CardContent>
    </Card>
  );
};

function getPhilMessage(stats: ReturnType<typeof usePersonalStats>): string {
  if (stats.currentStreak >= 7) {
    return `Amazing ${stats.currentStreak}-day streak! You're on fire! Keep growing that bamboo forest!`;
  }
  if (stats.overallProgress >= 75) {
    return "You're almost a Phil's Financials master! Just a bit more to complete your journey!";
  }
  if (stats.dailyGoalsCompleted === stats.dailyGoalsTotal && stats.dailyGoalsTotal > 0) {
    return "All daily goals complete! You're crushing it today!";
  }
  if (stats.lessonsCompleted > 0) {
    return `${stats.lessonsCompleted} lessons done! Every step through the jungle brings new wisdom.`;
  }
  return "Welcome to Phil's jungle! Start exploring and watch your bamboo grow!";
}

export default PersonalStatsDashboard;
