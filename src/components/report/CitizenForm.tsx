import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Badge } from '../common/Badge';

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
  onDispatch?: () => void;
  isDispatching?: boolean;
}

export const CitizenForm: React.FC<CitizenFormProps> = ({
  formData,
  setFormData,
  onTriggerAI,
  isAnalyzing,
  onDispatch,
  isDispatching,
}) => {
  const [fileAttached, setFileAttached] = useState(true);

  return (
    <section className="lg:col-span-7 space-y-6">
      <Card className="space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">1. Problem Parameters</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Provide clear, localized details to help AI categorize and match with engineering solvers.
            </p>
          </div>
          <Badge variant="emerald" size="sm">Form Ready</Badge>
        </div>

        {/* Title */}
        <Input
          label="Problem Title *"
          id="problem-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Brief, factual title of the issue..."
          helperText="Max 120 characters describing the core issue"
        />

        {/* Category & People Affected */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Domain Category *"
            id="problem-category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={[
              { value: 'Water Management & Sanitation', label: 'Water Management & Sanitation' },
              { value: 'Environment & AQI', label: 'Environment & AQI' },
              { value: 'Road Safety & Transit', label: 'Road Safety & Transit' },
              { value: 'Healthcare Access', label: 'Healthcare Access' },
              { value: 'Agriculture / Agritech', label: 'Agriculture / Agritech' },
              { value: 'Solid Waste Management', label: 'Solid Waste Management' },
            ]}
          />

          <Input
            label="Estimated People Impacted *"
            id="people-affected"
            value={formData.peopleAffected}
            onChange={(e) => setFormData({ ...formData, peopleAffected: e.target.value })}
            placeholder="e.g. 5,000+ residents"
            helperText="Approximation of affected households"
          />
        </div>

        {/* Ward & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Ward / Locality *"
            id="problem-ward"
            value={formData.ward}
            onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
            placeholder="e.g. Ward 14, Sangam Vihar"
          />

          <Input
            label="District *"
            id="problem-district"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            placeholder="e.g. South East Delhi / Ranchi"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label htmlFor="problem-desc" className="block text-xs font-semibold text-slate-700">
            Factual Description & Observed Symptoms *
          </label>
          <textarea
            id="problem-desc"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide context: when did the issue start, severity, localized symptoms..."
            className="w-full text-sm rounded-lg border border-slate-200 bg-white text-slate-900 p-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors leading-relaxed"
          />
          <p className="text-xs text-slate-500">
            Include specific timeline, street names, and any prior complaints logged with municipal bodies.
          </p>
        </div>

        {/* Media / Photo Upload Dropzone */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-semibold text-slate-700">
            Verifiable Evidence (Photos / Telemetry)
          </label>
          <div className="border border-dashed border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-colors bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">image</span>
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-800">
                  {fileAttached ? 'pipeline_leak_evidence.jpg' : 'Upload photo or video proof'}
                </p>
                <p className="text-slate-500 mt-0.5">
                  {fileAttached ? '2.4 MB • GPS EXIF metadata verified' : 'PNG, JPG, MP4 up to 25MB'}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFileAttached(!fileAttached)}
            >
              {fileAttached ? 'Replace File' : 'Browse File'}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onTriggerAI}
            isLoading={isAnalyzing}
            leftIcon={<span className="material-symbols-outlined text-base text-blue-600">auto_awesome</span>}
          >
            Run AI Pre-Validation
          </Button>

          {onDispatch && (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={onDispatch}
              isLoading={isDispatching}
              rightIcon={<span className="material-symbols-outlined text-base">send</span>}
            >
              Confirm & Submit
            </Button>
          )}
        </div>
      </Card>
    </section>
  );
};