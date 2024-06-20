import React, { useEffect, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import logo from '../Components/logo.png'; // Adjust the path if necessary
import Clock from './clock'; // Adjust the path if necessary

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.userName);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    router.push('/profile');
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={50} height={50} className="" />
      </div>
      <button
        className="block sm:hidden focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } sm:flex sm:items-center sm:space-x-6`}
      >
        <a href="/Admin/User" className="text-black block sm:inline-block mt-2 sm:mt-0">Users</a>
        <a href="/Admin/Doctors" className="text-black block sm:inline-block mt-2 sm:mt-0">Doctors</a>
        <a href="/Admin/Ortho-Resources" className="text-black block sm:inline-block mt-2 sm:mt-0">Ortho Resources</a>
        <a href="/Admin/Consultation" className="text-black block sm:inline-block mt-2 sm:mt-0">Bookings</a>
        <a href="/Admin/Order" className="text-black block sm:inline-block mt-2 sm:mt-0">Orders</a>
        <a href="/Admin/Payment" className="text-black block sm:inline-block mt-2 sm:mt-0">Payments</a>
        {isAuthenticated ? (
          <div className="relative">
            <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 mt-2 sm:mt-0">
              <img
                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                alt="User"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={handleProfileClick}>{username}</button>
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="px-4 py-2 mt-2 sm:mt-0 bg-blue-500 text-white rounded hover:bg-blue-700">Login</a>
        )}
      </nav>
    </div>
  );
};

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    doctors: 0,
    technicians: 0,
    consultations: 0,
    orders: 0,
    payments: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch('https://oasis-final-directory.onrender.com/count/users'),
          fetch('https://oasis-final-directory.onrender.com/count/doctors'),
          fetch('https://oasis-final-directory.onrender.com/count/technicians'),
          fetch('https://oasis-final-directory.onrender.com/count/consumers'),
          fetch('https://oasis-final-directory.onrender.com/count/order'),
          fetch('https://oasis-final-directory.onrender.com/count/payments'),
        ]);

        for (const response of responses) {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }

        const data = await Promise.all(responses.map(res => res.json()));

        setCounts({
          users: data[0].count,
          doctors: data[1].count,
          technicians: data[2].count,
          consultations: data[3].count,
          orders: data[4].count,
          payments: data[5].count,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-around mt-4">
        <div className="bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <p className="text-3xl font-bold">{counts.users}</p>
          <h3 className="text-xl">Users</h3>
        </div>
        <div className="bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <p className="text-3xl font-bold">{counts.doctors}</p>
          <h3 className="text-xl">Doctors</h3>
        </div>
        <div className="bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <p className="text-3xl font-bold">{counts.technicians}</p>
          <h3 className="text-xl">Ortho Resources</h3>
        </div>
        <div className="bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <p className="text-3xl font-bold">{counts.consultations}</p>
          <h3 className="text-xl">Consultations</h3>
        </div>
        <div className="bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <p className="text-3xl font-bold">{counts.orders}</p>
          <h3 className="text-xl">Orders</h3>
        </div>
        <div className="flex flex-col items-center bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <div>
            <p className="text-3xl font-bold">{counts.payments}</p>
            <h3 className="text-xl">Payments</h3>
          </div>
        </div>
        <div className="flex flex-col items-center bg-gray-200 text-gray-800 p-6 m-2 rounded-lg text-center w-full sm:w-48 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
