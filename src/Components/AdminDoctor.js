"use client";
import { useState, useEffect } from 'react';
import Navbar from '../Components/AdminNavbar'; // Update the path as needed

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [editFormData, setEditFormData] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('https://oasis-final-directory.onrender.com/Doctors/view')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                console.error('Failed to fetch users:', error);
                alert('Failed to load users.');
            });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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

    const verifyUser = (id) => {
        fetch(`https://oasis-final-directory.onrender.com/Doctors/verify/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                alert('User verified successfully');
                fetchUsers();
            })
            .catch(error => {
                console.error('Error verifying user:', error);
                alert(`Failed to verify the user: ${error.message}`);
            });
    };

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`https://oasis-final-directory.onrender.com/Doctors/delete/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    alert(data.message || 'User deleted successfully');
                    fetchUsers();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to delete the user.');
                });
        }
    };

    const openEditModal = (user) => {
        setEditFormData(user);
    };

    const closeEditModal = () => {
        setEditFormData(null);
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitEditForm = (event) => {
        event.preventDefault();
        if (!editFormData || !editFormData._id) {
            alert('Error: No user data to update.');
            return;
        }

        fetch(`https://oasis-final-directory.onrender.com/Doctors/update/${editFormData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editFormData),
        })
            .then(response => response.json())
            .then(() => {
                alert('User updated successfully');
                fetchUsers();
                closeEditModal();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                alert('Failed to update user.');
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                {editFormData && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                            <h2 className="text-2xl mb-4">Edit User</h2>
                            <form onSubmit={submitEditForm}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={editFormData.fullName || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editFormData.email || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Registered ID</label>
                                    <input
                                        type="text"
                                        name="registeredId"
                                        value={editFormData.registeredId || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Working Hospitals</label>
                                    <input
                                        type="text"
                                        name="workingHospitals"
                                        value={editFormData.workingHospitals || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={editFormData.age || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Contact No</label>
                                    <input
                                        type="text"
                                        name="contactNo"
                                        value={editFormData.contactNo || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={editFormData.bio || ''}
                                        onChange={handleEditFormChange}
                                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map((user) => (
                        <div key={user._id} className="bg-white p-4 rounded shadow-md">
                            <h3 className="text-lg font-semibold mb-2 text-center">{user.fullName}</h3>
                            <img src={user.profileImage} alt="Profile" className="w-full h-90 object-cover rounded mb-4" />
                            <p className="text-gray-600 text-center"><strong>Email:</strong> {user.email}</p>
                            <p className="text-gray-600 text-center"><strong>Registered ID:</strong> {user.registeredId}</p>
                            <p className="text-gray-600 text-center"><strong>Working Hospitals:</strong> {user.workingHospitals}</p>
                            <p className="text-gray-600 text-center"><strong>Age:</strong> {user.age}</p>
                            <p className="text-gray-600 text-center"><strong>Contact No:</strong> {user.contactNo}</p>
                            <p className="text-gray-600 text-center"><strong>Position:</strong> {user.position}</p>
                            <p className="text-gray-600 text-center"><strong>Fees:</strong>LKR {user.fees}</p>
                            <p className="text-gray-600 text-center"><strong>Acc No:</strong> {user.accountNo}</p>

                            <div className="flex justify-center mt-4">
                                <button onClick={() => openEditModal(user)} className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                                <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-700">Delete</button>
                            </div>
                            <div className="flex justify-center mt-2">
                                {user.isVerified ? (
                                    <span className="text-green-500">Verified</span>
                                ) : (
                                    <button onClick={() => verifyUser(user._id)} className="text-green-500 hover:text-green-700">Verify</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
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
            </div>
        </div>
    );
};

export default UserTable;
