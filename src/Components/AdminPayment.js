"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/AdminNavbar';

function PaymentTable() {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchUserDetails();
        fetchPayments();
    }, []);

    const fetchUserDetails = () => {
        const token = localStorage.getItem('auth-token'); // Assuming token is stored in local storage
        if (token) {
            fetch('https://oasis-final-directory.onrender.com/user/details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserName(data.name);
                    setUserId(data._id);
                })
                .catch(error => {
                    console.error('Failed to fetch user details:', error);
                    alert('Failed to load user details.');
                });
        }
    };

    const fetchPayments = () => {
        fetch('https://oasis-final-directory.onrender.com/stripe/payments')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched payments data:', data); // Log the fetched data
            if (Array.isArray(data)) {
                setPayments(data);
            } else {
                console.error('Fetched payments data is not an array:', data);
                alert('Failed to load payments.');
            }
        })
        .catch(error => {
            console.error('Failed to fetch payments:', error);
            alert('Failed to load payments.');
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(payments.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <button 
                key={number} 
                onClick={() => handlePageChange(number)} 
                className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-[#0e0737] text-white' : 'bg-white text-'}`}
            >
                {number}
            </button>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-6 py-2 text-gray-600">Customer ID</th>
                                <th className="px-6 py-2 text-gray-600">Charge ID</th>
                                <th className="px-6 py-2 text-gray-600">Amount</th>
                                <th className="px-6 py-2 text-gray-600">Currency</th>
                                <th className="px-6 py-2 text-gray-600">Description</th>
                                <th className="px-6 py-2 text-gray-600">Receipt Email</th>
                                <th className="px-6 py-2 text-gray-600">Status</th>
                                <th className="px-6 py-2 text-gray-600">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(payment => (
                                <tr key={payment.id} className="text-center border-b">
                                    <td className="px-6 py-2">{payment.customer}</td>
                                    <td className="px-6 py-2">{payment.id}</td>
                                    <td className="px-6 py-2">{(payment.amount / 100).toFixed(2)}</td>
                                    <td className="px-6 py-2">{payment.currency.toUpperCase()}</td>
                                    <td className="px-6 py-2">{payment.description}</td>
                                    <td className="px-6 py-2">{payment.receipt_email}</td>
                                    <td className="px-6 py-2">{payment.status}</td>
                                    <td className="px-6 py-2">{new Date(payment.created * 1000).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
        </div>
    );
}

export default PaymentTable;
