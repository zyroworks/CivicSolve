import React from 'react';

interface MapLegendProps {
  className?: string;
}

export const MapLegend: React.FC<MapLegendProps> = ({ className = '' }) => {
  return (
    <div
      className={`bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 p-3.5 text-xs select-none transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-slate-100">
        <span className="font-semibold text-slate-800 tracking-wide uppercase text-[10px]">
          Priority & Status
        </span>
        <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
          Live Markers
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600 ring-2 ring-rose-200"></span>
          </span>
          <span className="font-medium text-slate-800">High Priority (P1)</span>
          <span className="ml-auto text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-medium">Urgent</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="flex h-3.5 w-3.5 items-center justify-center">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 ring-2 ring-amber-200"></span>
          </span>
          <span className="font-medium text-slate-800">Medium Priority (P2)</span>
          <span className="ml-auto text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">Elevated</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="flex h-3.5 w-3.5 items-center justify-center">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 ring-2 ring-blue-200"></span>
          </span>
          <span className="font-medium text-slate-800">Low Priority (P3)</span>
          <span className="ml-auto text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">Standard</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 pt-1 border-t border-slate-100/80">
          <span className="flex h-3.5 w-3.5 items-center justify-center">
            <span className="inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-emerald-200"></span>
          </span>
          <span className="font-medium text-slate-800">Resolved / Pilot</span>
          <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">Deployed</span>
        </div>
      </div>
    </div>
  );
};
