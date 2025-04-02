import React from 'react'
import Navbar from '../src/components/Navbar'
import Home from '../src/components/Home'
import Footer from '../src/components/Footer'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Blogs from '../src/pages/Blogs'
import About from '../src/pages/About'
import Contact from '../src/pages/Contact'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Dashboard from '../src/pages/Dashboard'
import Creators from './pages/Creators'
import { useAuth } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import UpdateBlog from './dashboard/UpdateBlog'
import Detail from './pages/Detail'
import Notfound from './pages/Notfound'


const App = () => {
  const location = useLocation()
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);

  const{blogs,isAuthenticated} = useAuth()
  console.log(blogs)
  console.log(isAuthenticated);
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={isAuthenticated===true?<Home />:<Navigate to={"/login"}/>}/>
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />

        {/* Single page route */}
        <Route exact path="/blog/:id" element={<Detail />} />

        {/* Update page route */}
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        {/* Universal route */}
        <Route exact path="*" element={<Notfound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App