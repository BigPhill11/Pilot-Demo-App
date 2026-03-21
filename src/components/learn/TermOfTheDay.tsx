
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ChevronDown, ChevronUp, Shuffle } from 'lucide-react';

interface TermData {
  term: string;
  definition: string;
  example: string;
  category: string;
}

const financialTerms: TermData[] = [
  {
    term: "Compound Interest",
    definition: "Interest calculated on both the initial principal and the accumulated interest from previous periods.",
    example: "If you invest $1,000 at 5% annual compound interest, after one year you'll have $1,050, and the next year you'll earn interest on $1,050, not just the original $1,000.",
    category: "Investment"
  },
  {
    term: "Diversification",
    definition: "An investment strategy that spreads risk by investing in a variety of different assets or securities.",
    example: "Instead of putting all your money in one stock, you might invest in stocks, bonds, and real estate to reduce overall risk.",
    category: "Portfolio Management"
  },
  {
    term: "Market Capitalization",
    definition: "The total value of a company's shares in the stock market, calculated by multiplying share price by total number of shares.",
    example: "If a company has 1 million shares trading at $50 each, its market cap is $50 million.",
    category: "Valuation"
  },
  {
    term: "Bull Market",
    definition: "A period of rising stock prices and investor optimism, typically lasting months or years.",
    example: "The stock market experienced a bull market from 2009 to 2020, with major indices reaching new highs regularly.",
    category: "Market Trends"
  },
  {
    term: "Dividend Yield",
    definition: "The annual dividend payment expressed as a percentage of the stock's current price.",
    example: "If a stock costs $100 and pays $4 in annual dividends, the dividend yield is 4%.",
    category: "Income Investing"
  },
  {
    term: "Bear Market",
    definition: "A market condition where prices fall 20% or more from recent highs, often accompanied by pessimism.",
    example: "During the 2008 financial crisis, the S&P 500 dropped over 50% from its peak, marking a severe bear market.",
    category: "Market Trends"
  },
  {
    term: "P/E Ratio",
    definition: "Price-to-Earnings ratio measures a company's current share price relative to its earnings per share.",
    example: "A stock trading at $50 with earnings of $5 per share has a P/E ratio of 10.",
    category: "Valuation"
  },
  {
    term: "ETF",
    definition: "Exchange-Traded Fund - a basket of securities that trades on an exchange like a single stock.",
    example: "SPY is an ETF that tracks the S&P 500, letting you invest in 500 companies with one purchase.",
    category: "Investment Vehicles"
  },
  {
    term: "Liquidity",
    definition: "How quickly an asset can be converted to cash without significantly affecting its price.",
    example: "Stocks are highly liquid (sell in seconds), while real estate is illiquid (can take months to sell).",
    category: "Finance Basics"
  },
  {
    term: "Dollar-Cost Averaging",
    definition: "Investing a fixed amount regularly regardless of market conditions to reduce timing risk.",
    example: "Investing $500 monthly into an index fund, you buy more shares when prices are low and fewer when high.",
    category: "Investment Strategy"
  },
  {
    term: "Asset Allocation",
    definition: "The strategy of dividing investments among different asset categories like stocks, bonds, and cash.",
    example: "A 60/40 portfolio means 60% in stocks and 40% in bonds.",
    category: "Portfolio Management"
  },
  {
    term: "Inflation",
    definition: "The rate at which the general level of prices for goods and services rises, eroding purchasing power.",
    example: "If inflation is 3%, something that costs $100 today will cost $103 next year.",
    category: "Economics"
  },
  {
    term: "ROI",
    definition: "Return on Investment - a measure of profit relative to the cost of the investment.",
    example: "If you invest $1,000 and sell for $1,200, your ROI is 20%.",
    category: "Performance Metrics"
  },
  {
    term: "Volatility",
    definition: "A measure of how much and how quickly the price of an asset fluctuates.",
    example: "Crypto is highly volatile (can move 10% daily), while Treasury bonds have low volatility.",
    category: "Risk"
  },
  {
    term: "Blue Chip Stocks",
    definition: "Shares of large, well-established companies with a history of reliable performance.",
    example: "Apple, Microsoft, and Johnson & Johnson are considered blue chip stocks.",
    category: "Equities"
  },
  {
    term: "Index Fund",
    definition: "A type of mutual fund designed to match the performance of a market index.",
    example: "A total stock market index fund holds thousands of stocks to mirror the entire market.",
    category: "Investment Vehicles"
  },
  {
    term: "Capital Gains",
    definition: "The profit earned when you sell an asset for more than you paid for it.",
    example: "Buy a stock at $50, sell at $75 = $25 capital gain per share.",
    category: "Taxation"
  },
  {
    term: "Emergency Fund",
    definition: "Savings set aside to cover unexpected expenses or financial emergencies.",
    example: "Having 3-6 months of living expenses in a savings account for job loss or medical bills.",
    category: "Personal Finance"
  },
  {
    term: "Net Worth",
    definition: "The total value of what you own (assets) minus what you owe (liabilities).",
    example: "If you have $50,000 in assets and $20,000 in debt, your net worth is $30,000.",
    category: "Personal Finance"
  },
  {
    term: "Mutual Fund",
    definition: "A pooled investment that combines money from many investors to buy a diversified portfolio.",
    example: "A growth mutual fund might hold 100+ stocks selected by a professional manager.",
    category: "Investment Vehicles"
  },
  {
    term: "Bond",
    definition: "A loan you make to a government or company in exchange for periodic interest payments.",
    example: "A 10-year Treasury bond pays you interest twice a year and returns your principal at maturity.",
    category: "Fixed Income"
  },
  {
    term: "Risk Tolerance",
    definition: "Your ability and willingness to endure declines in your investment portfolio.",
    example: "High risk tolerance: comfortable with 30% drops. Low risk tolerance: panics at 10% drops.",
    category: "Investing Psychology"
  },
  {
    term: "Hedge Fund",
    definition: "A private investment fund that uses advanced strategies to generate returns for wealthy investors.",
    example: "Hedge funds might short stocks, use leverage, or trade derivatives to profit in any market.",
    category: "Alternative Investments"
  },
  {
    term: "IPO",
    definition: "Initial Public Offering - when a private company first sells shares to the public.",
    example: "When Facebook had its IPO in 2012, anyone could buy shares for the first time.",
    category: "Equities"
  },
  {
    term: "Short Selling",
    definition: "Borrowing shares to sell them, hoping to buy them back cheaper later for a profit.",
    example: "Short a stock at $100, buy it back at $70 = $30 profit per share.",
    category: "Trading"
  }
];

const TermOfTheDay = () => {
  const [showExample, setShowExample] = useState(false);
  const [randomOffset, setRandomOffset] = useState(0);

  // Get a consistent term based on the current date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const termIndex = (dayOfYear + randomOffset) % financialTerms.length;
  const currentTerm = financialTerms[termIndex];

  const handleSurpriseMe = () => {
    // Get a random offset that's different from current
    let newOffset = Math.floor(Math.random() * (financialTerms.length - 1)) + 1;
    setRandomOffset((prev) => (prev + newOffset) % financialTerms.length);
    setShowExample(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="flex items-center justify-between text-lg text-amber-800">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            Term of the Day
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSurpriseMe}
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 h-8 px-2 gap-1"
          >
            <Shuffle className="h-4 w-4" />
            <span className="text-xs">Surprise me</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 space-y-3">
        <div className="bg-amber-100 rounded-lg p-3 border border-amber-200">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-amber-900">{currentTerm.term}</h3>
            <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
              {currentTerm.category}
            </span>
          </div>
          <p className="text-sm text-amber-800">{currentTerm.definition}</p>
          
          {/* Collapsible example */}
          <button 
            onClick={() => setShowExample(!showExample)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 mt-2 transition-colors"
          >
            {showExample ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showExample ? 'Hide example' : 'Show example'}
          </button>
          
          {showExample && (
            <div className="bg-white rounded-md p-2 border border-amber-300 mt-2">
              <p className="text-xs text-amber-700">
                <span className="font-semibold">Example: </span>
                {currentTerm.example}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TermOfTheDay;
