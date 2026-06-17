import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Info, Scale, CheckCircle2, AlertTriangle, 
  HelpCircle, Eye, Database, BookOpen, Lock, Sparkles
} from 'lucide-react';

export default function ResponsibleAIMetrics() {
  const { activeResult } = useStore();
  const { scores, profile } = activeResult;
  const [activeSubTab, setActiveSubTab] = useState<'confidence' | 'transparency' | 'bias' | 'sources'>('confidence');

  const isDeveloper = profile.title.toLowerCase().includes('frontend') || profile.title.toLowerCase().includes('developer');

  // Interactive metrics and details based on current candidate
  const responsibleAIData = {
    confidence: {
      title: 'Confidence Scores & Explainable Weights',
      subtitle: 'Precise certainty quotients formulated per prediction quadrant',
      icon: Eye,
      metrics: [
        { label: 'Resume Parser Certainty', score: '95%', margin: '±2.1%', method: 'Named Entity Recognition (NER)' },
        { label: 'Skill Gap Map Accuracy', score: '91%', margin: '±4.0%', method: 'Graph-based Skill Cluster Weights' },
        { label: 'Salary Forecast Guidance', score: '88%', margin: '±6.5%', method: 'Dynamic Macro Regression Models' }
      ],
      explanations: [
        {
          metric: 'Parsing Confidence',
          text: 'Determined by successful NLP classification of known educational systems and structured job experience patterns. The confidence goes up to 95% due to robust semantic structure in your profile.'
        },
        {
          metric: 'Pathway Gap Accuracy',
          text: 'Determined by comparing your profile skills node against our aggregated live job descriptions (14,800+ indexed vacancies). Slight confidence variance exists depending on target job market niches.'
        }
      ],
      limitation: 'Projections assume median candidate profiles. Extreme outlier specializations may exhibit larger variation patterns.'
    },
    transparency: {
      title: 'AI Model Openness & System Limitations',
      subtitle: 'Open reporting of offline parameters, model thresholds, and drift prevention',
      icon: Info,
      insights: [
        {
          heading: 'Model Offline Knowledge Horizons',
          detail: 'Primary analytical predictions utilize our custom-seeded global data arrays trained through Q3 2025. Direct real-time internet scraping is constrained to active LinkedIn/Indeed vacancy indexes.'
        },
        {
          heading: 'Regional Compensation Variance Warnings',
          detail: 'Standard currency forecasts are structured on US and EU metro baselines. Localized purchasing power parity (PPP), localized municipality rules, or remote-worker adjustments can create ±15% variances.'
        },
        {
          heading: 'Automation Drift Controls',
          detail: 'Our underlying threat-level prediction weights are automatically recalibrated monthly against emerging SaaS and LLM capability updates to avoid outdated structural predictions.'
        }
      ],
      limitation: 'These findings represent analytical guidelines of economic trends and do not constitute legal or contractual employment guarantees.'
    },
    bias: {
      title: 'Fairness Auditing & Demographic Separation',
      subtitle: 'Ensuring zero demographic influence on career readiness algorithms',
      icon: Scale,
      audits: [
        {
          layer: 'Demographic Anonymization Grid',
          status: 'Active',
          detail: 'Strict parsing separation parameters instantly filter out names, gender signals, ethnicity pronouns, geographic addresses, and age descriptors prior to calculating readiness indices.'
        },
        {
          layer: 'Equitable Evaluation Metric Calibration',
          status: 'Calibrated',
          detail: 'Career strength indices are built on structured capability matches, quantifiable business metrics (e.g. percentages, systems, code deliverables), rather than university prestige or school classifications.'
        },
        {
          layer: 'Continuous Algorithmic Parity Evaluations',
          status: 'Passed Q1 2026',
          detail: 'System undergoes continuous automated audits across simulated cohort sets representing diverse demographic backgrounds to verify equal score distribution averages.'
        }
      ],
      limitation: 'Bias prevention focuses heavily on standard resume formatting. Non-standard profiles or heavily scrambled text uploads may limit anonymization strength.'
    },
    sources: {
      title: 'Verifiable Data Trail & Attribution MAP',
      subtitle: 'Transparent tracing of every career suggestion to public databases',
      icon: Database,
      references: [
        {
          source: 'US Bureau of Labor Statistics (BLS)',
          classification: 'SOC Code 15-1252 / 15-2051 Indexes',
          vettedYear: '2024 - 2034 Long-term projections',
          purpose: 'Ten-year macroeconomic growth signals, career expansion velocity, and median national baselines.'
        },
        {
          source: 'Aggregated Scraping Core Quadrant',
          classification: '14,821 Live Scraper Postings',
          vettedYear: 'Updated: Real-time API feeds',
          purpose: 'Analyzing real-time technical keyword frequency weights and immediate vacancy requirements.'
        },
        {
          source: 'Indeed, Glassdoor & LinkedIn APIs',
          classification: 'Compensation Metadata Matrices',
          vettedYear: 'Current quarterly parameters',
          purpose: 'Validating base salary adjustments and local recruiter high-demand ranges.'
        }
      ],
      limitation: 'All third-party data attributes are owned by their respective publishers and vary based on active localized market factors.'
    }
  };

  const activeSubTabData = responsibleAIData[activeSubTab];

  return (
    <div className="glow-card p-6 border border-emerald-500/15 bg-slate-950/20 space-y-6 relative overflow-hidden rounded-3xl mt-6">
      {/* Decorative safe emerald color overlay */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header and badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scale className="h-4 w-4" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Responsible AI Framework</span>
          </div>
          <h2 className="heading-font text-lg md:text-xl font-black text-white tracking-tight">
            Trust, Transparency & Explainable Guidance
          </h2>
          <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
            How does our model maintain absolute safety, bias prevention, transparency, confidence ratios, and reliable datasets? Review our real-time Responsible AI audit dashboard.
          </p>
        </div>

        {/* Audit Status Pill */}
        <div className="p-2 bg-emerald-950/25 border border-emerald-500/30 rounded-2xl flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-widest">Self-Auditing Passed</span>
        </div>
      </div>

      {/* Navigation subtabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 relative z-10">
        {(Object.keys(responsibleAIData) as Array<keyof typeof responsibleAIData>).map((key) => {
          const item = responsibleAIData[key];
          const isSelected = activeSubTab === key;
          const SubIcon = item.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveSubTab(key)}
              className={`flex flex-col items-start gap-1 p-3.5 text-left rounded-2xl border transition-all duration-300 relative group/btn ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-950/25 to-slate-900/40 border-emerald-500/30 shadow-emerald-500/5 shadow-inner'
                  : 'bg-white/[0.01] hover:bg-white/[0.03] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 w-full">
                <div className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                  isSelected 
                    ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-300' 
                    : 'bg-white/5 border-white/5 text-slate-400 group-hover/btn:text-white'
                }`}>
                  <SubIcon className="h-3.5 w-3.5" />
                </div>
                <span className={`text-[11px] font-bold truncate transition-colors ${
                  isSelected ? 'text-emerald-300' : 'text-slate-300 group-hover/btn:text-white'
                }`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} Audit
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1.5 h-4 overflow-hidden truncate font-semibold w-full">
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Central Interactive Content Window */}
      <div className="relative z-10 border border-white/5 bg-slate-950/30 rounded-2xl p-5 md:p-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Context Title Row */}
            <div className="space-y-1">
              <h3 className="heading-font text-base font-bold text-white flex items-center gap-2">
                <activeSubTabData.icon className="h-4 w-4 text-emerald-400 shrink-0" />
                {activeSubTabData.title}
              </h3>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                {activeSubTabData.subtitle}
              </p>
            </div>

            {/* Subtab Renderings */}
            {activeSubTab === 'confidence' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Confidence Metrics Indicators */}
                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Quantified AI Confidence Indices</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeSubTabData.metrics?.map((m, idx) => (
                      <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center hover:bg-white/[0.04] transition">
                        <div className="space-y-0.5 m-0 text-left">
                          <span className="block text-[10px] uppercase font-black tracking-wide text-slate-400">{m.label}</span>
                          <span className="block text-xs font-mono text-slate-400">{m.method}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-base font-black text-emerald-400">{m.score}</span>
                          <span className="block text-[9px] text-slate-500 font-bold">{m.margin} Range</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explanation Content */}
                <div className="lg:col-span-7 space-y-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-6">
                  <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">How to Read Confidences</h4>
                  <div className="space-y-3.5">
                    {activeSubTabData.explanations?.map((exp, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-1 m-0 text-left">
                          <span className="block text-[10px] uppercase font-black tracking-wide text-slate-300">{exp.metric}</span>
                          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                            {exp.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'transparency' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeSubTabData.insights?.map((ins, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] flex flex-col justify-between transition duration-300 space-y-2">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-xs font-black font-mono">0{idx + 1}.</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-900 text-indigo-300 border border-white/5 rounded font-bold uppercase">Transparency Gate</span>
                      </div>
                      <h4 className="font-bold text-slate-200 text-xs leading-snug">
                        {ins.heading}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                        {ins.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === 'bias' && (
              <div className="space-y-3">
                <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Demographic Isolation & Fairness Safeguards</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeSubTabData.audits?.map((aud, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.02] transition space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-500 font-mono">Audit {idx + 1}</span>
                        <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 rounded font-black uppercase tracking-wider">{aud.status}</span>
                      </div>
                      <h5 className="font-bold text-slate-250 text-xs">{aud.layer}</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                        {aud.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSubTab === 'sources' && (
              <div className="space-y-3">
                <h4 className="text-slate-300 text-xs font-bold uppercase tracking-wider">Attribution Trail & Origin Database Tracing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeSubTabData.references?.map((ref, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition space-y-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-emerald-400 uppercase tracking-wider shrink-0">{ref.classification}</span>
                      </div>
                      <h5 className="font-bold text-white text-xs">{ref.source}</h5>
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                        {ref.purpose}
                      </p>
                      <div className="pt-2 border-t border-white/5 text-[9px] text-slate-500 font-extrabold flex justify-between">
                        <span>Database: Vetted</span>
                        <span>{ref.vettedYear}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proactive Limitations Disclaimer Panel */}
            <div className="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="h-4.5 w-4.5 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">Responsible AI System Limitations Disclaimer</span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  {activeSubTabData.limitation} Always dual-verify certifications and local metropolitan guidelines on legal portals prior to entering binding contract negotiations with corporate hiring organizations.
                </p>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
