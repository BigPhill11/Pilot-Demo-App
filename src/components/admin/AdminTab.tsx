
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Shield, BookOpen, CheckCircle, RotateCcw, Settings, Users, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { moduleRegistry, getAllModules } from '@/data/ModuleRegistry';

interface LessonCompletion {
  id: string;
  career_id: string;
  lesson_level: number;
  completed_at: string;
  completed_by_admin: boolean;
}

const AdminTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [completions, setCompletions] = useState<LessonCompletion[]>([]);
  const [loading, setLoading] = useState(true);
  
  const careers = [
    { id: 'investment-banking', name: 'Investment Banking', levels: 7 },
    { id: 'private-equity', name: 'Private Equity', levels: 7 }
  ];

  const allModules = getAllModules();

  useEffect(() => {
    fetchCompletions();
  }, [user]);

  const fetchCompletions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('lesson_completions')
        .select('*')
        .eq('user_id', user.id)
        .order('career_id, lesson_level');

      if (error) throw error;
      setCompletions(data || []);
    } catch (error) {
      console.error('Error fetching completions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch lesson completions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getNextAvailableLevel = (careerId: string) => {
    const careerCompletions = completions.filter(c => c.career_id === careerId);
    const completedLevels = careerCompletions.map(c => c.lesson_level).sort((a, b) => a - b);
    
    // Find the first gap in the sequence or return the next level after the highest completed
    for (let i = 1; i <= 7; i++) {
      if (!completedLevels.includes(i)) {
        return i;
      }
    }
    return 8; // All levels completed
  };

  const markLessonComplete = async (careerId: string, level: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('lesson_completions')
        .upsert({
          user_id: user.id,
          career_id: careerId,
          lesson_level: level,
          completed_by_admin: true
        }, {
          onConflict: 'user_id,career_id,lesson_level'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Marked ${careerId} Level ${level} as complete. ${level < 7 ? `Level ${level + 1} is now available!` : 'All levels completed!'}`,
      });

      fetchCompletions();
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark lesson as complete',
        variant: 'destructive'
      });
    }
  };

  const markAllComplete = async (careerId: string) => {
    if (!user) return;

    try {
      const career = careers.find(c => c.id === careerId);
      if (!career) return;

      const completionPromises = [];
      for (let level = 1; level <= career.levels; level++) {
        completionPromises.push(
          supabase
            .from('lesson_completions')
            .upsert({
              user_id: user.id,
              career_id: careerId,
              lesson_level: level,
              completed_by_admin: true
            }, {
              onConflict: 'user_id,career_id,lesson_level'
            })
        );
      }

      await Promise.all(completionPromises);

      toast({
        title: 'Success',
        description: `Marked all ${career.name} lessons as complete`,
      });

      fetchCompletions();
    } catch (error) {
      console.error('Error marking all lessons complete:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark all lessons as complete',
        variant: 'destructive'
      });
    }
  };

  const resetProgress = async (careerId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('lesson_completions')
        .delete()
        .eq('user_id', user.id)
        .eq('career_id', careerId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Reset progress for ${careerId}`,
      });

      fetchCompletions();
    } catch (error) {
      console.error('Error resetting progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to reset progress',
        variant: 'destructive'
      });
    }
  };

  const isLevelComplete = (careerId: string, level: number) => {
    return completions.some(c => c.career_id === careerId && c.lesson_level === level);
  };

  const isLevelAvailable = (careerId: string, level: number) => {
    if (level === 1) return true; // First level is always available
    return isLevelComplete(careerId, level - 1); // Level is available if previous level is complete
  };

  const getCompletedCount = (careerId: string) => {
    return completions.filter(c => c.career_id === careerId).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="h-5 w-5" />
            Enhanced Admin Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 text-sm mb-4">
            ⚠️ Admin-only functionality. You can skip lessons and manage progress here.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Settings className="h-4 w-4 text-blue-600" />
              <span>Admin Mode Available</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-green-600" />
              <span>{allModules.length} Modules Registered</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-purple-600" />
              <span>Quick Level Access</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Learning Modules Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            All Learning Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allModules.map((module) => (
              <Card key={module.id} className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    {module.name}
                    <Badge variant="outline">{module.levels.length} levels</Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {module.levels.map((level) => (
                      <Badge
                        key={level.id}
                        variant="outline"
                        className="h-8 px-2 text-xs"
                        title={`${level.title} - ${level.description}`}
                      >
                        L{level.id}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {careers.map((career) => {
        const completedCount = getCompletedCount(career.id);
        const nextAvailableLevel = getNextAvailableLevel(career.id);
        
        return (
          <Card key={career.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {career.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={completedCount === career.levels ? 'default' : 'outline'}>
                    {completedCount}/{career.levels} Complete
                  </Badge>
                  {nextAvailableLevel <= career.levels && (
                    <Badge variant="secondary">
                      Next: Level {nextAvailableLevel}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: career.levels }, (_, i) => {
                  const level = i + 1;
                  const isComplete = isLevelComplete(career.id, level);
                  const isAvailable = isLevelAvailable(career.id, level);
                  
                  return (
                    <Button
                      key={level}
                      variant={isComplete ? 'default' : isAvailable ? 'outline' : 'ghost'}
                      size="sm"
                      onClick={() => markLessonComplete(career.id, level)}
                      disabled={!isAvailable && !isComplete}
                      className={`h-12 flex flex-col items-center justify-center ${
                        isComplete ? 'bg-green-500 hover:bg-green-600' :
                        isAvailable ? 'border-blue-500 hover:border-blue-600' :
                        'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      {isComplete && <CheckCircle className="h-3 w-3 mb-1" />}
                      <span className="text-xs">L{level}</span>
                      {!isAvailable && !isComplete && (
                        <span className="text-xs opacity-60">🔒</span>
                      )}
                    </Button>
                  );
                })}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => markAllComplete(career.id)}
                  className="flex-1"
                >
                  Complete All
                </Button>
                <Button
                  variant="outline"
                  onClick={() => resetProgress(career.id)}
                  className="flex-1"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>• Green buttons: Completed lessons</p>
                <p>• Blue outlined buttons: Available to complete</p>
                <p>• Locked buttons: Complete previous levels first</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminTab;
