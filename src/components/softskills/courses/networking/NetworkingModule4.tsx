import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Linkedin, Globe, MessageSquare, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSoftSkillsProgressAdapter } from '@/hooks/useProgressAdapter';

interface NetworkingModule4Props {
  onComplete: () => void;
  onBack: () => void;
  isCompleted?: boolean;
}

const NetworkingModule4: React.FC<NetworkingModule4Props> = ({ onComplete, onBack, isCompleted }) => {
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  const { progress: moduleProgress, saveTextResponse, completeModule } = 
    useSoftSkillsProgressAdapter('networking-like-pro', 'module-4', 'Digital Networking');

  const handleItemCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = 6;

  const handleComplete = async () => {
    await saveTextResponse('digital-networking-checklist', JSON.stringify(checkedItems));
    await completeModule();
    
    toast({
      title: "Module 4 Completed!",
      description: "You're now equipped for digital networking success.",
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
        <Badge variant="secondary">Module 4</Badge>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Digital Networking Mastery</h2>
        <Progress value={100} className="flex-1" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-blue-600" />
                LinkedIn Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={checkedItems.profile || false}
                  onChange={() => handleItemCheck('profile')}
                  className="mt-1"
                />
                <div>
                  <h4 className="font-medium">Professional Profile</h4>
                  <p className="text-sm text-muted-foreground">Compelling headline and summary</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={checkedItems.connections || false}
                  onChange={() => handleItemCheck('connections')}
                  className="mt-1"
                />
                <div>
                  <h4 className="font-medium">Strategic Connections</h4>
                  <p className="text-sm text-muted-foreground">Quality over quantity approach</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={checkedItems.content || false}
                  onChange={() => handleItemCheck('content')}
                  className="mt-1"
                />
                <div>
                  <h4 className="font-medium">Content Strategy</h4>
                  <p className="text-sm text-muted-foreground">Share valuable industry insights</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Online Presence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={checkedItems.consistency || false}
                  onChange={() => handleItemCheck('consistency')}
                  className="mt-1"
                />
                <div>
                  <h4 className="font-medium">Brand Consistency</h4>
                  <p className="text-sm text-muted-foreground">Unified message across platforms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={checkedItems.engagement || false}
                  onChange={() => handleItemCheck('engagement')}
                  className="mt-1"
                />
                <div>
                  <h4 className="font-medium">Active Engagement</h4>
                  <p className="text-sm text-muted-foreground">Meaningful interactions and comments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={checkedItems.value || false}
                  onChange={() => handleItemCheck('value')}
                  className="mt-1"
                />
                <div>
                  <h4 className="font-medium">Value Creation</h4>
                  <p className="text-sm text-muted-foreground">Help others succeed online</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Digital Networking Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2">✅ Do This</h4>
                <ul className="text-sm space-y-1 text-green-600">
                  <li>• Personalize connection requests</li>
                  <li>• Share industry insights regularly</li>
                  <li>• Engage with others' content meaningfully</li>
                  <li>• Use professional profile photos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-700 mb-2">❌ Avoid This</h4>
                <ul className="text-sm space-y-1 text-red-600">
                  <li>• Generic connection requests</li>
                  <li>• Over-promotional content</li>
                  <li>• Neglecting your profile updates</li>
                  <li>• Controversial topics unrelated to work</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Progress: {checkedCount}/{totalItems} items checked
          </div>
          <Button 
            onClick={handleComplete}
            disabled={checkedCount < totalItems}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Module
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkingModule4;