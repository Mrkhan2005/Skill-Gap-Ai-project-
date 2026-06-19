import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, TrendingUp, CheckCircle2, ShieldCheck, 
  ChevronRight, Circle, Play, AlertTriangle, ArrowRight, Ban, Zap
} from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

interface InteractiveSandboxPreviewProps {
  activePresetModel: 'Developer' | 'Analyst';
  setActivePresetModel: (val: 'Developer' | 'Analyst') => void;
  handleLaunchDashboard: () => void;
}

export default function InteractiveSandboxPreview({ 
  activePresetModel, 
  setActivePresetModel,
  handleLaunchDashboard 
}: InteractiveSandboxPreviewProps) {
  const [activeDecision, setActiveDecision] = useState<'negotiate' | 'pivot' | 'skip'>('negotiate');

  const decisionScenarios = {
    negotiate: {
      type: 'Salary & Compensation Leverage Matrix',
      icon: TrendingUp,
      badge: 'Highly Feasible',
      badgeTheme: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
      title: 'Current Dilemma: Negotiating 2 offers next week, or staying quiet?',
      adviceTitle: 'Recommended Decision: Initiate Parity Leverage Sequence',
      adviceDesc: "Instead of accepting the initial $132,000 baseline, our telemetry indicates US metro parity for Software Developers is currently $148,000. Use our precise 'Technical Delivery metrics' script.",
      metrics: [
        { label: 'Additional Revenue Target', value: '+$16,050/yr', trend: 'High Confidence' },
        { label: 'Calculated Leverage Certainty', value: '92%', trend: 'Verified' }
      ],
      chartData: [
        { name: 'Month 0', NextMove: 132000, Baseline: 132000 },
        { name: 'Month 1', NextMove: 141000, Baseline: 132000 },
        { name: 'Month 2', NextMove: 144500, Baseline: 132000 },
        { name: 'Month 3', NextMove: 148000, Baseline: 133000 },
        { name: 'Month 4', NextMove: 148000, Baseline: 133000 },
        { name: 'Month 5', NextMove: 151500, Baseline: 134000 }
      ]
    },
    pivot: {
      type: 'Career Trajectory Matrix',
      icon: Zap,
      badge: 'In-Demand',
      badgeTheme: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
      title: 'Current Dilemma: Should we focus on general SaaS or specialize in AI platform engineering?',
      adviceTitle: 'Recommended Decision: Execute AI Platform Specialized Pivot',
      adviceDesc: 'Traditional platforms tell you to take 5 Python courses. Our decision engine points to a severe developer talent bottleneck specifically in Kubernetes + Terraform orchestration vectors (33% hiring priority increase).',
      metrics: [
        { label: 'Target Hiring Speed Decrease', value: '14 Days Faster', trend: 'High Velocity' },
        { label: 'Estimated Premium Leverage', value: '+$28,400', trend: 'Premium Growth' }
      ],
      chartData: [
        { name: 'Month 0', NextMove: 110000, Baseline: 110000 },
        { name: 'Month 1', NextMove: 118000, Baseline: 112000 },
        { name: 'Month 2', NextMove: 128000, Baseline: 113000 },
        { name: 'Month 3', NextMove: 138000, Baseline: 115000 },
        { name: 'Month 4', NextMove: 144000, Baseline: 116000 },
        { name: 'Month 5', NextMove: 152000, Baseline: 118000 }
      ]
    },
    skip: {
      type: 'Skill Allocation Bypass Filter',
      icon: Ban,
      badge: 'Bypass Recommended',
      badgeTheme: 'border-rose-500/20 bg-rose-500/10 text-rose-400',
      title: "Current Dilemma: Should I spend $1,800 or 9 weeks on standard 'System Design Certification'?",
      adviceTitle: 'Recommended Decision: Bypass & Shift to Live Portfolio Outputs',
      adviceDesc: 'Do not waste time. Hiring directories currently de-prioritize passive static certifications. We suggest building a real-time cluster portfolio module which adds 4x more visibility on search telemetry.',
      metrics: [
        { label: 'Saved Study Hours', value: '180+ Hours Saved', trend: 'Efficiency Peak' },
        { label: 'Calculated Impact Multiplier', value: '4.2x Higher', trend: 'Verified Impact' }
      ],
      chartData: [
        { name: 'Month 0', NextMove: 95000, Baseline: 95000 },
        { name: 'Month 1', NextMove: 108000, Baseline: 95000 },
        { name: 'Month 2', NextMove: 116000, Baseline: 95000 },
        { name: 'Month 3', NextMove: 122000, Baseline: 96000 },
        { name: 'Month 4', NextMove: 128000, Baseline: 102000 },
        { name: 'Month 5', NextMove: 134000, Baseline: 106000 }
      ]
    }
  };

  const currentData = decisionScenarios[activeDecision];

  return (
    <div className="bg-[#0f1424]/80 backdrop-blur-md p-6 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] border border-indigo-500/15 flex flex-col gap-5">
      {/* Absolute Glow Background Spotlights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Decorative Mock Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-full border border-white/5">
          <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          <span className="h-2 w-2 bg-yellow-500 rounded-full" />
          <span className="h-2 w-2 bg-green-500 rounded-full" />
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase ml-1.5 font-mono">NEXTMOVE INTERACTIVE SANDBOX</span>
        </div>
        
        {/* Real-time self auditing label */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/15 rounded-lg text-emerald-400 text-[9px] font-black uppercase tracking-widest">
          <ShieldCheck className="h-3 w-3 shrink-0" />
          <span>Biased-Audited</span>
        </div>
      </div>

      {/* Primary Dilemma Picker Buttons */}
      <div className="space-y-2 mt-2">
        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500 block">Pick typical career bottleneck model:</label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(decisionScenarios) as Array<keyof typeof decisionScenarios>).map((key) => {
            const isSelected = activeDecision === key;
            const scenario = decisionScenarios[key];
            const BtnIcon = scenario.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveDecision(key)}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all duration-300 flex flex-col items-center gap-1 cursor-pointer select-none ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500/60 text-white shadow-[0_4px_15px_rgba(99,102,241,0.1)]'
                    : 'border-white/5 bg-slate-950/20 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <BtnIcon className={`h-4.5 w-4.5 mb-0.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="text-[10px] capitalize leading-none font-bold truncate w-full">{key === 'skip' ? 'Bypass certification' : key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Main Result Visual Window */}
      <div className="bg-slate-950/40 rounded-[1.75rem] border border-white/5 p-5 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
        <div className="absolute inset-0 bg-[#060913]/25 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDecision}
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 relative z-10 text-left"
          >
            {/* Header / Type */}
            <div className="flex justify-between items-center">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-indigo-400 font-mono">
                {currentData.type}
              </span>
              <span className={`text-[9.5px] px-2 py-0.5 rounded font-black uppercase tracking-wider border ${currentData.badgeTheme}`}>
                {currentData.badge}
              </span>
            </div>

            {/* Title / Question */}
            <div className="space-y-1">
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Active User Bottleneck:</span>
              <p className="text-sm font-black text-white leading-snug">
                {currentData.title}
              </p>
            </div>

            {/* Recommended decision with arrow */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-950/20 to-slate-950/40 border border-white/5 space-y-1 bg-indigo-950/15">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-400/20">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">
                  {currentData.adviceTitle}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                {currentData.adviceDesc}
              </p>
            </div>

            {/* Metrics output comparison and Sparkline Trend Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 items-stretch">
              {/* Numeric Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {currentData.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900/60 rounded-xl border border-white/5 flex flex-col justify-center text-left">
                    <span className="text-[9px] uppercase font-bold text-slate-400">{m.label}</span>
                    <span className="text-sm font-black text-emerald-400 mt-0.5">{m.value}</span>
                    <span className="text-[8px] text-slate-500 font-bold">{m.trend}</span>
                  </div>
                ))}
              </div>

              {/* Sparkline salary growth projection trend using recharts */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400">Decision Value Curve</span>
                  <span className="text-[8.5px] font-extrabold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                    Salary Projection
                  </span>
                </div>
                
                <div className="h-10 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData.chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                      <defs>
                        <linearGradient id="sandboxNextMove" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="sandboxBaseline" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.05}/>
                          <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{ background: '#090d16', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '4px 6px' }}
                        labelStyle={{ display: 'none' }}
                        itemStyle={{ fontSize: '9px', padding: '0', color: '#fff' }}
                        formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`, '']}
                      />
                      <Area type="monotone" dataKey="NextMove" name="NextMove" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#sandboxNextMove)" isAnimationActive={true} />
                      <Area type="monotone" dataKey="Baseline" name="Baseline" stroke="#64748b" strokeWidth={1} strokeDasharray="3 3" fillOpacity={1} fill="url(#sandboxBaseline)" isAnimationActive={true} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-[7.5px] font-bold text-slate-500 pt-1 border-t border-white/5 uppercase">
                  <span>Start Pivot</span>
                  <span>Month 5</span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dynamic Profile Toggle triggers & Action call to action */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/5 justify-between">
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => setActivePresetModel('Developer')}
            className={`px-3 py-1.5 text-[9.5px] font-black uppercase tracking-wider rounded-lg border transition duration-200 select-none ${
              activePresetModel === 'Developer' 
                ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-300' 
                : 'border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Developer Profile
          </button>
          <button 
            type="button"
            onClick={() => setActivePresetModel('Analyst')}
            className={`px-3 py-1.5 text-[9.5px] font-black uppercase tracking-wider rounded-lg border transition duration-200 select-none ${
              activePresetModel === 'Analyst' 
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300' 
                : 'border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Analyst Profile
          </button>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLaunchDashboard}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-md shadow-indigo-950/20 active:scale-95 cursor-pointer select-none flex items-center gap-1.5"
        >
          <span>Run My Analysis</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </motion.button>
      </div>

    </div>
  );
}
