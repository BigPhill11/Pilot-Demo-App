import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Shield, Target } from 'lucide-react';

interface WealthManagementJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
  isCompleted: boolean;
}

const WealthManagementJourneyHeader: React.FC<WealthManagementJourneyHeaderProps> = ({
  completedLevels,
  totalLevels,
  isCompleted
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold text-emerald-800 mb-2">
            Wealth Management Journey
          </CardTitle>
          
          <CardDescription className="text-lg text-emerald-700 max-w-3xl mx-auto">
            Master the art of holistic financial advisory. Learn to help clients grow, protect, and transfer wealth through comprehensive planning strategies.
          </CardDescription>
          
          <div className="flex justify-center space-x-2 mt-4">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              {completedLevels}/{totalLevels} Levels Complete
            </Badge>
            {isCompleted && (
              <Badge className="bg-emerald-500 text-white">
                Journey Mastered!
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-emerald-700 max-w-2xl mx-auto">
            From financial planning foundations to advanced client relations, this journey covers everything you need to become a skilled wealth management professional.
          </p>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-800">Holistic Planning</h3>
            <p className="text-sm text-muted-foreground">Comprehensive financial strategies</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="h-8 w-8 text-teal-500 mx-auto mb-2" />
            <h3 className="font-semibold text-teal-800">Client Relations</h3>
            <p className="text-sm text-muted-foreground">Building lasting partnerships</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-emerald-800">Risk Management</h3>
            <p className="text-sm text-muted-foreground">Protecting client wealth</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="h-8 w-8 text-teal-600 mx-auto mb-2" />
            <h3 className="font-semibold text-teal-800">Goal Achievement</h3>
            <p className="text-sm text-muted-foreground">Tailored financial solutions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WealthManagementJourneyHeader;