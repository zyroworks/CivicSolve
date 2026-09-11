import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden pb-space-2xl pt-space-xl">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70rem] h-[28rem] bg-gradient-to-b from-primary-fixed/40 via-tertiary-fixed/20 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 -right-24 w-96 h-96 bg-tertiary-fixed-dim/20 rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="flex flex-col items-center text-center space-y-space-md max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container-high">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-bold">
              SIH 2024 National Finalist
            </span>
            <span className="text-outline-variant font-bold">·</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              AI for Societal Good
            </span>
            <span className="material-symbols-outlined text-sm text-primary">verified</span>
          </div>

          <h1 className="font-display text-display text-on-surface tracking-tight leading-[1.1] max-w-3xl">
            From Community Problems to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-tertiary">
              Deployable Solutions
            </span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            A unified digital platform connecting citizens, government bodies, universities, and industry mentors to solve urgent societal challenges through AI-assisted research and engineering.
          </p>

          <div className="pt-space-xs flex flex-wrap items-center justify-center gap-space-md">
            <Link
              to="/report"
              className="group px-space-lg py-space-sm bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all flex items-center gap-space-xs font-semibold"
            >
              <span className="material-symbols-outlined text-lg">add_location_alt</span>
              <span>Report a Problem</span>
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
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
              className="px-space-lg py-space-sm bg-surface-container-lowest hover:bg-surface-container-low text-on-surface rounded-xl font-label-lg text-label-lg shadow-sm hover:shadow transition-all flex items-center gap-space-xs border border-surface-container-high font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-primary">map</span>
              <span>Explore Jharkhand Map</span>
            </a>
          </div>
        </div>

        {/* Live Platform Stats Ticker */}
        <div className="mt-space-2xl grid grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Citizen Submissions</span>
              <span className="p-2 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">crisis_alert</span>
              </span>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-xl text-headline-xl text-on-surface font-bold">1,428+</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                <span className="text-tertiary font-label-sm text-label-sm flex items-center font-bold">
                  <span className="material-symbols-outlined text-xs">trending_up</span>+18%
                </span> this month
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Active R&D Hubs</span>
              <span className="p-2 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">biotech</span>
              </span>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-xl text-headline-xl text-on-surface font-bold">318 Labs</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Across IITs, NITs & State Univs</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Field Deployments</span>
              <span className="p-2 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
              </span>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-xl text-headline-xl text-on-surface font-bold">84 Ready</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Validated by Municipal Bodies</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Social Footprint</span>
              <span className="p-2 rounded-lg bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">groups</span>
              </span>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-xl text-headline-xl text-on-surface font-bold">2.4M+</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Citizens Directly Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};