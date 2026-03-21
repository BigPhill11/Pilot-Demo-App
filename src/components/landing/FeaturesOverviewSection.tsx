
import React from 'react';
import { FeatureCard } from './FeatureCard'; // Note: relative import
import { BookOpen, TrendingUp, LayoutDashboard, DollarSign, Calendar as CalendarIcon, FileText } from 'lucide-react';

const FeaturesOverviewSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground">What You'll Discover</h2>
          <p className="mt-2 text-muted-foreground">Key features to kickstart your financial journey.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<LayoutDashboard className="h-8 w-8 text-primary" />}
            title="Market Today"
            description="Get a daily snapshot of market movements and key headlines. (Updated with more detail)"
          />
          <FeatureCard
            icon={<BookOpen className="h-8 w-8 text-primary" />}
            title="Learn Finance Basics"
            description="Explore various industries, their functions, and fundamental market concepts. (40 terms with quizzes coming soon!)"
            linkTo="/learn"
            linkText="Explore Lessons"
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8 text-primary" />}
            title="Paper Trading"
            description="Practice investing with a virtual portfolio. Learn without the risk. (Static demo available)"
            linkTo="/paper-trading"
            linkText="Try Demo"
          />
          <FeatureCard
            icon={<CalendarIcon className="h-8 w-8 text-primary" />}
            title="Economic Calendar"
            description="Stay updated on important economic events like 'CPI Release - July 15 (Est.)' and 'FOMC Meeting - July 30 (Est.)'. (Full calendar coming soon)"
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Reliable Sources"
            description="All information is sourced from reputable financial news outlets and educational materials."
            id="sources"
          />
           <FeatureCard
            icon={<DollarSign className="h-8 w-8 text-primary" />}
            title="Industry Insights"
            description="Deep dive into different sectors like 'Renewable Energy' or 'Biotechnology' and understand their financial dynamics. (More insights coming soon)"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverviewSection;

