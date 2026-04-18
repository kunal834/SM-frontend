import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Wind, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Layers
} from 'lucide-react';
import Footer from '../components/Footer';

const About = () => {
  const futureIntegrations = [
    {
      title: "Cardiac Rhythm",
      desc: "Integrating resting heart rate and HRV to understand how your stress impacts glucose.",
      icon: <Heart className="text-rose-400" />,
      color: "bg-rose-50"
    },
    {
      title: "Pressure Balance",
      desc: "Blood pressure logging to provide a 360° view of your vascular health.",
      icon: <Activity className="text-blue-400" />,
      color: "bg-blue-50"
    },
    {
      title: "Oxygen Flow",
      desc: "Sleep and SpO2 tracking to correlate metabolic recovery with rest quality.",
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
            <Sparkles size={12} className="text-rose-300" /> The Flytics Philosophy
          </motion.div>
          
          <h1 className="text-6xl md:text-[100px] font-serif italic text-slate-900 leading-[0.85] tracking-tight mb-12">
            Health, <br />
            <span className="text-slate-400">in perspective.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-light leading-relaxed">
            We believe that data shouldn't be daunting. Flytics was born to transform 
            clinical tracking into a mindful practice—where your metrics become 
            a story of balance rather than a list of burdens.
          </p>
        </section>

        {/* --- THE FUTURE ROADMAP (Glass Pods) --- */}
        <section className="space-y-16 mb-40">
          <div className="text-center md:text-left border-l-2 border-rose-200 pl-8 ml-4">
            <h2 className="text-3xl font-serif italic text-slate-800 mb-2">The Horizon</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Future Aspects & Integrations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {futureIntegrations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
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
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Holistic Analytics</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif italic mb-10 leading-tight">
                One dashboard for your <br/> entire vitality.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                    <TrendingUp size={14} className="text-rose-300" /> Advanced Correlation
                </div>
                <p className="text-sm leading-relaxed">
                  Soon, our AI will correlate your sleep patterns, caffeine intake, and blood pressure with your glucose spikes to find your "Personal Harmony Factor."
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-300" /> Clinical Privacy
                </div>
                <p className="text-sm leading-relaxed">
                  Future-proofing your data with biometric encryption. Your health story remains yours, encrypted and secure for clinical review only when you decide.
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