import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../../context/ChallengeContext';
import { Challenge } from '../../types';
import { JharkhandMap } from '../map/JharkhandMap';
import { MapFilterPanel } from '../map/MapFilterPanel';
import { ChallengeDetailPanel } from '../map/ChallengeDetailPanel';
import { MapLegend } from '../map/MapLegend';
import { JHARKHAND_DISTRICTS } from '../../data/jharkhandChallenges';
import { 
  ShieldCheck, SlidersHorizontal, ArrowRight, 
  RotateCcw
} from 'lucide-react';

export const JharkhandHomeMapSection: React.FC = () => {
  const { challenges } = useChallenges();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  // Selected Challenge for Detail Panel
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  // UI Panels state
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showLegend] = useState(true);

  // Strict Jharkhand Challenges Only
  const jharkhandChallenges = useMemo(() => {
    return challenges.filter((c) => {
      if (!c.location || typeof c.location.lat !== 'number' || typeof c.location.lng !== 'number') {
        return false;
      }
      const isStateJharkhand = c.state?.toLowerCase() === 'jharkhand';
      const isJharkhandId = c.id.startsWith('ch-jh-') || c.ticketId.startsWith('#JH-');
      const isJharkhandDistrict = c.location?.district && JHARKHAND_DISTRICTS.some(
        (d) => d.toLowerCase() === c.location.district.toLowerCase()
      );
      const inJharkhandCoords =
        c.location.lat >= 21.8 && c.location.lat <= 25.5 &&
        c.location.lng >= 83.0 && c.location.lng <= 88.2;

      return (isStateJharkhand || isJharkhandId || isJharkhandDistrict) && inJharkhandCoords;
    });
  }, [challenges]);

  // Filtered challenges calculation strictly within Jharkhand
  const filteredChallenges = useMemo(() => {
    return jharkhandChallenges.filter((c) => {
      // Keyword Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const inTitle = c.title.toLowerCase().includes(query);
        const inDesc = c.description.toLowerCase().includes(query);
        const inDistrict = c.location.district.toLowerCase().includes(query);
        const inWard = c.location.ward ? c.location.ward.toLowerCase().includes(query) : false;
        const inCategory = c.category.toLowerCase().includes(query);
        const inSubcategory = c.subcategory ? c.subcategory.toLowerCase().includes(query) : false;
        const inTags = c.aiDiagnostics?.semanticTags?.some((t) => t.toLowerCase().includes(query)) || false;

        if (!inTitle && !inDesc && !inDistrict && !inWard && !inCategory && !inSubcategory && !inTags) {
          return false;
        }
      }

      // Category Flexible Match
      if (selectedCategory !== 'ALL') {
        const catQuery = selectedCategory.toLowerCase();
        const catTarget = c.category.toLowerCase();
        const subcatTarget = c.subcategory ? c.subcategory.toLowerCase() : '';
        if (!catTarget.includes(catQuery) && !catQuery.includes(catTarget) && !subcatTarget.includes(catQuery)) {
          return false;
        }
      }

      // Status
      if (selectedStatus !== 'ALL' && c.status !== selectedStatus) {
        return false;
      }

      // Priority
      if (selectedPriority !== 'ALL' && c.priority !== selectedPriority) {
        return false;
      }

      // District
      if (selectedDistrict !== 'ALL' && c.location.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [jharkhandChallenges, searchTerm, selectedCategory, selectedStatus, selectedPriority, selectedDistrict]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedPriority('ALL');
    setSelectedDistrict('ALL');
  };

  // Filter similar challenges handler
  const handleFilterSimilar = (category: string) => {
    setSelectedCategory(category);
    setSelectedChallenge(null);
  };

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = filteredChallenges.length;
    const p1Count = filteredChallenges.filter((c) => c.priority === 'P1').length;
    const validatedCount = filteredChallenges.filter(
      (c) => c.status === 'GOVT_VALIDATED' || c.status === 'IN_PROGRESS' || c.status === 'FIELD_PILOT'
    ).length;
    const labsCount = filteredChallenges.filter((c) => !!c.assignedLab || !!c.aiDiagnostics?.recommendedSolverMatch).length;

    return { total, p1Count, validatedCount, labsCount };
  }, [filteredChallenges]);

  return (
    <section 
      id="challenges-map" 
      className="py-12 sm:py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-y border-slate-800"
    >
      {/* Background High-Tech Grid Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container-max mx-auto px-gutter-desktop">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              GIS Geospatial Intelligence • Jharkhand State Portal
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Explore Community Challenges Across{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-primary-400">
                Jharkhand
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Discover real societal problems, inspect ground-truth photographic evidence, and connect challenges with academic solver labs across all 24 districts.
            </p>
          </div>

          {/* Quick Stats Banner & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-2xl px-4 py-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Districts: <strong className="text-white">24</strong></span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1.5 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Urgent P1: <strong className="text-white">{metrics.p1Count}</strong></span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1.5 text-teal-300">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Validated: <strong className="text-white">{metrics.validatedCount}</strong></span>
              </div>
            </div>

            <Link
              to="/report"
              className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-primary-600/25 transition-all flex items-center gap-2"
            >
              <span>Report a Problem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* GIS Workstation Container */}
        <div className="relative w-full h-[580px] sm:h-[650px] lg:h-[720px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-[#0B132B]">
          {/* Interactive Vector GIS Jharkhand Map */}
          <JharkhandMap
            challenges={filteredChallenges}
            selectedChallenge={selectedChallenge}
            onSelectChallenge={(c) => setSelectedChallenge(c)}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(dist) => setSelectedDistrict((prev) => (prev === dist ? 'ALL' : dist))}
            className="w-full h-full"
          />

          {/* Floating Desktop Filter Panel (Top-Left) */}
          <div className="absolute top-4 left-4 z-20 hidden md:block">
            <MapFilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
              onResetFilters={handleResetFilters}
              totalCount={jharkhandChallenges.length}
              filteredCount={filteredChallenges.length}
              isOpen={isFilterOpen}
              onToggleOpen={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* Floating Mobile Controls (Filter Button) */}
          <div className="absolute top-4 left-4 z-20 md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="px-3.5 py-2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold rounded-xl shadow-2xl border border-slate-700 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Filters ({filteredChallenges.length})</span>
            </button>
          </div>

          {/* Floating Legend (Bottom-Left) */}
          {showLegend && (
            <div className="absolute bottom-6 left-4 z-20 hidden sm:block max-w-[240px]">
              <MapLegend />
            </div>
          )}

          {/* Selected Challenge Detail Panel (Right Side Dock / Slide-in) */}
          {selectedChallenge && (
            <div className="absolute top-0 right-0 bottom-0 w-full sm:w-[400px] md:w-[420px] max-w-full z-30 shadow-2xl transition-all duration-300">
              <ChallengeDetailPanel
                challenge={selectedChallenge}
                onClose={() => setSelectedChallenge(null)}
                onFilterSimilar={handleFilterSimilar}
              />
            </div>
          )}

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <MapFilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
              onResetFilters={handleResetFilters}
              totalCount={jharkhandChallenges.length}
              filteredCount={filteredChallenges.length}
              isOpen={true}
              onToggleOpen={() => {}}
              isMobileDrawer={true}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Click on any of the 24 districts or pins to filter & inspect high-resolution problem photography.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetFilters}
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
            <span className="text-slate-700">|</span>
            <Link to="/challenges" className="text-cyan-400 hover:underline flex items-center gap-1">
              <span>View All Challenges in Table</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
