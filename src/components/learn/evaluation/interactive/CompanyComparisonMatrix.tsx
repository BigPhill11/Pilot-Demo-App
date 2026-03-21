import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyMetrics {
  name: string;
  stockPrice: number;
  earnings: number;
  pe: number;
  marketCap: string;
  debtToEquity: number;
  growth: number;
}

const companies: CompanyMetrics[] = [
  {
    name: 'MatureCorp',
    stockPrice: 60,
    earnings: 4,
    pe: 15,
    marketCap: '$50B',
    debtToEquity: 0.5,
    growth: 5
  },
  {
    name: 'GrowthTech',
    stockPrice: 200,
    earnings: 4,
    pe: 50,
    marketCap: '$100B',
    debtToEquity: 0.2,
    growth: 40
  },
  {
    name: 'RiskyBet',
    stockPrice: 30,
    earnings: 3,
    pe: 10,
    marketCap: '$5B',
    debtToEquity: 3.0,
    growth: 8
  },
  {
    name: 'StableCo',
    stockPrice: 100,
    earnings: 5,
    pe: 20,
    marketCap: '$150B',
    debtToEquity: 0.8,
    growth: 12
  }
];

const CompanyComparisonMatrix: React.FC = () => {
  const getColor = (value: number, metric: 'pe' | 'debt' | 'growth') => {
    if (metric === 'pe') {
      if (value < 15) return 'text-green-600';
      if (value < 30) return 'text-yellow-600';
      return 'text-orange-600';
    }
    if (metric === 'debt') {
      if (value < 1) return 'text-green-600';
      if (value < 2) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (metric === 'growth') {
      if (value < 10) return 'text-orange-600';
      if (value < 20) return 'text-yellow-600';
      return 'text-green-600';
    }
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Compare valuation metrics across 4 different companies
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {companies.map((company, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{company.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{company.marketCap} Market Cap</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs">Stock Price</div>
                  <div className="font-semibold">${company.stockPrice}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Earnings/Share</div>
                  <div className="font-semibold">${company.earnings}</div>
                </div>
              </div>

              <div className="space-y-2 border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">P/E Ratio:</span>
                  <span className={`font-bold ${getColor(company.pe, 'pe')}`}>
                    {company.pe}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Debt-to-Equity:</span>
                  <span className={`font-bold ${getColor(company.debtToEquity, 'debt')}`}>
                    {company.debtToEquity.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Growth Rate:</span>
                  <span className={`font-bold ${getColor(company.growth, 'growth')}`}>
                    {company.growth}%
                  </span>
                </div>
              </div>

              <div className="text-xs bg-muted p-2 rounded">
                P/E = ${company.stockPrice} ÷ ${company.earnings} = {company.pe}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Analysis Guide:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div>
              <div className="font-semibold mb-1">MatureCorp</div>
              <p>Low P/E (15), low debt, slow growth - stable investment</p>
            </div>
            <div>
              <div className="font-semibold mb-1">GrowthTech</div>
              <p>High P/E (50), low debt, high growth - priced for future</p>
            </div>
            <div>
              <div className="font-semibold mb-1">RiskyBet</div>
              <p>Low P/E but HIGH debt (3.0) - red flag! Risky despite low price</p>
            </div>
            <div>
              <div className="font-semibold mb-1">StableCo</div>
              <p>Balanced metrics, large cap - steady performer</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyComparisonMatrix;
