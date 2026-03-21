import React, { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, CheckCircle, Clock, Target, Lock, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
// Lazy-load modules to avoid heavy initial render and isolate runtime errors
const NetworkingModule1 = React.lazy(() => import('./networking/NetworkingModule1'));
const NetworkingModule2 = React.lazy(() => import('./networking/NetworkingModule2'));
const NetworkingModule3 = React.lazy(() => import('./networking/NetworkingModule3'));
const NetworkingModule4 = React.lazy(() => import('./networking/NetworkingModule4'));
const NetworkingModule5 = React.lazy(() => import('./networking/NetworkingModule5'));
const NetworkingModule6 = React.lazy(() => import('./networking/NetworkingModule6'));

interface NetworkingLikeProProps {
  onBack: () => void;
}

// Simple error boundary to prevent full app crash if a module throws
class ModuleErrorBoundary extends React.Component<{ onReset: () => void; children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { onReset: () => void; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.error('Module rendering error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">We hit a snag loading this module</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-red-700">Please try again. If the issue persists, let us know.</p>
            <Button variant="outline" onClick={this.props.onReset}>Back to Course</Button>
          </CardContent>
        </Card>
      );
    }
    return this.props.children;
  }
}

const NetworkingLikePro: React.FC<NetworkingLikeProProps> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());

  const modules = [
    { 
      id: 1, 
      title: 'Networking Fundamentals', 
      subtitle: 'Understanding the networking mindset and foundation',
      duration: '15 min', 
      component: NetworkingModule1,
      keyTopics: ['Networking mindset', 'Relationship building', 'Value creation', '+2 more'],
      description: 'Build foundational confidence and establish the right mindset'
    },
    { 
      id: 2, 
      title: 'Personal Brand Building', 
      subtitle: 'Crafting your professional identity and presence',
      duration: '20 min', 
      component: NetworkingModule2,
      keyTopics: ['Brand identity', 'Elevator pitch', 'Value proposition', '+2 more'],
      description: 'Develop your unique professional brand and compelling story'
    },
    { 
      id: 3, 
      title: 'Strategic Relationships', 
      subtitle: 'Building meaningful professional connections',
      duration: '25 min', 
      component: NetworkingModule3,
      keyTopics: ['Rapport building', 'Network mapping', 'Follow-up strategies', '+2 more'],
      description: 'Master the art of building and nurturing strategic relationships'
    },
    { 
      id: 4, 
      title: 'Digital Networking', 
      subtitle: 'Leveraging online platforms for professional growth',
      duration: '20 min', 
      component: NetworkingModule4,
      keyTopics: ['LinkedIn optimization', 'Online presence', 'Digital engagement', '+2 more'],
      description: 'Excel at digital networking across professional platforms'
    },
    { 
      id: 5, 
      title: 'Event Mastery', 
      subtitle: 'Maximizing networking opportunities at events',
      duration: '25 min', 
      component: NetworkingModule5,
      keyTopics: ['Event preparation', 'Working the room', 'Follow-up systems', '+2 more'],
      description: 'Navigate networking events with confidence and strategy'
    },
    { 
      id: 6, 
      title: 'Relationship Management', 
      subtitle: 'Maintaining long-term professional connections',
      duration: '20 min', 
      component: NetworkingModule6,
      keyTopics: ['CRM systems', 'Value delivery', 'Long-term nurturing', '+2 more'],
      description: 'Build systems for sustainable relationship management'
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
  };

  const handleBackToOverview = () => {
    setActiveModule(null);
  };

  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1) return true;
    return completedModules.has(moduleId - 1);
  };

  const progress = (completedModules.size / modules.length) * 100;

  if (activeModule) {
    const module = modules.find(m => m.id === activeModule);
    if (module) {
      const ModuleComponent = module.component;
      return (
        <ModuleErrorBoundary onReset={handleBackToOverview}>
          <Suspense fallback={<Card className="p-6"><CardContent>Loading module…</CardContent></Card>}>
            <ModuleComponent 
              onBack={handleBackToOverview}
              onComplete={() => handleModuleComplete(activeModule)}
              isCompleted={completedModules.has(activeModule)}
            />
          </Suspense>
        </ModuleErrorBoundary>
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Users className="h-8 w-8 text-primary" />
            <span>Networking Like a Pro</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Master the art of professional networking with interactive modules
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Your Networking Journey Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{completedModules.size}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{Math.round(progress)}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{modules.length - completedModules.size}</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground mb-2">
            {completedModules.size}/{modules.length} modules
          </div>
          <Progress value={progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Course Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
        <p className="text-muted-foreground mb-6">
          Welcome to Networking Like a Pro! This comprehensive course will transform you into a confident, 
          strategic networker ready to build meaningful professional relationships.
        </p>
        <p className="text-muted-foreground mb-6">
          Through 6 interactive modules, you'll master everything from personal branding to long-term relationship 
          management. Each module includes engaging games, practical exercises, and real-world scenarios to ensure 
          you're networking-ready.
        </p>
        <Card className="bg-blue-50 border-blue-200 border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Target className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">🎯 What You'll Achieve:</h3>
                <ul className="space-y-1 text-blue-700">
                  <li>• Develop unshakeable confidence and networking presence</li>
                  <li>• Master personal branding with a compelling elevator pitch</li>
                  <li>• Build strategic relationships through proven methodologies</li>
                  <li>• Excel at digital networking across all major platforms</li>
                  <li>• Navigate networking events with professional grace</li>
                  <li>• Create sustainable systems for long-term relationship management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const isUnlocked = isModuleUnlocked(module.id);
          const isCompleted = completedModules.has(module.id);
          return (
            <Card 
              key={module.id} 
              className={`hover:shadow-lg transition-all duration-200 ${!isUnlocked ? 'opacity-60' : 'hover:scale-105'} ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isCompleted ? 'bg-green-500 text-white' : isUnlocked ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      {isCompleted ? <CheckCircle className="h-5 w-5" /> : !isUnlocked ? <Lock className="h-4 w-4" /> : <span className="font-semibold">{module.id}</span>}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-sm">{module.subtitle}</CardDescription>
                    </div>
                  </div>
                  {!isUnlocked && <Lock className="h-4 w-4 text-gray-400" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{module.description}</p>
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.keyTopics.map((topic, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{module.duration}</span>
                  </div>
                  <Button onClick={() => isUnlocked && setActiveModule(module.id)} disabled={!isUnlocked} variant={isCompleted ? 'outline' : 'default'} size="sm" className={`${!isUnlocked ? 'cursor-not-allowed' : ''}`}>
                    {!isUnlocked ? (<><Lock className="h-3 w-3 mr-1" />Locked</>) : isCompleted ? 'Review' : (<><Play className="h-3 w-3 mr-1" />Start Module</>)}
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

export default NetworkingLikePro;