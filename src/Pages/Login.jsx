import React, { useState, useContext } from 'react';
import { Authcontext } from '../context/authcontext';
import { Mail, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(Authcontext);
  const [formData, setFormData] = useState({ email: '', name: '', age: '' });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await login(formData);
      if (result?.success) setIsSent(true);
    } catch (err) {
      alert(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F7] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-rose-100">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-rose-100/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-blue-100/30 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full grid lg:grid-cols-2 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden relative z-10"
      >
        {/* --- LEFT SIDE: FORM --- */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            
            <header className="mb-10 text-center lg:text-left">
              {/* --- BRAND LOGO --- */}
              <Link to="/" className="flex items-center justify-center lg:justify-start gap-3 mb-6 group inline-flex">
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-200 rounded-full blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                  <img 
                    src="/log.png" 
                    className="w-12 h-12 relative z-10 object-contain transition-transform duration-500 group-hover:scale-105" 
                    alt="Logo" 
                  />
                </div>
                <span className="text-2xl font-serif italic tracking-tight text-slate-800">
                  flytics
                </span>
              </Link>

              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <h1 className="text-4xl font-serif text-slate-900 italic mb-3">Welcome back</h1>
                    <p className="text-slate-500/80 font-medium">A magic link will bring you home.</p>
                  </motion.div>
                ) : (
                  <motion.button
                    key="back"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setIsSent(false)}
                    className="group flex items-center text-xs font-black uppercase tracking-widest text-rose-400 hover:text-rose-500 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Refine Details
                  </motion.button>
                )}
              </AnimatePresence>
            </header>

            {!isSent ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[2rem] bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Age</label>
                      <input 
                        type="number" 
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-[2rem] bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                        placeholder="25"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-[2rem] bg-white/50 border border-white focus:bg-white focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                      placeholder="nature@peace.com"
                    />
                  </div>
                </div>

                <button 
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden bg-slate-900 text-white font-bold py-5 rounded-[2rem] shadow-2xl hover:shadow-slate-300 transition-all active:scale-95 disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? "Preparing magic..." : "Send Magic Link"}
                    {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>

                <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Encrypted Space</span>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-rose-50/50 border border-rose-100 p-10 rounded-[3rem] text-center"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-rose-100 flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-10 h-10 text-rose-400" />
                </div>
                <h3 className="text-2xl font-serif italic text-slate-900 mb-4">Inbox is waiting</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We sent a quiet invitation to <br/>
                  <span className="font-bold text-slate-800">{formData.email}</span>
                </p>
                <div className="mt-10 pt-6 border-t border-rose-100/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-400/60">Expires in 15m</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* --- RIGHT SIDE: SOCIAL PROOF --- */}
        <div className="hidden lg:flex bg-slate-900 p-16 flex-col justify-center relative">
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-1/4 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[100px]" />
             <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300/60 mb-8 block">Member Note</span>
            <blockquote className="text-3xl font-serif italic text-white leading-relaxed mb-10">
              Finally a medical app that doesn't feel like a medical app. The calmest part of my morning routine
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Sarah Jenkins</p>
                <p className="text-sm text-slate-400 italic">Lifestyle Advocate</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;