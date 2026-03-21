import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BarChart3 } from 'lucide-react';
import { IBDivision } from '@/data/ib-divisions';
import InteractiveIBLesson from './interactive-ib/InteractiveIBLesson';
import { useIsMobile } from '@/hooks/use-mobile';

interface IBDivisionsHubProps {
  divisions: IBDivision[];
  onBack: () => void;
}

const IBDivisionsHub: React.FC<IBDivisionsHubProps> = ({ divisions, onBack }) => {
  const [selectedDivision, setSelectedDivision] = useState<IBDivision | null>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const isMobile = useIsMobile();

  if (selectedDivision) {
    return (
      <InteractiveIBLesson
        lesson={selectedDivision.lessons[selectedLessonIndex]}
        onBack={() => setSelectedDivision(null)}
        onComplete={() => {
          // Move to next lesson or back to division selection
          if (selectedLessonIndex < selectedDivision.lessons.length - 1) {
            setSelectedLessonIndex(selectedLessonIndex + 1);
          } else {
            setSelectedDivision(null);
            setSelectedLessonIndex(0);
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Investment Banking
        </Button>
      </div>

      <div className="text-center mb-8">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight text-foreground mb-3`}>
          Investment Banking Divisions
        </h2>
        <p className={`${isMobile ? 'text-base px-4' : 'text-lg'} text-muted-foreground max-w-3xl mx-auto`}>
          Dive deep into specialized investment banking divisions. Each division offers 3 progressive levels 
          with real-world case studies, interactive games, and practical activities.
        </p>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
        {divisions.map((division) => (
          <Card 
            key={division.id}
            className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full"
            onClick={() => setSelectedDivision(division)}
          >
            <CardHeader className={`${isMobile ? 'p-4' : 'p-6'} flex-grow`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{division.icon}</div>
                <Badge variant={division.difficulty === 'advanced' ? 'destructive' : 'secondary'}>
                  {division.difficulty}
                </Badge>
              </div>
              
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} mb-2 group-hover:text-primary transition-colors`}>
                {division.name}
              </CardTitle>
              
              <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed mb-4`}>
                {division.description}
              </CardDescription>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{division.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>{division.lessons.length} Levels</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className={`${isMobile ? 'p-4' : 'p-6'} pt-0`}>
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">Course Structure:</div>
                <div className="grid grid-cols-3 gap-2">
                  {division.lessons.map((lesson, index) => (
                    <div 
                      key={index}
                      className="bg-muted rounded-md p-2 text-center"
                    >
                      <div className="text-xs font-medium">Level {lesson.level}</div>
                      <div className="text-xs text-muted-foreground truncate">{lesson.theme}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">📚 Prerequisites</h3>
          <p className="text-sm text-muted-foreground">
            Complete the main Investment Banking course before accessing these specialized divisions. 
            Each division builds on fundamental IB concepts and assumes familiarity with basic terminology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IBDivisionsHub;