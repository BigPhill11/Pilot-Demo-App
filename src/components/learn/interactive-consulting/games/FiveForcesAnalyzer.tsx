
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Users, Zap, Factory } from 'lucide-react';

interface FiveForcesAnalyzerProps {
  onComplete: (score: number) => void;
}

const FiveForcesAnalyzer: React.FC<FiveForcesAnalyzerProps> = ({ onComplete }) => {
  const [analysis, setAnalysis] = useState({
    competitiveRivalry: { score: 3, factors: [] as string[] },
    supplierPower: { score: 3, factors: [] as string[] },
    buyerPower: { score: 3, factors: [] as string[] },
    threatOfSubstitutes: { score: 3, factors: [] as string[] },
    threatOfNewEntrants: { score: 3, factors: [] as string[] }
  });
  
  const [gameComplete, setGameComplete] = useState(false);
  const [currentForce, setCurrentForce] = useState(0);

  const forces = [
    {
      name: 'Competitive Rivalry',
      icon: <Shield className="h-5 w-5" />,
      key: 'competitiveRivalry' as keyof typeof analysis,
      factors: [
        'Many competitors of similar size',
        'Low switching costs for customers',
        'High fixed costs requiring volume',
        'Slow industry growth',
        'Products are commoditized'
      ]
    },
    {
      name: 'Supplier Power',
      icon: <Factory className="h-5 w-5" />,
      key: 'supplierPower' as keyof typeof analysis,
      factors: [
        'Few alternative suppliers',
        'Suppliers have strong brands',
        'High switching costs to change suppliers',
        'Suppliers can integrate forward',
        'Industry not important to suppliers'
      ]
    },
    {
      name: 'Buyer Power',
      icon: <Users className="h-5 w-5" />,
      key: 'buyerPower' as keyof typeof analysis,
      factors: [
        'Buyers purchase large volumes',
        'Low switching costs for buyers',
        'Buyers can integrate backward',
        'Product not critical to buyers',
        'Many alternative suppliers'
      ]
    },
    {
      name: 'Threat of Substitutes',
      icon: <Zap className="h-5 w-5" />,
      key: 'threatOfSubstitutes' as keyof typeof analysis,
      factors: [
        'Substitutes have better price/performance',
        'Low switching costs to substitutes',
        'Buyer propensity to substitute is high',
        'Substitute products are improving',
        'Many substitute options available'
      ]
    },
    {
      name: 'Threat of New Entrants',
      icon: <TrendingUp className="h-5 w-5" />,
      key: 'threatOfNewEntrants' as keyof typeof analysis,
      factors: [
        'Low capital requirements',
        'Easy access to distribution channels',
        'No government regulations',
        'Existing players lack retaliation history',
        'No economies of scale required'
      ]
    }
  ];

  const updateForceScore = (forceKey: keyof typeof analysis, score: number) => {
    setAnalysis(prev => ({
      ...prev,
      [forceKey]: { ...prev[forceKey], score }
    }));
  };

  const toggleFactor = (forceKey: keyof typeof analysis, factor: string) => {
    setAnalysis(prev => {
      const currentFactors = prev[forceKey].factors;
      const newFactors = currentFactors.includes(factor)
        ? currentFactors.filter(f => f !== factor)
        : [...currentFactors, factor];
      
      return {
        ...prev,
        [forceKey]: { ...prev[forceKey], factors: newFactors }
      };
    });
  };

  const calculateOverallScore = () => {
    const scores = Object.values(analysis).map(force => force.score);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average * 20); // Convert to 100-point scale
  };

  const completeAnalysis = () => {
    const score = calculateOverallScore();
    setGameComplete(true);
    setTimeout(() => onComplete(score), 1000);
  };

  const getIndustryAttractiveness = () => {
    const avgScore = Object.values(analysis).map(f => f.score).reduce((sum, s) => sum + s, 0) / 5;
    if (avgScore <= 2) return { level: 'High Attractiveness', color: 'text-green-600', bg: 'bg-green-50' };
    if (avgScore <= 3.5) return { level: 'Moderate Attractiveness', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low Attractiveness', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const force = forces[currentForce];
  const attractiveness = getIndustryAttractiveness();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Porter's Five Forces Analyzer
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">Industry Analysis</Badge>
            <Badge className={`${attractiveness.bg} ${attractiveness.color}`}>
              {attractiveness.level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!gameComplete ? (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {force.icon}
                  {force.name}
                </h3>
                <div className="flex gap-1">
                  {forces.map((_, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={currentForce === index ? "default" : "outline"}
                      onClick={() => setCurrentForce(index)}
                      className="w-8 h-8 p-0"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Intensity Level (1=Low, 5=High):</h4>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(score => (
                      <Button
                        key={score}
                        variant={analysis[force.key].score === score ? "default" : "outline"}
                        onClick={() => updateForceScore(force.key, score)}
                        className="w-12 h-12"
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Contributing Factors:</h4>
                  <div className="space-y-2">
                    {force.factors.map((factor, index) => (
                      <Button
                        key={index}
                        variant={analysis[force.key].factors.includes(factor) ? "default" : "outline"}
                        onClick={() => toggleFactor(force.key, factor)}
                        className="w-full justify-start text-left h-auto py-3 px-4"
                      >
                        <span className="flex items-center gap-2">
                          {analysis[force.key].factors.includes(factor) && "✓"}
                          {factor}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentForce(Math.max(0, currentForce - 1))}
                  disabled={currentForce === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (currentForce < forces.length - 1) {
                      setCurrentForce(currentForce + 1);
                    } else {
                      completeAnalysis();
                    }
                  }}
                >
                  {currentForce < forces.length - 1 ? 'Next Force' : 'Complete Analysis'}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Analysis Complete!</h3>
                <p className="text-blue-700">
                  Industry Attractiveness: {attractiveness.level}
                </p>
              </div>
              
              <div className="grid gap-4">
                {forces.map((f, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {f.icon}
                      <span className="font-medium">{f.name}</span>
                    </div>
                    <Badge variant="outline">
                      {analysis[f.key].score}/5
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FiveForcesAnalyzer;
