import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Layers,
  FileText,
  Binary,
  Microscope,
  CheckCircle2
} from 'lucide-react';
import Footer from '../components/Footer';

const About = () => {
  // Updated to reflect core disease analytics capabilities
  const analyticsModules = [
    {
      title: "Metabolic Intelligence",
      desc: "Deep-tier analytics for Diabetes management, correlating glucose spikes with medication and insulin sensitivity.",
      icon: <Binary className="text-rose-400" />,
      color: "bg-rose-50"
    },
    {
      title: "Vascular Analytics",
      desc: "Clinical-grade BP monitoring and heart rate variability (HRV) analysis to detect early cardiovascular markers.",
      icon: <Activity className="text-blue-400" />,
      color: "bg-blue-50"
    },
    {
      title: "Pulmonary Integration",
      desc: "Analyzing SpO2 and sleep respiratory patterns to identify comorbidities in chronic disease patients.",
      icon: <Wind className="text-emerald-400" />,
      color: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F7] text-slate-800 font-sans selection:bg-rose-100 overflow-x-hidden pt-32">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[-5%] w-[40%] h-[50%] rounded-full bg-rose-50/40 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        
        {/* --- HERO MANIFESTO --- */}
        <section className="text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 border border-white text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12 shadow-sm"
          >
            <Microscope size={12} className="text-rose-300" /> Clinical Grade Data Engine
          </motion.div>
          
          <h1 className="text-6xl md:text-[100px] font-serif italic text-slate-900 leading-[0.85] tracking-tight mb-12">
            Analytics, <br />
            <span className="text-slate-400">redefining care.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-light leading-relaxed">
            Flytics is a specialized data engine designed to bridge the gap between daily monitoring and clinical intervention. We transform complex patient data into structured, actionable disease analytics.
          </p>
        </section>

        {/* --- THE SHIFT: REPLACING FILESYSTEMS --- */}
        <section className="mb-40">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                 <div className="inline-block p-4 bg-white rounded-3xl shadow-soft border border-white/50">
                    <FileText className="text-slate-400" size={32} />
                 </div>
                 <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900">
                    Digitizing the <br/>
                    <span className="text-rose-300">Clinical Narrative.</span>
                 </h2>
                 <p className="text-slate-500 leading-relaxed max-w-md">
                    Manual file systems lose the context of chronic disease. Flytics replaces physical folders with a digital data engine that processes metabolic metrics into "Doctor-Ready" reports.
                 </p>
                 <ul className="space-y-4">
                    {[
                      "Replacing manual file systems with a digital health engine",
                      "Automated monitoring for Diabetes, Heart, and BP analytics",
                      "Structured clinical-grade reports for physician review"
                    ].map((text, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <CheckCircle2 size={18} className="text-emerald-400" /> {text}
                      </li>
                    ))}
                 </ul>
              </div>
              
              <div className="relative">
                 <div className="bg-white/40 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/60 shadow-2xl relative z-10">
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <div className="h-4 w-1/3 bg-slate-200 rounded-full animate-pulse" />
                          <div className="h-4 w-1/4 bg-rose-200 rounded-full opacity-50" />
                       </div>
                       <div className="h-24 w-full bg-rose-50/50 rounded-2xl border border-rose-100 flex flex-col items-center justify-center p-4">
                          <span className="italic text-rose-400 text-xs mb-2">Analyzing Metabolic Patterns...</span>
                          <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
                             <div className="bg-rose-300 h-full w-[65%] animate-shimmer" />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="h-16 bg-blue-50/50 rounded-xl border border-blue-100 p-3">
                             <div className="h-2 w-1/2 bg-blue-200 rounded mb-2" />
                             <div className="h-4 w-3/4 bg-blue-300/40 rounded" />
                          </div>
                          <div className="h-16 bg-emerald-50/50 rounded-xl border border-emerald-100 p-3">
                             <div className="h-2 w-1/2 bg-emerald-200 rounded mb-2" />
                             <div className="h-4 w-3/4 bg-emerald-300/40 rounded" />
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl" />
              </div>
           </div>
        </section>

        {/* --- DISEASE MODULES (Glass Pods) --- */}
        <section className="space-y-16 mb-40">
          <div className="text-center md:text-left border-l-2 border-rose-200 pl-8 ml-4">
            <h2 className="text-3xl font-serif italic text-slate-800 mb-2">Diagnostic Analytics</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Disease-Specific Systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {analyticsModules.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[3.5rem] shadow-xl group hover:bg-white/60 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif italic text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed italic">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- BIG VISION SECTION --- */}
        <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-rose-500/10 rounded-full blur-[120px]" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                    <Layers size={24} className="text-rose-200" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Data Engine Vision</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif italic mb-10 leading-tight">
                From raw metrics to <br/> Clinical-grade Reports.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                    <TrendingUp size={14} className="text-rose-300" /> Pattern Recognition
                </div>
                <p className="text-sm leading-relaxed">
                  Our system identifies cross-disease correlations, such as how glucose variability affects blood pressure trends, providing a 360° view of patient health.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-300" /> Clinical Fidelity
                </div>
                <p className="text-sm leading-relaxed">
                  We are replacing high-risk manual medical files with digital reports designed for professional review, ensuring no critical metric is lost in a physical folder.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;