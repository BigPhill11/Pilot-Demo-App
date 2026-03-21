
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Building2, TrendingUp, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface FavoriteCompany {
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
}

interface FavoriteCompaniesProps {
  onBack: () => void;
}

const FavoriteCompanies: React.FC<FavoriteCompaniesProps> = ({ onBack }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_company_interactions')
        .select(`
          company_id,
          companies (
            id,
            name,
            ticker,
            logo_url,
            industry,
            headquarters,
            market_cap,
            revenue_ttm,
            pe_ratio,
            overview,
            kpis,
            financials,
            market_sentiment,
            analyst_sentiment,
            historical_performance,
            sector,
            sub_sector
          )
        `)
        .eq('user_id', user.id)
        .eq('interaction_type', 'heart');

      if (error) throw error;

      const favoriteCompanies = data
        ?.filter(item => item.companies)
        .map(item => item.companies as FavoriteCompany) || [];

      setFavorites(favoriteCompanies);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorite companies');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (companyId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_company_interactions')
        .delete()
        .eq('user_id', user.id)
        .eq('company_id', companyId)
        .eq('interaction_type', 'heart');

      if (error) throw error;

      setFavorites(prev => prev.filter(company => company.id !== companyId));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading your favorite companies...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span>Your Favorite Companies</span>
            </h2>
            <p className="text-sm text-muted-foreground">Companies you've hearted during your discovery</p>
          </div>
        </div>
        <Badge variant="secondary">{favorites.length} favorites</Badge>
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start browsing companies and heart the ones you're interested in!
            </p>
            <Button onClick={onBack}>
              Start Discovering
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {favorites.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {company.logo_url ? (
                      <img 
                        src={company.logo_url} 
                        alt={`${company.name} logo`} 
                        className="h-12 w-12 rounded-full object-contain"
                      />
                    ) : (
                      <div className="p-2 rounded-full bg-muted">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl">{company.name} ({company.ticker})</CardTitle>
                      <p className="text-sm text-muted-foreground">{company.industry}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(company.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{company.overview}</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Market Cap</p>
                      <p className="font-semibold">{company.market_cap}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">P/E Ratio</p>
                      <p className="font-semibold">{company.pe_ratio}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Revenue TTM</p>
                      <p className="font-semibold text-xs">{company.revenue_ttm}</p>
                    </div>
                  </div>

                  {company.kpis && company.kpis.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {company.kpis.slice(0, 4).map((kpi, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{kpi.title}:</span>
                            <span className="font-medium">{kpi.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {company.market_sentiment && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-1">Market Sentiment</h5>
                      <p className="text-sm text-blue-800 italic">"{company.market_sentiment}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCompanies;
