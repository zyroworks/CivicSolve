import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengeContext';
import { Challenge } from '../types';
import { JharkhandMap } from '../components/map/JharkhandMap';
import { MapFilterPanel } from '../components/map/MapFilterPanel';
import { ChallengeDetailPanel } from '../components/map/ChallengeDetailPanel';
import { MapLegend } from '../components/map/MapLegend';
import { JHARKHAND_DISTRICTS } from '../data/jharkhandChallenges';
import { 
  MapPin, AlertTriangle, ShieldCheck, GraduationCap, 
  Filter, Search, SlidersHorizontal, ArrowRight, Layers,
  CheckCircle2, Flame, RefreshCw
} from 'lucide-react';

export const JharkhandMapPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { challenges } = useChallenges();
  const [searchParams, setSearchParams] = useSearchParams();

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
  const [showLegend, setShowLegend] = useState(true);

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

  // Read URL query parameters on load
  useEffect(() => {
    const challengeId = searchParams.get('id');
    const districtParam = searchParams.get('district');
    const categoryParam = searchParams.get('category');

    if (challengeId) {
      const match = jharkhandChallenges.find((c) => c.id === challengeId || c.ticketId === challengeId);
      if (match) {
        setSelectedChallenge(match);
      }
    }
    if (districtParam) {
      setSelectedDistrict(districtParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, jharkhandChallenges]);

  // Filtered challenges calculation strictly within Jharkhand
  const filteredChallenges = useMemo(() => {
    return jharkhandChallenges.filter((c) => {
      // Keyword Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const inTitle = c.title.toLowerCase().includes(query);
        const inDesc = c.description.toLowerCase().includes(query);
        const inDistrict = c.location.district.toLowerCase().includes(query);
        const inWard = c.location.ward.toLowerCase().includes(query);
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
    <div className="flex flex-col h-[calc(100vh-7rem)] w-full bg-slate-900 overflow-hidden relative select-none">
      {/* Top Bar: Headline & Quick Stats */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 shrink-0 z-30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-500 text-white flex items-center justify-center shadow-md">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Jharkhand Community Challenges Map
              </h1>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                GIS Live Triage
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Geospatial societal problem tracking, AI diagnostics & academic solver matching across 24 districts
            </p>
          </div>
        </div>

        {/* Quick KPI Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-primary-600" />
              <span>Visible: <strong>{metrics.total}</strong></span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>P1 Urgent: <strong>{metrics.p1Count}</strong></span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-teal-700">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>Validated: <strong>{metrics.validatedCount}</strong></span>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters ({metrics.total})</span>
          </button>

          {/* Toggle Legend */}
          <button
            onClick={() => setShowLegend(!showLegend)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors hidden sm:flex items-center gap-1.5 ${
              showLegend
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Legend</span>
          </button>

          {/* Submit New Problem Link */}
          <Link
            to={isAuthenticated ? "/report" : "/login?redirect=/report"}
            state={{ from: '/report', message: 'Please log in to report a community problem.' }}
            className="px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span>Report Problem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative flex-1 w-full h-full">
        {/* Interactive Leaflet Map */}
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
    </div>
  );
};
