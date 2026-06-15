import { useStore } from '../store/useStore';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Sparkles, BarChart3, TrendingUp, ShieldAlert, Zap } from 'lucide-react';

export default function AnalyticsTab() {
  const { activeResult } = useStore();
  const { gapAnalysis, scores, futureProof } = activeResult;

  // 1. Skill distribution dataset (Pie)
  const skillsPieData = [
    { name: 'Core Tech', value: 4, color: '#4F46E5' },
    { name: 'Testing & Quality', value: 2, color: '#8B5CF6' },
    { name: 'Architecture & Scale', value: 3, color: '#8884d8' },
    { name: 'Database / Cloud', value: 2, color: '#06B6D4' },
    { name: 'Agile & Team', value: 2, color: '#10B981' }
  ];

  // 2. Career readiness trend overtime (Line)
  const readinessTrendData = [
    { month: 'Jan', baseline: 42, activeCurriculum: 42 },
    { month: 'Feb', baseline: 46, activeCurriculum: 52 },
    { month: 'Mar', baseline: 51, activeCurriculum: 64 },
    { month: 'Apr', baseline: 52, activeCurriculum: 72 },
    { month: 'May', baseline: 55, activeCurriculum: 84 },
    { month: 'Jun', baseline: 58, activeCurriculum: 92 }
  ];

  // 3. Salary comparison by milestone (Bar)
  const salaryCompareData = activeResult.salaryForecast.projections.map(item => ({
    name: item.year,
    Baseline: item.baseSalary,
    Upskilled: item.upskilledSalary
  }));

  // 4. Competency alignment matrix (Radar)
  const competenciesRadarData = gapAnalysis.skillsBreakdown.map(item => ({
    subject: item.skill,
    current: item.proficiency,
    required: item.requiredLevel
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Overview Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="heading-font text-xl md:text-2xl font-bold text-white">Advanced Career Analytics</h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Visualizes system trajectories, capability splits, and salary multipliers to optimize resource alignments.
          </p>
        </div>
      </div>

      {/* 2. Double Graphical Panels Grid (Line and Pie Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Readiness Trend Chart (Line) */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Intellectual Preparedness Trend</h3>
            <p className="text-slate-400 text-xs mt-1">Staggers baseline growth curves (Purple) with active roadmap tracking progress (Cyan).</p>
          </div>
          <div className="h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readinessTrendData} margin={{ left: -10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="month" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="baseline" stroke="#8B5CF6" name="No Up-skilling" strokeWidth={3} dot={{ fill: '#8B5CF6' }} />
                <Line type="monotone" dataKey="activeCurriculum" stroke="#06B6D4" name="Assessed Roadmap" strokeWidth={3} dot={{ fill: '#06B6D4' }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Skill Slices PieChart */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Stated Competency Allocations</h3>
            <p className="text-slate-400 text-xs mt-1">Details structural distributions cataloged from skills extraction matrices.</p>
          </div>
          <div className="h-64 text-xs flex items-center justify-between">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillsPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {skillsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} elements`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Slices Legend Indicators */}
            <div className="space-y-2 w-1/2 pl-4">
              {skillsPieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <span className="h-3.5 w-3.5 rounded" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 3. Triple Grid Salary and Alignment charts (Bar Chart and Radar representation) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Earnings comparisons milestones (Bar) */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Earnings Trajectory Progression</h3>
            <p className="text-slate-400 text-xs mt-1">Quantifies salary variations across long ranges.</p>
          </div>
          <div className="h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryCompareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="name" stroke="#475569" />
                <YAxis stroke="#475569" tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }} />
                <Bar dataKey="Baseline" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Upskilled" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alignment Matrix Vectors (Radar) */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div>
            <h3 className="heading-font text-base font-bold text-white">Competency Alignment Vectors</h3>
            <p className="text-slate-400 text-xs mt-1">Polar metrics representing actual versus required levels.</p>
          </div>
          <div className="h-64 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competenciesRadarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 9 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Active proficiency" dataKey="current" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
                <Radar name="Required Level" dataKey="required" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
