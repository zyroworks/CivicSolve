import React, { useState } from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { ProjectHeader } from '../components/workspace/ProjectHeader';
import { QuadStakeholders } from '../components/workspace/QuadStakeholders';
import { SprintChecklist } from '../components/workspace/SprintChecklist';
import { TelemetryVisualizer } from '../components/workspace/TelemetryVisualizer';
import { MentorDiscussion } from '../components/workspace/MentorDiscussion';

export const UniversityWorkspacePage: React.FC = () => {
  const { activeProject } = useChallenges();
  const [activeTab, setActiveTab] = useState<'tasks' | 'schematics' | 'logs' | 'discussion'>('tasks');

  return (
    <div className="max-w-container-max mx-auto px-gutter-desktop py-space-xl space-y-space-xl w-full">
      <ProjectHeader project={activeProject} />

      {/* 6-Stage Roadmap Stepper */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg overflow-x-auto border border-surface-container-high">
        <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container-high/60">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-xl">route</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">End-to-End Innovation Roadmap</h2>
            <span className="bg-surface-container-low text-tertiary font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full ml-space-xs text-xs">
              Sprint {activeProject.sprintNumber} of {activeProject.totalSprints}
            </span>
          </div>
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> 80% Current Sprint Velocity
          </div>
        </div>

        <div className="min-w-[760px] relative py-space-sm">
          <div className="absolute top-8 left-6 right-6 h-1 bg-surface-container-high -z-0">
            <div className="h-full bg-primary transition-all duration-700" style={{ width: '48%' }}></div>
          </div>
          <div className="grid grid-cols-6 gap-space-xs relative z-10">
            <div className="flex flex-col items-center text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-lg">check</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface text-xs">Proposal & Ethics</span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold text-[10px]">100% Verified</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-lg">check</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface text-xs">Research & AI</span>
              <span className="font-label-sm text-label-sm text-tertiary font-semibold text-[10px]">100% Model Ready</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md ring-4 ring-primary-fixed-dim">
                <span className="material-symbols-outlined text-lg animate-spin">settings</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold text-primary text-xs">Prototype & HW</span>
              <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full text-[10px]">Active 80%</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1 opacity-75">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">science</span>
              </div>
              <span className="font-label-sm text-label-sm font-medium text-on-surface-variant text-xs">Field Validation</span>
              <span className="font-label-sm text-label-sm text-outline text-[10px]">Upcoming (Wk 8)</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1 opacity-60">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">water_drop</span>
              </div>
              <span className="font-label-sm text-label-sm font-medium text-on-surface-variant text-xs">Ward 14 Pilot</span>
              <span className="font-label-sm text-label-sm text-outline text-[10px]">Target Q4</span>
            </div>

            <div className="flex flex-col items-center text-center space-y-1 opacity-60">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">workspace_premium</span>
              </div>
              <span className="font-label-sm text-label-sm font-medium text-on-surface-variant text-xs">Scaling & Audit</span>
              <span className="font-label-sm text-label-sm text-outline text-[10px]">Final State</span>
            </div>
          </div>
        </div>
      </section>

      <QuadStakeholders project={activeProject} />

      {/* Tabs and Workspace Split */}
      <section className="space-y-space-md">
        <div className="flex items-center justify-between bg-surface-container-lowest rounded-2xl p-space-xs shadow-sm overflow-x-auto border border-surface-container-high">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all flex items-center gap-1.5 font-bold text-xs ${
                activeTab === 'tasks' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-base">checklist</span>
              Milestones & Tasks ({activeProject.tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schematics')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all flex items-center gap-1.5 font-bold text-xs ${
                activeTab === 'schematics' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-base">developer_board</span>
              Telemetry & Schematics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('discussion')}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all flex items-center gap-1.5 font-bold text-xs ${
                activeTab === 'discussion' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-base">forum</span>
              Discussion & Notes ({activeProject.discussions.length})
            </button>
          </div>
          <span className="text-xs text-on-surface-variant pr-3 hidden sm:inline">Auto-sync: Active</span>
        </div>

        {/* Dynamic Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <div className="lg:col-span-7 space-y-space-md">
            {activeTab === 'tasks' && <SprintChecklist tasks={activeProject.tasks} />}
            {activeTab === 'schematics' && <TelemetryVisualizer artifacts={activeProject.artifacts} />}
            {activeTab === 'discussion' && <MentorDiscussion discussions={activeProject.discussions} />}
            {activeTab === 'tasks' && <TelemetryVisualizer artifacts={activeProject.artifacts} />}
          </div>

          <div className="lg:col-span-5 space-y-space-md">
            <MentorDiscussion discussions={activeProject.discussions} />
          </div>
        </div>
      </section>
    </div>
  );
};