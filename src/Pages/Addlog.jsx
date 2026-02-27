import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';
import { motion } from 'framer-motion';

const Addlog = () => {
  const navigate = useNavigate();
  const { Authuser } = useContext(Authcontext);
  
  const [formData, setFormData] = useState({
    value: '',
    unit: 'mg/dL',
    context: 'Fasting',
    notes: '',
    entryDate: new Date().toISOString().split('T')[0] // Default to today
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/sugar/fill', {
        ...formData,
        userId: Authuser._id // Linking the log to the logged-in user
      });

      if (response.data.success) {
        alert("Reading saved successfully!");
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error("Error saving reading:", error);
      alert(error.response?.data?.message || "Failed to save reading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFDFE] py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10"
      >
        <header className="mb-10 text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">New Reading</h1>
          <p className="text-slate-500 mt-2">Log your current glucose levels</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sugar Value & Unit */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Value</label>
              <input 
                type="number" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="e.g. 108"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Unit</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-teal-500 outline-none appearance-none cursor-pointer"
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
              >
                <option value="mg/dL">mg/dL</option>
                <option value="mmol/L">mmol/L</option>
              </select>
            </div>
          </div>

          {/* Context Select */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Context</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Fasting', 'Pre-meal', 'Post-meal', 'Bedtime', 'Other'].map((ctx) => (
                <button
                  key={ctx}
                  type="button"
                  onClick={() => setFormData({...formData, context: ctx})}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all border ${
                    formData.context === ctx 
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-teal-200'
                  }`}
                >
                  {ctx}
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Date</label>
            <input 
              type="date"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none"
              value={formData.entryDate}
              onChange={(e) => setFormData({...formData, entryDate: e.target.value})}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Notes (Optional)</label>
            <textarea 
              maxLength="200"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
              rows="3"
              placeholder="How are you feeling? Any specific food?"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
            <p className="text-right text-[10px] text-slate-400 mt-1">{formData.notes.length}/200</p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving Reading...' : 'Save Log'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Addlog;
