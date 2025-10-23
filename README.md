# Gemini Chat (React + Vite)

Minimal, original React chat widget that demonstrates:
- Context API for chat state
- Fetching responses from Google Gemini endpoint
- Local storage persistence
- Simple, clean components

## Setup
1. Copy `.env.example` to `.env.local` and set `VITE_GEMINI_API_KEY`.
2. Install dependencies:
   ```
   npm install
   ```
3. Run dev server:
   ```
   npm run dev
   ```

## Notes
- This implementation is original and written for the user (no plagiarism).
- The API call uses the `VITE_GEMINI_API_KEY` environment variable.
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/openai?model=gemini-1.5-flash`
