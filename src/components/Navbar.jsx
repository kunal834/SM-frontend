import React, { useState, useContext } from 'react'; // Added useContext here
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Pull Authuser and your logout function from Context
  // Assuming your context provides { Authuser, logout }
  const { Authuser, logout } = useContext(Authcontext);
  console.log("Navbar Auth user" , Authuser)

  // 2. Determine logged-in status based on Authuser existence
  const isLoggedIn = !!Authuser; 

  const handleLogout = async () => {
    try {
      // Call the real logout from context (which should handle the API call)
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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <Link to={isLoggedIn ? "/" : "/"} className="flex-shrink-0 flex items-center group">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-2 group-hover:bg-teal-700 transition-colors">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Sug<span className="text-teal-600">mon</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {isLoggedIn ? (
              <>
                {/* 3. Personalized Greeting (Optional but nice) */}
                <span className="text-xs text-slate-400 font-medium">
                  Hi, {Authuser.name || 'User'}
                </span>

                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-semibold transition-colors ${
                      isActive(link.path) ? 'text-teal-600' : 'text-slate-600 hover:text-teal-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link 
                  to="/Addlog" 
                  className="bg-slate-900 hover:bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95"
                >
                  + Add Log
                </Link>

                <button 
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button ... (Keep your existing SVG logic) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {isLoggedIn ? (
              <>
                <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Logged in as {Authuser.name}
                </div>
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-4 text-base font-medium border-b border-slate-50 ${
                      isActive(link.path) ? 'text-teal-600' : 'text-slate-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Link 
                    to="/AddLog"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-teal-600 text-white text-center py-3 rounded-xl font-bold"
                  >
                    + New Reading
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-center py-3 text-red-500 font-bold border border-red-100 rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-teal-600 text-white text-center py-3 rounded-xl font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;