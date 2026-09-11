import React from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../../context/ChallengeContext';

export const FeaturedChallenges: React.FC = () => {
  const { challenges } = useChallenges();

  return (
    <section className="w-full py-space-2xl bg-surface-container-low border-t border-surface-container-high/60">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-xl gap-space-sm">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-bold">Field Implementations</span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1 font-bold">Active Challenges & Live Prototypes</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Real problems undergoing research, prototyping, and municipal testbed trials right now.</p>
          </div>
          <Link to="/challenges" className="inline-flex items-center gap-space-2xs text-primary font-label-lg text-label-lg hover:underline font-semibold">
            Browse all {challenges.length} live challenges <span className="material-symbols-outlined text-base">arrow_right_alt</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {challenges.slice(0, 3).map((ch) => (
            <div key={ch.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-surface-container-high">
              <div className="relative h-48 w-full bg-surface-container">
                <img src={ch.mediaUrl} alt={ch.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-space-xs py-1 rounded-full font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span> {ch.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md px-space-xs py-0.5 rounded font-label-sm text-label-sm text-on-surface font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-error">location_on</span> {ch.location.ward}, {ch.location.district}
                </div>
              </div>
              <div className="p-space-lg flex-1 flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed font-label-sm text-label-sm text-on-tertiary-fixed font-semibold">
                      {ch.status.replace('_', ' ')}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono font-semibold">{ch.ticketId}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold">{ch.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-3">
                    {ch.description}
                  </p>
                </div>
                <div className="space-y-space-xs pt-space-xs border-t border-surface-container-high/60">
                  <div className="p-space-xs rounded-lg bg-surface-container flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">school</span> {ch.assignedLab || 'Open for solvers'}
                    </span>
                    <span className="text-primary font-semibold">Severity: {ch.aiDiagnostics.severityScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant pt-1">
                    <span>Endorsements: <strong className="text-on-surface">{ch.endorsementsCount}</strong></span>
                    <Link to="/workspace" className="text-primary font-label-md text-label-md hover:underline flex items-center gap-0.5 font-semibold">
                      View Workspace <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};