import React from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../../context/ChallengeContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const FeaturedChallenges: React.FC = () => {
  const { challenges } = useChallenges();

  return (
    <section className="w-full py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Field Implementations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Active Challenges & Live Prototypes
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Verified problems undergoing academic research, prototyping, and municipal testbed trials.
            </p>
          </div>
          <Link
            to="/challenges"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Browse all {challenges.length} challenges</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.slice(0, 3).map((ch) => (
            <Card
              key={ch.id}
              padding="none"
              className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Image & Header Tags */}
              <div className="relative h-44 w-full bg-slate-100">
                <img
                  src={ch.mediaUrl}
                  alt={ch.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="slate" size="sm">
                    {ch.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-medium text-slate-700 flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-xs text-red-500">location_on</span>
                  <span>{ch.location.ward}, {ch.location.district}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="blue" size="sm">
                      {ch.status.replace(/_/g, ' ')}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400 font-semibold">{ch.ticketId}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-blue-600">school</span>
                      <span className="truncate max-w-[160px]">{ch.assignedLab || 'Open for solvers'}</span>
                    </span>
                    <span className="font-semibold text-blue-600">
                      Severity: {ch.aiDiagnostics.severityScore}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-slate-500">
                    <span>Endorsements: <strong className="text-slate-800">{ch.endorsementsCount}</strong></span>
                    <Link
                      to="/workspace"
                      className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                    >
                      <span>View Workspace</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};