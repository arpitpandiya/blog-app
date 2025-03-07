import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const Register = () => {
  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[phone, setPhone] = useState("")
  const[password, setPassword] = useState("")
  const[role, setRole] = useState("")
  const[education, setEducation] = useState("")
  const[photo, setPhoto] = useState("")
  const[photoPreview, setPhotoPreview] = useState("")
  
  const changePhotoHandler = (e) =>{
    console.log(e);
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
      setPhotoPreview(reader.result)
      setPhoto(file)
    }
  };

  const handleRegister = async(e) =>{
    e.preventDefault();
    // Phone number validation
    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Password validation for special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must contain at least one alphabet and one special character.");
      return;
    }

    const formData = new FormData()
    formData.append("name",name)
    formData.append("email",email)
    formData.append("phone",phone)
    formData.append("password",password)
    formData.append("role",role)
    formData.append("education",education)
    formData.append("photo",photo)
    try{
      const {data} = await axios.post("http://localhost:4001/api/users/register", formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data",
        }
      });
      console.log(data)
      toast.success(data.message || "User registered successfully")
      setName("")
      setEmail("")
      setPhone("")  
      setPassword("")
      setRole("")
      setEducation("")
      setPhoto("")
      setPhotoPreview("")
    } catch(error){
      console.log(error)
      toast.error(error.message || "Please fill required fields")
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">        
          <form onSubmit={handleRegister}>
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
            <input type="text" placeholder="Your Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          <div className="mb-4">
            <input type="email" placeholder="Your Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          <div className="mb-4">
            <input type="text"
            inputMode="numeric"
            pattern="[0-9]*" placeholder="Your Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Your Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2 border rounded-md focus:border-2 focus:border-blue-600 outline-none" />
          </div>
          <select value={education} onChange={(e)=>setEducation(e.target.value)} className="w-full p-2 mb-4 border rounded-md focus:border-2 focus:border-blue-600 outline-none">
            <option value="">Select Your Education</option>
            <option value="B.Tech">B.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
          </select>
          
          <div className="flex items-center mb-4">
            <div className="photo w-20 h-20 mr-4">
              <img src={photoPreview?`${photoPreview}`:"photo"} alt="photo"/>
            </div>
            <input type="file" onChange={changePhotoHandler} className="w-full p-2 border border-black rounded-md file:bg-gray-200 file:border  file:rounded-md file:px-3 file:py-1.5 file:cursor-pointer "/>
          </div>

          <p className="text-center mb-4">Already registered?{" "}<Link className="text-blue-600">Login Now</Link></p>
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white">Register</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register