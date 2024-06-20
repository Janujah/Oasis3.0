"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/AdminNavbar"; // Ensure the component import matches the actual file name and path.

function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // This does not change, so no setter is needed.
  const [visiblePageRange, setVisiblePageRange] = useState([1, 3]);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to manage selected booking

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://oasis-final-directory.onrender.com/consult/view"
        );
        const data = await response.json();
        // Sort users by creation date in descending order
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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

  const handleEyeClick = (booking) => {
    setSelectedBooking(booking);
  };

  const closeDetailsCard = () => {
    setSelectedBooking(null);
  };

  const markUserComplete = async (id) => {
    try {
      const response = await fetch(
        `https://oasis-final-directory.onrender.com/consult/bookings/${id}/user-complete`,
        {
          method: "PATCH",
        }
      );
      if (response.ok) {
        const updatedBooking = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedBooking._id ? updatedBooking : user
          )
        );
      } else {
        console.error("Failed to mark user as complete.");
        alert("Failed to mark user as complete.");
      }
    } catch (error) {
      console.error("Failed to mark user as complete:", error);
      alert("Failed to mark user as complete.");
    }
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
            user._id === updatedBooking._id ? updatedBooking : user
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Doctor Name</th>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Consultation Date</th>
              <th className="py-2 px-4 border-b">User Complete</th>
              <th className="py-2 px-4 border-b">Doctor Complete</th>
              <th className="py-2 px-4 border-b">Admin Confirmation</th>
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((booking) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">{booking.doctorName}</td>
                <td className="py-2 px-4 border-b">{booking.fullName}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(booking.preferredDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => markUserComplete(booking._id)}
                    className={`px-3 py-1 rounded ${
                      booking.isUserComplete
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }`}
                    disabled={booking.isUserComplete}
                  >
                    {booking.isUserComplete ? "Complete" : "Mark Complete"}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => markDocComplete(booking._id)}
                    className={`px-3 py-1 rounded ${
                      booking.isDocComplete
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }`}
                    disabled={booking.isDocComplete}
                  >
                    {booking.isDocComplete ? "Complete" : "Mark Complete"}
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.forAdmin ? (
                    <span className="text-green-500">Confirmed</span>
                  ) : (
                    <span className="text-red-500">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEyeClick(booking)}
                    className="text-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z"
                      />
                    </svg>
                  </button>
                </td>
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
        {selectedBooking && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 lg:w-1/2">
              <button
                onClick={closeDetailsCard}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold mb-2">
                {selectedBooking.fullName}
              </h3>
              <p className="text-gray-600">
                <strong>Doctor Name:</strong> {selectedBooking.doctorName}
              </p>
              <p className="text-gray-600">
                <strong>Date of Birth:</strong>{" "}
                {new Date(selectedBooking.dob).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Gender:</strong> {selectedBooking.gender}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {selectedBooking.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {selectedBooking.phone}
              </p>
              <p className="text-gray-600">
                <strong>Consultation Reason:</strong>{" "}
                {selectedBooking.consultationReason}
              </p>
              <p className="text-gray-600">
                <strong>Preferred Date:</strong>{" "}
                {new Date(selectedBooking.preferredDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Preferred Time:</strong> {selectedBooking.preferredTime}
              </p>
              <p className="text-gray-600">
                <strong>Preferred Language:</strong>{" "}
                {selectedBooking.preferredLanguage}
              </p>
              <p className="text-gray-600">
                <strong>Visited Before:</strong>{" "}
                {selectedBooking.visitedBefore ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                <strong>Consent Given:</strong>{" "}
                {selectedBooking.consent ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(selectedBooking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTable;
