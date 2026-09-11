import React from 'react';
import { Link } from 'react-router-dom';

export const StakeholderMatrix: React.FC = () => {
  return (
    <section className="w-full py-space-3xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl space-y-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Multi-Stakeholder Synergy</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">Designed for Every Civic Innovator</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Empowering citizens, administrative bodies, researchers, and corporates through tailor-made operational tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Citizens */}
          <div className="group bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">record_voice_over</span>
              </div>
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">Hyperlocal Voice</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Citizens & Communities</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Crowdsource civic pain points in real-time across water distribution, solid waste, transit, and public health with AI EXIF validation.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Photo Geotagging</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">SMS Grievance Sync</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Audit Voting</span>
              </div>
            </div>
            <div className="pt-space-lg">
              <Link to="/report" className="font-label-md text-label-md text-primary flex items-center gap-1 group-hover:gap-2 transition-all font-semibold">
                Submit Neighborhood Issue <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Govt Admin */}
          <div className="group bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">account_balance</span>
              </div>
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-tertiary font-semibold tracking-wide uppercase">Institutional Oversight</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Govt & Municipal Admin</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Automated NLP deduplication, severity prioritization, ward-level escalation, and transparent R&D sanction pipelines with full audit logging.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Automated Triage</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Ward Heatmaps</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">R&D Sanction</span>
              </div>
            </div>
            <div className="pt-space-lg">
              <Link to="/admin" className="font-label-md text-label-md text-tertiary flex items-center gap-1 group-hover:gap-2 transition-all font-semibold">
                Access Admin Console <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Universities */}
          <div className="group bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-secondary font-semibold tracking-wide uppercase">Academic Translation</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Universities & Labs</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Transform verified municipal roadblocks into accredited capstones, funded PhD research, and high-impact student hackathon prototypes.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">SIH'24 Fast-Track</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Hardware Routing</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Academic Credits</span>
              </div>
            </div>
            <div className="pt-space-lg">
              <Link to="/workspace" className="font-label-md text-label-md text-on-surface flex items-center gap-1 group-hover:gap-2 transition-all font-semibold">
                Open Project Workspace <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Industry */}
          <div className="group bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
            <div className="space-y-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">domain_add</span>
              </div>
              <div className="space-y-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">CSR & Scale Grants</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Industry & Enterprise</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Target corporate social responsibility capital directly into verified regional solutions, offer cloud computing compute, and mentor solvers.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-space-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Direct CSR Allocation</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">IP Co-Creation</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Pilot Incubation</span>
              </div>
            </div>
            <div className="pt-space-lg">
              <Link to="/workspace" className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Partner with Innovators <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};