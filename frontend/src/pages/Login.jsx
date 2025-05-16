import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useAuth } from "../context/AuthProvider"
import { Eye, EyeOff } from "lucide-react"



const Login = () => {
  const {isAuthenticated ,setIsAuthenticated,setProfile} = useAuth();
  const navigateTo = useNavigate();
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async(e) =>{
    e.preventDefault()
    try{
      const {data} = await axios.post("http://localhost:4001/api/users/login", {email, password, role},{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      console.log(data)
      toast.success(data.message || "User Logined successfully",{duration:3000,});
      // setProfile(data);
      setIsAuthenticated(true);
      setEmail("")
      setPassword("")
      setRole("")
      navigateTo("/");
    } catch(error){
      console.log(error)
      toast.error(error.response.data.message || "Please fill required fields", {duration:3000,})
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
            <option value="user">Reader</option>
            <option value="admin">Author</option>
          </select>
          
          <div className="mb-4">
            <input type="email" placeholder="Your Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none pr-10"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          
          <p className="text-center mb-4">New User?{" "}<Link to={"/register"} className="text-blue-600">Register Now</Link></p>
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Login</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Login