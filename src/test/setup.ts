import { vi } from 'vitest';

// Tests exercise modules that share the browser Supabase client, but they must
// not require or embed a real project credential. These syntactically valid,
// non-routable values are available only inside Vitest.
vi.stubEnv('VITE_SUPABASE_URL', 'https://example.invalid');
vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'test-publishable-key');
