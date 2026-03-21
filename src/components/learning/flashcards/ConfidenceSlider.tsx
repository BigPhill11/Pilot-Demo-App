import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ConfidenceSliderProps {
  onSubmit: (confidence: number) => void;
  disabled?: boolean;
}

export const ConfidenceSlider = ({ onSubmit, disabled = false }: ConfidenceSliderProps) => {
  const [selectedConfidence, setSelectedConfidence] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedConfidence !== null) {
      onSubmit(selectedConfidence);
      setSelectedConfidence(null);
      setHoveredStar(null);
    }
  };

  const getConfidenceLabel = (confidence: number) => {
    switch (confidence) {
      case 1: return "Not Sure";
      case 2: return "Somewhat";
      case 3: return "Confident";
      case 4: return "Very Confident";
      case 5: return "Mastered!";
      default: return "";
    }
  };

  const displayConfidence = hoveredStar ?? selectedConfidence;

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="text-center mb-3">
        <p className="text-sm font-medium mb-1">How confident are you?</p>
        <p className="text-xs text-muted-foreground">
          This helps us show you cards at the right time
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={disabled}
            onClick={() => setSelectedConfidence(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            className="transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star
              className={`h-8 w-8 transition-colors ${
                (hoveredStar ?? selectedConfidence ?? 0) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          </button>
        ))}
      </div>

      {displayConfidence && (
        <p className="text-center text-sm font-medium text-primary mb-3 animate-fade-in">
          {getConfidenceLabel(displayConfidence)}
        </p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={disabled || selectedConfidence === null}
        className="w-full"
      >
        Submit Rating
      </Button>
    </Card>
  );
};
