import React from 'react';
import { Link } from 'react-router-dom';

export const ImpactBanner: React.FC = () => {
  return (
    <section className="w-full py-space-3xl">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="relative bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary rounded-3xl p-space-xl md:p-space-2xl overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div className="lg:col-span-8 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-white/15 backdrop-blur-md text-on-primary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-sm text-tertiary-fixed">verified</span>
                Smart India Hackathon 2024 · Flagship Innovation Network
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-primary max-w-2xl leading-tight font-bold">
                Ready to turn grassroots civic problems into deployable breakthroughs?
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/90 max-w-xl leading-relaxed">
                Connect as a municipal commissioner with an unaddressed crisis, an engineering faculty team looking for accredited capstones, or an industry partner seeking measurable social ROI.
              </p>
              <div className="flex flex-wrap gap-space-md pt-space-xs">
                <Link
                  to="/report"
                  className="px-space-lg py-space-sm bg-white text-primary rounded-xl font-label-lg text-label-lg shadow hover:bg-surface-bright transition-all flex items-center gap-space-xs font-bold"
                >
                  <span>Submit Civic Problem</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  to="/workspace"
                  className="px-space-lg py-space-sm bg-white/15 text-on-primary hover:bg-white/25 rounded-xl font-label-lg text-label-lg transition-all flex items-center gap-space-xs font-semibold backdrop-blur-md border border-white/20"
                >
                  <span className="material-symbols-outlined text-sm">hub</span>
                  <span>Access Innovation Sandbox</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-lg p-space-lg rounded-2xl space-y-space-md border border-white/20">
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary/80 font-bold">SIH National Coverage</div>
              <div className="space-y-space-sm">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-body-sm text-on-primary/90">Districts Mapped</span>
                  <span className="font-headline-sm text-headline-sm text-on-primary font-bold">428 / 766</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary-fixed h-full rounded-full" style={{ width: '56%' }}></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-body-sm text-body-sm text-on-primary/90">Funded CSR Commitments</span>
                  <span className="font-headline-sm text-headline-sm text-on-primary font-bold">₹14.2 Cr</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-fixed h-full rounded-full" style={{ width: '78%' }}></div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-body-sm text-body-sm text-on-primary/90">Patent Disclosures Filed</span>
                  <span className="font-headline-sm text-headline-sm text-on-primary font-bold">42 Patents</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="pt-space-xs flex items-center gap-2 text-on-primary/80 font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm text-tertiary-fixed">policy</span>
                Audited by National Innovation Council
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};