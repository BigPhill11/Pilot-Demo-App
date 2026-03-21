
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DOMPurify from 'dompurify';

interface PhilResponse {
    answer: string;
    needs_web: boolean;
    study_next: string[];
    sources: string[];
}

const AskPhil = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState<PhilResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAsk = async () => {
        if (!question.trim()) {
            setError('Please enter a question.');
            return;
        }

        setIsLoading(true);
        setResponse(null);
        setError('');

        try {
            const { data, error: functionError } = await supabase.functions.invoke('AskPhil', {
                body: { message: question }
            });

            if (functionError) {
                throw new Error(functionError.message || 'Failed to get response from Phil');
            }

            if (data?.error) {
                throw new Error(data.error);
            }

            setResponse(data as PhilResponse);

        } catch (e: any) {
            console.error('Error asking Phil:', e);
            setError(e.message || 'An error occurred while asking Phil.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStudyClick = (item: string) => {
        setQuestion(item);
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Wand2 className="h-6 w-6 text-primary" />
                   Ask Phil Anything
                </CardTitle>
                <CardDescription>Have a financial question? Ask Phil, our AI-powered expert panda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="e.g., How do I open a Roth IRA?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAsk()}
                            disabled={isLoading}
                        />
                        <Button onClick={handleAsk} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Ask'}
                        </Button>
                    </div>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    
                    {response && (
                         <div className="p-4 bg-muted/50 rounded-lg border space-y-4">
                             {/* Answer */}
                             <div>
                                 <p 
                                    className="text-muted-foreground whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(response.answer.replace(/\n/g, '<br />')) }}
                                 />
                             </div>

                             {/* Study Next */}
                             {response.study_next && response.study_next.length > 0 && (
                                 <div className="pt-3 border-t">
                                     <div className="flex items-center gap-1 text-sm font-medium text-primary mb-2">
                                         <BookOpen className="h-4 w-4" />
                                         Study Next
                                     </div>
                                     <div className="flex flex-wrap gap-2">
                                         {response.study_next.map((item, index) => (
                                             <Badge 
                                                 key={index} 
                                                 variant="secondary" 
                                                 className="cursor-pointer hover:bg-primary/20"
                                                 onClick={() => handleStudyClick(item)}
                                             >
                                                 {item}
                                             </Badge>
                                         ))}
                                     </div>
                                 </div>
                             )}

                             {/* Sources */}
                             {response.sources && response.sources.length > 0 && (
                                 <div className="pt-3 border-t text-xs text-muted-foreground">
                                     <span className="font-medium">Sources: </span>
                                     {response.sources.join(', ')}
                                 </div>
                             )}

                             {/* Web indicator */}
                             {response.needs_web && (
                                 <Badge variant="outline" className="text-xs">
                                     🌐 Live data recommended
                                 </Badge>
                             )}
                         </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default AskPhil;
