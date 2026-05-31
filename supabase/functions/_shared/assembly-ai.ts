const ASSEMBLYAI_API = 'https://api.assemblyai.com/v2';

export interface AssemblyWord {
  text: string;
  start: number; // milliseconds
  end: number;   // milliseconds
  confidence: number;
}

export interface AssemblyResult {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  text?: string;
  words?: AssemblyWord[];
  audio_duration?: number; // seconds
  error?: string;
}

export async function submitTranscription(apiKey: string, audioUrl: string): Promise<string> {
  const res = await fetch(`${ASSEMBLYAI_API}/transcript`, {
    method: 'POST',
    headers: {
      authorization: apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      audio_url: audioUrl,
      // Required — ordered fallback list: tries U3 Pro first, falls back to U2
      speech_models: ['universal-3-pro', 'universal-2'],
      punctuate: true,
      format_text: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AssemblyAI submit error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.id as string;
}

export async function getTranscription(apiKey: string, transcriptId: string): Promise<AssemblyResult> {
  const res = await fetch(`${ASSEMBLYAI_API}/transcript/${transcriptId}`, {
    headers: { authorization: apiKey },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AssemblyAI fetch error ${res.status}: ${err}`);
  }

  return res.json() as Promise<AssemblyResult>;
}

/**
 * Polls until completed, errored, or maxWaitMs exceeded.
 * Returns null on timeout so the caller can save the transcript_id and retry later.
 */
export async function pollTranscription(
  apiKey: string,
  transcriptId: string,
  maxWaitMs = 110_000,
): Promise<AssemblyResult | null> {
  const deadline = Date.now() + maxWaitMs;
  const INTERVAL_MS = 5_000;

  while (Date.now() < deadline) {
    const result = await getTranscription(apiKey, transcriptId);

    if (result.status === 'completed') return result;
    if (result.status === 'error') throw new Error(`AssemblyAI error: ${result.error ?? 'unknown'}`);

    const remaining = deadline - Date.now();
    if (remaining <= INTERVAL_MS) return null;

    await new Promise((r) => setTimeout(r, INTERVAL_MS));
  }

  return null;
}

/** Convert AssemblyAI word array to the word-timestamp format stored in video_transcripts */
export function assemblyWordsToTimestamps(words: AssemblyWord[]) {
  return words.map((w) => ({
    word: w.text.replace(/[.,!?]/g, ''),
    start: w.start / 1000,
    end: w.end / 1000,
    confidence: w.confidence,
  }));
}
