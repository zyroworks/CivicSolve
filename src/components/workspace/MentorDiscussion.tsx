import React, { useState } from 'react';
import { ProjectDiscussion } from '../../types';
import { useChallenges } from '../../context/ChallengeContext';

interface MentorDiscussionProps {
  discussions: ProjectDiscussion[];
}

export const MentorDiscussion: React.FC<MentorDiscussionProps> = ({ discussions }) => {
  const { addDiscussionMessage } = useChallenges();
  const [commentText, setCommentText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addDiscussionMessage(commentText);
    setCommentText('');
  };

  return (
    <div className="space-y-space-md">
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-high">
        <div>
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/60">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">forum</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Collaborative Mentor Thread</h3>
            </div>
            <span className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-bold text-xs">
              {discussions.length} Messages
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-xs mt-2">
            Encrypted audit thread for academic PI, Siemens mentors, student squad, and municipal nodal lead.
          </p>

          <div className="space-y-space-sm pt-space-md max-h-96 overflow-y-auto pr-1">
            {discussions.map((msg) => (
              <div key={msg.id} className="flex items-start gap-space-xs">
                <img className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-primary/20" src={msg.avatar} alt={msg.author} />
                <div className="bg-surface-container-low p-space-sm rounded-2xl space-y-1 w-full border border-surface-container-high/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md font-bold text-on-surface text-xs">{msg.author}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.2 rounded text-[10px]">
                        {msg.badge}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">{msg.time}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface text-xs leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <form onSubmit={handleSend} className="pt-space-xs border-t border-surface-container-high/60">
          <div className="flex items-center gap-space-xs bg-surface-container-low rounded-xl p-1.5 border border-surface-container-high">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Type mentor note, attach patch, or request review..."
              className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm px-2 focus:outline-none text-xs"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-colors flex items-center justify-center shadow-sm"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1 pt-1.5 text-[10px]">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">lock</span> E2E Verified Hub Thread</span>
            <span>Supports Markdown</span>
          </div>
        </form>
      </div>

      {/* Target Testbed Profile Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm space-y-space-xs border border-surface-container-high">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md font-bold text-on-surface flex items-center gap-1.5 text-xs">
            <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
            Target Testbed: Sangam Vihar Ward 14
          </span>
          <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold text-[10px]">
            Civic Priority
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
          High water distribution disruption and intermittent pipeline contamination detected. AquaSense test rigs will monitor main trunk line K-2.
        </p>
        <div className="flex items-center justify-between pt-space-2xs border-t border-surface-container-high/60">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary text-lg">water_loss</span>
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">Estimated Daily Loss</p>
              <p className="font-label-md text-label-md text-on-surface font-bold text-xs">~38,000 Liters / km</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Opening Ward 14 GIS SCADA spatial map overlay...')}
            className="bg-surface-container-low hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold px-3 py-1.5 rounded-lg transition-colors text-xs"
          >
            View Ward GIS Map
          </button>
        </div>
      </div>
    </div>
  );
};