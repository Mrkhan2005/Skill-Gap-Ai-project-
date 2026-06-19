import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useStore } from '../store/useStore';
import { CareerAnalysisResult, ChatMessage } from '../types';

// Mock localStorage for tests (jsdom may not provide it in all configurations)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// Helper to reset the store between tests
function resetStore() {
  useStore.setState(useStore.getInitialState(), true);
}

describe('useStore', () => {
  beforeEach(() => {
    localStorage.clear();
    resetStore();
  });

  describe('Authentication', () => {
    it('should start with unauthenticated user', () => {
      const state = useStore.getState();
      expect(state.userSession.isAuthed).toBe(false);
      expect(state.userSession.email).toBe('');
      expect(state.userSession.name).toBe('');
    });

    it('should login a user', () => {
      const { login } = useStore.getState();
      login('test@example.com', 'Test User');

      const state = useStore.getState();
      expect(state.userSession.isAuthed).toBe(true);
      expect(state.userSession.email).toBe('test@example.com');
      expect(state.userSession.name).toBe('Test User');
    });

    it('should persist session to localStorage on login', () => {
      const { login } = useStore.getState();
      login('persist@test.com', 'Persist User');

      const saved = localStorage.getItem('skillgap_session');
      expect(saved).not.toBeNull();

      if (saved) {
        const parsed = JSON.parse(saved);
        expect(parsed.email).toBe('persist@test.com');
        expect(parsed.name).toBe('Persist User');
        expect(parsed.isAuthed).toBe(true);
      }
    });

    it('should register a user', () => {
      const { register } = useStore.getState();
      register('newuser@test.com', 'New User');

      const state = useStore.getState();
      expect(state.userSession.isAuthed).toBe(true);
      expect(state.userSession.email).toBe('newuser@test.com');
      expect(state.userSession.name).toBe('New User');
    });

    it('should logout a user and clear session', () => {
      const { login, logout } = useStore.getState();
      login('test@test.com', 'Test');
      
      let state = useStore.getState();
      expect(state.userSession.isAuthed).toBe(true);

      logout();

      state = useStore.getState();
      expect(state.userSession.isAuthed).toBe(false);
      expect(state.userSession.email).toBe('');
      expect(state.userSession.name).toBe('');

      // localStorage should be cleared
      const saved = localStorage.getItem('skillgap_session');
      expect(saved).toBeNull();
    });
  });

  describe('Auth Modal', () => {
    it('should open and close the auth modal', () => {
      const { setAuthModalOpen } = useStore.getState();
      
      expect(useStore.getState().authModalOpen).toBe(false);
      
      setAuthModalOpen(true);
      expect(useStore.getState().authModalOpen).toBe(true);
      
      setAuthModalOpen(false);
      expect(useStore.getState().authModalOpen).toBe(false);
    });

    it('should change auth modal tab', () => {
      const { setAuthModalTab } = useStore.getState();
      
      expect(useStore.getState().authModalTab).toBe('login');
      
      setAuthModalTab('register');
      expect(useStore.getState().authModalTab).toBe('register');
      
      setAuthModalTab('forgot');
      expect(useStore.getState().authModalTab).toBe('forgot');
    });
  });

  describe('Active Result', () => {
    it('should set and get the active analysis result', () => {
      const { setActiveResult } = useStore.getState();
      
      const mockResult: CareerAnalysisResult = {
        profile: {
          name: 'Test User',
          title: 'Developer',
          skills: ['React', 'TypeScript'],
          education: ['B.S. CS'],
          experience: [{
            role: 'Dev',
            company: 'Test Co',
            duration: '2024-2025',
            highlights: ['Built apps']
          }],
          certifications: [],
          projects: [],
          achievements: []
        },
        scores: {
          careerReadiness: 80,
          employabilityIndex: 85,
          marketDemand: 90,
          resumeStrength: 75,
          interviewReadiness: 70
        },
        gapAnalysis: {
          overallGap: 25,
          currentSkills: ['React'],
          skillsBreakdown: [],
          missingSkills: []
        },
        roadmap: {
          plan30Days: { title: '', duration: '', skillsToLearn: [], certifications: [], projects: [], portfolioTasks: [], networkingActions: [], interviewPrep: [] },
          plan60Days: { title: '', duration: '', skillsToLearn: [], certifications: [], projects: [], portfolioTasks: [], networkingActions: [], interviewPrep: [] },
          plan90Days: { title: '', duration: '', skillsToLearn: [], certifications: [], projects: [], portfolioTasks: [], networkingActions: [], interviewPrep: [] },
          plan6Months: { title: '', duration: '', skillsToLearn: [], certifications: [], projects: [], portfolioTasks: [], networkingActions: [], interviewPrep: [] },
          plan12Months: { title: '', duration: '', skillsToLearn: [], certifications: [], projects: [], portfolioTasks: [], networkingActions: [], interviewPrep: [] }
        },
        predictions: {},
        salaryForecast: { currentSalaryEstimate: 0, futureSalaryEstimate: 0, projections: [] },
        futureProof: { futureProofScore: 0, emergingSkills: [], decliningSkills: [], automationRisk: 'Low', aiDisruptionRisk: 'Low', careerStabilityScore: 0, stabilityExplanation: '' },
        interviewPrep: { confidenceScore: 0, behavioralQuestions: [], technicalQuestions: [], roleSpecificQuestions: [], mockFeedback: '' },
        jobMatches: []
      };

      setActiveResult(mockResult);
      expect(useStore.getState().activeResult.profile.name).toBe('Test User');
      expect(useStore.getState().activeResult.scores.careerReadiness).toBe(80);
    });

    it('should set loading state', () => {
      const { setIsLoadingAnalysis } = useStore.getState();
      
      expect(useStore.getState().isLoadingAnalysis).toBe(false);
      
      setIsLoadingAnalysis(true);
      expect(useStore.getState().isLoadingAnalysis).toBe(true);
      
      setIsLoadingAnalysis(false);
      expect(useStore.getState().isLoadingAnalysis).toBe(false);
    });
  });

  describe('Chat Messages', () => {
    it('should start with a welcome message', () => {
      const state = useStore.getState();
      expect(state.chatHistory.length).toBeGreaterThan(0);
      expect(state.chatHistory[0].role).toBe('assistant');
      expect(state.chatHistory[0].content).toContain('NextMove AI');
    });

    it('should add a chat message', () => {
      const { addChatMessage } = useStore.getState();
      
      const msg: ChatMessage = {
        id: 'test-1',
        role: 'user',
        content: 'Hello, world!',
        timestamp: '12:00'
      };

      addChatMessage(msg);
      
      const state = useStore.getState();
      const lastMsg = state.chatHistory[state.chatHistory.length - 1];
      expect(lastMsg.id).toBe('test-1');
      expect(lastMsg.content).toBe('Hello, world!');
    });

    it('should clear chat history', () => {
      const { addChatMessage, clearChat } = useStore.getState();
      
      addChatMessage({
        id: 'test-1',
        role: 'user',
        content: 'Hello',
        timestamp: '12:00'
      });

      clearChat();
      
      const state = useStore.getState();
      expect(state.chatHistory.length).toBe(1); // Just the welcome message
      expect(state.chatHistory[0].role).toBe('assistant');
    });
  });

  describe('Target Role', () => {
    it('should set the selected target role', () => {
      const { setSelectedTargetRole } = useStore.getState();
      
      expect(useStore.getState().selectedTargetRole).toBe('AI Engineer');
      
      setSelectedTargetRole('Product Manager');
      expect(useStore.getState().selectedTargetRole).toBe('Product Manager');
    });
  });

  describe('Mock Result Reset', () => {
    it('should reset to Software Developer mock', () => {
      const { resetToMockResult } = useStore.getState();
      resetToMockResult('Software Developer');
      
      const state = useStore.getState();
      expect(state.activeResult.profile.name).toBe('Alex Rivera');
      expect(state.activeResult.profile.title).toBe('Junior Frontend Developer');
    });

    it('should reset to Data Analyst mock', () => {
      const { resetToMockResult } = useStore.getState();
      resetToMockResult('Data Analyst');
      
      const state = useStore.getState();
      expect(state.activeResult.profile.name).toBe('Marcus Vance');
      expect(state.activeResult.profile.title).toBe('Data Analyst');
    });
  });

  describe('Admin Stats', () => {
    it('should have default admin stats', () => {
      const state = useStore.getState();
      expect(state.adminStats.totalUsers).toBe(12480);
      expect(state.adminStats.resumesAnalyzed).toBe(34921);
      expect(state.adminStats.mostRequestedCareers.length).toBe(5);
      expect(state.adminStats.commonSkillGaps.length).toBe(5);
    });
  });
});
