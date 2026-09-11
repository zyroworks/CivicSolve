import React, { useState } from 'react';
import { ProjectTask } from '../../types';
import { useChallenges } from '../../context/ChallengeContext';

interface SprintChecklistProps {
  tasks: ProjectTask[];
}

export const SprintChecklist: React.FC<SprintChecklistProps> = ({ tasks }) => {
  const { updateTaskStatus, addTask } = useChallenges();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOwner, setNewOwner] = useState('Aarav Sharma');
  const [newDetail, setNewDetail] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addTask(newTitle, newOwner, newDetail || 'Active engineering milestone');
    setNewTitle('');
    setNewDetail('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md border border-surface-container-high">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Active Sprint Checklist</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Sprint #4 • Laboratory Calibration & SCADA Ingestion</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-bold px-space-sm py-1.5 rounded-xl flex items-center gap-1 transition-colors text-xs border border-surface-container-high"
        >
          <span className="material-symbols-outlined text-base">add</span> Add Task
        </button>
      </div>

      <div className="space-y-space-xs">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-space-sm rounded-xl transition-all border ${
              task.status === 'DONE'
                ? 'bg-surface-container-low/60 border-surface-container-high/60'
                : task.status === 'IN_PROGRESS'
                ? 'bg-surface-container-lowest border-primary/40 shadow-sm ring-1 ring-primary/20'
                : 'bg-surface-container-low border-surface-container-high/60'
            }`}
          >
            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                onClick={() => {
                  const nextStatus = task.status === 'DONE' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'UNDER_REVIEW' : 'DONE';
                  updateTaskStatus(task.id, nextStatus);
                }}
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors text-xs ${
                  task.status === 'DONE'
                    ? 'bg-tertiary text-on-tertiary'
                    : task.status === 'IN_PROGRESS'
                    ? 'bg-primary text-on-primary'
                    : 'bg-secondary text-on-secondary'
                }`}
                title="Click to cycle status"
              >
                <span className="material-symbols-outlined text-sm font-bold">
                  {task.status === 'DONE' ? 'check' : task.status === 'IN_PROGRESS' ? 'refresh' : 'hourglass_top'}
                </span>
              </button>
              <div>
                <p className={`font-label-lg text-label-lg text-on-surface font-semibold text-sm ${
                  task.status === 'DONE' ? 'line-through opacity-70' : ''
                }`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                  <span>Owner: {task.owner}</span>
                  <span>•</span>
                  <span className="text-tertiary font-bold">{task.detail}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextStatus = task.status === 'DONE' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'UNDER_REVIEW' : 'DONE';
                updateTaskStatus(task.id, nextStatus);
              }}
              className={`font-label-sm text-label-sm font-bold px-2.5 py-0.5 rounded-full text-[11px] cursor-pointer ${
                task.status === 'DONE'
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                  : task.status === 'IN_PROGRESS'
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-secondary-container text-on-secondary-container'
              }`}
            >
              {task.status === 'DONE' ? 'Done' : task.status === 'IN_PROGRESS' ? 'In Progress (75%)' : 'Under Review'}
            </button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateTask} className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Add Sprint Task</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface">Task Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Integrate LoRaWAN gateway with Jal Board node"
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-sm border border-surface-container-high"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface">Assignee / Owner</label>
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-sm border border-surface-container-high"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface">Milestone Details</label>
              <input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="e.g. Pass 12-hour thermal pressure stability test"
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-sm border border-surface-container-high"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-surface-container-low">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-bold shadow-md">
                Create Sprint Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};