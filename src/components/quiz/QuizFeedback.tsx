
import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface QuizFeedbackProps {
  type: 'incorrect' | 'completed';
  message: string;
  renderMessage?: (text: string) => React.ReactNode;
}

const QuizFeedback: React.FC<QuizFeedbackProps> = ({ type, message, renderMessage }) => {
  const isIncorrect = type === 'incorrect';
  
  return (
    <div className={`mt-3 p-3 rounded-lg border-l-4 ${
      isIncorrect 
        ? 'bg-red-50 border-red-400' 
        : 'bg-blue-50 border-blue-400'
    }`}>
      <div className="flex items-start space-x-2">
        {isIncorrect ? (
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        )}
        <p className={`text-sm ${
          isIncorrect ? 'text-red-700' : 'text-blue-700'
        }`}>
          {renderMessage ? renderMessage(message) : message}
        </p>
      </div>
    </div>
  );
};

export default QuizFeedback;
