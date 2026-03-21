import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, CheckCircle2, Lock, Users, Crown, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';
import WorkingWomenModule1 from './working-women/WorkingWomenModule1';
import WorkingWomenModule2 from './working-women/WorkingWomenModule2';
import WorkingWomenModule3 from './working-women/WorkingWomenModule3';
import WorkingWomenModule4 from './working-women/WorkingWomenModule4';
import WorkingWomenModule5 from './working-women/WorkingWomenModule5';
import WorkingWomenModule6 from './working-women/WorkingWomenModule6';

interface WorkingWomenExcellenceProps {
  onBack: () => void;
}

const WorkingWomenExcellence: React.FC<WorkingWomenExcellenceProps> = ({ onBack }) => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  // Use unified progress tracking
  const { 
    getModuleProgress, 
    completeModule, 
    updateModuleProgress,
    loading,
    syncing 
  } = useSoftSkillsProgress({ courseId: 'working_women' });

  // Get individual module progress
  const module1Progress = getModuleProgress('module_1', 'working_women');
  const module2Progress = getModuleProgress('module_2', 'working_women');
  const module3Progress = getModuleProgress('module_3', 'working_women');
  const module4Progress = getModuleProgress('module_4', 'working_women');
  const module5Progress = getModuleProgress('module_5', 'working_women');
  const module6Progress = getModuleProgress('module_6', 'working_women');

  // Check completion status for all modules
  useEffect(() => {
    const completed = new Set<number>();
    
    if (module1Progress?.completedAt) completed.add(1);
    if (module2Progress?.completedAt) completed.add(2);
    if (module3Progress?.completedAt) completed.add(3);
    if (module4Progress?.completedAt) completed.add(4);
    if (module5Progress?.completedAt) completed.add(5);
    if (module6Progress?.completedAt) completed.add(6);
    
    setCompletedModules(completed);
  }, [
    module1Progress?.completedAt,
    module2Progress?.completedAt,
    module3Progress?.completedAt,
    module4Progress?.completedAt,
    module5Progress?.completedAt,
    module6Progress?.completedAt
  ]);

  const getModuleProgressData = (moduleId: number) => {
    switch (moduleId) {
      case 1: return module1Progress;
      case 2: return module2Progress;
      case 3: return module3Progress;
      case 4: return module4Progress;
      case 5: return module5Progress;
      case 6: return module6Progress;
      default: return null;
    }
  };

  const modules = [
    {
      id: 1,
      title: 'Executive Presence & Assertive Communication',
      description: 'Develop commanding presence and assertive communication skills that ensure your voice is heard and respected',
      duration: '45 mins',
      topics: ['Executive Presence', 'Assertive Communication', 'Double Bind'],
      isUnlocked: true,
    },
    {
      id: 2,
      title: 'Work-Life Integration Strategies',
      description: 'Master strategies for integrating professional ambitions with personal responsibilities and well-being',
      duration: '40 mins',
      topics: ['Work-Life Integration', 'Boundary Setting', 'Energy Management'],
      isUnlocked: completedModules.has(1)
    },
    {
      id: 3,
      title: 'Salary Negotiation & Self-Advocacy',
      description: 'Master the art of negotiating for what you\'re worth and advocating effectively for your career advancement',
      duration: '50 mins',
      topics: ['Market Value Research', 'Anchoring', 'Professional Advocacy'],
      isUnlocked: completedModules.has(2)
    },
    {
      id: 4,
      title: 'Navigating Gender Dynamics',
      description: 'Develop strategies for effectively navigating gender-based challenges and biases in professional environments',
      duration: '45 mins',
      topics: ['Unconscious Bias', 'Glass Ceiling', 'Allyship'],
      isUnlocked: completedModules.has(3)
    },
    {
      id: 5,
      title: 'Building Strategic Networks & Mentorship',
      description: 'Create powerful professional networks and mentoring relationships that accelerate your career advancement',
      duration: '45 mins',
      topics: ['Strategic Networking', 'Sponsor vs. Mentor', 'Reciprocal Networking'],
      isUnlocked: completedModules.has(4)
    },
    {
      id: 6,
      title: 'Leadership Authenticity & Breaking Barriers',
      description: 'Develop your authentic leadership style while breaking through barriers and creating opportunities for other women',
      duration: '50 mins',
      topics: ['Authentic Leadership', 'Glass Cliff', 'Barrier Breaking'],
      isUnlocked: completedModules.has(5)
    }
  ];

  const handleModuleComplete = async (moduleId: number) => {
    try {
      await completeModule(`module_${moduleId}`, 'working_women', 100);
      setCompletedModules(prev => new Set([...prev, moduleId]));
      setSelectedModule(null);
    } catch (error) {
      console.error('Failed to complete module:', error);
    }
  };

  const calculateOverallProgress = () => {
    return (completedModules.size / modules.length) * 100;
  };

  if (selectedModule) {
    const progressData = getModuleProgressData(selectedModule);
    const moduleProps = {
      onBack: () => setSelectedModule(null),
      onComplete: () => handleModuleComplete(selectedModule),
      isCompleted: completedModules.has(selectedModule),
      progressData
    };

    switch (selectedModule) {
      case 1:
        return <WorkingWomenModule1 {...moduleProps} />;
      case 2:
        return <WorkingWomenModule2 {...moduleProps} />;
      case 3:
        return <WorkingWomenModule3 {...moduleProps} />;
      case 4:
        return <WorkingWomenModule4 {...moduleProps} />;
      case 5:
        return <WorkingWomenModule5 {...moduleProps} />;
      case 6:
        return <WorkingWomenModule6 {...moduleProps} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Working Women Excellence</h1>
            <p className="text-muted-foreground">Navigate professional challenges unique to women in the workplace and accelerate your career</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <span>Course Progress</span>
            </CardTitle>
            <CardDescription>
              Complete modules in order to unlock advanced content and master professional excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedModules.size} of {modules.length} modules completed
                </span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const isCompleted = completedModules.has(module.id);
            const isLocked = !module.isUnlocked;
            const moduleProgressData = getModuleProgressData(module.id);
            const hasStarted = moduleProgressData && moduleProgressData.progressPercentage > 0;
            const progressPercentage = moduleProgressData?.progressPercentage || 0;

            return (
              <Card 
                key={module.id} 
                className={`transition-all duration-200 ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : hasStarted
                        ? 'border-blue-200 bg-blue-50'
                        : 'hover:shadow-lg cursor-pointer'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isLocked 
                            ? 'bg-gray-300 text-gray-500'
                            : hasStarted
                              ? 'bg-blue-500 text-white'
                              : 'bg-purple-500 text-white'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5" />
                        ) : hasStarted ? (
                          <PlayCircle className="h-5 w-5" />
                        ) : (
                          <BookOpen className="h-5 w-5" />
                        )}
                      </div>
                      <Badge variant="secondary">
                        Module {module.id}
                      </Badge>
                    </div>
                    {isCompleted ? (
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    ) : hasStarted ? (
                      <Badge className="bg-blue-100 text-blue-800">
                        In Progress
                      </Badge>
                    ) : null}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                  </div>

                  {hasStarted && !isCompleted && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Progress</span>
                        <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Topics:</h4>
                    <div className="flex flex-wrap gap-1">
                      {module.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={isCompleted ? "outline" : hasStarted ? "default" : "default"}
                    disabled={isLocked}
                    onClick={() => !isLocked && setSelectedModule(module.id)}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Review Module
                      </>
                    ) : hasStarted ? (
                      <>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Module
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Module
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Course Completion */}
        {completedModules.size === modules.length && (
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-green-500 text-white p-4 rounded-full">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800">Course Complete! 🎉</h3>
                  <p className="text-green-700">
                    Congratulations! You've mastered Working Women Excellence and are ready to break barriers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkingWomenExcellence;