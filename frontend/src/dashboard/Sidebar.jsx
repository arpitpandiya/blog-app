import React, {useState} from "react";
import { useAuth } from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";


const Sidebar = ({ setComponent }) => {
  const { profile, isAuthenticated, setIsAuthenticated} = useAuth();
  console.log(profile?.user);

  const navigateTO = useNavigate();

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTO("/");
  };

  const handleLogout = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.get("http://localhost:4001/api/users/logout",{ withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      alert("failed to Logout");
    }
  }
  return (
    <div>
      <div>
        <img src={profile?.user?.photo?.url} alt="" />
        <p>{profile?.user?.name}</p>
      </div>
      <ul>
        <button
          onClick={() => handleComponents("My Blogs")}
          className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transiton duration-300"
        >
          MY BLOGS
        </button>

        <button
          onClick={() => handleComponents("Create Blog")}
          className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transiton duration-300"
        >
          CREATE BLOG
        </button>

        <button
          onClick={() => handleComponents("My Profile")}
          className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transiton duration-300"
        >
          MY PROFILE
        </button>

        <button
          onClick={gotoHome}
          className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transiton duration-300"
        >
          HOME
        </button>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transiton duration-300"
        >
          LOGOUT
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
