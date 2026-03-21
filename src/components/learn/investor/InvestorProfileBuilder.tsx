
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Target, TrendingUp, Shield, Leaf, Zap } from 'lucide-react';
import { InvestorProfile } from '@/types/investor-profile';

interface InvestorProfileBuilderProps {
  onProfileComplete: (profile: Partial<InvestorProfile>) => void;
}

const InvestorProfileBuilder: React.FC<InvestorProfileBuilderProps> = ({ onProfileComplete }) => {
  const [preferences, setPreferences] = useState({
    revenueGrowthTarget: 10,
    peRangeMin: 0,
    peRangeMax: 30,
    marketCapPreference: 'any' as const,
    dividendYieldMin: 0,
    esgImportance: 'medium' as const,
    rdSpendingMin: 5,
    cashOnHandMin: 1,
    riskTolerance: 'moderate' as const
  });

  const handleSliderChange = (key: string) => (value: number[]) => {
    setPreferences(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleRangeChange = (values: number[]) => {
    setPreferences(prev => ({ 
      ...prev, 
      peRangeMin: values[0], 
      peRangeMax: values[1] 
    }));
  };

  const handleSelectChange = (key: string) => (value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    const profile: Partial<InvestorProfile> = {
      id: crypto.randomUUID(),
      preferences,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    onProfileComplete(profile);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'conservative': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-blue-600 bg-blue-100';
      case 'aggressive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <User className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Build Your Investor Profile</h2>
        </div>
        <p className="text-muted-foreground">Set your preferences to find companies that match your investment style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Growth Targets</span>
            </CardTitle>
            <CardDescription>Your expectations for company performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Minimum Revenue Growth (YoY)</Label>
              <div className="pt-3">
                <Slider
                  value={[preferences.revenueGrowthTarget]}
                  onValueChange={handleSliderChange('revenueGrowthTarget')}
                  max={50}
                  min={-10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>-10%</span>
                  <Badge variant="outline">{preferences.revenueGrowthTarget}%</Badge>
                  <span>50%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>P/E Range Preference</Label>
              <div className="pt-3">
                <Slider
                  value={[preferences.peRangeMin, preferences.peRangeMax]}
                  onValueChange={handleRangeChange}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0</span>
                  <Badge variant="outline">{preferences.peRangeMin} - {preferences.peRangeMax}</Badge>
                  <span>100+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Characteristics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Company Preferences</span>
            </CardTitle>
            <CardDescription>What type of companies interest you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Market Cap Preference</Label>
              <Select value={preferences.marketCapPreference} onValueChange={handleSelectChange('marketCapPreference')}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Cap (&lt;$2B)</SelectItem>
                  <SelectItem value="mid">Mid Cap ($2B-$10B)</SelectItem>
                  <SelectItem value="large">Large Cap ($10B-$200B)</SelectItem>
                  <SelectItem value="mega">Mega Cap ($200B+)</SelectItem>
                  <SelectItem value="any">Any Size</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Minimum Dividend Yield</Label>
              <div className="pt-3">
                <Slider
                  value={[preferences.dividendYieldMin]}
                  onValueChange={handleSliderChange('dividendYieldMin')}
                  max={10}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0%</span>
                  <Badge variant="outline">{preferences.dividendYieldMin}%</Badge>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Innovation & Values */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-purple-500" />
              <span>Innovation Focus</span>
            </CardTitle>
            <CardDescription>R&D and technology investment preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Minimum R&D Spending (% of Revenue)</Label>
              <div className="pt-3">
                <Slider
                  value={[preferences.rdSpendingMin]}
                  onValueChange={handleSliderChange('rdSpendingMin')}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0%</span>
                  <Badge variant="outline">{preferences.rdSpendingMin}%</Badge>
                  <span>30%</span>
                </div>
              </div>
            </div>

            <div>
              <Label>ESG Importance</Label>
              <Select value={preferences.esgImportance} onValueChange={handleSelectChange('esgImportance')}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Moderate Consideration</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Risk Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-500" />
              <span>Risk Profile</span>
            </CardTitle>
            <CardDescription>Your comfort level with investment risk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Risk Tolerance</Label>
              <Select value={preferences.riskTolerance} onValueChange={handleSelectChange('riskTolerance')}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative - Steady & Safe</SelectItem>
                  <SelectItem value="moderate">Moderate - Balanced Approach</SelectItem>
                  <SelectItem value="aggressive">Aggressive - High Growth Potential</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Minimum Cash on Hand (Billions)</Label>
              <div className="pt-3">
                <Slider
                  value={[preferences.cashOnHandMin]}
                  onValueChange={handleSliderChange('cashOnHandMin')}
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>$0B</span>
                  <Badge variant="outline">${preferences.cashOnHandMin}B</Badge>
                  <span>$50B+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary & Complete */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Investment Profile Summary</CardTitle>
          <CardDescription>Review your preferences before continuing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Growth Target</p>
              <Badge className="mt-1">{preferences.revenueGrowthTarget}%+</Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">P/E Range</p>
              <Badge variant="outline" className="mt-1">{preferences.peRangeMin}-{preferences.peRangeMax}</Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <Badge variant="secondary" className="mt-1 capitalize">{preferences.marketCapPreference}</Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <Badge className={`mt-1 capitalize ${getRiskColor(preferences.riskTolerance)}`}>
                {preferences.riskTolerance}
              </Badge>
            </div>
          </div>
          
          <Button onClick={handleComplete} className="w-full" size="lg">
            <Target className="h-4 w-4 mr-2" />
            Find My Investment Matches
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorProfileBuilder;
