import { useStore } from '../store/useStore';
import { Award, ShieldCheck, Zap, Briefcase, GraduationCap, CheckCircle, Download } from 'lucide-react';
import { exportResultToPDF } from '../utils/pdfGenerator';

export default function OverviewTab() {
  const { activeResult } = useStore();
  const { profile, scores, futureProof } = activeResult;

  const scoreItems = [
    { label: 'Career Readiness', score: scores.careerReadiness, color: 'stroke-indigo-500 text-indigo-400', trailColor: 'stroke-indigo-950/40', glow: 'shadow-indigo-505/20' },
    { label: 'Employability Index', score: scores.employabilityIndex, color: 'stroke-cyan-500 text-cyan-400', trailColor: 'stroke-cyan-950/40', glow: 'shadow-cyan-505/20' },
    { label: 'Market Demand', score: scores.marketDemand, color: 'stroke-emerald-500 text-emerald-400', trailColor: 'stroke-emerald-950/40', glow: 'shadow-emerald-505/20' },
    { label: 'Resume Strength', score: scores.resumeStrength, color: 'stroke-purple-500 text-purple-400', trailColor: 'stroke-purple-950/30', glow: 'shadow-purple-505/20' },
    { label: 'Interview Readiness', score: scores.interviewReadiness, color: 'stroke-amber-500 text-amber-400', trailColor: 'stroke-amber-950/40', glow: 'shadow-amber-505/20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Dynamic PDF Export CTA Banner */}
      <div className="glass-panel p-5 rounded-3xl bg-gradient-to-r from-emerald-950/15 via-[#121A2B] to-slate-900/40 border border-emerald-500/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl hidden sm:block">
            <Award className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="heading-font text-base font-bold text-white">Your Comprehensive Career Roadmap is Ready</h3>
            <p className="text-slate-400 text-xs mt-1">Download a high-resolution, professionally formatted offline PDF report containing your complete 12-month timeline, technical gaps, salary projections, and behavioral prep sheets.</p>
          </div>
        </div>
        <button
          onClick={() => exportResultToPDF(activeResult)}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition duration-205 active:scale-95 shadow-md shadow-emerald-950/25 shrink-0 hover:scale-[1.01] cursor-pointer"
        >
          <Download className="h-4 w-4" />
          Download PDF Report
        </button>
      </div>

      {/* 1. Key Performance Metric Indicators (Radial Charts) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {scoreItems.map((item, index) => {
          // Circumference for r=36 is 2 * pi * 36 ≈ 226
          const circumference = 226;
          const strokeDashoffset = circumference - (item.score / 100) * circumference;

          return (
            <div 
              key={index} 
              className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group hover:scale-[1.02] transition duration-350"
            >
              <div className="relative h-24 w-24">
                {/* SVG Ring background and indicators */}
                <svg className="h-full w-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    className={`${item.trailColor} stroke-[8] fill-none`}
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    className={`${item.color} stroke-[8] fill-none transition-all duration-1000 ease-out`}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Centered Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="heading-font text-xl font-black text-white">{item.score}%</span>
                </div>
              </div>
              <h4 className="text-slate-300 text-xs font-bold mt-4 uppercase tracking-wide leading-tight">
                {item.label}
              </h4>
            </div>
          );
        })}
      </div>

      {/* 2. Top Banner Future-Proof Summary Widget */}
      <div className="glass-panel p-6 rounded-3xl bg-gradient-to-r from-indigo-950/20 via-slate-900/40 to-cyan-950/20 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Future-Proof Resilience Index</span>
          </div>
          <h3 className="heading-font text-3xl font-black text-white">
            {futureProof.futureProofScore}<span className="text-lg text-indigo-400">/100</span>
          </h3>
          <p className="text-slate-400 text-xs">
            Reflects overall immunity against automation risk parameters.
          </p>
        </div>

        <div className="space-y-2 md:col-span-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
          <h4 className="text-slate-200 text-sm font-bold">Resilience Assessment</h4>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            {futureProof.stabilityExplanation}
          </p>
        </div>
      </div>

      {/* 3. Interactive Profile Extraction Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience Extraction Milestone summary */}
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-indigo-400" />
            <h3 className="heading-font text-lg font-bold text-white">Work Milestone Extraction</h3>
          </div>
          
          <div className="space-y-4">
            {profile.experience.map((job, idx) => (
              <div key={idx} className="border-l-2 border-indigo-500/30 pl-4 py-1 space-y-1">
                <span className="text-slate-400 text-xs font-semibold">{job.duration}</span>
                <h4 className="text-sm font-bold text-white">{job.role}</h4>
                <p className="text-indigo-400 text-xs font-medium">{job.company}</p>
                <ul className="list-disc pl-4 space-y-1 mt-2 text-xs text-slate-400">
                  {job.highlights.map((item, idy) => (
                    <li key={idy}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education, Certifications, and Project highlights */}
        <div className="glass-panel p-6 rounded-3xl space-y-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-cyan-400" />
            <h3 className="heading-font text-lg font-bold text-white">Accreditation & Sandbox Projects</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">Academic Paths</h4>
              <ul className="space-y-2">
                {profile.education.map((edu, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">Qualifications & Certs</h4>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-[11px] font-semibold bg-cyan-505/10 text-cyan-300 border border-cyan-500/20 rounded-lg">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">Highlighted Projects</h4>
              <ul className="space-y-3">
                {profile.projects?.map((proj, idx) => (
                  <li key={idx} className="p-3 bg-slate-900/40 rounded-xl border border-white/5 space-y-1">
                    <h5 className="text-xs font-bold text-white">{proj.name}</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{proj.description}</p>
                    <div className="flex gap-1.5 pt-1 flex-wrap">
                      {proj.technologies?.map((tech, idt) => (
                        <span key={idt} className="text-[9px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
