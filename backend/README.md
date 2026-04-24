# Backend: LLM Message Generator

This is a minimal Node.js + Express backend for a Qualtrics survey.

It accepts participant survey fields, calls OpenAI on the server (using an environment variable), and returns:

```json
{ "llm_reply": "..." }
```

## Why this is secure

- The OpenAI API key is only used on the backend.
- Qualtrics JavaScript calls your backend endpoint.
- The API key is never placed in Qualtrics code.

## Endpoints

- `GET /health` -> `{ "status": "ok" }`
- `POST /generate-message` -> `{ "llm_reply": "..." }`

## Expected POST JSON fields

- `sleep_hours`
- `sleep_quality`
- `exercise_days`
- `fruitveg`
- `stress`
- `goal`
- `barrier`
- `preferred_workout_time`
- `user_free_text`

## Local setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Edit `.env` and add your real API key:

```env
OPENAI_API_KEY=YOUR_REAL_KEY
OPENAI_MODEL=gpt-4o-mini
PORT=3000
```

4. Start server:

```bash
npm start
```

5. Health check:

```bash
curl http://localhost:3000/health
```

6. Test generation:

```bash
curl -X POST http://localhost:3000/generate-message \
  -H "Content-Type: application/json" \
  -d '{
    "sleep_hours":"6-7",
    "sleep_quality":"3",
    "exercise_days":"1-2",
    "fruitveg":"1-2 servings",
    "stress":"4",
    "goal":"Build consistency",
    "barrier":"Busy class schedule",
    "preferred_workout_time":"Evening",
    "user_free_text":"I do better with short plans."
  }'
```

## Deployment notes (Render or Railway)

### Render

1. Push repo to GitHub.
2. Create a new Web Service in Render and point to this repo.
3. Set Root Directory to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable `OPENAI_API_KEY`.
7. (Optional) Add `OPENAI_MODEL` and `PORT` (Render usually provides `PORT` automatically).

### Railway

1. Create a new project from your GitHub repo.
2. Set service root to `backend` if needed.
3. Add environment variable `OPENAI_API_KEY`.
4. Deploy (Railway will run `npm start`).
5. Copy the generated public URL and use it in Qualtrics JavaScript.

## Notes

- Message generation is capped at 90 words in `server.js`.
- Prompt includes safety constraints (no diagnosis/medical advice/extreme recommendations).
