import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Company } from './CompanyManager';
import { findMatchingSubdivision, sectorSubdivisions } from '@/data/sector-subdivisions';

interface CompanyManagerContextType {
  companies: Company[];
  loading: boolean;
  editingCompany: Company | null;
  showForm: boolean;
  setEditingCompany: (company: Company | null) => void;
  setShowForm: (show: boolean) => void;
  fetchCompanies: () => Promise<void>;
  handleCompanySubmit: (companyData: Partial<Company>) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleEdit: (company: Company) => void;
  handleCSVUpload: (csvData: any[]) => Promise<void>;
}

const CompanyManagerContext = createContext<CompanyManagerContextType | undefined>(undefined);

export const useCompanyManager = () => {
  const context = useContext(CompanyManagerContext);
  if (!context) {
    throw new Error('useCompanyManager must be used within a CompanyManagerProvider');
  }
  return context;
};

interface CompanyManagerProviderProps {
  children: ReactNode;
}

export const CompanyManagerProvider: React.FC<CompanyManagerProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Auto-assign subdivision and update subdivision data
  const assignToSubdivision = (company: { industry: string; sector?: string; ticker: string }) => {
    const matchingSubdivision = findMatchingSubdivision(company);
    
    if (matchingSubdivision && !matchingSubdivision.companies.includes(company.ticker)) {
      // Add company to subdivision
      matchingSubdivision.companies.push(company.ticker);
      console.log(`Auto-assigned ${company.ticker} to subdivision: ${matchingSubdivision.name}`);
    }
    
    return matchingSubdivision;
  };

  const parseJSONField = (field: any): Array<{ title: string; value: string }> => {
    if (!field) return [];
    
    try {
      if (typeof field === 'string') {
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed.filter(item => 
          item && typeof item === 'object' && 'title' in item && 'value' in item
        ) : [];
      }
      if (Array.isArray(field)) {
        return field.filter(item => 
          item && typeof item === 'object' && 'title' in item && 'value' in item
        );
      }
    } catch (e) {
      console.warn('Failed to parse JSON field:', field);
    }
    
    return [];
  };

  const fetchCompanies = async () => {
    try {
      // TODO: Replace 'companies' with actual table name once created
      // const { data, error } = await supabase
      //   .from('companies')
      //   .select('*')
      //   .order('created_at', { ascending: false });

      // if (error) throw error;
      
      // Temporarily return empty array until companies table is created
      const data: any[] = [];
      
      const convertedData: Company[] = (data || []).map(company => ({
        id: company.id,
        name: company.name,
        ticker: company.ticker,
        logo_url: company.logo_url,
        industry: company.industry,
        headquarters: company.headquarters,
        market_cap: company.market_cap,
        revenue_ttm: company.revenue_ttm,
        pe_ratio: company.pe_ratio,
        overview: company.overview,
        kpis: Array.isArray(company.kpis) ? 
          company.kpis.filter((kpi): kpi is { title: string; value: string } => 
            typeof kpi === 'object' && kpi !== null && 'title' in kpi && 'value' in kpi &&
            typeof kpi.title === 'string' && typeof kpi.value === 'string'
          ) : [],
        financials: Array.isArray(company.financials) ? 
          company.financials.filter((fin): fin is { title: string; value: string } => 
            typeof fin === 'object' && fin !== null && 'title' in fin && 'value' in fin &&
            typeof fin.title === 'string' && typeof fin.value === 'string'
          ) : [],
        market_sentiment: company.market_sentiment,
        analyst_sentiment: company.analyst_sentiment,
        historical_performance: company.historical_performance,
        sector: company.sector,
        sub_sector: company.sub_sector,
        created_at: company.created_at,
        updated_at: company.updated_at
      }));
      
      // Auto-assign companies to subdivisions
      convertedData.forEach(company => {
        assignToSubdivision({
          industry: company.industry,
          sector: company.sector,
          ticker: company.ticker
        });
      });
      
      setCompanies(convertedData);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySubmit = async (companyData: Partial<Company>) => {
    try {
      // TODO: Replace with actual table once created
      toast.error('Companies table not yet created');
      return;
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error('Failed to save company');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      // TODO: Replace with actual table once created
      toast.error('Companies table not yet created');
      return;
      
      // const { error } = await supabase
      //   .from('companies')
      //   .delete()
      //   .eq('id', id);

      // if (error) throw error;
      // toast.success('Company deleted successfully');
      // fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company');
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleCSVUpload = async (csvData: any[]) => {
    try {
      // TODO: Replace with actual table once created
      toast.error('Companies table not yet created');
      return;
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast.error('Failed to upload companies from CSV');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const value: CompanyManagerContextType = {
    companies,
    loading,
    editingCompany,
    showForm,
    setEditingCompany,
    setShowForm,
    fetchCompanies,
    handleCompanySubmit,
    handleDelete,
    handleEdit,
    handleCSVUpload
  };

  return (
    <CompanyManagerContext.Provider value={value}>
      {children}
    </CompanyManagerContext.Provider>
  );
};
