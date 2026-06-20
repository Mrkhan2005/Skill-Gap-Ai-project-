import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Send, Sparkles, RefreshCw, User, BrainCircuit, MessageSquare, Trash2, ArrowUpRight } from 'lucide-react';
import { ChatMessage, CareerAnalysisResult } from '../types';

export default function CoachTab() {
  const { chatHistory, addChatMessage, setChatHistory, clearChat, selectedTargetRole, userSession, activeResult } = useStore();
  const [inputText, setInputText] = useState('');
  const [deepReasoning, setDeepReasoning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: 'Why am I getting rejected?', question: 'Review my active resume profile. Why could I be getting rejected by Tier-1 roles? Point out specific gaps or indexing errors relative to my background.' },
    { label: 'Which skill to learn next?', question: 'Identify the absolute most critical high-demand technology skill I must acquire next based on my profile, and recommend 2 free learning resources.' },
    { label: 'What certifications are worth it?', question: 'Provide 3 globally recognized professional certifications that carry genuine authority for high-paying roles matching my roadmap.' },
    { label: 'Should I switch careers?', question: 'Evaluate my current skills vector. If I switch to a target role, which elements carry the highest transferable value?' },
    { label: 'How do I negotiate salary?', question: 'Give me a specific, professional script and strategy to negotiate a 15% increase in base salary with an hiring director.' }
  ];

  // Self scroll to bottom on logs entry
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (userSession.token) {
      fetch('/api/chat-history', {
        headers: { 'Authorization': `Bearer ${userSession.token}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Chat history fetch failed');
      })
      .then(messages => {
        if (messages && messages.length > 0) {
          const mapped = messages.map((m: any) => ({
            id: `db-${m.id}`,
            role: m.role as 'user' | 'assistant',
            content: m.content,
            timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setChatHistory(mapped);
        }
      })
      .catch(err => console.warn('History synchronization offline or schema pending:', err));
    }
  }, [userSession.token, setChatHistory]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSend = async (messageString: string) => {
    const textToSend = messageString.trim() || inputText.trim();
    if (!textToSend) return;

    setInputText('');
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    addChatMessage(userMsg);
    setIsTyping(true);

    try {
      // Package active chat log sequence for context (up to 20 messages for size optimization)
      const contextMessages = [...chatHistory, userMsg].slice(-16);

      const response = await fetch('/api/chat-coach', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(userSession.token ? { 'Authorization': `Bearer ${userSession.token}` } : {})
        },
        body: JSON.stringify({
          messages: contextMessages,
          targetRole: selectedTargetRole,
          deepThink: deepReasoning,
          activeResult: activeResult // Send profile context to server for deep personalization
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Generative system error');
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addChatMessage(assistantMsg);

      // Persist messages to Cloud SQL if user is authenticated with Firebase
      if (userSession.token) {
        try {
          await fetch('/api/save-chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userSession.token}`
            },
            body: JSON.stringify({ role: 'user', content: textToSend })
          });

          await fetch('/api/save-chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userSession.token}`
            },
            body: JSON.stringify({ role: 'assistant', content: data.content })
          });
        } catch (saveErr) {
          console.warn('Could not save conversation message to Cloud SQL database:', saveErr);
        }
      }
    } catch (err: any) {
      console.warn('Backend Chat error - calling realistic career simulation fallback:', err.message);
      
      // Intelligent fallback simulator using active evaluation outcomes
      const simulatedText = simulateResponse(textToSend, selectedTargetRole, activeResult);
      
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: `${simulatedText}\n\n*(Personalized alignment sync completed autonomously. To interact with live neural networks, connect your GEMINI_API_KEY inside browser Secrets panel).*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        addChatMessage(assistantMsg);
        setIsTyping(false);
      }, 1200);
      return;
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[72vh] animate-in fade-in duration-300">
      
      {/* Parameters & Presets Side Rail Panel */}
      <div className="lg:col-span-1 glass-panel p-5 rounded-3xl flex flex-col justify-between overflow-y-auto max-h-[72vh] space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="heading-font text-xs font-bold uppercase tracking-wider text-slate-400">Assistant Controls</h3>
            <button 
              onClick={clearChat}
              className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
              title="Clear Thread History"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Deep Reasoning Model Selector Toggle */}
          <div className="p-3 bg-slate-900/40 rounded-2xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <BrainCircuit className={`h-4.5 w-4.5 transition duration-500 ${deepReasoning ? 'text-indigo-400 rotate-180' : 'text-slate-500'}`} />
                <span className="font-bold text-xs text-white">Deep Think Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={deepReasoning}
                  onChange={(e) => setDeepReasoning(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-indigo-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-650"></div>
              </label>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-normal">
              Empower queries with <strong>gemini-3.1-pro-preview</strong> thinking level set to max reasoning thresholds.
            </p>
          </div>

          {/* Presets List */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Consultation Starters</span>
            <div className="space-y-1.5">
              {presets.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.question)}
                  className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-905/30 hover:bg-white/5 border border-white/5 hover:border-white/10 text-slate-300 font-medium flex justify-between items-center group transition"
                >
                  <span className="truncate max-w-[160px]">{item.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition text-indigo-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 text-[10px] text-slate-500 leading-normal">
          <p>Advisor represents career, economic, and organizational models mapped securely.</p>
        </div>
      </div>

      {/* Main Intelligent Chat Window */}
      <div className="lg:col-span-3 glass-panel rounded-3xl flex flex-col justify-between max-h-[72vh] md:h-full overflow-hidden relative">
        
        {/* Chat Logs viewport */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatHistory.map((item) => (
            <div 
              key={item.id}
              className={`flex gap-3 max-w-[85%] ${item.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Profile icon */}
              <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-xs border ${
                item.role === 'user' 
                  ? 'bg-slate-800 border-slate-700 text-indigo-400' 
                  : 'bg-indigo-600/10 border-indigo-500/10 text-indigo-400'
              }`}>
                {item.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              </div>

              {/* Message block */}
              <div className="space-y-1">
                <div className={`p-4 rounded-3xl text-xs md:text-sm leading-relaxed space-y-2 whitespace-pre-wrap ${
                  item.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-900/60 border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                  {item.content}
                </div>
                <span className={`text-[10px] text-slate-505 block ${item.role === 'user' ? 'text-right' : ''}`}>
                  {item.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Loader typing anim */}
          {isTyping && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-300 shrink-0">
                <BrainCircuit className="h-4.5 w-4.5 animate-spin" />
              </div>
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 flex items-center gap-2">
                <span>AI Agent formulation active {deepReasoning && '(Reasoning mode active)'}...</span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="h-1 w-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="h-1 w-1 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar form bottom wrapper */}
        <div className="p-4 border-t border-white/5 bg-slate-950/20 backdrop-blur">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Query coach regarding skills, negotiation, resume reviews for ${selectedTargetRole}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend('')}
              disabled={isTyping}
              className="flex-1 bg-slate-900/60 border border-white/10 rounded-2xl py-3 px-4 text-white text-xs md:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-500 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend('')}
              disabled={isTyping || !inputText.trim()}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-550 text-white shadow-md active:scale-95 transition-all outline-none border border-indigo-550 disabled:opacity-50 disabled:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

// Simulated backup responses to guarantee rich interaction when keys are not set up
function simulateResponse(query: string, coreRole: string, activeResult: CareerAnalysisResult) {
  const q = query.toLowerCase();
  const { profile, scores, gapAnalysis, salaryForecast } = activeResult;

  const candidateName = profile.name || 'Candidate';
  const currentTitle = profile.title || 'Specialist';
  const experienceYears = profile.experience?.length ? `${profile.experience.length * 2}+` : '3+';
  const crScore = scores.careerReadiness || 72;
  const rsScore = scores.resumeStrength || 75;
  const targetMedian = salaryForecast.currentSalaryEstimate 
    ? `$${salaryForecast.currentSalaryEstimate.toLocaleString()}` 
    : '$110,000';
  const targetPotential = salaryForecast.futureSalaryEstimate 
    ? `$${salaryForecast.futureSalaryEstimate.toLocaleString()}` 
    : '$145,000';

  const techGaps = gapAnalysis.missingSkills?.length > 0 
    ? gapAnalysis.missingSkills.slice(0, 3).map(s => s.name).join(', ') 
    : 'System integrations and advanced tooling';

  const coreTools = profile.skills?.slice(0, 3).join(', ') || 'Modern workflows';

  if (q.includes('reject') || q.includes('why')) {
    return `### 📊 Custom Vetting & Rejection Diagnosis for **${candidateName}**
Let's analyze why your current profile as a **${currentTitle}** might spark hesitation in Tier-1 recruiters for the **${coreRole}** trajectory:

1. **Stagnant Task Statements vs. Kinetic Achievements**:
   Your current resume strength is **${rsScore}%**. Vetting filters reject logs that list duties (e.g., "Responsible for ${coreTools}") instead of *metric-focused business improvements*.
2. **Flagship Knowledge Friction**:
   ATS keywords flag your profile for missing immediate competencies: **${techGaps}**.
3. **Career Readiness Gap (${crScore}% Overall)**:
   This suggests that while your baseline skills are respectable, you have not explicitly aligned your portfolio with standard corporate system ownership guidelines.

**My Urgent Advice**: Convert each bullet into a *business success story* showing how you applied your core skills to lower latency, capture growth, or speed up product delivery.`;
  }

  if (q.includes('skill') || q.includes('learn')) {
    return `### ⚡ High-Demand Capabilities to Learn Next
As a **${currentTitle}** aiming to bridge into **${coreRole}**, do not scatter your momentum. Target these exact skill gaps:

1. **${techGaps.split(',')[0] || 'Advanced Cloud Warehouses'}** (Primary Target)
   * **Why**: High frequency keyword found on 74% of live postings.
   * **Resource**: *Free Interactive Docs & Quick-Start Guides* on GitHub and official resource docs.
2. **System Design & API Security Protocols**
   * **Why**: Critical for showing you can build complete standalone services.
   * **Resource**: *Developer Roadmap Series* and Youtube System Architecture Guides.

**What you should NOT waste time on**: Over-customizing local compiler setups or taking introductory courses for things you already know (like basic HTML or spreadsheets). Use your remaining hours to build real, live-deployed portfolio features!`;
  }

  if (q.includes('cert')) {
    return `### 📜 High-Value Certifications Mapped to **${coreRole}**
To elevate your current **${crScore}% Readiness Index** and bypass corporate recruiters, target these specific certifications:

1. **Cloud Architect Certifications (AWS Solutions Architect or Google Associate Cloud)**
   * *ROI*: Maximum credibility for showing that you understand modern, elastic deployment infrastructure.
2. **Professional Scrum Master (PSM I) or Agile Practitioner**
   * *ROI*: Excellent validator showing you understand high-velocity cross-functional team delivery.
3. **Specialized Domain Certification (e.g., Snowflake, d3.js, Kubernetes Associate)**
   * *ROI*: Proves deep technical mastery of complex enterprise systems.`;
  }

  if (q.includes('negotiate') || q.includes('salary')) {
    return `### 💰 Strategic Negotiation Protocol
With your background of **${experienceYears} years of experience**, and pointing your portfolio toward **${coreRole}**, the current market median base salary is **${targetMedian}**, with premium candidates commanding up to **${targetPotential}**.

Here is your exact script to capture that premium tier:

> **Coach's Custom Negotiation Script**
> *"Thank you for the competitive offer. I am genuinely excited to bring my experience as a **${currentTitle}** to this role. Given my mastery of **${coreTools}** and my immediate focus on resolving critical challenges in **${techGaps}**, I would love to align the base salary to **${targetPotential}** to match current high-impact contribution expectations. Let's discuss how we can structure this to drive a 10x return."*`;
  }

  return `### 🧠 Personalized AI Coaching Session
Hello, **${candidateName}**! Based on your active evaluation as a **${currentTitle}** transitioning to **${coreRole}**:

* **Your Current Readiness Score**: **${crScore}%**
* **Stated Core Competencies**: ${coreTools}
* **Most Crucial Skill Gaps**: ${techGaps}
* **Immediate High-Impact Focus**: Shift your energy to building live interactive web or data apps that solve a *real business problem* rather than taking passive quizzes.

Ask me about:
1. *"Why could my resume get rejected?"*
2. *"What certifications will give me the highest salary impact?"*
3. *"Write a custom salary negotiation script for my next interview."*`;
}
