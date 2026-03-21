
import React from 'react';
import PodcastCard from '../PodcastCard';

const podcastRecommendations = [
    {
        name: "The Ramsey Show",
        description: "Dave Ramsey offers practical financial advice, helping listeners get out of debt and build wealth.",
        imageUrl: "/placeholder.svg",
        link: "https://www.ramseysolutions.com/shows/the-ramsey-show"
    },
    {
        name: "Planet Money",
        description: "NPR's podcast that makes complex economic topics accessible and entertaining.",
        imageUrl: "/placeholder.svg",
        link: "https://www.npr.org/sections/money/"
    },
    {
        name: "Afford Anything",
        description: "Hosted by Paula Pant, this podcast explores how to make smarter decisions about money, time, and life.",
        imageUrl: "/placeholder.svg",
        link: "https://affordanything.com/podcast/"
    }
];

const PodcastRecommendationsSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-8">Podcast Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcastRecommendations.map((podcast) => (
          <PodcastCard key={podcast.name} {...podcast} />
        ))}
      </div>
    </div>
  );
};

export default PodcastRecommendationsSection;
