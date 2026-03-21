import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';

interface WorkingWomenModule1Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  progressData?: any;
}

const WorkingWomenModule1: React.FC<WorkingWomenModule1Props> = ({ onBack, onComplete, isCompleted, progressData }) => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const {
    progress,
    updateProgress,
    updateDetailedProgress,
    completeModule
  } = useUnifiedProgress({
    moduleId: 'module_1',
    moduleType: 'soft_skills',
    courseId: 'working_women'
  });

  // Restore section progress
  useEffect(() => {
    if (progress?.detailedProgress?.currentSection) {
      setCurrentSection(progress.detailedProgress.currentSection);
    }
  }, [progress]);

  // Auto-save section progress
  useEffect(() => {
    updateDetailedProgress('currentSection', currentSection);
  }, [currentSection, updateDetailedProgress]);

  const sections = [
    {
      title: "Welcome & Overview",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Executive Presence & Assertive Communication</h3>
          <p className="text-muted-foreground">
            In this module, you'll learn to develop commanding presence and assertive communication skills 
            that ensure your voice is heard and respected in professional environments.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">What You'll Learn:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Building authentic executive presence</li>
              <li>Mastering assertive communication techniques</li>
              <li>Navigating double binds and expectations</li>
              <li>Developing vocal authority and gravitas</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Understanding Executive Presence",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">What is Executive Presence?</h3>
          <p>
            Executive presence is the ability to connect authentically with others in a way that 
            motivates and inspires them to follow you. It's about commanding respect through 
            your demeanor, communication, and decision-making.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Key Components</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Confidence without arrogance</li>
                <li>• Clear and decisive communication</li>
                <li>• Emotional intelligence</li>
                <li>• Authenticity</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800">Common Challenges for Women</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Double bind: assertive vs. likeable</li>
                <li>• Confidence gap</li>
                <li>• Imposter syndrome</li>
                <li>• Voice and body language</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Assertive Communication Mastery",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">The Art of Assertive Communication</h3>
          <p>
            Assertive communication is about expressing your thoughts, feelings, and needs 
            directly and honestly while respecting others. It's the sweet spot between 
            passive and aggressive communication.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">The Assertiveness Formula</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <strong>State the facts</strong> - Be specific and objective
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <strong>Express your feelings</strong> - Use "I" statements
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <strong>Make your request</strong> - Be clear about what you want
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Practice & Application",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Putting It Into Practice</h3>
          <p>
            Now it's time to apply what you've learned. Practice these scenarios and 
            techniques to build your confidence.
          </p>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Scenario 1: Interruptions in Meetings</h4>
              <p className="text-sm mb-2">You're frequently interrupted when presenting ideas.</p>
              <p className="text-sm font-medium">Assertive Response:</p>
              <p className="text-sm italic">"I'd like to finish my point before we move on. As I was saying..."</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Scenario 2: Taking Credit</h4>
              <p className="text-sm mb-2">Someone takes credit for your work.</p>
              <p className="text-sm font-medium">Assertive Response:</p>
              <p className="text-sm italic">"I appreciate the recognition of this project. I'd like to clarify that I led this initiative..."</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = async () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      const newProgress = ((currentSection + 2) / sections.length) * 100;
      await updateProgress(newProgress);
    } else {
      await completeModule();
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progressPercentage = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Executive Presence & Assertive Communication</h1>
          <p className="text-muted-foreground">Module 1 - Working Women Excellence</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Section Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentSection + 1} of {sections.length} sections
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{sections[currentSection].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {sections[currentSection].content}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button onClick={handleNext}>
          {currentSection === sections.length - 1 ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Module
            </>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WorkingWomenModule1;