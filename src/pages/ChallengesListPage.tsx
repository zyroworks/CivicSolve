import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../context/ChallengeContext';

export const ChallengesListPage: React.FC = () => {
  const { challenges } = useChallenges();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = challenges.filter((ch) => {
    const matchesSearch = ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.location.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.location.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || ch.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-container-max mx-auto px-gutter-desktop py-space-xl space-y-space-lg w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-primary tracking-wider">National Repository</span>
          <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface mt-1">Civic Challenges & Verified Tenders</h1>
          <p className="text-on-surface-variant text-sm mt-1 max-w-2xl">
            Explore verified citizen-reported problems, priority-ranked by AI and validated by district collectors for academic prototype sandboxing.
          </p>
        </div>
        <Link
          to="/report"
          className="px-4 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add_location_alt</span>
          Submit Problem
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-surface-container-lowest p-3 rounded-2xl border border-surface-container-high shadow-sm">
        <div className="sm:col-span-8 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems by keyword, ward, district, or domain..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high/60"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-high/60 cursor-pointer"
          >
            <option value="all">All Domains</option>
            <option value="water">Water & Sanitation</option>
            <option value="environment">Environment & AQI</option>
            <option value="transit">Road Safety & Transit</option>
            <option value="agri">Agriculture & Cold Storage</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {filtered.map((ch) => (
          <div key={ch.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-surface-container-high">
            <div className="relative h-48 w-full bg-surface-container">
              <img src={ch.mediaUrl} alt={ch.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-tertiary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> {ch.category}
              </div>
              <div className="absolute bottom-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-0.5 rounded text-xs text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-error">location_on</span> {ch.location.ward}, {ch.location.district}
              </div>
            </div>

            <div className="p-space-lg flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                    {ch.status.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs font-bold text-on-surface-variant">{ch.ticketId}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight text-base">
                  {ch.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-3 mt-1.5">
                  {ch.description}
                </p>
              </div>

              <div className="pt-2 border-t border-surface-container-high/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">school</span> {ch.assignedLab || 'Matching Open Labs'}</span>
                  <span className="font-bold text-primary">Severity: {ch.aiDiagnostics.severityScore}/100</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span>Endorsements: <strong className="text-on-surface">{ch.endorsementsCount}</strong></span>
                  <Link to="/workspace" className="text-primary font-bold hover:underline flex items-center gap-0.5">
                    View Project <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};