import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const softHover = {
  hover: { y: -5, transition: { duration: 0.4, ease: "easeOut" } }
};

const MetricCard = ({ label, val, unit, desc, colorFilter, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
    whileHover="hover"
    variants={softHover}
    className="relative p-10 rounded-[4rem] bg-white/30 backdrop-blur-2xl border border-white/40 shadow-xl shadow-slate-200/50 overflow-hidden group"
  >
    {/* Subtle Glow behind the number */}
    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 ${colorFilter}`} />
    
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 block">{label}</span>
    
    <div className="flex items-baseline gap-2 mb-4">
      <span className="text-7xl font-serif text-slate-800 tracking-tighter italic">{val}</span>
      <span className="text-slate-400 font-light text-xl italic">{unit}</span>
    </div>
    
    <p className="text-sm text-slate-500/70 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const Homepage = () => {
  const metrics = [
    { label: 'Current Level', val: '108', unit: 'mg/dL', desc: 'Flowing within your ideal rhythm.', colorFilter: 'bg-emerald-400' },
    { label: 'Projected A1c', val: '5.4', unit: '%', desc: 'A steady horizon for the months ahead.', colorFilter: 'bg-blue-400' },
    { label: 'Harmony Score', val: '94', unit: '%', desc: 'Time spent in your personal sweet spot.', colorFilter: 'bg-rose-400' }
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F7] text-slate-700 font-sans selection:bg-rose-100 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-100/40 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-50/50 blur-[120px]" />
        <div className="absolute top-[30%] left-[20%] w-4 h-4 bg-emerald-200 rounded-full blur-xl" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/40 border border-white/60 text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-12 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Breathable Health Tracking
          </motion.div>

          <h1 className="text-6xl md:text-[110px] font-serif tracking-tight text-slate-900 leading-[0.85] mb-12">
            Health in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-rose-400 to-slate-800 italic font-light leading-normal">Soft Focus.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-500/80 font-light leading-relaxed mb-16">
            Escape the clinical noise. A sugar-tracking experience that feels more like a morning breeze than a medical chore.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/login" className="px-14 py-6 bg-slate-900 text-white rounded-full text-lg font-medium shadow-2xl hover:shadow-slate-400/40 hover:-translate-y-1 transition-all">
              Begin Your Journey
            </Link>
            <Link to="/demo" className="group flex items-center gap-3 text-slate-600 font-semibold text-lg">
              Explore the interface 
              <span className="w-12 h-[1px] bg-slate-300 group-hover:w-16 transition-all"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- METRICS GRID --- */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} delay={i * 0.2} />
          ))}
        </div>
      </section>

      {/* --- FEATURE EXPERIENCE --- */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-16 rounded-[4rem] bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px]" />
              <h3 className="text-4xl font-serif italic mb-8">Quiet Intelligence</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Our AI doesn't shout. It whispers trends, predicting your HbA1c with gentle accuracy, allowing you to adjust without the stress.
              </p>
              <div className="flex gap-4">
                <div className="px-5 py-2 rounded-full border border-slate-700 text-xs font-bold tracking-widest uppercase">Predictive</div>
                <div className="px-5 py-2 rounded-full border border-slate-700 text-xs font-bold tracking-widest uppercase">Non-Intrusive</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-16 rounded-[4rem] bg-white border border-slate-100 shadow-sm flex flex-col justify-center"
            >
              <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-400 mb-10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif text-slate-800 mb-6">Paper-Like Reports</h3>
              <p className="text-slate-500 leading-relaxed mb-8">
                Export your logs into beautifully minimal PDF summaries. Designed to be read at a glance, respecting your doctor's time and your eyes.
              </p>
              <button className="text-rose-400 font-black text-sm uppercase tracking-widest hover:tracking-[0.3em] transition-all">
                Download Preview
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;