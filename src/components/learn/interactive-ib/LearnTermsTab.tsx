import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, BookOpen } from 'lucide-react';
import { InteractiveLessonContent } from '@/data/investment-banking-lessons';
import KeyTermFlashcard from './KeyTermFlashcard';

interface LearnTermsTabProps {
  lesson: InteractiveLessonContent;
  ibTerms: any;
  onTermMastered: (term: string) => void;
  masteredTerms: string[];
}

const LearnTermsTab: React.FC<LearnTermsTabProps> = ({ 
  lesson, 
  ibTerms, 
  onTermMastered, 
  masteredTerms 
}) => {
  // Get ALL terminology terms as flashcard data
  const allTermsFlashcards = lesson.terminology.map(termKey => {
    const termData = ibTerms[termKey];
    return termData ? {
      key: termKey,
      term: termData.term,
      definition: termData.definition,
      analogy: termData.analogy
    } : null;
  }).filter(Boolean);

  const progressPercentage = allTermsFlashcards.length > 0 
    ? (masteredTerms.length / allTermsFlashcards.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span>Master Key Terms</span>
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <span className="text-primary">{masteredTerms.length}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{allTermsFlashcards.length}</span>
            <span className="text-muted-foreground">mastered</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {progressPercentage.toFixed(0)}% Complete
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <BookOpen className="h-8 w-8 mx-auto mb-3 text-primary" />
            <p className="text-muted-foreground">
              Study these key terms with interactive flashcards! Click on each card to reveal the definition and Phil's helpful examples.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTermsFlashcards.map((termData, index) => (
              <KeyTermFlashcard
                key={termData.key}
                term={termData.term}
                definition={termData.definition}
                analogy={termData.analogy}
                onMastered={() => onTermMastered(termData.key)}
                isMastered={masteredTerms.includes(termData.key)}
              />
            ))}
          </div>
          
          {masteredTerms.length === allTermsFlashcards.length && allTermsFlashcards.length > 0 && (
            <div className="mt-8 text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <Trophy className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Congratulations!</h3>
              <p className="text-green-700">
                You've mastered all the key terms for this level! You're ready to move on to the mini games and real-world examples.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearnTermsTab;