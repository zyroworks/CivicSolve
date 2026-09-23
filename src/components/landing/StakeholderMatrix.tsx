import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const StakeholderMatrix: React.FC = () => {
  const stakeholders = [
    {
      role: 'Citizens & Communities',
      tag: 'Hyperlocal Voice',
      desc: 'Crowdsource civic pain points in real-time across water distribution, solid waste, transit, and public health with AI validation.',
      icon: 'record_voice_over',
      iconBg: 'bg-blue-50 text-blue-600',
      pills: ['Geotagged Proof', 'Ward SMS Tracking', 'Audit Voting'],
      linkText: 'Submit Issue',
      linkPath: '/report',
    },
    {
      role: 'Govt & Municipal Admin',
      tag: 'Institutional Oversight',
      desc: 'Automated NLP deduplication, severity prioritization, ward escalation, and transparent R&D sanction pipelines with full audit logging.',
      icon: 'account_balance',
      iconBg: 'bg-teal-50 text-teal-600',
      pills: ['Automated Triage', 'Ward Heatmaps', 'R&D Sanction'],
      linkText: 'Admin Portal',
      linkPath: '/admin',
    },
    {
      role: 'Universities & Labs',
      tag: 'Academic Translation',
      desc: 'Transform verified municipal roadblocks into accredited capstones, funded PhD research, and high-impact student engineering prototypes.',
      icon: 'school',
      iconBg: 'bg-indigo-50 text-indigo-600',
      pills: ['Lab Vector Matching', 'Field Prototypes', 'Academic Credits'],
      linkText: 'Open Workspace',
      linkPath: '/workspace',
    },
    {
      role: 'Industry & CSR Mentors',
      tag: 'Scale & Grants',
      desc: 'Deploy corporate social responsibility grants, supply micro-controller hardware, and mentor engineering squads toward municipal pilot deployment.',
      icon: 'corporate_fare',
      iconBg: 'bg-amber-50 text-amber-700',
      pills: ['Hardware Grants', 'Mentorship Tracks', 'Social ROI Audits'],
      linkText: 'Impact Metrics',
      linkPath: '/impact',
    },
  ];

  return (
    <section className="w-full py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="blue" size="sm">
            Ecosystem Synergy
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2">
            Designed for Every Civic Stakeholder
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Empowering citizens, administrative bodies, researchers, and corporates through tailor-made operational tooling.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stakeholders.map((s) => (
            <Card
              key={s.role}
              className="flex flex-col justify-between hover:shadow-md transition-shadow p-6"
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.iconBg}`}>
                  <span className="material-symbols-outlined text-xl">{s.icon}</span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    {s.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {s.role}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {s.pills.map((pill) => (
                    <span
                      key={pill}
                      className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-100"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100">
                <Link
                  to={s.linkPath}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                >
                  <span>{s.linkText}</span>
                  <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};