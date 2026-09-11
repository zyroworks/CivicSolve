import { UserRole } from './index';

export interface StructuredDraft {
  title: string;
  category: string;
  subcategory: string;
  severity: number;
  people_affected: string;
  keywords: string[];
  required_expertise: string;
  suggested_priority: 'P1' | 'P2' | 'P3';
  suggested_solution_domains: string[];
}

export interface DuplicateMatch {
  id: string;
  ticketId: string;
  title: string;
  location: string;
  similarity: number;
  status: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  structuredDraft?: StructuredDraft;
  duplicateMatches?: DuplicateMatch[];
  suggestedActions?: string[];
  isError?: boolean;
}

export interface RoleQuickPrompt {
  label: string;
  prompt: string;
  icon: string;
}
