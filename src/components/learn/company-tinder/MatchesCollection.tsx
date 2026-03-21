import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Star, Building2 } from 'lucide-react';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface MatchesCollectionProps {
  onBack: () => void;
  companies: CompanyProfile[];
}

const MatchesCollection: React.FC<MatchesCollectionProps> = ({ onBack, companies }) => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, [user]);

  const loadMatches = async () => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const savedMatches = localStorage.getItem('tinderMatches');
      if (savedMatches) {
        const matchIds = JSON.parse(savedMatches);
        const matchedCompanies = companies.filter(c => matchIds.includes(c.id));
        setMatches(matchedCompanies);
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_company_interactions')
        .select('company_id, interaction_type')
        .eq('user_id', user.id)
        .in('interaction_type', ['like', 'super_like']);

      if (error) throw error;

      const matchedCompanyIds = data?.map(d => d.company_id) || [];
      const matchedCompanies = companies.filter(c => matchedCompanyIds.includes(c.id));
      setMatches(matchedCompanies);
    } catch (error) {
      console.error('Error loading matches:', error);
      toast.error('Failed to load your matches');
    } finally {
      setLoading(false);
    }
  };

  const removeMatch = async (companyId: string) => {
    if (user) {
      try {
        await supabase
          .from('user_company_interactions')
          .delete()
          .eq('user_id', user.id)
          .eq('company_id', companyId);
      } catch (error) {
        console.error('Error removing match:', error);
      }
    } else {
      const savedMatches = localStorage.getItem('tinderMatches');
      if (savedMatches) {
        const matchIds = JSON.parse(savedMatches).filter((id: string) => id !== companyId);
        localStorage.setItem('tinderMatches', JSON.stringify(matchIds));
      }
    }

    setMatches(matches.filter(m => m.id !== companyId));
    toast.success('Match removed');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading your matches...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Swiping
        </Button>
        <h1 className="text-2xl font-bold">Your Matches 💘</h1>
        <div className="w-24" /> {/* Spacer for centering */}
      </div>

      {matches.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No matches yet</h3>
            <p className="text-muted-foreground mb-4">
              Start swiping to find companies you love!
            </p>
            <Button onClick={onBack}>Start Swiping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((company) => (
            <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {company.logoUrl && (
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{company.ticker}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground">{company.industry}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Market Cap</p>
                    <p className="font-semibold">{company.marketCap}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">P/E Ratio</p>
                    <p className="font-semibold">{company.peRatio}</p>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMatch(company.id)}
                    className="flex-1"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="text-center pt-4">
        <p className="text-muted-foreground">
          {matches.length} {matches.length === 1 ? 'match' : 'matches'} in your collection
        </p>
      </div>
    </div>
  );
};

export default MatchesCollection;
