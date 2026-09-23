import React from 'react';
import { JharkhandHomeMapSection } from '../components/landing/JharkhandHomeMapSection';
import { LifecycleStepper } from '../components/landing/LifecycleStepper';
import { FeaturedChallenges } from '../components/landing/FeaturedChallenges';
import { StakeholderMatrix } from '../components/landing/StakeholderMatrix';
import { AboutCivicSolve } from '../components/landing/AboutCivicSolve';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. FIRST SCREEN: Jharkhand Community Problem Map + Report a Problem Button */}
      <JharkhandHomeMapSection />

      {/* BELOW THE FIRST SCREEN: Scrollable In-Depth Sections */}
      <LifecycleStepper />
      <FeaturedChallenges />
      <StakeholderMatrix />
      <AboutCivicSolve />
    </div>
  );
};