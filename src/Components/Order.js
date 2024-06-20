"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
  const router = useRouter();
  const { productId, productName: initialProductName } = router.query || {};
  const [customerName, setCustomerName] = useState('');
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productName, setProductName] = useState(initialProductName || '');

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerName(decodedToken.userName);
      setUserId(decodedToken.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://oasis-final-directory.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          userId,
          customerName,
          address,
          phoneNumber,
        }),
      });
      if (response.ok) {
        toast.success('Order placed successfully!', { position: 'bottom-right' });
      } else {
        toast.error('Failed to place order.', { position: 'bottom-right' });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order.', { position: 'bottom-right' });
    }
  };

  return (
    <div id='container1'>
      <div className="flex justify-center mt-8 px-4" id='form'>
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Order Form</h2>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Customer Name:</label>
              <input
                type="text"
                value={customerName}
                required
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus focus"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus focus"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus focus"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus focus"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#0e0737] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Place Order
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
