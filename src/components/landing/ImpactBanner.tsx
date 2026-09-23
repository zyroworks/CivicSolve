import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const ImpactBanner: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="w-full py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-900 text-white rounded-2xl p-8 sm:p-12 overflow-hidden shadow-md border border-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <Badge
                variant="teal"
                size="sm"
                icon={<span className="material-symbols-outlined text-xs">verified</span>}
              >
                National Flagship Initiative · Capacity Connect
              </Badge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Ready to turn community bottlenecks into deployable solutions?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Connect as a municipal commissioner with an unaddressed crisis, an engineering faculty team looking for accredited capstones, or an industry partner seeking measurable social impact.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to={isAuthenticated ? "/report" : "/login?redirect=/report"}
                  state={{ from: '/report', message: 'Please log in to report a community problem.' }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
                  >
                    Submit Civic Problem
                  </Button>
                </Link>

                <Link to="/workspace">
                  <Button
                    variant="secondary"
                    size="md"
                    leftIcon={<span className="material-symbols-outlined text-base text-blue-600">hub</span>}
                  >
                    Access R&D Workspace
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Telemetry Card */}
            <div className="lg:col-span-5 bg-slate-800/80 rounded-xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  National Platform Telemetry
                </span>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              </div>

              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Districts Mapped</span>
                    <span className="font-bold text-white">428 / 766</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '56%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Funded CSR Commitments</span>
                    <span className="font-bold text-teal-400">₹14.2 Cr</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Patent Disclosures Filed</span>
                    <span className="font-bold text-white">42 Patents</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-teal-400">policy</span>
                <span>Verified under National Innovation Framework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};