import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Database, Heart, Calendar, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSoftSkillsProgressAdapter } from '@/hooks/useProgressAdapter';

interface NetworkingModule6Props {
  onComplete: () => void;
  onBack: () => void;
  isCompleted?: boolean;
}

const NetworkingModule6: React.FC<NetworkingModule6Props> = ({ onComplete, onBack, isCompleted }) => {
  const [relationshipPlan, setRelationshipPlan] = useState('');
  const [valueStrategy, setValueStrategy] = useState('');
  const { toast } = useToast();
  const { progress: moduleProgress, saveTextResponse, completeModule } = 
    useSoftSkillsProgressAdapter('networking-like-pro', 'module-6', 'Relationship Management');

  const handleComplete = async () => {
    await saveTextResponse('relationship-plan', relationshipPlan);
    await saveTextResponse('value-strategy', valueStrategy);
    await completeModule();
    
    toast({
      title: "Course Completed! 🎉",
      description: "You've mastered all aspects of professional networking.",
    });
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Course
        </Button>
        <Badge variant="secondary">Module 6</Badge>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Long-Term Relationship Management</h2>
        <Progress value={100} className="flex-1" />
        
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              The Relationship Lifecycle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mx-auto mb-2">1</div>
                <h4 className="font-medium">Connect</h4>
                <p className="text-xs text-muted-foreground">Initial meeting</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center mx-auto mb-2">2</div>
                <h4 className="font-medium">Cultivate</h4>
                <p className="text-xs text-muted-foreground">Build rapport</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-2">3</div>
                <h4 className="font-medium">Collaborate</h4>
                <p className="text-xs text-muted-foreground">Create value</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto mb-2">4</div>
                <h4 className="font-medium">Champion</h4>
                <p className="text-xs text-muted-foreground">Mutual advocacy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                CRM Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Essential Information to Track</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>• Personal details (family, interests)</li>
                  <li>• Professional goals and challenges</li>
                  <li>• Interaction history and preferences</li>
                  <li>• Mutual connections and opportunities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Tools for Organization</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>• LinkedIn CRM features</li>
                  <li>• Google Contacts with tags</li>
                  <li>• Specialized tools (Airtable, Notion)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Touchpoint Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Regular Touchpoints</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>• Quarterly check-ins</li>
                  <li>• Industry news sharing</li>
                  <li>• Birthday and milestone messages</li>
                  <li>• Event invitations and introductions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Value-Adding Activities</h4>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>• Share relevant opportunities</li>
                  <li>• Make strategic introductions</li>
                  <li>• Provide industry insights</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Relationship Management Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                How will you systematically nurture your professional relationships?
              </label>
              <Textarea
                placeholder="Describe your approach to staying in touch with your network, including frequency, methods, and tools you'll use..."
                value={relationshipPlan}
                onChange={(e) => setRelationshipPlan(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                What value will you consistently provide to your network?
              </label>
              <Textarea
                placeholder="Outline specific ways you'll help others in your network, such as sharing insights, making introductions, or providing resources..."
                value={valueStrategy}
                onChange={(e) => setValueStrategy(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <TrendingUp className="h-5 w-5" />
              Networking Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-700 mb-2">Quality Indicators</h4>
                <ul className="text-sm space-y-1 text-blue-600">
                  <li>• Meaningful conversations per event</li>
                  <li>• Follow-up response rates</li>
                  <li>• Mutual value exchanges</li>
                  <li>• Referrals given and received</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-700 mb-2">Growth Metrics</h4>
                <ul className="text-sm space-y-1 text-blue-600">
                  <li>• Network expansion rate</li>
                  <li>• Relationship depth scores</li>
                  <li>• Collaboration opportunities</li>
                  <li>• Professional opportunities generated</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          onClick={handleComplete}
          disabled={relationshipPlan.length < 50 || valueStrategy.length < 50}
          className="bg-green-600 hover:bg-green-700 w-full"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Complete Networking Mastery Course
        </Button>
      </div>
    </div>
  );
};

export default NetworkingModule6;