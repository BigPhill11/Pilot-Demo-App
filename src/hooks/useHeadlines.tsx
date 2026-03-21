
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const useHeadlines = (userLevel: string = 'beginner') => {
  const fetchHeadlines = async () => {
    console.log('Fetching headlines...');
    const { data, error } = await supabase.functions.invoke('market-headlines', {
      body: { userLevel }
    });
    if (error) {
      console.error('Headlines fetch error:', error);
      throw new Error(error.message);
    }
    console.log('Headlines data received:', data);
    return data || { headlines: [], marketRecap: null };
  };

  return useQuery({
    queryKey: ['marketHeadlines', userLevel],
    queryFn: fetchHeadlines,
    staleTime: 0, // Always fetch fresh AI-generated content
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
  });
};

export default useHeadlines;
