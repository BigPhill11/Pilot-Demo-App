
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, BookOpen, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
}

const AskPhil = () => {
    const navigate = useNavigate();
    const { closeAskPhil } = useAskPhilUi();
    const [question, setQuestion] = useState('');

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

                             {/* Related Modules — green callout bubbles */}
                             {response.related_modules && response.related_modules.length > 0 && (
                                 <div className="pt-3 border-t space-y-2">
                                     <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600 mb-2">
                                         <BookOpen className="h-4 w-4" />
                                         Continue Learning in the App
                                     </div>
                                     {response.related_modules.map((mod, index) => (
                                         <button
                                             key={index}
                                             onClick={() => handleModuleNavigate(mod)}
                                             className="w-full flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 active:bg-emerald-200 transition-colors text-left"
                                         >
                                             <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                 <BookOpen className="h-4 w-4 text-emerald-600" />
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                 <p className="text-sm font-semibold text-emerald-800">{mod.title}</p>
                                                 <p className="text-xs text-emerald-600 truncate">{mod.reason}</p>
                                             </div>
                                             <ChevronRight className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                         </button>
                                     ))}
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
