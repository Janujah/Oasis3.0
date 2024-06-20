// src/App.js
import React from 'react';
import ProfileCard from '../Components/profileCard';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

function App() {
    return (
        <div className="bg-white">
            <br />
            <div className="text-center mt-16">
                <h1 className="text-8xl font-bold text-[#0e0737]"><b>Our Services</b></h1>
            </div>
            <div className="px-4 sm:px-8 md:px-16 lg:px-32 mt-8">
                <p className="text-lg text-black text-base sm:text-lg md:text-xl lg:text-2xl">
                    Welcome to Oasis, where we offer a comprehensive range of medical services tailored to meet your healthcare needs. From general medical consultations and specialist referrals to preventive health screenings and chronic disease management, our platform connects you with experienced healthcare professionals ready to provide personalized care. 
                    Whether youre preparing for surgery, seeking mental health support, or need pediatric care for your children, our team is here to ensure you receive quality care conveniently through our advanced telemedicine options. Join us today to experience healthcare that prioritizes your well-being and empowers you to take control of your health journey.
                </p>
            </div>
            <div className="flex flex-wrap justify-center mt-12 space-x-0 space-y-8 sm:space-x-8 sm:space-y-0">
                <a href='/our-services/doctors' className="no-underline">
                    <ProfileCard 
                        specialty="Doctors"
                        imageUrl="https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png"
                    />
                </a>
                <a href='/our-services/equipments' className="no-underline">
                    <ProfileCard 
                        specialty="Ortho Resources"
                        imageUrl="https://media.licdn.com/dms/image/sync/D4D27AQHvkaRUOQr_BQ/articleshare-shrink_800/0/1711468277929?e=2147483647&v=beta&t=ZK3Q7sobdUcYNOuV6adPZjKfMIlqJ_V5Bp9QAn3qf8c"
                    />
                </a>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default App;

