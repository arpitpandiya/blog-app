import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthProvider"


const Login = () => {
  const {isAuthenticated ,setIsAuthenticated} = useAuth();
  const navigateTo = useNavigate();
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[role, setRole] = useState("")

  const handleLogin = async(e) =>{
    e.preventDefault()
    if(!email || !password || !role){
      toast.error("Please fill all the fields");
    }
    try{
      const {data} = await axios.post("http://localhost:4001/api/users/login", {email, password, role},{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      console.log(data)
      toast.success(data.message || "User Logined successfully")
      setIsAuthenticated(true);
      setEmail("")
      setPassword("")
      setRole("")
      navigateTo("/");
    } catch(error){
      console.log(error)
      toast.error(error.message || "Please fill required fields")
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">        
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          <h1 className="text-xl font-semibold mb-6">Register</h1>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-md focus:border-2 focus:border-blue-600 outline-none">
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          
          <div className="mb-4">
            <input type="email" placeholder="Your Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          
          <div className="mb-4">
            <input type="password" placeholder="Your Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          
          <p className="text-center mb-4">New User?{" "}<Link className="text-blue-600">Register Now</Link></p>
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Login</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Login