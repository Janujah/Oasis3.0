// "use client";
// import React from 'react';
// import { useRouter } from 'next/router';
// import {
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import Image from 'next/image';
// import logo from '../Components/logo.png';
// // import '../styles/navbar.css';
// import '../css/oasis.css'

// const navigation = [
//   { name: 'Home', href: '/', current: false },
//   { name: 'Our Services', href: '/ourServices', current: false },
//   { name: 'Doctors', href: '/Doctors', current: false },
//   { name: 'Orthoresources', href: '/Equipment', current: false },
//   { name: 'Contact Us', href: '/ContactUs', current: false },

// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// function Navbar() {
//   // const router = useRouter();

//   return (
//     <Disclosure as="nav" className="bg-white h-[100px]"
//           // style={{ backgroundColor: 'white', height: '100px' }}
//     >
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </DisclosureButton>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start" style={{ marginTop: '40px' }}>
//                 <div className="flex flex-shrink-0 items-center">
//                   <Image
//                     className="h-8 w-auto"
//                     src={logo}
//                     alt="Your Company"
//                     style={{ width: '160px', height: '80px' }}
//                   />
//                 </div>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           item.current ? 'bg-gray-900 text-black' : 'text-gray-300',
//                           'rounded-md px-3 py-2 text-sm font-medium'
//                         )}
//                         aria-current={item.current ? 'page' : undefined}
//                         style={{ color: 'black', marginTop: '20px' }}
//                       >
//                         {item.name}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* <button
//                   type="button"
//                   className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                 >
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">View notifications</span>Login
//                   <BellIcon className="h-6 w-6" aria-hidden="true" />
//                 </button> */}

//                 <a href='/login'><button
//                   className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   style={{ width: '100px', marginTop: '40px' }}
//                   id='button'
//                 >Login</button></a>

//                 {/* <Menu as="div" className="relative ml-3">
//                   <div>
//                     <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="absolute -inset-1.5" />
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
//                         alt=""
//                       />
//                     </MenuButton>
//                   </div>
//                   <Transition
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <MenuItem>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Your Profile
//                           </a>
//                         )}
//                       </MenuItem>
//                       <MenuItem>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Settings
//                           </a>
//                         )}
//                       </MenuItem>
//                       <MenuItem>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Sign out
//                           </a>
//                         )}
//                       </MenuItem>
//                     </MenuItems>
//                   </Transition>
//                 </Menu> */}
//               </div>
//             </div>
//           </div>

//           <DisclosurePanel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <DisclosureButton
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                     'block rounded-md px-3 py-2 text-base font-medium'
//                   )}
//                   aria-current={item.current ? 'page' : undefined}
//                 >
//                   {item.name}
//                 </DisclosureButton>
//               ))}
//             </div>
//           </DisclosurePanel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

// export default Navbar;

"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Image from 'next/image';
import logo from './logo.png';
import '../css/oasis.css'

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
            <div className="relative">
              <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                <img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' alt="User Profile" className="h-10 w-10 rounded-full" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Profile: {username}</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="text-gray-700 hover:text-blue-600" href="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md" id='button'>Login</button>
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
          <a className="block text-gray-700 px-4 py-2" href="/ourservices">Our Services</a>
          <a className="block text-gray-700 px-4 py-2" href="/our-services/doctors">Doctors</a>
          <a className="block text-gray-700 px-4 py-2" href="/our-services/equipments">Ortho Resources</a>
          <a className="block text-gray-700 px-4 py-2" href="/contactus">Contact Us</a>
          {isAuthenticated ? (
            <div className="relative">
              <button ref={usernameRef} onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none w-full px-4 py-2">
                <img src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' alt="User Profile" className="h-10 w-10 rounded-full" />
                <span className="text-gray-700">{username}</span>
              </button>
              {dropdownOpen && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg py-1 z-20">
                  <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Profile: {username}</button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <a className="block text-gray-700 hover:text-blue-600 px-4 py-2" href="/login">
              <button className="bg-[#0e0737] text-white px-4 py-2 rounded-md w-full" id='button' >Login</button>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
