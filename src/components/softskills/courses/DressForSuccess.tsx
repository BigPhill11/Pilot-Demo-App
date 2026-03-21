import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target, Award, Shirt, Briefcase, Eye, Users as Team, Sparkles, Crown, ArrowLeft } from 'lucide-react';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';

interface DressForSuccessProps {
  onBack: () => void;
}

const DressForSuccess: React.FC<DressForSuccessProps> = ({ onBack }) => {
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  
  const { 
    getModuleProgress, 
    completeModule, 
    updateModuleProgress,
    loading,
    syncing 
  } = useSoftSkillsProgress({ courseId: 'dress_for_success' });

  const modules = [
    {
      id: 1,
      title: 'Professional Wardrobe Foundations',
      description: 'Build a versatile wardrobe that projects confidence and competence',
      icon: Shirt,
      estimatedTime: '25 minutes',
      keyTopics: ['Wardrobe essentials', 'Color coordination', 'Quality basics', 'Investment pieces'],
      isUnlocked: true
    },
    {
      id: 2,
      title: 'Industry-Specific Dress Codes',
      description: 'Navigate different professional environments with appropriate attire',
      icon: Briefcase,
      estimatedTime: '30 minutes',
      keyTopics: ['Business formal', 'Business casual', 'Creative industries', 'Finance standards'],
      isUnlocked: completedModules.has(1)
    },
    {
      id: 3,
      title: 'Personal Grooming & Details',
      description: 'Master the finishing touches that complete your professional image',
      icon: Eye,
      estimatedTime: '20 minutes',
      keyTopics: ['Personal hygiene', 'Accessories', 'Hair styling', 'Nail care'],
      isUnlocked: completedModules.has(2)
    },
    {
      id: 4,
      title: 'Body Language & Presence',
      description: 'Align your physical presence with your professional appearance',
      icon: Team,
      estimatedTime: '35 minutes',
      keyTopics: ['Posture', 'Confident walking', 'Handshakes', 'Space awareness'],
      isUnlocked: completedModules.has(3)
    },
    {
      id: 5,
      title: 'Special Occasions & Events',
      description: 'Dress appropriately for networking events, presentations, and celebrations',
      icon: Sparkles,
      estimatedTime: '25 minutes',
      keyTopics: ['Networking events', 'Client meetings', 'Company parties', 'Conference attire'],
      isUnlocked: completedModules.has(4)
    },
    {
      id: 6,
      title: 'Executive Presence & Leadership Style',
      description: 'Develop a signature style that commands respect and authority',
      icon: Crown,
      estimatedTime: '30 minutes',
      keyTopics: ['Leadership presence', 'Personal branding', 'Signature style', 'Authority dressing'],
      isUnlocked: completedModules.has(5)
    }
  ];

  // Update completion status based on progress data
  useEffect(() => {
    const completed = new Set<number>();
    for (let i = 1; i <= 6; i++) {
      const moduleProgress = getModuleProgress(`module_${i}`, 'dress_for_success');
      if (moduleProgress?.completedAt) {
        completed.add(i);
      }
    }
    setCompletedModules(completed);
  }, [getModuleProgress]);

  const handleModuleComplete = async (moduleId: number) => {
    try {
      await completeModule(`module_${moduleId}`, 'dress_for_success', 100);
      setCompletedModules(prev => new Set([...prev, moduleId]));
      setCurrentModule(null);
    } catch (error) {
      console.error('Failed to complete module:', error);
    }
  };

  const handleStartModule = (moduleId: number) => {
    setCurrentModule(moduleId);
  };

  const handleBackToOverview = () => {
    setCurrentModule(null);
  };

  const overallProgress = (completedModules.size / modules.length) * 100;

  // For now, render placeholder content for modules until individual components are created
  if (currentModule) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button onClick={handleBackToOverview} variant="outline">
            ← Back to Course Overview
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Module {currentModule}: {modules[currentModule - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                {modules[currentModule - 1].description}
              </p>
              
              <div>
                <h3 className="font-semibold mb-3">Learning Objectives:</h3>
                <ul className="space-y-2">
                  {modules[currentModule - 1].keyTopics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-accent p-4 rounded-lg">
                <p className="text-center text-muted-foreground">
                  Module content is being developed. This will include interactive lessons,
                  practical exercises, and assessments.
                </p>
              </div>
              
              <Button 
                onClick={() => handleModuleComplete(currentModule)}
                className="w-full"
              >
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shirt className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Dress for Success</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master professional appearance and personal branding to make powerful first impressions and command respect
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>2.5-3 hours total</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>6 Practical Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Professional Development</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Completion</span>
              <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{completedModules.size} of {modules.length} modules completed</span>
              <span>Complete modules to track progress</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const isCompleted = completedModules.has(module.id);
          const moduleProgress = getModuleProgress(`module_${module.id}`, 'dress_for_success');
          const progressPercentage = moduleProgress?.progressPercentage || 0;
          
          return (
            <Card 
              key={module.id} 
              className={`transition-all duration-200 ${
                module.isUnlocked 
                  ? 'hover:shadow-lg cursor-pointer border-border' 
                  : 'opacity-50 cursor-not-allowed border-muted'
              } ${isCompleted ? 'bg-accent/20 border-primary' : ''}`}
            >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground' 
                      : module.isUnlocked 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    <module.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground">{module.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {isCompleted && (
                    <Badge variant="default" className="text-xs">
                      Completed
                    </Badge>
                  )}
                  {!module.isUnlocked && (
                    <Badge variant="secondary" className="text-xs">
                      Locked
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{module.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {module.keyTopics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleStartModule(module.id)}
                  disabled={!module.isUnlocked}
                  className="w-full"
                  variant={isCompleted ? "outline" : "default"}
                >
                  {isCompleted ? 'Review Module' : 'Start Module'}
                </Button>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DressForSuccess;