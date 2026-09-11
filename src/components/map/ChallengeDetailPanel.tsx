import React, { useState } from 'react';
import { 
  X, ArrowLeft, MapPin, Users, Calendar, User, ThumbsUp, 
  Sparkles, ExternalLink, ShieldAlert, Cpu, CheckCircle2,
  Maximize2, Eye, Share2, AlertTriangle, Layers
} from 'lucide-react';
import { Challenge } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ChallengeDetailPanelProps {
  challenge: Challenge | null;
  onClose: () => void;
  onFilterSimilar?: (category: string) => void;
  onEndorse?: (challengeId: string) => void;
}

export const ChallengeDetailPanel: React.FC<ChallengeDetailPanelProps> = ({
  challenge,
  onClose,
  onFilterSimilar,
  onEndorse,
}) => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [hasEndorsed, setHasEndorsed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!challenge) return null;

  // Build media items list from media array or fallback to mediaUrl
  const mediaList = challenge.media && challenge.media.length > 0
    ? challenge.media
    : challenge.mediaUrl
      ? [
          {
            id: 'fallback-media',
            challenge_id: challenge.id,
            file_url: challenge.mediaUrl,
            file_type: 'image/jpeg',
            caption: challenge.mediaName || 'Ground verification photo',
            created_at: challenge.createdAt,
          },
        ]
      : [];

  const currentMedia = mediaList[activeImageIndex] || mediaList[0];

  const handleEndorseClick = () => {
    if (!hasEndorsed) {
      setHasEndorsed(true);
      if (onEndorse) {
        onEndorse(challenge.id);
      }
    }
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'P1':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-600',
          label: 'P1 High (Urgent)',
        };
      case 'P2':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          label: 'P2 Medium (Elevated)',
        };
      default:
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          label: 'P3 Low (Standard)',
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'GOVT_VALIDATED':
        return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Govt Validated' };
      case 'IN_PROGRESS':
        return { bg: 'bg-blue-50 text-blue-700 border-blue-200', label: 'In Progress (Lab)' };
      case 'FIELD_PILOT':
        return { bg: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Field Pilot Underway' };
      case 'DEPLOYED':
      case 'RESOLVED':
        return { bg: 'bg-teal-50 text-teal-700 border-teal-200', label: 'Resolved / Deployed' };
      case 'AI_ANALYZED':
        return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', label: 'AI Analyzed' };
      default:
        return { bg: 'bg-slate-100 text-slate-700 border-slate-200', label: 'Under Review' };
    }
  };

  const priorityStyle = getPriorityBadge(challenge.priority);
  const statusStyle = getStatusBadge(challenge.status);

  return (
    <>
      {/* Lightbox Modal */}
      {lightboxOpen && currentMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={currentMedia.file_url} 
              alt={challenge.title}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-white/20"
            />
            {currentMedia.caption && (
              <p className="mt-3 text-sm text-slate-300 text-center bg-slate-900/80 px-4 py-2 rounded-lg max-w-xl">
                {currentMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Detail Panel */}
      <div className="w-full h-full flex flex-col bg-white shadow-2xl border-l border-slate-200 overflow-hidden animate-fadeIn">
        {/* Navigation & Header */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-primary-600 transition-colors py-1 px-2 rounded-lg hover:bg-slate-200/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Map</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              {challenge.ticketId}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {/* Primary Actual Problem Image Display */}
          {mediaList.length > 0 && currentMedia ? (
            <div className="space-y-2">
              <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/10] shadow-sm">
                <img
                  src={currentMedia.file_url}
                  alt={challenge.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high quality placeholder if link fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="text-[11px] text-white/90 truncate max-w-[80%] font-medium">
                    {currentMedia.caption || 'Field verification photo'}
                  </span>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="p-1.5 rounded-md bg-black/60 text-white hover:bg-black/90 transition-colors"
                    title="Expand photo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Multi-Image Thumbnail Gallery Switcher */}
              {mediaList.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  {mediaList.map((m, idx) => (
                    <button
                      key={m.id || idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-primary-600 ring-2 ring-primary-200 scale-105'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                      title={m.caption || `Photo ${idx + 1}`}
                    >
                      <img src={m.file_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${priorityStyle.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityStyle.dot}`} />
              {priorityStyle.label}
            </span>
            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle.bg}`}>
              {statusStyle.label}
            </span>
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {challenge.category}
            </span>
            {challenge.subcategory && (
              <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                {challenge.subcategory}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-snug">
              {challenge.title}
            </h1>
          </div>

          {/* Location & Metadata Grid */}
          <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">
                  {challenge.location.address || challenge.location.ward}
                </span>
                <p className="text-slate-500 text-[11px]">
                  {challenge.location.district}, {challenge.state || 'Jharkhand'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{challenge.peopleAffected || 'Local residents'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{challenge.createdAt}</span>
              </div>
            </div>

            {challenge.submitted_by && (
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-slate-600">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">Reported by: <span className="font-medium text-slate-800">{challenge.submitted_by}</span></span>
              </div>
            )}
          </div>

          {/* Problem Narrative Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Problem Description
            </h3>
            <p className="text-xs leading-relaxed text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80">
              {challenge.description}
            </p>
          </div>

          {/* CivicSolve AI Diagnostic Card */}
          {challenge.aiDiagnostics && (
            <div className="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50/50 via-white to-blue-50/40 p-3.5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-primary-600 text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    CivicSolve AI Diagnostic Analysis
                  </h4>
                </div>
                <span className="text-[10px] font-semibold bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                  {challenge.aiDiagnostics.confidence}% Confidence
                </span>
              </div>

              {/* Severity Gauge */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-600 font-medium">Urgency & Severity Index</span>
                  <span className="font-bold text-slate-900">
                    {challenge.aiDiagnostics.severityScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      challenge.aiDiagnostics.severityScore >= 80
                        ? 'bg-rose-500'
                        : challenge.aiDiagnostics.severityScore >= 60
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${challenge.aiDiagnostics.severityScore}%` }}
                  />
                </div>
              </div>

              {/* Domain & Subsector */}
              <div className="bg-white/80 rounded-lg p-2.5 border border-primary-100 space-y-1 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px]">Domain: </span>
                  <span className="font-semibold text-slate-800">
                    {challenge.aiDiagnostics.detectedDomain}
                  </span>
                </div>
                {challenge.aiDiagnostics.subSector && (
                  <div>
                    <span className="text-slate-500 text-[11px]">Subsector: </span>
                    <span className="text-slate-700">
                      {challenge.aiDiagnostics.subSector}
                    </span>
                  </div>
                )}
              </div>

              {/* Recommended Solver Match */}
              {challenge.aiDiagnostics.recommendedSolverMatch && (
                <div className="bg-white/80 rounded-lg p-2.5 border border-primary-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-500 text-[11px]">Recommended Academic Solver:</span>
                    <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded">
                      {challenge.aiDiagnostics.matchScore}% Match
                    </span>
                  </div>
                  <div className="font-semibold text-primary-800 flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                    <span>{challenge.aiDiagnostics.recommendedSolverMatch}</span>
                  </div>
                </div>
              )}

              {/* Recommended Action */}
              {challenge.aiDiagnostics.recommendedAction && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                  <span className="font-semibold text-slate-700">Action Plan: </span>
                  {challenge.aiDiagnostics.recommendedAction}
                </div>
              )}

              {/* Semantic Tags */}
              {challenge.aiDiagnostics.semanticTags && (
                <div className="flex flex-wrap gap-1">
                  {challenge.aiDiagnostics.semanticTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* AI Disclaimer */}
              <div className="text-[10px] text-slate-500 bg-slate-100/70 p-2 rounded border border-slate-200/60 leading-tight">
                <strong>Disclaimer:</strong> CivicSolve AI provides automated triage and diagnostic recommendations to accelerate societal intervention. Official validation, lab assignment, and funding allocations are conducted by authorized administrative departments.
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/challenges`)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>View Full Challenge</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleEndorseClick}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                hasEndorsed
                  ? 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Endorse this problem to increase visibility"
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasEndorsed ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{(challenge.endorsementsCount || 0) + (hasEndorsed ? 1 : 0)}</span>
            </button>
          </div>

          {onFilterSimilar && (
            <button
              onClick={() => onFilterSimilar(challenge.category)}
              className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium py-1.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter Similar Challenges in {challenge.category}</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
