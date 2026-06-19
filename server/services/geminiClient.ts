import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;
let lastHealthCheck = 0;
const HEALTH_CHECK_TTL = 60_000; // 1 minute

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

/**
 * Classify API errors into user-friendly categories
 */
export function classifyGeminiError(error: any): {
  statusCode: number;
  errorType: string;
  userMessage: string;
} {
  const msg = error?.message?.toLowerCase() || '';
  
  if (msg.includes('api key') || msg.includes('unauthorized') || msg.includes('auth')) {
    return {
      statusCode: 503,
      errorType: 'auth_error',
      userMessage: 'Gemini API key is invalid or unauthorized. Please check your GEMINI_API_KEY in the .env file.'
    };
  }
  
  if (msg.includes('quota') || msg.includes('rate limit') || msg.includes('429')) {
    return {
      statusCode: 429,
      errorType: 'quota_exceeded',
      userMessage: 'Gemini API quota exceeded. Please wait a moment before trying again, or upgrade your API plan.'
    };
  }
  
  if (msg.includes('timeout') || msg.includes('deadline') || msg.includes('timed out')) {
    return {
      statusCode: 504,
      errorType: 'timeout',
      userMessage: 'The AI analysis timed out. The resume may be too large, or the service is temporarily slow. Please try again.'
    };
  }
  
  if (msg.includes('not found') || msg.includes('model') && msg.includes('not')) {
    return {
      statusCode: 404,
      errorType: 'model_unavailable',
      userMessage: 'The requested AI model is not available. The system will attempt to use an alternative model.'
    };
  }

  if (msg.includes('internal') || msg.includes('server error') || msg.includes('500')) {
    return {
      statusCode: 500,
      errorType: 'server_error',
      userMessage: 'The AI service encountered an internal error. Please try again shortly.'
    };
  }

  return {
    statusCode: 500,
    errorType: 'unknown',
    userMessage: 'An unexpected error occurred during AI analysis. Please try again.'
  };
}

/**
 * Create an abort signal that times out after a given duration
 */
export function createTimeoutSignal(timeoutMs: number = 60000): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller;
}
