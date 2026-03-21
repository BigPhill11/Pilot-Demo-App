
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Brain, TrendingUp, Info, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InteractiveIndustryJourney from './InteractiveIndustryJourney';
import type { IndustryJourneyData } from '@/data/industry-journeys';

const IndustryJourney = ({ journey, onBack }: { journey: IndustryJourneyData; onBack: () => void; }) => {
  const [currentView, setCurrentView] = useState<'overview' | 'interactive'>('overview');

  if (currentView === 'interactive') {
    return (
      <InteractiveIndustryJourney 
        journey={journey} 
        onBack={() => setCurrentView('overview')}
      />
    );
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Industries
      </Button>
      
      <header className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-2">
          <journey.icon className='h-10 w-10 text-primary' />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{journey.name || journey.title}</h2>
        </div>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore this industry's fundamentals, operations, and future outlook.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Industry Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Industry Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{journey.overview || journey.description}</p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{journey.howItWorks || 'Learn about the fundamental operations and business models in this industry.'}</p>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Future Outlook */}
      <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Brain className="h-5 w-5" />
            AI-Powered Future Outlook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 leading-relaxed font-medium">
            {journey.futureOutlook || 'This industry is poised for continued growth and innovation, driven by technological advances and changing consumer demands.'}
          </p>
        </CardContent>
      </Card>

      {/* Interactive Learning Journey CTA */}
      <Card className="mb-8 border-2 border-green-400 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Play className="h-5 w-5" />
            Interactive Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800 mb-4">
            Ready to dive deeper? Start your interactive learning journey with hands-on lessons, 
            real-world examples, and personalized difficulty levels tailored to your expertise.
          </p>
          <Button 
            onClick={() => setCurrentView('interactive')}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            Start Interactive Learning Journey
          </Button>
        </CardContent>
      </Card>

      {/* Career Learning Path Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Career Learning Path Preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            See what you'll learn in our interactive journey
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journey.levels.slice(0, 6).map((level) => (
              <div key={level.level || level.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-semibold mb-2">Level {level.level || level.id}: {level.focusArea || level.title}</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {(level.sampleTopics || level.keyTakeaways).slice(0, 3).map((topic, index) => (
                    <li key={index}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryJourney;
