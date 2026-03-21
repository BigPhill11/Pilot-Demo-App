import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Loader2, BookOpen, LogIn, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import DOMPurify from 'dompurify';

interface PhilResponse {
  answer: string;
  needs_web: boolean;
  study_next: string[];
  sources: string[];
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
}

const MOCK_SESSION = {
  sessionId: 'mock-session-abc123',
  completedModules: ['Budgeting 101', 'Intro to Credit', 'Emergency Funds'],
};

export interface PhilChatAssistantHandle {
  sendMessage: (text: string) => void;
}

interface PhilChatAssistantProps {
  variant?: 'default' | 'embedded';
}

const PhilChatAssistant = forwardRef<PhilChatAssistantHandle, PhilChatAssistantProps>(
  ({ variant = 'default' }, ref) => {
    const { user, profile } = useAuth();
    const userLevel = (profile?.app_version as string) || 'intermediate';
    const isGuest = !user;

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleSendMessageDirect = async (text: string) => {
      if (!text.trim() || quotaExceeded) return;

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
        const moduleContext = `User has completed the following modules: ${MOCK_SESSION.completedModules.join(', ')}.`;

        const payload = {
          message: text,
          userLevel,
          sessionId: MOCK_SESSION.sessionId,
          context: moduleContext,
        };

        let philResponse: Message;

        try {
          const { data, error } = await supabase.functions.invoke('AskPhil', {
            body: payload,
          });

          if (error) {
            if (error.message?.includes('429') || (data as any)?.error?.includes('limit')) {
              setQuotaExceeded(true);
              setQuota({ used: 5, limit: 5, remaining: 0 });
              throw new Error('Daily limit reached');
            }
            throw new Error(error.message || 'Failed to get response from Phil');
          }
          if (data?.error) {
            if (data.error.includes('limit') || data.error.includes('429')) {
              setQuotaExceeded(true);
              setQuota(data.quota || { used: 5, limit: 5, remaining: 0 });
              throw new Error('Daily limit reached');
            }
            throw new Error(data.error);
          }

          const response = data as PhilResponse;

          if (response.quota) {
            setQuota(response.quota);
            if (response.quota.remaining <= 0) {
              setQuotaExceeded(true);
            }
          }

          philResponse = {
            id: (Date.now() + 1).toString(),
            text: response.answer || 'I apologize, but I could not generate a response.',
            sender: 'phil',
            timestamp: new Date(),
            studyNext: response.study_next || [],
            sources: response.sources || [],
            suggestions: response.study_next?.slice(0, 3) || [
              'Tell me more about this',
              'What should I do next?',
              'Give me an example',
            ],
          };
        } catch (invokeError: any) {
          if (invokeError.message === 'Daily limit reached') {
            philResponse = {
              id: (Date.now() + 1).toString(),
              text: "You've reached your daily limit of 5 questions. Come back tomorrow for more! 🐼",
              sender: 'phil',
              timestamp: new Date(),
            };
          } else if (import.meta.env.DEV) {
            console.warn('Backend unavailable — using mock response:', invokeError?.message);
            const lastModule = MOCK_SESSION.completedModules[MOCK_SESSION.completedModules.length - 1];
            philResponse = {
              id: (Date.now() + 1).toString(),
              text: `[DEV MOCK] I see you have completed ${lastModule}! Based on your ${userLevel} level, here is your answer...`,
              sender: 'phil',
              timestamp: new Date(),
            };
          } else {
            throw invokeError;
          }
        }

        setMessages((prev) => [...prev, philResponse]);
      } catch (error: any) {
        console.error('Unexpected error in handleSendMessage:', error);

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I'm having trouble responding right now. Please try again in a moment! 🐼",
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

    if (isGuest) {
      return (
        <div className={isEmbedded ? 'flex flex-col items-center justify-center h-full p-6' : 'max-w-4xl mx-auto p-6'}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Sign in to chat with Phil</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Create a free account to ask Phil questions about budgeting, investing, and personal finance.
            </p>
            <Button asChild>
              <Link to="/" className="inline-flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign in to continue
              </Link>
            </Button>
          </div>
        </div>
      );
    }

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
                        ? DOMPurify.sanitize(message.text.replace(/\n/g, '<br />'))
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
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(item)}
                        className="text-xs"
                        disabled={quotaExceeded}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
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
        {quota && (
          <div
            className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${
              quotaExceeded ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
            }`}
          >
            {quotaExceeded ? <AlertCircle className="h-3 w-3" /> : null}
            <span>
              {quota.remaining} of {quota.limit} questions left today
            </span>
          </div>
        )}
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={quotaExceeded ? 'Daily limit reached — come back tomorrow!' : 'Ask Phil anything about finance...'}
            className="flex-1 resize-none border rounded-lg px-3 py-2 min-h-[44px] max-h-32 text-sm"
            rows={1}
            disabled={isTyping || quotaExceeded}
          />
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping || quotaExceeded} size="icon">
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
