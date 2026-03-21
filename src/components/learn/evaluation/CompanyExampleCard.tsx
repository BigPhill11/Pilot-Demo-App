import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompanyExample } from '@/data/evaluation-lessons';
import { TrendingUp } from 'lucide-react';

interface CompanyExampleCardProps {
  example: CompanyExample;
}

const CompanyExampleCard: React.FC<CompanyExampleCardProps> = ({ example }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          {example.companyName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Scenario</h4>
          <p className="text-sm">{example.scenario}</p>
        </div>

        {example.metrics && Object.keys(example.metrics).length > 0 && (
          <div className="bg-muted/50 p-3 rounded-lg space-y-1">
            {Object.entries(example.metrics).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Outcome</h4>
          <p className="text-sm">{example.outcome}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800 p-3 rounded-lg">
          <h4 className="text-xs font-semibold text-green-800 dark:text-green-200 mb-1">
            💡 Lesson Learned
          </h4>
          <p className="text-sm text-green-700 dark:text-green-300">{example.lesson}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyExampleCard;
