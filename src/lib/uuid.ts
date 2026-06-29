/**
 * crypto.randomUUID() is only available in iOS Safari / WKWebView 15.4+.
 * The app targets iOS 14, so calling it directly crashes the Resume Builder
 * and Investor Profile on older devices. This helper uses the native API when
 * present and falls back to a spec-compliant v4 UUID otherwise.
 */
export function safeRandomUUID(): string {
  const c = (globalThis as { crypto?: Crypto }).crypto;

  if (c && typeof c.randomUUID === 'function') {
    return c.randomUUID();
  }

  // Fallback: build a v4 UUID from crypto.getRandomValues when available,
  // otherwise Math.random (last resort — ids here are local-only, not security tokens).
  const bytes = new Uint8Array(16);
  if (c && typeof c.getRandomValues === 'function') {
    c.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }

  // Per RFC 4122 §4.4: set version (4) and variant (10xx) bits.
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex
    .slice(6, 8)
    .join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
}
