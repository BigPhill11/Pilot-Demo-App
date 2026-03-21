import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, RotateCcw, GripVertical } from 'lucide-react';
import GameCompletionBanner from '../../interactive-ib/games/components/GameCompletionBanner';
import GameHeader from '../../interactive-ib/games/components/GameHeader';

interface FundStructureBuilderProps {
  onComplete: (gameId: string) => void;
  isCompleted: boolean;
}

interface FundComponent {
  id: string;
  name: string;
  description: string;
  role: string;
  type: 'structure' | 'participant' | 'process';
}

const fundComponents: FundComponent[] = [
  {
    id: 'gp',
    name: 'General Partner (GP)',
    description: 'Makes investment decisions and manages the fund',
    role: 'management',
    type: 'participant'
  },
  {
    id: 'lp',
    name: 'Limited Partner (LP)',
    description: 'Provides capital but has limited involvement in decisions',
    role: 'investor',
    type: 'participant'
  },
  {
    id: 'fund',
    name: 'PE Fund',
    description: 'The investment vehicle that pools capital',
    role: 'structure',
    type: 'structure'
  },
  {
    id: 'portfolio',
    name: 'Portfolio Companies',
    description: 'Companies that the fund invests in',
    role: 'investment',
    type: 'structure'
  },
  {
    id: 'capital_call',
    name: 'Capital Call',
    description: 'Request for LPs to contribute committed capital',
    role: 'funding',
    type: 'process'
  },
  {
    id: 'distribution',
    name: 'Distribution',
    description: 'Returns paid back to LPs from exits',
    role: 'returns',
    type: 'process'
  }
];

const FundStructureBuilder: React.FC<FundStructureBuilderProps> = ({ onComplete, isCompleted }) => {
  const [availableComponents, setAvailableComponents] = useState<FundComponent[]>(fundComponents);
  const [placedComponents, setPlacedComponents] = useState<Record<string, FundComponent | null>>({
    management: null,
    investors: null,
    structure: null,
    investments: null,
    funding_process: null,
    return_process: null
  });
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const correctPlacements: Record<string, string> = {
    management: 'gp',
    investors: 'lp',
    structure: 'fund',
    investments: 'portfolio',
    funding_process: 'capital_call',
    return_process: 'distribution'
  };

  const placeComponent = (componentId: string, targetSlot: string) => {
    const component = availableComponents.find(c => c.id === componentId);
    if (!component) return;

    setAttempts(prev => prev + 1);
    
    // Remove from available components
    setAvailableComponents(prev => prev.filter(c => c.id !== componentId));
    
    // Place in target slot
    setPlacedComponents(prev => ({
      ...prev,
      [targetSlot]: component
    }));

    // Check if correct
    if (correctPlacements[targetSlot] === componentId) {
      setScore(prev => prev + 20);
    }

    // Check if game is complete
    const newPlacedComponents = { ...placedComponents, [targetSlot]: component };
    const allSlotsFilled = Object.values(newPlacedComponents).every(comp => comp !== null);
    
    if (allSlotsFilled) {
      const correctCount = Object.entries(newPlacedComponents).filter(
        ([slot, comp]) => comp && correctPlacements[slot] === comp.id
      ).length;
      
      if (correctCount === Object.keys(correctPlacements).length) {
        setGameCompleted(true);
        onComplete('fund-structure-builder');
      }
    }
  };

  const removeComponent = (slot: string) => {
    const component = placedComponents[slot];
    if (!component) return;

    setAvailableComponents(prev => [...prev, component]);
    setPlacedComponents(prev => ({
      ...prev,
      [slot]: null
    }));
  };

  const resetGame = () => {
    setAvailableComponents(fundComponents);
    setPlacedComponents({
      management: null,
      investors: null,
      structure: null,
      investments: null,
      funding_process: null,
      return_process: null
    });
    setGameCompleted(false);
    setScore(0);
    setAttempts(0);
  };

  if (gameCompleted) {
    return (
      <GameCompletionBanner score={score} />
    );
  }

  return (
    <div className="space-y-6">
      <GameHeader score={score} attempts={attempts} />

      {/* Available Components */}
      <Card>
        <CardHeader>
          <CardTitle>Available Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableComponents.map((component) => (
              <Card
                key={component.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {}}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">{component.name}</div>
                      <div className="text-xs text-gray-500">{component.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fund Structure Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(placedComponents).map(([slot, component]) => {
          const slotNames: Record<string, string> = {
            management: 'Fund Management',
            investors: 'Capital Providers',
            structure: 'Fund Structure',
            investments: 'Investment Targets',
            funding_process: 'Capital Flow In',
            return_process: 'Return Flow Out'
          };

          const isCorrect = component && correctPlacements[slot] === component.id;

          return (
            <Card
              key={slot}
              className={`min-h-[120px] border-2 border-dashed transition-colors ${
                component
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {slotNames[slot]}
                  {component && isCorrect && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {component ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => removeComponent(slot)}
                  >
                    <div className="font-medium text-sm">{component.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{component.description}</div>
                    <div className="text-xs text-blue-600 mt-1">Click to remove</div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Click a component above to place it here
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Component Selection Buttons */}
      {Object.entries(placedComponents).some(([_, comp]) => comp === null) && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Place Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableComponents.map((component) => (
                <div key={component.id} className="space-y-1">
                  <div className="text-xs font-medium">{component.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(placedComponents)
                      .filter(([_, comp]) => comp === null)
                      .map(([slot]) => (
                        <Button
                          key={slot}
                          size="sm"
                          variant="outline"
                          className="text-xs h-6"
                          onClick={() => placeComponent(component.id, slot)}
                        >
                          {slot.replace('_', ' ')}
                        </Button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Placed: {Object.values(placedComponents).filter(c => c !== null).length}/6
          </Badge>
          <Badge variant="outline">
            Score: {score}
          </Badge>
        </div>
        <Button variant="outline" onClick={resetGame}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default FundStructureBuilder;