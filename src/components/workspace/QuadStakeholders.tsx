import React from 'react';
import { Project } from '../../types';
import { Badge } from '../common/Badge';

interface QuadStakeholdersProps {
  project: Project;
}

export const QuadStakeholders: React.FC<QuadStakeholdersProps> = ({ project }) => {
  const { team } = project;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900">Multi-Stakeholder Quad Mesh</h2>
          <p className="text-xs text-slate-500">Synergistic academic research, corporate sponsorship, student builders, and civic governance.</p>
        </div>
        <Badge variant="teal">
          <span className="material-symbols-outlined text-sm mr-1">handshake</span> Cross-Functional Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 1. Student Builders */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Student Builders
              </span>
              <span className="text-xs text-slate-500 font-medium">{team.students.length} Fellows</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">AquaSense Tech Squad</h3>
              <p className="text-xs text-slate-500 mt-0.5">{project.leadInstitute}</p>
            </div>
            <div className="space-y-1.5 pt-1">
              {team.students.map((student, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg text-xs border border-slate-100">
                  <span className="font-semibold text-slate-800">{student.name}</span>
                  <span className="text-primary font-medium text-[11px]">{student.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between text-slate-500 text-[11px] border-t border-slate-100">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="material-symbols-outlined text-sm">check_circle</span> Daily Standups: 100%
            </span>
            <span className="font-mono text-slate-400">v1.4-rc2</span>
          </div>
        </div>

        {/* 2. Academic Advisory / PI */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Academic Advisory
              </span>
              <span className="material-symbols-outlined text-purple-600 text-base">school</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Principal Investigator</h3>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <img className="w-11 h-11 rounded-full object-cover shadow-xs border border-slate-200" src={team.pi.avatar} alt={team.pi.name} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{team.pi.name}</span>
                <span className="text-[11px] text-slate-500">{team.pi.role}</span>
                <span className="text-[11px] text-purple-700 font-medium">{team.pi.institution}</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 space-y-1 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Latest Endorsement</p>
              <p className="text-xs text-slate-700 italic leading-snug">"{team.pi.quote}"</p>
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between text-slate-500 text-xs border-t border-slate-100">
            <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
              <span className="material-symbols-outlined text-sm">verified</span> Sign-off Recorded
            </span>
            <button type="button" onClick={() => alert('Viewing Dr. Ramanathan signed audit rubrics.')} className="text-primary hover:underline font-semibold text-xs cursor-pointer">
              View Log
            </button>
          </div>
        </div>

        {/* 3. Industry Sponsor */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Industry Sponsor
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-base">apartment</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{team.mentor.company}</h3>
              <p className="text-xs font-bold text-primary mt-0.5">{team.mentor.grantAmount}</p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <img className="w-11 h-11 rounded-full object-cover shadow-xs border border-slate-200" src={team.mentor.avatar} alt={team.mentor.name} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{team.mentor.name}</span>
                <span className="text-[11px] text-slate-500">{team.mentor.role}</span>
                <span className="text-[11px] text-emerald-700 font-medium">Assigned Tech Mentor</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Dev Kits Supplied:</span>
                <p className="text-xs font-bold text-slate-800">5 Industrial LoRa Nodes</p>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">memory</span>
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between text-slate-500 text-xs border-t border-slate-100">
            <span className="text-[11px] text-slate-500">Next Sync: Tomorrow 4 PM</span>
            <span className="text-emerald-600 font-semibold text-[11px]">Azure IoT: Active</span>
          </div>
        </div>

        {/* 4. Municipal Authority */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Municipal Authority
              </span>
              <span className="material-symbols-outlined text-amber-600 text-base">policy</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Government Nodal Lead</h3>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <img className="w-11 h-11 rounded-full object-cover shadow-xs border border-slate-200" src={team.govtLead.avatar} alt={team.govtLead.name} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{team.govtLead.name}</span>
                <span className="text-[11px] text-slate-500">{team.govtLead.role}</span>
                <span className="text-[11px] text-amber-700 font-medium">{team.govtLead.dept}</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 space-y-1 border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Permit Status</p>
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                <span className="material-symbols-outlined text-sm">verified</span>
                Tap Clearance Granted
              </div>
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between text-slate-500 text-xs border-t border-slate-100">
            <span className="text-[11px] text-slate-500">MoU: DJB/2024/W14</span>
            <button type="button" onClick={() => alert('Municipal Tap Authorization Certificate DJB/2024/W14 displayed.')} className="text-primary hover:underline font-semibold text-xs cursor-pointer">
              View Permit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};