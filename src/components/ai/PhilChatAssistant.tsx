import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, BookOpen, AlertCircle, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAskPhilUi } from '@/contexts/AskPhilUiContext';
import { setDashboardDeepLink } from '@/lib/dashboardDeepLink';
import DOMPurify from 'dompurify';

interface RelatedModule {
  id: string;
  title: string;
  path: string;
  reason: string;
}

interface PhilResponse {
  answer: string;
  needs_web: boolean;
  study_next: string[];
  sources: string[];
  related_modules?: RelatedModule[];
  quota?: {
    used: number;
    limit: number;
    remaining: number;
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'phil';
  timestamp: Date;
  suggestions?: string[];
  studyNext?: string[];
  sources?: string[];
  relatedModules?: RelatedModule[];
}


export interface PhilChatAssistantHandle {
  sendMessage: (text: string) => void;
}

interface PhilChatAssistantProps {
  variant?: 'default' | 'embedded';
}

type ExplainLevel = 'basic' | 'normal' | 'advanced';

const LEVEL_LABELS: Record<ExplainLevel, { label: string; description: string }> = {
  basic:    { label: 'Basic',    description: 'Simple definitions & one analogy' },
  normal:   { label: 'Normal',   description: 'Clear explanations with context' },
  advanced: { label: 'Advanced', description: 'College-level depth' },
};

const formatPhilText = (text: string): string =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^[\-\*] /gm, '• ')
    .replace(/\n/g, '<br />');

const PhilChatAssistant = forwardRef<PhilChatAssistantHandle, PhilChatAssistantProps>(
  ({ variant = 'default' }, ref) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { closeAskPhil } = useAskPhilUi();
    const [explainLevel, setExplainLevel] = useState<ExplainLevel>('normal');

    const handleModuleNavigate = (mod: RelatedModule) => {
      closeAskPhil();
      if (mod.path.includes('tab=personal-finance')) {
        setDashboardDeepLink({ targetTab: 'personal-finance', moduleId: mod.id });
        navigate('/learn?tab=personal-finance');
      } else if (mod.path.includes('tab=companies')) {
        setDashboardDeepLink({ targetTab: 'companies', sectionId: mod.id });
        navigate('/learn?tab=companies');
      } else if (mod.id === 'interviewing' && mod.path.includes('/career')) {
        navigate('/career/interviewing');
      } else if (mod.path.includes('/soft-skills')) {
        navigate('/soft-skills?category=' + encodeURIComponent(mod.id));
      } else {
        navigate(mod.path);
      }
    };

    const [messages, setMessages] = useState<Message[]>([
      {
        id: '1',
        text: "Hi there! I'm Phil, your friendly finance panda! 🐼 I'm here to help you learn about investing, budgeting, and all things money. What would you like to know?",
        sender: 'phil',
        timestamp: new Date(),
        suggestions: [
          "What's a stock?",
          'How do I start investing?',
          'Explain compound interest',
          "What's a 401k?",
        ],
      },
    ]);

    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [quota, setQuota] = useState<{ used: number; limit: number; remaining: number } | null>(null);
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);
    const SESSION_LIMIT = 5;
    const sessionLimitReached = sessionCount >= SESSION_LIMIT;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleSendMessageDirect = async (text: string) => {
      if (!text.trim() || quotaExceeded || sessionLimitReached) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      try {
        const payload = {
          message: text,
          userLevel: explainLevel,
          sessionId: user?.id ?? 'guest',
        };

        let philResponse: Message;

        const { data: { session } } = await supabase.auth.getSession();
        const { data, error } = await supabase.functions.invoke('AskPhil', {
          body: payload,
          headers: session?.access_token
            ? { Authorization: `Bearer ${session.access_token}` }
            : undefined,
        });

        if (error) {
          console.error('AskPhil invoke error:', error, 'data:', data);
          const detail = (data as any)?.error || error.message || 'Failed to reach Phil';
          throw new Error(detail);
        }

        if (data?.error) {
          console.error('AskPhil response error:', data.error);
          throw new Error(data.error);
        }

        const response = data as PhilResponse;
        setSessionCount((prev) => prev + 1);

        philResponse = {
          id: (Date.now() + 1).toString(),
          text: response.answer || 'I apologize, but I could not generate a response.',
          sender: 'phil',
          timestamp: new Date(),
          studyNext: response.study_next || [],
          sources: response.sources || [],
          relatedModules: response.related_modules || [],
          suggestions: response.study_next?.slice(0, 3) || [
            'Tell me more about this',
            'What should I do next?',
            'Give me an example',
          ],
        };

        setMessages((prev) => [...prev, philResponse]);
      } catch (error: any) {
        console.error('Unexpected error in handleSendMessage:', error);
        const errMsg = error?.message || 'Unknown error';

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: `Sorry, I hit an error: ${errMsg} 🐼`,
            sender: 'phil',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    };

    const handleSendMessage = async () => {
      await handleSendMessageDirect(inputMessage);
    };

    const handleSuggestionClick = (suggestion: string) => {
      setTimeout(() => {
        handleSendMessageDirect(suggestion);
      }, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    useImperativeHandle(ref, () => ({
      sendMessage: (text: string) => {
        handleSendMessageDirect(text);
      },
    }));

    const isEmbedded = variant === 'embedded';

    const messagesContent = (
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-1">
        {messages.map((message, idx) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${idx === 0 ? 'animate-fade-in' : ''}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`p-3 rounded-lg ${
                  message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                <p
                  className="whitespace-pre-wrap text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      message.sender === 'phil'
                        ? DOMPurify.sanitize(formatPhilText(message.text))
                        : DOMPurify.sanitize(message.text),
                  }}
                />
              </div>

              {message.studyNext && message.studyNext.length > 0 && (
                <div className="mt-2 p-2 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-1 text-xs font-medium text-primary mb-1">
                    <BookOpen className="h-3 w-3" />
                    Study Next
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {message.studyNext.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {message.relatedModules && message.relatedModules.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Continue Learning in the App</span>
                  </div>
                  {message.relatedModules.map((mod, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleModuleNavigate(mod)}
                      className="w-full flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 active:bg-emerald-200 transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-emerald-800 leading-tight">{mod.title}</p>
                        <p className="text-xs text-emerald-600 truncate leading-tight">{mod.reason}</p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Sources: </span>
                  {message.sources.join(', ')}
                </div>
              )}

              {message.suggestions && !message.studyNext && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs"
                      disabled={quotaExceeded}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className={`flex-shrink-0 ${message.sender === 'user' ? 'order-1 ml-2' : 'order-2 mr-2'}`}>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex-shrink-0 mr-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Phil is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    );

    const inputArea = (
      <div className="flex-shrink-0 space-y-2">
        <div className="flex gap-1">
          {(Object.keys(LEVEL_LABELS) as ExplainLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setExplainLevel(level)}
              className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                explainLevel === level
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {LEVEL_LABELS[level].label}
            </button>
          ))}
        </div>
        {sessionCount > 0 && (
          <div
            className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${
              sessionLimitReached ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
            }`}
          >
            {sessionLimitReached ? <AlertCircle className="h-3 w-3" /> : null}
            <span>
              {SESSION_LIMIT - sessionCount} of {SESSION_LIMIT} questions left this session
            </span>
          </div>
        )}
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={sessionLimitReached ? 'Session limit reached — restart the app for more!' : 'Ask Phil anything about finance...'}
            className="flex-1 resize-none border rounded-lg px-3 py-2 min-h-[44px] max-h-32 text-sm"
            rows={1}
            disabled={isTyping || quotaExceeded || sessionLimitReached}
          />
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping || quotaExceeded || sessionLimitReached} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );

    if (isEmbedded) {
      return (
        <div className="flex flex-col h-full p-4">
          {messagesContent}
          {inputArea}
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto h-[calc(100vh-20rem)] min-h-[400px] flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              Ask Phil - Your Finance Buddy
              <Badge variant="secondary" className="ml-auto">
                AI Assistant
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col min-h-0">
            {messagesContent}
            {inputArea}
          </CardContent>
        </Card>
      </div>
    );
  }
);

PhilChatAssistant.displayName = 'PhilChatAssistant';

export default PhilChatAssistant;
