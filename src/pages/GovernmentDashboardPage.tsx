import React from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { AdminKpiCards } from '../components/admin/AdminKpiCards';
import { TriageTable } from '../components/admin/TriageTable';
import { ActivityLog } from '../components/admin/ActivityLog';
import { PageHeader, Button, Card, Badge } from '../components/common';

export const GovernmentDashboardPage: React.FC = () => {
  const { challenges } = useChallenges();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
      {/* Page Header */}
      <PageHeader
        badge={
          <div className="flex items-center gap-2">
            <Badge variant="blue" size="sm">Civic Operations Hub</Badge>
            <Badge variant="emerald" size="sm">Live Supabase Sync Active</Badge>
          </div>
        }
        title="Municipal Validation & District Orchestration"
        description="Review citizen-escalated infrastructure alerts, evaluate automated AI triage scores, and greenlight high-readiness student/academic solvers for municipal deployment."
        actions={
          <Button
            variant="primary"
            size="md"
            onClick={() => alert('Exporting Official District Triage Audit CSV...')}
            leftIcon={<span className="material-symbols-outlined text-base">file_download</span>}
          >
            Export Audit Report
          </Button>
        }
      />

      {/* KPI Stats */}
      <AdminKpiCards challenges={challenges} />

      {/* Triage & Escalation Table */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Active Problem Triage Queue</h2>
        <TriageTable />
      </div>

      {/* Activity Log */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Audit Trail & Dispatch Log</h2>
        <ActivityLog />
      </div>

      {/* Municipal Sandbox Protocol Card */}
      <Card className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">account_tree</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Municipal-University IP & Solution Protocol Active
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Validated prototypes receive direct fast-track procurement clearance under National Smart Cities Mission Sandbox framework.
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => alert('Municipal Sandbox Fast-Track Authorization Granted for Ward 14!')}
        >
          Authorize Sandbox Deployment
        </Button>
      </Card>
    </div>
  );
};