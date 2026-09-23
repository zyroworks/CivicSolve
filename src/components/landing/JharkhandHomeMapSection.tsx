import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../../context/ChallengeContext';
import { Challenge } from '../../types';
import { JharkhandMap } from '../map/JharkhandMap';
import { ChallengeDetailPanel } from '../map/ChallengeDetailPanel';
import { JHARKHAND_DISTRICTS } from '../../data/jharkhandChallenges';
import { Search, RotateCcw, ArrowRight } from 'lucide-react';

export const JharkhandHomeMapSection: React.FC = () => {
  const { challenges } = useChallenges();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  // Selected Challenge for Detail Drawer
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

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

  // Unique categories in Jharkhand challenges
  const categories = useMemo(() => {
    const set = new Set<string>();
    jharkhandChallenges.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set).sort();
  }, [jharkhandChallenges]);

  // Filtered challenges calculation
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

        if (!inTitle && !inDesc && !inDistrict && !inWard && !inCategory && !inSubcategory) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'ALL' && c.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Status Filter
      if (selectedStatus !== 'ALL') {
        if (selectedStatus === 'SOLVED') {
          if (c.status !== 'RESOLVED' && c.status !== 'DEPLOYED') return false;
        } else if (selectedStatus === 'IN_PROGRESS') {
          if (c.status !== 'IN_PROGRESS' && c.status !== 'FIELD_PILOT' && c.status !== 'LAB_MATCHED') return false;
        } else if (selectedStatus === 'REPORTED') {
          if (c.status !== 'SUBMITTED' && c.status !== 'AI_ANALYZED' && c.status !== 'GOVT_VALIDATED') return false;
        }
      }

      // District Filter
      if (selectedDistrict !== 'ALL' && c.location.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [jharkhandChallenges, searchTerm, selectedCategory, selectedStatus, selectedDistrict]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedDistrict('ALL');
  };

  const isFiltered = searchTerm !== '' || selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || selectedDistrict !== 'ALL';

  return (
    <section 
      id="challenges-map" 
      className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Interactive State Problem Map</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Community Problems Across Jharkhand
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore reported challenges and discover problems that need solutions. Click pins or districts to inspect ground-truth photos and location details.
          </p>
        </div>

        {/* Minimal, Non-Intrusive Filter Toolbar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 mb-5 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search problems, keywords, or wards..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Minimal Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* District */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="REPORTED">Reported</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="SOLVED">Solved</option>
            </select>

            {/* Reset */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

          {/* Count Indicator */}
          <div className="shrink-0 text-xs font-semibold text-slate-500 pl-1 self-center">
            Showing <strong className="text-slate-900">{filteredChallenges.length}</strong> of {jharkhandChallenges.length}
          </div>
        </div>

        {/* Clean, Modern Map Card Container */}
        <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[680px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900">
          <JharkhandMap
            challenges={filteredChallenges}
            selectedChallenge={selectedChallenge}
            onSelectChallenge={(c) => setSelectedChallenge(c)}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={(dist) => setSelectedDistrict((prev) => (prev === dist ? 'ALL' : dist))}
            className="w-full h-full"
          />

          {/* Optional Slide-in Detail Drawer on Pin Click */}
          {selectedChallenge && (
            <div className="absolute top-0 right-0 bottom-0 w-full sm:w-[420px] max-w-full z-30 shadow-2xl bg-white border-l border-slate-200 transition-all duration-300">
              <ChallengeDetailPanel
                challenge={selectedChallenge}
                onClose={() => setSelectedChallenge(null)}
                onFilterSimilar={(cat) => {
                  setSelectedCategory(cat);
                  setSelectedChallenge(null);
                }}
              />
            </div>
          )}
        </div>

        {/* 5. PROMINENT REPORT A PROBLEM CTA BLOCK (DIRECTLY BELOW MAP) */}
        <div className="mt-8 bg-blue-50/90 border border-blue-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              See an issue in your area?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              Report it with photos and location to help universities and problem solvers take action.
            </p>
          </div>

          <Link to="/report" className="shrink-0">
            <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm sm:text-base rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 group">
              <span className="material-symbols-outlined text-xl">add_location_alt</span>
              <span>+ Report a Community Problem</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};
