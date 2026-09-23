import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface StepDetail {
  badge: string;
  title: string;
  desc: string;
  stat: string;
  node: string;
}

const LIFECYCLE_STEPS: Record<number, StepDetail> = {
  1: {
    badge: "GIS Ingestion API",
    title: "1. Crowdsourced Citizen Reporting",
    desc: "Citizens submit geo-tagged images, localized audio descriptions, and precise GPS coordinates. The system validates EXIF metadata to prevent falsified reports and aggregates coincident issues into single municipal clusters.",
    stat: "99.4% SLA Verification",
    node: "Node: CS-NIC-01"
  },
  2: {
    badge: "Multi-lingual AI Triage",
    title: "2. NLP Diagnostics & Priority Scoring",
    desc: "Natural language algorithms parse and categorize submissions across municipal infrastructure domains (water, power, sanitation, transit) and compute severity scores based on population impact.",
    stat: "0.28s Processing Latency",
    node: "Node: AI-CLUSTER-04"
  },
  3: {
    badge: "Municipal Gateway",
    title: "3. Government Validation & Sanction",
    desc: "Ward administrators and district collectors review and authenticate issues against active city maintenance tenders. Validated problems receive formal administrative clearance and a unique tracking token.",
    stat: "142 Wards Connected",
    node: "Node: MCD-SYNC-02"
  },
  4: {
    badge: "Vector Skill Router",
    title: "4. Automated Academic & Lab Matching",
    desc: "Semantic algorithms match validated civic constraints with university labs, specialized engineering faculty, and equipment facilities (e.g., optical sensors, drone testing setups).",
    stat: "318 Labs Ready",
    node: "Node: AICTE-ROUTER"
  },
  5: {
    badge: "Collaborative Track",
    title: "5. Student & Faculty Prototype Sprints",
    desc: "Multidisciplinary student squads undergo 6-8 week engineering sprints with embedded faculty mentors, developing functional hardware and software prototypes in civic sandboxes.",
    stat: "2,400+ Researchers",
    node: "Node: R&D-SANDBOX"
  },
  6: {
    badge: "Corporate Grants",
    title: "6. Industry Mentorship & CSR Funding",
    desc: "Participating corporates provide micro-grants for raw materials, sensor rigs, and cloud compute. Corporate mentors conduct weekly technical reviews with student teams.",
    stat: "₹14.2 Cr Disbursed",
    node: "Node: CSR-ESCROW"
  },
  7: {
    badge: "Municipal Sandboxing",
    title: "7. Real-World Field Pilot Deployment",
    desc: "Prototypes are installed in designated local testing zones for empirical evaluation. Real-world telemetry is live-streamed directly to municipal analytics dashboards.",
    stat: "84 Live Pilots",
    node: "Node: FIELD-TEST-09"
  },
  8: {
    badge: "Social Audit Register",
    title: "8. Quantified Public Impact & Handover",
    desc: "Empirical outcomes such as water turbidity reduction, pothole detection speeds, or farmer cold-storage efficiency gains are certified for public transparency and long-term municipal adoption.",
    stat: "2.4M Direct Beneficiaries",
    node: "Node: AUDIT-PUBLIC"
  }
};

export const LifecycleStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const current = LIFECYCLE_STEPS[activeStep];

  const steps = [
    { num: 1, title: 'Citizen Problem', icon: 'pin_drop' },
    { num: 2, title: 'AI Analysis', icon: 'psychology' },
    { num: 3, title: 'Govt Validation', icon: 'fact_check' },
    { num: 4, title: 'Lab Matching', icon: 'hub' },
    { num: 5, title: 'R&D Sprints', icon: 'group_work' },
    { num: 6, title: 'Industry CSR', icon: 'handshake' },
    { num: 7, title: 'Field Pilot', icon: 'sensors' },
    { num: 8, title: 'Citizen Impact', icon: 'social_leaderboard' },
  ];

  return (
    <section className="w-full py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="teal" size="sm">
            Innovation Pipeline
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2">
            The End-to-End Civic Lifecycle
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            How raw community problems transform into verified municipal infrastructure through structured multi-stakeholder collaboration.
          </p>
        </div>

        {/* Step Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
          {steps.map((s) => {
            const isSelected = activeStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(s.num)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-lg mb-1">{s.icon}</span>
                <span className="truncate w-full">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Highlight Card */}
        <Card className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="blue" size="sm">{current.badge}</Badge>
                <span className="text-xs font-mono text-slate-400">{current.node}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
            </div>

            <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-right shrink-0">
              <span className="text-[11px] font-semibold uppercase text-slate-400 block">Performance Metric</span>
              <span className="text-base font-bold text-blue-600">{current.stat}</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 mt-5 leading-relaxed max-w-4xl">
            {current.desc}
          </p>
        </Card>
      </div>
    </section>
  );
};