
import { ProcessedHeadline } from './types.ts';

export function getFallbackHeadlines(): ProcessedHeadline[] {
  return [
    {
      id: 'fallback-1',
      title: "AI Revolution Drives Tech Stock Rally as Nvidia Reports Record Earnings",
      summary: "Artificial intelligence companies led market gains today as Nvidia reported exceptional quarterly results, fueled by unprecedented demand for AI chips. Major cloud providers continue massive investments in AI infrastructure, with Microsoft, Google, and Amazon all expanding their data center capabilities. The AI boom is creating new investment opportunities across semiconductors, software, and cloud computing sectors. Analysts predict this trend will continue driving technology valuations higher throughout 2025.",
      tldr: "AI companies surge on Nvidia's record earnings and massive cloud infrastructure investments from tech giants. The artificial intelligence revolution is reshaping the entire technology sector with unprecedented growth opportunities.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Tech Insider",
      image: null
    },
    {
      id: 'fallback-2',
      title: "Federal Reserve Signals Potential Rate Cuts Amid Cooling Inflation",
      summary: "The Federal Reserve indicated today that interest rate cuts may be on the horizon as inflation continues to moderate toward the 2% target. Fed Chair Jerome Powell emphasized data-dependent decision making while acknowledging the need to support economic growth. Market participants are pricing in multiple rate cuts through 2025, with bonds rallying and mortgage rates beginning to decline. The central bank's shift in tone reflects growing confidence that inflation has been successfully contained without triggering a severe recession.",
      tldr: "Fed hints at upcoming rate cuts as inflation cools, sparking bond rally and lower mortgage expectations. Policymakers are gaining confidence that inflation is under control while supporting economic growth remains a priority.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Federal Reserve Watch",
      image: null
    },
    {
      id: 'fallback-3',
      title: "Electric Vehicle Market Accelerates with Tesla, Rivian Posting Strong Sales",
      summary: "Electric vehicle manufacturers reported robust quarterly deliveries, with Tesla maintaining its market leadership while newer entrants like Rivian and Lucid Motors gain significant traction. Government incentives and declining battery costs are making EVs more accessible to mainstream consumers. Traditional automakers including Ford and GM are accelerating their electric transition plans, investing billions in new manufacturing facilities. The industry expects 2025 to be a pivotal year for EV adoption as charging infrastructure expands nationwide.",
      tldr: "EV sales surge with Tesla leading while new competitors gain ground through government incentives and falling costs. The electric vehicle revolution is accelerating as traditional automakers commit massive investments to electrification.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Auto News",
      image: null
    },
    {
      id: 'fallback-4',
      title: "Healthcare Stocks Rise on Breakthrough Cancer Treatment Approvals",
      summary: "Pharmaceutical companies saw significant gains following FDA approvals for innovative cancer therapies, including new immunotherapy treatments and precision medicine approaches. Biotech firms are benefiting from increased venture capital funding and government research grants supporting drug development. The aging population and advances in personalized medicine are driving long-term growth prospects for the healthcare sector. Investors are particularly optimistic about companies developing treatments for Alzheimer's disease and rare genetic disorders.",
      tldr: "Healthcare stocks climb on new cancer treatment approvals and increased biotech funding for innovative therapies. The sector benefits from demographic trends and breakthrough advances in personalized medicine approaches.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "BioPharma Today",
      image: null
    },
    {
      id: 'fallback-5',
      title: "Bitcoin Reaches New Heights as Institutional Adoption Accelerates",
      summary: "Cryptocurrency markets experienced significant momentum as Bitcoin approached record highs, driven by increased institutional adoption and regulatory clarity. Major corporations are adding Bitcoin to their treasury reserves while pension funds explore crypto allocations. The introduction of Bitcoin ETFs has made digital assets more accessible to traditional investors, contributing to mainstream acceptance. Regulatory frameworks in key markets are providing greater certainty for institutional participation in the crypto ecosystem.",
      tldr: "Bitcoin surges toward record highs on institutional adoption and regulatory clarity for digital assets. Corporate treasuries and pension funds are increasingly embracing cryptocurrency as a legitimate asset class.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Crypto Markets",
      image: null
    },
    {
      id: 'fallback-6',
      title: "Consumer Spending Remains Strong Despite Economic Uncertainties",
      summary: "Retail sales data showed continued consumer resilience as holiday shopping exceeded expectations across both online and brick-and-mortar channels. Strong employment numbers and wage growth are supporting household spending patterns, particularly in discretionary categories like travel and dining. Credit card companies report healthy payment rates while consumer confidence surveys indicate optimism about personal finances. The service sector continues to benefit from the shift in consumer preferences toward experiences over goods.",
      tldr: "Consumer spending stays robust with strong holiday sales and healthy employment supporting discretionary purchases. Service sectors benefit as consumers prioritize experiences while maintaining strong payment rates on credit obligations.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Retail Report",
      image: null
    },
    {
      id: 'fallback-7',
      title: "Clean Energy Transition Accelerates with Record Solar and Wind Installations",
      summary: "Renewable energy sectors achieved milestone installations as solar and wind projects reached record capacity additions across the United States. Government incentives from the Inflation Reduction Act are driving unprecedented investment in clean energy infrastructure. Utility companies are rapidly transitioning their power generation portfolios while energy storage solutions become increasingly cost-effective. The clean energy boom is creating thousands of jobs while reducing electricity costs for consumers nationwide.",
      tldr: "Clean energy hits records with massive solar and wind installations driven by government incentives and falling costs. The renewable transition creates jobs while reducing consumer electricity expenses through efficient infrastructure.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Energy Transition",
      image: null
    },
    {
      id: 'fallback-8',
      title: "Housing Market Shows Signs of Recovery as Mortgage Rates Stabilize",
      summary: "Real estate markets are showing renewed activity as mortgage rates stabilize and housing inventory gradually improves in key metropolitan areas. Homebuilders are cautiously increasing construction starts while existing home sales gain momentum from pent-up demand. First-time buyers are beginning to return to the market as affordability concerns ease with wage growth and stabilizing borrowing costs. Real estate investment trusts are positioning for recovery as commercial property values find support from improving economic fundamentals.",
      tldr: "Housing market recovery emerges with stabilizing mortgage rates and improving inventory in major cities. First-time buyers return as affordability improves through wage growth and steady borrowing costs.",
      url: "https://finance.yahoo.com",
      publishedDate: new Date().toISOString(),
      site: "Real Estate Watch",
      image: null
    }
  ];
}
