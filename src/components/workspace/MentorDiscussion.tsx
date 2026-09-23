import React, { useState } from 'react';
import { ProjectDiscussion } from '../../types';
import { useChallenges } from '../../context/ChallengeContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface MentorDiscussionProps {
  discussions: ProjectDiscussion[];
}

export const MentorDiscussion: React.FC<MentorDiscussionProps> = ({ discussions }) => {
  const { addDiscussionMessage } = useChallenges();
  const [commentText, setCommentText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addDiscussionMessage(commentText.trim());
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">forum</span>
              <h3 className="text-base font-bold text-slate-900">Collaborative Mentor Thread</h3>
            </div>
            <Badge variant="slate" size="sm">
              {discussions.length} Messages
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Encrypted audit thread for academic PI, Siemens mentors, student squad, and municipal nodal lead.
          </p>

          <div className="space-y-3 pt-4 max-h-96 overflow-y-auto pr-1">
            {discussions.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <img className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 border border-slate-200" src={msg.avatar} alt={msg.author} />
                <div className="bg-slate-50 p-3 rounded-xl space-y-1 w-full border border-slate-200/70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{msg.author}</span>
                      <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded font-medium">
                        {msg.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <form onSubmit={handleSend} className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1.5 border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Type mentor note, attach patch, or request review..."
              className="bg-transparent w-full text-slate-900 placeholder:text-slate-400 text-xs px-2.5 py-1 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="p-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors flex items-center justify-center shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[10px] px-1">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">lock</span> E2E Verified Hub Thread</span>
            <span>Supports Markdown</span>
          </div>
        </form>
      </Card>

      {/* Target Testbed Profile Card */}
      <Card className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
            Target Testbed: Sangam Vihar Ward 14
          </span>
          <Badge variant="teal" size="sm">Civic Priority</Badge>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          High water distribution disruption and intermittent pipeline contamination detected. AquaSense test rigs will monitor main trunk line K-2.
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-600 text-lg">water_loss</span>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Estimated Daily Loss</p>
              <p className="text-xs font-bold text-slate-800">~38,000 Liters / km</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Opening Ward 14 GIS SCADA spatial map overlay...')}
            className="bg-slate-100 hover:bg-slate-200 text-primary font-semibold px-3 py-1.5 rounded-lg transition-colors text-xs cursor-pointer"
          >
            View Ward GIS Map
          </button>
        </div>
      </Card>
    </div>
  );
};