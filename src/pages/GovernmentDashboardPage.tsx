import React from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { AdminKpiCards } from '../components/admin/AdminKpiCards';
import { TriageTable } from '../components/admin/TriageTable';
import { ActivityLog } from '../components/admin/ActivityLog';

export const GovernmentDashboardPage: React.FC = () => {
  const { challenges } = useChallenges();

  return (
    <div className="max-w-container-max mx-auto px-gutter-desktop py-space-xl space-y-space-xl w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs mb-space-2xs">
            <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Civic Operations Hub
            </span>
            <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
              Live Sync: Active
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">
            Municipal Validation & District Orchestration
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Review citizen-escalated infrastructure alerts, evaluate automated AI triage scores, and greenlight high-readiness student/academic solvers for municipal deployment.
          </p>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            onClick={() => alert('Exporting Official District Triage Audit CSV...')}
            className="flex items-center gap-space-2xs bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-md py-2.5 rounded-xl shadow-sm transition-all font-bold"
          >
            <span className="material-symbols-outlined text-base">file_download</span>
            Export Audit Report
          </button>
        </div>
      </div>

      <AdminKpiCards challenges={challenges} />
      <TriageTable />
      <ActivityLog />

      {/* Sandbox protocol banner */}
      <section className="bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest to-surface-container-low rounded-2xl p-space-lg shadow-sm border border-surface-container-high flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">account_tree</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Municipal-University IP & Solution Protocol Active
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              Validated prototypes receive direct fast-track procurement clearance under National Smart Cities Mission Sandbox framework.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => alert('Municipal Sandbox Fast-Track Authorization Granted for Ward 14!')}
          className="px-space-md py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-lg text-label-lg transition-all shadow-sm font-bold text-sm"
        >
          Authorize Sandbox Deployment
        </button>
      </section>
    </div>
  );
};