import React, { useState } from 'react';
import { ProjectTask } from '../../types';
import { useChallenges } from '../../context/ChallengeContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';

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
    if (!newTitle.trim()) return;
    addTask(newTitle.trim(), newOwner.trim(), newDetail.trim() || 'Active engineering milestone');
    setNewTitle('');
    setNewDetail('');
    setShowAddModal(false);
  };

  const getStatusBadge = (status: ProjectTask['status']) => {
    switch (status) {
      case 'DONE':
        return <Badge variant="emerald" size="sm">Done</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="blue" size="sm">In Progress (75%)</Badge>;
      case 'UNDER_REVIEW':
      default:
        return <Badge variant="amber" size="sm">Under Review</Badge>;
    }
  };

  return (
    <Card className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Active Sprint Checklist</h3>
          <p className="text-xs text-slate-500 mt-0.5">Sprint #4 • Laboratory Calibration & SCADA Ingestion</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowAddModal(true)}
          leftIcon={<span className="material-symbols-outlined text-base">add</span>}
        >
          Add Task
        </Button>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => {
          const isDone = task.status === 'DONE';
          const isInProgress = task.status === 'IN_PROGRESS';

          return (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3.5 rounded-xl transition-all border ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
                  : isInProgress
                  ? 'bg-blue-50/20 border-blue-200 shadow-2xs ring-1 ring-blue-100'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextStatus = task.status === 'DONE' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'UNDER_REVIEW' : 'DONE';
                    updateTaskStatus(task.id, nextStatus);
                  }}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-xs shrink-0 cursor-pointer ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                  title="Click to cycle status"
                >
                  <span className="material-symbols-outlined text-sm font-bold">
                    {isDone ? 'check' : isInProgress ? 'refresh' : 'hourglass_top'}
                  </span>
                </button>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold truncate ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span>Owner: <strong>{task.owner}</strong></span>
                    <span>•</span>
                    <span className="text-primary font-medium">{task.detail}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const nextStatus = task.status === 'DONE' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'UNDER_REVIEW' : 'DONE';
                  updateTaskStatus(task.id, nextStatus);
                }}
                className="shrink-0 cursor-pointer"
                title="Click to cycle status"
              >
                {getStatusBadge(task.status)}
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Sprint Task"
        subtitle="Create a verifiable milestone for the university lab development squad."
        footer={
          <div className="flex items-center justify-end gap-2.5 w-full">
            <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTask}>
              Create Sprint Task
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Integrate LoRaWAN gateway with Jal Board node"
          />
          <Input
            label="Assignee / Owner"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
          <Input
            label="Milestone Details / Acceptance Criteria"
            value={newDetail}
            onChange={(e) => setNewDetail(e.target.value)}
            placeholder="e.g. Pass 12-hour thermal pressure stability test"
          />
        </form>
      </Modal>
    </Card>
  );
};