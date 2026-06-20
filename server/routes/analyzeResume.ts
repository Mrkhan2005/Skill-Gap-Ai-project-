import { Router, Request, Response } from 'express';
import { getDeepSeekClient, classifyDeepSeekError, DEEPSEEK_MODELS } from '../services/deepseekClient';
import { RESUME_SCHEMA_PROMPT } from '../schemas/resumeSchemaPrompt';

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

  const ai = getDeepSeekClient();

  if (!ai) {
    return res.status(503).json({
      error: 'DeepSeek API not configured',
      message: 'AI analysis is not available because no DEEPSEEK_API_KEY is configured. Please add your API key to the .env file, or use the demo profiles below.',
      code: 'api_key_missing'
    });
  }

  try {
    const prompt = `
      You are a World-class Career Consultant, HR Director, Workforce Economist, Recruiter and Learning Strategist.
      Analyze the attached resume and details. Generate a comprehensive, highly accurate career intelligence and alignment profile.
      The output must correspond EXACTLY to the JSON schema provided below.
    `;

    const schemaPrompt = `${RESUME_SCHEMA_PROMPT}\n\n${prompt}`;

    let userContent: string;
    if (fileData && fileData.data && fileData.mimeType) {
      // For uploaded files, include metadata since DeepSeek doesn't support inline file data like Gemini
      const fileDescription = `[File uploaded: ${fileData.mimeType} type, ${Math.ceil((fileData.data.length * 3) / 4 / 1024)}KB]`;
      userContent = `${schemaPrompt}\n\n${fileDescription}\n\nResume Document Content (extracted text):\n"${resumeText || 'No text extracted from file. The file was uploaded directly. Please analyze based on what you can see.'}"`;
    } else {
      userContent = `${schemaPrompt}\n\nResume Document Content:\n"${resumeText}"`;
    }

    let completion;
    try {
      console.log('Sending parsing request to DeepSeek high-speed model (deepseek-v4-flash) for instant resume analysis...');
      completion = await ai.chat.completions.create({
        model: DEEPSEEK_MODELS.primary,
        messages: [
          {
            role: 'system',
            content: 'You are a World-class Career Consultant, HR Director, Workforce Economist, Recruiter and Learning Strategist. You ALWAYS respond with valid JSON only, matching the exact schema provided. No markdown, no code blocks, no explanations outside the JSON.'
          },
          {
            role: 'user',
            content: userContent
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.1,
        max_tokens: 16384,
      }, { timeout: ANALYSIS_TIMEOUT_MS });
    } catch (flashError: any) {
      // Log the fallback
      console.warn('deepseek-v4-flash failed, falling back to deepseek-v4-pro:', flashError.message);
      
      try {
        completion = await ai.chat.completions.create({
          model: DEEPSEEK_MODELS.fallback,
          messages: [
            {
              role: 'system',
              content: 'You are a World-class Career Consultant, HR Director, Workforce Economist, Recruiter and Learning Strategist. You ALWAYS respond with valid JSON only, matching the exact schema provided. No markdown, no code blocks, no explanations outside the JSON.'
            },
            {
              role: 'user',
              content: userContent
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1,
          max_tokens: 16384,
        }, { timeout: ANALYSIS_TIMEOUT_MS });
      } catch (fallbackError: any) {
        const classified = classifyDeepSeekError(fallbackError);
        return res.status(classified.statusCode).json({
          error: classified.errorType,
          message: classified.userMessage,
          code: classified.errorType,
          detail: process.env.NODE_ENV === 'development' ? fallbackError?.message : undefined
        });
      }
    }

    const generatedText = completion?.choices?.[0]?.message?.content;
    if (!generatedText) {
      return res.status(502).json({
        error: 'empty_response',
        message: 'The AI service returned an empty response. Please try again.',
        code: 'empty_response'
      });
    }

    const parsedData = JSON.parse(generatedText);
    
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
    
    const classified = classifyDeepSeekError(err);
    res.status(classified.statusCode).json({
      error: classified.errorType,
      message: classified.userMessage,
      code: classified.errorType,
      detail: process.env.NODE_ENV === 'development' ? err?.message : undefined
    });
  }
});

export default router;
