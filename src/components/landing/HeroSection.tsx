
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

interface HeroSectionProps {
  onStartTutorial?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartTutorial }) => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo, Title & Slogan */}
        <div className="text-center mb-16">
          <PandaLogo className="h-32 w-32 mx-auto mb-6 animate-fade-in" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-green-700 mb-4">
            Phil's Financials
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-green-600 italic">
            Smart Futures, Start Here
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission</h2>
          <p className="text-lg text-green-600 leading-relaxed">
            Empowering you to explore finance through market literacy—transforming passive learning into active career and personal growth with accessible, gamified, and community-driven financial education.
          </p>
        </div>

        {/* Key Value Props - Fun Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Learn by Doing</h3>
            <p className="text-green-600">
              Interactive lessons with real market data—invest, analyze, and grow through actual financial scenarios.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Meet Phil's Friends</h3>
            <p className="text-green-600">
              Connect with real finance professionals as mentors—learn from those who've walked the path.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-green-700 mb-2">Build Your Future</h3>
            <p className="text-green-600">
              Explore high-barrier careers, develop critical thinking, and unlock job opportunities through gamified learning.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link to="/learn">
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={onStartTutorial}
          >
            Tutorial - Get familiar with the app <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
