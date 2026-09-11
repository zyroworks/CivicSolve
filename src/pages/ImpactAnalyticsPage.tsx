import React from 'react';

export const ImpactAnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-container-max mx-auto px-gutter-desktop py-space-xl space-y-space-xl w-full">
      <div>
        <span className="text-xs uppercase font-bold text-primary tracking-wider">National Telemetry</span>
        <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface mt-1">Impact Analytics & Social Audit</h1>
        <p className="text-on-surface-variant text-sm mt-1 max-w-2xl">
          Real-time metrics auditing societal transformation, municipal budget savings, and academic IP generation across 428 districts.
        </p>
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-high">
          <span className="text-xs uppercase text-on-surface-variant font-bold">Total Beneficiaries</span>
          <div className="text-3xl font-extrabold text-on-surface mt-1">2,410,800+</div>
          <p className="text-xs text-tertiary font-bold mt-1">Direct citizens serviced</p>
        </div>
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-high">
          <span className="text-xs uppercase text-on-surface-variant font-bold">Municipal Cost Saved</span>
          <div className="text-3xl font-extrabold text-primary mt-1">₹38.4 Cr</div>
          <p className="text-xs text-on-surface-variant mt-1">Via student prototypes</p>
        </div>
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-high">
          <span className="text-xs uppercase text-on-surface-variant font-bold">CSR Capital Disbursed</span>
          <div className="text-3xl font-extrabold text-tertiary mt-1">₹14.2 Cr</div>
          <p className="text-xs text-on-surface-variant mt-1">From 48 corporate partners</p>
        </div>
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-high">
          <span className="text-xs uppercase text-on-surface-variant font-bold">Patents & IPs Filed</span>
          <div className="text-3xl font-extrabold text-secondary mt-1">42 Patents</div>
          <p className="text-xs text-on-surface-variant mt-1">Joint university-govt ownership</p>
        </div>
      </div>

      {/* SDG Alignment Matrix */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-high space-y-4">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">United Nations Sustainable Development Goals Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 uppercase">SDG 6: Clean Water</span>
              <span className="text-sm font-extrabold text-blue-700">42%</span>
            </div>
            <p className="text-xs text-blue-800 mt-2">612 challenges solved across drinking water pipeline maintenance and groundwater fluorometry.</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase">SDG 11: Sustainable Cities</span>
              <span className="text-sm font-extrabold text-amber-700">36%</span>
            </div>
            <p className="text-xs text-amber-800 mt-2">524 challenges resolved in pothole detection, smart transit, and automated solid waste collection.</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase">SDG 2: Zero Hunger</span>
              <span className="text-sm font-extrabold text-emerald-700">22%</span>
            </div>
            <p className="text-xs text-emerald-800 mt-2">284 challenges in solar cold storage and decentralized agrarian crop protection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};