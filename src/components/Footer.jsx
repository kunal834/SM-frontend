import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", path: "/#features" },
        { name: "Security", path: "/security" },
        { name: "API", path: "/docs" },
        { name: "Pricing", path: "/pricing" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "HIPAA", path: "/compliance" },
        { name: "Cookie Policy", path: "/cookies" }
      ]
    }
  ];

  return (
    <footer className="pt-24 pb-12 px-6 bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-black text-white italic tracking-tighter">
            SUG<span className="text-teal-500">MON</span>
          </Link>
          <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
            The gold standard in metabolic health tracking for the modern patient. 
            Precision data meets intuitive design.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Social Placeholders */}
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-teal-500/20 transition-colors cursor-pointer" />
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-teal-500/20 transition-colors cursor-pointer" />
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-teal-500/20 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Link Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">
                {section.title}
              </h4>
              <nav className="flex flex-col gap-2 text-sm text-slate-500">
                {section.links.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className="hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 text-center">
        <div className="text-[10px] text-slate-700 font-mono uppercase tracking-[0.5em] mb-4">
          &copy; {currentYear} SUGMON. Built for longevity.
        </div>
        <p className="text-[9px] text-slate-800 max-w-md mx-auto leading-relaxed">
          DISCLAIMER: Sugmon is a data tracking tool and not a medical device. 
          Always consult with a healthcare professional before making clinical decisions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;