"use client";
import React, { useState, useEffect } from "react";
// import Navbar from '../components/technav'; // Adjust the path as needed.

function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://oasis-final-directory.onrender.com/order/orders"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Sort users by orderDate in descending order
        const sortedData = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setUsers(sortedData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("Failed to load users.");
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
        className={`px-3 py-1 rounded-md ${
          currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        disabled={currentPage === number + 1}
      >
        {number + 1}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <div className="container mx-auto py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Customer Name</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((booking) => (
                <tr key={booking._id} className="text-center">
                  <td className="py-2 px-4 border-b">{booking.customerName}</td>
                  <td className="py-2 px-4 border-b">{booking.address}</td>
                  <td className="py-2 px-4 border-b">{booking.phoneNumber}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(booking.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
}

export default UserTable;
