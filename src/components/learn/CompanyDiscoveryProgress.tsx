
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface CompanyDiscoveryProgressProps {
  currentIndex: number;
  totalCompanies: number;
  allViewed: boolean;
  onReset: () => void;
}

const CompanyDiscoveryProgress: React.FC<CompanyDiscoveryProgressProps> = ({ 
  currentIndex, 
  totalCompanies, 
  allViewed, 
  onReset 
}) => {
  if (allViewed) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground mb-4">
          {totalCompanies > 0 ? "You've seen all companies for now!" : "No companies loaded."}
        </p>
        {totalCompanies > 0 && (
          <Button onClick={onReset}>
            <RotateCcw className="mr-2 h-4 w-4" /> Start Over
          </Button>
        )}
      </div>
    );
  }

  return (
    <p className="text-center text-sm text-muted-foreground mt-6">
      Showing company {Math.min(currentIndex + 1, totalCompanies)} of {totalCompanies}
    </p>
  );
};

export default CompanyDiscoveryProgress;
