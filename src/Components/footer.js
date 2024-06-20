import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6 px-10 text-center md:text-left">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="mb-6 md:mb-0">
          <p>Contact Us: <a href="mailto:janujahsivarattinam@gmail.com" className="text-blue-600 hover:underline">janujahsivarattinam@gmail.com</a></p>
          <p>Phone: +94 077 306 8569</p>
        </div>
        <ul className="flex flex-col items-center md:flex-row md:space-x-8">
          <li><a href="/ourservices" className="text-black 0">Our Services</a></li>
          <li><a href="/doctors" className="text-black ">Doctors</a></li>
          <li><a href="/equipment" className="text-black ">Ortho Resources</a></li>
        </ul>
      </div>
      <div className="border-t border-gray-300 pt-4 mt-6">
        <p >&copy; {new Date().getFullYear()} Oasis. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
