import { Challenge } from '../types';

/**
 * Supabase Client & Data Service for CivicSolve
 * 
 * To connect a live Supabase project:
 * 1. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
 * 2. Tables required: 'challenges' and 'challenge_media'
 * 
 * Note: Service-role key is strictly prohibited on the client side.
 */

const env = (import.meta as any).env || {};
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== 'https://your-project.supabase.co' &&
    !SUPABASE_URL.includes('placeholder')
  );
};

export const fetchChallengesFromSupabase = async (): Promise<Challenge[] | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/challenges?select=*,challenge_media(*)`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      console.warn('Supabase fetch returned error status:', res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Could not reach Supabase endpoint, engaging fallback:', error);
    return null;
  }
};
