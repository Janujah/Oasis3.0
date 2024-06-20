// "use client";
// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ProfileDetailsPage() {
//     const router = useRouter();
//     const { id } = useParams();
//     const [doctor, setDoctor] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (id) {
//             fetch(`https://oasis-final-directory.onrender.com/Doctors/view/${id}`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     setDoctor(data);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching doctor details:', error);
//                     toast.error("Failed to load doctor details", { position: "bottom-right" });
//                     setLoading(false);
//                 });
//         }
//     }, [id]);

//     const handleBookAppointment = (availability) => {
//         router.push(`/Booking/${doctor._id}?availability=${encodeURIComponent(JSON.stringify(availability))}&doctorName=${encodeURIComponent(doctor.fullName)}`);
//     };

//     if (loading) {
//         return <div className="flex justify-center items-center h-screen">Loading...</div>;
//     }

//     if (!doctor) {
//         return <div className="flex justify-center items-center h-screen">Doctor not found</div>;
//     }

//     return (
//         <div className="bg-gradient-to-b from-[#FFFCFC] to-[#AB9551] py-12">
//             <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
//                 <h1 className="text-3xl font-bold text-center mb-6">{doctor.fullName}</h1>
//                 <div className="flex justify-center mb-6">
//                     <img
//                         src={doctor.profileImage}
//                         alt={doctor.fullName}
//                         className="w-48 h-48 rounded-full object-cover"
//                     />
//                 </div>
//                 <p><strong>Position:</strong> {doctor.position}</p>
//                 <p><strong>Email:</strong> {doctor.email}</p>
//                 <p><strong>Bio:</strong> {doctor.bio}</p>
//                 <p><strong>Registered ID:</strong> {doctor.registeredId}</p>
//                 <p><strong>Working Hospitals:</strong> {doctor.workingHospitals}</p>
//                 <p><strong>Age:</strong> {doctor.age}</p>
//                 <p><strong>Contact No:</strong> {doctor.contactNo}</p>
//                 <h3 className="text-xl font-bold mt-6 mb-4">Availability:</h3>
//                 {doctor.availability && doctor.availability.length > 0 ? (
//                     <table className="min-w-full border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border border-gray-300 px-4 py-2">Day</th>
//                                 <th className="border border-gray-300 px-4 py-2">Time</th>
//                                 <th className="border border-gray-300 px-4 py-2">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {doctor.availability.map((slot, index) => (
//                                 <tr key={index}>
//                                     <td className="border border-gray-300 px-4 py-2 text-center">{slot.day}</td>
//                                     <td className="border border-gray-300 px-4 py-2 text-center">{slot.time}</td>
//                                     <td className="border border-gray-300 px-4 py-2 text-center">
//                                         <button
//                                             onClick={() => handleBookAppointment(slot)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
//                                         >
//                                             Book Appointment
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No availability information provided.</p>
//                 )}
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }

// export default ProfileDetailsPage;



"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';


function ProfileDetailsPage() {
    const router = useRouter();
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`https://oasis-final-directory.onrender.com/Doctors/view/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setDoctor(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching doctor details:', error);
                    toast.error("Failed to load doctor details", { position: "bottom-right" });
                    setLoading(false);
                });
        }
    }, [id]);

    const handleBookAppointment = (availability) => {
        const doctorData = {
            doctorName: doctor.fullName,
            doctorId: doctor._id,
            availability
        };
        router.push(`/Booking/${doctor._id}?doctorData=${encodeURIComponent(JSON.stringify(doctorData))}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!doctor) {
        return <div className="flex justify-center items-center h-screen">Doctor not found</div>;
    }

    return (
        <div className="bg-gradient-to-b from-[#FFFCFC] to-[#AB9551] py-12">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">{doctor.fullName}</h1>
                <div className="flex justify-center mb-6">
                    <Image
                        src={doctor.profileImage}
                        alt={doctor.fullName}
                        className="w-48 h-48 rounded-full object-cover"
                    />
                </div>
                <p><strong>Position:</strong> {doctor.position}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Bio:</strong> {doctor.bio}</p>
                <p><strong>Registered ID:</strong> {doctor.registeredId}</p>
                <p><strong>Working Hospitals:</strong> {doctor.workingHospitals}</p>
                <p><strong>Age:</strong> {doctor.age}</p>
                <p><strong>Contact No:</strong> {doctor.contactNo}</p>
                <h3 className="text-xl font-bold mt-6 mb-4">Availability:</h3>
                {doctor.availability && doctor.availability.length > 0 ? (
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Day</th>
                                <th className="border border-gray-300 px-4 py-2">Time</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctor.availability.map((slot, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{slot.day}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">{slot.time}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleBookAppointment(slot)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                        >
                                            Book Appointment
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No availability information provided.</p>
                )}
                <ToastContainer />
            </div>
        </div>
    );
}

export default ProfileDetailsPage;
