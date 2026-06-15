import { useStore } from '../store/useStore';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Award, Star, ListChecks, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

export default function SkillGapTab() {
  const { activeResult } = useStore();
  const { gapAnalysis } = activeResult;

  // Formulate data for radar chart properly
  const radarData = gapAnalysis.skillsBreakdown.map((item) => ({
    subject: item.skill,
    current: item.proficiency,
    required: item.requiredLevel,
    fullMark: 100
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Metrics Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Percentage Gauge */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-indigo-950/20 to-slate-900/40">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Active Skill Deficiency</span>
            <h2 className="heading-font text-5xl font-black text-rose-500">{gapAnalysis.overallGap}%</h2>
          </div>
          <div className="mt-4 space-y-1 text-xs text-slate-400">
            <p className="text-slate-300 font-bold">Industry Gap Assessment</p>
            <p>You currently align with {(100 - gapAnalysis.overallGap)}% of maximum prerequisites cataloged for target roles.</p>
          </div>
        </div>

        {/* Current Active Core Skills Extraction */}
        <div className="glass-panel p-6 rounded-3xl lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 focus:animate-bounce" />
            <h4 className="heading-font text-base font-bold text-white">Extracted Core Competency Inventory</h4>
          </div>
          <p className="text-slate-400 text-xs">These active technical features were verified from your resume:</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {profileSkills(activeResult.profile.skills, gapAnalysis.currentSkills).map((skill, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 text-xs font-medium bg-indigo-505/10 text-indigo-300 border border-indigo-500/10 rounded-xl"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 2. Radar Comparison Chart & Heatmap Visual Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Evaluation Chart */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Prerequisite vs. Active Vector Comparison</h3>
            <p className="text-slate-400 text-xs mt-1">
              Visualizes your current performance thresholds (Indigo) against elite market metrics (Cyan).
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569' }} />
                <Radar name="Current Proficiency" dataKey="current" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.25} />
                <Radar name="Target Prerequisite" dataKey="required" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-400">
              <span className="h-2.5 w-2.5 rounded bg-indigo-600 block"></span>
              Your Active Level
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
              <span className="h-2.5 w-2.5 rounded bg-cyan-500 block"></span>
              Market Average
            </div>
          </div>
        </div>

        {/* Heatmap Proficiency Grid */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Specific Performance Heatmap</h3>
            <p className="text-slate-400 text-xs mt-1">Detailed evaluation across separate tech sectors.</p>
          </div>

          <div className="space-y-3 max-h-[290px] overflow-y-auto pr-2">
            {gapAnalysis.skillsBreakdown.map((item, idx) => {
              const diff = item.requiredLevel - item.proficiency;
              const hasGap = diff > 0;

              return (
                <div key={idx} className="p-3 bg-slate-900/40 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-white">{item.skill}</span>
                      <span className="text-[10px] text-slate-400 font-medium block">{item.category}</span>
                    </div>
                    {hasGap ? (
                      <span className="px-1.5 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 font-bold border border-amber-500/15 rounded">
                        Gap: -{diff}%
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/15 rounded">
                        Met / Exceeded
                      </span>
                    )}
                  </div>

                  {/* Dual comparative progress bar */}
                  <div className="relative h-2 w-full bg-slate-950/60 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full transition-all duration-1000"
                      style={{ width: `${item.proficiency}%` }}
                    />
                    <div 
                      className="absolute h-full border-r-[3px] border-cyan-400"
                      style={{ left: `${item.requiredLevel}%` }}
                      title={`Target Level: ${item.requiredLevel}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Core Missing Skills Actions List containing dynamic suggestions */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-indigo-400" />
          <h3 className="heading-font text-base font-bold text-white">Top Target Gaps & Learning Alignments</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gapAnalysis.missingSkills.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex flex-col justify-between hover:border-indigo-500/15 transition group">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                    item.priority === 'Critical' ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">Demand: <span className="text-white">{item.demand}</span></span>
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition">{item.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              {/* Resource widget matching item */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-bold">Training Guide:</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold uppercase">{item.resourceType}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-300 truncate max-w-[150px]">{item.resourceName}</span>
                  <a 
                    href={item.resourceLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-1 rounded bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white transition"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Utility mapper to consolidate skills across arrays cleanly
function profileSkills(profileSkills: string[] | undefined, analysisSkills: string[] | undefined): string[] {
  const s = new Set<string>();
  (profileSkills || []).forEach(x => s.add(x));
  (analysisSkills || []).forEach(x => s.add(x));
  return Array.from(s).slice(0, 18);
}
