import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontext } from '../context/authcontext';
import { motion } from 'framer-motion';
import { Clock, Download, FileText, Sparkles } from 'lucide-react';

const History = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Authuser } = useContext(Authcontext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(`/api/sugar/fetchdata`);
        if (data.success) {
          setLogs(data.logs);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (Authuser?._id) {
      fetchHistory();
    }
  }, [Authuser]);

  // Value-based color status
  const getStatusColors = (val) => {
    if (val > 140) return "text-rose-400 bg-rose-50 border-rose-100 shadow-rose-100/50";
    if (val < 70) return "text-amber-500 bg-amber-50 border-amber-100 shadow-amber-100/50";
    return "text-emerald-500 bg-emerald-50 border-emerald-100 shadow-emerald-100/50";
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F0F4F7] flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-slate-400 font-serif italic text-2xl"
      >
        gathering your story...
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F4F7] py-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-rose-50/40 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 border border-white text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              <Clock size={12} /> Timeline
            </div>
            <h1 className="text-5xl font-serif italic text-slate-900 tracking-tight">Reading History</h1>
          </div>
          
          <button 
            onClick={() => window.print()} 
            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-bold shadow-2xl shadow-slate-200 hover:scale-105 transition-all active:scale-95"
          >
            <Download size={18} className="text-rose-300" />
            Export Archive
          </button>
        </div>

        {/* --- LOG LIST --- */}
        <div className="space-y-6">
          {logs.length > 0 ? logs.map((log, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={log._id}
              className="group bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-white/60 transition-all hover:shadow-xl hover:shadow-slate-200/50"
            >
              {/* Date Column */}
              <div className="flex flex-col items-center md:items-start min-w-[120px]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Date</span>
                <p className="text-slate-800 font-bold">
                  {new Date(log.entryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                   {new Date(log.entryDate).getFullYear()}
                </p>
              </div>

              {/* Value Column */}
              <div className="flex-1 flex flex-col items-center md:items-start">
                 <div className="relative">
                    <div className={`absolute -inset-4 rounded-full blur-xl opacity-20 ${getStatusColors(log.value).split(' ')[1]}`} />
                    <div className="relative flex items-baseline gap-2">
                        <span className={`text-5xl font-serif italic ${getStatusColors(log.value).split(' ')[0]}`}>
                            {log.value}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                            {log.unit}
                        </span>
                    </div>
                 </div>
              </div>

              {/* Context Tag */}
              <div className="flex flex-col items-center md:items-start min-w-[140px]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Context</span>
                <span className="px-5 py-2 rounded-full bg-white/80 border border-white text-[11px] font-bold text-slate-600 shadow-sm">
                  {log.context}
                </span>
              </div>

              {/* Notes Section */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                    <FileText size={12} className="text-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notes</span>
                </div>
                <p className="text-sm text-slate-500 italic leading-relaxed">
                  {log.notes ? `"${log.notes}"` : "no notes for this entry"}
                </p>
              </div>

              {/* Decorative Sparkle for perfect readings */}
              {log.value <= 140 && log.value >= 70 && (
                <div className="hidden lg:block">
                    <Sparkles size={20} className="text-emerald-200 animate-pulse" />
                </div>
              )}
            </motion.div>
          )) : (
            <div className="bg-white/30 backdrop-blur-md rounded-[3rem] border border-white border-dashed p-24 text-center">
              <p className="font-serif italic text-2xl text-slate-400 mb-4">A blank page in your journey.</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Time to log your first rhythm</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Footer Space */}
      <div className="h-20" />
    </div>
  );
};

export default History;