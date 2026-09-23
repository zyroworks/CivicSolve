import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
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
    <aside className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-20">
      <Card className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900">AI Diagnostic Triage</h3>
          </div>
          <Badge variant="teal" size="sm">Active Engine</Badge>
        </div>

        {/* Domain Classification with Gauge */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Classified Domain
              </span>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                {diagnostics.detectedDomain}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Sub-sector: {diagnostics.subSector}
              </p>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-12 h-12">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-blue-600"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${diagnostics.confidence}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-700">{diagnostics.confidence}%</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 font-medium">Confidence</span>
            </div>
          </div>

          {/* Semantic Tags */}
          <div className="pt-2 border-t border-slate-200/60">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Semantic Entities</span>
            <div className="flex flex-wrap gap-1.5">
              {diagnostics.semanticTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-white text-slate-700 text-[11px] font-medium border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Severity Banner */}
        <div className="p-3.5 bg-red-50/70 border border-red-200/80 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">warning</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase text-red-800 block">Severity Score</span>
              <span className="text-sm font-bold text-red-950">{diagnostics.severityScore} / 100</span>
            </div>
          </div>
          <Badge variant="red" size="sm">
            {diagnostics.priority === 'P1' ? 'Priority P1 (Urgent)' : 'Priority P2 (High)'}
          </Badge>
        </div>

        {/* Duplicate Cluster Warning */}
        {diagnostics.duplicateWarning && (
          <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
              <span className="material-symbols-outlined text-base text-blue-600">hub</span>
              <span>Duplicate Spatial Cluster Identified</span>
            </div>
            <p className="text-blue-800 leading-relaxed pl-5">
              {diagnostics.duplicateWarning}
            </p>
          </div>
        )}

        {/* Recommended Actions */}
        <div className="space-y-3 pt-1 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              Automated Municipal Escalation
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {diagnostics.recommendedAction}
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
              University R&D Lab Match
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {diagnostics.recommendedSolverMatch}
            </p>
          </div>
        </div>

        {/* Dispatch Button */}
        <div className="pt-2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onDispatch}
            isLoading={isDispatching}
            leftIcon={<span className="material-symbols-outlined text-base">verified</span>}
          >
            Confirm & Dispatch to District Admin
          </Button>
          <p className="text-[11px] text-slate-400 text-center mt-2 leading-relaxed">
            By dispatching, this submission receives an official tracking ticket and synchronizes with municipal and university queues.
          </p>
        </div>
      </Card>
    </aside>
  );
};