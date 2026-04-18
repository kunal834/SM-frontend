import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Experience",
      links: [
        
      ]
    },
    {
      title: "Integrity",
      links: [
        
      ]
    }
  ];

  return (
    <footer className="relative pt-32 pb-16 px-6 bg-[#F0F4F7] overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 lg:gap-12">
          
          {/* --- BRAND STORY --- */}
          <div className="space-y-8 max-w-sm">
            <Link to="/" className="flex items-center gap-2 group">
              <div className=" p-1.5 rounded-xl shadow-lg">
               <img src="/log.png" className="w-10 h-10 relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Logo" />
              </div>
              <span className="text-2xl font-serif italic tracking-tight text-slate-800">
                flytics
              </span>
            </Link>
            
            <p className="text-slate-500 font-medium text-sm leading-relaxed italic">
              "Redefining metabolic clarity through the lens of calm. 
              Tracking your rhythm should feel like a breath of fresh air."
            </p>

            <div className="flex gap-6 items-center">
              <Heart size={16} className="text-rose-300" />
              <Shield size={16} className="text-slate-300" />
              <div className="h-px w-12 bg-slate-200" />
            </div>
          </div>

          {/* --- NAVIGATION GRID --- */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-12 sm:gap-24">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {section.title}
                </h4>
                <nav className="flex flex-col gap-4">
                  {section.links.map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path} 
                      className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-all hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="mt-32 pt-12 border-t border-slate-200/60 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              &copy; {currentYear} flytics. built for longevity.
            </p>
          </div>

          <div className="max-w-lg">
            <p className="text-[10px] text-slate-400 leading-relaxed italic text-center lg:text-right">
              Disclaimer: flytics is a personal data tracking companion and does not constitute medical advice. 
              Always seek the guidance of your physician for clinical decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;