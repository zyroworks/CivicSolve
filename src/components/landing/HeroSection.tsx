import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full pt-10 pb-8 sm:pt-14 sm:pb-10 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Platform Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Civic Innovation & Community Problem Solving</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          From Community Problems to{' '}
          <span className="text-blue-600">Deployable Solutions</span>
        </h1>

        {/* Subheading */}
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Report real-world problems, connect communities with universities and industry, and turn challenges into measurable solutions.
        </p>

        {/* Call to Actions (compact buttons) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/report">
            <Button
              variant="primary"
              size="md"
              leftIcon={<span className="material-symbols-outlined text-lg">add_location_alt</span>}
            >
              Report a Problem
            </Button>
          </Link>

          <Link to="/challenges">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<span className="material-symbols-outlined text-lg text-blue-600">explore</span>}
            >
              Explore Challenges
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};