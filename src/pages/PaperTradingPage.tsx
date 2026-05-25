import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, Construction } from "lucide-react";

const PaperTradingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <TrendingUp className="h-16 w-16 text-primary" />
                <Construction className="h-6 w-6 text-amber-500 absolute -top-1 -right-1" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Paper Trading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-lg">
              Practice investing with a virtual portfolio — no real money, all the learning.
            </p>
            <p className="text-sm text-muted-foreground">
              This feature is coming soon! We're building a full paper trading simulator where you can:
            </p>
            <ul className="text-sm text-muted-foreground text-left space-y-2 list-disc list-inside">
              <li>Buy and sell stocks with virtual currency</li>
              <li>Track your portfolio performance over time</li>
              <li>Compete with other users on the leaderboard</li>
              <li>Learn from your wins and losses risk-free</li>
            </ul>
            <div className="pt-4">
              <Button onClick={() => navigate("/learn")} className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Learn Investing Basics First
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaperTradingPage;
