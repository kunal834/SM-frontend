import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Highly recommended for "Smooth" feel
import Footer from '../components/Footer';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration:  0.6, ease: "easeOut" }
};

const MetricCard = ({ label, val, unit, desc, colorClass }) => (
  <motion.div 
    {...fadeInUp}
    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
  >
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`text-5xl font-light tracking-tighter ${colorClass}`}>{val}</span>
      <span className="text-slate-400 font-medium text-sm">{unit}</span>
    </div>
    <p className="mt-4 text-xs text-slate-500 leading-relaxed">{desc}</p>
  </motion.div>
);

const BentoCard = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`rounded-[2.5rem] p-10 transition-all duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

const Homepage = () => {
  const metrics = [
    { label: 'Current Glucose', val: '108', unit: 'mg/dL', desc: 'Real-time blood sugar level.', colorClass: 'text-teal-600' },
    { label: 'Estimated HbA1c', val: '5.4', unit: '%', desc: '3-month metabolic health projection.', colorClass: 'text-blue-600' },
    { label: 'Time in Range', val: '94', unit: '%', desc: 'Percentage spent in target zone.', colorClass: 'text-emerald-600' }
  ];

  return (
    // 'selection:bg-teal-50' handles the text highlight color
    <div className="bg-[#FBFDFE] text-slate-600 font-sans selection:bg-teal-50">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-40 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-8">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Specialized Diabetes Management</span>
          </div>

          <h1 className="text-6xl lg:text-[90px] font-semibold text-slate-900 tracking-tight leading-[1] mb-8">
            Your Glucose. <br />
            <span className="italic font-light text-teal-600">Perfectly Trended.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-normal leading-relaxed mb-12">
            The simplest way to monitor daily Sugar levels and HbA1c trends. 
            No bloat—just the data you and your doctor actually need.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="px-10 py-4 bg-teal-600 text-white font-bold rounded-2xl transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95">
              Start Logging Today
            </Link>
            <Link to="/demo" className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
              See Live Demo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* --- 2. THE SPECIFIC DATA VIEW --- */}
      <section className="relative -mt-16 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white p-3 shadow-2xl shadow-slate-200/50">
            <div className="bg-slate-50/50 rounded-[2.5rem] border border-slate-100 overflow-hidden">
              <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CORE VALUE PROPS --- */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BentoCard className="bg-white border border-slate-200 shadow-sm hover:border-teal-200">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">HbA1c Forecasting</h3>
              <p className="text-slate-500 leading-relaxed">
                We calculate your estimated HbA1c in real-time based on your daily sugar logs.
              </p>
            </BentoCard>

            <BentoCard className="bg-slate-900 text-white shadow-2xl" delay={0.2}>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-teal-400 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Doctor-Ready Reports</h3>
              <p className="text-slate-400 leading-relaxed">
                One-tap PDF exports of your sugar history, formatted perfectly for clinical review.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;