import React from 'react';
import { ProjectArtifact } from '../../types';

interface TelemetryVisualizerProps {
  artifacts: ProjectArtifact[];
}

export const TelemetryVisualizer: React.FC<TelemetryVisualizerProps> = ({ artifacts }) => {
  return (
    <div className="space-y-space-md">
      {/* Integrated Telemetry Visualizer Card */}
      <div className="bg-surface-container-low rounded-2xl p-space-md space-y-space-xs border border-surface-container-high/60">
        <div className="flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1 text-xs">
            <span className="material-symbols-outlined text-base text-primary">show_chart</span>
            Lab Flow Simulation: Differential Pressure vs Turbidity (Last 6 Hours)
          </span>
          <span className="font-label-sm text-label-sm font-mono text-tertiary font-bold text-xs">Sampling Rate: 10Hz</span>
        </div>

        {/* SVG Curve Visualizer */}
        <div className="w-full h-36 pt-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 120">
            <defs>
              <linearGradient id="primaryGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#004ac6" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#004ac6" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>
            <line stroke="#c3c6d7" strokeDasharray="3 3" strokeWidth="0.75" x1="0" x2="500" y1="20" y2="20"></line>
            <line stroke="#c3c6d7" strokeDasharray="3 3" strokeWidth="0.75" x1="0" x2="500" y1="60" y2="60"></line>
            <line stroke="#c3c6d7" strokeDasharray="3 3" strokeWidth="0.75" x1="0" x2="500" y1="100" y2="100"></line>
            <path d="M0,85 Q60,40 120,60 T240,30 T360,55 T480,25 L500,28 L500,120 L0,120 Z" fill="url(#primaryGradient)"></path>
            <path d="M0,85 Q60,40 120,60 T240,30 T360,55 T480,25 L500,28" fill="none" stroke="#004ac6" strokeLinecap="round" strokeWidth="2.5"></path>
            <path d="M0,95 Q70,90 140,80 T280,65 T390,75 T490,45 L500,43" fill="none" stroke="#007b6e" strokeDasharray="4 2" strokeLinecap="round" strokeWidth="2"></path>
            <circle cx="240" cy="30" fill="#004ac6" r="4.5" stroke="#ffffff" strokeWidth="2"></circle>
            <rect fill="#131b2e" height="18" rx="4" width="62" x="210" y="8"></rect>
            <text fill="#ffffff" fontFamily="Inter" fontSize="9" fontWeight="600" textAnchor="middle" x="241" y="21">Leak Trigger</text>
          </svg>
        </div>

        <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 text-[11px]">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary inline-block"></span> Barometric Transducer (Bar)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-tertiary border-b border-dashed inline-block"></span> Nephelometric NTU</span>
          </div>
          <span>Lab Test Loop C • Ambient 27°C</span>
        </div>
      </div>

      {/* Validated Deliverables / Artifacts */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-sm border border-surface-container-high">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Validated Project Artifacts</h3>
          <button
            type="button"
            onClick={() => alert('Artifact file upload dialogue active.')}
            className="text-primary font-label-sm text-label-sm font-bold hover:underline flex items-center gap-1 text-xs"
          >
            <span className="material-symbols-outlined text-base">cloud_upload</span> Upload File
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          {artifacts.map((file, idx) => (
            <div key={idx} className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between border border-surface-container-high/60">
              <div className="flex items-center gap-space-xs min-w-0">
                <div className={`p-2 rounded-lg ${file.type === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  <span className="material-symbols-outlined text-xl">
                    {file.type === 'PDF' ? 'picture_as_pdf' : 'csv'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate text-xs">{file.name}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">{file.size} • {file.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`Downloading verified deliverable: ${file.name}`)}
                className="p-2 rounded-lg hover:bg-surface-container-lowest text-primary"
                title="Download"
              >
                <span className="material-symbols-outlined text-lg">download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};