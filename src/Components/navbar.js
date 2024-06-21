"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import logo from './logo.png';
import '../css/oasis.css';
import user from '../image/depositphotos_137014128-stock-illustration-user-profile-icon.webp';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const usernameRef = useRef(null);
  const router = useRouter();

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
        <div className="flex items-center">
          <Image src={logo} alt="Logo" width={150} height={50} />
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a className="text-black" href="/">Home</a>
          <a className="text-black" href="/Our-Services">Our Services</a>
          <a className="text-black" href="/doctor">Doctors</a>
          <a className="text-black" href="/Ortho-Resources">Ortho Resources</a>
          <a className="text-black" href="/Contact-Us">Contact Us</a>
          {isAuthenticated ? (
            <div className="relative flex items-center space-x-2">
              <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                <Image src={user} alt="User Profile" className="h-10 w-10 rounded-full" />
                <span className="text-gray-700">{username}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20" style={{marginTop:'100px'}}>
                  <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Details</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" >Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="text-gray-700" href="/login">
              <button className="bg-[#0e0737] text-white px-4 py-2 rounded-md" id='button'>Login</button>
            </a>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a className="block text-gray-700 px-4 py-2" href="/">Home</a>
          <a className="block text-gray-700 px-4 py-2" href="/Our-Services">Our Services</a>
          <a className="block text-gray-700 px-4 py-2" href="/doctor">Doctors</a>
          <a className="block text-gray-700 px-4 py-2" href="/Ortho-Resources">Ortho Resources</a>
          <a className="block text-gray-700 px-4 py-2" href="/Contact-Us">Contact Us</a>
          {isAuthenticated ? (
            <div className="relative">
              <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none w-full px-4 py-2">
                <Image src={user} alt="User Profile" className="h-10 w-10 rounded-full" />
                <span className="text-gray-700">{username}</span>
              </button>
              {dropdownOpen && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-20">
                  <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Details</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="block text-gray-700 hover:text-[#0e0737] px-4 py-2" href="/login">
              <button className="bg-[#0e0737] text-white px-4 py-2 rounded-md w-full" id='button'>Login</button>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
