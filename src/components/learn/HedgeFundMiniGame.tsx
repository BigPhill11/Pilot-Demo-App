import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, RotateCcw, Trophy } from 'lucide-react';

interface HedgeFundMiniGameProps {
  game: {
    name: string;
    description: string;
    learningGoal: string;
    completionSystem: string;
  };
  levelId: number;
}

const HedgeFundMiniGame: React.FC<HedgeFundMiniGameProps> = ({ game, levelId }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Game content based on game name and level
  const getGameContent = () => {
    if (levelId === 1) {
      if (game.name === "Fund or Not?") {
        return {
          questions: [
            {
              prompt: "Which of these is a hedge fund?",
              options: ["Vanguard S&P 500 Index Fund", "Bridgewater Pure Alpha", "Bank Savings Account", "Government Bond"],
              correct: "Bridgewater Pure Alpha",
              explanation: "Bridgewater Pure Alpha is a famous hedge fund that uses complex strategies and is only available to qualified investors."
            },
            {
              prompt: "Which of these is NOT a hedge fund?",
              options: ["Renaissance Medallion Fund", "Citadel Wellington", "Fidelity 401k Plan", "Two Sigma Compass"],
              correct: "Fidelity 401k Plan",
              explanation: "401k plans are retirement accounts available to employees, not exclusive hedge funds."
            },
            {
              prompt: "Which investment vehicle has the highest minimum investment?",
              options: ["Mutual Fund ($1,000)", "ETF ($100)", "Hedge Fund ($1,000,000)", "Savings Account ($1)"],
              correct: "Hedge Fund ($1,000,000)",
              explanation: "Hedge funds typically require million-dollar minimum investments, making them exclusive to wealthy investors."
            }
          ]
        };
      } else if (game.name === "Risk Gauge") {
        return {
          questions: [
            {
              prompt: "Rank these investments from LEAST to MOST risky:",
              options: ["Savings Account → Index Fund → Hedge Fund", "Hedge Fund → Index Fund → Savings Account", "Index Fund → Savings Account → Hedge Fund", "Savings Account → Hedge Fund → Index Fund"],
              correct: "Savings Account → Index Fund → Hedge Fund",
              explanation: "Savings accounts are FDIC insured (lowest risk), index funds have market risk (medium), hedge funds use leverage and complex strategies (highest risk)."
            },
            {
              prompt: "Why are hedge funds riskier than mutual funds?",
              options: ["They invest in more companies", "They use leverage and derivatives", "They have better managers", "They are government regulated"],
              correct: "They use leverage and derivatives",
              explanation: "Hedge funds use borrowed money (leverage) and complex financial instruments (derivatives) that can amplify both gains and losses."
            }
          ]
        };
      }
    } else if (levelId === 2) {
      if (game.name === "Strategy Sorter") {
        return {
          questions: [
            {
              prompt: "Company A announces a merger. Which strategy would a hedge fund use?",
              options: ["Long/Short Equity", "Global Macro", "Event-Driven", "Arbitrage"],
              correct: "Event-Driven",
              explanation: "Event-driven strategies focus on corporate events like mergers, acquisitions, and restructurings."
            },
            {
              prompt: "A fund bets the Euro will weaken against the Dollar. Which strategy is this?",
              options: ["Long/Short Equity", "Global Macro", "Event-Driven", "Arbitrage"],
              correct: "Global Macro",
              explanation: "Global macro strategies make bets on broad economic trends including currency movements."
            },
            {
              prompt: "A fund buys Apple stock at $150 in New York and sells it for $151 in London. Which strategy?",
              options: ["Long/Short Equity", "Global Macro", "Event-Driven", "Arbitrage"],
              correct: "Arbitrage",
              explanation: "Arbitrage exploits price differences for the same asset in different markets."
            }
          ]
        };
      } else if (game.name === "Risk/Reward Balance") {
        return {
          questions: [
            {
              prompt: "Conservative pension fund client wants steady returns. Best strategy?",
              options: ["High leverage long/short", "Conservative arbitrage", "Aggressive global macro", "Event-driven with leverage"],
              correct: "Conservative arbitrage",
              explanation: "Arbitrage strategies typically have lower risk as they exploit price differences rather than directional bets."
            },
            {
              prompt: "Aggressive investor wants maximum returns and can handle volatility. Best strategy?",
              options: ["Market neutral arbitrage", "High leverage global macro", "Conservative long-only", "Cash and bonds"],
              correct: "High leverage global macro",
              explanation: "Leveraged global macro strategies can generate the highest returns but come with the highest risk."
            }
          ]
        };
      }
    } else if (levelId === 3) {
      if (game.name === "Fee Calculator") {
        return {
          questions: [
            {
              prompt: "Fund has $100M assets, earns $20M profit. Calculate '2 and 20' fees:",
              options: ["$2M management + $4M performance = $6M total", "$4M management + $2M performance = $6M total", "$20M management + $4M performance = $24M total", "$2M management + $20M performance = $22M total"],
              correct: "$2M management + $4M performance = $6M total",
              explanation: "Management fee: 2% of $100M = $2M. Performance fee: 20% of $20M profit = $4M. Total = $6M."
            },
            {
              prompt: "Fund has $500M assets, loses $50M. What fees are charged?",
              options: ["$10M management fee only", "$10M performance fee only", "No fees charged", "$60M total fees"],
              correct: "$10M management fee only",
              explanation: "Management fees (2% of assets = $10M) are charged regardless of performance. No performance fees on losses."
            },
            {
              prompt: "Fund charges '3 and 30' on $200M with $40M profit. Total fees?",
              options: ["$6M + $12M = $18M", "$40M + $12M = $52M", "$6M + $40M = $46M", "$3M + $30M = $33M"],
              correct: "$6M + $12M = $18M",
              explanation: "Management: 3% of $200M = $6M. Performance: 30% of $40M = $12M. Total = $18M."
            }
          ]
        };
      } else if (game.name === "Investor Match") {
        return {
          questions: [
            {
              prompt: "Which investor CAN invest in hedge funds?",
              options: ["College student with $5,000", "Teacher with $50,000 401k", "University endowment with $1B", "Retail investor with $100,000"],
              correct: "University endowment with $1B",
              explanation: "University endowments are institutional investors with sufficient assets and sophistication to invest in hedge funds."
            },
            {
              prompt: "Why can't most retail investors access hedge funds?",
              options: ["Hedge funds don't want their money", "Minimum investments too high + accreditation requirements", "Government forbids all retail investment", "Hedge funds only invest in bonds"],
              correct: "Minimum investments too high + accreditation requirements",
              explanation: "Hedge funds require high minimums (often $1M+) and investors must be 'accredited' with sufficient wealth/income."
            }
          ]
        };
      }
    } else if (levelId === 3) {
      if (game.name === "Fee Calculator") {
        return {
          questions: [
            {
              prompt: "Fund has $100M assets, earns $20M profit. Calculate '2 and 20' fees:",
              options: ["$2M management + $4M performance = $6M total", "$4M management + $2M performance = $6M total", "$20M management + $4M performance = $24M total", "$2M management + $20M performance = $22M total"],
              correct: "$2M management + $4M performance = $6M total",
              explanation: "Management fee: 2% of $100M = $2M. Performance fee: 20% of $20M profit = $4M. Total = $6M."
            },
            {
              prompt: "Fund has $500M assets, loses $50M. What fees are charged?",
              options: ["$10M management fee only", "$10M performance fee only", "No fees charged", "$60M total fees"],
              correct: "$10M management fee only",
              explanation: "Management fees (2% of assets = $10M) are charged regardless of performance. No performance fees on losses."
            },
            {
              prompt: "Fund charges '3 and 30' on $200M with $40M profit. Total fees?",
              options: ["$6M + $12M = $18M", "$40M + $12M = $52M", "$6M + $40M = $46M", "$3M + $30M = $33M"],
              correct: "$6M + $12M = $18M",
              explanation: "Management: 3% of $200M = $6M. Performance: 30% of $40M = $12M. Total = $18M."
            }
          ]
        };
      } else if (game.name === "Investor Match") {
        return {
          questions: [
            {
              prompt: "Which investor CAN invest in hedge funds?",
              options: ["College student with $5,000", "Teacher with $50,000 401k", "University endowment with $1B", "Retail investor with $100,000"],
              correct: "University endowment with $1B",
              explanation: "University endowments are institutional investors with sufficient assets and sophistication to invest in hedge funds."
            },
            {
              prompt: "Why can't most retail investors access hedge funds?",
              options: ["Hedge funds don't want their money", "Minimum investments too high + accreditation requirements", "Government forbids all retail investment", "Hedge funds only invest in bonds"],
              correct: "Minimum investments too high + accreditation requirements",
              explanation: "Hedge funds require high minimums (often $1M+) and investors must be 'accredited' with sufficient wealth/income."
            }
          ]
        };
      }
    } else if (levelId === 4) {
      if (game.name === "Risk Match-Up") {
        return {
          questions: [
            {
              prompt: "A hedge fund can't sell its investments quickly without huge losses. What risk is this?",
              options: ["Market Risk", "Liquidity Risk", "Leverage Risk", "Operational Risk"],
              correct: "Liquidity Risk",
              explanation: "Liquidity risk occurs when you can't sell investments quickly without significant price reductions."
            },
            {
              prompt: "A fund borrowed $900M to invest $100M of its own money. Markets drop 2%. What's the main risk?",
              options: ["Market Risk", "Liquidity Risk", "Leverage Risk", "Systemic Risk"],
              correct: "Leverage Risk",
              explanation: "With 10:1 leverage, a 2% market drop becomes a 20% loss on the fund's own money - that's leverage risk."
            },
            {
              prompt: "A massive hedge fund collapse starts affecting banks and other investors. What risk is this?",
              options: ["Market Risk", "Liquidity Risk", "Operational Risk", "Systemic Risk"],
              correct: "Systemic Risk",
              explanation: "Systemic risk is when problems at one large institution spread throughout the financial system."
            }
          ]
        };
      } else if (game.name === "Leverage Danger") {
        return {
          questions: [
            {
              prompt: "Market is stable. How much leverage should a conservative fund use?",
              options: ["10:1 leverage (very high)", "3:1 leverage (moderate)", "1:1 leverage (no borrowing)", "20:1 leverage (extreme)"],
              correct: "3:1 leverage (moderate)",
              explanation: "Even in stable markets, conservative funds use moderate leverage to limit downside risk."
            },
            {
              prompt: "Markets are very volatile and unpredictable. Best leverage choice?",
              options: ["Increase leverage to 15:1", "Use 1:1 leverage (no borrowing)", "Keep normal 5:1 leverage", "Use maximum 25:1 leverage"],
              correct: "Use 1:1 leverage (no borrowing)",
              explanation: "In volatile markets, smart funds reduce or eliminate leverage to avoid catastrophic losses."
            }
          ]
        };
      }
    } else if (levelId === 5) {
      if (game.name === "Rule or Freedom") {
        return {
          questions: [
            {
              prompt: "Can hedge funds accept investments from college students with $1,000?",
              options: ["Allowed - anyone can invest", "Restricted - only accredited investors", "Allowed with special permission", "Restricted - minimum $10M only"],
              correct: "Restricted - only accredited investors",
              explanation: "Hedge funds can only accept investments from accredited investors, which requires significant wealth/income."
            },
            {
              prompt: "Can hedge funds use complex derivatives and short selling?",
              options: ["Restricted - too risky for funds", "Allowed - hedge funds have strategy freedom", "Allowed only with SEC approval", "Restricted - only banks can do this"],
              correct: "Allowed - hedge funds have strategy freedom",
              explanation: "Hedge funds have much more freedom than mutual funds to use complex strategies and instruments."
            },
            {
              prompt: "Must hedge funds publish their holdings daily like mutual funds?",
              options: ["Yes - same transparency rules", "No - hedge funds can keep strategies secret", "Yes - but only to large investors", "No - they never report anything"],
              correct: "No - hedge funds can keep strategies secret",
              explanation: "Hedge funds have much less transparency requirements than mutual funds and can keep their strategies confidential."
            }
          ]
        };
      } else if (game.name === "Investor Filter") {
        return {
          questions: [
            {
              prompt: "College student with $5,000 in savings wants to invest. Qualified?",
              options: ["Yes - meets income requirements", "No - doesn't meet wealth/income requirements", "Yes - age doesn't matter", "No - must be over 25"],
              correct: "No - doesn't meet wealth/income requirements",
              explanation: "Accredited investors need $1M+ net worth or $200K+ annual income. A college student typically doesn't qualify."
            },
            {
              prompt: "Harvard University endowment with $50B wants to invest. Qualified?",
              options: ["No - universities can't invest in hedge funds", "Yes - institutional investors are automatically qualified", "No - must get special government permission", "Yes - but only up to $1M"],
              correct: "Yes - institutional investors are automatically qualified",
              explanation: "Large institutions like university endowments automatically qualify as accredited investors."
            },
            {
              prompt: "Doctor earning $500K/year with $800K net worth. Qualified?",
              options: ["No - net worth too low", "Yes - income exceeds $200K threshold", "No - must have both high income AND $1M net worth", "Yes - doctors get special exemption"],
              correct: "Yes - income exceeds $200K threshold",
              explanation: "You can qualify as accredited with either $1M+ net worth OR $200K+ annual income (or $300K+ joint income)."
            }
          ]
        };
      }
    } else if (levelId === 6) {
      if (game.name === "Who Won, Who Lost?") {
        return {
          questions: [
            {
              prompt: "George Soros in 1992 with the British Pound:",
              options: ["Major Win", "Major Loss", "Broke Even", "Small Win"],
              correct: "Major Win",
              explanation: "Soros made over $1 billion in one day by shorting the British Pound, earning the nickname 'the man who broke the Bank of England.'"
            },
            {
              prompt: "Long-Term Capital Management (LTCM) in 1998:",
              options: ["Major Win", "Major Loss", "Moderate Success", "Small Loss"],
              correct: "Major Loss",
              explanation: "LTCM collapsed due to excessive leverage, losing billions and requiring a government-orchestrated bailout."
            },
            {
              prompt: "John Paulson during the 2007-2008 housing crisis:",
              options: ["Major Loss", "Major Win", "Moderate Loss", "Broke Even"],
              correct: "Major Win",
              explanation: "Paulson made over $15 billion by betting against the U.S. housing market before it collapsed."
            },
            {
              prompt: "Archegos Capital in 2021:",
              options: ["Record Profits", "Major Loss", "Steady Growth", "Small Win"],
              correct: "Major Loss",
              explanation: "Archegos collapsed when its highly leveraged bets on tech stocks failed, causing massive losses for banks too."
            }
          ]
        };
      } else if (game.name === "Crisis Predictor") {
        return {
          questions: [
            {
              prompt: "Fund uses 20:1 leverage betting everything on one currency. Likely outcome?",
              options: ["Steady profits", "High chance of collapse", "Guaranteed success", "Moderate returns"],
              correct: "High chance of collapse",
              explanation: "Extreme leverage with no diversification is a recipe for disaster - small moves can wipe out the fund."
            },
            {
              prompt: "Fund diversifies across many strategies with moderate leverage during crisis. Likely outcome?",
              options: ["Immediate collapse", "Better survival chances", "Guaranteed profits", "Total loss"],
              correct: "Better survival chances",
              explanation: "Diversification and moderate leverage help hedge funds survive market crises, though profits aren't guaranteed."
            }
          ]
        };
      }
    } else if (levelId === 7) {
      if (game.name === "Future or Past?") {
        return {
          questions: [
            {
              prompt: "Classify: AI-powered trading algorithms",
              options: ["Future Trend", "Past Trend", "Current Standard", "Outdated Technology"],
              correct: "Future Trend",
              explanation: "AI and machine learning are increasingly important trends shaping the future of hedge fund trading."
            },
            {
              prompt: "Classify: ESG (Environmental, Social, Governance) investing",
              options: ["Past Trend", "Future Trend", "Irrelevant Factor", "Government Requirement"],
              correct: "Future Trend",
              explanation: "ESG investing is a growing trend as younger investors increasingly care about environmental and social impact."
            },
            {
              prompt: "Classify: Relying only on human stock-picking without technology",
              options: ["Future Trend", "Current Best Practice", "Past Trend", "Required by Law"],
              correct: "Past Trend",
              explanation: "Pure human-driven investing without technology is becoming less competitive as quant and AI methods advance."
            },
            {
              prompt: "Classify: Charging '2 and 20' fees without justification",
              options: ["Future Trend", "Past Trend", "Industry Standard", "Growing Practice"],
              correct: "Past Trend",
              explanation: "High fees without strong performance justification are under pressure from cheaper investment alternatives."
            }
          ]
        };
      } else if (game.name === "Survival Strategy") {
        return {
          questions: [
            {
              prompt: "Hedge fund faces competition from cheap index funds. Best strategy?",
              options: ["Raise fees to seem more exclusive", "Develop AI systems for better performance", "Copy index fund strategies exactly", "Ignore the competition"],
              correct: "Develop AI systems for better performance",
              explanation: "To justify higher fees, hedge funds must prove superior performance through technology and innovation."
            },
            {
              prompt: "Young investors care about environmental impact. What should funds do?",
              options: ["Ignore ESG completely", "Develop ESG investment strategies", "Only invest in oil companies", "Focus purely on profits"],
              correct: "Develop ESG investment strategies",
              explanation: "Adapting to investor values by incorporating ESG factors can attract the next generation of wealthy investors."
            },
            {
              prompt: "Robo-advisors offer similar returns for 0.25% fees vs hedge fund's 2% fees. Response?",
              options: ["Increase fees to 3%", "Prove superior value or reduce fees", "Copy robo-advisor strategies", "Market exclusively to older investors"],
              correct: "Prove superior value or reduce fees",
              explanation: "Hedge funds must either demonstrate clear value above cheap alternatives or adjust their fee structure to remain competitive."
            }
          ]
        };
      }
    }
    
    return { questions: [] };
  };

  const gameContent = getGameContent();
  const questions = gameContent.questions || [];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('ready');
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getScoreLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { level: 'Gold', color: 'text-yellow-600 bg-yellow-100' };
    if (percentage >= 75) return { level: 'Silver', color: 'text-gray-600 bg-gray-100' };
    if (percentage >= 50) return { level: 'Bronze', color: 'text-orange-600 bg-orange-100' };
    return { level: 'Try Again', color: 'text-red-600 bg-red-100' };
  };

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          Game content coming soon!
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'ready') {
    return (
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <h4 className="font-semibold text-lg">Ready to play {game.name}?</h4>
          <p className="text-sm text-muted-foreground">Test your knowledge with {questions.length} questions</p>
          <Button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-700">
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="outline">Question {currentQuestion + 1} of {questions.length}</Badge>
            <div className="text-sm text-muted-foreground">Score: {score}/{currentQuestion + (selectedAnswer ? 1 : 0)}</div>
          </div>
          
          <h4 className="font-semibold text-lg">{question.prompt}</h4>
          
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 text-left border rounded-lg transition-all ${
                  selectedAnswer === option
                    ? option === question.correct
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : selectedAnswer && option === question.correct
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer && option === question.correct && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {selectedAnswer === option && option !== question.correct && <X className="h-4 w-4 text-red-600" />}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}

          {showFeedback && (
            <div className="flex justify-end">
              <Button onClick={nextQuestion} className="bg-indigo-600 hover:bg-indigo-700">
                {currentQuestion + 1 === questions.length ? 'See Results' : 'Next Question'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    const scoreLevel = getScoreLevel();
    return (
      <Card>
        <CardContent className="p-6 text-center space-y-4">
          <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
          <h4 className="font-bold text-xl">Game Complete!</h4>
          <div className="space-y-2">
            <div className="text-lg">Final Score: {score}/{questions.length}</div>
            <Badge className={scoreLevel.color}>{scoreLevel.level}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Great job! You've completed the {game.name} mini-game.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default HedgeFundMiniGame;