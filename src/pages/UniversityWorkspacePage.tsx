import React, { useState } from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { ProjectHeader } from '../components/workspace/ProjectHeader';
import { QuadStakeholders } from '../components/workspace/QuadStakeholders';
import { SprintChecklist } from '../components/workspace/SprintChecklist';
import { TelemetryVisualizer } from '../components/workspace/TelemetryVisualizer';
import { MentorDiscussion } from '../components/workspace/MentorDiscussion';
import { Badge } from '../components/common/Badge';

export const UniversityWorkspacePage: React.FC = () => {
  const { activeProject } = useChallenges();
  const [activeTab, setActiveTab] = useState<'tasks' | 'schematics' | 'discussion'>('tasks');

  const roadmapSteps = [
    { label: 'Proposal & Ethics', status: 'COMPLETED', detail: '100% Verified' },
    { label: 'Research & AI', status: 'COMPLETED', detail: 'Model Ready' },
    { label: 'Prototype & HW', status: 'ACTIVE', detail: 'Active 80%' },
    { label: 'Field Validation', status: 'UPCOMING', detail: 'Upcoming (Wk 8)' },
    { label: 'Ward 14 Pilot', status: 'UPCOMING', detail: 'Target Q4' },
    { label: 'Scaling & Audit', status: 'UPCOMING', detail: 'Final State' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
      <ProjectHeader project={activeProject} />

      {/* 6-Stage Roadmap Stepper */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">route</span>
            <h2 className="text-base font-bold text-slate-900">End-to-End Innovation Roadmap</h2>
            <Badge variant="blue">
              Sprint {activeProject.sprintNumber} of {activeProject.totalSprints}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>80% Current Sprint Velocity</span>
          </div>
        </div>

        <div className="min-w-[700px] relative py-2">
          {/* Progress line */}
          <div className="absolute top-6 left-8 right-8 h-0.5 bg-slate-200 -z-0">
            <div className="h-full bg-primary transition-all duration-700" style={{ width: '45%' }}></div>
          </div>

          <div className="grid grid-cols-6 gap-2 relative z-10">
            {roadmapSteps.map((step, idx) => {
              const isCompleted = step.status === 'COMPLETED';
              const isActive = step.status === 'ACTIVE';

              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isActive
                        ? 'bg-primary text-white shadow-md ring-4 ring-primary/20'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-base font-bold">check</span>
                    ) : isActive ? (
                      <span className="material-symbols-outlined text-base animate-spin">settings</span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500">{idx + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${isActive ? 'text-primary font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                      {step.label}
                    </p>
                    <span className={`text-[11px] block mt-0.5 font-medium ${isCompleted ? 'text-emerald-600' : isActive ? 'text-primary' : 'text-slate-400'}`}>
                      {step.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stakeholder Quad Mesh */}
      <QuadStakeholders project={activeProject} />

      {/* Tabs and Workspace Split */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-xl p-2 border border-slate-200 shadow-xs gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">checklist</span>
              Milestones & Tasks ({activeProject.tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('schematics')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'schematics'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">developer_board</span>
              Telemetry & Schematics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('discussion')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'discussion'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-base">forum</span>
              Discussion & Notes ({activeProject.discussions.length})
            </button>
          </div>
          <div className="flex items-center gap-2 pr-2 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Cloud Sync: Active</span>
          </div>
        </div>

        {/* Dynamic Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            {activeTab === 'tasks' && <SprintChecklist tasks={activeProject.tasks} />}
            {activeTab === 'schematics' && <TelemetryVisualizer artifacts={activeProject.artifacts} />}
            {activeTab === 'discussion' && <MentorDiscussion discussions={activeProject.discussions} />}
          </div>

          <div className="lg:col-span-5 space-y-6">
            {activeTab === 'discussion' ? (
              <TelemetryVisualizer artifacts={activeProject.artifacts} />
            ) : (
              <MentorDiscussion discussions={activeProject.discussions} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};