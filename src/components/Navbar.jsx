import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/authcontext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { Authuser, logout } = useContext(Authcontext);
  
  const isLoggedIn = !!Authuser;

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const authLinks = [
    { name: 'Dashboard', path: '/Dashboard' },
    { name: 'History', path: '/history' },
    { name: 'Analytics', path: '/Analytic' },
  ];

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2.5rem] px-6 py-2 pointer-events-auto transition-all duration-500">
          <div className="flex justify-between items-center h-14">
            
            {/* --- BRAND LOGO --- */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-200 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                <img src="/log.png" className="w-10 h-10 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Logo" />
              </div>
              <span className="text-xl font-serif italic tracking-tight text-slate-800">
                flytics
              </span>
            </Link>

            {/* --- DESKTOP MENU --- */}
            <div className="hidden md:flex space-x-1 items-center">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-1 mr-4 border-r border-slate-200 pr-4">
                    {authLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${
                          isActive(link.path) 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* --- SUPPORT BUTTON (DESKTOP) --- */}
                    <Link 
                      to="/pay" 
                      className="p-2 text-slate-400 hover:text-slate-600 transition-colors group relative"
                      title="Support"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform">
                        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </Link>

                    <Link 
                      to="/Addlog" 
                      className="group relative px-5 py-2.5 bg-rose-50 text-rose-600 rounded-full text-[13px] font-bold transition-all hover:bg-rose-100 active:scale-95"
                    >
                      <span className="relative z-10">+ New Log</span>
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="text-[13px] font-bold text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Logout
                    </button>
                    
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-white flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-inner">
                      {Authuser.name?.[0] || 'U'}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/pay" className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">Support</Link>
                  <Link 
                    to="/login" 
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[13px] font-bold hover:shadow-xl transition-all active:scale-95"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* --- MOBILE BUTTON --- */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <div className="w-5 flex flex-col items-end gap-1">
                  <span className={`h-0.5 bg-current transition-all ${isOpen ? 'w-5 rotate-45 translate-y-1.5' : 'w-5'}`} />
                  <span className={`h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : 'w-3'}`} />
                  <span className={`h-0.5 bg-current transition-all ${isOpen ? 'w-5 -rotate-45 -translate-y-1.5' : 'w-4'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 inset-x-6 md:hidden pointer-events-auto"
          >
            <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-6 border border-white shadow-2xl">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    Welcome, {Authuser.name}
                  </p>
                  {authLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-4 rounded-2xl text-lg font-serif italic ${
                        isActive(link.path) ? 'bg-slate-900 text-white' : 'text-slate-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* --- MOBILE SUPPORT LINK --- */}
                  <Link 
                    to="/pay"
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-4 text-slate-500 text-lg font-serif italic"
                  >
                    Help & Support
                  </Link>

                  <div className="pt-6 grid grid-cols-2 gap-3">
                    <Link 
                      to="/AddLog"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-4 bg-rose-400 text-white rounded-2xl font-bold"
                    >
                      + Log
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="py-4 border border-slate-200 text-slate-500 rounded-2xl font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                   <Link 
                    to="/pay"
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-slate-500 font-medium"
                  >
                    Need Help?
                  </Link>
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-slate-900 text-white text-center py-4 rounded-2xl font-bold"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;