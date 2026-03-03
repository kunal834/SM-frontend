import React, { useState, useContext } from 'react';
import { Authcontext } from '../../context/authcontext';
import { Mail, ArrowRight, ShieldCheck, Activity, ChevronLeft } from 'lucide-react'; // Using Lucide for pro icons

const Login = () => {
  const { login, Authuser } = useContext(Authcontext);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    age: ''
  });
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
    if (result?.success) { // Use ?. to safely check properties
      setIsSent(true);
    }
  } catch (err) {
    alert(err.message || "Something went wrong.");
  } finally {
    // THIS IS THE FIX: This runs no matter what (success OR failure)
    setIsLoading(false); 
  }
};

  return (
    <div className="min-h-screen bg-white flex">
      {/* LEFT SIDE: AUTH FORM */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SugarTrack</span>
            </div>
            
            {!isSent ? (
              <>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h1>
                <p className="text-slate-500">Enter your details to receive a secure magic link.</p>
              </>
            ) : (
              <button 
                onClick={() => setIsSent(false)}
                className="group flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to edit details
              </button>
            )}
          </div>

          {!isSent ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age</label>
                  <input 
                    type="number" 
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                    placeholder="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                  placeholder="Enter your Gmail"
                />
              </div>

              <button 
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isLoading ? "Generating link..." : "Send Magic Link"}
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>

              <div className="flex items-center gap-2 justify-center text-xs text-slate-400 mt-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise-grade encryption enabled</span>
              </div>
            </form>
          ) : (
            <div className="bg-teal-50 border border-teal-100 p-8 rounded-3xl text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Check your inbox</h3>
              <p className="text-slate-600 mt-3 leading-relaxed">
                We've sent a secure login link to <br/>
                <span className="font-semibold text-teal-700">{formData.email}</span>
              </p>
              <div className="mt-8 pt-6 border-t border-teal-200/50">
                <p className="text-xs text-teal-600/70">Link expires in 15 minutes</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: BRANDING/SOCIAL PROOF */}
      <div className="hidden lg:flex flex-1 bg-slate-50 p-12 items-center justify-center">
        <div className="max-w-lg w-full">
            <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                
                <div className="relative bg-white/60 backdrop-blur-xl border border-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200">
                    <blockquote className="text-2xl font-medium text-slate-800 leading-relaxed">
                        "SugarTrack has completely transformed how I monitor my glucose levels. The passwordless login is a game changer for quick entries."
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=sarah" alt="User" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Sarah Jenkins</p>
                            <p className="text-sm text-slate-500">Diabetes Care Specialist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;