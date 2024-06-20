"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode'; // Adjust import as needed
import Image from 'next/image';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Fetch user information from JWT token
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserEmail(decodedToken.email);
        setUserName(decodedToken.userName);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  const handleAddProduct = async () => {
    try {
      if (!productName || !price || !image || !userEmail || !userName) {
        throw new Error('Please fill all fields');
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', parseFloat(price));
      formData.append('image', image);
      formData.append('userEmail', userEmail);
      formData.append('userName', userName);

      const response = await fetch('https://oasis-final-directory.onrender.com/products/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log('Product added successfully:', result);

      toast.success('Product added successfully!');

      // Reset form fields
      setProductName('');
      setPrice('');
      setImage(null);
      setImagePreview(null);

      // Set productAdded to true to trigger redirection
      setProductAdded(true);
    } catch (error) {
      toast.error(`Error adding product: ${error.message}`);
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Redirect to home page if productAdded is true
  if (productAdded) {
    router.push('/Technicians');
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image:</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <Image src={imagePreview} alt="Image Preview" className="w-full h-48 object-cover rounded-md" />
            </div>
          )}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">User Email:</label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e0737] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
