import { describe, expect, it } from 'vitest';
import { founderPlanHtml } from './printFounderPlan';
describe('Founder Plan printing', () => {
  it('prints nine full answers and escapes student markup', () => {
    const answers = Array.from({ length: 9 }, (_, index) => ({ title: `Block ${index}`, answer: index === 0 ? '<script>alert("test")</script>' : 'My answer' }));
    const html = founderPlanHtml(answers);
    expect(html.match(/<article>/g)).toHaveLength(9);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('A4 landscape');
    expect(html).not.toContain('Start Lesson');
  });
});
