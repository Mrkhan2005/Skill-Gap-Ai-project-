import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { exportResultToPDF } from '../utils/pdfGenerator';
import { Download } from 'lucide-react';

// Lazy-loaded tab components
import { lazy, Suspense } from 'react';
const OverviewTab = lazy(() => import('../components/OverviewTab'));
const SkillGapTab = lazy(() => import('../components/SkillGapTab'));
const RoadmapTab = lazy(() => import('../components/RoadmapTab'));
const PathPredictorTab = lazy(() => import('../components/PathPredictorTab'));
const SalaryTab = lazy(() => import('../components/SalaryTab'));
const CoachTab = lazy(() => import('../components/CoachTab'));
const JobMatchingTab = lazy(() => import('../components/JobMatchingTab'));
const InterviewTab = lazy(() => import('../components/InterviewTab'));
const AnalyticsTab = lazy(() => import('../components/AnalyticsTab'));
const AdminTab = lazy(() => import('../components/AdminTab'));

const TAB_ITEMS = [
  { id: 'overview', label: 'Career Index' },
  { id: 'skills', label: 'Skill Gap' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'predictions', label: 'Forecast' },
  { id: 'salary', label: 'Salary' },
  { id: 'coachtab', label: 'AI Coach' },
  { id: 'jobmatches', label: 'Job Match' },
  { id: 'prep', label: 'Interview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'admin', label: 'Admin' },
];

function TabFallback() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="h-8 w-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
    </div>
  );
}

export default function DashboardPage() {
  const { tab = 'overview' } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const { userSession, resetToMockResult, activeResult } = useStore();
  const [activePresetModel, setActivePresetModel] = useState<'Developer' | 'Analyst'>('Developer');

  // Redirect to landing if not authenticated
  useEffect(() => {
    if (!userSession.isAuthed) {
      navigate('/', { replace: true });
    }
  }, [userSession.isAuthed, navigate]);

  if (!userSession.isAuthed) {
    return null;
  }

  const currentTab = tab || 'overview';

  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview': return <OverviewTab />;
      case 'skills': return <SkillGapTab />;
      case 'roadmap': return <RoadmapTab />;
      case 'predictions': return <PathPredictorTab />;
      case 'salary': return <SalaryTab />;
      case 'coachtab': return <CoachTab />;
      case 'jobmatches': return <JobMatchingTab />;
      case 'prep': return <InterviewTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'admin': return <AdminTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8 animate-in fade-in duration-500 relative z-10">
      
      {/* Workspace Title Greeting */}
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

        {/* Profile Switcher + Export */}
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

      {/* Mobile tab ribbon */}
      <div className="flex lg:hidden overflow-x-auto gap-1 border-b border-white/5 pb-2 scrollbar-none">
        {TAB_ITEMS.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => navigate(`/dashboard/${tabItem.id}`)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              currentTab === tabItem.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 bg-[#121A2B]/40 border border-white/5'
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Suspense fallback={<TabFallback />}>
        <div className="min-h-[50vh]" key={currentTab}>
          {renderTabContent()}
        </div>
      </Suspense>
    </main>
  );
}
