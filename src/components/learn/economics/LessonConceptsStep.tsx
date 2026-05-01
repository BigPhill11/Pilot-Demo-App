/**
 * LessonConceptsStep
 * 
 * Displays core economic concepts with explanations and real-world examples.
 * Users navigate through concepts one at a time with a progress indicator.
 * Includes interactive term highlights that bridge to personal finance.
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Lightbulb,
  CheckCircle2,
  Wallet,
  Briefcase
} from 'lucide-react';
import TermHighlight, { ECONOMICS_TERMS } from './TermHighlight';

interface CoreConcept {
  title: string;
  explanation: string;
  example: string;
  keyTerms?: string[];
  pfTip?: string;
  careerTip?: string;
}

interface LessonConceptsStepProps {
  lessonTitle: string;
  concepts: CoreConcept[];
  /** Optional diagram (e.g. /economics/*.svg) shown once above concepts */
  illustrationSrc?: string;
  onContinue: () => void;
  onBack: () => void;
}

const renderTextWithTerms = (text: string, keyTerms?: string[]): React.ReactNode => {
  if (!keyTerms || keyTerms.length === 0) return text;
  
  let result: React.ReactNode[] = [];
  let remainingText = text;
  let keyIndex = 0;
  
  for (const termKey of keyTerms) {
    const termDef = ECONOMICS_TERMS[termKey];
    if (!termDef) continue;
    
    const termRegex = new RegExp(`\\b(${termDef.term})\\b`, 'gi');
    const match = termRegex.exec(remainingText);
    
    if (match) {
      const beforeMatch = remainingText.slice(0, match.index);
      const matchedTerm = match[1];
      const afterMatch = remainingText.slice(match.index + matchedTerm.length);
      
      if (beforeMatch) {
        result.push(<span key={`before-${keyIndex}`}>{beforeMatch}</span>);
      }
      
      result.push(
        <TermHighlight
          key={`term-${keyIndex}`}
          term={termDef.term}
          definition={termDef.definition}
          personalFinanceLink={termDef.personalFinanceLink}
          careerLink={termDef.careerLink}
        >
          {matchedTerm}
        </TermHighlight>
      );
      
      remainingText = afterMatch;
      keyIndex++;
    }
  }
  
  if (remainingText) {
    result.push(<span key="remaining">{remainingText}</span>);
  }
  
  return result.length > 0 ? result : text;
};

const LessonConceptsStep: React.FC<LessonConceptsStepProps> = ({
  lessonTitle,
  concepts,
  illustrationSrc,
  onContinue,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedConcepts, setViewedConcepts] = useState<Set<number>>(new Set([0]));

  const currentConcept = concepts[currentIndex];
  const progress = (viewedConcepts.size / concepts.length) * 100;
  const allViewed = viewedConcepts.size === concepts.length;

  const handleNext = () => {
    if (currentIndex < concepts.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setViewedConcepts(prev => new Set([...prev, nextIndex]));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleConceptSelect = (index: number) => {
    setCurrentIndex(index);
    setViewedConcepts(prev => new Set([...prev, index]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              <BookOpen className="h-3 w-3 mr-1" />
              Core Concepts
            </Badge>
            <span className="text-sm text-gray-500">
              {viewedConcepts.size} of {concepts.length} viewed
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-emerald-800 mb-3">
            {lessonTitle}
          </h2>

          {illustrationSrc ? (
            <div className="mb-4 rounded-xl overflow-hidden border border-emerald-200 bg-white shadow-sm">
              <img
                src={illustrationSrc}
                alt=""
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          ) : null}
          
          <Progress value={progress} className="h-2 bg-emerald-100" />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {concepts.map((concept, index) => (
            <Button
              key={index}
              variant={currentIndex === index ? "default" : "outline"}
              size="sm"
              onClick={() => handleConceptSelect(index)}
              className={`flex-shrink-0 ${
                currentIndex === index 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : viewedConcepts.has(index)
                  ? 'border-emerald-300 text-emerald-700 bg-emerald-50'
                  : ''
              }`}
            >
              {viewedConcepts.has(index) && currentIndex !== index && (
                <CheckCircle2 className="h-3 w-3 mr-1" />
              )}
              {index + 1}
            </Button>
          ))}
        </div>

        <Card className="border-emerald-200 bg-white mb-6">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                  {currentIndex + 1}
                </div>
                {currentConcept.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {renderTextWithTerms(currentConcept.explanation, currentConcept.keyTerms)}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2 text-amber-700">
                <Lightbulb className="h-5 w-5" />
                <span className="font-semibold">Real-World Example</span>
              </div>
              <p className="text-amber-900/80 leading-relaxed">
                {currentConcept.example}
              </p>
            </div>

            {currentConcept.pfTip && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2 text-purple-700">
                  <Wallet className="h-5 w-5" />
                  <span className="font-semibold">Personal Finance Tip</span>
                </div>
                <p className="text-purple-900/80 leading-relaxed text-sm">
                  {currentConcept.pfTip}
                </p>
              </div>
            )}

            {currentConcept.careerTip && (
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2 text-cyan-700">
                  <Briefcase className="h-5 w-5" />
                  <span className="font-semibold">Career Connection</span>
                </div>
                <p className="text-cyan-900/80 leading-relaxed text-sm">
                  {currentConcept.careerTip}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={currentIndex === 0 ? onBack : handlePrevious}
            className="border-emerald-300 text-emerald-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {currentIndex === 0 ? 'Back' : 'Previous'}
          </Button>

          {currentIndex < concepts.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Next Concept
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={onContinue}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!allViewed}
            >
              {allViewed ? 'Continue' : 'View All Concepts First'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonConceptsStep;
