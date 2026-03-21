
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Building2 } from 'lucide-react';
import { Company } from './CompanyManager';

interface CompanyListProps {
  companies: Company[];
  loading: boolean;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading companies...</p>
        </CardContent>
      </Card>
    );
  }

  if (companies.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No companies found. Add some companies to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <Card key={company.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {company.logo_url ? (
                  <img 
                    src={company.logo_url} 
                    alt={`${company.name} logo`} 
                    className="h-12 w-12 rounded-full object-contain"
                  />
                ) : (
                  <div className="p-3 rounded-full bg-muted">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{company.name} ({company.ticker})</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                  <p className="text-xs text-muted-foreground">{company.headquarters}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right text-sm">
                  <p><strong>Market Cap:</strong> {company.market_cap}</p>
                  <p><strong>P/E Ratio:</strong> {company.pe_ratio}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(company)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(company.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompanyList;
