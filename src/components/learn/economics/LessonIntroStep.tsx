/**
 * LessonIntroStep
 * 
 * First step of an economics lesson showing the hook and Phil's welcome message.
 * Designed to capture attention and set the context for learning.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Clock, Sparkles } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

interface LessonIntroStepProps {
  lessonTitle: string;
  estimatedMinutes: number;
  hook: string;
  philMessage: string;
  onContinue: () => void;
}

const LessonIntroStep: React.FC<LessonIntroStepProps> = ({
  lessonTitle,
  estimatedMinutes,
  hook,
  philMessage,
  onContinue,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            <Clock className="h-3 w-3 mr-1" />
            {estimatedMinutes} min lesson
          </Badge>
          
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-2">
            {lessonTitle}
          </h1>
        </div>

        <Card className="border-emerald-200 bg-white/90 backdrop-blur-sm mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Did You Know?</span>
            </div>
          </div>
          <CardContent className="p-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {hook}
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200">
                  <PandaLogo className="w-12 h-12" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-emerald-800">Phil the Panda</span>
                  <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-600">
                    Your Guide
                  </Badge>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-100 relative">
                  <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white" />
                  <p className="text-gray-700 leading-relaxed">
                    {philMessage}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
          >
            Let's Learn!
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonIntroStep;
