import { useStore } from '../store/useStore';
import { Sparkles, Terminal, LogOut, User, Activity, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const { userSession, logout, setAuthModalOpen, setAuthModalTab, activeDashboardTab, setActiveDashboardTab } = useStore();

  const handleAuthClick = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#060913]/60 backdrop-blur-xl border-b border-white/[0.08] px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveDashboardTab(userSession.isAuthed ? 'overview' : 'landing')} 
          className="cursor-pointer group flex items-center"
        >
          <Logo size="md" />
        </div>

        {/* Navigation Elements / Core Workspace Sections */}
        {userSession.isAuthed ? (
          <div className="hidden lg:flex items-center gap-1.5 p-1 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10">
            {[
              { id: 'overview', label: 'Career Index' },
              { id: 'skills', label: 'Skill Gap Tool' },
              { id: 'roadmap', label: 'AI Roadmap' },
              { id: 'predictions', label: 'Path Forecast' },
              { id: 'analytics', label: 'Projections' },
              { id: 'coachtab', label: 'AI Coach' },
              { id: 'jobmatches', label: 'Job Matching' },
              { id: 'prep', label: 'Interview Guide' },
              { id: 'admin', label: 'Admin Hub' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDashboardTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs tracking-tight transition-all duration-300 ${
                  activeDashboardTab === tab.id
                    ? 'glass-tab-btn-active'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Core Intelligence</a>
            <a href="#demo" className="hover:text-white transition-colors">Visual Dashboard</a>
            <a href="#security" className="hover:text-white transition-colors">Secure Workspace</a>
          </div>
        )}

        {/* User Account State Controls */}
        <div className="flex items-center gap-3">
          {userSession.isAuthed ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs text-slate-400 font-medium">Workspace Active</span>
                <span className="text-sm text-indigo-200 font-bold max-w-[120px] truncate">{userSession.name}</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold shadow-inner">
                <User className="h-4 w-4" />
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 border border-transparent hover:border-red-500/20"
                title="Exit Account"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAuthClick('login')}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all hover:bg-white/5"
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick('register')}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 active:scale-95 hover:translate-y-[-1px] transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
