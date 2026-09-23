import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const ImpactAnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
      <PageHeader
        badge={<Badge variant="blue" size="sm">National Telemetry</Badge>}
        title="Impact Analytics & Social Audit"
        description="Real-time metrics auditing societal transformation, municipal budget savings, and academic IP generation across 428 districts."
      />

      {/* Metrics strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Beneficiaries"
          value="2,410,800+"
          subtitle="Direct citizens serviced"
          trend={{ value: '+12.4%', isPositive: true }}
          icon={<span className="material-symbols-outlined text-primary text-xl">groups</span>}
        />
        <StatCard
          title="Municipal Cost Saved"
          value="₹38.4 Cr"
          subtitle="Via student prototypes"
          trend={{ value: '₹12.1 Cr this FY', isPositive: true }}
          icon={<span className="material-symbols-outlined text-primary text-xl">savings</span>}
        />
        <StatCard
          title="CSR Capital Disbursed"
          value="₹14.2 Cr"
          subtitle="From 48 corporate partners"
          trend={{ value: '48 Active Grants', isPositive: true }}
          icon={<span className="material-symbols-outlined text-teal-600 text-xl">payments</span>}
        />
        <StatCard
          title="Patents & IPs Filed"
          value="42 Patents"
          subtitle="Joint university-govt ownership"
          trend={{ value: '10 Granted', isPositive: true }}
          icon={<span className="material-symbols-outlined text-purple-600 text-xl">workspace_premium</span>}
        />
      </div>

      {/* SDG Alignment Matrix */}
      <Card className="p-6 space-y-5">
        <div className="pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">United Nations Sustainable Development Goals Breakdown</h3>
          <p className="text-xs text-slate-500 mt-0.5">Automated telemetry classification aligned with UN 2030 targets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">SDG 6: Clean Water</span>
              <span className="text-base font-extrabold text-blue-700">42%</span>
            </div>
            <div className="w-full bg-blue-200/60 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              612 challenges solved across drinking water pipeline maintenance and groundwater fluorometry.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">SDG 11: Sustainable Cities</span>
              <span className="text-base font-extrabold text-amber-700">36%</span>
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '36%' }}></div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              524 challenges resolved in pothole detection, smart transit, and automated solid waste collection.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">SDG 2: Zero Hunger</span>
              <span className="text-base font-extrabold text-emerald-700">22%</span>
            </div>
            <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '22%' }}></div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              284 challenges in solar cold storage and decentralized agrarian crop protection.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};