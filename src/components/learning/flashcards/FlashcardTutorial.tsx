import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Zap,
  Calendar,
  BookOpen,
  Trophy,
  Target,
  Brain,
  Star,
  Clock,
  TrendingUp,
  Award,
  X
} from "lucide-react";

interface FlashcardTutorialProps {
  onClose: () => void;
}

export const FlashcardTutorial = ({ onClose }: FlashcardTutorialProps) => {
  return (
    <div className="fixed inset-0 bg-background/95 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Flashcard System Tutorial</h1>
            <p className="text-muted-foreground mt-2">
              Master your learning with gamified spaced repetition
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
            <TabsTrigger value="mastery">Mastery</TabsTrigger>
            <TabsTrigger value="modes">Study Modes</TabsTrigger>
            <TabsTrigger value="review">Smart Review</TabsTrigger>
            <TabsTrigger value="tips">Pro Tips</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Welcome to Advanced Flashcards!</h2>
              <p className="mb-4">
                Our flashcard system combines proven learning science with engaging gamification
                to help you master finance concepts efficiently.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Spaced Repetition Algorithm (SM-2)</h3>
                    <p className="text-sm text-muted-foreground">
                      Cards automatically schedule for optimal review timing based on your performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Mastery System</h3>
                    <p className="text-sm text-muted-foreground">
                      Progress through tiers from New → Bronze → Silver → Gold → Diamond
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Flame className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Streak Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Build daily, weekly, and monthly streaks to stay motivated
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Card Categories</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">📊 Personal Finance</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    7 subsections covering essential money management skills
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Badge variant="secondary">Budgeting & Spending</Badge>
                    <Badge variant="secondary">Credit & Debt</Badge>
                    <Badge variant="secondary">Big Purchases</Badge>
                    <Badge variant="secondary">Earning & Income</Badge>
                    <Badge variant="secondary">Financial Safety</Badge>
                    <Badge variant="secondary">Future Planning</Badge>
                    <Badge variant="secondary">Taxes & Compliance</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">💼 Careers in Finance</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    6 career paths with industry-specific terminology
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Badge variant="secondary">Investment Banking</Badge>
                    <Badge variant="secondary">Asset Management</Badge>
                    <Badge variant="secondary">Private Equity</Badge>
                    <Badge variant="secondary">Venture Capital</Badge>
                    <Badge variant="secondary">Hedge Funds</Badge>
                    <Badge variant="secondary">Management Consulting</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">🏢 Company Knowledge</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    5 industries with key companies and concepts
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Badge variant="secondary">Tech Companies</Badge>
                    <Badge variant="secondary">Financial Services</Badge>
                    <Badge variant="secondary">Consumer Goods</Badge>
                    <Badge variant="secondary">Healthcare & Pharma</Badge>
                    <Badge variant="secondary">Energy & Utilities</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Streaks */}
          <TabsContent value="streaks" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Flame className="h-8 w-8 text-orange-600" />
                <h2 className="text-2xl font-bold">Streak System</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Daily Streak</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Review at least one card each day to maintain your streak. The streak increases
                    by 1 for each consecutive day of study.
                  </p>
                  <Badge variant="outline">Resets if you miss a day (unless you use a freeze token)</Badge>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Streak Freeze Tokens 🛡️</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Protect your streak when life gets busy. Each token saves your streak for one missed day.
                  </p>
                  <div className="text-sm space-y-1">
                    <p>• Earn a freeze token by mastering a card (reaching Diamond tier)</p>
                    <p>• Freeze tokens automatically activate when you miss a day</p>
                    <p>• No limit on how many you can collect</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Weekly & Monthly Streaks</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your consistency over longer periods. These count total study days
                    within the week/month (not consecutive days).
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Mastery */}
          <TabsContent value="mastery" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-8 w-8 text-yellow-600" />
                <h2 className="text-2xl font-bold">Mastery Tiers</h2>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Each card progresses through 5 mastery tiers based on your correct answers.
                  Higher tiers earn more XP and have better retention!
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-400" />
                      <span className="font-semibold">New</span>
                    </div>
                    <div className="text-sm text-right">
                      <p>0 correct • 1x XP multiplier</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-700" />
                      <span className="font-semibold">Bronze</span>
                    </div>
                    <div className="text-sm text-right">
                      <p>3+ correct • 1.2x XP multiplier</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-400" />
                      <span className="font-semibold">Silver</span>
                    </div>
                    <div className="text-sm text-right">
                      <p>6+ correct • 1.5x XP multiplier</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="font-semibold">Gold</span>
                    </div>
                    <div className="text-sm text-right">
                      <p>10+ correct • 2x XP multiplier</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-cyan-400" />
                      <span className="font-semibold">Diamond</span>
                    </div>
                    <div className="text-sm text-right">
                      <p>15+ correct • 3x XP multiplier</p>
                      <p className="text-xs text-muted-foreground">Earn a Freeze Token!</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Confidence Rating
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    After answering, rate your confidence (1-5 stars). This affects how the
                    spaced repetition algorithm schedules your next review:
                  </p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• ⭐ Low confidence = Review sooner</li>
                    <li>• ⭐⭐⭐ Medium confidence = Moderate interval</li>
                    <li>• ⭐⭐⭐⭐⭐ High confidence = Longer interval</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Study Modes */}
          <TabsContent value="modes" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Study Modes</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Regular Study</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The standard learning mode. Take your time to review cards, flip them to see answers,
                      mark correct/incorrect, and rate your confidence.
                    </p>
                    <Badge variant="secondary">Base XP per card</Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Speed Challenge</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Test your quick recall! Answer 15 cards with 30 seconds per card.
                      Earn points based on accuracy and speed.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">+25 XP bonus</Badge>
                      <Badge variant="outline">Timed mode</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Daily Challenge</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Complete 5 random cards once per day for bonus XP. Perfect for building
                      your daily streak!
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">+30 XP bonus</Badge>
                      <Badge variant="outline">Once daily</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Brain className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Smart Review</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Focus on cards that are due for review based on the spaced repetition algorithm.
                      Cards are prioritized by importance and difficulty.
                    </p>
                    <Badge variant="secondary">Optimized learning</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Smart Review */}
          <TabsContent value="review" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Smart Review System</h2>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our spaced repetition system uses the proven SM-2 algorithm to optimize
                  when you review each card.
                </p>

                <div>
                  <h3 className="font-semibold mb-2">How It Works</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <p>
                        <strong>Review Intervals:</strong> Cards start with short intervals (1 day)
                        and gradually increase (2 days → 4 days → 9 days, etc.) as you master them
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <p>
                        <strong>Difficulty Adjustment:</strong> Low confidence ratings decrease the
                        interval, while high confidence increases it
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <p>
                        <strong>Priority Queue:</strong> Cards that you struggle with appear more
                        frequently until you master them
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">Review Schedule Example</h3>
                  <div className="text-sm space-y-1">
                    <p>Day 1: Review → 5⭐ confidence → Next review in 4 days</p>
                    <p>Day 5: Review → 4⭐ confidence → Next review in 9 days</p>
                    <p>Day 14: Review → 5⭐ confidence → Next review in 20 days</p>
                    <p className="text-muted-foreground italic mt-2">
                      The system adapts to your performance automatically!
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Review Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your progress with detailed stats:
                  </p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Due today: Cards ready for immediate review</li>
                    <li>• Upcoming: Cards scheduled for the next 7 days</li>
                    <li>• Overdue: Cards that missed their review date</li>
                    <li>• Retention rate: Your overall memory performance</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Pro Tips */}
          <TabsContent value="tips" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-8 w-8 text-purple-600" />
                <h2 className="text-2xl font-bold">Pro Tips</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">💡 Maximize Learning</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Study at the same time each day to build a habit</li>
                    <li>• Focus on understanding, not just memorization</li>
                    <li>• Use Phil's Examples and Real World scenarios for context</li>
                    <li>• Rate confidence honestly - it helps the algorithm help you!</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">🎯 Optimize XP Gains</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Maintain your daily streak for consistent progress</li>
                    <li>• Complete the Daily Challenge every day (+30 XP)</li>
                    <li>• Master cards to Diamond tier for 3x XP multiplier</li>
                    <li>• Try Speed Challenges when you're confident (+25 XP bonus)</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">🧠 Study Strategies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Start with Regular Study to learn new concepts</li>
                    <li>• Use Smart Review to reinforce at optimal times</li>
                    <li>• Mix categories to build broader knowledge</li>
                    <li>• Take breaks between intense study sessions</li>
                    <li>• Review overdue cards first to catch up</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <h3 className="font-semibold mb-2">⚡ Quick Wins</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Build a 7-day streak to earn your first freeze token source</li>
                    <li>• Focus on one category at a time to build expertise</li>
                    <li>• Check Smart Review daily - it shows what you need to remember</li>
                    <li>• Don't worry about wrong answers - they're learning opportunities!</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-4">
          <Button onClick={onClose} size="lg">
            Start Learning! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};
