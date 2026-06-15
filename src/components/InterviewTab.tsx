import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ShieldAlert, BookOpen, Star, HelpCircle, Trophy, Sparkles, Award, CheckCircle2 } from 'lucide-react';

export default function InterviewTab() {
  const { activeResult } = useStore();
  const { interviewPrep } = activeResult;

  const [activeQuestionSubTab, setActiveQuestionSubTab] = useState<'behavioral' | 'technical' | 'roleSpecific'>('behavioral');

  // SVG parameters for circle offset (r=36 -> circumference = 226)
  const scoreCircumference = 226;
  const strokeOffset = scoreCircumference - (interviewPrep.confidenceScore / 100) * scoreCircumference;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header & Confidence Index Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        <div className="md:col-span-2 space-y-2">
          <h2 className="heading-font text-xl md:text-2xl font-bold text-white">Interview Readiness Hub</h2>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Review detailed behavioural scenarios, technical architectural parameters, and custom roles assessments.
          </p>
          
          {/* Advice Banner */}
          <div className="p-4 bg-slate-900/60 rounded-2xl border border-white/5 flex items-start gap-3 mt-4">
            <Trophy className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">Feedback Advisor Summary</span>
              <p className="text-xs text-slate-400 leading-normal">
                {interviewPrep.mockFeedback}
              </p>
            </div>
          </div>
        </div>

        {/* Confidence Circle Widget */}
        <div className="glass-panel p-5 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950/20">
          <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block mb-4">Confidence Metric</span>
          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90">
              <circle cx="48" cy="48" r="36" className="stroke-indigo-950/30 stroke-[8] fill-none" />
              <circle 
                cx="48" 
                cy="48" 
                r="36" 
                className="stroke-indigo-500 stroke-[8] fill-none transition-all duration-1000 ease-out" 
                strokeDasharray={scoreCircumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="heading-font text-xl font-black text-white">{interviewPrep.confidenceScore}%</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 leading-normal font-medium">Determined by response depth and keyword metrics.</p>
        </div>

      </div>

      {/* 2. Questions Classification Switchnodes */}
      <div className="flex gap-2 text-xs border-b border-white/5 pb-3">
        {[
          { id: 'behavioral', label: 'STAR Behavioural' },
          { id: 'technical', label: 'Technical Core' },
          { id: 'roleSpecific', label: 'Role Specific Contexts' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveQuestionSubTab(item.id as any)}
            className={`px-4 py-2.5 rounded-xl border font-bold transition duration-200 ${
              activeQuestionSubTab === item.id
                ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300'
                : 'border-white/5 hover:border-white/10 hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 3. Questions Render boards */}
      <div className="space-y-4">
        
        {/* Behavioral Questions */}
        {activeQuestionSubTab === 'behavioral' && (
          <div className="space-y-4">
            {interviewPrep.behavioralQuestions.map((q, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl space-y-4 relative overflow-hidden bg-slate-905-20">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-indigo-505/10 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    Q
                  </div>
                  <h4 className="heading-font text-sm md:text-base font-bold text-white leading-relaxed">{q.question}</h4>
                </div>

                <div className="pl-9 space-y-3">
                  <div className="p-3 bg-slate-950/40 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Advisor Guide & Structuring:</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-semibold">{q.answerGuide}</p>
                  </div>
                  <div className="p-3 bg-indigo-650/5 rounded-2xl border border-indigo-500/10 flex items-start gap-2">
                    <Star className="h-4 w-4 shrink-0 mt-0.5 text-indigo-400" />
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">STAR Framework Highlight Tip:</span>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">{q.starFrameworkTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Questions */}
        {activeQuestionSubTab === 'technical' && (
          <div className="space-y-4">
            {interviewPrep.technicalQuestions.map((q, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl space-y-4 relative overflow-hidden bg-slate-905-20">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-cyan-505/10 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    T
                  </div>
                  <h4 className="heading-font text-sm md:text-base font-bold text-white leading-relaxed">{q.question}</h4>
                </div>

                <div className="pl-9 space-y-3">
                  <div className="p-3 bg-slate-950/40 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected Engineering Narrative:</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">{q.expectedAnswer}</p>
                  </div>
                  {q.codingResource && (
                    <div className="p-3 bg-cyan-650/5 rounded-2xl border border-cyan-500/10 flex items-start gap-2">
                      <BookOpen className="h-4 w-4 shrink-0 mt-0.5 text-cyan-400" />
                      <div>
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Code / Reference Resource:</span>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">{q.codingResource}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Role Specific Scenario Questions */}
        {activeQuestionSubTab === 'roleSpecific' && (
          <div className="space-y-4">
            {interviewPrep.roleSpecificQuestions.map((q, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl space-y-4 relative overflow-hidden bg-slate-905-20">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-amber-505/10 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    S
                  </div>
                  <h4 className="heading-font text-sm md:text-base font-bold text-white leading-relaxed">{q.question}</h4>
                </div>

                <div className="pl-9 space-y-3">
                  <div className="p-3 bg-slate-950/40 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Scenario Context Parameters:</span>
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed">{q.scenarioContext}</p>
                  </div>
                  
                  <div className="p-3 bg-amber-650/5 rounded-2xl border border-amber-500/10 space-y-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Required Key Coverage Milestones:</span>
                    <ul className="space-y-1.5 pl-1 text-[11px] text-slate-400 font-semibold">
                      {q.keyPointsToCover.map((pt, idy) => (
                        <li key={idy} className="flex gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
