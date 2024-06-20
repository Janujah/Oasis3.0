import React from 'react';
import Image from 'next/image';
import backgroundImage from '../image/wp10189408-orthopedic-wallpapers.jpg';


function LandingPage() {
  return (
    <div className="relative w-full h-screen bg-cover" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#0e0737] font-bold text-8xl"><b>
            Welcome to Our world</b>
            <br/>
            <span className="text-[#AB9551] text-8xl"> <b>Oasis</b></span>
          </h1>
          <p className="mt-4 text-lg" style={{fontSize:'30px', color:'black'}}>Explore and discover our services.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
