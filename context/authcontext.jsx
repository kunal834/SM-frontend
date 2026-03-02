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
      console.log("me data" , data)
      if (data.success) {
        setAuthuser(data.user);
      }
    } catch (error) {
      setAuthuser(null);
    } finally {
      setIsLoading(false);
    }
  };

const login = async(credentials) => {
     try {
      const { data } = await axios.post("/api/users/login" , credentials);
      console.log("daata login" , data)
      if(data.success) {
        // We DON'T set the user here. 
        // We wait for them to click the email link.
        console.log("Magic link sent successfully");
        return data; // Return to the component to show the "Check Inbox" UI
      }
     } catch(error) {
       console.log(error.message);
       throw error; // Throw so the UI can show an error message
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

