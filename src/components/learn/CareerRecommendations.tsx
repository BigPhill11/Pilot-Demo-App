import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Sparkles } from 'lucide-react';
import { FinanceCareerData } from '@/data/finance-careers';
import { useIsMobile } from '@/hooks/use-mobile';

interface CareerRecommendationsProps {
  recommendations: { careerId: string; score: number }[];
  careers: FinanceCareerData[];
  onSelectCareer: (career: FinanceCareerData) => void;
}

const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({
  recommendations,
  careers,
  onSelectCareer
}) => {
  const isMobile = useIsMobile();
  
  // Get top 3 recommendations
  const topRecommendations = recommendations.slice(0, 3);
  
  const getCareerById = (id: string) => careers.find(c => c.id === id);
  
  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Star className="h-5 w-5 text-gray-400" />;
    return <Sparkles className="h-5 w-5 text-orange-600" />;
  };
  
  const getMedalLabel = (index: number) => {
    if (index === 0) return 'Best Match!';
    if (index === 1) return 'Great Fit!';
    return 'Good Match!';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent`}>
          Your Perfect Finance Careers! 🎉
        </h2>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground max-w-2xl mx-auto`}>
          Based on your answers, here are the careers that match your interests and personality best!
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {topRecommendations.map((rec, index) => {
          const career = getCareerById(rec.careerId);
          if (!career) return null;

          return (
            <Card
              key={career.id}
              className={`cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] border-2 ${
                index === 0 ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20' :
                index === 1 ? 'border-gray-400 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20' :
                'border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'
              }`}
              onClick={() => onSelectCareer(career)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${career.color}`}>
                      <career.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} mb-1`}>
                        {career.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {getMedalIcon(index)}
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold`}>
                          {getMedalLabel(index)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {rec.score} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className={`${isMobile ? 'text-sm' : 'text-base'} mb-3`}>
                  {career.kidFriendlyDescription}
                </CardDescription>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  {career.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
          💡 Click on any career to explore it in detail!
        </p>
      </div>
    </div>
  );
};

export default CareerRecommendations;
