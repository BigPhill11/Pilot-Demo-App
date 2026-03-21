import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, Heart, Shield, CheckCircle } from 'lucide-react';
import { PandaCelebration } from '@/components/ui/panda-celebration';
import { useToast } from '@/hooks/use-toast';
import QuizFeedback from '@/components/quiz/QuizFeedback';
import QuizActions from '@/components/quiz/QuizActions';

interface CommunicationModule5Props {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const CommunicationModule5: React.FC<CommunicationModule5Props> = ({ onBack, onComplete, isCompleted }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: number]: { type: 'incorrect' | 'completed'; message: string } }>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const { toast } = useToast();

  const sections = [
    {
      title: "Conflict Resolution",
      icon: <Shield className="h-5 w-5" />,
      content: {
        overview: "Effective conflict resolution transforms workplace tension into opportunities for growth, understanding, and stronger relationships.",
        keyPoints: [
          "Early identification of conflict signs before situations escalate",
          "Active listening techniques that help all parties feel heard and understood",
          "Neutral facilitation that focuses on issues rather than personalities",
          "Win-win solutions that address underlying needs and interests of all involved"
        ],
        practicalTips: [
          "Use the DESC method: Describe, Express, Specify, Consequences",
          "Stay calm and speak slowly - tension escalates when voices rise",
          "Focus on specific behaviors and impacts rather than character judgments",
          "Schedule follow-up conversations to ensure resolution is sustainable"
        ]
      }
    },
    {
      title: "Feedback Delivery", 
      icon: <Heart className="h-5 w-5" />,
      content: {
        overview: "Skillful feedback delivery builds trust, improves performance, and strengthens professional relationships through constructive dialogue.",
        keyPoints: [
          "Timely delivery when events are fresh but emotions have settled",
          "Specific examples and observable behaviors rather than general impressions",
          "Balanced approach that recognizes strengths while addressing development areas",
          "Future-focused solutions that provide clear paths for improvement"
        ],
        practicalTips: [
          "Use the SBI model: Situation, Behavior, Impact for structure",
          "Ask permission before giving feedback to ensure receptivity",
          "Focus on actions and outcomes that can be changed going forward",
          "End with encouragement and offer ongoing support for improvement"
        ]
      }
    },
    {
      title: "Emotional Intelligence",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: {
        overview: "High emotional intelligence enables you to navigate difficult conversations with empathy, self-awareness, and social skill.",
        keyPoints: [
          "Self-awareness of your emotional triggers and response patterns",
          "Emotional regulation techniques that maintain professionalism under pressure",
          "Empathy skills that help you understand others' perspectives and motivations",
          "Social awareness that reads room dynamics and adjusts approach accordingly"
        ],
        practicalTips: [
          "Practice the 'pause and breathe' technique before responding to triggers",
          "Use empathetic language: 'I can understand why you might feel...'",
          "Monitor your body language - others pick up on tension and defensiveness",
          "Develop a repertoire of de-escalation phrases for heated moments"
        ]
      }
    }
  ];

  // ... keep existing code (quiz questions, handlers, etc.)
  const quizQuestions = [
    {
      question: "What is the most effective approach when conflicts first arise?",
      options: [
        "Immediately escalate to management",
        "Ignore the conflict and hope it resolves itself",
        "Address it early through direct, respectful conversation",
        "Document everything before taking any action"
      ],
      correct: 2,
      explanation: "Early intervention through respectful, direct conversation prevents small issues from becoming major conflicts. This approach shows maturity and problem-solving skills."
    }
  ];

  const handleCompleteModule = () => {
    setShowCelebration(true);
    setModuleCompleted(true);
    toast({
      title: "Module Completed!",
      description: "Congratulations on mastering difficult conversations!",
    });
    
    setTimeout(() => {
      setShowCelebration(false);
      onComplete();
    }, 3000);
  };

  if (showCelebration) {
    return (
      <PandaCelebration 
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
        moduleTitle="Difficult Conversations"
      />
    );
  }

  // ... keep existing code structure
};

export default CommunicationModule5;