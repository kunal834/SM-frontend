import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, Cell, ReferenceLine
} from 'recharts';
import { 
  Activity, ShieldCheck, Clock, RefreshCw, LayoutGrid, 
  BarChart3, TrendingUp, AlertCircle, Thermometer, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from '../components/Footer';

// --- RELAXING LOADING STATE ---
const LoadingState = () => (
  <div className="min-h-screen bg-[#F0F4F7] flex items-center justify-center p-8">
    <div className="text-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-100"
      >
        <Sparkles className="w-10 h-10 text-slate-400" />
      </motion.div>
      <h2 className="text-2xl font-serif italic text-slate-800 mb-2">Finding your rhythm</h2>
      <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">Syncing clinical data</p>
    </div>
  </div>
);

const hardcodedHbA1cData = [
  { month: 'Jan', hba1c: 7.2 }, { month: 'Feb', hba1c: 7.0 },
  { month: 'Mar', hba1c: 6.8 }, { month: 'Apr', hba1c: 6.5 },
  { month: 'May', hba1c: 6.3 }, { month: 'Jun', hba1c: 6.1 },
];

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
    <div className="min-h-screen bg-[#F0F4F7] text-slate-700 font-sans selection:bg-rose-100 overflow-x-hidden pt-24">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-rose-50/50 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20 space-y-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Clinical Feed
            </motion.div>
            <h1 className="text-5xl font-serif italic text-slate-900 tracking-tight">Body Harmony</h1>
          </div>
          
          <button 
            onClick={statsData} 
            className="group flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-lg border border-white rounded-[2rem] text-sm font-bold shadow-xl hover:bg-white transition-all active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Metabolism
          </button>
        </div>

        {/* --- KPI SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="HbA1c Projection" value={`${stats?.hba1c || 0}%`} unit="Est." icon={<ShieldCheck />} color="rose" />
          <KPICard title="Daily Average" value={stats?.avgSugar || 0} unit="mg/dL" icon={<Activity />} color="blue" />
          <KPICard title="Stability" value={`${stats?.timeInRangePercent || 0}%`} unit="Range" icon={<TrendingUp />} color="sage" />
          <KPICard title="Highest Peak" value={stats?.maxSugar || 0} unit="Max" icon={<AlertCircle />} color="charcoal" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* --- READING RANGES --- */}
          <div className="lg:col-span-4 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-10 shadow-xl">
            <h3 className="text-xl font-serif italic mb-10 text-slate-800">Range Distribution</h3>
            <div className="space-y-10">
              <RangeProgress label="Elevated" count={stats?.highCount} total={stats?.totalReadings} color="bg-rose-300" />
              <RangeProgress label="Optimal" count={stats?.normalCount} total={stats?.totalReadings} color="bg-emerald-300" />
              <RangeProgress label="Critical" count={stats?.lowCount} total={stats?.totalReadings} color="bg-amber-300" />
            </div>
          </div>

          {/* --- HBA1C TREND AREA CHART --- */}
          <div className="lg:col-span-8 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-10 shadow-xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-serif italic text-slate-800">HbA1c Trend</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">6 Month Forecast</p>
              </div>
              <BarChart3 className="text-slate-300" size={24} />
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hardcodedHbA1cData}>
                  <defs>
                    <linearGradient id="colorHb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FDA4AF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FDA4AF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={15} />
                  <YAxis hide domain={[5, 8]} />
                  <Tooltip content={<CustomTooltip title="A1c Level" unit="%" />} />
                  <Area type="monotone" dataKey="hba1c" stroke="#E11D48" strokeWidth={4} fill="url(#colorHb)" />
                  <ReferenceLine y={6.0} stroke="#10b981" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* --- WEEKLY GLUCOSE BAR CHART --- */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px]" />
          <div className="flex items-center gap-3 mb-10">
            <h3 className="text-2xl font-serif italic">Weekly Rhythm</h3>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <Tooltip content={<CustomTooltip dark title="Average" unit=" mg/dL" />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                <Bar dataKey="avgGlucose" radius={[20, 20, 20, 20]} barSize={32}>
                  {monthlyStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avgGlucose > 140 ? '#fb7185' : '#ffffff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- HEATMAP SECTION --- */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-12 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif italic text-slate-800">Logging Discipline</h3>
            <LayoutGrid className="text-slate-300" size={20} />
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px]">
              <CalendarHeatmap
                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                endDate={new Date()}
                values={contributions.map(c => ({ date: c._id, count: c.count }))}
                classForValue={(v) => !v ? 'color-empty' : `color-scale-${Math.min(v.count, 4)}`}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .react-calendar-heatmap .color-empty { fill: #e2e8f0; }
        .react-calendar-heatmap .color-scale-1 { fill: #ffe4e6; }
        .react-calendar-heatmap .color-scale-2 { fill: #fecdd3; }
        .react-calendar-heatmap .color-scale-3 { fill: #fda4af; }
        .react-calendar-heatmap .color-scale-4 { fill: #fb7185; }
        .react-calendar-heatmap rect { rx: 4px; ry: 4px; }
      `}</style>
    </div>
  );
};

const KPICard = ({ title, value, unit, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
      color === 'rose' ? 'bg-rose-50 text-rose-400' :
      color === 'blue' ? 'bg-blue-50 text-blue-400' :
      color === 'sage' ? 'bg-emerald-50 text-emerald-400' : 'bg-slate-100 text-slate-500'
    }`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{title}</p>
    <div className="flex items-baseline gap-2">
      <h2 className="text-3xl font-serif italic text-slate-900">{value}</h2>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{unit}</span>
    </div>
  </motion.div>
);

const RangeProgress = ({ label, count, total, color }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-end mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <span className="text-lg font-serif italic text-slate-800">{percentage}%</span>
      </div>
      <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden shadow-inner border border-white">
        <motion.div 
          initial={{ width: 0 }} 
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, title, unit, dark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${dark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-900'} border p-4 rounded-3xl shadow-2xl`}>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <p className="text-xl font-serif italic">{payload[0].value}{unit}</p>
      </div>
    );
  }
  return null;
};

export default Analytic;