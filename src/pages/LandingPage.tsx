import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { JharkhandHomeMapSection } from '../components/landing/JharkhandHomeMapSection';
import { LifecycleStepper } from '../components/landing/LifecycleStepper';
import { FeaturedChallenges } from '../components/landing/FeaturedChallenges';
import { StakeholderMatrix } from '../components/landing/StakeholderMatrix';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <JharkhandHomeMapSection />
      <LifecycleStepper />
      <FeaturedChallenges />
      <StakeholderMatrix />
    </div>
  );
};