import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, AlertTriangle, BatteryCharging, 
  HelpCircle, Sparkles, TrendingUp, XCircle, ArrowUpRight, Award, Zap
} from 'lucide-react';

export default function ActionImpactHub() {
  const { activeResult } = useStore();
  const { profile } = activeResult;
  
  // Detect current active preset trajectory
  const isDeveloper = profile.title.toLowerCase().includes('frontend') || profile.title.toLowerCase().includes('developer');

  // Interactive local sub-states
  const [activeCategory, setActiveCategory] = useState<'next' | 'avoid' | 'impact'>('next');

  // Formulate precise advisory blocks for each trajectory
  const advisorData = {
    next: {
      id: 'next' as const,
      title: 'What should you do next?',
      subtitle: 'Highest-leverage execution steps for the next 14 days',
      icon: CheckCircle2,
      accentColor: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
      lineTheme: 'bg-emerald-500',
      bullets: isDeveloper ? [
        {
          heading: 'Ship an Interactive React & Next.js App Router Prototype',
          detail: 'Instead of passive learning, build a real-world server-side rendered dashboard. Render real mock API states with Tailwind CSS and deploy it live to Vercel/Netlify. Put the direct live link at the very top of your CV.',
          timeframe: 'Target: Next 7 days',
          leverageFactor: 'High Visibility'
        },
        {
          heading: 'Transform Core Resume Bullets with High-Impact Metrics',
          detail: 'Rewrite your passive role descriptions. Change "Responsible for fixing frontend bugs" to "Pioneered lighthouse optimization across 14 interactive UI routes, raising core web vitals scores from 52 to 94 and decreasing early bounce rates by 18%."',
          timeframe: 'Target: Next 3 days',
          leverageFactor: 'Immediate ATS Boost'
        },
        {
          heading: 'Schedule 2 Focused Mock Interview Technical Screener runs',
          detail: 'Run timed interactive sessions on data structure arrays, string manipulations, and asynchronous hooks lifecycle. The core bottleneck is speed-to-solution under active peer review.',
          timeframe: 'Target: This weekend',
          leverageFactor: 'Assessment Readiness'
        }
      ] : [
        {
          heading: 'Configure a Multi-Source SQL Portfolio on GitHub',
          detail: 'Create a repository showing complex querying workflows. Write clean, self-documenting scripts that utilize windows functions, common table expressions (CTEs), and dynamic JOIN strategies on a database of at least 1M mock records.',
          timeframe: 'Target: Next 10 days',
          leverageFactor: 'Verified Competence'
        },
        {
          heading: 'Embed a Live Interactive BI Dashboard in Your Profiles',
          detail: 'Connect a free Looker Studio or Tableau Public dashboard to an open-source dataset (e.g., logistics, finance, or retail analytics) showing clear funnel-analysis or pricing insights. Link this directly in your LinkedIn header.',
          timeframe: 'Target: Next 5 days',
          leverageFactor: 'Recruiter Game-Changer'
        },
        {
          heading: 'Draft Three STAR Stories Focus on Commercial Growth',
          detail: 'Write three structured business stories outlining a critical Situation, Task, Action, and the exact quantifiable business Result (e.g., "identified $24k in yearly pricing leaks via predictive pipeline audits").',
          timeframe: 'Target: Next 4 days',
          leverageFactor: 'Interview Success'
        }
      ]
    },
    avoid: {
      id: 'avoid' as const,
      title: 'What should you NOT waste time on?',
      subtitle: 'Activities that yield low utility or cause unnecessary momentum stalls',
      icon: XCircle,
      accentColor: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
      lineTheme: 'bg-rose-500',
      bullets: isDeveloper ? [
        {
          heading: 'Collecting Generic Fundamental Styling JS/CSS Certificates',
          detail: 'Stop wasting time on low-value introduction courses or passive lecture completions. Recruiter vetting boards skip past certificate badges completely if they are not backed by deployed interactive app repos.',
          timeframe: 'Status: Immediate Bypass',
          leverageFactor: 'Zero Recruiter Interest'
        },
        {
          heading: 'Over-optimizing Custom Build Systems & Webpack Bundles',
          detail: 'Unless you are applying to join a specialized developer tools compiler unit, modern teams expect you to default to native scaffolding templates (Vite, Next, Turbopack). Grinding on custom build configurations is an empty sink.',
          timeframe: 'Status: Immediate Bypass',
          leverageFactor: 'Low Commercial Return'
        },
        {
          heading: 'Memorizing Ultra-Theoretical CompSci Edge Cases',
          detail: 'Unless your target is systemic algorithmic database design, do not get bogged down memorizing advanced graph traversal mutations. Master practical everyday data patterns and real responsive layouts.',
          timeframe: 'Status: Immediate Bypass',
          leverageFactor: 'Low Practical Alignment'
        }
      ] : [
        {
          heading: 'Grinding Manual Advanced Spreadsheet Calculations',
          detail: 'Your active skills inventory already registers deep spreadsheet proficiency. Grinding additional formula worksheets yields zero salary leverage. Recruiters assume spreadsheet mastery; they want cloud-scale query competence.',
          timeframe: 'Status: Immediate Bypass',
          leverageFactor: 'Redundant Skill Profile'
        },
        {
          heading: 'Learning Outdated Legacy Data Schema Architectures',
          detail: 'Avoid diving into complex localized server administration frameworks or manual schema optimization layers. Modern high-growth enterprises are consolidated on cloud warehouse layers (Snowflake, BigQuery).',
          timeframe: 'Status: Immediate Bypass',
          leverageFactor: 'Declining Market Demand'
        },
        {
          heading: 'Drafting Long Academic Data Analysis Theory Articles',
          detail: 'Corporate decision-makers rarely read long theoretical statistics reports. Skip heavy mathematical proof generation in favor of clear, highly-digestible executive metric slides and executive summaries.',
          timeframe: 'Status: Immediate Bypass',
          leverageFactor: 'Low Business Traction'
        }
      ]
    },
    impact: {
      id: 'impact' as const,
      title: 'What gives the highest career & salary impact?',
      subtitle: 'Game-changing actions that unlock premium compensation bands',
      icon: Award,
      accentColor: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
      lineTheme: 'bg-cyan-500',
      bullets: isDeveloper ? [
        {
          heading: 'Pioneering Dynamic AI Agent & DeepSeek AI SDK Integrations',
          detail: 'Full-stack software developers who can orchestrate live server processes with structured AI APIs command an immediate 20-30% compensation premium. Showcase actual generative chat, search-grounding, or structured tool calling.',
          timeframe: 'Salary Impact: +$22k - $35k/yr',
          leverageFactor: 'Elite Market Tier'
        },
        {
          heading: 'Deploying Clean Multi-Tier Architectures with JWT Security',
          detail: 'Proving competence in full-stack backend APIs, database models (e.g. Firestore, Cloud SQL), data isolation and modern JWT token authorization makes you a complete standalone contributor in high demand.',
          timeframe: 'Salary Impact: +$18k - $25k/yr',
          leverageFactor: 'Total Independence'
        },
        {
          heading: 'Establishing Real-World Performance Optimization Headlines',
          detail: 'Place a bold optimization metric at the absolute peak of your resume profile. Demonstrating that you treat software performance as a critical business multiplier instantly separates you from 95% of generic applicants.',
          timeframe: 'Salary Impact: High-Speed Hiring',
          leverageFactor: 'Immediate Screening Pass'
        }
      ] : [
        {
          heading: 'Transitioning from Simple Reporting to Automated ETL Pipelines',
          detail: 'Data analysts who can build clean automated Python/SQL ETL pipelines instead of doing manual extraction command elite priority placements. Showcasing actual automated cron schedules creates massive trust.',
          timeframe: 'Salary Impact: +$15k - $28k/yr',
          leverageFactor: 'Top Technical Quadrant'
        },
        {
          heading: 'Acquiring Recognized Cloud Warehouse Credentials',
          detail: 'Possessing a current Snowflake, AWS Data Analytics, or BigQuery certification is an immediate gatekeeper bypass for large enterprise listings, instantly unlocking high-scale corporate client salaries.',
          timeframe: 'Salary Impact: +$12k - $18k/yr',
          leverageFactor: 'Corporate Premium Pass'
        },
        {
          heading: 'Mastering Custom Business Intelligence Storytelling for Executives',
          detail: 'The ability to synthesise complex raw system performance into simple corporate slides that directly direct strategic pricing or retention moves. You are not a data filter; you are a strategic asset.',
          timeframe: 'Salary Impact: Fast Promotional Track',
          leverageFactor: 'Strategic Leadership'
        }
      ]
    }
  };

  const activeCategoryData = advisorData[activeCategory];

  return (
    <div className="glow-card p-6 border border-white/10 bg-slate-950/25 space-y-6 relative overflow-hidden rounded-3xl">
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header element */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Zap className="h-4 w-4 text-indigo-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Action & Career Impact Engine</span>
          </div>
          <h2 className="heading-font text-lg md:text-xl font-black text-white tracking-tight">
            Stop Passive Learning. Decide and Execute.
          </h2>
          <p className="text-slate-400 text-xs max-w-2xl leading-relaxed font-semibold">
            Traditional tools overwhelm you with infinite courses telling you that you CAN learn. NextMove AI filters out the noise to tell you exactly WHAT DECISION TO MAKE NEXT to capture maximum leverage.
          </p>
        </div>

        {/* Leverage Status Pill */}
        <div className="px-3 py-1 bg-white/[0.02] border border-white/10 rounded-full flex items-center gap-1.5 shrink-0">
          <Sparkles className="h-3 w-3 text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Action Plan Calibrated</span>
        </div>
      </div>

      {/* Selector Tabs with Dynamic Highlights */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 relative z-10 pt-2">
        {(Object.values(advisorData)).map((cat) => {
          const isSelected = activeCategory === cat.id;
          const CatIcon = cat.icon;
          
          let highlightBorder = 'border-white/5';
          if (isSelected) {
            highlightBorder = cat.id === 'next' 
              ? 'border-emerald-500/40 bg-emerald-950/20 shadow-emerald-500/5' 
              : cat.id === 'avoid'
                ? 'border-rose-500/40 bg-rose-950/20 shadow-rose-500/5'
                : 'border-cyan-500/40 bg-cyan-950/20 shadow-cyan-500/5';
          }

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col md:flex-row items-center md:items-start gap-2.5 p-3.5 rounded-2.5xl border text-center md:text-left transition-all duration-300 relative overflow-hidden group/btn ${
                isSelected
                  ? `${highlightBorder} shadow-inner`
                  : 'bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl border shrink-0 transition-colors ${
                isSelected
                  ? cat.id === 'next'
                    ? 'bg-emerald-505/10 border-emerald-500/20 text-emerald-300'
                    : cat.id === 'avoid'
                      ? 'bg-rose-505/10 border-rose-500/20 text-rose-300'
                      : 'bg-cyan-505/10 border-cyan-500/20 text-cyan-300'
                  : 'bg-white/5 border-white/5 text-slate-400 group-hover/btn:text-white'
              }`}>
                <CatIcon className="h-4 w-4" />
              </div>

              <div className="space-y-0.5 min-w-0">
                <span className={`block text-xs font-black tracking-tight transition-colors ${
                  isSelected 
                    ? cat.id === 'next' 
                      ? 'text-emerald-300' 
                      : cat.id === 'avoid'
                        ? 'text-rose-300'
                        : 'text-cyan-300'
                    : 'text-slate-200 group-hover/btn:text-white'
                }`}>
                  {cat.title.split('?')[0].split('.')[0]}
                </span>
                <span className="hidden md:block text-[10px] text-slate-400 truncate font-semibold">
                  {cat.subtitle}
                </span>
              </div>

              {/* Dynamic bottom colored line */}
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${cat.lineTheme} transition-transform duration-300 ${
                isSelected ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </button>
          );
        })}
      </div>

      {/* Central Interactive Board View */}
      <div className="relative z-10 border border-white/5 bg-slate-950/30 rounded-2xl p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Context title card */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border ${activeCategoryData.accentColor}`}>
                Advisor Evaluation Complete
              </span>
              <span className="text-slate-400 text-xs font-semibold">•</span>
              <span className="text-slate-300 text-xs font-semibold">{activeCategoryData.subtitle}</span>
            </div>

            {/* Bullets layout representation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {activeCategoryData.bullets.map((b, idx) => {
                let statusBadgeTheme = 'bg-slate-900 text-slate-400';
                if (activeCategory === 'next') {
                  statusBadgeTheme = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10';
                } else if (activeCategory === 'avoid') {
                  statusBadgeTheme = 'bg-rose-500/10 text-rose-400 border-rose-500/10';
                } else {
                  statusBadgeTheme = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/10';
                }

                return (
                  <div 
                    key={idx} 
                    className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] flex flex-col justify-between transition duration-300 space-y-4 relative overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-slate-500 text-xs font-black font-mono">0{idx + 1}.</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded border uppercase font-extrabold tracking-wider ${statusBadgeTheme}`}>
                          {b.timeframe}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs leading-snug font-sans group-hover:text-indigo-400 transition-colors">
                        {b.heading}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                        {b.detail}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-white/5 flex justify-between items-center text-[10px]">
                      <span className="text-slate-500 font-bold uppercase tracking-wider">Leverage Metric:</span>
                      <span className="font-mono text-slate-200 font-bold flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3 text-cyan-400 shrink-0" />
                        {b.leverageFactor}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
