/** Lightweight client-side hints before AI check */

const WEAK_STARTERS = /^(responsible for|helped|worked on|assisted with|duties included)/i;
const HAS_NUMBER = /\d|%|\$|k\b|m\b|billion|million|thousand/i;
const STRONG_VERB =
  /^(led|managed|built|designed|analyzed|developed|created|implemented|evaluated|collaborated|oversaw|directed|launched|won|selected|classified|examined|integrated|leveraged|identified|cooperate)/i;

export function getBulletHints(text: string): string[] {
  const t = text.trim();
  const hints: string[] = [];
  if (!t) return hints;
  if (t.length < 30) hints.push('Try to add more detail — strong bullets are usually 1–2 lines.');
  if (WEAK_STARTERS.test(t)) hints.push('Start with a strong action verb instead of “Responsible for…”');
  if (!STRONG_VERB.test(t)) hints.push('Open with a past-tense verb (Led, Built, Analyzed, Won…).');
  if (!HAS_NUMBER.test(t)) hints.push('Add a number if you can: %, $, count, team size, or ranking.');
  if (/\b(i|me|my)\b/i.test(t)) hints.push('Avoid first person (I/me) — use implied “you” in bullets.');
  return hints;
}
