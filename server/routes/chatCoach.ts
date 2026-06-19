import { Router, Request, Response } from 'express';
import { ThinkingLevel } from '@google/genai';
import { getGeminiClient } from '../services/geminiClient';

const router = Router();

router.post('/api/chat-coach', async (req: Request, res: Response) => {
  const { messages, targetRole, deepThink, activeResult } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages timeline context is required' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API not configured on server.',
      message: 'Consult active profile metrics inside standard dashboard, or set GEMINI_API_KEY in Settings to activate the real-time AI consultant coaching panel.'
    });
  }

  try {
    const activeMessages = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

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

    const useDeepThink = !!deepThink;
    const activeModel = useDeepThink ? 'gemini-2.0-pro-exp-02-05' : 'gemini-2.0-flash';

    const lastMessage = activeMessages[activeMessages.length - 1];
    const previousHistory = activeMessages.slice(0, activeMessages.length - 1);

    const config: any = {
      systemInstruction,
    };

    if (useDeepThink) {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH
      };
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: activeModel,
        contents: activeMessages,
        config
      });
    } catch (modelError: any) {
      console.warn(`Model ${activeModel} failed to respond or quota exceeded, falling back to gemini-2.0-flash:`, modelError.message);
      if (config.thinkingConfig) {
        delete config.thinkingConfig;
      }
      response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: activeMessages,
        config
      });
    }

    const generatedText = response.text || "I was unable to formulate a response. Please rephrase your question.";
    res.json({ content: generatedText });
  } catch (err: any) {
    console.error('Error in chat-coach endpoint:', err);
    res.status(500).json({
      error: 'Failed to generate guidance',
      message: err?.message || 'Unknown generation error.'
    });
  }
});

export default router;
