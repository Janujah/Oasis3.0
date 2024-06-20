"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/AdminNavbar"; // Ensure the component import matches the actual file name and path.

function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // This does not change, so no setter is needed.
  const [visiblePageRange, setVisiblePageRange] = useState([1, 3]);

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
        // Sort users by creation date in descending order
        const sortedData = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
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
    if (pageNumber > visiblePageRange[1]) {
      setVisiblePageRange([pageNumber, pageNumber + 2]);
    } else if (pageNumber < visiblePageRange[0]) {
      setVisiblePageRange([pageNumber - 2, pageNumber]);
    }
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    if (newPage < visiblePageRange[0]) {
      setVisiblePageRange([newPage, newPage + 2]);
    }
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    if (newPage > visiblePageRange[1]) {
      setVisiblePageRange([newPage - 2, newPage]);
    }
  };

  const renderPageNumbers = () => {
    const [start, end] = visiblePageRange;
    const pageNumbers = [];
    for (let i = start; i <= end && i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        disabled={currentPage === number}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === number ? "bg-[#0e0737] text-white" : "bg-gray-300"
        }`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((booking) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">{booking.customerName}</td>
                <td className="py-2 px-4 border-b">{booking.address}</td>
                <td className="py-2 px-4 border-b">{booking.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{new Date(booking.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
