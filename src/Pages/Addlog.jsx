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
  AlertCircle 
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

  // Dynamic range status for visual feedback
  const getStatusColor = useMemo(() => {
    const val = parseFloat(formData.value);
    if (!val) return 'border-slate-200 text-slate-400';
    if (formData.unit === 'mg/dL') {
      if (val < 70) return 'border-amber-400 text-amber-600';
      if (val <= 140) return 'border-emerald-500 text-emerald-600';
      return 'border-rose-500 text-rose-600';
    }
    return 'border-teal-500 text-teal-600';
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
      alert(error.response?.data?.message || "Failed to save");
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-8 px-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-white relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Add Reading</h1>
            <p className="text-slate-400 text-sm mt-1">Keep track of your health journey</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Main Input Display */}
          <div className="relative">
            <div className="flex justify-between items-end mb-3 px-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Blood Glucose</label>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                {['mg/dL', 'mmol/L'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setFormData({...formData, unit: u})}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                      formData.unit === u ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <input 
                type="number" 
                required
                step="any"
                className={`w-full text-5xl font-light py-6 text-center bg-white border-b-2 outline-none transition-all duration-500 ${getStatusColor}`}
                placeholder="000"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
              />
              <span className={`absolute right-4 bottom-6 font-medium text-sm ${getStatusColor}`}>
                {formData.unit}
              </span>
            </div>
          </div>

          {/* Context Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Time of Day / Context</label>
            <div className="grid grid-cols-3 gap-3">
              {contexts.map((ctx) => (
                <button
                  key={ctx.name}
                  type="button"
                  onClick={() => setFormData({...formData, context: ctx.name})}
                  className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all duration-200 ${
                    formData.context === ctx.name 
                      ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  <span className="mb-2">{ctx.icon}</span>
                  <span className="text-[11px] font-bold uppercase">{ctx.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
              <input 
                type="date"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none"
                value={formData.entryDate}
                onChange={(e) => setFormData({...formData, entryDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Notes</label>
              <input 
                type="text"
                placeholder="Optional notes..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Action */}
          <button 
            type="submit"
            disabled={loading}
            className="group relative w-full h-16 bg-slate-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </motion.div>
              ) : (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Confirm Reading
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Addlog;