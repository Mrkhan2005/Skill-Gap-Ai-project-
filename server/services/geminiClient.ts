import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  return ai;
}

export function initializeGeminiClient(apiKey: string): GoogleGenAI {
  if (ai) return ai;

  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  console.log('Gemini AI SDK initialized successfully with server security.');
  return ai;
}

export function isGeminiAvailable(): boolean {
  return ai !== null;
}
