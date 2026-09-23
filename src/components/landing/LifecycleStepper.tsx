import React from 'react';

interface Step {
  step: number;
  title: string;
  desc: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    step: 1,
    title: 'Citizen Reports',
    desc: 'Citizens submit local civic challenges with photos, description, and GPS location.',
    icon: 'pin_drop',
  },
  {
    step: 2,
    title: 'AI Analyzes & Triages',
    desc: 'AI automatically categorizes the issue, determines urgency, and extracts key details.',
    icon: 'psychology',
  },
  {
    step: 3,
    title: 'Government Validates',
    desc: 'Municipal officials review and authenticate the problem for verified civic action.',
    icon: 'fact_check',
  },
  {
    step: 4,
    title: 'University Matches',
    desc: 'Engineering students and faculty take on challenges as capstone or R&D projects.',
    icon: 'school',
  },
  {
    step: 5,
    title: 'Industry Collaborates',
    desc: 'Companies provide mentorship, technical resources, and CSR funding support.',
    icon: 'handshake',
  },
  {
    step: 6,
    title: 'Deployment & Impact',
    desc: 'Solutions are piloted and deployed in the community, creating measurable impact.',
    icon: 'verified',
  },
];

export const LifecycleStepper: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <span>Streamlined 6-Stage Pipeline</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            How CivicSolve Works
          </h2>

          <p className="mt-2 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            From citizen report to verified community deployment
          </p>
        </div>

        {/* 6 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="relative p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Number and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    0{s.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-slate-400">
                <span>Stage 0{s.step} of 06</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};