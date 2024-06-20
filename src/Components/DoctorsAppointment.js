"use client";
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

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

    const markDocComplete = async (id) => {
        try {
            const response = await fetch(
                `https://oasis-final-directory.onrender.com/consult/bookings/${id}/doc-complete`,
                {
                    method: "PATCH",
                }
            );
            if (response.ok) {
                const updatedBooking = await response.json();
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === updatedBooking._id ? { ...user, isDocComplete: true } : user
                    )
                );
            } else {
                console.error("Failed to mark doctor as complete.");
                alert("Failed to mark doctor as complete.");
            }
        } catch (error) {
            console.error("Failed to mark doctor as complete:", error);
            alert("Failed to mark doctor as complete.");
        }
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Doctor Name</th>
                            <th className="border px-4 py-2">Full Name</th>
                            <th className="border px-4 py-2">Gender</th>
                            <th className="border px-4 py-2">Phone</th>
                            <th className="border px-4 py-2">Consultation Reason</th>
                            <th className="border px-4 py-2">Preferred Date</th>
                            <th className="border px-4 py-2">Preferred Time</th>
                            <th className="border px-4 py-2">Preferred Language</th>
                            <th className="py-2 px-4 border-b">Admin Confirmation</th>
                            <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(booking => (
                            <tr key={booking._id}>
                                <td className="border px-4 py-2">{booking.doctorName}</td>
                                <td className="border px-4 py-2">{booking.fullName}</td>
                                <td className="border px-4 py-2">{booking.gender}</td>
                                <td className="border px-4 py-2">{booking.phone}</td>
                                <td className="border px-4 py-2">{booking.consultationReason}</td>
                                <td className="border px-4 py-2">{new Date(booking.preferredDate).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{booking.preferredTime}</td>
                                <td className="border px-4 py-2">{booking.preferredLanguage}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => markDocComplete(booking._id)}
                                        className={`px-3 py-1 rounded ${booking.isDocComplete ? "bg-green-500 text-white" : "bg-gray-300"}`}
                                        disabled={booking.isDocComplete}
                                    >
                                        {booking.isDocComplete ? "Complete" : "Mark Complete"}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
    );
}

export default UserTable;
