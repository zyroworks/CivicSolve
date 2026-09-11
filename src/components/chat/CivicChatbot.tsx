import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage, RoleQuickPrompt, StructuredDraft } from '../../types/chat';
import { ChatDraftCard } from './ChatDraftCard';
import { DuplicateAlertCard } from './DuplicateAlertCard';

const ROLE_PROMPTS: Record<string, RoleQuickPrompt[]> = {
  CITIZEN: [
    { label: '💧 Water/pipe leak in Ward 14', prompt: 'There is drinking water turbidity and a pipeline leak in Ward 14 Sangam Vihar for 3 weeks.', icon: 'water_drop' },
    { label: '🔍 Check for duplicate issues', prompt: 'Can you check if there are duplicate complaints for water leaks in South East Delhi?', icon: 'find_in_page' },
    { label: '📑 How does validation work?', prompt: 'How does CivicSolve validate problems submitted by citizens?', icon: 'verified' },
    { label: '🛣️ Draft pothole challenge', prompt: 'Deep dangerous potholes on the flyover junction affecting thousands of motorists.', icon: 'alt_route' },
  ],
  GOVT_ADMIN: [
    { label: '📊 Summarize high-priority issues', prompt: 'Please summarize all P1 urgent civic challenges across wards.', icon: 'analytics' },
    { label: '⏳ Show pending lab allocations', prompt: 'Which validated civic challenges currently need university lab matching?', icon: 'assignment' },
    { label: '📈 Check median triage metrics', prompt: 'What are our current AI diagnostic triage response times and accuracy?', icon: 'speed' },
    { label: '🏛️ District impact overview', prompt: 'Generate an impact summary for South East Delhi district.', icon: 'domain' },
  ],
  UNIVERSITY: [
    { label: '🔬 Suggest AI/IoT challenges', prompt: 'Which active challenges are best suited for IoT and Computer Vision student teams?', icon: 'memory' },
    { label: '🏁 Recommended sprint milestones', prompt: 'What are the recommended TRL 1 to 6 milestones for Project AquaSense?', icon: 'flag' },
    { label: '🚰 View AquaSense telemetry', prompt: 'What are the key telemetry sensor thresholds for water turbidity and pressure?', icon: 'sensors' },
    { label: '🤝 How to claim a challenge', prompt: 'How can faculty and students claim a government-validated challenge?', icon: 'school' },
  ],
  INDUSTRY: [
    { label: '🤝 Clean water CSR grants', prompt: 'What CSR opportunities exist for sponsoring clean drinking water tech?', icon: 'handshake' },
    { label: '👨‍🏫 How to mentor student squads', prompt: 'How can industry engineers mentor university students on CivicSolve?', icon: 'support_agent' },
    { label: '💡 Sponsorship guidelines', prompt: 'What are the hardware grant and cloud credit sponsorship options?', icon: 'payments' },
    { label: '🎯 UN SDG alignment', prompt: 'Show me challenges aligned with SDG 6 and SDG 11.', icon: 'eco' },
  ],
};

export const CivicChatbot: React.FC = () => {
  const navigate = useNavigate();
  const { currentRole, currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'assistant',
          content: `### 🌟 Welcome to CivicSolve AI Assistant!
I am your **National Neural Innovation Copilot** for the CivicSolve platform. I help convert localized societal problems into structured, actionable engineering challenges.

Select a quick action below or describe any civic problem in your ward:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: [
            'Report a Problem',
            'Analyze My Problem',
            'Find Challenges',
            'How CivicSolve Works',
          ],
        },
      ]);
    }
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userRole: currentRole,
          history: messages.slice(-6).map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          structuredDraft: data.structuredDraft,
          duplicateMatches: data.duplicateMatches,
          suggestedActions: data.suggestedActions,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (err) {
      console.error('Chatbot API error:', err);
      const fallbackMessage: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `**Notice:** CivicSolve AI is temporarily operating in local fallback mode.

You can still freely browse verified challenges, submit new civic reports, or inspect live IoT telemetry in the University Workspace.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyDraft = (draft: StructuredDraft) => {
    // Store draft for CitizenReportPage to pick up
    sessionStorage.setItem('civicsolve_ai_draft', JSON.stringify(draft));
    window.dispatchEvent(new CustomEvent('civicsolve_fill_draft', { detail: draft }));
    setIsMinimized(true);
    navigate('/report');
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: 'assistant',
        content: `### 🔄 Chat reset. Ready for a new query!
How can I assist your civic innovation efforts as **${currentUser.title}**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'Report a Problem',
          'Analyze My Problem',
          'Find Challenges',
          'How CivicSolve Works',
        ],
      },
    ]);
  };

  // Role pill color styling
  const getRoleBadge = () => {
    switch (currentRole) {
      case 'CITIZEN':
        return { label: 'Citizen Mode', bg: 'bg-emerald-500/15 text-emerald-700 border-emerald-300/40' };
      case 'GOVT_ADMIN':
        return { label: 'Govt Admin Mode', bg: 'bg-primary/15 text-primary border-primary/30' };
      case 'UNIVERSITY':
        return { label: 'University Mode', bg: 'bg-purple-500/15 text-purple-700 border-purple-300/40' };
      case 'INDUSTRY':
        return { label: 'Industry Mode', bg: 'bg-amber-500/15 text-amber-800 border-amber-300/40' };
      default:
        return { label: 'Citizen Mode', bg: 'bg-primary/15 text-primary border-primary/30' };
    }
  };

  // Helper to render markdown-like text
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-on-surface text-sm mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Heading 4
      if (line.startsWith('#### ')) {
        return (
          <h5 key={idx} className="font-bold text-on-surface text-xs mt-2 mb-1">
            {line.replace('#### ', '')}
          </h5>
        );
      }
      // Bullet list item
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const text = line.trim().replace(/^[-*]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 text-xs my-0.5">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>{renderInlineStyles(text)}</span>
          </div>
        );
      }
      // Numbered list item
      if (/^\d+\.\s+/.test(line.trim())) {
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 text-xs my-0.5">
            <span className="font-bold text-primary">{line.trim().match(/^\d+\./)?.[0]}</span>
            <span>{renderInlineStyles(line.trim().replace(/^\d+\.\s+/, ''))}</span>
          </div>
        );
      }
      // Blockquote
      if (line.trim().startsWith('> ')) {
        return (
          <div key={idx} className="p-2 my-1 bg-surface-container rounded-r-lg border-l-2 border-primary text-[11px] text-on-surface-variant italic">
            {renderInlineStyles(line.trim().replace(/^>\s*/, ''))}
          </div>
        );
      }
      // Horizontal rule
      if (line.trim() === '---') {
        return <hr key={idx} className="my-2 border-surface-container-high" />;
      }
      // Regular paragraph
      if (line.trim().length > 0) {
        return (
          <p key={idx} className="text-xs leading-relaxed my-1">
            {renderInlineStyles(line)}
          </p>
        );
      }
      return null;
    });
  };

  const renderInlineStyles = (text: string) => {
    // Replace **bold** with <strong>
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-on-surface">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const activeRoleBadge = getRoleBadge();
  const currentPrompts = ROLE_PROMPTS[currentRole] || ROLE_PROMPTS.CITIZEN;

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface border border-surface-container-high rounded-full shadow-md text-xs font-semibold animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CivicSolve AI Assistant</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${
            isOpen
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-gradient-to-tr from-primary to-primary-container text-on-primary hover:shadow-primary/30 hover:scale-105'
          }`}
          title="CivicSolve AI Assistant"
          aria-label="Toggle CivicSolve AI Assistant"
        >
          <span className="material-symbols-outlined text-2xl">
            {isOpen ? 'close' : 'smart_toy'}
          </span>
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-24 right-6 w-80 h-14 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-xl flex items-center justify-between px-4'
              : 'bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-7.5rem)] bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-2xl flex flex-col overflow-hidden'
          }`}
        >
          {/* Minimized Bar */}
          {isMinimized ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMinimized(false)}>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-on-surface">CivicSolve AI</h4>
                  <span className="text-[10px] text-primary font-medium">Click to expand chat</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsMinimized(false)}
                  className="p-1 text-on-surface-variant hover:text-on-surface"
                  title="Expand"
                >
                  <span className="material-symbols-outlined text-base">expand_less</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-on-surface-variant hover:text-error"
                  title="Close"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Full Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xs">
                    <span className="material-symbols-outlined text-lg">smart_toy</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-white leading-tight">CivicSolve AI</h3>
                      <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold border ${activeRoleBadge.bg} bg-white text-primary border-white/40`}>
                        {activeRoleBadge.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/80 leading-none mt-0.5">
                      National Neural Innovation Copilot
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    title="Reset conversation"
                  >
                    <span className="material-symbols-outlined text-base">restart_alt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    title="Minimize"
                  >
                    <span className="material-symbols-outlined text-base">remove</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-surface-container-lowest text-on-surface">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                        msg.role === 'user'
                          ? 'bg-primary text-on-primary rounded-tr-xs'
                          : msg.isError
                          ? 'bg-red-50 text-red-900 border border-red-200 rounded-tl-xs'
                          : 'bg-surface-container-low text-on-surface border border-surface-container-high rounded-tl-xs'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        renderFormattedContent(msg.content)
                      ) : (
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      )}

                      {/* Structured Draft Card */}
                      {msg.structuredDraft && (
                        <ChatDraftCard draft={msg.structuredDraft} onApply={handleApplyDraft} />
                      )}

                      {/* Duplicate Match Alert Card */}
                      {msg.duplicateMatches && msg.duplicateMatches.length > 0 && (
                        <DuplicateAlertCard matches={msg.duplicateMatches} onClose={() => setIsOpen(false)} />
                      )}

                      {/* Suggested Action Chips */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-surface-container-high/60 flex flex-wrap gap-1.5">
                          {msg.suggestedActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => {
                                if (action === 'Report a Problem') {
                                  navigate('/report');
                                  setIsOpen(false);
                                } else if (action === 'Find Challenges' || action === 'Browse Open Challenges') {
                                  navigate('/challenges');
                                  setIsOpen(false);
                                } else if (action === 'Open University Workspace') {
                                  navigate('/workspace');
                                  setIsOpen(false);
                                } else if (action === 'Open Admin Dashboard') {
                                  navigate('/admin');
                                  setIsOpen(false);
                                } else {
                                  handleSendMessage(action);
                                }
                              }}
                              className="px-2 py-1 rounded-md bg-surface-container-lowest border border-surface-container-high hover:border-primary text-primary text-[11px] font-semibold transition-all hover:shadow-2xs active:scale-95"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-outline mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Loading / Thinking Indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs py-2 px-3 bg-surface-container-low rounded-2xl w-fit border border-surface-container-high animate-pulse">
                    <span className="material-symbols-outlined text-sm text-primary animate-spin">
                      progress_activity
                    </span>
                    <span className="font-medium">CivicSolve AI is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Role-Aware Starter Prompt Pills */}
              <div className="px-3 py-2 bg-surface-container-low border-t border-surface-container-high overflow-x-auto scrollbar-none flex items-center gap-1.5 flex-nowrap">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider whitespace-nowrap pl-1">
                  Ideas:
                </span>
                {currentPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p.prompt)}
                    className="px-2 py-1 rounded-full bg-surface-container-lowest border border-surface-container-high hover:border-primary text-on-surface text-[11px] whitespace-nowrap transition-colors flex-shrink-0 flex items-center gap-1 font-medium hover:bg-surface-container"
                  >
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-surface-container-lowest border-t border-surface-container-high">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-end gap-2"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={`Ask CivicSolve AI as ${activeRoleBadge.label}...`}
                    className="flex-1 max-h-24 p-2.5 text-xs bg-surface-container-low text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-outline"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="h-9 w-9 rounded-xl bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer shadow-xs active:scale-95"
                    title="Send message"
                  >
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </form>
                <p className="text-[9px] text-outline text-center mt-1.5 leading-tight">
                  CivicSolve AI assists and drafts challenges. Official triage is performed by authorized municipal nodal officers.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
