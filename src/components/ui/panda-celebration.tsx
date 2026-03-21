import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Award } from 'lucide-react';

interface PandaCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
  moduleTitle: string;
  score?: number;
  achievements?: string[];
}

export const PandaCelebration: React.FC<PandaCelebrationProps> = ({
  isVisible,
  onClose,
  moduleTitle,
  score,
  achievements = []
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase(0);
      const timer1 = setTimeout(() => setAnimationPhase(1), 500);
      const timer2 = setTimeout(() => setAnimationPhase(2), 1500);
      const timer3 = setTimeout(() => setAnimationPhase(3), 2500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-md w-full bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Panda Animation */}
          <div className="relative">
            <div className={`text-8xl transition-all duration-1000 ${
              animationPhase >= 0 ? 'animate-bounce' : 'scale-0'
            }`}>
              🐼
            </div>
            
            {/* Floating emojis */}
            {animationPhase >= 1 && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-4 -left-4 text-2xl animate-ping">🎉</div>
                <div className="absolute -top-4 -right-4 text-2xl animate-ping" style={{ animationDelay: '0.2s' }}>✨</div>
                <div className="absolute -bottom-4 -left-4 text-2xl animate-ping" style={{ animationDelay: '0.4s' }}>🎊</div>
                <div className="absolute -bottom-4 -right-4 text-2xl animate-ping" style={{ animationDelay: '0.6s' }}>🌟</div>
              </div>
            )}
          </div>

          {/* Success Message */}
          <div className={`space-y-3 transition-all duration-1000 ${
            animationPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-green-800">Module Complete!</h2>
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            
            <p className="text-green-700 font-semibold text-lg">
              {moduleTitle}
            </p>
            
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-6 w-6 transition-all duration-300 ${
                    animationPhase >= 2 ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-300'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Score and Achievements */}
          {animationPhase >= 2 && (
            <div className="space-y-4 animate-fade-in">
              {score !== undefined && (
                <div className="bg-white/50 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="text-lg font-semibold text-gray-700">
                      Your Score: <span className="text-2xl text-purple-600 font-bold">{score}</span> points
                    </span>
                  </div>
                </div>
              )}
              
              {achievements.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-yellow-800 flex items-center justify-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>New Achievements!</span>
                  </h3>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-sm text-yellow-700 bg-yellow-100 rounded px-3 py-1">
                      🏆 {achievement}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Motivational Message */}
          {animationPhase >= 3 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 animate-scale-in">
              <p className="text-sm text-gray-600 italic">
                "Great job! Keep building those professional skills! 🚀"
              </p>
              <p className="text-xs text-gray-500 mt-1">- Phil the Panda</p>
            </div>
          )}

          {/* Close Button */}
          <Button 
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Continue Learning! 🎯
          </Button>
        </CardContent>
      </Card>
      
      {/* Background particles */}
      {animationPhase >= 1 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              {['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};