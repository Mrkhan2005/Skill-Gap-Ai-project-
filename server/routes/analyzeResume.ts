import { Router, Request, Response } from 'express';
import { getGeminiClient } from '../services/geminiClient';
import { resumeSchema } from '../schemas/resumeSchema';

const router = Router();

router.post('/api/analyze-resume', async (req: Request, res: Response) => {
  const { resumeText, resumeName, fileData } = req.body;

  if (!resumeText && !fileData) {
    return res.status(400).json({ error: 'No resume content or file provided for analysis' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API not configured on server.',
      message: 'Please configure your GEMINI_API_KEY in the Settings > Secrets tab to enable AI resume parsing.'
    });
  }

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
      console.warn('gemini-3.5-flash failed or not accessible, falling back to gemini-3.1-pro-preview:', flashError.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema: resumeSchema,
        }
      });
    }

    const parsedData = JSON.parse(response.text || '{}');
    // Remap alphanumeric schema property keys back to display formatting keys
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
    res.status(500).json({
      error: 'Failed to process resume content',
      message: err?.message || 'Unknown processing error.'
    });
  }
});

export default router;
