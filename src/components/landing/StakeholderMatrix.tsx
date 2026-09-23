import React from 'react';
import { Card } from '../common/Card';

export const StakeholderMatrix: React.FC = () => {
  const stakeholders = [
    {
      role: 'Citizens',
      desc: 'Report local problems and track solution progress with verifiable photographic proof.',
      icon: 'campaign',
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      role: 'Government',
      desc: 'Validate issues, prioritize municipal needs, and adopt solutions across municipal wards.',
      icon: 'account_balance',
      iconBg: 'bg-teal-50 text-teal-600',
    },
    {
      role: 'Universities',
      desc: 'Connect engineering faculty and research labs to real-world challenges needing R&D.',
      icon: 'school',
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      role: 'Students & Faculty',
      desc: 'Work on real-world problems as capstone projects and research sprints for academic credit.',
      icon: 'groups',
      iconBg: 'bg-cyan-50 text-cyan-700',
    },
    {
      role: 'Industry / Startups',
      desc: 'Provide mentorship, technical resources, and CSR funding to pilot deployable innovations.',
      icon: 'corporate_fare',
      iconBg: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <section id="stakeholders" className="w-full py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <span>Ecosystem Synergy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connecting Key Stakeholders
          </h2>

          <p className="mt-2 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            A collaborative platform bringing together all parts of the civic innovation ecosystem.
          </p>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stakeholders.map((s) => (
            <Card
              key={s.role}
              className="flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all p-5 group"
            >
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}>
                  <span className="material-symbols-outlined text-xl">{s.icon}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {s.role}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-blue-600">
                <span>Active Partner</span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};