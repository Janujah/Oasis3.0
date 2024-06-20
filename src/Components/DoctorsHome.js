// "use client"
// import React from 'react';
// import backgroundImage from '../image/young-handsome-physician-medical-robe-with-stethoscope.jpg';

// function LandingPage() {
//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center flex flex-col justify-center items-start pl-5"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div>
//         <h1 className="text-7xl text-indigo-900 mt-24 font-bold">
//           Welcome to Our world <br /><span className="text-yellow-600">Oasis</span>
//         </h1>
//         <p className="text-2xl text-black"></p>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;



import React from 'react';
import Image from 'next/image';
import backgroundImage from '../image/young-handsome-physician-medical-robe-with-stethoscope.jpg';


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
