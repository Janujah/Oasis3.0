"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Image from 'next/image';
import logo from '../Components/logo.png';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  return (
    <div className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <Image src={logo} alt="Logo" className="h-12 w-12" />
        <nav className="flex items-center space-x-4 md:space-x-8">
          <a className="text-black" href="/Doctors/home">Home</a>
          <a className="text-black" href="/Doctors/Appointment">Appointments</a>
          <a className="text-black" href="/Doctors/Contact-Us">Contact Us</a>
          <a className="text-white bg-[#0e0737] rounded px-4 py-2" href="/Doctors/Create-Profile">Add Profile</a>
          {isAuthenticated ? (
            <div className="relative">
              <button ref={usernameRef} className="flex items-center space-x-2" onClick={toggleDropdown}>
                <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="User Profile" className="h-10 w-10 rounded-full" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={handleProfileClick}>{username}</button>
                  <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="text-white bg-[#0e0737] hover:bg-indigo-500 rounded px-4 py-2" href="/login">Login</a>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
