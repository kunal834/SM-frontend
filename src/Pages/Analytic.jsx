import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, Cell 
} from 'recharts';
import { 
  Activity, ShieldCheck, Clock, RefreshCw, HeartPulse, FileText, 
  ChevronRight, LayoutGrid, BarChart3, TrendingUp, AlertCircle, Thermometer 
} from 'lucide-react';
import axios from 'axios';
import Footer from '../components/Footer';

// ... (Keep the LoadingState component from your previous snippet)

const LoadingState = () => (
  <div className="min-h-screen bg-white flex items-center justify-center p-8">
    <div className="max-w-md w-full space-y-6 text-center">
      {/* Animated Icon Container */}
      <div className="inline-flex items-center justify-center w-20 h-20 mx-auto bg-blue-50 rounded-2xl border-4 border-blue-100 border-t-blue-500 animate-spin">
        <ShieldCheck className="w-8 h-8 text-blue-600" />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
          Syncing Metabolic Data
        </h2>
        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
          Connecting to clinical database...
        </p>
      </div>

      {/* Bounce Loading Dots */}
      <div className="flex justify-center gap-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
);

const Analytic = () => {
  const [stats, setStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const statsData = async () => {
    setRefreshing(true);
    try {
      const [analysisRes, monthlyRes, contribRes] = await Promise.all([
        axios.get(`/api/sugar/Analysis`),
        axios.get(`/api/sugar/Monthly`),
        axios.get(`/api/sugar/contri`)
      ]);

      if (analysisRes.data.success) setStats(analysisRes.data.Analysis[0]);
      if (monthlyRes.data.success) setMonthlyStats(monthlyRes.data.Analysis);
      if (contribRes.data.success) setContributions(contribRes.data.Analysis);
      
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { statsData(); }, []);

  if (loading) return <LoadingState />;

  return (
   <div className="min-h-screen flex flex-col bg-slate-50/50">
      
      {/* Header section */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-100 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight">Patient Analytics</h1>
              <p className="text-slate-600 mt-1 text-sm font-medium">Metabolic health & clinical insights</p>
            </div>
          </div>
          <button onClick={statsData} disabled={refreshing} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Clinical Data'}
          </button>
        </div>
      </div>

      {/* 2. Added 'flex-grow' to this wrapper to push footer down */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12 space-y-8">
        
        {/* 1. KPI CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Estimated HbA1c" value={`${stats?.hba1c || 0}%`} icon={<ShieldCheck />} color="purple" />
          <KPICard title="Avg Glucose" value={`${stats?.avgSugar || 0} mg/dL`} icon={<Activity />} color="blue" />
          <KPICard title="Time in Range" value={`${stats?.timeInRangePercent || 0}%`} icon={<TrendingUp />} color="green" />
          <KPICard title="Peak Level" value={`${stats?.maxSugar || 0}`} icon={<AlertCircle />} color="orange" />
        </div>

        {/* 2. GLYCEMIC DISTRIBUTION & MONTHLY TREND */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b">
              <Thermometer className="text-blue-600" size={20} />
              <h3 className="font-bold text-slate-800">Reading Ranges</h3>
            </div>
            <div className="space-y-8">
              <RangeProgress label="High (>180)" count={stats?.highCount} total={stats?.totalReadings} color="bg-rose-500" />
              <RangeProgress label="Normal (70-180)" count={stats?.normalCount} total={stats?.totalReadings} color="bg-emerald-500" />
              <RangeProgress label="Low (<70)" count={stats?.lowCount} total={stats?.totalReadings} color="bg-amber-500" />
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-blue-600" size={20} />
                <h3 className="font-bold text-slate-800">Monthly HbA1c Trend</h3>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyStats}>
                  <defs>
                    <linearGradient id="colorHb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip content={<CustomTooltip title="HbA1c Estimate" unit="%" />} />
                  <Area type="monotone" dataKey="hba1c" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHb)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. WEEKLY BAR GRAPH COMPARISON */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-indigo-600" size={20} />
            <h3 className="font-bold text-slate-800">Weekly Glucose Averages</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip title="Avg Glucose" unit=" mg/dL" />} cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="avgGlucose" radius={[6, 6, 0, 0]} barSize={40}>
                  {monthlyStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avgGlucose > 140 ? '#f43f5e' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[11px] text-slate-400 font-medium italic">* Red indicates weekly averages above clinical target (140 mg/dL)</p>
        </div>
   
        {/* 4. CONTRIBUTIONS HEATMAP */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <LayoutGrid className="text-emerald-600" size={20} />
            <h3 className="font-bold text-slate-800">Logging Consistency</h3>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] px-2">
              <CalendarHeatmap
                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                endDate={new Date()}
                values={contributions.map(c => ({ date: c._id, count: c.count }))}
                classForValue={(value) => {
                  if (!value) return 'color-empty';
                  return `color-scale-${Math.min(value.count, 4)}`;
                }}
                tooltipDataAttrs={value => ({ 'data-tip': `${value.date}: ${value.count} logs` })}
              />
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer is now naturally at the bottom */}
      <Footer/> 

      <style>{`
        .react-calendar-heatmap .color-empty { fill: #f1f5f9; }
        .react-calendar-heatmap .color-scale-1 { fill: #d1fae5; }
        .react-calendar-heatmap .color-scale-2 { fill: #6ee7b7; }
        .react-calendar-heatmap .color-scale-3 { fill: #10b981; }
        .react-calendar-heatmap .color-scale-4 { fill: #047857; }
        .react-calendar-heatmap rect { rx: 2px; ry: 2px; }
      `}</style>
    </div>
  );
};

// Reusable Sub-components
const KPICard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl ${
      color === 'purple' ? 'bg-purple-50 text-purple-600' :
      color === 'blue' ? 'bg-blue-50 text-blue-600' :
      color === 'green' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
    }`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-2xl font-black text-slate-900">{value}</h2>
    </div>
  </div>
);

const RangeProgress = ({ label, count, total, color }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <p className="text-xs font-bold text-slate-500 uppercase">{label}</p>
        <span className="text-sm font-black text-slate-900">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, title, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-lg font-black text-blue-600">{payload[0].value}{unit}</p>
      </div>
    );
  }
  return null;
};

export default Analytic;