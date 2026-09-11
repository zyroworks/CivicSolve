import React from 'react';
import { Search, Filter, RotateCcw, X, MapPin, Tag, Activity, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { JHARKHAND_DISTRICTS, JHARKHAND_CATEGORIES } from '../../data/jharkhandChallenges';

interface MapFilterPanelProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedPriority: string;
  onPriorityChange: (val: string) => void;
  selectedDistrict: string;
  onDistrictChange: (val: string) => void;
  onResetFilters: () => void;
  totalCount: number;
  filteredCount: number;
  isOpen: boolean;
  onToggleOpen: () => void;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'SUBMITTED', label: 'Submitted / New' },
  { value: 'AI_ANALYZED', label: 'AI Analyzed' },
  { value: 'GOVT_VALIDATED', label: 'Govt Validated' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'FIELD_PILOT', label: 'Field Pilot' },
  { value: 'DEPLOYED', label: 'Deployed' },
  { value: 'RESOLVED', label: 'Resolved' },
];

const PRIORITY_OPTIONS = [
  { value: 'ALL', label: 'All Priorities' },
  { value: 'P1', label: 'P1 - High / Urgent' },
  { value: 'P2', label: 'P2 - Medium / Elevated' },
  { value: 'P3', label: 'P3 - Low / Standard' },
];

export const MapFilterPanel: React.FC<MapFilterPanelProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  selectedDistrict,
  onDistrictChange,
  onResetFilters,
  totalCount,
  filteredCount,
  isOpen,
  onToggleOpen,
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedPriority !== 'ALL' ||
    selectedDistrict !== 'ALL';

  const content = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary-600" />
          <h2 className="font-semibold text-slate-800 text-sm">Filter Challenges</h2>
          <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-medium">
            {filteredCount} / {totalCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              title="Reset all filters"
              className="text-xs text-slate-500 hover:text-primary-600 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title, ward, issue..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary-600" />
            Jharkhand District ({JHARKHAND_DISTRICTS.length})
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Districts across Jharkhand</option>
            {JHARKHAND_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Problem Categories</option>
            {JHARKHAND_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Priority Severity
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {PRIORITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPriorityChange(opt.value)}
                className={`text-xs py-1.5 px-2 rounded-lg border font-medium text-left truncate transition-all ${
                  selectedPriority === opt.value
                    ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            Lifecycle Stage
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white font-medium text-slate-700"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500 text-center">
        Showing {filteredCount} matching {filteredCount === 1 ? 'challenge' : 'challenges'}
      </div>
    </div>
  );

  if (isMobileDrawer) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end animate-fadeIn">
        <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col z-20 ${
        isOpen ? 'w-72 sm:w-80 h-[480px] max-h-[80vh]' : 'w-12 h-12 overflow-hidden'
      }`}
    >
      {!isOpen ? (
        <button
          onClick={onToggleOpen}
          title="Open Filters"
          className="w-full h-full flex items-center justify-center text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-2xl transition-colors"
        >
          <Filter className="w-5 h-5 text-primary-600" />
        </button>
      ) : (
        content
      )}
    </div>
  );
};
