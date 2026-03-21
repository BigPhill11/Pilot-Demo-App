import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, XCircle, TrendingDown, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CompanyProfile {
  name: string;
  ticker: string;
  description: string;
  visibleFacts: string[];
  hiddenRisks: {
    id: string;
    risk: string;
    severity: 'high' | 'medium' | 'low';
    explanation: string;
  }[];
}

const companies: CompanyProfile[] = [
  {
    name: 'FastGrowth Tech',
    ticker: 'FAST',
    description: 'Cloud software company with 50% revenue growth',
    visibleFacts: [
      'Revenue growing 50% year-over-year',
      'P/E ratio of 80',
      'Recently went public (IPO 6 months ago)',
      'CEO is charismatic founder',
      'Operating in competitive SaaS market'
    ],
    hiddenRisks: [
      {
        id: 'risk1',
        risk: '90% of revenue from 2 customers',
        severity: 'high',
        explanation: 'Extreme customer concentration - losing one customer would devastate the business'
      },
      {
        id: 'risk2',
        risk: 'Negative profit margins (-40%)',
        severity: 'high',
        explanation: 'Losing money on every sale - growth doesn\'t matter if unit economics don\'t work'
      },
      {
        id: 'risk3',
        risk: 'CFO resigned 2 months ago',
        severity: 'medium',
        explanation: 'CFO departure shortly after IPO often signals accounting or financial issues'
      }
    ]
  },
  {
    name: 'Retail Legacy Inc',
    ticker: 'RTLG',
    description: 'Traditional retail chain with 500+ stores',
    visibleFacts: [
      'Established brand, 50 years in business',
      'Low P/E ratio of 8',
      'Pays quarterly dividend',
      'Large store footprint across country',
      'Recently launched e-commerce site'
    ],
    hiddenRisks: [
      {
        id: 'risk1',
        risk: 'Sales declining 15% annually for 3 years',
        severity: 'high',
        explanation: 'Sustained revenue decline indicates customers are abandoning the business'
      },
      {
        id: 'risk2',
        risk: 'Debt-to-equity ratio of 4.5',
        severity: 'high',
        explanation: 'Massive debt burden that could lead to bankruptcy if sales keep falling'
      },
      {
        id: 'risk3',
        risk: 'E-commerce only 3% of sales',
        severity: 'medium',
        explanation: 'Failed to adapt to online shopping, still heavily dependent on declining physical retail'
      }
    ]
  },
  {
    name: 'PharmaCure Bio',
    ticker: 'CURE',
    description: 'Biotech developing cancer treatment',
    visibleFacts: [
      'Stock up 200% this year',
      'Phase 3 clinical trial results pending',
      'Strong social media buzz',
      'Multiple analyst upgrades recently',
      'No revenue yet (pre-commercial)'
    ],
    hiddenRisks: [
      {
        id: 'risk1',
        risk: 'Only one drug candidate in pipeline',
        severity: 'high',
        explanation: 'All-or-nothing bet - if trial fails, company value goes to near zero'
      },
      {
        id: 'risk2',
        risk: 'Running out of cash in 6 months',
        severity: 'high',
        explanation: 'Will need to raise money soon, likely diluting shareholders'
      },
      {
        id: 'risk3',
        risk: 'CEO has history of failed companies',
        severity: 'medium',
        explanation: 'Track record suggests higher execution risk'
      }
    ]
  }
];

const RiskRadarGame: React.FC = () => {
  const [currentCompany, setCurrentCompany] = useState(0);
  const [foundRisks, setFoundRisks] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const company = companies[currentCompany];
  const totalRisks = company.hiddenRisks.length;
  const score = foundRisks.length;

  const handleRevealRisk = (riskId: string) => {
    if (!foundRisks.includes(riskId)) {
      setFoundRisks([...foundRisks, riskId]);
      toast.success('Risk identified! 🔍');
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentCompany < companies.length - 1) {
      setCurrentCompany(currentCompany + 1);
      setFoundRisks([]);
      setShowResults(false);
    } else {
      setCurrentCompany(0);
      setFoundRisks([]);
      setShowResults(false);
    }
  };

  if (showResults) {
    const percentage = Math.round((score / totalRisks) * 100);
    const missedRisks = company.hiddenRisks.filter(r => !foundRisks.includes(r.id));

    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Complete</CardTitle>
          <CardDescription>
            {company.name} ({company.ticker})
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              You found {score} out of {totalRisks} hidden risks
            </p>
          </div>

          {/* All Risks */}
          <div className="space-y-3">
            <h4 className="font-semibold">All Hidden Risks:</h4>
            {company.hiddenRisks.map(risk => (
              <div 
                key={risk.id}
                className={`p-3 rounded-lg border ${
                  foundRisks.includes(risk.id)
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {foundRisks.includes(risk.id) ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{risk.risk}</p>
                      <Badge 
                        variant={risk.severity === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{risk.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {percentage < 100 && (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                💡 <strong>Learning Point:</strong> The risks you missed could have saved you from a bad investment. 
                Always dig deep beyond surface-level positives!
              </p>
            </div>
          )}

          <Button onClick={handleNext} className="w-full" size="lg">
            {currentCompany < companies.length - 1 ? 'Next Company' : 'Start Over'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Risk Radar: Spot the Red Flags</CardTitle>
            <CardDescription>
              Click on statements below to reveal hidden risks
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {currentCompany + 1} / {companies.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Info */}
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-bold">{company.name}</h3>
          <p className="text-muted-foreground">${company.ticker}</p>
          <p className="text-sm">{company.description}</p>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between text-sm p-3 bg-muted rounded-lg">
          <span className="text-muted-foreground">Risks Found</span>
          <span className="font-bold text-primary">{score} / {totalRisks}</span>
        </div>

        {/* Visible Facts */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            What You See (The Good)
          </h4>
          <div className="space-y-2">
            {company.visibleFacts.map((fact, index) => (
              <div key={index} className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm">
                <p>✅ {fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Risks */}
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Hidden Risks (Click to Reveal)
          </h4>
          <div className="grid gap-2">
            {company.hiddenRisks.map((risk) => {
              const isRevealed = foundRisks.includes(risk.id);
              return (
                <Button
                  key={risk.id}
                  onClick={() => handleRevealRisk(risk.id)}
                  variant="outline"
                  disabled={isRevealed}
                  className={`h-auto p-4 text-left justify-start ${
                    isRevealed 
                      ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 opacity-100' 
                      : 'hover:border-red-500'
                  }`}
                >
                  <div className="w-full">
                    {isRevealed ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <span className="font-semibold text-sm">{risk.risk}</span>
                          <Badge 
                            variant={risk.severity === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs ml-auto"
                          >
                            {risk.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground pl-6">
                          {risk.explanation}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded border-2 border-dashed border-muted-foreground flex items-center justify-center">
                          <span className="text-xs">?</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Click to reveal risk #{risk.id.slice(-1)}</span>
                      </div>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Finish Button */}
        <Button 
          onClick={handleFinish}
          className="w-full"
          size="lg"
          variant={score === totalRisks ? 'default' : 'outline'}
        >
          {score === totalRisks 
            ? 'All Risks Found! See Results' 
            : `Finish Assessment (${score}/${totalRisks} found)`
          }
        </Button>
      </CardContent>
    </Card>
  );
};

export default RiskRadarGame;
