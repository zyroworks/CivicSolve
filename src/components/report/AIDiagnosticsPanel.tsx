import React from 'react';
import { AIDiagnosticResult } from '../../types';

interface AIDiagnosticsPanelProps {
  diagnostics: AIDiagnosticResult;
  onDispatch: () => void;
  isDispatching: boolean;
}

export const AIDiagnosticsPanel: React.FC<AIDiagnosticsPanelProps> = ({
  diagnostics,
  onDispatch,
  isDispatching,
}) => {
  return (
    <aside className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-28">
      {/* Main AI Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-lg relative overflow-hidden border border-surface-container-high">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-tertiary/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-space-md pb-space-sm border-b border-surface-container-high/60">
          <div className="inline-flex items-center gap-space-2xs px-space-sm py-1 bg-surface-container-low rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-tight">CivicSolve Neural Engine v2.4</span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface px-space-xs py-0.5 rounded font-bold">
            Active Live
          </span>
        </div>

        {/* Domain Classification with Gauge */}
        <div className="relative z-10 bg-surface-container-low p-space-md rounded-xl mb-space-md shadow-sm border border-surface-container-high/60">
          <div className="flex items-start justify-between gap-space-xs">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block font-bold">
                Detected Domain & Classification
              </span>
              <p className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                {diagnostics.detectedDomain}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sub-sector: {diagnostics.subSector}
              </p>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="relative w-14 h-14">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                  <path className="text-tertiary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${diagnostics.confidence}, 100`} strokeLinecap="round" strokeWidth="3.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-label-sm text-label-sm text-tertiary font-extrabold">{diagnostics.confidence}%</span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 text-xs font-semibold">Confidence</span>
            </div>
          </div>

          {/* Semantic Tags */}
          <div className="mt-space-sm pt-space-xs border-t border-surface-container-high/60">
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">Extracted Semantic Keywords</span>
            <div className="flex flex-wrap gap-1.5">
              {diagnostics.semanticTags.map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm border border-surface-container-high font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Severity Banner */}
        <div className="relative z-10 bg-error-container/40 p-space-sm rounded-xl flex items-center justify-between mb-space-md border border-error/20">
          <div className="flex items-center gap-space-xs">
            <div className="w-10 h-10 rounded-lg bg-error text-on-error flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm text-on-error-container uppercase font-bold block">Severity Assessment</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{diagnostics.severityScore} / 100</span>
            </div>
          </div>
          <span className="px-space-xs py-1 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold tracking-tight uppercase">
            {diagnostics.priority === 'P1' ? 'Critical (P1)' : 'High (P2)'}
          </span>
        </div>

        {/* Spatial Cluster Deduplication */}
        {diagnostics.duplicateWarning && (
          <div className="relative z-10 bg-secondary-container/40 p-space-sm rounded-xl flex items-start gap-space-xs mb-space-md border border-secondary-container">
            <span className="material-symbols-outlined text-primary text-lg mt-0.5">hub</span>
            <div className="space-y-0.5">
              <span className="font-label-md text-label-md text-on-secondary-container font-bold">Cluster Deduplication Merged</span>
              <p className="font-body-sm text-body-sm text-on-secondary-container text-xs">
                {diagnostics.duplicateWarning}
              </p>
            </div>
          </div>
        )}

        {/* Actions & Recommendations */}
        <div className="relative z-10 space-y-space-sm mb-space-lg">
          <div className="bg-surface-container-low p-space-sm rounded-xl space-y-1 border border-surface-container-high/60">
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-base text-primary">account_balance</span>
              <span className="font-label-md text-label-md font-bold">Recommended Government Action</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              {diagnostics.recommendedAction}
            </p>
          </div>

          <div className="bg-surface-container-low p-space-sm rounded-xl space-y-1 border border-surface-container-high/60">
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-base text-tertiary">school</span>
              <span className="font-label-md text-label-md font-bold">SIH Hackathon Match Suggestion</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              <span className="text-tertiary font-bold">{diagnostics.recommendedSolverMatch}</span> — Notified for sandbox pilot prototype.
            </p>
          </div>
        </div>

        {/* Confirm & Dispatch Button */}
        <div className="relative z-10 space-y-space-xs">
          <button
            type="button"
            onClick={onDispatch}
            disabled={isDispatching}
            className="w-full py-space-sm px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-space-xs font-bold"
          >
            <span className={`material-symbols-outlined text-lg ${isDispatching ? 'animate-spin' : ''}`}>
              {isDispatching ? 'sync' : 'verified_user'}
            </span>
            <span>{isDispatching ? 'Dispatching to District Collector...' : 'Confirm & Dispatch to District Admin'}</span>
          </button>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center px-space-xs text-xs">
            By dispatching, you certify under the SIH Citizen Accord that this issue directly impacts local welfare. An official ticket ID will be issued instantly.
          </p>
        </div>
      </div>

      {/* Notification Matrix */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm space-y-space-xs border border-surface-container-high">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-wider">Automated Notification Matrix</span>
          <span className="material-symbols-outlined text-sm text-on-surface-variant">info</span>
        </div>
        <div className="grid grid-cols-3 gap-space-xs pt-1 text-center">
          <div className="bg-surface-container-low p-2 rounded-xl">
            <span className="material-symbols-outlined text-base text-primary block mx-auto">domain</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold block mt-1">DJB Central</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Pings in 15m</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-xl">
            <span className="material-symbols-outlined text-base text-tertiary block mx-auto">biotech</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold block mt-1">SIH Teams</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Live Feed</span>
          </div>
          <div className="bg-surface-container-low p-2 rounded-xl">
            <span className="material-symbols-outlined text-base text-on-surface block mx-auto">sms</span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold block mt-1">Ward Citizen</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">SMS Tracker</span>
          </div>
        </div>
      </div>
    </aside>
  );
};