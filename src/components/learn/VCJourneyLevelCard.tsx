import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, Play, BookOpen, Gamepad2, HelpCircle, FileText, Star, TrendingUp } from 'lucide-react';
import { VCLevel } from '@/data/venture-capital-journey-data';

interface VCJourneyLevelCardProps {
  level: VCLevel;
  isCompleted: boolean;
  isUnlocked: boolean;
  onClick: () => void;
}

const VCJourneyLevelCard: React.FC<VCJourneyLevelCardProps> = ({
  level,
  isCompleted,
  isUnlocked,
  onClick
}) => {
  const getButtonText = () => {
    if (isCompleted) return "Review Level";
    if (isUnlocked) return "Start Level";
    return "Locked";
  };

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (isUnlocked) return <Play className="h-5 w-5 text-primary" />;
    return <Lock className="h-5 w-5 text-muted-foreground" />;
  };

  const getGradientColors = () => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600', 
      'from-orange-500 to-red-600',
      'from-purple-500 to-pink-600',
      'from-teal-500 to-blue-600',
      'from-indigo-500 to-purple-600',
      'from-rose-500 to-pink-600'
    ];
    return gradients[level.id - 1] || gradients[0];
  };

  return (
    <Card 
      className={`transition-all duration-300 group ${
        isUnlocked 
          ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.02] border-transparent bg-gradient-to-br from-white to-gray-50' 
          : 'opacity-60 cursor-not-allowed bg-gray-50'
      } ${isCompleted ? 'ring-2 ring-green-400 shadow-lg' : ''}`}
      onClick={isUnlocked ? onClick : undefined}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${getGradientColors()} rounded-t-lg`} />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge 
              variant={isCompleted ? "default" : "outline"} 
              className={`text-sm px-4 py-2 ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : `bg-gradient-to-r ${getGradientColors()} text-white`
              }`}
            >
              Level {level.id}
            </Badge>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              {isCompleted && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
            </div>
          </div>
          {isUnlocked && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {level.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-6 line-clamp-2">
          {level.overview.split('.')[0]}.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-800">{level.flashcards.length}</div>
              <div className="text-xs text-blue-600">Terms</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <Gamepad2 className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-semibold text-green-800">{level.miniGames.length}</div>
              <div className="text-xs text-green-600">Games</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <HelpCircle className="h-5 w-5 text-purple-600" />
            <div>
              <div className="font-semibold text-purple-800">{level.quiz.length}</div>
              <div className="text-xs text-purple-600">Questions</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <FileText className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-semibold text-orange-800">{level.activities.length}</div>
              <div className="text-xs text-orange-600">Activities</div>
            </div>
          </div>
        </div>
        
        <Button 
          variant={isCompleted ? "outline" : "default"}
          className={`w-full font-semibold ${
            isCompleted 
              ? 'border-green-300 text-green-700 hover:bg-green-50' 
              : isUnlocked
              ? `bg-gradient-to-r ${getGradientColors()} hover:opacity-90 text-white border-0`
              : ''
          }`}
          disabled={!isUnlocked}
        >
          {getButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VCJourneyLevelCard;