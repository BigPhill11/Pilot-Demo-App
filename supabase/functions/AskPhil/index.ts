import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Use POST" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Auth: Extract and verify user from JWT ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Create client with user's JWT to verify identity
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      console.error("Auth error:", userError?.message);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Quota check via service role ---
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: quotaResult, error: quotaError } = await supabaseAdmin.rpc(
      "ask_phil_try_consume",
      { p_user_id: user.id }
    );

    if (quotaError) {
      console.error("Quota RPC error:", quotaError.message);
      return new Response(JSON.stringify({ error: "Quota check failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const quota = quotaResult as { allowed: boolean; used: number; limit: number; remaining: number };

    if (!quota.allowed) {
      return new Response(
        JSON.stringify({
          error: "Daily limit reached",
          quota: { used: quota.used, limit: quota.limit, remaining: quota.remaining },
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // --- Parse request body ---
    const body = await req.json().catch(() => ({}));
    const message = String(body?.message ?? "").trim();
    const userLevel = String(body?.userLevel ?? "intermediate").trim();

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- LLM provider selection ---
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    const foundryKey = Deno.env.get("MICROSOFT_FOUNDRY_API_KEY");
    const foundryEndpoint = Deno.env.get("MICROSOFT_FOUNDRY_ENDPOINT");

    let llmUrl: string;
    let llmHeaders: Record<string, string>;
    let useOpenAI = false;

    if (openaiKey) {
      llmUrl = "https://api.openai.com/v1/chat/completions";
      llmHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      };
      useOpenAI = true;
    } else if (foundryKey && foundryEndpoint) {
      llmUrl = `${foundryEndpoint}/chat/completions?api-version=2024-05-01-preview`;
      llmHeaders = {
        "Content-Type": "application/json",
        "api-key": foundryKey,
      };
    } else {
      console.error("No LLM API key configured");
      return new Response(JSON.stringify({ error: "LLM not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const styleGuides: Record<string, string> = {
      beginner:
        "Target Audience: Middle School. Use simple language, emojis, and concrete analogies (like food, gaming, or sports). Avoid jargon.",
      intermediate:
        "Target Audience: High School. Use standard language. Explain complex terms if they appear.",
      advanced:
        "Target Audience: Adult/College. Use professional financial terminology. Be concise and technical.",
    };

    const styleGuide = styleGuides[userLevel] ?? styleGuides["intermediate"];

    const system = `
You are AskPhil. Follow this internal workflow every time.

Style guide: ${styleGuide}

1) Router
- Restate the user goal in one sentence.
- Decide if live web info is needed.
- Pick the best internal topic.

2) Web plan
- If the user asks for latest, today, news, prices, deadlines, or "who is", set needs_web=true.
- If no sources are provided, keep sources empty and continue.

3) Writer
- Write the answer using the style guide above.

4) Internal Librarian
- End with Study next and list 3 study items.

Output rules
- Bold headers.
- Bullet points.
- No HTML tags.
- Return VALID JSON with keys:
  answer, needs_web, study_next, sources
`;

    const llmPayload: Record<string, unknown> = {
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
      temperature: 0.2,
      max_tokens: 700,
      response_format: { type: "json_object" },
    };

    if (useOpenAI) {
      llmPayload.model = "gpt-4o-mini";
    }

    console.log(`Calling ${useOpenAI ? "OpenAI" : "Foundry"} with message:`, message.substring(0, 50) + "...");

    const response = await fetch(llmUrl, {
      method: "POST",
      headers: llmHeaders,
      body: JSON.stringify(llmPayload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("LLM API error:", response.status, JSON.stringify(data));
      return new Response(JSON.stringify({ error: "LLM API error", details: data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No model content returned:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "No model content returned", raw: data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("LLM response received successfully");

    // Parse the JSON content and add quota info
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = { answer: content, needs_web: false, study_next: [], sources: [] };
    }

    parsed.quota = {
      used: quota.used,
      limit: quota.limit,
      remaining: quota.remaining,
    };

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error in AskPhil function:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
