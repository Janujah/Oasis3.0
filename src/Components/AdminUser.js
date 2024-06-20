"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/AdminNavbar'; // Ensure the component import matches the actual file name and path.

function UserTable() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12); // This does not change, so no setter is needed.

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://oasis-final-directory.onrender.com/order/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Sort users by orderDate in descending order
                const sortedUsers = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                setUsers(sortedUsers);
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

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
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
                            <tr>
                                <th className="px-4 py-2 border bg-[#0e0737] text-white text-center">Order #</th>
                                <th className="px-4 py-2 border bg-[#0e0737] text-white text-center">Customer Name</th>
                                <th className="px-4 py-2 border bg-[#0e0737] text-white text-center">Address</th>
                                <th className="px-4 py-2 border bg-[#0e0737] text-white text-center">Phone</th>
                                <th className="px-4 py-2 border bg-[#0e0737] text-white text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking, index) => (
                                <tr key={booking._id} className="border-t">
                                    <td className="px-4 py-2 border text-center">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-2 border text-center">{booking.customerName}</td>
                                    <td className="px-4 py-2 border text-center">{booking.address}</td>
                                    <td className="px-4 py-2 border text-center">{booking.phoneNumber}</td>
                                    <td className="px-4 py-2 border text-center">{new Date(booking.orderDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#0e0737] text-white'}`}
                        >
                            Previous
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#0e0737] text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        {`${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, users.length)} of ${users.length} orders`}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;
