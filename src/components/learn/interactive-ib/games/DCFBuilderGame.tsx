import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Target, CheckCircle, XCircle } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface DCFComponent {
  id: string;
  name: string;
  description: string;
  type: 'revenue' | 'expenses' | 'discount_rate' | 'terminal_value';
  isCorrect: boolean;
}

const dcfComponents: DCFComponent[] = [
  {
    id: 'revenue-projection',
    name: 'Revenue Projections',
    description: 'Future revenue estimates for the next 5 years',
    type: 'revenue',
    isCorrect: true
  },
  {
    id: 'operating-expenses',
    name: 'Operating Expenses',
    description: 'Cost of goods sold, R&D, and operating costs',
    type: 'expenses', 
    isCorrect: true
  },
  {
    id: 'wacc-discount',
    name: 'WACC Discount Rate',
    description: 'Weighted average cost of capital as discount rate',
    type: 'discount_rate',
    isCorrect: true
  },
  {
    id: 'terminal-value',
    name: 'Terminal Value',
    description: 'Value of cash flows beyond projection period',
    type: 'terminal_value',
    isCorrect: true
  },
  {
    id: 'stock-price',
    name: 'Current Stock Price',
    description: 'Today\'s market trading price',
    type: 'revenue',
    isCorrect: false
  },
  {
    id: 'dividend-yield',
    name: 'Dividend Yield',
    description: 'Annual dividend percentage',
    type: 'revenue',
    isCorrect: false
  },
  {
    id: 'market-cap',
    name: 'Market Capitalization',
    description: 'Total market value of all shares',
    type: 'terminal_value',
    isCorrect: false
  }
];

interface DCFBuilderGameProps {
  onComplete: (score: number) => void;
}

const DCFBuilderGame: React.FC<DCFBuilderGameProps> = ({ onComplete }) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<'building' | 'completed'>('building');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleComponentSelect = (componentId: string) => {
    if (selectedComponents.includes(componentId)) {
      setSelectedComponents(prev => prev.filter(id => id !== componentId));
    } else if (selectedComponents.length < 4) {
      setSelectedComponents(prev => [...prev, componentId]);
    }
  };

  const calculateScore = () => {
    const correctComponents = dcfComponents.filter(comp => comp.isCorrect);
    const selectedCorrect = selectedComponents.filter(id => 
      correctComponents.some(comp => comp.id === id)
    );
    const selectedIncorrect = selectedComponents.filter(id => 
      !correctComponents.some(comp => comp.id === id)
    );

    const correctScore = selectedCorrect.length * 25;
    const incorrectPenalty = selectedIncorrect.length * 10;
    const finalScore = Math.max(0, correctScore - incorrectPenalty);

    return finalScore;
  };

  const validateModel = () => {
    const finalScore = calculateScore();
    const correctComponents = dcfComponents.filter(comp => comp.isCorrect);
    const allCorrectSelected = correctComponents.every(comp => 
      selectedComponents.includes(comp.id)
    );

    setScore(finalScore);
    
    if (allCorrectSelected && selectedComponents.length === 4) {
      setFeedback('Perfect! You\'ve built a complete DCF model with all the essential components.');
    } else if (finalScore >= 75) {
      setFeedback('Great job! Your DCF model includes most of the key components.');
    } else {
      setFeedback('Good effort! Remember: DCF models need revenue projections, expenses, discount rate, and terminal value.');
    }

    setGamePhase('completed');
    onComplete(finalScore);
  };

  const resetGame = () => {
    setSelectedComponents([]);
    setGamePhase('building');
    setScore(0);
    setFeedback('');
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="DCF Model Builder Complete!"
        score={score}
        totalScore={100}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span>DCF Model Builder</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Build a complete DCF model by selecting the 4 essential components. 
          Avoid including irrelevant items!
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Selected: {selectedComponents.length}/4
          </Badge>
          <Badge variant={selectedComponents.length === 4 ? "default" : "secondary"}>
            Ready to Validate
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dcfComponents.map((component) => {
            const isSelected = selectedComponents.includes(component.id);
            const canSelect = !isSelected && selectedComponents.length < 4;
            
            return (
              <Card 
                key={component.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : canSelect 
                      ? 'hover:ring-1 hover:ring-primary/50 hover:shadow-md' 
                      : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => canSelect || isSelected ? handleComponentSelect(component.id) : undefined}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{component.name}</h4>
                    {isSelected && (
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{component.description}</p>
                  <Badge 
                    variant="outline" 
                    className="mt-2 text-xs"
                  >
                    {component.type.replace('_', ' ')}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedComponents.length > 0 && (
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Your DCF Model Components:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedComponents.map(id => {
                const component = dcfComponents.find(c => c.id === id);
                return (
                  <Badge key={id} variant="default" className="text-xs">
                    {component?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={validateModel}
            disabled={selectedComponents.length === 0}
            className="animate-scale-in"
          >
            <Target className="h-4 w-4 mr-2" />
            Validate DCF Model
          </Button>
          <Button variant="outline" onClick={resetGame}>
            Reset Model
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DCFBuilderGame;