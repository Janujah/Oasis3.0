"use client"
import React, { useState, useEffect } from 'react';
// import Navbar from '.';
import{jwtDecode}from 'jwt-decode';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setDoctorName(decodedToken.userName);
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch('https://oasis-final-directory.onrender.com/consult/view');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                alert('Failed to load users.');
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => user.doctorName === doctorName);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages).keys()].map(number => (
            <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`px-3 py-1 mx-1 rounded ${currentPage === number + 1 ? 'bg-[#0e0737] text-white' : 'bg-gray-200 text-gray-700'}`}
                disabled={currentPage === number + 1}
            >
                {number + 1}
            </button>
        ));
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map(booking => (
                        <div key={booking._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">{booking.doctorName}</h2>
                            <p><span className="font-semibold">Full Name:</span> {booking.fullName}</p>
                            <p><span className="font-semibold">Gender:</span> {booking.gender}</p>
                            <p><span className="font-semibold">Phone:</span> {booking.phone}</p>
                            <p><span className="font-semibold">Consultation Reason:</span> {booking.consultationReason}</p>
                            <p><span className="font-semibold">Preferred Date:</span> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                            <p><span className="font-semibold">Preferred Time:</span> {booking.preferredTime}</p>
                            <p><span className="font-semibold">Preferred Language:</span> {booking.preferredLanguage}</p>
                            <p><span className="font-semibold">Date:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
    );
}

export default UserTable;
