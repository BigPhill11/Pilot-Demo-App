/**
 * Lightweight pub/sub for daily goal auto-completion.
 * Emit from learning activities; useDailyGoals subscribes.
 */

export type DailyGoalEvent =
  | { type: 'lesson'; pathId: string; moduleId?: string; lessonId?: string }
  | { type: 'module'; pathId: string; moduleId: string }
  | { type: 'flashcards'; count: number }
  | { type: 'tinder_challenge'; challengeId: string }
  | { type: 'evaluation'; moduleNumber: number }
  | { type: 'any_activity' };

type Listener = (event: DailyGoalEvent) => void;

const listeners = new Set<Listener>();

export function subscribeDailyGoalEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitDailyGoalEvent(event: DailyGoalEvent): void {
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch (e) {
      console.error('Daily goal event listener error:', e);
    }
  });
}
