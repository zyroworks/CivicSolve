import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 mt-space-3xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl pb-space-xl">
          
          <div className="space-y-space-sm md:col-span-1">
            <div className="flex items-center gap-space-xs">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-on-primary text-sm font-bold">
                <span className="material-symbols-outlined text-base">hub</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">CivicSolve</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              National Open Civic Innovation Platform bridging academic researchers, municipal leaders, and civil society dedicated to grassroots problem solving.
            </p>
            <div className="inline-flex items-center gap-space-xs px-space-xs py-1 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface">
              <span className="material-symbols-outlined text-sm text-tertiary">account_balance</span>
              Endorsed by Ministry of Education
            </div>
          </div>

          <div className="space-y-space-xs">
            <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">Innovation Lifecycle</h4>
            <ul className="space-y-space-2xs font-body-sm text-body-sm text-on-surface-variant">
              <li><Link to="/report" className="hover:text-primary transition-colors">Citizen Issue Submissions</Link></li>
              <li><Link to="/challenges" className="hover:text-primary transition-colors">AI Problem Clustering</Link></li>
              <li><Link to="/workspace" className="hover:text-primary transition-colors">District R&D Sandbox</Link></li>
              <li><Link to="/impact" className="hover:text-primary transition-colors">Impact Telemetry & APIs</Link></li>
            </ul>
          </div>

          <div className="space-y-space-xs">
            <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">UN SDG Alignments</h4>
            <div className="flex flex-wrap gap-space-xs pt-space-2xs">
              <span className="px-space-xs py-1 bg-surface-container-high rounded-lg font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">water_drop</span>
                SDG 6: Clean Water
              </span>
              <span className="px-space-xs py-1 bg-surface-container-high rounded-lg font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">factory</span>
                SDG 9: Industry & Infra
              </span>
              <span className="px-space-xs py-1 bg-surface-container-high rounded-lg font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">location_city</span>
                SDG 11: Sustainable Cities
              </span>
            </div>
          </div>

          <div className="space-y-space-xs">
            <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">Platform & Governance</h4>
            <ul className="space-y-space-2xs font-body-sm text-body-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Verified Problem Statements</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">DPDP Act 2023 Compliance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Institutional Verification Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Grievance Redressal</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-space-lg border-t border-surface-container-high/60 flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm">
          <span>© 2026 CivicSolve Platform • National Societal Innovation Pipeline. All rights reserved.</span>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm">
            <span className="flex items-center gap-1 text-tertiary font-medium">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Live National Node CS-NIC-04
            </span>
            <a href="#" className="hover:text-on-surface transition-colors">Helpdesk</a>
            <a href="#" className="hover:text-on-surface transition-colors">Terms & Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};