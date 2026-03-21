
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Video, 
  Star, 
  Search, 
  Filter,
  BookOpen,
  TrendingUp,
  Brain,
  Building,
  Scroll
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import TradingVideoList from './TradingVideoList';
import VideoSubmissionForm from './VideoSubmissionForm';
import PhilAdventures from './PhilAdventures';
import { useIsMobile } from '@/hooks/use-mobile';

const TradingAcademy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const isMobile = useIsMobile();

  const categories = [
    { value: 'all', label: 'All Topics', icon: BookOpen },
    { value: 'company-analysis', label: 'Reading Companies', icon: Building },
    { value: 'market-psychology', label: 'Market Psychology', icon: Brain },
    { value: 'forecasting', label: 'Forecasting', icon: TrendingUp },
    { value: 'general', label: 'General', icon: GraduationCap }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Phil */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center gap-4">
            <PandaLogo className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`} />
            <div>
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-emerald-800 mb-2`}>
                Welcome to Phil's Trading Academy! 🎓
              </h2>
              <p className={`text-emerald-700 ${isMobile ? 'text-sm' : ''}`}>
                Learn trading and investing with videos from professionals and interactive stories with Phil the panda! 
                Watch, learn, rate content, and follow Phil's adventures in the bamboo forest of finance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className={`grid w-full grid-cols-3 bg-emerald-50 border border-emerald-200 ${isMobile ? 'h-auto' : ''}`}>
          <TabsTrigger 
            value="videos" 
            className={`data-[state=active]:bg-emerald-500 data-[state=active]:text-white ${isMobile ? 'text-sm py-3' : ''}`}
          >
            <Video className="mr-2 h-4 w-4" />
            {isMobile ? 'Videos' : 'Watch Videos'}
          </TabsTrigger>
          <TabsTrigger 
            value="adventures" 
            className={`data-[state=active]:bg-emerald-500 data-[state=active]:text-white ${isMobile ? 'text-sm py-3' : ''}`}
          >
            <Scroll className="mr-2 h-4 w-4" />
            {isMobile ? 'Stories' : "Phil's Adventures"}
          </TabsTrigger>
          <TabsTrigger 
            value="submit" 
            className={`data-[state=active]:bg-emerald-500 data-[state=active]:text-white ${isMobile ? 'text-sm py-3' : ''}`}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            {isMobile ? 'Submit' : 'Submit Video'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-700 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Your Perfect Learning Path
              </CardTitle>
              <CardDescription>
                Search and filter videos by topic and difficulty level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`${isMobile ? 'space-y-4' : 'flex gap-4'}`}>
                <div className="flex-1">
                  <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400"
                  />
                </div>
                <div className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'flex gap-2'}`}>
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`px-3 py-2 border border-emerald-200 rounded-md focus:border-emerald-400 ${isMobile ? 'text-sm' : ''}`}
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  
                  {/* Difficulty Filter */}
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className={`px-3 py-2 border border-emerald-200 rounded-md focus:border-emerald-400 ${isMobile ? 'text-sm' : ''}`}
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Paths */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 mb-6`}>
            {categories.slice(1).map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.value}
                  className="border-emerald-200 hover:border-emerald-400 cursor-pointer transition-colors"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                    <IconComponent className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} mx-auto mb-3 text-emerald-600`} />
                    <h3 className={`font-semibold text-emerald-800 ${isMobile ? 'text-sm' : ''} mb-2`}>
                      {category.label}
                    </h3>
                    <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {category.value === 'company-analysis' && "Learn to read companies like Phil reads bamboo - breaking down assets, liabilities, and financial health with fun analogies!"}
                      {category.value === 'market-psychology' && "Understand what makes stocks bullish vs bearish, market sentiment, and investor psychology."}
                      {category.value === 'forecasting' && "Master the art of predicting future growth, analyzing trends, and making informed investment decisions."}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Video List */}
          <TradingVideoList 
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
          />
        </TabsContent>

        <TabsContent value="adventures" className="space-y-6">
          <PhilAdventures />
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <VideoSubmissionForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingAcademy;
