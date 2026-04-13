/**
 * Wealth Management Module Level
 * 
 * Module-aware component that renders different content based on module type:
 * - Module 1: Overview -> Comic -> Flashcards -> Quiz
 * - Modules 2-6: Year Sim -> Flashcards -> Quiz
 * - Module 7: Flashcards -> Final Scenarios -> Endings
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  Gamepad2, 
  HelpCircle, 
  CheckCircle2, 
  Play,
  ChevronRight,
  Calendar,
  Target
} from 'lucide-react';
import { WealthLevel } from '@/data/wealth-management-journey-data';
import WealthManagementFlashcard from '../WealthManagementFlashcard';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import WealthManagementOverview from './WealthManagementOverview';
import WealthManagementComic from './WealthManagementComic';
import WealthManagementCareerSim from './WealthManagementCareerSim';
import WealthManagementScenarios from './WealthManagementScenarios';
import WealthManagementCompletion from './WealthManagementCompletion';
import WMSimMeters from './WMSimMeters';
import { useWealthManagementSim } from '@/hooks/useWealthManagementSim';

interface WealthManagementModuleLevelProps {
  level: WealthLevel;
  moduleIndex: number;
  onComplete: () => void;
  onBack: () => void;
  onQuizComplete: (isCorrect: boolean) => void;
  isCompleted: boolean;
}

type ModulePhase = 
  | 'overview' 
  | 'comic' 
  | 'year-sim' 
  | 'flashcards' 
  | 'quiz' 
  | 'scenarios' 
  | 'completion'
  | 'module-complete';

const WealthManagementModuleLevel: React.FC<WealthManagementModuleLevelProps> = ({
  level,
  moduleIndex,
  onComplete,
  onBack,
  onQuizComplete,
  isCompleted
}) => {
  const {
    meters,
    currentYear,
    setPhase: setSimPhase,
    advanceYear,
    startYearForModule,
    completeYearForModule,
  } = useWealthManagementSim();

  const getInitialPhase = (): ModulePhase => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementModuleLevel.tsx:getInitialPhase',message:'Determining initial phase',data:{moduleIndex:moduleIndex,levelId:level.id,hasOverview:level.hasOverview,simulationYear:level.simulationYear,hasFinalScenarios:level.hasFinalScenarios},hypothesisId:'H1,H2',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (level.hasOverview) return 'overview';
    if (level.simulationYear) return 'year-sim';
    if (level.hasFinalScenarios) return 'flashcards';
    return 'flashcards';
  };

  const [currentPhase, setCurrentPhase] = useState<ModulePhase>(() => {
    const initialPhase = getInitialPhase();
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementModuleLevel.tsx:useState',message:'Setting initial phase',data:{initialPhase:initialPhase,simulationYear:level.simulationYear,currentSimYear:currentYear},hypothesisId:'H2,H4',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // If starting a year simulation, initialize the year
    if (initialPhase === 'year-sim' && level.simulationYear) {
      // #region agent log
      fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementModuleLevel.tsx:startYearForModule',message:'Calling startYearForModule',data:{simulationYear:level.simulationYear},hypothesisId:'H2',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      startYearForModule(level.simulationYear);
    }
    return initialPhase;
  });
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [yearSimCompleted, setYearSimCompleted] = useState(false);

  const handleOverviewStart = () => {
    setCurrentPhase('comic');
  };

  const handleComicComplete = () => {
    setCurrentPhase('flashcards');
  };

  const handleYearSimComplete = () => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementModuleLevel.tsx:handleYearSimComplete',message:'Year sim complete, transitioning to flashcards',data:{moduleIndex:moduleIndex,moduleId:moduleIndex+1,simulationYear:level.simulationYear},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    setYearSimCompleted(true);
    // Mark year as completed for this module
    if (level.simulationYear) {
      completeYearForModule(moduleIndex + 1);
    }
    setCurrentPhase('flashcards');
  };

  const handleFlashcardsComplete = () => {
    setFlashcardsCompleted(true);
    setCurrentPhase('quiz');
  };

  const handleQuizComplete = (isCorrect: boolean) => {
    onQuizComplete(isCorrect);
    setQuizCompleted(true);
    
    if (level.hasFinalScenarios) {
      setCurrentPhase('scenarios');
    } else {
      setCurrentPhase('module-complete');
    }
  };

  const handleScenariosComplete = () => {
    setCurrentPhase('completion');
  };

  const handleModuleComplete = () => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementModuleLevel.tsx:handleModuleComplete',message:'Module complete, calling onComplete',data:{moduleIndex:moduleIndex,moduleId:moduleIndex+1},hypothesisId:'H5',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    onComplete();
  };

  const handleReplay = () => {
    setCurrentPhase(getInitialPhase());
    setFlashcardsCompleted(false);
    setQuizCompleted(false);
    setYearSimCompleted(false);
    setCurrentFlashcardIndex(0);
  };

  const getModuleTypeLabel = () => {
    if (level.hasOverview) return 'Introduction';
    if (level.simulationYear) return `Year ${level.simulationYear} Simulation`;
    if (level.hasFinalScenarios) return 'Final Challenge';
    return 'Module';
  };

  const renderPhaseContent = () => {
    switch (currentPhase) {
      case 'overview':
        return (
          <WealthManagementOverview
            onStart={handleOverviewStart}
            hasExistingProgress={false}
          />
        );

      case 'comic':
        return (
          <WealthManagementComic
            onComplete={handleComicComplete}
            onBack={() => setCurrentPhase('overview')}
          />
        );

      case 'year-sim':
        return (
          <div className="space-y-6">
            <WealthManagementCareerSim
              onComplete={handleYearSimComplete}
              onBack={onBack}
            />
          </div>
        );

      case 'flashcards':
        return renderFlashcardsPhase();

      case 'quiz':
        return renderQuizPhase();

      case 'scenarios':
        return (
          <WealthManagementScenarios
            onComplete={handleScenariosComplete}
          />
        );

      case 'completion':
        return (
          <WealthManagementCompletion
            onReplay={handleReplay}
            onExit={onBack}
          />
        );

      case 'module-complete':
        return renderModuleCompletePhase();

      default:
        return renderFlashcardsPhase();
    }
  };

  const renderFlashcardsPhase = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
            <BookOpen className="h-3 w-3 mr-1" />
            Flashcards - {level.title}
          </Badge>
          
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Learn Key Concepts
          </h2>
          
          <p className="text-green-600/80 text-sm">
            Master these terms before moving to the quiz
          </p>
        </div>

        {/* Current Meters Display (if simulation is active) */}
        {(level.simulationYear || level.hasFinalScenarios) && (
          <Card className="border-green-200 bg-white/80 mb-6">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-3">Your Career Stats</h3>
              <WMSimMeters meters={meters} compact />
            </CardContent>
          </Card>
        )}

        {/* Flashcard Display */}
        <Card className="border-green-200 bg-white mb-6">
          <CardContent className="p-6">
            {level.flashcards.length > 0 && (
              <WealthManagementFlashcard
                flashcard={level.flashcards[currentFlashcardIndex]}
                currentIndex={currentFlashcardIndex}
                totalCards={level.flashcards.length}
                onNext={() => {
                  if (currentFlashcardIndex < level.flashcards.length - 1) {
                    setCurrentFlashcardIndex(prev => prev + 1);
                  }
                }}
                onPrevious={() => {
                  if (currentFlashcardIndex > 0) {
                    setCurrentFlashcardIndex(prev => prev - 1);
                  }
                }}
                onMastered={() => {
                  if (currentFlashcardIndex < level.flashcards.length - 1) {
                    setCurrentFlashcardIndex(prev => prev + 1);
                  }
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Progress and Navigation */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600/70">
            Card {currentFlashcardIndex + 1} of {level.flashcards.length}
          </span>
          
          {currentFlashcardIndex === level.flashcards.length - 1 && (
            <Button
              onClick={handleFlashcardsComplete}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Continue to Quiz
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderQuizPhase = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-200">
            <HelpCircle className="h-3 w-3 mr-1" />
            Quiz - {level.title}
          </Badge>
          
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Test Your Knowledge
          </h2>
        </div>

        <Card className="border-green-200 bg-white">
          <CardContent className="p-6">
            <InteractiveQuiz
              questions={level.quiz.questions.map((q, idx) => ({
                id: `${level.id}-q${idx}`,
                question: q.question,
                options: q.options,
                correctIndex: q.correctAnswerIndex,
                explanation: q.explanation,
              }))}
              onComplete={(score) => {
                const passed = score >= level.quiz.questions.length * 0.6;
                handleQuizComplete(passed);
              }}
              showExplanations={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderModuleCompletePhase = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Module Complete!
        </h2>
        
        <p className="text-green-600/80 mb-6">
          You've completed "{level.title}". 
          {level.simulationYear && ` Year ${level.simulationYear} of your career simulation is done.`}
        </p>

        {/* Show meters if simulation is active */}
        {level.simulationYear && (
          <Card className="border-green-200 bg-white/80 mb-6 text-left">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-3">Career Progress</h3>
              <WMSimMeters meters={meters} compact />
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleModuleComplete}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            Continue to Next Module
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            className="border-green-300 text-green-700"
          >
            Back to Module List
          </Button>
        </div>
      </div>
    </div>
  );

  // For overview and comic phases, render full-screen without wrapper
  if (currentPhase === 'overview' || currentPhase === 'comic' || 
      currentPhase === 'scenarios' || currentPhase === 'completion') {
    return renderPhaseContent();
  }

  // For year-sim, render with minimal wrapper
  if (currentPhase === 'year-sim') {
    return (
      <div className="relative">
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-green-700 hover:text-green-800 hover:bg-green-100"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Exit Module
          </Button>
        </div>
        {renderPhaseContent()}
      </div>
    );
  }

  // For flashcards, quiz, and module-complete, render with phase content
  return renderPhaseContent();
};

export default WealthManagementModuleLevel;
