import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const {data} = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs", 
          {withCredentials: true}
        );
        console.log("API Response:",data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
