import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Target, TrendingUp } from 'lucide-react';
import SectorSubdivisionSelector from './SectorSubdivisionSelector';
import InvestorProfileBuilder from './InvestorProfileBuilder';
import EnhancedCompanySwipeCard from './EnhancedCompanySwipeCard';
import { InvestorProfile, CompanyMatch, SectorSubdivision } from '@/types/investor-profile';
import { useCompanies } from '@/hooks/useCompanies';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';

type FlowStep = 'sector' | 'profile' | 'swiping' | 'matches';

const InvestorDiscoveryFlow: React.FC = () => {
  const { companies: allCompanies, loading } = useCompanies();
  const [currentStep, setCurrentStep] = useState<FlowStep>('sector');
  const [selectedSubdivision, setSelectedSubdivision] = useState<SectorSubdivision | null>(null);
  const [investorProfile, setInvestorProfile] = useState<Partial<InvestorProfile> | null>(null);
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [swipeActions, setSwipeActions] = useState<CompanyMatch[]>([]);
  const [availableCompanies, setAvailableCompanies] = useState<CompanyProfile[]>([]);

  const handleSectorSelection = (subdivision: SectorSubdivision) => {
    setSelectedSubdivision(subdivision);
    
    // Filter companies based on subdivision - now includes uploaded companies
    const filteredCompanies = allCompanies.filter(company => 
      subdivision.companies.includes(company.ticker) ||
      subdivision.industryKeywords.some(keyword => 
        company.industry.toLowerCase().includes(keyword)
      )
    );
    
    console.log(`Found ${filteredCompanies.length} companies for ${subdivision.name}:`, 
                filteredCompanies.map(c => c.ticker));
    
    setAvailableCompanies(filteredCompanies);
    setCurrentStep('profile');
  };

  const handleProfileComplete = (profile: Partial<InvestorProfile>) => {
    setInvestorProfile(profile);
    setCurrentStep('swiping');
  };

  const calculateMatchScore = (company: CompanyProfile): { score: number; reasons: string[] } => {
    if (!investorProfile?.preferences) return { score: 50, reasons: [] };
    
    const prefs = investorProfile.preferences;
    let score = 0;
    const reasons: string[] = [];
    
    // Mock scoring logic based on preferences
    const peRatio = parseFloat(company.peRatio);
    if (peRatio >= prefs.peRangeMin && peRatio <= prefs.peRangeMax) {
      score += 25;
      reasons.push(`P/E ratio (${company.peRatio}) fits your range`);
    }
    
    // Market cap preference
    const marketCapValue = parseFloat(String(company.marketCap).replace(/[^0-9.]/g, ''));
    if (prefs.marketCapPreference === 'any' || 
        (prefs.marketCapPreference === 'mega' && marketCapValue >= 200) ||
        (prefs.marketCapPreference === 'large' && marketCapValue >= 10 && marketCapValue < 200)) {
      score += 20;
      reasons.push(`Market cap (${company.marketCap}) matches your preference`);
    }
    
    // Industry growth potential
    if (company.industry === 'Technology' && prefs.revenueGrowthTarget > 10) {
      score += 25;
      reasons.push('High-growth tech sector aligns with your targets');
    }
    
    // Add randomness for demo
    score += Math.floor(Math.random() * 30);
    
    return { score: Math.min(score, 95), reasons };
  };

  const handleSwipe = (companyId: string, action: 'like' | 'dislike' | 'super_like') => {
    const company = availableCompanies[currentCompanyIndex];
    const { score, reasons } = calculateMatchScore(company);
    
    const match: CompanyMatch = {
      companyId,
      matchScore: score,
      matchReasons: reasons,
      userAction: action,
      timestamp: new Date()
    };
    
    setSwipeActions(prev => [...prev, match]);
    
    if (currentCompanyIndex < availableCompanies.length - 1) {
      setCurrentCompanyIndex(prev => prev + 1);
    } else {
      setCurrentStep('matches');
    }
  };

  const goBack = () => {
    switch (currentStep) {
      case 'profile':
        setCurrentStep('sector');
        break;
      case 'swiping':
        setCurrentStep('profile');
        break;
      case 'matches':
        setCurrentStep('swiping');
        break;
    }
  };

  const resetFlow = () => {
    setCurrentStep('sector');
    setSelectedSubdivision(null);
    setInvestorProfile(null);
    setCurrentCompanyIndex(0);
    setSwipeActions([]);
    setAvailableCompanies([]);
  };

  const currentCompany = availableCompanies[currentCompanyIndex];
  const matchData = currentCompany ? calculateMatchScore(currentCompany) : { score: 0, reasons: [] };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading investment opportunities...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentStep !== 'sector' && (
            <Button variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>Investor Discovery</span>
            </h1>
            <p className="text-sm text-muted-foreground">Find companies that match your investment style</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Badge variant={currentStep === 'sector' ? 'default' : 'secondary'}>1. Sector</Badge>
          <Badge variant={currentStep === 'profile' ? 'default' : 'secondary'}>2. Profile</Badge>
          <Badge variant={currentStep === 'swiping' ? 'default' : 'secondary'}>3. Discover</Badge>
          <Badge variant={currentStep === 'matches' ? 'default' : 'secondary'}>4. Matches</Badge>
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 'sector' && (
        <SectorSubdivisionSelector onSelection={handleSectorSelection} />
      )}

      {currentStep === 'profile' && selectedSubdivision && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Focus: {selectedSubdivision.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{selectedSubdivision.description}</p>
              <p className="text-sm">
                <strong>{availableCompanies.length} companies</strong> available for discovery in this sector.
              </p>
            </CardContent>
          </Card>
          <InvestorProfileBuilder onProfileComplete={handleProfileComplete} />
        </div>
      )}

      {currentStep === 'swiping' && currentCompany && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Discover Your Next Investment</h2>
            <p className="text-muted-foreground">
              Company {currentCompanyIndex + 1} of {availableCompanies.length} • 
              Sector: {selectedSubdivision?.name}
            </p>
          </div>
          
          <EnhancedCompanySwipeCard
            company={currentCompany}
            matchScore={matchData.score}
            matchReasons={matchData.reasons}
            onSwipe={handleSwipe}
          />
        </div>
      )}

      {currentStep === 'matches' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Your Investment Matches</h2>
            <p className="text-muted-foreground">Based on your preferences and swipe activity</p>
          </div>

          <div className="grid gap-6">
            {swipeActions
              .filter(match => match.userAction === 'like' || match.userAction === 'super_like')
              .sort((a, b) => b.matchScore - a.matchScore)
              .map((match) => {
                const company = availableCompanies.find(c => c.id === match.companyId);
                if (!company) return null;
                
                return (
                  <Card key={match.companyId} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-full bg-muted">
                            <TrendingUp className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{company.name} ({company.ticker})</CardTitle>
                            <p className="text-sm text-muted-foreground">{company.industry}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-1">
                            {match.matchScore}% Match
                          </Badge>
                          {match.userAction === 'super_like' && (
                            <Badge variant="secondary" className="ml-2">Super Like ❤️</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Why This Match Works:</h4>
                          <div className="space-y-1">
                            {match.matchReasons.map((reason, index) => (
                              <div key={index} className="flex items-center text-sm text-green-700">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                                {reason}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Market Cap</p>
                            <p className="font-semibold">{company.marketCap}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">P/E Ratio</p>
                            <p className="font-semibold">{company.peRatio}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Revenue TTM</p>
                            <p className="font-semibold text-xs">{company.revenueTTM}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          <div className="text-center pt-6">
            <Button onClick={resetFlow} size="lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Discover More Companies
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorDiscoveryFlow;
