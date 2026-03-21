
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

interface StoryChapterProps {
  chapter: any;
  chapterIndex: number;
}

const StoryChapter: React.FC<StoryChapterProps> = ({ chapter, chapterIndex }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="border-emerald-200">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-emerald-100 text-emerald-800">
            Chapter {chapterIndex + 1}
          </Badge>
          <h3 className={`font-bold text-emerald-800 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {chapter.title}
          </h3>
        </div>
        
        <div className="space-y-4">
          {chapter.content.map((paragraph: string, idx: number) => (
            <p key={idx} className={`text-muted-foreground leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryChapter;
