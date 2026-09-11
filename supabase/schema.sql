-- ========================================================
-- CivicSolve — Official Supabase PostgreSQL Database Schema
-- Run this script in your Supabase Project: SQL Editor -> New Query -> Run
-- ========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
    id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    people_affected TEXT DEFAULT '1,000+ residents',
    location JSONB NOT NULL,
    district TEXT,
    state TEXT DEFAULT 'Jharkhand',
    location_name TEXT,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'SUBMITTED',
    priority TEXT NOT NULL DEFAULT 'P2',
    media_url TEXT,
    media_name TEXT,
    media_size TEXT,
    endorsements_count INTEGER DEFAULT 1,
    assigned_lab TEXT,
    ai_diagnostics JSONB,
    submitted_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create the Challenge Media Table
CREATE TABLE IF NOT EXISTS public.challenge_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id TEXT REFERENCES public.challenges(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. High-Performance Query Indexes
CREATE INDEX IF NOT EXISTS idx_challenges_status ON public.challenges(status);
CREATE INDEX IF NOT EXISTS idx_challenges_district ON public.challenges(district);
CREATE INDEX IF NOT EXISTS idx_challenges_priority ON public.challenges(priority);
CREATE INDEX IF NOT EXISTS idx_challenges_created_at ON public.challenges(created_at DESC);

-- 5. Row Level Security (RLS) Setup
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_media ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all challenges
DROP POLICY IF EXISTS "Public challenges are viewable by everyone" ON public.challenges;
CREATE POLICY "Public challenges are viewable by everyone" 
ON public.challenges FOR SELECT 
USING (true);

-- Allow any user (citizen) to submit new challenges
DROP POLICY IF EXISTS "Anyone can report a civic challenge" ON public.challenges;
CREATE POLICY "Anyone can report a civic challenge" 
ON public.challenges FOR INSERT 
WITH CHECK (true);

-- Allow updating challenge status, priority, and endorsements
DROP POLICY IF EXISTS "Anyone can update endorsements and status" ON public.challenges;
CREATE POLICY "Anyone can update endorsements and status" 
ON public.challenges FOR UPDATE 
USING (true);

-- Media policies
DROP POLICY IF EXISTS "Media files viewable by everyone" ON public.challenge_media;
CREATE POLICY "Media files viewable by everyone" 
ON public.challenge_media FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Anyone can upload challenge media" ON public.challenge_media;
CREATE POLICY "Anyone can upload challenge media" 
ON public.challenge_media FOR INSERT 
WITH CHECK (true);

-- ========================================================
-- Initial Demonstration Seed Data (Jharkhand Priority Issues)
-- ========================================================

INSERT INTO public.challenges (
    id, ticket_id, title, category, subcategory, people_affected, 
    location, district, state, location_name, description, status, priority, 
    media_url, media_name, media_size, endorsements_count, assigned_lab, 
    ai_diagnostics, submitted_by
) VALUES 
(
    'ch-jh-1',
    '#JH-7101',
    'Illegal Garbage Dumping & Plastic Accumulation Near Government School',
    'Environment',
    'Solid Waste Management',
    '850+ students & local residents',
    '{"lat": 23.3753, "lng": 85.3344, "address": "Near Govt High School, Morabadi Ground Ward 3", "ward": "Ward 3, Morabadi", "district": "Ranchi"}'::jsonb,
    'Ranchi',
    'Jharkhand',
    'Morabadi, Ranchi, Jharkhand',
    'Unregulated commercial and domestic solid waste dumping adjacent to the government school compound wall. Generates severe stench, vector-borne disease risks for school children, and storm drain choking during pre-monsoon showers.',
    'GOVT_VALIDATED',
    'P1',
    'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&auto=format&fit=crop&q=80',
    'ranchi_morabadi_dumping_site.jpg',
    '2.8 MB',
    1420,
    'BIT Mesra Dept. of Environmental Engineering',
    '{"detectedDomain": "Urban Environmental Health", "subSector": "Municipal Solid Waste", "confidence": 98.4, "severityScore": 92, "priority": "P1", "semanticTags": ["#WasteManagement", "#SchoolSafety", "#RanchiMunicipal", "#DrainBlockage"], "recommendedAction": "Issue urgent RMC sanitation enforcement notice and establish segregated organic waste collection hub.", "recommendedSolverMatch": "BIT Mesra Waste-to-Energy Research Lab", "matchScore": 96}'::jsonb,
    'Anjali Tirkey (School Management Committee)'
),
(
    'ch-jh-2',
    '#JH-7102',
    'Colliery Runoff & Coal Dust Sedimentation in Water Channels',
    'Water',
    'Industrial Effluent Pollution',
    '4,200+ mining colony residents',
    '{"lat": 23.7744, "lng": 86.4182, "address": "Sector 4 Main Nallah, Jharia Coalfield Basin", "ward": "Ward 11, Jharia", "district": "Dhanbad"}'::jsonb,
    'Dhanbad',
    'Jharkhand',
    'Jharia, Dhanbad, Jharkhand',
    'Untreated acid mine drainage and suspended coal particulate runoff entering natural drainage streams during rain events, severely contaminating local shallow aquifers and community borewells.',
    'LAB_MATCHED',
    'P1',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&auto=format&fit=crop&q=80',
    'dhanbad_jharia_coal_runoff.jpg',
    '3.4 MB',
    2150,
    'IIT (ISM) Dhanbad Mining & Environmental Engineering',
    '{"detectedDomain": "Industrial Hydrology & Environmental Remediation", "subSector": "Acid Mine Drainage", "confidence": 97.2, "severityScore": 95, "priority": "P1", "semanticTags": ["#CoalDust", "#AquiferContamination", "#JhariaCoalfields", "#IITISM"], "recommendedAction": "Construct modular biological constructed wetlands and lime-dosing neutralizing channels.", "recommendedSolverMatch": "IIT (ISM) Dhanbad Centre of Mining Environment", "matchScore": 98}'::jsonb,
    'Rajeshwar Mahato (Jharia Action Group)'
),
(
    'ch-jh-3',
    '#JH-7103',
    'Subernarekha Riverbank Industrial Effluent & Heavy Metal Leaching',
    'Water',
    'River Pollution & Industrial Waste',
    '12,000+ riparian residents',
    '{"lat": 22.8046, "lng": 86.2029, "address": "Old Purulia Road Bridge Ghat, Mango", "ward": "Ward 7, Mango", "district": "East Singhbhum"}'::jsonb,
    'East Singhbhum',
    'Jharkhand',
    'Mango, Jamshedpur, East Singhbhum',
    'Unregulated chemical discharge and metal pickling liquor dumped along river perimeter. Water tests reveal high turbidity, low dissolved oxygen, and fish mortality during low-flow periods.',
    'IN_PROGRESS',
    'P1',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    'subernarekha_river_effluent.jpg',
    '3.1 MB',
    1890,
    'NIT Jamshedpur Civil & Environmental Lab',
    '{"detectedDomain": "River Basin Eco-Restoration", "subSector": "Industrial Effluent Treatment", "confidence": 96.5, "severityScore": 91, "priority": "P1", "semanticTags": ["#Subernarekha", "#IndustrialEffluent", "#NITJamshedpur", "#HeavyMetals"], "recommendedAction": "Deploy real-time optical multi-parameter water sensor buoys and mandate CETP bypass closures.", "recommendedSolverMatch": "NIT Jamshedpur Environmental Hydro-informatics Lab", "matchScore": 95}'::jsonb,
    'Sunil Hembram (River Protection Samiti)'
)
ON CONFLICT (id) DO NOTHING;
