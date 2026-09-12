import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Tunnel hostnames used to share a local server for review. Allowed on both the
// dev server and `vite preview`: tunnelling a build is far more robust than
// tunnelling the dev server, which asks the browser to pull thousands of module
// files and hold a live-reload socket open over the same link.
const TUNNEL_HOSTS = [
  "thrasonical-noncapitalistically-andra.ngrok-free.dev",
  ".trycloudflare.com",
  ".lhr.life",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: TUNNEL_HOSTS,
  },
  // `npm run build:dev` keeps import.meta.env.DEV true, so the teacher
  // dashboard's ?preview=1 fixtures survive the build and a demo can be served
  // from dist rather than from the dev server.
  preview: {
    host: "::",
    port: 8081,
    allowedHosts: TUNNEL_HOSTS,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
}));
