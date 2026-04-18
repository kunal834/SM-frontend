import React, { useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Coffee, 
  Utensils, 
  Moon, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  PenLine
} from 'lucide-react';

const Addlog = () => {
  const navigate = useNavigate();
  const { Authuser } = useContext(Authcontext);
  
  const [formData, setFormData] = useState({
    value: '',
    unit: 'mg/dL',
    context: 'Fasting',
    notes: '',
    entryDate: new Date().toISOString().split('T')[0]
  });

  const [loading, setLoading] = useState(false);

  const visualStatus = useMemo(() => {
    const val = parseFloat(formData.value);
    if (!val) return { 
      color: 'text-slate-300', 
      glow: 'bg-slate-50/50', 
      border: 'border-slate-100',
      label: 'Enter Value' 
    };
    
    if (formData.unit === 'mg/dL') {
      if (val < 70) return { 
        color: 'text-amber-500', 
        glow: 'bg-amber-100/30', 
        border: 'border-amber-200',
        label: 'Lower than usual' 
      };
      if (val <= 140) return { 
        color: 'text-emerald-500', 
        glow: 'bg-emerald-100/30', 
        border: 'border-emerald-200',
        label: 'Perfect Harmony' 
      };
      return { 
        color: 'text-rose-400', 
        glow: 'bg-rose-100/30', 
        border: 'border-rose-200',
        label: 'Elevated Rhythm' 
      };
    }
    return { color: 'text-slate-600', glow: 'bg-slate-100', border: 'border-slate-200' };
  }, [formData.value, formData.unit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/sugar/fill', {
        ...formData,
        userId: Authuser._id
      });
      if (response.data.success) { navigate('/Dashboard'); }
    } catch (error) {
      console.error(error);
    } finally { setLoading(false); }
  };

  const contexts = [
    { name: 'Fasting', icon: <Coffee size={18} /> },
    { name: 'Pre-meal', icon: <Activity size={18} /> },
    { name: 'Post-meal', icon: <Utensils size={18} /> },
    { name: 'Bedtime', icon: <Moon size={18} /> },
    { name: 'Other', icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F7] flex flex-col items-center justify-start p-6 relative overflow-x-hidden font-sans selection:bg-rose-100">
      
      {/* 1. Background Ambience Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute bottom-[0%] left-[-5%] w-[50%] h-[50%] rounded-full bg-rose-50/40 blur-[100px]" />
      </div>

      {/* 2. Content Spacer (Pushes form down so it doesn't hide under the Navbar) */}
      <div className="h-24 md:h-32 w-full" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/70 backdrop-blur-3xl rounded-[3.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative z-10 overflow-hidden mb-12"
      >
        {/* --- HEADER --- */}
        <div className="p-8 pb-0 flex items-center justify-between">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl hover:scale-110 transition-all shadow-sm border border-slate-100 active:scale-95"
          >
            <ChevronLeft className="text-slate-400" size={20} />
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-serif italic text-slate-800 leading-tight">New Reading</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Update your flow</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-10">
          
          {/* --- MAIN VALUE INPUT --- */}
          <div className="relative flex flex-col items-center">
            <motion.div 
              key={visualStatus.label}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-4 px-4 py-1 rounded-full bg-white border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 z-20 shadow-sm"
            >
              {visualStatus.label}
            </motion.div>
            
            <div className={`relative w-full aspect-[2/1] max-h-44 flex items-center justify-center rounded-[3rem] transition-all duration-700 ${visualStatus.glow} border-2 ${visualStatus.border} shadow-inner bg-white/30`}>
              <input 
                type="number" 
                required
                step="any"
                autoFocus
                className={`w-full bg-transparent text-8xl font-serif italic text-center outline-none transition-colors duration-500 placeholder:text-slate-200/50 ${visualStatus.color}`}
                placeholder="00"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
              />
              
              <div className="absolute bottom-4 flex bg-white/80 backdrop-blur-md p-1 rounded-full border border-slate-100 shadow-sm">
                {['mg/dL', 'mmol/L'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setFormData({...formData, unit: u})}
                    className={`px-5 py-2 text-[10px] font-black rounded-full transition-all ${
                      formData.unit === u ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- OCCURRENCE SELECTOR --- */}
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-4">Occurrence</span>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {contexts.map((ctx) => (
                <button
                  key={ctx.name}
                  type="button"
                  onClick={() => setFormData({...formData, context: ctx.name})}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                    formData.context === ctx.name 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' 
                      : 'bg-white/50 border-white text-slate-500 hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <span className={formData.context === ctx.name ? 'text-rose-300' : 'text-slate-400'}>{ctx.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest">{ctx.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* --- SECONDARY INPUTS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-300 transition-colors" size={16} />
              <input 
                type="date"
                className="w-full bg-white/50 border border-white rounded-3xl pl-12 pr-6 py-4 text-sm text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-rose-50/50 transition-all shadow-sm"
                value={formData.entryDate}
                onChange={(e) => setFormData({...formData, entryDate: e.target.value})}
              />
            </div>
            <div className="relative group">
              <PenLine className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-300 transition-colors" size={16} />
              <input 
                type="text"
                placeholder="Mindful notes..."
                className="w-full bg-white/50 border border-white rounded-3xl pl-12 pr-6 py-4 text-sm text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-rose-50/50 transition-all shadow-sm"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>

          {/* --- THE SUBMIT BUTTON --- */}
          <button 
            type="submit"
            disabled={loading}
            className="group relative w-full h-20 bg-slate-900 text-white rounded-[2.5rem] font-bold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-rose-200 active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative z-10 flex items-center justify-center gap-3"
                >
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="font-serif italic text-xl tracking-tighter">Syncing...</span>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="relative z-10 flex items-center justify-center gap-3"
                >
                  <Sparkles size={18} className="text-rose-200 animate-pulse" />
                  <span className="font-serif italic text-3xl lowercase tracking-tighter">log my rhythm</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Addlog;