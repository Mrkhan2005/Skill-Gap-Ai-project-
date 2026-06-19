import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ResumeUpload from './components/ResumeUpload';
import Logo from './components/Logo';
import GlowTracker from './components/GlowTracker';
import InteractiveSandboxPreview from './components/InteractiveSandboxPreview';
import { motion, AnimatePresence } from 'motion/react';

// Page Tabs Elements
import { lazy, Suspense } from 'react';
const OverviewTab = lazy(() => import('./components/OverviewTab'));
const SkillGapTab = lazy(() => import('./components/SkillGapTab'));
const RoadmapTab = lazy(() => import('./components/RoadmapTab'));
const PathPredictorTab = lazy(() => import('./components/PathPredictorTab'));
const SalaryTab = lazy(() => import('./components/SalaryTab'));
const CoachTab = lazy(() => import('./components/CoachTab'));
const JobMatchingTab = lazy(() => import('./components/JobMatchingTab'));
const InterviewTab = lazy(() => import('./components/InterviewTab'));
const AnalyticsTab = lazy(() => import('./components/AnalyticsTab'));
const AdminTab = lazy(() => import('./components/AdminTab'));

// Styling Icons
import { 
  Sparkles, ShieldCheck, Zap, Code2, Award, Compass, 
  Workflow, FileText, CheckCircle2, ChevronRight, Layers, ArrowRight,
  Target, BarChart3, TrendingUp, AlertTriangle, Users, BookOpen, Download
} from 'lucide-react';
import { exportResultToPDF } from './utils/pdfGenerator';

export default function App() {
  const { userSession, activeDashboardTab, setActiveDashboardTab, resetToMockResult, setAuthModalOpen, activeResult } = useStore();

  const [activePresetModel, setActivePresetModel] = useState<'Developer' | 'Analyst'>('Developer');

  // Sync profile presets in landing preview
  useEffect(() => {
    resetToMockResult(activePresetModel === 'Developer' ? 'Software Developer' : 'Data Analyst');
  }, [activePresetModel]);

  const featuresList = [
    { title: 'AI Resume Intelligence', icon: FileText, desc: 'Extracts deep credentials and metric histories directly using world-class parsing algorithms.' },
    { title: 'Skill Gap Detection', icon: AlertTriangle, desc: 'Compares capabilities against live corporate averages to identify missing elements.' },
    { title: 'Career Path Prediction', icon: Target, desc: 'Computes transition feasibility rates, success probability scores, and timeframe estimates.' },
    { title: 'Salary Growth Forecasting', icon: TrendingUp, desc: 'Graphs exact upskilled compensation curves across 1-year, 3-year, and 5-year increments.' },
    { title: 'AI Career Mentor', icon: Sparkles, desc: 'Real-time conversational consultant helping coordinate scripts and interview techniques.' },
    { title: 'Learning Roadmap Generator', icon: Compass, desc: 'Delivers progressive 30-day, 60-day, through 12-month timeline targets.' },
    { title: 'Job Readiness Score', icon: ShieldCheck, desc: 'Calculates overall structural alignments matching resume attributes against corporate requisites.' },
    { title: 'Interview Assessment', icon: Award, desc: 'Generates specialized behavioural and technical scenario assessments with guided solutions.' }
  ];

  const handleLaunchDashboard = () => {
    if (!userSession.isAuthed) {
      setAuthModalOpen(true);
    } else {
      setActiveDashboardTab('overview');
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-[#F8FAFC] flex flex-col antialiased selection:bg-indigo-500 selection:text-white pb-12 relative overflow-hidden">
      
      {/* Animated Liquid Lamp Blobs for the Glass Liquid Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] liquid-blob-1 opacity-65" />
        <div className="absolute bottom-[10%] right-[-15%] w-[70%] h-[70%] liquid-blob-2 opacity-60" />
        <div className="absolute top-[35%] left-[25%] w-[50%] h-[50%] liquid-blob-3 opacity-45" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <GlowTracker />
        <Navbar />
        <AuthModal />

        {/* Primary Routing Core: Workspace vs Landing Page */}
        {userSession.isAuthed && activeDashboardTab !== 'landing' ? (
          
          // 1. workspace dashboard
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8 animate-in fade-in duration-500 relative z-10">
            
            {/* Workspace Title Greeting node using premium glass liquid look */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-5 glass-liquid-panel p-5 md:p-6 border border-white/10 bg-gradient-to-r from-white/[0.02] to-white/[0.04]">
              <div className="space-y-1 w-full md:w-auto text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">Secure Career Workspace</span>
                <h1 className="heading-font text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Career Intelligence Center
                </h1>
                <p className="text-slate-400 text-xs">
                  Active Analysis: <span className="text-indigo-400 font-bold">{activePresetModel === 'Developer' ? 'Software Developer Profile' : 'Data Analyst Profile'}</span>
                </p>
              </div>

              {/* Switch Core Mock Results */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto md:justify-end">
                <div className="flex gap-2 w-full sm:w-auto flex-1 sm:flex-none">
                  <button
                    onClick={() => {
                      setActivePresetModel('Developer');
                      resetToMockResult('Software Developer');
                    }}
                    className={`flex-1 sm:flex-none text-center justify-center px-3 py-1.5 rounded-xl border text-xs font-bold transition duration-200 ${
                      activePresetModel === 'Developer'
                        ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                        : 'border-white/5 hover:border-white/10 text-slate-400'
                    }`}
                  >
                    Developer Tech Stack
                  </button>
                  <button
                    onClick={() => {
                      setActivePresetModel('Analyst');
                      resetToMockResult('Data Analyst');
                    }}
                    className={`flex-1 sm:flex-none text-center justify-center px-3 py-1.5 rounded-xl border text-xs font-bold transition duration-200 ${
                      activePresetModel === 'Analyst'
                        ? 'bg-cyan-600/15 border-cyan-500 text-cyan-300'
                        : 'border-white/5 hover:border-white/10 text-slate-400'
                    }`}
                  >
                    Data Analyst Hub
                  </button>
                </div>
                
                <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />

                <button
                  onClick={() => exportResultToPDF(activeResult)}
                  className="w-full sm:w-auto justify-center px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-900/10 active:scale-[0.98] border border-emerald-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Export entire career roadmap & talent metrics report to PDF"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export PDF Report</span>
                </button>
              </div>
            </div>

          {/* Quick tab ribbon selector for mobile viewports */}
          <div className="flex lg:hidden overflow-x-auto gap-1 border-b border-white/5 pb-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Index' },
              { id: 'skills', label: 'Skill Gap' },
              { id: 'roadmap', label: 'Roadmap' },
              { id: 'predictions', label: 'Forecast' },
              { id: 'coachtab', label: 'AI Coach' },
              { id: 'jobmatches', label: 'Job Match' },
              { id: 'prep', label: 'Interview' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'admin', label: 'Admin' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDashboardTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  activeDashboardTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 bg-[#121A2B]/40 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub Tab View Port Active Frame Render */}
          <div className="min-h-[50vh]">
            {activeDashboardTab === 'overview' && <OverviewTab />}
            {activeDashboardTab === 'skills' && <SkillGapTab />}
            {activeDashboardTab === 'roadmap' && <RoadmapTab />}
            {activeDashboardTab === 'predictions' && <PathPredictorTab />}
            {activeDashboardTab === 'coachtab' && <CoachTab />}
            {activeDashboardTab === 'jobmatches' && <JobMatchingTab />}
            {activeDashboardTab === 'prep' && <InterviewTab />}
            {activeDashboardTab === 'analytics' && <AnalyticsTab />}
            {activeDashboardTab === 'admin' && <AdminTab />}
          </div>

        </main>

      ) : (
        
        // 2. beautiful enterprise landing page
        <main className="flex-1">
          
          {/* Animated Hero Canvas */}
          <section className="relative px-4 sm:px-8 pt-12 pb-24 md:pt-20 md:pb-28 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
            
            {/* Elegant Floating Decorative Particles */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute inset-0 ai-glow-bg pointer-events-none" />

            {/* Left Content Column */}
            <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
              
              {/* Premium Clean Brand Logo lockup converts user's draft to live pixel-perfect SVG graphics */}
              <div className="flex flex-col items-center lg:items-start gap-4">
                <div className="p-4 rounded-[2rem] bg-slate-900/60 border border-white/5 shadow-2xl hover:border-white/10 transition-colors">
                  <Logo withSubtitle={true} size="lg" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-550/10 to-cyan-550/10 border border-indigo-500/15 text-indigo-300 font-extrabold text-[10px] uppercase tracking-widest leading-none shadow-inner">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  Decision Telemetry Hub Live
                </div>
              </div>
              
              <h1 className="heading-font text-4.5xl sm:text-5.5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white">
                Don't just learn. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">
                  Decide your Next Move.
                </span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-semibold select-none">
                Traditional tools flood you with random certification courses saying you CAN learn. 
                <strong className="text-white"> NextMove AI</strong> analyzes real talent metrics and live job scraper vectors to reveal exactly 
                <span className="text-indigo-450 text-indigo-300 font-bold"> what key decision to execute next </span> to capture high-value salary leverage, optimal transitions, and fast hiring priority.
              </p>

              {/* Action Coordinates CTA with modern glow styles */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLaunchDashboard}
                  className="relative overflow-hidden px-10 py-4.5 rounded-2xl bg-gradient-to-r from-indigo-550 via-indigo-600 to-purple-600 text-white font-black text-lg tracking-tight shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_45px_rgba(99,102,241,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-indigo-400/20 group/btn"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Analyze My Resume Now
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('playground');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white font-bold text-lg transition-all"
                >
                  Explore Interactive Sandbox
                </motion.button>
              </div>

              {/* Verified analyses badge built in design */}
              <div className="flex items-center justify-center lg:justify-start gap-5 pt-3">
                <div className="flex -space-x-3.5">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1020] bg-indigo-550 flex items-center justify-center text-[10px] font-black tracking-wider text-white select-none">JD</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1020] bg-cyan-500 flex items-center justify-center text-[10px] font-black tracking-wider text-white select-none">AS</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1020] bg-violet-500 flex items-center justify-center text-[10px] font-black tracking-wider text-white select-none">MK</div>
                </div>
                <div className="text-xs text-slate-400 font-semibold text-left">
                  <span className="text-white font-black block">14,800+ Live Jobs Indexed</span>
                  Directly mapping credential metrics against actual employer priorities.
                </div>
              </div>
            </div>

            {/* Right Interactive Dashboard preview sandbox */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10" id="playground">
              <InteractiveSandboxPreview 
                activePresetModel={activePresetModel} 
                setActivePresetModel={setActivePresetModel}
                handleLaunchDashboard={handleLaunchDashboard}
              />
            </div>

          </section>

          {/* Premium stats banner */}
          <section className="border-y border-white/5 bg-slate-950/20 py-12 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { stat: '+$24,500', label: 'Average Salary Leverage' },
                { stat: '14,800+', label: 'Real-time Vacancy Tracks' },
                { stat: '98.3%', label: 'Decision Match Accuracy' },
                { stat: '18 Days', label: 'Median Transition Speed' }
              ].map((item, idx) => (
                <div key={idx} className="text-center space-y-1">
                  <h3 className="heading-font text-3xl sm:text-4xl font-black text-white bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight">{item.stat}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Feature Section Grid */}
          <section id="features" className="px-4 sm:px-8 py-24 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <span className="text-xs font-black text-indigo-400 uppercase tracking-widest block">System Diagnostics</span>
              <h2 className="heading-font text-3xl md:text-5xl font-black text-white tracking-tight">
                Designed for high stakes execution.
              </h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                Traditional assessment grids leave you guessing. NextMove AI leverages 8 core intelligence dimensions to guide your precise career trajectory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuresList.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div 
                    key={idx} 
                    className="glass-panel p-7 rounded-[2rem] space-y-4 hover:border-indigo-505/25 hover:bg-slate-900/40 transition duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.01] group-hover:bg-indigo-500/[0.04] blur-2xl rounded-full transition-all duration-300" />
                    <div className="p-3 w-fit rounded-2xl bg-indigo-500/10 border border-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                      <IconComponent className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-white text-sm group-hover:text-indigo-400 transition">{feat.title}</h4>
                        <span className="text-[8.5px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 rounded font-black uppercase">Active</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-semibold">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Initial Demo Triggering Section */}
          <section id="demo" className="px-4 sm:px-8 py-12 max-w-3xl mx-auto">
            <ResumeUpload />
          </section>

        </main>
      )}

      {/* Footer credits and details information */}
      <footer className="mt-16 border-t border-white/5 pt-8 px-4 text-center max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium relative z-10">
        <p>© 2026 NextMove AI • Google Cloud Run Ecosystem.</p>
        <div className="flex gap-4">
          <a href="#features" className="hover:text-slate-300 transition">Credentials</a>
          <a href="#demo" className="hover:text-slate-300 transition">Integrations</a>
          <span className="text-indigo-500 font-bold">Secure Core Active</span>
        </div>
      </footer>
      </div>
    </div>
  );
}
