/**
 * Prompt-based JSON schema description for DeepSeek AI.
 * Since DeepSeek uses OpenAI-compatible JSON mode, we provide the schema
 * as instructions within the prompt rather than a structured type schema.
 */
export const RESUME_SCHEMA_PROMPT = `
You MUST return ONLY valid JSON. Do not include markdown code blocks or any other text.
The JSON must strictly follow this schema:

{
  "profile": {
    "name": "string (candidate name)",
    "title": "string (current job title)",
    "skills": ["string (skill name)"],
    "education": ["string (education entry)"],
    "experience": [
      {
        "role": "string",
        "company": "string",
        "duration": "string (optional)",
        "highlights": ["string (achievement highlights)"]
      }
    ],
    "certifications": ["string (optional)"],
    "projects": [
      {
        "name": "string",
        "description": "string",
        "technologies": ["string (optional)"]
      }
    ],
    "achievements": ["string (optional)"]
  },
  "scores": {
    "careerReadiness": "integer 0-100 (based on modern role requirements)",
    "employabilityIndex": "integer 0-100 (reflecting skills, certifications, and experience breadth)",
    "marketDemand": "integer 0-100 (indicating active market request for this background)",
    "resumeStrength": "integer 0-100 (technical phrasing and metrics coverage)",
    "interviewReadiness": "integer 0-100 (preparedness indicators)"
  },
  "gapAnalysis": {
    "overallGap": "integer 0-100 (percentage of missing critical skills)",
    "currentSkills": ["string"],
    "skillsBreakdown": [
      {
        "skill": "string",
        "category": "string",
        "relevance": "integer 0-100",
        "proficiency": "integer 0-100 (current level)",
        "requiredLevel": "integer 0-100 (required industrial standard)"
      }
    ],
    "missingSkills": [
      {
        "name": "string",
        "demand": "\"High\" | \"Medium\" | \"Low\"",
        "priority": "\"Critical\" | \"Important\" | \"Optional\"",
        "description": "string (why this is a gap)",
        "resourceName": "string (recommended course/cert/project)",
        "resourceType": "\"Course\" | \"Certification\" | \"Project\" | \"Book\"",
        "resourceLink": "string (URL or search recommendation, optional)"
      }
    ]
  },
  "roadmap": {
    "plan30Days": {
      "title": "string",
      "duration": "string",
      "skillsToLearn": ["string"],
      "certifications": ["string (optional)"],
      "projects": ["string"],
      "portfolioTasks": ["string (optional)"],
      "networkingActions": ["string (optional)"],
      "interviewPrep": ["string (optional)"]
    },
    "plan60Days": {
      "title": "string",
      "duration": "string",
      "skillsToLearn": ["string"],
      "certifications": ["string (optional)"],
      "projects": ["string"],
      "portfolioTasks": ["string (optional)"],
      "networkingActions": ["string (optional)"],
      "interviewPrep": ["string (optional)"]
    },
    "plan90Days": {
      "title": "string",
      "duration": "string",
      "skillsToLearn": ["string"],
      "certifications": ["string (optional)"],
      "projects": ["string"],
      "portfolioTasks": ["string (optional)"],
      "networkingActions": ["string (optional)"],
      "interviewPrep": ["string (optional)"]
    },
    "plan6Months": {
      "title": "string",
      "duration": "string",
      "skillsToLearn": ["string"],
      "certifications": ["string (optional)"],
      "projects": ["string"],
      "portfolioTasks": ["string (optional)"],
      "networkingActions": ["string (optional)"],
      "interviewPrep": ["string (optional)"]
    },
    "plan12Months": {
      "title": "string",
      "duration": "string",
      "skillsToLearn": ["string"],
      "certifications": ["string (optional)"],
      "projects": ["string"],
      "portfolioTasks": ["string (optional)"],
      "networkingActions": ["string (optional)"],
      "interviewPrep": ["string (optional)"]
    }
  },
  "predictions": {
    "ai_engineer": {
      "targetRole": "string",
      "currentReadiness": "integer 0-100",
      "futureReadiness": "integer 0-100",
      "successProbability": "integer 0-100",
      "estimatedTimeWeeks": "integer",
      "recommendedLearningPath": ["string"]
    },
    "data_analyst": {
      "targetRole": "string",
      "currentReadiness": "integer 0-100",
      "futureReadiness": "integer 0-100",
      "successProbability": "integer 0-100",
      "estimatedTimeWeeks": "integer",
      "recommendedLearningPath": ["string"]
    },
    "product_manager": {
      "targetRole": "string",
      "currentReadiness": "integer 0-100",
      "futureReadiness": "integer 0-100",
      "successProbability": "integer 0-100",
      "estimatedTimeWeeks": "integer",
      "recommendedLearningPath": ["string"]
    }
  },
  "salaryForecast": {
    "currentSalaryEstimate": "integer",
    "futureSalaryEstimate": "integer",
    "projections": [
      {
        "year": "string",
        "baseSalary": "integer",
        "upskilledSalary": "integer"
      }
    ]
  },
  "futureProof": {
    "futureProofScore": "integer 0-100",
    "emergingSkills": ["string"],
    "decliningSkills": ["string"],
    "automationRisk": "\"High\" | \"Medium\" | \"Low\"",
    "aiDisruptionRisk": "\"High\" | \"Medium\" | \"Low\"",
    "careerStabilityScore": "integer 0-100",
    "stabilityExplanation": "string"
  },
  "interviewPrep": {
    "confidenceScore": "integer 0-100",
    "behavioralQuestions": [
      {
        "question": "string",
        "answerGuide": "string",
        "starFrameworkTip": "string"
      }
    ],
    "technicalQuestions": [
      {
        "question": "string",
        "expectedAnswer": "string",
        "codingResource": "string (optional)"
      }
    ],
    "roleSpecificQuestions": [
      {
        "question": "string",
        "scenarioContext": "string",
        "keyPointsToCover": ["string"]
      }
    ],
    "mockFeedback": "string"
  },
  "jobMatches": [
    {
      "id": "string",
      "title": "string",
      "company": "string",
      "location": "string",
      "salary": "string",
      "matchScore": "integer 0-100",
      "strengthAreas": ["string"],
      "missingRequirements": ["string"],
      "improvementSuggestions": ["string (optional)"]
    }
  ]
}

All integer score fields must be between 0 and 100 unless specified otherwise.
The "roadmap" plans must all include at minimum: title, duration, skillsToLearn, projects.
The "predictions" must include all three roles: ai_engineer, data_analyst, product_manager.
`;
