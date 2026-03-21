import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Users, MessageCircle, Target } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSoftSkillsProgressAdapter } from '@/hooks/useProgressAdapter';

interface NetworkingModule2Props {
  onComplete: () => void;
  onBack: () => void;
  isCompleted?: boolean;
}

const NetworkingModule2: React.FC<NetworkingModule2Props> = ({ onComplete, onBack, isCompleted }) => {
  const [elevatorPitch, setElevatorPitch] = useState('');
  const { toast } = useToast();
  const { progress: moduleProgress, saveTextResponse, completeModule } = 
    useSoftSkillsProgressAdapter('networking-like-pro', 'module-2', 'Personal Brand Building');

  const handleComplete = async () => {
    if (elevatorPitch.length < 50) {
      toast({
        title: "Please complete your elevator pitch",
        description: "Your pitch should be at least 50 characters long",
        variant: "destructive"
      });
      return;
    }
    
    await saveTextResponse('elevator-pitch', elevatorPitch);
    await completeModule();
    
    toast({
      title: "Module 2 Completed!",
      description: "You've mastered personal branding and elevator pitches.",
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
        <Badge variant="secondary">Module 2</Badge>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Brand & Elevator Pitch</h2>
        <Progress value={100} className="flex-1" />
        
        <Card>
          <CardHeader>
            <CardTitle>The 30-Second Formula</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2">1</div>
                <h4 className="font-medium">Who You Are</h4>
                <p className="text-sm text-muted-foreground">Name + Current Role</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2">2</div>
                <h4 className="font-medium">What You Do</h4>
                <p className="text-sm text-muted-foreground">Key Value Proposition</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-2">3</div>
                <h4 className="font-medium">What You Want</h4>
                <p className="text-sm text-muted-foreground">Call to Action</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Write Your Elevator Pitch</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Hi, I'm [Name]. I'm a [Role] at [Company] where I [Key Achievement/Value]. I'm passionate about [Industry/Field] and I'm currently looking to [Goal/Objective]. I'd love to learn more about [Their Interest/Company]."
              value={elevatorPitch}
              onChange={(e) => setElevatorPitch(e.target.value)}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>

        <Button 
          onClick={handleComplete}
          disabled={elevatorPitch.length < 50}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Complete Module
        </Button>
      </div>
    </div>
  );
};

export default NetworkingModule2;