/**
 * Careers in Finance Tab
 * 
 * Redesigned with jungle pathway navigation:
 * 1. CareerJungleMap (landing) -> 4 jungle categories
 * 2. JungleCategoryView -> careers within a category
 * 3. [Career]Journey -> individual career lessons
 * 
 * Uses Phil's Financials sage/emerald color palette.
 */

import React, { useState, useEffect } from 'react';
import { FinanceCareerData, financeCareerData } from '@/data/finance-careers';
import { JungleCategory } from '@/data/career-jungle-categories';
import CareerJungleMap from './careers/CareerJungleMap';
import JungleCategoryView from './careers/JungleCategoryView';
import FinanceCareerJourney from './FinanceCareerJourney';
import PrivateEquityJourney from './PrivateEquityJourney';
import IBDivisionsHub from "./IBDivisionsHub";
import VCJourney from './VCJourney';
import { ibDivisions } from "@/data/ib-divisions";
import AssetManagementJourney from './AssetManagementJourney';
import WealthManagementJourneyNew from './wealth-management/WealthManagementJourneyNew';
import CorporateFinanceJourney from './CorporateFinanceJourney';
import HedgeFundJourney from './HedgeFundJourney';
import ManagementConsultingJourney from './ManagementConsultingJourney';
import InvestmentBankingJourney from './InvestmentBankingJourney';
import CareerPreferenceSurvey from './CareerPreferenceSurvey';
import CareerRecommendations from './CareerRecommendations';
import { recordPathTouched } from '@/hooks/useDashboardProgress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type ViewState = 'map' | 'jungle' | 'career' | 'survey' | 'recommendations' | 'ib-divisions';

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

  // Survey view
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

  // Recommendations view
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

  // IB Divisions Hub
  if (viewState === 'ib-divisions') {
    return (
      <IBDivisionsHub 
        divisions={ibDivisions} 
        onBack={() => {
          setViewState('career');
        }} 
      />
    );
  }

  // Career Journey views
  if (viewState === 'career' && selectedCareer) {
    const onBack = selectedJungle ? handleBackToJungle : handleBackToMap;

    if (selectedCareer.id === 'management-consulting') {
      return <ManagementConsultingJourney onBack={onBack} />;
    }
    
    if (selectedCareer.id === 'venture-capital') {
      return <VCJourney onBack={onBack} />;
    }

    if (selectedCareer.id === 'asset-management') {
      return <AssetManagementJourney onBack={onBack} />;
    }

    if (selectedCareer.name === 'Wealth Management' || selectedCareer.id === 'wealth-management') {
      return <WealthManagementJourneyNew onBack={onBack} />;
    }

    if (selectedCareer.id === 'corporate-finance') {
      return <CorporateFinanceJourney onBack={onBack} />;
    }

    if (selectedCareer.id === 'hedge-funds') {
      return <HedgeFundJourney onBack={onBack} />;
    }
    
    if (selectedCareer.id === 'investment-banking') {
      return (
        <InvestmentBankingJourney 
          onBack={onBack} 
          onOpenDivisions={() => setViewState('ib-divisions')} 
        />
      );
    }
    
    if (selectedCareer.id === 'private-equity') {
      return <PrivateEquityJourney onBack={onBack} />;
    }

    return <FinanceCareerJourney career={selectedCareer} onBack={onBack} />;
  }

  // Jungle category view
  if (viewState === 'jungle' && selectedJungle) {
    return (
      <JungleCategoryView
        jungle={selectedJungle}
        onBack={handleBackToMap}
        onSelectCareer={handleSelectCareer}
      />
    );
  }

  // Default: Jungle Map landing page
  return (
    <CareerJungleMap
      onSelectJungle={handleSelectJungle}
      onTakeQuiz={handleTakeQuiz}
    />
  );
};

export default CareersInFinanceTab;
