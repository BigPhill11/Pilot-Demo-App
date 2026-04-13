/**
 * LessonPersonalFinanceStep
 * 
 * Connects economic concepts to personal finance applications.
 * Shows how the lesson content applies to real financial decisions.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  Wallet, 
  Target,
  TrendingUp
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

interface LessonPersonalFinanceStepProps {
  description: string;
  realWorldExample: string;
  onContinue: () => void;
  onBack: () => void;
}

const LessonPersonalFinanceStep: React.FC<LessonPersonalFinanceStepProps> = ({
  description,
  realWorldExample,
  onContinue,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <Badge className="mb-3 bg-purple-100 text-purple-700 border-purple-200">
            <Wallet className="h-3 w-3 mr-1" />
            Personal Finance Connection
          </Badge>
          
          <h2 className="text-xl font-bold text-emerald-800 mb-2">
            How This Applies to Your Money
          </h2>
          
          <p className="text-emerald-600/80 text-sm">
            Economics isn't just theory—it affects your daily financial decisions
          </p>
        </div>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-purple-700">
              <Target className="h-5 w-5" />
              <span className="font-semibold">The Connection</span>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {description}
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-white mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Put It Into Practice</span>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-gray-700 leading-relaxed">
                {realWorldExample}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 mb-8">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200">
                  <PandaLogo className="w-9 h-9" />
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100 relative">
                  <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
                  <p className="text-gray-700 leading-relaxed text-sm">
                    <span className="font-semibold text-emerald-700">Phil's Tip:</span> Understanding economics helps you see the bigger picture. When you know why prices change or how markets work, you can make smarter decisions with your own money!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-emerald-300 text-emerald-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <Button
            onClick={onContinue}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Continue to Flashcards
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonPersonalFinanceStep;
