import { Router, Request, Response } from 'express';
import { getDeepSeekClient, classifyDeepSeekError, DEEPSEEK_MODELS } from '../services/deepseekClient';

const router = Router();
const COACH_TIMEOUT_MS = 60_000; // 60 seconds

router.post('/api/chat-coach', async (req: Request, res: Response) => {
  const { messages, targetRole, deepThink, activeResult } = req.body;

  // --- Input Validation ---
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: 'invalid_input',
      message: 'Messages array is required for the conversation context.',
      code: 'missing_messages'
    });
  }

  if (messages.length === 0) {
    return res.status(400).json({
      error: 'invalid_input',
      message: 'At least one message is required to start a conversation.',
      code: 'empty_messages'
    });
  }

  if (messages.some((m: any) => !m.content || typeof m.content !== 'string')) {
    return res.status(400).json({
      error: 'invalid_input',
      message: 'Each message must have a valid text content field.',
      code: 'invalid_message_format'
    });
  }

  const ai = getDeepSeekClient();

  if (!ai) {
    return res.status(503).json({
      error: 'api_key_missing',
      message: 'AI career coaching is not available because no DEEPSEEK_API_KEY is configured. The dashboard will use simulated coaching responses instead.',
      code: 'api_key_missing'
    });
  }

  try {
    const activeMessages = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    } as { role: 'user' | 'assistant'; content: string }));

    let profileContext = '';
    if (activeResult && activeResult.profile) {
      const { profile, scores, gapAnalysis, salaryForecast } = activeResult;
      profileContext = `
        You are coaching a real candidate with the following analyzed resume details:
        - Candidate Name: ${profile.name || 'Candidate'}
        - Current Title: ${profile.title || 'Specialist'}
        - Stated Experience: ${profile.experienceYears || '3+'} years
        - Stated Skills: ${(profile.skills || []).join(', ')}
        - Analyzed Skill Gaps (Technical): ${(gapAnalysis?.technical || []).join(', ')}
        - Analyzed Skill Gaps (Leadership/Other): ${(gapAnalysis?.leadership || []).join(', ')}
        - Career Readiness score: ${scores?.careerReadiness || 72}%
        - Resume Strength score: ${scores?.resumeStrength || 75}%
        - Employability Index score: ${scores?.employabilityIndex || 80}%
        - Market Demand score: ${scores?.marketDemand || 70}%
        - Target Role Market Median Salary: ${salaryForecast?.marketMedian || '$120,000'}
        - Target Role Premium Dynamic Potential Salary: ${salaryForecast?.unlockedPotential || '$145,000'}
      `;
    }

    const useDeepThink = !!deepThink;
    const activeModel = useDeepThink ? DEEPSEEK_MODELS.fallback : DEEPSEEK_MODELS.primary;

    const systemInstruction = `
      You are NextMove AI, operating as a World-class Career Decision Engine, Career Consultant, Academic Strategist, Talent Director, Workforce Economist, and Learning Advisor.
      Your goal is to guide clients to make correct high-leverage decisions about choosing between roles, negotiating base salary, target industry pivots, and prioritizing real action execution over endless learning lists.
      Keep answers structured, elegant, professional, and directly actionable. Emphasize STAR structures for interview behavior, solid schemas for learning paths, and clear data ranges.
      Target Career is ${targetRole || 'Software / Systems Technology'}.
      
      ${profileContext}
      
      CRITICAL ADVISORY MANDATE:
      - Always address the user directly, referring to their specific current title, specific skill gaps, experience level, and analyzed scores.
      - Never give generic filler advice. Instead of telling them to passively "learn" a skill, guide them on "What should you do next?" (highest-leverage action tasks), "What should you NOT waste time on?" (activities to bypass), and "What gives the highest career & salary impact?".
      - Focus heavily on decision points: "Should they pivot?" "What is their next move?" "How should they decide?"
    `;

    let completion;
    try {
      completion = await ai.chat.completions.create({
        model: activeModel,
        messages: [
          {
            role: 'system',
            content: systemInstruction
          },
          ...activeMessages
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }, { timeout: COACH_TIMEOUT_MS });
    } catch (modelError: any) {
      const fallbackModel = activeModel === DEEPSEEK_MODELS.fallback ? DEEPSEEK_MODELS.primary : DEEPSEEK_MODELS.fallback;
      console.warn(`Model ${activeModel} failed, falling back to ${fallbackModel}:`, modelError.message);
      
      try {
        completion = await ai.chat.completions.create({
          model: fallbackModel,
          messages: [
            {
              role: 'system',
              content: systemInstruction
            },
            ...activeMessages
          ],
          temperature: 0.3,
          max_tokens: 4096,
        }, { timeout: COACH_TIMEOUT_MS });
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

    const generatedText = completion?.choices?.[0]?.message?.content || "I was unable to formulate a response. Please rephrase your question.";
    res.json({ content: generatedText });
  } catch (err: any) {
    console.error('Error in chat-coach endpoint:', err);
    
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
