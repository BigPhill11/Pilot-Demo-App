
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, Lock, Play, Trophy, Users, Target, MessageSquare, Briefcase, Mail, Calendar } from 'lucide-react';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';
import InterviewModule1 from './interviewing/InterviewModule1';
import InterviewModule2 from './interviewing/InterviewModule2';
import InterviewModule3 from './interviewing/InterviewModule3';
import InterviewModule4 from './interviewing/InterviewModule4';
import InterviewModule5 from './interviewing/InterviewModule5';
import InterviewModule6 from './interviewing/InterviewModule6';

interface ProfessionalInterviewingMasteryProps {
  onBack: () => void;
}

const ProfessionalInterviewingMastery: React.FC<ProfessionalInterviewingMasteryProps> = ({ onBack }) => {
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  
  // Use unified progress tracking for the course
  const courseProgress = useUnifiedProgress({
    moduleId: 'professional-interviewing-mastery',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  // Individual module progress hooks
  const module1Progress = useUnifiedProgress({
    moduleId: 'interview-module-1',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const module2Progress = useUnifiedProgress({
    moduleId: 'interview-module-2',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const module3Progress = useUnifiedProgress({
    moduleId: 'interview-module-3',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const module4Progress = useUnifiedProgress({
    moduleId: 'interview-module-4',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const module5Progress = useUnifiedProgress({
    moduleId: 'interview-module-5',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const module6Progress = useUnifiedProgress({
    moduleId: 'interview-module-6',
    moduleType: 'soft_skills',
    courseId: 'interviewing'
  });

  const moduleProgressHooks = [
    module1Progress,
    module2Progress,
    module3Progress,
    module4Progress,
    module5Progress,
    module6Progress
  ];

  // Calculate completed modules based on progress
  const completedModules = moduleProgressHooks
    .map((hook, index) => hook.isCompleted ? index + 1 : null)
    .filter(Boolean) as number[];

  const modules = [
    {
      id: 1,
      title: "Interview Mindset & Preparation",
      icon: Target,
      description: "Build foundational confidence and establish the right mindset",
      topics: ["Know your 'Why Finance'", "Elevator pitch", "Research strategies", "STAR format", "Technical prep"]
    },
    {
      id: 2,
      title: "Behavioral Mastery",
      icon: Users,
      description: "Showcase leadership, drive, and fit authentically",
      topics: ["Top behavioral questions", "STAR stories", "Strategic honesty", "Impact quantification"]
    },
    {
      id: 3,
      title: "Technical Excellence",
      icon: Trophy,
      description: "Master technical questions across finance fundamentals",
      topics: ["Financial statements", "Valuation methods", "Market awareness", "DCF walkthrough"]
    },
    {
      id: 4,
      title: "Interview Day Etiquette",
      icon: Briefcase,
      description: "Execute with professionalism and leave lasting impressions",
      topics: ["Dress code", "Virtual etiquette", "Thoughtful questions", "Body language"]
    },
    {
      id: 5,
      title: "Post-Interview Communication",
      icon: Mail,
      description: "Handle outcomes professionally and build relationships",
      topics: ["Thank you notes", "Offer management", "Rejection grace", "Future networking"]
    },
    {
      id: 6,
      title: "Final Tips & Weekly Prep",
      icon: Calendar,
      description: "Build stamina and continuous improvement habits",
      topics: ["Mock interviews", "Market awareness", "Consistent practice", "Mindset maintenance"]
    }
  ];

  const handleCompleteModule = async (moduleId: number) => {
    const moduleProgress = moduleProgressHooks[moduleId - 1];
    if (moduleProgress && !moduleProgress.isCompleted) {
      await moduleProgress.completeModule();
      
      // Update course overall progress
      const newCompletedCount = moduleProgressHooks.filter(hook => hook.isCompleted).length + 1;
      const overallProgress = (newCompletedCount / modules.length) * 100;
      await courseProgress.updateProgress(overallProgress);
    }
    setCurrentModule(null);
  };

  const getModuleComponent = (moduleId: number) => {
    const props = { onComplete: () => handleCompleteModule(moduleId), onBack: () => setCurrentModule(null) };
    
    switch (moduleId) {
      case 1: return <InterviewModule1 {...props} />;
      case 2: return <InterviewModule2 {...props} />;
      case 3: return <InterviewModule3 {...props} />;
      case 4: return <InterviewModule4 {...props} />;
      case 5: return <InterviewModule5 {...props} />;
      case 6: return <InterviewModule6 {...props} />;
      default: return null;
    }
  };

  const overallProgress = courseProgress.progress?.progressPercentage || 0;

  if (currentModule !== null) {
    return getModuleComponent(currentModule);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Professional Interviewing Mastery</h1>
          <p className="text-muted-foreground">Master the art of finance interviews with interactive modules</p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span>Your Interview Journey Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completedModules.length}/{modules.length} modules</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-blue-600">{completedModules.length}</div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{Math.round(overallProgress)}%</div>
                <div className="text-muted-foreground">Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{modules.length - completedModules.length}</div>
                <div className="text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-lg mb-4">
              Welcome to Professional Interviewing Mastery! This comprehensive course will transform you into a confident, 
              well-prepared candidate ready to excel in finance interviews.
            </p>
            <p className="mb-4">
              Through 6 interactive modules, you'll master everything from crafting your personal story to handling 
              technical questions with ease. Each module includes engaging games, practical exercises, and real-world 
              scenarios to ensure you're interview-ready.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">🎯 What You'll Achieve:</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-1">
                <li>Develop unshakeable confidence and interview presence</li>
                <li>Master behavioral storytelling with the STAR method</li>
                <li>Excel at technical finance questions</li>
                <li>Navigate interview day with professional grace</li>
                <li>Build lasting relationships through follow-up</li>
                <li>Create sustainable prep routines for continuous improvement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module, index) => {
          const IconComponent = module.icon;
          const isCompleted = completedModules.includes(module.id);
          const isLocked = index > 0 && !completedModules.includes(index);
          
          return (
            <Card 
              key={module.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isCompleted ? 'ring-2 ring-green-500 bg-green-50' :
                isLocked ? 'opacity-60' : 'hover:border-primary'
              }`}
              onClick={() => !isLocked && setCurrentModule(module.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isLocked ? 'bg-gray-300 text-gray-500' :
                      'bg-blue-500 text-white'
                    }`}>
                      {isLocked ? <Lock className="h-5 w-5" /> :
                       isCompleted ? <CheckCircle className="h-5 w-5" /> :
                       <IconComponent className="h-5 w-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">Module {module.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{module.title}</p>
                    </div>
                  </div>
                  {isCompleted && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Key Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.slice(0, 3).map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {module.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{module.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  disabled={isLocked}
                  variant={isCompleted ? "outline" : "default"}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isCompleted ? 'Review Module' : isLocked ? 'Locked' : 'Start Module'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessionalInterviewingMastery;
