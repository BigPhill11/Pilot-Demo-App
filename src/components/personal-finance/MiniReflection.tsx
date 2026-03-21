import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MiniReflectionProps {
  question: string;
  followUp?: string;
  onComplete: () => void;
}

const MiniReflection: React.FC<MiniReflectionProps> = ({ question, followUp, onComplete }) => {
  const [response, setResponse] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleContinue = () => {
    if (!showFollowUp && followUp) {
      setShowFollowUp(true);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 text-primary">
        <MessageSquare className="w-5 h-5" />
        <h2 className="font-semibold">Reflection</h2>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-medium leading-relaxed"
        >
          {question}
        </motion.p>

        {showFollowUp && followUp && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-muted-foreground"
          >
            {followUp}
          </motion.p>
        )}
      </div>

      {/* Optional text input for journaling */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-muted-foreground">
            Your thoughts (optional)
          </span>
        </div>
        <Textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Take a moment to reflect... what comes to mind?"
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="flex items-start gap-3 bg-muted/30 rounded-lg p-4">
        <span className="text-2xl">🐼</span>
        <p className="text-sm text-muted-foreground italic">
          "There are no wrong answers here. Reflection helps you connect learning to your own life."
        </p>
      </div>

      <Button onClick={handleContinue} className="w-full">
        {!showFollowUp && followUp ? 'Think Deeper' : 'Continue'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );
};

export default MiniReflection;
