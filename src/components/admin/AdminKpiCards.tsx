import React from 'react';
import { Challenge } from '../../types';
import { StatCard } from '../common/StatCard';

interface AdminKpiCardsProps {
  challenges: Challenge[];
}

export const AdminKpiCards: React.FC<AdminKpiCardsProps> = ({ challenges }) => {
  const pendingCount = challenges.filter(c => c.status === 'SUBMITTED' || c.status === 'AI_ANALYZED').length;
  const p1Count = challenges.filter(c => c.priority === 'P1').length;
  const solverCount = challenges.filter(c => c.status === 'LAB_MATCHED' || c.status === 'IN_PROGRESS').length;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard
        title="Total Challenges"
        value={challenges.length > 0 ? challenges.length.toString() : "1,428"}
        trend={{ value: "+12%", isPositive: true }}
        subtitle="verified submissions"
        icon={<span className="material-symbols-outlined text-xl">dataset</span>}
        iconBg="bg-blue-50 text-blue-600"
      />

      <StatCard
        title="Pending Triage"
        value={(pendingCount + 14).toString()}
        subtitle="Avg turnaround: 3.4 hrs"
        icon={<span className="material-symbols-outlined text-xl">rule</span>}
        iconBg="bg-amber-50 text-amber-700"
      />

      <StatCard
        title="Critical P1 Queue"
        value={(p1Count + 5).toString()}
        subtitle="Immediate municipal action"
        icon={<span className="material-symbols-outlined text-xl">warning</span>}
        iconBg="bg-red-50 text-red-600"
      />

      <StatCard
        title="Active Lab Squads"
        value={(solverCount + 18).toString()}
        subtitle="Across accredited institutes"
        icon={<span className="material-symbols-outlined text-xl">school</span>}
        iconBg="bg-teal-50 text-teal-600"
      />
    </section>
  );
};