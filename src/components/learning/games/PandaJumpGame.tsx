/**
 * PandaJumpGame - Vertical climbing game with questions and power-ups
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Heart,
  Shield,
  Zap,
  Rocket,
  Trophy,
  Mountain
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';
import { getAllUnifiedFlashcards, UnifiedFlashcard } from '@/data/unified-flashcards';
import PandaLogo from '@/components/icons/PandaLogo';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

type QuestionType = 'definitions' | 'scenarios' | 'truefalse' | 'mixed';

interface PowerUpInventory {
  shield: number;
  doubleJump: number;
  bambooBoost: number;
}

interface PandaJumpGameProps {
  questionType: QuestionType;
  onComplete: (altitude: number, earnedPowerUps: PowerUpInventory) => void;
  onBack: () => void;
  initialPowerUps: PowerUpInventory;
}

interface GameQuestion {
  type: 'definition' | 'scenario' | 'truefalse';
  question: string;
  options: string[];
  correctIndex: number;
}

// Scenario questions
const SCENARIOS = [
  {
    question: "You just got a $1,000 bonus. What's the wisest choice?",
    options: ["Buy new gadgets", "Pay off high-interest debt", "Gamble it to double it"],
    correctIndex: 1
  },
  {
    question: "Your emergency fund has $500. Your car needs $400 repair. What do you do?",
    options: ["Use a credit card", "Use emergency fund, rebuild after", "Ignore the problem"],
    correctIndex: 1
  },
  {
    question: "You're offered a promotion with 30% more pay but 50% more hours. What should you consider first?",
    options: ["Accept immediately", "Calculate hourly rate change", "Decline without thinking"],
    correctIndex: 1
  },
  {
    question: "Your friend wants to split a business with no contract. Best response?",
    options: ["Trust is enough", "Insist on written agreement", "Just give them money"],
    correctIndex: 1
  },
  {
    question: "Market dropped 20% and you have long-term investments. What's smart?",
    options: ["Sell everything now", "Stay calm and hold", "Panic and check hourly"],
    correctIndex: 1
  }
];

// True/False statements
const TRUE_FALSE = [
  { statement: "Compound interest works in your favor when saving", answer: true },
  { statement: "Credit cards always charge interest on purchases", answer: false },
  { statement: "An emergency fund should cover 3-6 months of expenses", answer: true },
  { statement: "The stock market has historically averaged around 10% annual returns", answer: true },
  { statement: "You should invest all your money in one stock for maximum gains", answer: false },
  { statement: "Paying minimum on credit cards is a good strategy", answer: false },
  { statement: "Diversification helps reduce investment risk", answer: true },
  { statement: "Roth IRA contributions are made with after-tax dollars", answer: true }
];

const PandaJumpGame: React.FC<PandaJumpGameProps> = ({ 
  questionType, 
  onComplete, 
  onBack,
  initialPowerUps 
}) => {
  const isMobile = useIsMobile();
  const { awardResources } = usePlatformIntegration();
  
  const [lives, setLives] = useState(3);
  const [altitude, setAltitude] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<GameQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [powerUps, setPowerUps] = useState<PowerUpInventory>(initialPowerUps);
  const [earnedPowerUps, setEarnedPowerUps] = useState<PowerUpInventory>({ shield: 0, doubleJump: 0, bambooBoost: 0 });
  const [shieldActive, setShieldActive] = useState(false);
  const [pandaState, setPandaState] = useState<'idle' | 'jump' | 'wobble' | 'fall'>('idle');
  const [flashcards, setFlashcards] = useState<UnifiedFlashcard[]>([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Load flashcards
  useEffect(() => {
    const cards = getAllUnifiedFlashcards().sort(() => Math.random() - 0.5);
    setFlashcards(cards);
    generateQuestion(cards);
  }, []);

  const generateQuestion = useCallback((cards: UnifiedFlashcard[]) => {
    let type: 'definition' | 'scenario' | 'truefalse';
    
    if (questionType === 'mixed') {
      const types: ('definition' | 'scenario' | 'truefalse')[] = ['definition', 'scenario', 'truefalse'];
      type = types[Math.floor(Math.random() * types.length)];
    } else if (questionType === 'definitions') {
      type = 'definition';
    } else if (questionType === 'scenarios') {
      type = 'scenario';
    } else {
      type = 'truefalse';
    }

    if (type === 'definition' && cards.length > 0) {
      const card = cards[questionsAnswered % cards.length];
      const wrongAnswers = cards
        .filter(c => c.id !== card.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.definition.length > 50 ? c.definition.slice(0, 50) + '...' : c.definition);
      
      const correctAnswer = card.definition.length > 50 ? card.definition.slice(0, 50) + '...' : card.definition;
      const options = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
      
      setCurrentQuestion({
        type: 'definition',
        question: `What is "${card.term}"?`,
        options,
        correctIndex: options.indexOf(correctAnswer)
      });
    } else if (type === 'scenario') {
      const scenario = SCENARIOS[questionsAnswered % SCENARIOS.length];
      setCurrentQuestion({
        type: 'scenario',
        question: scenario.question,
        options: scenario.options,
        correctIndex: scenario.correctIndex
      });
    } else {
      const tf = TRUE_FALSE[questionsAnswered % TRUE_FALSE.length];
      setCurrentQuestion({
        type: 'truefalse',
        question: tf.statement,
        options: ['True', 'False'],
        correctIndex: tf.answer ? 0 : 1
      });
    }
    
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [questionType, questionsAnswered]);

  const handleAnswer = (index: number) => {
    if (isAnswered || isGameOver) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    setQuestionsAnswered(prev => prev + 1);
    
    const isCorrect = index === currentQuestion?.correctIndex;
    
    if (isCorrect) {
      // Jump up!
      setPandaState('jump');
      const jumpHeight = 15 + Math.random() * 10;
      setAltitude(prev => prev + jumpHeight);
      
      // Random power-up chance (10%)
      if (Math.random() < 0.1) {
        const powerUpTypes = ['shield', 'doubleJump', 'bambooBoost'] as const;
        const earned = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        setPowerUps(prev => ({ ...prev, [earned]: prev[earned] + 1 }));
        setEarnedPowerUps(prev => ({ ...prev, [earned]: prev[earned] + 1 }));
      }
      
      setTimeout(() => setPandaState('idle'), 500);
    } else {
      // Wobble and lose heart
      setPandaState('wobble');
      
      if (shieldActive) {
        setShieldActive(false);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        
        if (newLives <= 0) {
          setTimeout(() => {
            setPandaState('fall');
            handleGameOver();
          }, 500);
        }
      }
      
      setTimeout(() => {
        if (lives > 1 || shieldActive) setPandaState('idle');
      }, 500);
    }
  };

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    
    // Calculate rewards: 1 bamboo per 10m, 1 XP per 25m
    const bambooEarned = Math.floor(altitude / 10);
    const xpEarned = Math.floor(altitude / 25);
    
    if (bambooEarned > 0 || xpEarned > 0) {
      awardResources(bambooEarned, xpEarned, 'panda_jump', true);
    }
    
    if (altitude >= 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [altitude, awardResources]);

  const handleNextQuestion = () => {
    generateQuestion(flashcards);
  };

  const usePowerUp = (type: keyof PowerUpInventory) => {
    if (powerUps[type] <= 0 || isGameOver) return;
    
    setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));
    
    if (type === 'shield') {
      setShieldActive(true);
    } else if (type === 'doubleJump') {
      // Skip question with altitude bonus
      setAltitude(prev => prev + 20);
      generateQuestion(flashcards);
    } else if (type === 'bambooBoost') {
      setAltitude(prev => prev + 50);
    }
  };

  const handleFinish = () => {
    onComplete(altitude, earnedPowerUps);
  };

  if (isGameOver) {
    const bambooEarned = Math.floor(altitude / 10);
    const xpEarned = Math.floor(altitude / 25);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <Card className="text-center py-8 overflow-hidden relative">
          {/* Background bamboo */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-8 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full"
                style={{ 
                  left: `${20 + i * 15}%`, 
                  bottom: 0, 
                  height: `${40 + i * 10}%` 
                }}
              />
            ))}
          </div>
          
          <CardContent className="relative z-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <PandaLogo className="h-20 w-20 mx-auto mb-4" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">
              {altitude >= 100 ? 'Amazing Climb!' : 'Game Over'}
            </h2>
            
            <div className="text-5xl font-bold my-4 flex items-center justify-center gap-2">
              <Mountain className="h-8 w-8" />
              {Math.round(altitude)}m
            </div>
            
            <p className="text-muted-foreground mb-6">
              You climbed {Math.round(altitude)} meters!
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-yellow-500">{bambooEarned}</div>
                <div className="text-xs text-muted-foreground">Bamboo</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-500">{xpEarned}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-500">{questionsAnswered}</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
            </div>
            
            {(earnedPowerUps.shield > 0 || earnedPowerUps.doubleJump > 0 || earnedPowerUps.bambooBoost > 0) && (
              <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg">
                <p className="text-sm font-semibold mb-2">Power-ups earned:</p>
                <div className="flex justify-center gap-3">
                  {earnedPowerUps.shield > 0 && (
                    <Badge variant="outline">+{earnedPowerUps.shield} Shield</Badge>
                  )}
                  {earnedPowerUps.doubleJump > 0 && (
                    <Badge variant="outline">+{earnedPowerUps.doubleJump} Skip</Badge>
                  )}
                  {earnedPowerUps.bambooBoost > 0 && (
                    <Badge variant="outline">+{earnedPowerUps.bambooBoost} Boost</Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Button className="w-full" size="lg" onClick={handleFinish}>
          Continue
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quit
        </Button>
        
        <div className="flex items-center gap-2">
          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart 
                key={i} 
                className={`h-5 w-5 transition-all ${
                  i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'
                } ${i === lives && pandaState === 'wobble' ? 'animate-ping' : ''}`}
              />
            ))}
          </div>
          
          {shieldActive && (
            <Badge variant="secondary" className="bg-yellow-500/20">
              <Shield className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
      </div>

      {/* Altitude Display */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                y: pandaState === 'jump' ? -20 : pandaState === 'wobble' ? [0, -5, 5, 0] : 0,
                rotate: pandaState === 'wobble' ? [0, -5, 5, 0] : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <PandaLogo className={`h-12 w-12 ${shieldActive ? 'ring-4 ring-yellow-400 rounded-full' : ''}`} />
            </motion.div>
            <div>
              <div className="text-2xl font-bold">{Math.round(altitude)}m</div>
              <div className="text-xs text-muted-foreground">Altitude</div>
            </div>
          </div>
          
          {/* Bamboo visualization */}
          <div className="flex items-end gap-1 h-12">
            {Array.from({ length: Math.min(5, Math.floor(altitude / 30) + 1) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${20 + i * 15}%` }}
                className="w-2 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Power-ups */}
      <div className="flex gap-2 justify-center">
        <Button
          variant="outline"
          size="sm"
          disabled={powerUps.shield <= 0}
          onClick={() => usePowerUp('shield')}
          className="flex items-center gap-1"
        >
          <Shield className="h-4 w-4 text-yellow-600" />
          <span>{powerUps.shield}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={powerUps.doubleJump <= 0}
          onClick={() => usePowerUp('doubleJump')}
          className="flex items-center gap-1"
        >
          <Zap className="h-4 w-4 text-blue-600" />
          <span>{powerUps.doubleJump}</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={powerUps.bambooBoost <= 0}
          onClick={() => usePowerUp('bambooBoost')}
          className="flex items-center gap-1"
        >
          <Rocket className="h-4 w-4 text-green-600" />
          <span>{powerUps.bambooBoost}</span>
        </Button>
      </div>

      {/* Question */}
      {currentQuestion && (
        <AnimatePresence mode="wait">
          <motion.div
            key={questionsAnswered}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="mb-4">
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {currentQuestion.type === 'definition' && '📚 Definition'}
                  {currentQuestion.type === 'scenario' && '🎭 Scenario'}
                  {currentQuestion.type === 'truefalse' && '✓✗ True or False'}
                </Badge>
                <h3 className="text-lg font-semibold">
                  {currentQuestion.question}
                </h3>
              </CardContent>
            </Card>

            {/* Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => {
                let optionStyle = 'border-2 hover:border-primary/50';
                if (isAnswered) {
                  if (index === currentQuestion.correctIndex) {
                    optionStyle = 'border-2 border-green-500 bg-green-500/10';
                  } else if (index === selectedAnswer) {
                    optionStyle = 'border-2 border-red-500 bg-red-500/10';
                  }
                }
                
                return (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${optionStyle} ${
                      isAnswered ? 'pointer-events-none' : ''
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    <CardContent className={`p-4 ${isMobile ? 'text-sm' : ''}`}>
                      {option}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button className="w-full" size="lg" onClick={handleNextQuestion}>
            Next Question
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PandaJumpGame;
