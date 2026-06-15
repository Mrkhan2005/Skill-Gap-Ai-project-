import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ResumeUpload from './components/ResumeUpload';
import Logo from './components/Logo';

// Page Tabs Elements
import OverviewTab from './components/OverviewTab';
import SkillGapTab from './components/SkillGapTab';
import RoadmapTab from './components/RoadmapTab';
import PathPredictorTab from './components/PathPredictorTab';
import SalaryTab from './components/SalaryTab';
import CoachTab from './components/CoachTab';
import JobMatchingTab from './components/JobMatchingTab';
import InterviewTab from './components/InterviewTab';
import AnalyticsTab from './components/AnalyticsTab';
import AdminTab from './components/AdminTab';

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
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] flex flex-col antialiased selection:bg-indigo-500 selection:text-white pb-12">
      <Navbar />
      <AuthModal />

      {/* Primary Routing Core: Workspace vs Landing Page */}
      {userSession.isAuthed && activeDashboardTab !== 'landing' ? (
        
        // 1. workspace dashboard
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8 animate-in fade-in duration-500">
          
          {/* Workspace Title Greeting node */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/40 p-6 rounded-3xl border border-white/5 bg-gradient-to-r from-indigo-950/10 via-transparent to-cyan-950/10">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Secure Career Workspace</span>
              <h1 className="heading-font text-xl md:text-2xl font-black text-white">
                Career Intelligence Center
              </h1>
              <p className="text-slate-400 text-xs">
                Active Analysis: <span className="text-indigo-400 font-bold">{activePresetModel === 'Developer' ? 'Software Developer Profile' : 'Data Analyst Profile'}</span>
              </p>
            </div>

            {/* Switch Core Mock Results */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => {
                  setActivePresetModel('Developer');
                  resetToMockResult('Software Developer');
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition duration-200 ${
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
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition duration-200 ${
                  activePresetModel === 'Analyst'
                    ? 'bg-cyan-600/15 border-cyan-500 text-cyan-300'
                    : 'border-white/5 hover:border-white/10 text-slate-400'
                }`}
              >
                Data Analyst Hub
              </button>
              
              <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />

              <button
                onClick={() => exportResultToPDF(activeResult)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-900/10 active:scale-[0.98] border border-emerald-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Export entire career roadmap & talent metrics report to PDF"
              >
                <Download className="h-3.5 w-3.5" />
                Export PDF Report
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

          {/* Dedicated bottom module for uploading raw document inside active dashboard */}
          <div className="border-t border-white/5 pt-12">
            <div className="max-w-3xl mx-auto">
              <ResumeUpload />
            </div>
          </div>

        </main>

      ) : (
        
        // 2. beautiful enterprise landing page
        <main className="flex-1">
          
          {/* Animated Hero Canvas */}
          <section className="relative px-4 sm:px-8 py-16 md:py-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 overflow-hidden">
            
            {/* Elegant Floating Decorative Particles */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#4F46E5]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 ai-glow-bg pointer-events-none" />

            {/* Left Content Column */}
            <div className="flex-1 space-y-6 text-center lg:text-left relative z-10">
              {/* Premium Clean Brand Logo lockup converts user's draft to live pixel-perfect SVG graphics */}
              <div className="flex flex-col items-center lg:items-start gap-4 pb-2">
                <div className="p-4 rounded-3xl bg-[#121A2B]/60 border border-white/5 shadow-2xl hover:border-white/10 transition-colors">
                  <Logo withSubtitle={true} size="lg" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-[10px] uppercase tracking-widest leading-none">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  Corporate Alignment Engine Live
                </div>
              </div>
              
              <h1 className="heading-font text-4.5xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                Stop Guessing Your Career. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400">Let AI Show You The Way.</span>
              </h1>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                Upload your resume and receive a personalized career roadmap, skill gap analysis, salary growth prediction, and AI career coaching powered by Gemini models.
              </p>

              {/* Action Coordinates CTA with modern glow styles */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleLaunchDashboard}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] text-white font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Analyze My Resume
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <button
                  onClick={() => {
                    setActivePresetModel('Developer');
                    setActiveDashboardTab('overview');
                  }}
                  className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg transition-all"
                >
                  Watch Demo
                </button>
              </div>

              {/* Verified analyses badge built in design */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1020] bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow">JD</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1020] bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-white shadow">AS</div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#0B1020] bg-violet-500 flex items-center justify-center text-[10px] font-bold text-white shadow">MK</div>
                </div>
                <div className="text-sm text-slate-500">
                  <span className="text-white font-semibold">12k+ Professional Analyses</span> completed this month
                </div>
              </div>
            </div>

            {/* Right Interactive Dashboard preview sandbox */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
              <div className="bg-[#121A2B] p-6 rounded-3xl relative overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/10 flex flex-col gap-6">
                
                {/* Visual Title */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 bg-red-500 rounded-full"></span>
                    <span className="h-2.5 w-2.5 bg-yellow-500 rounded-full"></span>
                    <span className="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Platform Sandbox Preview</span>
                </div>

                {/* Dashboard Grid inside Mockups */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Metric 1 */}
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 text-center space-y-1">
                    <span className="text-[9px] font-bold tracking-wide uppercase text-slate-400 block">Resume Score</span>
                    <h3 className="heading-font text-3xl font-black text-emerald-400">88%</h3>
                    <div className="w-16 h-1 bg-emerald-500/20 rounded mx-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-400 w-[88%] rounded"></div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 text-center space-y-1">
                    <span className="text-[9px] font-bold tracking-wide uppercase text-slate-400 block">Readiness Meter</span>
                    <h3 className="heading-font text-3xl font-black text-indigo-400">78%</h3>
                    <div className="w-16 h-1 bg-indigo-500/20 rounded mx-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-indigo-500 w-[78%] rounded"></div>
                    </div>
                  </div>

                  {/* Chart representation mockup */}
                  <div className="col-span-2 p-4 bg-slate-900/60 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                      <span>Salary Growth Projection</span>
                      <span className="text-indigo-400 font-black">+42% Growth</span>
                    </div>
                    {/* Simplified glowing mini graph using vectors */}
                    <div className="h-12 w-full flex items-end justify-between px-1 bg-slate-950/20 rounded-lg pt-4 relative overflow-hidden">
                      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <path d="M0,18 Q20,15 40,8 T80,4 T100,1" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="100" strokeDashoffset="0" className="animate-pulse" />
                      </svg>
                      <span className="text-[8px] font-bold text-slate-500">Current</span>
                      <span className="text-[8px] font-bold text-indigo-400">Completion</span>
                    </div>
                  </div>
                </div>

                {/* Simulated interactive controller elements */}
                <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                  <button 
                    onClick={() => setActivePresetModel('Developer')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wide rounded-xl border transition ${
                      activePresetModel === 'Developer' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Tech Career
                  </button>
                  <button 
                    onClick={() => setActivePresetModel('Analyst')}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wide rounded-xl border transition ${
                      activePresetModel === 'Analyst' ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300' : 'border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Analytics Career
                  </button>
                </div>

              </div>
            </div>

          </section>

          {/* Core Feature Section Grid */}
          <section id="features" className="px-4 sm:px-8 py-20 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block font-serif">Enterprise Utilities</span>
              <h2 className="heading-font text-3xl md:text-4xl font-black text-white tracking-tight">
                Complete Career Realignment Engine
              </h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
                Discover the 8 advanced metrics built autonomously on robust Gemini models.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuresList.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div 
                    key={idx} 
                    className="glass-panel p-6 rounded-3xl space-y-4 hover:border-indigo-505/15 hover:bg-slate-900/40 transition duration-300 group"
                  >
                    <div className="p-3 w-fit rounded-2xl bg-slate-900 border border-white/5 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-white text-sm group-hover:text-indigo-400 transition">{feat.title}</h4>
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
      <footer className="mt-16 border-t border-white/5 pt-8 px-4 text-center max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
        <p>© 2026 SkillGap AI • Google Cloud Run Ecosystem.</p>
        <div className="flex gap-4">
          <a href="#features" className="hover:text-slate-300 transition">Credentials</a>
          <a href="#demo" className="hover:text-slate-300 transition">Integrations</a>
          <span className="text-indigo-500 font-bold">Secure Core Active</span>
        </div>
      </footer>
    </div>
  );
}
