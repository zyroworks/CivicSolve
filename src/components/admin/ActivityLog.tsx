import React from 'react';

export const ActivityLog: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
      {/* Sensor Ingestion Health */}
      <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md border border-surface-container-high">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Real-Time Municipal Sensor Arrays</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">LoRaWAN & Cellular SCADA feeds stream direct telemetry from smart water meters & air stations</p>
          </div>
          <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/30 px-2.5 py-1 rounded-full font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            99.8% Array Uptime
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
          <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-space-sm border border-surface-container-high/60">
            <span className="material-symbols-outlined text-primary text-2xl">sensors</span>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-bold">142 Nodes</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant text-xs">Active Field Sensors</div>
            </div>
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-space-sm border border-surface-container-high/60">
            <span className="material-symbols-outlined text-tertiary text-2xl">speed</span>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-bold">&lt; 12 min</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant text-xs">Telemetry Ingestion Latency</div>
            </div>
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-space-sm border border-surface-container-high/60">
            <span className="material-symbols-outlined text-secondary text-2xl">apartment</span>
            <div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-bold">18 Wards</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant text-xs">Under Continuous Watch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Activity Log */}
      <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md border border-surface-container-high">
        <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Institutional Activity</h3>
          <span className="material-symbols-outlined text-on-surface-variant text-lg">history</span>
        </div>

        <div className="relative pl-6 space-y-space-md before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
          <div className="relative">
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-tertiary flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-wide text-xs">Deployment Accepted</span>
              <p className="font-body-sm text-body-sm text-on-surface font-semibold mt-0.5 text-xs">IIT Delhi accepted challenge #CS-8919</p>
              <span className="font-label-sm text-label-sm text-outline mt-0.5 text-[10px]">14 minutes ago</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide text-xs">CSR Capital Sanctioned</span>
              <p className="font-body-sm text-body-sm text-on-surface font-semibold mt-0.5 text-xs">Grant of ₹12L approved by Tech Mahindra Foundation</p>
              <span className="font-label-sm text-label-sm text-outline mt-0.5 text-[10px]">1 hour ago</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-amber-800 uppercase font-bold tracking-wide text-xs">Field Verification Flagged</span>
              <p className="font-body-sm text-body-sm text-on-surface font-semibold mt-0.5 text-xs">Ward Officer verified #CS-8921 (Pressure loss: 3.2 bar)</p>
              <span className="font-label-sm text-label-sm text-outline mt-0.5 text-[10px]">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};