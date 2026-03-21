import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUnifiedProgress } from '@/hooks/useUnifiedProgress';

interface WorkingWomenModule2Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  progressData?: any;
}

const WorkingWomenModule2: React.FC<WorkingWomenModule2Props> = ({ onBack, onComplete, isCompleted, progressData }) => {
  const [currentSection, setCurrentSection] = useState(0);
  
  const {
    progress,
    updateProgress,
    updateDetailedProgress,
    completeModule
  } = useUnifiedProgress({
    moduleId: 'module_2',
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
      title: "Introduction to Work-Life Integration",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Reframing Work-Life Balance</h3>
          <p className="text-muted-foreground">
            Instead of seeking perfect balance, successful women focus on integration—creating 
            harmony between professional ambitions and personal responsibilities.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Key Learning Objectives:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Master work-life integration strategies</li>
              <li>Set and maintain healthy boundaries</li>
              <li>Develop energy management techniques</li>
              <li>Build effective support networks</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "The Integration Mindset",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">From Balance to Integration</h3>
          <p>
            Work-life integration recognizes that professional and personal life aren't 
            separate entities to balance, but interconnected aspects of your whole life 
            that can enhance each other.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">❌ Balance Myth</h4>
              <ul className="text-sm space-y-1">
                <li>• 50/50 split every day</li>
                <li>• Compartmentalized thinking</li>
                <li>• Rigid scheduling</li>
                <li>• Guilt when priorities shift</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">✅ Integration Reality</h4>
              <ul className="text-sm space-y-1">
                <li>• Flexible prioritization</li>
                <li>• Synergistic thinking</li>
                <li>• Adaptive scheduling</li>
                <li>• Seasonal focus shifts</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Boundary Setting Mastery",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Strategic Boundary Setting</h3>
          <p>
            Boundaries aren't walls—they're flexible filters that help you manage your 
            energy and protect what matters most to you.
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Digital Boundaries</h4>
              <ul className="text-sm space-y-1">
                <li>• Set specific email/message hours</li>
                <li>• Use "Do Not Disturb" settings strategically</li>
                <li>• Create separate work/personal device spaces</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Time Boundaries</h4>
              <ul className="text-sm space-y-1">
                <li>• Block calendar time for priorities</li>
                <li>• Practice saying "no" gracefully</li>
                <li>• Delegate and automate where possible</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Energy Management & Support Systems",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sustainable Energy Management</h3>
          <p>
            Success isn't about managing time—it's about managing your energy. 
            Build systems that replenish rather than deplete you.
          </p>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">The Four Types of Energy</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800">Physical Energy</h5>
                <p className="text-sm">Sleep, nutrition, exercise</p>
              </div>
              <div>
                <h5 className="font-medium text-orange-800">Emotional Energy</h5>
                <p className="text-sm">Joy, passion, connection</p>
              </div>
              <div>
                <h5 className="font-medium text-red-800">Mental Energy</h5>
                <p className="text-sm">Focus, creativity, learning</p>
              </div>
              <div>
                <h5 className="font-medium text-purple-800">Spiritual Energy</h5>
                <p className="text-sm">Purpose, values, meaning</p>
              </div>
            </div>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-pink-800 mb-2">Building Your Support Network</h4>
            <ul className="text-sm space-y-1">
              <li>• Identify your "village" - family, friends, colleagues</li>
              <li>• Reciprocal support - give and receive help</li>
              <li>• Professional support - coaches, mentors, services</li>
              <li>• Community connections - groups and organizations</li>
            </ul>
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
          <h1 className="text-3xl font-bold">Work-Life Integration Strategies</h1>
          <p className="text-muted-foreground">Module 2 - Working Women Excellence</p>
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

export default WorkingWomenModule2;