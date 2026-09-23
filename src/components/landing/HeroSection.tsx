import React from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../common/StatCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-200/80 bg-white">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          
          {/* Subtle Platform Pill */}
          <Badge variant="blue" size="md" icon={<span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />}>
            National Open Innovation · Capacity Connect
          </Badge>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            From Grassroots Problems to{' '}
            <span className="text-blue-600">Deployable Solutions</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            A unified digital platform connecting citizens, municipal administrations, academic R&D labs, and industry mentors to solve urgent community challenges through validated engineering.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/report">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<span className="material-symbols-outlined text-lg">add_location_alt</span>}
                rightIcon={<span className="material-symbols-outlined text-base">arrow_forward</span>}
              >
                Report a Problem
              </Button>
            </Link>

            <a
              href="#challenges-map"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('challenges-map');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#challenges-map';
                }
              }}
            >
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<span className="material-symbols-outlined text-lg text-blue-600">map</span>}
              >
                Explore Jharkhand Map
              </Button>
            </a>
          </div>
        </div>

        {/* 4 Clean Key StatCards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Citizen Reports"
            value="1,428+"
            trend={{ value: "+18%", isPositive: true }}
            subtitle="this month"
            icon={<span className="material-symbols-outlined text-xl">crisis_alert</span>}
            iconBg="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Active R&D Hubs"
            value="318 Labs"
            subtitle="Across top universities"
            icon={<span className="material-symbols-outlined text-xl">biotech</span>}
            iconBg="bg-teal-50 text-teal-600"
          />
          <StatCard
            title="Field Deployments"
            value="84 Ready"
            subtitle="Validated by municipal bodies"
            icon={<span className="material-symbols-outlined text-xl">verified</span>}
            iconBg="bg-slate-100 text-slate-700"
          />
          <StatCard
            title="Citizens Impacted"
            value="2.4M+"
            subtitle="Across 24 districts"
            icon={<span className="material-symbols-outlined text-xl">groups</span>}
            iconBg="bg-indigo-50 text-indigo-600"
          />
        </div>
      </div>
    </section>
  );
};