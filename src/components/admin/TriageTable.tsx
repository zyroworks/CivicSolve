import React, { useState, useMemo } from 'react';
import { useChallenges } from '../../context/ChallengeContext';
import { Challenge } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Modal } from '../common/Modal';

export const TriageTable: React.FC = () => {
  const { challenges, updateChallengeStatus } = useChallenges();
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedAI, setSelectedAI] = useState<Challenge | null>(null);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((ch) => {
      const text = `${ch.ticketId} ${ch.title} ${ch.location.ward} ${ch.location.district} ${ch.category}`.toLowerCase();
      const matchesSearch = !search || text.includes(search.toLowerCase());

      let matchesDistrict = true;
      if (districtFilter !== 'all') {
        matchesDistrict = ch.location.district.toLowerCase().includes(districtFilter.toLowerCase());
      }

      let matchesCategory = true;
      if (categoryFilter !== 'all') {
        matchesCategory = ch.category.toLowerCase().includes(categoryFilter.toLowerCase());
      }

      let matchesPriority = true;
      if (priorityFilter !== 'all') {
        matchesPriority = ch.priority.toLowerCase() === priorityFilter.toLowerCase();
      }

      return matchesSearch && matchesDistrict && matchesCategory && matchesPriority;
    });
  }, [challenges, search, districtFilter, categoryFilter, priorityFilter]);

  const handleApprove = (ch: Challenge) => {
    updateChallengeStatus(ch.id, 'GOVT_VALIDATED');
    alert(`Challenge ${ch.ticketId} officially approved by Municipal Officer & matched to ${ch.aiDiagnostics.recommendedSolverMatch}!`);
  };

  const handleReject = (ch: Challenge) => {
    updateChallengeStatus(ch.id, 'REJECTED');
    alert(`Challenge ${ch.ticketId} rejected with audit justification logged.`);
  };

  return (
    <div className="space-y-4">
      {/* Filtering Bar */}
      <Card padding="sm" className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-5">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket, keyword, or ward..."
            leftIcon={<span className="material-symbols-outlined text-base text-slate-400">search</span>}
          />
        </div>

        <div className="md:col-span-3">
          <Select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Districts (National)' },
              { value: 'ranchi', label: 'Ranchi, Jharkhand' },
              { value: 'dhanbad', label: 'Dhanbad, Jharkhand' },
              { value: 'jamshedpur', label: 'Jamshedpur, Jharkhand' },
              { value: 'delhi', label: 'Delhi (All Wards)' },
            ]}
          />
        </div>

        <div className="md:col-span-2">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Domains' },
              { value: 'water', label: 'Water & Sanitation' },
              { value: 'transit', label: 'Transit & Roads' },
              { value: 'environment', label: 'Environment' },
              { value: 'agri', label: 'Agritech' },
            ]}
          />
        </div>

        <div className="md:col-span-2">
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Priorities' },
              { value: 'p1', label: 'Critical (P1)' },
              { value: 'p2', label: 'High (P2)' },
              { value: 'p3', label: 'Medium (P3)' },
            ]}
          />
        </div>
      </Card>

      {/* Table Card */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="px-4 py-3.5">Ticket & Problem</th>
                <th className="px-4 py-3.5">Category & Ward</th>
                <th className="px-4 py-3.5">Priority / AI Score</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Lab Solver Match</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChallenges.slice(0, 10).map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Ticket & Title */}
                  <td className="px-4 py-3.5 max-w-xs">
                    <span className="font-mono text-slate-400 font-semibold block text-[11px]">
                      {ch.ticketId}
                    </span>
                    <p className="font-semibold text-slate-900 line-clamp-1 text-xs mt-0.5" title={ch.title}>
                      {ch.title}
                    </p>
                  </td>

                  {/* Category & Location */}
                  <td className="px-4 py-3.5">
                    <span className="font-medium text-slate-800 block truncate max-w-[150px]">
                      {ch.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {ch.location.ward}, {ch.location.district}
                    </span>
                  </td>

                  {/* Priority / AI Score */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={ch.priority === 'P1' ? 'red' : ch.priority === 'P2' ? 'amber' : 'slate'}
                        size="sm"
                      >
                        {ch.priority}
                      </Badge>
                      <span className="font-semibold text-slate-700">
                        {ch.aiDiagnostics.severityScore}/100
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <Badge
                      variant={
                        ch.status === 'GOVT_VALIDATED' || ch.status === 'DEPLOYED'
                          ? 'emerald'
                          : ch.status === 'IN_PROGRESS' || ch.status === 'LAB_MATCHED'
                          ? 'blue'
                          : 'slate'
                      }
                      size="sm"
                    >
                      {ch.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>

                  {/* Solver Match */}
                  <td className="px-4 py-3.5 max-w-[180px] truncate text-slate-700">
                    {ch.assignedLab || ch.aiDiagnostics.recommendedSolverMatch || 'Pending Match'}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAI(ch)}
                        title="Inspect AI Diagnostics"
                      >
                        <span className="material-symbols-outlined text-base text-blue-600">psychology</span>
                      </Button>

                      {ch.status !== 'GOVT_VALIDATED' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleApprove(ch)}
                          title="Validate & Approve"
                        >
                          <span className="material-symbols-outlined text-base text-emerald-600">check</span>
                        </Button>
                      )}

                      {ch.status !== 'REJECTED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReject(ch)}
                          title="Reject"
                        >
                          <span className="material-symbols-outlined text-base text-red-500">close</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Inspect AI Modal */}
      {selectedAI && (
        <Modal
          isOpen={Boolean(selectedAI)}
          onClose={() => setSelectedAI(null)}
          title={`AI Diagnostics Breakdown: ${selectedAI.ticketId}`}
          subtitle={selectedAI.title}
          footer={
            <Button variant="secondary" size="sm" onClick={() => setSelectedAI(null)}>
              Close Inspection
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-semibold">Classified Domain</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedAI.aiDiagnostics.detectedDomain}</span>
                <span className="text-slate-500">{selectedAI.aiDiagnostics.subSector}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase font-semibold">Triage Confidence</span>
                <span className="font-bold text-blue-600 text-sm mt-0.5 block">{selectedAI.aiDiagnostics.confidence}%</span>
                <span className="text-slate-500">NLP Vector Match</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">Recommended Municipal Action</span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed font-medium">
                {selectedAI.aiDiagnostics.recommendedAction}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-400 block text-[11px] uppercase font-semibold">University Solver Match</span>
              <p className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 leading-relaxed font-semibold">
                {selectedAI.aiDiagnostics.recommendedSolverMatch} ({selectedAI.aiDiagnostics.matchScore}% Match Score)
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};