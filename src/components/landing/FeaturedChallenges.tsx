import React from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../../context/ChallengeContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const FeaturedChallenges: React.FC = () => {
  const { challenges } = useChallenges();

  const getStatusDisplay = (status: string): { label: string; variant: 'blue' | 'emerald' | 'amber' | 'red' | 'slate' | 'teal' } => {
    switch (status) {
      case 'RESOLVED':
      case 'DEPLOYED':
        return { label: 'Solved', variant: 'emerald' };
      case 'IN_PROGRESS':
      case 'FIELD_PILOT':
      case 'LAB_MATCHED':
        return { label: 'Prototyping', variant: 'amber' };
      case 'GOVT_VALIDATED':
      case 'AI_ANALYZED':
        return { label: 'In Review', variant: 'teal' };
      default:
        return { label: 'Reported', variant: 'blue' };
    }
  };


  return (
    <section className="w-full py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
              <span>Verified Submissions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recent Community Challenges
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Real challenges reported by citizens across Jharkhand awaiting innovative solutions.
            </p>
          </div>

          <Link
            to="/challenges"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All Challenges</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.slice(0, 6).map((ch) => {
            const statusInfo = getStatusDisplay(ch.status);
            const uploadedImg = ch.mediaUrl || ch.media?.[0]?.file_url;
            const reportedDate = ch.createdAt
              ? new Date(ch.createdAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Recently reported';

            return (
              <Card
                key={ch.id}
                padding="none"
                className="overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
              >
                {/* Photo & Overlays */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  {uploadedImg ? (
                    <img
                      src={uploadedImg}
                      alt={ch.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-1.5 p-4 text-center">
                      <span className="material-symbols-outlined text-3xl text-slate-300">image_not_supported</span>
                      <span className="text-[11px] font-medium text-slate-500">Problem Photo Filed with Report</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-xs uppercase tracking-wide">
                      {ch.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={statusInfo.variant} size="sm">
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>


                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Location & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1 font-medium truncate max-w-[180px]">
                        <span className="material-symbols-outlined text-xs text-red-500">location_on</span>
                        <span>{ch.location.ward ? `${ch.location.ward}, ` : ''}{ch.location.district}</span>
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {reportedDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {ch.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {ch.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {ch.ticketId || `#JH-${ch.id.slice(0, 5)}`}
                    </span>
                    <Link
                      to={`/challenges/${ch.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-semibold transition-all"
                    >
                      <span>View Challenge</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/challenges"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-blue-600 shadow-xs"
          >
            <span>View All Challenges</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

      </div>
    </section>
  );
};