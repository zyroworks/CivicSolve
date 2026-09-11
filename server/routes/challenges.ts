import { Router, Request, Response } from 'express';
import { analyzeWithGemini } from '../services/geminiService';

export const challengesRouter = Router();

// In-memory persistent database for server lifecycle
let challenges: any[] = [
  {
    id: 'ch-1',
    ticketId: '#CS-8921',
    title: 'Drinking Water Turbidity & Recurring Pipeline Leak',
    category: 'Water Management & Sanitation',
    peopleAffected: '5,000+ residents',
    location: {
      lat: 28.5033,
      lng: 77.2482,
      address: 'Ward 14, Sector 4 Main Line, Sangam Vihar',
      ward: 'Ward 14',
      district: 'South East Delhi',
    },
    description: 'For the last 3 weeks, drinking water supply contains heavy turbidity and foul odor. Over 1,200 households affected. Local pipeline joint collapsed near community school.',
    status: 'GOVT_VALIDATED',
    priority: 'P1',
    mediaUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&auto=format&fit=crop&q=80',
    mediaName: 'pipeline_leak_contamination.jpg',
    mediaSize: '2.4 MB',
    createdAt: '3 hours ago',
    endorsementsCount: 3240,
    assignedLab: 'DTU / DSEU Hydro-Lab',
    aiDiagnostics: {
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
    },
  },
  {
    id: 'ch-2',
    ticketId: '#CS-8919',
    title: 'Automated Air Quality Hotspot Mapping & Particulate Mitigation',
    category: 'Environment & AQI',
    peopleAffected: '18,000 commuters / day',
    location: {
      lat: 28.6502,
      lng: 77.3155,
      address: 'Anand Vihar Terminal Border Junction',
      ward: 'Ward 32',
      district: 'East Delhi',
    },
    description: 'Unprecedented PM2.5 and PM10 particulate levels persisting at bus interchange terminal during morning rush hours causing respiratory distress.',
    status: 'LAB_MATCHED',
    priority: 'P2',
    mediaUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    mediaName: 'anand_vihar_aqi_haze.jpg',
    mediaSize: '3.1 MB',
    createdAt: '1 day ago',
    endorsementsCount: 8910,
    assignedLab: 'IIT Delhi Clean Air Research Lab',
    aiDiagnostics: {
      detectedDomain: 'Urban Environmental Health',
      subSector: 'Atmospheric Particulate Triage',
      confidence: 93.4,
      severityScore: 82,
      priority: 'P2',
      semanticTags: ['#AirQuality', '#PM25', '#TerminalPollution', '#SmogAlert'],
      recommendedAction: 'Deploy autonomous misting cannon grid & synchronize traffic signal cycles.',
      recommendedSolverMatch: 'IIT Delhi Dept. of Atmospheric Sciences',
      matchScore: 91,
    },
  },
  {
    id: 'ch-3',
    ticketId: '#CS-8914',
    title: 'Pothole & Structural Asphalt Hazard Detection via Transit Cameras',
    category: 'Road Safety & Transit',
    peopleAffected: '45,000+ daily motorists',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Outer Ring Road, Marathahalli flyover junction',
      ward: 'Ward 85',
      district: 'Bengaluru Urban',
    },
    description: 'Multiple deep asphalt craters causing extreme traffic congestion and two-wheeler skid hazards following monsoon spells.',
    status: 'IN_PROGRESS',
    priority: 'P2',
    mediaUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    mediaName: 'road_damage_bengaluru.jpg',
    mediaSize: '1.8 MB',
    createdAt: '2 days ago',
    endorsementsCount: 4120,
    assignedLab: 'IISc / RVCE Labs',
    aiDiagnostics: {
      detectedDomain: 'Smart Mobility & Transportation',
      subSector: 'Road Infrastructure Maintenance',
      confidence: 95.1,
      severityScore: 78,
      priority: 'P2',
      semanticTags: ['#RoadSafety', '#PotholeDetection', '#TransitCameras', '#YOLOv8'],
      recommendedAction: 'Auto-dispatch municipal quick-fill cold-mix repair team; update transit speed advisory.',
      recommendedSolverMatch: 'RVCE Intelligent Transportation Systems Lab',
      matchScore: 96,
    },
  },
  {
    id: 'ch-4',
    ticketId: '#CS-8902',
    title: 'Solar Powered Modular Cold Storage for Perishable Agritech',
    category: 'Agriculture / Agritech',
    peopleAffected: '240 smallholder farming families',
    location: {
      lat: 19.9975,
      lng: 73.7898,
      address: 'Dindori Taluka Agricultural Market Yard',
      ward: 'Gram Panchayat 4',
      district: 'Nashik, MH',
    },
    description: 'Post-harvest crop spoiling of tomatoes and grapes due to intermittent 8-hour rural feeder power cuts in peak summer.',
    status: 'SUBMITTED',
    priority: 'P3',
    mediaUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80',
    mediaName: 'tomato_harvest_spoilage.jpg',
    mediaSize: '2.9 MB',
    createdAt: '4 hours ago',
    endorsementsCount: 1490,
    aiDiagnostics: {
      detectedDomain: 'Agritech & Food Security',
      subSector: 'Decentralized Cold Chain',
      confidence: 91.2,
      severityScore: 68,
      priority: 'P3',
      semanticTags: ['#ColdStorage', '#SolarEnergy', '#PostHarvestLoss', '#SDG2'],
      recommendedAction: 'Sanction pilot under PM-KUSUM Agri-Innovation scheme; match with local thermal energy lab.',
      recommendedSolverMatch: 'VNIT Nagpur Clean Energy Laboratory',
      matchScore: 88,
    },
  },
];

export const getChallenges = (): any[] => challenges;

challengesRouter.get('/', (req: Request, res: Response) => {
  res.json({ success: true, challenges });
});

challengesRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, category, description, ward, district, peopleAffected } = req.body;
    const nextNum = Math.floor(8900 + Math.random() * 100);

    const diagnostics = await analyzeWithGemini({
      title,
      description,
      category,
      ward: ward || 'Ward 14',
    });

    const newChallenge = {
      id: `ch-${Date.now()}`,
      ticketId: `#CS-${nextNum}`,
      title,
      category,
      peopleAffected: peopleAffected || '1,000+ residents',
      location: {
        lat: 28.5033,
        lng: 77.2482,
        address: `${ward || 'Ward 14'}, ${district || 'South East Delhi'}`,
        ward: ward || 'Ward 14',
        district: district || 'South East Delhi',
      },
      description,
      status: 'SUBMITTED',
      priority: diagnostics.priority,
      mediaUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&auto=format&fit=crop&q=80',
      mediaName: 'citizen_proof.jpg',
      mediaSize: '2.1 MB',
      createdAt: 'Just now',
      endorsementsCount: 1,
      aiDiagnostics: diagnostics,
    };

    challenges.unshift(newChallenge);
    res.status(201).json({ success: true, challenge: newChallenge });
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ error: 'Failed to create challenge' });
  }
});

challengesRouter.patch('/:id/status', (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, priority } = req.body;

  const challenge = challenges.find((c) => c.id === id || c.ticketId === id);
  if (!challenge) {
    res.status(404).json({ error: 'Challenge not found' });
    return;
  }

  if (status) challenge.status = status;
  if (priority) challenge.priority = priority;

  res.json({ success: true, challenge });
});

challengesRouter.post('/:id/endorse', (req: Request, res: Response): void => {
  const { id } = req.params;
  const challenge = challenges.find((c) => c.id === id || c.ticketId === id);
  if (!challenge) {
    res.status(404).json({ error: 'Challenge not found' });
    return;
  }

  challenge.endorsementsCount += 1;
  res.json({ success: true, endorsementsCount: challenge.endorsementsCount });
});