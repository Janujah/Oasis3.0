"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/AdminNavbar'; // Ensure the component import matches the actual file name and path.

function UserTable() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjusted items per page for example purposes.

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://oasis-final-directory.onrender.com/SignUp/view ');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                alert('Failed to load users.');
            }
        };

        fetchUsers();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages).keys()].map((number) => (
            <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                disabled={currentPage === number + 1}
                className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-[#0e0737] text-white' : 'bg-gray-300'}`}
            >
                {number + 1}
            </button>
        ));
    };

    return (
        <div>
            <Navbar />
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-blue-800 text-white">
                            <th className="px-4 py-2 border text-black bg-white">Name</th>
                            <th className="px-4 py-2 border text-black bg-white">Email</th>
                            <th className="px-4 py-2 border text-black bg-white">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="px-4 py-2 border">{user.userName}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">{user.Role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
        </div>
    );
}

export default UserTable;
