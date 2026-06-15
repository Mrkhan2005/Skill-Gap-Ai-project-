import { useStore } from '../store/useStore';
import { Users, FilePieChart, TrendingUp, Layers, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminTab() {
  const { adminStats } = useStore();

  const cards = [
    { label: 'Active Platform Registrations', value: adminStats.totalUsers.toLocaleString(), icon: Users, color: 'text-indigo-400 bg-indigo-500/10' },
    { label: 'Secure Resumes Analyzed', value: adminStats.resumesAnalyzed.toLocaleString(), icon: FilePieChart, color: 'text-cyan-400 bg-cyan-500/10' },
    { label: 'Avg Employability Score', value: `${adminStats.avgEmployabilityScore}%`, icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-505/10' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Information */}
      <div>
        <h2 className="heading-font text-xl md:text-2xl font-bold text-white">Mock Corporate Statistics</h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Monitor aggregate platform usage, target roles selection matrices, and common missing capabilities statistics.
        </p>
      </div>

      {/* 2. Numerical Score cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((item, idx) => {
          const IconComponent = item.icon;

          return (
            <div key={idx} className="glass-panel p-6 rounded-3xl flex items-center gap-4 hover:border-indigo-505/10 transition">
              <div className={`p-4 rounded-2xl ${item.color} shrink-0`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block leading-none">{item.label}</span>
                <h3 className="heading-font text-2xl font-black text-white">{item.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Splendid Double Panel: Career distribution & Skill gaps list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel 1: Top Requested Career Roles */}
        <div className="glass-panel p-6 rounded-3xl space-y-5">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Target Roles Distributions</h3>
            <p className="text-slate-400 text-xs mt-1">Tracks candidate interest across major tech careers.</p>
          </div>

          <div className="space-y-4">
            {adminStats.mostRequestedCareers.map((item, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold">{item.name}</span>
                  <span className="font-semibold text-slate-400">{item.percentage}% of submissions</span>
                </div>
                {/* Custom bar matching progress */}
                <div className="w-full bg-slate-950/60 rounded-full h-2 overflow-hidden border border-white/5">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Common technology skill gaps mapped */}
        <div className="glass-panel p-6 rounded-3xl space-y-5">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Common Technological Deficiencies</h3>
            <p className="text-slate-400 text-xs mt-1">Staggers the most frequently logged gaps identified in submissions.</p>
          </div>

          <div className="space-y-4">
            {adminStats.commonSkillGaps.map((item, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-400">{item.percentage}% frequency</span>
                </div>
                {/* Custom bar matching progress */}
                <div className="w-full bg-slate-950/60 rounded-full h-2 overflow-hidden border border-white/5">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
