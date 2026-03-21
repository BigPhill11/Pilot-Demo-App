import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Target, Users, Brain } from 'lucide-react';

interface VCJourneyHeaderProps {
  onBack: () => void;
}

const VCJourneyHeader: React.FC<VCJourneyHeaderProps> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="hover:bg-primary/10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Careers
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 border-none text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-700/90"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-4xl mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <TrendingUp className="h-10 w-10" />
            </div>
            <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Venture Capital Journey
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          <p className="text-xl text-purple-100 leading-relaxed">
            Master the world of venture capital through hands-on learning, from understanding startup evaluation 
            to building investment portfolios. 🚀
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Learn Core Concepts</h3>
                <p className="text-purple-100">Master VC fundamentals and terminology</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Interactive Practice</h3>
                <p className="text-purple-100">Engage with real-world scenarios</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Test Knowledge</h3>
                <p className="text-purple-100">Quiz yourself and track progress</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VCJourneyHeader;