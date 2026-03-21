
export interface InvestorProfile {
  id: string;
  userId?: string;
  preferences: {
    revenueGrowthTarget: number; // Minimum YoY growth percentage
    peRangeMin: number;
    peRangeMax: number;
    marketCapPreference: 'small' | 'mid' | 'large' | 'mega' | 'any';
    dividendYieldMin: number;
    esgImportance: 'low' | 'medium' | 'high';
    rdSpendingMin: number; // Minimum R&D as % of revenue
    cashOnHandMin: number; // Minimum cash in billions
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  };
  selectedSector?: string;
  subSector?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyMatch {
  companyId: string;
  matchScore: number;
  matchReasons: string[];
  userAction?: 'like' | 'dislike' | 'super_like';
  timestamp: Date;
}

export interface SectorSubdivision {
  id: string;
  name: string;
  parentSector: string;
  description: string;
  keyMetrics: string[];
  companies: string[]; // Company IDs
  industryKeywords: string[]; // Added missing property
}
