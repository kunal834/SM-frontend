import {Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './Pages/Dashboard';
import Addlog from './Pages/AddLog';
import { Authcontext } from '../context/authcontext';
import { useContext } from 'react';
import Homepage from './Pages/Homepage';
import History from './Pages/History';

function App() {
  const { Authuser }  = useContext(Authcontext);
  console.log("Auth user" , Authuser)
  return (
    <>
      {/* Navbar stays outside Routes so it shows on every page */}
      <Navbar /> 
      
      {/* Main content area with background color for the whole app */}
      <main className="min-h-screen bg-slate-50 pt-4"> 
        <Routes>
          {/* Public Routes */}
          <Route   path="/" element={<Homepage />}            /> 
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/verify" element={<Verify />} /> */}

          {/* User Routes */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Addlog" element={<Addlog />} />
          <Route path="/History" element={<History />} />
          
          {/* 404 Page (Optional) */}
          <Route path="*" element={<div className="text-center mt-20">Page Not Found</div>} />
        </Routes>
      </main>
    
    </>
    
  );
}

export default App;