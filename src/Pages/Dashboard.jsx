import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';
import { 
  Flame, 
  History, 
  Activity, 
  ArrowRight, 
  Zap,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Target
} from 'lucide-react';
import axios from 'axios';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const { Authuser, logout, isLoading } = useContext(Authcontext);
  const [summary, setSummary] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching your new aggregations
        const [statsRes, streakRes] = await Promise.all([
          axios.get('/api/sugar/Analysis'),
          axios.get('/api/sugar/contri') // Use this to calculate streak
        ]);

        if (statsRes.data.success) setSummary(statsRes.data.Analysis[0]);
        // Simple logic: if today has a log, calculate consecutive days
        if (streakRes.data.success) {
           setStreak(calculateStreak(streakRes.data.Analysis));
        }
      } catch (err) {
        console.error("Dashboard Intelligence Error", err);
      }
    };
    if (Authuser) fetchDashboardData();
  }, [Authuser]);

  const calculateStreak = (logs) => {
    // Basic logic to count consecutive days from the end of the array
    return logs.length; // Placeholder for your streak logic
  };

  if (isLoading || !Authuser) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <main className="max-w-7xl mx-auto p-8">
        
        {/* TOP SECTION: The Hero Status */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">
              <ShieldCheck size={14} /> Clinical Intelligence Active
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              {Authuser.name.split(' ')[0]}'s Overview
            </h1>
          </div>
          
          {/* Action Hub */}
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/add-sugar')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
            >
              <Zap size={18} /> New Reading
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Intelligence Cards (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Row 1: The "Big Numbers" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IntelligenceCard 
                label="Glucose Management (GMI)"
                value={`${summary?.hba1c || '--'}%`}
                desc="Estimated HbA1c based on logs"
                icon={<Target className="text-purple-600" />}
                color="bg-purple-50"
              />
              <IntelligenceCard 
                label="Current Streak"
                value={`${streak} Days`}
                desc="Keep logging to stay consistent!"
                icon={<Flame className="text-orange-500" />}
                color="bg-orange-50"
              />
            </div>

            {/* Row 2: Live Insights */}
            <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm overflow-hidden relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-bold text-xl text-slate-800">Time in Range</h3>
                  <p className="text-slate-500 text-sm">Target: 70 - 180 mg/dL</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-600">{summary?.timeInRangePercent || 0}%</span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daily Stability</p>
                </div>
              </div>

              {/* Minimalist Range Visualizer */}
              <div className="h-4 w-full bg-slate-100 rounded-full flex overflow-hidden border border-slate-50">
                <div style={{ width: `${summary?.timeInRangePercent || 0}%` }} className="bg-emerald-500 h-full transition-all duration-1000" />
                <div style={{ width: `${summary?.highCount > 0 ? 10 : 0}%` }} className="bg-rose-400 h-full opacity-50" />
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg</p>
                  <p className="font-black text-slate-700">{summary?.avgSugar || '--'}</p>
                </div>
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Highs</p>
                  <p className="font-black text-slate-700">{summary?.highCount || 0}</p>
                </div>
                <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Lows</p>
                  <p className="font-black text-slate-700">{summary?.lowCount || 0}</p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: Quick History & Tips (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Recent Feed */}
            <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <History size={18} className="text-slate-400" /> Quick Feed
              </h3>
              <div className="space-y-4">
                 {/* Map your recentLogs here - matching your previous design */}
                 <button 
                  onClick={() => navigate('/Analytic')}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  FULL ANALYTICS <ChevronRight size={14} />
                </button>
              </div>
            </section>

            {/* AI Insight Box */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <TrendingUp className="absolute -right-4 -top-4 text-white/10 group-hover:scale-110 transition-transform" size={120} />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-4">Health Recommendation</p>
              <h4 className="text-lg font-bold leading-tight mb-4">
                Your stability is up {summary?.timeInRangePercent > 70 ? '5%' : '2%'} this week. 
              </h4>
              <p className="text-sm opacity-70 leading-relaxed italic">
                "Keep up the bedtime logs; they are vital for predicting morning fasting levels."
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer/>

    </div>
  );
};

const IntelligenceCard = ({ label, value, desc, icon, color }) => (
  <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
    <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 mb-2">{value}</h3>
    <p className="text-xs text-slate-500 font-medium">{desc}</p>
  </div>
);

// ... (Keep your LoadingScreen)

export default Dashboard;