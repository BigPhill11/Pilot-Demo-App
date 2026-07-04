import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Always respond 200 with a JSON body. The app calls this via
// supabase.functions.invoke(), which collapses ANY non-2xx into an opaque
// "Edge Function returned a non-2xx status code" error and drops the body.
// Returning 200 with { error } lets the client read and show a real message.
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Pass thresholds per persona tier. Must stay in sync with
// TEACH_BACK_PASS_THRESHOLDS in src/types/teach-back.ts.
const PASS_THRESHOLDS: Record<string, number> = {
  cub: 70,
  teen: 75,
  elder: 80,
};

const MAX_TURNS = 5;
const MAX_ATTEMPTS = 2;
const MAX_MESSAGE_CHARS = 2000;
const MAX_HISTORY_ENTRIES = 2 * MAX_TURNS * MAX_ATTEMPTS;

// Persona style guides. Same tiering logic as Ask Phil's
// basic/normal/advanced style guides, recast for a Phil who is being
// TAUGHT rather than teaching: cub ↔ basic, teen ↔ normal, elder ↔ advanced.
const personaGuides: Record<string, string> = {
  cub:
    "You are CUB PHIL, a young panda cub (like a curious middle schooler with no finance background).\n" +
    "Rules for judging the explanation:\n" +
    "- You need a pure ELI5 explanation. Jargon does not count as explaining.\n" +
    "- If the student uses a technical term (like \"compound interest\" or \"APR\") without saying what it means in plain words, ask \"wait, what does that word mean though?\"\n" +
    "- You are satisfied by simple, correct, jargon-free explanations. Do not demand numbers or edge cases.\n" +
    "Rules for your replies: keep them under 60 words, super friendly, one emoji is fine, plain text only (no markdown symbols).",

  teen:
    "You are TEEN PHIL, a teenage panda (like a high school student who gets the basics).\n" +
    "Rules for judging the explanation:\n" +
    "- You need the concept explained correctly AND a real-world example or analogy.\n" +
    "- If they explain the idea but give no example, ask something like \"okay but can you show me an example of that with real numbers?\"\n" +
    "- Simple definitions alone are not enough for you, but you do not demand edge cases.\n" +
    "Rules for your replies: keep them under 80 words, casual and curious, plain text only (no markdown symbols).",

  elder:
    "You are ELDER PHIL, a wise old panda who is rusty on this topic (like a college finance student wanting real depth).\n" +
    "Rules for judging the explanation:\n" +
    "- You need the concept explained correctly, with substance, AND you push on edge cases and what-if scenarios.\n" +
    "- Ask questions like \"what if interest rates went negative — would this still work the same way?\" or probe a limit of the idea.\n" +
    "- Only be satisfied once they have handled at least one of your what-if probes well.\n" +
    "Rules for your replies: keep them under 80 words, warm and thoughtful, plain text only (no markdown symbols).",
};

const clampInt = (value: unknown, min: number, max: number, fallback: number) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message = String(body?.message ?? "").trim().slice(0, MAX_MESSAGE_CHARS);
    const lessonId = String(body?.lessonId ?? "").trim().slice(0, 200);
    const conceptName = String(body?.conceptName ?? "").trim().slice(0, 200);
    const philAge = String(body?.philAge ?? "teen").trim();
    const turnNumber = clampInt(body?.turnNumber, 1, MAX_TURNS, 1);
    const attempt = clampInt(body?.attempt, 1, MAX_ATTEMPTS, 1);
    // True if any earlier turn this session was flagged as copied text —
    // the session log records whether it EVER happened, and this function
    // is stateless across turns.
    const flaggedEarlier = body?.flaggedEarlier === true;

    const keyFacts: string[] = (Array.isArray(body?.keyFacts) ? body.keyFacts : [])
      .map((f: unknown) => String(f).slice(0, 300))
      .filter((f: string) => f.trim().length > 0)
      .slice(0, 6);
    const misconceptions: string[] = (Array.isArray(body?.misconceptions) ? body.misconceptions : [])
      .map((m: unknown) => String(m).slice(0, 300))
      .filter((m: string) => m.trim().length > 0)
      .slice(0, 4);
    const history = (Array.isArray(body?.history) ? body.history : [])
      .slice(-MAX_HISTORY_ENTRIES)
      .map((h: { role?: unknown; content?: unknown }) => ({
        role: h?.role === "phil" ? "assistant" : "user",
        content: String(h?.content ?? "").slice(0, MAX_MESSAGE_CHARS),
      }))
      .filter((h: { content: string }) => h.content.trim().length > 0);

    if (!message) {
      return json({ error: "Missing message" });
    }
    if (!lessonId || !conceptName || keyFacts.length === 0) {
      return json({ error: "Missing lesson concept spec" });
    }
    if (!(philAge in personaGuides)) {
      return json({ error: "Unknown Phil persona" });
    }

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      return json({ error: "Phil is temporarily unavailable. Please try again later." });
    }

    // ── Identify the user + best-effort daily turn quota ───────────────────
    // The gateway (verify_jwt) already requires a valid token to reach here.
    // Teach Phil is a REQUIRED lesson step, so the quota is a generous abuse
    // backstop and any problem checking it FAILS OPEN. The user id (when
    // available) is also needed to record finished sessions.
    let userId: string | null = null;
    let serviceClient: ReturnType<typeof createClient> | null = null;
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
      const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      const authHeader = req.headers.get("Authorization") ?? "";

      if (authHeader && supabaseUrl && anonKey && serviceKey) {
        const userClient = createClient(supabaseUrl, anonKey, {
          global: { headers: { Authorization: authHeader } },
        });
        const { data: { user } } = await userClient.auth.getUser();

        if (user) {
          userId = user.id;
          serviceClient = createClient(supabaseUrl, serviceKey);
          const { data: quota, error: quotaError } = await serviceClient.rpc(
            "teach_phil_try_consume",
            { p_user_id: user.id },
          );
          if (!quotaError && quota && quota.allowed === false) {
            return json({
              error:
                "Phil is all tuckered out from learning today! Come back tomorrow to keep teaching him.",
              limitReached: true,
              quota,
            });
          }
        }
      }
    } catch (quotaErr) {
      // Fail open — never block a required lesson step on a setup problem.
      console.error("TeachPhil quota check skipped:", quotaErr);
    }

    const passThreshold = PASS_THRESHOLDS[philAge];
    const persona = personaGuides[philAge];

    const systemPrompt =
      "You are Phil the Panda from the PhilsFinancials learning app, playing the role of a curious student. " +
      "The real student just finished a lesson and must now teach YOU this concept: " +
      conceptName +
      ".\n\n" +
      persona +
      "\n\nYour job every turn:\n" +
      "1. Read what the student just explained (the full conversation so far counts toward their understanding).\n" +
      "2. Compare it against this list of key facts a complete explanation should cover:\n" +
      keyFacts.map((f, i) => `   ${i + 1}. ${f}`).join("\n") +
      (misconceptions.length > 0
        ? "\n3. Watch for these common misconceptions:\n" +
          misconceptions.map((m, i) => `   ${i + 1}. ${m}`).join("\n")
        : "\n3. Watch for explanations that are subtly wrong, not just incomplete.") +
      "\n4. Decide if their explanation covers the key facts well enough for your persona tier.\n" +
      "5. Respond ONLY in character as Phil — curious, warm, a little playful, never condescending.\n" +
      "   - If something is missing or wrong, ask a genuine follow-up question that would naturally surface that gap (do NOT just say \"you're missing X\" — ASK about it).\n" +
      "   - If they've covered everything for this persona tier, express genuine understanding and enthusiasm, and do NOT ask another question.\n" +
      "6. Also output a hidden structured assessment (JSON below) that the student never sees — it drives the understanding meter and pass gate.\n\n" +
      "ANTI-GAMING RULES:\n" +
      "- If the student's explanation is a copy-pasted chunk of textbook/lesson text (formal tone, no personal phrasing, doesn't sound like a student explaining to a friend), do NOT accept it. Playfully call it out in character (\"Hmm, that sounds like it's straight from the lesson! Can you say it in your own words? Pretend you're just talking to me, your friend.\"), set flagged_as_copied_text to true, and do NOT increase the understanding score.\n" +
      "- If the explanation is a single vague sentence with no real content (\"it just grows\"), treat that as low understanding and ask a clarifying question. Do not accept it.\n" +
      "- Do NOT increase the understanding score for confidence or tone alone — only for substantive, accurate, original-phrasing content that addresses the key facts.\n\n" +
      "SCORING:\n" +
      "- understanding_score is your assessment of the student's OVERALL demonstrated understanding across the whole conversation so far, 0-100.\n" +
      "- The pass threshold for your persona tier is " + passThreshold + ".\n" +
      "- ready_to_pass is true ONLY if understanding_score >= " + passThreshold + " AND there is no unresolved misconception AND this turn was not flagged as copied text.\n\n" +
      "Respond with ONLY valid JSON with exactly these keys and nothing else:\n" +
      "{\n" +
      '  "phil_says": "<Phil\'s in-character chat message to show the student>",\n' +
      '  "understanding_score": <integer 0-100>,\n' +
      '  "key_facts_covered": ["<fact from the list, as written>", "..."],\n' +
      '  "key_facts_missing": ["<fact from the list, as written>", "..."],\n' +
      '  "misconception_detected": <true or false>,\n' +
      '  "flagged_as_copied_text": <true or false>,\n' +
      '  "ready_to_pass": <true or false>\n' +
      "}";

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
            ...history,
            { role: "user", content: message },
          ],
          temperature: 0.3,
          max_tokens: 500,
          response_format: { type: "json_object" },
        }),
      }
    );

    const geminiData = await geminiRes.json().catch(() => ({}));

    if (!geminiRes.ok) {
      console.error("TeachPhil Gemini error:", JSON.stringify(geminiData));
      return json({
        error: "Phil got distracted for a second. Please try again in a moment.",
      });
    }

    const content = geminiData?.choices?.[0]?.message?.content ?? "";

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch (_) {
      console.error("TeachPhil unparseable model output:", content.slice(0, 500));
      return json({
        error: "Phil got confused for a second. Please try again in a moment.",
      });
    }

    const understandingScore = clampInt(parsed.understanding_score, 0, 100, 0);
    const misconceptionDetected = parsed.misconception_detected === true;
    const flaggedAsCopiedText = parsed.flagged_as_copied_text === true;
    const keyFactsCovered = (Array.isArray(parsed.key_facts_covered) ? parsed.key_facts_covered : [])
      .map((f: unknown) => String(f).slice(0, 300));
    const keyFactsMissing = (Array.isArray(parsed.key_facts_missing) ? parsed.key_facts_missing : [])
      .map((f: unknown) => String(f).slice(0, 300));
    // Enforce the pass gate server-side; the model's ready_to_pass alone is
    // not trusted (it sometimes passes on vibes despite the instructions).
    const readyToPass =
      parsed.ready_to_pass === true &&
      understandingScore >= passThreshold &&
      !misconceptionDetected &&
      !flaggedAsCopiedText;

    // ── Record the session when it ends ────────────────────────────────────
    // Ends by passing, or by exhausting the final attempt's turns. Recording
    // is server-side so the pass counter can't be bumped by client writes.
    let recorded: { session_id?: string; teach_backs_completed?: number } | null = null;
    const sessionOver = readyToPass || (turnNumber >= MAX_TURNS && attempt >= MAX_ATTEMPTS);
    if (sessionOver && userId && serviceClient) {
      try {
        const { data: recordData, error: recordError } = await serviceClient.rpc(
          "teach_back_record_session",
          {
            p_user_id: userId,
            p_lesson_id: lessonId,
            p_difficulty_tier: philAge,
            p_turns_taken: turnNumber,
            p_final_understanding_score: understandingScore,
            p_key_facts_missing: keyFactsMissing,
            p_flagged_copied_text: flaggedEarlier || flaggedAsCopiedText,
            p_passed: readyToPass,
            p_used_fallback: attempt > 1,
          },
        );
        if (recordError) {
          console.error("TeachPhil session record failed:", recordError);
        } else {
          recorded = recordData ?? null;
        }
      } catch (recordErr) {
        console.error("TeachPhil session record failed:", recordErr);
      }
    }

    return json({
      philSays: String(parsed.phil_says ?? "Hmm, can you tell me more?"),
      understandingScore,
      keyFactsCovered,
      keyFactsMissing,
      misconceptionDetected,
      flaggedAsCopiedText,
      readyToPass,
      passThreshold,
      teachBacksCompleted: recorded?.teach_backs_completed ?? null,
    });
  } catch (err) {
    console.error("TeachPhil error:", err);
    return json({ error: "Phil hit an unexpected error. Please try again." });
  }
});
