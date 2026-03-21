import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, CheckCircle2, Lock, Users, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';
import BlackBusinessModule1 from './black-business/BlackBusinessModule1';
import BlackBusinessModule2 from './black-business/BlackBusinessModule2';
import BlackBusinessModule3 from './black-business/BlackBusinessModule3';
import BlackBusinessModule4 from './black-business/BlackBusinessModule4';
import BlackBusinessModule5 from './black-business/BlackBusinessModule5';
import BlackBusinessModule6 from './black-business/BlackBusinessModule6';

interface BlackInBusinessExcellenceProps {
  onBack: () => void;
}

const BlackInBusinessExcellence: React.FC<BlackInBusinessExcellenceProps> = ({ onBack }) => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  // Use unified progress tracking
  const { 
    getModuleProgress, 
    completeModule, 
    updateModuleProgress,
    loading,
    syncing 
  } = useSoftSkillsProgress({ courseId: 'black_business' });

  // Get individual module progress
  const module1Progress = getModuleProgress('module_1', 'black_business');
  const module2Progress = getModuleProgress('module_2', 'black_business');
  const module3Progress = getModuleProgress('module_3', 'black_business');
  const module4Progress = getModuleProgress('module_4', 'black_business');
  const module5Progress = getModuleProgress('module_5', 'black_business');
  const module6Progress = getModuleProgress('module_6', 'black_business');

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

  const modules = [
    {
      id: 1,
      title: 'Authentic Leadership & Identity',
      description: 'Develop powerful leadership presence while staying true to your authentic self and cultural identity',
      duration: '40 mins',
      topics: ['Authentic Leadership', 'Cultural Code-Switching', 'Executive Presence'],
      isUnlocked: true
    },
    {
      id: 2,
      title: 'Strategic Communication & Code-Switching',
      description: 'Master the art of professional communication across different cultural contexts while maintaining authenticity',
      duration: '45 mins',
      topics: ['Strategic Communication', 'Microaggressions', 'Professional Advocacy'],
      isUnlocked: completedModules.has(1)
    },
    {
      id: 3,
      title: 'Building Strategic Networks',
      description: 'Develop powerful professional networks that support your career advancement and create opportunities',
      duration: '50 mins',
      topics: ['Strategic Networking', 'Sponsor vs. Mentor', 'Network Mapping'],
      isUnlocked: completedModules.has(2)
    },
    {
      id: 4,
      title: 'Navigating Workplace Politics & Bias',
      description: 'Develop skills to handle workplace politics, unconscious bias, and challenging situations with confidence',
      duration: '45 mins',
      topics: ['Workplace Politics', 'Unconscious Bias', 'Strategic Allyship'],
      isUnlocked: completedModules.has(3)
    },
    {
      id: 5,
      title: 'Leveraging Your Unique Perspective',
      description: 'Transform your diverse background and experiences into competitive advantages that drive innovation',
      duration: '40 mins',
      topics: ['Unique Value Proposition', 'Cultural Intelligence', 'Innovation Through Inclusion'],
      isUnlocked: completedModules.has(4)
    },
    {
      id: 6,
      title: 'Creating Inclusive Environments & Advocacy',
      description: 'Learn to advocate for yourself and others while creating positive change and inclusive environments',
      duration: '50 mins',
      topics: ['Self-Advocacy', 'Systemic Change', 'Inclusive Leadership'],
      isUnlocked: completedModules.has(5)
    }
  ];

  const handleModuleComplete = async (moduleId: number) => {
    try {
      await completeModule(`module_${moduleId}`, 'black_business', 100);
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
    const moduleProps = {
      onBack: () => setSelectedModule(null),
      onComplete: () => handleModuleComplete(selectedModule),
      isCompleted: completedModules.has(selectedModule)
    };

    switch (selectedModule) {
      case 1:
        return <BlackBusinessModule1 {...moduleProps} />;
      case 2:
        return <BlackBusinessModule2 {...moduleProps} />;
      case 3:
        return <BlackBusinessModule3 {...moduleProps} />;
      case 4:
        return <BlackBusinessModule4 {...moduleProps} />;
      case 5:
        return <BlackBusinessModule5 {...moduleProps} />;
      case 6:
        return <BlackBusinessModule6 {...moduleProps} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Black in Business Excellence</h1>
            <p className="text-muted-foreground">Master professional excellence while navigating unique challenges and leveraging your authentic identity</p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Course Progress</span>
            </CardTitle>
            <CardDescription>
              Complete modules in order to unlock advanced content and build your professional excellence
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

            return (
              <Card 
                key={module.id} 
                className={`transition-all duration-200 ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : isCompleted 
                      ? 'border-green-200 bg-green-50' 
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
                            : 'bg-blue-500 text-white'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isLocked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          <BookOpen className="h-5 w-5" />
                        )}
                      </div>
                      <Badge variant="secondary">
                        Module {module.id}
                      </Badge>
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    )}
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
                    variant={isCompleted ? "outline" : "default"}
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
                    Congratulations! You've mastered Black in Business Excellence and are ready to lead authentically.
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

export default BlackInBusinessExcellence;