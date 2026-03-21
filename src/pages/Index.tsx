import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import GameStatusCard from '@/components/empire/GameStatusCard';

const Index = () => {
  return (
    <>
      <HeroSection />
      
      {/* Bamboo Empire Status */}
      <section aria-label="Your Bamboo Empire" className="container mx-auto px-4 my-6">
        <React.Suspense fallback={null}>
          <GameStatusCard />
        </React.Suspense>
      </section>
    </>
  );
};

export default Index;
