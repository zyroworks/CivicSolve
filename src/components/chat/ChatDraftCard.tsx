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
    <div className="my-2 p-4 rounded-xl bg-white border border-blue-200/80 shadow-xs text-xs space-y-3">
      {/* Header with Title and Priority */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1 font-semibold text-primary text-[10px] tracking-wide uppercase">
            <span className="material-symbols-outlined text-xs">auto_awesome</span>
            Structured Challenge Draft
          </span>
          <h4 className="font-bold text-slate-900 text-sm leading-snug mt-0.5">
            {draft.title}
          </h4>
        </div>
        <span className={`px-2 py-0.5 rounded-full font-bold border text-[10px] whitespace-nowrap ${getPriorityStyle(draft.suggested_priority)}`}>
          Priority {draft.suggested_priority}
        </span>
      </div>

      {/* Category & Severity strip */}
      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg text-slate-600 border border-slate-100">
        <div>
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Category</span>
          <span className="font-semibold text-slate-800 text-[11px] truncate block" title={draft.category}>
            {draft.category}
          </span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Severity Score</span>
          <span className="font-bold text-rose-600 text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            {draft.severity}/100 Risk Index
          </span>
        </div>
      </div>

      {/* Impact & Disciplines */}
      <div className="space-y-1 text-slate-600 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-xs text-slate-500">groups</span>
          <span><strong>Affected:</strong> {draft.people_affected}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="material-symbols-outlined text-xs text-primary mt-0.5">school</span>
          <span><strong>Solvers:</strong> {draft.required_expertise}</span>
        </div>
      </div>

      {/* Solution Domains */}
      {draft.suggested_solution_domains && draft.suggested_solution_domains.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {draft.suggested_solution_domains.map((domain, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-blue-50 text-blue-700 font-medium rounded text-[10px] border border-blue-100"
            >
              {domain}
            </span>
          ))}
        </div>
      )}

      {/* Tags */}
      {draft.keywords && draft.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1 text-[10px]">
          {draft.keywords.map((kw, i) => (
            <span key={i} className="text-primary font-medium">
              {kw.startsWith('#') ? kw : `#${kw}`}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs">
            {copied ? 'check' : 'content_copy'}
          </span>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          type="button"
          onClick={() => onApply(draft)}
          className="px-3 py-1.5 bg-primary hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Apply to Report Form</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
