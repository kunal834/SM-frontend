import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../context/authcontext'; // Ensure path is correct

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 1. Destructure Authuser and logout from your context
  const { Authuser, logout, isLoading } = useContext(Authcontext);

  // 2. Protect the route: if loading is finished and no user exists, redirect
  useEffect(() => {
    if (!isLoading && !Authuser) {
      navigate('/login');
    }
  }, [Authuser, isLoading, navigate]);

  // 3. Show loading state while AuthProvider checks the session
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-gray-600">Loading your health data...</span>
      </div>
    );
  }

  // 4. Final safety check before rendering
  if (!Authuser) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">SugarTrack Dashboard</h1>
          <button 
            onClick={logout} // 5. Use the logout function from context
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-blue-600 uppercase">User Profile</h2>
            {/* 6. Access user data directly from context */}
            <p className="text-xl font-medium mt-1">{Authuser.name}</p>
            <p className="text-gray-500">{Authuser.email}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-green-600 uppercase">Age Group</h2>
            <p className="text-xl font-medium mt-1">{Authuser.age} years old</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 italic">Welcome back, {Authuser.name.split(' ')[0]}!</p>
            <p className="text-gray-400 text-sm mt-2">Your Sugar Tracking Charts will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;