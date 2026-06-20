import OpenAI from 'openai';

let client: OpenAI | null = null;

export function getDeepSeekClient(): OpenAI | null {
  return client;
}

export function initializeDeepSeekClient(apiKey: string): OpenAI {
  if (client) return client;

  client = new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com',
  });

  console.log('DeepSeek AI SDK initialized successfully.');
  return client;
}

export function isDeepSeekAvailable(): boolean {
  return client !== null;
}

/**
 * Classify API errors into user-friendly categories
 */
export function classifyDeepSeekError(error: any): {
  statusCode: number;
  errorType: string;
  userMessage: string;
} {
  const msg = error?.message?.toLowerCase() || '';

  if (msg.includes('api key') || msg.includes('unauthorized') || msg.includes('auth') || msg.includes('401')) {
    return {
      statusCode: 503,
      errorType: 'auth_error',
      userMessage: 'DeepSeek API key is invalid or unauthorized. Please check your DEEPSEEK_API_KEY in the .env file.'
    };
  }

  if (msg.includes('quota') || msg.includes('rate limit') || msg.includes('429') || msg.includes('insufficient_quota')) {
    return {
      statusCode: 429,
      errorType: 'quota_exceeded',
      userMessage: 'DeepSeek API quota exceeded. Please wait a moment before trying again, or check your API plan.'
    };
  }

  if (msg.includes('timeout') || msg.includes('deadline') || msg.includes('timed out')) {
    return {
      statusCode: 504,
      errorType: 'timeout',
      userMessage: 'The AI analysis timed out. The resume may be too large, or the service is temporarily slow. Please try again.'
    };
  }

  if (msg.includes('model') && (msg.includes('not found') || msg.includes('not exist'))) {
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
 * Available DeepSeek models (OpenAI-compatible naming)
 * - deepseek-v4-flash: High-speed model for general tasks (primary)
 * - deepseek-v4-pro: More advanced model for complex analysis (fallback)
 */
export const DEEPSEEK_MODELS = {
  primary: 'deepseek-v4-flash',
  fallback: 'deepseek-v4-pro',
} as const;
