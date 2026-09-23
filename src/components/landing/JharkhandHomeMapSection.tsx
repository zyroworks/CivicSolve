import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useChallenges } from '../../context/ChallengeContext';
import { Challenge } from '../../types';
import { JharkhandMap } from '../map/JharkhandMap';
import { ChallengeDetailPanel } from '../map/ChallengeDetailPanel';
import { JHARKHAND_DISTRICTS } from '../../data/jharkhandChallenges';
import { Search, RotateCcw, SlidersHorizontal, X } from 'lucide-react';

export const JharkhandHomeMapSection: React.FC = () => {
  const { challenges } = useChallenges();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  // Mobile Filter Drawer Toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
      className="w-full bg-[#F8FAFC] pt-3 pb-6 sm:pt-4 sm:pb-8 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Map Heading */}
        <div className="text-center max-w-2xl mx-auto mb-2.5 sm:mb-3 px-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Community Problems Across Jharkhand
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500 leading-normal">
            Explore real community challenges and discover where help is needed.
          </p>
        </div>

        {/* Jharkhand Map Container - Occupies 70-80% of Viewport on Desktop */}
        <div className="relative w-full h-[54vh] sm:h-[62vh] lg:h-[calc(100vh-210px)] min-h-[420px] max-h-[660px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 bg-slate-900">
          
          {/* Floating Minimal Filter Bar on Desktop (Top-Left) */}
          <div className="absolute top-3 left-3 z-20 hidden md:flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 shadow-md">
            {/* Search */}
            <div className="relative w-44 lg:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search problems..."
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer max-w-[130px]"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* District Dropdown */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer max-w-[130px]"
            >
              <option value="ALL">All Districts</option>
              {JHARKHAND_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="REPORTED">Reported</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="SOLVED">Solved</option>
            </select>

            {/* Reset */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Count Badge */}
            <span className="px-2 py-1 text-[11px] font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-100">
              {filteredChallenges.length}
            </span>
          </div>

          {/* Floating Mobile Filter Trigger Button (Top-Left on Mobile) */}
          <div className="absolute top-3 left-3 z-20 md:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold rounded-xl shadow-md border border-slate-200 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters ({filteredChallenges.length})</span>
            </button>
          </div>

          {/* Interactive Leaflet Jharkhand Map */}
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

          {/* Mobile Filter Sheet Modal */}
          {mobileFiltersOpen && (
            <div className="absolute inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Filter Map Problems</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Search</label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Keyword or ward..."
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">District</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="ALL">All 24 Districts</option>
                      {JHARKHAND_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="ALL">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    >
                      <option value="ALL">All Status</option>
                      <option value="REPORTED">Reported</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="SOLVED">Solved</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  {isFiltered && (
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs text-center"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs text-center"
                  >
                    Apply ({filteredChallenges.length})
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* REPORT A PROBLEM BUTTON - DIRECTLY BELOW THE MAP */}
        <div className="mt-3.5 sm:mt-4 text-center">
          <Link to="/report" className="inline-block">
            <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all group cursor-pointer">
              <span className="material-symbols-outlined text-base sm:text-lg">add_location_alt</span>
              <span>+ Report a Problem</span>
            </button>
          </Link>
          <p className="mt-1.5 text-[11px] sm:text-xs text-slate-500">
            See an issue in your area? Report it with photos and GPS location to connect with universities and municipal solvers.
          </p>
        </div>

      </div>
    </section>
  );
};
