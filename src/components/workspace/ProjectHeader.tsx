import React from 'react';
import { Project } from '../../types';

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl relative overflow-hidden border border-surface-container-high">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="space-y-space-xs max-w-3xl">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="inline-flex items-center gap-1 bg-surface-container-low text-primary px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold tracking-wide">
              <span className="material-symbols-outlined text-sm text-primary">dataset</span>
              {project.ticketId}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Drinking Water Turbidity • Ward 14</span>
            <span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-space-xs py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-xs">verified</span> Pilot Prototype Stage
            </span>
            <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-0.5 rounded-full font-bold">
              TRL Level: {project.trlLevel} (Validated)
            </span>
          </div>

          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-space-md text-on-surface-variant pt-space-2xs text-xs">
            <div className="flex items-center gap-1 font-label-md text-label-md text-primary font-bold">
              <span className="material-symbols-outlined text-base">school</span>
              Lead Institute: {project.leadInstitute}
            </div>
            <span className="text-outline-variant font-mono">•</span>
            <div className="flex items-center gap-1 font-label-md text-label-md">
              <span className="material-symbols-outlined text-base text-tertiary">light</span>
              Sampling: {project.telemetry.samplingRate}
            </div>
            <span className="text-outline-variant font-mono">•</span>
            <div className="flex items-center gap-1 font-label-md text-label-md">
              <span className="material-symbols-outlined text-base text-tertiary">water_drop</span>
              Turbidity Error: &lt;1.2 NTU
            </div>
          </div>
        </div>

        {/* Live Lab Rig Quick Status */}
        <div className="flex flex-row sm:flex-col lg:items-end justify-between sm:justify-center gap-space-sm bg-surface-container-low p-space-md rounded-xl self-stretch sm:self-auto min-w-[240px] border border-surface-container-high/60">
          <div className="flex items-center gap-space-xs">
            <div className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></div>
            <span className="font-label-sm text-label-sm font-bold text-tertiary tracking-wide uppercase">
              {project.telemetry.status}
            </span>
          </div>
          <div className="space-y-0.5 lg:text-right">
            <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {project.telemetry.turbidityNTU} NTU <span className="font-label-sm text-label-sm font-normal text-on-surface-variant">/ {project.telemetry.pressureBar} Bar</span>
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant text-xs">Active Test Tank Node #2</p>
          </div>
          <div className="flex items-center gap-space-xs pt-space-2xs">
            <button
              type="button"
              onClick={() => alert('Flashing STM32 Microcontroller firmware over OTA channel...')}
              className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1 font-bold text-xs"
            >
              <span className="material-symbols-outlined text-base">terminal</span> Flash Firmware
            </button>
            <button
              type="button"
              onClick={() => alert('Project shareable telemetry link copied to clipboard!')}
              className="bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md px-2.5 py-1.5 rounded-lg shadow-sm transition-all border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-base text-on-surface-variant">share</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};