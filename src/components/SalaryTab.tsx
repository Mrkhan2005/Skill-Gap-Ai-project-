import { useStore } from '../store/useStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Milestone, Coins, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function SalaryTab() {
  const { activeResult } = useStore();
  const { salaryForecast } = activeResult;

  const data = salaryForecast.projections;

  // Formatter for currency indicators
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const currentSalary = salaryForecast.currentSalaryEstimate;
  const potentialSalary = salaryForecast.futureSalaryEstimate;
  const difference = potentialSalary - currentSalary;
  const growthPercent = ((difference / currentSalary) * 100).toFixed(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: current pricing */}
        <div className="glass-panel p-6 rounded-3xl space-y-2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider block">Est. Market Value</span>
            <Coins className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <h2 className="heading-font text-3xl font-black text-white">{formatCurrency(currentSalary)}</h2>
          <p className="text-[10px] text-slate-400">Current skill matching threshold.</p>
        </div>

        {/* Card 2: potential upsell pricing */}
        <div className="glass-panel p-6 rounded-3xl space-y-2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950/25 border-indigo-505/20">
          <div className="flex justify-between items-center text-indigo-400">
            <span className="text-xs font-bold uppercase tracking-wider block">Upskilled Earnings Projection</span>
            <ArrowUpRight className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
          </div>
          <h2 className="heading-font text-3xl font-black text-indigo-400">{formatCurrency(potentialSalary)}</h2>
          <p className="text-[10px] text-indigo-300 font-semibold">Upon completing Roadmap targets.</p>
        </div>

        {/* Card 3: aggregate growth percentage */}
        <div className="glass-panel p-6 rounded-3xl space-y-2 relative overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950/20 border-emerald-505/20">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider block">Estimated Growth Differential</span>
            <TrendingUp className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <h2 className="heading-font text-3xl font-black text-emerald-400">+{formatCurrency(difference)}</h2>
          <p className="text-[10px] text-emerald-300 font-bold">Reflects a {growthPercent}% delta increase.</p>
        </div>

      </div>

      {/* 2. Recharts Area Line Forecasting Chart */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div>
          <h3 className="heading-font text-base font-bold text-white">5-Year ROI Forecast</h3>
          <p className="text-slate-400 text-xs mt-1">
            Tracks baseline career projection (Purple) versus upskilled path trajectory (Cyan) with continuous learning loops.
          </p>
        </div>

        <div className="h-72 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUpskilled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="year" stroke="#475569" tick={{ fill: '#94A3B8' }} />
              <YAxis 
                stroke="#475569" 
                tickFormatter={(val) => `$${val / 1000}k`} 
                tick={{ fill: '#94A3B8' }} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
                labelStyle={{ fontWeight: 'bold', color: '#FFF' }}
                formatter={(val: number) => [formatCurrency(val), '']}
              />
              <Area 
                type="monotone" 
                dataKey="baseSalary" 
                name="Baseline Career Path" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBase)" 
              />
              <Area 
                type="monotone" 
                dataKey="upskilledSalary" 
                name="Upskilled Tech Path" 
                stroke="#06B6D4" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorUpskilled)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 text-xs pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5 font-semibold text-purple-400">
            <span className="h-2.5 w-2.5 rounded bg-purple-500 block"></span>
            Baseline Path
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
            <span className="h-2.5 w-2.5 rounded bg-cyan-500 block"></span>
            Upskilled Tech Path
          </div>
        </div>
      </div>

      {/* 3. Operational Career Guidance items */}
      <div className="glass-panel p-6 rounded-3xl space-y-4 bg-gradient-to-r from-indigo-950/10 to-transparent">
        <div className="flex items-center gap-2">
          <Milestone className="h-5 w-5 text-indigo-400 rotate-90" />
          <h4 className="heading-font text-base font-bold text-white">How To Capitalize On Growth Values</h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 space-y-1">
            <h5 className="font-bold text-white text-xs mb-1.5">Completing High ROI Gaps First</h5>
            <p className="text-xs text-slate-400">Focus heavily on Next.js, systems orchestration, and automated Cypress testing as highlighted in your current tab. This is where demand is concentrated.</p>
          </div>
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-white/5 space-y-1">
            <h5 className="font-bold text-white text-xs mb-1.5 font-sans">Negotiating Alignment Benchmarks</h5>
            <p className="text-xs text-slate-400">Leverage your mock certification accreditations. Frame certifications and custom sandbox launches as critical indicators of independent technical governance.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
