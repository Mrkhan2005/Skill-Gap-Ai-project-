import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize the Google GenAI SDK if the key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
  console.log('Gemini AI SDK initialized successfully with server security.');
} else {
  console.warn('GEMINI_API_KEY environment variable not detected. Fallbacks enabled.');
}

// -------------------------------------------------------------
// Endpoint: Resume Analysis
// Generates structured Career Intelligence analytics
// -------------------------------------------------------------
app.post('/api/analyze-resume', async (req, res) => {
  const { resumeText, resumeName } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: 'No resume content provided for analysis' });
  }

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API not configured on server.',
      message: 'Please configure your GEMINI_API_KEY in the Settings > Secrets tab to enable AI resume parsing.'
    });
  }

  try {
    const prompt = `
      You are a World-class Career Consultant, HR Director, Workforce Economist, Recruiter and Learning Strategist.
      Analyze the following resume document contents. Generate a comprehensive career intelligence and alignment profile.
      The output must correspond EXACTLY to the JSON schema provided below.
      
      Resume Document:
      "${resumeText}"
    `;

    // Define the full robust schema corresponding to CareerAnalysisResult
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            profile: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                title: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                education: { type: Type.ARRAY, items: { type: Type.STRING } },
                experience: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      role: { type: Type.STRING },
                      company: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ['role', 'company', 'highlights']
                  }
                },
                certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                projects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ['name', 'description']
                  }
                },
                achievements: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['name', 'title', 'skills', 'experience']
            },
            scores: {
              type: Type.OBJECT,
              properties: {
                careerReadiness: { type: Type.INTEGER, description: 'Percentage from 0 to 100 based on modern role requirements' },
                employabilityIndex: { type: Type.INTEGER, description: 'Percentage from 0 to 100 reflecting skills, certifications, and experience breadth' },
                marketDemand: { type: Type.INTEGER, description: 'Percentage from 0 to 100 indicating active market request for this general background' },
                resumeStrength: { type: Type.INTEGER, description: 'Percentage from 0 to 100 representing technical phrasing and metrics coverage' },
                interviewReadiness: { type: Type.INTEGER, description: 'Percentage from 0 to 100 evaluating preparedness indicators' }
              },
              required: ['careerReadiness', 'employabilityIndex', 'marketDemand', 'resumeStrength', 'interviewReadiness']
            },
            gapAnalysis: {
              type: Type.OBJECT,
              properties: {
                overallGap: { type: Type.INTEGER, description: 'Percentage of missing critical skills from average target role requirements' },
                currentSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                skillsBreakdown: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      skill: { type: Type.STRING },
                      category: { type: Type.STRING },
                      relevance: { type: Type.INTEGER, description: '0 to 100 relevance score' },
                      proficiency: { type: Type.INTEGER, description: 'Current estimated proficiency level 0 to 100' },
                      requiredLevel: { type: Type.INTEGER, description: 'Required industrial standard proficiency level 0 to 100' }
                    },
                    required: ['skill', 'category', 'relevance', 'proficiency', 'requiredLevel']
                  }
                },
                missingSkills: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      demand: { type: Type.STRING, description: '"High", "Medium", or "Low"' },
                      priority: { type: Type.STRING, description: '"Critical", "Important", or "Optional"' },
                      description: { type: Type.STRING, description: 'Brief description of why this is a gap' },
                      resourceName: { type: Type.STRING, description: 'Recommended specific learning course, certification, or project' },
                      resourceType: { type: Type.STRING, description: '"Course", "Certification", "Project", or "Book"' },
                      resourceLink: { type: Type.STRING, description: 'URL link or search recommendation' }
                    },
                    required: ['name', 'demand', 'priority', 'description', 'resourceName', 'resourceType']
                  }
                }
              },
              required: ['overallGap', 'currentSkills', 'skillsBreakdown', 'missingSkills']
            },
            roadmap: {
              type: Type.OBJECT,
              properties: {
                plan30Days: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skillsToLearn: { type: Type.ARRAY, items: { type: Type.STRING } },
                    certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                    projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    portfolioTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    networkingActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    interviewPrep: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['title', 'duration', 'skillsToLearn', 'projects']
                },
                plan60Days: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skillsToLearn: { type: Type.ARRAY, items: { type: Type.STRING } },
                    certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                    projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    portfolioTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    networkingActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    interviewPrep: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['title', 'duration', 'skillsToLearn', 'projects']
                },
                plan90Days: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skillsToLearn: { type: Type.ARRAY, items: { type: Type.STRING } },
                    certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                    projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    portfolioTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    networkingActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    interviewPrep: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['title', 'duration', 'skillsToLearn', 'projects']
                },
                plan6Months: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skillsToLearn: { type: Type.ARRAY, items: { type: Type.STRING } },
                    certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                    projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    portfolioTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    networkingActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    interviewPrep: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['title', 'duration', 'skillsToLearn', 'projects']
                },
                plan12Months: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    skillsToLearn: { type: Type.ARRAY, items: { type: Type.STRING } },
                    certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
                    projects: { type: Type.ARRAY, items: { type: Type.STRING } },
                    portfolioTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    networkingActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    interviewPrep: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['title', 'duration', 'skillsToLearn', 'projects']
                }
              },
              required: ['plan30Days', 'plan60Days', 'plan90Days', 'plan6Months', 'plan12Months']
            },
            predictions: {
              type: Type.OBJECT,
              description: 'Roles evaluation mappings with keys: ai_engineer, data_analyst, product_manager',
              properties: {
                ai_engineer: {
                  type: Type.OBJECT,
                  properties: {
                    targetRole: { type: Type.STRING },
                    currentReadiness: { type: Type.INTEGER },
                    futureReadiness: { type: Type.INTEGER },
                    successProbability: { type: Type.INTEGER },
                    estimatedTimeWeeks: { type: Type.INTEGER },
                    recommendedLearningPath: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['targetRole', 'currentReadiness', 'futureReadiness', 'successProbability', 'estimatedTimeWeeks', 'recommendedLearningPath']
                },
                data_analyst: {
                  type: Type.OBJECT,
                  properties: {
                    targetRole: { type: Type.STRING },
                    currentReadiness: { type: Type.INTEGER },
                    futureReadiness: { type: Type.INTEGER },
                    successProbability: { type: Type.INTEGER },
                    estimatedTimeWeeks: { type: Type.INTEGER },
                    recommendedLearningPath: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['targetRole', 'currentReadiness', 'futureReadiness', 'successProbability', 'estimatedTimeWeeks', 'recommendedLearningPath']
                },
                product_manager: {
                  type: Type.OBJECT,
                  properties: {
                    targetRole: { type: Type.STRING },
                    currentReadiness: { type: Type.INTEGER },
                    futureReadiness: { type: Type.INTEGER },
                    successProbability: { type: Type.INTEGER },
                    estimatedTimeWeeks: { type: Type.INTEGER },
                    recommendedLearningPath: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ['targetRole', 'currentReadiness', 'futureReadiness', 'successProbability', 'estimatedTimeWeeks', 'recommendedLearningPath']
                }
              },
              required: ["ai_engineer", "data_analyst", "product_manager"]
            },
            salaryForecast: {
              type: Type.OBJECT,
              properties: {
                currentSalaryEstimate: { type: Type.INTEGER },
                futureSalaryEstimate: { type: Type.INTEGER },
                projections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      year: { type: Type.STRING },
                      baseSalary: { type: Type.INTEGER },
                      upskilledSalary: { type: Type.INTEGER }
                    },
                    required: ['year', 'baseSalary', 'upskilledSalary']
                  }
                }
              },
              required: ['currentSalaryEstimate', 'futureSalaryEstimate', 'projections']
            },
            futureProof: {
              type: Type.OBJECT,
              properties: {
                futureProofScore: { type: Type.INTEGER },
                emergingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                decliningSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                automationRisk: { type: Type.STRING, description: '"High", "Medium", or "Low"' },
                aiDisruptionRisk: { type: Type.STRING, description: '"High", "Medium", or "Low"' },
                careerStabilityScore: { type: Type.INTEGER },
                stabilityExplanation: { type: Type.STRING }
              },
              required: ['futureProofScore', 'emergingSkills', 'decliningSkills', 'automationRisk', 'aiDisruptionRisk', 'careerStabilityScore', 'stabilityExplanation']
            },
            interviewPrep: {
              type: Type.OBJECT,
              properties: {
                confidenceScore: { type: Type.INTEGER },
                behavioralQuestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answerGuide: { type: Type.STRING },
                      starFrameworkTip: { type: Type.STRING }
                    },
                    required: ['question', 'answerGuide', 'starFrameworkTip']
                  }
                },
                technicalQuestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      expectedAnswer: { type: Type.STRING },
                      codingResource: { type: Type.STRING }
                    },
                    required: ['question', 'expectedAnswer']
                  }
                },
                roleSpecificQuestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      scenarioContext: { type: Type.STRING },
                      keyPointsToCover: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ['question', 'scenarioContext', 'keyPointsToCover']
                  }
                },
                mockFeedback: { type: Type.STRING }
              },
              required: ['confidenceScore', 'behavioralQuestions', 'technicalQuestions', 'roleSpecificQuestions', 'mockFeedback']
            },
            jobMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  company: { type: Type.STRING },
                  location: { type: Type.STRING },
                  salary: { type: Type.STRING },
                  matchScore: { type: Type.INTEGER },
                  strengthAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
                  missingRequirements: { type: Type.ARRAY, items: { type: Type.STRING } },
                  improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['id', 'title', 'company', 'location', 'salary', 'matchScore', 'strengthAreas', 'missingRequirements']
              }
            }
          },
          required: [
            'profile', 'scores', 'gapAnalysis', 'roadmap', 'predictions', 
            'salaryForecast', 'futureProof', 'interviewPrep', 'jobMatches'
          ],
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');
    // Remap alphanumeric schema property keys back to reader's expected display formatting keys
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

// -------------------------------------------------------------
// Endpoint: AI Career Coach Chat
// Supports standard speed or High reasoning deep thin modes
// -------------------------------------------------------------
app.post('/api/chat-coach', async (req, res) => {
  const { messages, targetRole, deepThink } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages timeline context is required' });
  }

  if (!ai) {
    return res.status(503).json({
      error: 'Gemini API not configured on server.',
      message: 'Consult active profile metrics inside standard dashboard, or set GEMINI_API_KEY in Settings to activate the real-time AI consultant coaching panel.'
    });
  }

  try {
    const activeMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // System instructions configuring the AI Coach's persona
    const systemInstruction = `
      You are SkillGap AI Career Coach, operating as a World-class Career Consultant, Academic Strategist, Talent Director, Workforce Economist, and Learning Advisor.
      Your goal is to guide clients to optimal positions, pinpoint skill gaps, review negotiation protocols, explain technical systems, and deliver constructive advice.
      Keep answers structured, elegant, professional, and directly actionable. Emphasize STAR structures for interview behavior, solid schemas for learning paths, and clear data ranges.
      Adhere to requested target role details if provided: Target Career is ${targetRole || 'Software / Systems Technology'}.
    `;

    // Apply high thinking settings for pro-preview if requested
    const useDeepThink = !!deepThink;
    const activeModel = useDeepThink ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash';

    const lastMessage = activeMessages[activeMessages.length - 1];
    const previousHistory = activeMessages.slice(0, activeMessages.length - 1);

    // Initializing chats manually to enable custom configurations or direct chats
    const config: any = {
      systemInstruction,
    };

    if (useDeepThink) {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH
      };
      // For high reasoning, per instruction do not set maxOutputTokens
    }

    const response = await ai.models.generateContent({
      model: activeModel,
      contents: activeMessages,
      config
    });

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

// Serve frontend application static assets in production mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in Development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static asset pipelines active.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillGap AI Full-Stack Server executing seamlessly on port ${PORT}`);
  });
}

startServer();
