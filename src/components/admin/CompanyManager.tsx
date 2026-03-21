
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import CompanyForm from './CompanyForm';
import CompanyActions from './CompanyActions';
import CompanyTabs from './CompanyTabs';
import { CompanyManagerProvider, useCompanyManager } from './CompanyManagerProvider';

export interface Company {
  id: string;
  name: string;
  ticker: string;
  logo_url?: string;
  industry: string;
  headquarters: string;
  market_cap: string;
  revenue_ttm: string;
  pe_ratio: string;
  overview: string;
  kpis: Array<{ title: string; value: string }>;
  financials: Array<{ title: string; value: string }>;
  market_sentiment?: string;
  analyst_sentiment?: string;
  historical_performance?: string;
  sector?: string;
  sub_sector?: string;
  created_at: string;
  updated_at: string;
}

const CompanyManagerContent: React.FC = () => {
  const { user } = useAuth();
  const { editingCompany, showForm, setShowForm, setEditingCompany, handleCompanySubmit } = useCompanyManager();

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Please log in to access admin features.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <CompanyActions />
      <CompanyTabs />
      
      {showForm && (
        <CompanyForm
          company={editingCompany}
          onSubmit={handleCompanySubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
        />
      )}
    </div>
  );
};

const CompanyManager: React.FC = () => {
  return (
    <CompanyManagerProvider>
      <CompanyManagerContent />
    </CompanyManagerProvider>
  );
};

export default CompanyManager;
