import { createContext } from "react";
import axios from  "axios";
import { useEffect } from "react";
import { useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
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
    const { data } = await axios.post("/api/users/login", credentials);
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
    {/* Do not render anything until the auth check is finished */}
      {!IsLoading ? children : <div className="spinner">Loading...</div>}
   </Authcontext.Provider>
)

}

