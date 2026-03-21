import { Badge } from "@/components/ui/badge";
import { Award, Star } from "lucide-react";
import { MASTERY_TIERS } from "@/types/flashcard-gamification";

interface MasteryBadgeProps {
  tier: keyof typeof MASTERY_TIERS;
  correctCount: number;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}

export const MasteryBadge = ({ 
  tier, 
  correctCount, 
  size = "md",
  showProgress = false 
}: MasteryBadgeProps) => {
  const tierData = MASTERY_TIERS[tier];
  const nextTier = getNextTier(tier);
  const progress = nextTier ? (correctCount / MASTERY_TIERS[nextTier].minCorrect) * 100 : 100;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className="flex flex-col gap-1">
      <Badge 
        variant="secondary" 
        className={`${sizeClasses[size]} ${tierData.color} font-semibold flex items-center gap-1`}
      >
        {tier === 'diamond' ? (
          <Star className={iconSizes[size]} fill="currentColor" />
        ) : (
          <Award className={iconSizes[size]} />
        )}
        {tierData.name}
        <span className="text-xs opacity-70">×{tierData.xpMultiplier}</span>
      </Badge>
      
      {showProgress && nextTier && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div 
              className={`h-full ${tierData.color} bg-current transition-all duration-300`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span>{correctCount}/{MASTERY_TIERS[nextTier].minCorrect}</span>
        </div>
      )}
    </div>
  );
};

function getNextTier(currentTier: keyof typeof MASTERY_TIERS): keyof typeof MASTERY_TIERS | null {
  const tiers: (keyof typeof MASTERY_TIERS)[] = ['new', 'bronze', 'silver', 'gold', 'diamond'];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
}
