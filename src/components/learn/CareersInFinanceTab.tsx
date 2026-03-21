
import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { financeCareerData, FinanceCareerData } from '@/data/finance-careers';
import FinanceCareerJourney from './FinanceCareerJourney';
import PrivateEquityJourney from './PrivateEquityJourney';
import IBDivisionsHub from "./IBDivisionsHub";
import VCJourney from './VCJourney';
import { ibDivisions } from "@/data/ib-divisions";
import { useIsMobile } from '@/hooks/use-mobile';
import AssetManagementJourney from './AssetManagementJourney';
import WealthManagementJourney from './WealthManagementJourney';
import CorporateFinanceJourney from './CorporateFinanceJourney';
import HedgeFundJourney from './HedgeFundJourney';
import ManagementConsultingJourney from './ManagementConsultingJourney';
import InvestmentBankingJourney from './InvestmentBankingJourney';
import CareerPreferenceSurvey from './CareerPreferenceSurvey';
import CareerRecommendations from './CareerRecommendations';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { recordPathTouched } from '@/hooks/useDashboardProgress';

const CareersInFinanceTab = () => {
    const [selectedCareer, setSelectedCareer] = useState<FinanceCareerData | null>(null);
    const [showIBDivisions, setShowIBDivisions] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [surveyResults, setSurveyResults] = useState<{ careerId: string; score: number }[] | null>(null);
    const isMobile = useIsMobile();

    // Track that user visited this tab for dashboard goal prioritization
    useEffect(() => {
      recordPathTouched('careersFinance');
    }, []);

    const handleSurveyComplete = (results: { careerId: string; score: number }[]) => {
      setSurveyResults(results);
      setShowSurvey(false);
    };

    const handleBackToCategories = () => {
      setSurveyResults(null);
      setShowSurvey(false);
    };

    // Show survey
    if (showSurvey) {
      return (
        <div className="space-y-6">
          <CareerPreferenceSurvey 
            onComplete={handleSurveyComplete}
            onSkip={() => setShowSurvey(false)}
          />
        </div>
      );
    }

    // Show survey results (but still show all careers below)
    const showRecommendations = surveyResults !== null;

    // Show IB Divisions Hub
    if (showIBDivisions) {
      return <IBDivisionsHub divisions={ibDivisions} onBack={() => setShowIBDivisions(false)} />;
    }

    if (selectedCareer) {
      // Interactive lessons for specific careers
      if (selectedCareer.id === 'management-consulting') {
        return <ManagementConsultingJourney onBack={() => setSelectedCareer(null)} />;
      }
      
      if (selectedCareer.id === 'venture-capital') {
        return <VCJourney onBack={() => setSelectedCareer(null)} />;
      }

      if (selectedCareer.id === 'asset-management') {
        return <AssetManagementJourney onBack={() => setSelectedCareer(null)} />;
      }

      if (selectedCareer.name === 'Wealth Management') {
        return <WealthManagementJourney onBack={() => setSelectedCareer(null)} />;
      }

      if (selectedCareer.id === 'corporate-finance') {
        return <CorporateFinanceJourney onBack={() => setSelectedCareer(null)} />;
      }

      if (selectedCareer.id === 'hedge-funds') {
        return <HedgeFundJourney onBack={() => setSelectedCareer(null)} />;
      }
      
      // Investment Banking - show divisions selection
      if (selectedCareer.id === 'investment-banking') {
        return (
          <InvestmentBankingJourney 
            onBack={() => setSelectedCareer(null)} 
            onOpenDivisions={() => setShowIBDivisions(true)} 
          />
        );
      }
      
      // Use new journey for Private Equity  
      if (selectedCareer.id === 'private-equity') {
        return <PrivateEquityJourney onBack={() => setSelectedCareer(null)} />;
      } else {
        return <FinanceCareerJourney career={selectedCareer} onBack={() => setSelectedCareer(null)} />;
      }
    }

    // Categorize careers
    const sellSideCareers = financeCareerData.filter(c => c.category === 'sell-side');
    const buySideCareers = financeCareerData.filter(c => c.category === 'buy-side');
    const advisoryCareers = financeCareerData.filter(c => c.category === 'advisory');
    const corporateCareers = financeCareerData.filter(c => c.category === 'corporate');

    const renderCareerCard = (career: FinanceCareerData) => (
      <Card 
          key={career.id} 
          className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full relative"
          onClick={() => setSelectedCareer(career)}
      >
          {(['investment-banking', 'management-consulting', 'private-equity', 'venture-capital', 'asset-management', 'corporate-finance', 'hedge-funds'].includes(career.id) || career.name === 'Wealth Management') && (
              <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      ✨ Interactive
                  </Badge>
              </div>
          )}
          <div className={`${isMobile ? 'p-4' : 'p-6'} flex-grow`}>
              <div className="flex items-center justify-center mb-4">
                  <div className={`${isMobile ? 'p-3' : 'p-4'} rounded-full bg-muted transition-transform group-hover:scale-110`}>
                      <career.icon className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'} text-primary`} />
                  </div>
              </div>
              <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} mb-2 text-center`}>
                  {career.name}
              </CardTitle>
              <Badge variant="outline" className="mx-auto block w-fit mb-4">
                   {career.id === 'investment-banking' ? 'IB Divisions Available' : 
                   (['management-consulting', 'private-equity', 'venture-capital', 'asset-management', 'corporate-finance', 'hedge-funds'].includes(career.id) || career.name === 'Wealth Management') ? 'Interactive Journey' : '7-Level Journey'}
              </Badge>
              
              <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed text-center mb-2`}>
                  {career.kidFriendlyDescription}
              </CardDescription>
              
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground text-center`}>
                  {career.description}
              </p>
              
              {career.id === 'investment-banking' && (
                  <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700 font-medium">
                          🏦 Access 6 specialized IB divisions: M&A, DCM, ECM, Leveraged Finance, Sales & Trading, and Restructuring!
                      </p>
                  </div>
              )}
              
              {(['management-consulting', 'private-equity', 'venture-capital', 'asset-management', 'corporate-finance', 'hedge-funds'].includes(career.id) || career.name === 'Wealth Management') && (
                  <div className="mt-3 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-orange-200">
                      <p className="text-xs text-orange-700 font-medium">
                          🎮 Now with interactive games, quizzes, and real-world examples!
                      </p>
                  </div>
              )}
          </div>
      </Card>
    );

    return (
        <div>
            {/* Show recommendations if quiz was completed */}
            {showRecommendations && (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground`}>
                    Your Personalized Matches ✨
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToCategories}
                  >
                    Clear Results
                  </Button>
                </div>
                <CareerRecommendations 
                  recommendations={surveyResults!}
                  careers={financeCareerData}
                  onSelectCareer={setSelectedCareer}
                />
                <div className="mt-8 pt-8 border-t">
                  <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground text-center mb-4`}>
                    Explore All Careers Below 👇
                  </h3>
                </div>
              </div>
            )}

            {/* Main header - only show if not showing recommendations */}
            {!showRecommendations && (
              <div className="text-center mb-8 md:mb-12">
                  <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight text-foreground`}>
                      Careers in Finance 💼
                  </h2>
                  <p className={`mt-3 max-w-2xl mx-auto ${isMobile ? 'text-base px-4' : 'text-lg'} text-muted-foreground`}>
                      Discover your perfect finance career! Learn about different paths and find which one fits you best.
                  </p>
                  <Button
                    onClick={() => setShowSurvey(true)}
                    className="mt-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    size={isMobile ? "default" : "lg"}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Take Career Quiz
                  </Button>
              </div>
            )}

            {/* Sell-Side Careers */}
            <div className="mb-12">
              <div className="mb-6">
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground mb-2`}>
                  💼 Sell-Side Careers
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>
                  These firms help companies raise money, sell products, and provide financial services to businesses.
                </p>
              </div>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} gap-4 md:gap-6`}>
                {sellSideCareers.map(renderCareerCard)}
              </div>
            </div>

            {/* Buy-Side Careers */}
            <div className="mb-12">
              <div className="mb-6">
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground mb-2`}>
                  📈 Buy-Side Careers
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>
                  These firms invest money to make it grow - either for their clients or for themselves!
                </p>
              </div>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} gap-4 md:gap-6`}>
                {buySideCareers.map(renderCareerCard)}
              </div>
            </div>

            {/* Advisory Careers */}
            {advisoryCareers.length > 0 && (
              <div className="mb-12">
                <div className="mb-6">
                  <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground mb-2`}>
                    🤝 Advisory Careers
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>
                    These professionals advise companies on how to solve problems and make better decisions.
                  </p>
                </div>
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} gap-4 md:gap-6`}>
                  {advisoryCareers.map(renderCareerCard)}
                </div>
              </div>
            )}

            {/* Corporate Careers */}
            {corporateCareers.length > 0 && (
              <div className="mb-12">
                <div className="mb-6">
                  <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground mb-2`}>
                    🏢 Corporate Finance Careers
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground`}>
                    Work inside a company managing their money and making financial decisions!
                  </p>
                </div>
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'} gap-4 md:gap-6`}>
                  {corporateCareers.map(renderCareerCard)}
                </div>
              </div>
            )}
        </div>
    );
};

export default CareersInFinanceTab;
