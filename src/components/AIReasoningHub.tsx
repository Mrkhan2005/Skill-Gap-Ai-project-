import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Cpu, FileSearch, Target, TrendingUp, 
  ArrowRight, CheckCircle2, ShieldAlert, Award, FileText
} from 'lucide-react';

export default function AIReasoningHub() {
  const { activeResult } = useStore();
  const [activeStage, setActiveStage] = useState<'resume' | 'goal' | 'jd' | 'market'>('resume');

  const { profile, scores, gapAnalysis, predictions, futureProof } = activeResult;

  // Customized details based on active results (Alex Rivera / Software Developer, vs Marcus Vance / Data Analyst)
  const isDeveloper = profile.title.toLowerCase().includes('frontend') || profile.title.toLowerCase().includes('developer');

  // Multi-dimensional dynamic reasoning blocks
  const reasoningStages = {
    resume: {
      id: 'resume' as const,
      title: 'Resume Parse & NLP Extraction',
      short: 'ATS Readability & Tech Profile Scoring',
      icon: FileSearch,
      color: 'from-indigo-500 to-indigo-600',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      description: 'The semantic parser reads the raw text, segments experience timelines, maps technical skills, and matches against standardized corporate capabilities.',
      metrics: [
        { label: 'ATS Score Verification', value: `${scores.resumeStrength}/100`, status: 'Valid' },
        { label: 'Timeline Consistency', value: `${profile.experience[0]?.duration || 'Continuous'}`, status: 'Strong' },
        { label: 'Identified Skill Nodes', value: `${profile.skills.length} nodes`, status: 'Checked' }
      ],
      insights: [
        `Parsed career tenure of '${profile.experience[0]?.role || 'Active Role'}' at ${profile.experience[0]?.company || 'Active Company'}.`,
        `Identified main tech expertise cluster: [${profile.skills.slice(0, 4).join(', ')}].`,
        `Evaluated achievements index for safety: High-impact validation words found ("Won 2nd place", "ETL pipelines", "Lighthouse optimization").`
      ]
    },
    goal: {
      id: 'goal' as const,
      title: 'Dynamic Gap & Transition Pathway',
      short: 'Path forecast & preparation index mapping',
      icon: Target,
      color: 'from-cyan-500 to-cyan-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      description: 'Projects candidate credentials onto the chosen career trajectory. Calculates readiness matrices and calculates the exact weeks needed to transition.',
      metrics: [
        { label: 'Target Readiness Gap', value: `${gapAnalysis.overallGap}% Gap`, status: 'Resolving' },
        { label: 'Estimated Weeks to Target', value: `${predictions['AI Engineer']?.estimatedTimeWeeks || 28} Wks`, status: 'Calculated' },
        { label: 'Success Likelihood', value: `${predictions['AI Engineer']?.successProbability || 65}% Probability`, status: 'Steady' }
      ],
      insights: [
        `Targeting higher capability roles. Verified missing critical foundations in candidates skills breakdown.`,
        `Identified '${gapAnalysis.missingSkills[0]?.name || 'Next.js'}' as highest priority gap based on current expertise.`,
        `Preserved learning timeline: suggested a robust 30-60-90 day progress roadmap targeting certifications/builds.`
      ]
    },
    jd: {
      id: 'jd' as const,
      title: 'JD Scraper & Match Scoring',
      short: 'Live requirements alignment & traits modeling',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      description: 'Scores structural alignment against live job description keywords. Compares candidates certifications & projects to find candidate strengths and deficits.',
      metrics: [
        { label: 'Average Match Strength', value: `${scores.employabilityIndex}/100`, status: 'Competitive' },
        { label: 'Matching Employers', value: `${activeResult.jobMatches.length} Direct Fits`, status: 'Active' },
        { label: 'Defensive Skills Required', value: `${gapAnalysis.missingSkills.length} Core Missing`, status: 'High Alert' }
      ],
      insights: [
        `Analyzed alignment against prime listings including ${activeResult.jobMatches.map(j => j.company).join(' & ')}.`,
        `Core strengths matching listings: ${activeResult.jobMatches[0]?.strengthAreas.slice(0, 3).join(', ') || 'Skills matches'}.`,
        `Warning: flagged gaps in required traits for premium salary tiers. Recommended: ${activeResult.jobMatches[0]?.improvementSuggestions[0] || 'Upgrade skills'}.`
      ]
    },
    market: {
      id: 'market' as const,
      title: 'Market Trends & Future Immunities',
      short: 'Anti-automation & demand disruption matrices',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: 'Cross-references the active profile with modern global industrial trends, compensation forecasts, automation risks, and emerging technologies.',
      metrics: [
        { label: 'Market Demand Weight', value: `${scores.marketDemand}/100`, status: 'Very High' },
        { label: 'Automation Disruption Risk', value: `${futureProof.automationRisk} Risk`, status: 'Safe' },
        { label: 'Upskilled Compensation Multiplier', value: `+$${((activeResult.salaryForecast.futureSalaryEstimate - activeResult.salaryForecast.currentSalaryEstimate)/1000).toFixed(0)}k/Year`, status: 'Exponential' }
      ],
      insights: [
        `Disruption parameters calculated: ${futureProof.stabilityExplanation}`,
        `Emerging skills recommended to lock down: [${futureProof.emergingSkills.slice(0, 3).join(', ')}].`,
        `Declining skills warned for early retirement: [${futureProof.decliningSkills.slice(0, 3).join(', ')}].`
      ]
    }
  };

  const activeStageData = reasoningStages[activeStage];

  return (
    <div className="glow-card p-6 border border-white/10 bg-slate-950/20 space-y-6 relative overflow-hidden rounded-3xl">
      {/* Decorative gradient overlay */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header and subtitle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Dynamic AI Decision Engine</span>
          </div>
          <h2 className="heading-font text-lg md:text-xl font-black text-white tracking-tight">
            How Did NextMove AI Map Your Next Career Strategy?
          </h2>
          <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
            Instead of just listing random courses or telling you that you *can* learn, we evaluate real system trade-offs so you know exactly which decision to execute next.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="px-3 py-1 bg-white/[0.02] border border-white/10 rounded-full flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Live Reasoning Active</span>
        </div>
      </div>

      {/* Interactive Process Navigation map */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 relative z-10 pt-2">
        {(Object.values(reasoningStages)).map((stage) => {
          const isSelected = activeStage === stage.id;
          const StageIcon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`flex items-start gap-3 p-3 text-left rounded-2xl border transition-all duration-300 relative overflow-hidden group/btn ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border-indigo-500/30 shadow-indigo-500/5 shadow-inner translate-y-[-1px]'
                  : 'bg-white/[0.01] hover:bg-white/[0.03] border-white/5 hover:border-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl border shrink-0 transition-colors ${
                isSelected 
                  ? 'bg-indigo-500/15 border-indigo-500/20 text-indigo-300' 
                  : 'bg-white/5 border-white/5 text-slate-400 group-hover/btn:text-white group-hover/btn:bg-white/10'
              }`}>
                <StageIcon className="h-4 w-4" />
              </div>

              <div className="space-y-0.5 min-w-0">
                <span className={`block text-[11px] font-bold truncate transition-colors ${
                  isSelected ? 'text-indigo-300' : 'text-slate-300 group-hover/btn:text-white'
                }`}>
                  {stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}
                </span>
                <span className="block text-[10px] text-slate-400 truncate font-semibold">
                  {stage.short}
                </span>
              </div>

              {/* Hover bottom bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stage.color} transition-transform duration-300 ${
                isSelected ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </button>
          );
        })}
      </div>

      {/* Main interactive reasoning container display */}
      <div className="relative z-10 border border-white/5 bg-slate-950/30 rounded-2xl p-4 md:p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Description Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-2">
                <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border ${activeStageData.badgeColor}`}>
                  Pipeline Step Complete
                </span>
                <h3 className="heading-font text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <activeStageData.icon className="h-4 w-4 text-indigo-400 shrink-0" />
                  {activeStageData.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {activeStageData.description}
                </p>
              </div>

              {/* Connected components badge display */}
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">AI Correlation Sources</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] px-1.5 py-0.5 bg-indigo-600/10 text-indigo-300 border border-indigo-500/10 rounded">Candidate Resume</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-cyan-600/10 text-cyan-300 border border-cyan-500/10 rounded">Global Market Index</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-purple-600/10 text-purple-300 border border-purple-500/10 rounded">Salary Models</span>
                </div>
              </div>
            </div>

            {/* Middle Live Scans Column */}
            <div className="lg:col-span-5 space-y-3 border-t lg:border-t-0 lg:border-l lg:border-r border-white/5 pt-4 lg:pt-0 lg:px-6">
              <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Step Reasoning Logs
              </h4>
              <div className="space-y-2.5">
                {activeStageData.insights.map((insight, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Quantified Diagnostics Column */}
            <div className="lg:col-span-3 space-y-4 pt-4 lg:pt-0">
              <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Quantified Metrics</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {activeStageData.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center group/metric hover:bg-white/[0.04] transition">
                    <div className="space-y-0.5 m-0">
                      <span className="block text-[10px] uppercase font-black tracking-wide text-slate-400">{metric.label}</span>
                      <span className="block text-sm font-black text-white group-hover/metric:text-cyan-400 transition-colors">{metric.value}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-900 border border-white/5 rounded font-black text-slate-400 uppercase">{metric.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Explanatory footer linking metrics directly to personalized value */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/15 via-slate-900/30 to-indigo-950/15 border border-indigo-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div className="flex gap-2.5 items-center">
          <Award className="h-5 w-5 text-indigo-400 shrink-0" />
          <div className="space-y-0.5 m-0">
            <span className="block font-bold text-xs text-white">Rule-Free Dynamic Evaluation Model</span>
            <span className="block text-[10px] text-slate-400">By mapping custom vectors, our neural model ensures career suggestions are highly tailored to your profile.</span>
          </div>
        </div>
        <button 
          onClick={() => {
            const el = document.getElementById('roadmap-tab');
            if (el) el.click();
          }}
          className="text-[11px] font-black text-indigo-300 hover:text-white tracking-wider uppercase flex items-center gap-1.5 group shrink-0 transition"
        >
          Explore AI Roadmap
          <ArrowRight className="h-3 ml-0.5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
