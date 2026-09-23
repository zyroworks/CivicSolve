import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChallenges } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';
import { CitizenForm } from '../components/report/CitizenForm';
import { AIDiagnosticsPanel } from '../components/report/AIDiagnosticsPanel';
import { PageHeader } from '../components/common/PageHeader';
import { Badge } from '../components/common/Badge';
import { AIDiagnosticResult } from '../types';

export const CitizenReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { addChallenge, analyzeProblemWithAI } = useChallenges();
  const { user, currentUser, isAuthenticated } = useAuth();

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

  const handleDispatch = async () => {
    setIsDispatching(true);
    try {
      const reporter = isAuthenticated && user
        ? `${user.displayName} (${user.email})`
        : currentUser.name || 'Anonymous Citizen';

      const created = await addChallenge({
        title: formData.title,
        category: formData.category,
        peopleAffected: formData.peopleAffected,
        description: formData.description,
        priority: diagnostics.priority,
        location: {
          lat: 23.3441,
          lng: 85.3096,
          address: `${formData.ward}, ${formData.district}, Jharkhand`,
          ward: formData.ward,
          district: formData.district,
        },
        state: 'Jharkhand',
        submitted_by: reporter,
        aiDiagnostics: diagnostics,
        mediaUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&auto=format&fit=crop&q=80',
        mediaName: 'pipeline_leak_photo.jpg',
        mediaSize: '2.4 MB',
      });

      setIsDispatching(false);
      alert(`✅ Challenge successfully registered under ${created.ticketId}!\n\nSubmitted by: ${reporter}\nStatus: Saved to live Supabase PostgreSQL database.`);
      navigate('/admin');
    } catch (err: any) {
      console.error('Error submitting challenge:', err);
      setIsDispatching(false);
      alert(`⚠️ Issue submitting to database: ${err?.message || 'Please check your connection and try again.'}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
      {/* Page Header */}
      <PageHeader
        badge={
          <Badge variant="blue" size="sm">
            Citizen Intake · Capacity Connect
          </Badge>
        }
        title="Report a Community Challenge"
        description="Submit verified grassroots problems directly to municipal authorities and university engineering labs. AI automatically validates GIS coordinates, identifies duplicate clusters, and calculates priority ranking."
        actions={
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            <span className="flex items-center gap-1 font-semibold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Live Ingestion Active
            </span>
            <span className="text-slate-300">|</span>
            <span>Median Triage: <strong>1.4s</strong></span>
          </div>
        }
      />

      {/* AI Draft Applied Notice */}
      {draftAppliedNotice && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-3 text-slate-800">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600 text-xl">auto_awesome</span>
            <div className="text-xs">
              <p className="font-bold text-blue-900">Pre-filled from CivicSolve AI Assistant</p>
              <p className="text-blue-700 mt-0.5">Parameters have been auto-populated from your conversation. Review and dispatch when ready.</p>
            </div>
          </div>
          <button
            onClick={() => setDraftAppliedNotice(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Two Column Layout: Form (Left) & Diagnostics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <CitizenForm
          formData={formData}
          setFormData={setFormData}
          onTriggerAI={handleTriggerAI}
          isAnalyzing={isAnalyzing}
          onDispatch={handleDispatch}
          isDispatching={isDispatching}
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