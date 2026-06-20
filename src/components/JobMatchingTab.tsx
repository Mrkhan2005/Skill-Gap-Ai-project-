import { useStore } from '../store/useStore';
import { Briefcase, Building2, MapPin, BadgeDollarSign, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function JobMatchingTab() {
  const { activeResult } = useStore();
  const { jobMatches, profile } = activeResult;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Area with dynamic match indicators */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="heading-font text-xl md:text-2xl font-bold text-white">Neural Job Matching Engine</h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            DeepSeek AI has evaluated your profile credentials against our active scale corporate developer database to assess alignment.
          </p>
        </div>
      </div>

      {/* 2. Job Matches List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobMatches.map((job) => (
          <div 
            key={job.id} 
            className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-indigo-500/20 glass-card-hover transition duration-300"
          >
            {/* Top Info section */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Position Identified</span>
                  <h3 className="heading-font text-base md:text-lg font-black text-white">{job.title}</h3>
                  
                  {/* Company meta */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs py-1">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BadgeDollarSign className="h-3.5 w-3.5 text-slate-500" />
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* Match Score Gauge circular SVG */}
                <div className="relative h-16 w-16 flex items-center justify-center shrink-0">
                  <svg className="h-full w-full -rotate-90">
                    <circle cx="32" cy="32" r="24" className="stroke-slate-800 stroke-4 fill-none" />
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="24" 
                      className="stroke-indigo-500 stroke-4 fill-none transition-all duration-1000 ease-out" 
                      strokeDasharray="150"
                      strokeDashoffset={150 - (job.matchScore / 100) * 150}
                    />
                  </svg>
                  <span className="absolute heading-font text-xs font-black text-white">{job.matchScore}%</span>
                </div>
              </div>

              {/* Grid listings of Gaps & Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                
                {/* Strengths identified */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    Strength Match
                  </div>
                  <ul className="space-y-1.5">
                    {job.strengthAreas.map((str, idx) => (
                      <li key={idx} className="text-slate-300 text-xs flex items-start gap-1">
                        <span className="h-1 w-1 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                        {str}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing requirements identified */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-405 font-bold text-xs uppercase tracking-wide">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                    Missing Targets
                  </div>
                  <ul className="space-y-1.5">
                    {job.missingRequirements.map((mis, idx) => (
                      <li key={idx} className="text-slate-300 text-xs flex items-start gap-1">
                        <span className="h-1 w-1 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                        {mis}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Bottom Suggestions Footer block */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">How To Align For This Role:</span>
              <div className="p-3 bg-indigo-650/5 border border-indigo-505/10 rounded-2xl">
                <ul className="space-y-1 text-xs text-indigo-300 font-medium">
                  {job.improvementSuggestions.map((item, idy) => (
                    <li key={idy} className="flex gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
