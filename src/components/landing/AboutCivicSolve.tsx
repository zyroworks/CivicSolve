import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AboutCivicSolve: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section id="about" className="w-full py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <span>Open Civic Innovation Platform</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            About CivicSolve
          </h2>

          <p className="mt-2 text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A collaborative open-innovation ecosystem bridging grassroots community challenges with universities, municipal administrations, and industry solvers.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">pin_drop</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Hyperlocal Ground-Truth</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Citizens report real issues with geotagged photographic evidence, localized descriptions, and GPS accuracy to establish authentic municipal demand.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">biotech</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Academic R&D Sprints</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Engineering universities and labs convert verified civic bottlenecks into accredited capstones, faculty research, and functional hardware prototypes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Empirical Deployment</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Supported by corporate CSR micro-grants and municipal sandboxes, completed solutions are piloted in the field for transparent civic adoption.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">Ready to solve or report a community challenge?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Join innovators, researchers, and municipal leaders across Jharkhand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to={isAuthenticated ? "/report" : "/login?redirect=/report"}
              state={{ from: '/report', message: 'Please log in to report a community problem.' }}
            >
              <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs">
                <span className="material-symbols-outlined text-base">add_location_alt</span>
                <span>Report Problem</span>
              </button>
            </Link>
            <Link to="/challenges">
              <button className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors">
                Explore Challenges
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
