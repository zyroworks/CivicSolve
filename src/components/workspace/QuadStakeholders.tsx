import React from 'react';
import { Project } from '../../types';

interface QuadStakeholdersProps {
  project: Project;
}

export const QuadStakeholders: React.FC<QuadStakeholdersProps> = ({ project }) => {
  const { team } = project;

  return (
    <section className="space-y-space-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Multi-Stakeholder Quad Mesh</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Synergistic academic research, corporate sponsorship, student builders, and civic governance.</p>
        </div>
        <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-space-xs py-1 rounded-full flex items-center gap-1 font-bold text-xs">
          <span className="material-symbols-outlined text-sm">handshake</span> Cross-Functional Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* 1. Student Builders */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-space-sm border border-surface-container-high">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                Student Builders
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">{team.students.length} Fellows</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface pt-1 font-bold">AquaSense Tech Squad</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">{project.leadInstitute}</p>
            <div className="space-y-space-2xs pt-space-xs">
              {team.students.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between text-body-sm text-on-surface bg-surface-container-low p-2 rounded-lg text-xs">
                  <span className="font-label-md text-label-md font-semibold">{student.name}</span>
                  <span className="font-label-sm text-label-sm text-primary font-medium">{student.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm text-[11px] border-t border-surface-container-high/60">
            <span className="flex items-center gap-1 text-tertiary font-bold"><span className="material-symbols-outlined text-sm">check_circle</span> Daily Standups: 100%</span>
            <span className="font-mono">Repo: v1.4-rc2</span>
          </div>
        </div>

        {/* 2. Academic Advisory / PI */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-space-sm border border-surface-container-high">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                Academic Advisory
              </span>
              <span className="material-symbols-outlined text-primary text-base">school</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface pt-1 font-bold">Principal Investigator</h3>
            <div className="flex items-center gap-space-xs pt-space-2xs">
              <img className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-primary/20" src={team.pi.avatar} alt={team.pi.name} />
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold text-sm">{team.pi.name}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{team.pi.role}</span>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold text-[11px]">{team.pi.institution}</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-xs space-y-1 border border-surface-container-high/60">
              <p className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase text-[10px]">Latest Endorsement</p>
              <p className="font-body-sm text-body-sm text-on-surface italic text-xs leading-snug">"{team.pi.quote}"</p>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm text-xs border-t border-surface-container-high/60">
            <span className="text-tertiary font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">verified</span> Sign-off Recorded</span>
            <button type="button" onClick={() => alert('Viewing Dr. Ramanathan signed audit rubrics.')} className="text-primary hover:underline font-semibold">View Log</button>
          </div>
        </div>

        {/* 3. Industry Sponsor */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-space-sm border border-surface-container-high">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                Industry Sponsor
              </span>
              <span className="material-symbols-outlined text-tertiary text-base">apartment</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface pt-1 font-bold">{team.mentor.company}</h3>
            <p className="font-label-md text-label-md text-primary font-bold text-xs">{team.mentor.grantAmount}</p>
            <div className="flex items-center gap-space-xs pt-space-2xs">
              <img className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-tertiary/20" src={team.mentor.avatar} alt={team.mentor.name} />
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold text-sm">{team.mentor.name}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{team.mentor.role}</span>
                <span className="font-label-sm text-label-sm text-primary font-semibold text-[11px]">Assigned Tech Mentor</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-xs flex items-center justify-between border border-surface-container-high/60">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">Dev Kits Supplied:</span>
                <p className="font-label-md text-label-md font-bold text-on-surface text-xs">5 Industrial LoRa Nodes</p>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">memory</span>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm text-xs border-t border-surface-container-high/60">
            <span className="text-on-surface-variant text-[11px]">Next Sync: Tomorrow 4 PM</span>
            <span className="text-tertiary font-bold">Azure IoT: Active</span>
          </div>
        </div>

        {/* 4. Municipal Authority */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-space-sm border border-surface-container-high">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
                Municipal Authority
              </span>
              <span className="material-symbols-outlined text-secondary text-base">policy</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface pt-1 font-bold">Government Nodal Lead</h3>
            <div className="flex items-center gap-space-xs pt-space-2xs">
              <img className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-secondary/20" src={team.govtLead.avatar} alt={team.govtLead.name} />
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-bold text-sm">{team.govtLead.name}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{team.govtLead.role}</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold text-[11px]">{team.govtLead.dept}</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl p-space-xs space-y-1 border border-surface-container-high/60">
              <p className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase text-[10px]">Permit Status</p>
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold text-xs">
                <span className="material-symbols-outlined text-sm">verified</span>
                Tap Clearance Granted
              </div>
            </div>
          </div>
          <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm text-xs border-t border-surface-container-high/60">
            <span className="text-on-surface-variant text-[11px]">MoU: DJB/2024/W14</span>
            <button type="button" onClick={() => alert('Municipal Tap Authorization Certificate DJB/2024/W14 displayed.')} className="text-primary hover:underline font-semibold">View Permit</button>
          </div>
        </div>
      </div>
    </section>
  );
};