import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const CONTENT_CATALOG = `
PHILSFINANCIALS IN-APP CONTENT CATALOG (use exact ids and paths when returning related_modules):

PERSONAL FINANCE MODULES (path: /learn?tab=personal-finance):
- id "income": active vs passive income, paychecks, deductions, taxes withheld, side hustles, W-2, direct deposit
- id "financial-planning": financial goals, budgeting, wants vs needs, time horizons, net worth tracking
- id "saving": emergency funds, savings targets, automated savings, opportunity cost, savings rate
- id "investing": stocks, bonds, ETFs, mutual funds, index funds, Roth IRA, 401k, compound interest, dividends, risk tolerance, diversification, long-term investing, brokerage accounts
- id "insurance": life insurance, health insurance, auto insurance, renters insurance, fraud prevention, identity theft, digital security, liability protection
- id "taxes": how taxes work, W-2 vs 1099, income tax brackets, deductions, credits, HSA, FSA, tax-advantaged accounts, tax planning, filing taxes
- id "credit-debt": credit scores, FICO score, credit reports, types of debt (student loans, credit cards, mortgages), interest rates, APR, debt payoff strategies (avalanche/snowball), building credit
- id "career-income": career as an investment, salary negotiation, market value, high-income skills, certifications, multiple income streams, freelancing
- id "wealth-fundamentals": building wealth, net worth, compounding returns, risk management across life stages, financial independence

MARKET INTELLIGENCE (path: /learn?tab=companies):
- id "business-foundations": how businesses work, revenue, costs, profit margins, business models, unit economics
- id "language-finance": income statements, balance sheets, cash flow statements, financial ratios, EPS, P/E ratio, reading annual reports
- id "markets-headlines": stock market news, economic indicators, Fed interest rates, market trends, bull/bear markets
- id "business-economics": microeconomics, macroeconomics, supply and demand, inflation, GDP, monetary policy, fiscal policy
- id "ownership": equity, business structures, starting a business, entrepreneurship, ownership mindset, valuation

CAREER READINESS MODULES (path: /career, except interviewing uses path /career/interviewing):
- id "interviewing" path /career/interviewing: interview preparation, STAR method, behavioral questions, first impressions, salary negotiation, job offers
- id "email-etiquette" path /career: professional email writing, business communication, subject lines, tone, follow-ups
- id "business-etiquette" path /career: professional dress, workplace behavior, meetings, introductions, office culture
- id "networking" path /career: building professional connections, LinkedIn, informational interviews, networking events, elevator pitch
- id "professional-habits" path /career: time management, productivity, workplace relationships, accountability, goal setting
- id "personal-brand" path /career: online presence, personal branding, LinkedIn optimization, reputation management, thought leadership
- id "resume-builder" path /career/resume: interactive resume builder, bullet writing, work experience, leadership, education, AI resume feedback

SOFT SKILLS COURSES (path: /soft-skills):
- id "interviewing": advanced interview strategies, mastering the interview, behavioral questions, industry-specific preparation
- id "networking": strategic networking, relationship building, follow-up etiquette, professional connections
- id "professional_communication": presentations, public speaking, written communication, active listening, business communication
- id "diversity_inclusion": Black professionals navigating corporate America, Working Women Excellence, career advancement, inclusion, mentorship
- id "workplace_etiquette": professionalism, workplace boundaries, conflict resolution, team dynamics, difficult conversations
- id "business_attire": professional image, dress for success, business casual vs business formal, industry dress codes

PHIL'S FRIENDS - real finance professional videos (path: /phils-friends):
- personal finance: /phils-friends?category=personal-finance
- market intelligence: /phils-friends?category=market-intelligence
- careers in finance: /phils-friends?category=careers-in-finance
- soft skills: /phils-friends?category=soft-skills
`;

const styleGuides: Record<string, string> = {
  basic:
    "You are explaining to a middle schooler with no finance background.\nRules:\n- Start with a single clear definition sentence (no jargon).\n- Use ONE short real-world analogy to illustrate it.\n- Give 2-3 bullet points of key things to know.\n- Keep the total response under 150 words.\n- Use friendly language. One or two emojis are fine.\n- Do NOT use ** or * or any markdown symbols. Use plain text only.\n- Use bullet points with the character: *",

  normal:
    "You are explaining to a high school student or general adult.\nRules:\n- Start with a clear, complete definition.\n- Explain how it works in practice.\n- Give 3-4 bullet points covering key facts, benefits, or risks.\n- You may include one brief analogy if it genuinely helps.\n- Keep the total response under 220 words.\n- Do NOT use ** or * or any markdown symbols. Use plain text only.\n- Use bullet points with the character: *",

  advanced:
    "You are explaining to a college finance student or young professional who wants real depth.\nRules:\n- Start with exactly ONE definition sentence that is precise and complete.\n- Then give exactly 4 bullet points covering mechanics, risk, valuation, and real-world context.\n- End with one short Key insight: line giving a practical takeaway.\n- Keep each bullet to 1-2 sentences max. Total response under 280 words.\n- Do NOT use ** or * or any markdown symbols. Use plain text only.\n- Use bullet points with the character: * and end with Key insight:",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message = String(body?.message ?? "").trim();
    const userLevel = String(body?.userLevel ?? "normal").trim();

    if (!message) {
      return json({ error: "Missing message" }, 400);
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      return json({ error: "GEMINI_API_KEY not set" }, 500);
    }

    const style = styleGuides[userLevel] ?? styleGuides["normal"];

    const systemPrompt =
      "You are Phil, a finance tutor AI for the PhilsFinancials learning app. " +
      style +
      "\n\nAfter answering, identify 1-3 specific modules from the PhilsFinancials content catalog below that DIRECTLY cover what the user asked about. These appear as Learn More callout links in the app, so only include modules genuinely relevant to the question.\n\n" +
      CONTENT_CATALOG +
      '\n\nReturn ONLY valid JSON with exactly these keys:\n- "answer": your full plain-text response (no markdown symbols)\n- "needs_web": boolean, true only if the question needs live prices or today\'s news\n- "study_next": array of exactly 3 short topic strings to study next\n- "sources": array of source name strings (empty array if none)\n- "related_modules": array of 0-3 objects for modules DIRECTLY relevant to the question, each with:\n  - "id": exact module id from the catalog (e.g. "investing")\n  - "title": human-readable title (e.g. "Investing")\n  - "path": the path listed for that specific id in the catalog — use it exactly as written (e.g. "/learn?tab=personal-finance", "/career/interviewing", "/career", "/soft-skills")\n  - "reason": one short phrase max 8 words explaining relevance\n\nOnly include related_modules that genuinely match. Empty array is fine.';

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + geminiKey,
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.3,
          max_tokens: 1400,
          response_format: { type: "json_object" },
        }),
      }
    );

    const geminiData = await geminiRes.json().catch(() => ({}));

    if (!geminiRes.ok) {
      console.error("Gemini error:", JSON.stringify(geminiData));
      return json(
        { error: "Gemini error: " + (geminiData?.error?.message ?? geminiRes.status) },
        502
      );
    }

    const content = geminiData?.choices?.[0]?.message?.content ?? "";

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch (_) {
      parsed = { answer: content, needs_web: false, study_next: [], sources: [], related_modules: [] };
    }

    if (!Array.isArray(parsed.related_modules)) {
      parsed.related_modules = [];
    }

    return json(parsed);
  } catch (err) {
    console.error("AskPhil error:", err);
    return json({ error: String(err) }, 500);
  }
});
