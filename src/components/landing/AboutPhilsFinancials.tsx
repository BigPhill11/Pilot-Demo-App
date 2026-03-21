import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PandaLogo from '@/components/icons/PandaLogo';
import { BookOpen, TrendingUp, Trophy, Sparkles, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPhilsFinancials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 dark:from-gray-900 dark:via-green-950/20 dark:to-emerald-950/20">
      <div className="container mx-auto px-4">
        {/* What is Phil's Financials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <PandaLogo className="h-24 w-24 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            What is Phil's Financials?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Your friendly guide to mastering personal finance and investing—designed specifically for high schoolers and beginners who want to build real-world financial skills.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Phil's Financials is an interactive learning platform that makes finance fun, accessible, and practical. No boring lectures. Just games, simulations, and bite-sized lessons that actually stick.
          </p>
        </motion.div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Learn by Doing</h3>
            <p className="text-muted-foreground">
              Interactive lessons, quizzes, and games that adapt to your pace and skill level.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Practice Safely</h3>
            <p className="text-muted-foreground">
              Paper trading with virtual money—learn to invest without any real financial risk.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <Trophy className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Track Your Growth</h3>
            <p className="text-muted-foreground">
              Earn XP, unlock badges, and level up from "Bamboo Sprout" to "Finance Sensei."
            </p>
          </Card>
        </div>

        {/* Why It Matters */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            Why Financial Literacy Matters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-8 text-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200">
              <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-2">57%</div>
              <p className="text-sm text-muted-foreground">of U.S. adults are not financially literate</p>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-200">
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-400 mb-2">21</div>
              <p className="text-sm text-muted-foreground">states require finance education in high school</p>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200">
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">$1,855</div>
              <p className="text-sm text-muted-foreground">average credit card debt for ages 18-24</p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200">
            <p className="text-center text-base md:text-lg text-muted-foreground">
              "Financial literacy isn't just about money—it's about freedom, security, and making informed decisions. Phil's Financials gives you the tools to take control of your financial future, starting today."
            </p>
          </Card>
        </div>

        {/* How It Helps */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            How Phil's Financials Helps You Succeed
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80">
              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Interactive Lessons</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn budgeting, investing, credit, and market basics through bite-sized modules tailored to your level.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 dark:bg-gray-800/80">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-8 w-8 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Gamified Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Play simulations like "Budget Simulator" and "Stock Picker Game" to reinforce concepts.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 dark:bg-gray-800/80">
              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Real-World Practice</h4>
                  <p className="text-sm text-muted-foreground">
                    Use paper trading to invest with virtual money, analyze real companies, and track your portfolio.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 dark:bg-gray-800/80">
              <div className="flex items-start gap-4">
                <Briefcase className="h-8 w-8 text-purple-500 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold mb-2">Career Connections</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with real finance professionals through "Phil's Friends" and explore high-barrier career paths.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            What You'll Master with Phil
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                💰 Personal Finance
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Budgeting & Saving</li>
                <li>• Credit Cards & Debt</li>
                <li>• Financial Planning</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                📊 Investing Basics
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Stocks & Bonds</li>
                <li>• Diversification</li>
                <li>• Risk Management</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-200">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                🏢 Company Analysis
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Reading Stock Charts</li>
                <li>• Financial Statements</li>
                <li>• Valuation Methods</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                💼 Finance Careers
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Investment Banking</li>
                <li>• Venture Capital</li>
                <li>• Trading & Analysis</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-200">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                📰 Market Insights
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Daily Finance News</li>
                <li>• Economic Calendar</li>
                <li>• Industry Trends</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                🎮 Interactive Games
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Budget Simulator</li>
                <li>• Trading Challenges</li>
                <li>• Portfolio Builder</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 border-2 border-green-200">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              🚀 Ready to Start Your Financial Journey?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're saving for your first car, planning for college, or just curious about investing, Phil's Financials has a path for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                <Link to="/learn">
                  📚 Start Learning
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="border-primary/50 hover:bg-primary/10">
                <Link to="/paper-trading">
                  💹 Try Paper Trading
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPhilsFinancials;
