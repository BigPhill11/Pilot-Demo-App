
export const sectorSubdivisions = {
  technology: [
    {
      id: 'consumer-electronics',
      name: 'Consumer Electronics',
      parentSector: 'Technology',
      description: 'Companies creating innovative consumer tech products',
      keyMetrics: ['Unit Sales Growth', 'Gross Margin', 'R&D Spending', 'Brand Loyalty'],
      companies: ['AAPL', 'MSFT'],
      industryKeywords: ['consumer electronics', 'hardware', 'devices', 'smartphones', 'computers']
    },
    {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      parentSector: 'Technology',
      description: 'Infrastructure and software-as-a-service providers',
      keyMetrics: ['ARR Growth', 'Net Revenue Retention', 'Free Cash Flow Margin'],
      companies: ['MSFT', 'GOOGL', 'AMZN'],
      industryKeywords: ['cloud', 'saas', 'software', 'infrastructure', 'platform']
    },
    {
      id: 'ai-chips',
      name: 'AI & Semiconductors',
      parentSector: 'Technology',
      description: 'Cutting-edge chip designers powering the AI revolution',
      keyMetrics: ['GPU Market Share', 'Data Center Revenue', 'R&D Investment'],
      companies: ['NVDA', 'AMD', 'INTC'],
      industryKeywords: ['semiconductors', 'chips', 'processors', 'ai', 'artificial intelligence', 'hardware']
    },
    {
      id: 'fintech',
      name: 'Financial Technology',
      parentSector: 'Technology',
      description: 'Digital payment and financial service innovators',
      keyMetrics: ['Transaction Volume', 'Take Rate', 'User Growth'],
      companies: ['V', 'MA'],
      industryKeywords: ['fintech', 'payments', 'financial services', 'digital payments', 'blockchain']
    }
  ],
  healthcare: [
    {
      id: 'pharmaceuticals',
      name: 'Pharmaceuticals',
      parentSector: 'Healthcare',
      description: 'Drug discovery and development companies',
      keyMetrics: ['Pipeline Success Rate', 'Patent Cliff Risk', 'R&D ROI'],
      companies: ['LLY', 'ABBV', 'JNJ'],
      industryKeywords: ['pharmaceuticals', 'drugs', 'biotech', 'healthcare', 'medical']
    }
  ],
  finance: [
    {
      id: 'banking',
      name: 'Traditional Banking',
      parentSector: 'Finance',
      description: 'Full-service financial institutions',
      keyMetrics: ['Net Interest Margin', 'Return on Equity', 'Tier 1 Capital'],
      companies: ['JPM'],
      industryKeywords: ['banking', 'financial services', 'loans', 'deposits']
    },
    {
      id: 'payments',
      name: 'Payment Networks',
      parentSector: 'Finance',
      description: 'Global payment processing infrastructure',
      keyMetrics: ['Payment Volume', 'Cross-border Growth', 'Operating Leverage'],
      companies: ['V', 'MA'],
      industryKeywords: ['payments', 'credit cards', 'payment processing', 'financial networks']
    }
  ]
};

export const getAllSubdivisions = () => {
  return Object.values(sectorSubdivisions).flat();
};

export const getSubdivisionsBySector = (sector: string) => {
  return sectorSubdivisions[sector.toLowerCase()] || [];
};

// Helper function to automatically assign companies to subdivisions
export const findMatchingSubdivision = (company: { industry: string; sector?: string; ticker: string }) => {
  const allSubdivisions = getAllSubdivisions();
  
  // First try to match by ticker
  const tickerMatch = allSubdivisions.find(sub => 
    sub.companies.includes(company.ticker)
  );
  if (tickerMatch) return tickerMatch;
  
  // Then try to match by industry keywords
  const industryLower = company.industry.toLowerCase();
  const sectorLower = company.sector?.toLowerCase() || '';
  
  const keywordMatch = allSubdivisions.find(sub => 
    sub.industryKeywords.some(keyword => 
      industryLower.includes(keyword) || sectorLower.includes(keyword)
    )
  );
  
  return keywordMatch;
};
