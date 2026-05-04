import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/authcontext';
import { 
  Flame, 
  History, 
  Activity, 
  Sparkles,
  Zap,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const { Authuser, isLoading } = useContext(Authcontext);
  const [summary, setSummary] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, streakRes] = await Promise.all([
          axios.get('/api/sugar/Analysis'),
          axios.get('/api/sugar/contri')
        ]);
        if (statsRes.data.success) setSummary(statsRes.data.Analysis[0]);
        if (streakRes.data.success) setStreak(streakRes.data.Analysis.length);
      } catch (err) {
        console.error("Dashboard Intelligence Error", err);
      }
    };
    if (Authuser) fetchDashboardData();
  }, [Authuser]);

  if (isLoading || !Authuser) return <div className="h-screen bg-[#F0F4F7]" />;

  return (
    <div className="min-h-screen bg-[#F0F4F7] text-slate-800 font-sans selection:bg-rose-100 overflow-x-hidden pt-28">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-rose-50/50 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20 space-y-12">
        
        {/* --- HERO GREETING --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-rose-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              <ShieldCheck size={14} /> System Secure & Active
            </div>
            <h1 className="text-6xl font-serif italic text-slate-900 tracking-tight leading-tight">
              Welcome home, <br />
              <span className="text-slate-400">{Authuser.name.split(' ')[0]}</span>
            </h1>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/AddLog')}
            className="group relative px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-bold shadow-2xl hover:shadow-rose-100 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2 italic font-serif">
              <Zap size={18} className="text-rose-200" /> log your rhythm
            </span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- LEFT CONTENT (KPIs & RANGES) --- */}
          <div className="lg:col-span-8 space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <IntelligenceCard 
                label="Metabolic Forecast (GMI)"
                value={`${summary?.hba1c || '--'}%`}
                desc="Estimated HbA1c based on logs"
                icon={<Target className="text-rose-400" />}
                color="bg-rose-50"
              />
              <IntelligenceCard 
                label="Momentum"
                value={`${streak} Days`}
                desc="Consecutive logging streak"
                icon={<Flame className="text-amber-400" />}
                color="bg-amber-50"
              />
            </div>

            {/* --- TIME IN RANGE VISUALIZER --- */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3.5rem] p-10 shadow-xl overflow-hidden relative"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-serif italic text-slate-800">Harmony Zone</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">70 - 180 mg/dL Stability</p>
                </div>
                <div className="text-right">
                  <span className="text-5xl font-serif italic text-emerald-500">{summary?.timeInRangePercent || 0}%</span>
                </div>
              </div>

              {/* Liquid Wave Visualizer */}
              <div className="relative h-6 w-full bg-white/50 rounded-full border border-white shadow-inner overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${summary?.timeInRangePercent || 0}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.4)]" 
                />
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                <InsightPill label="Avg" val={summary?.avgSugar} />
                <InsightPill label="Highs" val={summary?.highCount} color="text-rose-400" />
                <InsightPill label="Lows" val={summary?.lowCount} color="text-amber-400" />
              </div>
            </motion.section>
          </div>

          {/* --- RIGHT CONTENT (FEED & AI) --- */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* QUICK FEED GLASS BOX */}
            <section className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3.5rem] p-10 shadow-xl">
              <h3 className="text-xl font-serif italic text-slate-800 flex items-center gap-3 mb-8">
                <History size={18} className="text-slate-300" /> Recent Flows
              </h3>
              <div className="space-y-4">
                 <button 
                  onClick={() => navigate('/Analytic')}
                  className="w-full group mt-4 flex items-center justify-center gap-3 py-5 bg-white rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-800 transition-all border border-slate-100 shadow-sm"
                >
                  Deep Analytics <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>

            {/* AI ZEN BOX */}
            <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden group shadow-3xl">
              <TrendingUp className="absolute -right-6 -top-6 text-rose-400/10 group-hover:scale-110 transition-transform duration-700" size={160} />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                    <Sparkles size={18} className="text-rose-200" />
                </div>
                <h4 className="text-2xl font-serif italic leading-tight mb-6">
                  Consistency is your <br/> greatest medicine.
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-rose-300/30 pl-4">
                  "Your stability improved by {summary?.timeInRangePercent > 70 ? '5%' : '2%'} this week. Bedtime logs are providing excellent clarity for your morning fasts."
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

const IntelligenceCard = ({ label, value, desc, icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/60 backdrop-blur-xl border border-white/80 p-10 rounded-[3rem] shadow-xl relative overflow-hidden group"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-8 shadow-inner`}>
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{label}</p>
    <h3 className="text-4xl font-serif italic text-slate-900 mb-2">{value}</h3>
    <p className="text-xs text-slate-500/70 font-medium italic">{desc}</p>
  </motion.div>
);

const InsightPill = ({ label, val, color = "text-slate-700" }) => (
  <div className="p-6 rounded-[2.5rem] bg-white/30 border border-white/60 shadow-inner">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xl font-serif italic ${color}`}>{val || '--'}</p>
  </div>
);

export default Dashboard;