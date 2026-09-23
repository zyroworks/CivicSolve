import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../context/ChallengeContext';
import { PageHeader, Button, Card, Badge, Input, Select, EmptyState } from '../components/common';

export const ChallengesListPage: React.FC = () => {
  const { challenges } = useChallenges();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = challenges.filter((ch) => {
    const matchesSearch =
      ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.location.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.location.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'all' ||
      ch.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
      {/* Page Header */}
      <PageHeader
        badge={
          <Badge variant="blue" size="sm">
            National Repository · Capacity Connect
          </Badge>
        }
        title="Civic Challenges & Verified Tenders"
        description="Explore verified citizen-reported problems, priority-ranked by AI and validated by district collectors for academic prototype sandboxing."
        actions={
          <Link to="/report">
            <Button
              variant="primary"
              size="md"
              leftIcon={<span className="material-symbols-outlined text-base">add_location_alt</span>}
            >
              Submit Problem
            </Button>
          </Link>
        }
      />

      {/* Search & Filter Bar */}
      <Card padding="sm" className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems by keyword, ward, district, or domain..."
            leftIcon={<span className="material-symbols-outlined text-base text-slate-400">search</span>}
          />
        </div>
        <div className="sm:col-span-4">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { value: 'all', label: 'All Domains' },
              { value: 'water', label: 'Water & Sanitation' },
              { value: 'environment', label: 'Environment & AQI' },
              { value: 'transit', label: 'Road Safety & Transit' },
              { value: 'agri', label: 'Agriculture & Cold Storage' },
            ]}
          />
        </div>
      </Card>

      {/* Challenges Grid or Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No challenges found"
          description="Try adjusting your search query or selecting a different domain category."
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ch) => (
            <Card
              key={ch.id}
              padding="none"
              className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Media Thumbnail */}
              <div className="relative h-44 w-full bg-slate-100">
                <img
                  src={ch.mediaUrl}
                  alt={ch.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="slate" size="sm">
                    {ch.category}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-medium text-slate-700 flex items-center gap-1 shadow-xs">
                  <span className="material-symbols-outlined text-xs text-red-500">location_on</span>
                  <span>{ch.location.ward}, {ch.location.district}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="blue" size="sm">
                      {ch.status.replace(/_/g, ' ')}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400 font-semibold">{ch.ticketId}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                {/* Footer Meta */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-blue-600">school</span>
                      <span className="truncate max-w-[160px]">{ch.assignedLab || 'Matching Open Labs'}</span>
                    </span>
                    <span className="font-semibold text-blue-600">
                      Severity: {ch.aiDiagnostics.severityScore}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-slate-500">
                    <span>Endorsements: <strong className="text-slate-800">{ch.endorsementsCount}</strong></span>
                    <Link
                      to="/workspace"
                      className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                    >
                      <span>View Project</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};