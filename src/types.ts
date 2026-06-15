export interface ResumeProfile {
  name: string;
  title: string;
  skills: string[];
  education: string[];
  experience: {
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  certifications: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  achievements: string[];
}

export interface SkillGapItem {
  skill: string;
  category: string;
  relevance: number; // 1-100
  proficiency: number; // 0-100 (current)
  requiredLevel: number; // 0-100 (market demand)
}

export interface GapAnalysis {
  overallGap: number; // e.g. 35%
  skillsBreakdown: SkillGapItem[];
  missingSkills: {
    name: string;
    demand: 'High' | 'Medium' | 'Low';
    priority: 'Critical' | 'Important' | 'Optional';
    description: string;
    resourceName: string;
    resourceType: 'Course' | 'Certification' | 'Project' | 'Book';
    resourceLink: string;
  }[];
  currentSkills: string[];
}

export interface RoadmapStep {
  title: string;
  duration: string;
  skillsToLearn: string[];
  certifications: string[];
  projects: string[];
  portfolioTasks: string[];
  networkingActions: string[];
  interviewPrep: string[];
}

export interface CareerRoadmap {
  plan30Days: RoadmapStep;
  plan60Days: RoadmapStep;
  plan90Days: RoadmapStep;
  plan6Months: RoadmapStep;
  plan12Months: RoadmapStep;
}

export interface CareerPrediction {
  targetRole: string;
  currentReadiness: number; // 0-100
  futureReadiness: number; // 0-100
  successProbability: number; // 0-100
  estimatedTimeWeeks: number;
  recommendedLearningPath: string[];
}

export interface SalaryForecast {
  currentSalaryEstimate: number;
  futureSalaryEstimate: number;
  projections: {
    year: string;
    baseSalary: number;
    upskilledSalary: number;
  }[];
}

export interface FutureProofAnalysis {
  futureProofScore: number; // e.g. 87
  emergingSkills: string[];
  decliningSkills: string[];
  automationRisk: 'High' | 'Medium' | 'Low';
  aiDisruptionRisk: 'High' | 'Medium' | 'Low';
  careerStabilityScore: number; // 0-100
  stabilityExplanation: string;
}

export interface InterviewPrep {
  confidenceScore: number;
  behavioralQuestions: {
    question: string;
    answerGuide: string;
    starFrameworkTip: string;
  }[];
  technicalQuestions: {
    question: string;
    expectedAnswer: string;
    codingResource?: string;
  }[];
  roleSpecificQuestions: {
    question: string;
    scenarioContext: string;
    keyPointsToCover: string[];
  }[];
  mockFeedback: string;
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  strengthAreas: string[];
  missingRequirements: string[];
  improvementSuggestions: string[];
}

export interface CareersAnalytics {
  skillDistribution: { name: string; value: number }[];
  marketDemandTrend: { month: string; value: number }[];
  commonSkillGaps: { name: string; frequency: number }[];
}

export interface CareerAnalysisResult {
  profile: ResumeProfile;
  scores: {
    careerReadiness: number;
    employabilityIndex: number;
    marketDemand: number;
    resumeStrength: number;
    interviewReadiness: number;
  };
  gapAnalysis: GapAnalysis;
  roadmap: CareerRoadmap;
  predictions: { [key: string]: CareerPrediction };
  salaryForecast: SalaryForecast;
  futureProof: FutureProofAnalysis;
  interviewPrep: InterviewPrep;
  jobMatches: JobMatch[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface UserSession {
  email: string;
  name: string;
  isAuthed: boolean;
}
