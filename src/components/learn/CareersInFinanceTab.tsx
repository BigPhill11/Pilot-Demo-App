/**
 * Careers in Finance Tab
 *
 * Jungle pathway navigation:
 * 1. CareerJungleMap (landing) -> 4 jungle categories
 * 2. JungleCategoryView -> careers within a category
 * 3. PlaceholderCareerJourney -> module placeholders per career
 */

import React, { useState, useEffect } from 'react';
import { FinanceCareerData, financeCareerData } from '@/data/finance-careers';
import { JungleCategory } from '@/data/career-jungle-categories';
import CareerJungleMap from './careers/CareerJungleMap';
import JungleCategoryView from './careers/JungleCategoryView';
import PlaceholderCareerJourney from './careers/PlaceholderCareerJourney';
import CareerPreferenceSurvey from './CareerPreferenceSurvey';
import CareerRecommendations from './CareerRecommendations';
import { recordPathTouched } from '@/hooks/useDashboardProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type ViewState = 'map' | 'jungle' | 'career' | 'survey' | 'recommendations';

const CareersInFinanceTab = () => {
  const [viewState, setViewState] = useState<ViewState>('map');
  const [selectedJungle, setSelectedJungle] = useState<JungleCategory | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<FinanceCareerData | null>(null);
  const [surveyResults, setSurveyResults] = useState<{ careerId: string; score: number }[] | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    recordPathTouched('careersFinance');
  }, []);

  const handleSelectJungle = (jungle: JungleCategory) => {
    setSelectedJungle(jungle);
    setViewState('jungle');
  };

  const handleSelectCareer = (career: FinanceCareerData) => {
    setSelectedCareer(career);
    setViewState('career');
  };

  const handleBackToMap = () => {
    setSelectedJungle(null);
    setSelectedCareer(null);
    setViewState('map');
  };

  const handleBackToJungle = () => {
    setSelectedCareer(null);
    setViewState('jungle');
  };

  const handleTakeQuiz = () => {
    setViewState('survey');
  };

  const handleSurveyComplete = (results: { careerId: string; score: number }[]) => {
    setSurveyResults(results);
    setViewState('recommendations');
  };

  const handleClearResults = () => {
    setSurveyResults(null);
    setViewState('map');
  };

  if (viewState === 'survey') {
    return (
      <div className="space-y-6">
        <CareerPreferenceSurvey
          onComplete={handleSurveyComplete}
          onSkip={handleBackToMap}
        />
      </div>
    );
  }

  if (viewState === 'recommendations' && surveyResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Button
          variant="ghost"
          onClick={handleClearResults}
          className="text-green-700 hover:text-green-800 hover:bg-green-100 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jungle Map
        </Button>

        <div className="text-center mb-6">
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-800`}>
            Your Personalized Career Matches
          </h2>
          <p className="text-green-600/80 mt-2">
            Based on your quiz answers, here are the careers that might be a great fit!
          </p>
        </div>

        <CareerRecommendations
          recommendations={surveyResults}
          careers={financeCareerData}
          onSelectCareer={handleSelectCareer}
        />

        <Button
          variant="outline"
          onClick={handleBackToMap}
          className="w-full mt-4 border-green-300 text-green-700 hover:bg-green-50"
        >
          Explore All Careers in Jungle Map
        </Button>
      </div>
    );
  }

  if (viewState === 'career' && selectedCareer) {
    const onBack = selectedJungle ? handleBackToJungle : handleBackToMap;
    return (
      <PlaceholderCareerJourney careerId={selectedCareer.id} onBack={onBack} />
    );
  }

  if (viewState === 'jungle' && selectedJungle) {
    return (
      <JungleCategoryView
        jungle={selectedJungle}
        onBack={handleBackToMap}
        onSelectCareer={handleSelectCareer}
      />
    );
  }

  return (
    <CareerJungleMap
      onSelectJungle={handleSelectJungle}
      onTakeQuiz={handleTakeQuiz}
    />
  );
};

export default CareersInFinanceTab;
