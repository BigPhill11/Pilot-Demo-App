
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface PodcastCardProps {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ name, description, imageUrl, link }) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <img src={imageUrl} alt={`${name} logo`} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="line-clamp-3">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button asChild variant="outline" className="w-full">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Listen Now <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PodcastCard;
