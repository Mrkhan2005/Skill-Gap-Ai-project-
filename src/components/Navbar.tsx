import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Sparkles, Terminal, LogOut, User, Activity, ShieldAlert, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Navbar() {
  const { userSession, logout, setAuthModalOpen, setAuthModalTab, activeDashboardTab, setActiveDashboardTab } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <div className="sticky top-0 z-50 w-full px-4 py-3 md:px-8 transition-all duration-300">
      <motion.nav
        animate={{
          borderRadius: isScrolled ? '24px' : '16px',
          padding: isScrolled ? '10px 20px' : '14px 20px',
          backgroundColor: isScrolled ? 'rgba(11, 16, 32, 0.85)' : 'rgba(9, 13, 27, 0.5)',
          borderColor: isScrolled ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled 
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(99, 102, 241, 0.18), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.25)' 
            : '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.08)',
          y: isScrolled ? 2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="max-w-7xl mx-auto backdrop-blur-2xl border flex items-center justify-between relative overflow-hidden"
      >
        {/* Subtle sliding glass highlight line at the top */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />

        {/* Brand Logo */}
        <div 
          onClick={() => setActiveDashboardTab(userSession.isAuthed ? 'overview' : 'landing')} 
          className="cursor-pointer group flex items-center shrink-0 transition-transform active:scale-95"
        >
          <Logo size="md" />
        </div>

        {/* Mobile Menu Toggle */}
        {userSession.isAuthed && (
          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}

        {/* Navigation Elements / Core Workspace Sections */}
        {userSession.isAuthed ? (
          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.01] backdrop-blur-xl rounded-2xl border border-white/5">
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
                className={`px-3 py-1.5 rounded-xl font-bold text-xs tracking-tight transition-colors duration-200 relative ${
                  activeDashboardTab === tab.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeDashboardTab === tab.id && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-indigo-650/30 border border-indigo-500/30 rounded-xl z-[-1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
                    style={{ backgroundColor: 'rgba(79, 70, 229, 0.18)' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.01] backdrop-blur-xl rounded-2xl border border-white/5 font-extrabold text-[11px] tracking-wider uppercase">
            {[
              { href: '#features', label: 'Core Intelligence' },
              { href: '#playground', label: 'Action Sandbox' },
              { href: '#demo', label: 'Interactive Dashboard' }
            ].map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/40 transition-all duration-300 relative select-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* User Account State Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {userSession.isAuthed ? (
            <div className="flex items-center gap-3.5">
              <div className="hidden sm:flex flex-col text-right select-none">
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest leading-none">Workspace Active</span>
                <span className="text-xs text-indigo-200 font-black mt-0.5 max-w-[120px] truncate">{userSession.name}</span>
              </div>
              <div className="h-8.5 w-8.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-indigo-400 font-bold shadow-inner">
                <User className="h-4 w-4" />
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 border border-transparent hover:border-red-500/20 cursor-pointer"
                title="Exit Account"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAuthClick('login')}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all hover:bg-white/[0.04]"
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick('register')}
                className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/15 active:scale-95 hover:shadow-indigo-500/25 transition-all duration-200 border border-indigo-400/20"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {userSession.isAuthed && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl z-40"
          >
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
                onClick={() => {
                  setActiveDashboardTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl font-bold text-sm tracking-tight transition-colors duration-200 text-left ${
                  activeDashboardTab === tab.id
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
