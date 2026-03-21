import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Users, Coffee } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSoftSkillsProgressAdapter } from '@/hooks/useProgressAdapter';

interface NetworkingModule3Props {
  onComplete: () => void;
  onBack: () => void;
  isCompleted?: boolean;
}

const NetworkingModule3: React.FC<NetworkingModule3Props> = ({ onComplete, onBack, isCompleted }) => {
  const { toast } = useToast();
  const { progress: moduleProgress, completeModule } = 
    useSoftSkillsProgressAdapter('networking-like-pro', 'module-3', 'Strategic Relationships');

  const handleComplete = async () => {
    await completeModule();
    
    toast({
      title: "Module 3 Completed!",
      description: "You're ready to network effectively at any event.",
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
        <Badge variant="secondary">Module 3</Badge>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Networking Events Mastery</h2>
        <Progress value={100} className="flex-1" />
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Professional Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Industry Conferences</h4>
                <p className="text-sm text-muted-foreground">Large-scale events with speakers and networking</p>
              </div>
              <div>
                <h4 className="font-medium">Professional Meetups</h4>
                <p className="text-sm text-muted-foreground">Regular gatherings on specific topics</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Casual Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Coffee Chats</h4>
                <p className="text-sm text-muted-foreground">One-on-one informal meetings</p>
              </div>
              <div>
                <h4 className="font-medium">Alumni Events</h4>
                <p className="text-sm text-muted-foreground">University alumni gatherings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleComplete}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Complete Module
        </Button>
      </div>
    </div>
  );
};

export default NetworkingModule3;