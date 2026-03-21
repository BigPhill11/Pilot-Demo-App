
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, Heart, TrendingUp, BarChart3, AlertTriangle, Building2, Briefcase, DollarSign, MapPin, User, Zap } from 'lucide-react';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';

interface EnhancedCompanySwipeCardProps {
  company: CompanyProfile;
  matchScore?: number;
  matchReasons?: string[];
  onSwipe: (companyId: string, action: 'like' | 'dislike' | 'super_like') => void;
}

const EnhancedCompanySwipeCard: React.FC<EnhancedCompanySwipeCardProps> = ({ 
  company, 
  matchScore = 0, 
  matchReasons = [], 
  onSwipe 
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-blue-600 bg-blue-100";
    if (score >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const mockPerformanceData = {
    yearToDate: 15.2,
    oneYear: 24.7,
    threeYear: 156.3,
    volatility: 28.4,
    beta: 1.2,
    sharpeRatio: 1.45
  };

  const mockRiskFactors = [
    "Market competition intensity",
    "Regulatory changes in key markets",
    "Technology disruption risk",
    "Supply chain dependencies"
  ];

  const mockStrategy = {
    focus: "AI-driven innovation and cloud infrastructure expansion",
    competitive: ["Microsoft", "Google", "Amazon"],
    moat: "Proprietary technology platform and network effects"
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {company.logoUrl ? (
              <img src={company.logoUrl} alt={`${company.name} logo`} className="h-12 w-12 rounded-full object-contain" />
            ) : (
              <div className="p-3 rounded-full bg-muted">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-xl">{company.name} ({company.ticker})</CardTitle>
              <CardDescription>{company.industry}</CardDescription>
            </div>
          </div>
          
          {matchScore > 0 && (
            <div className="text-center">
              <Badge className={`${getMatchColor(matchScore)} font-semibold`}>
                {matchScore}% Match
              </Badge>
            </div>
          )}
        </div>

        {matchReasons.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Why this matches your profile:</p>
            <div className="space-y-1">
              {matchReasons.slice(0, 3).map((reason, index) => (
                <div key={index} className="flex items-center text-sm text-blue-800">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                  {reason}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">
              <User className="h-3 w-3 mr-1" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="strategy" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Strategy
            </TabsTrigger>
            <TabsTrigger value="risks" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Risks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* Dating Profile Style Bio */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">My Investment Dating Profile 💼</h4>
              <p className="text-sm text-purple-800 italic mb-3">"{company.dating.marketSentiment}"</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <Zap className="h-3 w-3 mr-1 text-purple-500" />
                  <span className="font-medium">Vibe:</span>&nbsp;{company.dating.marketSentiment.split('.')[0]}
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-purple-500" />
                  <span className="font-medium">Track Record:</span>&nbsp;Proven
                </div>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <DollarSign className="h-4 w-4 mx-auto text-green-600 mb-1" />
                <p className="text-xs text-green-700">Market Cap</p>
                <p className="font-semibold text-green-900">{company.marketCap}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <BarChart3 className="h-4 w-4 mx-auto text-blue-600 mb-1" />
                <p className="text-xs text-blue-700">Revenue TTM</p>
                <p className="font-semibold text-blue-900">{company.revenueTTM}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg text-center">
                <Briefcase className="h-4 w-4 mx-auto text-purple-600 mb-1" />
                <p className="text-xs text-purple-700">P/E Ratio</p>
                <p className="font-semibold text-purple-900">{company.peRatio}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <MapPin className="h-4 w-4 mx-auto text-orange-600 mb-1" />
                <p className="text-xs text-orange-700">HQ</p>
                <p className="font-semibold text-orange-900 text-xs">{company.headquarters}</p>
              </div>
            </div>

            {/* Top KPIs */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Performance Drivers</h4>
              <div className="space-y-2">
                {company.professional.kpis.slice(0, 3).map((kpi, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{kpi.title}</span>
                    <Badge variant="outline" className="text-xs">{kpi.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Stock Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">YTD Return</span>
                    <span className="font-medium text-green-600">+{mockPerformanceData.yearToDate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1-Year Return</span>
                    <span className="font-medium text-green-600">+{mockPerformanceData.oneYear}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">3-Year Return</span>
                    <span className="font-medium text-green-600">+{mockPerformanceData.threeYear}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Volatility</span>
                    <span className="font-medium">{mockPerformanceData.volatility}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Beta</span>
                    <span className="font-medium">{mockPerformanceData.beta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sharpe Ratio</span>
                    <span className="font-medium text-blue-600">{mockPerformanceData.sharpeRatio}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Performance vs S&P 500</h5>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Outperformance (1Y)</span>
                  <span className="font-semibold text-blue-700">+12.3%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-blue-700">Beating market 75% of the time</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Strategic Focus</h4>
              <p className="text-sm text-muted-foreground italic mb-3">"{mockStrategy.focus}"</p>
            </div>

            <div>
              <h5 className="font-medium mb-2">Competitive Landscape</h5>
              <div className="flex flex-wrap gap-2">
                {mockStrategy.competitive.map((competitor) => (
                  <Badge key={competitor} variant="outline">{competitor}</Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <h5 className="font-medium text-purple-900 mb-1">Competitive Moat</h5>
              <p className="text-sm text-purple-800">{mockStrategy.moat}</p>
            </div>

            <div>
              <h5 className="font-medium mb-2">What Analysts Say</h5>
              <p className="text-sm text-muted-foreground italic">
                "{company.dating.analystSentiment}"
              </p>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Key Risk Factors</h4>
              <div className="space-y-2">
                {mockRiskFactors.map((risk, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-800">{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <h5 className="font-medium text-yellow-900 mb-2">Investment Considerations</h5>
              <div className="space-y-1 text-sm text-yellow-800">
                <p>• Monitor quarterly earnings for guidance changes</p>
                <p>• Watch for regulatory developments in key markets</p>
                <p>• Consider position sizing due to volatility</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 mt-4 border-t space-x-3">
          <Button 
            variant="outline" 
            size="lg" 
            className="text-red-500 border-red-500 hover:bg-red-500/10 flex-1" 
            onClick={() => onSwipe(company.id, 'dislike')}
          >
            <ThumbsDown className="mr-2 h-4 w-4" /> 
            Pass
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-pink-500 border-pink-500 hover:bg-pink-500/10 px-4" 
            onClick={() => onSwipe(company.id, 'super_like')}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="text-green-500 border-green-500 hover:bg-green-500/10 flex-1" 
            onClick={() => onSwipe(company.id, 'like')}
          >
            <ThumbsUp className="mr-2 h-4 w-4" /> 
            Invest
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCompanySwipeCard;
