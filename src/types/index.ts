export type UserRole = 'CITIZEN' | 'GOVT_ADMIN' | 'UNIVERSITY' | 'INDUSTRY';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  title: string;
  organization: string;
  avatar: string;
}

export type ChallengeStatus = 
  | 'SUBMITTED' 
  | 'AI_ANALYZED' 
  | 'GOVT_VALIDATED' 
  | 'LAB_MATCHED' 
  | 'IN_PROGRESS' 
  | 'FIELD_PILOT' 
  | 'DEPLOYED' 
  | 'RESOLVED' 
  | 'REJECTED';

export type PriorityLevel = 'P1' | 'P2' | 'P3';

export interface AIDiagnosticResult {
  detectedDomain: string;
  subSector: string;
  confidence: number;
  severityScore: number;
  priority: PriorityLevel;
  semanticTags: string[];
  duplicateClusterId?: string;
  duplicateWarning?: string;
  recommendedAction: string;
  recommendedSolverMatch: string;
  matchScore: number;
}

export interface ChallengeMedia {
  id: string;
  challenge_id: string;
  file_url: string;
  file_type: string;
  caption?: string;
  created_at: string;
}

export interface Challenge {
  id: string;
  ticketId: string;
  title: string;
  category: string;
  subcategory?: string;
  peopleAffected: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    ward: string;
    district: string;
  };
  state?: string;
  location_name?: string;
  description: string;
  status: ChallengeStatus;
  priority: PriorityLevel;
  mediaUrl?: string;
  mediaName?: string;
  mediaSize?: string;
  createdAt: string;
  submitted_by?: string;
  media?: ChallengeMedia[];
  aiDiagnostics: AIDiagnosticResult;
  assignedLab?: string;
  endorsementsCount: number;
}

export interface ProjectTask {
  id: string;
  title: string;
  owner: string;
  detail: string;
  status: 'DONE' | 'IN_PROGRESS' | 'UNDER_REVIEW';
}

export interface ProjectDiscussion {
  id: string;
  author: string;
  badge: string;
  role: string;
  time: string;
  message: string;
  avatar: string;
}

export interface ProjectArtifact {
  name: string;
  size: string;
  type: string;
  desc: string;
}

export interface Project {
  id: string;
  challengeId: string;
  ticketId: string;
  title: string;
  leadInstitute: string;
  trlLevel: number;
  sprintNumber: number;
  totalSprints: number;
  telemetry: {
    pressureBar: number;
    turbidityNTU: number;
    samplingRate: string;
    ambientTemp: string;
    status: string;
  };
  team: {
    students: Array<{ name: string; role: string }>;
    pi: { name: string; role: string; institution: string; avatar: string; quote: string };
    mentor: { name: string; role: string; company: string; grantAmount: string; avatar: string };
    govtLead: { name: string; role: string; dept: string; avatar: string; clearance: string };
  };
  tasks: ProjectTask[];
  discussions: ProjectDiscussion[];
  artifacts: ProjectArtifact[];
}