import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DuplicateMatch } from '../../types/chat';

interface DuplicateAlertCardProps {
  matches: DuplicateMatch[];
  onClose?: () => void;
}

export const DuplicateAlertCard: React.FC<DuplicateAlertCardProps> = ({ matches, onClose }) => {
  const navigate = useNavigate();

  if (!matches || matches.length === 0) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'GOVT_VALIDATED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'LAB_MATCHED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="my-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
      {/* Alert Header */}
      <div className="flex items-center gap-1.5 text-amber-800 font-bold">
        <span className="material-symbols-outlined text-base text-amber-600">warning</span>
        <span>Duplicate Challenge Notice ({matches.length} similar)</span>
      </div>

      <p className="text-on-surface-variant text-[11px] leading-relaxed">
        Similar issues already exist in CivicSolve. You can endorse existing tickets or review them below. <em>Reports are not auto-merged without your consent.</em>
      </p>

      {/* Matches List */}
      <div className="space-y-1.5 pt-1">
        {matches.map((match) => (
          <div
            key={match.id}
            className="p-2 rounded-lg bg-surface-container-lowest border border-amber-500/20 shadow-2xs space-y-1"
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="font-bold text-primary text-[11px]">{match.ticketId}</span>
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.2 rounded font-bold text-[9px] bg-amber-100 text-amber-800">
                  {match.similarity}% Match
                </span>
                <span className={`px-1.5 py-0.2 rounded font-semibold text-[9px] border ${getStatusBadge(match.status)}`}>
                  {match.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <p className="font-semibold text-on-surface text-[11px] leading-snug line-clamp-1">
              {match.title}
            </p>

            <div className="flex items-center justify-between text-[10px] text-on-surface-variant pt-0.5">
              <span className="flex items-center gap-1 truncate max-w-[190px]">
                <span className="material-symbols-outlined text-xs text-outline">location_on</span>
                {match.location}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigate('/challenges');
                  if (onClose) onClose();
                }}
                className="font-bold text-primary hover:underline"
              >
                Inspect &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
