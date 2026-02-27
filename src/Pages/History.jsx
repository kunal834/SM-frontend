import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Authcontext } from '../../context/authcontext';
import { motion } from 'framer-motion';

const History = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Authuser } = useContext(Authcontext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetching logs specifically for the logged-in user
        const { data } = await axios.get(`/api/sugar/fetchdata`);
        if (data.success) {
          setLogs(data.logs);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (Authuser?._id) {
      fetchHistory();
    }
  }, [Authuser]);

  if (loading) return <div className="text-center py-20">Loading History...</div>;

  return (
    <div className="min-h-screen bg-[#FBFDFE] py-12 px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Reading History</h1>
            <p className="text-slate-500 mt-2">View and manage your past glucose logs</p>
          </div>
          <button 
            onClick={() => window.print()} 
            className="hidden md:block px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Export PDF
          </button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Context</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.length > 0 ? logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-sm font-semibold text-slate-700">
                        {new Date(log.entryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-teal-600">{log.value}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{log.unit}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        log.context === 'Fasting' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {log.context}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-slate-500 max-w-xs truncate italic">
                        {log.notes || "—"}
                      </p>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-slate-400 italic">
                      No readings found. Start by adding your first log!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default History;
