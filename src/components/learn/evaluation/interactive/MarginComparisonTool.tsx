import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CompanyData {
  name: string;
  revenue: number;
  profit: number;
  margin: number;
  industry: string;
}

const sampleCompanies: CompanyData[] = [
  { name: 'TechCorp', revenue: 100, profit: 25, margin: 25, industry: 'Software' },
  { name: 'RetailMart', revenue: 200, profit: 10, margin: 5, industry: 'Retail' },
  { name: 'CloudSoft', revenue: 80, profit: 56, margin: 70, industry: 'Software' },
  { name: 'GroceryChain', revenue: 500, profit: 15, margin: 3, industry: 'Grocery' },
];

const MarginComparisonTool: React.FC = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([0, 1]);

  const compare = (index: number) => {
    if (selectedCompanies.includes(index)) {
      setSelectedCompanies(selectedCompanies.filter(i => i !== index));
    } else if (selectedCompanies.length < 2) {
      setSelectedCompanies([...selectedCompanies, index]);
    } else {
      setSelectedCompanies([selectedCompanies[1], index]);
    }
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 20) return 'bg-green-500';
    if (margin >= 10) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Select two companies to compare their profit margins
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sampleCompanies.map((company, index) => (
          <Button
            key={index}
            variant={selectedCompanies.includes(index) ? 'default' : 'outline'}
            onClick={() => compare(index)}
            className="h-auto flex-col items-start p-3"
          >
            <div className="font-semibold">{company.name}</div>
            <div className="text-xs opacity-70">{company.industry}</div>
          </Button>
        ))}
      </div>

      {selectedCompanies.length === 2 && (
        <div className="grid md:grid-cols-2 gap-4">
          {selectedCompanies.map((index) => {
            const company = sampleCompanies[index];
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <div className="text-xs text-muted-foreground">{company.industry}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Revenue:</span>
                      <span className="font-semibold">${company.revenue}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Profit:</span>
                      <span className="font-semibold">${company.profit}M</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profit Margin:</span>
                      <span className="font-bold text-lg">{company.margin}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full ${getMarginColor(company.margin)} transition-all`}
                        style={{ width: `${Math.min(company.margin, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs bg-muted p-2 rounded">
                    Calculation: ${company.profit}M / ${company.revenue}M = {company.margin}%
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg text-sm">
        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">💡 What This Shows:</h4>
        <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
          <li>• Software companies have much higher margins (70% vs 5%)</li>
          <li>• Doesn't mean software is "better" - just different business models</li>
          <li>• Low margins can work with high volume (groceries)</li>
          <li>• Always compare within the same industry!</li>
        </ul>
      </div>
    </div>
  );
};

export default MarginComparisonTool;
