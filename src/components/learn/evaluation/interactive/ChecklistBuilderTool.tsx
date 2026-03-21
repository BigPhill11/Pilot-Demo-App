import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ChecklistItem {
  id: string;
  category: 'financial' | 'valuation' | 'sentiment' | 'risk';
  label: string;
  description: string;
  importance: 'must-have' | 'nice-to-have';
}

const availableCriteria: ChecklistItem[] = [
  // Financial
  {
    id: 'revenue-growth',
    category: 'financial',
    label: 'Revenue Growth >10% annually',
    description: 'Company is expanding and capturing market share',
    importance: 'must-have'
  },
  {
    id: 'positive-margins',
    category: 'financial',
    label: 'Positive Profit Margins',
    description: 'Actually making money, not just burning cash',
    importance: 'must-have'
  },
  {
    id: 'low-debt',
    category: 'financial',
    label: 'Debt-to-Equity <2.0',
    description: 'Manageable debt levels',
    importance: 'must-have'
  },
  {
    id: 'cash-flow',
    category: 'financial',
    label: 'Positive Free Cash Flow',
    description: 'Generating cash, not burning it',
    importance: 'nice-to-have'
  },
  
  // Valuation
  {
    id: 'reasonable-pe',
    category: 'valuation',
    label: 'Reasonable P/E Ratio',
    description: 'Not wildly overvalued compared to growth',
    importance: 'must-have'
  },
  {
    id: 'below-peak',
    category: 'valuation',
    label: 'Not at all-time high',
    description: 'Some upside potential remaining',
    importance: 'nice-to-have'
  },
  {
    id: 'competitive-valuation',
    category: 'valuation',
    label: 'Competitive vs peers',
    description: 'Valuation in line with similar companies',
    importance: 'nice-to-have'
  },
  
  // Sentiment
  {
    id: 'positive-news',
    category: 'sentiment',
    label: 'More positive than negative news',
    description: 'Recent catalysts are favorable',
    importance: 'must-have'
  },
  {
    id: 'analyst-buy',
    category: 'sentiment',
    label: 'Majority analyst BUY ratings',
    description: 'Professional consensus is positive',
    importance: 'nice-to-have'
  },
  {
    id: 'social-balanced',
    category: 'sentiment',
    label: 'Social sentiment positive but not hyped',
    description: 'Interest without FOMO mania',
    importance: 'nice-to-have'
  },
  
  // Risk
  {
    id: 'no-fraud',
    category: 'risk',
    label: 'No fraud or scandal allegations',
    description: 'Clean management reputation',
    importance: 'must-have'
  },
  {
    id: 'stable-industry',
    category: 'risk',
    label: 'Not in declining industry',
    description: 'Industry has growth runway',
    importance: 'must-have'
  },
  {
    id: 'diversified',
    category: 'risk',
    label: 'Diversified revenue streams',
    description: 'Not dependent on one customer/product',
    importance: 'nice-to-have'
  }
];

const ChecklistBuilderTool: React.FC = () => {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleToggle = (id: string) => {
    setSelectedCriteria(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    if (selectedCriteria.length < 5) {
      toast.error('Select at least 5 criteria for a comprehensive checklist');
      return;
    }
    setShowSummary(true);
    toast.success('Checklist created! 🎉');
  };

  const selectedItems = availableCriteria.filter(item => selectedCriteria.includes(item.id));
  const mustHaveSelected = selectedItems.filter(item => item.importance === 'must-have').length;
  const totalMustHave = availableCriteria.filter(item => item.importance === 'must-have').length;

  const categoryCounts = {
    financial: selectedItems.filter(i => i.category === 'financial').length,
    valuation: selectedItems.filter(i => i.category === 'valuation').length,
    sentiment: selectedItems.filter(i => i.category === 'sentiment').length,
    risk: selectedItems.filter(i => i.category === 'risk').length
  };

  if (showSummary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Investment Checklist</CardTitle>
          <CardDescription>
            {selectedCriteria.length} criteria selected
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-700 dark:text-green-300">
                Checklist Complete!
              </h4>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              You've created a comprehensive checklist with {mustHaveSelected}/{totalMustHave} must-have criteria covered.
            </p>
          </div>

          <div className="space-y-3">
            {['financial', 'valuation', 'sentiment', 'risk'].map(category => {
              const items = selectedItems.filter(i => i.category === category);
              if (items.length === 0) return null;

              return (
                <div key={category}>
                  <h4 className="font-semibold capitalize mb-2">{category} Criteria ({items.length})</h4>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>💡 Pro Tip:</strong> Use this checklist every time you evaluate a company. 
              If a stock fails multiple must-have criteria, walk away. If it passes all, do deeper research!
            </p>
          </div>

          <Button onClick={() => setShowSummary(false)} variant="outline" className="w-full">
            Edit Checklist
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Build Your Investment Checklist</CardTitle>
        <CardDescription>
          Select criteria that matter most to you. Must-haves are essential, nice-to-haves are bonus.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {selectedCriteria.length} criteria selected
          </span>
          <span className="font-medium">
            {mustHaveSelected}/{totalMustHave} must-haves
          </span>
        </div>

        {/* Categories */}
        {['financial', 'valuation', 'sentiment', 'risk'].map(category => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold capitalize">{category}</h4>
              <Badge variant="secondary">
                {categoryCounts[category as keyof typeof categoryCounts]} selected
              </Badge>
            </div>
            
            <div className="space-y-2">
              {availableCriteria
                .filter(item => item.category === category)
                .map(item => (
                  <div 
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleToggle(item.id)}
                  >
                    <Checkbox 
                      checked={selectedCriteria.includes(item.id)}
                      onCheckedChange={() => handleToggle(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{item.label}</p>
                        {item.importance === 'must-have' && (
                          <Badge variant="destructive" className="text-xs">Must-have</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full" 
          size="lg"
          disabled={selectedCriteria.length < 5}
        >
          {selectedCriteria.length < 5 
            ? `Select ${5 - selectedCriteria.length} more criteria` 
            : 'Save My Checklist'
          }
        </Button>

        {selectedCriteria.length >= 5 && mustHaveSelected < totalMustHave && (
          <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                Consider including more "must-have" criteria to ensure thorough evaluation.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChecklistBuilderTool;
