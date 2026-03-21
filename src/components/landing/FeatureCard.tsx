
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo?: string;
  linkText?: string;
  id?: string;
  comingSoon?: boolean;
}

export const FeatureCard = ({ icon, title, description, linkTo, linkText, id, comingSoon }: FeatureCardProps) => (
  <Card id={id} className="flex flex-col">
    <CardHeader>
      <div className="flex items-center space-x-3 mb-3">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="mt-auto">
      {comingSoon && <span className="text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-1 rounded-full">Coming Soon</span>}
      {linkTo && linkText && (
        <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-primary/80">
          <Link to={linkTo}>
            {linkText} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      )}
    </CardContent>
  </Card>
);

