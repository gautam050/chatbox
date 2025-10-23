import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig(({ mode }) => {
  // Load env vars so we can inject the API key into proxied requests in dev
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.VITE_GEMINI_API_KEY

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy any /api/generate/* request to the Google Generative Language API
        '/api/generate': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/generate/, '/v1beta'),
          // configure gives access to the underlying http-proxy instance
          configure: (proxy) => {
            if (!apiKey) return
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Add Authorization header from env to the proxied request
              try {
                proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
              } catch (e) {
                // ignore
              }
            })
          }
        },
      },
    },
  }
})
