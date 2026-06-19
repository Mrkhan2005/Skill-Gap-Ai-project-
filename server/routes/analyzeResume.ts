import { Router, Request, Response } from 'express';
import { getGeminiClient, classifyGeminiError, createTimeoutSignal } from '../services/geminiClient';
import { resumeSchema } from '../schemas/resumeSchema';

const router = Router();
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ANALYSIS_TIMEOUT_MS = 90_000; // 90 seconds

router.post('/api/analyze-resume', async (req: Request, res: Response) => {
  const { resumeText, resumeName, fileData } = req.body;

  // --- Input Validation ---
  if (!resumeText && !fileData) {
    return res.status(400).json({ 
      error: 'No resume content provided',
      message: 'Please upload a resume file or paste your resume text for analysis.',
      code: 'missing_input'
    });
  }

  if (fileData?.data && typeof fileData.data === 'string') {
    const sizeBytes = Math.ceil((fileData.data.length * 3) / 4);
    if (sizeBytes > MAX_FILE_SIZE_BYTES) {
      return res.status(413).json({
        error: 'File too large',
        message: `Resume file exceeds the maximum size of ${Math.round(MAX_FILE_SIZE_BYTES / 1024 / 1024)}MB. Please upload a smaller file.`,
        code: 'file_too_large'
      });
    }
  }

  if (resumeText && resumeText.trim().length < 50) {
    return res.status(400).json({
      error: 'Resume text too short',
      message: 'Please provide a more detailed resume summary (at least 50 characters) including skills, experience, and projects.',
      code: 'text_too_short'
    });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API not configured',
      message: 'AI analysis is not available because no GEMINI_API_KEY is configured. Please add your API key to the .env file, or use the demo profiles below.',
      code: 'api_key_missing'
    });
  }

  const timeoutController = createTimeoutSignal(ANALYSIS_TIMEOUT_MS);

  try {
    const prompt = `
      You are a World-class Career Consultant, HR Director, Workforce Economist, Recruiter and Learning Strategist.
      Analyze the attached resume and details. Generate a comprehensive, highly accurate career intelligence and alignment profile.
      The output must correspond EXACTLY to the JSON schema provided below.
    `;

    let contents: any;
    if (fileData && fileData.data && fileData.mimeType) {
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: fileData.mimeType,
              data: fileData.data
            }
          },
          {
            text: prompt
          }
        ]
      };
    } else {
      contents = `
        ${prompt}
        
        Resume Document Content:
        "${resumeText}"
      `;
    }

    let response;
    try {
      console.log('Sending parsing request to Gemini high-speed model (gemini-3.5-flash) for instant resume analysis...');
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema: resumeSchema,
        }
      });
    } catch (flashError: any) {
      // Log the fallback
      console.warn('gemini-3.5-flash failed or not accessible, falling back to gemini-3.1-pro-preview:', flashError.message);
      
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-pro-preview',
          contents: contents,
          config: {
            responseMimeType: 'application/json',
            responseSchema: resumeSchema,
          }
        });
      } catch (fallbackError: any) {
        const classified = classifyGeminiError(fallbackError);
        return res.status(classified.statusCode).json({
          error: classified.errorType,
          message: classified.userMessage,
          code: classified.errorType,
          detail: process.env.NODE_ENV === 'development' ? fallbackError?.message : undefined
        });
      }
    }

    if (!response?.text) {
      return res.status(502).json({
        error: 'empty_response',
        message: 'The AI service returned an empty response. Please try again.',
        code: 'empty_response'
      });
    }

    const parsedData = JSON.parse(response.text);
    
    // Validate the response has the expected structure
    if (!parsedData.profile || !parsedData.scores) {
      throw new Error('AI response missing required fields (profile, scores)');
    }

    // Remap alphanumeric schema property keys to display formatting keys
    if (parsedData && parsedData.predictions) {
      if (parsedData.predictions.ai_engineer) {
        parsedData.predictions["AI Engineer"] = parsedData.predictions.ai_engineer;
        delete parsedData.predictions.ai_engineer;
      }
      if (parsedData.predictions.data_analyst) {
        parsedData.predictions["Data Analyst"] = parsedData.predictions.data_analyst;
        delete parsedData.predictions.data_analyst;
      }
      if (parsedData.predictions.product_manager) {
        parsedData.predictions["Product Manager"] = parsedData.predictions.product_manager;
        delete parsedData.predictions.product_manager;
      }
    }
    res.json(parsedData);
  } catch (err: any) {
    console.error('Error in resume analysis endpoint:', err);
    
    const classified = classifyGeminiError(err);
    res.status(classified.statusCode).json({
      error: classified.errorType,
      message: classified.userMessage,
      code: classified.errorType,
      detail: process.env.NODE_ENV === 'development' ? err?.message : undefined
    });
  }
});

export default router;
