import { createContext } from "react";
import axios from  "axios";
import { useEffect } from "react";
import { useState } from "react";

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; 
export const Authcontext = createContext();

export const  AuthProvider = ({children}) =>{
const [Authuser, setAuthuser] = useState();
const [IsLoading, setIsLoading] = useState(true)


useEffect(() => {
  checkauth();
  console.log("Authuser" , Authuser);
},[])

const checkauth = async () => {
  setIsLoading(true);
  try {
    const { data } = await axios.get("/api/users/me");
    // Using ?. prevents the "reading payload of undefined" crash
    if (data?.success) { 
      setAuthuser(data.user);
    }
  } catch (error) {
    setAuthuser(null);
    console.error("Auth check failed:", error.response?.status);
  } finally {
    setIsLoading(false);
  }
};

const login = async(credentials) => {
  try {
   const { data } = await axios.post("/api/users/login", credentials, {
  timeout: 40000 
});
   console.log("token value" , data.MagicToken)
    if(data.success) {
      console.log("login data" , data)
      return data; 
    } else {
      // If the backend returns success: false, throw to trigger the catch block
      throw new Error(data.message || "Failed to send link");
    }
  } catch(error) {
    // Log the actual response error if available, otherwise the generic message
    const errorMsg = error.response?.data?.message || error.message;
    console.error("Context Login Error:", errorMsg);
    throw new Error(errorMsg); 
  }
}
const logout = async() =>{
  try{
   const {data} = await axios.get("/api/users/logout");
   if(data.success){
    setAuthuser(null);

    alert("logout successfully");

   }
  }catch(error){
      console.log(error.message);

  }
 



}

const value ={
    login,
    checkauth,
    logout,
    Authuser

}


return (
  <Authcontext.Provider value={value}>
  {!IsLoading ? (
    children
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] font-sans">
      {/* Injecting smooth animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Advanced "Soft Focus" Pulse Loader */}
        <div className="relative flex h-24 w-24 mb-10 items-center justify-center">
          {/* Outer Halo */}
          <div className="absolute inset-0 rounded-full bg-white shadow-inner opacity-60"></div>

          {/* Inner Themed Spinner */}
          <div className="relative h-20 w-20 rounded-full animate-spin">
            {/* Gradient Layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#DB99A9] via-[#0D1117] to-[#DB99A9]"></div>
            {/* Mask to create the ring */}
            <div className="absolute inset-1 rounded-full bg-[#F9FAFB]"></div>
            {/* Pulsing Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-[#DB99A9] opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tighter italic leading-tight animate-fade-in" style={{ fontFamily: 'serif' }}>
          Health in Soft Focus
        </h2>
        <span className="text-3xl text-gray-400 italic leading-none animate-fade-in delay-200" style={{ fontFamily: 'serif' }}>
          ...Waking
        </span>

        <p className="mt-5 text-base text-gray-600 leading-relaxed max-w-xs animate-fade-in delay-500">
          Escape the wait. Our backend is just waking up, a gentle morning breeze rather than a rush.{" "}
          <span className="font-semibold text-[#DB99A9]">About 30 seconds</span> until we are ready for your journey.
        </p>

        {/* Footer Accent */}
        <div className="mt-12 flex items-center space-x-2 text-sm text-gray-400 animate-fade-in delay-700">
          <span className="uppercase tracking-widest text-[10px] font-medium">Patient Journey</span>
          <span className="w-10 h-px bg-gray-300"></span>
        </div>
      </div>
    </div>
  )}
</Authcontext.Provider>
)

}

