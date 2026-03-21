import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Lightbulb, Trophy, Upload, TrendingUp, X, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AdaptiveLearningTutorialProps {
  onComplete: () => void;
  onClose: () => void;
}

const AdaptiveLearningTutorial: React.FC<AdaptiveLearningTutorialProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro' | null>(null);
  const { user } = useAuth();
  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    // Celebrate completion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Save completion to localStorage
    localStorage.setItem('adaptive_learning_tutorial_completed', 'true');

    // Save to Supabase if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            adaptive_learning_tutorial_completed: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) {
          console.error('Error saving tutorial completion:', error);
        }
      } catch (err) {
        console.error('Error updating profile:', err);
      }
    }

    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Brain className="h-24 w-24 text-primary animate-scale-in" />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Welcome to Adaptive Learning! 🎓</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Master financial terms with AI-powered flashcards that adapt to YOUR learning style
              </p>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">
                  The more you study, the smarter the system gets at teaching you!
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-3">How Adaptive Learning Works</h2>
              <p className="text-muted-foreground">
                The system tracks what you know and focuses on what you need to learn
              </p>
            </div>
            <div className="grid gap-4">
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge className="bg-purple-500 text-white text-lg px-4 py-2">🆕</Badge>
                  <div>
                    <h3 className="font-semibold">New Cards</h3>
                    <p className="text-sm text-muted-foreground">First time seeing this term</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge className="bg-red-500 text-white text-lg px-4 py-2">😕</Badge>
                  <div>
                    <h3 className="font-semibold">Unsure</h3>
                    <p className="text-sm text-muted-foreground">Card comes back sooner for review</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge className="bg-yellow-500 text-white text-lg px-4 py-2">📚</Badge>
                  <div>
                    <h3 className="font-semibold">Still Learning</h3>
                    <p className="text-sm text-muted-foreground">Card comes back later for practice</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge className="bg-green-500 text-white text-lg px-4 py-2">✅</Badge>
                  <div>
                    <h3 className="font-semibold">Mastered</h3>
                    <p className="text-sm text-muted-foreground">Card graduates - won't show again!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-3">Pick Your Level</h2>
              <p className="text-muted-foreground">
                Each level has 15 carefully curated financial terms
              </p>
            </div>
            <div className="grid gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLevel === 'beginner' ? 'border-2 border-green-500 bg-green-50' : 'border-2'
                }`}
                onClick={() => setSelectedLevel('beginner')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      🟢 Beginner
                      {selectedLevel === 'beginner' && <Badge className="bg-green-500">Selected</Badge>}
                    </h3>
                    <Badge variant="outline">15 terms</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Basic financial literacy</p>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Preview:</p>
                    <p className="text-muted-foreground">Stock, Bond, Dividend, Budget, Credit Score...</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLevel === 'intermediate' ? 'border-2 border-yellow-500 bg-yellow-50' : 'border-2'
                }`}
                onClick={() => setSelectedLevel('intermediate')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      🟡 Intermediate
                      {selectedLevel === 'intermediate' && <Badge className="bg-yellow-500">Selected</Badge>}
                    </h3>
                    <Badge variant="outline">15 terms</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Advanced concepts</p>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Preview:</p>
                    <p className="text-muted-foreground">P/E Ratio, Market Cap, Valuation, 401(k)...</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLevel === 'pro' ? 'border-2 border-red-500 bg-red-50' : 'border-2'
                }`}
                onClick={() => setSelectedLevel('pro')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      🔴 Pro
                      {selectedLevel === 'pro' && <Badge className="bg-red-500">Selected</Badge>}
                    </h3>
                    <Badge variant="outline">15 terms</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Expert knowledge</p>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Preview:</p>
                    <p className="text-muted-foreground">DCF Model, WACC, EBITDA, IRR, ESG...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-3">Study Your First Card</h2>
              <p className="text-muted-foreground">
                Click to flip, mark your mastery, and keep learning!
              </p>
            </div>
            
            {/* Demo Flashcard */}
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-primary">Stock</h3>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-lg">A share of ownership in a company</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Phil's Example</span>
                    </div>
                    <p className="text-sm text-yellow-700 italic">
                      Like owning a slice of pizza from the whole pizza! The more slices you have, the bigger your share.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="text-xs bg-red-50 border-red-200" disabled>
                      😕 Unsure
                    </Button>
                    <Button variant="outline" className="text-xs bg-yellow-50 border-yellow-200" disabled>
                      📚 Still Learning
                    </Button>
                    <Button variant="outline" className="text-xs bg-green-50 border-green-200" disabled>
                      ✅ Mastered It
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">Great! Let's try another! 🎉</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Upload className="h-20 w-20 text-primary" />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Add Your Own Cards</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Want to study something specific? Create your own flashcards!
              </p>
            </div>
            
            <div className="grid gap-4">
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6 flex items-center gap-4">
                  <BookOpen className="h-10 w-10 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Create Individual Cards</h3>
                    <p className="text-sm text-muted-foreground">Add terms one at a time</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200">
                <CardContent className="p-6 flex items-center gap-4">
                  <Upload className="h-10 w-10 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Upload CSV File</h3>
                    <p className="text-sm text-muted-foreground">Bulk upload from spreadsheets</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                💡 Add terms from class, textbooks, or anything you want to learn!
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Trophy className="h-24 w-24 text-yellow-500 animate-scale-in" />
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Track Your Progress</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch your knowledge grow with detailed stats!
              </p>
            </div>
            
            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Cards Mastered</span>
                  <Badge className="bg-emerald-500">12/15</Badge>
                </div>
                <Progress value={80} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">80%</div>
                    <div className="text-sm text-muted-foreground">Overall Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">7</div>
                    <div className="text-sm text-muted-foreground">Day Streak 🔥</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
              <p className="text-yellow-800 font-medium">
                📅 Study daily to build streaks and master more terms!
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="text-2xl font-bold text-primary">Tutorial Rewards 🎁</div>
              <div className="flex justify-center gap-4">
                <Badge className="bg-blue-500 text-lg px-4 py-2">+150 XP</Badge>
                <Badge className="bg-purple-500 text-lg px-4 py-2">🏆 Study Master</Badge>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (currentStep === 3 && !selectedLevel) {
      return false;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">Adaptive Learning Tutorial</CardTitle>
              <CardDescription>
                Step {currentStep} of {totalSteps}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90"
            >
              {currentStep === totalSteps ? 'Start Learning! 🚀' : 'Next'}
              {currentStep < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveLearningTutorial;
