import { create } from 'zustand';
import { CareerAnalysisResult, ChatMessage, UserSession } from '../types';
import { mockDeveloperResult, mockDataAnalystResult } from './mockData';

interface AppStore {
  userSession: UserSession;
  activeResult: CareerAnalysisResult;
  isLoadingAnalysis: boolean;
  selectedTargetRole: string;
  chatHistory: ChatMessage[];
  activeDashboardTab: string;
  authModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot';
  
  // Admin Mock Database Stats
  adminStats: {
    totalUsers: number;
    resumesAnalyzed: number;
    avgEmployabilityScore: number;
    mostRequestedCareers: { name: string; percentage: number }[];
    commonSkillGaps: { name: string; percentage: number }[];
  };

  // Actions
  login: (email: string, name: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  setActiveResult: (result: CareerAnalysisResult) => void;
  setIsLoadingAnalysis: (loading: boolean) => void;
  setSelectedTargetRole: (role: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  setActiveDashboardTab: (tab: string) => void;
  resetToMockResult: (profileType: 'Software Developer' | 'Data Analyst') => void;
}

const defaultAdminStats = {
  totalUsers: 12480,
  resumesAnalyzed: 34921,
  avgEmployabilityScore: 81.4,
  mostRequestedCareers: [
    { name: 'AI Engineer', percentage: 34 },
    { name: 'Software Developer', percentage: 28 },
    { name: 'Product Manager', percentage: 16 },
    { name: 'Cloud/Data Architect', percentage: 12 },
    { name: 'Cybersecurity Analyst', percentage: 10 }
  ],
  commonSkillGaps: [
    { name: 'Next.js & SSR Tech', percentage: 42 },
    { name: 'Distributed Systems & Microservices', percentage: 38 },
    { name: 'Cloud Data Warehouses (Snowflake/BigQuery)', percentage: 31 },
    { name: 'Docker / Container Orchestration', percentage: 27 },
    { name: 'Automated Testing (Cypress / Jest)', percentage: 24 }
  ]
};

const initialChatMessages: ChatMessage[] = [
  {
    id: 'welcome-coaching',
    role: 'assistant',
    content: "Greetings! I am your SkillGap AI Career Coach, equipped as a World-class Career Consultant, Director of HR, and Workforce Economist. Based on your active profile, ask me anything! For example:\n\n* *'Which skills should I learn next?'*\n* *'Why am I getting rejected by major tech firms?'*\n* *'How do I negotiate a higher base salary?'*\n* *'Should I consider switching my career completely?'*",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const useStore = create<AppStore>((set) => {
  // Check localStorage for session if available
  let cachedUser: UserSession = { email: '', name: '', isAuthed: false };
  try {
    const saved = localStorage.getItem('skillgap_session');
    if (saved) {
      cachedUser = JSON.parse(saved);
    }
  } catch (e) {
    // Ignore error
  }

  return {
    userSession: cachedUser,
    activeResult: mockDeveloperResult, // Start with Software Developer as default
    isLoadingAnalysis: false,
    selectedTargetRole: 'AI Engineer',
    chatHistory: initialChatMessages,
    activeDashboardTab: 'overview',
    authModalOpen: false,
    authModalTab: 'login',
    adminStats: defaultAdminStats,

    login: (email: string, name: string) => {
      const session = { email, name, isAuthed: true };
      localStorage.setItem('skillgap_session', JSON.stringify(session));
      set({ userSession: session, authModalOpen: false });
    },

    register: (email: string, name: string) => {
      const session = { email, name, isAuthed: true };
      localStorage.setItem('skillgap_session', JSON.stringify(session));
      set({ userSession: session, authModalOpen: false });
    },

    logout: () => {
      localStorage.removeItem('skillgap_session');
      set({ userSession: { email: '', name: '', isAuthed: false }, activeDashboardTab: 'overview' });
    },

    setAuthModalOpen: (open) => set({ authModalOpen: open }),
    setAuthModalTab: (tab) => set({ authModalTab: tab }),
    setActiveResult: (result) => set({ activeResult: result }),
    setIsLoadingAnalysis: (loading) => set({ isLoadingAnalysis: loading }),
    setSelectedTargetRole: (role) => set({ selectedTargetRole: role }),
    
    addChatMessage: (msg) => set((state) => ({ 
      chatHistory: [...state.chatHistory, msg] 
    })),

    clearChat: () => set({ chatHistory: initialChatMessages }),
    setActiveDashboardTab: (tab) => set({ activeDashboardTab: tab }),

    resetToMockResult: (profileType) => {
      if (profileType === 'Software Developer') {
        set({ activeResult: mockDeveloperResult, chatHistory: initialChatMessages, selectedTargetRole: 'AI Engineer' });
      } else {
        set({ activeResult: mockDataAnalystResult, chatHistory: initialChatMessages, selectedTargetRole: 'AI Engineer' });
      }
    }
  };
});
