import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Mail, Lock, User, Sparkles, X, Github } from 'lucide-react';

export default function AuthModal() {
  const { authModalOpen, authModalTab, setAuthModalOpen, setAuthModalTab, login, register } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!authModalOpen) return null;

  const handleClose = () => {
    setAuthModalOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleOAuthClick = (provider: string) => {
    // Generate mock authentication using provided details
    setSuccessMsg(`Securely logged in using external ${provider} Credentials.`);
    setTimeout(() => {
      login(
        provider === 'Google' ? 'executiveemailserves@gmail.com' : 'user@nextmove.ai',
        provider === 'Google' ? 'Executive Admin' : `${provider} Expert`
      );
      handleClose();
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (authModalTab === 'forgot') {
      if (!email) {
        setErrorMsg('Please supply a registered email coordinate.');
        return;
      }
      setSuccessMsg('Reset code transmitted. Check your inbox folders.');
      return;
    }

    if (!email || !password) {
      setErrorMsg('All credential parameters are active requirements.');
      return;
    }

    if (authModalTab === 'register' && !name) {
      setErrorMsg('Full name coordinate is required for registration profiles.');
      return;
    }

    if (authModalTab === 'register') {
      register(email, name);
    } else {
      // Login with credentials
      login(email, name || 'Professional User');
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-3xl glass-panel p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white mb-3">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="heading-font text-2xl font-bold text-white">
            {authModalTab === 'login' && 'Welcome Back'}
            {authModalTab === 'register' && 'Create Intelligence Space'}
            {authModalTab === 'forgot' && 'Restore Access Key'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {authModalTab === 'login' && 'Access your NextMove decision engine account'}
            {authModalTab === 'register' && 'Secure your career roadmap and resume assessment space'}
            {authModalTab === 'forgot' && 'We will coordinate a transition reset sequence'}
          </p>
        </div>

        {/* Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
              {successMsg}
            </div>
          )}

          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Enter Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Email Coordinate</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition"
              />
            </div>
          </div>

          {authModalTab !== 'forgot' && (
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Password</label>
                {authModalTab === 'login' && (
                  <button 
                    type="button"
                    onClick={() => setAuthModalTab('forgot')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition"
                  >
                    Forgot Security?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm transition"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-505 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/25 border border-indigo-500/20 active:scale-95 transition-all text-sm mt-2"
          >
            {authModalTab === 'login' && 'Sign In securely'}
            {authModalTab === 'register' && 'Register secure account'}
            {authModalTab === 'forgot' && 'Transmit Reset Sequence'}
          </button>
        </form>

        {/* Dynamic transition directions */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-400">
            {authModalTab === 'login' && (
              <>
                New to NextMove AI?{' '}
                <button 
                  onClick={() => setAuthModalTab('register')}
                  className="text-indigo-400 hover:text-indigo-300 font-bold transition ml-0.5"
                >
                  Create account today
                </button>
              </>
            )}
            {authModalTab === 'register' && (
              <>
                Already secure?{' '}
                <button 
                  onClick={() => setAuthModalTab('login')}
                  className="text-indigo-400 hover:text-indigo-300 font-bold transition ml-0.5"
                >
                  Sign In instead
                </button>
              </>
            )}
            {authModalTab === 'forgot' && (
              <button 
                onClick={() => setAuthModalTab('login')}
                className="text-indigo-400 hover:text-indigo-300 font-bold transition"
              >
                Return to Login coordinates
              </button>
            )}
          </p>
        </div>

        {/* Divider OR */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <span className="relative bg-[#111827] px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Secure Fast Connect
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleOAuthClick('Google')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition group"
          >
            <span className="text-sm font-semibold text-red-400 group-hover:scale-105 transition-transform">Google</span>
          </button>
          <button
            onClick={() => handleOAuthClick('LinkedIn')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition group"
          >
            <span className="text-sm font-semibold text-cyan-400 group-hover:scale-105 transition-transform">LinkedIn</span>
          </button>
          <button
            onClick={() => handleOAuthClick('GitHub')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition group"
          >
            <Github className="h-5 w-5 text-slate-300 group-hover:scale-105 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
