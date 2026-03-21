
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import TermHighlighter from './TermHighlighter';

interface HeadlineCardProps {
  headline: {
    id?: string;
    title: string;
    summary: string;
    tldr?: string;
    url?: string;
  };
  userLevel: string;
  onHeadlineClick: (headline: any) => void;
}

const getComplexityDescription = (level: string) => {
  switch (level) {
    case 'beginner': return '(9th grade level)';
    case 'intermediate': return '(12th grade level)';
    case 'advanced': return '(Finance professional level)';
    default: return '';
  }
};

const HeadlineCard: React.FC<HeadlineCardProps> = ({ headline, userLevel, onHeadlineClick }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">
          <TermHighlighter text={headline.title} userLevel={userLevel} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <CardDescription className="text-sm leading-relaxed">
          <TermHighlighter text={headline.summary} userLevel={userLevel} />
        </CardDescription>
        
        {headline.tldr && (
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p className="text-xs font-semibold text-green-700 mb-1">
              TL;DR {getComplexityDescription(userLevel)}
            </p>
            <p className="text-sm text-green-600">
              <TermHighlighter text={headline.tldr} userLevel={userLevel} />
            </p>
          </div>
        )}
        
        {headline.url && headline.url !== "#" && (
          <Button 
            onClick={() => onHeadlineClick(headline)}
            variant="outline" 
            size="sm" 
            className="w-full mt-4 border-green-600 text-green-600 hover:bg-green-50"
          >
            Read Full Article
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
