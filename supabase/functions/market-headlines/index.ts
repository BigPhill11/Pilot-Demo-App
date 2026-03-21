
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HeadlinesResponse, ProcessedHeadline, MarketRecap, NewsArticle } from './types.ts';
import { processNewsArticles } from './data-processor.ts';
import { generateMarketRecap as recapFromHeadlines } from './market-analysis.ts';
import { getFallbackHeadlines } from './fallback-data.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// In-memory cache keyed by ET window tag (e.g., 2025-09-11-am, 2025-09-11-pm)
let cachedContent: HeadlinesResponse | null = null;
let lastWindowTag: string | null = null;

function getETNow() {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false
  });
  const parts = Object.fromEntries(fmt.formatToParts(new Date()).map(p => [p.type, p.value]));
  const y = parts.year; const m = parts.month; const d = parts.day;
  const hh = parseInt(parts.hour || '00', 10); const mm = parseInt(parts.minute || '00', 10);
  const minutes = hh * 60 + mm;
  return { date: `${y}-${m}-${d}`, minutes };
}

// Windows: 09:00 ET (pre-open 30m before 09:30) and 16:30 ET (30m after 16:00 close)
function currentWindowTag(): { tag: string, shouldRefresh: boolean } {
  const { date, minutes } = getETNow();
  const PRE_OPEN = 9 * 60;      // 09:00
  const POST_CLOSE = 16 * 60 + 30; // 16:30
  let tag = `${date}-idle`;
  let shouldRefresh = false;
  if (minutes >= POST_CLOSE) {
    tag = `${date}-pm`;
  } else if (minutes >= PRE_OPEN) {
    tag = `${date}-am`;
  }
  if (!lastWindowTag || lastWindowTag !== tag) {
    // Only refresh if we're exactly in a refreshable window
    shouldRefresh = tag.endsWith('-am') || tag.endsWith('-pm');
  }
  return { tag, shouldRefresh };
}

// Use Perplexity to generate headlines and a market recap in the expected shape
async function buildWithPerplexity(userLevel: string, perplexityKey: string): Promise<HeadlinesResponse> {
  const today = new Date().toISOString().slice(0, 10);

  const system = [
    "You are a financial news assistant that fetches and summarizes today's US market news.",
    "You MUST return STRICTLY valid JSON with no extra commentary, no code fences, no prose.",
    "Prioritize headlines from major outlets: Reuters, Associated Press, Bloomberg, Wall Street Journal, Financial Times, CNBC, Yahoo Finance, and other reputable sources.",
    "Focus on macro daily drivers: index moves (S&P 500, Dow, Nasdaq), interest rates and yields, Fed policy, inflation data (CPI, PCE), jobs data, sector-wide moves, commodities (oil, gold), FX and crypto if meaningfully market-moving, and large M&A or regulatory actions. Avoid niche single-company items unless they broadly move markets.",
    "JSON schema:",
    "{",
    '  "headlines": [',
    '    { "id": "string", "title": "string", "summary": "string", "tldr": "string", "url": "string", "publishedDate": "ISO string", "site": "string", "image": null }',
    "  ],",
    '  "marketRecap": { "paragraphs": ["string","string"], "tldr": "string", "sentiment": "positive|negative|neutral|volatile", "dominantSector": "tech|finance|energy|healthcare|retail|crypto|general" },',
    '  "lastUpdated": "ISO string"',
    "}",
    "Rules:",
    "- headlines: 6-8 items; credible sources; unique titles; published within last 24h; readable for the requested user level.",
    "- marketRecap: exactly 2 paragraphs; concise; consistent with headlines; set sentiment and dominantSector appropriately.",
    "- Use publisher domain or name in 'site'. Set 'image' to null.",
  ].join("\n");

  const user = [
    `Generate today's (${today}) US market overview and headlines tailored for user level: ${userLevel}.`,
    "Style rules:",
    "- Use plain language. For 'intermediate', write so a college freshman can understand. For 'advanced', write so a college junior can understand. Avoid heavy jargon; if a term is needed, briefly explain it in simple words.",
    "- Market recap must be specific: mention what major indexes did (up/down and ~magnitude), any key macro catalysts (e.g., Fed remarks, CPI surprise), and the top sectors up/down. Keep exactly 2 short paragraphs, 2-3 sentences each.",
    "- Headlines should be broad market stories, not narrow micro headlines. Include the outlet name or domain in 'site'.",
    "Output JSON only using the schema above. No backticks.",
  ].join("\n");

  const candidateModels = [
    'sonar-pro',
    'sonar-medium',
    'sonar-small'
  ];

  let content = '';
  let lastError: string | null = null;

  for (const model of candidateModels) {
    const resp = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 1200,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'HeadlinesResponse',
            strict: true,
            schema: {
              type: 'object',
              additionalProperties: false,
              properties: {
                headlines: {
                  type: 'array',
                  minItems: 6,
                  maxItems: 8,
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      summary: { type: 'string' },
                      tldr: { type: 'string' },
                      url: { type: 'string' },
                      publishedDate: { type: 'string' },
                      site: { type: 'string' },
                      image: { type: ['string','null'] }
                    },
                    required: ['id','title','summary','tldr','url','publishedDate','site','image']
                  }
                },
                marketRecap: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    paragraphs: {
                      type: 'array',
                      minItems: 2,
                      maxItems: 2,
                      items: { type: 'string' }
                    },
                    tldr: { type: 'string' },
                    sentiment: { type: 'string', enum: ['positive','negative','neutral','volatile'] },
                    dominantSector: { type: 'string', enum: ['tech','finance','energy','healthcare','retail','crypto','general'] }
                  },
                  required: ['paragraphs','tldr','sentiment','dominantSector']
                },
                lastUpdated: { type: 'string' }
              },
              required: ['headlines','marketRecap','lastUpdated']
            }
          }
        },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      }),
    });

    if (!resp.ok) {
      let body = '';
      try { body = await resp.text(); } catch (_) { body = ''; }
      lastError = `Perplexity error: ${resp.status} ${body}`;
      continue;
    }

    const data = await resp.json();
    const returned = data?.choices?.[0]?.message?.content;
    if (returned && typeof returned === 'object') {
      // Some providers may already return an object when response_format is used
      content = JSON.stringify(returned);
    } else {
      content = returned || '';
    }
    if (content) break;
  }

  if (!content) {
    throw new Error(lastError || 'Perplexity did not return content');
  }

  // Try to parse the content as JSON; if it contains text, extract a JSON block
  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Strip code fences if present
    const fenced = content.match(/```(?:json)?\n([\s\S]*?)```/i);
    if (fenced && fenced[1]) {
      parsed = JSON.parse(fenced[1]);
    } else {
      // Find the first '{' and last '}' to capture a JSON object
      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        parsed = JSON.parse(content.slice(start, end + 1));
      } else {
        throw new Error('Perplexity returned non-JSON content');
      }
    }
  }

  if (!parsed || !Array.isArray(parsed.headlines) || !parsed.marketRecap) {
    throw new Error('Perplexity returned unexpected shape');
  }

  const response: HeadlinesResponse = {
    headlines: parsed.headlines.slice(0, 8),
    marketRecap: parsed.marketRecap,
    lastUpdated: new Date().toISOString(),
  };

  return response;
}

async function fetchPolygonHeadlines(apiKey: string): Promise<NewsArticle[]> {
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString();
  const url = `https://api.polygon.io/v2/reference/news?limit=50&order=desc&published_utc.gte=${encodeURIComponent(twelveHoursAgo)}&apiKey=${apiKey}`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Polygon error: ${res.status}`);
  const json = await res.json();
  const results = json.results || [];
  // Map to NewsArticle shape
  return results.map((r: any) => ({
    article_id: r.id || r.url,
    title: r.title,
    description: r.description,
    content: r.description,
    link: r.article_url || r.url,
    pubDate: r.published_utc,
    source_id: r.publisher?.name || 'Polygon',
    image_url: r.image_url || null
  }));
}

async function fetchFinnhubNews(apiKey: string): Promise<NewsArticle[]> {
  // General category returns latest broad market news
  const url = `https://finnhub.io/api/v1/news?category=general&token=${apiKey}`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Finnhub error: ${res.status}`);
  const arr = await res.json();
  return (arr || []).map((n: any) => ({
    article_id: n.id?.toString() || n.url,
    title: n.headline,
    description: n.summary,
    content: n.summary,
    link: n.url,
    pubDate: n.datetime ? new Date(n.datetime * 1000).toISOString() : new Date().toISOString(),
    source_id: n.source || 'Finnhub',
    image_url: n.image || null
  }));
}

function dedupeByTitle(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  const out: NewsArticle[] = [];
  for (const a of articles) {
    const key = (a.title || '').trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  return out;
}

// Build live headlines from Polygon then post-process
async function buildLiveHeadlines(userLevel: string, polygonKey: string): Promise<ProcessedHeadline[]> {
  const raw = await fetchPolygonHeadlines(polygonKey);
  const deduped = dedupeByTitle(raw);
  const processed = processNewsArticles(deduped, userLevel).slice(0, 8);
  return processed;
}

function getUserLevelSummary(userLevel: string, topic: string, baseSummary: string): string {
  switch (userLevel) {
    case 'beginner':
      // Simplified explanation without jargon - always 3 sentences
      const beginnerExplanations: Record<string, string> = {
        ai_finance: "Banks are using computer programs to help them work better and keep money safe. These smart computer systems can spot fraud and help banks make better decisions. This makes banking safer and easier for everyone.",
        ev_market: "Electric cars are becoming more popular, which is good for companies that make them. More people want cars that don't use gas because they're better for the environment. This means electric car companies are selling more cars and making more money.",
        supply_chain: "Companies that make products are getting better at getting the materials they need. They're finding new ways to get supplies closer to home so they don't have to wait as long. This helps them make products faster and cheaper.",
        cybersecurity: "Businesses need better computer protection, so security companies are growing. More people work from home now, which means companies need stronger computer safety. Security companies help protect important information from bad people online.",
        esg_investing: "People want to invest in companies that are good for the environment and society. They care about how companies treat workers and whether they help or hurt the planet. Companies that do good things often make good investments too.",
        digital_payments: "More people are paying with their phones instead of cash. Apps like Venmo and Apple Pay make it easy to send money without needing paper bills. This is changing how banks and payment companies do business.",
        biotech: "Scientists are making new medicines to help people feel better. They're using new technology to create treatments for diseases that were hard to cure before. These discoveries help people live longer, healthier lives.",
        space_economy: "Space companies are starting to make money from satellite services and space travel. They're launching satellites that help with internet and GPS services. Some companies are even planning to take regular people to space for vacation."
      };
      return beginnerExplanations[topic] || baseSummary;
    case 'intermediate':
      // Enhanced 3-sentence summaries with more technical detail
      const intermediateExplanations: Record<string, string> = {
        ai_finance: "Financial institutions are rapidly implementing artificial intelligence solutions across risk management, fraud detection, and algorithmic trading operations. These AI systems utilize machine learning models to analyze vast datasets and identify patterns that enhance decision-making accuracy and operational efficiency. The integration of AI technology is fundamentally reshaping how financial services firms approach customer service, compliance monitoring, and investment strategies.",
        ev_market: "Electric vehicle manufacturers are experiencing unprecedented growth as global adoption accelerates driven by government incentives and advancing battery technology. Traditional automotive companies are pivoting their production lines while new EV startups are capturing significant market share in the sustainable transportation sector. This transition is creating substantial investment opportunities in the broader clean energy ecosystem including charging infrastructure and renewable energy companies.",
        supply_chain: "Manufacturing companies are strengthening their supply chain resilience through diversification strategies and nearshoring initiatives to reduce disruption risks. These operational improvements are resulting in better profit margins and more predictable revenue streams for companies that have invested in supply chain modernization. The shift toward regional supply networks is creating new investment themes in industrial real estate and logistics technology platforms.",
        cybersecurity: "Cybersecurity companies are experiencing record demand as enterprises increase their digital security spending in response to evolving threat landscapes. The accelerated adoption of remote work and cloud computing has expanded attack surfaces, driving sustained investment in security infrastructure and services. This sector growth is supported by increasing regulatory requirements and the rising cost of data breaches across all industries.",
        esg_investing: "Environmental, Social, and Governance investing continues to attract significant capital flows as institutional investors integrate sustainability criteria into their investment processes. Companies with strong ESG ratings are demonstrating better risk-adjusted returns and accessing capital at more favorable terms than their traditional counterparts. This investment approach is becoming mainstream as asset managers respond to client demand for sustainable investment solutions.",
        digital_payments: "Digital payment platforms are revolutionizing the financial landscape through innovative fintech solutions that enable seamless cashless transactions across multiple channels. Mobile payment adoption and cryptocurrency integration are creating new revenue models for financial technology companies and traditional payment processors. This digital transformation is driving consolidation in the payments industry while creating opportunities for blockchain and financial infrastructure companies.",
        biotech: "Biotechnology companies are achieving breakthrough advances in personalized medicine and gene therapy that are creating new treatment paradigms for previously incurable diseases. These scientific innovations are attracting significant venture capital and pharmaceutical partnership investments as companies advance through clinical trial phases. The convergence of biotechnology with artificial intelligence and data analytics is accelerating drug discovery timelines and improving success rates.",
        space_economy: "Commercial space companies are transitioning from experimental ventures to sustainable business models through satellite services, space tourism, and asteroid mining opportunities. The privatization of space exploration is creating new investment categories in aerospace technology, satellite communications, and space-based manufacturing capabilities. Government contracts and commercial partnerships are providing revenue visibility for companies developing next-generation space technologies."
      };
      return intermediateExplanations[topic] || (baseSummary + " Market analysts are closely monitoring these developments for their impact on sector rotation strategies and portfolio allocation decisions. Institutional demand continues to drive price discovery in these emerging growth narratives.");
    case 'advanced':
      // Professional 3-sentence summaries with sophisticated financial language
      const advancedExplanations: Record<string, string> = {
        ai_finance: "Artificial intelligence adoption in financial services is driving systematic alpha generation through enhanced quantitative modeling, alternative data integration, and real-time risk management capabilities. The technology is enabling new factor discovery methodologies and cross-asset correlation analysis that are reshaping portfolio construction frameworks and systematic trading strategies. AI-driven operational efficiency gains are compressing expense ratios while expanding addressable markets for asset managers and investment banks.",
        ev_market: "The electric vehicle sector is experiencing regime change dynamics as traditional automotive OEMs face margin compression while pure-play EV manufacturers demonstrate scalable unit economics and vertical integration advantages. This transition is creating systematic rotation opportunities from legacy automotive exposure toward clean energy infrastructure, battery technology, and autonomous driving platforms. The sector's capital allocation patterns suggest sustained outperformance potential driven by regulatory tailwinds and declining battery cost curves.",
        supply_chain: "Supply chain diversification strategies are creating systematic factor exposure shifts as companies prioritize operational resilience over cost optimization, fundamentally altering working capital dynamics and asset turnover ratios. The nearshoring trend is generating systematic alpha opportunities in industrial real estate, logistics automation, and regional manufacturing capabilities that benefit from shortened supply chains. These structural changes are creating new risk premiums in global trade-sensitive sectors while supporting domestic industrial capacity utilization.",
        cybersecurity: "Cybersecurity investment themes are demonstrating systematic outperformance characteristics driven by inelastic demand curves and high switching costs that create sustainable competitive moats for market leaders. The sector's recurring revenue models and expanding addressable markets are generating consistent earnings growth that supports premium valuations across the cybersecurity ecosystem. Systematic exposure to this thematic trend provides portfolio diversification benefits given its low correlation with traditional cyclical factors.",
        esg_investing: "ESG integration is becoming a systematic factor in asset pricing as institutional mandates and regulatory frameworks create persistent demand imbalances that favor companies with superior sustainability metrics. This systematic preference is generating measurable alpha in factor models while creating systematic risks for companies failing to meet evolving ESG standards. The trend represents a fundamental shift in cost of capital dynamics that benefits ESG leaders through improved access to institutional funding sources.",
        digital_payments: "Digital payment platforms are exhibiting network effect characteristics that create systematic moats and enable sustainable revenue growth through expanding transaction volumes and cross-selling opportunities. The fintech ecosystem's capital-light business models are generating superior return on equity metrics while enabling rapid geographic expansion and product diversification strategies. This secular growth trend is creating systematic exposure opportunities in financial technology, blockchain infrastructure, and digital currency platforms.",
        biotech: "Biotechnology innovation cycles are creating systematic alpha opportunities through breakthrough therapeutic modalities that command premium pricing power and expand addressable patient populations. The sector's clinical trial progression dynamics and regulatory approval pathways generate distinct volatility patterns that create systematic factor exposures for specialized healthcare investment strategies. Advances in precision medicine and AI-driven drug discovery are accelerating development timelines while improving commercial success probabilities.",
        space_economy: "The commercial space sector is demonstrating systematic value creation through expanding addressable markets in satellite communications, Earth observation, and space-based manufacturing that justify current valuation premiums. Government contract visibility and commercial partnership agreements are providing revenue stability that supports systematic exposure to this emerging thematic investment opportunity. The sector's capital intensity and technological barriers create natural competitive moats that benefit first-mover advantages in orbital infrastructure development."
      };
      return advancedExplanations[topic] || (baseSummary + " Institutional investors are adjusting their risk models and factor exposures in response to these systematic market developments. Cross-asset correlations suggest regime change implications for alternative risk premiums and factor timing strategies.");
    default:
      return baseSummary;
  }
}

function getUserLevelTLDR(userLevel: string, topic: string, baseTLDR: string): string {
  switch (userLevel) {
    case 'beginner':
      return baseTLDR + " - affects everyday spending and savings";
    case 'intermediate':
      return baseTLDR + " - impacts investment portfolio decisions";
    case 'advanced':
      return baseTLDR + " - influences systematic risk factors";
    default:
      return baseTLDR;
  }
}

// Build two-paragraph recap from Finnhub articles (distinct source from Polygon)
async function buildMarketRecap(userLevel: string, finnhubKey: string, headlinesForContext: ProcessedHeadline[]): Promise<MarketRecap> {
  try {
    const finnhubArticles = await fetchFinnhubNews(finnhubKey);
    const recent = finnhubArticles.slice(0, 30);
    const processed = processNewsArticles(recent, userLevel);
    // Use processed Finnhub items for recap; fall back to polygon headlines if needed
    const basis = processed.length > 0 ? processed : headlinesForContext;
    const recap = recapFromHeadlines(basis, userLevel);
    return recap;
  } catch (_) {
    // If Finnhub fails, summarize from polygon headlines to keep distinct content
    return recapFromHeadlines(headlinesForContext, userLevel);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate request method
    if (req.method !== 'GET' && req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user level from request
    let userLevel = 'beginner';
    let debug = false;
    try {
      const requestData = await req.json();
      
      // Validate userLevel if provided
      if (requestData.userLevel && typeof requestData.userLevel === 'string') {
        const validLevels = ['beginner', 'intermediate', 'advanced'];
        if (validLevels.includes(requestData.userLevel)) {
          userLevel = requestData.userLevel;
        }
      }
      
      debug = Boolean(requestData.debug);
    } catch {
      userLevel = 'beginner';
    }

    const perplexityKey = Deno.env.get('PERPLEXITY_API_KEY') || '';
    const polygonKey = Deno.env.get('POLYGON_API_KEY') || '';
    const finnhubKey = Deno.env.get('FINNHUB_API_KEY') || Deno.env.get('FINNHUB_APIKEY') || '';
    if (!perplexityKey) console.warn('PERPLEXITY_API_KEY missing');
    if (!polygonKey) console.warn('POLYGON_API_KEY missing');
    if (!finnhubKey) console.warn('FINNHUB_API_KEY missing');

    // Window gating
    const { tag, shouldRefresh } = currentWindowTag();
    if (!shouldRefresh && cachedContent && lastWindowTag === tag) {
      return new Response(JSON.stringify(cachedContent), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Prefer Perplexity when configured
    if (perplexityKey) {
      try {
        const response = await buildWithPerplexity(userLevel, perplexityKey);
        cachedContent = response;
        lastWindowTag = tag;
        return new Response(JSON.stringify(response), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      } catch (err) {
        console.error('Perplexity generation failed:', err);
        if (debug) {
          const fallbackHeadlines = getFallbackHeadlines();
          const fallbackRecap = recapFromHeadlines(fallbackHeadlines, userLevel);
          return new Response(
            JSON.stringify({
              headlines: fallbackHeadlines,
              marketRecap: fallbackRecap,
              lastUpdated: new Date().toISOString(),
              error: 'Perplexity failed',
              debug: {
                hasPerplexityKey: Boolean(perplexityKey),
                hasPolygonKey: Boolean(polygonKey),
                hasFinnhubKey: Boolean(finnhubKey),
                windowTag: tag,
                message: (err as Error)?.message || 'unknown'
              }
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }

    // Fallback to legacy Polygon + Finnhub path
    console.log('Perplexity not configured, falling back to Polygon + Finnhub...');
    const headlines = polygonKey ? await buildLiveHeadlines(userLevel, polygonKey) : [];
    const recap = await buildMarketRecap(userLevel, finnhubKey, headlines);

    const response: HeadlinesResponse = {
      headlines,
      marketRecap: recap,
      lastUpdated: new Date().toISOString()
    };

    cachedContent = response;
    lastWindowTag = tag;

    return new Response(JSON.stringify(response), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (error) {
    console.error('Error generating headlines:', error)
    
    // Return fallback data derived from local fallback headlines
    const fallbackHeadlines = getFallbackHeadlines();
    const fallbackRecap = recapFromHeadlines(fallbackHeadlines, 'beginner');

    const fallbackResponse: HeadlinesResponse = {
      headlines: fallbackHeadlines,
      marketRecap: fallbackRecap,
      lastUpdated: new Date().toISOString(),
      error: 'Using generated data'
    };

    return new Response(
      JSON.stringify(fallbackResponse),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
