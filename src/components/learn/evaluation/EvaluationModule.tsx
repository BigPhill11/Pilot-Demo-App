import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { EvaluationModule as ModuleType } from '@/data/evaluation-lessons';
import { useEvaluationProgress } from '@/hooks/useEvaluationProgress';
import ModuleQuiz from './ModuleQuiz';
import CompanyExampleCard from './CompanyExampleCard';
import RevenueGrowthCalculator from './interactive/RevenueGrowthCalculator';
import MarginComparisonTool from './interactive/MarginComparisonTool';
import CompanyComparisonMatrix from './interactive/CompanyComparisonMatrix';
import { useToast } from '@/hooks/use-toast';

interface EvaluationModuleProps {
  module: ModuleType;
  lessonNumber: number;
  onComplete: () => void;
}

const EvaluationModule: React.FC<EvaluationModuleProps> = ({ 
  module, 
  lessonNumber,
  onComplete 
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const { getModuleProgress, saveProgress } = useEvaluationProgress();
  const { toast } = useToast();

  const existingProgress = getModuleProgress(lessonNumber, module.moduleNumber);

  useEffect(() => {
    if (existingProgress?.completed) {
      setQuizCompleted(true);
    }
  }, [existingProgress]);

  const handleQuizComplete = async (score: number, passed: boolean) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    if (passed) {
      setQuizCompleted(true);
      await saveProgress({
        lessonNumber,
        moduleNumber: module.moduleNumber,
        completed: true,
        quizScore: score,
        timeSpent,
        completedAt: new Date().toISOString()
      });

      toast({
        title: '🎉 Module Complete!',
        description: `You scored ${score} out of ${module.quiz.questions.length}`,
      });

      // Call onComplete callback to notify parent
      onComplete();
    }
  };

  const renderInteractive = () => {
    const { component } = module.content.interactiveElement;
    
    switch (component) {
      case 'RevenueGrowthCalculator':
        return <RevenueGrowthCalculator />;
      case 'MarginComparisonTool':
        return <MarginComparisonTool />;
      case 'CompanyComparisonMatrix':
        return <CompanyComparisonMatrix />;
      default:
        return null;
    }
  };

  if (showQuiz) {
    return (
      <ModuleQuiz
        quiz={module.quiz}
        moduleTitle={module.title}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">
                Module {module.moduleNumber}
              </div>
              <CardTitle>{module.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                ⏱️ {module.estimatedTime}
              </p>
            </div>
            {quizCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{module.description}</p>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Learning Objectives:
              </h4>
              <ul className="space-y-1 text-sm">
                {module.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{module.content.introduction}</p>
        </CardContent>
      </Card>

      {/* Content Sections */}
      {module.content.sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{section.heading}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{section.content}</p>
            
            {section.analogy && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                <p className="text-sm">{section.analogy}</p>
              </div>
            )}

            {section.bulletPoints && (
              <ul className="space-y-2">
                {section.bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Company Examples */}
      {module.content.examples.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Real Company Examples</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {module.content.examples.map((example, index) => (
              <CompanyExampleCard key={index} example={example} />
            ))}
          </div>
        </div>
      )}

      {/* Interactive Element */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            {module.content.interactiveElement.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {module.content.interactiveElement.description}
          </p>
        </CardHeader>
        <CardContent>
          {renderInteractive()}
        </CardContent>
      </Card>

      {/* Key Takeaways */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {module.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 font-bold">✓</span>
                <span className="text-sm font-medium">{takeaway}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Quiz Button */}
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">
              {quizCompleted ? 'Module Completed!' : 'Ready to Test Your Knowledge?'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {quizCompleted 
                ? 'Great job! You can retake the quiz or move on to the next module.'
                : `Complete the quiz to unlock the next module. You need ${module.quiz.passingScore} out of ${module.quiz.questions.length} correct to pass.`
              }
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button 
              onClick={() => setShowQuiz(true)}
              size="lg"
              variant={quizCompleted ? 'outline' : 'default'}
            >
              {quizCompleted ? 'Retake Quiz' : 'Start Quiz'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {quizCompleted && (
              <Button 
                onClick={onComplete}
                size="lg"
              >
                Next Module
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationModule;
