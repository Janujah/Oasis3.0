"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import logo from '@/signup/logo.png'; // Adjust the path as needed
import '../css/oasis.css'
import Image from 'next/image';
import logo from '../Components/logo.png';
import Navbar from '../Components/navbar'


export default function Example() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Role, setUserRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Role validation
    if (!Role.trim()) {
      newErrors.Role = 'Role is required';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit form if there are no errors
      console.log({ fullName, email, Role, password, confirmPassword });
    }
  };

  return (
    <div id="container11">
        <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100" id="container1">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit} id="form">
        <div className="flex justify-center mb-6">
          <Image 
          src={logo} 
          alt="Company Logo" 
          className="h-12 w-12" 
          id="logo"
          />
        </div>
        <h3 className="text-2xl font-semibold text-center mb-4" style={{color:'black', fontSize:'50px'}}><b>Sign Up</b></h3>
        <p className="text-center text-sl mb-1" style={{color:'black'}}>Create your account, it's free and only takes a minute.</p>
        
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{color:'black'}}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.fullName && <div className="text-red-500 text-sm">{errors.fullName}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{color:'black'}}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">You're here as a</label>
          <select
            id="userRole"
            value={Role}
            onChange={(e) => setUserRole(e.target.value)}
            required
            style={{color:'black'}}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" >--Please choose an option--</option>
            <option value="consumers">Consumers</option>
            <option value="Doctor">Doctor</option>
            <option value="Ortho_technician">Ortho Technician</option>
          </select>
          {errors.Role && <div className="text-red-500 text-sm">{errors.Role}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{color:'black'}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2"
              style={{color:'black'}}
            >
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{color:'black'}}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </button>
          </div>
          {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
        </div>

      <a href="/login">  <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit" id="button">
          Sign Up
        </button></a>
      </form>
    </div></div>
  );
}
