"use client"
// Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Image from 'next/image';
import logo from '../Components/logo.png'; // Update the path as needed

function OrthoResourcesNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const usernameRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.userName); // Adjust this based on your token's structure
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    setUsername('');
    setDropdownOpen(false);
    router.push('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    router.push('/profile');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" width={150} height={50} />
          <button
            className="lg:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <nav className={`lg:flex lg:items-center ${menuOpen ? 'block' : 'hidden'}`}>
          <a className="block text-gray-700 hover:text-indigo-600 py-2 lg:py-0 lg:px-4" href="/Ortho-Technicians/home">Home</a>
          <a className="block text-gray-700 hover:text-indigo-600 py-2 lg:py-0 lg:px-4" href="/Ortho-Technicians/Our-Services">Our Services</a>
          <a className="block text-gray-700 hover:text-indigo-600 py-2 lg:py-0 lg:px-4" href="/Ortho-Technicians/Orders">Ortho Resources</a>
          <a className="block text-gray-700 hover:text-indigo-600 py-2 lg:py-0 lg:px-4" href="/Ortho-Technicians/Contact-Us">Contact Us</a>
          <a className="block text-gray-700 hover:text-indigo-600 py-2 lg:py-0 lg:px-4" href="/Ortho-Technicians/Add-Product">
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">Add Product</button>
          </a>
          {isAuthenticated ? (
            <div className="relative lg:ml-4">
              <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="User Profile" className="h-10 w-10 rounded-full" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-20">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleProfileClick}>{username}</button>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="text-gray-700 hover:text-indigo-600 py-2 lg:py-0 lg:px-4" href="/login">
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md">Login</button>
            </a>
          )}
        </nav>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <a className="block text-gray-700 px-4 py-2" href="/Ortho-Technicians/home">Home</a>
          <a className="block text-gray-700 px-4 py-2" href="/Ortho-Techinicians/Our-Services">Our Services</a>
          <a className="block text-gray-700 px-4 py-2" href="/Ortho-Techinicians/Orders">Ortho Resources</a>
          <a className="block text-gray-700 px-4 py-2" href="/Ortho-Techinicians/Contact-Us">Contact Us</a>
          <a className="block text-gray-700 px-4 py-2" href="/Ortho-Technicians/Add-Product">
            <button className="bg-indigo-600 text-white w-full py-2 rounded-md">Add Product</button>
          </a>
          {isAuthenticated ? (
            <div className="relative px-4 py-2">
              <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none w-full">
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="User Profile" className="h-10 w-10 rounded-full" />
                <span className="text-gray-700">{username}</span>
              </button>
              {dropdownOpen && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-20">
                  <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="block text-gray-700 hover:text-indigo-600 px-4 py-2" href="/login">
              <button className="bg-indigo-600 text-white w-full py-2 rounded-md">Login</button>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default OrthoResourcesNavbar;
