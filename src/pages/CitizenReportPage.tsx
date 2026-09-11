import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChallenges } from '../context/ChallengeContext';
import { CitizenForm } from '../components/report/CitizenForm';
import { AIDiagnosticsPanel } from '../components/report/AIDiagnosticsPanel';
import { AIDiagnosticResult } from '../types';

export const CitizenReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { addChallenge, analyzeProblemWithAI } = useChallenges();

  const [formData, setFormData] = useState({
    title: 'Contaminated tap water and recurring pipeline leaks in Ward 14, Sangam Vihar',
    category: 'Water Management & Sanitation',
    peopleAffected: '5,000+ residents',
    description: 'For the last 3 weeks, drinking water supply contains heavy turbidity and foul odor. Over 1,200 households affected. Local pipeline joint collapsed near the community school.',
    ward: 'Ward 14',
    district: 'South East Delhi',
  });

  const [diagnostics, setDiagnostics] = useState<AIDiagnosticResult>({
    detectedDomain: 'Critical Municipal Infrastructure',
    subSector: 'Water Sanitation & Distribution',
    confidence: 96.8,
    severityScore: 89,
    priority: 'P1',
    semanticTags: ['#DrinkingWater', '#PipelineDamage', '#Turbidity', '#EColiRisk', '#Ward14'],
    duplicateClusterId: '#CS-2024-812',
    duplicateWarning: 'Found 1 related issue (#CS-2024-812) reported 4 days ago within 450m radius. Merged into unified crisis cluster to avoid departmental duplication.',
    recommendedAction: 'Immediate Ward Jal Board onsite inspection + Auto-route to Delhi Jal Board GIS portal under emergency protocol Level-2.',
    recommendedSolverMatch: 'DTU / DSEU Hydro-Lab (Fluid Dynamics)',
    matchScore: 94,
  });

  const [draftAppliedNotice, setDraftAppliedNotice] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  useEffect(() => {
    const applyDraft = (draft: any) => {
      if (!draft) return;
      setFormData((prev) => ({
        ...prev,
        title: draft.title || prev.title,
        category: draft.category || prev.category,
        peopleAffected: draft.people_affected || prev.peopleAffected,
        description: `Identified issue: ${draft.title}. Category: ${draft.category} (${draft.subcategory || ''}). Estimated ${draft.people_affected || 'residents'} impacted. Requires specialized intervention in: ${draft.required_expertise || 'engineering'}.`,
      }));

      if (draft.severity) {
        setDiagnostics((prev) => ({
          ...prev,
          detectedDomain: draft.category || prev.detectedDomain,
          subSector: draft.subcategory || prev.subSector,
          severityScore: draft.severity || prev.severityScore,
          priority: draft.suggested_priority || prev.priority,
          semanticTags: draft.keywords || prev.semanticTags,
          recommendedSolverMatch: draft.required_expertise || prev.recommendedSolverMatch,
        }));
      }

      setDraftAppliedNotice(true);
      setTimeout(() => setDraftAppliedNotice(false), 6000);
    };

    const stored = sessionStorage.getItem('civicsolve_ai_draft');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        applyDraft(parsed);
        sessionStorage.removeItem('civicsolve_ai_draft');
      } catch (e) {
        console.error('Failed to parse draft:', e);
      }
    }

    const handleCustomEvent = (e: any) => {
      if (e.detail) applyDraft(e.detail);
    };

    window.addEventListener('civicsolve_fill_draft', handleCustomEvent);
    return () => window.removeEventListener('civicsolve_fill_draft', handleCustomEvent);
  }, []);

  const handleTriggerAI = async () => {
    setIsAnalyzing(true);
    const result = await analyzeProblemWithAI(
      formData.title,
      formData.description,
      formData.category,
      formData.ward
    );
    setDiagnostics(result);
    setIsAnalyzing(false);
  };

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      const created = addChallenge({
        title: formData.title,
        category: formData.category,
        peopleAffected: formData.peopleAffected,
        description: formData.description,
        priority: diagnostics.priority,
        location: {
          lat: 28.5033,
          lng: 77.2482,
          address: `${formData.ward}, ${formData.district}`,
          ward: formData.ward,
          district: formData.district,
        },
        aiDiagnostics: diagnostics,
        mediaUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&auto=format&fit=crop&q=80',
        mediaName: 'pipeline_leak_photo.jpg',
        mediaSize: '2.4 MB',
      });
      setIsDispatching(false);
      alert(`Challenge successfully registered under ${created.ticketId}! Dispatched to District Admin.`);
      navigate('/admin');
    }, 1200);
  };

  return (
    <div className="max-w-container-max mx-auto px-gutter-desktop py-space-xl w-full">
      {/* Breadcrumb & Workflow Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            <span className="text-tertiary font-bold">SIH'24 Citizen Intake</span>
            <span>/</span>
            <span>District Urban Hub</span>
            <span>/</span>
            <span className="text-on-surface font-semibold">Triage Sandbox #DL-8842</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
            Citizen Problem Intake & AI Diagnostics
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Submit verifiable localized societal bottlenecks. Our neural parsing pipeline instantly verifies GIS coordinates, cross-references historical municipal data, and drafts immediate mitigation pathways.
          </p>
        </div>

        {/* Quick Metrics Strip */}
        <div className="flex items-center gap-space-sm bg-surface-container p-space-xs rounded-xl shadow-sm border border-surface-container-high">
          <div className="px-space-sm py-1 bg-surface-container-lowest rounded-lg flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Live Clusters</span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">142</span>
          </div>
          <div className="px-space-sm py-1 bg-surface-container-lowest rounded-lg flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Median Triage</span>
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold">1.4s</span>
          </div>
          <div className="px-space-sm py-1 bg-surface-container-lowest rounded-lg flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">AI Accuracy</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">98.2%</span>
          </div>
        </div>
      </div>

      {/* Draft Applied Banner */}
      {draftAppliedNotice && (
        <div className="mb-space-lg p-space-md rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-between gap-space-sm text-on-surface animate-fade-in shadow-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">Challenge Draft Loaded from CivicSolve AI</h4>
              <p className="text-xs text-on-surface-variant">
                We have populated the parameters from your assistant conversation. You can review the details and click <strong>Run AI Pre-Validation</strong> or <strong>Dispatch</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDraftAppliedNotice(false)}
            className="p-1 text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <CitizenForm
          formData={formData}
          setFormData={setFormData}
          onTriggerAI={handleTriggerAI}
          isAnalyzing={isAnalyzing}
        />
        <AIDiagnosticsPanel
          diagnostics={diagnostics}
          onDispatch={handleDispatch}
          isDispatching={isDispatching}
        />
      </div>
    </div>
  );
};