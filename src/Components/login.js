"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 13
import Image from 'next/image';
import logo from '../Components/logo.png';
import Navbar from '../Components/navbar';
import '../css/oasis.css';
import ECGGraph from './Ecg'; // Import the ECGGraph component

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://oasis-final-directory.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`${response.status}: ${errorMessage}`);
      }

      const data = await response.json();
      localStorage.setItem('auth-token', data.token);
      setLoading(false);
      navigateRoleBased(data.Role);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error('Login error:', err.message);
    }
  };

  const navigateRoleBased = (Role) => {
    switch (Role) {
      case 'Doctor':
        router.push('/Doctors/home');
        break;
      case 'Ortho_technician':
        router.push('/Ortho-Technicians/home');
        break;
      case 'consumers':
        router.push('/');
        break;
      case 'Admin':
        router.push('/Admin/User');
        break;
      default:
        setError('Unauthorized role or unknown role.');
        break;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100" id="container1">
        <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit} id="form">
          <div className="flex justify-center mb-6">
            <Image
              src={logo}
              alt="Company Logo"
              // id="logo"
              className="h-20 w-40"
              // style={{ width: '400px' }}
            />
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4" style={{ color: '#0e0737', fontSize: '50px' }}><b>Login</b></h3>
          <p className="text-center text-l mb-1" style={{ color: 'black' }}>Welcome back! Please login to your account.</p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-black"
            />
          </div>

          <button
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center items-center"
            type="submit"
            disabled={loading}
            id="button"
          >
            {loading ? <div className="flex items-center justify-center"><ECGGraph /></div> : 'Login'}
          </button>
          <div className="mt-4 text-center text-sm" style={{ color: 'gray' }}>
            If you dont have an account <a href="/signup" className="text-indigo-600 hover:underline" style={{ color: '#0e0737' }}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
