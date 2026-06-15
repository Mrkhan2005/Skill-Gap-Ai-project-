import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Send, Sparkles, RefreshCw, User, BrainCircuit, MessageSquare, Trash2, ArrowUpRight } from 'lucide-react';
import { ChatMessage } from '../types';

export default function CoachTab() {
  const { chatHistory, addChatMessage, clearChat, selectedTargetRole, userSession } = useStore();
  const [inputText, setInputText] = useState('');
  const [deepReasoning, setDeepReasoning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: 'Why am I getting rejected?', question: 'Review my active resume profile. Why could I be getting rejected by Tier-1 software roles? Point out specific gaps or indexing errors.' },
    { label: 'Which skill to learn next?', question: 'Identify the absolute most critical high-demand technology skill I must acquire next based on my profile, and recommend 2 free learning resources.' },
    { label: 'What certifications are worth it?', question: 'Provide 3 globally recognized professional certifications that carry genuine authority for high-paying roles matching my roadmap.' },
    { label: 'Should I switch careers?', question: 'Evaluate my current skills vector. If I switch to a Product Manager role, which elements carry the highest transferable value?' },
    { label: 'How do I negotiate salary?', question: 'Give me a specific, professional script and strategy to negotiate a 15% increase in base salary with an engineering director.' }
  ];

  // Self scroll to bottom on logs entry
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: contextMessages,
          targetRole: selectedTargetRole,
          deepThink: deepReasoning
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
    } catch (err: any) {
      console.warn('Backend Chat error - calling realistic career simulation fallback:', err.message);
      
      // Intelligent fallback simulator
      const simulatedText = simulateResponse(textToSend, selectedTargetRole);
      
      setTimeout(() => {
        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: `${simulatedText}\n\n*(Analytical alignment sync completed autonomously. To interact with actual live neural networks, connect your GEMINI_API_KEY inside browser Secrets panel).*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        addChatMessage(assistantMsg);
        setIsTyping(false);
      }, 1500);
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
function simulateResponse(query: string, coreRole: string) {
  const q = query.toLowerCase();
  
  if (q.includes('reject') || q.includes('why')) {
    return `### Tier-1 Tech Screening Analysis
Based on corporate benchmarks, screening failures originate from three core variables:

1. **Passive Technical Metric Frustration**: Resumes listing responsibilities (e.g., "Maintained active react portal") rather than performance outcomes (e.g., "Optimized React models decreasing bundle size metrics by over 18%") fail ATS algorithms. 
2. **Missing Flagship Architecture**: For ${coreRole} paths, lacking next-gen credentials or container microservices orchestration represents a primary screen-out factor.
3. **Keyword Proximity Score**: Corporate parameters require at least an 85% overlap with stated skills profiles.

**Recommended corrective action**: Convert all milestones to STAR metrics, highlighting scale outputs.`;
  }

  if (q.includes('skill') || q.includes('learn')) {
    return `### High Demand Capabilities
To excel as a prime ${coreRole} candidate, you must complete these immediate learning objectives:

* **Next.js & Server Components**: Crucial for enterprise scalability and performance requirements.
* **Distributed State Hydration**: System stability controls.
* **Testing Automation pipelines (Cypress / Jest)**: Decreasing production incidents levels.

**Suggested High-Quality Resources**:
1. *Official NextJS Academy* (Free documentation paths)
2. *Kent C. Dodds Testing JavaScript* (Professional workflow blueprints)`;
  }

  if (q.includes('cert')) {
    return `### Globally Credential Index
These professional qualifications carry maximum authority and ROI:

1. **Google Cloud Certified Professional Cloud Engineer / Data Analyst Architect**: Immediate validator of infrastructure familiarity.
2. **AWS Certified Associate Suite**: Establishes competence across distributed scaling modules.
3. **Advanced Scrum Product / Agile Practitioner**: Verifies team orchestration skills.`;
  }

  if (q.includes('negotiate') || q.includes('salary')) {
    return `### Salary Negotiation Scripting
Here is a high-authority negotiation framework to increase compensation alignment:

**Strategic Protocol**: Never declare a first number. Always tie compensation levels back to business goals and independent execution capacities.

**Sample Script**:
*"I am exceptionally excited about the prospects of joining PixelCraft as a flagship engineer. Based on the custom capabilities, system integrations, and container structures I am preparing, a base compensation level of $115,000 establishes optimal alignment with current market demand thresholds."*`;
  }

  return `### AI Career Coaching Insights
Excellent inquiry. Reviewing your profile as a ${coreRole} specialist, I recommend analyzing:

1. **Credential Gaps**: Complete the remaining certifications in your roadmap menu.
2. **Portfolio Evidence**: Deploy complete system layouts to your GitHub repository and present them inside your active landing profile.
3. **Networking Strategy**: Target 5 engineering coordinators within high-performing start-ups.`;
}
