import React from 'react';
import { Challenge } from '../../types';

interface AdminKpiCardsProps {
  challenges: Challenge[];
}

export const AdminKpiCards: React.FC<AdminKpiCardsProps> = ({ challenges }) => {
  const pendingCount = challenges.filter(c => c.status === 'SUBMITTED' || c.status === 'AI_ANALYZED').length;
  const p1Count = challenges.filter(c => c.priority === 'P1').length;
  const solverCount = challenges.filter(c => c.status === 'LAB_MATCHED' || c.status === 'IN_PROGRESS').length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {/* Total Challenges */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Total Challenges</span>
          <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">dataset</span>
          </div>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">1,428</span>
          <span className="flex items-center gap-0.5 font-label-md text-label-md text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-full font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span>+12%
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs text-xs">Verified citizen submissions</p>
        <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-space-md overflow-hidden">
          <div className="bg-primary h-full w-[78%] rounded-full"></div>
        </div>
      </div>

      {/* Pending Admin Validation */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Pending Admin Validation</span>
          <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">rule</span>
          </div>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">{pendingCount + 44}</span>
          <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded-full font-bold">Triage Queue</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs text-xs">Avg turnaround: 3.4 hrs</p>
        <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-space-md overflow-hidden">
          <div className="bg-primary-container h-full w-[42%] rounded-full"></div>
        </div>
      </div>

      {/* Critical / P1 Action */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-error uppercase tracking-wider font-bold">Critical / P1 Action</span>
          <div className="w-9 h-9 rounded-lg bg-error-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-xl">warning</span>
          </div>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-error font-bold">{p1Count + 18}</span>
          <span className="font-label-sm text-label-sm text-error bg-error-container px-2 py-0.5 rounded-full font-bold animate-pulse">Immediate</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs text-xs">Public safety & health flagged</p>
        <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-space-md overflow-hidden">
          <div className="bg-error h-full w-[85%] rounded-full"></div>
        </div>
      </div>

      {/* Active Solvers */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-high">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-tertiary uppercase tracking-wider font-bold">Active Solvers</span>
          <div className="w-9 h-9 rounded-lg bg-tertiary-fixed/50 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
        </div>
        <div className="mt-space-md flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-on-surface font-bold">{solverCount + 140}</span>
          <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-full font-bold">38 Institutes</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs text-xs">Incubating deployable prototypes</p>
        <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-space-md overflow-hidden">
          <div className="bg-tertiary h-full w-[64%] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};