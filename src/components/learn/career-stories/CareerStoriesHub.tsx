import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { careerStories as allCareerStories } from '@/data/career-stories';
import CareerStoryReader from './CareerStoryReader';
import { Clock, TrendingUp, Star } from 'lucide-react';
import { CareerStory } from '@/types/career-story';

interface CareerStoriesHubProps {
  stories?: CareerStory[];
  careerName?: string;
}

const CareerStoriesHub: React.FC<CareerStoriesHubProps> = ({ 
  stories = allCareerStories, 
  careerName 
}) => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  if (selectedStory) {
    const story = stories.find(s => s.id === selectedStory);
    if (!story) return null;
    
    return (
      <CareerStoryReader
        story={story}
        onBack={() => setSelectedStory(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          {careerName ? `${careerName} Stories` : 'Interactive Career Stories'}
        </h2>
        <p className="text-muted-foreground">
          Experience real career scenarios through choose-your-own-adventure stories.
          Make decisions, see consequences, and learn what it really takes to succeed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => {
          const Icon = story.icon;
          const progress = localStorage.getItem(`story-progress-${story.id}`);
          const savedProgress = progress ? JSON.parse(progress) : null;
          
          return (
            <Card key={story.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{story.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {story.difficulty}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {story.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{story.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{story.chapters.length} chapters</span>
                </div>
              </div>

              {savedProgress?.completed && (
                <div className="flex items-center gap-1 mb-4 text-yellow-500">
                  {[...Array(savedProgress.starsEarned || 0)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              )}

              <Button 
                onClick={() => setSelectedStory(story.id)}
                className="w-full"
                variant={savedProgress?.completed ? "outline" : "default"}
              >
                {savedProgress?.completed ? 'Play Again' : savedProgress ? 'Continue' : 'Start Story'}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CareerStoriesHub;
