import React from 'react';
import { ProjectArtifact } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface TelemetryVisualizerProps {
  artifacts: ProjectArtifact[];
}

export const TelemetryVisualizer: React.FC<TelemetryVisualizerProps> = ({ artifacts }) => {
  return (
    <div className="space-y-6">
      {/* Integrated Telemetry Visualizer Card */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-primary">show_chart</span>
            <span className="text-xs font-bold text-slate-900">
              Lab Flow Simulation: Differential Pressure vs Turbidity (Last 6 Hours)
            </span>
          </div>
          <span className="font-mono text-emerald-600 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
            Sampling Rate: 10Hz
          </span>
        </div>

        {/* SVG Curve Visualizer */}
        <div className="w-full h-40 pt-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
            <defs>
              <linearGradient id="primaryGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2"></stop>
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>
            <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="20" y2="20"></line>
            <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="60" y2="60"></line>
            <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="500" y1="100" y2="100"></line>
            <path d="M0,85 Q60,40 120,60 T240,30 T360,55 T480,25 L500,28 L500,120 L0,120 Z" fill="url(#primaryGradient)"></path>
            <path d="M0,85 Q60,40 120,60 T240,30 T360,55 T480,25 L500,28" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="2.5"></path>
            <path d="M0,95 Q70,90 140,80 T280,65 T390,75 T490,45 L500,43" fill="none" stroke="#14b8a6" strokeDasharray="4 2" strokeLinecap="round" strokeWidth="2"></path>
            <circle cx="240" cy="30" fill="#2563eb" r="4.5" stroke="#ffffff" strokeWidth="2"></circle>
            <rect fill="#0f172a" height="18" rx="4" width="68" x="206" y="8"></rect>
            <text fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" textAnchor="middle" x="240" y="20">Leak Trigger</text>
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-500 text-[11px] pt-2 border-t border-slate-100 gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-0.5 bg-primary inline-block rounded"></span> Barometric Transducer (Bar)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-teal-700">
              <span className="w-3 h-0.5 bg-teal-500 border-b border-dashed inline-block"></span> Nephelometric NTU
            </span>
          </div>
          <span className="text-slate-400">Lab Test Loop C • Ambient 27°C</span>
        </div>
      </Card>

      {/* Validated Deliverables / Artifacts */}
      <Card className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Validated Project Artifacts</h3>
            <p className="text-xs text-slate-500 mt-0.5">Signed schematics, hardware designs, and telemetry datasets</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert('Artifact file upload dialogue active.')}
            leftIcon={<span className="material-symbols-outlined text-base">cloud_upload</span>}
          >
            Upload File
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {artifacts.map((file, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-all flex items-center justify-between border border-slate-200/80"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className={`p-2 rounded-lg shrink-0 ${file.type === 'PDF' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                  <span className="material-symbols-outlined text-xl">
                    {file.type === 'PDF' ? 'picture_as_pdf' : 'csv'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">{file.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{file.size} • {file.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`Downloading verified deliverable: ${file.name}`)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-white transition-colors cursor-pointer shrink-0"
                title="Download"
              >
                <span className="material-symbols-outlined text-lg">download</span>
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};