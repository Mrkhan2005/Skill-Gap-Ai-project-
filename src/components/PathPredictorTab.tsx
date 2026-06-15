import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Target, TrendingUp, AlertTriangle, Compass, CheckCircle2, Award, Zap } from 'lucide-react';

export default function PathPredictorTab() {
  const { activeResult } = useStore();
  const { predictions } = activeResult;

  const roles = [
    { id: 'AI Engineer', label: 'AI Engineer', desc: 'Focuses on building custom generative models, training models, and integrating LLMs.' },
    { id: 'Data Analyst', label: 'Data Analyst', desc: 'Curates statistical indicators, aggregates databases, and designs executive BI reports.' },
    { id: 'Product Manager', label: 'Product Manager', desc: 'Coordinates system architecture, product roadmaps, agile planning, and business coordinates.' },
    { id: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst', desc: 'Formulates application security compliance matrices, protects pipelines, and schedules security checks.' },
    { id: 'Business Analyst', label: 'Business Analyst', desc: 'Defines operational targets, queries databases, and helps synchronize corporate goals.' }
  ];

  const [activeRoleId, setActiveRoleId] = useState('AI Engineer');

  // Retrieve matching prediction. If not found inside current results (e.g. customized name uploads), generate standard fallback
  const predictionObj = predictions[activeRoleId] || {
    targetRole: activeRoleId,
    currentReadiness: 40,
    futureReadiness: 85,
    successProbability: 72,
    estimatedTimeWeeks: 16,
    recommendedLearningPath: [
      `Enlist in expert professional ${activeRoleId} certifications`,
      "Construct 2 intermediate sandbox applications inside Git repositories",
      "Revise advanced system logic and database optimization matrices",
      "Engage with regional technology and business mastermind networks"
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Information */}
      <div>
        <h2 className="heading-font text-xl md:text-2xl font-bold text-white">Target Career Path Forecast</h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Evaluate transition alignments, preparedness benchmarks, and training coordinates for your next career step.
        </p>
      </div>

      {/* 2. Double-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Role Selector List */}
        <div className="lg:col-span-1 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Select Target Role</span>
          {roles.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveRoleId(item.id)}
              className={`w-full text-left p-4 rounded-2xl border transition duration-300 relative group flex flex-col justify-between ${
                activeRoleId === item.id
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 shadow-xl shadow-indigo-650/5'
                  : 'border-white/5 bg-slate-900/40 hover:bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Target className={`h-4.5 w-4.5 transition ${activeRoleId === item.id ? 'text-indigo-400 scale-110' : 'text-slate-500'}`} />
                <h4 className="font-bold text-white text-sm">{item.label}</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal mt-1.5 font-medium">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Prediction Results Board Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Predictor Scoreboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Box 1: current readiness */}
            <div className="glass-panel p-5 rounded-2xl text-center space-y-1 bg-gradient-to-br from-slate-900 to-indigo-950/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Current Preparedness</span>
              <h3 className="heading-font text-4xl font-black text-rose-400">{predictionObj.currentReadiness}%</h3>
              <p className="text-[10px] text-slate-500">Based on active capabilities.</p>
            </div>

            {/* Box 2: future readiness */}
            <div className="glass-panel p-5 rounded-2xl text-center space-y-1 bg-gradient-to-br from-slate-900 to-cyan-950/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Future Aligned Benchmark</span>
              <h3 className="heading-font text-4xl font-black text-cyan-400">{predictionObj.futureReadiness}%</h3>
              <p className="text-[10px] text-slate-500">Upon complete roadmap execution.</p>
            </div>

            {/* Box 3: transition weeks */}
            <div className="glass-panel p-5 rounded-2xl text-center space-y-1 bg-gradient-to-br from-slate-900 to-emerald-950/20">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Est. Transition Time</span>
              <h3 className="heading-font text-4xl font-black text-emerald-400">{predictionObj.estimatedTimeWeeks} <span className="text-sm font-semibold text-slate-400">Weeks</span></h3>
              <p className="text-[10px] text-slate-500">With consistent focused study.</p>
            </div>

          </div>

          {/* Success probability indicator */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center gap-1.5 justify-center md:justify-start">
                <TrendingUp className="h-4 w-4 text-indigo-400 animate-bounce" />
                <h4 className="heading-font text-sm font-bold text-white">Transition Success Probability</h4>
              </div>
              <p className="text-slate-400 text-xs">A comprehensive assessment incorporating experience overlaps and current learning capacity.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-950 rounded-full h-3 overflow-hidden border border-white/5">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${predictionObj.successProbability}%` }}></div>
              </div>
              <span className="heading-font font-black text-white text-lg">{predictionObj.successProbability}%</span>
            </div>
          </div>

          {/* Training pathway recommendation listing */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-400" />
              <h4 className="heading-font text-base font-bold text-white">Recommended Target Learning Steps</h4>
            </div>

            <div className="space-y-3">
              {predictionObj.recommendedLearningPath.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-xl border border-white/5 hover:border-indigo-500/15 transition">
                  <div className="h-6 w-6 rounded-lg bg-indigo-505/10 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
