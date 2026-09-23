import React from 'react';
import { Project } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <Card className="p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Information */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {project.ticketId}
            </span>
            <Badge variant="blue" size="sm">
              Drinking Water Turbidity • Ward 14
            </Badge>
            <Badge variant="emerald" size="sm">
              Pilot Prototype Stage
            </Badge>
            <Badge variant="slate" size="sm">
              TRL Level: {project.trlLevel}
            </Badge>
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1.5 font-semibold text-blue-600">
              <span className="material-symbols-outlined text-base">school</span>
              <span>Lead Institute: {project.leadInstitute}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-teal-600">sensors</span>
              <span>Sampling: {project.telemetry.samplingRate}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-teal-600">water_drop</span>
              <span>Turbidity Tolerance: &lt;1.2 NTU</span>
            </div>
          </div>
        </div>

        {/* Live Lab Rig Quick Status Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[240px] space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>{project.telemetry.status}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">NODE #2</span>
          </div>

          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {project.telemetry.turbidityNTU} NTU{' '}
              <span className="text-xs font-normal text-slate-400">/ {project.telemetry.pressureBar} Bar</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Active Fluidics Test Tank</p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="primary"
              size="sm"
              onClick={() => alert('Flashing STM32 Microcontroller firmware over OTA channel...')}
              leftIcon={<span className="material-symbols-outlined text-sm">terminal</span>}
            >
              Flash Firmware
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert('Project shareable telemetry link copied to clipboard!')}
              title="Share Telemetry"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};