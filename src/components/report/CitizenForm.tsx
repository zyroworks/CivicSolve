import React, { useState } from 'react';

interface CitizenFormProps {
  formData: {
    title: string;
    category: string;
    peopleAffected: string;
    description: string;
    ward: string;
    district: string;
    fileName?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onTriggerAI: () => void;
  isAnalyzing: boolean;
}

export const CitizenForm: React.FC<CitizenFormProps> = ({
  formData,
  setFormData,
  onTriggerAI,
  isAnalyzing,
}) => {
  const [fileAttached, setFileAttached] = useState(true);

  return (
    <section className="lg:col-span-7 flex flex-col gap-space-lg">
      {/* Progress Card */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-high">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">1</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Step 1 of 2: Submission Parameters</span>
          </div>
          <span className="font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed px-space-xs py-0.5 rounded-full uppercase tracking-wider font-bold">
            Form Active
          </span>
        </div>
        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full transition-all duration-500 w-1/2"></div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
          Complete high-fidelity problem parameters to maximize university hackathon matching accuracy and grant eligibility.
        </p>
      </div>

      {/* Problem Input Card */}
      <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm space-y-space-lg border border-surface-container-high">
        {/* Title */}
        <div className="space-y-space-2xs">
          <label className="flex items-center justify-between font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="problem-title">
            <span>Problem Title <span className="text-error">*</span></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">Max 120 chars</span>
          </label>
          <input
            id="problem-title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Concise, factual title of the issue..."
            className="w-full h-11 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-surface-container-high transition-all"
          />
        </div>

        {/* Category & Affected People */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="space-y-space-2xs">
            <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="problem-category">
              Broad Category <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                id="problem-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full h-11 px-space-md pr-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none shadow-sm border border-surface-container-high cursor-pointer"
              >
                <option>Water Management & Sanitation</option>
                <option>Environment & AQI</option>
                <option>Road Safety & Transit</option>
                <option>Healthcare Access</option>
                <option>Agriculture / Agritech</option>
                <option>Solid Waste Management</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-on-surface-variant">expand_more</span>
            </div>
          </div>

          <div className="space-y-space-2xs">
            <label className="font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="people-affected">
              Estimated People Affected
            </label>
            <div className="relative">
              <input
                id="people-affected"
                type="text"
                value={formData.peopleAffected}
                onChange={(e) => setFormData({ ...formData, peopleAffected: e.target.value })}
                className="w-full h-11 pl-10 pr-space-md rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-surface-container-high"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">groups</span>
            </div>
          </div>
        </div>

        {/* GIS Selector / Interactive Map Card */}
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between">
            <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-base text-primary">distance</span>
              <span>Geo-Tagged Location / Ward Boundary</span>
            </label>
            <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              GPS Locked
            </span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-sm space-y-space-sm shadow-sm border border-surface-container-high">
            <div className="w-full h-44 rounded-lg bg-surface-variant relative overflow-hidden flex items-end p-space-sm bg-gradient-to-tr from-slate-900 via-slate-800 to-primary/40">
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
              
              {/* Map Pin HUD Overlay */}
              <div className="relative z-10 bg-surface-container-lowest/95 backdrop-blur-md px-space-sm py-space-2xs rounded-lg shadow-md flex items-center gap-space-sm border border-surface-container-high">
                <div className="w-7 h-7 rounded-full bg-error flex items-center justify-center text-on-error">
                  <span className="material-symbols-outlined text-sm">fmd_bad</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">28.5033° N, 77.2482° E</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{formData.ward} • {formData.district}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-space-xs pt-1">
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant text-xs">
                <span className="material-symbols-outlined text-sm text-primary">verified</span>
                <span>MCD Spatial Polygon Verified • Zone South-II</span>
              </div>
              <button
                type="button"
                onClick={() => alert('GPS coordinates re-calibrated successfully using browser geolocation.')}
                className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-xs">my_location</span>
                Re-calibrate pin
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-space-2xs">
          <label className="flex items-center justify-between font-label-lg text-label-lg text-on-surface font-semibold" htmlFor="problem-desc">
            <span>Detailed Observational Description <span className="text-error">*</span></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">Min. 60 words for AI analysis</span>
          </label>
          <textarea
            id="problem-desc"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-space-md rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm border border-surface-container-high leading-relaxed"
          ></textarea>
        </div>

        {/* Media / Evidence Dropzone */}
        <div className="space-y-space-xs">
          <label className="font-label-lg text-label-lg text-on-surface font-semibold">
            Photographic / Telemetry Evidence ({fileAttached ? '1 file attached' : '0 files'})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {fileAttached && (
              <div className="bg-surface-container-low p-space-xs rounded-xl flex items-center gap-space-sm shadow-sm relative group border border-surface-container-high">
                <img
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  src="https://images.unsplash.com/photo-1584467735815-f778f274e296?w=200&auto=format&fit=crop&q=80"
                  alt="Proof"
                />
                <div className="flex flex-col min-w-0 pr-6">
                  <span className="font-label-md text-label-md text-on-surface truncate font-semibold">pipeline_leak_photo.jpg</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">2.4 MB • Image/JPEG</span>
                  <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-0.5 mt-0.5 font-bold">
                    <span className="material-symbols-outlined text-xs">check_circle</span> EXIF Geo Match
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFileAttached(false)}
                  className="absolute top-2 right-2 text-outline hover:text-error transition-colors p-1"
                  title="Remove file"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setFileAttached(true)}
              className="bg-surface-container rounded-xl p-space-sm flex flex-col items-center justify-center text-center hover:bg-surface-container-high transition-colors group cursor-pointer border border-dashed border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-primary mb-1 group-hover:scale-110 transition-transform">add_a_photo</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">Add more documents / video</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">PDF, MP4, PNG up to 25MB</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-high/60">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-base text-tertiary">lock</span>
            <span>Encrypted submission under DPDP Act 2023</span>
          </div>
          <button
            type="button"
            onClick={onTriggerAI}
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-space-lg py-space-sm bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-lg text-label-lg rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-space-xs font-bold"
          >
            <span className={`material-symbols-outlined text-lg ${isAnalyzing ? 'animate-spin' : ''}`}>
              {isAnalyzing ? 'sync' : 'auto_awesome'}
            </span>
            <span>{isAnalyzing ? 'Re-indexing AI Triage...' : 'Run AI Pre-Validation & Update'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};