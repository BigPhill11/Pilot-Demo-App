import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, ArrowRight, CheckCircle } from 'lucide-react';

interface LevelCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  nextLevelUnlocked: boolean;
  totalXP: number;
  onContinue?: () => void;
}

const LevelCompletionModal: React.FC<LevelCompletionModalProps> = ({
  isOpen,
  onClose,
  level,
  nextLevelUnlocked,
  totalXP,
  onContinue
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Level {level} Complete!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Congratulations!
                  </h3>
                  <p className="text-green-700 text-sm">
                    You've mastered all the concepts in Level {level} of Management Consulting
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="h-4 w-4" />
                      <span className="font-semibold">{totalXP}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">XP Earned</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Trophy className="h-4 w-4" />
                      <span className="font-semibold">100%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Progress</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {nextLevelUnlocked && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="text-center">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    🎉 Level {level + 1} Unlocked!
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Ready to tackle the next challenge in your consulting journey?
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Stay Here
            </Button>
            {nextLevelUnlocked && onContinue && (
              <Button onClick={onContinue} className="flex-1 flex items-center gap-2">
                Next Level
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelCompletionModal;