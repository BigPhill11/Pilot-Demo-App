/**
 * QuizzesSection - Topic selection and quiz setup
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  Brain, 
  Flame,
  Trophy,
  Zap,
  Timer,
  Target
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import QuizGame from './quizzes/QuizGame';

// Personal Finance modules for topic selection
const QUIZ_TOPICS = [
  { id: 'all', name: 'All Topics', icon: '🎯', description: 'Mixed questions from all modules' },
  { id: 'income', name: 'Income', icon: '💰', description: 'Active income and earning basics' },
  { id: 'financial-planning', name: 'Financial Planning', icon: '📊', description: 'Budgeting and goal setting' },
  { id: 'saving', name: 'Saving', icon: '🏦', description: 'Building your safety net' },
  { id: 'investing', name: 'Investing', icon: '📈', description: 'Growing your wealth' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️', description: 'Protecting your assets' },
  { id: 'taxes', name: 'Taxes', icon: '📋', description: 'Understanding tax basics' },
  { id: 'credit-debt', name: 'Credit & Debt', icon: '💳', description: 'Managing credit wisely' },
  { id: 'career-income', name: 'Career Strategy', icon: '🚀', description: 'Growing your income' },
  { id: 'wealth-fundamentals', name: 'Wealth Fundamentals', icon: '💎', description: 'Building lasting wealth' },
];

type Difficulty = 'easy' | 'medium' | 'hard';

interface QuizzesSectionProps {
  onBack: () => void;
}

interface TopicMastery {
  [topicId: string]: {
    attempted: number;
    correct: number;
    bestStreak: number;
  };
}

const QuizzesSection: React.FC<QuizzesSectionProps> = ({ onBack }) => {
  const isMobile = useIsMobile();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [isPlaying, setIsPlaying] = useState(false);
  const [topicMastery, setTopicMastery] = useState<TopicMastery>({});
  const [overallStreak, setOverallStreak] = useState(0);

  // Load mastery data
  useEffect(() => {
    const saved = localStorage.getItem('quiz_topic_mastery');
    if (saved) {
      setTopicMastery(JSON.parse(saved));
    }
    const streak = localStorage.getItem('quiz_overall_streak');
    if (streak) {
      setOverallStreak(parseInt(streak, 10));
    }
  }, []);

  const getMasteryPercentage = (topicId: string): number => {
    const mastery = topicMastery[topicId];
    if (!mastery || mastery.attempted === 0) return 0;
    return Math.round((mastery.correct / mastery.attempted) * 100);
  };

  const handleStartQuiz = () => {
    if (selectedTopic) {
      setIsPlaying(true);
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number, streak: number) => {
    // Update mastery
    const topicId = selectedTopic || 'all';
    const newMastery = { ...topicMastery };
    if (!newMastery[topicId]) {
      newMastery[topicId] = { attempted: 0, correct: 0, bestStreak: 0 };
    }
    newMastery[topicId].attempted += totalQuestions;
    newMastery[topicId].correct += score;
    newMastery[topicId].bestStreak = Math.max(newMastery[topicId].bestStreak, streak);
    
    setTopicMastery(newMastery);
    localStorage.setItem('quiz_topic_mastery', JSON.stringify(newMastery));
    
    // Update overall streak
    if (streak > overallStreak) {
      setOverallStreak(streak);
      localStorage.setItem('quiz_overall_streak', streak.toString());
    }
    
    setIsPlaying(false);
    setSelectedTopic(null);
  };

  const difficultyConfig: Record<Difficulty, { label: string; options: number; timer: boolean; color: string }> = {
    easy: { label: 'Easy', options: 4, timer: false, color: 'bg-green-500' },
    medium: { label: 'Medium', options: 5, timer: false, color: 'bg-yellow-500' },
    hard: { label: 'Hard', options: 6, timer: true, color: 'bg-red-500' }
  };

  if (isPlaying && selectedTopic) {
    return (
      <QuizGame
        topicId={selectedTopic}
        difficulty={selectedDifficulty}
        onComplete={handleQuizComplete}
        onBack={() => setIsPlaying(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Financial Quizzes
          </h3>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Flame className="h-3 w-3 text-orange-500" />
          Best Streak: {overallStreak}x
        </Badge>
      </div>

      {/* Difficulty Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4" />
            Select Difficulty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(difficultyConfig) as Difficulty[]).map((diff) => {
              const config = difficultyConfig[diff];
              return (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(diff)}
                  className="flex-1 min-w-[80px]"
                >
                  <span className={`w-2 h-2 rounded-full ${config.color} mr-2`} />
                  {config.label}
                  {config.timer && <Timer className="h-3 w-3 ml-1" />}
                </Button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {selectedDifficulty === 'easy' && '4 answer options, no timer - perfect for learning'}
            {selectedDifficulty === 'medium' && '5 answer options, no timer - balanced challenge'}
            {selectedDifficulty === 'hard' && '6 answer options with 15s timer - expert mode!'}
          </p>
        </CardContent>
      </Card>

      {/* Topic Selection */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          Choose a Topic
        </h4>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
          {QUIZ_TOPICS.map((topic) => {
            const mastery = getMasteryPercentage(topic.id);
            const isSelected = selectedTopic === topic.id;
            
            return (
              <Card
                key={topic.id}
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold">{topic.name}</h5>
                      <p className="text-xs text-muted-foreground truncate">{topic.description}</p>
                      {mastery > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Mastery</span>
                            <span className="font-medium">{mastery}%</span>
                          </div>
                          <Progress value={mastery} className="h-1.5" />
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <Button 
        className="w-full h-14 text-lg"
        size="lg"
        disabled={!selectedTopic}
        onClick={handleStartQuiz}
      >
        <Trophy className="h-5 w-5 mr-2" />
        Start Quiz
        {selectedTopic && (
          <Badge variant="secondary" className="ml-2">
            +5 🎋 per correct
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default QuizzesSection;
