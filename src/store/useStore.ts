import { create } from 'zustand';
import { CareerAnalysisResult, ChatMessage, UserSession } from '../types.ts';
import { mockDeveloperResult, mockDataAnalystResult } from './mockData.ts';
import { auth as fbAuth, googleAuthProvider, signInWithPopup } from '../lib/firebase.ts';
import { signOut } from 'firebase/auth';

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
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setAuthModalOpen: (open: boolean) => void;
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  setActiveResult: (result: CareerAnalysisResult) => void;
  setIsLoadingAnalysis: (loading: boolean) => void;
  setSelectedTargetRole: (role: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setChatHistory: (history: ChatMessage[]) => void;
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
    content: "Greetings! I am NextMove AI, your Career Decision Engine. Traditional platforms just suggest lists of skills to study, but we focus on helping you map out exactly WHAT DECISION TO MAKE NEXT to capture high value.\n\nAsk me anything! For example:\n\n* *'Should I negotiate base salary or sign-on bonus for this role, and how?'*\n* *'Which target industry will yield the highest salary and speed of hiring based on my gaps?'*\n* *'Based on my current readiness index, should I switch careers to Product Manager or stay?'*\n* *'Why could my resume profile be getting rejected at Tier-1, and what critical update should I make today?'*",
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

    loginWithGoogle: async () => {
      try {
        const result = await signInWithPopup(fbAuth, googleAuthProvider);
        const user = result.user;
        const token = await user.getIdToken();
        
        // Sync with Cloud SQL backend
        const syncResponse = await fetch('/api/sync-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name: user.displayName || 'Google Specialist' })
        });

        if (!syncResponse.ok) {
          throw new Error('Database sync failed or table unreachable');
        }

        const session: UserSession = {
          email: user.email || '',
          name: user.displayName || 'Google Specialist',
          isAuthed: true,
          token,
          photoURL: user.photoURL || undefined
        };

        localStorage.setItem('skillgap_session', JSON.stringify(session));
        set({ userSession: session, authModalOpen: false });
      } catch (err) {
        console.error('Google Sign In authentication flow failed:', err);
        throw err;
      }
    },

    logout: () => {
      signOut(fbAuth).catch((err) => console.warn('Firebase signout error:', err));
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

    setChatHistory: (history) => set({ chatHistory: history }),

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
