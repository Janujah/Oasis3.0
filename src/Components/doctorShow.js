"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
// import Nav from '../Components/navbar';
import '../css/oasis.css';

const DOCTORS_PER_PAGE = 10;

function SearchableDropdown({ options, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option) => {
        setSearchTerm(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="relative inline-block w-full max-w-xs">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setIsOpen(!isOpen)}
                placeholder="Search and select a position"
                className="w-full p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {isOpen && (
                <div className="absolute left-0 right-0 z-10 mt-2 bg-white border border-black rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`p-2 cursor-pointer hover:bg-gray-200 text-black ${option === searchTerm ? 'bg-gray-200' : ''}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function DoctorPage() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('https://oasis-final-directory.onrender.com/Doctors/view')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const verifiedDoctors = data.filter(doctor => doctor.isVerified); // Filter to only include verified doctors
                setDoctors(verifiedDoctors);
                console.log('Verified doctors fetched:', verifiedDoctors);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
                setError('Failed to load doctors.');
            });
    }, []);

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        setCurrentPage(1); // Reset to first page whenever a new position is selected
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page whenever a new search term is entered
    };

    const positions = [...new Set(doctors.map(doctor => doctor.position))]; // Get unique positions

    const filteredDoctors = doctors.filter(doctor => {
        const matchesPosition = selectedPosition ? doctor.position === selectedPosition : true;
        const matchesSearchTerm = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPosition && matchesSearchTerm;
    });

    const totalDoctors = filteredDoctors.length;
    const totalPages = Math.ceil(totalDoctors / DOCTORS_PER_PAGE);
    const startIndex = (currentPage - 1) * DOCTORS_PER_PAGE;
    const currentDoctors = filteredDoctors.slice(startIndex, startIndex + DOCTORS_PER_PAGE);

    if (error) {
        return (
            <div>
                {/* <Nav /> */}
                <h2 className="mt-5 text-center">{error}</h2>
            </div>
        );
    }

    return (
        <div style={{backgroundColor:'white'}}>
            {/* <Nav /> */}
            <header className="text-center">
                <h1 className="text-5xl font-bold text-[#0e0737]">Doctors</h1>
            </header>
            <div className="my-5 text-center">
                <SearchableDropdown
                    options={positions}
                    onSelect={handlePositionSelect}
                />
            </div>
            <div className="flex flex-wrap justify-center"  id='doctor'>
                {currentDoctors.map(doctor => (
                    <Link href={`/doctor/${doctor._id}`} key={doctor._id}>
                        <div className="m-2 p-5 w-72 border border-gray-300 rounded-lg shadow-md">
                            <img src={doctor.profileImage} alt={doctor.fullName} className="w-full h-60 object-cover rounded-t-lg" />
                            <h3 className="mt-2 text-xl font-bold">{doctor.fullName}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            {/* {doctor.isVerified && <span className="block mt-1 text-green-600 font-bold">Verified</span>} */}
                            <p className="mt-2 text-gray-700">{doctor.bio}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="my-5 text-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 text-lg rounded-md ${currentPage === index + 1 ? 'bg-[#0e0737] text-white' : 'bg-white border border-[#0e0737] text-indigo-900'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="my-5 text-center text-lg">
                {`${startIndex + 1}-${Math.min(startIndex + DOCTORS_PER_PAGE, totalDoctors)} of ${totalDoctors} doctors`}
            </div>
        </div>
    );
}

export default DoctorPage;
