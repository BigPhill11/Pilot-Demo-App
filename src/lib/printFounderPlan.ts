interface PlanBlock { title: string; answer: string }
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);

export function founderPlanHtml(blocks: PlanBlock[]): string {
  return `<!doctype html><html><head><meta charset="utf-8"><title>My Founder Plan</title><style>
    @page { size: A4 landscape; margin: 12mm; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Arial, sans-serif; color: #166534; }
    h1 { margin: 0 0 4mm; font-size: 22px; }
    .plan { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
    article { border: 1px solid #16a34a; border-radius: 8px; padding: 3mm; break-inside: avoid; }
    h2 { margin: 0 0 2mm; font-size: 13px; }
    p { margin: 0; color: #111827; font-size: 11px; line-height: 1.4; white-space: pre-wrap; overflow-wrap: anywhere; }
  </style></head><body><h1>My Founder Plan</h1><div class="plan">${blocks.map((block) => `<article><h2>${escapeHtml(block.title)}</h2><p>${escapeHtml(block.answer)}</p></article>`).join('')}</div></body></html>`;
}

/** Print only the nine plan blocks, rather than the full lesson dashboard. */
export function printFounderPlan(blocks: PlanBlock[]): void {
  const frame = document.createElement('iframe');
  frame.title = 'Printable Founder Plan';
  frame.style.cssText = 'position:fixed;width:0;height:0;border:0';
  frame.onload = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    window.setTimeout(() => frame.remove(), 1000);
  };
  frame.srcdoc = founderPlanHtml(blocks);
  document.body.appendChild(frame);
}
