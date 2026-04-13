/**
 * Wealth Management Comic
 * 
 * Comic-based real-life example showing a day in the life
 * of a wealth manager, using Phil as the narrator.
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';
import ComicPanel from '@/components/comic/ComicPanel';
import { WM_COMIC_PANELS, getWMComicPanelCount } from '@/data/wealth-management/comic-panels';

interface WealthManagementComicProps {
  onComplete: () => void;
  onBack?: () => void;
}

const WealthManagementComic: React.FC<WealthManagementComicProps> = ({
  onComplete,
  onBack,
}) => {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const totalPanels = getWMComicPanelCount();
  const currentPanel = WM_COMIC_PANELS[currentPanelIndex];

  const handleNext = () => {
    if (currentPanelIndex < totalPanels - 1) {
      setCurrentPanelIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentPanelIndex > 0) {
      setCurrentPanelIndex(prev => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleSkipToEnd = () => {
    setCurrentPanelIndex(totalPanels - 1);
  };

  const handleDotClick = (index: number) => {
    if (index <= currentPanelIndex) {
      setCurrentPanelIndex(index);
    }
  };

  const isLastPanel = currentPanelIndex === totalPanels - 1;
  const isFirstPanel = currentPanelIndex === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-2 w-1.5 h-40 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-0 right-2 w-1.5 h-36 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge className="mb-2 bg-emerald-100 text-emerald-700 border-emerald-200">
            A Day in the Life
          </Badge>
          <h1 className="text-2xl font-bold text-green-800">
            Life as a Wealth Manager
          </h1>
          <p className="text-sm text-green-600/70 mt-1">
            Follow Sarah through her typical workday
          </p>
        </div>

        {/* Comic Panel */}
        <Card className="border-green-200 bg-white overflow-hidden mb-6">
          <ComicPanel
            imageUrl={currentPanel.imageUrl}
            imageFallbackUrl={currentPanel.imageFallbackUrl}
            caption={currentPanel.caption}
            speechBubble={{
              text: currentPanel.philDialogue,
              speaker: 'Phil',
            }}
            panelStyle={currentPanel.panelStyle || 'normal'}
          />
        </Card>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {WM_COMIC_PANELS.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={index > currentPanelIndex}
              className={`
                w-3 h-3 rounded-full transition-all
                ${index === currentPanelIndex 
                  ? 'bg-emerald-500 scale-110' 
                  : index < currentPanelIndex
                    ? 'bg-emerald-300 hover:bg-emerald-400 cursor-pointer'
                    : 'bg-gray-200 cursor-not-allowed'
                }
              `}
              aria-label={`Go to panel ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstPanel && !onBack}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {isFirstPanel ? 'Back' : 'Previous'}
          </Button>

          {!isLastPanel && (
            <Button
              variant="ghost"
              onClick={handleSkipToEnd}
              className="text-green-600/70 hover:text-green-700"
            >
              Skip to End
              <SkipForward className="h-4 w-4 ml-1" />
            </Button>
          )}

          <Button
            onClick={handleNext}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLastPanel ? 'Start Simulation' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Panel Counter */}
        <p className="text-center text-xs text-green-600/60 mt-4">
          Panel {currentPanelIndex + 1} of {totalPanels}
        </p>
      </div>
    </div>
  );
};

export default WealthManagementComic;
