
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Heart, Settings, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvestorDiscoveryFlow from './investor/InvestorDiscoveryFlow';
import FavoriteCompanies from './FavoriteCompanies';
import CompanyManager from '../admin/CompanyManager';
import CompanyEvaluationLessons from './evaluation/CompanyEvaluationLessons';
import CompanyTinderGame from './company-tinder/CompanyTinderGame';
import { useCompanies } from '@/hooks/useCompanies';
import { useAuth } from '@/hooks/useAuth';
import { recordPathTouched } from '@/hooks/useDashboardProgress';

const CompanyDiscoveryTab: React.FC = () => {
  const { user } = useAuth();
  const { companies, loading } = useCompanies();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Track that user visited this tab for dashboard goal prioritization
  useEffect(() => {
    recordPathTouched('companyDiscovery');
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading companies...</p>
      </div>
    );
  }

  if (showFavorites) {
    return <FavoriteCompanies onBack={() => setShowFavorites(false)} />;
  }

  if (showAdmin) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => setShowAdmin(false)}
          className="mb-4"
        >
          ← Back to Discovery
        </Button>
        <CompanyManager />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Company Discovery</h1>
          <p className="text-muted-foreground">Explore companies and find your next investment opportunity</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {user && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setShowFavorites(true)}
                className="flex items-center space-x-2"
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAdmin(true)}
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="speed-dating" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="speed-dating" className="flex items-center space-x-2">
            <span className="text-lg">💘</span>
            <span>Company Tinder</span>
          </TabsTrigger>
          <TabsTrigger value="investor-discovery" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Investor Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>Learn to Evaluate</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="speed-dating" className="mt-6">
          <CompanyTinderGame companies={companies} />
        </TabsContent>
        
        <TabsContent value="investor-discovery" className="mt-6">
          <InvestorDiscoveryFlow />
        </TabsContent>

        <TabsContent value="learn" className="mt-6">
          <CompanyEvaluationLessons />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDiscoveryTab;
