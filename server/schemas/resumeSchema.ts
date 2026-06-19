import { Type } from '@google/genai';

export const resumeSchema = {
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
  ]
};
