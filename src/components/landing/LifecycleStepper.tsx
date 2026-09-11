import React, { useState } from 'react';

interface StepDetail {
  badge: string;
  title: string;
  desc: string;
  stat: string;
  width: string;
  node: string;
}

const LIFECYCLE_STEPS: Record<number, StepDetail> = {
  1: {
    badge: "Active Engine: GIS Ingestion API v3.2",
    title: "Automated Crowdsourced Citizen Reporting",
    desc: "Citizens submit geo-tagged images, audio descriptions in regional Indian languages, and exact coordinates. The platform extracts EXIF data to prevent falsified reports and clusters coincident issues.",
    stat: "99.4% SLA",
    width: "12%",
    node: "SIH-NIC-01"
  },
  2: {
    badge: "AI Inference: Gemini Multi-lingual Triage",
    title: "NLP Classification & Priority Scoring",
    desc: "Natural Language Processing algorithms analyze submissions for urgency, categorize into municipal domains (water, power, sanitation, transit), and score civic impact against historical records.",
    stat: "0.28s Latency",
    width: "25%",
    node: "AI-CLUSTER-04"
  },
  3: {
    badge: "Govt Gateway: JanSamwad Ward Sync",
    title: "Municipal Validation & Budget Sanction",
    desc: "Ward administrators and district collectors verify issues against local maintenance tenders. Approved problems receive formal administrative clearance and a unique government tracking token.",
    stat: "142 Wards Linked",
    width: "37%",
    node: "MCD-SYNC-02"
  },
  4: {
    badge: "Lab Router: Semantic Vector Matching",
    title: "Automated Academic Skill & Lab Routing",
    desc: "Cosine similarity algorithms match validated problem constraints with specialized university laboratories, available instrumentation (e.g. spectrographs, drone bays), and faculty subject-matter publications.",
    stat: "318 Labs Ready",
    width: "50%",
    node: "AICTE-ROUTER"
  },
  5: {
    badge: "R&D Track: SIH 2024 Sprints",
    title: "Student & Faculty Collaborative Engineering",
    desc: "Multi-disciplinary teams undergo 6-8 week design sprints with embedded industry mentors, utilizing civic sandbox APIs, synthetic datasets, and remote test harness environments.",
    stat: "2,400+ Students",
    width: "63%",
    node: "R&D-SANDBOX"
  },
  6: {
    badge: "Grant Escrow: Smart Contract CSR",
    title: "Industry Mentorship & Cloud Hardware Grants",
    desc: "Participating corporates provide micro-grants for raw materials, sensor rigs, and cloud compute. Corporate mentors conduct weekly code and hardware feasibility reviews.",
    stat: "₹14.2 Cr Granted",
    width: "75%",
    node: "CSR-ESCROW"
  },
  7: {
    badge: "Field Test: Ward Pilot Deployment",
    title: "Real-World Municipal Sandboxing",
    desc: "Prototypes are installed in designated local testing zones for empirical evaluation. Real-world telemetry is live-streamed to CivicSolve analytics boards for efficacy assessment.",
    stat: "84 Live Pilots",
    width: "88%",
    node: "FIELD-TEST-09"
  },
  8: {
    badge: "Social Audit: Open Transparency Register",
    title: "Quantified Citizen Outcome Verification",
    desc: "Direct metrics like reduction in water salinity, automated pothole repair cycle times, or farmer cold-storage loss reductions are published for citizen and council verification.",
    stat: "2.4M Beneficiaries",
    width: "100%",
    node: "AUDIT-PUBLIC"
  }
};

export const LifecycleStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const current = LIFECYCLE_STEPS[activeStep];

  const steps = [
    { num: 1, title: 'Citizen Problem', sub: 'GIS geotag + proof capture', icon: 'pin_drop' },
    { num: 2, title: 'AI Analysis', sub: 'BERT deduplication & severity', icon: 'psychology' },
    { num: 3, title: 'Govt Validation', sub: 'Ward commissioner sanction', icon: 'fact_check' },
    { num: 4, title: 'Lab Matching', sub: 'Institutional vector search', icon: 'hub' },
    { num: 5, title: 'R&D Sprints', sub: 'Faculty & student track', icon: 'group_work' },
    { num: 6, title: 'Industry CSR', sub: 'Cloud & hardware grants', icon: 'handshake' },
    { num: 7, title: 'Field Pilot', sub: 'Municipal testbed trial', icon: 'sensors' },
    { num: 8, title: 'Citizen Impact', sub: 'Audit trail & score verify', icon: 'social_leaderboard' },
  ];

  return (
    <section className="w-full py-space-2xl bg-surface-container-low border-y border-surface-container-high/60">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Innovation Architecture</span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1 font-bold">The End-to-End Civic Lifecycle</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
              How raw citizen pain points transform into municipal infrastructure through SIH-engineered workflows.
            </p>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md bg-surface-container-lowest px-3 py-1.5 rounded-full border border-surface-container-high">
            <span className="material-symbols-outlined text-base text-tertiary">touch_app</span>
            <span>Click stages to preview runtime telemetry</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-space-sm">
            {steps.map((step) => {
              const isActive = activeStep === step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(step.num)}
                  className={`text-left p-space-sm rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-md scale-105 ring-2 ring-primary-fixed'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className={`font-label-sm text-label-sm font-bold ${isActive ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                      STAGE 0{step.num}
                    </span>
                    <span className={`material-symbols-outlined text-base ${isActive ? 'text-on-primary' : 'text-tertiary'}`}>
                      {step.icon}
                    </span>
                  </div>
                  <div className="font-headline-sm text-headline-sm leading-snug font-semibold text-sm">
                    {step.title}
                  </div>
                  <div className={`text-[11px] mt-1 line-clamp-2 ${isActive ? 'text-on-primary/90' : 'text-on-surface-variant'}`}>
                    {step.sub}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-space-lg p-space-lg rounded-xl bg-surface-container-low flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg border border-surface-container-high/60">
            <div className="space-y-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-space-2xs px-space-xs py-0.5 rounded bg-tertiary-fixed font-label-sm text-label-sm text-on-tertiary-fixed font-semibold">
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                <span>{current.badge}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                {current.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {current.desc}
              </p>
            </div>

            <div className="w-full lg:w-72 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60 flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Pipeline Integrity</span>
                <span className="font-label-md text-label-md text-tertiary font-bold">{current.stat}</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: current.width }}></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-1 text-xs">
                <span>Stage: <strong className="text-on-surface">{activeStep} of 8</strong></span>
                <span>Node: <strong className="text-on-surface">{current.node}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};