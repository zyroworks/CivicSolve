import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { JharkhandHomeMapSection } from '../components/landing/JharkhandHomeMapSection';
import { LifecycleStepper } from '../components/landing/LifecycleStepper';
import { StakeholderMatrix } from '../components/landing/StakeholderMatrix';
import { FeaturedChallenges } from '../components/landing/FeaturedChallenges';
import { ImpactBanner } from '../components/landing/ImpactBanner';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <JharkhandHomeMapSection />
      <LifecycleStepper />
      <StakeholderMatrix />
      <FeaturedChallenges />
      <ImpactBanner />
    </div>
  );
};