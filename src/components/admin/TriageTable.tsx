import React, { useState, useMemo } from 'react';
import { useChallenges } from '../../context/ChallengeContext';
import { Challenge } from '../../types';

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
    <div className="space-y-space-md">
      {/* Filtering Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
          <div className="md:col-span-4 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by ticket ID, keyword, or ward..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high/60 transition-all"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high/60 cursor-pointer"
            >
              <option value="all">All Districts (National)</option>
              <option value="delhi">Delhi (All Wards)</option>
              <option value="bengaluru">Bengaluru Urban</option>
              <option value="nashik">Nashik, MH</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high/60 cursor-pointer"
            >
              <option value="all">All Civic Domains</option>
              <option value="water">Water & Sanitation</option>
              <option value="transit">Road Safety & Transit</option>
              <option value="environment">Environment & AQI</option>
              <option value="agri">Agriculture / Agritech</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high/60 cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="p1">Critical (P1)</option>
              <option value="p2">High (P2)</option>
              <option value="p3">Medium (P3)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-surface-container-high">
        <div className="p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border-b border-surface-container-high/60">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Triage & Challenge Management Data Table
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              Validated through Municipal Sensor Arrays & Geotagged Field Reports
            </p>
          </div>
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
            <span>Showing {filteredChallenges.length} of {challenges.length} actions</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider text-xs">
                <th className="py-space-sm px-space-md font-bold">Ticket ID</th>
                <th className="py-space-sm px-space-md font-bold">Issue Title & Ward</th>
                <th className="py-space-sm px-space-md font-bold">AI Priority Score</th>
                <th className="py-space-sm px-space-md font-bold">Detected Category</th>
                <th className="py-space-sm px-space-md font-bold">Status</th>
                <th className="py-space-sm px-space-md font-bold">Recommended Solver Match</th>
                <th className="py-space-sm px-space-md font-bold text-right">Municipal Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40 text-on-surface text-sm">
              {filteredChallenges.map((ch) => (
                <tr key={ch.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-space-md px-space-md font-label-md text-label-md text-primary font-mono font-bold whitespace-nowrap">
                    {ch.ticketId}
                  </td>
                  <td className="py-space-md px-space-md max-w-xs">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-tight text-sm">
                        {ch.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5 text-xs">
                        <span className="material-symbols-outlined text-xs text-outline">location_on</span>
                        {ch.location.ward}, {ch.location.district}
                      </span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-headline-sm text-headline-sm font-bold ${ch.priority === 'P1' ? 'text-error' : 'text-amber-600'}`}>
                        {ch.aiDiagnostics.severityScore}
                      </span>
                      <span className="text-xs text-on-surface-variant">/100</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ch.priority === 'P1' ? 'bg-error-container text-on-error-container' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {ch.priority}
                      </span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-fixed text-xs font-semibold">
                      {ch.category}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                      ch.status === 'GOVT_VALIDATED' || ch.status === 'IN_PROGRESS'
                        ? 'bg-emerald-100 text-emerald-900'
                        : ch.status === 'REJECTED'
                        ? 'bg-red-100 text-red-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        ch.status === 'GOVT_VALIDATED' || ch.status === 'IN_PROGRESS'
                          ? 'bg-emerald-500'
                          : ch.status === 'REJECTED'
                          ? 'bg-red-500'
                          : 'bg-amber-500'
                      }`}></span>
                      {ch.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold text-xs">
                        {ch.aiDiagnostics.recommendedSolverMatch}
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 text-[11px] font-bold">
                        <span className="material-symbols-outlined text-xs">auto_awesome</span>
                        {ch.aiDiagnostics.matchScore}% Vector Match
                      </span>
                    </div>
                  </td>
                  <td className="py-space-md px-space-md text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleApprove(ch)}
                        className="bg-primary hover:bg-primary-container text-on-primary px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all shadow-sm font-semibold text-xs"
                      >
                        Approve & Match
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(ch)}
                        className="bg-surface-container-low hover:bg-error-container text-error px-2.5 py-1.5 rounded-lg font-label-md text-label-md transition-all text-xs font-semibold"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAI(ch)}
                        className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                        title="View AI Triage Vector"
                      >
                        <span className="material-symbols-outlined text-base">psychology</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Vector Modal */}
      {selectedAI && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  AI Triage Vector: {selectedAI.ticketId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAI(null)}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-surface-container-low p-3 rounded-xl">
                <span className="text-xs uppercase font-bold text-on-surface-variant block">Domain Classification</span>
                <p className="font-semibold text-on-surface">{selectedAI.aiDiagnostics.detectedDomain} ({selectedAI.aiDiagnostics.confidence}% confidence)</p>
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl">
                <span className="text-xs uppercase font-bold text-on-surface-variant block">Recommended Solver Match</span>
                <p className="font-semibold text-tertiary">{selectedAI.aiDiagnostics.recommendedSolverMatch}</p>
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl">
                <span className="text-xs uppercase font-bold text-on-surface-variant block">Recommended Action</span>
                <p className="text-on-surface">{selectedAI.aiDiagnostics.recommendedAction}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedAI(null)}
              className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md"
            >
              Close Vector Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};