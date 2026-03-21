
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Building2, Briefcase, DollarSign, BarChart2, MapPin, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface CompanyProfile {
  id: string;
  name: string;
  ticker: string;
  logoUrl?: string;
  industry: string;
  sector?: string;
  professional: {
    overview: string;
    kpis: { title: string; value: string }[];
    financials: { title: string; value: string }[];
  };
  dating: {
    marketSentiment: string;
    analystSentiment: string;
    historicalPerformance: string;
  };
  marketCap: string | number;
  revenueTTM: string;
  peRatio: string;
  headquarters: string;
}

interface CompanySwipeCardProps {
  company: CompanyProfile;
  onSwipe: (companyId: string, liked: boolean) => void;
}

const CompanySwipeCard: React.FC<CompanySwipeCardProps> = ({ company, onSwipe }) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={`${company.name} logo`} className="h-12 w-12 rounded-full object-contain" />
          ) : (
            <div className="p-3 rounded-full bg-muted">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          )}
          <div>
            <CardTitle className="text-2xl">{company.name} ({company.ticker})</CardTitle>
            <CardDescription>{company.industry}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="professional">
              <Briefcase className="h-4 w-4 mr-2" />
              Professional
            </TabsTrigger>
            <TabsTrigger value="dating">
              <User className="h-4 w-4 mr-2" />
              Dating Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent value="professional" className="mt-4 border-t pt-4 text-sm space-y-4">
            <p className="text-muted-foreground">{company.professional.overview}</p>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Performance Indicators (KPIs)</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {company.professional.kpis.map((kpi, index) => (
                  <li key={index}>
                    <span className="font-medium text-foreground">{kpi.title}:</span> {kpi.value}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Financials</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {company.professional.financials.map((fin, index) => (
                  <li key={index}>
                    <span className="font-medium text-foreground">{fin.title}:</span> {fin.value}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="dating" className="mt-4 border-t pt-4 text-sm space-y-4">
            <div className="space-y-3 italic text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground not-italic mb-1">Vibe Check (Market Sentiment)</h4>
                <p>"{company.dating.marketSentiment}"</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground not-italic mb-1">What the Experts Say (Analyst Sentiment)</h4>
                <p>"{company.dating.analystSentiment}"</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground not-italic mb-1">My Relationship History (Performance)</h4>
                <p>"{company.dating.historicalPerformance}"</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-4 border-t">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1.5 text-green-500" />
            <span className="font-medium">Market Cap:</span>&nbsp;{company.marketCap}
          </div>
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1.5 text-blue-500" />
            <span className="font-medium">Revenue (TTM):</span>&nbsp;{company.revenueTTM}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1.5 text-purple-500" />
            <span className="font-medium">P/E Ratio:</span>&nbsp;{company.peRatio}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-orange-500" />
            <span className="font-medium">Headquarters:</span>&nbsp;{company.headquarters}
          </div>
        </div>

        <div className="flex justify-around pt-4 mt-4 border-t">
          <Button variant="outline" size="lg" className="text-red-500 border-red-500 hover:bg-red-500/10 w-32" onClick={() => onSwipe(company.id, false)}>
            <ThumbsDown className="mr-2 h-5 w-5" /> Dislike
          </Button>
          <Button variant="outline" size="lg" className="text-green-500 border-green-500 hover:bg-green-500/10 w-32" onClick={() => onSwipe(company.id, true)}>
            <ThumbsUp className="mr-2 h-5 w-5" /> Like
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanySwipeCard;
