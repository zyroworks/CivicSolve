import React, { useState } from 'react';
import { StructuredDraft } from '../../types/chat';

interface ChatDraftCardProps {
  draft: StructuredDraft;
  onApply: (draft: StructuredDraft) => void;
}

export const ChatDraftCard: React.FC<ChatDraftCardProps> = ({ draft, onApply }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `CivicSolve Challenge Draft:\nTitle: ${draft.title}\nCategory: ${draft.category} (${draft.subcategory})\nSeverity: ${draft.severity}/100 (Priority: ${draft.suggested_priority})\nAffected: ${draft.people_affected}\nRequired Expertise: ${draft.required_expertise}\nSolution Domains: ${draft.suggested_solution_domains.join(', ')}\nTags: ${draft.keywords.join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'P1':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'P2':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="my-2 p-3.5 rounded-xl bg-surface-container-lowest border border-primary/20 shadow-sm text-xs space-y-2.5">
      {/* Header with Title and Priority */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1 font-semibold text-primary text-[11px] tracking-wide uppercase">
            <span className="material-symbols-outlined text-xs">auto_awesome</span>
            Structured Challenge Draft
          </span>
          <h4 className="font-bold text-on-surface text-sm leading-snug mt-0.5">
            {draft.title}
          </h4>
        </div>
        <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] whitespace-nowrap ${getPriorityStyle(draft.suggested_priority)}`}>
          Priority {draft.suggested_priority}
        </span>
      </div>

      {/* Category & Severity strip */}
      <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-2 rounded-lg text-on-surface-variant">
        <div>
          <span className="block text-[10px] text-outline uppercase font-semibold">Category</span>
          <span className="font-medium text-on-surface text-[11px] truncate block" title={draft.category}>
            {draft.category}
          </span>
        </div>
        <div>
          <span className="block text-[10px] text-outline uppercase font-semibold">Severity Score</span>
          <span className="font-bold text-error text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
            {draft.severity}/100 Risk Index
          </span>
        </div>
      </div>

      {/* Impact & Disciplines */}
      <div className="space-y-1 text-on-surface-variant text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-xs text-secondary">groups</span>
          <span><strong>Affected:</strong> {draft.people_affected}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-xs text-primary mt-0.5">school</span>
          <span><strong>Solvers:</strong> {draft.required_expertise}</span>
        </div>
      </div>

      {/* Solution Domains */}
      {draft.suggested_solution_domains && draft.suggested_solution_domains.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {draft.suggested_solution_domains.map((domain, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 bg-tertiary-container/15 text-tertiary font-medium rounded text-[10px]"
            >
              {domain}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {draft.keywords && draft.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 text-[10px] text-outline">
          {draft.keywords.map((kw, i) => (
            <span key={i} className="text-primary font-medium">
              {kw.startsWith('#') ? kw : `#${kw}`}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2 border-t border-surface-container-high flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1.5 rounded-lg border border-surface-container-high hover:bg-surface-container text-on-surface text-[11px] font-medium transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-xs">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          type="button"
          onClick={() => onApply(draft)}
          className="px-3 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-[11px] font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1"
        >
          <span>Apply to Report Form</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
