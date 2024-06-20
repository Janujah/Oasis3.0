// pages/user-table.js
"use client"
import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import {jwtDecode} from 'jwt-decode';

function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const decodedToken = jwtDecode(token);
                const username = decodedToken.userName;

                const response = await fetch('https://oasis-final-directory.onrender.com/order/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const userOrders = data.filter(order => order.customerName === username);
                setOrders(userOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                alert('Failed to load orders.');
            }
        };

        fetchOrders();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages).keys()].map((number) => (
            <button 
                key={number + 1} 
                onClick={() => handlePageChange(number + 1)} 
                className={`px-2 py-1 m-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                disabled={currentPage === number + 1}
            >
                {number + 1}
            </button>
        ));
    };

    return (
        <div className="order-table-container mx-auto max-w-7xl p-4">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Customer Name</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((order) => (
                        <tr key={order._id}>
                            <td className="border px-4 py-2">{order.customerName}</td>
                            <td className="border px-4 py-2">{order.productName}</td>
                            <td className="border px-4 py-2">{order.address}</td>
                            <td className="border px-4 py-2">{order.phoneNumber}</td>
                            <td className="border px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination mt-4 flex justify-center">
                {renderPageNumbers()}
            </div>
        </div>
    );
}

function ConsultationTable() {
    const [consultations, setConsultations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [editFormData, setEditFormData] = useState(null);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const token = localStorage.getItem('auth-token');
                const decodedToken = jwtDecode(token);
                const username = decodedToken.userName;

                const response = await fetch('https://oasis-final-directory.onrender.com/consult/view', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                const userConsultations = data.filter(consultation => consultation.fullName === username);
                setConsultations(userConsultations);
            } catch (error) {
                console.error('Failed to fetch consultations:', error);
                alert('Failed to load consultations.');
            }
        };

        fetchConsultations();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = consultations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(consultations.length / itemsPerPage);

    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        return [...Array(totalPages).keys()].map(number => (
            <button 
                key={number + 1} 
                onClick={() => handlePageChange(number + 1)} 
                className={`px-2 py-1 m-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                disabled={currentPage === number + 1}
            >
                {number + 1}
            </button>
        ));
    };

    const openEditModal = (consultation) => {
        setEditFormData(consultation);
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

    const submitEditForm = async (event) => {
        event.preventDefault();
        if (!editFormData || !editFormData._id) {
            alert('Error: No consultation data to update.');
            return;
        }

        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch(`https://oasis-final-directory.onrender.com/consult/update/${editFormData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editFormData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Consultation updated successfully');
            setConsultations(prevConsultations => prevConsultations.map(consultation => 
                consultation._id === editFormData._id ? { ...consultation, ...editFormData } : consultation
            ));
            closeEditModal();
        } catch (error) {
            console.error('Error updating consultation:', error);
            alert('Failed to update consultation.');
        }
    };

    return (
        <div className="consultation-table-container mx-auto max-w-7xl p-4">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Doctor Name</th>
                        <th className="border px-4 py-2">Full Name</th>
                        <th className="border px-4 py-2">Consultation Reason</th>
                        <th className="border px-4 py-2">Preferred Date</th>
                        <th className="border px-4 py-2">Preferred Time</th>
                        <th className="border px-4 py-2">Preferred Language</th>
                        <th className="border px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(consultation => (
                        <tr key={consultation._id}>
                            <td className="border px-4 py-2">{consultation.doctorName}</td>
                            <td className="border px-4 py-2">{consultation.fullName}</td>
                            <td className="border px-4 py-2">{consultation.consultationReason}</td>
                            <td className="border px-4 py-2">{new Date(consultation.preferredDate).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{consultation.preferredTime}</td>
                            <td className="border px-4 py-2">{consultation.preferredLanguage}</td>
                            <td className="border px-4 py-2">{new Date(consultation.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination mt-4 flex justify-center">
                {renderPageNumbers()}
            </div>
        </div>
    );
}

function UserTable() {
    const [showOrders, setShowOrders] = useState(true);

    return (
        <div className="user-management-container">
            {/* <Navbar /> */}
            <div className="toggle-buttons flex justify-center mt-4">
                <button 
                    onClick={() => setShowOrders(true)} 
                    className={`px-4 py-2 m-2 ${showOrders ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    disabled={showOrders}
                >
                    Show Orders
                </button>
                <button 
                    onClick={() => setShowOrders(false)} 
                    className={`px-4 py-2 m-2 ${!showOrders ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    disabled={!showOrders}
                >
                    Show Consultations
                </button>
            </div>
            {showOrders ? <OrderTable /> : <ConsultationTable />}
        </div>
    );
}

export default UserTable;
