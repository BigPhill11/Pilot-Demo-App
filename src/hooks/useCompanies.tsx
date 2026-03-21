
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { companyProfiles } from '@/data/company-profiles';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import { getAllSubdivisions } from '@/data/sector-subdivisions';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert database companies to CompanyProfile format with proper type casting
      const dbCompanies: CompanyProfile[] = (data || []).map(company => ({
        id: company.id,
        name: company.name,
        ticker: company.ticker,
        logoUrl: company.logo_url,
        industry: company.industry,
        headquarters: company.headquarters,
        marketCap: company.market_cap,
        revenueTTM: company.revenue_ttm,
        peRatio: company.pe_ratio,
        professional: {
          overview: company.overview,
          kpis: Array.isArray(company.kpis) ? 
            company.kpis.filter((kpi): kpi is { title: string; value: string } => 
              typeof kpi === 'object' && kpi !== null && 'title' in kpi && 'value' in kpi
            ) : [],
          financials: Array.isArray(company.financials) ? 
            company.financials.filter((fin): fin is { title: string; value: string } => 
              typeof fin === 'object' && fin !== null && 'title' in fin && 'value' in fin
            ) : []
        },
        dating: {
          marketSentiment: company.market_sentiment || "Just getting to know the market, but I'm optimistic about the future!",
          analystSentiment: company.analyst_sentiment || "The experts seem to like what they see in me.",
          historicalPerformance: company.historical_performance || "I've had my ups and downs, but I'm here for the long haul."
        }
      }));

      // Update subdivision data with all companies (static + dynamic)
      const allCompanies = [...companyProfiles, ...dbCompanies];
      const subdivisions = getAllSubdivisions();
      
      // Update subdivision company lists to include both static and uploaded companies
      subdivisions.forEach(subdivision => {
        const matchingCompanies = allCompanies.filter(company => 
          subdivision.companies.includes(company.ticker) ||
          subdivision.industryKeywords.some(keyword => 
            company.industry.toLowerCase().includes(keyword)
          )
        );
        
        // Update the subdivision with all matching tickers
        subdivision.companies = [...new Set(matchingCompanies.map(c => c.ticker))];
      });

      // Merge with static companies, avoiding duplicates
      const staticCompanyTickers = companyProfiles.map(c => c.ticker);
      const uniqueDbCompanies = dbCompanies.filter(c => !staticCompanyTickers.includes(c.ticker));
      
      setCompanies([...companyProfiles, ...uniqueDbCompanies]);
    } catch (error) {
      console.error('Error fetching companies:', error);
      // Fallback to static companies if database fetch fails
      setCompanies(companyProfiles);
    } finally {
      setLoading(false);
    }
  };

  return { companies, loading, refetch: fetchCompanies };
};
