import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, ArrowRight, ShieldCheck, Flame, Layers, Eye, Cpu } from 'lucide-react';
import { JHARKHAND_CHALLENGES } from '../../data/jharkhandChallenges';

export const JharkhandMapPreviewSection: React.FC = () => {
  // Take 3 top priority challenges for the preview cards
  const previewItems = JHARKHAND_CHALLENGES.slice(0, 3);

  return (
    <section className="py-14 bg-gradient-to-b from-surface to-surface-container-lowest border-y border-surface-container-high/60 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container-max mx-auto px-gutter-desktop">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
              GIS Geospatial Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Jharkhand Community Challenges Map
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Explore verified societal challenges across all 24 districts of Jharkhand with photo evidence, AI triage diagnostics, and direct academic solver matching.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <Link
              to="/map"
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
            >
              <span>Explore Interactive Map</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Hero Interactive Preview Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          {/* Left Column: Interactive Feature Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 z-10">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  Live Priority P1 Pins
                </span>
                <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  District Collector Validated
                </span>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  BIT Mesra & IIT ISM Solver Labs
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Real-Time Citizen Problem Telemetry Across 24 Districts
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Click on any map pin to immediately inspect ground-truth field photography, severity ratings, affected population metrics, and automated AI diagnostic breakdowns.
              </p>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                <span className="block text-2xl font-extrabold text-teal-400">24</span>
                <span className="text-[11px] text-slate-400 font-medium">Districts Mapped</span>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                <span className="block text-2xl font-extrabold text-amber-400">100%</span>
                <span className="text-[11px] text-slate-400 font-medium">Photo Verified</span>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                <span className="block text-2xl font-extrabold text-rose-400">AI</span>
                <span className="text-[11px] text-slate-400 font-medium">Triaged & Matched</span>
              </div>
            </div>

            {/* Launch Map CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/map"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-teal-500 hover:from-primary-600 hover:to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-primary-500/25 transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Launch Jharkhand Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/report"
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
              >
                Submit Citizen Report
              </Link>
            </div>
          </div>

          {/* Right Column: Live Interactive Card Previews */}
          <div className="lg:col-span-5 space-y-3 z-10 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
              <span>Recently Reported Challenges</span>
              <span className="text-primary-400 text-[11px]">Click to inspect</span>
            </div>

            {previewItems.map((item) => (
              <Link
                key={item.id}
                to={`/map?id=${item.id}`}
                className="group block bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-3.5 border border-slate-700/70 hover:border-primary-500/50 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-700 bg-slate-900">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span
                      className={`absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        item.priority === 'P1'
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-0.5">
                      <span className="text-teal-400 font-semibold">{item.category}</span>
                      <span>•</span>
                      <span>{item.location.district}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-primary-300 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
                      <span className="text-primary-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {item.aiDiagnostics.matchScore}% Match: {item.aiDiagnostics.recommendedSolverMatch.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Background Map Graphic Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      </div>
    </section>
  );
};
