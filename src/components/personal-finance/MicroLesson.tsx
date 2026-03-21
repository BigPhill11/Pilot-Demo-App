import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MicroLessonProps {
  content: string;
  onComplete: () => void;
}

const MicroLesson: React.FC<MicroLessonProps> = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const paragraphs = content.split('\n\n');

  useEffect(() => {
    // Animate text appearance
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= content.length) {
        setDisplayedContent(content.slice(0, currentIndex));
        currentIndex += 3; // Speed of text reveal
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [content]);

  const handleSkip = () => {
    setDisplayedContent(content);
    setIsComplete(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-primary">
        <BookOpen className="w-5 h-5" />
        <h2 className="font-semibold">Micro-Lesson</h2>
      </div>

      <div className="bg-card border rounded-xl p-6 min-h-[300px]">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {paragraphs.map((paragraph, index) => {
            const paragraphStart = content.indexOf(paragraph);
            const paragraphEnd = paragraphStart + paragraph.length;
            const visiblePortion = displayedContent.length >= paragraphEnd
              ? paragraph
              : displayedContent.length > paragraphStart
              ? paragraph.slice(0, displayedContent.length - paragraphStart)
              : '';

            return (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: visiblePortion ? 1 : 0.3 }}
                className="mb-4 leading-relaxed"
              >
                {visiblePortion || paragraph}
                {!isComplete && displayedContent.length > paragraphStart && displayedContent.length < paragraphEnd && (
                  <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5" />
                )}
              </motion.p>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        {!isComplete && (
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Skip Animation
          </Button>
        )}
        <Button 
          onClick={onComplete} 
          disabled={!isComplete}
          className={isComplete ? "w-full" : "flex-1"}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default MicroLesson;
