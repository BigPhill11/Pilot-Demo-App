/**
 * Economics Simulator Decision Card
 * 
 * Displays a decision scenario with options for the user to choose from.
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, CheckCircle2, Lightbulb } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { SimulatorDecision, SimulatorDecisionOption } from '@/types/economics-sim';

interface EconomicsSimDecisionProps {
  decision: SimulatorDecision;
  onSelect: (optionId: string, meterChanges: Record<string, number>) => void;
  disabled?: boolean;
}

const EconomicsSimDecision: React.FC<EconomicsSimDecisionProps> = ({
  decision,
  onSelect,
  disabled = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOptionData, setSelectedOptionData] = useState<SimulatorDecisionOption | null>(null);

  const handleOptionClick = (option: SimulatorDecisionOption) => {
    if (disabled || showFeedback) return;
    setSelectedOption(option.id);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    
    const option = decision.options.find(o => o.id === selectedOption);
    if (!option) return;
    
    setSelectedOptionData(option);
    setShowFeedback(true);
    
    setTimeout(() => {
      onSelect(selectedOption, option.meterChanges);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      {/* Decision Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {decision.title}
        </h2>
      </div>

      {/* Scenario */}
      <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50">
        <CardContent className="p-4">
          <p className="text-gray-700">{decision.scenario}</p>
          {decision.context && (
            <p className="text-sm text-gray-500 mt-2 italic">{decision.context}</p>
          )}
        </CardContent>
      </Card>

      {/* Options */}
      {!showFeedback && (
        <div className="space-y-3">
          {decision.options.map((option) => (
            <Card
              key={option.id}
              className={`
                border-2 cursor-pointer transition-all
                ${selectedOption === option.id
                  ? 'border-blue-400 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => handleOptionClick(option)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                    ${selectedOption === option.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {selectedOption === option.id ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">
                        {decision.options.indexOf(option) + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${selectedOption === option.id ? 'text-blue-800' : 'text-gray-800'}`}>
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && selectedOptionData && (
        <div className="space-y-4">
          {/* Selected Option */}
          <Card className="border-blue-300 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800">{selectedOptionData.label}</h3>
                  <p className="text-sm text-blue-600 mt-1">{selectedOptionData.feedback}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phil's Insight */}
          {selectedOptionData.philInsight && (
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <PandaLogo className="h-8 w-8 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-green-800">Phil's Insight</span>
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                    </div>
                    <p className="text-sm text-green-700 italic">{selectedOptionData.philInsight}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Concept Connection */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                Concept
              </Badge>
              <p className="text-sm text-amber-800">{decision.conceptConnection}</p>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      {selectedOption && !showFeedback && (
        <Button
          onClick={handleConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          Confirm Decision
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      )}
    </div>
  );
};

export default EconomicsSimDecision;
