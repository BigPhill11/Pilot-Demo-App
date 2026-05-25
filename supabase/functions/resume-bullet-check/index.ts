import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const MAX_BULLET_LEN = 500;
const MAX_CHECKS_PER_DAY = 40;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return json({ error: "Missing Authorization header" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user },
    error: userError,
  } = await supabaseUser.auth.getUser();

  if (userError || !user) {
    return json({ error: "Unauthorized" }, 401);
  }

  try {
    const body = await req.json().catch(() => ({}));
    const bulletText = String(body?.bulletText ?? "").trim();
    const section = String(body?.section ?? "experience").trim();
    const roleContext = String(body?.roleContext ?? "").trim().slice(0, 200);

    if (!bulletText || bulletText.length < 10) {
      return json({ error: "Bullet must be at least 10 characters" }, 400);
    }
    if (bulletText.length > MAX_BULLET_LEN) {
      return json({ error: `Bullet too long (max ${MAX_BULLET_LEN} characters)` }, 400);
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      return json({ error: "AI service not configured" }, 500);
    }

    const systemPrompt =
      "You are Phil, a career coach panda for finance-minded high school and college students. " +
      "Evaluate ONE resume bullet for quality. Be encouraging but honest. " +
      "Score criteria:\n" +
      "- actionVerb: starts with a strong past-tense action verb (not 'Responsible for' or 'Helped with')\n" +
      "- quantification: includes numbers, scale, %, $, counts, or rankings when possible\n" +
      "- clarity: one clear idea, readable, professional tone\n" +
      "- relevance: fits finance/business/internship context for the section\n" +
      "- format: proper bullet style (no first person I/me, no period at end optional)\n" +
      "storySignal: one sentence on whether the bullet tells contribution + outcome.\n\n" +
      `Section: ${section}. Role context: ${roleContext || "general student resume"}.\n\n` +
      "Return ONLY valid JSON with keys:\n" +
      '- "score": number 0-100\n' +
      '- "checks": object with boolean keys actionVerb, quantification, clarity, relevance, format\n' +
      '- "issues": string array (max 4 short items)\n' +
      '- "improvedBullet": one rewritten bullet (max 220 chars)\n' +
      '- "storySignal": one sentence string';

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
            { role: "user", content: `Resume bullet to evaluate:\n${bulletText}` },
          ],
          temperature: 0.2,
          max_tokens: 800,
          response_format: { type: "json_object" },
        }),
      }
    );

    const geminiData = await geminiRes.json().catch(() => ({}));

    if (!geminiRes.ok) {
      console.error("Gemini error:", geminiData);
      return json({ error: "AI check failed. Try again shortly." }, 502);
    }

    const content = geminiData?.choices?.[0]?.message?.content;
    if (!content) {
      return json({ error: "Empty AI response" }, 502);
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch {
      return json({ error: "Invalid AI response format" }, 502);
    }

    const checks = (parsed.checks ?? {}) as Record<string, boolean>;
    const result = {
      score: Math.min(100, Math.max(0, Number(parsed.score) || 0)),
      checks: {
        actionVerb: !!checks.actionVerb,
        quantification: !!checks.quantification,
        clarity: !!checks.clarity,
        relevance: !!checks.relevance,
        format: !!checks.format,
      },
      issues: Array.isArray(parsed.issues)
        ? (parsed.issues as string[]).slice(0, 4)
        : [],
      improvedBullet: String(parsed.improvedBullet ?? "").slice(0, 280),
      storySignal: String(parsed.storySignal ?? "").slice(0, 300),
    };

    return json(result);
  } catch (e) {
    console.error(e);
    return json({ error: "Internal error" }, 500);
  }
});
