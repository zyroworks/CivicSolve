import { Challenge, ChallengeStatus, PriorityLevel } from '../types';

/**
 * Supabase Client & Data Service for CivicSolve
 * 
 * Powered by Supabase PostgREST API (Zero extra dependencies required).
 * 
 * To connect your live Supabase project:
 * 1. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
 * 2. Run the provided schema in supabase/schema.sql in your Supabase SQL Editor.
 */

// Safely resolve Supabase credentials with fallback to active project
const getSupabaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const url = (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0)
    ? envUrl.trim()
    : 'https://jijxswrnqnflzewcknby.supabase.co';
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
};

const getSupabaseAnonKey = (): string => {
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return (envKey && typeof envKey === 'string' && envKey.trim().length > 20)
    ? envKey.trim()
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppanhzd3JucW5mbHpld2NrbmJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNDA1MzgsImV4cCI6MjEwNDcxNjUzOH0.NSdHBPNwJqCFJmrsyVmR3Ga1WMZ1QXaLdDdyQxp9tHo';
};

export const SUPABASE_URL = getSupabaseUrl();
export const SUPABASE_ANON_KEY = getSupabaseAnonKey();

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL.startsWith('https://') &&
    !SUPABASE_URL.includes('your-project') &&
    !SUPABASE_URL.includes('placeholder')
  );
};

// Helper to convert database row (snake_case or camelCase) to Challenge model
const mapRowToChallenge = (row: any): Challenge => {
  return {
    id: row.id,
    ticketId: row.ticket_id || row.ticketId || '#CS-0000',
    title: row.title || '',
    category: row.category || 'General',
    subcategory: row.subcategory || undefined,
    peopleAffected: row.people_affected || row.peopleAffected || '1,000+ residents',
    location: typeof row.location === 'string' ? JSON.parse(row.location) : (row.location || {
      lat: 23.3441,
      lng: 85.3096,
      address: 'Ranchi, Jharkhand',
      ward: 'Ward 1',
      district: 'Ranchi',
    }),
    state: row.state || 'Jharkhand',
    location_name: row.location_name || row.locationName || undefined,
    description: row.description || '',
    status: (row.status || 'SUBMITTED') as ChallengeStatus,
    priority: (row.priority || 'P2') as PriorityLevel,
    mediaUrl: row.media_url || row.mediaUrl || undefined,
    mediaName: row.media_name || row.mediaName || undefined,
    mediaSize: row.media_size || row.mediaSize || undefined,
    createdAt: row.created_at || row.createdAt || 'Recently',
    submitted_by: row.submitted_by || row.submittedBy || undefined,
    assignedLab: row.assigned_lab || row.assignedLab || undefined,
    endorsementsCount: Number(row.endorsements_count ?? row.endorsementsCount ?? 1),
    aiDiagnostics: typeof row.ai_diagnostics === 'string' 
      ? JSON.parse(row.ai_diagnostics) 
      : (row.ai_diagnostics || row.aiDiagnostics || {
          detectedDomain: 'Municipal Infrastructure',
          subSector: 'Public Utility',
          confidence: 90,
          severityScore: 75,
          priority: 'P2',
          semanticTags: ['#CivicInfrastructure'],
          recommendedAction: 'Ward inspection scheduled',
          recommendedSolverMatch: 'State Engineering College',
          matchScore: 88,
        }),
    media: row.challenge_media ? row.challenge_media.map((m: any) => ({
      id: m.id,
      challenge_id: m.challenge_id || row.id,
      file_url: m.file_url || m.fileUrl,
      file_type: m.file_type || m.fileType || 'image/jpeg',
      caption: m.caption,
      created_at: m.created_at || m.createdAt,
    })) : undefined,
  };
};

// Helper to convert Challenge model to database row
const mapChallengeToRow = (challenge: Challenge) => {
  return {
    id: challenge.id,
    ticket_id: challenge.ticketId,
    title: challenge.title,
    category: challenge.category,
    subcategory: challenge.subcategory || null,
    people_affected: challenge.peopleAffected,
    location: challenge.location,
    district: challenge.location?.district || 'Ranchi',
    state: challenge.state || 'Jharkhand',
    location_name: challenge.location_name || null,
    description: challenge.description,
    status: challenge.status,
    priority: challenge.priority,
    media_url: challenge.mediaUrl || null,
    media_name: challenge.mediaName || null,
    media_size: challenge.mediaSize || null,
    endorsements_count: challenge.endorsementsCount || 1,
    assigned_lab: challenge.assignedLab || null,
    ai_diagnostics: challenge.aiDiagnostics || null,
    submitted_by: challenge.submitted_by || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

/**
 * Fetch all challenges from Supabase PostgreSQL
 */
export const fetchChallengesFromSupabase = async (): Promise<Challenge[] | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/challenges?select=*,challenge_media(*)&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      console.warn('Supabase fetch returned status:', res.status);
      return null;
    }

    const rows = await res.json();
    if (!Array.isArray(rows)) {
      return null;
    }

    return rows.map(mapRowToChallenge);
  } catch (error) {
    console.warn('Could not reach Supabase endpoint, using local storage fallback:', error);
    return null;
  }
};

/**
 * Insert a new civic challenge into Supabase
 */
export const insertChallengeToSupabase = async (challenge: Challenge): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('[Supabase] Not configured or credentials missing');
    return false;
  }

  try {
    const row = mapChallengeToRow(challenge);
    console.log('[Supabase] Sending problem ticket to cloud PostgreSQL:', row.ticket_id, row.title);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/challenges`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Supabase] Failed to insert challenge:', res.status, errText);
      return false;
    }

    console.log('✅ [Supabase] Problem ticket successfully written to PostgreSQL:', row.ticket_id);
    return true;
  } catch (error) {
    console.error('[Supabase] Error inserting challenge into Supabase:', error);
    return false;
  }
};

/**
 * Update challenge status & priority in Supabase
 */
export const updateChallengeStatusInSupabase = async (
  id: string,
  status: ChallengeStatus,
  priority?: PriorityLevel
): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const updatePayload: any = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    if (priority) {
      updatePayload.priority = priority;
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/challenges?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(updatePayload),
    });

    return res.ok;
  } catch (error) {
    console.error('Error updating challenge in Supabase:', error);
    return false;
  }
};

/**
 * Increment challenge endorsement count
 */
export const incrementEndorsementInSupabase = async (
  id: string, 
  newCount: number
): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/challenges?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ endorsements_count: newCount }),
    });

    return res.ok;
  } catch (error) {
    console.error('Error incrementing endorsement in Supabase:', error);
    return false;
  }
};
