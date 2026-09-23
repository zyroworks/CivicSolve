import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          
          {/* Brand & About */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                <span className="material-symbols-outlined text-base">hub</span>
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">CivicSolve</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              National open civic innovation platform connecting citizens, academic research labs, and municipal administrators to resolve grassroots societal bottlenecks.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700">
              <span className="material-symbols-outlined text-sm text-teal-600">account_balance</span>
              <span>Endorsed by Ministry of Education</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/report" className="hover:text-blue-600 transition-colors">
                  Citizen Problem Intake
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-blue-600 transition-colors">
                  Verified Civic Challenges
                </Link>
              </li>
              <li>
                <Link to="/workspace" className="hover:text-blue-600 transition-colors">
                  University R&D Workspace
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-blue-600 transition-colors">
                  Municipal Validation Portal
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-blue-600 transition-colors">
                  Impact Telemetry & Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* SDG Alignments */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              UN SDG Focus
            </h4>
            <div className="flex flex-col gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>SDG 6: Clean Water & Sanitation</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>SDG 9: Industry, Innovation & Infra</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>SDG 11: Sustainable Cities & Communities</span>
              </span>
            </div>
          </div>

          {/* Governance & Privacy */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Governance & Security
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><span className="hover:text-blue-600 cursor-pointer transition-colors">Digital Personal Data Protection Act</span></li>
              <li><span className="hover:text-blue-600 cursor-pointer transition-colors">Institutional Verification Guide</span></li>
              <li><span className="hover:text-blue-600 cursor-pointer transition-colors">Municipal Redressal Matrix</span></li>
              <li><span className="hover:text-blue-600 cursor-pointer transition-colors">National Open API Specs</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2026 CivicSolve • Capacity Connect. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-teal-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>National Node Online</span>
            </span>
            <span className="hover:text-slate-800 cursor-pointer">Helpdesk</span>
            <span className="hover:text-slate-800 cursor-pointer">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};