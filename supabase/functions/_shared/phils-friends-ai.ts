/** Shared AI helpers for Phil's Friends edge functions */

export async function callOpenAIJson(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 4000
): Promise<unknown> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${errText}`);
  }

  const aiResponse = await response.json();
  const content = aiResponse.choices?.[0]?.message?.content ?? '';
  const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleaned);
}

export async function transcribeWithWhisper(
  apiKey: string,
  audioBlob: Blob,
  filename = 'audio.mp4'
): Promise<{ text: string; segments?: { start: number; end: number; text: string }[] }> {
  const form = new FormData();
  form.append('file', audioBlob, filename);
  form.append('model', 'whisper-1');
  form.append('response_format', 'verbose_json');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Whisper API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  return {
    text: data.text ?? '',
    segments: data.segments,
  };
}

export interface SuggestedClip {
  start_time: number;
  end_time: number;
  title: string;
  description: string;
  clip_type?: string;
}

export interface SuggestedQuiz {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export async function suggestClipsFromTranscript(
  apiKey: string,
  transcript: string,
  durationSec?: number
): Promise<SuggestedClip[]> {
  const durationHint = durationSec
    ? `Total video duration is about ${durationSec} seconds.`
    : 'Estimate timestamps from speech pace (~150 words/min).';

  const prompt = `Analyze this interview transcript for a teen finance education app.
Create 6-10 short clips with natural topic breaks. Each clip should target about 60 seconds,
with a hard acceptable range of 45-90 seconds unless the transcript is too short.
${durationHint}

Return JSON array only. Each item:
- start_time (seconds)
- end_time (seconds)
- title (max 60 chars, teen-friendly hook)
- description (max 200 chars, one-line takeaway)
- clip_type: "question" | "response" | "insight" | "general"

Prioritize moments that can stand alone as a vertical reel: clear setup, one useful idea,
and a satisfying endpoint. Avoid tiny fragments, duplicate ideas, or clips that end mid-thought.

Transcript:
${transcript.slice(0, 45000)}`;

  const result = await callOpenAIJson(
    apiKey,
    'Return only valid JSON array. No markdown.',
    prompt,
    4000
  );

  return Array.isArray(result) ? (result as SuggestedClip[]) : [];
}

export async function suggestQuizForClip(
  apiKey: string,
  clipTitle: string,
  clipExcerpt: string,
  transcriptSnippet: string
): Promise<SuggestedQuiz | null> {
  const prompt = `Create ONE multiple-choice comprehension question for teens (9th grade reading level) after watching this clip.

Clip title: ${clipTitle}
Clip summary: ${clipExcerpt}
Context: ${transcriptSnippet.slice(0, 2000)}

Return JSON only:
{
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correct_index": 0,
  "explanation": "one sentence max 25 words"
}

Distractors must be plausible-wrong, not silly.`;

  try {
    const result = await callOpenAIJson(
      apiKey,
      'Return only valid JSON object. No markdown.',
      prompt,
      800
    ) as SuggestedQuiz;
    if (
      result?.question &&
      Array.isArray(result.options) &&
      result.options.length >= 2 &&
      typeof result.correct_index === 'number'
    ) {
      return result;
    }
  } catch (e) {
    console.error('Quiz generation failed:', e);
  }
  return null;
}
