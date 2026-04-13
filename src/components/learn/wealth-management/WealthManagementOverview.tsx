/**
 * Wealth Management Overview
 * 
 * Visual landing page introducing the Wealth Management career path
 * with Phil mascot, image cards, quick stats, and CTA.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  ChevronRight,
  Briefcase,
  Heart,
  Brain
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

interface WealthManagementOverviewProps {
  onStart: () => void;
  onResume?: () => void;
  hasExistingProgress?: boolean;
}

const WealthManagementOverview: React.FC<WealthManagementOverviewProps> = ({
  onStart,
  onResume,
  hasExistingProgress = false,
}) => {
  const careerHighlights = [
    {
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      title: 'Client Relationships',
      description: 'Build lasting relationships helping families achieve their financial dreams',
      image: 'https://placehold.co/300x200/10b981/ffffff?text=Client+Meeting',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      title: 'Portfolio Management',
      description: 'Craft investment strategies tailored to each client\'s unique goals',
      image: 'https://placehold.co/300x200/059669/ffffff?text=Portfolio+Analysis',
    },
    {
      icon: <Briefcase className="h-6 w-6 text-emerald-600" />,
      title: 'Financial Planning',
      description: 'Guide clients through retirement, education, and estate planning',
      image: 'https://placehold.co/300x200/047857/ffffff?text=Financial+Planning',
    },
    {
      icon: <Heart className="h-6 w-6 text-emerald-600" />,
      title: 'Making an Impact',
      description: 'Help generations of families secure their financial futures',
      image: 'https://placehold.co/300x200/065f46/ffffff?text=Family+Legacy',
    },
  ];

  const quickStats = [
    { label: 'Starting Salary', value: '$65K-$85K', icon: <DollarSign className="h-4 w-4" /> },
    { label: 'Senior Salary', value: '$150K-$300K+', icon: <TrendingUp className="h-4 w-4" /> },
    { label: 'Work-Life Balance', value: 'Moderate', icon: <Clock className="h-4 w-4" /> },
    { label: 'Growth Potential', value: 'High', icon: <Brain className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-4 w-2 h-48 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-20 left-8 w-1.5 h-36 bg-gradient-to-b from-green-200/15 to-green-400/10 rounded-full" />
        <div className="absolute top-0 right-4 w-2 h-44 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-24 right-10 w-1.5 h-32 bg-gradient-to-b from-green-200/15 to-green-400/10 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <PandaLogo className="h-20 w-20" />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
            Career Journey
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
            Welcome to Wealth Management
          </h1>
          
          <p className="text-green-600/80 text-lg max-w-2xl mx-auto">
            Help individuals and families build, protect, and grow their wealth. 
            Experience a day in the life and simulate your 5-year career journey!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-green-200 bg-white/80">
              <CardContent className="p-3 text-center">
                <div className="flex justify-center mb-1 text-emerald-600">
                  {stat.icon}
                </div>
                <p className="text-xs text-green-600/70">{stat.label}</p>
                <p className="font-bold text-green-800">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Career Highlights Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-4 text-center">
            What Wealth Managers Do
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerHighlights.map((highlight, index) => (
              <Card 
                key={index} 
                className="border-green-200 bg-white/90 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {highlight.icon}
                    <h3 className="font-semibold text-green-800">{highlight.title}</h3>
                  </div>
                  <p className="text-sm text-green-600/80">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What You'll Learn */}
        <Card className="border-green-200 bg-gradient-to-r from-emerald-50 to-green-50 mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-emerald-600" />
              What You'll Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-green-800">A Day in the Life</p>
                  <p className="text-sm text-green-600/70">Follow a wealth manager through their typical day</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-green-800">5-Year Career Simulation</p>
                  <p className="text-sm text-green-600/70">Make decisions that shape your career path</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-green-800">Real-World Scenarios</p>
                  <p className="text-sm text-green-600/70">Handle client situations and market events</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold">4</span>
                </div>
                <div>
                  <p className="font-medium text-green-800">Balance Trade-offs</p>
                  <p className="text-sm text-green-600/70">Manage salary, skills, and work-life balance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phil's Message */}
        <div className="bg-white/80 rounded-xl border border-green-200 p-4 mb-8">
          <div className="flex items-start gap-3">
            <PandaLogo className="h-10 w-10 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800 mb-1">Phil says:</p>
              <p className="text-green-600/80 text-sm italic">
                "Wealth management is one of the most rewarding careers in finance! 
                You'll help real people achieve their dreams - from sending kids to college 
                to retiring comfortably. Ready to see if it's right for you? Let's explore together!"
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {hasExistingProgress && onResume && (
            <Button
              onClick={onResume}
              variant="outline"
              size="lg"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Continue Journey
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          )}
          
          <Button
            onClick={onStart}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {hasExistingProgress ? 'Start New Journey' : 'Start Your Journey'}
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
        
        <p className="text-center text-xs text-green-600/60 mt-4">
          Earn up to 500 bamboo and 1000 XP by completing the journey!
        </p>
      </div>
    </div>
  );
};

export default WealthManagementOverview;
