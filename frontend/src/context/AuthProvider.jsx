import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const { data } = await axios.get(
            "https://blog-app-ke5j.onrender.com/api/users/my-profile"
          );
          setProfile(data);
          console.log("API Response:", data);
          setIsAuthenticated(true);
        
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "https://blog-app-ke5j.onrender.com/api/blogs/all-blogs" );
        console.log("API Response:", data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, profile, setProfile,isAuthenticated ,setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
