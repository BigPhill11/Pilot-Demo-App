import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import PandaLogo from '@/components/icons/PandaLogo';
import { useAuth } from '@/hooks/useAuth';

interface OverviewTabProps {
  lesson: InteractiveLessonContent;
  ibTerms: any;
  renderTermWithTooltip: (term: string) => JSX.Element;
  onTermMastered: (term: string) => void;
  masteredTerms: string[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  lesson, 
  ibTerms, 
  renderTermWithTooltip, 
  onTermMastered, 
  masteredTerms 
}) => {
  const { profile } = useAuth();
  const userLevel = profile?.app_version || 'beginner';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Learning Objectives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {lesson.objectives.map((objective, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <PandaLogo className="h-12 w-12" />
            <div>
              <h3 className="font-semibold text-green-800">Phil's Learning Tip</h3>
              <p className="text-green-700">
                {userLevel === 'beginner' && 
                  "Take your time with each section! Investment banking has lots of new terms, but I'll help you understand them with simple examples."
                }
                {userLevel === 'intermediate' && 
                  "You're building on solid foundations! Focus on connecting the concepts you're learning to real business situations."
                }
                {userLevel === 'advanced' && 
                  "Great job reaching this level! Now we're diving into the sophisticated strategies that senior bankers use every day."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;