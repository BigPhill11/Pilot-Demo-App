
import React, { useState } from 'react';
import { Card, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { industryJourneys, IndustryJourneyData } from '@/data/industry-journeys';
import IndustryJourney from './IndustryJourney';

const IndustryDeepDiveTab = () => {
    const [selectedIndustry, setSelectedIndustry] = useState<IndustryJourneyData | null>(null);

    if (selectedIndustry) {
        return <IndustryJourney journey={selectedIndustry} onBack={() => setSelectedIndustry(null)} />;
    }

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Industry Insights</h2>
                <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Explore different economic sectors, understand how they work, and discover AI-powered insights into their future.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {industryJourneys.map(industry => (
                    <Card 
                        key={industry.id} 
                        className="flex flex-col hover:shadow-lg hover:border-primary transition-all cursor-pointer group h-full"
                        onClick={() => setSelectedIndustry(industry)}
                    >
                        <div className="p-6 flex-grow">
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-4 rounded-full bg-muted transition-transform group-hover:scale-110">
                                    <industry.icon className='h-8 w-8 text-primary' />
                                </div>
                            </div>
                            <CardTitle className="text-xl mb-2 text-center">{industry.name || industry.title}</CardTitle>
                            <Badge variant="outline" className="mx-auto block w-fit mb-4">AI Insights Available</Badge>
                            
                            <CardDescription className="text-sm leading-relaxed">
                                {industry.description}
                            </CardDescription>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default IndustryDeepDiveTab;
