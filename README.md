<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# NextMove AI — Career Intelligence Dashboard

AI-powered career decision engine that analyzes resumes, identifies skill gaps, predicts career paths, and provides coaching — powered by DeepSeek AI.

## Features

- **Resume Analysis** — Upload or paste your resume for deep AI-powered parsing
- **Skill Gap Detection** — Compare your skills against market demands
- **Career Path Prediction** — See transition feasibility and success probabilities
- **Salary Forecasting** — View upskilled compensation curves
- **AI Career Coach** — Real-time conversational career guidance
- **Learning Roadmaps** — Progressive 30/60/90 day to 12-month plans
- **Job Matching** — Find roles that match your profile
- **Interview Preparation** — Behavioral and technical question assessments

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   `npm install`
2. Set the `DEEPSEEK_API_KEY` in `.env` to your DeepSeek API key
   Get one at [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)
3. Run the app:
   `npm run dev`

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, Recharts
- **Backend:** Express.js, DeepSeek AI API (OpenAI-compatible SDK)
- **Build:** esbuild for server bundling, Vite for client
