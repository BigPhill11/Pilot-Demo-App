
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewModule6Props {
  onComplete: () => void;
  onBack: () => void;
}

const InterviewModule6: React.FC<InterviewModule6Props> = ({ onComplete, onBack }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({});

  const weeklyChecklistItems = [
    "Complete 2 mock interviews with friends or mentors",
    "Read WSJ, Bloomberg, or Axios for current market trends",
    "Review 3 technical concepts and practice explanations",
    "Practice 1 behavioral answer until it feels natural",
    "Research 1 new company in your target list",
    "Update and refine your elevator pitch",
    "Stay positive and maintain interview confidence"
  ];

  const handleItemCheck = (index: number) => {
    setCheckedItems({
      ...checkedItems,
      [`item${index}`]: !checkedItems[`item${index}`]
    });
  };

  const handleComplete = () => {
    toast.success("🎉 Congratulations! You've completed Professional Interviewing Mastery!");
    onComplete();
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Badge className="bg-blue-500">Module 6 of 6</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span>Final Tips & Weekly Prep Routine</span>
          </CardTitle>
          <Progress value={100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-lg">
              Congratulations on making it to the final module! Now let's establish a sustainable routine 
              that will keep you interview-ready and continuously improving.
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 my-6">
              <h3 className="text-green-800 font-semibold mb-2">🎯 Keys to Long-term Success:</h3>
              <ul className="text-green-700 space-y-1">
                <li>• Consistency beats intensity - small daily efforts compound</li>
                <li>• Stay curious about markets and industry trends</li>
                <li>• Seek feedback and continuously refine your approach</li>
                <li>• Build genuine relationships, not just transactional connections</li>
                <li>• Maintain confidence while staying humble and coachable</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">📅 Your Weekly Interview Prep Checklist</h4>
            <p className="text-sm text-muted-foreground">
              Check off each item as you complete your weekly prep routine:
            </p>
            
            <div className="space-y-3">
              {weeklyChecklistItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleItemCheck(index)}
                    className={`w-6 h-6 p-0 ${checkedItems[`item${index}`] ? 'bg-green-500 text-white' : ''}`}
                  >
                    {checkedItems[`item${index}`] ? '✓' : ''}
                  </Button>
                  <span className={`${checkedItems[`item${index}`] ? 'line-through text-muted-foreground' : ''}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2">Progress: {checkedCount}/{weeklyChecklistItems.length} items completed</h5>
              <Progress value={(checkedCount / weeklyChecklistItems.length) * 100} className="h-2" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Final Pro Tips:</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Quality over quantity in applications</li>
                <li>• Network genuinely, not just for jobs</li>
                <li>• Learn from every interview, win or lose</li>
                <li>• Stay updated on market conditions</li>
                <li>• Practice until it feels conversational</li>
              </ul>
            </Card>
            <Card className="p-4 bg-purple-50 border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">🌟 Remember:</h4>
              <ul className="text-purple-700 space-y-1 text-sm">
                <li>• Every "no" gets you closer to "yes"</li>
                <li>• Authenticity trumps perfection</li>
                <li>• Confidence comes from preparation</li>
                <li>• You belong in finance - believe it!</li>
                <li>• Success is a journey, not a destination</li>
              </ul>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
            <h4 className="font-bold text-green-800 mb-3 text-center">🏆 Course Complete!</h4>
            <p className="text-green-700 text-center mb-4">
              You now have all the tools you need to excel in finance interviews. Remember: 
              preparation builds confidence, and confidence opens doors. Go show them what you're made of!
            </p>
            <div className="text-center space-y-2">
              <div className="text-2xl">🎓📈💼</div>
              <p className="font-semibold text-green-800">You're interview-ready!</p>
            </div>
          </div>

          <Button 
            onClick={handleComplete} 
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Professional Interviewing Mastery! 🎉
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewModule6;
