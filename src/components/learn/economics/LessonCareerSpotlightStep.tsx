/**
 * LessonCareerSpotlightStep
 * 
 * Showcases career opportunities related to the economics concepts learned.
 * Displays job titles, descriptions, salary ranges, and required skills.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  Briefcase,
  DollarSign,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import type { CareerInfo } from '@/types/economics-curriculum';

interface LessonCareerSpotlightStepProps {
  career: CareerInfo;
  onContinue: () => void;
  onBack: () => void;
}

const LessonCareerSpotlightStep: React.FC<LessonCareerSpotlightStepProps> = ({
  career,
  onContinue,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50/50 to-teal-50/30">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <Badge className="mb-3 bg-cyan-100 text-cyan-700 border-cyan-200">
            <Briefcase className="h-3 w-3 mr-1" />
            Career Spotlight
          </Badge>
          
          <h2 className="text-xl font-bold text-emerald-800 mb-2">
            Where This Knowledge Leads
          </h2>
          
          <p className="text-emerald-600/80 text-sm">
            Discover careers that use the concepts you just learned
          </p>
        </div>

        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {career.title}
                </h3>
                <div className="flex items-center gap-1 text-cyan-100">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">{career.salaryRange}</span>
                </div>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed mb-6">
              {career.description}
            </p>

            <div className="bg-white rounded-lg p-4 border border-cyan-100">
              <div className="flex items-center gap-2 mb-3 text-cyan-700">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Key Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-cyan-300 text-cyan-700 bg-cyan-50"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-white mb-8">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">How This Lesson Connects</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              The economic concepts you learned in this lesson are fundamental to this career. 
              Professionals in this field use these principles daily to analyze markets, 
              make decisions, and create value for organizations and clients.
            </p>
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
            Complete Lesson
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonCareerSpotlightStep;
