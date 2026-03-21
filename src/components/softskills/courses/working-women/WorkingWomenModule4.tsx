import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';
import { SoftSkillsProgressCard } from '@/components/progress/SoftSkillsProgressCard';

interface WorkingWomenModule4Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

const WorkingWomenModule4: React.FC<WorkingWomenModule4Props> = ({ onBack, onComplete, isCompleted }) => {
  const moduleId = 'working-women-module-4';
  const courseId = 'working_women';
  
  const { 
    getModuleProgress, 
    completeModule, 
    completeLesson,
    updateModuleProgress 
  } = useSoftSkillsProgress();

  const moduleProgress = getModuleProgress(moduleId, courseId);
  const isModuleCompleted = moduleProgress?.progressPercentage >= 100;

  const handleCompleteModule = async () => {
    if (!isModuleCompleted) {
      await completeModule(moduleId, courseId, 75);
      await updateModuleProgress(moduleId, courseId, {
        progressPercentage: 100
      });
    }
    onComplete();
  };

  const handleCompleteLesson = async (lessonId: string) => {
    await completeLesson(moduleId, courseId, lessonId, 15);
    
    // Update overall module progress based on completed lessons
    const currentProgress = moduleProgress?.progressPercentage || 0;
    const newProgress = Math.min(100, currentProgress + 25); // 4 lessons = 100%
    
    await updateModuleProgress(moduleId, courseId, {
      progressPercentage: newProgress
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Navigating Gender Dynamics</h1>
          <p className="text-muted-foreground">Module 4 - Working Women Excellence</p>
        </div>
      </div>

      {/* Progress Card */}
      <div className="mb-6">
        <SoftSkillsProgressCard 
          moduleId={moduleId}
          courseId={courseId}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Content Coming Soon</CardTitle>
          <CardDescription>
            This module will cover navigating gender-based challenges and biases professionally.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            This interactive module will help you navigate gender-based challenges professionally and build confidence in any workplace environment.
          </p>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Learning Objectives:</h4>
            
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleCompleteLesson('bias-recognition')}
                disabled={moduleProgress?.detailedProgress?.completedLessons?.includes('bias-recognition')}
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className={`h-5 w-5 mt-0.5 ${
                    moduleProgress?.detailedProgress?.completedLessons?.includes('bias-recognition') 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium">Recognizing Unconscious Bias</div>
                    <div className="text-sm text-muted-foreground">
                      Learn to identify and address unconscious bias in the workplace
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleCompleteLesson('gender-stereotypes')}
                disabled={moduleProgress?.detailedProgress?.completedLessons?.includes('gender-stereotypes')}
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className={`h-5 w-5 mt-0.5 ${
                    moduleProgress?.detailedProgress?.completedLessons?.includes('gender-stereotypes') 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium">Handling Gender Stereotypes</div>
                    <div className="text-sm text-muted-foreground">
                      Strategies for addressing and overcoming gender-based assumptions
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleCompleteLesson('glass-ceiling')}
                disabled={moduleProgress?.detailedProgress?.completedLessons?.includes('glass-ceiling')}
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className={`h-5 w-5 mt-0.5 ${
                    moduleProgress?.detailedProgress?.completedLessons?.includes('glass-ceiling') 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium">Breaking Through Glass Ceilings</div>
                    <div className="text-sm text-muted-foreground">
                      Techniques for advancing your career despite systemic barriers
                    </div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleCompleteLesson('strategic-alliances')}
                disabled={moduleProgress?.detailedProgress?.completedLessons?.includes('strategic-alliances')}
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className={`h-5 w-5 mt-0.5 ${
                    moduleProgress?.detailedProgress?.completedLessons?.includes('strategic-alliances') 
                      ? 'text-green-500' 
                      : 'text-gray-300'
                  }`} />
                  <div>
                    <div className="font-medium">Building Strategic Alliances</div>
                    <div className="text-sm text-muted-foreground">
                      Creating powerful networks and mentorship relationships
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
          
          {!isModuleCompleted && (
            <Button onClick={handleCompleteModule} className="w-full mt-6" size="lg">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Module
            </Button>
          )}
          
          {isModuleCompleted && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-700 font-medium">Module Completed!</p>
              <p className="text-green-600 text-sm">Great job on mastering gender dynamics in the workplace.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkingWomenModule4;