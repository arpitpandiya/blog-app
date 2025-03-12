import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border py-10 bg-gray-900 text-white mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl">
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Flutter</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">React</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Android</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">iOS</a></li>
          </ul>
        </div>
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Design to code</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Figma plugin</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
          </ul>
        </div>

        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Comparison</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs Anima</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs Appsmith</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs FlutterFlow</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs Monday Hero</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs Retool</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs Bubble</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">DhiWise vs Figma Dev Mode</a></li>
          </ul>
        </div>
        <div className="text-center md:text-start">
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Career</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-700 pt-10">
        <div className="text-xl font-semibold hidden md:flex">
          Cilli<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm hidden md:flex">
          <p>&copy; 2024 DhiWise PVT. LTD. All rights reserved</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a a href="https://github.com/arpitpandiya" target="_blank" rel="noopener noreferrer"><FaGithub className="h-6 text-gray-400 hover:text-white" /></a>
          <a a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer"><BsYoutube className="h-6 text-gray-400 hover:text-white" /></a>
          <a a href="https://www.linkedin.com/in/arpitpandiya14/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="h-6 text-gray-400 hover:text-white" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
