import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Zap, Heart, TreePine, Coins, Star, ChevronRight, RotateCcw, Shield, Bolt, Gem } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import PandaLogo from '@/components/icons/PandaLogo';
import { toast } from 'sonner';
import { useBambooEmpireProgress } from '@/hooks/useBambooEmpireProgress';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level: string;
}

interface PowerUp {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
}

interface GameState {
  level: number;
  experience: number;
  bambooCoins: number;
  energy: number;
  territories: number;
  currentQuestion?: Flashcard;
  answeredQuestions: string[];
  achievements: string[];
  powerUps: { [key: string]: number };
  streak: number;
  totalAnswered: number;
}

interface BambooEmpireGameProps {
  level: 'beginner' | 'intermediate' | 'pro';
}

const BambooEmpireGame: React.FC<BambooEmpireGameProps> = ({ level }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const { gameState, saveGameState, awardAnswerXp, awardLevelUpXp } = useBambooEmpireProgress(level);
  const [currentQuestion, setCurrentQuestion] = useState<Flashcard | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<'exploration' | 'question' | 'result' | 'shop'>('exploration');
  const [showPowerUpShop, setShowPowerUpShop] = useState(false);
  const isMobile = useIsMobile();

  const powerUps: PowerUp[] = [
    {
      id: 'energy_boost',
      name: 'Energy Boost',
      description: 'Restore 50 energy instantly',
      cost: 75,
      icon: <Bolt className="h-5 w-5 text-yellow-500" />
    },
    {
      id: 'double_coins',
      name: 'Double Coins',
      description: 'Next 3 correct answers give double coins',
      cost: 150,
      icon: <Gem className="h-5 w-5 text-purple-500" />
    },
    {
      id: 'streak_shield',
      name: 'Streak Shield',
      description: 'Protect your streak from one wrong answer',
      cost: 200,
      icon: <Shield className="h-5 w-5 text-blue-500" />
    }
  ];

  useEffect(() => {
    loadFlashcards();
    
    const handleFlashcardsUpdate = (event: CustomEvent) => {
      if (event.detail.level === level) {
        setFlashcards(event.detail.cards);
      }
    };
    
    window.addEventListener('flashcardsUpdated', handleFlashcardsUpdate as EventListener);
    return () => window.removeEventListener('flashcardsUpdated', handleFlashcardsUpdate as EventListener);
  }, [level]);

  const loadFlashcards = () => {
    const storageKey = `flashcards_${level}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setFlashcards(JSON.parse(stored));
    }
  };

  const resetGame = async () => {
    const newState = {
      level: 1,
      experience: 0,
      bambooCoins: 100,
      energy: 100,
      territories: 1,
      answeredQuestions: [],
      achievements: [],
      powerUps: {},
      streak: 0,
      totalAnswered: 0
    };
    await saveGameState(newState);
    setGamePhase('exploration');
    toast.success("Game reset! Phil starts his adventure anew!");
  };

  const usePowerUp = async (powerUpId: string) => {
    const owned = gameState.powerUps[powerUpId] || 0;
    if (owned <= 0) return;

    let newState = { ...gameState };
    newState.powerUps[powerUpId] = owned - 1;

    switch (powerUpId) {
      case 'energy_boost':
        newState.energy = Math.min(100, newState.energy + 50);
        toast.success("Energy restored!");
        break;
      case 'double_coins':
        // This would be handled in the answer logic
        toast.success("Double coins activated for next 3 answers!");
        break;
      case 'streak_shield':
        toast.success("Streak shield activated!");
        break;
    }

    await saveGameState(newState);
  };

  const buyPowerUp = async (powerUp: PowerUp) => {
    if (gameState.bambooCoins < powerUp.cost) {
      toast.error("Not enough bamboo coins!");
      return;
    }

    const newState = {
      ...gameState,
      bambooCoins: gameState.bambooCoins - powerUp.cost,
      powerUps: {
        ...gameState.powerUps,
        [powerUp.id]: (gameState.powerUps[powerUp.id] || 0) + 1
      }
    };

    await saveGameState(newState);
    toast.success(`${powerUp.name} purchased!`);
  };

  const startExploration = () => {
    if (gameState.energy < 10) {
      toast.error("Not enough energy! Rest to recover or use an Energy Boost!");
      return;
    }

    if (flashcards.length === 0) {
      toast.error("Add some flashcards to start exploring!");
      return;
    }

    const unansweredCards = flashcards.filter(card => 
      !gameState.answeredQuestions.includes(card.id)
    );
    const availableCards = unansweredCards.length > 0 ? unansweredCards : flashcards;
    
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    setCurrentQuestion(randomCard);
    
    generateMultipleChoice(randomCard);
    setGamePhase('question');
    setShowAnswer(false);
    setSelectedAnswer('');
  };

  const generateMultipleChoice = (correctCard: Flashcard) => {
    const allDefinitions = flashcards
      .filter(card => card.id !== correctCard.id)
      .map(card => card.definition);
    
    const wrongAnswers = allDefinitions
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [...wrongAnswers, correctCard.definition]
      .sort(() => Math.random() - 0.5);
    
    setMultipleChoiceOptions(options);
  };

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;
    
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    const isCorrect = answer === currentQuestion.definition;
    const expGain = isCorrect ? 25 : 5;
    let coinGain = isCorrect ? 50 : 10;
    
    // Double coins power-up effect
    if (gameState.powerUps['double_coins'] > 0 && isCorrect) {
      coinGain *= 2;
    }
    
    const energyCost = 10;
    
    let newState = {
      ...gameState,
      experience: gameState.experience + expGain,
      bambooCoins: gameState.bambooCoins + coinGain,
      energy: Math.max(0, gameState.energy - energyCost),
      totalAnswered: gameState.totalAnswered + 1,
      streak: isCorrect ? gameState.streak + 1 : 0,
      answeredQuestions: isCorrect ? 
        [...gameState.answeredQuestions, currentQuestion.id] : 
        gameState.answeredQuestions
    };
    
    // Level up check
    const expRequired = newState.level * 100;
    const didLevelUp = newState.experience >= expRequired;
    if (didLevelUp) {
      newState.level += 1;
      newState.territories += 1;
      newState.energy = 100;
      toast.success(`Level up! You're now level ${newState.level}!`);
      // Award bonus XP for leveling up
      await awardLevelUpXp(newState.level);
    }
    
    // Save game state to Supabase and localStorage
    await saveGameState(newState);
    
    // Award XP through gamification service (for global XP tracking)
    await awardAnswerXp(isCorrect, coinGain);
    
    setGamePhase('result');
    
    if (isCorrect) {
      toast.success(`Correct! +${expGain} game XP, +${coinGain} bamboo coins!`);
    } else {
      toast.error(`Wrong answer. +${expGain} game XP for trying!`);
    }
  };

  const continueExploring = () => {
    setGamePhase('exploration');
    setCurrentQuestion(null);
  };

  const restAndRecover = async () => {
    const newState = {
      ...gameState,
      energy: Math.min(100, gameState.energy + 30)
    };
    await saveGameState(newState);
    toast.success("You rest by the bamboo grove and recover energy!");
  };

  const getLevelTitle = () => {
    if (gameState.level <= 3) return "Bamboo Sprout";
    if (gameState.level <= 6) return "Grove Guardian";
    if (gameState.level <= 10) return "Bamboo Emperor";
    return "Legendary Bamboo Master";
  };

  const getExpRequired = () => gameState.level * 100;
  const getExpProgress = () => (gameState.experience % getExpRequired()) / getExpRequired() * 100;

  if (flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <PandaLogo className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Adventures Yet!</h3>
          <p className="text-muted-foreground">
            Add some flashcards to {level} level to start building your Bamboo Empire!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <Badge variant="outline">{getLevelTitle()}</Badge>
            </div>
            <div className="text-2xl font-bold">Level {gameState.level}</div>
            <Progress value={getExpProgress()} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              {gameState.experience % getExpRequired()}/{getExpRequired()} XP
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Coins className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-yellow-600">{gameState.bambooCoins}</div>
            <div className="text-sm text-muted-foreground">Bamboo Coins</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <div className="text-xl font-bold text-red-500">{gameState.energy}/100</div>
            <div className="text-sm text-muted-foreground">Energy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TreePine className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-600">{gameState.territories}</div>
            <div className="text-sm text-muted-foreground">Territories</div>
          </CardContent>
        </Card>
      </div>

      {/* Power-ups and Actions Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {powerUps.map(powerUp => {
                const owned = gameState.powerUps[powerUp.id] || 0;
                return (
                  <Button
                    key={powerUp.id}
                    variant="outline"
                    size="sm"
                    onClick={() => usePowerUp(powerUp.id)}
                    disabled={owned <= 0}
                    className="flex items-center gap-1"
                  >
                    {powerUp.icon}
                    {owned > 0 && <Badge variant="secondary" className="ml-1">{owned}</Badge>}
                  </Button>
                );
              })}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowPowerUpShop(true)} variant="outline">
                🏪 Power-up Shop
              </Button>
              <Button onClick={resetGame} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset Game
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power-up Shop Modal */}
      {showPowerUpShop && (
        <Card className="border-2 border-purple-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              🏪 Phil's Power-up Shop
              <Button variant="outline" size="sm" onClick={() => setShowPowerUpShop(false)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {powerUps.map(powerUp => (
                <div key={powerUp.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    {powerUp.icon}
                    <div>
                      <h4 className="font-semibold">{powerUp.name}</h4>
                      <p className="text-sm text-muted-foreground">{powerUp.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{powerUp.cost} coins</Badge>
                    <Button
                      size="sm"
                      onClick={() => buyPowerUp(powerUp)}
                      disabled={gameState.bambooCoins < powerUp.cost}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Game Area */}
      {gamePhase === 'exploration' && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PandaLogo className="h-8 w-8" />
              Bamboo Forest Exploration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎋</div>
              <p className="text-lg mb-6">
                Phil wanders through the bamboo forest, looking for new territories to expand his empire...
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={startExploration}
                  disabled={gameState.energy < 10}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Explore Territory (-10 Energy)
                </Button>
                <Button 
                  onClick={restAndRecover}
                  variant="outline"
                  size="lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Rest & Recover
                </Button>
              </div>
              
              {/* Stats Display */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>Current Streak: <span className="font-bold text-green-600">{gameState.streak}</span></div>
                <div>Total Answered: <span className="font-bold text-blue-600">{gameState.totalAnswered}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {gamePhase === 'question' && currentQuestion && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              Challenge Encountered!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">🐼</div>
              <p className="text-lg mb-4">
                Phil encounters a wise bamboo spirit who asks:
              </p>
              <Card className="bg-white border-2 border-blue-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">
                    What does "{currentQuestion.term}" mean?
                  </h3>
                  <div className="grid gap-3">
                    {multipleChoiceOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-4 h-auto text-left justify-start"
                        onClick={() => handleAnswer(option)}
                        disabled={showAnswer}
                      >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {gamePhase === 'result' && currentQuestion && (
        <Card className={`${selectedAnswer === currentQuestion.definition ? 
          'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 
          'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedAnswer === currentQuestion.definition ? (
                <span className="text-green-600">✅ Correct!</span>
              ) : (
                <span className="text-red-600">❌ Incorrect</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4">
                {selectedAnswer === currentQuestion.definition ? '🎉' : '💪'}
              </div>
              <Card className="bg-white mb-4">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{currentQuestion.term}</h4>
                  <p className="mb-3">{currentQuestion.definition}</p>
                  {currentQuestion.philExample && (
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mb-2">
                      <p className="text-sm italic">💡 {currentQuestion.philExample}</p>
                    </div>
                  )}
                  {currentQuestion.realWorldExample && (
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-sm">🌍 {currentQuestion.realWorldExample}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Button onClick={continueExploring} size="lg">
                Continue Adventure
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BambooEmpireGame;
