import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, CheckCircle } from 'lucide-react';
import { ConsultingLessonContent } from '@/data/management-consulting-lessons';
import PandaLogo from '@/components/icons/PandaLogo';
import HighlightableTerm from '@/components/HighlightableTerm';
import { useConsultingProgressAdapter } from '@/hooks/useProgressAdapter';

interface OverviewTabProps {
  lesson: ConsultingLessonContent;
  consultingTerms: any;
  onActivityComplete: () => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  lesson, 
  consultingTerms, 
  onActivityComplete 
}) => {
  const { markOverviewComplete, getLevelProgress } = useConsultingProgressAdapter();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const levelProgress = getLevelProgress(lesson.level);
  const alreadyCompleted = levelProgress.overviewCompleted;

  const handleCompleteOverview = () => {
    markOverviewComplete(lesson.level);
    setIsCompleted(true);
    onActivityComplete();
  };

  const renderTextWithTermHighlights = (text: string) => {
    let processedText = text;
    const termsToHighlight = lesson.keyTerms || [];
    
    termsToHighlight.forEach(termKey => {
      const termData = consultingTerms[termKey];
      if (termData) {
        const regex = new RegExp(`\\b${termData.term}\\b`, 'gi');
        processedText = processedText.replace(regex, `__TERM__${termKey}__TERM__`);
      }
    });

    const parts = processedText.split(/(__TERM__.*?__TERM__)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('__TERM__') && part.endsWith('__TERM__')) {
        const termKey = part.replace(/__TERM__/g, '');
        const termData = consultingTerms[termKey];
        if (termData) {
          return (
            <HighlightableTerm
              key={index}
              term={termData.term}
              definition={termData.definition}
              analogy={termData.analogy}
            >
              <span className="font-medium text-primary cursor-help border-b border-dotted border-primary">
                {termData.term}
              </span>
            </HighlightableTerm>
          );
        }
      }
      return part;
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <PandaLogo className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl text-blue-900">
            {lesson.title}
          </CardTitle>
          <p className="text-blue-700 text-lg">
            {renderTextWithTermHighlights(lesson.description)}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Level {lesson.level}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {lesson.theme}
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {lesson.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  {renderTextWithTermHighlights(objective)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Questions We'll Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {lesson.keyQuestions.map((question, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-gray-900">
                  {renderTextWithTermHighlights(question)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-r border-2 ${
        alreadyCompleted || isCompleted 
          ? 'from-green-50 to-emerald-50 border-green-200' 
          : 'from-blue-50 to-purple-50 border-blue-200'
      }`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                alreadyCompleted || isCompleted 
                  ? 'bg-green-100' 
                  : 'bg-blue-100'
              }`}>
                {alreadyCompleted || isCompleted ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <PandaLogo className="h-8 w-8 text-blue-600" />
                )}
              </div>
            </div>
            {alreadyCompleted || isCompleted ? (
              <>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Overview Complete!
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  You've successfully reviewed the lesson overview. You can now proceed to master the key terms and play mini-games!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Ready to Begin Your Consulting Journey?
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  This lesson combines interactive learning with real-world applications. 
                  You'll practice with the same frameworks and approaches used by top consulting firms!
                </p>
                <Button 
                  onClick={handleCompleteOverview}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Mark Overview as Complete
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;