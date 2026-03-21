import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  BookOpen, 
  Zap, 
  Crown,
  Medal,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  category: 'progress' | 'streak' | 'mastery' | 'speed' | 'exploration';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  criteria: {
    type: 'modules_completed' | 'courses_completed' | 'streak_days' | 'quiz_score' | 'time_spent' | 'lessons_completed';
    target: number;
    courseId?: string;
  };
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first soft skills module',
    icon: Target,
    iconColor: 'text-green-500',
    category: 'progress',
    rarity: 'common',
    xpReward: 25,
    criteria: { type: 'modules_completed', target: 1 }
  },
  {
    id: 'interview_master',
    title: 'Interview Master',
    description: 'Complete the Professional Interviewing course',
    icon: Medal,
    iconColor: 'text-blue-500',
    category: 'mastery',
    rarity: 'rare',
    xpReward: 100,
    criteria: { type: 'courses_completed', target: 1, courseId: 'interviewing' }
  },
  {
    id: 'networking_ninja',
    title: 'Networking Ninja',
    description: 'Master the art of professional networking',
    icon: Crown,
    iconColor: 'text-purple-500',
    category: 'mastery',
    rarity: 'epic',
    xpReward: 150,
    criteria: { type: 'courses_completed', target: 1, courseId: 'networking' }
  },
  {
    id: 'communication_champion',
    title: 'Communication Champion',
    description: 'Excel in business communication',
    icon: Star,
    iconColor: 'text-yellow-500',
    category: 'mastery',
    rarity: 'rare',
    xpReward: 120,
    criteria: { type: 'courses_completed', target: 1, courseId: 'business_communication' }
  },
  {
    id: 'fast_learner',
    title: 'Speed Demon',
    description: 'Complete a module in under 30 minutes',
    icon: Zap,
    iconColor: 'text-orange-500',
    category: 'speed',
    rarity: 'rare',
    xpReward: 75,
    criteria: { type: 'time_spent', target: 30 }
  },
  {
    id: 'dedicated_student',
    title: 'Dedicated Student',
    description: 'Spend 5+ hours learning soft skills',
    icon: BookOpen,
    iconColor: 'text-indigo-500',
    category: 'progress',
    rarity: 'epic',
    xpReward: 200,
    criteria: { type: 'time_spent', target: 300 }
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Score 90%+ on 10 quizzes',
    icon: Trophy,
    iconColor: 'text-gold-500',
    category: 'mastery',
    rarity: 'epic',
    xpReward: 175,
    criteria: { type: 'quiz_score', target: 10 }
  },
  {
    id: 'soft_skills_scholar',
    title: 'Soft Skills Scholar',
    description: 'Complete 3 different courses',
    icon: Award,
    iconColor: 'text-emerald-500',
    category: 'exploration',
    rarity: 'legendary',
    xpReward: 300,
    criteria: { type: 'courses_completed', target: 3 }
  },
  {
    id: 'lesson_master',
    title: 'Lesson Master',
    description: 'Complete 50 lessons across all courses',
    icon: CheckCircle2,
    iconColor: 'text-cyan-500',
    category: 'progress',
    rarity: 'epic',
    xpReward: 250,
    criteria: { type: 'lessons_completed', target: 50 }
  }
];

interface SoftSkillsAchievementsProps {
  className?: string;
  showUnlocked?: boolean;
  compact?: boolean;
}

export const SoftSkillsAchievements: React.FC<SoftSkillsAchievementsProps> = ({
  className,
  showUnlocked = true,
  compact = false
}) => {
  const { moduleProgress, courseProgress } = useSoftSkillsProgress();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<string[]>([]);

  // Load unlocked achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('soft_skills_achievements');
    if (saved) {
      try {
        setUnlockedAchievements(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading achievements:', error);
      }
    }
  }, []);

  // Save achievements to localStorage
  useEffect(() => {
    localStorage.setItem('soft_skills_achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  // Check for new achievements
  useEffect(() => {
    const checkAchievements = () => {
      const newUnlocked: string[] = [];

      ACHIEVEMENTS.forEach(achievement => {
        if (unlockedAchievements.includes(achievement.id)) return;

        let isUnlocked = false;

        switch (achievement.criteria.type) {
          case 'modules_completed':
            const completedModules = achievement.criteria.courseId
              ? moduleProgress.filter(m => m.courseId === achievement.criteria.courseId && m.progressPercentage >= 100).length
              : moduleProgress.filter(m => m.progressPercentage >= 100).length;
            isUnlocked = completedModules >= achievement.criteria.target;
            break;

          case 'courses_completed':
            const completedCourses = achievement.criteria.courseId
              ? courseProgress.filter(c => c.courseId === achievement.criteria.courseId && c.overallProgress >= 100).length
              : courseProgress.filter(c => c.overallProgress >= 100).length;
            isUnlocked = completedCourses >= achievement.criteria.target;
            break;

          case 'time_spent':
            const totalTime = moduleProgress.reduce((sum, m) => sum + m.timeSpentMinutes, 0);
            isUnlocked = totalTime >= achievement.criteria.target;
            break;

          case 'quiz_score':
            let highScoreCount = 0;
            moduleProgress.forEach(module => {
              Object.values(module.detailedProgress.quizScores || {}).forEach(score => {
                if (score >= 90) highScoreCount++;
              });
            });
            isUnlocked = highScoreCount >= achievement.criteria.target;
            break;

          case 'lessons_completed':
            const totalLessons = moduleProgress.reduce((sum, m) => sum + (m.detailedProgress.completedLessons?.length || 0), 0);
            isUnlocked = totalLessons >= achievement.criteria.target;
            break;
        }

        if (isUnlocked) {
          newUnlocked.push(achievement.id);
        }
      });

      if (newUnlocked.length > 0) {
        setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
        setRecentlyUnlocked(newUnlocked);
        
        // Show notifications for new achievements
        newUnlocked.forEach(achievementId => {
          const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
          if (achievement) {
            toast.success(`🏆 Achievement Unlocked: ${achievement.title}!`, {
              description: `${achievement.description} (+${achievement.xpReward} XP)`
            });
          }
        });

        // Clear recent notifications after 5 seconds
        setTimeout(() => {
          setRecentlyUnlocked([]);
        }, 5000);
      }
    };

    if (moduleProgress.length > 0) {
      checkAchievements();
    }
  }, [moduleProgress, courseProgress, unlockedAchievements]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string, isUnlocked: boolean) => {
    if (!isUnlocked) return '';
    switch (rarity) {
      case 'rare': return 'ring-2 ring-blue-200 shadow-blue-100';
      case 'epic': return 'ring-2 ring-purple-200 shadow-purple-100';
      case 'legendary': return 'ring-2 ring-yellow-200 shadow-yellow-100';
      default: return '';
    }
  };

  const achievementsToShow = showUnlocked 
    ? ACHIEVEMENTS.filter(a => unlockedAchievements.includes(a.id))
    : ACHIEVEMENTS;

  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {achievementsToShow.slice(0, 6).map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const isRecent = recentlyUnlocked.includes(achievement.id);
          const IconComponent = achievement.icon;

          return (
            <div
              key={achievement.id}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all",
                isUnlocked ? "bg-white shadow-sm" : "bg-gray-50 opacity-60",
                getRarityGlow(achievement.rarity, isUnlocked),
                isRecent && "animate-pulse"
              )}
            >
              <IconComponent className={cn("h-4 w-4", isUnlocked ? achievement.iconColor : "text-gray-400")} />
              <span className="text-sm font-medium">{achievement.title}</span>
              {isRecent && <Badge className="text-xs bg-green-500">New!</Badge>}
            </div>
          );
        })}
        {achievementsToShow.length > 6 && (
          <Button variant="ghost" size="sm" className="h-auto py-2">
            +{achievementsToShow.length - 6} more
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>Achievements</span>
          <Badge variant="outline" className="ml-auto">
            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {achievementsToShow.map(achievement => {
            const isUnlocked = unlockedAchievements.includes(achievement.id);
            const isRecent = recentlyUnlocked.includes(achievement.id);
            const IconComponent = achievement.icon;

            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex items-center space-x-4 p-4 rounded-lg border transition-all",
                  isUnlocked ? "bg-white shadow-sm" : "bg-gray-50 opacity-60",
                  getRarityGlow(achievement.rarity, isUnlocked),
                  isRecent && "animate-pulse"
                )}
              >
                <div className={cn(
                  "p-3 rounded-full",
                  isUnlocked ? "bg-primary/10" : "bg-gray-200"
                )}>
                  <IconComponent className={cn(
                    "h-6 w-6",
                    isUnlocked ? achievement.iconColor : "text-gray-400"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <Badge className={cn("text-xs", getRarityColor(achievement.rarity))}>
                      {achievement.rarity}
                    </Badge>
                    {isRecent && <Badge className="text-xs bg-green-500">New!</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-muted-foreground">+{achievement.xpReward} XP</span>
                  </div>
                </div>
                
                {isUnlocked && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};